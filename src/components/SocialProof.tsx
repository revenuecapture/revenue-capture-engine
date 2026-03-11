import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const clients = ["Beaconhouse Group", "StudyIn", "ASFE Consultants", "AMET Education", "PhatLoot Studios", "Verbaly"];

const stats = [
  { value: "$840,994", label: "Raised on Kickstarter for PhatLoot Studios" },
  { value: "$1M+", label: "Spent on B2B lead generation" },
  { value: "$3.4M", label: "Generated in revenue for clients" },
];

const SocialProof = () => (
  <>
    <section
      id="work"
      className="relative overflow-hidden py-[140px] px-6 md:px-10"
      style={{
        background: `
          radial-gradient(ellipse at 0% 50%, rgba(55,93,138,0.1), transparent 50%),
          var(--bg-light)
        `,
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            Proof of Work
          </p>
          <h2
            className="font-heading font-black text-text-primary-light"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}
          >
            We've done this before<span className="text-wine">.</span>
          </h2>
          <p className="mt-4 font-heading text-[22px] font-bold text-wine">
            Not what we can do. What we have done.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="grid grid-cols-2 gap-3"
          >
            {clients.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="rounded-[4px] bg-text-primary-light/[0.08] px-5 py-2.5 text-center font-body text-[14px] font-medium uppercase tracking-[0.15em] text-text-primary-light"
              >
                {c}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative"
          >
            <span className="absolute -top-4 -left-2 font-heading text-[120px] font-black leading-none text-wine/30 select-none">
              &ldquo;
            </span>
            <blockquote className="pt-12 font-body text-[20px] font-light leading-relaxed text-text-primary-light">
              revCap helped us go from just an idea to a sustainable business with consistent revenue. Their end-to-end approach meant I could focus on teaching while they handled the marketing and sales. True partners in growth.
            </blockquote>
            <p className="mt-6 font-heading text-[14px] font-semibold uppercase tracking-[0.2em] text-wine">
              Verbaly
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stat strip */}
    <div
      className="dark-section relative overflow-hidden py-[72px] px-6 md:px-10"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, rgba(55,93,138,0.2), transparent 60%),
          var(--midnight-green)
        `,
      }}
    >
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-12 text-center md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease }}
          >
            <p className="stat-number font-heading text-[56px] font-black text-dutch-white leading-none">
              {stat.value}
            </p>
            <p className="mt-3 font-body text-[14px] font-light text-text-muted-dark">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </>
);

export default SocialProof;
