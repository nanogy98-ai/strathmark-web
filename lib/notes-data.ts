export interface Note {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  shareImage?: string;
  content: string;
}

export const notes: Note[] = [
  {
    slug: "marketing-retainer-failure",
    title: "Why Most Marketing Retainers Fail After Month 3",
    category: "Commercial",
    date: "2026-03-01",
    readingTime: "9 min read",
    author: "Graeme Tudhope",
    tags: ["agency", "retainers", "commercial", "strategy"],
    shareImage: "/insights/og-marketing.png",
    excerpt: "The incentive structure of a standard agency retainer is designed to maximise margin by minimising activity. Here is why it breaks down.",
    content: `
      <h2>The Uncomfortable Truth About Retainer Economics</h2>
      <p>There is a fundamental misalignment at the heart of the agency retainer model, and it is not a secret. It is arithmetic.</p>
      <p>An agency sells you a fixed monthly fee in exchange for an undefined scope of work. On the surface, this sounds reasonable. You get predictability. They get recurring revenue. Everyone wins.</p>
      <p>Except they don't. Because the moment the contract is signed, the incentive structure inverts. Every hour the agency <em>doesn't</em> spend on your account flows directly to their margin. The retainer doesn't reward effort. It rewards efficiency — and in practice, efficiency looks a lot like neglect.</p>

      <h2>The Three-Month Decay Curve</h2>
      <p>Having audited dozens of agency relationships across sectors, the pattern is remarkably consistent. It follows a predictable three-phase arc:</p>
      <h3>Month 1: The Honeymoon</h3>
      <p>The senior strategist who pitched the deal is still involved. The account team is motivated. There is genuine discovery work happening — audits, competitor analysis, roadmap creation. You feel heard. Things move quickly.</p>
      <h3>Month 2: Low-Hanging Fruit</h3>
      <p>The quick wins land. A technical SEO fix that unlocks crawling. A Google Ads restructure that drops CPA by 20%. A landing page test that lifts conversion. The agency is delivering. But notice what is happening beneath the surface: they are executing the easiest, most impactful work first. This is rational behaviour, but it means the backlog of difficult, high-effort work is growing silently.</p>
      <h3>Month 3 Onward: The Plateau</h3>
      <p>The easy wins are gone. What remains is the hard work: structural site changes, content strategy that requires subject matter expertise, conversion rate optimisation that demands statistical rigour. This work takes longer, costs more in labour hours, and is harder to attribute to revenue.</p>
      <p>So the agency does the rational thing. They stabilise. They send you a monthly report full of graphs trending vaguely upward. They attend the standing call. They make minor adjustments. They bill the full retainer.</p>
      <p>You are now paying full price for a fraction of the output.</p>

      <h2>Why Internal Teams Rarely Catch This</h2>
      <p>The decay is hard to detect because most marketing teams lack the technical depth to audit their own agency. Consider what would be required:</p>
      <ul>
        <li><strong>Search:</strong> You would need someone who can read a Screaming Frog crawl, interpret log file data, and cross-reference it against Google Search Console indexing reports. Most marketing managers cannot do this.</li>
        <li><strong>Paid media:</strong> You would need someone who understands match types, auction dynamics, attribution windows, and conversion tracking implementation at the tag level. Not the dashboard level — the tag level.</li>
        <li><strong>Analytics:</strong> You would need someone who can audit a GA4 implementation, validate event tracking, and distinguish real conversions from inflated "engagement" metrics.</li>
      </ul>
      <p>Without this expertise in-house, the agency controls the narrative. They choose what to report, how to frame it, and what to omit. This is not necessarily malicious. But it is structurally inevitable. An agency will never voluntarily surface data that makes them look bad.</p>

      <h2>The Compounding Cost of Inaction</h2>
      <p>The real damage is not the wasted retainer fee itself. It is the opportunity cost.</p>
      <p>Every month your site sits on a poorly structured URL taxonomy, you are compounding the technical debt. Every month your ad account runs on broad match with lazy negative keyword management, you are training Google's algorithms on bad data. Every month your content strategy is "publish and pray," you are falling further behind competitors who treat content as infrastructure.</p>
      <p>After 12 months of a stagnant retainer, you are not just where you started. You are measurably worse off, because your competitors have been moving while you stood still.</p>

      <h2>What the Alternative Looks Like</h2>
      <p>The solution is not to do everything in-house. Most organisations lack the specialist depth for that. The solution is to restructure the commercial relationship so that incentives align.</p>
      <p>There are several models that work better than a flat retainer:</p>
      <ul>
        <li><strong>Sprint-based engagements:</strong> Defined deliverables over a fixed period. If the sprint doesn't move a commercial metric, there is no next sprint. This forces prioritisation and accountability.</li>
        <li><strong>Independent advisory oversight:</strong> A third party who sits between you and the agency, validating their work, auditing their data, and holding them to outcomes rather than activity. Think of it as a non-executive director for your digital spend.</li>
        <li><strong>Performance-linked contracts:</strong> Tie a meaningful portion of the fee to agreed commercial outcomes — not traffic, not impressions, but pipeline, revenue, or qualified leads.</li>
      </ul>

      <h2>The Questions You Should Be Asking</h2>
      <p>If you are currently in a retainer relationship, there are five questions that will tell you whether your agency is earning their fee or coasting:</p>
      <ul>
        <li>Can you show me the specific tasks completed this month, with hours logged against each?</li>
        <li>What commercial outcome did each task contribute to?</li>
        <li>What did you deprioritise this month, and why?</li>
        <li>What would you do differently if the retainer were half the budget?</li>
        <li>When was the last time you proactively recommended reducing scope?</li>
      </ul>
      <p>If your agency cannot answer these clearly, you already have your answer.</p>

      <h2>The Bottom Line</h2>
      <p>The retainer model is not broken because agencies are bad. It is broken because the incentive structure makes mediocrity the path of least resistance. Good agencies fight against this tendency. Most don't.</p>
      <p>If your marketing spend is significant enough to matter, it is significant enough to govern properly. That means either restructuring how you buy agency services, or bringing in independent oversight to ensure you are getting what you are paying for.</p>
      <p>The organisations that treat marketing spend as an investment — with the same rigour they apply to any other capital allocation — are the ones that outperform. The ones that treat it as a subscription service are the ones that wonder, every quarter, why nothing is improving.</p>
    `
  },
  {
    slug: "traffic-is-not-kpi",
    title: "Traffic Is Not a KPI. Revenue Is.",
    category: "Strategy",
    date: "2026-03-06",
    readingTime: "8 min read",
    author: "Graeme Tudhope",
    tags: ["seo", "analytics", "strategy", "commercial"],
    shareImage: "/insights/og-revenue.png",
    excerpt: "Any engineer can double your traffic in 30 days by targeting irrelevant keywords. It looks great on a report and adds zero to your bottom line.",
    content: `
      <h2>The Vanity Metrics Epidemic</h2>
      <p>I once audited a site with 500,000 monthly visitors. The marketing team was celebrating what they called "record growth." The CMO had presented it to the board as proof of digital momentum.</p>
      <p>When I dug into the data, 90% of that traffic was landing on a single blog post about "how to tie a tie." Their product was B2B enterprise software. The traffic was utterly worthless — hundreds of thousands of people who would never, under any circumstances, become customers.</p>
      <p>But it looked spectacular on a dashboard. And that is precisely the problem.</p>

      <h2>How This Happened</h2>
      <p>The digital marketing industry has spent two decades optimising for the wrong metrics. Traffic, impressions, click-through rates, social shares — these are all <em>activity</em> metrics. They measure movement. They do not measure value.</p>
      <p>The reason they persist is simple: they are easy to grow. Any competent SEO can increase organic traffic by targeting high-volume, low-competition keywords. Any paid media manager can increase impressions by broadening targeting. Any content team can increase page views by publishing listicles.</p>
      <p>None of this requires the work to be commercially relevant. And that is where the disconnect begins.</p>

      <h2>The Commercial Intent Framework</h2>
      <p>Not all search queries are created equal. A useful framework for understanding this is the commercial intent spectrum:</p>
      <h3>Informational Queries</h3>
      <p>These are "what is" and "how to" searches. The user wants to learn something. They are at the very top of any conceivable funnel and are, in most B2B contexts, effectively worthless as direct revenue drivers. Examples: "what is SEO," "how to write a business plan," "marketing trends 2026."</p>
      <h3>Navigational Queries</h3>
      <p>The user is looking for a specific brand or site. If it is your brand, you should rank. If it is not, these queries are irrelevant to you. Examples: "HubSpot login," "Salesforce pricing."</p>
      <h3>Commercial Investigation</h3>
      <p>The user is comparing options and moving toward a decision. This is where serious value begins. Examples: "best CRM for mid-market," "enterprise SEO platform comparison," "managed IT services London reviews."</p>
      <h3>Transactional Queries</h3>
      <p>The user is ready to act. These queries carry the highest commercial value and typically the highest competition. Examples: "buy enterprise SSO solution," "hire digital marketing consultant Edinburgh," "request PPC audit."</p>
      <p>A sound digital strategy focuses the majority of effort on commercial investigation and transactional queries. Informational content has a role, but only when it is architecturally connected to commercial pages through internal linking and topic clustering.</p>

      <h2>The Measurement Problem</h2>
      <p>Even organisations that understand this conceptually often fail in practice because their measurement infrastructure is broken. Here is what I mean:</p>
      <ul>
        <li><strong>Attribution is misconfigured:</strong> GA4's default attribution model is data-driven, which sounds sophisticated but often obscures the true path to conversion. If you cannot clearly attribute revenue to specific channels, pages, and keywords, you are guessing.</li>
        <li><strong>Conversion tracking is inflated:</strong> Many implementations count page views, scroll depth, or time on site as "conversions." This makes reports look healthy while masking the absence of real commercial outcomes.</li>
        <li><strong>Revenue data is disconnected:</strong> If your analytics platform does not connect to your CRM or sales pipeline, you are measuring marketing in a vacuum. You know who visited. You do not know who bought.</li>
      </ul>

      <h2>What Good Looks Like</h2>
      <p>The organisations that get this right share several common characteristics:</p>
      <ul>
        <li><strong>They define success in commercial terms before any campaign launches.</strong> Not traffic targets. Not ranking positions. Revenue, pipeline value, qualified leads, or customer acquisition cost.</li>
        <li><strong>They build measurement infrastructure before they build campaigns.</strong> Conversion tracking, CRM integration, attribution modelling — all of this is foundational, not an afterthought.</li>
        <li><strong>They ruthlessly deprioritise vanity metrics.</strong> If a channel or campaign drives traffic but not revenue, it gets cut or restructured. Sentiment is irrelevant. The numbers either work or they don't.</li>
        <li><strong>They audit their agencies and vendors against commercial outcomes.</strong> Not against activity reports. Not against "brand awareness" scores that cannot be verified. Against the metrics that appear on a P&L.</li>
      </ul>

      <h2>A Practical Test</h2>
      <p>Here is a simple exercise you can run today. Pull up your top 20 organic landing pages by traffic. For each one, answer two questions:</p>
      <ul>
        <li>Does this page attract people who could realistically become customers?</li>
        <li>Does this page have a clear, measurable path to a commercial outcome (form fill, demo request, purchase)?</li>
      </ul>
      <p>If more than half your top pages fail both questions, your traffic growth is a vanity project. You are investing in visibility without commercial return.</p>

      <h2>The Strategic Shift</h2>
      <p>The fix is not complicated, but it requires discipline. It means accepting that a smaller number of commercially relevant visitors is worth more than a large number of irrelevant ones. It means restructuring content strategy around buyer intent rather than search volume. It means investing in measurement infrastructure before creative execution.</p>
      <p>100 visitors with buying intent are worth more than 100,000 who came for a "how to" article and will never return. The organisations that internalise this — really internalise it, not just nod along in a strategy meeting — are the ones that build sustainable digital revenue. The rest are just buying dashboards.</p>
    `
  },
  {
    slug: "ad-account-audit",
    title: "The 30-Minute Ad Account Audit That Could Save You Thousands",
    category: "Paid Media",
    date: "2026-03-12",
    readingTime: "10 min read",
    author: "Graeme Tudhope",
    tags: ["ppc", "google-ads", "paid-media", "audit"],
    shareImage: "/insights/og-ad-audit.png",
    excerpt: "Three settings in your Google Ads account reveal whether your PPC agency is optimising or coasting. Here is how to check.",
    content: `
      <h2>Why Most Ad Accounts Leak Money</h2>
      <p>Google Ads is an extraordinarily powerful platform. It is also extraordinarily easy to waste money on. The default settings are designed to maximise Google's revenue, not yours. And most agencies — even competent ones — leave critical settings on default because changing them requires vigilance, not just setup.</p>
      <p>Over the past decade, I have audited hundreds of ad accounts across industries ranging from financial services to e-commerce to professional services. The same mistakes appear with depressing regularity. Not because the people managing them are incompetent, but because the platform is designed to make overspending the path of least resistance.</p>
      <p>Here are the three areas you can check in under 30 minutes — without any specialist knowledge — to determine whether your spend is being managed properly.</p>

      <h2>1. The Search Terms Report</h2>
      <p>This is the single most revealing diagnostic in any Google Ads account. Navigate to <strong>Keywords → Search Terms</strong> and look at what people actually typed before clicking your ad.</p>
      <h3>What to look for</h3>
      <ul>
        <li><strong>Irrelevant queries:</strong> If you sell enterprise software and you see search terms like "free project management tool" or "what is CRM," you are paying for clicks from people who will never buy. Every one of those clicks costs real money.</li>
        <li><strong>Competitor brand terms:</strong> Unless you have a deliberate conquest strategy, appearing on competitor brand terms is typically expensive and low-converting. If your agency has not explicitly discussed this with you, it is likely happening by accident.</li>
        <li><strong>Negative keyword freshness:</strong> Check the last time negative keywords were added. If it has been more than 30 days, your account is leaking. Search behaviour evolves constantly. An account that is not adding negative keywords weekly is an account that is paying for waste.</li>
      </ul>
      <h3>The real cost</h3>
      <p>In a typical B2B account spending £15,000–£30,000 per month, poor search term management wastes 15–30% of total spend. That is £2,250–£9,000 per month — or up to £108,000 per year — going to clicks that could never convert.</p>

      <h2>2. Location Targeting Settings</h2>
      <p>This is the most commonly misconfigured setting in Google Ads, and it is buried in a place most advertisers never look.</p>
      <p>Go to <strong>Settings → Locations</strong> and click into the advanced options. You will see a targeting option that reads either:</p>
      <ul>
        <li><strong>"Presence or interest"</strong> (the default) — This shows your ads to people <em>in</em> your target location AND people who have shown "interest" in your location. In practice, this means someone in another country searching <em>about</em> your city will see your ad.</li>
        <li><strong>"Presence"</strong> — This shows your ads only to people physically located in your target area.</li>
      </ul>
      <h3>Why this matters</h3>
      <p>If you are a local or regional business, the default "presence or interest" setting can mean 20–40% of your clicks come from people who are nowhere near you. A solicitor in Manchester does not want to pay £15 per click from someone in Singapore who searched "Manchester law firms" out of curiosity.</p>
      <p>I have audited accounts where changing this single setting reduced cost per acquisition by 35% overnight. Not through clever strategy. Just by stopping the account from showing ads to people who could never become customers.</p>
      <h3>How to check</h3>
      <p>Run a geographic performance report for the past 90 days. If you see significant spend from locations outside your service area, the setting is wrong. This takes two minutes to verify and two clicks to fix.</p>

      <h2>3. Conversion Tracking Configuration</h2>
      <p>This is the most consequential setting of all, because it determines what the platform optimises toward. If your conversion tracking is misconfigured, every automated bidding decision Google makes is based on bad data.</p>
      <h3>The common failure</h3>
      <p>Navigate to <strong>Tools → Conversions</strong> and look at what actions are being tracked as primary conversions. In a well-configured account, you should see:</p>
      <ul>
        <li>Form submissions (contact, demo request, quote request)</li>
        <li>Phone calls of meaningful duration (typically 60+ seconds)</li>
        <li>Purchases or transaction completions</li>
      </ul>
      <p>In a <em>poorly</em> configured account — which is the majority — you will also see:</p>
      <ul>
        <li>Page views counted as conversions</li>
        <li>Button clicks counted as conversions</li>
        <li>Scroll depth or time on site counted as conversions</li>
        <li>Newsletter signups weighted equally to purchase completions</li>
      </ul>
      <h3>Why this is catastrophic</h3>
      <p>Modern Google Ads runs on automated bidding strategies — Target CPA, Target ROAS, Maximise Conversions. All of these use machine learning to optimise toward your defined conversion actions. If "page view" is a conversion, the algorithm will optimise for page views. It will find you the cheapest possible clicks from the least qualified visitors, because that is what you told it to do.</p>
      <p>Your CPA will look fantastic. Your pipeline will be empty. Your agency will show you a report full of "conversions" that are actually just people landing on your thank-you page from an organic search.</p>

      <h2>The Broader Pattern</h2>
      <p>These three checks are diagnostic, not therapeutic. They tell you whether your account is being managed with care, but they do not fix the underlying problems. Those require deeper work: restructuring campaigns, rebuilding conversion tracking, implementing proper attribution.</p>
      <p>But they serve a critical purpose. They give you — the person writing the cheques — enough information to ask the right questions. And in my experience, agencies that are doing good work welcome scrutiny. The ones that deflect, obfuscate, or respond with jargon are the ones with something to hide.</p>

      <h2>What to Do With What You Find</h2>
      <p>If your account passes all three checks, your agency is probably competent. Continue to monitor quarterly.</p>
      <p>If it fails one, raise it with your agency and give them 30 days to correct it. Mistakes happen.</p>
      <p>If it fails two or more, you have a structural problem. The account is not being managed — it is being maintained. There is a meaningful difference, and it is costing you money every day it continues.</p>
      <p>Whether you bring in an independent auditor, switch agencies, or build internal capability, the status quo is not a neutral option. An underperforming ad account does not just waste money. It actively trains Google's algorithms on bad data, making recovery harder the longer it continues.</p>
    `
  },
  {
    slug: "hidden-cost-technical-debt",
    title: "The Hidden Cost of Technical Debt in Digital Marketing",
    category: "Infrastructure",
    date: "2026-03-18",
    readingTime: "9 min read",
    author: "Graeme Tudhope",
    tags: ["technical-seo", "infrastructure", "architecture", "performance"],
    shareImage: "/insights/og-tech.png",
    excerpt: "Choosing a JavaScript-heavy framework for a content site is a six-figure mistake. Here is how technical decisions silently erode search performance.",
    content: `
      <h2>The Render Tax</h2>
      <p>Every website pays a tax to search engines. Not in money — in time. Google allocates a finite "crawl budget" to every domain. This is the number of pages Googlebot will fetch, render, and process within a given period. It is influenced by your site's authority, server response times, and structural complexity.</p>
      <p>When a page relies heavily on client-side JavaScript to render its content, it costs more of that budget. The bot must download the HTML, then download and execute JavaScript bundles, then wait for the DOM to populate, then extract the content. A server-rendered page might take 200 milliseconds. A JavaScript-heavy page might take 5 seconds — or fail entirely.</p>
      <p>The result is predictable. Google crawls fewer pages. The pages it does crawl take longer to index. And pages that are not indexed do not rank. You have built a website that is functionally invisible to the primary way people discover businesses online.</p>

      <h2>The Scale Problem</h2>
      <p>For a 50-page brochure site, this barely matters. Google will eventually render everything, and the indexing delay is measured in days, not months.</p>
      <p>For an enterprise site with 10,000+ pages — product catalogues, location pages, service variations, blog archives — the impact is catastrophic. I routinely audit large sites where 30–40% of the page inventory is not indexed by Google. Not because the content is bad. Not because there are technical errors. Simply because the bot ran out of patience waiting for JavaScript to render.</p>
      <p>Each unindexed page represents lost visibility, lost traffic, and lost revenue. Multiply that across thousands of pages and the cost becomes staggering.</p>

      <h2>How This Happens</h2>
      <p>The root cause is almost always the same: a technology decision made without understanding its downstream impact on search.</p>
      <p>A development team selects a JavaScript framework — React, Angular, Vue — because it offers a superior developer experience or enables rich interactivity. For web applications (dashboards, SaaS tools, internal platforms), this is entirely appropriate. These tools are excellent at what they were designed for.</p>
      <p>The problem arises when the same technology is applied to content-heavy, SEO-dependent sites: corporate websites, e-commerce platforms, publisher sites, lead generation properties. These sites exist to be found. Their primary user is not a logged-in customer — it is a search engine bot and a stranger arriving from Google.</p>
      <h3>The decision tree failure</h3>
      <p>What typically happens is this:</p>
      <ul>
        <li>The CTO or development lead chooses a tech stack based on engineering preferences</li>
        <li>The marketing team is not consulted on the decision</li>
        <li>The site launches and looks beautiful</li>
        <li>Six months later, organic traffic has not recovered to pre-migration levels</li>
        <li>Twelve months later, a consultant is hired to diagnose why search performance has collapsed</li>
        <li>The diagnosis is always the same: the site is technically hostile to search engines</li>
      </ul>
      <p>By this point, the cost of remediation — migrating to a server-rendered architecture, rebuilding templates, rearchitecting the URL structure — dwarfs the original development budget.</p>

      <h2>Indexability vs. Crawlability</h2>
      <p>There is a distinction that most non-technical stakeholders miss, and it matters enormously.</p>
      <p><strong>Crawlability</strong> means Google can access and fetch your pages. This is usually straightforward — if the URL is not blocked by robots.txt and returns a 200 status code, it is crawlable.</p>
      <p><strong>Indexability</strong> means Google can extract, understand, and store the content of your pages in its index. This is where JavaScript-heavy sites fail. The page is crawlable — Google can reach it. But the content is not immediately available in the HTML response. It requires JavaScript execution to appear.</p>
      <p>Google has invested heavily in JavaScript rendering capabilities. Their rendering engine can handle most modern frameworks. But "can" and "will" are different things. Rendering JavaScript at scale is expensive, and Google's infrastructure prioritises efficiency. If your content requires rendering, it goes into a secondary queue. It may be processed hours, days, or weeks later. In some cases, it is never processed at all.</p>
      <p>Just because Google <em>can</em> render JavaScript does not mean your pages will be fully processed on every crawl.</p>

      <h2>The Audit Checklist</h2>
      <p>If you suspect your site may have technical debt affecting search performance, here are the diagnostic steps:</p>
      <ul>
        <li><strong>View source vs. rendered DOM:</strong> Right-click your page and select "View Page Source." If the main content is missing from the raw HTML but visible in the browser, you have a client-side rendering dependency.</li>
        <li><strong>Google's cache:</strong> Search for <code>cache:yourdomain.com/page</code> in Google. If the cached version is missing content, Google is not rendering the page fully.</li>
        <li><strong>Coverage report:</strong> In Google Search Console, check the "Pages" report. If you see a large number of "Discovered — currently not indexed" or "Crawled — currently not indexed" entries, rendering issues are a likely cause.</li>
        <li><strong>Core Web Vitals:</strong> Check your CWV scores. JavaScript-heavy sites consistently fail Largest Contentful Paint (LCP) and Total Blocking Time (TBT) thresholds, both of which are ranking signals.</li>
      </ul>

      <h2>The Strategic Implications</h2>
      <p>Technical debt in digital marketing is uniquely dangerous because it is invisible to the people who control budgets. A CMO can see that traffic is declining. They cannot see that the decline is caused by a rendering architecture chosen by a developer two years ago.</p>
      <p>This creates a pattern where organisations throw more money at content, more money at paid media, and more money at agency retainers — all to compensate for a structural problem that could be fixed once, permanently, with an architectural change.</p>
      <p>The most expensive marketing problem is not a bad campaign. It is a good campaign on a broken foundation. You can write the best content in your industry, target the most valuable keywords, and build the most compelling user experience — and none of it matters if Google cannot efficiently discover, render, and index it.</p>
      <p>Fix the infrastructure first. Everything else builds on top of it.</p>
    `
  },
  {
    slug: "seo-audit-checklist",
    title: "The Strategic SEO Audit: A 12-Point Checklist for Enterprises",
    category: "Technical SEO",
    date: "2026-03-24",
    readingTime: "12 min read",
    author: "Graeme Tudhope",
    tags: ["seo", "technical-seo", "audit", "enterprise"],
    shareImage: "/insights/og-seo.png",
    excerpt: "Most SEO audits check the wrong things. Here are 12 infrastructure-level checks that separate performant sites from expensive liabilities.",
    content: `
      <h2>Why Most SEO Audits Are Useless</h2>
      <p>The typical SEO audit produced by an agency is a 60-page PDF full of screenshots from Semrush or Ahrefs, a list of pages with missing alt tags, and a recommendation to "improve content quality." It is thorough in the way that a medical exam that only checks your blood pressure is thorough. It measures something. It does not diagnose anything.</p>
      <p>A strategic SEO audit is different. It does not care about cosmetic issues. It cares about the structural and technical factors that determine whether a site <em>can</em> rank, not whether it <em>should</em>. Because the uncomfortable truth is that most enterprise sites fail at the infrastructure level long before content quality becomes relevant.</p>
      <p>Here are the 12 checks that matter.</p>

      <h2>1. Crawl Budget Allocation</h2>
      <p>Pull your server log files for the past 90 days and analyse Googlebot's behaviour. How many pages does it crawl per day? How many of those are your high-value commercial pages versus low-value pages like faceted navigation, parameter variations, or outdated blog posts?</p>
      <p>In a well-optimised site, 80%+ of crawl budget should be directed at pages you actually want to rank. In most enterprise sites, the ratio is inverted — the bot spends most of its time crawling pages that will never generate revenue.</p>

      <h2>2. Index Bloat</h2>
      <p>Search <code>site:yourdomain.com</code> in Google and compare the result count to the number of pages you actually <em>want</em> indexed. If Google is indexing 50,000 pages and you have 5,000 meaningful pages, you have index bloat. This dilutes your domain's authority across pages that add no value, and it wastes crawl budget maintaining index entries for pages that should never have been indexed.</p>
      <p>Common culprits: faceted navigation, internal search result pages, paginated archives, staging environments, and parameter-heavy URLs.</p>

      <h2>3. Rendering Architecture</h2>
      <p>Use Google Search Console's URL Inspection tool to compare the "Rendered HTML" against the "Source HTML" for your key commercial pages. If the rendered version contains content that is absent from the source, your site depends on client-side JavaScript rendering. This creates indexing delays and increases the risk of content not being processed.</p>

      <h2>4. Internal Link Equity Distribution</h2>
      <p>Crawl your site with Screaming Frog or Sitebulb and generate an internal PageRank distribution report. Your highest-authority pages should be your most commercially important pages. In practice, many sites funnel the majority of internal link equity to blog posts, about pages, or navigation dead-ends.</p>
      <p>If your homepage links to 200 pages through the global navigation, each of those pages receives 1/200th of the homepage's link equity. Most of those navigation links go to category pages that link to sub-categories that link to products. By the time equity reaches your revenue-generating pages, it has been diluted to near-zero.</p>

      <h2>5. Canonical Tag Consistency</h2>
      <p>Audit all pages for self-referencing canonical tags and check for conflicts between the canonical tag, the sitemap entry, and the internal linking structure. If a page's canonical tag points to URL A, but your sitemap lists URL B, and your internal links point to URL C, you are sending conflicting signals to Google about which version to index.</p>

      <h2>6. Core Web Vitals at Scale</h2>
      <p>Do not check CWV for your homepage alone. Run a CrUX (Chrome User Experience Report) analysis across page templates. Enterprise sites often have acceptable CWV on the homepage but catastrophic scores on product pages, category pages, or content pages — the pages that actually need to rank.</p>

      <h2>7. Structured Data Validation</h2>
      <p>Check that structured data is implemented correctly <em>and</em> consistently across all relevant page types. Many sites implement schema markup on the homepage and neglect it everywhere else. Validate with Google's Rich Results Test and check for warnings, not just errors. A schema with warnings will not generate rich results.</p>

      <h2>8. Mobile Parity</h2>
      <p>Google uses mobile-first indexing. If your mobile version has less content, fewer internal links, or different structured data than your desktop version, the mobile version is what Google sees. Audit for content parity between desktop and mobile renders. Hidden content behind tabs or accordions on mobile may not be weighted equally.</p>

      <h2>9. HTTP Response Code Hygiene</h2>
      <p>Crawl every URL in your sitemap and check for non-200 responses. Sitemaps should contain <em>only</em> indexable, 200-status URLs. If your sitemap includes redirects (301/302), not-found pages (404), or server errors (500), you are wasting crawl budget and sending negative quality signals.</p>

      <h2>10. Backlink Profile Quality</h2>
      <p>Analyse your referring domains for relevance, authority, and risk. A site with 10,000 backlinks from irrelevant directories and comment spam is worse off than a site with 200 backlinks from topically relevant, authoritative publications. Check for toxic link patterns that could trigger manual penalties or algorithmic suppression.</p>

      <h2>11. Content Cannibalisation</h2>
      <p>Identify queries where multiple pages from your site compete against each other in search results. When Google sees two pages from the same domain targeting the same keyword, it has to choose one — and it often chooses wrong. This is particularly common in enterprise sites where different teams publish overlapping content without coordination.</p>
      <p>Use Search Console to find queries where multiple URLs receive impressions. If the same query triggers three different URLs across different weeks, you have a cannibalisation problem that is suppressing all three pages.</p>

      <h2>12. International Targeting (If Applicable)</h2>
      <p>If your site targets multiple countries or languages, audit your hreflang implementation. This is the single most error-prone element in technical SEO. Common failures include missing return tags, incorrect language-country codes, and hreflang tags that point to non-canonical URLs. A single error in a hreflang cluster can invalidate the entire set.</p>

      <h2>What to Do With the Results</h2>
      <p>A useful audit is not a list of problems. It is a prioritised roadmap. Each finding should be scored on two axes: <strong>impact</strong> (how much will fixing this improve commercial outcomes?) and <strong>effort</strong> (how many engineering hours does the fix require?).</p>
      <p>Start with high-impact, low-effort fixes. These are your quick wins — typically canonical tag corrections, sitemap cleanup, and conversion tracking fixes. Then sequence the high-impact, high-effort items into your development roadmap alongside feature work.</p>
      <p>The worst thing you can do with an audit is treat it as a one-time exercise. The best sites run these checks quarterly, integrating SEO health into their engineering culture rather than treating it as a periodic external review.</p>
    `
  },
  {
    slug: "google-ads-wasted-spend",
    title: "How Enterprises Waste £250K+ on Google Ads Without Knowing It",
    category: "Paid Media",
    date: "2026-03-29",
    readingTime: "10 min read",
    author: "Graeme Tudhope",
    tags: ["ppc", "google-ads", "paid-media", "commercial", "audit"],
    shareImage: "/insights/og-waste.png",
    excerpt: "The six most expensive Google Ads mistakes are all silent. They do not trigger alerts, produce errors, or appear on standard reports.",
    content: `
      <h2>The Silent Bleed</h2>
      <p>Enterprise Google Ads accounts are, in my experience, the single largest source of invisible waste in digital marketing. Not because the platform is bad — it is extraordinarily powerful. But because the gap between "running Google Ads" and "running Google Ads well" is enormous, and most organisations cannot tell the difference from their reporting.</p>
      <p>The scale of waste is difficult to overstate. Across the enterprise accounts I have audited — budgets ranging from £100,000 to £2 million annually — the average recoverable waste is 25–35% of total spend. On a £500,000 annual budget, that is £125,000–£175,000 per year going to clicks that could never convert.</p>
      <p>Here are the six most common causes.</p>

      <h2>1. Broad Match Default Dependency</h2>
      <p>Google has been aggressively pushing advertisers toward broad match keywords for years. Their argument is that machine learning can identify relevant queries better than manual keyword matching. This is true in theory. In practice, it requires two conditions that most accounts do not meet: flawless conversion tracking and significant conversion volume.</p>
      <p>Without those foundations, broad match is simply expensive guesswork. The algorithm matches your ads to queries that are semantically related but commercially irrelevant. A law firm bidding on "business dispute solicitor" with broad match might appear for "what is a business dispute" or "solicitor salary UK" — queries from people who will never become clients.</p>
      <p>The fix is not to avoid broad match entirely. It is to ensure your conversion tracking is airtight before relying on Google's algorithms to make targeting decisions. If the algorithm is optimising toward inflated conversions, broad match will find you more of exactly the wrong traffic.</p>

      <h2>2. Smart Bidding on Bad Data</h2>
      <p>Target CPA, Target ROAS, and Maximise Conversions are powerful bidding strategies — when they have good data to learn from. The machine learning behind these strategies optimises toward whatever you define as a conversion.</p>
      <p>Here is the problem: most accounts have polluted conversion data. Page views counted as conversions. Newsletter signups weighted equally to demo requests. Phone calls of any duration counted as leads. When Smart Bidding optimises toward this data, it finds cheap, low-quality traffic that triggers inflated conversions. Your agency reports improving CPA. Your sales team reports declining lead quality. Both are telling the truth.</p>
      <p>Before enabling any automated bidding strategy, strip your conversions back to only the actions that genuinely represent commercial value. Typically: qualified form submissions, phone calls over 60 seconds, and purchases. Everything else is a secondary metric, not a bidding signal.</p>

      <h2>3. Audience Targeting Negligence</h2>
      <p>Google Ads offers sophisticated audience targeting: in-market segments, custom intent audiences, customer match lists, similar audiences. These allow you to overlay demographic and behavioural signals on top of keyword targeting.</p>
      <p>Most enterprise accounts use none of them. Or worse, they add audiences in "observation" mode (where Google collects data but does not use it for targeting) and never transition them to "targeting" mode or adjust bid modifiers based on performance.</p>
      <p>The result is that an enterprise selling six-figure software solutions shows ads to the same broad population as a small business selling a £50 product. The click costs are identical. The conversion probability is not.</p>

      <h2>4. Display Network Leakage</h2>
      <p>Many enterprise campaigns include Google's Display Network — either deliberately or by default. The Display Network serves ads on third-party websites, apps, and YouTube placements. For brand awareness, it can be effective. For performance marketing, it is almost always a waste.</p>
      <p>The reason is simple: click-through rates on display are typically 0.1–0.3%, and conversion rates are a fraction of search. But because display clicks are cheap (often £0.20–£1.00 vs. £5–£50 for search), they can consume significant budget without appearing expensive in aggregate reports.</p>
      <p>Check your campaign settings. If any search campaign has "Google Search Partners" or "Display Network" enabled, it is spending money outside of Google's core search results. In my audits, disabling these options typically saves 10–15% of total spend with no measurable impact on conversion volume.</p>

      <h2>5. Geographic Overspend</h2>
      <p>As discussed in my ad account audit guide, the default location targeting setting — "Presence or interest" — is silently draining budgets. But the problem goes deeper than a single setting.</p>
      <p>Enterprise accounts often target entire countries when their actual service area is regional. A facilities management company that operates in the Midlands does not need to show ads in Northern Scotland. A recruitment firm specialising in London financial services does not need visibility in rural Wales.</p>
      <p>Run a geographic performance report segmented by city or region. You will almost certainly find areas consuming meaningful budget with zero conversions. The fix is surgical: create location bid adjustments or exclusions based on actual commercial performance, not assumptions about where your customers might be.</p>

      <h2>6. Landing Page Disconnection</h2>
      <p>The final source of waste is the most strategically damaging, because it affects every other optimisation you make. If your ads send traffic to the wrong pages, nothing else matters.</p>
      <p>"Wrong" does not necessarily mean broken. It means misaligned. An ad targeting "enterprise HR software pricing" that sends traffic to a generic homepage forces the user to navigate to the pricing page themselves. Every additional click between the ad and the conversion is a point of falloff. In most cases, each extra step loses 40–60% of visitors.</p>
      <p>The fix requires coordination between paid media, UX, and web development — exactly the kind of cross-functional work that agency retainers are poorly structured to deliver. Each ad group should map to a dedicated landing page that mirrors the search intent of the triggered keywords. This is not a creative problem. It is an architectural one.</p>

      <h2>The Compound Effect</h2>
      <p>These six issues rarely exist in isolation. An account with broad match dependency usually also has polluted conversion data, because one enables the other. An account with geographic overspend usually also has Display Network leakage, because both stem from default settings that were never reviewed.</p>
      <p>The compound effect is what pushes waste into the six-figure range. Each issue might represent 5–10% of budget individually. Together, they represent 25–35%. On a £500K annual budget, that is a quarter of a million pounds — enough to fund an entirely new marketing channel, hire additional headcount, or simply improve profitability.</p>
      <p>The most frustrating aspect is that none of these issues require innovation to fix. They require attention. They require someone who understands the platform at a technical level, audits it regularly, and has the commercial authority to make changes. That combination — technical depth plus commercial authority — is what most agency relationships lack.</p>
    `
  },
  {
    slug: "agency-vs-consultant",
    title: "Agency vs. Independent Consultant: When to Fire Your Agency",
    category: "Commercial",
    date: "2026-04-02",
    readingTime: "11 min read",
    author: "Graeme Tudhope",
    tags: ["agency", "consultant", "commercial", "strategy"],
    shareImage: "/insights/og-agency.png",
    excerpt: "Agencies and independent consultants serve different functions. Choosing the wrong model for your situation costs more than the fee difference.",
    content: `
      <h2>The False Equivalence</h2>
      <p>Organisations tend to view "agency" and "consultant" as interchangeable labels for external marketing help. They are not. They are fundamentally different models with different incentive structures, different capabilities, and different failure modes. Choosing the wrong one is one of the most expensive decisions a marketing leader can make — not because of the fee, but because of the opportunity cost of misallocated resources.</p>
      <p>Understanding when each model is appropriate requires clarity about what you are actually buying.</p>

      <h2>What an Agency Actually Is</h2>
      <p>An agency is a production operation. Its core asset is labour — account managers, designers, copywriters, developers, media buyers. Its business model depends on selling those labour hours at a markup, typically 2.5–4x the cost of the underlying talent.</p>
      <p>This model works well when you need:</p>
      <ul>
        <li><strong>Execution at scale:</strong> Large volumes of content production, ad creative, social media management, or campaign execution that would be impractical to build in-house for a finite project.</li>
        <li><strong>Specialist capabilities you lack internally:</strong> Video production, complex programmatic media buying, multilingual content creation.</li>
        <li><strong>Bandwidth:</strong> When your internal team has the strategy right but lacks the hands to execute it.</li>
      </ul>
      <h3>Where agencies fail</h3>
      <p>The agency model breaks down in three predictable scenarios:</p>
      <ul>
        <li><strong>Strategic ambiguity:</strong> If you do not know what to do, an agency will happily tell you — but their recommendation will always involve buying more of what they sell. An SEO agency will recommend more SEO. A paid media agency will recommend more paid media. A content agency will recommend more content. They are structurally incapable of telling you to spend less or spend elsewhere.</li>
        <li><strong>Accountability gaps:</strong> Agencies report to you. But who audits the agency? Their reporting is self-directed, their metrics are self-selected, and their performance narrative is self-authored. Without independent oversight, you are trusting the vendor to grade their own homework.</li>
        <li><strong>Senior talent evaporation:</strong> The senior strategist who pitched your business is not the person who manages your account day-to-day. That person is a mid-level account manager who may be competent but lacks the experience and judgement that won your confidence during the pitch. This is the agency bait-and-switch — not fraudulent, just structural.</li>
      </ul>

      <h2>What an Independent Consultant Actually Is</h2>
      <p>An independent consultant is, at their best, a domain-specific expert who sells judgement rather than labour. Their value is not in doing the work — it is in knowing what work needs to be done, in what order, and to what standard.</p>
      <p>This model works well when you need:</p>
      <ul>
        <li><strong>Strategic clarity:</strong> What should I be doing? Where should I be spending? What is my agency doing wrong? What am I missing?</li>
        <li><strong>Vendor oversight:</strong> An independent party who sits between you and your agencies, validating their work, challenging their recommendations, and holding them accountable for commercial outcomes.</li>
        <li><strong>Diagnostic expertise:</strong> Technical audits, infrastructure reviews, and objective assessments of your current capabilities and gaps.</li>
        <li><strong>Decision-making support:</strong> For high-stakes choices — platform migrations, agency selection, budget allocation, tech stack decisions — where the wrong decision has long-term consequences.</li>
      </ul>
      <h3>Where consultants fall short</h3>
      <p>The consultant model has its own limitations:</p>
      <ul>
        <li><strong>Execution capacity:</strong> An independent consultant cannot replace a 20-person agency for production work. If you need 50 pieces of content per month, you need a production team, not an advisor.</li>
        <li><strong>Sustained implementation:</strong> Consultants are typically engaged for defined periods on specific problems. Ongoing, day-to-day management of channels requires either in-house capability or an agency.</li>
      </ul>

      <h2>The Decision Framework</h2>
      <p>The choice between agency and consultant depends on answering one question honestly: <strong>Do you know what you need to do, or do you need someone to tell you?</strong></p>
      <p>If you know what needs doing and need help doing it at scale — hire an agency.</p>
      <p>If you are uncertain about strategy, unsatisfied with current results, or unable to evaluate whether your agency is performing — hire a consultant first. Get the strategy right. Then hire the agency to execute it.</p>
      <p>The most expensive mistake is hiring an agency when you need a consultant. You end up paying production rates for strategic ambiguity, and the agency fills the vacuum with whatever generates the most billable hours.</p>

      <h2>The Signs It Is Time to Make a Change</h2>
      <p>Here are the indicators that your current agency relationship has run its course:</p>
      <ul>
        <li><strong>Results have plateaued for 3+ months</strong> with no clear explanation or plan to break through</li>
        <li><strong>You cannot explain what your agency does each month</strong> in specific, concrete terms</li>
        <li><strong>Monthly reports focus on activity metrics</strong> (traffic, impressions, rankings) rather than commercial outcomes (revenue, pipeline, qualified leads)</li>
        <li><strong>The senior team has rotated</strong> and your account is managed by someone you did not choose</li>
        <li><strong>Recommendations always involve spending more,</strong> never spending differently or spending less</li>
        <li><strong>You feel locked in</strong> because migrating to another provider feels too disruptive</li>
        <li><strong>They resist third-party audits</strong> or become defensive when you ask detailed technical questions</li>
      </ul>
      <p>Any three of these simultaneously is a strong signal. Five or more is a certainty.</p>

      <h2>The Hybrid Model</h2>
      <p>The most effective structure I see in practice is a hybrid — an independent consultant who sets strategy and provides oversight, paired with an agency or in-house team that handles execution. This creates natural accountability: the agency has someone checking their work who understands the domain deeply enough to catch shortcuts.</p>
      <p>This is expensive — you are paying for both advisory and execution. But it is cheaper than paying an unsupervised agency full rate for half-effort work over a period of years, which is the default outcome of most unmonitored retainer relationships.</p>
      <p>The organisations that consistently outperform their competitors in digital marketing are not the ones that spend the most. They are the ones that govern their spend most rigorously. That governance — strategic oversight, commercial accountability, independent validation — is what separates investment from expenditure.</p>
    `
  },
  {
    slug: "digital-due-diligence",
    title: "Digital Due Diligence: What Investors Miss Before Acquisition",
    category: "Strategy",
    date: "2026-04-07",
    readingTime: "11 min read",
    author: "Graeme Tudhope",
    tags: ["due-diligence", "strategy", "commercial", "acquisition"],
    shareImage: "/insights/og-diligence.png",
    excerpt: "Acquirers scrutinise financials, legal, and operations. They almost never audit digital infrastructure — and it costs them millions post-close.",
    content: `
      <h2>The Blind Spot in M&A</h2>
      <p>When a private equity firm or strategic acquirer evaluates a target company, the due diligence process is exhaustive. Financial models are stress-tested. Legal liabilities are catalogued. Operational capacity is evaluated. Management teams are interviewed. Supplier contracts are reviewed.</p>
      <p>But digital infrastructure — the websites, marketing systems, analytics platforms, and search visibility that drive a meaningful share of revenue for most modern businesses — is almost never audited with the same rigour. It might get a cursory glance from a junior associate. It might be mentioned in a slide as "strong online presence." It is almost never subjected to the kind of forensic, technical evaluation that could reveal six- or seven-figure liabilities.</p>
      <p>This is a material oversight. And it costs acquirers real money.</p>

      <h2>Why Digital Assets Deserve Scrutiny</h2>
      <p>Consider what a typical mid-market company's digital footprint actually represents:</p>
      <ul>
        <li><strong>Customer acquisition engine:</strong> For many businesses, 30–60% of new customers originate from digital channels — organic search, paid search, social media, email. If these channels are underperforming or structurally fragile, revenue projections built on current trajectory are unreliable.</li>
        <li><strong>Brand perception:</strong> The website is often the first and most frequent touchpoint for customers, partners, and talent. A site that is technically broken, visually dated, or functionally hostile to users signals organisational decline in ways that spreadsheets do not capture.</li>
        <li><strong>Technical debt:</strong> Marketing technology stacks accumulate debt just like codebases. Misconfigured analytics, orphaned tracking scripts, broken integrations, and redundant tool subscriptions create ongoing costs and operational friction that new owners inherit.</li>
      </ul>

      <h2>The Seven Areas to Audit</h2>

      <h3>1. Organic Search Dependency and Fragility</h3>
      <p>Pull the target's Google Search Console data (or estimate from third-party tools like Ahrefs). Determine what percentage of total revenue is attributable to organic search. Then ask: how concentrated is that traffic?</p>
      <p>If 40% of organic traffic comes from 5 keywords, the business has a concentration risk. A single Google algorithm update could erode that traffic overnight. If organic traffic has been declining for 6+ months, there is a structural problem that will require investment to fix post-acquisition.</p>
      <p>This is not theoretical. I have seen acquisitions where organic traffic dropped 40% within 6 months of close due to pre-existing technical issues that were never identified during due diligence.</p>

      <h3>2. Paid Media Efficiency</h3>
      <p>Request access to the target's Google Ads and Meta Ads accounts. Audit the true cost per acquisition — not the CPA reported by the agency, but the CPA calculated from actual revenue data. Many companies report CPAs based on inflated conversion definitions that include newsletter signups, page views, or micro-conversions.</p>
      <p>If the true CPA is significantly higher than reported, the marketing budget has been underperforming. The revenue model may be built on assumptions about customer acquisition costs that are materially wrong.</p>

      <h3>3. Analytics Integrity</h3>
      <p>Audit the analytics implementation. Is GA4 configured correctly? Are conversions tracking real commercial actions or vanity events? Is there a clean integration between analytics, CRM, and revenue data?</p>
      <p>If the analytics data is unreliable, every marketing decision the business has made — and every projection you build on historical data — is built on a flawed foundation. This is more common than you might expect. In my experience, roughly 60% of enterprise analytics implementations have material configuration errors.</p>

      <h3>4. Website Technical Health</h3>
      <p>Run a full technical crawl of the website. Check for:</p>
      <ul>
        <li>Rendering dependencies that affect search engine indexing</li>
        <li>Site speed and Core Web Vitals compliance</li>
        <li>Mobile usability issues</li>
        <li>Broken internal links and orphaned pages</li>
        <li>Security vulnerabilities (SSL configuration, mixed content, outdated dependencies)</li>
      </ul>
      <p>Each of these represents a cost that will need to be addressed post-acquisition. Quantify that cost and factor it into your valuation.</p>

      <h3>5. Content Asset Valuation</h3>
      <p>Content is often listed as an asset in marketing due diligence, but rarely valued correctly. A blog with 500 posts sounds impressive. But if 480 of those posts receive zero organic traffic, they are not assets — they are liabilities. They consume crawl budget, dilute topical authority, and create maintenance overhead.</p>
      <p>Evaluate content by performance: traffic, conversions, and revenue attribution. The 20 pieces that drive 80% of value are genuine assets. The rest may need to be pruned, consolidated, or rewritten.</p>

      <h3>6. Marketing Technology Stack</h3>
      <p>Audit every marketing technology tool the business pays for. Common findings: redundant tools performing the same function, enterprise-tier subscriptions for tools used at a fraction of capacity, integrations that are broken or abandoned, and contracts with unfavourable renewal terms.</p>
      <p>The martech stack for a mid-market company typically costs £50,000–£200,000 annually. In my experience, 20–40% of that spend is waste — tools that nobody uses, duplicates that nobody audited, and integrations that nobody maintains.</p>

      <h3>7. Contractual and IP Risks</h3>
      <p>Review all third-party contracts related to digital: agency agreements, freelancer arrangements, software licences, domain registrations, hosting contracts. Key questions:</p>
      <ul>
        <li>Who owns the ad account data and creative assets?</li>
        <li>Are there non-compete or exclusivity clauses in agency contracts?</li>
        <li>Who controls the domain registrations and DNS?</li>
        <li>Are there pending SEO penalties or manual actions in Search Console?</li>
        <li>Does the company own its marketing automation workflows and email lists, or are they locked in a vendor platform?</li>
      </ul>

      <h2>Quantifying the Risk</h2>
      <p>The purpose of digital due diligence is not to kill deals. It is to price them correctly. Every finding can be quantified as either a cost (remediation required post-close) or a risk (probability-weighted impact on future revenue).</p>
      <p>A site with declining organic traffic and no clear cause represents a risk to revenue projections. An ad account with inflated CPAs represents a cost to bring performance to sustainable levels. A broken analytics implementation represents a cost to rebuild, plus a risk that historical data used in valuation is unreliable.</p>
      <p>In aggregate, digital issues in an acquisition target typically represent 3–8% of the enterprise value in hidden costs and risks. On a £20 million deal, that is £600K–£1.6M. More than enough to justify a proper audit — and more than enough to negotiate a better price if issues are found.</p>
      <p>The acquirers who consistently get better returns on digital-dependent businesses are the ones who audit digital infrastructure with the same rigour they apply to financial statements. The rest discover the problems after they have already paid for them.</p>
    `
  },
  {
    slug: "seo-industry-corruption-problem",
    title: "The SEO Industry Has a Corruption Problem",
    category: "Industry",
    date: "2026-04-22",
    readingTime: "10 min read",
    author: "Graeme Tudhope",
    tags: ["seo", "industry", "agency", "governance"],
    excerpt: "Every trade has cowboys. In SEO, the difference is that the con is hidden behind jargon, dashboards, and promises no honest operator should make.",
    content: `
      <h2>Every Industry Has Cowboys. Ours Hides Them Better.</h2>
      <p>Mechanics, builders, roofers, and tradespeople have a reputation for conning unsuspecting customers when the wrong people get hold of the job. The public understands this instinctively. If you know nothing about cars or boiler systems, you also know you could be taken for a ride.</p>
      <p>That reputation exists because the damage is visible. You get charged for work you did not need. A repair mysteriously becomes three repairs. Someone disappears after taking the deposit. People know the risk, even if they cannot always prevent it.</p>
      <p>Digital marketing, SEO in particular, has the same problem, but it is more insidious because it arrives in a suit. It arrives in a pitch deck, a dashboard, a monthly report, and a lot of technical language designed to sound impressive. The invoice says "strategy." The slide says "authority growth." The promise is "page one." And because it all looks professional, buyers assume it is professional.</p>
      <p>That is what frustrates me. Not that bad actors exist. Every industry has them. It is that in SEO the bullshit is often dressed up so neatly that intelligent, serious business owners do not realise they are being conned until months later, sometimes years later, when they have burned budget, lost time, and learned absolutely nothing of value.</p>
      <p>There are many capable, ethical people in this field. But there are also far too many bullshitters selling certainty where none exists, and the industry has tolerated them for far too long.</p>

      <h2>Why SEO Is So Easy to Abuse</h2>
      <p>SEO is fertile ground for grifters because the average client cannot independently verify what they are being told.</p>
      <ul>
        <li><strong>The work is difficult to inspect:</strong> Most business owners cannot audit a backlink profile, interpret crawl behaviour, assess page intent, or validate conversion tracking.</li>
        <li><strong>The feedback loop is slow:</strong> Bad SEO decisions do not always hurt immediately. That gives the salesperson months of cover before the truth becomes obvious.</li>
        <li><strong>The metrics are easy to manipulate:</strong> Traffic can be inflated. Rankings can be cherry-picked. Reports can be padded with vanity graphs that look impressive and prove nothing.</li>
        <li><strong>The jargon creates deference:</strong> People assume technical language is evidence of expertise. Often it is just camouflage.</li>
      </ul>
      <p>That information asymmetry is where the corruption lives. Not always criminal corruption. Often something more ordinary and, in practice, just as damaging: misrepresentation, deliberate ambiguity, and promises made by people who know the client cannot properly challenge them.</p>

      <h2>The Most Common Lie: "We Can Get You to Page One"</h2>
      <p>Let me say this plainly: no honest SEO can guarantee page-one rankings.</p>
      <p>They do not control Google. They do not control your competitors. They do not control algorithm updates, search intent shifts, SERP features, localisation, brand demand, or the countless variables that influence where a page lands.</p>
      <p>An experienced operator can improve your probability of ranking. They can improve technical health, content quality, internal linking, information architecture, page speed, crawl efficiency, and strategic focus. They can absolutely increase your chances of better outcomes.</p>
      <p>But a guarantee of page one is not expertise. It is either ignorance or dishonesty.</p>
      <p>The professionals worth hiring will guarantee process, rigour, transparency, and honest reporting. They will not guarantee a position in a search engine they do not own.</p>

      <h2>The Link-Selling Machine</h2>
      <p>One of the grubbiest corners of the industry is link selling. Links are packaged like inventory: ten links per month, DR 60+, niche relevant, guaranteed turnaround, special relationship with publishers, and so on. It is presented as if authority can be bought from a clean rate card like office furniture.</p>
      <p>Usually it is not clean. Usually it is a middleman, a spreadsheet, a network, a markup, and a story.</p>
      <p>Sometimes those links are useless. Sometimes they are obviously manipulated. Sometimes they work for a while and create exactly the kind of fragile dependency that later collapses. In all cases, they are too often sold to clients as though this is a reliable, low-risk growth lever rather than a murky tactic with meaningful downside.</p>
      <p>I am not saying every link acquisition effort is inherently bad. I am saying anyone selling links as a guaranteed product, with fixed quantities and guaranteed outcomes, should be treated with extreme scepticism. Good SEO is not bulk commodity purchasing. It is judgement.</p>

      <h2>How to Spot the Cowboys</h2>
      <p>If you want to avoid being taken in, look for these red flags:</p>
      <ul>
        <li><strong>They guarantee rankings:</strong> "Page one in 90 days" is not a sign of confidence. It is a sign to leave.</li>
        <li><strong>They sell volume instead of thinking:</strong> X links, X blogs, X keywords, every month, regardless of your market or business model.</li>
        <li><strong>They fixate on vanity metrics:</strong> Domain Rating, impressions, traffic spikes, ranking screenshots, and "visibility" with no serious connection to leads, pipeline, or revenue.</li>
        <li><strong>They are vague about the work:</strong> Ask what they will actually do in the first 30 days. If the answer is fog, you are buying fog.</li>
        <li><strong>They hide behind jargon:</strong> Real expertise makes complexity clearer. It does not use complexity to intimidate you into silence.</li>
        <li><strong>They want control of your assets:</strong> Your Search Console, Analytics, ad accounts, CMS, domain, and data should not be held hostage inside someone else's setup.</li>
        <li><strong>They push long contracts before proving anything:</strong> The weaker the value proposition, the harder the lock-in usually becomes.</li>
        <li><strong>They never discuss risk:</strong> If every answer is upside, they are selling, not advising.</li>
      </ul>

      <h2>Questions Worth Asking Before You Hire Anyone</h2>
      <p>If you are evaluating an SEO consultant or agency, ask these questions directly:</p>
      <ul>
        <li>What exactly will you do in the first 30 days?</li>
        <li>How do you measure success beyond traffic and rankings?</li>
        <li>What can you guarantee, and what can you not guarantee?</li>
        <li>How do you approach link acquisition, and what risks do you believe it carries?</li>
        <li>Who owns the accounts, data, content, and infrastructure if the relationship ends?</li>
        <li>Can you show me reporting that ties activity to commercial outcomes?</li>
        <li>What would make you tell a client not to invest in SEO yet?</li>
      </ul>
      <p>That final question matters enormously. Honest operators are capable of saying, "You have a measurement problem before you have an SEO problem," or "Your site architecture is broken," or "SEO is not your main bottleneck right now." Bullshitters never talk themselves out of a sale.</p>

      <h2>What Good SEO Actually Sounds Like</h2>
      <p>Good SEO is usually less glamorous than the pitch. It sounds more like this: we need to fix indexation, improve internal linking, tighten page intent, clean up tracking, publish content that maps to commercial demand, and make the site easier for both users and search engines to understand. It will take time. Some changes will outperform others. We will report honestly. There are no guarantees.</p>
      <p>That answer is less seductive than "page one in twelve weeks." It is also far more trustworthy.</p>
      <p>Competent practitioners understand probability. They understand trade-offs. They understand that a search strategy can be directionally right and still be affected by variables outside anyone's control. The moment someone starts speaking as though SEO is a vending machine where money goes in and rankings come out, you should assume you are listening to a salesperson, not an operator.</p>

      <h2>The Real Damage</h2>
      <p>The loss is not just the fee. It is the wasted quarter. The wasted year. The false confidence created by glossy reporting. The irrelevant content. The risky links. The polluted analytics. The internal trust that gets destroyed when leadership realises they have been paying for motion instead of progress.</p>
      <p>Bad SEO does not merely waste money. It discredits the channel itself. It makes leadership cynical. It makes good work harder to sell later. It leaves businesses believing SEO "doesn't work" when what actually failed was the person selling it to them.</p>
      <p>That is the part I find hardest to tolerate. This field, done properly, can be commercially transformative. Done badly, it becomes a highly professional-looking way to separate companies from their money.</p>

      <h2>The Bottom Line</h2>
      <p>If someone promises you guaranteed rankings, guaranteed links, or guaranteed outcomes in a system they do not control, treat that promise the same way you would treat a mechanic inventing work under the bonnet: with immediate scepticism.</p>
      <p>Ask better questions. Demand specifics. Own your assets. Insist on commercial relevance. And remember this above all else: there are no guarantees in SEO. There is only sound process, intelligent prioritisation, honest communication, and work that earns the right to perform over time.</p>
      <p>The real professionals in this industry will not be offended by that standard. The cowboys will.</p>
    `
  }
];
