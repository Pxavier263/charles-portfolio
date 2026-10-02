import type { Metadata } from "next";
import Link from "next/link";
import { BookingCalendar } from "@/components/contact/BookingCalendar";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Estimator } from "@/components/contact/Estimator";
import { Reviews } from "@/components/contact/Reviews";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { sitePhotos } from "@/data/photos";
import { availability, pricing } from "@/data/conversion";
import { siteConfig } from "@/data/profile";
import { audiences, contactConfig, faqs, process } from "@/data/services";
import { publishedTestimonials } from "@/data/testimonials";
import { show } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Send an enquiry, estimate your project, or book a free consultation with Ogu Charles Chukwudi — M&E, programme data, sustainability facilitation and youth capacity building for AMR and One Health programmes.",
  alternates: { canonical: "/work-with-me" },
};

export default function WorkWithMe() {
  const visibleFaqs = faqs.filter((f) => show(f.a));
  const showEstimate = pricing.confirmed || siteConfig.reviewMode;
  const showBooking = availability.confirmed || siteConfig.reviewMode || !!availability.bookingUrl;
  const showReviews = publishedTestimonials().length > 0 || siteConfig.reviewMode;

  return (
    <>
      <PageHeader
        eyebrow="Work with me"
        title="Let's talk about your programme."
        intro={
          <>
            Choose whatever suits you: send an enquiry, get a quick estimate, or book a free call.
            {show(contactConfig.responseTime) && <> I usually reply within {contactConfig.responseTime}.</>}
          </>
        }
      >
        <ContactOptions />
      </PageHeader>

      {/* Enquiry */}
      <section id="enquiry" aria-label="Enquiry form" className="band-tint scroll-mt-20 py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal><EnquiryForm /></Reveal>
          <Reveal delay={0.08} className="space-y-10">
            <ImageSlot image={sitePhotos.contact} className="aspect-[4/3]" sizes="(min-width: 1024px) 480px, 100vw" />
            <div>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-eyebrow text-teal-700 dark:text-teal-300">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {process.map((p, i) => (
                  <li key={p.step} className="flex gap-4">
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[rgb(var(--accent))] text-sm font-bold text-white dark:text-ink-950" aria-hidden>{i + 1}</span>
                    <span><span className="block font-semibold">{p.step}</span><span className="block text-sm muted">{p.text}</span></span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-eyebrow text-teal-700 dark:text-teal-300">Who I work with</h2>
              <ul className="mt-4 space-y-3">
                {audiences.map((a) => (
                  <li key={a.id} className="rounded-2xl border hairline bg-[rgb(var(--surface))] p-4">
                    <p className="font-semibold">{a.title}</p>
                    <p className="mt-1 text-sm muted">{a.help}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm"><Link href="/services" className="font-semibold underline decoration-teal-500 underline-offset-4">See services in detail</Link></p>
            </div>
          </Reveal>
        </div>
      </section>

      {showEstimate && (
        <section id="estimate" aria-labelledby="estimate-t" className="band-canvas scroll-mt-20 py-16 md:py-24">
          <div className="container">
            <p className="eyebrow">Project estimator</p>
            <h2 id="estimate-t" className="mt-3 text-3xl font-medium md:text-4xl">What might your project involve?</h2>
            <p className="mt-3 max-w-2xl muted">Choose a service, scope and timeline for an instant, indicative estimate. Then send it with your enquiry in one click.</p>
            <div className="mt-10"><Estimator /></div>
          </div>
        </section>
      )}

      {showBooking && (
        <section id="book" aria-labelledby="book-t" className="band-accent scroll-mt-20 py-16 md:py-24">
          <div className="container">
            <p className="eyebrow">Availability</p>
            <h2 id="book-t" className="mt-3 text-3xl font-medium md:text-4xl">Book a free consultation</h2>
            <p className="mt-3 max-w-2xl muted">Pick a time that suits you. Times are shown in your own time zone.</p>
            <div className="mt-10"><BookingCalendar /></div>
          </div>
        </section>
      )}

      {showReviews && (
        <section id="reviews" aria-labelledby="reviews-t" className="band-canvas scroll-mt-20 py-16 md:py-24">
          <div className="container">
            <p className="eyebrow">Client reviews</p>
            <h2 id="reviews-t" className="mt-3 text-3xl font-medium md:text-4xl">What clients and partners say</h2>
            <div className="mt-10"><Reviews /></div>
          </div>
        </section>
      )}

      <section aria-labelledby="faq-t" className="band-tint py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 id="faq-t" className="text-3xl font-medium">Questions</h2>
          <div className="mt-8 divide-y hairline border-y hairline">
            {visibleFaqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {f.q}
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full border hairline transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-relaxed muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-[rgb(var(--surface))] p-6 text-center shadow-soft md:p-8">
            <p className="font-serif text-2xl">Still deciding? Pick the easiest way to reach me.</p>
            <div className="mt-6 text-left"><ContactOptions compact /></div>
          </div>
        </div>
      </section>
    </>
  );
}
