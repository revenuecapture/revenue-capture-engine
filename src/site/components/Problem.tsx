import { useEffect, useRef } from "react";
import { problem } from "../content";
import { clamp01, onScrollFrame, prefersReducedMotion } from "../lib/motion";

/** The statement fills in word by word as it travels up the screen. */
export default function Problem() {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = text.current;
    if (!el || prefersReducedMotion()) return;
    return onScrollFrame((vh) => {
      const r = el.getBoundingClientRect();
      const p = clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.42));
      el.style.setProperty("--p", p.toFixed(4));
    });
  }, []);

  const n = problem.statement.length;

  return (
    <section className="rc-state" id="problem" data-theme="light">
      <p className="rc-label" data-reveal>
        {problem.label}
      </p>
      <p className="rc-state__text" ref={text} style={{ ["--n" as string]: n }}>
        {problem.statement.map((w, i) => (
          <span key={i}>
            <span className={`rc-word${w.mark ? " rc-word--mark" : ""}`} style={{ ["--i" as string]: i }}>
              {w.t}
            </span>{" "}
          </span>
        ))}
      </p>
      <div className="rc-state__foot">
        <p className="rc-state__aside" data-reveal>
          {problem.aside}
        </p>
        <p className="rc-state__promise" data-reveal style={{ ["--d" as string]: 120 }}>
          {problem.promise}
          <i className="rc-dot">.</i>
        </p>
      </div>
    </section>
  );
}
