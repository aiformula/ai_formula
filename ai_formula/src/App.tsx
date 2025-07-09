import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ViewCountProvider } from "@/contexts/ViewCountContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AboutCht from "./pages/AboutCht";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import FreePlanLearning from "./pages/FreePlanLearning";
import ProPlanLearning from "./pages/ProPlanLearning";
import PromptEngineeringLearning from "./pages/PromptEngineeringLearning";
import PromptEngineeringLesson1 from "./pages/PromptEngineeringLesson1";
import PromptEngineeringLesson2 from "@/pages/PromptEngineeringLesson2";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ViewCountProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/about-cht" element={<AboutCht />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/course" element={<Course />} />
                  <Route path="/course/:courseId" element={<CourseDetail />} />
                  <Route path="/course/:courseId/free" element={<FreePlanLearning />} />
                  <Route path="/course/:courseId/pro" element={<ProPlanLearning />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/prompt-engineering/learning" element={<PromptEngineeringLearning />} />
                  <Route path="/prompt-engineering/lesson/1" element={<PromptEngineeringLesson1 />} />
                  <Route path="/prompt-engineering/lesson/2" element={<PromptEngineeringLesson2 />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ViewCountProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
