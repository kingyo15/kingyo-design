import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-ink-2 text-white px-6 sm:px-10 md:px-20 py-20 md:py-[120px]"
    >
      <div className="mx-auto max-w-[1760px] flex flex-col gap-10">
        <div className="flex flex-col gap-8 sm:gap-12">
          <Reveal direction="up">
            <h2 className="fluid-cta font-medium leading-[1.2] text-white max-w-[1200px]">
              Curious about what we can create together?{" "}
              <br className="hidden sm:block" />
              Let&apos;s bring something extraordinary to life!
            </h2>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <div>
              <a
                href="mailto:hello@yuya.studio"
                className="inline-flex items-center gap-2 rounded-full bg-soft-gray px-5 py-2.5 text-base font-medium text-ink hover:bg-white transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal direction="fade" delay={100}>
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
            <p className="text-sm sm:text-base font-medium text-white/90">
              All rights reserved, KingYo ©2026
            </p>
            <div className="flex items-center gap-4 text-sm sm:text-base font-medium">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                Linkedin
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                Behance
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
