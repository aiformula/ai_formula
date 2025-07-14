import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Clock, Users, Star, Play, BookOpen, Code, Brain, Award, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Atropos from 'atropos/react';
import 'atropos/css';

const Course = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Handle learning plan navigation
  const handlePlanClick = (planId: string, planType: 'free' | 'pro') => {
    if (planId === 'ai-image-video-creation') {
      if (planType === 'free') {
        navigate(`/course/${planId}/free`);
      } else {
        navigate(`/course/${planId}`);
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
        "10 Workflow Templates",
        "Zapier Setup Guide",
        "Email Automation Templates"
      ],
      includesCht: [
        "12個高清影片教學",
        "10個工作流程模板",
        "Zapier設置指南",
        "電郵自動化模板"
      ]
    },
    {
      id: 6,
      title: "Enterprise Automation Mastery - Advanced Systems",
      titleCht: "企業自動化精通 - 高級系統",
      description: "Complex automation systems using Make.com, n8n, and custom integrations.",
      descriptionCht: "用Make.com、n8n同自定義整合嘅複雜自動化系統。",
      duration: "30 videos + 100-page manual",
      durationCht: "30個影片 + 100頁手冊",
      downloads: 567,
      rating: 4.9,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$999",
      originalPrice: "HK$1499",
      image: "🔧",
      type: "Automation",
      typeCht: "自動化",
      category: "automation",
      bestseller: true,
      includes: [
        "30 HD Video Tutorials",
        "100-page Advanced Manual",
        "Make.com + n8n + Zapier",
        "Custom API Integrations",
        "Private Support Channel"
      ],
      includesCht: [
        "30個高清影片教學",
        "100頁高級手冊",
        "Make.com + n8n + Zapier",
        "自定義API整合",
        "私人支援頻道"
      ]
    },
    // 數據分析類別 - Data Analytics
    {
      id: 7,
      title: "Data Analytics Starter - Excel & Google Sheets",
      titleCht: "數據分析入門 - Excel同Google Sheets",
      description: "Basic data analysis using familiar tools with AI enhancement.",
      descriptionCht: "用熟悉嘅工具做基礎數據分析，加上AI增強功能。",
      duration: "15 videos + templates",
      durationCht: "15個影片 + 模板",
      downloads: 2134,
      rating: 4.6,
      level: "Beginner",
      levelCht: "新手",
      price: "HK$299",
      originalPrice: "HK$449",
      image: "📊",
      type: "Data Analytics",
      typeCht: "數據分析",
      category: "analytics",
      hotSelling: true,
      includes: [
        "15 HD Video Tutorials",
        "Excel/Sheets Templates",
        "Dashboard Templates",
        "Data Collection Guide"
      ],
      includesCht: [
        "15個高清影片教學",
        "Excel/Sheets模板",
        "儀表板模板",
        "數據收集指南"
      ]
    },
    {
      id: 8,
      title: "Advanced Analytics & AI - Professional Suite",
      titleCht: "高級分析同AI - 專業套件",
      description: "Professional data analytics with AI tools and advanced visualization.",
      descriptionCht: "用AI工具同高級視覺化嘅專業數據分析。",
      duration: "25 videos + software suite",
      durationCht: "25個影片 + 軟件套件",
      downloads: 834,
      rating: 4.8,
      level: "Advanced",
      levelCht: "高級",
      price: "HK$799",
      originalPrice: "HK$1199",
      image: "📈",
      type: "Data Analytics",
      typeCht: "數據分析",
      category: "analytics",
      featured: true,
      includes: [
        "25 HD Video Tutorials",
        "Power BI + Tableau Training",
        "Python Scripts Library",
        "AI Analytics Tools",
        "Live Data Projects"
      ],
      includesCht: [
        "25個高清影片教學",
        "Power BI + Tableau培訓",
        "Python腳本庫",
        "AI分析工具",
        "實時數據項目"
      ]
    }
  ];

  const learningPlans = [
    {
      id: "ai-image-video-creation",
      title: "AI Image & Video Creation",
      titleCht: "AI圖像影片創作",
      description: "Master AI tools for creating stunning visuals and videos for your business",
      descriptionCht: "學識用AI工具為你嘅生意製作靚仔嘅圖片同影片",
      freeIncludes: ["Basic Midjourney Guide", "5 Video Templates", "Getting Started Tutorial"],
      freeIncludesCht: ["基礎Midjourney指南", "5個影片模板", "新手教學"],
      proIncludes: ["Midjourney Pro Techniques", "Runway ML Video Creation", "Stable Diffusion Workflows", "Commercial Usage Rights Guide"],
      proIncludesCht: ["Midjourney專業技巧", "Runway ML影片創作", "Stable Diffusion工作流程", "商業使用權指南"],
      freePrice: "免費",
      freePriceEn: "Free",
      proPrice: "HK$699",
      originalPrice: "HK$1,299",
      savings: "46%",
      icon: "🎨",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "ai-llm-chatgpt-business",
      title: "AI LLM & ChatGPT Business",
      titleCht: "AI大語言模型同ChatGPT商業應用",
      description: "Comprehensive training on leveraging LLMs for business automation and growth",
      descriptionCht: "全面教你點樣用大語言模型嚟做生意自動化同增長",
      freeIncludes: ["Basic Prompt Templates", "ChatGPT Quick Start", "10 Business Prompts"],
      freeIncludesCht: ["基礎提示模板", "ChatGPT快速入門", "10個商業提示"],
      proIncludes: ["Advanced Prompt Engineering", "Custom GPT Development", "API Integration Guide", "Business Case Studies"],
      proIncludesCht: ["高級提示工程", "自定義GPT開發", "API整合指南", "商業案例研究"],
      freePrice: "免費",
      freePriceEn: "Free",
      proPrice: "HK$899",
      originalPrice: "HK$1,599",
      savings: "44%",
      icon: "🤖",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "business-automation-suite",
      title: "Business Automation Suite",
      titleCht: "商業自動化套件",
      description: "End-to-end automation solutions using Make.com, n8n, and Zapier",
      descriptionCht: "用Make.com、n8n同Zapier嚟做全方位自動化解決方案",
      freeIncludes: ["Basic Automation Guide", "3 Workflow Templates", "Setup Instructions"],
      freeIncludesCht: ["基礎自動化指南", "3個工作流程模板", "設置說明"],
      proIncludes: ["Make.com Advanced Workflows", "n8n Self-hosted Setup", "Zapier Integration", "ROI Tracking Templates"],
      proIncludesCht: ["Make.com高級工作流程", "n8n自主託管設置", "Zapier整合", "投資回報率追蹤模板"],
      freePrice: "免費",
      freePriceEn: "Free",
      proPrice: "HK$999",
      originalPrice: "HK$1,799",
      savings: "44%",
      icon: "⚡",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

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

      {/* Digital Learning Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {isZhTW ? '學習計劃' : 'Learning Plans'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isZhTW 
                ? '選擇適合你的學習計劃，免費入門或升級至專業版本。'
                : 'Choose your learning plan - start free or upgrade to professional version.'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPlans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="group"
              >
                <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`bg-gradient-to-br ${plan.gradient} p-3 rounded-xl text-2xl shadow-lg`}>
                        {plan.icon}
                      </div>
                      <CardTitle className="text-white">
                        {isZhTW ? plan.titleCht : plan.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">
                      {isZhTW ? plan.descriptionCht : plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Free Plan */}
                      <div className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">
                            {isZhTW ? '免費版' : 'Free Plan'}
                          </h4>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {isZhTW ? plan.freePrice : plan.freePriceEn}
                          </Badge>
                        </div>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {(isZhTW ? plan.freeIncludesCht : plan.freeIncludes).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          variant="outline" 
                          className="w-full mt-3 text-black bg-white border-gray-300 hover:bg-gray-100"
                          onClick={() => handlePlanClick(plan.id, 'free')}
                        >
                          {isZhTW ? '免費開始' : 'Start Free'}
                        </Button>
                      </div>

                      {/* Pro Plan */}
                      <div className="border border-yellow-500/50 rounded-lg p-4 bg-yellow-500/5">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">
                            {isZhTW ? '專業版' : 'Pro Plan'}
                          </h4>
                          <Badge className="bg-yellow-500 text-black">
                            {isZhTW ? '推薦' : 'Recommended'}
                          </Badge>
                        </div>
                        <ul className="text-sm text-gray-300 space-y-1 mb-4">
                          {(isZhTW ? plan.proIncludesCht : plan.proIncludes).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-white">{plan.proPrice}</span>
                          <span className="text-sm text-gray-500 line-through">{plan.originalPrice}</span>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {isZhTW ? `節省${plan.savings}` : `Save ${plan.savings}`}
                          </Badge>
                        </div>
                        <Button 
                          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                          onClick={() => handlePlanClick(plan.id, 'pro')}
                        >
                          {isZhTW ? '升級至專業版' : 'Upgrade to Pro'}
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {isZhTW ? '精選數位產品類別' : 'Featured Digital Product Categories'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              {isZhTW 
                ? '高質素筆記同影片教學，即刻下載就用得。'
                : 'High-quality notes and video tutorials, instant download and access.'
              }
            </p>
            
            {/* Product Categories Filter */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 mb-8">
              <Button 
                onClick={() => setSelectedCategory('all')}
                className={`${selectedCategory === 'all' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'}`}
              >
                {isZhTW ? '📋 全部' : '📋 All'}
              </Button>
              <Button 
                onClick={() => setSelectedCategory('design')}
                className={`${selectedCategory === 'design' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'}`}
              >
                {isZhTW ? '🎨 創意設計' : '🎨 Creative Design'}
              </Button>
              <Button 
                onClick={() => setSelectedCategory('ai')}
                className={`${selectedCategory === 'ai' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'}`}
              >
                {isZhTW ? '🤖 AI應用' : '🤖 AI Applications'}
              </Button>
              <Button 
                onClick={() => setSelectedCategory('automation')}
                className={`${selectedCategory === 'automation' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'}`}
              >
                {isZhTW ? '⚡ 自動化' : '⚡ Automation'}
              </Button>
              <Button 
                onClick={() => setSelectedCategory('analytics')}
                className={`${selectedCategory === 'analytics' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'}`}
              >
                {isZhTW ? '📊 數據分析' : '📊 Data Analytics'}
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {shuffleArray(digitalProducts
              .filter(product => selectedCategory === 'all' || product.category === selectedCategory))
              .map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              >
                <Atropos
                  className="w-full h-full"
                  activeOffset={40}
                  shadowScale={1.05}
                >
                  <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{product.image}</div>
                        <div className="flex flex-col gap-2">
                          <Badge variant={product.level === 'Beginner' ? 'default' : product.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                            {isZhTW ? product.levelCht : product.level}
                          </Badge>
                          {product.bestseller && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                              <Award className="h-3 w-3 mr-1" />
                              {isZhTW ? '暢銷' : 'Bestseller'}
                            </Badge>
                          )}
                          {product.newProduct && (
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {isZhTW ? '新產品' : 'New'}
                            </Badge>
                          )}
                          {product.hotSelling && (
                            <Badge variant="outline" className="text-red-400 border-red-400">
                              🔥 {isZhTW ? '熱賣' : 'Hot'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 text-white">
                        {isZhTW ? product.titleCht : product.title}
                      </CardTitle>
                      <CardDescription className="text-gray-200">
                        {isZhTW ? product.descriptionCht : product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-300" />
                              {isZhTW ? product.durationCht : product.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-gray-300" />
                              {product.downloads.toLocaleString()} {isZhTW ? '下載' : 'downloads'}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white">{product.rating}</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-white">
                            {isZhTW ? '包含內容：' : 'What\'s Included:'}
                          </h4>
                          <ul className="text-sm text-gray-200 space-y-1">
                            {(isZhTW ? product.includesCht : product.includes).map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Play className="h-3 w-3 text-blue-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                                                  <div className="flex items-center justify-between pt-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div className="text-2xl font-bold text-white">{product.price}</div>
                                {product.originalPrice && (
                                  <div className="text-lg text-gray-400 line-through">{product.originalPrice}</div>
                                )}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-green-400">
                                  {isZhTW ? '節省 ' : 'Save '}
                                  {Math.round(((parseInt(product.originalPrice.replace(/[^0-9]/g, '')) - parseInt(product.price.replace(/[^0-9]/g, ''))) / parseInt(product.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                                </div>
                              )}
                            </div>
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                              {isZhTW ? '立即購買' : 'Buy Now'}
                              <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isZhTW ? '立即獲取你的AI學習資源' : 'Get Your AI Learning Resources Now'}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {isZhTW 
                ? '高品質筆記和影片，幫助你快速掌握AI技能。立即下載，終身使用。'
                : 'High-quality notes and videos to help you master AI skills quickly. Instant download, lifetime access.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                {isZhTW ? '查看所有產品' : 'View All Products'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                {isZhTW ? '聯絡我們' : 'Contact Us'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Course; 