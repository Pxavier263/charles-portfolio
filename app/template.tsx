"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Subtle page transition between routes (disabled under reduced motion via MotionConfig). */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
