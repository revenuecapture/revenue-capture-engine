import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const clients = ["Beaconhouse Group", "StudyIn", "ASFE Consultants", "AMET Education", "PhatLoot Studios", "Verbaly"];

const stats = [
  { value: "$840,994", label: "Raised on Kickstarter for PhatLoot Studios" },
  { value: "$1M+",     label: "Spent on B2B lead generation" },
  { value: "$3.4M",    label: "Generated in revenue for clients" },
];

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const statsBlobX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <>
      <section
        id="work"
        ref={ref}
        className="relative overflow-hidden py-[150px] px-6 md:px-10"
        style={{ background: "var(--bg-light)" }}
      >
        {/* Blob */}
        <div className="blob-b pointer-events-none absolute rounded-full" style={{
          width: "700px", height: "500px", bottom: "-10%", right: "-10%",
          background: "radial-gradient(circle, rgba(55,93,138,0.16) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-4 font-body text-[12px] uppercase tracking-[0.3em] text-text-muted-light">Proof of Work</p>
            <h2 className="font-heading font-black text-text-primary-light" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
              We've done this before<span style={{ color: "var(--wine)" }}>.</span>
            </h2>
            <p className="mt-4 font-heading text-[22px] font-bold" style={{ color: "var(--wine)" }}>
              Not what we can do. What we have done.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* Client grid — slides in from left */}
            <div className="grid grid-cols-2 gap-3">
              {clients.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, x: -60, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  whileHover={{ scale: 1.04, background: "rgba(7,55,58,0.13)", transition: { duration: 0.2 } }}
                  className="rounded-[4px] px-5 py-2.5 text-center font-body text-[14px] font-medium uppercase tracking-[0.15em] text-text-primary-light cursor-default"
                  style={{ background: "rgba(7,55,58,0.08)", border: "1px solid rgba(7,55,58,0.08)" }}
                >
                  {c}
                </motion.div>
              ))}
            </div>

            {/* Testimonial — slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="relative"
            >
              <span className="absolute -top-4 -left-2 font-heading font-black leading-none select-none"
                style={{ fontSize: "120px", color: "rgba(115,47,55,0.2)" }}>
                &ldquo;
              </span>
              <blockquote className="pt-12 font-body text-[20px] font-light leading-relaxed text-text-primary-light">
                revCap helped us go from just an idea to a sustainable business with consistent revenue. Their end-to-end approach meant I could focus on teaching while they handled the marketing and sales. True partners in growth.
              </blockquote>
              <p className="mt-6 font-heading text-[14px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--wine)" }}>
                Verbaly
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stat strip — dark, with parallax blob */}
      <div
        className="dark-section relative overflow-hidden py-[90px] px-6 md:px-10"
        style={{ background: "var(--midnight-green)" }}
      >
        <motion.div className="blob-a pointer-events-none absolute rounded-full" style={{
          width: "800px", height: "400px", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(55,93,138,0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          x: statsBlobX,
        }} />

        <div className="relative z-10 mx-auto grid max-w-[1100px] grid-cols-1 gap-12 text-center md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease, type: "spring", stiffness: 100 }}
            >
              <p className="stat-number font-heading font-black text-dutch-white leading-none gradient-text-wine"
                style={{ fontSize: "clamp(48px,6vw,64px)" }}>
                {stat.value}
              </p>
              <p className="mt-3 font-body text-[14px] font-light text-text-muted-dark">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialProof;
