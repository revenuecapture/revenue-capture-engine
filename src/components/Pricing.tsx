import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface Tier {
  name: string;
  price: string;
  period: string;
  revShare: boolean;
  revShareText?: string;
  ideal: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const tiers: Tier[] = [
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

const TierBody = ({ tier, openModal, featured }: { tier: Tier; openModal: () => void; featured: boolean }) => (
  <>
    {featured && (
      <span
        className="mb-6 inline-block self-start rounded-full px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-dutch-white"
        style={{ background: "var(--federal-blue)" }}
      >
        Most Popular
      </span>
    )}
    <p className="font-heading text-[13px] font-bold uppercase tracking-[0.28em] text-text-muted-dark">
      {tier.name}
    </p>
    <p className="mt-4 font-heading font-black text-dutch-white" style={{ fontSize: "clamp(38px, 4.5vw, 60px)", lineHeight: 1 }}>
      {tier.price}
      <span className="text-[19px] font-normal text-text-muted-dark">{tier.period}</span>
    </p>
    {tier.revShare && (
      <p className="mt-2 font-body text-[15px] font-light" style={{ color: "var(--wine)" }}>
        {tier.revShareText}
      </p>
    )}
    <div className="my-6 h-px bg-dutch-white/10" />
    <p className="font-body font-light italic text-text-muted-dark" style={{ fontSize: "15px" }}>
      Ideal for: {tier.ideal}
    </p>
    <ul className="mt-6 flex-1 space-y-3.5">
      {tier.features.map((f) => (
        <li key={f} className="flex items-start gap-2 font-body font-light text-dutch-white" style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}>
          <span className="mt-[3px] shrink-0 text-[10px]" style={{ color: "var(--wine)" }}>◆</span>
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={openModal}
      className={featured ? "btn-primary mt-8 block w-full py-3.5" : "btn-tier-ghost mt-8 py-3.5"}
    >
      {tier.cta}
    </button>
  </>
);

const Pricing = () => {
  const { openModal } = useModal();
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-[140px] px-6 md:px-12"
      style={{ background: "var(--midnight-green)" }}
    >
      {/* Orbs */}
      <div className="orb orb-b pointer-events-none absolute"
        style={{
          bottom: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "min(80vw, 950px)", height: "min(40vw, 480px)",
          background: "radial-gradient(ellipse, rgba(55,93,138,0.34) 0%, transparent 70%)",
          filter: "blur(clamp(65px,9vw,120px))",
        }}
      />
      <div className="orb orb-a pointer-events-none absolute"
        style={{
          top: "-5%", left: "-5%",
          width: "min(45vw, 540px)", height: "min(45vw, 540px)",
          background: "radial-gradient(circle, rgba(115,47,55,0.24) 0%, transparent 70%)",
          filter: "blur(clamp(55px,7vw,100px))",
          animationDelay: "6s",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.93 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 font-body text-[12px] font-normal uppercase tracking-[0.3em] text-text-muted-dark">
            Pricing
          </p>
          <h2
            className="gradient-text-light font-heading font-black"
            style={{ fontSize: "clamp(40px, 5.5vw, 76px)", lineHeight: 1 }}
          >
            Aligned with your growth<span style={{ WebkitTextFillColor: "var(--wine)" }}>.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] font-body font-light leading-relaxed text-text-muted-dark" style={{ fontSize: "clamp(17px, 1.8vw, 20px)" }}>
            We offer tiered packages to meet you where you are. Our growth packages include a revenue share. We only win when you win.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 65, rotate: i === 0 ? -5 : i === 2 ? 5 : 0, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.85, delay: i * 0.13, ease }}
              className="h-full"
            >
              {tier.featured ? (
                <div className="pricing-featured-wrap h-full">
                  <div
                    className="flex h-full flex-col rounded-[9px] p-10 md:p-12"
                    style={{ background: "rgba(55,93,138,0.22)" }}
                  >
                    <TierBody tier={tier} openModal={openModal} featured={true} />
                  </div>
                </div>
              ) : (
                <div
                  className="group flex h-full flex-col rounded-xl p-10 md:p-12 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(239,223,187,0.1)",
                  }}
                >
                  <TierBody tier={tier} openModal={openModal} featured={false} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
