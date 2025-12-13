export interface Note {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
}

export const notes: Note[] = [
  {
    slug: "marketing-retainer-failure",
    title: "Why Most Marketing Retainers Fail After Month 3",
    category: "Commercial",
    excerpt: "The incentive structure of a standard agency retainer is designed to maximize margin by minimizing activity. Here is the mathematical proof.",
    content: `
      <h2>The Efficiency Trap</h2>
      <p>In month one, an agency works hard to onboard you. In month two, they execute the low-hanging fruit. By month three, they have stabilized the account.</p>
      <p>From that point forward, every hour they <em>don't</em> work is pure profit. The retainer model incentivizes inaction.</p>
      <h2>The Sprint Model</h2>
      <p>We do not sell time. We sell outcomes. Our engagements are structured as sprints with defined deliverables. If the sprint doesn't move the needle, there is no next sprint.</p>
    `
  },
  {
    slug: "traffic-is-not-kpi",
    title: "Traffic is Not a KPI. Revenue Is.",
    category: "Strategy",
    excerpt: "Any engineer can double your traffic in 30 days by targeting irrelevant, high-volume keywords. It looks great on a report and adds zero to your bottom line.",
    content: `
      <h2>Vanity Metrics</h2>
      <p>I once audited a site with 500k monthly visitors. They were celebrating "record growth."</p>
      <p>90% of that traffic was landing on a single blog post about "how to tie a tie." Their product was B2B enterprise software. The traffic was worthless.</p>
      <h2>Commercial Intent</h2>
      <p>We filter keywords by commercial intent, not volume. 100 visitors who want to buy are worth more than 100,000 who want to learn.</p>
    `
  },
  {
    slug: "ad-account-audit",
    title: "The 30-Minute Ad Account Audit",
    category: "Paid Media",
    excerpt: "How to tell if your PPC agency is asleep at the wheel by checking three specific settings in Google Ads.",
    content: `
      <h2>1. Search Terms Report</h2>
      <p>If your agency hasn't added negative keywords in the last 30 days, you are paying for waste. Check the "Search Terms" report. If you see competitors or irrelevant terms, fire them.</p>
      <h2>2. Location Settings</h2>
      <p>Are you "targeting people in, or who show interest in, your targeted location"? That is the default setting. It means someone in a different country searching <em>about</em> your city sees your ad.</p>
      <h2>3. Conversion Tracking</h2>
      <p>If "All Conversions" is the primary metric, they are counting page views as leads. Only count form fills and purchases.</p>
    `
  },
  {
    slug: "hidden-cost-technical-debt",
    title: "The Hidden Cost of Technical Decisions",
    category: "Infrastructure",
    excerpt: "Choosing a JavaScript-heavy framework for a content site is a six-figure mistake waiting to happen.",
    content: `
      <h2>The Render Tax</h2>
      <p>Google has a "crawl budget" for your site. If your pages take 5 seconds to render because of client-side JavaScript, Google crawls fewer pages.</p>
      <h2>Indexability vs. Crawlability</h2>
      <p>Just because Google <em>can</em> render JS doesn't mean it wants to. We see massive enterprise sites with 40% of their inventory de-indexed simply because the bot gave up waiting for the content to load.</p>
    `
  }
];

