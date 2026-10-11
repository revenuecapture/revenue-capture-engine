import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { pageLabel, pages } from "../content";
import { Arrow } from "./Shell";

// Each menu item takes one of the three brand tints when the pointer is on it.
const TINTS = ["ice", "salt", "moth"];

/**
 * The site's navigation. Left side names the page you are on; hovering or
 * tapping it lets the page list rise out of the pill like liquid. Right side
 * is always the audit call to action.
 *
 * The liquid look comes from a blurred-then-sharpened layer of plain shapes
 * (the pill and one blob per menu item) sitting behind the text. The colour on
 * hover is a crisp capsule in the text layer; the blob behind it swells.
 */
export default function Pill() {
  const { pathname } = useLocation();
  const here = pathname.replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);
  const [hot, setHot] = useState(-1);
  const ref = useRef<HTMLElement>(null);
  const closing = useRef(0);

  useEffect(() => {
    setOpen(false);
    setHot(-1);
  }, [here]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && ref.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closing.current), []);

  // Mouse: open on hover, close shortly after leaving. Touch and keyboard use the button.
  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closing.current);
    setOpen(true);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closing.current);
    closing.current = window.setTimeout(() => {
      setOpen(false);
      setHot(-1);
    }, 220);
  };

  const last = pages.length - 1;
  const hotTint = hot >= 0 ? `var(--${TINTS[hot % TINTS.length]})` : undefined;

  return (
    <nav
      className="rc-pill"
      aria-label="Pages"
      ref={ref}
      data-open={open || undefined}
      onPointerEnter={enter}
      onPointerLeave={leave}
      style={{ ["--n" as string]: pages.length, ["--hot" as string]: hotTint }}
    >
      <svg className="rc-pill__defs" width="0" height="0" aria-hidden="true">
        <filter id="rc-goo" x="-20%" y="-10%" width="140%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" result="goo" />
          <feMorphology in="goo" operator="dilate" radius="1" result="fat" />
          <feFlood floodColor="#f0eee9" floodOpacity="0.2" result="tone" />
          <feComposite in="tone" in2="fat" operator="in" result="ring" />
          <feMerge>
            <feMergeNode in="ring" />
            <feMergeNode in="goo" />
          </feMerge>
        </filter>
      </svg>

      <div className="rc-pill__goo" aria-hidden="true">
        <i className="rc-pill__base" />
        {pages.map((p, i) => (
          <i
            key={p.path}
            className={`rc-pill__drop${hot === i ? " is-hot" : ""}`}
            style={{ ["--k" as string]: last - i }}
          />
        ))}
      </div>

      <ul className="rc-pill__menu" id="rc-pill-menu">
        {pages.map((p, i) => (
          <li
            key={p.path}
            className={hot === i ? "is-hot" : undefined}
            style={{ ["--k" as string]: last - i, ["--tint" as string]: `var(--${TINTS[i % TINTS.length]})` }}
          >
            <a
              href={p.path}
              aria-current={p.path === here ? "page" : undefined}
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              onPointerEnter={() => setHot(i)}
              onPointerLeave={() => setHot(-1)}
              onFocus={() => setHot(i)}
              onBlur={() => setHot(-1)}
            >
              <span>{String(i).padStart(2, "0")}</span>
              {p.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className="rc-pill__where"
        type="button"
        aria-expanded={open}
        aria-controls="rc-pill-menu"
        onClick={(e) => {
          // A mouse click while the hover has it open should not snap it shut.
          const viaMouse = e.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          setOpen((v) => (viaMouse ? true : !v));
        }}
      >
        <i className="rc-pill__dot" aria-hidden="true" />
        <span className="rc-pill__name">{pageLabel(here)}</span>
        <span className="rc-pill__menuword">Menu</span>
        <svg viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 6l4-4 4 4" />
        </svg>
      </button>
      {here !== "/audit" && (
        <a className="rc-pill__cta" href="/audit" data-cursor="Ask">
          Get your audit
          <Arrow />
        </a>
      )}
    </nav>
  );
}
