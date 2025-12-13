export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  region: string;
  engagementType: string;
  metrics: {
    label: string;
    value: string;
  }[];
  excerpt: string;
  content: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "organic-turnaround-uk-automotive",
    title: "Reversing Organic Decline and Scaling Search Performance at a UK Automotive Brand",
    industry: "Automotive",
    region: "United Kingdom",
    engagementType: "Advisory + Structural Remediation",
    metrics: [
      { label: "Organic Clicks", value: "29,200" },
      { label: "Impressions Served", value: "24.5M" },
      { label: "Click Trend", value: "Sustained Upward" }
    ],
    excerpt: "How a national vehicle leasing brand reversed a prolonged decline by fixing structural architecture instead of chasing algorithms.",
    content: `
      <h2>Context</h2>
      <p>A large UK automotive leasing business, First Vehicle Leasing, was experiencing a prolonged decline in organic search performance.</p>
      <p>Despite strong brand awareness and a significant monthly marketing budget, organic traffic had stagnated and then steadily eroded over time. Visibility across commercial keywords weakened, click growth stalled, and search performance no longer reflected the scale of the business.</p>
      <p>This was not a content problem. It was not a demand problem. It was a structural one.</p>

      <h2>The Problem</h2>
      <p>At the outset, the site suffered from a combination of issues common in high-growth organisations:</p>
      <ul>
        <li>Fragmented site architecture following years of incremental changes</li>
        <li>Misaligned priorities between commercial teams and search strategy</li>
        <li>Over-reliance on surface-level metrics rather than revenue-linked outcomes</li>
        <li>Technical decisions being made without understanding downstream impact</li>
      </ul>
      <p>The result was predictable. The site was visible but inefficient. Search engines could see it, but could not fully understand or prioritise it.</p>

      <h2>The Approach</h2>
      <p>Rather than launching into execution, the engagement began with a full diagnostic review.</p>
      <p>This included:</p>
      <ul>
        <li>Historical performance analysis across queries and pages</li>
        <li>Structural evaluation of how key commercial pages were discovered, grouped, and ranked</li>
        <li>Identification of bottlenecks suppressing click-through and ranking progression</li>
        <li>Alignment of search priorities with actual revenue drivers, not vanity metrics</li>
      </ul>
      <p>No assumptions. No templated fixes. The objective was clarity before action.</p>

      <h2>The Outcome</h2>
      <p>Following structural corrections and prioritised changes, organic performance reversed course decisively.</p>
      <p>Over the measured period:</p>
      <ul>
        <li><strong>29,200</strong> organic clicks generated</li>
        <li><strong>24.5 million</strong> impressions served</li>
        <li>Sustained upward trend in daily clicks</li>
        <li>Average ranking position improved materially across key commercial terms</li>
      </ul>
      <p>Most importantly, this recovery was not driven by short-term tactics. It was the result of fixing how the site functioned as a system.</p>
      <p>Search performance stabilised first, then scaled.</p>

      <h2>Why This Worked</h2>
      <p>The turnaround did not come from publishing more content or chasing algorithm updates.</p>
      <p>It came from:</p>
      <ul>
        <li>Treating search as infrastructure, not a channel</li>
        <li>Removing internal friction that suppressed performance</li>
        <li>Making decisions based on commercial impact, not dashboards</li>
        <li>Fixing what engines and users actually interacted with</li>
      </ul>
      <p>When the foundation is correct, growth follows naturally.</p>

      <h2>The Takeaway</h2>
      <p>Most organisations do not need more marketing.</p>
      <p>They need fewer mistakes.</p>
      <p>Search performance degrades quietly when accountability is diluted and architecture is ignored. It recovers when ownership is clear and decisions are tied to outcomes.</p>
      <p>This engagement is representative of how Strathmark approaches advisory work: diagnose first, prioritise ruthlessly, execute only where it matters.</p>
    `
  }
];

