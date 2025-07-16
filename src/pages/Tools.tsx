import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Palette, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Tools = () => {
  const { t } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const tools = [
    {
      id: 'freepik',
      title: t('tools.freepik.title'),
      description: t('tools.freepik.description'),
      tag: t('tools.freepik.tag'),
      url: 'https://www.freepik.com/',
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      tagColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'mem0',
      title: t('tools.mem0.title'),
      description: t('tools.mem0.description'),
      tag: t('tools.mem0.tag'),
      url: 'https://mem0.ai/openmemory-mcp',
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      tagColor: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('tools.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('tools.subtitle')}
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 group">
                  <CardHeader className="pb-4">
                    <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center mb-4`}>
                      {tool.icon}
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2 group-hover:text-yellow-400 transition-colors">
                          {tool.title}
                        </CardTitle>
                        <Badge className={`${tool.tagColor} mb-3`}>
                          {tool.tag}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-6 leading-relaxed">
                      {tool.description}
                    </CardDescription>
                    <Button
                      onClick={() => window.open(tool.url, '_blank')}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition-all duration-300 group-hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {tool.id === 'freepik' ? t('tools.freepik.visitSite') : t('tools.mem0.visitSite')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools; 