// Page-to-page transition. A dark sheet with a liquid leading edge rises over
// the old page, the route changes underneath it, and the sheet lifts away.
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pageLabel } from "../content";
import { pauseScroll, prefersReducedMotion, resetScroll, scrollToId } from "./motion";

const COVER_MS = 640;
const HOLD_MS = 140;
const REVEAL_MS = 720;
const RULE_GAP = 11; // px between the three coloured rules that ride the edge

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function animate(ms: number, draw: (t: number) => void) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      draw(t);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const here = useRef(location.pathname);
  here.current = location.pathname;

  const layer = useRef<HTMLDivElement>(null);
  const sheet = useRef<SVGPathElement>(null);
  const rules = useRef<(SVGPathElement | null)[]>([]);
  const label = useRef<HTMLParagraphElement>(null);
  const busy = useRef(false);

  const go = useCallback(
    async (to: string) => {
      const [path, hash] = to.split("#");
      const afterArrive = () => {
        if (hash) window.setTimeout(() => scrollToId(hash), 60);
      };

      if (prefersReducedMotion() || !layer.current || !sheet.current) {
        navigate(to);
        resetScroll();
        afterArrive();
        return;
      }
      if (busy.current) return;
      busy.current = true;

      const root = document.documentElement;
      const el = layer.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const svg = el.querySelector("svg")!;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      if (label.current) label.current.textContent = pageLabel(path);
      el.classList.add("is-on");
      pauseScroll(true);

      // The edge is a single curve: flat at the sides, swollen in the middle.
      const edge = (y: number, swell: number) => `Q${w / 2},${y - swell * 2} `;
      const setRules = (y: number, swell: number, dir: 1 | -1) => {
        rules.current.forEach((r, i) => {
          if (!r) return;
          const yy = y - dir * RULE_GAP * (i + 1);
          r.setAttribute("d", `M0,${yy} Q${w / 2},${yy - swell * 2} ${w},${yy}`);
        });
      };

      // 1. Cover: the sheet's top edge climbs from the bottom to above the top.
      await animate(COVER_MS, (t) => {
        const e = easeInOut(t);
        const y = h * (1 - e) - 60 * e;
        const swell = Math.sin(Math.PI * t) * h * 0.11;
        sheet.current!.setAttribute("d", `M0,${h} L0,${y} ${edge(y, swell)}${w},${y} L${w},${h} Z`);
        setRules(y, swell, 1);
        if (t > 0.45) el.classList.add("is-labelled");
      });

      // 2. Swap the page underneath.
      root.classList.add("rc-pre");
      navigate(to);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      resetScroll();
      await new Promise((r) => window.setTimeout(r, HOLD_MS));
      el.classList.remove("is-labelled");

      // 3. Reveal: the sheet's bottom edge climbs away, dragging in the middle.
      let risen = false;
      await animate(REVEAL_MS, (t) => {
        const e = easeInOut(t);
        const y = h * (1 - e) - 60 * e;
        const swell = -Math.sin(Math.PI * t) * h * 0.11;
        sheet.current!.setAttribute("d", `M0,0 L${w},0 L${w},${y} Q${w / 2},${y - swell * 2} 0,${y} Z`);
        setRules(y, swell, -1);
        if (!risen && t > 0.28) {
          risen = true;
          root.classList.remove("rc-pre");
          root.classList.add("rc-in");
        }
      });

      el.classList.remove("is-on");
      pauseScroll(false);
      busy.current = false;
      afterArrive();
    },
    [navigate],
  );

  // Every internal link on the site goes through the transition.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/dashboard")) return;
      const samePage = url.pathname.replace(/\/+$/, "") === here.current.replace(/\/+$/, "");
      if (samePage) {
        e.preventDefault();
        scrollToId(url.hash ? url.hash.slice(1) : "top");
        return;
      }
      e.preventDefault();
      go(url.pathname + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [go]);

  return (
    <>
      {children}
      <div className="rc-shift" ref={layer} aria-hidden="true">
        <svg preserveAspectRatio="none">
          <path className="rc-shift__sheet" ref={sheet} />
          {["blue", "wine", "pine"].map((c, i) => (
            <path
              key={c}
              className="rc-shift__rule"
              ref={(node) => (rules.current[i] = node)}
              style={{ stroke: `var(--${c})` }}
            />
          ))}
        </svg>
        <p className="rc-shift__label" ref={label} />
      </div>
    </>
  );
}
