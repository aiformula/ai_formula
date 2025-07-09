import React, { Suspense, lazy, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// 懶載入組件 / Lazy Load Components
const Navigation = lazy(() => import('@/components/Navigation'))
const MainHero = lazy(() => import('@/components/MainHero'))
const ServicesSection = lazy(() => import('@/components/ServicesSection'))
const TechnologyShowcase = lazy(() => import('@/components/TechnologyShowcase'))
const AutomationJourney = lazy(() => import('@/components/AutomationJourney'))
const InstructorSection = lazy(() => import('@/components/InstructorSection'))
const LearningMaterials = lazy(() => import('@/components/LearningMaterials'))
const Testimonials = lazy(() => import('@/components/Testimonials'))
const ContactSection = lazy(() => import('@/components/ContactSection'))

// 類型定義 / Type Definitions
interface ComponentErrorProps {
  componentName: string
  error: Error
  resetError: () => void
}

interface LoadingComponentProps {
  message?: string
}

interface BackgroundPatternProps {
  opacity?: number
}

// 組件錯誤回退 / Component Error Fallback
const ComponentError: React.FC<ComponentErrorProps> = React.memo(({ componentName, error, resetError }) => {
  const { language } = useLanguage()
  
  const errorText = {
    en: {
      failed: 'Failed to load',
      retry: 'Retry',
      error: 'Error'
    },
    zh: {
      failed: '載入失敗',
      retry: '重試',
      error: '錯誤'
    }
  }
  
  const t = errorText[language]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-8 px-4"
    >
      <Card className="bg-gray-900 border-red-500/50 max-w-md w-full">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            {t.failed} {componentName}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {error.message || `${t.error}: ${componentName}`}
          </p>
          <Button
            onClick={resetError}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500/10"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.retry}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
})

ComponentError.displayName = 'ComponentError'

// 載入組件 / Loading Component
const LoadingComponent: React.FC<LoadingComponentProps> = React.memo(({ message }) => {
  const { language } = useLanguage()
  
  const loadingText = {
    en: { loading: 'Loading...' },
    zh: { loading: '載入中...' }
  }
  
  const t = loadingText[language]
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <Loader2 className="h-8 w-8 animate-spin text-purple-400 mb-4" />
      <p className="text-gray-400 text-sm">
        {message || t.loading}
      </p>
    </motion.div>
  )
})

LoadingComponent.displayName = 'LoadingComponent'

// 背景圖案組件 / Background Pattern Component
const BackgroundPattern: React.FC<BackgroundPatternProps> = React.memo(({ opacity = 0.03 }) => {
  const patternSvg = React.useMemo(() => {
    return `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='${opacity}'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E`
  }, [opacity])

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url("${patternSvg}")`,
        opacity: opacity,
        zIndex: -1
      }}
    />
  )
})

BackgroundPattern.displayName = 'BackgroundPattern'

// 頁面組件錯誤邊界 / Page Component Error Boundary
const PageErrorBoundary: React.FC<{ children: React.ReactNode; componentName: string }> = ({ children, componentName }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
)

// 節段組件包裝器 / Section Component Wrapper
const SectionWrapper: React.FC<{ 
  children: React.ReactNode
  componentName: string
  loadingMessage?: string
}> = ({ children, componentName, loadingMessage }) => (
  <PageErrorBoundary componentName={componentName}>
    <Suspense fallback={<LoadingComponent message={loadingMessage} />}>
      {children}
    </Suspense>
  </PageErrorBoundary>
)

// 主頁面組件 / Main Index Component
const Index: React.FC = () => {
  const { language } = useLanguage()
  
  // SEO 和可訪問性文字 / SEO and Accessibility Text
  const pageText = {
    en: {
      title: 'AI Formula - Hong Kong AI Automation Solutions Platform',
      description: 'Professional AI technology services, educational courses, and business application guides for Hong Kong enterprises.',
      skipToContent: 'Skip to main content',
      loading: {
        navigation: 'Loading navigation...',
        hero: 'Loading hero section...',
        services: 'Loading services...',
        technology: 'Loading technology showcase...',
        automation: 'Loading automation journey...',
        instructor: 'Loading instructor section...',
        learning: 'Loading learning materials...',
        testimonials: 'Loading testimonials...',
        contact: 'Loading contact section...'
      }
    },
    zh: {
      title: 'AI Formula - 香港AI自動化解決方案平台',
      description: '專為香港企業設計的專業AI技術服務、教學課程和商業應用指南。',
      skipToContent: '跳至主要內容',
      loading: {
        navigation: '載入導航中...',
        hero: '載入主要區域中...',
        services: '載入服務中...',
        technology: '載入技術展示中...',
        automation: '載入自動化流程中...',
        instructor: '載入講師區域中...',
        learning: '載入學習材料中...',
        testimonials: '載入評價中...',
        contact: '載入聯繫區域中...'
      }
    }
  }
  
  const t = pageText[language]
  
  // 設置頁面標題和 meta 資訊 / Set page title and meta information
  useEffect(() => {
    document.title = t.title
    
    // 設置 meta 描述 / Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t.description)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'description'
      newMeta.content = t.description
      document.head.appendChild(newMeta)
    }
    
    // 設置 Open Graph 標籤 / Set Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', t.title)
    } else {
      const newOgTitle = document.createElement('meta')
      newOgTitle.setAttribute('property', 'og:title')
      newOgTitle.content = t.title
      document.head.appendChild(newOgTitle)
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', t.description)
    } else {
      const newOgDescription = document.createElement('meta')
      newOgDescription.setAttribute('property', 'og:description')
      newOgDescription.content = t.description
      document.head.appendChild(newOgDescription)
    }
  }, [t.title, t.description])
  
  // 滾動到主要內容 / Scroll to main content
  const scrollToMain = useCallback(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        onClick={scrollToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-purple-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
      >
        {t.skipToContent}
      </a>
      
      {/* 背景圖案 / Background Pattern */}
      <BackgroundPattern opacity={0.03} />
      
      {/* 頁面標題 (隱藏但對 SEO 有用) / Page Title (Hidden but useful for SEO) */}
      <h1 className="sr-only">{t.title}</h1>
      
      {/* 導航 / Navigation */}
      <SectionWrapper componentName="Navigation" loadingMessage={t.loading.navigation}>
        <Navigation />
      </SectionWrapper>
      
      {/* 主要內容 / Main Content */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* 主要英雄區域 / Main Hero Section */}
        <SectionWrapper componentName="MainHero" loadingMessage={t.loading.hero}>
          <MainHero />
        </SectionWrapper>
        
        {/* 服務區域 / Services Section */}
        <section aria-label={language === 'en' ? 'Our Services' : '我們的服務'}>
          <SectionWrapper componentName="ServicesSection" loadingMessage={t.loading.services}>
            <ServicesSection />
          </SectionWrapper>
        </section>
        
        {/* 技術展示區域 / Technology Showcase Section */}
        <section aria-label={language === 'en' ? 'Technology Showcase' : '技術展示'}>
          <SectionWrapper componentName="TechnologyShowcase" loadingMessage={t.loading.technology}>
            <TechnologyShowcase />
          </SectionWrapper>
        </section>
        
        {/* 自動化流程區域 / Automation Journey Section */}
        <section aria-label={language === 'en' ? 'Automation Journey' : '自動化流程'}>
          <SectionWrapper componentName="AutomationJourney" loadingMessage={t.loading.automation}>
            <AutomationJourney />
          </SectionWrapper>
        </section>
        
        {/* 講師區域 / Instructor Section */}
        <section aria-label={language === 'en' ? 'Our Instructors' : '我們的講師'}>
          <SectionWrapper componentName="InstructorSection" loadingMessage={t.loading.instructor}>
            <InstructorSection />
          </SectionWrapper>
        </section>
        
        {/* 學習材料區域 / Learning Materials Section */}
        <section aria-label={language === 'en' ? 'Learning Materials' : '學習材料'}>
          <SectionWrapper componentName="LearningMaterials" loadingMessage={t.loading.learning}>
            <LearningMaterials />
          </SectionWrapper>
        </section>
        
        {/* 評價區域 / Testimonials Section */}
        <section aria-label={language === 'en' ? 'Client Testimonials' : '客戶評價'}>
          <SectionWrapper componentName="Testimonials" loadingMessage={t.loading.testimonials}>
            <Testimonials />
          </SectionWrapper>
        </section>
        
        {/* 聯繫區域 / Contact Section */}
        <section aria-label={language === 'en' ? 'Contact Us' : '聯繫我們'}>
          <SectionWrapper componentName="ContactSection" loadingMessage={t.loading.contact}>
            <ContactSection />
          </SectionWrapper>
        </section>
      </main>
    </div>
  )
}

// 記憶化主組件 / Memoized Main Component
export default Index;
