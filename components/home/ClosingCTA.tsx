import { ArrowRight, Calculator, CalendarCheck, FileText, Linkedin } from "lucide-react";
import Link from "next/link";
import { availability, pricing } from "@/data/conversion";
import { profile, siteConfig } from "@/data/profile";
import { contactConfig } from "@/data/services";
import { CvButton } from "../ui/CvButton";
import { ExternalOrPlaceholder } from "../ui/ExternalOrPlaceholder";
import { Reveal } from "../ui/Reveal";
import { withBase } from "@/lib/paths";

export function ClosingCTA({ title = "Running an AMR or One Health programme? Let's talk." }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="band-ink relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
      <Reveal className="container relative text-center">
        <p className="eyebrow !text-orange-300">Work with me</p>
        <h2 id="cta-title" className="mx-auto mt-4 max-w-3xl text-4xl font-medium leading-[1.08] md:text-[3.2rem]">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-white/75">
          Tell me about your programme and what you need to know. I&apos;ll come back with how I can help.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/work-with-me" data-cta="closing" className="btn bg-orange-600 !px-6 !py-3 text-base text-white hover:bg-orange-700">
            Work with me <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          {(availability.confirmed || siteConfig.reviewMode || availability.bookingUrl) && (
            <Link href="/work-with-me#book" data-cta="closing-book" className="btn-on-ink !px-6 !py-3">
              <CalendarCheck className="h-4 w-4" aria-hidden /> Book a free call
            </Link>
          )}
          {(pricing.confirmed || siteConfig.reviewMode) && (
            <Link href="/work-with-me#estimate" data-cta="closing-estimate" className="btn-on-ink !px-6 !py-3">
              <Calculator className="h-4 w-4" aria-hidden /> Estimate a project
            </Link>
          )}
          <CvButton className="btn-on-ink !px-6 !py-3" />
          {contactConfig.capabilityUrl && (
            <a href={withBase(contactConfig.capabilityUrl)} download data-cta="capability" className="btn-on-ink !px-6 !py-3">
              <FileText className="h-4 w-4" aria-hidden /> Capability statement
            </a>
          )}
          <ExternalOrPlaceholder href={profile.links.linkedin} label="Connect on LinkedIn" className="btn-on-ink !px-6 !py-3" showPlaceholder={false}>
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </ExternalOrPlaceholder>
        </div>
      </Reveal>
    </section>
  );
}
