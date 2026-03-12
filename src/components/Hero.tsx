import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Hero = () => {
  const [showScroll, setShowScroll] = useState(true);
  const { openModal } = useModal();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: track window scroll against this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Orb layer moves slower than content (parallax depth)
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  // Content fades and lifts as user scrolls away
  const contentY = useTransform(scrollYProgress, [0, 0.7], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh min-h-[600px] items-center justify-center overflow-hidden"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* ── Parallax orb layer ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: orbY }}
        aria-hidden
      >
        {/* Wine orb — top right */}
        <div
          className="orb orb-a"
          style={{
            top: "5%", right: "5%",
            width: "min(55vw, 640px)", height: "min(55vw, 640px)",
            background: "radial-gradient(circle, rgba(115,47,55,0.62) 0%, transparent 70%)",
            filter: "blur(clamp(50px, 6vw, 90px))",
          }}
        />
        {/* Federal blue orb — bottom left */}
        <div
          className="orb orb-b"
          style={{
            bottom: "0%", left: "0%",
            width: "min(60vw, 700px)", height: "min(60vw, 700px)",
            background: "radial-gradient(circle, rgba(55,93,138,0.54) 0%, transparent 70%)",
            filter: "blur(clamp(55px, 7vw, 100px))",
            animationDelay: "2s",
          }}
        />
        {/* Teal orb — center */}
        <div
          className="orb orb-a"
          style={{
            top: "35%", left: "35%",
            width: "min(40vw, 480px)", height: "min(40vw, 480px)",
            background: "radial-gradient(circle, rgba(9,82,86,0.38) 0%, transparent 70%)",
            filter: "blur(clamp(40px, 5vw, 75px))",
            animationDelay: "5s",
          }}
        />
      </motion.div>

      {/* ── Ambient spinning gradient — very subtle atmospheric layer ── */}
      <div
        className="ambient-spin-grad pointer-events-none"
        style={{
          bottom: "-30%", left: "10%",
          width: "min(80vw, 900px)", height: "min(50vw, 500px)",
          filter: "blur(clamp(80px,12vw,160px))",
          opacity: 0.18,
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-[900px] px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="mb-6 font-body text-[13px] font-normal uppercase text-text-muted-dark"
          style={{ letterSpacing: "0.35em" }}
        >
          Revenue Capture Agency
        </motion.p>

        <h1
          className="font-heading font-black leading-[0.92]"
          style={{ fontSize: "clamp(64px, 10vw, 130px)" }}
        >
          {(["Revenue.", "Captured."] as const).map((word, i) => (
            <motion.span
              key={word}
              className="block"
              initial={{ opacity: 0, y: 70, skewX: -5 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              transition={{ delay: 0.38 + i * 0.15, duration: 0.85, ease }}
            >
              {i === 0 ? (
                <span className="gradient-text-light">Revenue.</span>
              ) : (
                <span className="gradient-text-wine">
                  Captured<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
                </span>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.85, ease }}
          className="mx-auto mt-8 max-w-[540px] font-body font-light leading-relaxed text-text-muted-dark"
          style={{ fontSize: "clamp(18px, 2.2vw, 22px)" }}
        >
          We build, market, and convert. Turning your vision into a profitable reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={openModal}
            className="btn-primary px-9 py-[14px] text-[15px]"
          >
            Get Your Free Audit
          </button>
          <a href="#work" className="btn-ghost px-9 py-[14px] text-[15px]">
            See Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div
        className="pointer-events-none absolute bottom-10 left-1/2 z-10 transition-opacity duration-500"
        style={{ opacity: showScroll ? 1 : 0 }}
      >
        <div className="relative h-11 w-[2px] bg-dutch-white/25">
          <div
            className="scroll-dot-anim absolute left-1/2 top-0 h-[10px] w-[10px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(239,223,187,0.9), rgba(239,223,187,0.3))",
              boxShadow: "0 0 8px rgba(239,223,187,0.4)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
