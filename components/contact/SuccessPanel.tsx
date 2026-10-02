"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/** Success state: announced to screen readers and focused so keyboard users land on it. */
export function SuccessPanel({ title, children, onReset, resetLabel = "Send another" }: { title: string; children: ReactNode; onReset?: () => void; resetLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card p-8 text-center focus:outline-none md:p-10"
    >
      <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300">
        <CheckCircle2 className="h-8 w-8" aria-hidden />
      </motion.span>
      <h3 className="mt-5 text-2xl font-medium">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-left text-sm leading-relaxed muted">{children}</div>
      {onReset && <button type="button" onClick={onReset} className="btn-ghost mt-6">{resetLabel}</button>}
    </motion.div>
  );
}
