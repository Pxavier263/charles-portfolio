import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface Props {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "default" | "tint" | "ink" | "accent";
}

export function Section({ id, eyebrow, title, intro, children, className = "", tone = "default" }: Props) {
  const toneClass = { default: "band-canvas", tint: "band-tint", ink: "band-ink", accent: "band-accent" }[tone];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 md:py-28 ${toneClass} ${className}`}>
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className={`eyebrow ${tone === "ink" ? "!text-orange-300" : ""}`}>{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl md:text-[2.6rem] leading-[1.1] font-medium">
            {title}
          </h2>
          {intro && <div className={`mt-4 text-base md:text-lg leading-relaxed ${tone === "ink" ? "text-white/75" : "muted"}`}>{intro}</div>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
