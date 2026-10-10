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
  city: "Lahore",
  timeZone: "Asia/Karachi",
  emails: ["badr@revcap.xyz", "sarmad@revcap.xyz", "info@revcap.xyz"],
};

export const hero = {
  lines: ["Revenue.", "Captured."],
  sub: "Follow-ups, outreach, closing. The work founders put off is the work we do.",
  cta: "Get your free audit",
  secondary: "See how it works",
};

export const steps = [
  {
    n: "01",
    title: "Brand Building",
    body: "We establish your authority and build trust on LinkedIn, Facebook, and Instagram. Your audience learns to see you as the solution.",
    accent: "ice",
    chip: "blue",
  },
  {
    n: "02",
    title: "Brand Marketing",
    body: "We launch with compelling content and targeted messaging, generating evergreen interest. Not just impressions. Positioning.",
    accent: "salt",
    chip: "wine",
  },
  {
    n: "03",
    title: "Sales Enablement",
    body: "Our sales expertise turns interest into qualified leads, then converts them into customers. We build the funnel, the playbooks, and the outreach systems.",
    accent: "moth",
    chip: "pine",
  },
  {
    n: "04",
    title: "Social Proofing",
    body: "Every win becomes a catalyst. We capture testimonials, proof, and data that lower your future marketing costs and compound your credibility.",
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
  intro: "One system, four steps. Each one hands the next a warmer audience.",
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

export const nav = [
  { id: "top", label: "Home" },
  { id: "proof", label: "Proof" },
  { id: "problem", label: "The problem" },
  { id: "framework", label: "Framework" },
  { id: "ask", label: "The ask" },
];
