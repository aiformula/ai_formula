import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [isUserGroupExpanded, setIsUserGroupExpanded] = useState(false);
  const isZhTW = language === 'zh-HK';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const toolCategories = [
    { id: 'all', label: '全部工具', labelEn: 'All Tools' },
    { id: 'ai-art', label: 'AI繪圖', labelEn: 'AI Art Generation' },
    { id: 'image-edit', label: '圖像編輯', labelEn: 'Image Editing' },
    { id: 'video-gen', label: '影片生成', labelEn: 'Video Generation' },
    { id: 'video-edit', label: '影片編輯', labelEn: 'Video Editing' },
    { id: 'audio-gen', label: '音頻生成', labelEn: 'Audio Generation' },
    { id: 'ai-avatar', label: 'AI虛擬人', labelEn: 'AI Avatars' },
    { id: 'text-gen', label: '文字創作', labelEn: 'Text Generation' },
    { id: 'coding', label: '程式開發', labelEn: 'Code Development' },
    { id: 'ui-design', label: 'UI/UX設計', labelEn: 'UI/UX Design' },
    { id: '3d-ar', label: '3D/AR', labelEn: '3D/AR' },
    { id: 'data-analysis', label: '數據分析', labelEn: 'Data Analysis' },
    { id: 'no-code', label: 'No-Code', labelEn: 'No-Code' },
    { id: 'prompt-eng', label: 'Prompt工程', labelEn: 'Prompt Engineering' },
    { id: 'automation', label: '自動化工具', labelEn: 'Automation Tools' },
    { id: 'marketing', label: '行銷工具', labelEn: 'Marketing Tools' }
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
      category: 'ai-art',
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
      category: 'data-analysis',
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
      category: 'data-analysis',
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
      category: 'video-gen',
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
      category: 'video-edit',
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
      category: 'ai-avatar',
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
      category: '3d-ar',
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
      category: 'video-edit',
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
      category: 'ai-avatar',
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
      case 'ai-art': return '🎨';
      case 'image-edit': return '✂️';
      case 'video-gen': return '🎬';
      case 'video-edit': return '🎞️';
      case 'audio-gen': return '🎵';
      case 'ai-avatar': return '🤖';
      case 'text-gen': return '📝';
      case 'coding': return '💻';
      case 'ui-design': return '🖼️';
      case '3d-ar': return '🎮';
      case 'data-analysis': return '📊';
      case 'no-code': return '🚀';
      case 'prompt-eng': return '🏷️';
      case 'automation': return '⚡';
      case 'marketing': return '📈';
      default: return '⚡';
    }
  };

  // Smart sorting and display logic for expandable filters
  const getSmartSortedCategories = () => {
    const categoriesWithCount = toolCategories.map(category => {
      const count = category.id === 'all' 
        ? tools.length
        : tools.filter(tool => tool.category === category.id).length;
      return { ...category, count };
    });
    
    // Sort: non-zero counts first, then by count descending
    return categoriesWithCount.sort((a, b) => {
      if (a.count === 0 && b.count === 0) return 0;
      if (a.count === 0) return 1;
      if (b.count === 0) return -1;
      return b.count - a.count;
    });
  };

  const getSmartSortedUserGroups = () => {
    const userGroupsWithCount = userGroupCategories.filter(group => group.id !== 'all-users').map(userGroup => {
      const count = tools.filter(tool => 
        tool.userGroups && tool.userGroups.includes(userGroup.id)
      ).length;
      return { ...userGroup, count };
    });
    
    // Sort: non-zero counts first, then by count descending
    return userGroupsWithCount.sort((a, b) => {
      if (a.count === 0 && b.count === 0) return 0;
      if (a.count === 0) return 1;
      if (b.count === 0) return -1;
      return b.count - a.count;
    });
  };

  // Get display items based on expansion state
  const getDisplayCategories = () => {
    const sorted = getSmartSortedCategories();
    const defaultShowCount = 6; // Show first 6 items by default
    return isCategoryExpanded ? sorted : sorted.slice(0, defaultShowCount);
  };

  const getDisplayUserGroups = () => {
    const sorted = getSmartSortedUserGroups();
    const defaultShowCount = 8; // Show first 8 items by default
    return isUserGroupExpanded ? sorted : sorted.slice(0, defaultShowCount);
  };

  // Helper function to render expand/collapse button
  const renderExpandButton = (
    isExpanded: boolean,
    onClick: () => void,
    totalCount: number,
    visibleCount: number
  ) => {
    if (totalCount <= visibleCount) return null;
    
    return (
      <Button
        onClick={onClick}
        className="
          group relative overflow-hidden
          bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white
          backdrop-blur-md backdrop-saturate-150
          transition-all duration-300 ease-out
          transform hover:scale-[1.02] active:scale-[0.98]
          flex items-center gap-2
          border
          shadow-md hover:shadow-lg
          w-full
        "
        style={{
          borderRadius: '12px',
          padding: '8px 16px',
          fontSize: '13px',
          fontWeight: '500',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px) saturate(150%)',
          WebkitBackdropFilter: 'blur(8px) saturate(150%)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
        
        <span className="z-10 relative">
          {isExpanded 
            ? (isZhTW ? '收合' : 'Show Less')
            : (isZhTW ? `顯示更多 (+${totalCount - visibleCount})` : `Show More (+${totalCount - visibleCount})`)
          }
        </span>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="z-10 relative"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path 
              d="M3 5L6 8L9 5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </Button>
    );
  };

  // Helper function to render filter button with fluid glass design
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
          group relative overflow-hidden w-full
          ${isSelected
            ? 'bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 text-white border-yellow-400/40 shadow-xl shadow-yellow-500/10' 
            : isDisabled
              ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
              : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/15 hover:border-white/30 hover:text-white'
          }
          backdrop-blur-md backdrop-saturate-150
          transition-all duration-500 ease-out
          transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
          flex items-center gap-3
          border
          shadow-lg hover:shadow-xl
        `}
        style={{
          borderRadius: '16px',
          padding: '14px 20px',
          fontSize: '14px',
          fontWeight: '600',
          minHeight: '48px',
          background: isSelected 
            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
            : isDisabled
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          boxShadow: isSelected 
            ? '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
            : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Glass shine effect */}
        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
        
        {/* Floating particles effect for selected state */}
        {isSelected && (
          <div className="absolute inset-0 rounded-[16px] overflow-hidden">
            <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse" />
            <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-pulse delay-700" />
          </div>
        )}
        
        {/* Hover glow effect */}
        {!isSelected && !isDisabled && (
          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        
        <span className={`text-lg z-10 relative flex-shrink-0 ${isSelected ? 'filter drop-shadow-sm animate-pulse' : ''}`}>
          {icon}
        </span>
        
        <span className={`font-semibold z-10 relative flex-1 text-left ${isSelected ? 'text-yellow-100 drop-shadow-sm' : ''}`}>
          {label}
        </span>
        
        <span className={`
          inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-xs font-bold z-10 relative flex-shrink-0
          ${isSelected
            ? 'bg-yellow-400/30 text-yellow-100 border border-yellow-400/40 shadow-inner' 
            : isDisabled
              ? 'bg-white/10 text-gray-600 border border-white/10'
              : 'bg-white/20 text-yellow-300 border border-white/30 group-hover:bg-yellow-400/20 group-hover:text-yellow-200'
          }
          transition-all duration-300 backdrop-blur-sm
        `}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}>
          {count}
        </span>
        
        {/* Selected state glass indicator */}
        {isSelected && (
          <div 
            className="absolute inset-0 rounded-[15px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.1))',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
            }}
          />
        )}
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-[16px] bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
      </Button>
    );
  };

  // Render the filter sidebar component
  const renderFilterSidebar = () => (
    <div className="space-y-8">
      {/* Filter Header */}
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">
          {isZhTW ? '智能篩選器' : 'Smart Filters'}
        </h2>
      </div>

      {/* Function Categories Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-200">
            {isZhTW ? '工具類型' : 'Tool Type'}
          </h3>
        </div>
        
        <div className="space-y-3">
          {/* Always visible categories */}
          {getDisplayCategories().map((category) => {
            const isSelected = selectedCategory === category.id && selectedUserGroup === 'all-users';
            const isDisabled = category.count === 0;
            
            return renderFilterButton(
              `function-${category.id}`,
              isZhTW ? category.label : category.labelEn,
              category.count,
              getFunctionIcon(category.id),
              isSelected,
              () => {
                setSelectedCategory(category.id);
                setSelectedUserGroup('all-users');
              },
              isDisabled
            );
          })}
          
          {/* Expand/Collapse Button */}
          {renderExpandButton(
            isCategoryExpanded,
            () => setIsCategoryExpanded(!isCategoryExpanded),
            getSmartSortedCategories().length,
            getDisplayCategories().length
          )}
        </div>
        
        {/* Expandable content with smooth animation */}
        <AnimatePresence>
          {isCategoryExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="space-y-3 mt-3 pt-3 border-t border-white/10">
                {getSmartSortedCategories().slice(getDisplayCategories().length).map((category) => {
                  const isSelected = selectedCategory === category.id && selectedUserGroup === 'all-users';
                  const isDisabled = category.count === 0;
                  
                  return renderFilterButton(
                    `function-expanded-${category.id}`,
                    isZhTW ? category.label : category.labelEn,
                    category.count,
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Groups Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-200">
            {isZhTW ? '用戶角色' : 'User Role'}
          </h3>
        </div>
        
        <div className="space-y-3">
          {/* Always visible user groups */}
          {getDisplayUserGroups().map((userGroup) => {
            const isSelected = selectedUserGroup === userGroup.id;
            const isDisabled = userGroup.count === 0;
            
            return renderFilterButton(
              `user-${userGroup.id}`,
              isZhTW ? userGroup.label : userGroup.labelEn,
              userGroup.count,
              userGroup.icon,
              isSelected,
              () => {
                setSelectedUserGroup(userGroup.id);
                setSelectedCategory('all');
              },
              isDisabled
            );
          })}
          
          {/* Expand/Collapse Button */}
          {renderExpandButton(
            isUserGroupExpanded,
            () => setIsUserGroupExpanded(!isUserGroupExpanded),
            getSmartSortedUserGroups().length,
            getDisplayUserGroups().length
          )}
        </div>
        
        {/* Expandable content with smooth animation */}
        <AnimatePresence>
          {isUserGroupExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="space-y-3 mt-3 pt-3 border-t border-white/10">
                {getSmartSortedUserGroups().slice(getDisplayUserGroups().length).map((userGroup) => {
                  const isSelected = selectedUserGroup === userGroup.id;
                  const isDisabled = userGroup.count === 0;
                  
                  return renderFilterButton(
                    `user-expanded-${userGroup.id}`,
                    isZhTW ? userGroup.label : userGroup.labelEn,
                    userGroup.count,
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filter Indicator */}
      {(selectedCategory !== 'all' || selectedUserGroup !== 'all-users') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 border-t border-white/10"
        >
          <div className="bg-yellow-500/10 text-yellow-400 rounded-xl p-4 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {isZhTW ? '已篩選' : 'Filtered'}: {filteredTools.length} {isZhTW ? '個工具' : 'tools'}
              </span>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedUserGroup('all-users');
                }}
                className="h-6 w-6 p-0 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-full"
              >
                ×
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />

      <div className="ai-container px-4 py-8">
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

        {/* Main Content - Responsive Two Column Layout */}
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8 space-y-8 lg:space-y-0">
          {/* Left Sidebar - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-8">
              {renderFilterSidebar()}
            </div>
          </motion.div>

          {/* Mobile Filter Section - Mobile Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden mb-12"
          >
            {/* Enhanced Filter Section with Clear Hierarchy */}
            <div>
              {/* Filter Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Filter className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">
                  {isZhTW ? '智能篩選器' : 'Smart Filters'}
                </h2>
              </div>

              {/* Function Categories Section - Expandable */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    {isZhTW ? '按工具類型篩選' : 'Filter by Tool Type'}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent ml-4"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {/* Always visible categories */}
                  {getDisplayCategories().map((category) => {
                    const isSelected = selectedCategory === category.id && selectedUserGroup === 'all-users';
                    const isDisabled = category.count === 0;
                    
                    return (
                      <Button
                        key={`function-${category.id}`}
                        onClick={isDisabled ? undefined : () => {
                          setSelectedCategory(category.id);
                          setSelectedUserGroup('all-users');
                        }}
                        disabled={isDisabled}
                        className={`
                          group relative overflow-hidden
                          ${isSelected
                            ? 'bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 text-white border-yellow-400/40 shadow-xl shadow-yellow-500/10' 
                            : isDisabled
                              ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                              : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/15 hover:border-white/30 hover:text-white'
                          }
                          backdrop-blur-md backdrop-saturate-150
                          transition-all duration-500 ease-out
                          transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
                          flex items-center gap-3
                          border
                          shadow-lg hover:shadow-xl
                        `}
                        style={{
                          borderRadius: '16px',
                          padding: '14px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          minHeight: '48px',
                          background: isSelected 
                            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
                            : isDisabled
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(12px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                          boxShadow: isSelected 
                            ? '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                            : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Glass shine effect */}
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                        
                        {/* Floating particles effect for selected state */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                            <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse" />
                            <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse delay-300" />
                            <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-pulse delay-700" />
                          </div>
                        )}
                        
                        {/* Hover glow effect */}
                        {!isSelected && !isDisabled && (
                          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        
                        <span className={`text-lg z-10 relative ${isSelected ? 'filter drop-shadow-sm animate-pulse' : ''}`}>
                          {getFunctionIcon(category.id)}
                        </span>
                        
                        <span className={`font-semibold z-10 relative ${isSelected ? 'text-yellow-100 drop-shadow-sm' : ''}`}>
                          {isZhTW ? category.label : category.labelEn}
                        </span>
                        
                        <span className={`
                          inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-xs font-bold z-10 relative
                          ${isSelected
                            ? 'bg-yellow-400/30 text-yellow-100 border border-yellow-400/40 shadow-inner' 
                            : isDisabled
                              ? 'bg-white/10 text-gray-600 border border-white/10'
                              : 'bg-white/20 text-yellow-300 border border-white/30 group-hover:bg-yellow-400/20 group-hover:text-yellow-200'
                          }
                          transition-all duration-300 backdrop-blur-sm
                        `}
                        style={{
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)'
                        }}>
                          {category.count}
                        </span>
                        
                        {/* Selected state glass indicator */}
                        {isSelected && (
                          <div 
                            className="absolute inset-0 rounded-[15px] pointer-events-none"
                            style={{
                              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.1))',
                              border: '1px solid rgba(251, 191, 36, 0.3)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
                            }}
                          />
                        )}
                        
                        {/* Ripple effect on click */}
                        <div className="absolute inset-0 rounded-[16px] bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
                      </Button>
                    );
                  })}
                  
                  {/* Expand/Collapse Button */}
                  {renderExpandButton(
                    isCategoryExpanded,
                    () => setIsCategoryExpanded(!isCategoryExpanded),
                    getSmartSortedCategories().length,
                    getDisplayCategories().length
                  )}
                </div>
                
                {/* Expandable content with smooth animation */}
                <AnimatePresence>
                  {isCategoryExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap justify-center gap-3 mt-3 pt-3 border-t border-white/10">
                        {getSmartSortedCategories().slice(getDisplayCategories().length).map((category) => {
                          const isSelected = selectedCategory === category.id && selectedUserGroup === 'all-users';
                          const isDisabled = category.count === 0;
                          
                          return (
                            <Button
                              key={`function-expanded-${category.id}`}
                              onClick={isDisabled ? undefined : () => {
                                setSelectedCategory(category.id);
                                setSelectedUserGroup('all-users');
                              }}
                              disabled={isDisabled}
                              className={`
                                group relative overflow-hidden
                                ${isSelected
                                  ? 'bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 text-white border-yellow-400/40 shadow-xl shadow-yellow-500/10' 
                                  : isDisabled
                                    ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/15 hover:border-white/30 hover:text-white'
                                }
                                backdrop-blur-md backdrop-saturate-150
                                transition-all duration-500 ease-out
                                transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
                                flex items-center gap-3
                                border
                                shadow-lg hover:shadow-xl
                              `}
                              style={{
                                borderRadius: '16px',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '600',
                                minHeight: '48px',
                                background: isSelected 
                                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
                                  : isDisabled
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(12px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                boxShadow: isSelected 
                                  ? '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                                  : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              {/* Glass shine effect */}
                              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                              
                              {/* Floating particles effect for selected state */}
                              {isSelected && (
                                <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                                  <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse" />
                                  <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse delay-300" />
                                  <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-pulse delay-700" />
                                </div>
                              )}
                              
                              {/* Hover glow effect */}
                              {!isSelected && !isDisabled && (
                                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              )}
                              
                              <span className={`text-lg z-10 relative ${isSelected ? 'filter drop-shadow-sm animate-pulse' : ''}`}>
                                {getFunctionIcon(category.id)}
                              </span>
                              
                              <span className={`font-semibold z-10 relative ${isSelected ? 'text-yellow-100 drop-shadow-sm' : ''}`}>
                                {isZhTW ? category.label : category.labelEn}
                              </span>
                              
                              <span className={`
                                inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-xs font-bold z-10 relative
                                ${isSelected
                                  ? 'bg-yellow-400/30 text-yellow-100 border border-yellow-400/40 shadow-inner' 
                                  : isDisabled
                                    ? 'bg-white/10 text-gray-600 border border-white/10'
                                    : 'bg-white/20 text-yellow-300 border border-white/30 group-hover:bg-yellow-400/20 group-hover:text-yellow-200'
                                }
                                transition-all duration-300 backdrop-blur-sm
                              `}
                              style={{
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)'
                              }}>
                                {category.count}
                              </span>
                              
                              {/* Selected state glass indicator */}
                              {isSelected && (
                                <div 
                                  className="absolute inset-0 rounded-[15px] pointer-events-none"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.1))',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
                                  }}
                                />
                              )}
                              
                              {/* Ripple effect on click */}
                              <div className="absolute inset-0 rounded-[16px] bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
                            </Button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Groups Section - Expandable */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    {isZhTW ? '按用戶角色篩選' : 'Filter by User Role'}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent ml-4"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {/* Always visible user groups */}
                  {getDisplayUserGroups().map((userGroup) => {
                    const isSelected = selectedUserGroup === userGroup.id;
                    const isDisabled = userGroup.count === 0;
                    
                    return (
                      <Button
                        key={`user-${userGroup.id}`}
                        onClick={isDisabled ? undefined : () => {
                          setSelectedUserGroup(userGroup.id);
                          setSelectedCategory('all');
                        }}
                        disabled={isDisabled}
                        className={`
                          group relative overflow-hidden
                          ${isSelected
                            ? 'bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 text-white border-yellow-400/40 shadow-xl shadow-yellow-500/10' 
                            : isDisabled
                              ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                              : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/15 hover:border-white/30 hover:text-white'
                          }
                          backdrop-blur-md backdrop-saturate-150
                          transition-all duration-500 ease-out
                          transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
                          flex items-center gap-3
                          border
                          shadow-lg hover:shadow-xl
                        `}
                        style={{
                          borderRadius: '16px',
                          padding: '14px 20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          minHeight: '48px',
                          background: isSelected 
                            ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
                            : isDisabled
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(255, 255, 255, 0.08)',
                          backdropFilter: 'blur(12px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                          boxShadow: isSelected 
                            ? '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                            : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {/* Glass shine effect */}
                        <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                        
                        {/* Floating particles effect for selected state */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                            <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse" />
                            <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse delay-300" />
                            <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-pulse delay-700" />
                          </div>
                        )}
                        
                        {/* Hover glow effect */}
                        {!isSelected && !isDisabled && (
                          <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        
                        <span className={`text-lg z-10 relative ${isSelected ? 'filter drop-shadow-sm animate-pulse' : ''}`}>
                          {userGroup.icon}
                        </span>
                        
                        <span className={`font-semibold z-10 relative ${isSelected ? 'text-yellow-100 drop-shadow-sm' : ''}`}>
                          {isZhTW ? userGroup.label : userGroup.labelEn}
                        </span>
                        
                        <span className={`
                          inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-xs font-bold z-10 relative
                          ${isSelected
                            ? 'bg-yellow-400/30 text-yellow-100 border border-yellow-400/40 shadow-inner' 
                            : isDisabled
                              ? 'bg-white/10 text-gray-600 border border-white/10'
                              : 'bg-white/20 text-yellow-300 border border-white/30 group-hover:bg-yellow-400/20 group-hover:text-yellow-200'
                          }
                          transition-all duration-300 backdrop-blur-sm
                        `}
                        style={{
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)'
                        }}>
                          {userGroup.count}
                        </span>
                        
                        {/* Selected state glass indicator */}
                        {isSelected && (
                          <div 
                            className="absolute inset-0 rounded-[15px] pointer-events-none"
                            style={{
                              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.1))',
                              border: '1px solid rgba(251, 191, 36, 0.3)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
                            }}
                          />
                        )}
                        
                        {/* Ripple effect on click */}
                        <div className="absolute inset-0 rounded-[16px] bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
                      </Button>
                    );
                  })}
                  
                  {/* Expand/Collapse Button */}
                  {renderExpandButton(
                    isUserGroupExpanded,
                    () => setIsUserGroupExpanded(!isUserGroupExpanded),
                    getSmartSortedUserGroups().length,
                    getDisplayUserGroups().length
                  )}
                </div>
                
                {/* Expandable content with smooth animation */}
                <AnimatePresence>
                  {isUserGroupExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap justify-center gap-3 mt-3 pt-3 border-t border-white/10">
                        {getSmartSortedUserGroups().slice(getDisplayUserGroups().length).map((userGroup) => {
                          const isSelected = selectedUserGroup === userGroup.id;
                          const isDisabled = userGroup.count === 0;
                          
                          return (
                            <Button
                              key={`user-expanded-${userGroup.id}`}
                              onClick={isDisabled ? undefined : () => {
                                setSelectedUserGroup(userGroup.id);
                                setSelectedCategory('all');
                              }}
                              disabled={isDisabled}
                              className={`
                                group relative overflow-hidden
                                ${isSelected
                                  ? 'bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 text-white border-yellow-400/40 shadow-xl shadow-yellow-500/10' 
                                  : isDisabled
                                    ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/15 hover:border-white/30 hover:text-white'
                                }
                                backdrop-blur-md backdrop-saturate-150
                                transition-all duration-500 ease-out
                                transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
                                flex items-center gap-3
                                border
                                shadow-lg hover:shadow-xl
                              `}
                              style={{
                                borderRadius: '16px',
                                padding: '14px 20px',
                                fontSize: '14px',
                                fontWeight: '600',
                                minHeight: '48px',
                                background: isSelected 
                                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))'
                                  : isDisabled
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(12px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                boxShadow: isSelected 
                                  ? '0 8px 32px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                                  : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              {/* Glass shine effect */}
                              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" />
                              
                              {/* Floating particles effect for selected state */}
                              {isSelected && (
                                <div className="absolute inset-0 rounded-[16px] overflow-hidden">
                                  <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse" />
                                  <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-amber-300/60 rounded-full animate-pulse delay-300" />
                                  <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-orange-300/60 rounded-full animate-pulse delay-700" />
                                </div>
                              )}
                              
                              {/* Hover glow effect */}
                              {!isSelected && !isDisabled && (
                                <div className="absolute inset-0 rounded-[16px] bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              )}
                              
                              <span className={`text-lg z-10 relative ${isSelected ? 'filter drop-shadow-sm animate-pulse' : ''}`}>
                                {userGroup.icon}
                              </span>
                              
                              <span className={`font-semibold z-10 relative ${isSelected ? 'text-yellow-100 drop-shadow-sm' : ''}`}>
                                {isZhTW ? userGroup.label : userGroup.labelEn}
                              </span>
                              
                              <span className={`
                                inline-flex items-center justify-center min-w-[26px] h-7 px-2.5 rounded-full text-xs font-bold z-10 relative
                                ${isSelected
                                  ? 'bg-yellow-400/30 text-yellow-100 border border-yellow-400/40 shadow-inner' 
                                  : isDisabled
                                    ? 'bg-white/10 text-gray-600 border border-white/10'
                                    : 'bg-white/20 text-yellow-300 border border-white/30 group-hover:bg-yellow-400/20 group-hover:text-yellow-200'
                                }
                                transition-all duration-300 backdrop-blur-sm
                              `}
                              style={{
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)'
                              }}>
                                {userGroup.count}
                              </span>
                              
                              {/* Selected state glass indicator */}
                              {isSelected && (
                                <div 
                                  className="absolute inset-0 rounded-[15px] pointer-events-none"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.1))',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
                                  }}
                                />
                              )}
                              
                              {/* Ripple effect on click */}
                              <div className="absolute inset-0 rounded-[16px] bg-white/20 opacity-0 group-active:opacity-100 group-active:animate-ping transition-opacity duration-150" />
                            </Button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
            </div>
          </motion.div>

          {/* Right Main Content - Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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

            {/* Empty State */}
            {filteredTools.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isZhTW ? '找不到符合條件的工具' : 'No Tools Found'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {isZhTW ? '嘗試調整篩選條件以查看更多工具' : 'Try adjusting your filters to see more tools'}
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedUserGroup('all-users');
                  }}
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30"
                >
                  {isZhTW ? '重置篩選' : 'Reset Filters'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 