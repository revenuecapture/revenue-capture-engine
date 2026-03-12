import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const members = [
  {
    name: "Badr",
    role: "Strategy & Growth",
    desc: "Expertise in Applied Psychology, Economics, Data, and Communications. Drives market positioning, brand strategy, and revenue architecture.",
    gradFrom: "rgba(115,47,55,0.75)",
    gradTo: "rgba(55,93,138,0.6)",
  },
  {
    name: "Sarmad",
    role: "Sales & Network",
    desc: "Specialist in Sales, Customer Relations, Personal Branding, and International Networking. Facilitates outbound at scale and builds relationships that convert.",
    gradFrom: "rgba(55,93,138,0.75)",
    gradTo: "rgba(9,82,86,0.6)",
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
  <section
    ref={sectionRef}
    className="relative overflow-hidden py-[140px] px-6 md:px-12"
    style={{ background: "var(--midnight-green)" }}
  >
    <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY }} aria-hidden>
      <div className="orb orb-a absolute"
        style={{
          top: "15%", right: "3%",
          width: "min(50vw, 600px)", height: "min(50vw, 600px)",
          background: "radial-gradient(circle, rgba(115,47,55,0.30) 0%, transparent 70%)",
          filter: "blur(clamp(55px,7vw,100px))",
        }}
      />
    </motion.div>
    <motion.div className="pointer-events-none absolute inset-0" style={{ y: orbY2 }} aria-hidden>
      <div className="orb orb-b absolute"
        style={{
          bottom: "10%", left: "-5%",
          width: "min(45vw, 520px)", height: "min(45vw, 520px)",
          background: "radial-gradient(circle, rgba(55,93,138,0.28) 0%, transparent 70%)",
          filter: "blur(clamp(50px,6vw,90px))",
          animationDelay: "4s",
        }}
      />
    </motion.div>

    <div className="relative z-10 mx-auto max-w-[920px]">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
          The Team
        </p>
        <h2
          className="gradient-text-light font-heading font-black"
          style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1 }}
        >
          Your team<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: i === 0 ? -110 : 110, rotate: i === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.88, delay: i * 0.1, ease }}
            className="overflow-hidden rounded-xl"
            style={{ border: "1px solid rgba(239,223,187,0.1)" }}
          >
            {/* Gradient accent bar at top */}
            <div
              className="h-[3px] w-full"
              style={{ background: `linear-gradient(90deg, ${m.gradFrom}, ${m.gradTo})` }}
            />

            <div
              className="p-10 md:p-12"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <h3 className="font-heading font-extrabold text-dutch-white" style={{ fontSize: "clamp(26px, 3vw, 32px)" }}>
                {m.name}
              </h3>

              <span
                className="mt-3 inline-block rounded-full px-4 py-1.5 font-body text-[12px] font-normal uppercase tracking-[0.2em] text-dutch-white"
                style={{ background: "var(--wine)" }}
              >
                {m.role}
              </span>

              <p className="mt-5 font-body font-light leading-relaxed text-text-muted-dark" style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}>
                {m.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Team;
