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

  const course = courseId ? courseDetails[courseId as keyof typeof courseDetails] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Course Not Found' : 'Ë™≤Á??™Êâæ??}
          </h1>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            {language === 'en' ? 'Back to Courses' : 'ËøîÂ?Ë™≤Á?'}
          </button>
        </div>
      </div>
    );
  }

  const currentModules = selectedPlan === 'free' ? course.freeModules : course.proModules;
  const currentBonuses = selectedPlan === 'free' ? course.freeBonuses : course.proBonuses;
  const currentBonusesCht = selectedPlan === 'free' ? course.freeBonusesCht : course.proBonusesCht;

  const handleEnrollFree = () => {
    navigate(`/course/${courseId}/free`);
  };

  const handleUpgradePro = () => {
    navigate(`/course/${courseId}/pro`);
  };

  const handleLessonClick = (lesson: any) => {
    if (lesson.isLocked && selectedPlan === 'free') {
      alert(language === 'en' ? 'This lesson is available in Pro plan only.' : '?¢Â?Ë™≤Âè™?âÂ?Ê•≠Á??àÊ???);
      return;
    }
    
    if (lesson.videoUrl) {
      alert(language === 'en' ? `Playing: ${lesson.title}` : `?≠Êîæ‰∏≠Ô?${lesson.titleCht}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation />
      
      {/* Header */}
      <div className="container mx-auto px-6 py-8 pt-24 relative z-10">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {language === 'en' ? 'Back to Courses' : 'ËøîÂ?Ë™≤Á?'}
        </button>

        {/* Course Header */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? course.title : course.titleCht}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {language === 'en' ? course.description : course.descriptionCht}
            </p>
            
            {/* Course Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>{course.rating} ({course.reviews} {language === 'en' ? 'reviews' : 'Ë©ïÂÉπ'})</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-400 mr-2" />
                <span>{course.enrollmentCount.toLocaleString()} {language === 'en' ? 'students' : 'Â≠∏Á?'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-400 mr-2" />
                <span>{language === 'en' ? course.totalDuration : course.totalDurationCht}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-purple-400 mr-2" />
                <span>{(language === 'en' ? course.language : course.languageCht).join(', ')}</span>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                {language === 'en' ? 'What You\'ll Learn' : '‰Ω†Ê?Â≠∏Âà∞'}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {(language === 'en' ? course.learningOutcomes : course.learningOutcomesCht).map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan Selection Card */}
          <div className="bg-gray-900 rounded-xl p-6 h-fit">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedPlan('free')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  selectedPlan === 'free'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {language === 'en' ? 'Free Plan' : '?çË≤ª??}
              </button>
              <button
                onClick={() => setSelectedPlan('pro')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  selectedPlan === 'pro'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {language === 'en' ? 'Pro Plan' : 'Â∞àÊ•≠??}
              </button>
            </div>

            {selectedPlan === 'free' ? (
              <div>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {course.freePrice}
                  </div>
                  <div className="text-gray-400">
                    {language === 'en' ? 'Get started for free' : '?çË≤ª?ãÂ?Â≠∏Á?'}
                  </div>
                </div>
                <button
                  onClick={handleEnrollFree}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all mb-4"
                >
                  {language === 'en' ? 'Start Free' : '?ãÂ??çË≤ªÂ≠∏Á?'}
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {course.proPrice}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <span className="line-through">{course.originalPrice}</span>
                    <span className="text-green-400 font-medium">
                      {language === 'en' ? `Save ${course.savings}` : `ÁØÄ??{course.savings}`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleUpgradePro}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all mb-4"
                >
                  {language === 'en' ? 'Upgrade to Pro' : '?áÁ??∞Â?Ê•≠Á?'}
                </button>
              </div>
            )}

            {/* Bonuses */}
            <div className="border-t border-gray-700 pt-4">
              <h4 className="font-bold mb-3">
                {language === 'en' ? 'Included Bonuses:' : '?ÖÂê´?éÂãµÔº?}
              </h4>
              <div className="space-y-2">
                {(language === 'en' ? currentBonuses : currentBonusesCht).map((bonus, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'en' ? 'Course Content' : 'Ë™≤Á??ßÂÆπ'}
          </h2>
          
          <div className="space-y-4">
            {currentModules.map((module) => (
              <div key={module.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-6 text-left hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {language === 'en' ? module.title : module.titleCht}
                      </h3>
                      <p className="text-gray-400">
                        {language === 'en' ? module.description : module.descriptionCht}
                      </p>
                    </div>
                    <div className="text-gray-400">
                      {module.lessons.length} {language === 'en' ? 'lessons' : '?ÇË™≤'}
                    </div>
                  </div>
                </button>
                
                {expandedModule === module.id && (
                  <div className="border-t border-gray-700 bg-gray-850">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-4 border-b border-gray-700 last:border-b-0 flex items-center justify-between hover:bg-gray-800 transition-colors ${
                          !lesson.isLocked || selectedPlan === 'pro' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-center">
                          {lesson.isLocked && selectedPlan === 'free' ? (
                            <Lock className="w-5 h-5 text-gray-500 mr-3" />
                          ) : (
                            <Play className="w-5 h-5 text-green-400 mr-3" />
                          )}
                          <div>
                            <h4 className="font-medium">
                              {language === 'en' ? lesson.title : lesson.titleCht}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {language === 'en' ? lesson.description : lesson.descriptionCht}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {language === 'en' ? lesson.duration : lesson.durationCht}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'en' ? 'Requirements' : 'Ë¶ÅÊ?'}
          </h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="space-y-3">
              {(language === 'en' ? course.requirements : course.requirementsCht).map((requirement, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 