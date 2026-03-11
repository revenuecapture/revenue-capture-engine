import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ProblemPromise = () => (
  <section
    id="about"
    className="relative overflow-hidden py-[130px] px-6 md:px-10"
    style={{ background: "var(--bg-light)" }}
  >
    {/* Background blobs */}
    <div className="blob-a pointer-events-none absolute rounded-full" style={{
      width: "700px", height: "500px", top: "-20%", right: "-15%",
      background: "radial-gradient(circle, rgba(55,93,138,0.18) 0%, transparent 70%)",
      filter: "blur(80px)",
    }} />
    <div className="blob-b pointer-events-none absolute rounded-full" style={{
      width: "500px", height: "400px", bottom: "-10%", left: "-10%",
      background: "radial-gradient(circle, rgba(9,82,86,0.14) 0%, transparent 70%)",
      filter: "blur(70px)",
    }} />

    <div className="relative z-10 mx-auto max-w-[1280px]">
      {/* Kicker */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="mb-12 font-body text-[11px] font-normal uppercase tracking-[0.3em] text-text-muted-light"
      >
        Why revCap
      </motion.p>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-28">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -1 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-5 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted-light">
            The Problem
          </p>
          <p className="font-body text-[19px] font-light leading-relaxed text-text-primary-light">
            Fragmented marketing efforts lead to wasted resources. Businesses often have a brand but no system to capture revenue. Or a sales team with no leads to convert.
          </p>
          {/* Accent bar */}
          <div className="mt-8 h-[3px] w-16 rounded-full" style={{ background: "var(--wine)" }} />
        </motion.div>

        {/* Promise */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotate: 1 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <p className="mb-5 font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted-light">
            The Promise
          </p>
          <p className="font-body text-[19px] font-light leading-relaxed text-text-primary-light">
            revCap is an end-to-end, done-for-you Revenue Capture system. We build, market, and convert. Closing the gap between marketing spend and actual money.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-6 font-heading text-[21px] font-bold"
            style={{ color: "var(--wine)" }}
          >
            We are the only agency with skin in the game.
          </motion.p>
          <div className="mt-8 h-[3px] w-16 rounded-full" style={{ background: "var(--federal-blue)" }} />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemPromise;
