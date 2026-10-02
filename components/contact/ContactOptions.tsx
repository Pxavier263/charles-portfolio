import { Calculator, CalendarCheck, Download, Linkedin, Mail, MessageCircle, Send } from "lucide-react";
import type { ComponentType } from "react";
import { availability, channels, pricing } from "@/data/conversion";
import { profile, siteConfig } from "@/data/profile";
import { withBase } from "@/lib/paths";

type Opt = { id: string; icon: ComponentType<{ className?: string }>; title: string; sub: string; href: string | null; external?: boolean; download?: boolean };

/**
 * Every way to get in touch, in one place. Options without a configured link are
 * hidden on the live site (and shown as greyed placeholders in review mode).
 */
export function ContactOptions({ compact = false }: { compact?: boolean }) {
  const showEstimate = pricing.confirmed || siteConfig.reviewMode;
  const showBooking = availability.confirmed || siteConfig.reviewMode || !!availability.bookingUrl;
  const opts: Opt[] = [
    { id: "enquiry", icon: Send, title: "Send an enquiry", sub: "The fastest way to start", href: "#enquiry" },
    ...(showBooking ? [{ id: "book", icon: CalendarCheck, title: "Book a call", sub: `Free ${availability.slotMinutes}-minute consultation`, href: "#book" }] : []),
    ...(showEstimate ? [{ id: "estimate", icon: Calculator, title: "Get an estimate", sub: "Indicative effort and cost", href: "#estimate" }] : []),
    { id: "email", icon: Mail, title: "Email", sub: profile.email ?? "Email address to be added", href: profile.email ? `mailto:${profile.email}` : null },
    { id: "linkedin", icon: Linkedin, title: "LinkedIn", sub: "Connect or message", href: profile.links.linkedin, external: true },
    { id: "whatsapp", icon: MessageCircle, title: "WhatsApp", sub: "Quick questions", href: channels.whatsapp ? `https://wa.me/${channels.whatsapp}` : null, external: true },
    { id: "cv", icon: Download, title: "Download CV", sub: "For roles and bids", href: profile.cvUrl, download: true },
  ];
  const shown = opts.filter((o) => o.href || siteConfig.reviewMode);

  return (
    <ul className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`} aria-label="Ways to get in touch">
      {shown.map((o) => {
        const inner = (
          <>
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-[rgb(var(--accent))] group-hover:text-white dark:bg-teal-400/10 dark:text-teal-300 dark:group-hover:text-ink-950">
              <o.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{o.title}</span>
              {!compact && <span className="block truncate text-sm muted">{o.sub}</span>}
            </span>
          </>
        );
        const cls = `group flex items-center gap-3 rounded-2xl border hairline bg-[rgb(var(--surface))] p-4 transition-all ${compact ? "flex-col text-center sm:flex-row sm:text-left" : ""}`;
        return (
          <li key={o.id}>
            {o.href ? (
              <a
                href={withBase(o.href)}
                data-cta={`contact-${o.id}`}
                className={`${cls} hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-soft motion-reduce:hover:translate-y-0`}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(o.download ? { download: true } : {})}
              >
                {inner}
              </a>
            ) : (
              <span className={`${cls} cursor-not-allowed opacity-60`} title="To be added" aria-label={`${o.title} (to be added)`}>{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
