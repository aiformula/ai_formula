import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp, Search, Sparkles, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Atropos from 'atropos/react';
import 'atropos/css';

const Course = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Handle course navigation to outline pages
  const handleCourseClick = (courseId: string) => {
    const routeMap = {
      'prompt-engineering': '/courses/prompt-engineering-outline',
      'chatgpt-mastery': '/courses/chatgpt-mastery-outline',
      'perplexity-tools': '/courses/perplexity-tools-outline',
      'coding-basics': '/courses/coding-basics-outline',
      'midjourney-free': '/courses/free-plan'
    };
    
    const route = routeMap[courseId];
    if (route) {
      navigate(route);
    } else {
      console.warn(`No route found for course: ${courseId}`);
    }
  };

  // 只保留真正存在嘅課程
  const availableCourses = [
    {
      id: 'prompt-engineering',
      title: "Prompt Engineering Mastery",
      titleCht: "提示工程精通課程",
      description: "Master the art of AI communication and prompt optimization for maximum effectiveness.",
      descriptionCht: "掌握AI溝通藝術同提示優化技巧，達到最佳效果。",
      duration: "2 detailed lessons",
      durationCht: "2堂詳細課程",
      students: 2847,
      rating: 4.8,
      level: "Intermediate",
      levelCht: "中級",
      image: "🧠",
      type: "AI Communication",
      typeCht: "AI溝通",
      category: "ai",
      featured: true,
      includes: [
        "Foundations of Prompt Engineering",
        "Advanced Prompt Structure",
        "Real-world Examples",
        "Best Practices Guide"
      ],
      includesCht: [
        "提示工程基礎",
        "高級提示結構",
        "實際範例",
        "最佳實踐指南"
      ]
    },
    {
      id: 'chatgpt-mastery',
      title: "ChatGPT Mastery Course",
      titleCht: "ChatGPT精通課程",
      description: "Comprehensive guide to mastering ChatGPT for business and personal use.",
      descriptionCht: "全面指南，掌握ChatGPT商業同個人應用。",
      duration: "Interactive lessons",
      durationCht: "互動課程",
      students: 1856,
      rating: 4.9,
      level: "Beginner",
      levelCht: "初級",
      image: "💬",
      type: "AI Applications",
      typeCht: "AI應用",
      category: "ai",
      newCourse: true,
      includes: [
        "ChatGPT Fundamentals",
        "Advanced Conversation Techniques",
        "Business Applications",
        "Practical Exercises"
      ],
      includesCht: [
        "ChatGPT基礎知識",
        "高級對話技巧",
        "商業應用",
        "實際練習"
      ]
    },
    {
      id: 'perplexity-tools',
      title: "Perplexity Tools Mastery",
      titleCht: "Perplexity工具精通",
      description: "Master advanced search and research techniques with Perplexity AI.",
      descriptionCht: "掌握用Perplexity AI進行高級搜索同研究技巧。",
      duration: "Comprehensive guide",
      durationCht: "全面指南",
      students: 1234,
      rating: 4.7,
      level: "Intermediate",
      levelCht: "中級",
      image: "🔍",
      type: "Research Tools",
      typeCht: "研究工具",
      category: "tools",
      hotSelling: true,
      includes: [
        "Advanced Search Strategies",
        "Research Optimization",
        "Information Verification",
        "Professional Workflows"
      ],
      includesCht: [
        "高級搜索策略",
        "研究優化",
        "信息驗證",
        "專業工作流程"
      ]
    },
    {
      id: 'coding-basics',
      title: "Coding Basics - Programming Introduction",
      titleCht: "編程基礎 - 程式設計入門",
      description: "Learn programming fundamentals with hands-on examples and interactive exercises.",
      descriptionCht: "透過實際例子同互動練習學習程式設計基礎。",
      duration: "Interactive lessons",
      durationCht: "互動課程",
      students: 987,
      rating: 4.6,
      level: "Beginner",
      levelCht: "初級",
      image: "💻",
      type: "Programming",
      typeCht: "程式設計",
      category: "programming",
      newCourse: true,
      includes: [
        "Programming Fundamentals",
        "JavaScript Basics",
        "HTML & CSS Introduction",
        "Hands-on Projects"
      ],
      includesCht: [
        "程式設計基礎",
        "JavaScript基礎",
        "HTML和CSS入門",
        "實際項目"
      ]
    },
    {
      id: 'midjourney-free',
      title: "Midjourney AI Image Creation",
      titleCht: "Midjourney AI圖像創作",
      description: "Complete guide to creating stunning AI images with Midjourney.",
      descriptionCht: "用Midjourney創作令人驚豔AI圖像嘅完整指南。",
      duration: "3 detailed lessons",
      durationCht: "3堂詳細課程",
      students: 3456,
      rating: 4.8,
      level: "Beginner",
      levelCht: "初級",
      image: "🎨",
      type: "Creative Design",
      typeCht: "創意設計",
      category: "design",
      featured: true,
      includes: [
        "AI Image Generation Introduction",
        "Midjourney Account Setup",
        "Creating Your First AI Image",
        "Advanced Techniques"
      ],
      includesCht: [
        "AI圖像生成介紹",
        "Midjourney帳戶設定",
        "創作你嘅第一張AI圖像",
        "高級技巧"
      ]
    }
  ];

  const categories = [
    { id: 'all', label: isZhTW ? '全部' : 'All Courses' },
    { id: 'ai', label: isZhTW ? 'AI應用' : 'AI Applications' },
    { id: 'design', label: isZhTW ? '創意設計' : 'Creative Design' },
    { id: 'tools', label: isZhTW ? '工具' : 'Tools' },
    { id: 'programming', label: isZhTW ? '程式設計' : 'Programming' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? availableCourses 
    : availableCourses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {isZhTW ? '免費學習課程' : 'Free Learning Courses'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                {isZhTW ? '精心製作嘅免費課程，幫助你快速提升AI技能並實現商業目標' : 'Carefully crafted free courses to help you quickly improve AI skills and achieve business goals'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {isZhTW ? '精選免費課程' : 'Featured Free Courses'}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {isZhTW ? '精心製作嘅數位課程，幫助你快速提升技能並實現商業目標' : 'Carefully crafted digital courses to help you quickly improve skills and achieve business goals'}
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Atropos
                  className="atropos-banner"
                  shadowScale={1.05}
                  rotateXMax={10}
                  rotateYMax={10}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl">{course.image}</span>
                        <div className="flex gap-2">
                          {course.featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400">
                              {isZhTW ? '精選' : 'Featured'}
                            </Badge>
                          )}
                          {course.newCourse && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-400">
                              {isZhTW ? '新品' : 'New'}
                            </Badge>
                          )}
                          {course.hotSelling && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-400">
                              {isZhTW ? '熱銷' : 'Hot'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-white mb-2">
                        {isZhTW ? course.titleCht : course.title}
                      </CardTitle>
                      
                      <CardDescription className="text-gray-400 text-sm leading-relaxed">
                        {isZhTW ? course.descriptionCht : course.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {isZhTW ? course.durationCht : course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students.toLocaleString()} {isZhTW ? '學生' : 'students'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">
                            {isZhTW ? '包含內容：' : 'Includes:'}
                          </div>
                          <div className="space-y-1">
                            {(isZhTW ? course.includesCht : course.includes).slice(0, 3).map((include, idx) => (
                              <div key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></div>
                                {include}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-400">
                                {isZhTW ? '免費' : 'FREE'}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {isZhTW ? course.typeCht : course.type}
                            </Badge>
                          </div>
                          
                          <Button 
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            {isZhTW ? '查看課程大綱' : 'View Course Outline'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Atropos>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {isZhTW ? '學習路徑' : 'Learning Paths'}
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {isZhTW ? '按照建議順序學習，循序漸進掌握AI技能' : 'Follow the recommended sequence to progressively master AI skills'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {isZhTW ? '基礎入門' : 'Foundations'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isZhTW ? '從Midjourney同基礎編程開始' : 'Start with Midjourney and basic programming'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {isZhTW ? 'AI應用' : 'AI Applications'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isZhTW ? '學習ChatGPT同提示工程' : 'Learn ChatGPT and prompt engineering'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-pink-500 to-red-600 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {isZhTW ? '高級工具' : 'Advanced Tools'}
              </h3>
              <p className="text-gray-400 text-sm">
                {isZhTW ? '精通Perplexity研究工具' : 'Master Perplexity research tools'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course; 