import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Hero = () => {
  const [showScroll, setShowScroll] = useState(true);
  const { openModal } = useModal();
  const { scrollY } = useScroll();

  // Parallax: headline drifts up as user scrolls, tagline drifts slower
  const headlineY  = useTransform(scrollY, [0, 500], [0, -120]);
  const taglineY   = useTransform(scrollY, [0, 500], [0, -60]);
  const blobAY     = useTransform(scrollY, [0, 600], [0, 80]);
  const blobBY     = useTransform(scrollY, [0, 600], [0, -60]);
  const opacity    = useTransform(scrollY, [0, 350], [1, 0]);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setShowScroll(v < 80));
    return unsub;
  }, [scrollY]);

  return (
    <section
      className="dark-section relative flex h-svh items-center justify-center overflow-hidden"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* Animated gradient blobs — visible, not subtle */}
      <motion.div
        className="blob-a pointer-events-none absolute rounded-full"
        style={{
          width: "700px", height: "700px",
          top: "-15%", left: "-10%",
          background: "radial-gradient(circle, rgba(115,47,55,0.45) 0%, transparent 70%)",
          filter: "blur(80px)",
          y: blobAY,
        }}
      />
      <motion.div
        className="blob-b pointer-events-none absolute rounded-full"
        style={{
          width: "600px", height: "600px",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(55,93,138,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          y: blobBY,
        }}
      />
      <div
        className="blob-c pointer-events-none absolute rounded-full"
        style={{
          width: "400px", height: "400px",
          top: "40%", left: "55%",
          background: "radial-gradient(circle, rgba(9,82,86,0.5) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div className="relative z-10 text-center px-6" style={{ opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="mb-6 font-body text-[12px] font-normal uppercase tracking-[0.35em] text-text-muted-dark"
        >
          Revenue Capture Agency
        </motion.p>

        <motion.h1
          className="font-heading font-black leading-[0.92] text-dutch-white"
          style={{ fontSize: "clamp(80px, 11vw, 140px)", y: headlineY }}
        >
          {["Revenue.", "Captured."].map((word, i) => (
            <motion.span
              key={word}
              className="block"
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.85, ease }}
            >
              {word === "Captured." ? (
                <span className="gradient-text-wine">Captured<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span></span>
              ) : word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease }}
          className="mx-auto mt-8 max-w-[540px] font-body leading-relaxed text-text-muted-dark"
          style={{ fontSize: "clamp(17px,2vw,21px)", y: taglineY }}
        >
          We build, market, and convert. Turning your vision into a profitable reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={openModal} className="btn-primary">
            Get Your Free Audit
          </button>
          <a href="#work" className="btn-ghost">
            See Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative h-10 w-[2px] bg-dutch-white/25 mx-auto">
          <div className="scroll-dot-anim absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-dutch-white/60" />
        </div>
        <p className="mt-2 font-body text-[10px] uppercase tracking-[0.25em] text-dutch-white/30">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
