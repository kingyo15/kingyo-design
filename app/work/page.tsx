import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import WorkGallery from "@/components/WorkGallery";
import { CATEGORIES, getProjects } from "@/lib/projects";

export const metadata = {
  title: "Work Gallery — YUYA",
  description: "Selected work across product, web, design systems, and illustration.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <>
      <Header />
      <main>
        <section className="px-6 sm:px-10 md:px-10 pt-32 sm:pt-40 md:pt-[180px] pb-12 sm:pb-16">
          <div className="mx-auto max-w-wide">
            <Reveal direction="mask">
              <h1 className="fluid-hero font-semibold text-black">
                Work Gallery
              </h1>
            </Reveal>
          </div>
        </section>

        <section className="px-6 sm:px-10 md:px-10 pb-20 sm:pb-28">
          <div className="mx-auto max-w-wide">
            <WorkGallery projects={projects} filters={CATEGORIES} pageSize={6} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
