import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { bio } from "@/data/profile";
import { sitePhotos } from "@/data/photos";
import { ImageSlot } from "../ui/ImageSlot";
import { Portrait } from "../ui/Portrait";
import { Reveal } from "../ui/Reveal";

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-title" className="band-tint py-20 md:py-28">
      <div className="container grid items-center gap-10 md:grid-cols-[300px_1fr] lg:gap-16">
        <Reveal className="relative">
          <Portrait />
          <div className="absolute -bottom-10 -right-6 hidden w-36 md:block lg:-right-12 lg:w-40">
            <ImageSlot image={sitePhotos.workingPortrait} className="aspect-square shadow-lift ring-4 ring-[rgb(var(--tint))]" sizes="200px" showCaption={false} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">About</p>
          <h2 id="about-teaser-title" className="mt-3 text-3xl font-medium leading-[1.1] md:text-[2.4rem]">A pharmacist who works in data, programmes and policy.</h2>
          <p className="mt-5 max-w-2xl leading-relaxed muted">{bio.lead} {bio.paragraphs[2]}</p>
          <Link href="/about" className="mt-7 inline-flex items-center gap-1.5 font-semibold text-teal-700 dark:text-teal-300">
            More about me <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
