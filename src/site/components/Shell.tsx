import { useEffect, useState, type ReactNode } from "react";
import { ask, brand, pages } from "../content";
import { watchReveals } from "../lib/motion";
import { useMagnetic } from "./Cursor";

export const Arrow = ({ down = false }: { down?: boolean }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {down ? <path d="M8 2v12M3 9l5 5 5-5" /> : <path d="M2 8h12M9 3l5 5-5 5" />}
  </svg>
);

/** Sets the tab title and arms scroll reveals for whichever page just mounted. */
export function usePage(title: string) {
  useEffect(() => {
    document.title = title;
    return watchReveals();
  }, [title]);
}

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

export const Tri = ({ className = "" }: { className?: string }) => (
  <div className={`rc-tri ${className}`} aria-hidden="true">
    <i />
    <i />
    <i />
  </div>
);

export const Lines = () => (
  <div className="rc-lines" aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
  </div>
);

export function TopBar() {
  return (
    <div className="rc-top rc-label">
      <a className="rc-top__logo" href="/" aria-label="revCap home">
        <img src="/brand/revcap-ash.svg" alt="revCap" width="132" height="43" />
      </a>
      <p className="rc-top__meta" data-intro style={{ ["--d" as string]: 250 }}>
        {brand.descriptor}
      </p>
      <p className="rc-top__clock" data-intro style={{ ["--d" as string]: 320 }}>
        {brand.city} <Clock />
      </p>
    </div>
  );
}

/** Opening block for every page except Home: label, giant title, short lede. */
export function PageHero({
  label,
  lines,
  lede,
  compact = false,
  children,
}: {
  label?: string;
  lines: readonly string[];
  lede?: string;
  /** A shorter hero, for pages where something else must sit above the fold. */
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={`rc-phero${compact ? " rc-phero--compact" : ""}`} data-theme="light">
      <Lines />
      <TopBar />
      <div className="rc-phero__body">
        {label && (
          <p className="rc-label rc-phero__label" data-intro style={{ ["--d" as string]: 200 }}>
            {label}
          </p>
        )}
        <h1
          className="rc-phero__title"
          style={{ ["--chars" as string]: Math.max(...lines.map((l, i) => l.length + (i === lines.length - 1 ? 1 : 0))) }}
        >
          {lines.map((line, i) => (
            <span className="rc-line" key={line}>
              <span>
                {line}
                {i === lines.length - 1 && <i className="rc-dot">.</i>}
              </span>
            </span>
          ))}
        </h1>
        {(lede || children) && (
          <div className="rc-phero__aside" data-intro style={{ ["--d" as string]: 420 }}>
            {lede && <p className="rc-phero__lede">{lede}</p>}
            {children}
          </div>
        )}
      </div>
      <Tri className="rc-phero__tri" />
    </header>
  );
}

/** The closing band on every page that is not the audit page itself. */
export function Closing() {
  const cta = useMagnetic<HTMLAnchorElement>(8);
  return (
    <section className="rc-close" data-theme="light">
      <p className="rc-label" data-reveal>
        {ask.label}
      </p>
      <h2 className="rc-close__title" data-reveal="lines">
        <span className="rc-line">
          <span>{ask.titleLines[0]}</span>
        </span>
        <span className="rc-line">
          <span>
            {ask.titleLines[1]}
            <i className="rc-dot">.</i>
          </span>
        </span>
      </h2>
      <div className="rc-close__foot" data-reveal>
        <p>{ask.sub}</p>
        <a className="rc-btn rc-btn--primary rc-btn--lg" href="/audit" data-cursor="Ask" ref={cta}>
          Get your free audit
          <Arrow />
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="rc-foot" data-theme="dark">
      <nav className="rc-foot__nav" aria-label="Pages">
        {pages.map((p, i) => (
          <a key={p.path} href={p.path}>
            <span>{String(i).padStart(2, "0")}</span>
            {p.label}
          </a>
        ))}
      </nav>
      <img className="rc-foot__mark" src="/brand/revcap-inverted.svg" alt="revCap" width="454" height="148" loading="lazy" />
      <div className="rc-foot__grid">
        <div>
          <p className="rc-label">Write to us</p>
          <ul>
            {brand.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`}>{e}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="rc-label">Right now in {brand.city}</p>
          <p>
            <Clock />
          </p>
        </div>
        <div>
          <p className="rc-label">The small print</p>
          <p>
            <a href="/privacy">Privacy</a>
          </p>
        </div>
        <p className="rc-foot__fine">
          &copy; {new Date().getFullYear()} {brand.name}
          <br />
          {brand.line}
        </p>
      </div>
    </footer>
  );
}
