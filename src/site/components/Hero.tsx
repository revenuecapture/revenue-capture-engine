import { useEffect, useState } from "react";
import { brand, hero, steps } from "../content";
import { useMagnetic } from "./Cursor";

export const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {down ? <path d="M8 2v12M3 9l5 5 5-5" /> : <path d="M2 8h12M9 3l5 5-5 5" />}
  </svg>
);

/** Live local time for the studio's city. Renders empty until mounted. */
export function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: brand.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return <time>{time}</time>;
}

export default function Hero() {
  const cta = useMagnetic<HTMLAnchorElement>(8);
  const badgeText = "THE ASK STARTS HERE · THE ASK STARTS HERE · ";

  return (
    <header className="rc-hero" data-theme="light" data-section="Home">
      <div className="rc-hero__lines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="rc-top rc-label">
        <a className="rc-top__logo" href="/" aria-label="revCap home">
          <img src="/brand/revcap-full-color.svg" alt="revCap" width="132" height="43" />
        </a>
        <p className="rc-top__meta" data-intro style={{ ["--d" as string]: 250 }}>
          {brand.descriptor}
        </p>
        <p className="rc-top__clock" data-intro style={{ ["--d" as string]: 320 }}>
          {brand.city} <Clock />
        </p>
      </div>

      <div className="rc-hero__aside">
        <p className="rc-hero__sub" data-intro style={{ ["--d" as string]: 420 }}>
          {hero.sub}
        </p>
        <div className="rc-hero__actions" data-intro style={{ ["--d" as string]: 520 }}>
          <a className="rc-btn rc-btn--primary" href="#ask" data-cursor="Ask" ref={cta}>
            {hero.cta}
            <Arrow />
          </a>
          <a className="rc-link" href="#framework">
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

      <div className="rc-tri rc-hero__tri" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </header>
  );
}
