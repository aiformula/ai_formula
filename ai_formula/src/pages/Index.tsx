
import React from 'react'
import Navigation from '@/components/Navigation'
import MainHero from '@/components/MainHero'
import FeaturedCoursesSection from '@/components/FeaturedCoursesSection'
import AudiencePathwaysSection from '@/components/AudiencePathwaysSection'
import TechnologyShowcase from '@/components/TechnologyShowcase'
import ServicesSection from '@/components/ServicesSection'
import AutomationJourney from '@/components/AutomationJourney'
import InstructorSection from '@/components/InstructorSection'
import LearningMaterials from '@/components/LearningMaterials'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      <MainHero />
      <FeaturedCoursesSection />
      <LearningMaterials />
      <InstructorSection />
      <TechnologyShowcase />
      <AutomationJourney />
      <BlogSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Index
