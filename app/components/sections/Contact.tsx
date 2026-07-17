"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { clsx } from "clsx";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "live.com",
  "msn.com",
  "proton.me",
  "protonmail.com",
]);

function getEmailDomain(email: string) {
  return email.split("@").pop()?.toLowerCase().trim() ?? "";
}

function normalizeWebsiteInput(website: string) {
  const trimmed = website.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidWebsite(website: string) {
  try {
    const normalized = normalizeWebsiteInput(website);
    const url = new URL(normalized);
    return ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
  } catch {
    return false;
  }
}

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "7673741a-3e33-4912-96b3-bd1a31729185";
const WEB3FORMS_FROM_NAME = "Strathmark Consulting";
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function isFreeEmailDomain(email: string) {
  const domain = getEmailDomain(email);
  return domain.length > 0 && FREE_EMAIL_DOMAINS.has(domain);
}

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  website: z
    .string()
    .trim()
    .min(1, "Website is required")
    .refine(isValidWebsite, "Invalid URL")
    .transform(normalizeWebsiteInput),
  country: z.string().min(2, "Country is required"),
  serviceType: z.string().min(1, "Please select an engagement type"),
  situation: z.string().min(1, "Please select a situation"),
  spend: z.string().min(1, "Please select a spend range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  heardFrom: z.string().optional().or(z.literal("")),
  honeypot: z.string().optional()
});

const identitySchema = contactSchema.pick({
  name: true,
  email: true,
  company: true,
  website: true,
  country: true,
});

type ContactFormData = z.infer<typeof contactSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormData, string[]>>;

type InputFieldProps = {
  label: string;
  name: keyof ContactFormData;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  error?: string[];
};

type SelectOption = { label: string; value: string };
type SelectFieldProps = {
  label: string;
  name: keyof ContactFormData;
  options: SelectOption[];
  error?: string[];
};

export function Contact() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const firstStepHeadingRef = useRef<HTMLHeadingElement>(null);
  const secondStepHeadingRef = useRef<HTMLHeadingElement>(null);

  const advanceToQualification = (form: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(form).entries());
    const identityResult = identitySchema.safeParse(data);

    if (!identityResult.success) {
      const identityErrors = identityResult.error.flatten().fieldErrors;
      setErrors((current) => ({
        ...current,
        name: identityErrors.name,
        email: identityErrors.email,
        company: identityErrors.company,
        website: identityErrors.website,
        country: identityErrors.country,
      }));
      const firstInvalidName = identityResult.error.issues[0]?.path[0];
      if (typeof firstInvalidName === "string") {
        form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
      }
      return;
    }

    setErrors((current) => ({
      ...current,
      name: undefined,
      email: undefined,
      company: undefined,
      website: undefined,
      country: undefined,
    }));
    setStep(2);
    window.requestAnimationFrame(() => secondStepHeadingRef.current?.focus());
  };

  const moveToQualification = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    if (form) advanceToQualification(form);
  };

  const returnToIdentity = () => {
    setStep(1);
    window.requestAnimationFrame(() => firstStepHeadingRef.current?.focus());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (step === 1) {
      advanceToQualification(form);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    // Basic client-side rate limiting (static export safe).
    const now = Date.now();
    let last = 0;
    try {
      last = Number(window.localStorage.getItem("strathmark_last_submit_ts") ?? "0");
    } catch {
      // Storage is best-effort; submission must still work when it is unavailable.
    }
    if (last && now - last < 60_000) {
      setIsSubmitting(false);
      setSubmitError("Please wait 60 seconds before submitting again.");
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Honeypot check
    if (data.honeypot) {
      setIsSuccess(true); // Silent success
      setIsSubmitting(false);
      return;
    }

    const result = contactSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setIsSubmitting(false);
      const firstInvalidName = result.error.issues[0]?.path[0];
      if (typeof firstInvalidName === "string") {
        window.requestAnimationFrame(() => {
          form.querySelector<HTMLElement>(`[name="${firstInvalidName}"]`)?.focus();
        });
      }
      return;
    }

    const payload = {
      ...result.data,
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: WEB3FORMS_FROM_NAME,
      subject: `New enquiry from ${result.data.company}`,
      replyto: result.data.email,
      emailDomain: getEmailDomain(result.data.email),
      emailIsFreeDomain: isFreeEmailDomain(result.data.email),
      summary: [
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        `Company: ${result.data.company}`,
        `Website: ${result.data.website}`,
        `Country: ${result.data.country}`,
        `Looking for: ${result.data.serviceType}`,
        `Situation: ${result.data.situation}`,
        `Spend: ${result.data.spend}`,
        `Timeline: ${result.data.timeline}`,
        result.data.heardFrom ? `Heard from: ${result.data.heardFrom}` : null,
        `Message: ${result.data.message}`,
      ].filter(Boolean).join("\n"),
      source: "strathmarkconsulting.com",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await res.json().catch(() => null);

      if (!res.ok || !response?.success) {
        throw new Error(response?.message || `Submission failed (${res.status})`);
      }

      try {
        window.localStorage.setItem("strathmark_last_submit_ts", String(Date.now()));
      } catch {
        // A successful enquiry remains successful even if local rate-limit storage is blocked.
      }

      // Tracking hook (GA4): fire a non-PII lead event on successful submission.
      // Note: do not include email/name/message in analytics payloads.
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", {
            form_id: "contact",
            serviceType: result.data.serviceType,
            situation: result.data.situation,
            spend: result.data.spend,
            timeline: result.data.timeline,
          });
        }
      } catch {
        // ignore tracking errors
      }

      setIsSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The request could not be submitted. Please try again in a moment.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="w-full bg-ivory py-20 text-ink md:py-28" id="contact">
        <div className="section-shell">
          <div
            role="status"
            aria-live="polite"
            className="mx-auto flex max-w-3xl flex-col items-center border border-ink/15 bg-white p-8 text-center shadow-[0_30px_80px_rgba(11,22,36,0.1)] md:p-14"
          >
            <span className="grid h-16 w-16 place-items-center border border-[#74521f]/30 bg-[#74521f]/10">
              <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-[#74521f]" />
            </span>
            <h2 className="mt-7 text-4xl font-semibold">Application received.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              I have received your brief. I will review your requirements and respond within 2 business days if I can add material value.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-7 min-h-11 text-sm font-bold uppercase tracking-[0.14em] text-[#74521f] transition-colors hover:text-ink"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-ivory py-20 text-ink md:py-28" id="contact">
      <div className="section-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="section-kicker !text-[#74521f]">Start a conversation</p>
          <h2 className="mt-6 text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.025em]">
            Request an independent review.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-700">
            Tell me what is not making sense. I review each brief personally and respond within two business days when I can add meaningful value.
          </p>

          <dl className="mt-10 border-t border-ink/15">
            {[
              ["01", "Share the context"],
              ["02", "I review the fit"],
              ["03", "You receive a direct response"],
            ].map(([number, label]) => (
              <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/15 py-4">
                <dt className="font-mono text-xs text-[#74521f]">{number}</dt>
                <dd className="text-sm font-semibold">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (step !== 1 || event.key !== "Enter" || event.nativeEvent.isComposing) return;
            event.preventDefault();
            advanceToQualification(event.currentTarget);
          }}
          noValidate
          className="border border-white/10 bg-strath-navy p-6 text-white shadow-[0_35px_90px_rgba(11,22,36,0.16)] md:p-10 lg:col-span-8"
        >
          <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="mb-9 flex items-center gap-3" aria-label={"Step " + step + " of 2"}>
            {[1, 2].map((item) => (
              <span
                key={item}
                className={clsx(
                  "h-1 flex-1 transition-colors",
                  item <= step ? "bg-gold" : "bg-white/10"
                )}
              />
            ))}
          </div>

          <div hidden={step !== 1}>
            <h3 ref={firstStepHeadingRef} tabIndex={-1} className="text-3xl font-semibold text-white">
              About you
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Start with the organisation and the person requesting the review.
            </p>

            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  autoComplete="name"
                  error={errors.name}
                />
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                    Work Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : emailWarning ? "contact-email-warning" : undefined}
                    className={clsx(
                      "min-h-14 w-full border bg-white/[0.045] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold",
                      errors.email ? "border-red-400" : "border-white/15"
                    )}
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      if (value && isFreeEmailDomain(value)) {
                        setEmailWarning(
                          "Free email domains are allowed, but I prioritise enquiries from company addresses. If you are early-stage, add a short note in the brief."
                        );
                      } else {
                        setEmailWarning(null);
                      }
                    }}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-2 flex items-center gap-2 text-xs text-red-300">
                      <AlertCircle aria-hidden="true" size={13} /> {errors.email[0]}
                    </p>
                  ) : null}
                  {emailWarning && !errors.email ? (
                    <p id="contact-email-warning" role="status" className="mt-2 flex items-start gap-2 text-xs leading-5 text-amber-200">
                      <AlertCircle aria-hidden="true" size={13} className="mt-0.5 shrink-0 text-amber-300" />
                      <span>{emailWarning}</span>
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InputField
                  label="Company Name"
                  name="company"
                  placeholder="Acme Corp Ltd."
                  autoComplete="organization"
                  error={errors.company}
                />
                <InputField
                  label="Website URL"
                  name="website"
                  placeholder="example.com"
                  autoComplete="url"
                  error={errors.website}
                />
              </div>
              <InputField
                label="Country of Operation"
                name="country"
                placeholder="United Kingdom"
                autoComplete="country-name"
                error={errors.country}
              />
            </div>

            <button
              type="button"
              onClick={moveToQualification}
              className="mt-9 inline-flex min-h-14 w-full items-center justify-center bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white sm:w-auto"
            >
              Continue to the brief
            </button>
          </div>

          <div hidden={step !== 2}>
            <h3 ref={secondStepHeadingRef} tabIndex={-1} className="text-3xl font-semibold text-white">
              The current situation
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Add enough context to make the first response useful.
            </p>

            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <SelectField
                  label="Engagement Type"
                  name="serviceType"
                  options={[
                    { label: "Independent Digital & Spend Review", value: "strategic-review" },
                    { label: "Strategic Advisory (Ongoing)", value: "advisory" },
                    { label: "Selective Execution (By Invitation)", value: "execution" },
                    { label: "Unsure / Other", value: "unsure" }
                  ]}
                  error={errors.serviceType}
                />
                <SelectField
                  label="Primary Challenge"
                  name="situation"
                  options={[
                    { label: "Growth has stalled", value: "stalled" },
                    { label: "Paid spend feels inefficient", value: "inefficient-spend" },
                    { label: "Platform issues / Rebuild needed", value: "platform-issues" },
                    { label: "Tracking & Attribution unclear", value: "tracking" },
                    { label: "Penalty or Technical Issues", value: "penalty" },
                    { label: "Other", value: "other" }
                  ]}
                  error={errors.situation}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <SelectField
                  label="Approx Monthly Marketing Spend"
                  name="spend"
                  options={[
                    { label: "Under £5k", value: "under-5k" },
                    { label: "£5k - £20k", value: "5k-20k" },
                    { label: "£20k - £100k", value: "20k-100k" },
                    { label: "£100k+", value: "100k+" },
                    { label: "Prefer not to say", value: "hidden" }
                  ]}
                  error={errors.spend}
                />
                <SelectField
                  label="Timeline"
                  name="timeline"
                  options={[
                    { label: "Immediate (0-30 days)", value: "immediate" },
                    { label: "1 to 3 months", value: "1-3-months" },
                    { label: "3 to 6 months", value: "3-6-months" },
                    { label: "6+ months", value: "6-plus-months" }
                  ]}
                  error={errors.timeline}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                  Brief
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={clsx(
                    "w-full resize-y border bg-white/[0.045] p-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold",
                    errors.message ? "border-red-400" : "border-white/15"
                  )}
                  placeholder="Describe your objectives or the current failure state..."
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-2 flex items-center gap-2 text-xs text-red-300">
                    <AlertCircle aria-hidden="true" size={13} /> {errors.message[0]}
                  </p>
                ) : null}
              </div>

              <InputField
                label="How did you hear about me? (Optional)"
                name="heardFrom"
                placeholder="Referral, LinkedIn, Google, etc."
                error={errors.heardFrom}
              />
            </div>

            {submitError ? (
              <div role="alert" className="mt-7 flex items-start gap-2 border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                <AlertCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
                <div>{submitError}</div>
              </div>
            ) : null}

            <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={returnToIdentity}
                className="min-h-12 border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex min-h-14 items-center justify-center gap-2 bg-gold px-7 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>Processing <Loader2 aria-hidden="true" className="animate-spin" /></>
                ) : (
                  "Send review request"
                )}
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500 sm:text-right">
              By submitting, you confirm you represent the entity above.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  error,
}: InputFieldProps) {
  const id = "contact-" + String(name);
  const errorId = id + "-error";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name as string}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          "min-h-14 w-full border bg-white/[0.045] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-gold",
          error ? "border-red-400" : "border-white/15"
        )}
      />
      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-xs text-red-300">
          <AlertCircle aria-hidden="true" size={13} /> {error[0]}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({ label, name, options, error }: SelectFieldProps) {
  const id = "contact-" + String(name);
  const errorId = id + "-error";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.15em] text-gold">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name as string}
          defaultValue=""
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            "min-h-14 w-full cursor-pointer appearance-none border bg-white/[0.045] px-4 pr-12 text-white outline-none transition-colors focus:border-gold",
            error ? "border-red-400" : "border-white/15"
          )}
        >
          <option value="" disabled className="bg-strath-navy text-slate-400">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-strath-navy text-white">{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
          ▼
        </div>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-xs text-red-300">
          <AlertCircle aria-hidden="true" size={13} /> {error[0]}
        </p>
      ) : null}
    </div>
  );
}
