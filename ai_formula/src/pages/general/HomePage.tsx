
import React from 'react'
import MainHero from '@/components/MainHero'
import FeaturedCoursesSection from '@/components/FeaturedCoursesSection'
import AudiencePathwaysSection from '@/components/AudiencePathwaysSection'
import TechnologyShowcase from '@/components/TechnologyShowcase'
import ServicesSection from '@/components/ServicesSection'
import AutomationJourney from '@/components/AutomationJourney'
import InstructorSection from '@/components/course/InstructorSection'
import LearningMaterials from '@/components/course/LearningMaterials'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MainHero />
      <FeaturedCoursesSection />
      <LearningMaterials />
      <InstructorSection />
      <TechnologyShowcase />
      <AutomationJourney />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </div>
  )
}

export default Index
