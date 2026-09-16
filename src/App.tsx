import { useTheme } from "./hooks/useTheme";
import { BackgroundOrbs } from "./components/BackgroundOrbs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { InstallAppButton } from "./components/InstallAppButton";
import { Hero } from "./sections/Hero";
import { AboutSection } from "./sections/AboutSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ProjectsGallery } from "./sections/ProjectsGallery";
import { ProcessTimeline } from "./sections/ProcessTimeline";
import { WhyUsSection } from "./sections/WhyUsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ContactSection } from "./sections/ContactSection";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsGallery />
        <ProcessTimeline />
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
      {/* Floating "Installer l'app" button — visible on mobile only (the header is hidden on mobile). */}
      <InstallAppButton floating className="lg:hidden" />
    </div>
  );
}

export default App;
