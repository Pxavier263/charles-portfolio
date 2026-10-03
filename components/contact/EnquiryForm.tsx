"use client";
import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BUDGETS, PROJECT_TYPES, TIMELINES } from "@/data/conversion";
import { ErrorSummary, Honeypot, SelectField, TextArea, TextField } from "@/components/forms/Fields";
import { canSubmit, rules, submitForm, validate, type Values } from "@/lib/forms";
import { SuccessPanel } from "./SuccessPanel";

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  organisation: "Organisation",
  projectType: "Project type",
  budget: "Budget",
  timeline: "Timeline",
  details: "Project details",
  consent: "Consent",
};

const SCHEMA = {
  name: [rules.required("Please enter your name."), rules.min(2, "Your name")],
  email: [rules.required("Please enter your email address."), rules.email()],
  projectType: [rules.required("Please choose the kind of project.")],
  budget: [rules.required("Please choose a budget range. 'Not sure yet' is fine.")],
  details: [rules.required("Please tell me a little about the project."), rules.min(30, "Project details"), rules.max(2000)],
  consent: [rules.checked("Please confirm I may use your details to reply.")],
};

const EMPTY: Values = { name: "", email: "", organisation: "", projectType: "", budget: "", timeline: "", details: "", consent: "", company: "", estimate: "" };

export interface EstimatePayload {
  projectType: string;
  summary: string;
}

/**
 * The main enquiry form: name, email, project type, budget and details (+ organisation and timeline).
 * Validates on blur and on submit, shows an error summary, and ends in a success state.
 * Pre-fills from ?service=<id> and from the estimator ("Use this estimate").
 */
export function EnquiryForm() {
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const available = canSubmit();

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (s && PROJECT_TYPES.some((t) => t.id === s)) setV((x) => ({ ...x, projectType: s }));
    const onEstimate = (e: Event) => {
      const d = (e as CustomEvent<EstimatePayload>).detail;
      setV((x) => ({ ...x, projectType: d.projectType, estimate: d.summary }));
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => document.getElementById("name")?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener("estimate:apply", onEstimate);
    return () => window.removeEventListener("estimate:apply", onEstimate);
  }, []);

  const set = (k: string) => (val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k] || showSummary) setErrors(validate(next, SCHEMA));
  };
  const blur = (k: string) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(v, SCHEMA));
  };
  const err = (k: string) => (touched[k] || showSummary ? errors[k] : undefined);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (v.company) return; // honeypot: silently ignore bots
    const errs = validate(v, SCHEMA);
    setErrors(errs);
    setShowSummary(true);
    if (Object.keys(errs).length) {
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    setState("sending");
    const typeLabel = PROJECT_TYPES.find((t) => t.id === v.projectType)?.label ?? v.projectType;
    const timelineLabel = TIMELINES.find((t) => t.id === v.timeline)?.label ?? "";
    const res = await submitForm("enquiry", `New enquiry: ${typeLabel}`, {
      name: v.name.trim(),
      email: v.email.trim(),
      organisation: v.organisation.trim(),
      projectType: typeLabel,
      budget: v.budget,
      timeline: timelineLabel,
      details: v.details.trim(),
      estimate: v.estimate,
    });
    setState(res === "sent" ? "sent" : res === "mailto" ? "mailto" : "error");
  }

  if (state === "sent" || state === "mailto") {
    return (
      <SuccessPanel
        title={state === "sent" ? `Thank you, ${v.name.split(" ")[0]}.` : "Your email is ready to send"}
        onReset={() => { setV(EMPTY); setTouched({}); setErrors({}); setShowSummary(false); setState("idle"); }}
      >
        {state === "sent" ? (
          <>
            <p>Your enquiry about <strong className="text-[rgb(var(--text))]">{PROJECT_TYPES.find((t) => t.id === v.projectType)?.label}</strong> has been sent. A copy of what you sent:</p>
            <ul className="mt-3 space-y-1 rounded-xl bg-[rgb(var(--tint))] p-4">
              <li><strong>Email:</strong> {v.email}</li>
              <li><strong>Budget:</strong> {v.budget}</li>
              {v.timeline && <li><strong>Timeline:</strong> {TIMELINES.find((t) => t.id === v.timeline)?.label}</li>}
            </ul>
            <p className="mt-3"><strong className="text-[rgb(var(--text))]">What happens next:</strong> I&apos;ll reply by email to arrange a short call, then send a scoped proposal.</p>
          </>
        ) : (
          <p>Your email app should have opened with your enquiry filled in. Press send there to reach me. If nothing opened, please use one of the other contact options on this page.</p>
        )}
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative space-y-5 p-6 md:p-8" aria-labelledby="enquiry-title">
      <div>
        <h3 id="enquiry-title" className="text-2xl font-medium">Send an enquiry</h3>
        <p className="mt-1 text-sm muted">Fields marked <span className="text-red-700 dark:text-red-400">*</span> are required. It takes about two minutes.</p>
      </div>

      {showSummary && <ErrorSummary errors={errors} labels={LABELS} innerRef={summaryRef} />}

      {v.estimate && (
        <div className="flex items-start justify-between gap-3 rounded-xl bg-[rgb(var(--accent-wash))] p-4 text-sm">
          <p><span className="font-semibold">Estimate attached: </span>{v.estimate}</p>
          <button type="button" onClick={() => setV((x) => ({ ...x, estimate: "" }))} className="flex-none text-xs font-semibold underline">Remove</button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Name" required value={v.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" error={err("name")} />
        <TextField id="email" label="Email" type="email" required value={v.email} onChange={set("email")} onBlur={blur("email")} autoComplete="email" error={err("email")} hint="I'll only use it to reply." />
        <SelectField id="projectType" label="Project type" required value={v.projectType} onChange={set("projectType")} onBlur={blur("projectType")} error={err("projectType")} placeholder="Choose one…" options={PROJECT_TYPES.map((t) => ({ value: t.id, label: t.label }))} />
        <SelectField id="budget" label="Budget" required value={v.budget} onChange={set("budget")} onBlur={blur("budget")} error={err("budget")} placeholder="Choose a range…" options={BUDGETS.map((b) => ({ value: b, label: b }))} hint="A rough range helps me suggest the right scope." />
        <TextField id="organisation" label="Organisation" value={v.organisation} onChange={set("organisation")} autoComplete="organization" />
        <SelectField id="timeline" label="Timeline" value={v.timeline} onChange={set("timeline")} placeholder="Choose…" options={TIMELINES.map((t) => ({ value: t.id, label: t.label }))} />
      </div>

      <TextArea
        id="details"
        label="Project details"
        required
        max={2000}
        value={v.details}
        onChange={set("details")}
        onBlur={blur("details")}
        error={err("details")}
        hint="What is the programme, what do you need to know or decide, and by when?"
        rows={6}
      />

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input
            id="consent"
            type="checkbox"
            checked={v.consent === "on"}
            onChange={(e) => set("consent")(e.target.checked ? "on" : "")}
            aria-invalid={!!err("consent")}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-0.5 h-5 w-5 flex-none rounded border-[rgb(var(--line)/0.3)] accent-[rgb(var(--accent))]"
          />
          <span>I agree that my details can be used to reply to this enquiry. <span className="text-red-700 dark:text-red-400" aria-hidden>*</span></span>
        </label>
        {err("consent") && <p id="consent-error" className="mt-1.5 text-sm text-red-700 dark:text-red-400">{err("consent")}</p>}
      </div>

      <Honeypot value={v.company} onChange={set("company")} />

      <div className="flex flex-wrap items-center gap-4 border-t hairline pt-5">
        <button type="submit" disabled={state === "sending" || !available} className="btn-primary !px-6 !py-3 text-base disabled:cursor-not-allowed disabled:opacity-60">
          {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs muted" role="status" aria-live="polite">
          {state === "error" && <span className="text-red-700 dark:text-red-400">Something went wrong sending your enquiry. Please try again, or use another contact option below.</span>}
          {state === "idle" && !available && "The form will be activated shortly. Please use another contact option for now."}
        </p>
      </div>
    </form>
  );
}
