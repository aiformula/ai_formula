import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ViewCountProvider } from './contexts/ViewCountContext';
import { Toaster } from './components/ui/toaster';
import ErrorBoundary from './components/ErrorBoundary';

// Page imports
const Index = React.lazy(() => import('./pages/Index'));
const About = React.lazy(() => import('./pages/About'));
const AboutCht = React.lazy(() => import('./pages/AboutCht'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Course = React.lazy(() => import('./pages/Course'));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));
const FreePlanLearning = React.lazy(() => import('./pages/FreePlanLearning'));
const ProPlanLearning = React.lazy(() => import('./pages/ProPlanLearning'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Auth = React.lazy(() => import('./pages/Auth'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// 原本的獨立課程頁面
const PromptEngineeringLearning = React.lazy(() => import('./pages/PromptEngineeringLearning'));
const PromptEngineeringLesson1 = React.lazy(() => import('./pages/PromptEngineeringLesson1'));
const PromptEngineeringLesson2 = React.lazy(() => import('./pages/PromptEngineeringLesson2'));
const CodingBasicsLesson = React.lazy(() => import('./pages/CodingBasicsLesson'));
const ChatGPTMasteryLesson = React.lazy(() => import('./pages/ChatGPTMasteryLesson'));
const PerplexityToolsLesson = React.lazy(() => import('./pages/PerplexityToolsLesson'));

// 統一課程系統
const PromptEngineeringCourse = React.lazy(() => import('./pages/PromptEngineeringCourse'));

// Outline pages (now serving as Overview pages)
const PromptEngineeringOutline = React.lazy(() => import('./pages/PromptEngineeringOutline'));
const CodingBasicsOutline = React.lazy(() => import('./pages/CodingBasicsOutline'));
const ChatGPTMasteryOutline = React.lazy(() => import('./pages/ChatGPTMasteryOutline'));
const PerplexityToolsOutline = React.lazy(() => import('./pages/PerplexityToolsOutline'));

// 額外組件
const ProgressTracker = React.lazy(() => import('./components/course/ProgressTracker'));
const LearningNotes = React.lazy(() => import('./components/course/LearningNotes'));
const LearningRecommendations = React.lazy(() => import('./components/course/LearningRecommendations'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ViewCountProvider>
            <Router>
              <div className="App">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* 主要頁面 */}
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about-cht" element={<AboutCht />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/course/:courseId" element={<CourseDetail />} />
                    <Route path="/free-plan-learning" element={<FreePlanLearning />} />
                    <Route path="/pro-plan-learning" element={<ProPlanLearning />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* Course Overview pages (formerly Outline pages) */}
                    <Route path="/prompt-engineering/overview" element={<PromptEngineeringOutline />} />
                    <Route path="/coding-basics/overview" element={<CodingBasicsOutline />} />
                    <Route path="/chatgpt-mastery/overview" element={<ChatGPTMasteryOutline />} />
                    <Route path="/perplexity-tools/overview" element={<PerplexityToolsOutline />} />
                    
                    {/* 原本的獨立課程系統 */}
                    <Route path="/prompt-engineering/learning" element={<PromptEngineeringLearning />} />
                    <Route path="/prompt-engineering/lesson/1" element={<PromptEngineeringLesson1 />} />
                    <Route path="/prompt-engineering/lesson/2" element={<PromptEngineeringLesson2 />} />
                    <Route path="/coding-basics/lesson/1" element={<CodingBasicsLesson />} />
                    <Route path="/chatgpt-mastery/lesson/1" element={<ChatGPTMasteryLesson />} />
                    <Route path="/perplexity-tools/lesson/1" element={<PerplexityToolsLesson />} />
                    
                    {/* 統一課程系統 */}
                    <Route path="/prompt-engineering/course" element={<PromptEngineeringCourse />} />
                    
                    {/* 學習工具頁面 */}
                    <Route path="/learning/progress" element={<ProgressTracker />} />
                    <Route path="/learning/notes" element={<LearningNotes />} />
                    <Route path="/learning/recommendations" element={<LearningRecommendations />} />
                    
                    {/* 404 頁面 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </Router>
          </ViewCountProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
