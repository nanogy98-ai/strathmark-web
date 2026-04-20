"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { ProposalRouteKey, ROUTE_CONTENT } from "./proposal-content";
import { ctaPrimaryClass, ctaSecondaryClass } from "./cta";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "7673741a-3e33-4912-96b3-bd1a31729185";
const CLIENT_NAME = "Ethical Coffee Ltd";
const EMAIL_MIGRATION_ADD_ON_FEE = 350;

type FormState = {
  route: ProposalRouteKey;
  fullName: string;
  company: string;
  signature: string;
  startDate: string;
  email: string;
  addOnEmailMigration: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const BANK = {
  currency: "EUR (€)",
  beneficiary: "Graeme Tudhope",
  iban: "GB59 REVO 0099 7030 2778 55",
  bic: "REVOGB21",
  bankAddress: "Revolut Ltd, 30 South Colonnade, E14 5HX, London, United Kingdom",
  correspondentBic: "CHASDEFX",
};

function formatDateLong(date: Date) {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSelectedDate(dateString: string) {
  if (!dateString) return "To be confirmed";
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return dateString;
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getInitialPayment(routeKey: ProposalRouteKey) {
  return routeKey === "A" ? 1700 : 1080;
}

function getPaymentSummary(state: FormState) {
  const addOnAmount = state.addOnEmailMigration ? EMAIL_MIGRATION_ADD_ON_FEE : 0;
  const amountDueNow = getInitialPayment(state.route) + addOnAmount;
  const addOnSuffix = state.addOnEmailMigration ? " + Zoho Mail migration" : "";

  if (state.route === "A") {
    return {
      label: state.addOnEmailMigration ? "Deposit to commence the rebuild + Zoho Mail migration" : "Deposit to commence the rebuild",
      amount: formatEuro(amountDueNow),
      reference: `TCC Ireland — Route A deposit${addOnSuffix}`,
      followOn: state.addOnEmailMigration
        ? `This total includes the ${formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)} Zoho Mail migration add-on. Balance of €1,700 is still due on launch — the site goes live on receipt of that payment. Retainer begins on launch at €1,080 for month 1 (18 hrs), then €600 per month thereafter (10 hrs).`
        : "Balance of €1,700 is due on launch — the site goes live on receipt of this payment. Retainer begins on launch at €1,080 for month 1 (18 hrs), then €600 per month thereafter (10 hrs).",
      breakdown: [
        `Route A deposit: ${formatEuro(getInitialPayment("A"))}`,
        ...(state.addOnEmailMigration ? [`Zoho Mail migration add-on: ${formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)}`] : []),
      ],
    };
  }

  return {
    label: state.addOnEmailMigration ? "Month 1 retainer + Zoho Mail migration" : "Month 1 retainer to commence",
    amount: formatEuro(amountDueNow),
    reference: `TCC Ireland — Route B month 1${addOnSuffix}`,
    followOn: state.addOnEmailMigration
      ? `This total includes the ${formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)} Zoho Mail migration add-on. Each subsequent month remains €600, due on the same calendar day each month.`
      : "Each subsequent month is €600, due on the same calendar day each month.",
    breakdown: [
      `Route B month 1 retainer: ${formatEuro(getInitialPayment("B"))}`,
      ...(state.addOnEmailMigration ? [`Zoho Mail migration add-on: ${formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)}`] : []),
    ],
  };
}

async function buildSignedPdf(state: FormState, acceptedAt: Date): Promise<Blob> {
  // Dynamic import keeps jspdf out of the initial page bundle.
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const gold = "#C5A059";
  const ink = "#0F172A";
  const muted = "#475569";

  let y = 60;

  // Header band
  doc.setFillColor(15, 23, 42); // strath-navy
  doc.rect(0, 0, pageWidth, 36, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("STRATHMARK CONSULTING", marginX, 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Private Proposal", pageWidth - marginX, 23, { align: "right" });

  y = 90;

  // Title
  doc.setTextColor(ink);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("Proposal Acceptance", marginX, y);
  y += 28;

  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.setTextColor(muted);
  doc.text(`Prepared for ${CLIENT_NAME} by Strathmark Consulting`, marginX, y);
  y += 32;

  // Divider
  doc.setDrawColor(gold);
  doc.setLineWidth(1.2);
  doc.line(marginX, y, marginX + 60, y);
  y += 28;

  // Selected route block
  const route = ROUTE_CONTENT[state.route];
  const payment = getPaymentSummary(state);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("SELECTED ROUTE", marginX, y);
  y += 16;

  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(ink);
  doc.text(`${route.label} — ${route.title}`, marginX, y, { maxWidth: pageWidth - marginX * 2 });
  y += 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("INVESTMENT", marginX, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(ink);
  route.investment.forEach((line) => {
    const wrapped = doc.splitTextToSize(line, pageWidth - marginX * 2 - 10) as string[];
    wrapped.forEach((w, i) => {
      doc.text(i === 0 ? `• ${w}` : `  ${w}`, marginX, y);
      y += 14;
    });
  });

  y += 10;

  const addOns: string[] = [];
  if (state.addOnEmailMigration) addOns.push(`Email migration to Zoho Mail — ${formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)} one-off (up to 5 mailboxes)`);
  if (addOns.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gold);
    doc.text("OPTIONAL ADD-ONS REQUESTED", marginX, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(ink);
    addOns.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, pageWidth - marginX * 2 - 10) as string[];
      wrapped.forEach((w, i) => {
        doc.text(i === 0 ? `• ${w}` : `  ${w}`, marginX, y);
        y += 14;
      });
    });
    y += 6;
  }

  // Acceptance statement
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("ACCEPTANCE STATEMENT", marginX, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(ink);
  const statement = `By signing below, ${CLIENT_NAME} confirms acceptance of the selected proposal option and authorises Strathmark Consulting to commence the agreed scope of work, subject to receipt of the initial payment.`;
  const wrappedStatement = doc.splitTextToSize(statement, pageWidth - marginX * 2) as string[];
  wrappedStatement.forEach((line) => {
    doc.text(line, marginX, y);
    y += 14;
  });
  y += 20;

  // Signatory block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("SIGNATORY", marginX, y);
  y += 18;

  const field = (label: string, value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(muted);
    doc.text(label.toUpperCase(), marginX, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(ink);
    doc.text(value || "—", marginX + 130, y);
    y += 20;
  };

  field("Full Name", state.fullName);
  field("Company", state.company);
  field("Email", state.email);
  field("Preferred Start Date", formatSelectedDate(state.startDate));
  field("Date Signed", formatDateLong(acceptedAt));

  y += 14;

  // Signature
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("SIGNATURE", marginX, y);
  y += 18;

  doc.setFont("times", "italic");
  doc.setFontSize(26);
  doc.setTextColor(ink);
  doc.text(state.signature || state.fullName, marginX, y);
  y += 12;

  doc.setDrawColor(150);
  doc.setLineWidth(0.5);
  doc.line(marginX, y, marginX + 280, y);

  // ========== PAGE 2 — Payment instructions ==========
  doc.addPage();

  // Header band on page 2
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 36, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("STRATHMARK CONSULTING", marginX, 23);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Payment Instructions", pageWidth - marginX, 23, { align: "right" });

  y = 90;

  // Title
  doc.setTextColor(ink);
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text("Payment to commence", marginX, y);
  y += 28;

  doc.setFont("times", "italic");
  doc.setFontSize(12);
  doc.setTextColor(muted);
  doc.text("Please wire the amount below to begin work on the agreed start date.", marginX, y, { maxWidth: pageWidth - marginX * 2 });
  y += 24;

  doc.setDrawColor(gold);
  doc.setLineWidth(1.2);
  doc.line(marginX, y, marginX + 60, y);
  y += 28;

  // Amount due now — prominent block
  const due = payment;

  doc.setFillColor(248, 246, 240);
  doc.rect(marginX, y, pageWidth - marginX * 2, 84, "F");
  doc.setDrawColor(gold);
  doc.setLineWidth(1);
  doc.rect(marginX, y, pageWidth - marginX * 2, 84, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("AMOUNT DUE NOW", marginX + 16, y + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(ink);
  doc.text(due.label, marginX + 16, y + 38);

  doc.setFont("times", "bold");
  doc.setFontSize(34);
  doc.setTextColor(ink);
  doc.text(due.amount, marginX + 16, y + 72);

  y += 100;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("PAYMENT BREAKDOWN", marginX, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(ink);
  due.breakdown.forEach((line) => {
    doc.text(`• ${line}`, marginX, y);
    y += 14;
  });
  y += 10;

  // Follow-on note
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(muted);
  const followOn = doc.splitTextToSize(due.followOn, pageWidth - marginX * 2) as string[];
  followOn.forEach((line) => {
    doc.text(line, marginX, y);
    y += 14;
  });
  y += 18;

  // Bank details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(gold);
  doc.text("BANK DETAILS", marginX, y);
  y += 18;

  const bankRow = (label: string, value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(muted);
    doc.text(label.toUpperCase(), marginX, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(ink);
    const wrapped = doc.splitTextToSize(value, pageWidth - marginX * 2 - 150) as string[];
    wrapped.forEach((line, i) => {
      doc.text(line, marginX + 150, y + i * 14);
    });
    y += Math.max(20, wrapped.length * 14 + 6);
  };

  bankRow("Currency", BANK.currency);
  bankRow("Beneficiary", BANK.beneficiary);
  bankRow("IBAN", BANK.iban);
  bankRow("BIC / SWIFT", BANK.bic);
  bankRow("Bank address", BANK.bankAddress);
  bankRow("Correspondent BIC", BANK.correspondentBic);
  bankRow("Payment reference", due.reference);

  y += 10;

  // Friction-reducing note
  doc.setFillColor(245, 247, 251);
  doc.rect(marginX, y, pageWidth - marginX * 2, 56, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(ink);
  doc.text("Once payment lands", marginX + 14, y + 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(muted);
  const noteLines = doc.splitTextToSize(
    "Strathmark Consulting will confirm receipt by email within one working day and the agreed start date is locked in. No further action is required from your side.",
    pageWidth - marginX * 2 - 28,
  ) as string[];
  noteLines.forEach((line, i) => {
    doc.text(line, marginX + 14, y + 36 + i * 12);
  });

  // Footer on every page
  const drawFooter = (pageLabel: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(muted);
    doc.text(
      `Strathmark Consulting · Private proposal for ${CLIENT_NAME} · ${formatDateLong(acceptedAt)} · ${pageLabel}`,
      pageWidth / 2,
      pageHeight - 24,
      { align: "center" },
    );
  };
  doc.setPage(1);
  drawFooter("Page 1 of 2 — Acceptance");
  doc.setPage(2);
  drawFooter("Page 2 of 2 — Payment");

  return doc.output("blob");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function ApprovalForm() {
  const [state, setState] = useState<FormState>({
    route: "A",
    fullName: "",
    company: CLIENT_NAME,
    signature: "",
    startDate: "",
    email: "",
    addOnEmailMigration: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState<{ at: Date; filename: string; blob: Blob } | null>(null);
  const payment = getPaymentSummary(state);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!state.fullName.trim() || state.fullName.trim().length < 2) next.fullName = "Full name is required";
    if (!state.company.trim()) next.company = "Company is required";
    if (!state.signature.trim() || state.signature.trim().length < 2) next.signature = "Type your full name as signature";
    if (!state.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) next.email = "Valid email is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const acceptedAt = new Date();
      const pdfBlob = await buildSignedPdf(state, acceptedAt);
      const filename = `Strathmark-Proposal-Signed-${state.company.replace(/[^a-z0-9]+/gi, "-")}-${acceptedAt.toISOString().slice(0, 10)}.pdf`;

      const addOnTag = state.addOnEmailMigration ? " + Zoho email migration" : "";

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: "Strathmark Proposal Portal",
        subject: `SIGNED PROPOSAL — ${CLIENT_NAME} — Route ${state.route}${addOnTag}`,
        replyto: state.email,
        source: "strathmarkconsulting.com/proposals/the-coffee-company-ireland",
        submittedAt: acceptedAt.toISOString(),
        route: `Route ${state.route} — ${ROUTE_CONTENT[state.route].title}`,
        addOnEmailMigration: state.addOnEmailMigration ? "Yes" : "No",
        amountDueNow: payment.amount,
        paymentReference: payment.reference,
        fullName: state.fullName,
        company: state.company,
        email: state.email,
        typedSignature: state.signature,
        preferredStartDate: formatSelectedDate(state.startDate),
        dateSigned: `${formatDateLong(acceptedAt)} (${acceptedAt.toISOString()})`,
        message: [
          `Proposal signed for ${CLIENT_NAME}.`,
          ``,
          `Route chosen: Route ${state.route} — ${ROUTE_CONTENT[state.route].title}`,
          `Add-on — Email migration to Zoho Mail (€350): ${state.addOnEmailMigration ? "Yes" : "No"}`,
          `Amount due now: ${payment.amount}`,
          `Payment reference: ${payment.reference}`,
          ``,
          `Signatory full name: ${state.fullName}`,
          `Company: ${state.company}`,
          `Email: ${state.email}`,
          `Typed signature: ${state.signature}`,
          `Preferred start date: ${formatSelectedDate(state.startDate)}`,
          `Date signed: ${formatDateLong(acceptedAt)} (${acceptedAt.toISOString()})`,
          ``,
          `Filename the client downloaded: ${filename}`,
          `(The signed PDF is generated client-side and downloaded by the signatory. Regenerate locally from the fields above when an archive copy is needed.)`,
        ].join("\n"),
      };

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        throw new Error(json?.message || `Submission failed (${res.status})`);
      }

      // Trigger a download for the signatory so they keep a copy immediately.
      downloadBlob(pdfBlob, filename);
      setAccepted({ at: acceptedAt, filename, blob: pdfBlob });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (accepted) {
    return (
      <div className="mt-10 bg-gradient-to-b from-gold/5 to-transparent border border-gold/30 p-8 md:p-10">
        <div className="flex items-center gap-3 text-gold">
          <CheckCircle2 size={24} />
          <span className="font-mono text-xs uppercase tracking-widest">Proposal accepted</span>
        </div>
        <h3 className="mt-4 text-2xl md:text-3xl font-serif font-bold text-white leading-tight">Thank you. Your selected route has been recorded.</h3>
        <p className="mt-4 text-slate-300 font-light leading-relaxed">
          Your signed PDF has been downloaded to your device, and Strathmark Consulting has been notified of your acceptance.
        </p>
        <p className="mt-4 text-slate-300 font-light leading-relaxed">
          <strong className="text-white">Page 2 of the PDF contains your itemised amount due now and the full bank details for the wire.</strong> Once payment lands, receipt will be confirmed by email within one working day and the agreed start date is locked in.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => downloadBlob(accepted.blob, accepted.filename)}
            className={ctaSecondaryClass}
          >
            <Download size={16} /> Download signed PDF again
          </button>
        </div>

        <p className="mt-6 text-xs font-mono uppercase tracking-widest text-slate-500">
          Recorded at {accepted.at.toLocaleString("en-GB")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-10">
      {/* Route selector */}
      <fieldset>
        <legend className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">Choose route</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([
            { key: "A" as const, label: ROUTE_CONTENT.A.label, title: ROUTE_CONTENT.A.title, recommended: true },
            { key: "B" as const, label: ROUTE_CONTENT.B.label, title: ROUTE_CONTENT.B.title, recommended: false },
          ]).map((opt) => {
            const selected = state.route === opt.key;
            return (
              <label
                key={opt.key}
                className={clsx(
                  "cursor-pointer border p-5 block transition-all",
                  selected ? "border-gold bg-gold/5" : "border-white/10 bg-white/[0.02] hover:border-white/30",
                )}
              >
                <input
                  type="radio"
                  name="route"
                  value={opt.key}
                  checked={selected}
                  onChange={() => update("route", opt.key)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <span className={clsx("text-[10px] font-mono uppercase tracking-widest", selected ? "text-gold" : "text-slate-400")}>
                    {opt.label}
                  </span>
                  {opt.recommended && (
                    <span className="text-[9px] font-mono uppercase tracking-widest bg-gold/20 text-gold px-2 py-0.5">Recommended</span>
                  )}
                </div>
                <div className="mt-2 font-serif text-lg font-bold text-white leading-snug">{opt.title}</div>
                <div className={clsx("mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest", selected ? "text-gold" : "text-slate-500")}>
                  <span className={clsx("w-3 h-3 rounded-full border", selected ? "bg-gold border-gold" : "border-slate-500")} />
                  {selected ? "Selected" : "Select"}
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Add-on */}
      <fieldset>
        <legend className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-4">Optional add-on</legend>
        <label className="flex items-start gap-3 cursor-pointer group bg-white/[0.02] border border-white/10 p-4 hover:border-gold/30 transition-colors">
          <input
            type="checkbox"
            checked={state.addOnEmailMigration}
            onChange={(e) => update("addOnEmailMigration", e.target.checked)}
            className="mt-1 w-5 h-5 accent-gold shrink-0"
          />
          <span>
            <span className="text-white font-medium">Email migration to Zoho Mail — {formatEuro(EMAIL_MIGRATION_ADD_ON_FEE)}</span>
            <span className="block text-sm text-slate-400 font-light mt-1">One-off migration away from Register365. Covers up to 5 mailboxes and is added to the initial payment shown below and inside the PDF.</span>
          </span>
        </label>
      </fieldset>

      <div className="bg-gold/5 border border-gold/20 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-gold">Amount due now</p>
            <p className="mt-2 font-serif text-3xl font-bold text-white">{payment.amount}</p>
          </div>
          <div className="max-w-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Payment reference</p>
            <p className="mt-2 text-sm text-slate-200 font-light">{payment.reference}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-slate-300 font-light">
          {payment.breakdown.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">{payment.followOn}</p>
      </div>

      {/* Signatory fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full name" name="fullName" value={state.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} autoComplete="name" />
        <Field label="Company name" name="company" value={state.company} onChange={(v) => update("company", v)} error={errors.company} autoComplete="organization" />
        <Field label="Email" name="email" type="email" value={state.email} onChange={(v) => update("email", v)} error={errors.email} autoComplete="email" />
        <Field label="Preferred start date (optional)" name="startDate" type="date" value={state.startDate} onChange={(v) => update("startDate", v)} />
      </div>

      {/* Typed signature */}
      <div>
        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-3">Typed signature</label>
        <input
          value={state.signature}
          onChange={(e) => update("signature", e.target.value)}
          placeholder="Type your full legal name to sign"
          className={clsx(
            "w-full bg-transparent border-b py-3 font-serif italic text-2xl md:text-3xl text-white placeholder:text-slate-600 placeholder:italic focus:outline-none transition-colors",
            errors.signature ? "border-red-400" : "border-white/20 focus:border-gold",
          )}
        />
        {errors.signature && <p className="mt-2 text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14} /> {errors.signature}</p>}
        <p className="mt-2 text-xs text-slate-500 font-light">By typing your name you agree that this constitutes your legal electronic signature on this proposal.</p>
      </div>

      {/* Acceptance statement */}
      <div className="bg-white/[0.02] border border-white/10 p-5 text-sm text-slate-300 font-light leading-relaxed">
        By signing, <strong className="text-white">{state.company || CLIENT_NAME}</strong> confirms acceptance of
        <strong className="text-gold"> Route {state.route}</strong>
        {state.addOnEmailMigration && <> <strong className="text-gold">+ Zoho email migration (€350)</strong></>}
        , and authorises Strathmark Consulting to commence the agreed scope of work, subject to receipt of the initial payment.
      </div>

      {submitError && (
        <div className="border border-red-400/40 bg-red-500/5 text-red-300 p-4 text-sm flex items-start gap-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <div>
            <strong className="block text-red-200">Submission failed</strong>
            <span>{submitError}</span>
            <span className="block mt-2 text-xs text-red-300/80">Please try again. If this keeps happening, email graeme@strathmarkconsulting.com and we will proceed manually.</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            ctaPrimaryClass,
            submitting
              ? "bg-slate-700 text-slate-400 cursor-wait"
              : "",
          )}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Submitting…
            </>
          ) : (
            <>Accept proposal &amp; issue signed PDF</>
          )}
        </button>
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Secure digital acceptance</p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

function Field({ label, name, value, onChange, error, type = "text", placeholder, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={clsx(
          "w-full bg-white/[0.02] border px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none transition-colors",
          error ? "border-red-400" : "border-white/10 focus:border-gold",
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}
