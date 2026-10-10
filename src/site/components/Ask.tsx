import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ask } from "../content";
import { Arrow } from "./Shell";
import { useMagnetic } from "./Cursor";

type Status = "idle" | "submitting" | "success" | "error";

// Same Web3Forms inbox the live site already posts to. Moves to Netlify Forms in Phase 4.
const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const FORM_KEY = "0adbb756-64a7-44b8-b1f4-26b3dbe0cc33";

const empty = { name: "", business: "", email: "", auditType: "", message: "" };

/** The audit request form. Posts to the same inbox the live site already uses. */
export default function AskForm({
  preset = "",
  onAuditChange,
}: {
  /** Audit type chosen elsewhere on the page. */
  preset?: string;
  onAuditChange?: (auditType: string) => void;
}) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (preset) setForm((prev) => (prev.auditType === preset ? prev : { ...prev, auditType: preset }));
  }, [preset]);

  const [status, setStatus] = useState<Status>("idle");
  const button = useMagnetic<HTMLButtonElement>(8);

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "auditType") onAuditChange?.(value);
  };

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
  );
}
