import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

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
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  index 
}) => {
  const { t } = useLanguage();
  
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

  // Comprehensive mapping of Chinese targetAudience values to English keys
  const audienceMapping: { [key: string]: string } = {
    // Creative & Design
    '數字藝術家': 'digital-artist',
    '概念設計師': 'concept-designer', 
    '插畫家': 'illustrator',
    '創意總監': 'creative-director',
    '專業設計師': 'professional-designer',
    '平面設計師': 'graphic-designer',
    '品牌設計師': 'brand-designer',
    '設計師': 'designer',
    '藝術家': 'artist',
    '創意工作者': 'creative-worker',
    'UI/UX設計師': 'ui-ux-designer',
    '攝影師': 'photographer',
    
    // Content & Media
    '內容創作者': 'content-creator',
    '博客作者': 'blogger',
    '播客主': 'podcaster',
    'YouTuber': 'youtuber',
    'youtuber': 'youtuber',
    '社交媒體經理': 'social-media-manager',
    '文案撰寫人': 'copywriter',
    '記者': 'journalist',
    '編輯': 'editor',
    '影片編輯': 'video-editor',
    '電影製作人': 'filmmaker',
    '營銷內容創作者': 'marketing-content-creator',
    '自由攝影人': 'freelance-photographer',
    
    // Business & Marketing
    '企業家': 'entrepreneur',
    '創業者': 'startup-founder',
    '企業主': 'business-owner',
    '營銷人員': 'marketer',
    '銷售專業人員': 'sales-professional',
    '顧問': 'consultant',
    '自由職業者': 'freelancer',
    '項目經理': 'project-manager',
    '產品經理': 'product-manager',
    '廣告公司': 'advertising-agency',
    '品牌團隊': 'brand-team',
    '市場營銷人員': 'marketing-professional',
    
    // Technology & Development
    '開發者': 'developer',
    '程式員': 'programmer',
    '軟體工程師': 'software-engineer',
    '網頁開發者': 'web-developer',
    '應用程式開發者': 'app-developer',
    '數據科學家': 'data-scientist',
    'AI研究員': 'ai-researcher',
    '技術專業人員': 'tech-professional',
    '研究人員': 'researcher',
    'AI愛好者': 'ai-enthusiast',
    '創意探索者': 'creative-explorer',
    
    // Education & Research  
    '教師': 'teacher',
    '教育工作者': 'educator',
    '學生': 'student',
    '學者': 'academic',
    '培訓師': 'trainer',
    
    // Other Professionals
    '分析師': 'analyst',
    '經理': 'manager',
    '主管': 'executive',
    '管理員': 'administrator',
    '助理': 'assistant',
    '小企業主': 'small-business-owner',
    '企業決策者': 'business-decision-maker'
  };

  // Helper function to convert targetAudience to userTags keys using mapping
  const convertToUserTagKey = (audience: string): string => {
    // First try direct mapping for Chinese text
    if (audienceMapping[audience]) {
      return audienceMapping[audience];
    }
    
    // If no mapping found, create a key from the text
    return audience
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/&/g, '')
      .replace(/\//g, '-')
      .replace(/[()]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Pastel color palette for user tags
  const pastelColors = [
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-yellow-100 text-yellow-800 border-yellow-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-violet-100 text-violet-800 border-violet-200'
  ];

  // Function to get consistent color for a tag
  const getTagColor = (tag: string, index: number): string => {
    const hash = tag.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return pastelColors[Math.abs(hash + index) % pastelColors.length];
  };

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

          {/* Target Audience Section - 統一高度，彩色用戶標籤 */}
          {tool.targetAudience && tool.targetAudience.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-white">
                  {t('label.targetUsers')}
                </span>
              </div>
              
              {/* Fixed Height Container for Consistent Card Heights */}
              <div className="h-20 overflow-hidden">
                {/* User Tags with Pastel Colors */}
                <div className="flex flex-wrap gap-2">
                  {tool.targetAudience.map((audience, index) => {
                    const tagKey = convertToUserTagKey(audience);
                    
                    // Try to get translation using the t function
                    let translatedTag = t(`userTags.${tagKey}`);
                    
                    // If translation is not found (returns the key), use fallback logic
                    if (translatedTag === `userTags.${tagKey}`) {
                      // For Chinese language, return original Chinese text
                      // For English language, try to provide English fallback
                      if (t('nav.home') === '首頁') { // zh-HK check
                        translatedTag = audience; // Return original Chinese
                      } else {
                        // English fallback mapping
                        const englishFallbacks: { [key: string]: string } = {
                          'digital-artist': 'Digital Artist',
                          'concept-designer': 'Concept Designer',
                          'illustrator': 'Illustrator',
                          'creative-director': 'Creative Director',
                          'professional-designer': 'Professional Designer',
                          'graphic-designer': 'Graphic Designer',
                          'brand-designer': 'Brand Designer',
                          'designer': 'Designer',
                          'artist': 'Artist',
                          'creative-worker': 'Creative Worker',
                          'ui-ux-designer': 'UI/UX Designer',
                          'photographer': 'Photographer',
                          'content-creator': 'Content Creator',
                          'blogger': 'Blogger',
                          'podcaster': 'Podcaster',
                          'youtuber': 'YouTuber',
                          'social-media-manager': 'Social Media Manager',
                          'copywriter': 'Copywriter',
                          'journalist': 'Journalist',
                          'editor': 'Editor',
                          'video-editor': 'Video Editor',
                          'filmmaker': 'Filmmaker',
                          'freelance-photographer': 'Freelance Photographer',
                          'entrepreneur': 'Entrepreneur',
                          'startup-founder': 'Startup Founder',
                          'business-owner': 'Business Owner',
                          'marketer': 'Marketer',
                          'sales-professional': 'Sales Professional',
                          'consultant': 'Consultant',
                          'freelancer': 'Freelancer',
                          'project-manager': 'Project Manager',
                          'product-manager': 'Product Manager',
                          'advertising-agency': 'Advertising Agency',
                          'brand-team': 'Brand Team',
                          'marketing-professional': 'Marketing Professional',
                          'developer': 'Developer',
                          'programmer': 'Programmer',
                          'software-engineer': 'Software Engineer',
                          'web-developer': 'Web Developer',
                          'app-developer': 'App Developer',
                          'data-scientist': 'Data Scientist',
                          'ai-researcher': 'AI Researcher',
                          'tech-professional': 'Tech Professional',
                          'researcher': 'Researcher',
                          'ai-enthusiast': 'AI Enthusiast',
                          'creative-explorer': 'Creative Explorer',
                          'teacher': 'Teacher',
                          'educator': 'Educator',
                          'student': 'Student',
                          'academic': 'Academic',
                          'trainer': 'Trainer',
                          'analyst': 'Analyst',
                          'manager': 'Manager',
                          'executive': 'Executive',
                          'administrator': 'Administrator',
                          'assistant': 'Assistant',
                          'small-business-owner': 'Small Business Owner',
                          'business-decision-maker': 'Business Decision Maker'
                        };
                        
                        translatedTag = englishFallbacks[tagKey] || audience;
                      }
                    }
                    
                    const colorClass = getTagColor(audience, index);

                    // Debug logging in development
                    if (process.env.NODE_ENV === 'development') {
                      console.log(`Original: "${audience}" -> Key: "${tagKey}" -> Translation: "${translatedTag}"`);
                    }

                    return (
                      <motion.div
                        key={`${tool.id}-audience-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-medium
                          border backdrop-blur-sm
                          transition-all duration-300 cursor-default
                          ${colorClass}
                        `}
                      >
                        <div className="relative">
                          {translatedTag}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
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
                {t('button.visitWebsite')}
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