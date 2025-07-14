import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ViewCountProvider } from '@/contexts/ViewCountContext';

// Components
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

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
import Course from '@/pages/courses/Course';
import CourseDetail from '@/pages/courses/CourseDetail';
import FreePlanLearning from '@/pages/courses/FreePlanLearning';
import ProPlanLearning from '@/pages/courses/ProPlanLearning';
import ChatGPTMasteryOutline from '@/pages/courses/ChatGPTMasteryOutline';
import PerplexityToolsOutline from '@/pages/courses/PerplexityToolsOutline';
import PromptEngineeringOutline from '@/pages/courses/PromptEngineeringOutline';
import CodingBasicsOutline from '@/pages/courses/CodingBasicsOutline';
import CourseRegistration from '@/pages/courses/CourseRegistration';

// Lesson Pages
import PromptEngineeringLesson1 from '@/pages/courses/PromptEngineeringLesson1';
import PromptEngineeringLesson2 from '@/pages/courses/PromptEngineeringLesson2';
import ChatGPTMasteryLesson from '@/pages/courses/ChatGPTMasteryLesson';
import PerplexityToolsLesson from '@/pages/courses/PerplexityToolsLesson';
import PromptEngineeringCourse from '@/pages/courses/PromptEngineeringCourse';
import AILearningOSPage from '@/components/learning/AILearningOSPage';
import CourseDashboardPage from '@/components/learning/CourseDashboardPage';
import LessonViewer from '@/components/learning/LessonViewer';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <ViewCountProvider>
            <Router>
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
                  <Route path="/courses" element={<Course />} />
                  <Route path="/courses/:courseId" element={<CourseDetail />} />
                  <Route path="/courses/free-plan" element={<FreePlanLearning />} />
                  <Route path="/courses/pro-plan" element={<ProPlanLearning />} />
                  
                  {/* Course Outlines */}
                  <Route path="/courses/chatgpt-mastery-outline" element={<ChatGPTMasteryOutline />} />
                  <Route path="/courses/perplexity-tools-outline" element={<PerplexityToolsOutline />} />
                  <Route path="/courses/prompt-engineering-outline" element={<PromptEngineeringOutline />} />
                  <Route path="/courses/coding-basics-outline" element={<CodingBasicsOutline />} />
                  <Route path="/courses/registration" element={<CourseRegistration />} />
                  
                  {/* Course Lessons */}
                  <Route path="/courses/prompt-engineering-lesson-1" element={<PromptEngineeringLesson1 />} />
                  <Route path="/courses/prompt-engineering-lesson-2" element={<PromptEngineeringLesson2 />} />
                  <Route path="/courses/chatgpt-mastery-lesson" element={<ChatGPTMasteryLesson />} />
                  <Route path="/courses/perplexity-tools-lesson" element={<PerplexityToolsLesson />} />
                  <Route path="/courses/prompt-engineering-course" element={<PromptEngineeringCourse />} />
                  <Route path="/courses/prompt-engineering-learning" element={
                    <AILearningOSPage 
                      courseId="prompt-engineering"
                      modules={[
                        {
                          id: 'module-1',
                          title: 'Foundations of Prompt Engineering',
                          titleZh: '?ç¤ºå·¥ç??ºç?',
                          duration: '25:00',
                          videoUrl: '/api/placeholder/video/lesson1.mp4',
                          transcript: 'Welcome to the foundations of prompt engineering...',
                          completed: false,
                          playgroundType: 'prompt-engineering',
                          expectedOutput: 'A well-structured prompt that follows best practices',
                          notes: [],
                          resources: [
                            {
                              id: 'res-1',
                              name: 'Prompt Engineering Cheat Sheet',
                              type: 'pdf',
                              url: '/resources/prompt-cheat-sheet.pdf',
                              size: '2.5MB'
                            },
                            {
                              id: 'res-2',
                              name: 'Sample Prompts',
                              type: 'code',
                              url: '/resources/sample-prompts.txt',
                              size: '856KB'
                            }
                          ]
                        },
                        {
                          id: 'module-2',
                          title: 'Advanced Prompt Techniques',
                          titleZh: '?²é??ç¤º?€å·?,
                          duration: '18:00',
                          videoUrl: '/api/placeholder/video/lesson2.mp4',
                          transcript: 'In this lesson, we will explore advanced prompt techniques...',
                          completed: false,
                          playgroundType: 'prompt-engineering',
                          expectedOutput: 'Complex prompts using chain-of-thought and few-shot learning',
                          notes: [],
                          resources: [
                            {
                              id: 'res-3',
                              name: 'Advanced Techniques Guide',
                              type: 'pdf',
                              url: '/resources/advanced-guide.pdf',
                              size: '3.2MB'
                            }
                          ]
                        }
                      ]}
                    />
                  } />
                  <Route path="/courses/dashboard" element={
                    <CourseDashboardPage courseId="prompt-engineering" />
                  } />
                  <Route path="/courses/lesson-viewer" element={<LessonViewer />} />
                  
                  {/* 404 Page */}
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
