import { useEffect, useRef } from "react";
import { framework, steps } from "../content";
import { clamp01, onScrollFrame, prefersReducedMotion } from "../lib/motion";
import { Arrow } from "./Shell";

/**
 * Four full-screen panels that stack. Each sticks to the top while the next
 * slides over it. Grey throughout; each step's numeral carries its one accent.
 *
 * `linked` turns every panel into a link to that step on the Framework page
 * (used on Home). Without it the panels show the fuller detail for each step.
 */
export function Panels({ linked = false }: { linked?: boolean }) {
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
    <ol className="rc-fw__list" ref={list}>
      {steps.map((s) => {
        const body = (
          <>
            <span className="rc-fw__meta rc-label">
              <span>{framework.label}</span>
              <span>
                {s.n} / {String(steps.length).padStart(2, "0")}
              </span>
            </span>
            <span className="rc-fw__num" aria-hidden="true">
              {s.n}
            </span>
            <span className="rc-fw__copy">
              <span className="rc-fw__rule" />
              <strong className="rc-fw__title">{s.title}</strong>
              <span className="rc-fw__body">{s.body}</span>
              {linked ? (
                <span className="rc-fw__open">
                  Open step {s.n}
                  <Arrow />
                </span>
              ) : (
                <span className="rc-fw__inc">
                  {s.includes.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </span>
              )}
            </span>
          </>
        );
        return (
          <li
            className="rc-fw__panel"
            key={s.n}
            id={linked ? undefined : `step-${s.n}`}
            style={{ ["--accent" as string]: `var(--${s.accent})` }}
          >
            {linked ? (
              <a className="rc-fw__inner" href={`/framework#step-${s.n}`} data-cursor="Open">
                {body}
              </a>
            ) : (
              <div className="rc-fw__inner">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Home page: the section heading, then the four stacked panels, each one a link. */
export function FrameworkStack() {
  return (
    <section className="rc-fw" data-theme="dark">
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
      <Panels linked />
    </section>
  );
}

/** Framework page: the panels alone, with full detail. */
export function FrameworkDetail() {
  return (
    <section className="rc-fw" data-theme="dark">
      <Panels />
    </section>
  );
}
