import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Palette, Brain, Video, Database, Wand2, Sparkles, Film, Users, Zap, TrendingUp, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { allTools as newTools, userGroupCategories } from "@/data/tools-data";

const Tools = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUserGroup, setSelectedUserGroup] = useState('all-users');
  const isZhTW = language === 'zh-HK';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const toolCategories = [
    { id: 'all', label: '全部工具', labelEn: 'All Tools' },
    { id: 'design', label: '設計工具', labelEn: 'Design Tools' },
    { id: 'data', label: '數據工具', labelEn: 'Data Tools' },
    { id: 'video', label: 'AI影片工具', labelEn: 'AI Video Tools' },
    { id: 'marketing', label: 'AI行銷工具', labelEn: 'AI Marketing Tools' }
  ];

  // Merge existing tools with new tools from tools-data.ts
  const existingTools = [
    // Design Tools
    {
      id: 'freepik',
      title: isZhTW ? 'Freepik - AI 設計素材庫' : 'Freepik - AI Design Assets',
      description: isZhTW ? 
        '提供海量免費和付費的AI生成設計素材，包括圖片、向量圖、PSD文件等，是設計師的創意寶庫。' :
        'Offers vast free and premium AI-generated design assets including images, vectors, PSD files - a creative treasure for designers.',
      tag: isZhTW ? '設計素材' : 'Design Assets',
      url: 'https://www.freepik.com/',
      imageUrl: '/aitools/freepik.png',
      imageAlt: 'Freepik Logo',
      category: 'design',
      targetAudience: isZhTW ? [
        '平面設計師',
        '網頁設計師', 
        'UI/UX 設計師',
        '品牌設計師',
        '自由創作者'
      ] : [
        'Graphic Designers',
        'Web Designers',
        'UI/UX Designers', 
        'Brand Designers',
        'Freelance Creators'
      ],
      userGroups: ['designer', 'content-creator']
    },
    
    // Data Tools
    {
      id: 'mem0',
      title: isZhTW ? 'Mem0 - AI 記憶系統' : 'Mem0 - AI Memory System',
      description: isZhTW ?
        '個人化AI記憶平台，能夠學習和記住你的偏好，為每次對話提供更智能、更貼心的回應體驗。' :
        'Personalized AI memory platform that learns and remembers your preferences for smarter, more personalized conversation experiences.',
      tag: isZhTW ? 'AI記憶' : 'AI Memory',
      url: 'https://mem0.ai/openmemory-mcp',
      imageUrl: '/aitools/mem0.jpg',
      imageAlt: 'Mem0 Logo',
      category: 'data',
      targetAudience: isZhTW ? [
        '軟體開發者',
        'AI研究員',
        '數據科學家',
        '產品經理',
        '技術愛好者'
      ] : [
        'Software Developers',
        'AI Researchers',
        'Data Scientists',
        'Product Managers',
        'Tech Enthusiasts'
      ],
      userGroups: ['developer', 'business']
    },
    {
      id: 'chat4data',
      title: isZhTW ? 'Chat4Data - AI 數據提取' : 'Chat4Data - AI Data Extraction',
      description: isZhTW ?
        '通過AI天聊方式從任何網站提取結構化數據。無需編程，AI自動檢測並提取你需要的信息。' :
        'Extract structured data from any website through AI chat. No programming needed - AI automatically detects and extracts the information you need.',
      tag: isZhTW ? '數據提取' : 'Data Extraction',
      url: 'https://chat4data.ai/',
      imageUrl: '/aitools/chat4data.png',
      imageAlt: 'Chat4Data Logo',
      category: 'data',
      targetAudience: isZhTW ? [
        '市場研究員',
        '數據分析師',
        '商業分析師',
        '內容創作者',
        '電商營運者'
      ] : [
        'Market Researchers',
        'Data Analysts',
        'Business Analysts',
        'Content Creators',
        'E-commerce Operators'
      ],
      userGroups: ['business', 'marketer']
    },
    
    // AI Video Tools
    {
      id: 'hailuo',
      title: isZhTW ? 'Hailuo AI - 智能影片生成' : 'Hailuo AI - Smart Video Generation',
      description: isZhTW ?
        '先進的AI影片生成平台，只需輸入文字描述，就能創造出高質量的專業級影片內容。' :
        'Advanced AI video generation platform that creates high-quality professional videos from simple text descriptions.',
      tag: isZhTW ? 'AI影片' : 'AI Video',
      url: 'https://hailuoai.video/',
      imageUrl: '/aitools/hailuo.png',
      imageAlt: 'Hailuo AI Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        '影片創作者',
        '社交媒體管理者',
        '市場行銷人員',
        '廣告製作人',
        '內容創作者'
      ] : [
        'Video Creators',
        'Social Media Managers',
        'Marketing Professionals',
        'Ad Producers',
        'Content Creators'
      ]
    },
    {
      id: 'higgsfield',
      title: isZhTW ? 'Higgsfield AI - 影片編輯助手' : 'Higgsfield AI - Video Editing Assistant',
      description: isZhTW ?
        '智能影片編輯平台，提供AI驅動的剪輯建議、特效添加和後期製作優化功能。' :
        'Intelligent video editing platform with AI-driven editing suggestions, effects addition, and post-production optimization.',
      tag: isZhTW ? '影片編輯' : 'Video Editing',
      url: 'https://higgsfield.ai/',
      imageUrl: '/aitools/Higgsfield.png',
      imageAlt: 'Higgsfield AI Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        '影片編輯師',
        'YouTuber',
        '影像工作者',
        '媒體製作人',
        '獨立創作者'
      ] : [
        'Video Editors',
        'YouTubers',
        'Video Professionals',
        'Media Producers',
        'Independent Creators'
      ]
    },
    {
      id: 'unstableml',
      title: isZhTW ? 'UnstableML - 機器學習平台' : 'UnstableML - Machine Learning Platform',
      description: isZhTW ?
        '專為創意工作者設計的機器學習工具，讓非技術背景的用戶也能輕鬆運用AI技術。' :
        'Machine learning tools designed for creative professionals, making AI technology accessible to non-technical users.',
      tag: isZhTW ? '機器學習' : 'Machine Learning',
      url: 'https://unstableml.com/',
      imageUrl: '/aitools/UnstableML.png',
      imageAlt: 'UnstableML Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        'AI愛好者',
        '創意工作者',
        '實驗性藝術家',
        '技術創新者',
        '研究人員'
      ] : [
        'AI Enthusiasts',
        'Creative Professionals',
        'Experimental Artists',
        'Tech Innovators',
        'Researchers'
      ]
    },
    {
      id: '4dv',
      title: isZhTW ? '4DV.AI - 4D 影片技術' : '4DV.AI - 4D Video Technology',
      description: isZhTW ?
        '創新的4D影片生成技術，創造出具有時間維度的沉浸式視覺體驗。' :
        'Innovative 4D video generation technology creating immersive visual experiences with temporal dimensions.',
      tag: isZhTW ? '4D技術' : '4D Technology',
      url: 'https://www.4dv.ai/',
      imageUrl: '/aitools/4DV.jpg',
      imageAlt: '4DV.AI Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        '技術研發者',
        'VR/AR 開發者',
        '影像技術專家',
        '創新實驗室',
        '科技公司'
      ] : [
        'Tech Developers',
        'VR/AR Developers',
        'Video Tech Experts',
        'Innovation Labs',
        'Tech Companies'
      ]
    },
    {
      id: 'seaweedapt',
      title: isZhTW ? 'Seaweed APT2 - 進階影片處理' : 'Seaweed APT2 - Advanced Video Processing',
      description: isZhTW ?
        '專業級影片後期處理工具，提供先進的AI算法來增強影片質量和視覺效果。' :
        'Professional video post-processing tool with advanced AI algorithms for enhancing video quality and visual effects.',
      tag: isZhTW ? '影片處理' : 'Video Processing',
      url: 'https://seaweed-apt.com/2',
      imageUrl: '/aitools/seaweed.png',
      imageAlt: 'Seaweed APT2 Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        '專業影片編輯師',
        '後期製作團隊',
        '影視製作公司',
        '廣告公司',
        '獨立製片人'
      ] : [
        'Professional Video Editors',
        'Post-Production Teams',
        'Film Production Companies',
        'Advertising Agencies',
        'Independent Filmmakers'
      ]
    },
    {
      id: 'headai',
      title: isZhTW ? 'HeadAI - AI 頭像生成器' : 'HeadAI - AI Avatar Generator',
      description: isZhTW ?
        '智能頭像和人像生成工具，能夠創建逼真的AI頭像，適用於各種數字化應用場景。' :
        'Smart avatar and portrait generation tool that creates realistic AI avatars for various digital applications.',
      tag: isZhTW ? 'AI頭像' : 'AI Avatar',
      url: 'https://www.headshotpro.com',
      imageUrl: '/aitools/headai.png',
      imageAlt: 'HeadAI Logo',
      category: 'video',
      targetAudience: isZhTW ? [
        '社交媒體用戶',
        '遊戲開發者',
        '虛擬主播',
        '數字藝術家',
        '品牌營銷人員'
      ] : [
        'Social Media Users',
        'Game Developers',
        'Virtual Streamers',
        'Digital Artists',
        'Brand Marketers'
      ]
    }
  ];

  // Transform new tools to match existing format (add English translations)
  const transformedNewTools = newTools.map(tool => ({
    ...tool,
    title: tool.title, // Keep original Chinese title since existing ones also use Chinese
    description: tool.description, // Keep original Chinese description
    tag: tool.tag, // Keep original Chinese tag
    targetAudience: tool.targetAudience, // Keep original Chinese target audience
    userGroups: tool.userGroups || [] // Ensure userGroups exists
  }));

  // Ensure all existing tools have userGroups property
  const processedExistingTools = existingTools.map(tool => ({
    ...tool,
    userGroups: tool.userGroups || [] // Add empty userGroups if not exists
  }));

  // Combine existing and new tools
  const tools = [...processedExistingTools, ...transformedNewTools];

  // 篩選邏輯：統一篩選（功能分類或用戶群體，互斥選擇）
  let filteredTools = tools;
  
  // 如果選擇了特定用戶群體，按用戶群體篩選
  if (selectedUserGroup !== 'all-users') {
    filteredTools = filteredTools.filter(tool => 
      tool.userGroups && tool.userGroups.includes(selectedUserGroup)
    );
  }
  // 否則如果選擇了特定功能分類，按功能分類篩選
  else if (selectedCategory !== 'all') {
    filteredTools = filteredTools.filter(tool => tool.category === selectedCategory);
  }

  // Helper function to get function category icon
  const getFunctionIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'all': return '🔧';
      case 'design': return '🎨';
      case 'data': return '📊';
      case 'video': return '🎬';
      case 'marketing': return '📈';
      default: return '⚡';
    }
  };

  // Helper function to render filter button with improved states
  const renderFilterButton = (
    key: string,
    label: string,
    count: number,
    icon: string,
    isSelected: boolean,
    onClick: () => void,
    isDisabled: boolean = false
  ) => {
    return (
      <Button
        key={key}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={`
          group relative overflow-hidden
          ${isSelected
            ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/25 border-yellow-400/50' 
            : isDisabled
              ? 'bg-gray-800/50 border-gray-700/50 text-gray-500 cursor-not-allowed'
              : 'bg-gray-900/80 border-gray-600/50 text-gray-300 hover:bg-gray-800/90 hover:border-gray-500/70 hover:text-white hover:shadow-md'
          }
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          flex items-center gap-2.5
          border-2
        `}
        style={{
          borderRadius: '12px',
          padding: '12px 18px',
          fontSize: '14px',
          fontWeight: '600',
          minHeight: '44px'
        }}
      >
        {/* Background gradient animation for hover */}
        {!isSelected && !isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        <span className={`text-lg ${isSelected ? 'filter drop-shadow-sm' : ''}`}>
          {icon}
        </span>
        
        <span className={`font-medium ${isSelected ? 'text-black font-bold' : ''}`}>
          {label}
        </span>
        
        <span className={`
          inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold
          ${isSelected
            ? 'bg-black/20 text-black' 
            : isDisabled
              ? 'bg-gray-700/50 text-gray-600'
              : 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30 group-hover:text-yellow-300'
          }
          transition-all duration-200
        `}>
          {count}
        </span>
        
        {/* Selected state indicator */}
        {isSelected && (
          <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 pointer-events-none" />
        )}
      </Button>
    );
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />

      <div 
        className="container mx-auto px-4 py-8 page-content"
        style={{ maxWidth: '1200px' }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-400 rounded-full px-6 py-3 mb-8 border border-yellow-500/20">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">
              {isZhTW ? `${tools.length} 個推薦 AI 工具` : `${tools.length} Recommended AI Tools`}
            </span>
          </div>
          
          <h1 
            className="font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(var(--text-4xl), 4vw, var(--text-6xl))',
              lineHeight: 'var(--leading-tight)',
              marginBottom: 'var(--space-6)'
            }}
          >
            {isZhTW ? '精選 AI 工具合集' : 'Curated AI Tools Collection'}
          </h1>
          
          <p 
            className="text-gray-300 max-w-3xl mx-auto"
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-relaxed)'
            }}
          >
            {isZhTW 
              ? '發現最前沿的AI工具，提升你的工作效率和創作能力。從設計到數據分析，從影片製作到行銷推廣，這裡有你需要的一切。'
              : 'Discover cutting-edge AI tools to boost your productivity and creativity. From design to data analysis, from video production to marketing - find everything you need here.'
            }
          </p>
        </motion.div>

        {/* Enhanced Filter Section with Clear Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Filter Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">
              {isZhTW ? '智能篩選器' : 'Smart Filters'}
            </h2>
          </div>

          {/* Function Categories Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-200">
                {isZhTW ? '按工具類型篩選' : 'Filter by Tool Type'}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent ml-4"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {toolCategories.map((category) => {
                const categoryCount = category.id === 'all' 
                  ? tools.length
                  : tools.filter(tool => tool.category === category.id).length;
                
                const isSelected = selectedCategory === category.id && selectedUserGroup === 'all-users';
                const isDisabled = categoryCount === 0;
                
                return renderFilterButton(
                  `function-${category.id}`,
                  isZhTW ? category.label : category.labelEn,
                  categoryCount,
                  getFunctionIcon(category.id),
                  isSelected,
                  () => {
                    setSelectedCategory(category.id);
                    setSelectedUserGroup('all-users');
                  },
                  isDisabled
                );
              })}
            </div>
          </div>

          {/* User Groups Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-200">
                {isZhTW ? '按用戶角色篩選' : 'Filter by User Role'}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent ml-4"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {userGroupCategories.filter(group => group.id !== 'all-users').map((userGroup) => {
                const userGroupCount = tools.filter(tool => 
                  tool.userGroups && tool.userGroups.includes(userGroup.id)
                ).length;
                
                const isSelected = selectedUserGroup === userGroup.id;
                const isDisabled = userGroupCount === 0;
                
                return renderFilterButton(
                  `user-${userGroup.id}`,
                  isZhTW ? userGroup.label : userGroup.labelEn,
                  userGroupCount,
                  userGroup.icon,
                  isSelected,
                  () => {
                    setSelectedUserGroup(userGroup.id);
                    setSelectedCategory('all');
                  },
                  isDisabled
                );
              })}
            </div>
          </div>

          {/* Active Filter Indicator */}
          {(selectedCategory !== 'all' || selectedUserGroup !== 'all-users') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 rounded-full px-4 py-2 border border-yellow-500/20">
                <span className="text-sm font-medium">
                  {isZhTW ? '已篩選' : 'Filtered'}: {filteredTools.length} {isZhTW ? '個工具' : 'tools'}
                </span>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedUserGroup('all-users');
                  }}
                  className="ml-2 h-6 w-6 p-0 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-full"
                >
                  ×
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tools Grid with New ToolCard Component */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6"
        >
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              visitButtonText={isZhTW ? `訪問 ${tool.title.split(' - ')[0]}` : `Visit ${tool.title.split(' - ')[0]}`}
              targetAudienceLabel={isZhTW ? '適用於：' : 'Perfect for:'}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools; 