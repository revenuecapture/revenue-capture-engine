import { hero, steps } from "../content";
import { useMagnetic } from "./Cursor";
import { Arrow, Lines, TopBar, Tri } from "./Shell";

export default function Hero() {
  const cta = useMagnetic<HTMLAnchorElement>(8);
  const badgeText = "THE ASK STARTS HERE · THE ASK STARTS HERE · ";

  return (
    <header className="rc-hero" data-theme="light">
      <Lines />
      <TopBar />

      <div className="rc-hero__aside">
        <p className="rc-hero__sub" data-intro style={{ ["--d" as string]: 420 }}>
          {hero.sub}
        </p>
        <div className="rc-hero__actions" data-intro style={{ ["--d" as string]: 520 }}>
          <a className="rc-btn rc-btn--primary" href="/audit" data-cursor="Ask" ref={cta}>
            {hero.cta}
            <Arrow />
          </a>
          <a className="rc-link" href="/framework">
            {hero.secondary}
          </a>
        </div>
      </div>

      <h1 className="rc-hero__title">
        <span className="rc-line">
          <span>{hero.lines[0]}</span>
        </span>
        <span className="rc-line">
          <span>
            {hero.lines[1].replace(/\.$/, "")}
            <i className="rc-dot">.</i>
          </span>
        </span>
      </h1>

      <div className="rc-hero__foot">
        <ul className="rc-steps" data-intro style={{ ["--d" as string]: 640 }}>
          {steps.map((s) => (
            <li key={s.n} style={{ ["--chip" as string]: `var(--${s.chip})` }}>
              {s.n} {s.title}
            </li>
          ))}
        </ul>
        <a className="rc-badge" href="#proof" aria-label="Scroll to proof of work" data-intro style={{ ["--d" as string]: 700 }}>
          <svg className="rc-badge__ring" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="rc-badge-path" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" />
            </defs>
            <text>
              <textPath href="#rc-badge-path" textLength="292" lengthAdjust="spacing">
                {badgeText}
              </textPath>
            </text>
          </svg>
          <span className="rc-badge__core">
            <Arrow down />
          </span>
        </a>
      </div>

      <Tri className="rc-hero__tri" />
    </header>
  );
}
