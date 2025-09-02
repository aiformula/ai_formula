import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { allTools, toolCategories, getToolsCount } from "@/data/tools-data";

const ToolsPage = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isZhTW = language === 'zh-HK';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // 篩選工具
  const filteredTools = selectedCategory === 'all' 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  // 獲取工具統計
  const toolsStats = getToolsCount();

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
              {isZhTW ? `${toolsStats.total} 個推薦 AI 工具` : `${toolsStats.total} Recommended AI Tools`}
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
            {isZhTW ? '最新 AI 工具合集' : 'Latest AI Tools Collection'}
          </h1>
          
          <p 
            className="text-gray-300 max-w-3xl mx-auto"
            style={{
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-relaxed)'
            }}
          >
            {isZhTW 
              ? '探索最新最強大的AI工具，從藝術創作到圖像增強，從AI記憶到影片生成，這些工具將革命性地提升你的工作效率和創作品質。'
              : 'Explore the latest and most powerful AI tools - from art creation to image enhancement, from AI memory to video generation. These tools will revolutionize your productivity and creative quality.'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {toolCategories.map((category) => {
            const categoryCount = category.id === 'all' 
              ? toolsStats.total 
              : toolsStats.byCategory[category.id as keyof typeof toolsStats.byCategory] || 0;
            
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`
                  ${selectedCategory === category.id 
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                    : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                  transition-all duration-300 flex items-center gap-2
                `}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-3) var(--space-6)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <span>{isZhTW ? category.label : category.labelEn}</span>
                <span className={`
                  px-2 py-1 rounded-full text-xs
                  ${selectedCategory === category.id 
                    ? 'bg-black/20 text-black' 
                    : 'bg-yellow-500/20 text-yellow-400'
                  }
                `}>
                  {categoryCount}
                </span>
              </Button>
            );
          })}
        </motion.div>

        {/* Tools Grid with ToolCard Component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredTools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6">
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
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-4">
                {isZhTW ? '該分類暫無工具' : 'No tools in this category yet'}
              </div>
              <Button
                onClick={() => setSelectedCategory('all')}
                className="bg-yellow-500 text-black hover:bg-yellow-400"
              >
                {isZhTW ? '查看全部工具' : 'View All Tools'}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-8 bg-gray-900/50 rounded-2xl px-8 py-6 border border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{toolsStats.byCategory.design}</div>
              <div className="text-sm text-gray-400">{isZhTW ? '設計工具' : 'Design Tools'}</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{toolsStats.byCategory.data}</div>
              <div className="text-sm text-gray-400">{isZhTW ? '數據工具' : 'Data Tools'}</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{toolsStats.byCategory.video}</div>
              <div className="text-sm text-gray-400">{isZhTW ? '影片工具' : 'Video Tools'}</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{toolsStats.total}</div>
              <div className="text-sm text-gray-400">{isZhTW ? '總計工具' : 'Total Tools'}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsPage; 