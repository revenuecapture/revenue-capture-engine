import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Check = () => <span className="mr-2 shrink-0" style={{ color: "var(--wine)" }}>◆</span>;

const tiers = [
  {
    name: "LAUNCHPAD",
    price: "$999", period: "/mo",
    revShare: false,
    ideal: "Businesses just getting started or testing a new market.",
    features: [
      "Foundational brand building on 1 platform (LinkedIn)",
      "Content strategy & creation (4-6 posts/month)",
      "Basic lead capture setup",
      "Monthly analytics report",
      "Dedicated account manager",
    ],
    cta: "Start with Launchpad",
    featured: false,
    accent: "rgba(239,223,187,0.06)",
    borderColor: "rgba(239,223,187,0.1)",
    blobColor: "rgba(239,223,187,0.04)",
  },
  {
    name: "GROWTH ENGINE",
    price: "$2,499", period: "/mo",
    revShare: true, revShareText: "+ 1% Rev Share",
    ideal: "Established businesses ready to scale and capture more revenue.",
    features: [
      "All Launchpad services",
      "Brand building on 2-3 platforms (LinkedIn, Facebook, Instagram)",
      "Advanced lead generation & funnel optimization",
      "Dedicated sales funnel support",
      "Ad creative production",
      "Performance marketing management",
    ],
    cta: "Launch Growth Engine",
    featured: true,
    accent: "rgba(55,93,138,0.2)",
    borderColor: "var(--federal-blue)",
    blobColor: "rgba(55,93,138,0.25)",
  },
  {
    name: "FULL FUNNEL",
    price: "Custom", period: "",
    revShare: true, revShareText: "+ 1% Rev Share",
    ideal: "Enterprise-level clients with complex, multi-market needs.",
    features: [
      "Fully customized revCap solution",
      "All 4 framework stages executed",
      "Priority support & dedicated resources",
      "Custom reporting & dashboards",
      "Direct access to founding team",
    ],
    cta: "Get a Custom Quote",
    featured: false,
    accent: "rgba(115,47,55,0.12)",
    borderColor: "rgba(239,223,187,0.1)",
    blobColor: "rgba(115,47,55,0.15)",
  },
];

const Pricing = () => {
  const { openModal } = useModal();
  return (
    <section
      id="pricing"
      className="dark-section relative overflow-hidden py-[150px] px-6 md:px-10"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* Blobs */}
      <div className="blob-a pointer-events-none absolute rounded-full" style={{
        width: "700px", height: "600px", bottom: "-20%", left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(55,93,138,0.3) 0%, transparent 70%)",
        filter: "blur(100px)",
      }} />
      <div className="blob-b pointer-events-none absolute rounded-full" style={{
        width: "400px", height: "400px", top: "0", right: "0",
        background: "radial-gradient(circle, rgba(115,47,55,0.2) 0%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[12px] uppercase tracking-[0.3em] text-text-muted-dark">Pricing</p>
          <h2 className="gradient-text-blue font-heading font-black" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
            Aligned with your growth<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[540px] font-body text-[18px] font-light leading-relaxed text-text-muted-dark">
            We offer tiered packages to meet you where you are. Our growth packages include a revenue share. We only win when you win.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              whileHover={{ y: tier.featured ? -10 : -6, transition: { duration: 0.25 } }}
              className="relative flex flex-col overflow-hidden rounded-xl p-10 md:p-11"
              style={{
                background: tier.accent,
                border: `${tier.featured ? "1.5px" : "1px"} solid ${tier.borderColor}`,
                boxShadow: tier.featured ? "0 20px 60px rgba(55,93,138,0.25)" : "none",
              }}
            >
              {/* Per-card inner blob */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full"
                style={{ background: `radial-gradient(circle, ${tier.blobColor}, transparent 70%)`, filter: "blur(40px)" }}
              />

              {tier.featured && (
                <span className="mb-5 inline-block self-start rounded-full px-3.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-dutch-white"
                  style={{ background: "var(--federal-blue)" }}>
                  Most Popular
                </span>
              )}

              <p className="font-heading text-[13px] font-bold uppercase tracking-[0.25em] text-text-muted-dark">{tier.name}</p>
              <p className="mt-4 font-heading font-black text-dutch-white" style={{ fontSize: "clamp(36px,4vw,56px)" }}>
                {tier.price}<span className="text-[18px] font-normal text-text-muted-dark">{tier.period}</span>
              </p>
              {tier.revShare && (
                <p className="mt-1 font-body text-[14px] font-light" style={{ color: "var(--wine)" }}>{tier.revShareText}</p>
              )}

              <div className="my-5 h-px" style={{ background: "rgba(239,223,187,0.08)" }} />
              <p className="font-body text-[15px] font-light italic text-text-muted-dark">Ideal for: {tier.ideal}</p>

              <ul className="mt-5 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start font-body text-[15px] font-light text-dutch-white">
                    <Check /><span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className={tier.featured ? "btn-primary mt-7 w-full" : "btn-pricing-ghost mt-7"}
                style={tier.featured ? { padding: "14px" } : {}}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
