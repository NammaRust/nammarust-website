import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import MissionVision from "@/components/sections/MissionVision";
import Members from "@/components/sections/Members";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Footer from "@/components/sections/Footer";
import SocialMedia from "@/components/sections/SocialMedia";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <MissionVision />
      <Members />
      <SocialMedia />
      <Contact />
      <Footer />
    </main>
  );
}