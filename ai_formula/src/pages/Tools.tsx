import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Palette, Brain, Video, Database, Wand2, Sparkles, Film, Users, Zap, TrendingUp, Filter } from "lucide-react";
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

  // 動態圖標映射：根據合併後的8分類系統，增加顏色區分
  const getFunctionIcon = (categoryId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'all': <Wand2 className="h-4 w-4 text-gray-400" />,
      'ai-drawing': <Palette className="h-4 w-4 text-pink-400" />,
      'video-content': <Video className="h-4 w-4 text-purple-400" />, // 合併：影片生成+編輯
      'image-editing': <Wand2 className="h-4 w-4 text-green-400" />,
      'ai-avatar': <Users className="h-4 w-4 text-indigo-400" />,
      'audio-music': <Sparkles className="h-4 w-4 text-yellow-400" />, // 合併：音樂+音頻
      'text-content': <Brain className="h-4 w-4 text-orange-400" />, // 合併：文案+簡報
      'business-tools': <Database className="h-4 w-4 text-emerald-400" />, // 合併：商業分析+AI助手+開發
      'creative-others': <Zap className="h-4 w-4 text-violet-400" />, // 合併：創意工具+其他
      
      // 保持向後兼容
      'video-generation': <Video className="h-4 w-4 text-purple-400" />,
      'video-editing': <Film className="h-4 w-4 text-blue-400" />,
      'music-generation': <Sparkles className="h-4 w-4 text-yellow-400" />,
      'text-writing': <Brain className="h-4 w-4 text-orange-400" />,
      'presentation-charts': <TrendingUp className="h-4 w-4 text-cyan-400" />,
      'business-analytics': <Database className="h-4 w-4 text-emerald-400" />,
      'creative-tools': <Zap className="h-4 w-4 text-violet-400" />,
      'ai-assistant': <Brain className="h-4 w-4 text-red-400" />,
      'web-development': <Database className="h-4 w-4 text-teal-400" />
    };
    return iconMap[categoryId] || <Wand2 className="h-4 w-4 text-gray-400" />;
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

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Smart Filter - Normal Positioning with Expand/Collapse */}
            <motion.div {...fadeIn} className="lg:col-span-1">
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
                      <CardContent className="space-y-6">
                        {/* 工具類型篩選區 */}
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Palette className="w-5 h-5 text-orange-400" />
                            {t('label.toolType')}
                          </h3>
                          <div className="space-y-3">
                            {displayedCategories.map((category) => (
                              <motion.div
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedCategory(category.id);
                                  setSelectedUserGroup('all-users');
                                }}
                              >
                                <div
                                  className={`
                                    relative rounded-2xl p-4 transition-all duration-300 group
                                    ${selectedCategory === category.id 
                                      ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/50 shadow-lg shadow-orange-500/20' 
                                      : 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-700/40 hover:border-gray-600/60'
                                    }
                                    backdrop-blur-md
                                  `}
                                >
                                  {/* 微霓虹光效果 */}
                                  {selectedCategory === category.id && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 blur-sm"></div>
                                  )}
                                  
                                  <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`
                                        w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300
                                        ${selectedCategory === category.id 
                                          ? 'bg-gradient-to-br from-orange-500/30 to-yellow-500/30 border border-orange-400/50' 
                                          : 'bg-gray-700/50 border border-gray-600/50 group-hover:bg-gray-600/50'
                                        }
                                      `}>
                                        {getFunctionIcon(category.id)}
                                      </div>
                                      <span className={`
                                        font-medium transition-colors duration-300
                                        ${selectedCategory === category.id 
                                          ? 'text-white' 
                                          : 'text-gray-300 group-hover:text-white'
                                        }
                                      `}>
                                        {getCategoryLabel(category.id)}
                                      </span>
                                    </div>
                                    
                                    {/* 數量圓圈 */}
                                    <div className={`
                                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                                      ${selectedCategory === category.id 
                                        ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30' 
                                        : 'bg-gray-600/50 text-gray-300 group-hover:bg-gray-500/60 group-hover:text-white'
                                      }
                                    `}>
                                      {category.count}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                            {/* 顯示更多/更少按鈕 */}
                            {smartSortedCategories.length > 5 && !showAllCategories && (
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer"
                                onClick={() => setShowAllCategories(true)}
                              >
                                <div className="rounded-2xl p-4 bg-gray-900/40 border border-gray-700/40 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-md">
                                  <div className="flex items-center justify-center">
                                    <span className="text-orange-400 font-medium text-sm">
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
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-400" />
                            {t('label.userRole')}
                          </h3>
                          <div className="space-y-3">
                            {displayedUserGroups.map((group) => (
                              <motion.div
                                key={group.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedUserGroup(group.id);
                                  setSelectedCategory('all');
                                }}
                              >
                                <div
                                  className={`
                                    relative rounded-2xl p-4 transition-all duration-300 group
                                    ${selectedUserGroup === group.id 
                                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                                      : 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-700/40 hover:border-gray-600/60'
                                    }
                                    backdrop-blur-md
                                  `}
                                >
                                  {/* 微霓虹光效果 */}
                                  {selectedUserGroup === group.id && (
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-sm"></div>
                                  )}
                                  
                                  <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`
                                        w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 text-sm
                                        ${selectedUserGroup === group.id 
                                          ? 'bg-gradient-to-br from-blue-500/30 to-purple-600/30 border border-blue-400/50' 
                                          : 'bg-gray-700/50 border border-gray-600/50 group-hover:bg-gray-600/50'
                                        }
                                      `}>
                                        {group.icon}
                                      </div>
                                      <span className={`
                                        font-medium transition-colors duration-300
                                        ${selectedUserGroup === group.id 
                                          ? 'text-white' 
                                          : 'text-gray-300 group-hover:text-white'
                                        }
                                      `}>
                                        {getUserGroupLabel(group.id)}
                                      </span>
                                    </div>
                                    
                                    {/* 數量圓圈 */}
                                    <div className={`
                                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                                      ${selectedUserGroup === group.id 
                                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                                        : 'bg-gray-600/50 text-gray-300 group-hover:bg-gray-500/60 group-hover:text-white'
                                      }
                                    `}>
                                      {group.count}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                            {/* 顯示更多/更少按鈕 */}
                            {smartSortedUserGroups.length > 4 && !showAllUserGroups && (
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer"
                                onClick={() => setShowAllUserGroups(true)}
                              >
                                <div className="rounded-2xl p-4 bg-gray-900/40 border border-gray-700/40 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-md">
                                  <div className="flex items-center justify-center">
                                    <span className="text-blue-400 font-medium text-sm">
                                      {t('button.showMore')} (+{smartSortedUserGroups.length - 4})
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Right Side - Tools Grid */}
            <div className="lg:col-span-3">
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
                      {t('label.resultsShowing')} <span className="text-white font-semibold">{t('label.resultsAll')} {filteredTools.length}</span> {t('label.toolsFound')}
                    </>
                  )}
                </p>
                
                {(selectedCategory !== 'all' || selectedUserGroup !== 'all-users') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedUserGroup('all-users');
                    }}
                    className="text-gray-400 border-gray-600 hover:text-white hover:border-gray-500"
                  >
                    {t('button.resetFilters')}
                  </Button>
                )}
              </motion.div>

              {/* 工具卡片網格 */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${selectedCategory}-${selectedUserGroup}`}
                  className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredTools.map((tool, index) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredTools.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-400 text-lg">
                    沒有找到符合條件的工具，請嘗試其他篩選條件。
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 