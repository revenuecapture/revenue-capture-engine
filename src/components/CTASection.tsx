import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CTASection = () => {
  const { openModal } = useModal();
  const words = ["Your", "revenue", "is", "waiting."];

  return (
    <section id="cta" className="bg-wine py-[160px] px-6 md:px-10">
      <div className="mx-auto max-w-[900px] text-center">
        <h2
          className="font-heading font-black text-dutch-white leading-[0.95]"
          style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              {word}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mx-auto mt-8 max-w-[520px] font-body text-[19px] font-light leading-relaxed text-dutch-white/75"
        >
          Start with a free audit. No commitment. No pitch. Just a clear picture of where your revenue is going — and how to capture it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="mt-10"
        >
          <button
            onClick={openModal}
            className="inline-block rounded-[4px] bg-dutch-white px-10 py-4 font-heading text-[15px] font-bold text-wine transition-colors duration-200 hover:bg-bg-light"
          >
            Get Your Free Audit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
