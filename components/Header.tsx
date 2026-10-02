"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, profile } from "@/data/profile";
import { CvButton } from "./ui/CvButton";
import { ThemeToggle } from "./ui/ThemeToggle";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

export function Header() {
  const path = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const onCtaPage = path === NAV.cta.href;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled || mobileOpen ? "border-b hairline bg-[rgb(var(--bg)/0.88)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#main" className="btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3">
          Skip to content
        </a>
        <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${profile.name} — home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 font-serif text-sm text-white dark:bg-teal-400 dark:text-ink-950">
              {profile.initials}
            </span>
            <span className="hidden font-serif text-[1.05rem] font-medium sm:block">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.primary.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-teal-700 dark:hover:text-teal-300 ${
                      active ? "text-teal-700 dark:text-teal-300" : ""
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href={NAV.cta.href} data-cta="header" className="btn-primary hidden !py-2 sm:inline-flex" aria-current={onCtaPage ? "page" : undefined}>
              {NAV.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border hairline md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-[rgb(var(--bg))] md:hidden">
            <div className="container flex min-h-full flex-col py-8">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...NAV.primary].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(path, item.href) ? "page" : undefined}
                      className={`block py-3 font-serif text-3xl ${isActive(path, item.href) ? "text-teal-700 dark:text-teal-300" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t hairline pt-6">
                <Link href={NAV.cta.href} data-cta="mobile-menu" className="btn-primary !py-3.5 text-base">
                  {NAV.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <CvButton className="btn-ghost !py-3" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky conversion bar on phones (hidden on the Work-with-me page itself) */}
      {!onCtaPage && !mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-[rgb(var(--bg)/0.92)] p-3 backdrop-blur-md sm:hidden">
          <Link href={NAV.cta.href} data-cta="mobile-bar" className="btn-primary w-full !py-3 text-base">
            {NAV.cta.label} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </>
  );
}
