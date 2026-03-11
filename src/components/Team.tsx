import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const members = [
  {
    initials: "B",
    name: "Badr",
    role: "Strategy & Growth",
    desc: "Expertise in Applied Psychology, Economics, Data, and Communications. Drives market positioning, brand strategy, and revenue architecture.",
    accent: "var(--wine)",
  },
  {
    initials: "S",
    name: "Sarmad",
    role: "Sales & Network",
    desc: "Specialist in Sales, Customer Relations, Personal Branding, and International Networking. Facilitates outbound at scale and builds relationships that convert.",
    accent: "var(--federal-blue)",
  },
];

const Team = () => (
  <section
    className="dark-section relative overflow-hidden py-[150px] px-6 md:px-10"
    style={{ background: "var(--midnight-green)" }}
  >
    {/* Blobs */}
    <div className="blob-c pointer-events-none absolute rounded-full" style={{
      width: "600px", height: "500px", top: "0", left: "0",
      background: "radial-gradient(circle, rgba(55,93,138,0.22) 0%, transparent 70%)",
      filter: "blur(80px)",
    }} />
    <div className="blob-b pointer-events-none absolute rounded-full" style={{
      width: "500px", height: "400px", bottom: "0", right: "0",
      background: "radial-gradient(circle, rgba(115,47,55,0.18) 0%, transparent 70%)",
      filter: "blur(70px)",
    }} />

    <div className="relative z-10 mx-auto max-w-[900px]">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="mb-4 font-body text-[12px] uppercase tracking-[0.3em] text-text-muted-dark">The Team</p>
        <h2 className="font-heading font-black text-dutch-white" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
          Your team<span style={{ color: "var(--wine)" }}>.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 70, x: i === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: i * 0.15, ease }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative overflow-hidden rounded-xl p-10 md:p-12"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(239,223,187,0.1)" }}
          >
            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
              style={{ background: `radial-gradient(ellipse at top left, ${m.accent}22, transparent 65%)` }}
            />

            <div className="relative z-10">
              {/* Avatar with accent border on hover */}
              <div
                className="mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: "rgba(239,223,187,0.07)", border: `2px solid rgba(239,223,187,0.08)` }}
              >
                <span className="font-heading text-[36px] font-black" style={{ color: m.accent }}>{m.initials}</span>
              </div>

              <h3 className="font-heading text-[28px] font-extrabold text-dutch-white">{m.name}</h3>
              <span
                className="mt-2 inline-block rounded-full px-3.5 py-1 font-body text-[12px] uppercase tracking-[0.2em] text-dutch-white"
                style={{ background: m.accent }}
              >
                {m.role}
              </span>
              <p className="mt-4 font-body text-[16px] font-light leading-relaxed text-text-muted-dark">{m.desc}</p>
              <a
                href="#"
                className="mt-5 inline-block font-body text-[14px] font-medium transition-colors duration-200 hover:underline"
                style={{ color: m.accent }}
              >
                LinkedIn →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
