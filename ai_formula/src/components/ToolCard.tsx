import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    tag: string;
    url: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    targetAudience?: string[];
  };
  visitButtonText: string;
  targetAudienceLabel: string;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  visitButtonText, 
  targetAudienceLabel,
  index 
}) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 }
  };

  // 根據分類設置標籤顏色
  const getTagColor = (category: string) => {
    switch (category) {
      case 'design':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'data':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'video':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'marketing':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <motion.div {...fadeIn}>
      <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 group h-full flex flex-col overflow-hidden">
        
        {/* 🎯 第一步：固定尺寸圖片容器 - 解決尺寸不一問題 */}
        <div className="relative w-full h-48 bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          <img
            src={tool.imageUrl}
            alt={tool.imageAlt}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>

        {/* 卡片內容區域 */}
        <div className="flex-1 flex flex-col p-6">
          
          {/* 🎯 第二步 a: 工具名稱 */}
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-3 line-clamp-2">
            {tool.title}
          </h3>

          {/* 🎯 第二步 b: 標籤 */}
          <div className="mb-4">
            <Badge 
              className={`${getTagColor(tool.category)} border text-xs font-medium px-3 py-1`}
            >
              {tool.tag}
            </Badge>
          </div>

          {/* 🎯 第二步 c: 簡介 */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
            {tool.description}
          </p>

          {/* 🎯 第二步 d: 適用對象列表 (新功能) */}
          {tool.targetAudience && tool.targetAudience.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">
                  {targetAudienceLabel}
                </span>
              </div>
              <ul className="space-y-1">
                {tool.targetAudience.map((audience, idx) => (
                  <li key={idx} className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full flex-shrink-0"></span>
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 🎯 第二步 e: 行動呼籲按鈕 */}
          <div className="mt-auto">
            <Button
              onClick={() => window.open(tool.url, '_blank')}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-semibold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 border-0"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {visitButtonText}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ToolCard; 