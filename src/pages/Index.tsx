
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import AutomationJourney from "@/components/AutomationJourney";
import LearningMaterials from "@/components/LearningMaterials";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <HeroSection />
      <ServicesSection />
      <TechnologyShowcase />
      <AutomationJourney />
      <LearningMaterials />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default Index;
