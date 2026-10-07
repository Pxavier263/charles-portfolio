"use client";
import { ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import { EMPTY_PUBLICATIONS_MESSAGE, publicationCategories, publications } from "@/data/publications";
import type { PublicationCategory } from "@/lib/types";
import { VerifyBadge } from "../ui/VerifyBadge";
import { show } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { profile } from "@/data/profile";

export function Research() {
  const [cat, setCat] = useState<PublicationCategory | "All">("All");
  const list = publications.filter((p) => cat === "All" || p.category === cat);
  const count = (c: PublicationCategory) => publications.filter((p) => p.category === c).length;

  return (
    <section id="research" aria-labelledby="research-title" className="pb-20 md:pb-28">
      <div className="container">
        <div className="card p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Research & publications</p>
              <h2 id="research-title" className="mt-2 text-2xl font-medium md:text-3xl">Outputs</h2>
            </div>
            <div className="max-w-sm text-sm muted">
              <p>Only confirmed outputs are listed. Categories fill in as work is published.</p>
              {profile.links.orcid && (
                <a href={profile.links.orcid} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 font-medium text-teal-700 hover:underline dark:text-teal-300">
                  ORCID: {profile.links.orcid.replace("https://orcid.org/", "")}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter outputs by category">
            {(["All", ...publicationCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`chip !py-1.5 ${cat === c ? "is-on" : ""}`}
              >
                {c}
                {c !== "All" && <span className="ml-1.5 opacity-60">{count(c)}</span>}
              </button>
            ))}
          </div>
          <div className="mt-6" aria-live="polite">
            {list.length === 0 ? (
              <p className="rounded-xl border border-dashed hairline p-6 text-center text-sm muted">{EMPTY_PUBLICATIONS_MESSAGE}</p>
            ) : (
              <ul className="divide-y hairline">
                {list.map((p) => (
                  <li key={p.id} className="flex gap-4 py-5">
                    <FileText className="mt-1 h-5 w-5 flex-none text-teal-600 dark:text-teal-300" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider muted">{p.category} · {p.status}</p>
                      <p className="mt-1 font-serif text-lg leading-snug">{p.url ? <a href={withBase(p.url)} className="hover:underline" {...(/^https?:/.test(p.url) && { target: "_blank", rel: "noopener noreferrer" })}>{p.title}</a> : p.title}</p>
                      <p className="mt-1 text-sm muted">{p.venue}, {p.year}</p>
                      {show(p.authors) && <p className="mt-1 text-sm muted">{p.authors}</p>}
                      {p.url && /^https?:/.test(p.url) && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline dark:text-teal-300"
                        >
                          Read the paper{p.doi && <span className="font-normal muted">· doi:{p.doi}</span>}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      )}
                      <VerifyBadge note={p.verify} className="mt-2" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cat === "All" && <p className="mt-4 text-sm muted">{EMPTY_PUBLICATIONS_MESSAGE}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
