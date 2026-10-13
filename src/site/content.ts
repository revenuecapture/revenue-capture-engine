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
      tint: "salt",
      slug: "meta-ads",
    },
    {
      n: "B",
      tag: "Brand and digital",
      title: "Digital Presence Audit",
      body: "A full analysis of your brand across every digital touchpoint: social, search, website, content. We map the gap between where you are and where you need to be.",
      accent: "blue",
      tint: "ice",
      slug: "digital-presence",
    },
    {
      n: "C",
      tag: "Competitive intelligence",
      title: "Market Gap Audit",
      body: "We study your competitive landscape to find the white space your competitors are ignoring. This is where your positioning strategy lives.",
      accent: "pine",
      tint: "moth",
      slug: "market-gap",
    },
  ],
  note: "No commitment. No pitch. Just clarity.",
  pickLabel: "Pick the one that fits. It goes straight into the form.",
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
  oneLine: ["Your revenue is waiting"],
  sub: "Start with a free audit. A clear picture of where your revenue is going and how to capture it.",
  promises: ["No commitment", "No pitch", "Just clarity"],
  auditTypes: ["Meta Ads Audit", "Digital Presence Audit", "Market Gap Audit", "Not sure, let revCap decide"],
  submit: "Ask for your audit",
  success: "Request received. We will review your details and be in touch within 24 hours.",
  error: "That did not send. Email info@revcap.xyz and we will pick it up.",
};

/* ── Privacy ───────────────────────────────────────────────
   LEGAL_NAME is the only thing to change once the company is registered.
   Put the registered name here (for example "revCap (Private) Limited") and
   the notice will read "<registered name> (trading as revCap)" where it
   identifies the company. Add the registered address to the Contact section. */
export const LEGAL_NAME = "revCap";

const company = LEGAL_NAME === brand.name ? brand.name : `${LEGAL_NAME} (trading as ${brand.name})`;

export type LegalBlock =
  | string
  | { list: string[] }
  | { rows: { purpose: string; data: string; basis: string }[] };

export const privacy = {
  label: "Privacy",
  titleLines: ["Privacy"],
  updated: "13 October 2026",
  lede: `How ${brand.name} collects, uses and protects personal data, and the rights you have over it.`,
  sections: [
    {
      id: "who",
      title: "Who we are",
      blocks: [
        `${company} is a revenue operations agency based in Lahore, Pakistan. We are the controller of the personal data described in this notice, which means we decide why and how it is used.`,
        "This notice covers revcap.xyz, our free audits and our work with clients. We follow the EU General Data Protection Regulation (GDPR) and the UK GDPR, and we give the same rights to everyone, wherever they live.",
        "For any question or request about your data, email info@revcap.xyz.",
      ],
    },
    {
      id: "collect",
      title: "What we collect",
      blocks: [
        "We collect only what we need to answer you and to do the work.",
        {
          list: [
            "Audit requests: your name, business name, work email address, the audit you choose, and anything you write in the message field.",
            "Correspondence: your name, contact details, role and company, and what you send us.",
            "Client work: the contact details of the people we work with, and the information a client shares with us so we can deliver the work.",
            "Public information about your business: to prepare an audit we review what your business publishes, such as its website, social profiles and adverts.",
            "Technical data: when you load a page, our hosting provider's servers receive your IP address, browser and device details, the page requested and the time. Every website works this way. We do not use this data to identify you.",
          ],
        },
        "Please do not send us sensitive information, such as health details, through the form or by email. We do not need it.",
      ],
    },
    {
      id: "use",
      title: "How we use it",
      blocks: [
        "Each use has a legal basis under Article 6 of the GDPR.",
        {
          rows: [
            {
              purpose: "Reply to your audit request and prepare the audit",
              data: "Audit request details; public information about your business",
              basis: "Steps you asked us to take before a contract (6(1)(b)), or our legitimate interest in answering business enquiries (6(1)(f))",
            },
            {
              purpose: "Follow up about your audit and how we could work together",
              data: "Name, business, email address, correspondence",
              basis: "Our legitimate interest in following up with businesses that asked to hear from us (6(1)(f)). You can tell us to stop at any time.",
            },
            {
              purpose: "Deliver our services and manage the relationship",
              data: "Client contact details, correspondence, material shared for the work",
              basis: "Performance of a contract (6(1)(b))",
            },
            {
              purpose: "Keep this website secure and working",
              data: "Technical data",
              basis: "Our legitimate interest in running a secure website (6(1)(f))",
            },
            {
              purpose: "Meet legal obligations and deal with legal claims",
              data: "Only what the obligation or claim requires",
              basis: "Legal obligation (6(1)(c)); our legitimate interest in defending our rights (6(1)(f))",
            },
          ],
        },
        "We do not sell personal data. We do not make decisions about you by automated means, and we do not build profiles of you.",
      ],
    },
    {
      id: "share",
      title: "Who we share it with",
      blocks: [
        "We use a small number of service providers, who handle data on our behalf under their data processing terms.",
        {
          list: [
            "Web3Forms, run by Web3Creative (India), receives what you submit through the audit form and delivers it to our inbox. Along with your answers it processes technical details such as your IP address, the time and the page you sent it from, and it uses its own providers for hosting and spam filtering.",
            "Netlify, Inc. (United States) hosts this website.",
            "Our email provider keeps our correspondence, including audit requests.",
            "Professional advisers, such as accountants and lawyers, when we need their advice.",
            "Courts, regulators and other authorities, when the law requires it.",
          ],
        },
      ],
    },
    {
      id: "transfers",
      title: "Where your data goes",
      blocks: [
        "We work from Pakistan, and the providers above operate from India, the United States and the European Union. Your data is therefore handled outside the UK and the European Economic Area, including in countries whose data protection laws have not been recognised as equivalent to the GDPR.",
        "Where our providers move data across borders they rely on recognised safeguards. Web3Forms' data processing terms include the European Commission's Standard Contractual Clauses. Netlify uses Standard Contractual Clauses and takes part in the EU-U.S. Data Privacy Framework. Ask us if you would like more detail.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      blocks: [
        {
          list: [
            "Audit requests that do not lead to work together: up to 12 months after our last contact, then deleted.",
            "Client records: for the length of the engagement, then for as long as the law requires us to keep business records.",
            "Copies held by our providers follow their own terms. Web3Forms' terms allow it to keep submission data for up to three years, and it says it deletes its server logs about every two months. Netlify keeps hosting logs for a limited period.",
          ],
        },
        "You can ask us to delete your data sooner at any time.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and tracking",
      blocks: [
        "The public pages of revcap.xyz set no cookies. There is no analytics, no advertising pixel and no third-party tracker, and our fonts are served from our own domain.",
        "One small item is kept in your browser's session storage to remember that the opening animation has already played. It holds no personal data, never leaves your browser, and is cleared when you close the tab.",
        "If we add analytics or advertising tools in future, we will update this notice first and ask for your consent where the law requires it.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          list: [
            "Access: ask for a copy of the personal data we hold about you.",
            "Correction: ask us to fix anything inaccurate or incomplete.",
            "Erasure: ask us to delete your data.",
            "Restriction: ask us to limit how we use it while a concern is looked into.",
            "Objection: object to any use based on our legitimate interests. If you object to follow-up about our services, we stop.",
            "Portability: ask for the data you gave us in a common, machine-readable format.",
            "Consent: where we rely on your consent, withdraw it at any time.",
          ],
        },
        "Email info@revcap.xyz to use any of these rights. There is no charge. We reply within one month, and we may ask you to confirm your identity first.",
        "You can also complain to a data protection authority: the one where you live or work in the EU, or the Information Commissioner's Office in the UK (ico.org.uk). We would appreciate the chance to put things right first.",
      ],
    },
    {
      id: "security",
      title: "Keeping it safe",
      blocks: [
        "This site is served over an encrypted connection (HTTPS), and only the people at revCap who need your data can access it.",
        "No way of sending or storing data is completely secure. If a breach puts your data at risk, we will tell you and the relevant authority as the law requires.",
      ],
    },
    {
      id: "clients",
      title: "When we act for clients",
      blocks: [
        "When we run marketing or sales work for a client, we may handle personal data on that client's behalf, such as their leads or customers. The client is the controller of that data and its own privacy notice applies. If your question is about that data, contact the client, or write to us and we will pass it on.",
      ],
    },
    {
      id: "children",
      title: "Children",
      blocks: ["Our services are for businesses. We do not knowingly collect personal data from anyone under 16."],
    },
    {
      id: "changes",
      title: "Changes",
      blocks: ["We update this notice when what we do changes. The date at the top shows when it last changed."],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [`${company}, Lahore, Pakistan. Email info@revcap.xyz.`],
    },
  ] as { id: string; title: string; blocks: LegalBlock[] }[],
  formNote: "We use these details to reply and prepare your audit.",
};
