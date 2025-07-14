import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Clock, Users, Globe, BookOpen, Award } from 'lucide-react';

const CoursesListing: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const courses = [
    {
      id: 'prompt-engineering',
      title: {
        en: 'Prompt Engineering Mastery',
        'zh-HK': 'Prompt Engineering 精通課程'
      },
      description: {
        en: 'Master the art of AI communication and prompt optimization',
        'zh-HK': '掌握AI溝通技巧和提示詞優化的藝術'
      },
      level: {
        en: 'Intermediate',
        'zh-HK': '中級'
      },
      duration: {
        en: '8 hours',
        'zh-HK': '8小時'
      },
      students: 2847,
      rating: 4.8,
      reviews: 342,
      price: {
        en: 'HKD 899',
        'zh-HK': 'HKD 899'
      },
      originalPrice: {
        en: 'HKD 1,299',
        'zh-HK': 'HKD 1,299'
      },
      image: '/placeholder.svg',
      features: {
        en: ['Real-world projects', 'Expert guidance', 'Lifetime access', 'Certificate of completion'],
        'zh-HK': ['真實項目實戰', '專家指導', '終身學習', '完成證書']
      },
      path: '/courses/prompt-engineering-course'
    },
    {
      id: 'chatgpt-mastery',
      title: {
        en: 'ChatGPT Mastery for Professionals',
        'zh-HK': 'ChatGPT 專業應用精通'
      },
      description: {
        en: 'Learn to leverage ChatGPT for professional productivity and business applications',
        'zh-HK': '學習運用ChatGPT提升專業生產力和商業應用'
      },
      level: {
        en: 'Beginner',
        'zh-HK': '初級'
      },
      duration: {
        en: '6 hours',
        'zh-HK': '6小時'
      },
      students: 1923,
      rating: 4.9,
      reviews: 189,
      price: {
        en: 'HKD 699',
        'zh-HK': 'HKD 699'
      },
      originalPrice: {
        en: 'HKD 999',
        'zh-HK': 'HKD 999'
      },
      image: '/placeholder.svg',
      features: {
        en: ['Hands-on practice', 'Business use cases', 'Templates included', 'Community access'],
        'zh-HK': ['實際操作練習', '商業應用案例', '模板包含', '社群權限']
      },
      path: '/courses/chatgpt-mastery-lesson'
    },
    {
      id: 'ai-image-creation',
      title: {
        en: 'AI Image & Video Creation',
        'zh-HK': 'AI圖像影片創作'
      },
      description: {
        en: 'Create stunning visuals with AI-powered tools and techniques',
        'zh-HK': '運用AI工具創造令人驚豔的視覺內容'
      },
      level: {
        en: 'Intermediate',
        'zh-HK': '中級'
      },
      duration: {
        en: '10 hours',
        'zh-HK': '10小時'
      },
      students: 1456,
      rating: 4.7,
      reviews: 298,
      price: {
        en: 'HKD 1,199',
        'zh-HK': 'HKD 1,199'
      },
      originalPrice: {
        en: 'HKD 1,699',
        'zh-HK': 'HKD 1,699'
      },
      image: '/placeholder.svg',
      features: {
        en: ['Creative projects', 'Tool mastery', 'Portfolio building', 'Industry insights'],
        'zh-HK': ['創意項目', '工具精通', '作品集建立', '行業洞察']
      },
      path: '/courses/ai-image-creation'
    }
  ];

  const handleCourseClick = (course: any) => {
    navigate(course.path);
  };

  const handleFreePlan = () => {
    navigate('/courses/free-plan');
  };

  const handleProPlan = () => {
    navigate('/courses/pro-plan');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'zh-HK' ? 'AI 課程' : 'AI Courses'}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {language === 'zh-HK' 
                ? '掌握人工智能技術，提升您的職業競爭力。從基礎到進階，我們的課程涵蓋最新的AI工具和技術。'
                : 'Master artificial intelligence technologies and boost your professional competitiveness. From basics to advanced, our courses cover the latest AI tools and technologies.'
              }
            </p>
            
            {/* Learning Plans */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleFreePlan}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                {language === 'zh-HK' ? '免費學習計劃' : 'Free Learning Plan'}
              </button>
              <button
                onClick={handleProPlan}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all"
              >
                {language === 'zh-HK' ? '專業學習計劃' : 'Pro Learning Plan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all cursor-pointer group"
              onClick={() => handleCourseClick(course)}
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-50" />
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    {course.level[language]}
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {course.title[language]}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {course.description[language]}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration[language]}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {course.features[language].slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-yellow-400">
                      {course.price[language]}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {course.originalPrice[language]}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all">
                    {language === 'zh-HK' ? '開始學習' : 'Start Learning'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'zh-HK' ? '為什麼選擇我們' : 'Why Choose Us'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'zh-HK' ? '專業認證' : 'Professional Certification'}
              </h3>
              <p className="text-gray-400">
                {language === 'zh-HK' 
                  ? '完成課程後獲得業界認可的證書，提升您的職業競爭力。'
                  : 'Get industry-recognized certificates upon course completion to boost your career competitiveness.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'zh-HK' ? '本地化教學' : 'Localized Teaching'}
              </h3>
              <p className="text-gray-400">
                {language === 'zh-HK' 
                  ? '針對香港市場設計的課程內容，更貼近本地工作環境。'
                  : 'Course content designed for the Hong Kong market, more relevant to local work environments.'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {language === 'zh-HK' ? '社群支援' : 'Community Support'}
              </h3>
              <p className="text-gray-400">
                {language === 'zh-HK' 
                  ? '加入我們的學習社群，與其他學員交流心得，共同成長。'
                  : 'Join our learning community, exchange insights with other students, and grow together.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesListing; 