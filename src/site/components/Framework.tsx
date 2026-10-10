import { useEffect, useRef } from "react";
import { framework, steps } from "../content";
import { clamp01, onScrollFrame, prefersReducedMotion } from "../lib/motion";

/**
 * Four full-screen panels that stack. Each sticks to the top while the next
 * slides over it. Grey throughout; each step's numeral carries its one accent.
 */
export default function Framework() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || prefersReducedMotion()) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".rc-fw__panel"));
    const inners = panels.map((p) => p.querySelector<HTMLElement>(".rc-fw__inner"));
    return onScrollFrame((vh) => {
      const tops = panels.map((p) => p.getBoundingClientRect().top);
      panels.forEach((_, i) => {
        const inner = inners[i];
        if (!inner) return;
        const enter = 1 - clamp01(tops[i] / vh);
        const cover = i < panels.length - 1 ? 1 - clamp01(tops[i + 1] / vh) : 0;
        inner.style.setProperty("--enter", enter.toFixed(4));
        inner.style.setProperty("--cover", cover.toFixed(4));
      });
    });
  }, []);

  return (
    <section className="rc-fw" id="framework" data-theme="dark" data-section="Framework">
      <div className="rc-fw__intro">
        <p className="rc-label" data-reveal>
          {framework.label}
        </p>
        <h2 className="rc-h2" data-reveal>
          {framework.title}
          <i className="rc-dot">.</i>
        </h2>
        <p data-reveal style={{ ["--d" as string]: 120 }}>
          {framework.intro}
        </p>
      </div>

      <ol className="rc-fw__list" ref={list}>
        {steps.map((s) => (
          <li className="rc-fw__panel" key={s.n} style={{ ["--accent" as string]: `var(--${s.accent})` }}>
            <div className="rc-fw__inner">
              <p className="rc-fw__meta rc-label">
                <span>{framework.label}</span>
                <span>
                  {s.n} / {String(steps.length).padStart(2, "0")}
                </span>
              </p>
              <span className="rc-fw__num" aria-hidden="true">
                {s.n}
              </span>
              <div className="rc-fw__copy">
                <div className="rc-fw__rule" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
