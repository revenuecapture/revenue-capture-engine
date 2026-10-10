// All public-site copy lives here. Change words in this file, not in components.

export type Word = { t: string; mark?: boolean };

const words = (s: string): Word[] =>
  s.split(" ").map((raw) => {
    const mark = raw.startsWith("*");
    return { t: mark ? raw.slice(1) : raw, mark };
  });

export const brand = {
  name: "revCap",
  descriptor: "Revenue Capture Agency",
  line: "Rooted in marketing. Built for sales.",
  city: "Lahore",
  timeZone: "Asia/Karachi",
  emails: ["badr@revcap.xyz", "sarmad@revcap.xyz", "info@revcap.xyz"],
};

/* Pages, in menu order. `label` is what the pill and the page transition show. */
export const pages = [
  { path: "/", label: "Home", title: "revCap | Revenue Capture Agency" },
  { path: "/framework", label: "Framework", title: "The Framework | revCap" },
  { path: "/work", label: "Work", title: "Proof of Work | revCap" },
  { path: "/pricing", label: "Pricing", title: "Pricing | revCap" },
  { path: "/about", label: "About", title: "About | revCap" },
  { path: "/audit", label: "Free audit", title: "Get Your Free Audit | revCap" },
] as const;

export const pageLabel = (path: string) => {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/privacy") return "Privacy";
  return pages.find((p) => p.path === clean)?.label ?? "Lost";
};

export const hero = {
  lines: ["Revenue.", "Captured."],
  sub: "Brand, marketing, sales, proof. One team runs all four, so no revenue leaks between them.",
  cta: "Get your free audit",
  secondary: "See how it works",
};

export const steps = [
  {
    n: "01",
    title: "Brand Building",
    short: "Authority and trust, before anyone is asked to buy.",
    body: "We establish your authority and build trust on LinkedIn, Facebook, and Instagram. Your audience learns to see you as the solution.",
    includes: ["Positioning and narrative", "Visual identity and market-ready assets", "Community engagement strategy"],
    accent: "ice",
    chip: "blue",
  },
  {
    n: "02",
    title: "Brand Marketing",
    short: "Content and campaigns that create steady, compounding interest.",
    body: "We launch with compelling content and targeted messaging, generating evergreen interest. Not just impressions. Positioning.",
    includes: ["Creative and copy", "Performance and digital campaigns", "Budget ownership and reporting"],
    accent: "salt",
    chip: "wine",
  },
  {
    n: "03",
    title: "Sales Enablement",
    short: "Funnels, playbooks and outreach that turn interest into customers.",
    body: "Our sales expertise turns interest into qualified leads, then converts them into customers. We build the funnel, the playbooks, and the outreach systems.",
    includes: ["Inbound and outbound funnels", "Qualification and closing playbooks", "Outreach systems and coaching"],
    accent: "moth",
    chip: "pine",
  },
  {
    n: "04",
    title: "Social Proofing",
    short: "Every win captured and put to work on the next one.",
    body: "Every win becomes a catalyst. We capture testimonials, proof, and data that lower your future marketing costs and compound your credibility.",
    includes: ["Testimonials and case material", "Results data, captured as it happens", "Proof fed back into steps one to three"],
    accent: "cloud",
    chip: "ash",
  },
] as const;

export const proof = {
  label: "Proof of work",
  title: "Not what we can do. What we have done",
  stats: [
    { prefix: "NZ$", value: 840994, suffix: "", label: "Raised on Kickstarter for Phat Loot Studios", accent: "salt" },
    { prefix: "$", value: 1, suffix: "M+", label: "Spent on B2B lead generation", accent: "ice" },
    { prefix: "$", value: 3.4, suffix: "M", decimals: 1, label: "Generated in revenue for clients", accent: "moth" },
  ],
  marqueeLabel: "Brands we have built, marketed and sold for",
};

// w and h are display sizes in px, balanced so every mark carries similar visual weight.
export const logos = [
  { slug: "beaconhouse", name: "Beaconhouse", w: 103, h: 34 },
  { slug: "walee", name: "Walee", w: 108, h: 32 },
  { slug: "the-early-years", name: "The Early Years", w: 71, h: 48 },
  { slug: "gymboree", name: "Gymboree", w: 115, h: 29 },
  { slug: "premier-dlc", name: "Premier DLC", w: 34, h: 52 },
  { slug: "kasuri-farms", name: "Kasuri Farms", w: 50, h: 52 },
  { slug: "amet", name: "AMET Education", w: 96, h: 35 },
  { slug: "asfe", name: "AS Foreign Education Consultants", w: 146, h: 24 },
  { slug: "studyin", name: "StudyIn", w: 125, h: 28 },
  { slug: "bnu", name: "Beaconhouse National University", w: 35, h: 52 },
  { slug: "my-bag-pack", name: "My Bag Pack", w: 51, h: 52 },
  { slug: "ucs", name: "United Charter Schools", w: 34, h: 52 },
  { slug: "concordia", name: "Concordia Colleges", w: 37, h: 52 },
  { slug: "the-educators", name: "The Educators", w: 44, h: 52 },
  { slug: "joblogic", name: "Joblogic", w: 75, h: 45 },
  { slug: "rolustech", name: "Rolustech", w: 129, h: 27 },
  { slug: "kavtech", name: "Kavtech", w: 123, h: 27 },
  { slug: "akti", name: "Akti", w: 52, h: 52 },
];

export const problem = {
  label: "The problem",
  statement: words(
    "Most founders do not have a demand problem. They have an *asking problem. The *follow-up that never gets sent. The *outreach that waits for a quieter week. The *close that feels too forward.",
  ),
  aside: "Revenue stalls in the work nobody wants to do. That work is our whole job.",
  promise: "We are the only agency with skin in the game",
};

export const framework = {
  label: "How we work",
  title: "The blueprint",
  titleLines: ["The", "blueprint"],
  intro: "One system, four steps. Each one hands the next a warmer audience.",
  lede: "This is not a menu of services. It is one sequence, run by one team, that takes a business from unknown to chosen.",
  indexCta: "See the full framework",
};

export const audits = {
  label: "Where it begins",
  title: "It starts with an audit",
  intro: "Every engagement begins with a free, research-grade audit of your business. Competitor analysis, data-aligned recommendations, and a clear strategic frame.",
  items: [
    {
      n: "A",
      tag: "Paid media",
      title: "Meta Ads Audit",
      body: "A forensic review of your paid advertising. We identify where budget is leaking, which audiences are underserved, and where your highest-return opportunities live.",
      accent: "wine",
    },
    {
      n: "B",
      tag: "Brand and digital",
      title: "Digital Presence Audit",
      body: "A full analysis of your brand across every digital touchpoint: social, search, website, content. We map the gap between where you are and where you need to be.",
      accent: "blue",
    },
    {
      n: "C",
      tag: "Competitive intelligence",
      title: "Market Gap Audit",
      body: "We study your competitive landscape to find the white space your competitors are ignoring. This is where your positioning strategy lives.",
      accent: "pine",
    },
  ],
  note: "No commitment. No pitch. Just clarity.",
};

export const work = {
  label: "Proof of work",
  titleLines: ["What we", "have done"],
  lede: "Not what we can do. Brands we built from nothing, budgets we owned, and pipelines we ran.",
  cases: [
    { name: "Verbaly", kind: "D2C EdTech", line: "A brand built from scratch for the Gulf market: name, narrative, look and launch." },
    { name: "StudyIn", kind: "Education", line: "The complete global rebrand, rolled out for the Pakistan launch from ideation to execution." },
    { name: "ASFE Consultants", kind: "Education consulting", line: "A brand identity built from zero." },
    { name: "AMET Education", kind: "Education and migration", line: "A brand being brought to Pakistan with a refreshed, localised voice." },
    { name: "Phat Loot Studios", kind: "Gaming", line: "The brand narrative for Untamed Isles, which raised NZ$840,994 on Kickstarter." },
  ],
  groups: [
    {
      title: "Full-function ownership",
      body: "We owned every marketing function for these brands and managed their annual budgets directly.",
      slugs: ["the-early-years", "gymboree", "premier-dlc", "kasuri-farms", "amet", "asfe", "studyin"],
    },
    {
      title: "Creative and copy",
      body: "We owned the creative and the copy, including Save Our Stars, the campaign that won the Beaconhouse Group's first-ever Marketing Award.",
      slugs: ["bnu", "my-bag-pack", "ucs", "concordia", "the-educators"],
    },
    {
      title: "Sales enablement",
      body: "Funnels, playbooks and outreach systems that turned marketing leads into paying customers.",
      slugs: ["joblogic", "rolustech", "kavtech", "akti"],
    },
  ],
  quote: {
    text: "revCap helped us go from just an idea to a sustainable business with consistent revenue. Their end-to-end approach meant I could focus on teaching while they handled the marketing and sales. True partners in growth.",
    by: "Verbaly",
  },
};

export const pricing = {
  label: "Pricing",
  titleLines: ["Aligned with", "your growth"],
  lede: "Tiered packages that meet you where you are. Our growth packages include a revenue share. We only win when you win.",
  tiers: [
    {
      name: "Launchpad",
      price: "$999",
      period: "a month",
      share: "",
      ideal: "Businesses just getting started or testing a new market.",
      features: [
        "Foundational brand building on one platform (LinkedIn)",
        "Content strategy and creation, 4 to 6 posts a month",
        "Basic lead capture setup",
        "Monthly analytics report",
        "Dedicated account manager",
      ],
      cta: "Start with Launchpad",
      featured: false,
    },
    {
      name: "Growth Engine",
      price: "$2,499",
      period: "a month",
      share: "plus 1% revenue share",
      ideal: "Established businesses ready to scale and capture more revenue.",
      features: [
        "Everything in Launchpad",
        "Brand building on two to three platforms",
        "Advanced lead generation and funnel optimisation",
        "Dedicated sales funnel support",
        "Ad creative production",
        "Performance marketing management",
      ],
      cta: "Launch Growth Engine",
      featured: true,
    },
    {
      name: "Full Funnel",
      price: "Custom",
      period: "",
      share: "plus 1% revenue share",
      ideal: "Enterprise-level clients with complex, multi-market needs.",
      features: [
        "A fully customised revCap solution",
        "All four framework steps executed",
        "Priority support and dedicated resources",
        "Custom reporting and dashboards",
        "Direct access to the founding team",
      ],
      cta: "Get a custom quote",
      featured: false,
    },
  ],
  note: "Every engagement starts with the free audit, whichever tier follows.",
};

export const about = {
  label: "About",
  titleLines: ["Rooted in", "marketing.", "Built for sales"],
  lede: "revCap is a done-for-you revenue capture agency. We build, market and convert, closing the gap between marketing spend and actual money.",
  beliefLabel: "What we believe",
  belief: words(
    "Fragmented marketing wastes money. A brand with no system to capture revenue. A sales team with no leads to convert. We run the *whole *sequence, and we take a *share of what it earns.",
  ),
  teamLabel: "Your team",
  team: [
    {
      name: "Badr",
      role: "Strategy and Growth",
      body: "Expertise in applied psychology, economics, data and communications. Drives market positioning, brand strategy and revenue architecture.",
      email: "badr@revcap.xyz",
      accent: "salt",
    },
    {
      name: "Sarmad",
      role: "Sales and Network",
      body: "Specialist in sales, customer relations, personal branding and international networking. Runs outbound at scale and builds relationships that convert.",
      email: "sarmad@revcap.xyz",
      accent: "ice",
    },
  ],
};

export const ask = {
  label: "The ask",
  titleLines: ["Your revenue", "is waiting"],
  sub: "Start with a free audit. A clear picture of where your revenue is going and how to capture it.",
  promises: ["No commitment", "No pitch", "Just clarity"],
  auditTypes: ["Meta Ads Audit", "Digital Presence Audit", "Market Gap Audit", "Not sure, let revCap decide"],
  submit: "Ask for your audit",
  success: "Request received. We will review your details and be in touch within 24 hours.",
  error: "That did not send. Email info@revcap.xyz and we will pick it up.",
};

export const privacy = {
  label: "Privacy",
  titleLines: ["Privacy"],
  status: "Placeholder. A full policy will replace this page once revCap is registered as a company.",
  points: [
    "The audit form collects your name, business name, email address and anything you choose to write, so that we can reply to your request.",
    "Form submissions are delivered to us by Web3Forms, a form service.",
    "This site sets no advertising or analytics cookies.",
    "To have your details removed, email info@revcap.xyz.",
  ],
};
