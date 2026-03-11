import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CTASection = () => {
  const { openModal } = useModal();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Orbs shift horizontally as user scrolls through section
  const orbX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const words = ["Your", "revenue", "is", "waiting."];

  return (
    <section
      ref={ref}
      id="cta"
      className="relative overflow-hidden py-[160px] px-6 md:px-12"
      style={{ background: "var(--wine)" }}
    >
      {/* Parallax orbs */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ x: orbX }} aria-hidden>
        <div className="orb orb-a absolute"
          style={{
            top: "-20%", left: "15%",
            width: "min(60vw, 700px)", height: "min(60vw, 700px)",
            background: "radial-gradient(circle, rgba(115,47,55,0.75) 0%, transparent 65%)",
            filter: "blur(clamp(50px,7vw,100px))",
          }}
        />
        <div className="orb orb-b absolute"
          style={{
            bottom: "-20%", right: "10%",
            width: "min(50vw, 600px)", height: "min(50vw, 600px)",
            background: "radial-gradient(circle, rgba(55,93,138,0.5) 0%, transparent 65%)",
            filter: "blur(clamp(50px,7vw,95px))",
            animationDelay: "5s",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[920px] text-center">
        <h2
          className="font-heading font-black leading-[0.95]"
          style={{ fontSize: "clamp(48px, 6.5vw, 100px)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.22em] inline-block"
              style={{ color: "var(--dutch-white)" }}
              initial={{ opacity: 0, y: 70, rotate: i % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mx-auto mt-8 max-w-[540px] font-body font-light leading-relaxed"
          style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "rgba(239,223,187,0.72)" }}
        >
          Start with a free audit. No commitment. No pitch. Just a clear picture of where your revenue is going and how to capture it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-11"
        >
          <button onClick={openModal} className="btn-inverted px-11 py-[15px] text-[16px]">
            Get Your Free Audit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
