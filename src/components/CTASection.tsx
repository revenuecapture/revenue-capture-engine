import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CTASection = () => {
  const { openModal } = useModal();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  const words = ["Your", "revenue", "is", "waiting."];

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden py-[180px] px-6 md:px-10"
      style={{ background: "var(--wine)" }}
    >
      {/* Animated blobs on wine bg */}
      <motion.div className="blob-a pointer-events-none absolute rounded-full" style={{
        width: "700px", height: "700px", top: "-30%", left: "-15%",
        background: "radial-gradient(circle, rgba(0,0,0,0.25) 0%, transparent 70%)",
        filter: "blur(80px)", scale: blobScale,
      }} />
      <motion.div className="blob-b pointer-events-none absolute rounded-full" style={{
        width: "600px", height: "600px", bottom: "-20%", right: "-10%",
        background: "radial-gradient(circle, rgba(55,93,138,0.35) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />
      <div className="blob-c pointer-events-none absolute rounded-full" style={{
        width: "500px", height: "400px", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(115,47,55,0.4) 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div className="relative z-10 mx-auto max-w-[900px] text-center">
        <h2 className="font-heading font-black text-dutch-white leading-[0.95]" style={{ fontSize: "clamp(52px, 7vw, 100px)" }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.22em] inline-block"
              initial={{ opacity: 0, y: 80, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mx-auto mt-8 max-w-[520px] font-body text-[19px] font-light leading-relaxed"
          style={{ color: "rgba(239,223,187,0.75)" }}
        >
          Start with a free audit. No commitment. No pitch. Just a clear picture of where your revenue is going and how to capture it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease, type: "spring", stiffness: 120 }}
          className="mt-12"
        >
          <button onClick={openModal} className="btn-inverted">
            Get Your Free Audit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
