import { useEffect, useRef } from "react";
import { framework, steps } from "../content";
import { clamp01, onScrollFrame, prefersReducedMotion } from "../lib/motion";
import { Arrow } from "./Shell";

/**
 * Four full-screen panels that stack. Each sticks to the top while the next
 * slides over it. Grey throughout; each step's numeral carries its one accent.
 */
export function Panels() {
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
    <section className="rc-fw" data-theme="dark">
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
                <ul className="rc-fw__inc">
                  {s.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Home page teaser: the four steps as large rows, leading to the Framework page. */
export function FrameworkIndex() {
  return (
    <section className="rc-fwi" data-theme="dark">
      <div className="rc-fwi__head">
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
      <ol className="rc-rows">
        {steps.map((s, i) => (
          <li key={s.n} data-reveal style={{ ["--d" as string]: i * 70 }}>
            <a
              className="rc-row"
              href="/framework"
              data-cursor="Open"
              style={{ ["--accent" as string]: `var(--${s.accent})` }}
            >
              <span className="rc-row__n">{s.n}</span>
              <span className="rc-row__t">{s.title}</span>
              <span className="rc-row__d">{s.short}</span>
              <span className="rc-row__go">
                <Arrow />
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className="rc-fwi__more" data-reveal>
        <a className="rc-link" href="/framework">
          {framework.indexCta}
        </a>
      </p>
    </section>
  );
}
