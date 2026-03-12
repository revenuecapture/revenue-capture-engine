import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const ProblemPromise = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
  <section
    ref={sectionRef}
    id="about"
    className="relative overflow-hidden py-[130px] px-6 md:px-12"
    style={{ background: "var(--bg-light)" }}
  >
    {/* Orbs */}
    <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY }} aria-hidden>
      <div className="orb orb-b absolute"
        style={{
          top: "-10%", right: "-5%",
          width: "min(60vw, 700px)", height: "min(60vw, 700px)",
          background: "radial-gradient(circle, rgba(55,93,138,0.28) 0%, transparent 70%)",
          filter: "blur(clamp(55px,7vw,100px))",
        }}
      />
    </motion.div>
    <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY2 }} aria-hidden>
      <div className="orb orb-a absolute"
        style={{
          bottom: "-10%", left: "-5%",
          width: "min(50vw, 580px)", height: "min(50vw, 580px)",
          background: "radial-gradient(circle, rgba(115,47,55,0.26) 0%, transparent 70%)",
          filter: "blur(clamp(50px,6vw,90px))",
          animationDelay: "3s",
        }}
      />
    </motion.div>

    <div className="relative z-10 mx-auto max-w-[1240px]">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-28">

        {/* Vertical divider line — desktop */}
        <div className="pointer-events-none absolute left-1/2 top-[5%] hidden h-[90%] w-px md:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(7,55,58,0.12) 25%, rgba(7,55,58,0.12) 75%, transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-5 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            The Problem
          </p>
          <p className="font-body font-light leading-relaxed text-text-primary-light" style={{ fontSize: "clamp(18px, 2vw, 21px)" }}>
            Fragmented marketing efforts lead to wasted resources. Businesses often have a brand but no system to capture revenue. Or a sales team with no leads to convert.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-5 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            The Promise
          </p>
          <p className="font-body font-light leading-relaxed text-text-primary-light" style={{ fontSize: "clamp(18px, 2vw, 21px)" }}>
            revCap is an end-to-end, done-for-you Revenue Capture system. We build, market, and convert. Closing the gap between marketing spend and actual money.
          </p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-7 font-heading font-bold"
            style={{
              fontSize: "clamp(20px, 2.2vw, 24px)",
              background: "linear-gradient(135deg, var(--wine) 0%, #b04952 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            We are the only agency with skin in the game.
          </motion.p>
        </motion.div>

      </div>
    </div>
  </section>
  );
};

export default ProblemPromise;
