import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseDetails } from '@/data/courses/courseDetails';
import { Star, Clock, Users, Globe, CheckCircle, Lock, Play, Download, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const isZhHK = language === 'zh-HK';

  const course = courseId ? courseDetails[courseId as keyof typeof courseDetails] : null;

  if (!course) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isZhHK ? '找不到課程' : 'Course Not Found'}
          </h1>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            {isZhHK ? '返回課程' : 'Back to Courses'}
          </button>
        </div>
      </div>
    );
  }

  const handleEnrollFree = () => {
    navigate('/auth');
  };

  const handleUpgradePro = () => {
    navigate('/auth');
  };

  const handleLessonClick = (lesson: any) => {
    if (lesson.isLocked && selectedPlan === 'free') {
      alert(isZhHK ? '此課程只在專業版中提供' : 'This lesson is available in Pro plan only.');
      return;
    }
    
    if (lesson.videoUrl) {
      alert(isZhHK ? `播放中：${lesson.titleCht}` : `Playing: ${lesson.title}`);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          {isZhHK ? '返回課程' : 'Back to Courses'}
        </button>

        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {isZhHK ? course.titleCht : course.title}
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              {isZhHK ? course.descriptionCht : course.description}
            </p>
            
            {/* Course Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                <span>{course.rating} ({course.reviews} {isZhHK ? '評價' : 'reviews'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-400" size={20} />
                <span>{course.enrollmentCount.toLocaleString()} {isZhHK ? '學生' : 'students'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-green-400" size={20} />
                <span>{isZhHK ? course.totalDurationCht : course.totalDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-purple-400" size={20} />
                <span>{(isZhHK ? course.languageCht : course.language).join(', ')}</span>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                {isZhHK ? '你將學到' : 'What You\'ll Learn'}
              </h3>
              <ul className="space-y-3">
                {(isZhHK ? course.learningOutcomesCht : course.learningOutcomes).map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-900 rounded-lg p-6 h-fit">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSelectedPlan('free')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  selectedPlan === 'free'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {isZhHK ? '免費版' : 'Free Plan'}
              </button>
              <button
                onClick={() => setSelectedPlan('pro')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  selectedPlan === 'pro'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {isZhHK ? '專業版' : 'Pro Plan'}
              </button>
            </div>

            {selectedPlan === 'free' ? (
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-green-400">
                  {isZhHK ? '免費' : 'Free'}
                </div>
                <p className="text-gray-400 mb-6">
                  {isZhHK ? '免費開始學習' : 'Get started for free'}
                </p>
                <button
                  onClick={handleEnrollFree}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all mb-4"
                >
                  {isZhHK ? '開始免費學習' : 'Start Free'}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-yellow-400">
                  {course.proPricing}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  <span className="line-through">{course.originalPricing}</span>
                  <span className="ml-2 text-green-400">
                    {isZhHK ? `節省 ${course.savings}` : `Save ${course.savings}`}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">
                  {isZhHK ? '一次性付費，終身使用' : 'One-time payment, lifetime access'}
                </p>
                <button
                  onClick={handleUpgradePro}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all mb-4"
                >
                  {isZhHK ? '升級到專業版' : 'Upgrade to Pro'}
                </button>
              </div>
            )}

            {/* Included Bonuses */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="font-semibold mb-3 text-yellow-400">
                {isZhHK ? '包含獎勵內容：' : 'Included Bonuses:'}
              </h4>
              <ul className="space-y-2">
                {(selectedPlan === 'free' 
                  ? (isZhHK ? course.freeBonusesCht : course.freeBonuses)
                  : (isZhHK ? course.proBonusesCht : course.proBonuses)
                ).map((bonus, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-300 text-sm">{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">
            {isZhHK ? '課程內容' : 'Course Content'}
          </h2>
          <div className="space-y-4">
            {(selectedPlan === 'free' ? course.freeModules : course.proModules).map((module, index) => (
              <div key={module.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-400 font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">
                        {isZhHK ? module.titleCht : module.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {module.lessons.length} {isZhHK ? '節課' : 'lessons'}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expandedModule === module.id ? '−' : '+'}
                  </div>
                </button>
                
                {expandedModule === module.id && (
                  <div className="px-6 pb-4">
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          onClick={() => handleLessonClick(lesson)}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                            !lesson.isLocked || selectedPlan === 'pro' ? 'cursor-pointer hover:bg-gray-800' : 'cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {lesson.isLocked && selectedPlan === 'free' ? (
                              <Lock className="text-gray-500" size={16} />
                            ) : lesson.type === 'video' ? (
                              <Play className="text-green-400" size={16} />
                            ) : (
                              <Download className="text-blue-400" size={16} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300">
                                {isZhHK ? lesson.titleCht : lesson.title}
                              </span>
                              <span className="text-gray-500 text-sm">
                                {lesson.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">
            {isZhHK ? '要求' : 'Requirements'}
          </h3>
          <ul className="space-y-2">
            {(isZhHK ? course.requirementsCht : course.requirements).map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 
