import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const auditTypes = [
  "Meta Ads Audit",
  "Digital Presence Audit",
  "Market Gap Audit",
  "Not sure — let revCap decide",
];

const AuditModal = ({ isOpen, onClose }: AuditModalProps) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    auditType: "",
    message: "",
  });

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form on close (after animation)
      const t = setTimeout(() => {
        setForm({ name: "", business: "", email: "", auditType: "", message: "" });
        setStatus("idle");
      }, 400);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          // ─────────────────────────────────────────────────────────
          // IMPORTANT: Replace the value below with your free key.
          // Get it in 30 seconds at https://web3forms.com
          // Enter revenuecapture@gmail.com — submissions will land there.
          // ─────────────────────────────────────────────────────────
          access_key: "YOUR_WEB3FORMS_KEY",
          subject: `revCap Audit Request — ${form.auditType || "General"}`,
          from_name: form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-[4px] border border-dutch-white/10 bg-white/[0.06] px-4 py-3 font-body text-[15px] font-light text-dutch-white placeholder-text-muted-dark outline-none transition-colors duration-200 focus:border-dutch-white/40 focus:bg-white/[0.09]";
  const labelClass = "mb-1.5 block font-body text-[12px] font-normal uppercase tracking-[0.2em] text-text-muted-dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — also serves as the scroll/flex container */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            className="relative z-[110] w-full max-w-[560px] rounded-lg my-auto"
            style={{
              background: "var(--bg-dark)",
              border: "1px solid rgba(239,223,187,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-dutch-white/[0.08] px-8 py-6">
              <div>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-text-muted-dark">
                  Free. No commitment.
                </p>
                <h2 className="mt-1 font-heading text-[26px] font-black text-dutch-white leading-tight">
                  Request Your Free Audit
                  <span className="text-wine">.</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="mt-1 font-heading text-[22px] font-light text-text-muted-dark transition-colors hover:text-dutch-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-7">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="py-10 text-center"
                >
                  <p className="font-heading text-[48px] font-black text-wine">✓</p>
                  <h3 className="mt-4 font-heading text-[24px] font-black text-dutch-white">
                    Request received.
                  </h3>
                  <p className="mt-3 font-body text-[16px] font-light text-text-muted-dark">
                    We'll review your details and be in touch within 24 hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 rounded-[4px] bg-wine px-8 py-3 font-heading text-[14px] font-semibold text-dutch-white transition-colors hover:bg-accent-hover"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Your Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="business" className={labelClass}>Business Name</label>
                      <input
                        id="business"
                        name="business"
                        type="text"
                        required
                        placeholder="Your Company"
                        value={form.business}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="auditType" className={labelClass}>Audit Type</label>
                    <select
                      id="auditType"
                      name="auditType"
                      required
                      value={form.auditType}
                      onChange={handleChange}
                      className={inputClass + " cursor-pointer appearance-none"}
                      style={{ color: form.auditType ? "var(--dutch-white)" : "rgba(239,223,187,0.4)" }}
                    >
                      <option value="" disabled style={{ background: "#07373a" }}>Select an audit type</option>
                      {auditTypes.map((t) => (
                        <option key={t} value={t} style={{ background: "#07373a", color: "var(--dutch-white)" }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Anything we should know? <span className="text-wine/70">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your business, current challenges, or goals..."
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass + " resize-none"}
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-body text-[13px] text-wine">
                      Something went wrong. Please email us directly at{" "}
                      <a href="mailto:info@revcap.online" className="underline">info@revcap.online</a>.
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full rounded-[4px] bg-wine py-3.5 font-heading text-[15px] font-semibold text-dutch-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending..." : "Request My Free Audit"}
                    </button>
                    <p className="mt-3 text-center font-body text-[12px] font-light text-text-muted-dark">
                      No commitment. No pitch. Just clarity.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuditModal;
