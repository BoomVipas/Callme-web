import { LanguageProvider } from "@/contexts/LanguageContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import DemoCTA from "@/components/DemoCTA";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";

export default function Home() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <Pricing />
          <Testimonials />
          <FAQ />
          <DemoCTA />
        </main>
        <Footer />
        <DemoModal />
      </ModalProvider>
    </LanguageProvider>
  );
}
