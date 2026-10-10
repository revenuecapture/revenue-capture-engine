// One component per page. Shared pieces live in ./components.
import { useEffect, useRef, useState } from "react";
import { about, ask, audits, framework, pages, pricing, privacy, steps, work, type Word } from "./content";
import { clamp01, onScrollFrame, prefersReducedMotion, scrollToId } from "./lib/motion";
import Hero from "./components/Hero";
import Proof, { Brands, Mark, Stats } from "./components/Proof";
import Problem from "./components/Problem";
import { FrameworkDetail, FrameworkStack } from "./components/Framework";
import AskForm from "./components/Ask";
import { Arrow, Closing, PageHero, usePage } from "./components/Shell";

const title = (path: string) => pages.find((p) => p.path === path)?.title ?? "revCap";

/** A large paragraph that fills in word by word as it scrolls up the screen. */
function FillText({ words, className = "" }: { words: Word[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return onScrollFrame((vh) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--p", clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.42)).toFixed(4));
    });
  }, []);
  return (
    <p className={`rc-state__text ${className}`} ref={ref} style={{ ["--n" as string]: words.length }}>
      {words.map((w, i) => (
        <span key={i}>
          <span className={`rc-word${w.mark ? " rc-word--mark" : ""}`} style={{ ["--i" as string]: i }}>
            {w.t}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}

/**
 * The three audits as large cards. With `onPick` they are buttons that choose
 * an audit on this page; without it they are links that open the audit page
 * with that audit already selected.
 */
function AuditCards({ picked, onPick }: { picked?: string; onPick?: (title: string) => void }) {
  return (
    <ol className="rc-cards">
      {audits.items.map((a, i) => {
        const isPicked = picked === a.title;
        const inner = (
          <>
            <span className="rc-card__n">{a.n}</span>
            <span className="rc-label">{a.tag}</span>
            <strong className="rc-card__t">{a.title}</strong>
            <span className="rc-card__b">{a.body}</span>
            <span className="rc-card__go">
              {isPicked ? "Selected" : "Choose this audit"}
              <Arrow down={Boolean(onPick)} />
            </span>
          </>
        );
        return (
          <li
            className={`rc-card${isPicked ? " is-picked" : ""}`}
            key={a.title}
            data-reveal={onPick ? undefined : true}
            data-intro={onPick ? true : undefined}
            style={{
              ["--accent" as string]: `var(--${a.accent})`,
              ["--tint" as string]: `var(--${a.tint})`,
              ["--d" as string]: onPick ? 420 + i * 90 : i * 90,
            }}
          >
            {onPick ? (
              <button type="button" className="rc-card__hit" onClick={() => onPick(a.title)} aria-pressed={isPicked} data-cursor="Choose">
                {inner}
              </button>
            ) : (
              <a className="rc-card__hit" href={`/audit?audit=${a.slug}#form`} data-cursor="Choose">
                {inner}
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function AuditTypes() {
  return (
    <section className="rc-audits" data-theme="light" id="audits">
      <div className="rc-sec__head">
        <p className="rc-label" data-reveal>
          {audits.label}
        </p>
        <h2 className="rc-h2" data-reveal>
          {audits.title}
          <i className="rc-dot">.</i>
        </h2>
        <p data-reveal style={{ ["--d" as string]: 120 }}>
          {audits.intro}
        </p>
      </div>
      <AuditCards />
    </section>
  );
}

export function Home() {
  usePage(title("/"));
  return (
    <>
      <Hero />
      <main id="main">
        <Proof />
        <Problem />
        <FrameworkStack />
        <Closing />
      </main>
    </>
  );
}

export function FrameworkPage() {
  usePage(title("/framework"));
  return (
    <>
      <PageHero label={framework.label} lines={framework.titleLines} lede={framework.lede}>
        <ul className="rc-steps rc-steps--stack">
          {steps.map((s) => (
            <li key={s.n} style={{ ["--chip" as string]: `var(--${s.chip})` }}>
              {s.n} {s.title}
            </li>
          ))}
        </ul>
      </PageHero>
      <main id="main">
        <FrameworkDetail />
        <AuditTypes />
        <Closing />
      </main>
    </>
  );
}

export function WorkPage() {
  usePage(title("/work"));
  return (
    <>
      <PageHero label={work.label} lines={work.titleLines} lede={work.lede} />
      <main id="main">
        <section className="rc-proof rc-proof--tight" data-theme="dark">
          <Stats />
          <Brands />
        </section>

        <section className="rc-cases" data-theme="light">
          <div className="rc-sec__head">
            <p className="rc-label" data-reveal>
              Brands we built
            </p>
            <h2 className="rc-h2" data-reveal>
              From zero to market<i className="rc-dot">.</i>
            </h2>
          </div>
          <ol className="rc-rows rc-rows--light">
            {work.cases.map((c, i) => (
              <li key={c.name} data-reveal style={{ ["--d" as string]: i * 60 }}>
                <div className="rc-row rc-row--case">
                  <span className="rc-row__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rc-row__t">{c.name}</span>
                  <span className="rc-row__d">
                    <em>{c.kind}</em>
                    {c.line}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rc-roles" data-theme="dark">
          <div className="rc-sec__head">
            <p className="rc-label" data-reveal>
              What we owned
            </p>
            <h2 className="rc-h2" data-reveal>
              Three kinds of work<i className="rc-dot">.</i>
            </h2>
          </div>
          <div className="rc-roles__grid">
            {work.groups.map((g, i) => (
              <article key={g.title} data-reveal style={{ ["--d" as string]: i * 90 }}>
                <p className="rc-label">{String(i + 1).padStart(2, "0")}</p>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
                <ul>
                  {g.slugs.map((slug) => (
                    <li key={slug}>
                      <Mark slug={slug} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rc-quote" data-theme="light">
          <p className="rc-label" data-reveal>
            In their words
          </p>
          <blockquote data-reveal>
            <p>{work.quote.text}</p>
            <footer>{work.quote.by}</footer>
          </blockquote>
        </section>
        <Closing />
      </main>
    </>
  );
}

export function PricingPage() {
  usePage(title("/pricing"));
  return (
    <>
      <PageHero label={pricing.label} lines={pricing.titleLines} lede={pricing.lede} />
      <main id="main">
        <section className="rc-tiers" data-theme="light">
          <ol>
            {pricing.tiers.map((t, i) => (
              <li
                className={`rc-tier${t.featured ? " is-featured" : ""}`}
                key={t.name}
                data-reveal
                style={{ ["--d" as string]: i * 90 }}
              >
                <p className="rc-label">
                  {String(i + 1).padStart(2, "0")}
                  {t.featured && <span className="rc-tier__flag">Most popular</span>}
                </p>
                <h2>{t.name}</h2>
                <p className="rc-tier__price">
                  {t.price}
                  {t.period && <small>{t.period}</small>}
                </p>
                <p className="rc-tier__share">{t.share || "No revenue share"}</p>
                <p className="rc-tier__ideal">{t.ideal}</p>
                <ul>
                  {t.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className={`rc-btn ${t.featured ? "rc-btn--primary" : "rc-btn--line"}`} href="/audit" data-cursor="Ask">
                  {t.cta}
                  <Arrow />
                </a>
              </li>
            ))}
          </ol>
          <p className="rc-tiers__note" data-reveal>
            {pricing.note}
          </p>
        </section>
        <Closing />
      </main>
    </>
  );
}

export function AboutPage() {
  usePage(title("/about"));
  return (
    <>
      <PageHero label={about.label} lines={about.titleLines} lede={about.lede} />
      <main id="main">
        <section className="rc-state rc-state--solo" data-theme="light">
          <p className="rc-label" data-reveal>
            {about.beliefLabel}
          </p>
          <FillText words={about.belief} />
        </section>

        <section className="rc-team" data-theme="dark">
          <div className="rc-sec__head">
            <p className="rc-label" data-reveal>
              {about.teamLabel}
            </p>
            <h2 className="rc-h2" data-reveal>
              Two people, end to end<i className="rc-dot">.</i>
            </h2>
          </div>
          <div className="rc-team__grid">
            {about.team.map((m, i) => (
              <article key={m.name} data-reveal style={{ ["--d" as string]: i * 120, ["--accent" as string]: `var(--${m.accent})` }}>
                <p className="rc-label">{m.role}</p>
                <h3>
                  {m.name}
                  <i className="rc-dot">.</i>
                </h3>
                <p>{m.body}</p>
                <a className="rc-link" href={`mailto:${m.email}`}>
                  {m.email}
                </a>
              </article>
            ))}
          </div>
        </section>
        <Closing />
      </main>
    </>
  );
}

export function AuditPage() {
  usePage(title("/audit"));
  const [picked, setPicked] = useState("");

  // A link such as /audit?audit=market-gap arrives with that audit already chosen.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("audit");
    const match = audits.items.find((a) => a.slug === slug);
    if (match) setPicked(match.title);
  }, []);

  const pick = (auditTitle: string) => {
    setPicked(auditTitle);
    scrollToId("form", -24);
    window.setTimeout(() => document.getElementById("rc-name")?.focus({ preventScroll: true }), 900);
  };

  return (
    <>
      <PageHero label={ask.label} lines={ask.oneLine} compact />
      <main id="main">
        <section className="rc-pick" data-theme="light">
          <p className="rc-pick__label" data-intro style={{ ["--d" as string]: 360 }}>
            {audits.pickLabel}
          </p>
          <AuditCards picked={picked} onPick={pick} />
        </section>
        <section className="rc-ask" data-theme="light" id="form">
          <div className="rc-ask__grid">
            <div className="rc-ask__lede" data-reveal>
              <p className="rc-label">{picked || "Your details"}</p>
              <p className="rc-ask__sub">{ask.sub}</p>
              <ul className="rc-promises">
                {ask.promises.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <AskForm preset={picked} onAuditChange={setPicked} />
          </div>
        </section>
      </main>
    </>
  );
}

export function PrivacyPage() {
  usePage("Privacy | revCap");
  return (
    <>
      <PageHero label={privacy.label} lines={privacy.titleLines} lede={privacy.status} />
      <main id="main">
        <section className="rc-plain" data-theme="light">
          <ul>
            {privacy.points.map((p) => (
              <li key={p} data-reveal>
                {p}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export function NotFoundPage() {
  usePage("Not found | revCap");
  return (
    <>
      <PageHero label="404" lines={["Nothing", "to capture", "here"]} lede="That page does not exist, or it moved.">
        <a className="rc-btn rc-btn--primary" href="/">
          Back to home
          <Arrow />
        </a>
      </PageHero>
      <main id="main" />
    </>
  );
}
