import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  {
    num: "01",
    title: "Brand Building",
    desc: "We establish your authority and build trust on LinkedIn, Facebook, and Instagram. Your audience learns to see you as the solution.",
    barColor: "var(--wine)",
  },
  {
    num: "02",
    title: "Brand Marketing",
    desc: "We launch with compelling content and targeted messaging, generating evergreen interest. Not just impressions. Positioning.",
    barColor: "var(--federal-blue)",
  },
  {
    num: "03",
    title: "Sales Enablement",
    desc: "Our sales expertise transforms interest into qualified leads, then converts them into customers. We build the funnel, playbooks, and outreach systems.",
    barColor: "#0d7077",
  },
  {
    num: "04",
    title: "Future Value",
    desc: "Every win becomes a catalyst. We capture social proof, testimonials, and data that reduce your future marketing costs and compound your credibility.",
    barColor: "var(--dutch-white)",
  },
];

const Framework = () => (
  <section
    id="framework"
    className="dark-section relative overflow-hidden py-[140px] px-6 md:px-10"
    style={{
      background: `
        radial-gradient(ellipse at 0% 30%, rgba(55,93,138,0.2), transparent 50%),
        radial-gradient(ellipse at 100% 70%, rgba(115,47,55,0.15), transparent 50%),
        var(--midnight-green)
      `,
    }}
  >
    <div className="relative z-10 mx-auto max-w-[1280px]">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
          How We Work
        </p>
        <h2 className="font-heading font-black text-dutch-white" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
          The Blueprint<span className="text-wine">.</span>
        </h2>
      </motion.div>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="relative border-b border-dutch-white/[0.08] py-12 md:py-16"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
              <span
                className="font-heading font-black text-dutch-white/[0.07] select-none"
                style={{ fontSize: "clamp(80px, 12vw, 160px)", lineHeight: 0.8 }}
              >
                {step.num}
              </span>
              <div className="flex-1">
                <h3 className="mb-3 font-heading text-[36px] font-extrabold text-dutch-white leading-[1.1]">
                  {step.title}
                </h3>
                <p className="max-w-[540px] font-body text-[17px] font-light text-text-muted-dark leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div
                className="hidden h-[3px] w-24 rounded-full md:block"
                style={{ background: step.barColor }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Framework;
