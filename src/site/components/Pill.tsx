import { useEffect, useRef, useState } from "react";
import { hero, nav } from "../content";
import { onScrollFrame } from "../lib/motion";
import { Arrow } from "./Hero";

/**
 * The site's only persistent navigation. Left side names the section in view
 * and opens the section list. Right side is always the audit call to action.
 */
export default function Pill() {
  const [where, setWhere] = useState("Home");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let current = "";
    return onScrollFrame((vh) => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let name = current;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) name = s.dataset.section ?? name;
      });
      if (name !== current) {
        current = name;
        setWhere(name);
      }
    });
  }, []);

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
    <nav className={`rc-pill${where === "The ask" ? " is-away" : ""}`} aria-label="Sections" ref={ref}>
      {open && (
        <ul className="rc-pill__menu" id="rc-pill-menu">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={item.label === where || undefined} onClick={() => setOpen(false)}>
                <span>{String(i).padStart(2, "0")}</span>
                {item.label}
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
        <span className="rc-pill__name">{where}</span>
        <svg viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M1 6l4-4 4 4" />
        </svg>
      </button>
      <a className="rc-pill__cta" href="#ask" data-cursor="Ask">
        {hero.cta.replace("Get your free", "Get your")}
        <Arrow />
      </a>
    </nav>
  );
}
