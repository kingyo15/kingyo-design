"use client";

import { useMemo, useState } from "react";
import type { Project, Category } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

type Filter = Category | "All";

type Props = {
  projects: Project[];
  filters: { label: string; value: Filter }[];
  pageSize?: number;
};

export default function WorkGallery({
  projects,
  filters,
  pageSize = 6,
}: Props) {
  const [active, setActive] = useState<Filter>("All");
  const [visible, setVisible] = useState(pageSize);

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);
    return list;
  }, [projects, active]);

  const shown = filtered.slice(0, visible);
  const canShowMore = visible < filtered.length;

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => {
          const isActive = f.value === active;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setActive(f.value);
                setVisible(pageSize);
              }}
              className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm sm:text-base font-medium transition-colors ${
                isActive
                  ? "bg-ink text-white"
                  : "bg-soft-gray text-ink hover:bg-ink hover:text-white"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="text-muted text-base">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {shown.map((p, i) => (
            <Reveal
              key={p.slug}
              direction="up"
              delay={(i % 2) * 80 + Math.floor(i / 2) * 40}
            >
              <ProjectCard project={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      )}

      {canShowMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + pageSize)}
            className="inline-flex items-center gap-2 rounded-full bg-soft-gray px-5 py-2.5 text-base font-medium text-ink hover:bg-ink hover:text-white transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
