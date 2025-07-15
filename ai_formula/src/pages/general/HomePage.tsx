
import React from 'react'
import MainHero from '@/components/MainHero'
import FeaturedCoursesSection from '@/components/course/FeaturedCoursesSection'
import InstructorSection from '@/components/course/InstructorSection'
import TechnologyShowcase from '@/components/TechnologyShowcase'
import AutomationJourney from '@/components/AutomationJourney'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MainHero />
      <FeaturedCoursesSection />
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
