import { useEffect, useRef } from "react";
import { hasFinePointer, onFrame, prefersReducedMotion } from "../lib/motion";

/**
 * Desktop-only cursor: a glass bead that bends the page beneath it, with a
 * short fluid ribbon in the brand colours trailing behind when it moves.
 * Over anything with data-cursor="Word" the bead swells and says the word.
 * Over form fields it steps aside for the native text cursor.
 */

// Displacement map for the lens (red = x shift, green = y shift).
const LENS_MAP = "data:image/png;base64,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";

const TRAIL_LIFE = 430; // ms a point of the ribbon lives
const TRAIL_WIDTH = 15; // px radius at the head
const PALETTES = {
  light: [
    [116, 46, 52], // wine
    [59, 92, 127], // federal blue
    [13, 82, 87], // pine
  ],
  dark: [
    [245, 218, 223], // himalayan salt
    [221, 229, 237], // polar ice
    [173, 202, 184], // luna moth
  ],
};

type Point = { x: number; y: number; t: number };

export default function Cursor() {
  const bead = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const root = document.documentElement;
    const calm = prefersReducedMotion();
    // Only Chromium can run an SVG filter as a backdrop. Others get plain glass.
    const ua = navigator.userAgent;
    if ("userAgentData" in navigator || /Chrome\//.test(ua)) root.classList.add("rc-lens");

    const cv = canvas.current;
    const ctx = cv?.getContext("2d") ?? null;
    let dpr = 1;
    const size = () => {
      if (!cv) return;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(window.innerWidth * dpr);
      cv.height = Math.round(window.innerHeight * dpr);
    };
    size();

    let x = 0;
    let y = 0;
    let bx = 0;
    let by = 0;
    let shown = false;
    let state = "idle";
    let theme: "light" | "dark" = "light";
    let angle = 0;
    let stretch = 0;
    let dirty = false;
    const trail: Point[] = [];

    const setState = (target: Element | null) => {
      const el = target instanceof Element ? target : null;
      const field = el?.closest("input, textarea, select");
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      const link = el?.closest("a, button, summary, label");
      theme = el?.closest<HTMLElement>("[data-theme]")?.dataset.theme === "dark" ? "dark" : "light";
      state = field ? "field" : tagged ? "tag" : link ? "link" : "idle";
      if (bead.current) {
        bead.current.dataset.state = state;
        bead.current.dataset.theme = theme;
      }
      if (tagged && label.current) label.current.textContent = tagged.dataset.cursor ?? "";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        bx = x;
        by = y;
        root.classList.add("rc-cursor-on");
      }
      setState(e.target as Element);
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove("rc-cursor-on");
    };
    const onScroll = () => {
      if (shown) setState(document.elementFromPoint(x, y));
    };
    const onDown = () => bead.current?.classList.add("is-down");
    const onUp = () => bead.current?.classList.remove("is-down");

    const drawTrail = (now: number) => {
      if (!ctx || !cv) return;
      while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift();
      if (!trail.length && !dirty) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      dirty = trail.length > 0;
      if (trail.length < 2 || state === "field") return;
      const colours = PALETTES[theme];
      // Stamp overlapping discs along the path: wide and wine at the head,
      // thinning through blue to pine at the tail.
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1];
        const b = trail[i];
        const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 2.5));
        for (let s = 0; s < steps; s++) {
          const k = s / steps;
          const age = (now - (a.t + (b.t - a.t) * k)) / TRAIL_LIFE; // 0 fresh, 1 gone
          if (age >= 1) continue;
          const life = 1 - age;
          const radius = TRAIL_WIDTH * Math.pow(life, 1.45);
          if (radius < 0.4) continue;
          const pos = age * (colours.length - 1);
          const c0 = colours[Math.floor(pos)];
          const c1 = colours[Math.min(colours.length - 1, Math.floor(pos) + 1)];
          const f = pos - Math.floor(pos);
          ctx.fillStyle = `rgb(${Math.round(c0[0] + (c1[0] - c0[0]) * f)}, ${Math.round(
            c0[1] + (c1[1] - c0[1]) * f,
          )}, ${Math.round(c0[2] + (c1[2] - c0[2]) * f)})`;
          ctx.beginPath();
          ctx.arc(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const offFrame = onFrame((now) => {
      if (shown) {
        const px = bx;
        const py = by;
        bx += (x - bx) * (calm ? 1 : 0.32);
        by += (y - by) * (calm ? 1 : 0.32);
        const vx = bx - px;
        const vy = by - py;
        const speed = Math.hypot(vx, vy);
        if (speed > 0.6) angle = Math.atan2(vy, vx);
        stretch += (Math.min(speed / 46, 0.42) - stretch) * 0.3;
        if (bead.current) bead.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
        if (body.current) {
          const squash = calm || state === "tag" ? 0 : stretch;
          // Stretch along the direction of travel without turning the highlights.
          body.current.style.transform = `rotate(${angle}rad) scale(${1 + squash}, ${1 - squash * 0.42}) rotate(${-angle}rad)`;
        }
        if (!calm && speed > 1.2) {
          const last = trail[trail.length - 1];
          if (!last || Math.hypot(last.x - bx, last.y - by) > 2) trail.push({ x: bx, y: by, t: now });
          if (trail.length > 90) trail.shift();
        }
      }
      drawTrail(now);
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      offFrame();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("rc-cursor-on", "rc-lens");
    };
  }, []);

  return (
    <>
      <svg className="rc-lens-defs" width="0" height="0" aria-hidden="true">
        <filter id="rc-lens" x="0" y="0" width="1" height="1" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feImage href={LENS_MAP} x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="0.34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <canvas className="rc-trail" ref={canvas} aria-hidden="true" />
      <div className="rc-bead" ref={bead} data-state="idle" data-theme="light" aria-hidden="true">
        <div className="rc-bead__body" ref={body}>
          <i className="rc-bead__glass" />
          <i className="rc-bead__rim" />
        </div>
        <span className="rc-bead__label" ref={label} />
      </div>
    </>
  );
}

/** Lets an element lean a few pixels toward the pointer. */
export function useMagnetic<T extends HTMLElement>(strength = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
  return ref;
}
