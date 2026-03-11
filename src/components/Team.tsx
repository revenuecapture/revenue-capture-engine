import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const members = [
  {
    initials: "B",
    name: "Badr",
    role: "Strategy & Growth",
    desc: "Expertise in Applied Psychology, Economics, Data, and Communications. Drives market positioning, brand strategy, and revenue architecture.",
  },
  {
    initials: "S",
    name: "Sarmad",
    role: "Sales & Network",
    desc: "Specialist in Sales, Customer Relations, Personal Branding, and International Networking. Facilitates outbound at scale and builds relationships that convert.",
  },
];

const Team = () => (
  <section className="dark-section bg-midnight-green py-[140px] px-6 md:px-10">
    <div className="relative z-10 mx-auto max-w-[900px]">
      <div className="mb-16 text-center">
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
          The Team
        </p>
        <h2 className="font-heading font-black text-dutch-white" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
          Your team<span className="text-wine">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease }}
            className="rounded-lg border border-dutch-white/10 bg-[rgba(255,255,255,0.04)] p-10 md:p-12"
          >
            <div className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-dutch-white/[0.08]">
              <span className="font-heading text-[40px] font-black text-text-muted-dark">{m.initials}</span>
            </div>
            <h3 className="font-heading text-[28px] font-extrabold text-dutch-white">{m.name}</h3>
            <span className="mt-2 inline-block rounded-full bg-wine px-3.5 py-1 font-body text-[12px] font-normal uppercase tracking-[0.2em] text-dutch-white">
              {m.role}
            </span>
            <p className="mt-4 font-body text-[16px] font-light leading-relaxed text-text-muted-dark">
              {m.desc}
            </p>
            <a href="#" className="mt-4 inline-block font-body text-[14px] font-medium text-wine">
              LinkedIn →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
