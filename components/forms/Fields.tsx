"use client";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

export const inputCls =
  "mt-1.5 w-full rounded-xl border bg-[rgb(var(--surface))] px-4 py-3 text-[rgb(var(--text))] placeholder:text-[rgb(var(--muted)/0.75)] transition-colors focus:outline-none focus:ring-2";

const stateCls = (err?: string) =>
  err ? "border-red-600 focus:border-red-600 focus:ring-red-600/25 dark:border-red-400" : "hairline focus:border-teal-700 focus:ring-teal-500/30";

interface Base {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
}

function Wrap({ id, label, required, hint, error, className, children, counter }: Base & { children: ReactNode; counter?: ReactNode }) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold">
          {label} {required ? <span className="text-red-700 dark:text-red-400" aria-hidden>*</span> : <span className="font-normal muted">(optional)</span>}
        </label>
        {counter}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-0.5 text-xs muted">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="h-4 w-4 flex-none" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

export function TextField(
  p: Base & { value: string; onChange: (v: string) => void; onBlur?: () => void; type?: string; autoComplete?: string; placeholder?: string },
) {
  return (
    <Wrap {...p}>
      <input
        id={p.id}
        name={p.id}
        type={p.type ?? "text"}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        autoComplete={p.autoComplete}
        placeholder={p.placeholder}
        aria-required={p.required}
        aria-invalid={!!p.error}
        aria-describedby={describedBy(p.id, p.hint, p.error)}
        className={`${inputCls} ${stateCls(p.error)}`}
      />
    </Wrap>
  );
}

export function SelectField(p: Base & { value: string; onChange: (v: string) => void; onBlur?: () => void; options: { value: string; label: string }[]; placeholder?: string }) {
  return (
    <Wrap {...p}>
      <select
        id={p.id}
        name={p.id}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        aria-required={p.required}
        aria-invalid={!!p.error}
        aria-describedby={describedBy(p.id, p.hint, p.error)}
        className={`${inputCls} ${stateCls(p.error)}`}
      >
        {p.placeholder && <option value="">{p.placeholder}</option>}
        {p.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Wrap>
  );
}

export function TextArea(p: Base & { value: string; onChange: (v: string) => void; onBlur?: () => void; rows?: number; max?: number; placeholder?: string }) {
  const over = p.max ? p.value.length > p.max : false;
  return (
    <Wrap
      {...p}
      counter={p.max ? <span className={`text-xs tabular-nums ${over ? "text-red-700 dark:text-red-400" : "muted"}`} aria-live="polite">{p.value.length}/{p.max}</span> : undefined}
    >
      <textarea
        id={p.id}
        name={p.id}
        rows={p.rows ?? 5}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        placeholder={p.placeholder}
        aria-required={p.required}
        aria-invalid={!!p.error}
        aria-describedby={describedBy(p.id, p.hint, p.error)}
        className={`${inputCls} ${stateCls(p.error)} resize-y`}
      />
    </Wrap>
  );
}

/** Error summary at the top of a form (GOV.UK pattern): focusable, links to each field. */
export function ErrorSummary({ errors, labels, innerRef }: { errors: Record<string, string>; labels: Record<string, string>; innerRef: React.RefObject<HTMLDivElement> }) {
  const keys = Object.keys(errors);
  if (!keys.length) return null;
  return (
    <div ref={innerRef} tabIndex={-1} role="alert" className="rounded-xl border-2 border-red-600 bg-red-50 p-4 text-red-900 focus:outline-none dark:border-red-400 dark:bg-red-950/40 dark:text-red-200">
      <p className="font-semibold">Please fix {keys.length === 1 ? "this" : `these ${keys.length} things`}:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {keys.map((k) => (
          <li key={k}>
            <a href={`#${k}`} className="underline underline-offset-2" onClick={(e) => { e.preventDefault(); document.getElementById(k)?.focus(); }}>
              {labels[k] ?? k}: {errors[k]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
      <label>Company website<input name="company" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} /></label>
    </div>
  );
}
