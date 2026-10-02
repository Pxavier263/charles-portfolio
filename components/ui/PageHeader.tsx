import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Consistent top-of-page header for inner pages. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="band-canvas relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="pointer-events-none absolute inset-0 grain opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <Reveal className="container relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed muted">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </section>
  );
}
