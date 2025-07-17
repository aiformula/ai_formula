import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp, Search, Sparkles, Wand2 } from "lucide-react";
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
  description: string;
  descriptionCht: string;
  duration: string;
  videoCount: number;
  completed: boolean;
}

// Sample course data
const sampleCourses: CourseData[] = [
  {
    id: 'ai-fundamentals',
    title: "AI Fundamentals for Hong Kong Business",
    titleCht: "香港企業AI基礎課程",
    description: "Learn the essential AI concepts and how to apply them in Hong Kong business context.",
    descriptionCht: "學習AI基本概念，了解如何在香港商業環境中應用人工智能技術",
    duration: "8 weeks",
    durationCht: "8週",
    level: "Beginner",
    levelCht: "初級",
    price: "HK$2,999",
    originalPrice: "HK$3,999",
    image: "/images/courses/ai-fundamentals.jpg",
    instructor: "Kenneth",
    instructorCht: "Kenneth",
    rating: 4.8,
    students: 1247,
    category: "AI Fundamentals",
    categoryCht: "AI基礎",
    featured: true,
    bestseller: true,
    newCourse: false,
    includes: [
      "8 weeks of comprehensive content",
      "Live Q&A sessions",
      "Certificate of completion",
      "Business implementation guide"
    ],
    includesCht: [
      "8週全面內容",
      "直播問答環節",
      "完成證書",
      "商業實施指南"
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to AI for Business",
        titleCht: "商業AI基礎",
        description: "Understanding AI basics and business applications",
        descriptionCht: "了解AI基礎知識和商業應用",
        duration: "2 hours",
        videoCount: 8,
        completed: false
      },
      {
        id: 2,
        title: "AI Tools and Platforms",
        titleCht: "AI工具與平台",
        description: "Overview of popular AI tools and how to choose the right ones",
        descriptionCht: "熱門AI工具概覽以及如何選擇適合工具",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      }
    ]
  },
  {
    id: 'automation-advanced',
    title: "Advanced Automation with Make.com & n8n",
    titleCht: "Make.com與n8n高級自動化",
    description: "Master advanced automation techniques using Make.com and n8n platforms.",
    descriptionCht: "掌握使用Make.com和n8n平台的高級自動化技術",
    duration: "12 weeks",
    durationCht: "12週",
    level: "Advanced",
    levelCht: "高級",
    price: "HK$4,999",
    originalPrice: "HK$6,999",
    image: "/images/courses/automation-advanced.jpg",
    instructor: "David Chen",
    instructorCht: "陳大偉",
    rating: 4.9,
    students: 856,
    category: "Automation",
    categoryCht: "自動化",
    featured: true,
    bestseller: false,
    newCourse: true,
    includes: [
      "12 weeks advanced training",
      "Hands-on projects",
      "Community access",
      "Advanced certification"
    ],
    includesCht: [
      "12週高級培訓",
      "實作專案",
      "社群訪問",
      "高級認證"
    ],
    modules: [
      {
        id: 1,
        title: "Make.com Advanced Features",
        titleCht: "Make.com高級功能",
        description: "Deep dive into Make.com's advanced capabilities",
        descriptionCht: "深入了解Make.com的高級功能",
        duration: "4 hours",
        videoCount: 16,
        completed: false
      },
      {
        id: 2,
        title: "n8n Self-hosted Setup & Management",
        titleCht: "n8n自主託管設置與管理",
        description: "Learn to set up and manage your own n8n instance",
        descriptionCht: "學習設置和管理自己的n8n實例",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      }
    ]
  },
  {
    id: 'ai-image-video-creation',
    title: "AI Image & Video Creation Mastery",
    titleCht: "AI圖像影片創作精通課程",
    description: "Transform your business data into actionable insights using AI and machine learning techniques.",
    descriptionCht: "使用AI和機器學習技術將企業數據轉化為可操作的洞察",
    duration: "10 weeks",
    durationCht: "10週",
    level: "Intermediate",
    levelCht: "中級",
    price: "HK$3,999",
    originalPrice: "HK$4,999",
    image: "/images/courses/ai-data-analytics.jpg",
    instructor: "Sarah Lam",
    instructorCht: "林小莎",
    rating: 4.7,
    students: 1563,
    category: "Creative Design",
    categoryCht: "創意設計",
    featured: true,
    bestseller: true,
    newCourse: false,
    includes: [
      "10 weeks comprehensive training",
      "AI tool access",
      "Portfolio development",
      "Creative certification"
    ],
    includesCht: [
      "10週全面培訓",
      "AI工具使用權",
      "作品集開發",
      "創意認證"
    ],
    modules: [
      {
        id: 1,
        title: "AI Image Generation Basics",
        titleCht: "AI圖像生成基礎",
        description: "Learn to create stunning images with AI tools",
        descriptionCht: "學習使用AI工具創建精美圖像",
        duration: "3 hours",
        videoCount: 12,
        completed: false
      },
      {
        id: 2,
        title: "Video Creation with AI",
        titleCht: "AI影片創作",
        description: "Master AI-powered video creation techniques",
        descriptionCht: "掌握AI驅動的影片創作技術",
        duration: "4 hours",
        videoCount: 16,
        completed: false
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 h-full">
        <div className="relative overflow-hidden">
          <img
            src={course.image || "/placeholder.svg"}
            alt={isZhTW ? course.titleCht : course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {course.featured && (
              <Badge className="bg-blue-600 text-white">
                {isZhTW ? "精選" : "Featured"}
              </Badge>
            )}
            {course.bestseller && (
              <Badge className="bg-orange-600 text-white">
                {isZhTW ? "熱銷" : "Bestseller"}
              </Badge>
            )}
            {course.newCourse && (
              <Badge className="bg-green-600 text-white">
                {isZhTW ? "新課程" : "New"}
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {isZhTW ? course.categoryCht : course.category}
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400">
              {isZhTW ? course.levelCht : course.level}
            </Badge>
          </div>
          
          <h3 className="font-bold text-white mb-3 text-xl line-clamp-2">
            {isZhTW ? course.titleCht : course.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {isZhTW ? course.descriptionCht : course.description}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{isZhTW ? course.durationCht : course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{course.price}</span>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{course.originalPrice}</span>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
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
    <section className="pt-20 pb-16 bg-gradient-to-r from-blue-900 to-purple-900">
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
            ? 'bg-blue-600 text-white'
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
                    className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
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