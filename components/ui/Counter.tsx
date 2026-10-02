"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts up once when scrolled into view. Final value is always in the DOM for SEO/screen readers. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    setDisplay(0);
    const c = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden>
        {display.toLocaleString("en-GB")}
        {suffix}
      </span>
    </span>
  );
}
