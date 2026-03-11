import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const spring = [0.34, 1.56, 0.64, 1] as const;

const clients = [
  "Beaconhouse Group",
  "StudyIn",
  "ASFE Consultants",
  "AMET Education",
  "PhatLoot Studios",
  "Verbaly",
];

const stats = [
  { value: "$840,994", label: "Raised on Kickstarter for PhatLoot Studios" },
  { value: "$1M+",     label: "Spent on B2B lead generation" },
  { value: "$3.4M",    label: "Generated in revenue for clients" },
];

const SocialProof = () => (
  <>
    <section
      id="work"
      className="relative overflow-hidden py-[140px] px-6 md:px-12"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="orb orb-b pointer-events-none absolute"
        style={{
          top: "15%", left: "-8%",
          width: "min(50vw, 600px)", height: "min(50vw, 600px)",
          background: "radial-gradient(circle, rgba(55,93,138,0.2) 0%, transparent 70%)",
          filter: "blur(clamp(55px,7vw,100px))",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-5 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            Proof of Work
          </p>
          <h2
            className="font-heading font-black text-text-primary-light"
            style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1 }}
          >
            We've done this before<span className="text-wine">.</span>
          </h2>
          <p className="mt-4 font-heading font-bold text-wine" style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}>
            Not what we can do. What we have done.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Client grid */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {clients.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -60, scale: 0.88 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="cursor-default rounded-lg px-5 py-3 text-center font-body font-medium uppercase tracking-[0.15em] text-text-primary-light"
                style={{
                  fontSize: "clamp(12px, 1.3vw, 14px)",
                  background: "rgba(7,55,58,0.09)",
                  border: "1px solid rgba(7,55,58,0.08)",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(115,47,55,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(7,55,58,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(7,55,58,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(7,55,58,0.09)";
                }}
              >
                {c}
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <span className="absolute -top-4 -left-2 select-none font-heading text-[130px] font-black leading-none text-wine/20">
              &ldquo;
            </span>
            <blockquote className="pt-14 font-body font-light leading-relaxed text-text-primary-light" style={{ fontSize: "clamp(18px, 2vw, 22px)" }}>
              revCap helped us go from just an idea to a sustainable business with consistent revenue. Their end-to-end approach meant I could focus on teaching while they handled the marketing and sales. True partners in growth.
            </blockquote>
            <p className="mt-6 font-heading text-[14px] font-semibold uppercase tracking-[0.25em] text-wine">
              Verbaly
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Stat Strip ── */}
    <div
      className="relative overflow-hidden py-[90px] px-6 md:px-12"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* Center orb behind stats */}
      <div className="orb orb-a pointer-events-none absolute"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(80vw, 900px)", height: "min(40vw, 400px)",
          background: "radial-gradient(ellipse, rgba(55,93,138,0.32) 0%, transparent 70%)",
          filter: "blur(clamp(60px,8vw,110px))",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-12 text-center md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 55, scale: 0.78 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.14, ease: spring }}
          >
            <p
              className="font-heading font-black leading-none"
              style={{
                fontSize: "clamp(48px, 6vw, 70px)",
                background: "linear-gradient(135deg, var(--dutch-white) 0%, rgba(239,223,187,0.65) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.value}
            </p>
            <div className="mx-auto mt-4 h-px w-10" style={{ background: "var(--wine)" }} />
            <p className="mt-4 font-body font-light text-text-muted-dark" style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </>
);

export default SocialProof;
