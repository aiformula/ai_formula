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
      <Card className="h-full flex flex-col overflow-hidden bg-black border-gray-700/50 backdrop-blur-sm">
        {/* Logo Container - 純黑色背景 */}
        <div className="relative w-full h-48 bg-black overflow-hidden">
          <img
            src={safeImageUrl}
            alt={safeImageAlt}
            className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>

        {/* Content Area - 純黑色背景 */}
        <CardContent className="flex-1 flex flex-col p-6 bg-black">
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

          {/* Target Audience Section - 簡化顯示，移除標籤 */}
          {tool.targetAudience && tool.targetAudience.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-white">
                  {targetAudienceLabel}
                </span>
              </div>
              <div className="text-xs text-gray-300">
                {tool.targetAudience.slice(0, 2).join(' • ')}
                {tool.targetAudience.length > 2 && ' • ...'}
              </div>
            </div>
          )}

          {/* CTA Button - 黃色霓虹邊框風格 */}
          <div className="mt-auto">
            <button
              onClick={() => window.open(safeUrl, '_blank')}
              className="
                w-full py-3 px-4 rounded-xl font-semibold text-sm
                bg-black/40 backdrop-blur-md
                border-2 border-yellow-400/60
                text-yellow-400
                hover:border-yellow-300/80 hover:text-yellow-300
                hover:shadow-lg hover:shadow-yellow-400/20
                transition-all duration-300
                group
              "
            >
              <div className="flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                訪問 {safeTitle.split(' - ')[0] || 'Website'}
              </div>
              {/* 霓虹光暈效果 */}
              <div className="absolute inset-0 rounded-xl bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ToolCard; 