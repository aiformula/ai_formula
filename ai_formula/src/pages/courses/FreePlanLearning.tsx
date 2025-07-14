import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, Lock, ArrowLeft, Star, Upload, Zap, Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { courseDetails } from '@/data/courses/courseDetails';
import Navigation from '@/components/Navigation';

// Add flash animation style
const flashStyle = `
  @keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const FreePlanLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const course = courseDetails[courseId as keyof typeof courseDetails];
  
  if (!course) {
    return <div>Course not found</div>;
  }

  // Get only free modules
  const freeModules = course.freeModules;
  const totalFreeLessons = freeModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progress = (completedLessons.length / totalFreeLessons) * 100;

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const handleUpgrade = () => {
    navigate(`/course/${courseId}`);
  };

  const getLessonExample = (lessonId: number) => {
    const examples = {
      1: {
        en: '"a peaceful mountain lake at sunrise, landscape photography, misty atmosphere"',
        cht: '"?�出?�寧?��?山�?，風?��?影�??��?濛氣�?',
        video: {
          en: '"time-lapse video of mountain lake sunrise, gentle mist movement, peaceful nature scene"',
          cht: '"山�??�出延�??�影，�??�霧�?��?��?寧�??�然?�景"'
        }
      },
      2: {
        en: '"a cozy coffee shop interior, warm lighting, vintage aesthetic"',
        cht: '"?�適?��??��?室內，溫?��?線�?復古美學"',
        video: {
          en: '"coffee shop ambiance video, steam rising from cup, warm cozy atmosphere"',
          cht: '"?�啡店�??�影?��??�中?�汽?�起，溫?��??�氣�?'
        }
      },
      3: {
        en: '"a cute cat sitting by a window, watercolor painting style"',
        cht: '"一?�可?��?貓�??��??��?水彩?�風??',
        video: {
          en: '"cat by window video, gentle movements, soft natural lighting, peaceful moment"',
          cht: '"窗�?貓咪影�?，�??��?作�??��??�然?��?，寧?��???'
        }
      },
      4: {
        en: '"a majestic eagle soaring over mountains, dramatic lighting, wildlife photography"',
        cht: '"一?��?武�??�鷹飛�?山�?，戲?�性�?線�??��??�物?�影"',
        video: {
          en: '"eagle soaring video, majestic flight over mountains, dramatic sky, wildlife cinematography"',
          cht: '"?�鷹翱�?影�?，�?武�?越山?��??��??�天空�??��??�物?�影?�影"'
        }
      },
      5: {
        en: '"a futuristic city skyline, neon lights, cyberpunk style, night scene"',
        cht: '"?��?主義?��?天�?線�??�虹?��?賽�??��?風格，�???',
        video: {
          en: '"cyberpunk city video, neon lights flickering, futuristic atmosphere, night urban scene"',
          cht: '"賽�??��??��?影�?，�??��??��?，未來主義�??��?夜�??��??�景"'
        }
      }
    };
    
    return examples[lessonId as keyof typeof examples] || examples[1];
  };

  const renderTextContent = (content: string | undefined) => {
    if (!content) {
      return (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">
            {language === 'en' ? 'Content coming soon...' : '?�容?��??�出...'}
          </p>
        </div>
      );
    }

    return (
      <div className="text-white space-y-4">
        {content.split('\n').map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold text-blue-300 mb-6 border-b border-blue-400/30 pb-3">{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold text-green-300 mt-8 mb-4">{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-semibold text-yellow-300 mt-6 mb-3">{line.substring(4)}</h3>;
          } else if (line.startsWith('**') && line.endsWith('**')) {
            return <p key={index} className="font-bold text-orange-300 mt-4 mb-2 text-lg bg-gray-800/30 p-2 rounded">{line.substring(2, line.length - 2)}</p>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="text-gray-100 ml-6 list-disc mb-2 leading-relaxed text-base">{line.substring(2)}</li>;
          } else if (line.match(/^\d+\./)) {
            return <li key={index} className="text-gray-100 ml-6 list-decimal mb-2 leading-relaxed text-base">{line}</li>;
          } else if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
          } else if (line.startsWith('✓')) {
            return <p key={index} className="text-green-200 leading-relaxed bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500/50 my-2">{line}</p>;
          } else if (line.startsWith('✗')) {
            return <p key={index} className="text-red-200 leading-relaxed bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500/50 my-2">{line}</p>;
          } else if (line.includes('"') && (line.includes('photography') || line.includes('art') || line.includes('攝影') || line.includes('藝術'))) {
            return <p key={index} className="text-blue-200 leading-relaxed bg-blue-900/20 p-3 rounded-lg font-mono text-sm border border-blue-500/30 my-2">{line}</p>;
          } else {
            return <p key={index} className="text-gray-100 leading-relaxed text-base mb-2">{line}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <style>{flashStyle}</style>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/course/${courseId}`)}
              className="text-gray-300 border-gray-600 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Course' : '返�?課�?'}
            </Button>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              {language === 'en' ? 'Free Plan' : '?�費??}
            </Badge>
          </div>
          <Button 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600"
          >
            {language === 'en' ? 'Upgrade to Pro' : '?��??��?業�?'}
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            {language === 'en' ? course.title : course.titleCht}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'en' ? 'Free Plan - Learn the fundamentals with text-based lessons' : '?�費??- ?��??��?課�?學�??��??��?'}
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="bg-gray-900/90 border-gray-700 mb-8 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              {language === 'en' ? 'Your Progress' : '你�??�度'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {completedLessons.length} / {totalFreeLessons} {language === 'en' ? 'lessons completed' : '?�課已�???}
                </span>
                <span className="text-green-400 font-semibold text-lg">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full h-3" />
            </div>
          </CardContent>
        </Card>

        {/* All Lessons Content */}
        <div className="space-y-12">
          {freeModules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-8">
              {/* Module Header */}
              <div className="border-l-4 border-blue-500 pl-6 bg-gray-800/60 rounded-r-lg py-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {moduleIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {language === 'en' ? module.title : module.titleCht}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-200 border border-blue-500/30">
                        {language === 'en' ? 'Free Module' : '?�費模�?'}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-200 border border-green-500/30">
                        {language === 'en' ? `${module.lessons.length} Lessons` : `${module.lessons.length}?�課`}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-xl text-gray-200 ml-18 leading-relaxed">
                  {language === 'en' ? module.description : module.descriptionCht}
                </p>
              </div>

              {/* Module Lessons */}
              <div className="space-y-8">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Card key={lesson.id} className="bg-gray-800/90 border-gray-600 shadow-2xl overflow-hidden">
                    <CardHeader className="bg-gray-800/80 border-b border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {lesson.id}
                          </div>
                          <div>
                            <CardTitle className="text-2xl text-white mb-2">
                              {language === 'en' ? lesson.title : lesson.titleCht}
                            </CardTitle>
                            <p className="text-gray-200 text-lg">
                              {language === 'en' ? lesson.description : lesson.descriptionCht}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 border border-blue-500/30 px-3 py-1">
                          <Clock className="w-4 h-4 mr-2" />
                          {language === 'en' ? lesson.duration : lesson.durationCht}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8 bg-gray-900/90">



                      {/* Lesson Content */}
                      <div className="prose prose-invert max-w-none">
                        {renderTextContent(language === 'en' ? lesson.textContent : lesson.textContentCht)}
                      </div>

                      {/* Star Rating Button at Bottom */}
                      <div className="mt-8 pt-6 border-t border-gray-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">
                            {language === 'en' ? 'Rate this lesson:' : '?�呢?�課評�?�?}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleLessonComplete(lesson.id)}
                          size="sm"
                          variant={completedLessons.includes(lesson.id) ? "default" : "outline"}
                          className={`${
                            completedLessons.includes(lesson.id)
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 border-yellow-500 shadow-lg hover:shadow-yellow-400/50'
                              : 'border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-200 bg-gray-800/50'
                          } transition-all duration-300 font-medium`}
                          disabled={completedLessons.includes(lesson.id)}
                        >
                          <Star className={`w-4 h-4 mr-2 transition-all duration-300 ${
                            completedLessons.includes(lesson.id) 
                              ? 'fill-current text-yellow-300' 
                              : 'hover:scale-110 hover:rotate-12'
                          }`} style={{
                            animation: completedLessons.includes(lesson.id) 
                              ? 'flash 0.5s ease-in-out 3' 
                              : 'none'
                          }} />
                          {completedLessons.includes(lesson.id) 
                            ? (language === 'en' ? 'Starred' : '已收??)
                            : (language === 'en' ? 'Star This' : '?��?')
                          }
                        </Button>
                      </div>

                      {/* Advanced Tips - Pro Required */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Crown className="w-5 h-5 text-yellow-400" />
                          <h4 className="text-yellow-400 font-semibold">
                            {language === 'en' ? 'Advanced Tips' : '高�?貼士'}
                          </h4>
                          <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                            PRO
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">
                          {language === 'en' 
                            ? 'Unlock professional techniques, advanced prompt strategies, and exclusive tips from industry experts.'
                            : '�??專業?�巧、進�??�示策略，�?行業專家?�獨家貼士�?
                          }
                        </p>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">
                              {language === 'en' ? 'Pro Content Preview:' : 'Pro ?�容?�覽�?}
                            </span>
                          </div>
                          <ul className="text-gray-400 text-sm space-y-1 blur-sm select-none">
                            <li>??{language === 'en' ? 'Advanced lighting techniques for professional results' : '專業?��??�進�??��??��?}</li>
                            <li>??{language === 'en' ? 'Color theory applications in AI image generation' : 'AI ?��??��?中�??�彩?��??�用'}</li>
                            <li>??{language === 'en' ? 'Composition secrets from award-winning artists' : '?��??��?家�?構�?秘訣'}</li>
                            <li>??{language === 'en' ? 'Style mixing techniques for unique results' : '?�特?��??�風?�混?��?�?}</li>
                          </ul>
                        </div>
                        <Button 
                          onClick={handleUpgrade}
                          className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                        >
                          {language === 'en' ? 'Upgrade to Pro' : '?��???Pro'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Prompt */}
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-yellow-400/60 mt-12 shadow-2xl relative overflow-hidden hover:shadow-yellow-400/30 transition-all duration-500 hover:border-yellow-500">
          {/* Elegant Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-amber-300/10"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400/15 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-amber-400/15 rounded-full blur-xl"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="text-gray-800 flex items-center gap-3 text-2xl font-bold">
              <div className="p-2 bg-yellow-400/20 rounded-full border border-yellow-500/30">
                <Lock className="w-6 h-6 text-yellow-600" />
              </div>
              {language === 'en' ? 'Ready for More?' : '準�?好學?��?�?}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-6 text-lg font-medium">
                  {language === 'en' 
                    ? 'Unlock the complete learning experience with Pro:'
                    : '?��?業�?�??完整學�?體�?�?
                  }
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-1.5 bg-green-100 rounded-full group-hover:bg-green-200 transition-all duration-300 border border-green-300/50">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{language === 'en' ? 'HD Video Lessons' : '高�?影�?課�?'}</span>
                  </li>
                  <li className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-1.5 bg-green-100 rounded-full group-hover:bg-green-200 transition-all duration-300 border border-green-300/50">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{language === 'en' ? 'Advanced Techniques' : '?��??��?}</span>
                  </li>
                  <li className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-1.5 bg-green-100 rounded-full group-hover:bg-green-200 transition-all duration-300 border border-green-300/50">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{language === 'en' ? 'Practical Projects' : '實戰?�目'}</span>
                  </li>
                  <li className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-1.5 bg-green-100 rounded-full group-hover:bg-green-200 transition-all duration-300 border border-green-300/50">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{language === 'en' ? 'Community Support' : '社群?�援'}</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Button 
                  onClick={handleUpgrade}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold hover:from-yellow-600 hover:to-amber-600 text-lg px-10 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/40 border border-yellow-600/50 rounded-xl"
                >
                  ??{language === 'en' ? 'Upgrade Now' : '立即?��?'} ??                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreePlanLearning; 
