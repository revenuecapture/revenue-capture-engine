import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const clients = ["Beaconhouse Group", "StudyIn", "ASFE Consultants", "AMET Education", "PhatLoot Studios", "Verbaly"];

const stats = [
  { value: "NZ$ 840,994", label: "Raised on Kickstarter for PhatLoot Studios" },
  { value: "5x", label: "Return on Ad Spend for StudyIn / British Council" },
  { value: "USD 50M+", label: "Annual media budgets managed" },
];

const SocialProof = () => (
  <>
    <section id="work" className="bg-bg-light py-[140px] px-6 md:px-10">
      <div className="mx-auto max-w-[1280px]">
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
          Not what we can do — what we have done.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-2 gap-3"
          >
            {clients.map((c) => (
              <div
                key={c}
                className="rounded-[4px] bg-text-primary-light/[0.08] px-5 py-2.5 text-center font-body text-[15px] font-semibold uppercase tracking-[0.15em] text-text-primary-light"
              >
                {c}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="relative"
          >
            <span className="absolute -top-4 -left-2 font-heading text-[120px] font-black leading-none text-wine/30 select-none">
              &ldquo;
            </span>
            <blockquote className="pt-12 font-body text-[20px] font-normal leading-relaxed text-text-primary-light">
              RevCap helped us go from just an idea to a sustainable business with consistent revenue. Their end-to-end approach meant I could focus on teaching while they handled the marketing and sales. They are true partners in growth.
            </blockquote>
            <p className="mt-6 font-heading text-[14px] font-semibold uppercase tracking-[0.2em] text-wine">
              — Verbaly
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stat strip */}
    <div className="dark-section bg-midnight-green py-[72px] px-6 md:px-10">
      <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-12 text-center md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease }}
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
