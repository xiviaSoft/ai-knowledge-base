import LandingNavbar from "./components/landing/LandingNavbar";
import HeroSection from "./components/landing/HeroSection";
import HowItWorksSection from "./components/landing/HowItWorksSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import CollaborationSection from "./components/landing/CollaborationSection";
import CTASection from "./components/landing/CTASection";
import LandingFooter from "./components/landing/LandingFooter";

export default function HomePage() {
    return (
        <>
            <LandingNavbar />
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <CollaborationSection />
            <CTASection />
            <LandingFooter />
        </>
    );
}