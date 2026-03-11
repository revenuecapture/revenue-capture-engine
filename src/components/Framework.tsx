import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  {
    num: "01",
    title: "Brand Building",
    desc: "We establish your authority and build trust on LinkedIn, Facebook, and Instagram. Your audience learns to see you as the solution.",
    barColor: "var(--wine)",
    orbColor: "rgba(115,47,55,0.28)",
    hoverGrad: "rgba(115,47,55,0.12)",
    numGrad: "linear-gradient(135deg, rgba(115,47,55,0.9), rgba(115,47,55,0.2))",
  },
  {
    num: "02",
    title: "Brand Marketing",
    desc: "We launch with compelling content and targeted messaging, generating evergreen interest. Not just impressions. Positioning.",
    barColor: "var(--federal-blue)",
    orbColor: "rgba(55,93,138,0.28)",
    hoverGrad: "rgba(55,93,138,0.12)",
    numGrad: "linear-gradient(135deg, rgba(55,93,138,0.9), rgba(55,93,138,0.2))",
  },
  {
    num: "03",
    title: "Sales Enablement",
    desc: "Our sales expertise transforms interest into qualified leads, then converts them into customers. We build the funnel, playbooks, and outreach systems.",
    barColor: "#0d7077",
    orbColor: "rgba(13,112,119,0.28)",
    hoverGrad: "rgba(13,112,119,0.12)",
    numGrad: "linear-gradient(135deg, rgba(13,112,119,0.9), rgba(13,112,119,0.2))",
  },
  {
    num: "04",
    title: "Future Value",
    desc: "Every win becomes a catalyst. We capture social proof, testimonials, and data that reduce your future marketing costs and compound your credibility.",
    barColor: "var(--dutch-white)",
    orbColor: "rgba(239,223,187,0.2)",
    hoverGrad: "rgba(239,223,187,0.07)",
    numGrad: "linear-gradient(135deg, rgba(239,223,187,0.7), rgba(239,223,187,0.15))",
  },
];

const Framework = () => (
  <section
    id="framework"
    className="relative overflow-hidden py-[140px] px-6 md:px-12"
    style={{ background: "var(--midnight-green)" }}
  >
    {/* Background orbs */}
    <div className="orb orb-a pointer-events-none absolute"
      style={{
        top: "-5%", left: "-8%",
        width: "min(60vw, 720px)", height: "min(60vw, 720px)",
        background: "radial-gradient(circle, rgba(55,93,138,0.3) 0%, transparent 70%)",
        filter: "blur(clamp(60px,8vw,110px))",
      }}
    />
    <div className="orb orb-b pointer-events-none absolute"
      style={{
        bottom: "-5%", right: "-5%",
        width: "min(50vw, 600px)", height: "min(50vw, 600px)",
        background: "radial-gradient(circle, rgba(115,47,55,0.28) 0%, transparent 70%)",
        filter: "blur(clamp(55px,7vw,100px))",
        animationDelay: "3s",
      }}
    />

    <div className="relative z-10 mx-auto max-w-[1240px]">
      <motion.div
        className="mb-20 text-center"
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
          How We Work
        </p>
        <h2
          className="gradient-text-light font-heading font-black"
          style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1 }}
        >
          The Blueprint<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
        </h2>
      </motion.div>

      <div>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: i % 2 === 0 ? -150 : 150, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease }}
            className="group relative border-b border-dutch-white/[0.07] py-12 md:py-16"
            style={{ cursor: "default" }}
          >
            {/* Hover fill */}
            <div
              className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, ${step.hoverGrad} 0%, transparent 65%)` }}
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
              {/* Step number with color gradient per step */}
              <span
                className="font-heading font-black select-none shrink-0"
                style={{
                  fontSize: "clamp(70px, 11vw, 150px)",
                  lineHeight: 0.85,
                  background: step.numGrad,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {step.num}
              </span>
              <div className="flex-1">
                <h3 className="mb-4 font-heading font-extrabold text-dutch-white" style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.1 }}>
                  {step.title}
                </h3>
                <p className="max-w-[560px] font-body font-light leading-relaxed text-text-muted-dark" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>
                  {step.desc}
                </p>
              </div>
              {/* Expanding bar on hover */}
              <div
                className="hidden h-[3px] w-20 shrink-0 rounded-full transition-all duration-500 group-hover:w-32 md:block"
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
