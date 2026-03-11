import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ProblemPromise = () => (
  <section id="about" className="bg-bg-light py-[120px] px-6 md:px-10">
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="md:border-r md:border-text-primary-light/15 md:pr-12"
      >
        <p className="mb-4 font-body text-[13px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
          The Problem
        </p>
        <p className="max-w-[480px] font-body text-[20px] font-light leading-relaxed text-text-primary-light">
          Fragmented marketing efforts lead to wasted resources. Businesses often have a brand but no system to capture revenue — or a sales team with no leads to convert.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="mb-4 font-body text-[13px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
          The Promise
        </p>
        <p className="max-w-[480px] font-body text-[20px] font-light leading-relaxed text-text-primary-light">
          revCap is an end-to-end, done-for-you Revenue Capture system. We build, market, and convert — closing the gap between marketing spend and actual money.
        </p>
        <p className="mt-6 font-heading text-[22px] font-bold text-wine">
          We are the only agency with skin in the game.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemPromise;
