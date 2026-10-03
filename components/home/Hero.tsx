import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { proofStrip, proposition } from "@/data/services";
import { CvButton } from "../ui/CvButton";
import { Reveal } from "../ui/Reveal";
import { HeroVisual } from "../viz/HeroVisual";
import { Portrait } from "../ui/Portrait";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 grain opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-10 hidden h-[620px] w-[620px] rounded-full bg-teal-400/10 blur-3xl dark:block" aria-hidden />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border hairline bg-[rgb(var(--surface)/0.7)] px-3 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            {proposition.availability}
          </p>

          <div className="mt-7 h-20 w-20 sm:hidden">
            <Portrait className="h-20 w-20" rounded="!rounded-full" sizes="80px" />
          </div>
          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold uppercase tracking-eyebrow text-orange-700 dark:text-orange-400">{profile.honorific} {profile.name}</span>
            <span className="inline-flex items-center gap-1 muted"><MapPin className="h-3.5 w-3.5" aria-hidden />{profile.location}</span>
          </p>

          <h1 id="hero-title" className="mt-4 text-[2.35rem] font-medium leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
            I help African <span className="text-orange-600 dark:text-orange-400">AMR &amp; One Health</span> programmes prove and sustain their impact.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed muted">{proposition.sub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/work-with-me" data-cta="hero-primary" className="btn-primary !px-6 !py-3 text-base">
              Discuss a project <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/work" data-cta="hero-work" className="btn-ghost !px-6 !py-3 text-base">See the work</Link>
            <CvButton className="ml-1 inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-orange-500 underline-offset-4" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="hidden sm:block lg:-mr-8 xl:-mr-16">
          <HeroVisual />
        </Reveal>
      </div>

      {/* Proof strip */}
      <div className="container relative mt-16 md:mt-20">
        <ul
          className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-0 md:overflow-visible md:rounded-2xl md:border md:hairline md:bg-[rgb(var(--surface))] md:px-0 md:pb-0"
          aria-label="Proof points"
          tabIndex={0}
        >
          {proofStrip.map((p, i) => (
            <li
              key={p.label}
              className={`min-w-[62%] snap-start rounded-2xl border hairline bg-[rgb(var(--surface))] p-5 sm:min-w-[40%] md:min-w-0 md:rounded-none md:border-0 ${i > 0 ? "md:border-l md:hairline" : ""}`}
            >
              <p className="font-serif text-2xl text-teal-700 dark:text-teal-300 md:text-3xl">{p.value}</p>
              <p className="mt-1 text-sm muted">{p.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
