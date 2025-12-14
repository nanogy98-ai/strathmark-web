"use client";

import { useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { clsx } from "clsx";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  country: z.string().min(2, "Country is required"),
  serviceType: z.string().min(1, "Please select an engagement type"),
  situation: z.string().min(1, "Please select a situation"),
  spend: z.string().min(1, "Please select a spend range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional()
});

type ContactFormData = z.infer<typeof contactSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormData, string[]>>;

type InputFieldProps = {
  label: string;
  name: keyof ContactFormData;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
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
      return;
    }

    // SIMULATION: In a real implementation, you would fetch() to an API endpoint here.
    // e.g. await fetch("https://api.strathmark.com/contact", { method: "POST", body: JSON.stringify(result.data) })
    
    console.log("Valid Submission (Client Side Log):", result.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <section className="w-full max-w-3xl px-6 py-24 mx-auto text-center" id="contact">
        <div className="bg-white/5 border border-gold/30 p-12 flex flex-col items-center gap-6">
          <CheckCircle2 className="text-gold w-16 h-16" />
          <h3 className="text-2xl font-serif font-bold text-white">Application Received</h3>
          <p className="text-slate-300">
            We have received your brief. We will review your requirements and response within 2 business days if we believe we can add material value.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-sm text-gold hover:text-white underline underline-offset-4"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-4xl px-6 py-24 mx-auto" id="contact">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Request an Independent Review</h2>
        <p className="text-slate-400 text-lg">Tell us about your commercial goals and current infrastructure.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/10 p-8 md:p-12 space-y-8 backdrop-blur-sm">
        
        {/* Honeypot */}
        <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Core Identity */}
        <div className="space-y-6">
          <h3 className="text-white font-serif border-b border-white/10 pb-2 mb-6">Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" name="name" placeholder="John Doe" error={errors.name} />
            <InputField label="Work Email" name="email" type="email" placeholder="john@company.com" error={errors.email} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Company Name" name="company" placeholder="Acme Corp Ltd." error={errors.company} />
            <InputField label="Website URL" name="website" placeholder="https://..." error={errors.website} />
          </div>
          <InputField label="Country of Operation" name="country" placeholder="United Kingdom" error={errors.country} />
        </div>

        {/* Qualification */}
        <div className="space-y-6 pt-6">
          <h3 className="text-white font-serif border-b border-white/10 pb-2 mb-6">Qualification</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Brief */}
        <div className="space-y-2 pt-6">
          <label className="text-xs font-mono text-gold uppercase tracking-wider block">Brief</label>
          <textarea 
            name="message"
            rows={5}
            className={clsx(
              "w-full bg-black/30 border p-4 text-white focus:border-gold outline-none transition-colors placeholder:text-slate-600",
              errors.message ? "border-red-500" : "border-white/10"
            )}
            placeholder="Describe your objectives or the current failure state..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.message[0]}
            </p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gold text-strath-navy font-bold text-lg py-4 flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>Processing <Loader2 className="animate-spin" /></>
          ) : (
            "Submit Application"
          )}
        </button>
        
        <p className="text-center text-slate-500 text-xs mt-4">
          By submitting, you confirm you represent the entity above.
        </p>
      </form>
    </section>
  );
}

function InputField({ label, name, type = "text", placeholder, error }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-gold uppercase tracking-wider block">{label}</label>
      <input 
        type={type} 
        name={name as string}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-black/30 border p-4 text-white focus:border-gold outline-none transition-colors placeholder:text-slate-600",
          error ? "border-red-500" : "border-white/10"
        )}
      />
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <AlertCircle size={12} /> {error[0]}
        </p>
      )}
    </div>
  );
}

function SelectField({ label, name, options, error }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-gold uppercase tracking-wider block">{label}</label>
      <div className="relative">
        <select 
          name={name as string}
          defaultValue=""
          className={clsx(
            "w-full bg-black/30 border p-4 text-white focus:border-gold outline-none transition-colors appearance-none cursor-pointer",
            error ? "border-red-500" : "border-white/10"
          )}
        >
          <option value="" disabled className="text-slate-500">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-strath-navy text-white">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          ▼
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
          <AlertCircle size={12} /> {error[0]}
        </p>
      )}
    </div>
  );
}

