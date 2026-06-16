import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Discover",
    body:
      "We begin by listening, gaining a deep understanding of your goals, audience, and challenges through research and conversation.",
  },
  {
    title: "Define",
    body:
      "We distill insights into a clear direction. Strategy, structure, and creative foundations are established to guide the work forward.",
  },
  {
    title: "Design",
    body:
      "Ideas take shape through thoughtful design. We explore, refine, and iterate with intention, always rooted in purpose and simplicity.",
  },
  {
    title: "Deliver",
    body:
      "We finalize and hand off with care. Every element is prepared for implementation with precision, clarity, and craft.",
  },
];

export default function Process() {
  return (
    <section id="process" className="px-6 sm:px-10 md:px-10 py-16 sm:py-20 md:py-[120px]">
      <div className="mx-auto max-w-wide flex flex-col gap-6 sm:gap-8">
        <Reveal direction="up">
          <SectionLabel>Process</SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div className="flex flex-col gap-6 sm:gap-8 self-start">
            <Reveal direction="left" delay={80}>
              <h2 className="fluid-h2 font-medium text-ink">
                Our process is simple, <br className="hidden sm:block" />
                purposeful, and adaptable.
              </h2>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <p className="text-base text-muted-2 max-w-[480px] tracking-[-0.02em]">
                We believe great design is a result of clarity, collaboration, and craft.
              </p>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <div>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-soft-gray px-5 py-2.5 text-base font-medium text-ink hover:bg-ink hover:text-white transition-colors"
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
                </a>
              </div>
            </Reveal>
          </div>

          <div className="bg-soft-gray rounded-3xl p-2.5 flex flex-col gap-2.5">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} direction="right" delay={i * 100}>
                <div className="bg-white rounded-2xl px-6 sm:px-7 py-7 sm:py-8 flex flex-col gap-3 sm:gap-4 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-[-0.04em]">
                      {s.title}
                    </h3>
                    <span className="text-base font-medium text-border-gray">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-base font-medium text-muted leading-[1.4] tracking-[-0.02em]">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
