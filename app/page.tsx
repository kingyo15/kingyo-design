import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Profile />
        <Work />
        <Process />
        <Services />
      </main>
      <Footer />
    </>
  );
}
