"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle fade-up on scroll. Respects prefers-reduced-motion via MotionConfig in Providers.
 * Use `as="li"` inside lists to keep HTML valid.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const props = {
    className,
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
  return as === "li" ? <motion.li {...props}>{children}</motion.li> : <motion.div {...props}>{children}</motion.div>;
}
