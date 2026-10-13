import { useEffect, useRef } from "react";
import { hasFinePointer, onFrame, prefersReducedMotion } from "../lib/motion";

/**
 * Desktop-only cursor: one drop of liquid glass.
 *
 * The drop is a short chain of circles. The head follows the pointer and each
 * circle after it follows the one before, so the drop stretches into a tail
 * when it moves and pulls back into a sphere when it stops. An SVG filter
 * melts the circles into one surface and lights it, so the tail and the head
 * are the same material. Its colour drifts through the brand palette as it
 * travels (primaries on light sections, tints on dark ones) and shifts when
 * it lands on something clickable.
 *
 * Over data-cursor="Word" it swells and says the word; data-cursor-tone =
 * "wine" | "blue" | "pine" sets the colour it swells into.
 * Over form fields it steps aside for the native text cursor.
 */

type RGB = [number, number, number];

const BOX = 360; // px; the drop is drawn on a small canvas that travels with it
const HALF = BOX / 2;
const NODES = 10;
const REACH = 140; // furthest the tail may trail behind the head, px

const PALETTE: Record<"light" | "dark", RGB[]> = {
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
const TONES: Record<string, number> = { wine: 0, blue: 1, pine: 2 };
const RADIUS: Record<string, number> = { idle: 15, link: 31, tag: 50, field: 4 };

const mix = (a: RGB, b: RGB, f: number): RGB => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
const sample = (pal: RGB[], phase: number): RGB => {
  const p = ((phase % pal.length) + pal.length) % pal.length;
  const i = Math.floor(p);
  const f = p - i;
  return mix(pal[i], pal[(i + 1) % pal.length], f * f * (3 - 2 * f));
};

export default function Cursor() {
  const drop = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cv = drop.current;
    const ctx = cv?.getContext("2d");
    if (!hasFinePointer() || !cv || !ctx) return;
    const root = document.documentElement;
    const calm = prefersReducedMotion();

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = BOX * dpr;
    cv.height = BOX * dpr;

    let x = 0;
    let y = 0;
    let shown = false;
    let state = "idle";
    let theme: "light" | "dark" = "light";
    let tone = "";
    let target: Element | null = null;
    let down = false;
    let phase = 0;
    let radius = RADIUS.idle;
    const nodes = Array.from({ length: NODES }, () => ({ x: 0, y: 0, c: [...PALETTE.light[0]] as RGB }));

    const setState = (t: Element | null) => {
      const el = t instanceof Element ? t : null;
      const field = el?.closest("input, textarea, select");
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      const link = el?.closest("a, button, summary, label");
      theme = el?.closest<HTMLElement>("[data-theme]")?.dataset.theme === "dark" ? "dark" : "light";
      const next = field ? "field" : tagged ? "tag" : link ? "link" : "idle";
      // Landing on something new to click nudges the colour along.
      const hit = tagged ?? link ?? null;
      if (hit && hit !== target && next !== "field") phase += 1;
      target = hit;
      state = next;
      cv.dataset.state = state;
      if (tagged) {
        tone = tagged.dataset.cursorTone ?? "";
        if (label.current) {
          label.current.textContent = tagged.dataset.cursor ?? "";
          label.current.dataset.ink = theme;
        }
      }
      if (label.current) label.current.dataset.on = state === "tag" ? "1" : "";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        nodes.forEach((n) => {
          n.x = x;
          n.y = y;
        });
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
    const onDown = () => (down = true);
    const onUp = () => (down = false);

    const offFrame = onFrame(() => {
      if (!shown) return;
      const head = nodes[0];
      const px = head.x;
      const py = head.y;
      head.x += (x - head.x) * (calm ? 1 : 0.34);
      head.y += (y - head.y) * (calm ? 1 : 0.34);
      phase += Math.hypot(head.x - px, head.y - py) / 820;

      // Big states keep a shorter tail so the swollen drop does not smear.
      const tight = state === "tag" || state === "link";
      for (let i = 1; i < NODES; i++) {
        const n = nodes[i];
        const prev = nodes[i - 1];
        const k = calm ? 1 : tight ? 0.62 : 0.5 - i * 0.02;
        n.x += (prev.x - n.x) * k;
        n.y += (prev.y - n.y) * k;
        // Never let two neighbours drift far enough apart to break into beads.
        const gap = radius * ((tight ? 0.3 : 0.62) - i * 0.02);
        const gx = n.x - prev.x;
        const gy = n.y - prev.y;
        const g = Math.hypot(gx, gy);
        if (g > gap) {
          n.x = prev.x + (gx / g) * gap;
          n.y = prev.y + (gy / g) * gap;
        }
        const dx = n.x - head.x;
        const dy = n.y - head.y;
        const d = Math.hypot(dx, dy);
        if (d > REACH) {
          n.x = head.x + (dx / d) * REACH;
          n.y = head.y + (dy / d) * REACH;
        }
      }

      const want = RADIUS[state] * (down ? 0.82 : 1);
      radius += (want - radius) * 0.16;

      const pal = PALETTE[theme];
      const goal = state === "tag" && tone in TONES ? pal[TONES[tone]] : sample(pal, phase);
      head.c = mix(head.c, goal, 0.14);
      for (let i = 1; i < NODES; i++) nodes[i].c = mix(nodes[i].c, nodes[i - 1].c, 0.3);

      cv.style.transform = `translate3d(${head.x - HALF}px, ${head.y - HALF}px, 0)`;
      if (label.current) label.current.style.transform = `translate3d(${head.x}px, ${head.y}px, 0) translate(-50%, -50%)`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, BOX, BOX);
      for (let i = NODES - 1; i >= 0; i--) {
        const n = nodes[i];
        const r = radius * (1 - (i / NODES) * 0.66);
        const [cr, cg, cb] = n.c;
        ctx.fillStyle = `rgb(${cr | 0}, ${cg | 0}, ${cb | 0})`;
        ctx.beginPath();
        ctx.arc(n.x - head.x + HALF, n.y - head.y + HALF, r, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      offFrame();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("rc-cursor-on");
    };
  }, []);

  return (
    <>
      <svg className="rc-drop-defs" width="0" height="0" aria-hidden="true">
        {/* Melt the circles into one surface, then light it like glass. */}
        <filter id="rc-drop" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -10" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="4" result="soft" />
          <feSpecularLighting in="soft" surfaceScale="5" specularConstant="1.1" specularExponent="26" lightingColor="#ffffff" result="spec">
            <feDistantLight azimuth="225" elevation="50" />
          </feSpecularLighting>
          <feComposite in="spec" in2="goo" operator="in" result="shine" />
          <feComposite in="goo" in2="shine" operator="arithmetic" k1="0" k2="1" k3="0.9" k4="0" />
        </filter>
      </svg>
      <canvas className="rc-drop" ref={drop} data-state="idle" aria-hidden="true" />
      <span className="rc-drop__label" ref={label} aria-hidden="true" />
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
