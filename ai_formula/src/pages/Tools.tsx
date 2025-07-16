import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Palette, Brain, Video, Database, Wand2, Sparkles, Film, Users, Zap, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Tools = () => {
  const { t } = useLanguage();
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

  const allTools = [
    // Design Tools
    {
      id: 'freepik',
      category: 'design',
      title: t('tools.freepik.title'),
      description: t('tools.freepik.description'),
      tag: t('tools.freepik.tag'),
      url: 'https://www.freepik.com/',
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      tagColor: 'bg-purple-100 text-purple-800'
    },
    
    // Data Tools
    {
      id: 'mem0',
      category: 'data',
      title: t('tools.mem0.title'),
      description: t('tools.mem0.description'),
      tag: t('tools.mem0.tag'),
      url: 'https://mem0.ai/openmemory-mcp',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      tagColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'chat4data',
      category: 'data',
      title: t('tools.chat4data.title'),
      description: t('tools.chat4data.description'),
      tag: t('tools.chat4data.tag'),
      url: 'https://chat4data.ai/',
      icon: <Database className="w-8 h-8 text-green-500" />,
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      tagColor: 'bg-green-100 text-green-800'
    },
    
    // AI Video Tools
    {
      id: 'hailuo',
      category: 'video',
      title: t('tools.hailuo.title'),
      description: t('tools.hailuo.description'),
      tag: t('tools.hailuo.tag'),
      url: 'https://hailuoai.video/',
      icon: <Video className="w-8 h-8 text-red-500" />,
      bgGradient: 'from-red-500/20 to-orange-500/20',
      tagColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'higgsfield',
      category: 'video',
      title: t('tools.higgsfield.title'),
      description: t('tools.higgsfield.description'),
      tag: t('tools.higgsfield.tag'),
      url: 'https://higgsfield.ai/',
      icon: <Wand2 className="w-8 h-8 text-purple-600" />,
      bgGradient: 'from-purple-600/20 to-pink-600/20',
      tagColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'unstableml',
      category: 'video',
      title: t('tools.unstableml.title'),
      description: t('tools.unstableml.description'),
      tag: t('tools.unstableml.tag'),
      url: 'https://unstableml.com/',
      icon: <Users className="w-8 h-8 text-cyan-500" />,
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      tagColor: 'bg-cyan-100 text-cyan-800'
    },
    {
      id: '4dv',
      category: 'video',
      title: t('tools.4dv.title'),
      description: t('tools.4dv.description'),
      tag: t('tools.4dv.tag'),
      url: 'https://www.4dv.ai/',
      icon: <Film className="w-8 h-8 text-indigo-500" />,
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      tagColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      id: 'seaweedapt',
      category: 'video',
      title: t('tools.seaweedapt.title'),
      description: t('tools.seaweedapt.description'),
      tag: t('tools.seaweedapt.tag'),
      url: 'https://seaweed-apt.com/2',
      icon: <Sparkles className="w-8 h-8 text-teal-500" />,
      bgGradient: 'from-teal-500/20 to-emerald-500/20',
      tagColor: 'bg-teal-100 text-teal-800'
    },
    
    // Marketing Tools
    {
      id: 'headai',
      category: 'marketing',
      title: t('tools.headai.title'),
      description: t('tools.headai.description'),
      tag: t('tools.headai.tag'),
      url: 'https://headai.io/',
      icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
      bgGradient: 'from-orange-500/20 to-red-500/20',
      tagColor: 'bg-orange-100 text-orange-800'
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 opacity-50"></div>
        <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-yellow-200 bg-clip-text text-transparent">
              {t('tools.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('tools.subtitle')}
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {toolCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-2.5 font-medium transition-all duration-300 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:from-yellow-400 hover:to-yellow-300 border-0 shadow-lg shadow-yellow-500/25'
                    : 'border-2 border-gray-600 text-gray-200 bg-gray-800/50 hover:border-yellow-500/70 hover:text-yellow-300 hover:bg-yellow-500/10 backdrop-blur-sm'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/80 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 group backdrop-blur-sm overflow-hidden min-h-[400px] flex flex-col">
                  <CardHeader className="pb-4">
                    <div className={`w-full h-28 rounded-lg bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center mb-4 border border-gray-600/30`}>
                      {tool.icon}
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-gray-100 text-lg mb-3 group-hover:text-yellow-300 transition-colors line-clamp-2 font-semibold">
                          {tool.title}
                        </CardTitle>
                        <Badge className="bg-gray-700/80 text-gray-200 border border-gray-600/50 mb-3 px-3 py-1">
                          {tool.tag}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col flex-1 justify-between">
                    <CardDescription className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {tool.description}
                    </CardDescription>
                    <div className="mt-auto pt-4">
                      <Button
                        onClick={() => window.open(tool.url, '_blank')}
                        className="w-full bg-gray-800/50 hover:bg-yellow-500 border border-gray-700/50 hover:border-yellow-400 text-gray-200 hover:text-black font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 py-3 rounded-xl group/btn backdrop-blur-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        <span className="transition-colors duration-300">{t(`tools.${tool.id}.visitSite`)}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 