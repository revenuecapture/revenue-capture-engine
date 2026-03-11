import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const cards = [
  {
    num: "01",
    title: "Meta Ads Audit",
    desc: "A forensic review of your paid advertising. We identify exactly where budget is leaking, what audiences are underserved, and where your highest-ROI opportunities live.",
    tag: "PAID MEDIA",
  },
  {
    num: "02",
    title: "Digital Presence Audit",
    desc: "A full-spectrum analysis of your brand across every digital touchpoint: social, SEO, website, content. We map the gaps between where you are and where you need to be.",
    tag: "BRAND & DIGITAL",
  },
  {
    num: "03",
    title: "Market Gap Audit",
    desc: "We analyze your competitive landscape to find the white spaces your competitors are ignoring. This is where your positioning strategy lives.",
    tag: "COMPETITIVE INTELLIGENCE",
  },
];

const Audit = () => {
  const { openModal } = useModal();
  return (
  <section
    id="services"
    className="relative overflow-hidden py-[140px] px-6 md:px-10"
    style={{
      background: `
        radial-gradient(ellipse at 50% 0%, rgba(9,82,86,0.12), transparent 55%),
        radial-gradient(ellipse at 90% 100%, rgba(115,47,55,0.1), transparent 50%),
        var(--bg-light)
      `,
    }}
  >
    <div className="mx-auto max-w-[1280px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-light">
          Where It Begins
        </p>
        <h2
          className="font-heading font-black text-text-primary-light"
          style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}
        >
          It starts with an Audit<span className="text-wine">.</span>
        </h2>
        <p className="mt-6 max-w-[600px] font-body text-[18px] font-light leading-relaxed text-text-primary-light">
          Every engagement begins with a free, research-grade audit of your business. No fluff. Competitor analysis, academic references, data-aligned recommendations, and a strategic framework for understanding.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease }}
            className="group rounded-lg border border-dutch-white/[0.08] bg-midnight-green p-10 md:p-12 transition-all duration-300 hover:-translate-y-1.5 hover:border-dutch-white/25"
          >
            <span className="font-heading text-[48px] font-black text-wine">{card.num}</span>
            <h3 className="mt-4 font-heading text-[24px] font-bold text-dutch-white">{card.title}</h3>
            <p className="mt-4 font-body text-[16px] font-light leading-relaxed text-text-muted-dark">
              {card.desc}
            </p>
            <span className="mt-6 inline-block rounded-full bg-dutch-white/[0.08] px-3 py-1 font-body text-[12px] font-normal uppercase tracking-[0.2em] text-text-muted-dark">
              {card.tag}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={openModal}
          className="inline-block rounded-[4px] bg-wine px-10 py-4 font-heading text-[15px] font-semibold text-dutch-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Request Your Free Audit
        </button>
        <p className="mt-3 font-body text-[14px] font-light text-text-muted-light">
          No commitment. No pitch. Just clarity.
        </p>
      </div>
    </div>
  </section>
  );
};

export default Audit;
