import { profile, siteConfig } from "@/data/profile";
import { track } from "@/lib/track";

export type Values = Record<string, string>;
export type Rule = (v: string, all: Values) => string | null;

export const rules = {
  required: (msg = "This field is required.") : Rule => (v) => (v?.trim() ? null : msg),
  email: (): Rule => (v) => (!v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Enter a valid email address, like name@organisation.org."),
  min: (n: number, label = "This"): Rule => (v) => (!v || v.trim().length >= n ? null : `${label} needs at least ${n} characters.`),
  max: (n: number): Rule => (v) => (!v || v.length <= n ? null : `Please keep this under ${n} characters.`),
  checked: (msg: string): Rule => (v) => (v === "on" || v === "true" ? null : msg),
};

export function validate(values: Values, schema: Record<string, Rule[]>) {
  const errors: Record<string, string> = {};
  for (const [k, rs] of Object.entries(schema)) {
    for (const r of rs) {
      const e = r(values[k] ?? "", values);
      if (e) {
        errors[k] = e;
        break;
      }
    }
  }
  return errors;
}

export type SubmitResult = "sent" | "mailto" | "error" | "unavailable";

/** Can this site deliver form submissions yet? */
export const canSubmit = () => Boolean(siteConfig.formEndpoint || profile.email);

/**
 * Sends a form. With NEXT_PUBLIC_FORM_ENDPOINT set (e.g. Formspree), POSTs JSON.
 * Otherwise, with profile.email set, opens the visitor's mail app with the message prefilled.
 */
export async function submitForm(formType: string, subject: string, values: Values): Promise<SubmitResult> {
  track(`${formType}_submit`, { type: values.projectType ?? values.topic ?? "" });
  if (siteConfig.formEndpoint) {
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, formType, ...values }),
      });
      return res.ok ? "sent" : "error";
    } catch {
      return "error";
    }
  }
  if (profile.email) {
    const body = Object.entries(values)
      .filter(([k, v]) => v && !["company", "consent"].includes(k))
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return "mailto";
  }
  return "unavailable";
}
