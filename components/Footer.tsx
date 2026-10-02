import Link from "next/link";
import { NAV, profile } from "@/data/profile";
import { ExternalOrPlaceholder } from "./ui/ExternalOrPlaceholder";

export function Footer() {
  return (
    <footer className="border-t hairline py-14">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl">{profile.name}</p>
          <p className="mt-2 text-sm muted">{profile.footerLine}</p>
          <p className="mt-1 text-sm muted">{profile.location}</p>
          <p className="mt-6 font-serif text-lg text-teal-700 dark:text-teal-300">Evidence. Collaboration. Impact.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV.footer.map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-teal-700 hover:underline dark:hover:text-teal-300">{l.label}</Link></li>
            ))}
            <li>
              <ExternalOrPlaceholder href={profile.links.linkedin} label="LinkedIn profile" className="hover:text-teal-700 hover:underline dark:hover:text-teal-300">LinkedIn</ExternalOrPlaceholder>
            </li>
          </ul>
        </nav>
        <p className="text-sm muted md:text-right">
          © {new Date().getFullYear()} {profile.name}.<br />
          Organisations named on this site are listed to describe programme engagement and do not imply endorsement.
        </p>
      </div>
    </footer>
  );
}
