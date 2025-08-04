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
    titleEn?: string; // Added for English title
    descriptionEn?: string; // Added for English description
  };
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  index 
}) => {
  const { t, language } = useLanguage(); // Get t function and language state
  
  // Language-aware title and description - Use direct language state
  const isEnglish = language === 'en-GB';
  const displayTitle = isEnglish && tool.titleEn ? tool.titleEn : tool.title;
  const displayDescription = isEnglish && tool.descriptionEn ? tool.descriptionEn : tool.description;

  // Defensive programming: ensure tool object exists and provide fallbacks
  const safeTitle = displayTitle || 'Unknown Tool';
  const safeDescription = displayDescription || 'No description available';
  const safeUrl = tool.url || '#';
  const safeImageUrl = tool.imageUrl || '/placeholder.svg';
  const safeImageAlt = tool.imageAlt || 'Tool Logo';

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  // 🛡️ 防禦性檢查：確保 tool 物件存在
  if (!tool) {
    console.warn('ToolCard: tool object is undefined');
    return null;
  }

  // Comprehensive mapping of Chinese targetAudience values to English keys
  const audienceMapping: { [key: string]: string } = {
    // Content & Media
    '內容創作者': 'content-creator',
    '博客作者': 'blogger',
    '播客主': 'podcaster',
    'YouTuber': 'youtuber',
    '社交媒體經理': 'social-media-manager',
    '社交媒體用戶': 'social-media-user',
    '文案撰寫人': 'copywriter',
    '記者': 'journalist',
    '編輯': 'editor',
    '影片編輯': 'video-editor',
    '影片創作者': 'video-creator',
    '影片製作者': 'video-producer',
    '影片製作人': 'video-producer',
    '視頻製作人': 'video-producer',
    '音樂創作者': 'music-creator',
    '音樂製作人': 'music-producer',
    '音頻工程師': 'audio-engineer',
    '音頻編輯師': 'audio-editor',
    '動畫師': 'animator',
    '視覺藝術家': 'visual-artist',
    '視覺特效藝術家': 'visual-effects-artist',
    '3D藝術家': '3d-artist',
    '3D 藝術家': '3d-artist',
    '電影製作人': 'filmmaker',
    '電影行業': 'film-industry',
    '專業導演': 'professional-director',
    '攝影師': 'photographer',
    '專業攝影師': 'professional-photographer',
    '攝影愛好者': 'photography-enthusiast',
    '修圖師': 'photo-editor',
    '媒體公司': 'media-company',
    '新聞機構': 'news-organization',
    '創意寫作者': 'creative-writer',
    '虛擬主播': 'virtual-streamer',
    '直播主': 'streamer',
    '故事創作者': 'storyteller',
    
    // Design & Art
    '插畫家': 'illustrator',
    '概念設計師': 'concept-designer',
    '藝術家': 'artist',
    '專業設計師': 'professional-designer',
    '平面設計師': 'graphic-designer',
    '網頁設計師': 'web-designer',
    '品牌設計師': 'brand-designer',
    '設計師': 'designer',
    '設計團隊': 'design-team',
    'UI/UX設計師': 'ui-ux-designer',
    'UI/UX 設計師': 'ui-ux-designer',
    'UI開發者': 'ui-developer',
    '數字藝術家': 'digital-artist',
    '創意工作者': 'creative-worker',
    '創意專業人士': 'creative-professional',
    '創意工作室': 'creative-studio',
    '創意總監': 'creative-director',
    '創意探索者': 'creative-explorer',
    '廣告創意人員': 'advertising-creative',
    '用戶體驗': 'user-experience',
    '互動設計師': 'interaction-designer',
    
    // Business & Marketing
    '企業家': 'entrepreneur',
    '創業者': 'startup-founder',
    '企業主': 'business-owner',
    '小企業主': 'small-business-owner',
    '小型企業主': 'small-business-owner', // Added this mapping
    '小型企業': 'small-business',
    '小企業': 'small-business',
    '營銷人員': 'marketer',
    '內容營銷人員': 'content-marketer',
    '內容營銷': 'content-marketing',
    '數字營銷人員': 'digital-marketer',
    '數字行銷人員': 'digital-marketer',
    '數字營銷': 'digital-marketing',
    '數碼營銷人員': 'digital-marketer',
    '數碼營銷機構': 'digital-marketing-agency',
    '品牌經理': 'brand-manager',
    '營銷團隊': 'marketing-team',
    '市場營銷團隊': 'marketing-team',
    '市場營銷人員': 'marketing-professional',
    '市場推廣人員': 'marketing-promoter',
    '市場研究': 'market-research',
    '品牌營銷人員': 'brand-marketing-specialist',
    '品牌營銷': 'brand-marketing',
    '品牌顧問': 'brand-consultant',
    '品牌團隊': 'brand-team',
    '銷售專業人員': 'sales-professional',
    '銷售人員': 'sales-personnel',
    '銷售團隊': 'sales-team',
    '顧問': 'consultant',
    '項目經理': 'project-manager',
    '產品經理': 'product-manager',
    '廣告公司': 'advertising-agency',
    '廣告人員': 'advertising-personnel',
    '企業用戶': 'enterprise-user',
    '企業': 'enterprise',
    '企業培訓': 'corporate-training',
    '企業培訓師': 'corporate-trainer',
    '企業培訓部門': 'corporate-training-department',
    'HR團隊': 'hr-team',
    '公司內訓': 'corporate-internal-training',
    '內容團隊': 'content-team',
    '企業營銷團隊': 'enterprise-marketing-team',
    '企業通訊部門': 'corporate-communications',
    '企業團隊': 'enterprise-team',
    '企業決策者': 'business-decision-maker',
    '企業分析師': 'business-analyst',
    '企業管理': 'enterprise-management',
    '企業支持': 'enterprise-support',
    '企業安全團隊': 'enterprise-security-team',
    '企業開發': 'enterprise-development',
    '企業顧問': 'business-consultant',
    '電商': 'e-commerce',
    '電商企業': 'e-commerce-business',
    '電商賣家': 'e-commerce-seller',
    '電商品牌': 'e-commerce-brand',
    '電商分析': 'ecommerce-analytics',
    '代理商': 'agency',
    '管理層': 'management',
    '團隊領導': 'team-leader',
    '財務團隊': 'finance-team',
    '客服團隊': 'customer-service-team',
    
    // Technology & Development  
    '開發者': 'developer',
    'Web開發者': 'web-developer',
    'Web 開發者': 'web-developer',
    '程式員': 'programmer',
    '程序員': 'programmer',
    '程式設計師': 'programmer',
    '軟體工程師': 'software-engineer',
    '軟件開發者': 'software-developer',
    '軟體開發者': 'software-developer',
    '網頁開發者': 'web-developer',
    '前端開發者': 'frontend-developer',
    '後端開發者': 'backend-developer',
    '全棧開發者': 'fullstack-developer',
    '應用程式開發者': 'app-developer',
    '遊戲開發者': 'game-developer',
    '學生開發者': 'student-developer',
    '數據科學家': 'data-scientist',
    '數據分析師': 'data-analyst',
    'ML工程師': 'ml-engineer',
    'ML 研究者': 'ml-researcher',
    'AI工程師': 'ai-engineer',
    'AI 工程師': 'ai-engineer',
    'AI開發者': 'ai-developer',
    '企業AI團隊': 'enterprise-ai-team',
    'AI研究員': 'ai-researcher',
    'AI愛好者': 'ai-enthusiast',
    '技術專業人員': 'tech-professional',
    '技術團隊': 'tech-team',
    '技術領導': 'tech-leader',
    '創意技術專家': 'creative-tech-specialist',
    'SEO專業人員': 'seo-specialist',
    'SEO 專業人員': 'seo-specialist',
    '網站管理員': 'website-administrator',
    '網站管理': 'website-management',
    '網絡保安專家': 'cybersecurity-specialist',
    '測試工程師': 'test-engineer',
    'CRM管理員': 'crm-administrator',
    'IT 管理員': 'it-administrator',
    'API開發': 'api-developer',
    '內部工具': 'internal-tools',
    '快速原型': 'rapid-prototyping',
    '快速開發': 'rapid-development',
    '原型設計': 'prototype-design',
    'SaaS公司': 'saas-company',
    '開發團隊': 'development-team',
    'Twitter (X) 創作者': 'twitter-creator',
    
    // Education & Research
    '教師': 'teacher',
    '老師': 'teacher',
    '教育工作者': 'educator',
    '學生': 'student',
    '研究人員': 'researcher',
    '學者': 'scholar',
    '課程開發者': 'curriculum-developer',
    '課程創作者': 'course-creator',
    '在線課程製作者': 'online-course-creator',
    '商業分析師': 'business-analyst',
    '分析師': 'analyst',
    '決策者': 'decision-maker',
    '商業智能': 'business-intelligence',
    '知識工作者': 'knowledge-worker',
    '寫作者': 'writer',
    '專業寫作者': 'professional-writer',
    '商業人士': 'business-professional',
    '團隊協作': 'team-collaboration',
    '教育機構': 'educational-institution',
    '學術寫作': 'academic-writing',
    '商業寫作': 'business-writing',
    '英語學習者': 'english-learner',
    '技術學習者': 'technical-learner',
    '教練': 'coach',
    
    // General Users
    '普通用戶': 'general-user',
    '個人用戶': 'individual-user',
    '個人創作者': 'personal-creator',
    '所有人': 'everyone',
    '預算有限用戶': 'budget-conscious-user',
    '初學者': 'beginner',
    '自由職業者': 'freelancer',
    '自由撰稿人': 'freelance-writer',
    '遠程工作者': 'remote-worker',
    '忙碌專業人士': 'busy-professional',
    '視障人士': 'visually-impaired',
    '遊戲玩家': 'gamer',
    '遊戲愛好者': 'gaming-enthusiast',
    '專業編輯師': 'professional-editor',
    '創始人': 'founder',
    '尋求職業發展的專業人士': 'career-development-professional',
    
    // Specific Use Cases
    '任何需要錄屏的人': 'anyone-needing-screen-recording',
    '任何需要開會的專業人士': 'meeting-professionals',
    '任何需要製作專業簡報的人': 'presentation-creators',
    '任何希望提高生產力的人': 'productivity-seekers',
    '任何使用多個網絡應用程式的人': 'multi-app-users',
    '任何需要快速建站的人': 'quick-website-builders',
    '任何需要快速獲取信息的人': 'information-seekers',
    '希望使用 AI 的小型企業': 'ai-interested-small-business'
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
                      if (language === 'zh-HK') { // zh-HK check
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
                        transition={{ duration: 0.2 }}
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