import { philosophy } from "@/data/profile";
import { process } from "@/data/services";
import { sitePhotos } from "@/data/photos";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";

export function HowIWork() {
  return (
    <section id="how" aria-labelledby="how-title" className="band-accent py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <h2 id="how-title" className="mt-3 text-3xl font-medium leading-[1.1] md:text-[2.6rem]">Simple, transparent, built around your decision.</h2>
            <blockquote className="mt-8 space-y-1 border-l-2 border-[rgb(var(--accent))] pl-5">
              {philosophy.lines.map((l, i) => (
                <p key={l} className={`font-serif text-xl leading-snug ${i === 2 ? "text-teal-700 dark:text-teal-300" : ""}`}>{l}</p>
              ))}
            </blockquote>
            <ImageSlot image={sitePhotos.howIWork} className="mt-8 aspect-[16/10]" sizes="(min-width: 1024px) 480px, 100vw" />
          </Reveal>
          <ol className="grid gap-4 sm:grid-cols-2">
            {process.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.06} className="rounded-2xl bg-[rgb(var(--surface))] p-6 shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[rgb(var(--accent))] text-sm font-bold text-white dark:text-ink-950" aria-hidden>{i + 1}</span>
                <h3 className="mt-4 font-sans text-lg font-semibold">{s.step}</h3>
                <p className="mt-1 text-sm leading-relaxed muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
