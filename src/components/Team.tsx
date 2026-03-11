import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const members = [
  {
    initials: "B",
    name: "Badr",
    role: "Strategy & Growth",
    desc: "Expertise in Applied Psychology, Economics, Data, and Communications. Drives market positioning, brand strategy, and revenue architecture.",
    gradFrom: "rgba(115,47,55,0.75)",
    gradTo: "rgba(55,93,138,0.6)",
    linkedin: "#",
  },
  {
    initials: "S",
    name: "Sarmad",
    role: "Sales & Network",
    desc: "Specialist in Sales, Customer Relations, Personal Branding, and International Networking. Facilitates outbound at scale and builds relationships that convert.",
    gradFrom: "rgba(55,93,138,0.75)",
    gradTo: "rgba(9,82,86,0.6)",
    linkedin: "#",
  },
];

const Team = () => (
  <section
    className="relative overflow-hidden py-[140px] px-6 md:px-12"
    style={{ background: "var(--midnight-green)" }}
  >
    <div className="orb orb-a pointer-events-none absolute"
      style={{
        top: "15%", right: "3%",
        width: "min(45vw, 550px)", height: "min(45vw, 550px)",
        background: "radial-gradient(circle, rgba(115,47,55,0.22) 0%, transparent 70%)",
        filter: "blur(clamp(55px,7vw,100px))",
      }}
    />
    <div className="orb orb-b pointer-events-none absolute"
      style={{
        bottom: "10%", left: "-5%",
        width: "min(40vw, 480px)", height: "min(40vw, 480px)",
        background: "radial-gradient(circle, rgba(55,93,138,0.2) 0%, transparent 70%)",
        filter: "blur(clamp(50px,6vw,90px))",
        animationDelay: "4s",
      }}
    />

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
              {/* Avatar with gradient background */}
              <div
                className="mb-7 flex h-[100px] w-[100px] items-center justify-center rounded-xl"
                style={{ background: `linear-gradient(135deg, ${m.gradFrom} 0%, ${m.gradTo} 100%)` }}
              >
                <span className="font-heading text-[40px] font-black text-dutch-white">{m.initials}</span>
              </div>

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

              <a
                href={m.linkedin}
                className="mt-5 inline-flex items-center gap-2 font-body font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: "var(--wine)", fontSize: "15px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
