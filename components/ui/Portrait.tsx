import { siteConfig, profile } from "@/data/profile";
import { ImageSlot } from "./ImageSlot";

/**
 * Charles' headshot. Uses profile.headshot when set; otherwise shows a placeholder
 * (with the file path in review mode) or elegant initials on the live site.
 */
export function Portrait({ className = "aspect-[4/5]", sizes = "320px", rounded = "rounded-2xl" }: { className?: string; sizes?: string; rounded?: string }) {
  if (profile.headshot) {
    return <ImageSlot image={{ src: profile.headshot, alt: `Portrait of ${profile.name}`, caption: profile.name }} className={`${className} ${rounded}`} sizes={sizes} showCaption={false} />;
  }
  if (siteConfig.reviewMode && rounded.includes("full")) {
    return (
      <div className={`grid place-items-center border-2 border-dashed border-[rgb(var(--accent)/0.5)] bg-[rgb(var(--tint))] text-center text-[0.55rem] font-semibold leading-tight ${className} ${rounded}`} role="img" aria-label="Headshot placeholder">
        Headshot
      </div>
    );
  }
  if (siteConfig.reviewMode) {
    return (
      <ImageSlot
        image={{ alt: `Portrait of ${profile.name}`, caption: "Your professional headshot (portrait, ≈1000×1250 px)", suggested: "/images/headshot.jpg" }}
        className={`${className} ${rounded}`}
      />
    );
  }
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-teal-700 text-white [container-type:inline-size] dark:bg-teal-800 ${className} ${rounded}`} role="img" aria-label={profile.name}>
      <span className="font-serif text-[min(3.75rem,36cqw)] leading-none text-white">{profile.initials}</span>
    </div>
  );
}
