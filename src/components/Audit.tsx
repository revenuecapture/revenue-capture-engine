import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const cards = [
  {
    num: "01",
    title: "Meta Ads Audit",
    desc: "A forensic review of your paid advertising. We identify exactly where budget is leaking, what audiences are underserved, and where your highest-ROI opportunities live.",
    tag: "PAID MEDIA",
    gradient: "radial-gradient(ellipse at top left, rgba(115,47,55,0.25), transparent 70%)",
  },
  {
    num: "02",
    title: "Digital Presence Audit",
    desc: "A full-spectrum analysis of your brand across every digital touchpoint: social, SEO, website, content. We map the gaps between where you are and where you need to be.",
    tag: "BRAND & DIGITAL",
    gradient: "radial-gradient(ellipse at top left, rgba(55,93,138,0.25), transparent 70%)",
  },
  {
    num: "03",
    title: "Market Gap Audit",
    desc: "We analyze your competitive landscape to find the white spaces your competitors are ignoring. This is where your positioning strategy lives.",
    tag: "COMPETITIVE INTELLIGENCE",
    gradient: "radial-gradient(ellipse at top left, rgba(9,82,86,0.3), transparent 70%)",
  },
];

const Audit = () => {
  const { openModal } = useModal();
  return (
    <section
      id="services"
      className="relative overflow-hidden py-[150px] px-6 md:px-10"
      style={{ background: "var(--bg-light)" }}
    >
      {/* Blobs */}
      <div className="blob-c pointer-events-none absolute rounded-full" style={{
        width: "600px", height: "600px", top: "0", left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(9,82,86,0.15) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />
      <div className="blob-a pointer-events-none absolute rounded-full" style={{
        width: "500px", height: "400px", bottom: "0", right: "-10%",
        background: "radial-gradient(circle, rgba(115,47,55,0.12) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[12px] uppercase tracking-[0.3em] text-text-muted-light">Where It Begins</p>
          <h2
            className="font-heading font-black text-text-primary-light"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}
          >
            It starts with an Audit<span style={{ color: "var(--wine)" }}>.</span>
          </h2>
          <p className="mt-6 max-w-[600px] font-body text-[18px] font-light leading-relaxed text-text-primary-light">
            Every engagement begins with a free, research-grade audit of your business. No fluff. Competitor analysis, academic references, data-aligned recommendations, and a strategic framework for understanding.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 80, scale: 0.93, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-xl p-10 md:p-12 cursor-default"
              style={{
                background: "var(--midnight-green)",
                border: "1px solid rgba(239,223,187,0.1)",
              }}
            >
              {/* Per-card gradient */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: card.gradient }}
              />
              {/* Shine on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(239,223,187,0.04) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                <span className="font-heading text-[48px] font-black" style={{ color: "var(--wine)" }}>{card.num}</span>
                <h3 className="mt-4 font-heading text-[24px] font-bold text-dutch-white">{card.title}</h3>
                <p className="mt-4 font-body text-[16px] font-light leading-relaxed text-text-muted-dark">{card.desc}</p>
                <span className="mt-6 inline-block rounded-full px-3 py-1 font-body text-[12px] uppercase tracking-[0.2em] text-text-muted-dark"
                  style={{ background: "rgba(239,223,187,0.07)", border: "1px solid rgba(239,223,187,0.1)" }}>
                  {card.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <button onClick={openModal} className="btn-primary" style={{ padding: "16px 40px", fontSize: "15px" }}>
            Request Your Free Audit
          </button>
          <p className="mt-3 font-body text-[14px] font-light text-text-muted-light">
            No commitment. No pitch. Just clarity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Audit;
