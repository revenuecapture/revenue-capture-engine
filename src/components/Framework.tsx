import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  { num: "01", title: "Brand Building",    desc: "We establish your authority and build trust on LinkedIn, Facebook, and Instagram. Your audience learns to see you as the solution.", accent: "var(--wine)" },
  { num: "02", title: "Brand Marketing",   desc: "We launch with compelling content and targeted messaging, generating evergreen interest. Not just impressions. Positioning.",          accent: "var(--federal-blue)" },
  { num: "03", title: "Sales Enablement",  desc: "Our sales expertise transforms interest into qualified leads, then converts them into customers. We build the funnel, playbooks, and outreach systems.", accent: "#0d7077" },
  { num: "04", title: "Future Value",      desc: "Every win becomes a catalyst. We capture social proof, testimonials, and data that reduce your future marketing costs and compound your credibility.", accent: "var(--dutch-white)" },
];

const Framework = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="framework"
      ref={ref}
      className="dark-section relative overflow-hidden py-[150px] px-6 md:px-10"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* Parallax background blobs */}
      <motion.div className="blob-a pointer-events-none absolute rounded-full" style={{
        width: "800px", height: "600px", top: "10%", left: "-20%",
        background: "radial-gradient(circle, rgba(55,93,138,0.35) 0%, transparent 70%)",
        filter: "blur(90px)", x: bgX,
      }} />
      <motion.div className="blob-b pointer-events-none absolute rounded-full" style={{
        width: "600px", height: "600px", bottom: "5%", right: "-15%",
        background: "radial-gradient(circle, rgba(115,47,55,0.3) 0%, transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[12px] uppercase tracking-[0.3em] text-text-muted-dark">How We Work</p>
          <h2 className="gradient-text-blue font-heading font-black" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
            The Blueprint<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease }}
              className="group relative border-b py-14 md:py-18"
              style={{ borderColor: "rgba(239,223,187,0.08)" }}
            >
              {/* Hover fill */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                style={{ background: `radial-gradient(ellipse at ${i % 2 === 0 ? "20%" : "80%"} 50%, ${step.accent}18, transparent 70%)` }}
              />

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
                <span
                  className="font-heading font-black select-none transition-all duration-500 group-hover:opacity-20"
                  style={{ fontSize: "clamp(80px, 12vw, 160px)", lineHeight: 0.8, color: "rgba(239,223,187,0.06)" }}
                >
                  {step.num}
                </span>
                <div className="flex-1">
                  <h3
                    className="mb-3 font-heading text-[36px] font-extrabold text-dutch-white leading-[1.1] group-hover:text-dutch-white transition-colors"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="max-w-[540px] font-body text-[17px] font-light text-text-muted-dark leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <motion.div
                  className="hidden h-[3px] w-24 rounded-full md:block"
                  style={{ background: step.accent }}
                  whileInView={{ scaleX: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Framework;
