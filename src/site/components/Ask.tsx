import { useState, type ChangeEvent, type FormEvent } from "react";
import { ask, brand } from "../content";
import { Arrow, Clock } from "./Hero";
import { useMagnetic } from "./Cursor";

type Status = "idle" | "submitting" | "success" | "error";

// Same Web3Forms inbox the live site already posts to. Moves to Netlify Forms in Phase 4.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const FORM_KEY = "0adbb756-64a7-44b8-b1f4-26b3dbe0cc33";

const empty = { name: "", business: "", email: "", auditType: "", message: "" };

export default function Ask() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const button = useMagnetic<HTMLButtonElement>(8);

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `revCap Audit Request: ${form.auditType || "General"}`,
          from_name: form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm(empty);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const note =
    status === "success" ? ask.success : status === "error" ? ask.error : "Takes under a minute.";

  return (
    <section className="rc-ask" id="ask" data-theme="light" data-section="The ask">
      <h2 className="rc-ask__title" data-reveal="lines">
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

      <div className="rc-ask__grid">
        <div className="rc-ask__lede" data-reveal>
          <p className="rc-label">{ask.label}</p>
          <p className="rc-ask__sub">{ask.sub}</p>
          <ul className="rc-promises">
            {ask.promises.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <form className="rc-form" onSubmit={submit} data-reveal style={{ ["--d" as string]: 120 }}>
          <div className="rc-field">
            <label htmlFor="rc-name">Your name</label>
            <input id="rc-name" name="name" required autoComplete="name" value={form.name} onChange={change} />
          </div>
          <div className="rc-field">
            <label htmlFor="rc-business">Business</label>
            <input
              id="rc-business"
              name="business"
              required
              autoComplete="organization"
              value={form.business}
              onChange={change}
            />
          </div>
          <div className="rc-field">
            <label htmlFor="rc-email">Work email</label>
            <input
              id="rc-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={change}
            />
          </div>
          <div className="rc-field">
            <label htmlFor="rc-audit">Audit</label>
            <select id="rc-audit" name="auditType" required value={form.auditType} onChange={change}>
              <option value="" disabled>
                Choose one
              </option>
              {ask.auditTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="rc-field rc-field--wide">
            <label htmlFor="rc-message">
              Anything we should know <em>(optional)</em>
            </label>
            <textarea id="rc-message" name="message" rows={2} value={form.message} onChange={change} />
          </div>
          <div className="rc-form__foot">
            <button
              className="rc-btn rc-btn--primary"
              type="submit"
              disabled={status === "submitting"}
              data-cursor="Ask"
              ref={button}
            >
              {status === "submitting" ? "Sending" : ask.submit}
              <Arrow />
            </button>
            <p className="rc-form__note" data-state={status} role="status" aria-live="polite">
              {note}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="rc-foot" data-theme="dark" data-section="Contact">
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
          <p className="rc-label">What we are</p>
          <p>{brand.descriptor}</p>
        </div>
        <p className="rc-foot__fine">
          &copy; {new Date().getFullYear()} {brand.name}
          <br />
          Rooted in marketing. Built for sales.
        </p>
      </div>
    </footer>
  );
}
