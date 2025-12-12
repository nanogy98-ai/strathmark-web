export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "canonical-tag-roi-killer",
    title: "The Canonical Tag: Why Your 'Best Practice' is Killing ROI",
    excerpt: "Most agencies slap a self-referencing canonical on every page and call it a day. In complex e-commerce architectures, this lazy heuristic is actively de-indexing your highest-margin variants.",
    date: "Dec 12, 2025",
    category: "Technical SEO",
    readTime: "6 min read",
    content: `
      <h2>The Laziness of "Best Practice"</h2>
      <p>In the world of automated SEO audits, the self-referencing canonical tag is a green checkmark. But for large-scale e-commerce platforms with faceted navigation, it's often a silent revenue killer.</p>
      
      <h2>The Faceted Navigation Trap</h2>
      <p>When you canonicalize every filtered view back to the category root, you are telling Google: "These parameters don't matter." But if "Blue Suede Shoes" searches have high intent and low competition, you've just opted out of ranking for them.</p>

      <h2>The Strathmark Approach</h2>
      <p>We implement logic-based canonicalization strategies that dynamically assess inventory depth and search volume demand before deciding whether a parameter URL should index or canonicalize.</p>
    `
  },
  {
    slug: "crawl-budget-economics",
    title: "Crawl Budget Economics: Saving Millions in Server Costs",
    excerpt: "Googlebot doesn't have infinite patience. We analyzed a 5M page site where 40% of server resources were spent serving 404s and low-value parameters to bots.",
    date: "Nov 28, 2025",
    category: "Infrastructure",
    readTime: "8 min read",
    content: `
      <h2>Bot Traffic is Not Free</h2>
      <p>For enterprise sites, bot traffic is a significant portion of server load. When that traffic is wasted on non-canonical URLs, 404s, or infinite calendar loops, you're paying AWS bills for zero ROI.</p>

      <h2>Log File Analysis as a Diagnostic Tool</h2>
      <p>We don't guess. We ingest server logs to map exactly where Googlebot spends its time. If it's crawling your internal search result pages instead of your product detail pages, your architecture is bleeding value.</p>
    `
  },
  {
    slug: "hreflang-horror-stories",
    title: "International SEO: Hreflang Horror Stories",
    excerpt: "Expanding to the UAE or Germany? A single misconfigured x-default tag can nuke your US rankings. Here’s how to architect global visibility without cannibalization.",
    date: "Nov 15, 2025",
    category: "International",
    readTime: "5 min read",
    content: `
      <h2>The "Global" Site Fallacy</h2>
      <p>Many US companies simply clone their site to a .co.uk domain and expect it to rank. Without precise hreflang implementation, Google sees this as duplicate content, not localization.</p>

      <h2>Return Tags Matter</h2>
      <p>The most common error we see is the missing return tag. If Page A points to Page B as its German alternate, Page B <em>must</em> point back to Page A. If the handshake fails, the signal is ignored.</p>
    `
  },
  {
    slug: "javascript-rendering-wall",
    title: "JavaScript Rendering: The Invisible Wall",
    excerpt: "Client-side rendering is great for UX and terrible for crawlability. If your content sits behind a useEffect hook, you are invisible to 30% of crawlers.",
    date: "Oct 30, 2025",
    category: "Development",
    readTime: "7 min read",
    content: `
      <h2>The Hydration Gap</h2>
      <p>Google claims to render JavaScript. They do. But they do it in a second wave, often days after the initial HTML crawl. In high-velocity news or inventory cycles, that delay is fatal.</p>

      <h2>Server-Side Rendering (SSR) is Non-Negotiable</h2>
      <p>For high-liability industries, we mandate Next.js or Nuxt implementations where critical content is present in the initial HTTP response. Don't make the bot work for it.</p>
    `
  },
  {
    slug: "semantic-search-architecture",
    title: "The Death of the Keyword: Semantic Search Architecture",
    excerpt: "Stop optimizing for strings. Start optimizing for things. How we build Knowledge Graphs that align with Google's entity extraction algorithms.",
    date: "Oct 12, 2025",
    category: "Strategy",
    readTime: "6 min read",
    content: `
      <h2>Entities > Keywords</h2>
      <p>Google doesn't match strings anymore; it maps concepts. "Immigration Lawyer" and "Visa Attorney" are the same entity ID in Google's Knowledge Graph.</p>
      
      <h2>Structured Data as a weapon</h2>
      <p>We use aggressive JSON-LD schema to explicitly define the relationships between your services, your location, and your accolades, removing ambiguity from the algorithm's decision-making process.</p>
    `
  },
  {
    slug: "automotive-seo-scale",
    title: "Automotive SEO: Handling 100,000 SKUs",
    excerpt: "Car dealers have a unique problem: Inventory churn. When a car sells, the page 404s. Multiply that by 500 cars a month, and your site is a graveyard. Here is the fix.",
    date: "Sep 25, 2025",
    category: "Automotive",
    readTime: "5 min read",
    content: `
      <h2>The 404/Redirect Dilemma</h2>
      <p>Redirecting every sold car to the home page is soft-404 behavior. Redirecting to the category page is better, but confusing for users.</p>

      <h2>The "Sold but Similar" Pattern</h2>
      <p>We engineer "Sold" states that keep the URL live for a buffer period, displaying similar available inventory. This preserves link equity and captures long-tail traffic even after the specific unit is gone.</p>
    `
  },
  {
    slug: "eeat-immigration-law",
    title: "Immigration Law Marketing: E-E-A-T in High-Stakes Niches",
    excerpt: "In YMYL (Your Money Your Life) sectors, Google's trust threshold is massive. Generic content won't cut it. You need authorship architecture.",
    date: "Sep 10, 2025",
    category: "Legal",
    readTime: "9 min read",
    content: `
      <h2>Authorship is Back</h2>
      <p>It's not enough to have good content. Google needs to know <em>who</em> wrote it. For immigration law, that means linking every article to a verified attorney profile with bar association credentials in the schema.</p>
    `
  },
  {
    slug: "data-driven-retainers",
    title: "Data-Driven Retainers: Why We Don't Do Contracts",
    excerpt: "12-month lock-ins are for agencies that stop working after month three. Our retainer model is built on continuous sprint execution.",
    date: "Aug 22, 2025",
    category: "Business",
    readTime: "4 min read",
    content: `
      <h2>The Agency Incentive Problem</h2>
      <p>Traditional retainers incentivize inaction. Once the contract is signed, the agency maximizes margin by minimizing work.</p>

      <h2>The Strathmark Sprint</h2>
      <p>We operate on rolling 30-day sprints. If we don't ship code or content that moves the needle, you fire us. It keeps us sharp and your infrastructure evolving.</p>
    `
  }
];

