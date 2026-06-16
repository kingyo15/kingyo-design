import Link from "next/link";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { getProjects } from "@/lib/projects";

export default function Work() {
  const featured = getProjects().slice(0, 8);

  return (
    <section id="work" className="px-6 sm:px-10 md:px-10 py-16 sm:py-20">
      <div className="mx-auto max-w-wide flex flex-col gap-8 sm:gap-10">
        <div className="flex items-center justify-between gap-4">
          <Reveal direction="up">
            <SectionLabel>work</SectionLabel>
          </Reveal>
          <Reveal direction="right" delay={120}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-soft-gray px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-ink hover:bg-ink hover:text-white transition-colors"
            >
              <span>View all projects</span>
              <span
                className="inline-flex h-6 w-6 items-center justify-center transition-transform group-hover:rotate-90"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              direction="up"
              delay={(i % 2) * 80 + Math.floor(i / 2) * 40}
            >
              <ProjectCard project={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
