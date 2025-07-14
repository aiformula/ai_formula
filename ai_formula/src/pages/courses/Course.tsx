import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Atropos from 'atropos/react';
import 'atropos/css';

const Course = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Handle learning plan navigation
  const handlePlanClick = (planId: string, planType: 'free' | 'pro') => {
    if (planId === 'ai-image-video-creation') {
      if (planType === 'free') {
        navigate(`/courses/${planId}/free`);
      } else {
        navigate(`/courses/${planId}`);
      }
    } else {
      // For other plans, show coming soon message
      alert(isZhTW ? '此課程即將推出！' : 'This course is coming soon!');
    }
  };
  
  // 隨機排列函數
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const digitalProducts = [
    // 創意設計類別 - Creative Design
    {
      id: 1,
      title: "Midjourney Beginner's Guide - Visual Creation Starter",
      titleCht: "Midjourney新手指南 - 視覺創作入門",
      description: "Learn the basics of AI image generation with Midjourney for business use.",
      descriptionCht: "學習用Midjourney做AI圖像生成嘅基礎知識，適合商業用途。",
      duration: "8 videos + 25-page guide",
      durationCht: "8個影片 + 25頁指南",
      downloads: 1847,
      rating: 4.6,
      level: "Beginner",
      levelCht: "新手",
      price: "HK$199",
      originalPrice: "HK$299",
      image: "🎨",
      type: "Creative Design",
      typeCht: "創意設計",
      category: "design",
      newProduct: true,
      includes: [
        "8 HD Video Tutorials",
        "25-page Beginner Guide",
        "50+ Prompt Templates",
        "Style Reference Library"
      ],
      includesCht: [
        "8個高清影片教學",
        "25頁新手指南",
        "50+提示模板",
        "風格參考庫"
      ]
    },
    {
      id: 2,
      title: "Advanced Visual AI Mastery - Pro Creator Suite",
      titleCht: "高級視覺AI精通 - 專業創作套件",
      description: "Master advanced AI visual creation with multiple tools and commercial applications.",
      descriptionCht: "精通高級AI視覺創作，包含多種工具同商業應用。",
      duration: "20 videos + 60-page manual",
      durationCht: "20個影片 + 60頁手冊",
      downloads: 923,
      rating: 4.9,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$699",
      originalPrice: "HK$999",
      image: "🎭",
      type: "Creative Design",
      typeCht: "創意設計",
      category: "design",
      bestseller: true,
      includes: [
        "20 HD Video Tutorials",
        "60-page Advanced Manual",
        "Midjourney + DALL-E + Stable Diffusion",
        "Commercial License Guide",
        "Private Discord Community"
      ],
      includesCht: [
        "20個高清影片教學",
        "60頁高級手冊",
        "Midjourney + DALL-E + Stable Diffusion",
        "商業授權指南",
        "私人Discord社群"
      ]
    },
    // AI應用類別 - AI Applications
    {
      id: 3,
      title: "ChatGPT Business Basics - Quick Start Pack",
      titleCht: "ChatGPT商業基礎 - 快速入門套裝",
      description: "Essential ChatGPT prompts and strategies for Hong Kong businesses.",
      descriptionCht: "香港企業必備嘅ChatGPT提示同策略。",
      duration: "10 videos + prompt library",
      durationCht: "10個影片 + 提示庫",
      downloads: 2456,
      rating: 4.8,
      level: "Beginner",
      levelCht: "新手",
      price: "HK$199",
      originalPrice: "HK$299",
      image: "🤖",
      type: "AI Applications",
      typeCht: "AI應用",
      category: "ai",
      hotSelling: true,
      includes: [
        "10 HD Video Tutorials",
        "100+ Business Prompts",
        "Industry Templates",
        "Email Templates"
      ],
      includesCht: [
        "10個高清影片教學",
        "100+商業提示",
        "行業模板",
        "電郵模板"
      ]
    },
    {
      id: 4,
      title: "Advanced AI Integration - Enterprise Solutions",
      titleCht: "高級AI整合 - 企業解決方案",
      description: "Comprehensive AI integration strategies for serious business applications.",
      descriptionCht: "全面嘅AI整合策略，適合認真嘅商業應用。",
      duration: "25 videos + 80-page guide",
      durationCht: "25個影片 + 80頁指南",
      downloads: 1123,
      rating: 4.9,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$899",
      originalPrice: "HK$1299",
      image: "🧠",
      type: "AI Applications",
      typeCht: "AI應用",
      category: "ai",
      featured: true,
      includes: [
        "25 HD Video Tutorials",
        "80-page Implementation Guide",
        "API Integration Tutorials",
        "Custom GPT Development",
        "1-on-1 Consultation Call"
      ],
      includesCht: [
        "25個高清影片教學",
        "80頁實施指南",
        "API整合教學",
        "自定義GPT開發",
        "一對一諮詢通話"
      ]
    },
    // 自動化類別 - Automation
    {
      id: 5,
      title: "Basic Automation Setup - Beginner's Toolkit",
      titleCht: "基礎自動化設置 - 新手工具包",
      description: "Simple automation workflows for small businesses using no-code tools.",
      descriptionCht: "用無代碼工具為小企業設置簡單嘅自動化工作流程。",
      duration: "12 videos + templates",
      durationCht: "12個影片 + 模板",
      downloads: 1789,
      rating: 4.7,
      level: "Beginner",
      levelCht: "新手",
      price: "HK$299",
      originalPrice: "HK$399",
      image: "⚡",
      type: "Automation",
      typeCht: "自動化",
      category: "automation",
      newProduct: true,
      includes: [
        "12 HD Video Tutorials",
        "Zapier + Make.com Templates",
        "Email Automation Setups",
        "CRM Integration Guide"
      ],
      includesCht: [
        "12個高清影片教學",
        "Zapier + Make.com模板",
        "電郵自動化設置",
        "CRM整合指南"
      ]
    },
    {
      id: 6,
      title: "Advanced Automation Systems - Business Growth Pack",
      titleCht: "高級自動化系統 - 業務增長套裝",
      description: "Complex automation systems for scaling businesses with advanced integrations.",
      descriptionCht: "為擴展業務提供複雜嘅自動化系統，包含高級整合。",
      duration: "30 videos + custom scripts",
      durationCht: "30個影片 + 自定義腳本",
      downloads: 678,
      rating: 4.8,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$1299",
      originalPrice: "HK$1799",
      image: "🚀",
      type: "Automation",
      typeCht: "自動化",
      category: "automation",
      featured: true,
      includes: [
        "30 HD Video Tutorials",
        "Custom Python Scripts",
        "Advanced API Integrations",
        "Business Process Mapping",
        "Private Strategy Session"
      ],
      includesCht: [
        "30個高清影片教學",
        "自定義Python腳本",
        "高級API整合",
        "業務流程映射",
        "私人策略會議"
      ]
    },
    // 數據分析類別 - Data Analysis
    {
      id: 7,
      title: "Data Analysis Essentials - Business Intelligence Starter",
      titleCht: "數據分析基礎 - 商業智能入門",
      description: "Essential data analysis skills for business decision-making with practical tools.",
      descriptionCht: "商業決策必備嘅數據分析技能，包含實用工具。",
      duration: "15 videos + Excel templates",
      durationCht: "15個影片 + Excel模板",
      downloads: 1234,
      rating: 4.5,
      level: "Beginner",
      levelCht: "新手",
      price: "HK$399",
      originalPrice: "HK$599",
      image: "📊",
      type: "Data Analysis",
      typeCht: "數據分析",
      category: "data",
      hotSelling: true,
      includes: [
        "15 HD Video Tutorials",
        "Excel Dashboard Templates",
        "Power BI Basics",
        "Data Visualization Guide"
      ],
      includesCht: [
        "15個高清影片教學",
        "Excel儀表板模板",
        "Power BI基礎",
        "數據可視化指南"
      ]
    },
    {
      id: 8,
      title: "Advanced Analytics & AI - Data Science Professional",
      titleCht: "高級分析與AI - 數據科學專業",
      description: "Professional-grade data science techniques with AI integration for business insights.",
      descriptionCht: "專業級數據科學技術，結合AI整合，提供商業洞察。",
      duration: "40 videos + Python notebooks",
      durationCht: "40個影片 + Python筆記本",
      downloads: 456,
      rating: 4.9,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$1599",
      originalPrice: "HK$2299",
      image: "🔬",
      type: "Data Analysis",
      typeCht: "數據分析",
      category: "data",
      bestseller: true,
      includes: [
        "40 HD Video Tutorials",
        "Jupyter Notebooks",
        "Machine Learning Models",
        "Real Business Case Studies",
        "Expert Mentorship Access"
      ],
      includesCht: [
        "40個高清影片教學",
        "Jupyter筆記本",
        "機器學習模型",
        "真實商業案例研究",
        "專家導師接觸"
      ]
    }
  ];

  const learningPlans = [
    {
      id: 'ai-image-video-creation',
      title: isZhTW ? 'AI圖像影片創作' : 'AI Image & Video Creation',
      description: isZhTW ? '學習用AI工具創作專業級圖像和影片內容' : 'Learn to create professional images and videos with AI tools',
      duration: isZhTW ? '8週課程' : '8-week course',
      level: isZhTW ? '初學者' : 'Beginner',
      students: '2,847',
      rating: 4.8,
      price: isZhTW ? '免費體驗' : 'Free Trial',
      image: '🎨',
      features: [
        isZhTW ? '✓ Midjourney專業指導' : '✓ Professional Midjourney guidance',
        isZhTW ? '✓ 視頻生成技巧' : '✓ Video generation techniques',
        isZhTW ? '✓ 商業應用案例' : '✓ Business application cases',
        isZhTW ? '✓ 即時反饋支援' : '✓ Real-time feedback support'
      ],
      hasFreeTrial: true,
      category: 'creative'
    },
    {
      id: 'business-automation',
      title: isZhTW ? '商業自動化精通' : 'Business Automation Mastery',
      description: isZhTW ? '全面掌握商業流程自動化，提升工作效率' : 'Master business process automation to boost productivity',
      duration: isZhTW ? '12週課程' : '12-week course',
      level: isZhTW ? '中級' : 'Intermediate',
      students: '1,523',
      rating: 4.9,
      price: isZhTW ? '即將推出' : 'Coming Soon',
      image: '⚡',
      features: [
        isZhTW ? '✓ 工作流程設計' : '✓ Workflow design',
        isZhTW ? '✓ API整合技巧' : '✓ API integration skills',
        isZhTW ? '✓ 成本效益分析' : '✓ Cost-benefit analysis',
        isZhTW ? '✓ 企業級解決方案' : '✓ Enterprise solutions'
      ],
      hasFreeTrial: false,
      category: 'automation'
    },
    {
      id: 'data-analysis-ai',
      title: isZhTW ? '數據分析與AI' : 'Data Analysis & AI',
      description: isZhTW ? '結合傳統數據分析與AI技術，洞察商業機會' : 'Combine traditional data analysis with AI to uncover business opportunities',
      duration: isZhTW ? '10週課程' : '10-week course',
      level: isZhTW ? '高級' : 'Advanced',
      students: '891',
      rating: 4.7,
      price: isZhTW ? '即將推出' : 'Coming Soon',
      image: '📊',
      features: [
        isZhTW ? '✓ 預測分析模型' : '✓ Predictive analytics models',
        isZhTW ? '✓ 機器學習應用' : '✓ Machine learning applications',
        isZhTW ? '✓ 商業智能儀表板' : '✓ Business intelligence dashboards',
        isZhTW ? '✓ 實戰項目指導' : '✓ Hands-on project guidance'
      ],
      hasFreeTrial: false,
      category: 'data'
    }
  ];

  const categories = [
    { id: 'all', label: isZhTW ? '全部' : 'All Products' },
    { id: 'design', label: isZhTW ? '創意設計' : 'Creative Design' },
    { id: 'ai', label: isZhTW ? 'AI應用' : 'AI Applications' },
    { id: 'automation', label: isZhTW ? '自動化' : 'Automation' },
    { id: 'data', label: isZhTW ? '數據分析' : 'Data Analysis' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? digitalProducts 
    : digitalProducts.filter(product => product.category === selectedCategory);

  const shuffledProducts = shuffleArray(filteredProducts);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              {isZhTW ? '學習中心' : 'Learning Hub'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '掌握AI與自動化' : 'Master AI & Automation'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {isZhTW 
                ? '專為香港企業設計的全面課程，幫助你理解和實施能帶來真正商業成果的AI解決方案。'
                : 'Comprehensive courses designed specifically for Hong Kong businesses to help you understand and implement AI solutions that drive real business results.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Plans Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '學習路徑' : 'Learning Paths'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isZhTW 
                ? '選擇適合你的學習路徑，從基礎到高級，系統性地提升你的技能'
                : 'Choose your learning path from beginner to advanced, systematically enhance your skills'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <Atropos
                  className="atropos-banner"
                  shadowScale={1.05}
                  rotateXMax={15}
                  rotateYMax={15}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl">{plan.image}</span>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-400">{plan.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-400" />
                            <span>{plan.students}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="text-sm text-gray-300">{feature}</div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                              {plan.level}
                            </Badge>
                            <span className="text-lg font-bold text-green-400">{plan.price}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            {plan.hasFreeTrial && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                                onClick={() => handlePlanClick(plan.id, 'free')}
                              >
                                {isZhTW ? '免費試用' : 'Free Trial'}
                              </Button>
                            )}
                            <Button 
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              onClick={() => handlePlanClick(plan.id, 'pro')}
                            >
                              {isZhTW ? '了解更多' : 'Learn More'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
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

      {/* Digital Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '精選數位產品' : 'Featured Digital Products'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isZhTW 
                ? '精心製作的數位資源，幫助你快速提升技能並實現商業目標'
                : 'Carefully crafted digital resources to help you quickly improve skills and achieve business goals'
              }
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'border-gray-700 hover:border-purple-500'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shuffledProducts.map((product, index) => (
              <motion.div
                key={product.id}
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
                        <span className="text-3xl">{product.image}</span>
                        <div className="flex flex-col gap-1">
                          {product.newProduct && (
                            <Badge className="bg-green-600 text-white text-xs">
                              {isZhTW ? '新品' : 'New'}
                            </Badge>
                          )}
                          {product.bestseller && (
                            <Badge className="bg-orange-600 text-white text-xs">
                              {isZhTW ? '暢銷' : 'Bestseller'}
                            </Badge>
                          )}
                          {product.hotSelling && (
                            <Badge className="bg-red-600 text-white text-xs">
                              {isZhTW ? '熱銷' : 'Hot'}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="bg-purple-600 text-white text-xs">
                              {isZhTW ? '精選' : 'Featured'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight mb-2">
                        {isZhTW ? product.titleCht : product.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        {isZhTW ? product.descriptionCht : product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span>{isZhTW ? product.durationCht : product.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-purple-400 border-purple-400">
                            {isZhTW ? product.levelCht : product.level}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {product.downloads.toLocaleString()} {isZhTW ? '次下載' : 'downloads'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">
                            {isZhTW ? '包含內容：' : 'Includes:'}
                          </div>
                          <div className="space-y-1">
                            {(isZhTW ? product.includesCht : product.includes).slice(0, 3).map((include, idx) => (
                              <div key={idx} className="text-xs text-gray-400 flex items-center gap-1">
                                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                {include}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-green-400">{product.price}</span>
                              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {isZhTW ? product.typeCht : product.type}
                            </Badge>
                          </div>
                          
                          <Button 
                            size="sm"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            {isZhTW ? '立即購買' : 'Buy Now'}
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

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '為什麼選擇我們？' : 'Why Choose Us?'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isZhTW 
                ? '專為香港企業設計，提供最實用的AI與自動化解決方案'
                : 'Designed specifically for Hong Kong businesses, providing the most practical AI and automation solutions'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isZhTW ? '專業認證' : 'Professional Certification'}
              </h3>
              <p className="text-gray-400">
                {isZhTW 
                  ? '經過驗證的專業知識，確保你學到的都是最實用的技能'
                  : 'Verified professional knowledge ensuring you learn the most practical skills'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isZhTW ? '本地化教學' : 'Localized Teaching'}
              </h3>
              <p className="text-gray-400">
                {isZhTW 
                  ? '結合香港商業環境，提供最貼合本地需求的解決方案'
                  : 'Integrated with Hong Kong business environment, providing solutions that best meet local needs'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isZhTW ? '持續支援' : 'Ongoing Support'}
              </h3>
              <p className="text-gray-400">
                {isZhTW 
                  ? '提供持續的技術支援和社群互動，確保你的成功'
                  : 'Providing ongoing technical support and community interaction to ensure your success'
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {isZhTW ? '開始你的AI學習之旅' : 'Start Your AI Learning Journey'}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {isZhTW 
                ? '立即加入我們的學習社群，與數千名學員一起成長'
                : 'Join our learning community now and grow with thousands of students'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate('/auth')}
              >
                {isZhTW ? '免費註冊' : 'Sign Up Free'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-gray-700 hover:border-purple-500"
                onClick={() => navigate('/about')}
              >
                {isZhTW ? '了解更多' : 'Learn More'}
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Course; 