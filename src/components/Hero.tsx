import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Hero = () => {
  const [showScroll, setShowScroll] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="dark-section relative flex h-svh items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 60% 40%, rgba(115,47,55,0.15), transparent 60%), var(--midnight-green)`,
      }}
    >
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mb-6 font-body text-[12px] font-normal uppercase tracking-[0.35em] text-text-muted-dark"
        >
          Revenue Capture Agency
        </motion.p>

        <h1 className="font-heading font-black leading-[0.92] text-dutch-white" style={{ fontSize: "clamp(72px, 10vw, 130px)" }}>
          {["Revenue.", "Captured."].map((word, i) => (
            <motion.span
              key={word}
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.7, ease }}
            >
              {word === "Captured." ? (
                <>Captured<span className="text-wine">.</span></>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease }}
          className="mx-auto mt-8 max-w-[560px] font-body text-[clamp(17px,2vw,22px)] font-light leading-relaxed text-text-muted-dark"
        >
          We build, market, and convert — turning your vision into a profitable reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={openModal}
            className="rounded-[4px] bg-wine px-8 py-3.5 font-heading text-[15px] font-semibold text-dutch-white transition-colors duration-200 hover:bg-accent-hover"
          >
            Get Your Free Audit
          </button>
          <a
            href="#work"
            className="rounded-[4px] border-[1.5px] border-dutch-white/40 px-8 py-3.5 font-heading text-[15px] font-medium text-dutch-white transition-colors duration-200 hover:border-dutch-white"
          >
            See Our Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500"
        style={{ opacity: showScroll ? 1 : 0 }}
      >
        <div className="relative h-10 w-[2px] bg-dutch-white/30">
          <div className="scroll-dot-anim absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-dutch-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
