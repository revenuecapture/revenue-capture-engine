// Small shared motion utilities: one rAF loop, smooth scroll, scroll-linked progress.
import Lenis from "../vendor/lenis.mjs";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/* ── One frame loop for everything ── */
type FrameFn = (time: number, delta: number) => void;
const frameFns = new Set<FrameFn>();
let rafId = 0;
let lastTime = 0;

function loop(time: number) {
  const delta = lastTime ? Math.min(64, time - lastTime) : 16;
  lastTime = time;
  frameFns.forEach((fn) => fn(time, delta));
  rafId = frameFns.size ? requestAnimationFrame(loop) : 0;
  if (!rafId) lastTime = 0;
}

export function onFrame(fn: FrameFn) {
  frameFns.add(fn);
  if (!rafId) rafId = requestAnimationFrame(loop);
  return () => {
    frameFns.delete(fn);
  };
}

/* ── Smooth scroll ── */
let forced = false;
let lenis: InstanceType<typeof Lenis> | null = null;

export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1 });
  const off = onFrame((time) => lenis?.raf(time));
  return () => {
    off();
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToId(id: string, offset = 0) {
  const target = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !target) return;
  if (lenis) {
    lenis.scrollTo(target ?? 0, { duration: 1.2, offset });
  } else if (target) {
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY + offset);
  } else {
    window.scrollTo(0, 0);
  }
}

/** Jump to the top with no animation. Used between pages. */
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
  forced = true;
}

export function pauseScroll(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

/* ── Scroll-linked work: runs only on frames where scroll or viewport changed ── */
type ScrollFn = (vh: number, vw: number) => void;
const scrollFns = new Set<ScrollFn>();
let offScrollLoop: (() => void) | null = null;
let seenY = -1;
let seenH = -1;
let seenW = -1;

export function onScrollFrame(fn: ScrollFn) {
  scrollFns.add(fn);
  forced = true;
  if (!offScrollLoop) {
    offScrollLoop = onFrame(() => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const w = window.innerWidth;
      if (!forced && y === seenY && h === seenH && w === seenW) return;
      forced = false;
      seenY = y;
      seenH = h;
      seenW = w;
      scrollFns.forEach((f) => f(h, w));
    });
  }
  return () => {
    scrollFns.delete(fn);
    if (!scrollFns.size && offScrollLoop) {
      offScrollLoop();
      offScrollLoop = null;
    }
  };
}

/* ── Reveal on enter ── */
export function watchReveals(root: ParentNode = document) {
  const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    els.forEach((el) => el.classList.add("is-in"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}
