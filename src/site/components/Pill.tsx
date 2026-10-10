import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { pageLabel, pages } from "../content";
import { Arrow } from "./Shell";

/**
 * The site's navigation. Left side names the page you are on and opens the
 * page list. Right side is always the audit call to action.
 */
export default function Pill() {
  const { pathname } = useLocation();
  const here = pathname.replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [here]);

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

  return (
    <nav className="rc-pill" aria-label="Pages" ref={ref}>
      {open && (
        <ul className="rc-pill__menu" id="rc-pill-menu">
          {pages.map((p, i) => (
            <li key={p.path}>
              <a href={p.path} aria-current={p.path === here ? "page" : undefined} onClick={() => setOpen(false)}>
                <span>{String(i).padStart(2, "0")}</span>
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        className="rc-pill__where"
        type="button"
        aria-expanded={open}
        aria-controls="rc-pill-menu"
        onClick={() => setOpen((v) => !v)}
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
