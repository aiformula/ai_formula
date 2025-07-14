import React, { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCourseData } from "@/hooks/useCourseData";
import CourseErrorBoundary from "@/components/course/ErrorBoundary";
import LearningPlansSection from "@/components/course/LearningPlansSection";
import ProductGrid from "@/components/course/ProductGrid";
import CTASection from "@/components/course/CTASection";
import { Alert, AlertDescription, PageLoadingSpinner } from "@/components/ui";
import { AlertTriangle } from "lucide-react";
import 'atropos/css';

// Error display component
const ErrorDisplay: React.FC<{ error: string; onRetry: () => void; isZhTW: boolean }> = ({ 
  error, 
  onRetry, 
  isZhTW 
}) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
    <Alert className="bg-red-900/20 border-red-500/50 max-w-md">
      <AlertTriangle className="h-4 w-4 text-red-400" />
      <AlertDescription className="text-red-200">
        {error}
        <button 
          onClick={onRetry}
          className="ml-2 text-blue-400 hover:text-blue-300 underline"
        >
          {isZhTW ? '?çË©¶' : 'Retry'}
        </button>
      </AlertDescription>
    </Alert>
  </div>
);

// Main Course component with full optimization
const Course: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  const {
    learningPlans,
    filteredProducts,
    selectedCategory,
    error,
    isLoading,
    handlePlanClick,
    handleProductClick,
    handleCategoryChange,
    clearError
  } = useCourseData(isZhTW);

  // Error handling
  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        onRetry={clearError} 
        isZhTW={isZhTW} 
      />
    );
  }

  // Loading state
  if (isLoading) {
    return <PageLoadingSpinner message={isZhTW ? 'ËºâÂÖ•Ë™≤Á??ßÂÆπ‰∏?..' : 'Loading course content...'} />;
  }

  return (
    <CourseErrorBoundary>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Binary background pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Main Content with Suspense */}
        <Suspense fallback={<PageLoadingSpinner message={isZhTW ? 'ËºâÂÖ•ÁµÑ‰ª∂‰∏?..' : 'Loading components...'} />}>
          <main role="main" aria-label={isZhTW ? "Ë™≤Á??ÅÈù¢‰∏ªË??ßÂÆπ" : "Course page main content"}>
            {/* Learning Plans Section */}
            <LearningPlansSection 
              plans={learningPlans}
              isZhTW={isZhTW}
              onPlanClick={handlePlanClick}
            />

            {/* Product Grid Section */}
            <ProductGrid
              products={filteredProducts}
              isZhTW={isZhTW}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onProductClick={handleProductClick}
            />

            {/* CTA Section */}
            <CTASection isZhTW={isZhTW} />
          </main>
        </Suspense>
        
        <Footer />
      </div>
    </CourseErrorBoundary>
  );
};

export default Course; 