import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const cards = [
  {
    num: "01",
    title: "Meta Ads Audit",
    desc: "A forensic review of your paid advertising. We identify exactly where budget is leaking, what audiences are underserved, and where your highest-ROI opportunities live.",
    tag: "PAID MEDIA",
    hoverOrb: "rgba(115,47,55,0.55)",
    borderHover: "rgba(115,47,55,0.5)",
  },
  {
    num: "02",
    title: "Digital Presence Audit",
    desc: "A full-spectrum analysis of your brand across every digital touchpoint: social, SEO, website, content. We map the gaps between where you are and where you need to be.",
    tag: "BRAND & DIGITAL",
    hoverOrb: "rgba(55,93,138,0.55)",
    borderHover: "rgba(55,93,138,0.5)",
  },
  {
    num: "03",
    title: "Market Gap Audit",
    desc: "We analyze your competitive landscape to find the white spaces your competitors are ignoring. This is where your positioning strategy lives.",
    tag: "COMPETITIVE INTELLIGENCE",
    hoverOrb: "rgba(13,112,119,0.55)",
    borderHover: "rgba(13,112,119,0.5)",
  },
];

const Audit = () => {
  const { openModal } = useModal();
  return (
    <section
      id="services"
      className="relative overflow-hidden py-[140px] px-6 md:px-12"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="orb orb-a pointer-events-none absolute"
        style={{
          top: "-8%", right: "-3%",
          width: "min(50vw, 600px)", height: "min(50vw, 600px)",
          background: "radial-gradient(circle, rgba(9,82,86,0.22) 0%, transparent 70%)",
          filter: "blur(clamp(55px,7vw,100px))",
        }}
      />
      <div className="orb orb-b pointer-events-none absolute"
        style={{
          bottom: "0%", left: "5%",
          width: "min(40vw, 500px)", height: "min(40vw, 500px)",
          background: "radial-gradient(circle, rgba(115,47,55,0.18) 0%, transparent 70%)",
          filter: "blur(clamp(50px,6vw,90px))",
          animationDelay: "4s",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease }}
        >
          <p className="mb-5 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
            Where It Begins
          </p>
          <h2
            className="font-heading font-black text-text-primary-light"
            style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1 }}
          >
            It starts with an Audit<span className="text-wine">.</span>
          </h2>
          <p className="mt-6 max-w-[640px] font-body font-light leading-relaxed text-text-primary-light" style={{ fontSize: "clamp(18px, 2vw, 21px)" }}>
            Every engagement begins with a free, research-grade audit of your business. No fluff. Competitor analysis, academic references, data-aligned recommendations, and a strategic framework for understanding.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 80, rotate: i === 1 ? 0 : i === 0 ? -5 : 5, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.85, delay: i * 0.13, ease }}
              className="group relative overflow-hidden rounded-xl"
              style={{
                background: "var(--midnight-green)",
                border: "1px solid rgba(239,223,187,0.1)",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              {/* Hover glow from top */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
                style={{ background: `radial-gradient(ellipse at 50% -10%, ${card.hoverOrb} 0%, transparent 65%)` }}
              />
              {/* Hover border glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${card.borderHover}` }}
              />

              <div className="relative p-10 md:p-12 transition-transform duration-300 group-hover:-translate-y-1">
                <span
                  className="font-heading text-[52px] font-black"
                  style={{ color: "var(--wine)", lineHeight: 1 }}
                >
                  {card.num}
                </span>
                <h3 className="mt-5 font-heading font-bold text-dutch-white" style={{ fontSize: "clamp(22px, 2.5vw, 28px)" }}>
                  {card.title}
                </h3>
                <p className="mt-4 font-body font-light leading-relaxed text-text-muted-dark" style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}>
                  {card.desc}
                </p>
                <span className="mt-6 inline-block rounded-full bg-dutch-white/[0.08] px-3 py-1 font-body text-[12px] font-normal uppercase tracking-[0.2em] text-text-muted-dark">
                  {card.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-16 text-center"
        >
          <button onClick={openModal} className="btn-primary px-10 py-[14px] text-[15px]">
            Request Your Free Audit
          </button>
          <p className="mt-4 font-body font-light text-text-muted-light" style={{ fontSize: "15px" }}>
            No commitment. No pitch. Just clarity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Audit;
