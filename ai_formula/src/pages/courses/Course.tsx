import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp, Search, Sparkles, Wand2, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Types
interface CourseData {
  id: string;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  duration: string;
  durationCht: string;
  level: string;
  levelCht: string;
  price: string;
  originalPrice?: string;
  image: string;
  instructor: string;
  instructorCht: string;
  rating: number;
  students: number;
  category: string;
  categoryCht: string;
  featured: boolean;
  bestseller: boolean;
  newCourse: boolean;
  includes: string[];
  includesCht: string[];
  modules: CourseModule[];
}

interface CourseModule {
  id: number;
  title: string;
  titleCht: string;
  duration: string;
  durationCht: string;
  isCompleted: boolean;
}

const sampleCourses: CourseData[] = [
  {
    id: "chatgpt-complete",
    title: "ChatGPT Complete Course",
    titleCht: "ChatGPT 完整教學實戰",
    description: "Master ChatGPT for complete applications, from daily office work to creative projects, comprehensively improve your digital capabilities.",
    descriptionCht: "掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。",
    duration: "4 hours",
    durationCht: "4 小時",
    level: "All Levels",
    levelCht: "適合所有級別",
    price: "免費",
    image: "💬",
    instructor: "AI Formula Team",
    instructorCht: "AI Formula 團隊",
    rating: 4.9,
    students: 163,
    category: "AI Applications",
    categoryCht: "AI 應用",
    featured: true,
    bestseller: true,
    newCourse: true,
    includes: [
      "6 Comprehensive Modules",
      "Effective Prompt Practical Manual",
      "AI Tools Integration Guide",
      "+4 More Items"
    ],
    includesCht: [
      "6 個綜合模組",
      "高效 Prompt 實戰手冊",
      "AI 工具整合指南",
      "+4 更多項目"
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to ChatGPT",
        titleCht: "ChatGPT 介紹",
        duration: "30 min",
        durationCht: "30 分鐘",
        isCompleted: false
      },
      {
        id: 2,
        title: "Basic Prompt Engineering",
        titleCht: "基礎提示工程",
        duration: "45 min",
        durationCht: "45 分鐘",
        isCompleted: false
      },
      {
        id: 3,
        title: "Advanced Applications",
        titleCht: "進階應用",
        duration: "60 min",
        durationCht: "60 分鐘",
        isCompleted: false
      },
      {
        id: 4,
        title: "Business Integration",
        titleCht: "商業整合",
        duration: "45 min",
        durationCht: "45 分鐘",
        isCompleted: false
      },
      {
        id: 5,
        title: "Creative Projects",
        titleCht: "創意專案",
        duration: "40 min",
        durationCht: "40 分鐘",
        isCompleted: false
      },
      {
        id: 6,
        title: "Future Trends",
        titleCht: "未來趨勢",
        duration: "20 min",
        durationCht: "20 分鐘",
        isCompleted: false
      }
    ]
  }
];

// Components
const CourseCard: React.FC<{ course: CourseData; isZhTW: boolean }> = ({ course, isZhTW }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1.0, 
        delay: Math.random() * 0.5,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-yellow-500 transition-all duration-500 cursor-pointer relative overflow-hidden" onClick={handleClick}>
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
            backgroundSize: '400% 400%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="text-4xl" 
              role="img" 
              aria-label="Course icon"
              whileHover={{ 
                scale: 1.3, 
                rotate: 15,
                transition: { duration: 0.3 }
              }}
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {course.image}
            </motion.div>
            <div className="flex flex-col gap-2">
              {course.newCourse && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: 5 }}
                >
                  <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                    {isZhTW ? '新品' : 'New'}
                  </Badge>
                </motion.div>
              )}
              {course.bestseller && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: -5 }}
                >
                  <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                    {isZhTW ? '熱銷' : 'Hot'}
                  </Badge>
                </motion.div>
              )}
              {course.featured && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.7,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: 5 }}
                >
                  <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                    {isZhTW ? '精選' : 'Featured'}
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CardTitle className="text-xl mb-2 text-white">
              {isZhTW ? course.titleCht : course.title}
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CardDescription className="text-gray-200">
              {isZhTW ? course.descriptionCht : course.description}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <motion.div 
              className="flex items-center justify-between text-sm text-gray-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                  </motion.div>
                  <span>{isZhTW ? course.durationCht : course.duration}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    animate={{ y: [0, -2, 0] }}
                  >
                    <Download className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                  </motion.div>
                  <span>163 下載</span>
                </motion.div>
              </div>
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </motion.div>
                <span className="text-white">{course.rating}</span>
              </motion.div>
            </motion.div>

            {/* Level Badge */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                適合所有級別
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h4 className="font-semibold mb-2 text-white">
                包含內容：
              </h4>
              <ul className="text-sm text-gray-200 space-y-1">
                {[
                  '6 個綜合模組',
                  '高效 Prompt 實戰手冊',
                  'AI 工具整合指南',
                  '+1 更多項目'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.4 + i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Bottom Split Layout - Green Free + Orange Button */}
            <motion.div 
              className="flex items-center justify-between pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Left: Green Free Text */}
              <motion.div 
                className="flex flex-col gap-1"
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-2xl font-bold text-green-400"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(34, 197, 94, 0.8)',
                      '0 0 5px rgba(34, 197, 94, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  免費
                </motion.div>
                <div className="text-xs text-green-400">
                  節省 NaN%
                </div>
              </motion.div>
              
              {/* Right: Orange Purchase Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 2.0,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                <Button 
                  className="relative overflow-hidden font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)'
                  }}
                  onClick={handleClick}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(45deg, #f97316, #eab308, #f59e0b, #f97316)',
                      backgroundSize: '400% 400%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  
                  <div className="relative z-10 flex items-center">
                    <span>立即購買</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CourseGrid: React.FC<{ courses: CourseData[]; isZhTW: boolean }> = ({ courses, isZhTW }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} isZhTW={isZhTW} />
      ))}
    </div>
  );
};

const HeroSection: React.FC<{ isZhTW: boolean }> = ({ isZhTW }) => {
  return (
    <section className="pb-16 bg-gradient-to-r from-orange-900 to-yellow-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {isZhTW ? 'AI Formula 課程' : 'AI Formula Courses'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            {isZhTW ? '掌握AI技術，提升商業競爭力' : 'Master AI technology and enhance business competitiveness'}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

const FilterSection: React.FC<{ 
  selectedCategory: string; 
  onCategoryChange: (category: string) => void; 
  isZhTW: boolean 
}> = ({ selectedCategory, onCategoryChange, isZhTW }) => {
  const categories = [
    { id: 'all', name: isZhTW ? '全部' : 'All', nameCht: '全部' },
    { id: 'ai-fundamentals', name: 'AI Fundamentals', nameCht: 'AI基礎' },
    { id: 'automation', name: 'Automation', nameCht: '自動化' },
    { id: 'creative-design', name: 'Creative Design', nameCht: '創意設計' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.id)}
          className={`${selectedCategory === category.id
            ? 'bg-yellow-600 text-white'
            : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
          }`}
        >
          {isZhTW ? category.nameCht : category.name}
        </Button>
      ))}
    </div>
  );
};

const Course: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = sampleCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || 
      course.category.toLowerCase().replace(' ', '-') === selectedCategory ||
      course.categoryCht === selectedCategory;
    
    const matchesSearch = searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleCht.includes(searchQuery) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.descriptionCht.includes(searchQuery);
    
    return matchesCategory && matchesSearch;
  });

  const featuredCourses = filteredCourses.filter(course => course.featured);
  const otherCourses = filteredCourses.filter(course => !course.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* 🎯 添加 page-content 類修復導航重疊問題 */}
      <div className="page-content">
        <HeroSection isZhTW={isZhTW} />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Search and Filter */}
              <div className="mb-12">
                <div className="relative max-w-md mx-auto mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isZhTW ? "搜尋課程..." : "Search courses..."}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                
                <FilterSection 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  isZhTW={isZhTW}
                />
              </div>

              {/* Featured Courses */}
              {featuredCourses.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    {isZhTW ? '精選課程' : 'Featured Courses'}
                  </h2>
                  <CourseGrid courses={featuredCourses} isZhTW={isZhTW} />
                </div>
              )}
              
              {/* Other Courses */}
              {otherCourses.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">
                    {isZhTW ? '所有課程' : 'All Courses'}
                  </h2>
                  <CourseGrid courses={otherCourses} isZhTW={isZhTW} />
                </div>
              )}
              
              {/* No Results */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    {isZhTW ? '沒有找到符合條件的課程' : 'No courses found matching your criteria'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Course; 