import Image from "next/image";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

export default function Profile() {
  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 md:px-10 pt-32 sm:pt-40 md:pt-[180px] pb-16 sm:pb-24 md:pb-[120px]"
    >
      <div className="mx-auto max-w-wide">
        <div className="relative flex flex-col gap-2 sm:gap-4">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col">
              <Reveal direction="mask" delay={0}>
                <h1 className="fluid-hero font-semibold text-black">YUME</h1>
              </Reveal>
              <Reveal direction="mask" delay={120}>
                <h1 className="fluid-hero font-semibold text-black -mt-2 sm:-mt-4">
                  YASKUMI
                </h1>
              </Reveal>
            </div>
            <Reveal direction="fade" delay={260}>
              <div className="relative shrink-0 h-20 w-20 sm:h-32 sm:w-32 md:h-[200px] md:w-[200px] rounded-full overflow-hidden float-slow">
                <Image
                  src="/images/avatar.png"
                  alt="Avatar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 200px"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col gap-4 sm:gap-6 max-w-[984px]">
          <Reveal direction="up" delay={0}>
            <SectionLabel>about</SectionLabel>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <p className="fluid-h2 font-medium text-ink">
              We&apos;re a design studio focused on creating{" "}
              <span className="text-muted-2">
                simple, purposeful, and elegant solutions.
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
