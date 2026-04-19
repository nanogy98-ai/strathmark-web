export type ProposalRouteKey = "A" | "B";

export type ProposalRouteContent = {
  label: string;
  optionLabel: string;
  title: string;
  summary: string;
  investment: string[];
  paymentDueNow: {
    label: string;
    amount: string;
    reference: string;
    followOn: string;
  };
};

export const routeAIncludes = [
  "Discovery and strategic page planning",
  "Rebuild from Squarespace to a modern Next.js and React site",
  "Improved information architecture and mobile experience",
  "Copy written in-house in your existing brand voice (pre-approval welcome)",
  "Migration of priority content",
  "SEO-ready page structure and metadata control",
  "Authority and content hub foundation",
  "GDPR, cookie, and Irish/EU-aligned privacy and terms frameworks built in",
  "Vercel hosting included free for the lifetime of the site",
  "Better conversion paths for future campaigns",
  "Post-launch transition into monthly growth support",
];

export const routeAUpside = [
  "Stronger first impression for serious prospects",
  "Better base for non-branded search visibility",
  "Better use of educational content and training material",
  "More premium positioning overall",
  "Better long-term conversion infrastructure",
];

export const routeBIncludes = [
  "Facebook campaign planning and setup",
  "Audience targeting around service radius and business fit",
  "Messaging angle development",
  "Campaign management and iteration",
  "Lead handling recommendations",
  "Rebuild deferred to a later stage if preferred",
];

export const routeBUpside = [
  "Faster route to paid visibility",
  "No upfront rebuild fee — same retainer, lower entry cost",
  "Useful for testing messaging and offer angles",
];

export const routeAPhases = [
  { title: "Discovery and architecture", copy: "Agree structure, priorities, key pages, and the role of the authority hub. Typically days 1–3.", duration: "Days 1–3" },
  { title: "Design and build", copy: "Develop the new site, refine the experience, and prepare the content and launch setup. Typically days 4–14.", duration: "Days 4–14" },
  { title: "Migration and launch", copy: "Move agreed content across, carry out launch checks, and go live. The site goes live on receipt of the balance payment — typically 12 to 18 calendar days from the agreed start date depending on scope.", duration: "Days 12–18 · Live on receipt of balance" },
  { title: "Ongoing growth support", copy: "Monthly retainer begins on launch day — not before. Month 1 is 18 hours for an intensive setup ramp; month 2 onwards drops to 10 hours of steady-state management.", duration: "From launch day" },
];

export const routeBPhases = [
  { title: "Strategy and campaign setup", copy: "Define audiences, angles, campaign structure, and initial rollout plan.", duration: "Week 1" },
  { title: "Campaign launch and optimisation", copy: "Deploy campaigns, review response, and refine targeting and messaging as results come in.", duration: "Week 2 onwards" },
  { title: "Rebuild decision point", copy: "Once the campaigns and lead flow are clearer, decide whether to proceed with the stronger long-term rebuild at the €3,400 fee.", duration: "Any time" },
];

export const ROUTE_CONTENT: Record<ProposalRouteKey, ProposalRouteContent> = {
  A: {
    label: "Route A",
    optionLabel: "Option A",
    title: "Rebuild first, then scale demand",
    summary: "Create a professional foundation first, then use it to support ongoing B2B SEO and authority-building content.",
    investment: [
      "One-off rebuild fee: €3,400 (€1,700 deposit on agreed start date, €1,700 balance due on launch — site goes live on receipt)",
      "Vercel hosting included free for the lifetime of the site",
      "GDPR, cookie, and Irish/EU-aligned privacy and terms frameworks built in — no extra fee",
      "Site copy written in-house in your existing brand voice (pre-approval welcome)",
      "Month 1 retainer (begins on launch): €1,080 — 18 hours intensive ramp",
      "Month 2 onwards: €600 / month — 10 hours steady-state (includes video editing and photo enhancement)",
      "Hourly rate: €60. Hours flex up or down by mutual agreement.",
      "Your ad spend is paid by you directly to Meta and is separate from the retainer.",
      "I will recommend an ad budget with you at the time based on your goals.",
      "The budget is flexible and can be increased or reduced at any point.",
      "The more you spend, the more people your ads can reach.",
      "Unlike Google Ads, you are not simply paying per click.",
    ],
    paymentDueNow: {
      label: "Deposit to commence the rebuild",
      amount: "€1,700",
      reference: "TCC Ireland — Route A deposit",
      followOn: "Balance of €1,700 is due on launch — the site goes live on receipt of this payment. Retainer begins on launch at €1,080 for month 1 (18 hrs), then €600 per month thereafter (10 hrs).",
    },
  },
  B: {
    label: "Route B",
    optionLabel: "Option B",
    title: "Paid campaigns first, rebuild later",
    summary: "Delay the platform overhaul and move straight into a focused Facebook strategy to capture immediate market interest.",
    investment: [
      "Month 1 retainer: €1,080 — 18 hours intensive ramp",
      "Month 2 onwards: €600 / month — 10 hours ongoing management",
      "Hourly rate: €60. Same retainer as Route A — no rebuild included.",
      "Rebuild can be commissioned separately at €3,400 at any point.",
      "Your ad spend is paid by you directly to Meta and is separate from the retainer.",
      "I will recommend an ad budget with you at the time based on your goals.",
      "The budget is flexible and can be increased or reduced at any point.",
      "The more you spend, the more people your ads can reach.",
      "Unlike Google Ads, you are not simply paying per click.",
    ],
    paymentDueNow: {
      label: "Month 1 retainer to commence",
      amount: "€1,080",
      reference: "TCC Ireland — Route B month 1",
      followOn: "Each subsequent month is €600, due on the same calendar day each month.",
    },
  },
};
