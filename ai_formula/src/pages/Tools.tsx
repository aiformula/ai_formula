import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Palette, Brain, Video, Database, Wand2, Sparkles, Film, Users, Zap, TrendingUp, Filter, X, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { allTools, toolCategories, userGroupCategories } from "@/data/tools-data";

const Tools = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUserGroup, setSelectedUserGroup] = useState('all-users');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllUserGroups, setShowAllUserGroups] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true); // Main filter expand/collapse
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false); // Mobile filter panel state
  const isZhTW = language === 'zh-HK';

  // Helper function to get translated category label
  const getCategoryLabel = (categoryId: string) => {
    return t(`toolCategory.${categoryId}`) || categoryId;
  };

  // Helper function to get translated user group label  
  const getUserGroupLabel = (groupId: string) => {
    return t(`userGroup.${groupId}`) || groupId;
  };

  // Randomize array function
  const randomizeArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Use tools directly from the unified data source (101 tools)
  const tools = allTools;

  // 🛡️ 防禦性檢查：過濾掉任何可能為 undefined 的工具
  const validTools = tools.filter(tool => tool && tool.id && tool.title && tool.imageUrl);

  // 隨機排序函數
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 篩選邏輯：統一篩選（功能分類或用戶群體，互斥選擇）
  let filteredTools = validTools;
  
  // 如果選擇了特定用戶群體，按用戶群體篩選
  if (selectedUserGroup !== 'all-users') {
    filteredTools = filteredTools.filter(tool => 
      tool.userGroups && tool.userGroups.includes(selectedUserGroup)
    );
  }
  // 否則如果選擇了特定功能分類，按功能分類篩選（支援多分類）
  else if (selectedCategory !== 'all') {
    filteredTools = filteredTools.filter(tool => {
      // 檢查主要分類
      if (tool.category === selectedCategory) {
        return true;
      }
      // 檢查多分類數組
      if (tool.categories && tool.categories.includes(selectedCategory)) {
        return true;
      }
      return false;
    });
  }

  // 🔁 全部工具隨機排序：當顯示所有工具時（無篩選），每次載入隨機化順序
  // 當切換分類時也進行隨機化
  if (selectedCategory === 'all' && selectedUserGroup === 'all-users') {
    filteredTools = randomizeArray(filteredTools);
  } else if (selectedCategory !== 'all' || selectedUserGroup !== 'all-users') {
    // Randomize filtered results as well for variety
    filteredTools = randomizeArray(filteredTools);
  }

  // 智能排序：計算每個分類的工具數量
  const getSmartSortedCategories = () => {
    const categoriesWithCount = toolCategories.map(category => {
      let count = 0;
      if (category.id === 'all') {
        count = validTools.length;
      } else {
        // 支援多分類：檢查主要分類和分類陣列
        count = validTools.filter(tool => 
          tool.category === category.id || 
          (tool.categories && tool.categories.includes(category.id))
        ).length;
      }
      return { ...category, count };
    });

    // 排序：全部工具第一，然後按工具數量降序
    return categoriesWithCount.sort((a, b) => {
      if (a.id === 'all') return -1;
      if (b.id === 'all') return 1;
      return b.count - a.count;
    });
  };

  const getSmartSortedUserGroups = () => {
    const userGroupsWithCount = userGroupCategories.map(group => {
      let count = 0;
      if (group.id === 'all-users') {
        count = validTools.length;
      } else {
        count = validTools.filter(tool => 
          tool.userGroups && tool.userGroups.includes(group.id)
        ).length;
      }
      return { ...group, count };
    });

    // 排序：全部用戶第一，然後按工具數量降序
    return userGroupsWithCount.sort((a, b) => {
      if (a.id === 'all-users') return -1;
      if (b.id === 'all-users') return 1;
      return b.count - a.count;
    });
  };

  // 動態圖標映射：統一為白色線條版本，hover 時轉為黃色
  const getFunctionIcon = (categoryId: string, isActive: boolean = false, isHover: boolean = false) => {
    const iconColor = isActive ? 'text-yellow-400' : isHover ? 'text-yellow-300' : 'text-white';
    const iconMap: Record<string, React.ReactNode> = {
      'all': <Wand2 className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'ai-drawing': <Palette className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'video-content': <Video className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'image-editing': <Wand2 className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'ai-avatar': <Users className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'audio-music': <Sparkles className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'text-content': <Brain className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'business-tools': <Database className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'creative-others': <Zap className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      
      // 保持向後兼容
      'video-generation': <Video className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'video-editing': <Film className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'music-generation': <Sparkles className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'text-writing': <Brain className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'presentation-charts': <TrendingUp className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'business-analytics': <Database className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'creative-tools': <Zap className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'ai-assistant': <Brain className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />,
      'web-development': <Database className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />
    };
    return iconMap[categoryId] || <Wand2 className={`h-4 w-4 ${iconColor} transition-colors duration-300`} />;
  };

  const smartSortedCategories = getSmartSortedCategories();
  const smartSortedUserGroups = getSmartSortedUserGroups();

  // 顯示類別控制 - 改為顯示更多/更少邏輯
  const displayedCategories = showAllCategories 
    ? smartSortedCategories 
    : smartSortedCategories.slice(0, 5); // 預設顯示前5個

  const displayedUserGroups = showAllUserGroups 
    ? smartSortedUserGroups 
    : smartSortedUserGroups.slice(0, 4); // 預設顯示前4個

  // Filter 內容組件 - 可重用於桌面端和移動端
  const FilterContent = ({ isMobile = false }) => (
    <div className={`space-y-8 ${isMobile ? '' : ''}`}>
      {/* 工具類型篩選區 */}
      <div>
        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-white mb-6 flex items-center gap-3 tracking-wide`}>
          <Palette className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          {t('label.toolType')}
        </h3>
        <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'space-y-2'}`}>
          {displayedCategories.map((category) => {
            const [isHover, setIsHover] = React.useState(false);
            const isActive = selectedCategory === category.id;
            
            return (
              <motion.div
                key={category.id}
                whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedUserGroup('all-users');
                  if (isMobile) {
                    setIsMobileFilterOpen(false); // 移動端選擇後自動關閉
                  }
                }}
              >
                <div
                  className={`
                    relative rounded-2xl ${isMobile ? 'h-14' : 'h-14'} transition-all duration-300 group overflow-hidden w-full ${isMobile ? 'min-w-0' : 'min-w-[280px] sm:min-w-[300px]'}
                    ${isActive 
                      ? 'bg-gradient-to-r from-yellow-500/15 to-yellow-400/8 shadow-lg shadow-yellow-500/10 ring-1 ring-yellow-400/20' 
                      : isHover 
                      ? 'bg-gray-900/60 shadow-md shadow-black/30 ring-1 ring-gray-700/40' 
                      : 'bg-gray-950/80 hover:bg-gray-900/50'
                    }
                    backdrop-blur-sm border-0
                  `}
                >
                  {/* Active indicator - 左邊亮黃色線 */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-r-full shadow-sm shadow-yellow-500/50"></div>
                  )}
                  
                  {/* 主要內容區域 - 現代極簡佈局 */}
                  <div className={`relative h-full flex items-center justify-between gap-4 px-5 ${isMobile ? 'min-w-0' : ''}`}>
                    {/* 左側區域：Icon + 文字 */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon 區域 - 統一樣式 */}
                      <div className="flex-shrink-0 w-5 flex justify-center">
                        {getFunctionIcon(category.id, isActive, isHover)}
                      </div>
                      
                      {/* 文字區域 - 完整顯示，無截斷 */}
                      <div className="flex-1 min-w-0">
                        <span className={`
                          font-medium ${isMobile ? 'text-sm' : 'text-sm'} transition-colors duration-300 block leading-tight
                          ${isActive 
                            ? 'text-white font-semibold' 
                            : isHover 
                            ? 'text-gray-100' 
                            : 'text-gray-200'
                          }
                        `}>
                          {getCategoryLabel(category.id)}
                        </span>
                      </div>
                    </div>
                    
                    {/* 數字 Badge 區域 - 現代化設計 */}
                    <div className="flex-shrink-0">
                      <div className={`
                        min-w-[24px] ${isMobile ? 'h-6 px-2.5' : 'h-6 px-2.5'} rounded-full flex items-center justify-center ${isMobile ? 'text-xs' : 'text-xs'} font-semibold transition-all duration-300
                        ${isActive 
                          ? 'bg-yellow-400/25 text-yellow-200 ring-1 ring-yellow-400/40 shadow-sm shadow-yellow-500/20' 
                          : isHover 
                          ? 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/30' 
                          : 'bg-gray-800/60 text-gray-400 ring-1 ring-gray-700/50'
                        }
                      `}>
                        {category.count}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* 顯示更多/更少按鈕 */}
          {smartSortedCategories.length > 5 && !showAllCategories && (
            <motion.div
              whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? 0 : -2 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => setShowAllCategories(true)}
            >
              <div className={`rounded-xl ${isMobile ? 'h-12' : 'h-14'} bg-gray-800/30 border border-gray-700/40 hover:bg-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg`}>
                <div className="h-full flex items-center justify-center">
                  <span className={`text-yellow-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'} hover:text-yellow-300 transition-colors duration-300`}>
                    {t('button.showMore')} (+{smartSortedCategories.length - 5})
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 用戶角色篩選區 */}
      <div>
        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-white mb-6 flex items-center gap-3 tracking-wide`}>
          <Users className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          {t('label.userRole')}
        </h3>
        <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'space-y-2'}`}>
          {displayedUserGroups.map((group) => {
            const [isHover, setIsHover] = React.useState(false);
            const isActive = selectedUserGroup === group.id;
            
            return (
              <motion.div
                key={group.id}
                whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? 0 : -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => {
                  setSelectedUserGroup(group.id);
                  setSelectedCategory('all');
                  if (isMobile) {
                    setIsMobileFilterOpen(false); // 移動端選擇後自動關閉
                  }
                }}
              >
                <div
                  className={`
                    relative rounded-2xl ${isMobile ? 'h-14' : 'h-14'} transition-all duration-300 group overflow-hidden w-full ${isMobile ? 'min-w-0' : 'min-w-[280px] sm:min-w-[300px]'}
                    ${isActive 
                      ? 'bg-gradient-to-r from-yellow-500/15 to-yellow-400/8 shadow-lg shadow-yellow-500/10 ring-1 ring-yellow-400/20' 
                      : isHover 
                      ? 'bg-gray-900/60 shadow-md shadow-black/30 ring-1 ring-gray-700/40' 
                      : 'bg-gray-950/80 hover:bg-gray-900/50'
                    }
                    backdrop-blur-sm border-0
                  `}
                >
                  {/* Active indicator - 左邊亮黃色線 */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-r-full shadow-sm shadow-yellow-500/50"></div>
                  )}
                  
                  {/* 主要內容區域 - 現代極簡佈局 */}
                  <div className={`relative h-full flex items-center justify-between gap-4 px-5 ${isMobile ? 'min-w-0' : ''}`}>
                    {/* 左側區域：Icon + 文字 */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon 區域 - 統一樣式 */}
                      <div className="flex-shrink-0 w-5 flex justify-center">
                        <div className={`
                          text-sm transition-colors duration-300
                          ${isActive 
                            ? 'text-yellow-400' 
                            : isHover 
                            ? 'text-yellow-300' 
                            : 'text-gray-300'
                          }
                        `}>
                          {group.icon}
                        </div>
                      </div>
                      
                      {/* 文字區域 - 完整顯示，無截斷 */}
                      <div className="flex-1 min-w-0">
                        <span className={`
                          font-medium ${isMobile ? 'text-sm' : 'text-sm'} transition-colors duration-300 block leading-tight
                          ${isActive 
                            ? 'text-white font-semibold' 
                            : isHover 
                            ? 'text-gray-100' 
                            : 'text-gray-200'
                          }
                        `}>
                          {getUserGroupLabel(group.id)}
                        </span>
                      </div>
                    </div>
                    
                    {/* 數字 Badge 區域 - 現代化設計 */}
                    <div className="flex-shrink-0">
                      <div className={`
                        min-w-[24px] ${isMobile ? 'h-6 px-2.5' : 'h-6 px-2.5'} rounded-full flex items-center justify-center ${isMobile ? 'text-xs' : 'text-xs'} font-semibold transition-all duration-300
                        ${isActive 
                          ? 'bg-yellow-400/25 text-yellow-200 ring-1 ring-yellow-400/40 shadow-sm shadow-yellow-500/20' 
                          : isHover 
                          ? 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/30' 
                          : 'bg-gray-800/60 text-gray-400 ring-1 ring-gray-700/50'
                        }
                      `}>
                        {group.count}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* 顯示更多/更少按鈕 */}
          {smartSortedUserGroups.length > 4 && !showAllUserGroups && (
            <motion.div
              whileHover={{ scale: isMobile ? 1.01 : 1.02, y: isMobile ? 0 : -2 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => setShowAllUserGroups(true)}
            >
              <div className={`rounded-xl ${isMobile ? 'h-12' : 'h-14'} bg-gray-800/30 border border-gray-700/40 hover:bg-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg`}>
                <div className="h-full flex items-center justify-center">
                  <span className={`text-yellow-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'} hover:text-yellow-300 transition-colors duration-300`}>
                    {t('button.showMore')} (+{smartSortedUserGroups.length - 4})
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div {...fadeIn} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {t('page.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('page.subtitle')}
            </p>
          </motion.div>

          {/* Content Grid - 桌面端有側邊欄，移動端只有工具網格 */}
          <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] lg:grid-cols-[300px_1fr] gap-8">
            {/* Left Sidebar - Smart Filter - 只在桌面端顯示 */}
            <motion.div {...fadeIn} className="w-full hidden lg:block">
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-md">
                {/* Filter Header with Expand/Collapse Button */}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Filter className="w-5 h-5 text-yellow-400" />
                      <CardTitle className="text-white">
                        {t('label.smartFilter')}
                      </CardTitle>
                    </div>
                    <button
                      onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                      className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                      title={isFilterExpanded ? t('button.collapse') : t('button.expand')}
                      aria-label={isFilterExpanded ? t('button.collapse') : t('button.expand')}
                    >
                      <motion.div
                        animate={{ rotate: isFilterExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg 
                          className="w-4 h-4 text-gray-400" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                  </div>
                  <CardDescription className="text-gray-400">
                    {t('label.filterDescription')}
                  </CardDescription>
                </CardHeader>

                {/* Collapsible Filter Content */}
                <AnimatePresence>
                  {isFilterExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <CardContent>
                        <FilterContent isMobile={false} />
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Right Side - Tools Grid */}
            <div className="w-full">
              {/* 結果統計 */}
              <motion.div 
                className="mb-6 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400">
                  {selectedCategory !== 'all' && selectedUserGroup === 'all-users' && (
                    <>
                      {t('label.resultsShowing')} <span className="text-white font-semibold">{getCategoryLabel(selectedCategory)}</span> {t('label.resultsCategory')} {t('label.resultsFor')} <span className="text-white font-semibold">{filteredTools.length}</span> {t('label.toolsFound')}
                    </>
                  )}
                  {selectedUserGroup !== 'all-users' && selectedCategory === 'all' && (
                    <>
                      {t('label.resultsShowing')} <span className="text-white font-semibold">{filteredTools.length}</span> {t('label.toolsFound')} {t('label.resultsSuitableFor')} <span className="text-white font-semibold">{getUserGroupLabel(selectedUserGroup)}</span>
                    </>
                  )}
                  {selectedCategory === 'all' && selectedUserGroup === 'all-users' && (
                    <>
                      {t('label.resultsShowing')} {t('label.resultsAll')} <span className="text-white font-semibold">{filteredTools.length}</span> {t('label.toolsFound')}
                    </>
                  )}
                </p>
              </motion.div>

              {/* Tools Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-gray-500 text-lg mb-4">
                      {t('label.noToolsFound')}
                    </div>
                    <p className="text-gray-600">
                      {t('label.noToolsMessage')}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 移動端浮動 Filter 按鈕 - 只在小螢幕顯示 */}
      <div className="lg:hidden">
        <motion.button
          onClick={() => setIsMobileFilterOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-xl shadow-yellow-500/30 flex items-center justify-center z-40 hover:scale-110 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Settings className="w-6 h-6 text-black" />
        </motion.button>
      </div>

      {/* 移動端 Filter Panel - Slide-in Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* Slide-in Panel - 重新設計為純黑+黃極簡風格 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[90vw] max-w-[420px] bg-black/98 backdrop-blur-xl border-l border-gray-800/80 z-50 lg:hidden overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Panel Header - 現代極簡設計 */}
              <div className="flex-shrink-0 bg-black/95 backdrop-blur-md border-b border-gray-800/60 p-5">
                <div className="flex items-center justify-between h-6">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <h2 className="text-lg font-medium text-white tracking-wide">
                      {t('label.smartFilter')}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-900/60 transition-all duration-200 flex-shrink-0 group"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </button>
                </div>
              </div>

              {/* Panel Content - 可滾動區域，自定義 scrollbar 樣式 */}
              <div 
                className="flex-1 overflow-y-auto custom-scrollbar"
                style={{
                  // WebKit browsers (Chrome, Safari, Edge)
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#facc15 rgba(255,255,255,0.1)',
                }}
              >
                <div className="p-5">
                  <FilterContent isMobile={true} />
                </div>
              </div>

              {/* Panel Footer - 現代化固定底部按鈕 */}
              <div className="flex-shrink-0 bg-black/95 backdrop-blur-md border-t border-gray-800/60 p-5">
                <Button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold py-4 text-base rounded-2xl shadow-lg shadow-yellow-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/30"
                >
                  {t('common.apply')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tools; 