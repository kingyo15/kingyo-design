"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

type Service = {
  title: string;
  description: string;
  points: string[];
};

const SERVICES: Service[] = [
  {
    title: "Brand Identity",
    description:
      "We craft cohesive brand identities that tell a story, with logos, visual systems, and language that resonate with your audience.",
    points: ["Logo Design", "Visual Identity", "Brand Strategy", "Typography", "Guidelines"],
  },
  {
    title: "Digital Design",
    description:
      "We design user-centered digital experiences that are intuitive, engaging, and visually refined, built for clarity, function, and flow.",
    points: ["Web Design", "App & Interface Design", "UX/UI Design", "Design Systems", "Responsive Design"],
  },
  {
    title: "Art Direction",
    description:
      "We shape the visual narrative of your brand — from photography to motion — making sure every detail aligns with the story you want to tell.",
    points: ["Photography", "Motion", "Editorial", "Campaign", "Creative Direction"],
  },
  {
    title: "Strategy & Consulting",
    description:
      "We partner with you to make smart, strategic decisions — uncovering what matters most and turning insights into actionable plans.",
    points: ["Brand Strategy", "Workshops", "Research", "Positioning", "Roadmaps"],
  },
];

export default function Services() {
  const [openIdx, setOpenIdx] = useState<number>(2); // Art Direction open by default to match design

  return (
    <section id="services" className="px-6 sm:px-10 md:px-10 py-16 sm:py-20 md:py-[120px]">
      <div className="mx-auto max-w-wide">
        <div className="bg-soft-gray rounded-3xl px-6 sm:px-10 md:px-20 py-12 sm:py-20 md:py-[120px] flex flex-col gap-8">
          <Reveal direction="up">
            <SectionLabel>Services</SectionLabel>
          </Reveal>

          <div className="flex flex-col gap-4 sm:gap-6">
            {SERVICES.map((service, idx) => {
              const open = openIdx === idx;
              return (
                <Reveal
                  key={service.title}
                  direction="up"
                  delay={idx * 100}
                  className="border-b border-black/5 last:border-b-0"
                >
                  <button
                    onClick={() => setOpenIdx(open ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                    aria-expanded={open}
                  >
                    <span className="fluid-service font-semibold text-black tracking-[-0.05em] transition-transform group-hover:translate-x-1">
                      {service.title}
                    </span>
                    <span
                      className={`shrink-0 inline-flex h-10 w-10 items-center justify-center transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                        <path
                          d="M18.33 21.67H10c-.47 0-.87-.16-1.19-.48-.32-.32-.48-.71-.48-1.19s.16-.87.48-1.19c.32-.32.71-.48 1.19-.48h8.33V10c0-.47.16-.87.48-1.19.32-.32.71-.48 1.19-.48s.87.16 1.19.48c.32.32.48.71.48 1.19v8.33H30c.47 0 .87.16 1.19.48.32.32.48.71.48 1.19s-.16.87-.48 1.19c-.32.32-.71.48-1.19.48h-8.33V30c0 .47-.16.87-.48 1.19-.32.32-.71.48-1.19.48s-.87-.16-1.19-.48c-.32-.32-.48-.71-.48-1.19v-8.33z"
                          fill="#1F1F1F"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 pb-6 pr-2 md:pr-10">
                        <p className="text-base sm:text-lg font-medium text-black leading-[1.4] max-w-[800px]">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:max-w-[400px] md:justify-end">
                          {service.points.map((p) => (
                            <span
                              key={p}
                              className="bg-white/80 rounded-full px-3 py-1.5 text-sm font-normal text-ink tracking-[-0.03em]"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
