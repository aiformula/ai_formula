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
import AIBusinessAutomationCoursePage from '@/pages/courses/ai-business-automation/index';
import AIBusinessAutomationLearning from '@/pages/courses/AIBusinessAutomationLearning';
import AIBusinessAutomationTheme from '@/pages/courses/AIBusinessAutomationTheme';
import AIBusinessAutomationUnit from '@/pages/courses/AIBusinessAutomationUnit';
import AIBusinessAutomationQuiz from '@/pages/courses/AIBusinessAutomationQuiz';

// ChatGPT Course Pages
import ChatGPTCompleteCourseLearning from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseLearning';
import ChatGPTCompleteCourseTheme from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseTheme';
import ChatGPTCompleteCourseUnit from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseUnit';
import ChatGPTCompleteCourseQuiz from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseQuiz';
import ChatGPTCompleteCourseOutline from '@/pages/courses/chatgpt-complete-course/ChatGPTCompleteCourseOutline';

// Tools Page
import Tools from '@/pages/Tools';

// Design System Demo
import DesignSystemDemo from '@/pages/DesignSystemDemo';

// Legal Pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

import './App.css';
import './styles/progress-styles.css'; // 新增：進度追蹤樣式

// ChatGPT單元重定向組件
const ChatGPTUnitRedirect: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  
  // 計算主題ID
  const getThemeId = (unitNumber: number) => {
    if (unitNumber >= 1 && unitNumber <= 5) return 1; // 第一章：解構 ChatGPT
    if (unitNumber >= 6 && unitNumber <= 10) return 2; // 第二章：初探門徑
    return 1; // 默認第一章
  };
  
  const unitNumber = parseInt(unitId || '1');
  
  // 邊界檢查：確保單元ID在有效範圍內（1-10）
  if (unitNumber < 1 || unitNumber > 10 || isNaN(unitNumber)) {
    console.warn(`無效的單元ID: ${unitId}，重定向到第一個單元`);
    return <Navigate to="/courses/chatgpt-complete-course/theme/1/unit/1" replace />;
  }
  
  const themeId = getThemeId(unitNumber);
  
  // 調試日誌
  console.log(`ChatGPT重定向: Unit ${unitId} -> Theme ${themeId}/Unit ${unitId}`);
  
  return <Navigate to={`/courses/chatgpt-complete-course/theme/${themeId}/unit/${unitId}`} replace />;
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
                  <Route path="/courses/ai-business-automation" element={<AIBusinessAutomationCoursePage />} />
                  <Route path="/courses/ai-business-automation/learning" element={<AIBusinessAutomationLearning />} />
                  <Route path="/courses/ai-business-automation/theme/:themeId" element={<AIBusinessAutomationTheme />} />
                  <Route path="/courses/ai-business-automation/theme/:themeId/unit/:unitId" element={<AIBusinessAutomationUnit />} />
                  <Route path="/courses/ai-business-automation/theme/:themeId/quiz" element={<AIBusinessAutomationQuiz />} />
                  
                  {/* ChatGPT Course Routes */}
                  <Route path="/courses/chatgpt-complete-course" element={<Navigate to="/courses/chatgpt-complete-course/outline" replace />} />
                  <Route path="/courses/chatgpt-complete-course/unit/:unitId" element={<ChatGPTUnitRedirect />} />
                  <Route path="/courses/chatgpt-complete-course/learning" element={<ChatGPTCompleteCourseLearning />} />
                  <Route path="/courses/chatgpt-complete-course/outline" element={<ChatGPTCompleteCourseOutline />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId" element={<ChatGPTCompleteCourseTheme />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId/unit/:unitId" element={<ChatGPTCompleteCourseUnit />} />
                  <Route path="/courses/chatgpt-complete-course/theme/:themeId/quiz" element={<ChatGPTCompleteCourseQuiz />} />
                  {/* 無效路由重定向 */}
                  <Route path="/courses/chatgpt-complete-course/*" element={<Navigate to="/courses/chatgpt-complete-course/theme/1/unit/1" replace />} />
                  
                  {/* Design System Demo */}
                  <Route path="/design-system" element={<DesignSystemDemo />} />
                  
                  {/* Tools Page */}
                  <Route path="/tools" element={<Tools />} />
                  
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
