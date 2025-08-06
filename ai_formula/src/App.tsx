import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ViewCountProvider } from '@/contexts/ViewCountContext';
import { Toaster } from '@/components/ui/toaster';
import { SEOHead } from '@/components/SEO';

// Components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop'; // 新增：滾動到頂部組件

// Pages
import HomePage from '@/pages/general/HomePage';
import About from '@/pages/About';
import AboutCht from '@/pages/AboutCht';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/learning/Dashboard';

// Blog Pages
import BlogListing from '@/pages/blog/BlogListing';
import BlogPost from '@/pages/blog/BlogPost';

// Course Pages
import CourseListing from '@/pages/courses/CourseListing';
import CourseDetail from '@/pages/courses/CourseDetail';

// ChatGPT Course Pages
import ChatGPTCompleteCourseLearning from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseLearning';
import ChatGPTCompleteCourseTheme from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseTheme';
import ChatGPTCompleteCourseUnit from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit';
import ChatGPTCompleteCourseQuiz from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseQuiz';
import ChatGPTCompleteCourseOutline from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseOutline';

// Perplexity Course Pages
import PerplexityCompleteCourseLearning from '@/pages/courses/perplexity-complete-course/PerplexityCompleteCourseLearning';
import PerplexityCompleteCourseTheme from '@/pages/courses/perplexity-complete-course/PerplexityCompleteCourseTheme';
import PerplexityCompleteCourseUnit from '@/pages/courses/perplexity-complete-course/PerplexityCompleteCourseUnit';
import PerplexityCompleteCourseQuiz from '@/pages/courses/perplexity-complete-course/PerplexityCompleteCourseQuiz';
import PerplexityCompleteCourseOutline from '@/pages/courses/perplexity-complete-course/PerplexityCompleteCourseOutline';

// Prompt Engineering Course Pages
import PromptEngineeringCourseLearning from '@/pages/courses/prompt-engineering-course/PromptEngineeringCourseLearning';
import PromptEngineeringCourseUnit from '@/pages/courses/prompt-engineering-course/PromptEngineeringCourseUnit';
import PromptEngineeringCourseQuiz from '@/pages/courses/prompt-engineering-course/PromptEngineeringCourseQuiz';
import PromptEngineeringCourseOutline from '@/pages/courses/prompt-engineering-course/PromptEngineeringCourseOutline';

// Template System Pages
import CourseOutlinePage from '@/pages/courses/CourseOutlinePage';
import CourseLearningPage from '@/pages/courses/CourseLearningPage';
import CourseThemePage from '@/pages/courses/CourseThemePage';
import CourseUnitPage from '@/pages/courses/CourseUnitPage';
import CourseQuizPage from '@/pages/courses/CourseQuizPage';

// Tools Page
import Tools from '@/pages/Tools';

// Support Page
import Support from '@/pages/Support';

// Enterprise Page
import Enterprise from '@/pages/Enterprise';

// FAQ Page
import FAQ from '@/pages/FAQ';

// Design System Demo
import DesignSystemDemo from '@/pages/DesignSystemDemo';

// Legal Pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

import './App.css';
import './styles/progress-styles.css'; // 新增：進度追蹤樣式

// ChatGPT課程路由驗證組件 - 更新為30單元結構
const getThemeId = (unitNumber: number) => {
  if (unitNumber >= 1 && unitNumber <= 5) return 1;   // 第一章：解構 ChatGPT (1-5)
  if (unitNumber >= 6 && unitNumber <= 10) return 2;  // 第二章：初探門徑 (6-10)
  if (unitNumber >= 11 && unitNumber <= 16) return 3; // 第三章：核心功能實戰 (11-16)
  if (unitNumber >= 17 && unitNumber <= 21) return 4; // 第四章：精通之道 (17-21)
  if (unitNumber >= 22 && unitNumber <= 26) return 5; // 第五章：打造專屬 AI (22-26)
  if (unitNumber >= 27 && unitNumber <= 30) return 6; // 第六章：展望未來 (27-30)
  return 1; // 默認第一章
};

// ChatGPT單元重定向組件
const ChatGPTUnitRedirect: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  
  const unitNumber = parseInt(unitId || '1');
  
  // 邊界檢查：確保單元ID在有效範圍內（1-30）
  if (unitNumber < 1 || unitNumber > 30 || isNaN(unitNumber)) {
    console.warn(`無效的單元ID: ${unitId}，重定向到第一個單元`);
    return <Navigate to="/courses/chatgpt-complete-course/theme/1/unit/1" replace />;
  }
  
  const themeId = getThemeId(unitNumber);
  
  // 調試日誌
  console.log(`ChatGPT重定向: Unit ${unitId} -> Theme ${themeId}/Unit ${unitId}`);
  
  return <Navigate to={`/courses/chatgpt-complete-course/theme/${themeId}/unit/${unitId}`} replace />;
};

// ChatGPT主題驗證組件
const ChatGPTThemeValidator: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  const themeNumber = parseInt(themeId || '1');
  
  // 檢查主題ID是否有效（1-6）
  if (themeNumber < 1 || themeNumber > 6 || isNaN(themeNumber)) {
    console.warn(`無效的主題ID: ${themeId}，重定向到第一個主題`);
    return <Navigate to="/courses/chatgpt-complete-course/theme/1" replace />;
  }
  
  // 如果主題ID有效，渲染主題組件
  return <ChatGPTCompleteCourseTheme />;
};

// ChatGPT單元驗證組件
const ChatGPTUnitValidator: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  
  const themeNumber = parseInt(themeId || '1');
  const unitNumber = parseInt(unitId || '1');
  
  // 檢查單元ID是否有效（1-30）
  if (unitNumber < 1 || unitNumber > 30 || isNaN(unitNumber)) {
    console.warn(`無效的單元ID: ${unitId}，重定向到第一個單元`);
    return <Navigate to="/courses/chatgpt-complete-course/theme/1/unit/1" replace />;
  }
  
  // 檢查主題ID是否有效（1-6）
  if (themeNumber < 1 || themeNumber > 6 || isNaN(themeNumber)) {
    const correctThemeId = getThemeId(unitNumber);
    console.warn(`無效的主題ID: ${themeId}，重定向到正確主題 ${correctThemeId}`);
    return <Navigate to={`/courses/chatgpt-complete-course/theme/${correctThemeId}/unit/${unitNumber}`} replace />;
  }
  
  // 檢查主題和單元的匹配
  const correctThemeId = getThemeId(unitNumber);
  if (themeNumber !== correctThemeId) {
    console.warn(`主題單元不匹配: 單元 ${unitNumber} 應該在主題 ${correctThemeId}，不是主題 ${themeNumber}`);
    return <Navigate to={`/courses/chatgpt-complete-course/theme/${correctThemeId}/unit/${unitNumber}`} replace />;
  }
  
  // 所有驗證通過，渲染單元組件
  return <ChatGPTCompleteCourseUnit />;
};

// ChatGPT測驗驗證組件
const ChatGPTQuizValidator: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  
  const themeNumber = parseInt(themeId || '1');
  
  // 檢查主題ID是否有效（1-6）
  if (themeNumber < 1 || themeNumber > 6 || isNaN(themeNumber)) {
    console.warn(`無效的測驗主題ID: ${themeId}，重定向到第一個主題測驗`);
    return <Navigate to="/courses/chatgpt-complete-course/theme/1/quiz" replace />;
  }
  
  // 如果主題ID有效，渲染測驗組件
  return <ChatGPTCompleteCourseQuiz />;
};

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ViewCountProvider>
            <Router>
              {/* 🎯 重要：ScrollToTop 組件必須放在這裡，在 Router 內部但在 Routes 之前 */}
              <ScrollToTop />
              <div className="App">
                <Navigation />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/about-cht" element={<AboutCht />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Blog Routes */}
                  <Route path="/blog" element={<BlogListing />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  
                  {/* Course Routes */}
                  <Route path="/courses" element={<CourseListing />} />
                  
                  {/* ChatGPT Course Routes - 使用驗證組件 */}
                  <Route path="/courses/chatgpt-complete-course" element={<Navigate to="/courses/chatgpt-complete-course/outline" replace />} />
                  <Route path="/courses/chatgpt-complete-course/unit/:unitId" element={<ChatGPTUnitRedirect />} />
                  <Route path="/courses/chatgpt-complete-course/learning" element={<ChatGPTCompleteCourseLearning />} />
                  <Route path="/courses/chatgpt-complete-course/outline" element={<ChatGPTCompleteCourseOutline />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId" element={<ChatGPTThemeValidator />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId/unit/:unitId" element={<ChatGPTUnitValidator />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId/quiz" element={<ChatGPTQuizValidator />} />
                  {/* 無效路由重定向 - 作為最後的保障 */}
                  <Route path="/courses/chatgpt-complete-course/*" element={<Navigate to="/courses/chatgpt-complete-course/theme/1/unit/1" replace />} />
                  
                  {/* Perplexity Course Routes */}
                  <Route path="/courses/perplexity-complete-course" element={<Navigate to="/courses/perplexity-complete-course/outline" replace />} />
                  <Route path="/courses/perplexity-complete-course/learning" element={<PerplexityCompleteCourseLearning />} />
                  <Route path="/courses/perplexity-complete-course/outline" element={<PerplexityCompleteCourseOutline />} />
                  <Route path="/courses/perplexity-complete-course/theme/:themeId" element={<PerplexityCompleteCourseTheme />} />
                  <Route path="/courses/perplexity-complete-course/theme/:themeId/unit/:unitId" element={<PerplexityCompleteCourseUnit />} />
                  <Route path="/courses/perplexity-complete-course/theme/:themeId/quiz" element={<PerplexityCompleteCourseQuiz />} />
                  {/* 無效路由重定向 - 作為最後的保障 */}
                  <Route path="/courses/perplexity-complete-course/*" element={<Navigate to="/courses/perplexity-complete-course/theme/1/unit/1" replace />} />
                  
                  {/* Midjourney Course Routes - 使用模板系統 */}
                  <Route path="/courses/midjourney-course" element={<Navigate to="/courses/midjourney-course/outline" replace />} />
                  <Route path="/courses/midjourney-course/outline" element={<CourseOutlinePage />} />
                  <Route path="/courses/midjourney-course/learning" element={<CourseLearningPage />} />
                  <Route path="/courses/midjourney-course/theme/:themeId" element={<CourseThemePage />} />
                  <Route path="/courses/midjourney-course/theme/:themeId/unit/:unitId" element={<CourseUnitPage />} />
                  <Route path="/courses/midjourney-course/theme/:themeId/quiz" element={<CourseQuizPage />} />
                  {/* 無效路由重定向 - 作為最後的保障 */}
                  <Route path="/courses/midjourney-course/*" element={<Navigate to="/courses/midjourney-course/outline" replace />} />
                  
                  {/* Prompt Engineering Course Routes - 使用模板系統 */}
                  <Route path="/courses/prompt-engineering-course" element={<Navigate to="/courses/prompt-engineering-course/outline" replace />} />
                  <Route path="/courses/prompt-engineering-course/outline" element={<PromptEngineeringCourseOutline />} />
                  <Route path="/courses/prompt-engineering-course/learning" element={<CourseLearningPage />} />
                  <Route path="/courses/prompt-engineering-course/theme/:themeId" element={<CourseThemePage />} />
                  <Route path="/courses/prompt-engineering-course/theme/:themeId/unit/:unitId" element={<CourseUnitPage />} />
                  <Route path="/courses/prompt-engineering-course/theme/:themeId/quiz" element={<CourseQuizPage />} />
                  {/* 無效路由重定向 - 作為最後的保障 */}
                  <Route path="/courses/prompt-engineering-course/*" element={<Navigate to="/courses/prompt-engineering-course/outline" replace />} />
                  
                  {/* Design System Demo */}
                  <Route path="/design-system" element={<DesignSystemDemo />} />
                  
                  {/* Tools Page */}
                  <Route path="/tools" element={<Tools />} />
                  
                  {/* Support Page */}
                  <Route path="/support" element={<Support />} />
                  
                  {/* Enterprise Page */}
                  <Route path="/enterprise" element={<Enterprise />} />
                  
                  {/* FAQ Page */}
                  <Route path="/support/faq" element={<FAQ />} />
                  
                  {/* Legal Pages */}
                  <Route path="/legal/terms-of-service" element={<TermsOfService />} />
                  <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
                  
                  {/* Generic course route - TEMPORARILY DISABLED to debug conflicts */}
                  {/* <Route path="/courses/:courseId" element={<CourseDetail />} /> */}
                  
                  {/* 404 Not Found - Keep as the very last route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </div>
            </Router>
          </ViewCountProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
