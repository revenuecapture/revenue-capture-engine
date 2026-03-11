import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Check = () => (
  <span className="mr-2 text-wine">◆</span>
);

const tiers = [
  {
    name: "LAUNCHPAD",
    price: "$999",
    period: "/mo",
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
  },
  {
    name: "GROWTH ENGINE",
    price: "$2,499",
    period: "/mo",
    revShare: true,
    revShareText: "+ 1% Rev Share",
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
  },
  {
    name: "FULL FUNNEL",
    price: "Custom",
    period: "",
    revShare: true,
    revShareText: "+ 1% Rev Share",
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
  },
];

const Pricing = () => {
  const { openModal } = useModal();
  return (
  <section
    id="pricing"
    className="dark-section relative overflow-hidden py-[140px] px-6 md:px-10"
    style={{
      background: `
        radial-gradient(ellipse at 50% 100%, rgba(55,93,138,0.22), transparent 55%),
        radial-gradient(ellipse at 0% 0%, rgba(115,47,55,0.12), transparent 45%),
        var(--midnight-green)
      `,
    }}
  >
    <div className="relative z-10 mx-auto max-w-[1100px]">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
          Pricing
        </p>
        <h2 className="font-heading font-black text-dutch-white" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1 }}>
          Aligned with your growth<span className="text-wine">.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[580px] font-body text-[18px] font-light leading-relaxed text-text-muted-dark">
          We offer tiered packages to meet you where you are. Our growth packages include a revenue share. We only win when you win.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease }}
            className="flex flex-col rounded-lg p-10 md:p-12"
            style={{
              background: tier.featured ? "rgba(55, 93, 138, 0.25)" : "rgba(255,255,255,0.04)",
              border: tier.featured ? "1.5px solid var(--federal-blue)" : "1px solid rgba(239,223,187,0.1)",
            }}
          >
            {tier.featured && (
              <span className="mb-6 inline-block self-start rounded-full bg-federal-blue px-3.5 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-dutch-white">
                Most Popular
              </span>
            )}
            <p className="font-heading text-[14px] font-bold uppercase tracking-[0.25em] text-text-muted-dark">
              {tier.name}
            </p>
            <p className="mt-4 font-heading font-black text-dutch-white" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              {tier.price}
              <span className="text-[20px] font-normal text-text-muted-dark">{tier.period}</span>
            </p>
            {tier.revShare && (
              <p className="mt-1 font-body text-[14px] font-light text-wine">{tier.revShareText}</p>
            )}
            <div className="my-6 h-px bg-dutch-white/10" />
            <p className="font-body text-[15px] font-light italic text-text-muted-dark">
              Ideal for: {tier.ideal}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start font-body text-[15px] font-light text-dutch-white">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="mt-8 block w-full rounded-[4px] py-3.5 text-center font-heading text-[15px] font-semibold transition-colors duration-200"
              style={{
                background: tier.featured ? "var(--wine)" : "transparent",
                color: "var(--dutch-white)",
                border: tier.featured ? "none" : "1.5px solid rgba(239,223,187,0.3)",
              }}
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
