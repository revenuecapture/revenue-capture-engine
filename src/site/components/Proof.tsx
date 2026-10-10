import { useEffect, useRef } from "react";
import { logos, proof } from "../content";
import { onFrame, prefersReducedMotion } from "../lib/motion";

type Stat = { prefix: string; value: number; suffix: string; label: string; accent: string; decimals?: number };

const format = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up once when it scrolls into view. The final value is in the HTML from the start. */
function Count({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    const decimals = stat.decimals ?? 0;
    let off: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1500;
        off = onFrame((now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(stat.value * eased, decimals);
          if (t === 1) off?.();
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      off?.();
    };
  }, [stat]);

  return <span ref={ref}>{format(stat.value, stat.decimals ?? 0)}</span>;
}

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="rc-marquee__set" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.slug}>
          <span
            className="rc-mark"
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : l.name}
            style={{
              ["--w" as string]: `${l.w}px`,
              ["--h" as string]: `${l.h}px`,
              ["--src" as string]: `url(/logos/${l.slug}.png)`,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

/** Auto-scrolling strip that can be dragged. With reduced motion it becomes a static wrapped row. */
function Marquee() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const still = typeof window !== "undefined" && prefersReducedMotion();

  useEffect(() => {
    const el = wrap.current;
    const tr = track.current;
    if (!el || !tr || prefersReducedMotion()) return;

    const baseSpeed = 0.045; // px per ms
    let x = 0;
    let velocity = -baseSpeed;
    let half = tr.scrollWidth / 2;
    let dragging = false;
    let lastX = 0;
    let visible = true;

    const measure = () => {
      half = tr.scrollWidth / 2;
    };
    const ro = new ResizeObserver(measure);
    ro.observe(tr);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const off = onFrame((_, dt) => {
      if (!visible || !half) return;
      if (!dragging) {
        velocity += (-baseSpeed - velocity) * 0.04;
        x += velocity * dt;
      }
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      tr.style.transform = `translate3d(${x}px, 0, 0)`;
    });

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.classList.add("is-dragging");
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      x += dx;
      velocity = dx / 16;
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      off();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className={`rc-marquee${still ? " rc-marquee--static" : ""}`} ref={wrap} data-cursor={still ? undefined : "Drag"}>
      <div className="rc-marquee__track" ref={track}>
        <LogoSet />
        {!still && <LogoSet hidden />}
      </div>
    </div>
  );
}

export default function Proof() {
  return (
    <section className="rc-proof" id="proof" data-theme="dark" data-section="Proof">
      <div className="rc-proof__head">
        <p className="rc-label" data-reveal>
          {proof.label}
        </p>
        <h2 className="rc-h2" data-reveal>
          {proof.title}
          <i className="rc-dot">.</i>
        </h2>
      </div>

      <ol className="rc-stats">
        {(proof.stats as Stat[]).map((s, i) => (
          <li
            className="rc-stat"
            key={s.label}
            data-reveal
            style={{ ["--stat" as string]: `var(--${s.accent})`, ["--d" as string]: i * 90 }}
          >
            <p className="rc-stat__n">
              <small>{s.prefix}</small>
              <Count stat={s} />
              {s.suffix}
            </p>
            <p className="rc-stat__l">{s.label}</p>
          </li>
        ))}
      </ol>

      <div className="rc-brands" data-reveal>
        <p className="rc-label">{proof.marqueeLabel}</p>
        <Marquee />
      </div>
    </section>
  );
}
