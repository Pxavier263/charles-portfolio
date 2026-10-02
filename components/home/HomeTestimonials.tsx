import { siteConfig } from "@/data/profile";
import { publishedTestimonials } from "@/data/testimonials";
import { Reviews } from "../contact/Reviews";

/** Homepage testimonials — renders only when published testimonials exist (or a slot in review mode). */
export function HomeTestimonials() {
  if (publishedTestimonials().length === 0 && !siteConfig.reviewMode) return null;
  return (
    <section aria-labelledby="home-testi-t" className="band-canvas py-16 md:py-20">
      <div className="container">
        <p className="eyebrow">What partners say</p>
        <h2 id="home-testi-t" className="mt-3 text-2xl font-medium md:text-3xl">In their words</h2>
        <div className="mt-8"><Reviews /></div>
      </div>
    </section>
  );
}
