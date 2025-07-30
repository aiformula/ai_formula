
import React from 'react'
import MainHero from '@/components/MainHero'
import AudiencePathwaysSection from '@/components/AudiencePathwaysSection'
import FeaturedCoursesSection from '@/components/course/FeaturedCoursesSection'
import InstructorSection from '@/components/course/InstructorSection'
import TechnologyShowcase from '@/components/TechnologyShowcase'
import AutomationJourney from '@/components/AutomationJourney'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'
import DynamicCourseCard from '@/components/ui/dynamic-course-card'

const Index = () => {
  // AI 課程數據源
  const aiCourses = [
    {
      id: 'chatgpt-01',
      title: 'ChatGPT 完整教學實戰',
      rating: '4.9/5',
      level: '適合所有級別',
      duration: '4 hours comprehensive training 小時',
      price: '免費',
      themeColor: '#10a37f' // ChatGPT 綠色
    },
    {
      id: 'midjourney-01',
      title: 'Midjourney AI 繪圖精通',
      rating: '4.8/5',
      level: '適合初學者',
      duration: '6 hours comprehensive training 小時',
      price: '付費',
      themeColor: '#8A2BE2' // Midjourney 紫色
    },
    {
      id: 'claude-01',
      title: 'Claude 3 API 應用開發',
      rating: '4.9/5',
      level: '適合開發者',
      duration: '8 hours comprehensive training 小時',
      price: '免費',
      themeColor: '#FF6B35' // Claude 橙色
    }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <MainHero />
      <AudiencePathwaysSection />
      <FeaturedCoursesSection />
      
      {/* AI 課程推薦區塊 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
            AI 課程推薦
          </h2>
          
          {/* 課程卡片容器 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aiCourses.map((course) => (
              <DynamicCourseCard
                key={course.id}
                courseName={course.title}
                duration={course.duration}
                level={course.level}
                rating={parseFloat(course.rating)}
                price={course.price === '免費' ? 0 : 899}
                isFree={course.price === '免費'}
                themeColor={course.themeColor}
                tags={[
                  { text: course.price === '免費' ? '免費' : '精選', type: course.price === '免費' ? 'new' : 'featured' },
                  { text: '熱門', type: 'hot' }
                ]}
                onStartCourse={() => {
                  console.log(`開始課程: ${course.title}`);
                  // 這裡可以添加實際的導航邏輯
                }}
                className="mx-auto"
              />
            ))}
          </div>
        </div>
      </section>
      
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
