import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found — YUYA" };
  return {
    title: `${project.title} — YUYA`,
    description: project.intro,
  };
}

export default function WorkDetailPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const all = getProjects();
  const others = all.filter((p) => p.slug !== project.slug);
  const more = others.slice(0, 2);

  const heroImage = project.cover;
  const galleryImages = project.images.slice(1);
  const paragraphs = project.body;

  return (
    <>
      <Header />
      <main>
        <section className="px-6 sm:px-10 md:px-10 pt-32 sm:pt-40 md:pt-[180px] pb-12">
          <div className="mx-auto max-w-[1280px] flex flex-col gap-10 sm:gap-12">
            <Reveal direction="up">
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-soft-gray">
                <Image
                  src={heroImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </Reveal>

            <Reveal direction="up" delay={80}>
              <div className="flex flex-col gap-2 sm:gap-3">
                <h1 className="text-[44px] sm:text-[64px] md:text-[80px] font-semibold text-ink leading-[1.05] tracking-[-0.04em]">
                  {project.title}
                </h1>
                <p className="text-base sm:text-lg font-medium text-muted-2">
                  {project.category}
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" delay={120}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-black/10">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-2 font-medium">Client</span>
                  <span className="text-base sm:text-lg font-medium text-ink">
                    {project.client}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-2 font-medium">Scope</span>
                  <span className="text-base sm:text-lg font-medium text-ink">
                    {project.scope}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-2 font-medium">Year</span>
                  <span className="text-base sm:text-lg font-medium text-ink">
                    {project.year}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 sm:px-10 md:px-10 pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1280px] flex flex-col gap-10 sm:gap-14">
            <Reveal direction="up">
              <p className="text-base sm:text-lg md:text-xl text-ink leading-[1.7] max-w-[920px]">
                {project.intro}
              </p>
            </Reveal>

            {galleryImages.map((src, i) => {
              const paragraph = paragraphs[i] ?? paragraphs[paragraphs.length - 1];
              return (
                <div key={src} className="flex flex-col gap-10 sm:gap-14">
                  <Reveal direction="up">
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-soft-gray">
                      <Image
                        src={src}
                        alt={`${project.title} — ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                      />
                    </div>
                  </Reveal>
                  {paragraph && (
                    <Reveal direction="up" delay={80}>
                      <p className="text-base sm:text-lg md:text-xl text-ink leading-[1.7] max-w-[920px]">
                        {paragraph}
                      </p>
                    </Reveal>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {more.length > 0 && (
          <section className="bg-soft-gray px-6 sm:px-10 md:px-10 py-20 sm:py-28">
            <div className="mx-auto max-w-[1280px] flex flex-col gap-10">
              <div className="flex items-center justify-between gap-4">
                <Reveal direction="up">
                  <SectionLabel>more to explore</SectionLabel>
                </Reveal>
                <Reveal direction="right" delay={120}>
                  <Link
                    href="/work"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-ink hover:bg-ink hover:text-white transition-colors"
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
                {more.map((p, i) => (
                  <Reveal key={p.slug} direction="up" delay={i * 80}>
                    <ProjectCard project={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
