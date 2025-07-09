
import React from 'react'
import Navigation from '@/components/Navigation'
import MainHero from '@/components/MainHero'
import TechnologyShowcase from '@/components/TechnologyShowcase'
import ServicesSection from '@/components/ServicesSection'
import AutomationJourney from '@/components/AutomationJourney'
import InstructorSection from '@/components/InstructorSection'
import LearningMaterials from '@/components/LearningMaterials'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <MainHero />
      <TechnologyShowcase />
      <ServicesSection />
      <AutomationJourney />
      <InstructorSection />
      <LearningMaterials />
      <Testimonials />
      <ContactSection />
    </div>
  )
}

export default Index
