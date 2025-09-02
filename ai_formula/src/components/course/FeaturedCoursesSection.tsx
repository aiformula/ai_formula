import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const coursesData = [
  {
    id: 'chatgpt-complete-course',
    title: 'ChatGPT 完整教學實戰',
    titleEn: 'ChatGPT Complete Practical Course',
    description: '掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。',
    descriptionEn: 'Master the complete application of ChatGPT, from daily office work to creative projects, and comprehensively enhance your digital capabilities.',
    image: '💬',
    duration: '4 小時',
    durationEn: '4 hours',
    downloads: 163,
    rating: 4.9,
    level: '適合所有級別',
    levelEn: 'All Levels',
    newCourse: true,
    bestseller: true,
    featured: true,
    content: [
      '6 個綜合模組',
      '高效 Prompt 實戰手冊',
      'AI 工具整合指南',
      '+4 更多項目',
    ],
    contentEn: [
      '6 Comprehensive Modules',
      'Efficient Prompt Practical Handbook',
      'AI Tools Integration Guide',
      '+4 More Items',
    ],
    price: 'HK$280',
    priceEn: 'HK$280',
  },
  {
    id: 'perplexity-complete-course',
    title: 'Perplexity AI 終極大師課程',
    titleEn: 'Perplexity AI Ultimate Master Course',
    description: '從基礎概念到高階應用，全面掌握 Perplexity 的核心技能與實戰技巧，成為 AI 時代的數位專家。',
    descriptionEn: 'From basic concepts to advanced applications, comprehensively master Perplexity core skills and practical techniques, becoming a digital expert in the AI era.',
    image: '🔍',
    duration: '8+ 小時',
    durationEn: '8+ hours',
    downloads: 280,
    rating: 4.8,
    level: '適合所有級別',
    levelEn: 'All Levels',
    newCourse: true,
    bestseller: true,
    featured: true,
    content: [
      '6 大章節，25+ 單元',
      '高效搜索技能實戰',
      'AI 知識管理指南',
      '+4 更多項目',
    ],
    contentEn: [
      '6 Major Chapters, 25+ Units',
      'Efficient Search Skills Practice',
      'AI Knowledge Management Guide',
      '+4 More Items',
    ],
    price: 'HK$480',
    priceEn: 'HK$480',
  },
  {
    id: 'midjourney-course',
    title: 'Midjourney AI 創作大師課程',
    titleEn: 'Midjourney AI Creative Master Course',
    description: '從基礎理念到創新實戰，全面掌握 AI 繪圖技術，創意技術雙重提升，成為企業戰略師。',
    descriptionEn: 'From basic concepts to innovative practice, comprehensively master AI drawing technology, enhance both creativity and technology, and become a corporate strategist.',
    image: '🎨',
    duration: '6+ 小時',
    durationEn: '6+ hours',
    downloads: 180,
    rating: 4.9,
    level: '適合所有級別',
    levelEn: 'All Levels',
    newCourse: true,
    bestseller: false,
    featured: true,
    content: [
      '5 大章節，20+ 單元',
      '創意技巧完整實戰',
      '高級導模技術指南',
      '+4 更多項目',
    ],
    contentEn: [
      '5 Major Chapters, 20+ Units',
      'Complete Creative Skills Practice',
      'Advanced Model Guide Technology Guide',
      '+4 More Items',
    ],
    price: 'HK$980',
    priceEn: 'HK$980',
  },
];

const CourseCard = ({ course }: { course: any }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  const handleCourseClick = () => {
    if (course.id === 'chatgpt-complete-course') {
      navigate('/courses/chatgpt-complete-course/outline');
    } else if (course.id === 'perplexity-complete-course') {
      navigate('/courses/perplexity-complete-course/outline');
    } else if (course.id === 'midjourney-course') {
      navigate('/courses/midjourney-course/outline');
    } else {
      navigate('/courses');
    }
  };

  return (
    <motion.div
      className="bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 cursor-pointer group h-full flex flex-col"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleCourseClick}
    >
      <Card className="bg-transparent border-0 h-full flex flex-col">
        <CardHeader className="relative p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="text-4xl">{course.image}</div>
            <div className="flex flex-col gap-2">
              {course.newCourse && (
                <Badge className="bg-green-500 text-white text-xs">
                  {isZhHK ? '新品' : 'New'}
                </Badge>
              )}
              {course.bestseller && (
                <Badge className="bg-red-500 text-white text-xs">
                  {isZhHK ? '熱銷' : 'Hot'}
                </Badge>
              )}
              {course.featured && (
                <Badge className="bg-orange-500 text-white text-xs">
                  {isZhHK ? '精選' : 'Featured'}
                </Badge>
              )}
            </div>
          </div>

          <CardTitle className="text-xl mb-2 text-white group-hover:text-yellow-300 transition-colors">
            {isZhHK ? course.title : course.titleEn}
          </CardTitle>
          
          <CardDescription className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {isZhHK ? course.description : course.descriptionEn}
          </CardDescription>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{isZhHK ? course.duration : course.durationEn}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.downloads} {isZhHK ? '下載' : 'downloads'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white">{course.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 flex-1 flex flex-col">
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-white">
              {isZhHK ? '包含內容：' : 'Course Includes:'}
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              {(isZhHK ? course.content : course.contentEn).map((item: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="mb-4 text-center">
              <span className="text-2xl font-bold text-green-400">
                {isZhHK ? course.price : course.priceEn}
              </span>
            </div>

            <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/25">
              {isZhHK ? '立即購買' : 'Enrol Now'}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturedCoursesSection = () => {
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  return (
    <section className="text-white py-16 sm:py-24" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {isZhHK ? '精選 AI 課程' : 'Featured AI Courses'}
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            {isZhHK ? '掌握 AI 技術，提升商業競爭力' : 'Master AI Technology, Enhance Business Competitiveness'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coursesData.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection; 