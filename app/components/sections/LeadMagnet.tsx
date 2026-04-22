"use client";

import { useEffect, useRef, useState } from "react";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock3, 
  Loader2, 
  Lock, 
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  MessageSquare,
  BarChart3,
  MousePointer2
} from "lucide-react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLink } from "@/app/components/ui/SectionLink";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "7673741a-3e33-4912-96b3-bd1a31729185";
const WEB3FORMS_FROM_NAME = "Strathmark Consulting";

const briefingSchema = z.object({
  email: z.string().email("Use a valid email address."),
  name: z.string().optional(),
  honeypot: z.string().optional(),
});

const BRIEFING_TOPICS = [
  "Paid traffic",
  "CRO friction",
  "Lead handling",
  "Reporting",
  "Tech spend",
];

const BRIEFING_CARDS = [
  {
    title: "Paid traffic that looks healthy but buys badly",
    loss: "Typical leak: 5-15% of monthly spend",
    why: "Traffic quality often looks acceptable until you compare click volume with qualified enquiry rate.",
    fix: "Check search terms, landing page intent match, and whether campaigns optimise for qualified actions rather than cheap clicks.",
    icon: <BarChart3 className="text-gold" size={20} />,
  },
  {
    title: "Forms and pages that create hesitation",
    loss: "Typical leak: 10-30% of available enquiries",
    why: "Small friction points on mobile often damage conversion rate more than teams realise.",
    fix: "Reduce cognitive load, tighten the offer, and remove anything that does not help qualify or close the lead.",
    icon: <MousePointer2 className="text-gold" size={20} />,
  },
  {
    title: "Lead response speed that quietly kills ROI",
    loss: "Typical leak: high-intent demand goes cold",
    why: "Acquisition work is wasted if nobody owns the first 15-60 minutes after submission.",
    fix: "Set ownership, response SLAs, and a first-touch sequence before increasing demand generation spend.",
    icon: <MessageSquare className="text-gold" size={20} />,
  },
  {
    title: "Reporting that flatters channels and hides waste",
    loss: "Typical leak: decisions made on weak attribution",
    why: "If tracking is unreliable, budget drifts toward channels that look tidy in dashboards rather than channels that help produce revenue.",
    fix: "Audit events, forms, CRM handoff, and reporting logic before backing any major budget decision.",
    icon: <ShieldCheck className="text-gold" size={20} />,
  },
  {
    title: "Tools and technical work that add cost without leverage",
    loss: "Typical leak: recurring platform and support overhead",
    why: "Many businesses carry platforms, plugins, and workarounds that add noise, complexity, and cost without measurable upside.",
    fix: "Cut duplication, simplify ownership, and keep only the tooling that supports reporting, lead flow, or conversion.",
    icon: <TrendingDown className="text-gold" size={20} />,
  },
];

export function LeadMagnet() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());

    if (formData.honeypot) {
      setIsUnlocked(true);
      setIsSubmitting(false);
      return;
    }

    const parsed = briefingSchema.safeParse(formData);

    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? "Please check your details and try again.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...parsed.data,
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: WEB3FORMS_FROM_NAME,
      subject: "5-minute briefing request: money leaks",
      replyto: parsed.data.email,
      source: "homepage-briefing",
      submittedAt: new Date().toISOString(),
      summary: [
        `Name: ${parsed.data.name || "Not provided"}`,
        `Email: ${parsed.data.email}`,
        "Interest: 5-minute briefing - money leaks",
      ].join("\n"),
    };

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok || !body?.success) {
        throw new Error(body?.message || `Request failed (${response.status})`);
      }

      setName(parsed.data.name ?? "");
      setEmail(parsed.data.email);
      setIsUnlocked(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "The briefing could not be opened right now.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-20 md:py-32 bg-strath-navy relative overflow-hidden scroll-mt-28 md:scroll-mt-32" id="briefing">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-0 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div 
              key="locked"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* editorial side */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-px bg-gold/50"></span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold">Executive Intelligence</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-8">
                  The 5-Minute <br/><span className="text-gold italic">Briefing.</span>
                </h3>
                
                <div className="space-y-6 max-w-2xl text-slate-300 text-lg leading-relaxed font-light">
                  <p>
                    I pinpoint the five biggest hidden money drains for businesses online. Structural leaks found in audit after audit.
                  </p>
                  <p>
                    Enter your work email for <span className="text-white font-medium italic underline decoration-gold/40 underline-offset-4">instant</span> access to the briefing deck. No PDF, no waiting—the insight opens right here.
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  {BRIEFING_TOPICS.map((topic, i) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      key={topic} 
                      className="border border-white/10 bg-white/5 py-1.5 px-3 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-gold"></div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{topic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* form side */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Decorative corner */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-gold/40 z-0"></div>
                  
                  <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 md:p-10 relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                         <Lock size={14} className="text-gold" />
                         <span className="text-[10px] font-mono uppercase tracking-widest text-gold">Secure Access</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Digital Audit v1.2</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-all placeholder:text-slate-600 font-light"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-white outline-none focus:border-gold/50 transition-all placeholder:text-slate-600 font-light"
                        />
                      </div>

                      {submitError && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="flex items-start gap-2 text-xs text-red-400 bg-red-400/5 border border-red-400/10 p-3"
                        >
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>{submitError}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold text-strath-navy py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-white hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 mt-4"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Authorising...
                          </>
                        ) : (
                          <>
                            Unlock The Briefing
                            <ChevronRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest pt-4">
                        Instant unlock. Zero Friction.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <UnlockedContent name={name} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function UnlockedContent({ name }: { name: string }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const cardsScrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const scroller = cardsScrollerRef.current;
    if (!scroller) return;

    const updateActiveCard = () => {
      if (window.innerWidth >= 768) return;

      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      if (slides.length === 0) return;

      const scrollerRect = scroller.getBoundingClientRect();
      const scrollerCentre = scrollerRect.left + scrollerRect.width / 2;

      let nextActiveIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCentre = slideRect.left + slideRect.width / 2;
        const distance = Math.abs(slideCentre - scrollerCentre);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextActiveIndex = index;
        }
      });

      setActiveCardIndex(nextActiveIndex);
    };

    scroller.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    // Initial check
    updateActiveCard();

    return () => {
      scroller.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, []);

  return (
    <motion.div
      key="unlocked"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={16} className="text-gold" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold">Briefing Unlocked</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            {name ? `${name.split(' ')[0]}, here it is.` : "Here it is."}
          </h3>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Swipe through or scroll to explore the structural problems that silently bleed revenue. Each card shows the leak, the loss, and the priority action.
          </p>
        </div>
        
        <div className="hidden md:flex gap-4 mb-4">
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase text-slate-500 tracking-widest mb-1">Status</p>
            <p className="text-[11px] font-mono uppercase text-white font-bold">Independent Review v1.0</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div
          ref={cardsScrollerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 no-scrollbar scroll-smooth -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none md:mx-0 md:px-0"
        >
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {BRIEFING_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 flex flex-col items-start transition-all duration-300 hover:bg-white/[0.05] hover:border-gold/30 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                {card.icon}
              </div>
              
              <div className="mb-auto">
                <p className="text-[10px] font-mono text-gold uppercase tracking-[0.2em] mb-4">Finding {index + 1}</p>
                <h4 className="text-xl md:text-2xl font-serif font-bold text-white mb-6 leading-tight min-h-[3.5rem]">
                  {card.title}
                </h4>
                
                <div className="bg-white/5 border-l-2 border-gold p-4 mb-8">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold italic">Revenue Impact</p>
                  <p className="text-sm text-slate-200 font-medium">{card.loss}</p>
                </div>
                
                <div className="space-y-4 mb-8 text-sm leading-relaxed text-slate-400 font-light">
                  <p>{card.why}</p>
                </div>
              </div>

              <div className="w-full pt-8 border-t border-white/5 mt-auto">
                 <p className="text-[10px] font-mono text-gold uppercase tracking-widest mb-3">Principal Correction</p>
                 <p className="text-xs text-slate-300 leading-relaxed italic">
                   &quot;{card.fix}&quot;
                 </p>
              </div>
            </motion.div>
          ))}

          <motion.div
            ref={(node) => {
              slideRefs.current[BRIEFING_CARDS.length] = node;
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * 5 }}
            className="min-w-[85vw] md:min-w-0 snap-center bg-gold p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-strath-navy/10 flex items-center justify-center mb-8">
                <Clock3 className="text-strath-navy" size={24} />
              </div>
              <h4 className="text-3xl font-serif font-bold text-strath-navy mb-6 leading-tight">
                Need an Independent Review?
              </h4>
              <p className="text-strath-navy/80 text-base leading-relaxed mb-8">
                Within 48 hours, I can surface the biggest technical and commercial leaks, show you where margin is being lost, and tell you what to fix first.
              </p>
            </div>

            <SectionLink
              href="/#contact"
              className="w-full bg-strath-navy text-gold py-4 font-bold uppercase tracking-[0.2em] text-xs text-center transition-all hover:bg-white hover:text-strath-navy"
            >
              Request A Consultation
            </SectionLink>
          </motion.div>
        </div>
        
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          {[...BRIEFING_CARDS, { title: "cta" }].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeCardIndex ? "bg-gold scale-110" : "bg-white/20"}`}
            ></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
