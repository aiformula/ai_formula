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
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true); // 改為單一控制所有篩選器
  const isZhTW = language === 'zh-HK';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Use tools directly from the unified data source (101 tools)
  const tools = allTools;

  // 🛡️ 防禦性檢查：過濾掉任何可能為 undefined 的工具
  const validTools = tools.filter(tool => tool && tool.id && tool.title && tool.imageUrl);

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

  // 動態圖標映射：根據新的12分類系統，增加顏色區分
  const getFunctionIcon = (categoryId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'all': <Wand2 className="h-4 w-4 text-gray-400" />,
      'ai-drawing': <Palette className="h-4 w-4 text-pink-400" />,
      'video-generation': <Video className="h-4 w-4 text-purple-400" />,
      'video-editing': <Film className="h-4 w-4 text-blue-400" />,
      'image-editing': <Wand2 className="h-4 w-4 text-green-400" />,
      'ai-avatar': <Users className="h-4 w-4 text-indigo-400" />,
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

  // 顯示類別控制 - 統一管理，預設展開更多
  const displayedCategories = isFiltersExpanded 
    ? smartSortedCategories 
    : smartSortedCategories.slice(0, 5); // 收起時顯示前5個最重要的

  const displayedUserGroups = isFiltersExpanded 
    ? smartSortedUserGroups 
    : smartSortedUserGroups.slice(0, 4); // 收起時顯示前4個最重要的

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* 標題區域 */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI 工具庫
              <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-2">
                {validTools.length}個精選AI工具，提升您的工作效率
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              從AI繪圖到程式開發，從內容創作到數據分析，找到最適合您需求的AI工具。
              {filteredTools.length !== validTools.length && (
                <span className="block mt-2 text-lg text-blue-400">
                  目前顯示 {filteredTools.length} 個工具
                </span>
              )}
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左側篩選器 - 圓角卡片風格設計 */}
            <motion.div 
              className="w-full lg:w-1/4 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 篩選器標題卡片 */}
              <div className="mb-6">
                <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                        <Filter className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">智能篩選器</h2>
                        <p className="text-xs text-gray-400">選擇工具類型或用戶角色</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                      className="text-orange-400 hover:text-orange-300 hover:bg-gray-700/50 rounded-lg px-3 py-1"
                    >
                      {isFiltersExpanded ? '收起' : '展開'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* 可摺疊的篩選內容 */}
              <AnimatePresence>
                {isFiltersExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-6"
                  >
                    {/* 工具分類篩選 - 圓角卡片風格 */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-4 px-2">工具類型</h3>
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
                                    {isZhTW ? category.label : category.labelEn}
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
                        
                        {/* 顯示更多按鈕 */}
                        {smartSortedCategories.length > 5 && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer"
                            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                          >
                            <div className="rounded-2xl p-4 bg-gray-800/30 border border-gray-700/40 hover:bg-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-md">
                              <div className="flex items-center justify-center">
                                <span className="text-orange-400 font-medium text-sm">
                                  顯示更多 (+{smartSortedCategories.length - 5})
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* 用戶群體篩選 - 同樣的圓角卡片風格 */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-4 px-2">用戶角色</h3>
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
                                    {isZhTW ? group.label : group.labelEn}
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
                        
                        {/* 顯示更多按鈕 */}
                        {smartSortedUserGroups.length > 4 && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer"
                            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                          >
                            <div className="rounded-2xl p-4 bg-gray-800/30 border border-gray-700/40 hover:bg-gray-700/30 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-md">
                              <div className="flex items-center justify-center">
                                <span className="text-blue-400 font-medium text-sm">
                                  顯示更多 (+{smartSortedUserGroups.length - 4})
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 右側工具網格 */}
            <div className="lg:w-3/4">
              {/* 結果統計 */}
              <motion.div 
                className="mb-6 flex justify-between items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-400">
                  {selectedCategory !== 'all' && selectedUserGroup === 'all-users' && (
                    <>顯示 <span className="text-white font-semibold">{smartSortedCategories.find(c => c.id === selectedCategory)?.label}</span> 分類的 <span className="text-white font-semibold">{filteredTools.length}</span> 個工具</>
                  )}
                  {selectedUserGroup !== 'all-users' && selectedCategory === 'all' && (
                    <>顯示適合 <span className="text-white font-semibold">{smartSortedUserGroups.find(g => g.id === selectedUserGroup)?.label}</span> 的 <span className="text-white font-semibold">{filteredTools.length}</span> 個工具</>
                  )}
                  {selectedCategory === 'all' && selectedUserGroup === 'all-users' && (
                    <>顯示 <span className="text-white font-semibold">全部 {filteredTools.length}</span> 個工具</>
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
                    清除篩選
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
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <ToolCard
                        tool={tool}
                        visitButtonText="🌐 Visit Website"
                        targetAudienceLabel={isZhTW ? "目標用戶" : "Target Audience"}
                        index={index}
                      />
                    </motion.div>
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