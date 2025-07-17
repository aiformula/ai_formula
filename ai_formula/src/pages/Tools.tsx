import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Palette, Brain, Video, Database, Wand2, Sparkles, Film, Users, Zap, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Tools = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const tools = [
    // Design Tools
    {
      id: 'freepik',
      title: t('tools.freepik.title'),
      description: t('tools.freepik.description'),
      tag: t('tools.freepik.tag'),
      url: 'https://www.freepik.com/',
      icon: <img 
        src="/aitools/freepik.png" 
        alt="Freepik" 
        className="w-52 h-42 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-blue-100 text-blue-800',
      category: 'design'
    },
    
    // Data Tools
    {
      id: 'mem0',
      title: t('tools.mem0.title'),
      description: t('tools.mem0.description'),
      tag: t('tools.mem0.tag'),
      url: 'https://mem0.ai/openmemory-mcp',
      icon: <img 
        src="/aitools/mem0.jpg" 
        alt="Mem0" 
        className="w-52 h-42 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-blue-100 text-blue-800',
      category: 'data'
    },
    {
      id: 'chat4data',
      title: t('tools.chat4data.title'),
      description: t('tools.chat4data.description'),
      tag: t('tools.chat4data.tag'),
      url: 'https://chat4data.ai/',
      icon: <img 
        src="/aitools/chat4data.png" 
        alt="Chat4Data" 
        className="w-32 h-32 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-green-100 text-green-800',
      category: 'data'
    },
    
    // AI Video Tools
    {
      id: 'hailuo',
      title: t('tools.hailuo.title'),
      description: t('tools.hailuo.description'),
      tag: t('tools.hailuo.tag'),
      url: 'https://hailuoai.video/',
      icon: <img 
        src="/aitools/hailuo.png" 
        alt="Hailuo AI" 
        className="w-40 h-32 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-red-100 text-red-800',
      category: 'video'
    },
    {
      id: 'higgsfield',
      title: t('tools.higgsfield.title'),
      description: t('tools.higgsfield.description'),
      tag: t('tools.higgsfield.tag'),
      url: 'https://higgsfield.ai/',
      icon: <img 
        src="/aitools/Higgsfield.png" 
        alt="Higgsfield AI" 
        className="w-52 h-42 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-purple-100 text-purple-800',
      category: 'video'
    },
    {
      id: 'unstableml',
      title: t('tools.unstableml.title'),
      description: t('tools.unstableml.description'),
      tag: t('tools.unstableml.tag'),
      url: 'https://unstableml.com/',
      icon: <img 
        src="/aitools/UnstableML.png" 
        alt="UnstableML" 
        className="w-32 h-32 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-cyan-100 text-cyan-800',
      category: 'video'
    },
    {
      id: '4dv',
      title: t('tools.4dv.title'),
      description: t('tools.4dv.description'),
      tag: t('tools.4dv.tag'),
      url: 'https://www.4dv.ai/',
      icon: <img 
        src="/aitools/4DV.jpg" 
        alt="4DV.AI" 
        className="w-40 h-32 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-indigo-100 text-indigo-800',
      category: 'video'
    },
    {
      id: 'seaweedapt',
      title: t('tools.seaweedapt.title'),
      description: t('tools.seaweedapt.description'),
      tag: t('tools.seaweedapt.tag'),
      url: 'https://seaweed-apt.com/2',
      icon: <img 
        src="/aitools/seaweed.png" 
        alt="Seaweed APT2" 
        className="w-52 h-42 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-teal-100 text-teal-800',
      category: 'video'
    },
    
    // Marketing Tools
    {
      id: 'headai',
      title: t('tools.headai.title'),
      description: t('tools.headai.description'),
      tag: t('tools.headai.tag'),
      url: 'https://headai.io/',
      icon: <img 
        src="/aitools/headai.png" 
        alt="Head AI" 
        className="w-52 h-42 object-contain"
      />,
      bgGradient: 'from-transparent to-transparent',
      tagColor: 'bg-orange-100 text-orange-800',
      category: 'marketing'
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* 🎯 使用統一的頁面內容類替換自定義padding */}
      <div 
        className="container mx-auto px-4 py-8 page-content"
        style={{
          paddingBottom: 'var(--space-16)', // 64px 頁面底部間距
          paddingLeft: 'var(--space-4)', // 16px 左右間距
          paddingRight: 'var(--space-4)'
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ marginBottom: 'var(--space-16)' }} // 64px 標題下方間距
        >
          <h1 
            className="font-bold text-white"
            style={{
              fontSize: 'var(--text-6xl)', // 60px H2 標題
              fontWeight: 'var(--font-bold)',
              lineHeight: 'var(--leading-tight)',
              marginBottom: 'var(--space-6)' // 24px 標題下間距
            }}
          >
            {/* 🎯 修復本地化標題 - 中文顯示"實用工具"，英文顯示"Useful Tools" */}
            {t('tools.title')}
          </h1>
          <p 
            className="text-gray-300 max-w-3xl mx-auto"
            style={{
              fontSize: 'var(--text-xl)', // 20px 副標題
              fontWeight: 'var(--font-normal)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            {language === 'zh-HK' 
              ? '發現強大的AI工具，提升您的生產力和創造力' 
              : 'Discover powerful AI tools to boost your productivity and creativity'
            }
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center"
          style={{ 
            gap: 'var(--space-3)', // 12px 按鈕間距
            marginBottom: 'var(--space-12)' // 48px 下方間距
          }}
        >
          {toolCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                  : 'border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500'
              }`}
            >
              {/* 🎯 修復分類標籤本地化 */}
              {language === 'zh-HK' ? category.label : category.labelEn}
            </Button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
          style={{ gap: 'var(--space-6)' }} // 24px 卡片間距
        >
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              {...fadeIn}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 group h-full"
                style={{
                  borderRadius: 'var(--radius-lg)', // 12px 統一卡片圓角
                  backgroundColor: 'rgba(17, 24, 39, 0.5)' // 統一卡片背景
                }}
              >
                <CardHeader style={{ padding: 'var(--card-padding-md) var(--card-padding-md) var(--space-4)' }}>
                  <div 
                    className={`w-full h-28 rounded-lg bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center border border-gray-600/30`}
                    style={{
                      borderRadius: 'var(--radius-md)', // 8px 圖標容器圓角
                      marginBottom: 'var(--space-4)', // 16px 下方間距
                      height: '112px' // 固定高度以保持一致性
                    }}
                  >
                    {tool.icon}
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle 
                        className="text-white group-hover:text-yellow-400 transition-colors line-clamp-2"
                        style={{
                          fontSize: 'var(--text-lg)', // 18px 工具標題
                          fontWeight: 'var(--font-semibold)',
                          marginBottom: 'var(--space-3)' // 12px 標題下間距
                        }}
                      >
                        {tool.title}
                      </CardTitle>
                      <Badge 
                        className="bg-gray-700/80 text-gray-200 border border-gray-600/50"
                        style={{
                          fontSize: 'var(--text-xs)', // 12px badge 文字
                          padding: 'var(--space-1) var(--space-3)', // 4px 12px badge 內邊距
                          marginBottom: 'var(--space-3)' // 12px 下方間距
                        }}
                      >
                        {tool.tag}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent style={{ paddingTop: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                  <CardDescription 
                    className="text-gray-300 leading-relaxed"
                    style={{
                      fontSize: 'var(--text-sm)', // 14px 描述文字
                      lineHeight: 'var(--leading-relaxed)',
                      marginBottom: 'var(--space-4)' // 16px 下方間距
                    }}
                  >
                    {tool.description}
                  </CardDescription>
                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)' }}>
                    <Button
                      onClick={() => window.open(tool.url, '_blank')}
                      className="w-full bg-gray-800/50 hover:bg-yellow-500 border border-gray-700/50 hover:border-yellow-400 text-gray-200 hover:text-black font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 backdrop-blur-sm"
                      style={{
                        height: 'var(--btn-height-md)', // 40px 按鈕高度
                        fontSize: 'var(--text-sm)', // 14px 按鈕文字
                        fontWeight: 'var(--font-medium)',
                        borderRadius: 'var(--radius-xl)' // 16px 按鈕圓角
                      }}
                    >
                      <ExternalLink 
                        style={{ 
                          width: 'var(--space-4)', 
                          height: 'var(--space-4)',
                          marginRight: 'var(--space-2)' 
                        }} 
                      />
                      <span className="transition-colors duration-300">
                        {t(`tools.${tool.id}.visitSite`)}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools; 