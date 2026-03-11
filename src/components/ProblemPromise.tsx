import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ProblemPromise = () => (
  <section
    id="about"
    className="relative overflow-hidden py-[120px] px-6 md:px-10"
    style={{
      background: `
        radial-gradient(ellipse at 100% 50%, rgba(55,93,138,0.12), transparent 60%),
        var(--bg-light)
      `,
    }}
  >
    <div className="mx-auto max-w-[1280px]">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

        {/* Divider line — desktop only */}
        <div className="absolute left-1/2 top-[15%] hidden h-[70%] w-px bg-text-primary-light/10 md:block" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[11px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            The Problem
          </p>
          <p className="font-body text-[18px] font-light leading-relaxed text-text-primary-light">
            Fragmented marketing efforts lead to wasted resources. Businesses often have a brand but no system to capture revenue. Or a sales team with no leads to convert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[11px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            The Promise
          </p>
          <p className="font-body text-[18px] font-light leading-relaxed text-text-primary-light">
            revCap is an end-to-end, done-for-you Revenue Capture system. We build, market, and convert. Closing the gap between marketing spend and actual money.
          </p>
          <p className="mt-6 font-heading text-[20px] font-bold text-wine">
            We are the only agency with skin in the game.
          </p>
        </motion.div>

      </div>
    </div>
  </section>
);

export default ProblemPromise;
