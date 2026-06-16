import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  priority?: boolean;
};

export default function ProjectCard({ project, priority = false }: Props) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-[24px] sm:rounded-[32px] bg-soft-gray pb-6 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[752/550] w-full overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <div className="flex flex-col gap-1 px-4 pt-3 sm:pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-ink">
            {project.title}
          </h3>
          <span className="text-sm sm:text-base font-medium text-ink min-w-[40px] text-right">
            {project.year}
          </span>
        </div>
        <p className="text-sm font-medium text-muted">{project.brief}</p>
      </div>
    </Link>
  );
}
