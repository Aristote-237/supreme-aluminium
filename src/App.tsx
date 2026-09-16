import { useEffect, useState } from "react";
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
import { RealisationsPage } from "./pages/RealisationsPage";

type Route = "home" | "realisations";

function routeFromHash(hash: string): Route {
  return hash.startsWith("#/realisations") ? "realisations" : "home";
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute((current) => {
        const next = routeFromHash(window.location.hash);
        if (next !== current && next === "realisations") {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
        return next;
      });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // When returning to the home page, scroll to the requested anchor if any.
  useEffect(() => {
    if (route !== "home") return;
    const id = window.location.hash.replace(/^#\/?/, "");
    if (!id) return;
    const raf = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [route]);

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        {route === "realisations" ? (
          <RealisationsPage />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <ServicesSection />
            <ProjectsGallery />
            <ProcessTimeline />
            <WhyUsSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
      {/* Floating "Installer l'app" button — visible on mobile only (the header is hidden below lg). */}
      <InstallAppButton floating className="lg:hidden" />
    </div>
  );
}

export default App;
