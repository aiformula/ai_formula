import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ToolCardProps {
  tool: {
    id: string;
    title: string;
    description: string;
    tag: string;
    tags?: string[]; // 保留用於過濾功能
    url: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    categories?: string[]; // 保留用於過濾功能
    targetAudience?: string[];
    userGroups?: string[];
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
    transition: { duration: 0.5, delay: index * 0.1 }
  };

  // 🛡️ 防禦性檢查：確保 tool 物件存在
  if (!tool) {
    console.warn('ToolCard: tool object is undefined');
    return null;
  }

  // 🛡️ 防禦性檢查：確保必要屬性存在
  const safeImageUrl = tool.imageUrl || '/placeholder.svg';
  const safeImageAlt = tool.imageAlt || `${tool.title} Logo`;
  const safeTitle = tool.title || 'Unknown Tool';
  const safeDescription = tool.description || 'No description available';
  const safeUrl = tool.url || '#';

  return (
    <motion.div 
      {...fadeIn}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-gray-800/90 border-gray-700/50 backdrop-blur-sm">
        {/* Logo Container */}
        <div className="relative w-full h-48 bg-gray-900/50 overflow-hidden">
          <img
            src={safeImageUrl}
            alt={safeImageAlt}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>

        {/* Content Area */}
        <CardContent className="flex-1 flex flex-col p-6 bg-gray-800/90">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight mb-3">
              {safeTitle}
            </h3>
          </div>

          <div className="mb-4 flex-1">
            <p className="text-sm leading-relaxed text-gray-300 line-clamp-3">
              {safeDescription}
            </p>
          </div>

          {/* Target Audience Section */}
          {tool.targetAudience && tool.targetAudience.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-white">
                  {targetAudienceLabel}
                </span>
              </div>
              <ul className="space-y-1.5">
                {tool.targetAudience.slice(0, 3).map((audience, idx) => (
                  <li key={idx} className="text-xs flex items-center gap-2 font-medium text-gray-300">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                    {audience}
                  </li>
                ))}
                {tool.targetAudience.length > 3 && (
                  <li className="text-xs flex items-center gap-2 font-medium text-gray-300">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                    +{tool.targetAudience.length - 3} 更多
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-auto">
            <Button
              onClick={() => window.open(safeUrl, '_blank')}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              訪問 {safeTitle.split(' - ')[0] || 'Website'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolCard; 