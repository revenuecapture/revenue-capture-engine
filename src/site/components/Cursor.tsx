import { useEffect, useRef } from "react";
import { hasFinePointer, onFrame, prefersReducedMotion } from "../lib/motion";

/**
 * Desktop-only cursor. A dot and a trailing ring by default. Over anything with
 * data-cursor="Word" it becomes a filled disc that says the word. Over form
 * fields it steps aside for the native text cursor.
 */
export default function Cursor() {
  const base = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const root = document.documentElement;
    const follow = prefersReducedMotion() ? 1 : 0.2;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let shown = false;

    const setState = (target: Element | null) => {
      const el = target instanceof Element ? target : null;
      const field = el?.closest("input, textarea, select");
      const tagged = el?.closest<HTMLElement>("[data-cursor]");
      const link = el?.closest("a, button, summary, label");
      const theme = el?.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "light";
      const state = field ? "field" : tagged ? "tag" : link ? "link" : "idle";
      if (base.current) base.current.dataset.state = state;
      if (tag.current) {
        tag.current.dataset.state = state;
        tag.current.dataset.theme = theme;
      }
      if (tagged && disc.current) disc.current.textContent = tagged.dataset.cursor ?? "";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        root.classList.add("rc-cursor-on");
      }
      setState(e.target as Element);
    };
    const onLeave = () => {
      shown = false;
      root.classList.remove("rc-cursor-on");
    };
    const onScrollish = () => {
      if (shown) setState(document.elementFromPoint(x, y));
    };

    const offFrame = onFrame(() => {
      if (!shown) return;
      rx += (x - rx) * follow;
      ry += (y - ry) * follow;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      if (tag.current) tag.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScrollish, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      offFrame();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScrollish);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("rc-cursor-on");
    };
  }, []);

  return (
    <>
      <div className="rc-cursor" ref={base} data-state="idle" aria-hidden="true">
        <div className="rc-cursor__ring" ref={ring} />
        <div className="rc-cursor__dot" ref={dot} />
      </div>
      <div className="rc-cursor-tag" ref={tag} data-state="idle" data-theme="light" aria-hidden="true">
        <div className="rc-cursor-tag__disc" ref={disc} />
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
