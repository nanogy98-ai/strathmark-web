export interface NoteSeoData {
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lastModified: string;
  introduction: string;
  keyTakeaways: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const LAST_REVIEWED = "2026-07-17";

export const noteSeoData: Record<string, NoteSeoData> = {
  "marketing-retainer-failure": {
    seoTitle: "Marketing Retainers: Why Agency Retainers Fail",
    metaDescription: "Why marketing retainers stall after the first 90 days, the warning signs to watch, and better ways to hold an agency accountable for results.",
    primaryKeyword: "marketing retainer",
    secondaryKeywords: ["agency retainer", "marketing agency retainer", "agency accountability", "marketing retainer agreement"],
    lastModified: LAST_REVIEWED,
    introduction: "A marketing retainer can provide continuity, but only when the commercial model keeps effort, priorities, and outcomes visible. This guide explains why many agency retainers lose momentum after the first three months, how to recognise the decay early, and which governance models create stronger accountability.",
    keyTakeaways: [
      "A flat agency retainer can reward reduced effort once the easiest early wins have been delivered.",
      "The clearest warning signs are repetitive reporting, shrinking senior involvement, and no explicit link between activity and commercial outcomes.",
      "Defined sprints, independent oversight, or performance-linked fees can make a marketing retainer more accountable.",
    ],
    faqs: [
      {
        question: "What is a marketing retainer?",
        answer: "A marketing retainer is a recurring fee paid to an agency or consultant for an agreed level of ongoing support. The strongest agreements define priorities, decision rights, deliverables, and how commercial progress will be assessed.",
      },
      {
        question: "Why do agency retainers lose momentum?",
        answer: "Momentum often falls when the quick wins are complete and the remaining work requires more senior time, technical depth, or internal coordination. Without clear governance, routine activity and reporting can replace meaningful progress.",
      },
      {
        question: "How should a marketing retainer be measured?",
        answer: "Measure the decisions and commercial outcomes the work supports, not just hours, traffic, or deliverable counts. A useful review connects completed work to qualified demand, revenue, efficiency, risk reduction, or another agreed business result.",
      },
    ],
  },
  "traffic-is-not-kpi": {
    seoTitle: "Organic Traffic Not Converting? Fix the SEO Revenue Gap",
    metaDescription: "Organic traffic not converting into leads or revenue? Diagnose search intent, attribution, landing pages, and the KPIs that expose the real problem.",
    primaryKeyword: "organic traffic not converting",
    secondaryKeywords: ["SEO traffic not converting", "organic traffic to revenue", "SEO revenue", "SEO KPIs"],
    lastModified: LAST_REVIEWED,
    introduction: "When organic traffic grows but revenue does not, the problem is rarely solved by chasing more visits. The useful diagnosis starts with search intent, landing-page relevance, conversion paths, and revenue attribution. This guide shows how to separate valuable organic demand from traffic that only makes the dashboard look busy.",
    keyTakeaways: [
      "Organic traffic is only commercially useful when the visitor, page intent, and next action align.",
      "High-volume informational rankings can dilute conversion rates without creating qualified demand.",
      "SEO reporting should connect landing pages and search themes to leads, pipeline, revenue, and acquisition cost.",
    ],
    faqs: [
      {
        question: "Why is organic traffic not converting?",
        answer: "Common causes include low-intent keywords, a mismatch between the query and landing page, weak calls to action, poor mobile experience, or broken conversion tracking. Start by comparing each high-traffic page with the commercial intent of the searches bringing people there.",
      },
      {
        question: "Is organic traffic a useful SEO KPI?",
        answer: "Traffic is a useful diagnostic metric, but it is not a sufficient business KPI on its own. It becomes meaningful when segmented by relevant audience, intent, landing page, assisted conversions, qualified leads, and revenue.",
      },
      {
        question: "How do you measure SEO revenue?",
        answer: "Connect analytics with CRM or transaction data, use consistent conversion definitions, and review both direct and assisted journeys. For long B2B buying cycles, pipeline quality and progression are often more informative than last-click revenue alone.",
      },
    ],
  },
  "ad-account-audit": {
    seoTitle: "Google Ads Audit Checklist: 3 Checks in 30 Minutes",
    metaDescription: "Use this practical Google Ads audit checklist to inspect search terms, location targeting, and conversion tracking before more budget is wasted.",
    primaryKeyword: "Google Ads audit checklist",
    secondaryKeywords: ["Google Ads audit", "PPC audit checklist", "Google Ads account audit", "audit Google Ads account"],
    lastModified: LAST_REVIEWED,
    introduction: "A full Google Ads audit can be extensive, but three checks reveal a surprising amount about account quality: the actual search terms being bought, where ads are really serving, and whether conversion tracking reflects commercial outcomes. Use this focused checklist as a fast risk screen before commissioning a deeper review.",
    keyTakeaways: [
      "The search terms report reveals whether paid clicks match the intent and economics of the offer.",
      "Location settings can quietly buy traffic from places the business does not serve.",
      "Incorrect conversion tracking can train automated bidding to optimise for activity that has little or no commercial value.",
    ],
    faqs: [
      {
        question: "What should a Google Ads audit include?",
        answer: "A complete audit should cover measurement, search terms, keywords, campaign structure, bidding, budgets, locations, audiences, ads, landing pages, and account governance. Each finding should be prioritised by commercial impact rather than presented as an unranked settings list.",
      },
      {
        question: "How often should you audit a Google Ads account?",
        answer: "High-spend or fast-changing accounts need frequent control checks, while a deeper independent audit is useful after major strategy changes, tracking migrations, or sustained performance decline. The right cadence depends on spend, volatility, and internal oversight.",
      },
      {
        question: "Can a Google Ads audit reduce wasted spend?",
        answer: "It can identify the settings, queries, audiences, and measurement errors associated with avoidable spend. Savings are not guaranteed, but a prioritised audit gives the team a defensible basis for stopping leakage and reallocating budget.",
      },
    ],
  },
  "hidden-cost-technical-debt": {
    seoTitle: "Digital Marketing Technical Debt: Cost and Audit",
    metaDescription: "Learn how digital marketing technical debt damages SEO, analytics, speed, and conversion—and how to audit and prioritise the underlying risks.",
    primaryKeyword: "digital marketing technical debt",
    secondaryKeywords: ["marketing technology debt", "website technical debt", "SEO technical debt", "martech technical debt"],
    lastModified: LAST_REVIEWED,
    introduction: "Digital marketing technical debt is the accumulated cost of expedient platform, tracking, and website decisions that were never properly resolved. It shows up as slower releases, unreliable data, fragile integrations, poor search visibility, and conversion loss. This guide turns that hidden engineering burden into a commercial risk leadership can evaluate.",
    keyTakeaways: [
      "Technical debt compounds when short-term website and martech decisions create recurring operational friction.",
      "Search rendering, indexability, analytics integrity, and Core Web Vitals should be assessed together rather than as isolated issues.",
      "The best remediation plan ranks work by revenue exposure, risk, dependency, and implementation effort.",
    ],
    faqs: [
      {
        question: "What is digital marketing technical debt?",
        answer: "It is the future cost created by shortcuts or outdated choices across websites, analytics, tags, integrations, CMS platforms, and marketing tools. The debt becomes visible when teams cannot ship changes safely, trust their data, or maintain performance without repeated fixes.",
      },
      {
        question: "How does technical debt affect SEO?",
        answer: "It can obstruct crawling and rendering, create duplicate or orphaned pages, slow templates, break structured data, and make improvements difficult to deploy. The ranking impact is indirect but material because search engines and users receive a weaker, less reliable site.",
      },
      {
        question: "How should technical debt be prioritised?",
        answer: "Start with issues that threaten revenue, measurement, security, indexation, or critical user journeys. Then map dependencies so the organisation fixes root causes before spending money on cosmetic symptoms.",
      },
    ],
  },
  "seo-audit-checklist": {
    seoTitle: "Enterprise SEO Audit Checklist: 12 Critical Checks",
    metaDescription: "A 12-point enterprise SEO audit checklist covering crawl budget, index bloat, rendering, internal links, Core Web Vitals, schema, and governance.",
    primaryKeyword: "enterprise SEO audit checklist",
    secondaryKeywords: ["enterprise SEO audit", "technical SEO audit checklist", "large website SEO audit", "enterprise technical SEO"],
    lastModified: LAST_REVIEWED,
    introduction: "An enterprise SEO audit is not simply a longer version of a small-site checklist. Large websites amplify template defects, index bloat, ownership gaps, and deployment constraints across thousands or millions of URLs. These 12 checks focus on the structural issues that affect search performance at scale and the governance required to get fixes shipped.",
    keyTakeaways: [
      "Enterprise SEO risk usually sits in templates, systems, and governance—not isolated page-level errors.",
      "Segmenting audit findings by page type and commercial value prevents large issue counts from distorting priorities.",
      "A useful audit ends with owners, dependencies, effort, expected impact, and a sequenced implementation roadmap.",
    ],
    faqs: [
      {
        question: "What is included in an enterprise SEO audit?",
        answer: "It should assess crawling, indexation, rendering, templates, canonicals, internal links, performance, structured data, mobile parity, response codes, content overlap, authority, and international targeting where relevant. It should also examine governance and the route from finding to deployment.",
      },
      {
        question: "How is enterprise SEO different from standard SEO?",
        answer: "The fundamentals are similar, but scale changes the consequences and implementation model. One template problem can affect vast sections of a site, while multiple teams, platforms, markets, and release processes make prioritisation and ownership harder.",
      },
      {
        question: "How often should an enterprise SEO audit be run?",
        answer: "Continuous monitoring should catch operational drift, with a deeper audit around migrations, redesigns, platform changes, acquisitions, or unexplained performance shifts. A calendar alone is less useful than auditing when material risk or change is present.",
      },
    ],
  },
  "google-ads-wasted-spend": {
    seoTitle: "Google Ads Wasted Spend: 6 Enterprise Budget Leaks",
    metaDescription: "Find the six silent causes of Google Ads wasted spend in enterprise accounts, from broad match and bad conversion data to geo and landing-page leaks.",
    primaryKeyword: "Google Ads wasted spend",
    secondaryKeywords: ["wasted Google Ads spend", "reduce Google Ads waste", "Google Ads budget waste", "enterprise PPC audit"],
    lastModified: LAST_REVIEWED,
    introduction: "Google Ads wasted spend is rarely caused by one spectacular mistake. In large accounts it accumulates through defaults, weak data, fragmented ownership, and small leaks repeated across campaigns and markets. This guide identifies six high-cost patterns and explains what leadership should ask before approving more budget.",
    keyTakeaways: [
      "Automation magnifies the quality of its inputs, so weak conversion data can scale the wrong behaviour quickly.",
      "Broad match, audience expansion, network settings, and geographic targeting need commercial guardrails rather than passive acceptance.",
      "The correct output of a paid-media review is a ranked recovery plan, not a larger dashboard.",
    ],
    faqs: [
      {
        question: "What causes wasted spend in Google Ads?",
        answer: "Frequent causes include irrelevant search terms, loose location settings, low-quality conversion signals, unsuitable automated bidding, weak exclusions, poor landing-page alignment, and budgets allocated without marginal-return analysis.",
      },
      {
        question: "How do you find wasted Google Ads spend?",
        answer: "Reconcile platform conversions with real sales outcomes, then inspect search terms, locations, devices, networks, audiences, campaign goals, and landing pages. Segment the waste by cause and value so the largest recoverable leaks are addressed first.",
      },
      {
        question: "Does increasing Google Ads budget improve performance?",
        answer: "Only when the account has reliable measurement and can still acquire valuable demand at an acceptable marginal cost. Increasing budget in a poorly governed account often scales inefficiency rather than correcting it.",
      },
    ],
  },
  "agency-vs-consultant": {
    seoTitle: "Marketing Agency vs Consultant: Which Should You Hire?",
    metaDescription: "Compare a marketing agency vs consultant by strategy, execution, cost, accountability, and fit—plus the warning signs that your model should change.",
    primaryKeyword: "marketing agency vs consultant",
    secondaryKeywords: ["marketing consultant vs agency", "digital marketing consultant vs agency", "hire marketing consultant", "marketing agency alternative"],
    lastModified: LAST_REVIEWED,
    introduction: "The choice between a marketing agency and an independent consultant is not a contest between good and bad providers. It is a question of whether the immediate constraint is judgement, execution capacity, specialist depth, or accountability. This comparison helps leadership choose the operating model that fits the problem instead of buying the most familiar label.",
    keyTakeaways: [
      "Choose an agency when the strategy and brief are clear but execution capacity is constrained.",
      "Choose a consultant when the organisation needs diagnosis, senior judgement, prioritisation, or independent challenge.",
      "A hybrid model can combine independent oversight with specialist delivery when spend or risk justifies both.",
    ],
    faqs: [
      {
        question: "What is the difference between a marketing agency and consultant?",
        answer: "An agency normally provides a team and delivery capacity across agreed services, while a consultant is usually hired for senior expertise, diagnosis, strategy, or oversight. The distinction is not absolute, so the proposed responsibilities and decision rights matter more than the label.",
      },
      {
        question: "When should you hire a marketing consultant?",
        answer: "A consultant is useful when the problem is unclear, leadership needs an independent view, priorities conflict, agency work requires oversight, or the organisation needs senior capability without another full-time hire.",
      },
      {
        question: "When is a marketing agency the better choice?",
        answer: "An agency is often better when there is a clear strategy, defined scope, sufficient internal ownership, and a genuine need for coordinated execution across several specialisms. The client still needs the capability to brief, govern, and evaluate the work.",
      },
    ],
  },
  "digital-due-diligence": {
    seoTitle: "Digital Due Diligence Checklist for Acquisitions",
    metaDescription: "A practical digital due diligence checklist for acquisitions, covering SEO, paid media, analytics, website risk, martech, content, contracts, and IP.",
    primaryKeyword: "digital due diligence checklist",
    secondaryKeywords: ["digital due diligence", "digital acquisition due diligence", "marketing due diligence checklist", "website due diligence"],
    lastModified: LAST_REVIEWED,
    introduction: "Digital due diligence tests whether the acquisition target's online demand, marketing data, website, technology, and vendor arrangements support the investment case. It exposes revenue concentration, hidden remediation costs, and dependencies that conventional financial and legal work may not reveal. Use this seven-part framework before valuation assumptions harden into the deal model.",
    keyTakeaways: [
      "Digital due diligence should validate the durability and economics of online customer acquisition, not just confirm that traffic exists.",
      "Analytics, account ownership, technical health, content value, martech contracts, and search dependency can all create post-close liabilities.",
      "Findings become decision-useful when translated into remediation cost, revenue risk, timing, and ownership.",
    ],
    faqs: [
      {
        question: "What is digital due diligence?",
        answer: "Digital due diligence is the independent assessment of a target company's websites, search visibility, paid media, analytics, marketing technology, content assets, digital contracts, and operational dependencies before an investment or acquisition.",
      },
      {
        question: "What should a digital due diligence checklist cover?",
        answer: "It should cover channel dependency and economics, data quality, website and platform health, content performance, martech costs, security and access, account ownership, vendor contracts, intellectual property, and the investment needed after close.",
      },
      {
        question: "When should digital due diligence begin?",
        answer: "It should begin early enough for findings to influence valuation, warranties, integration planning, and the decision to proceed. Leaving it until after commercial assumptions are fixed reduces its value to the deal team.",
      },
    ],
  },
  "seo-industry-corruption-problem": {
    seoTitle: "SEO Agency Red Flags: How to Avoid SEO Scams",
    metaDescription: "Learn the SEO agency red flags behind guaranteed rankings, vague deliverables, vanity reports, risky links, asset lock-in, and long contracts.",
    primaryKeyword: "SEO agency red flags",
    secondaryKeywords: ["SEO scams", "bad SEO agency", "how to choose an SEO agency", "SEO company red flags"],
    lastModified: LAST_REVIEWED,
    introduction: "The most dangerous SEO agency red flags are visible before the contract is signed: ranking guarantees, vague methods, commodity link packages, vanity reporting, and attempts to control client accounts. This guide explains why those signals matter, how SEO scams exploit information asymmetry, and the questions that expose a weak provider early.",
    keyTakeaways: [
      "No provider controls Google, so guaranteed positions or fixed ranking timelines are a serious warning sign.",
      "Good SEO makes the method, trade-offs, risks, ownership, and commercial objective understandable to the client.",
      "The client should retain administrative control of domains, analytics, Search Console, content, advertising accounts, and data.",
    ],
    faqs: [
      {
        question: "What are the biggest SEO agency red flags?",
        answer: "Watch for guaranteed rankings, secret methods, unexplained link packages, generic monthly deliverables, vanity-only reporting, aggressive lock-in, unclear account ownership, and an inability to explain how work supports commercial demand.",
      },
      {
        question: "Can an SEO agency guarantee page-one rankings?",
        answer: "No credible provider can control a specific Google position or guarantee when it will be achieved. A provider can commit to a transparent process, technical quality, useful content, measurement, and prioritised implementation.",
      },
      {
        question: "How do you avoid an SEO scam?",
        answer: "Ask for a specific first-90-day plan, recent relevant evidence, ownership terms, risk disclosures, reporting examples, and a plain-English explanation of every tactic. Avoid any provider that uses urgency or jargon to prevent scrutiny.",
      },
    ],
  },
};

export function getNoteSeoData(slug: string): NoteSeoData {
  const data = noteSeoData[slug];

  if (!data) {
    throw new Error(`Missing SEO data for insight: ${slug}`);
  }

  return data;
}
