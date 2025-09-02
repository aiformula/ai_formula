import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  avatarColor: string;
  title: string;
  titleCht?: string;
  tags: string[];
  tagsCht?: string[];
  experience: string;
  experienceCht?: string;
  journey: string;
  journeyCht?: string;
  philosophy: string;
  philosophyCht?: string;
  impact_points: string[];
  impact_points_cht?: string[];
  isChineseVersion?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  avatarColor,
  title,
  titleCht,
  tags,
  tagsCht,
  experience,
  experienceCht,
  journey,
  journeyCht,
  philosophy,
  philosophyCht,
  impact_points,
  impact_points_cht,
  isChineseVersion = false,
}) => {
  // 根據語言版本選擇內容
  const displayTitle = isChineseVersion && titleCht ? titleCht : title;
  const displayTags = isChineseVersion && tagsCht ? tagsCht : tags;
  const displayExperience = isChineseVersion && experienceCht ? experienceCht : experience;
  const displayJourney = isChineseVersion && journeyCht ? journeyCht : journey;
  const displayPhilosophy = isChineseVersion && philosophyCht ? philosophyCht : philosophy;
  const displayImpactPoints = isChineseVersion && impact_points_cht ? impact_points_cht : impact_points;

  return (
    <motion.div
      className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
    >
      {/* 背景漸變效果 */}
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${avatarColor}20 0%, transparent 50%)`
        }}
      />

      {/* 卡片頭部 */}
      <div className="relative z-10 mb-6">
        <div className="flex items-start gap-4 mb-4">
          {/* 頭像 */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: avatarColor }}
          >
            <User className="w-8 h-8" />
          </div>
          
          {/* 姓名和職位 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 leading-tight">
              {name}
            </h3>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {displayTitle}
            </p>
            
            {/* 技能標籤 */}
            <div className="flex flex-wrap gap-2 mb-2">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full border"
                  style={{
                    borderColor: avatarColor,
                    color: avatarColor,
                    backgroundColor: `${avatarColor}15`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* 經驗年資 */}
          <div className="text-right">
            <div 
              className="text-sm font-semibold px-3 py-1 rounded-lg"
              style={{
                color: avatarColor,
                backgroundColor: `${avatarColor}20`
              }}
            >
              {displayExperience}
            </div>
          </div>
        </div>
      </div>

      {/* 卡片主體 */}
      <div className="relative z-10 space-y-4">
        {/* 專業旅程 */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
            {isChineseVersion ? '專業旅程' : 'Professional Journey'}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {displayJourney}
          </p>
        </div>

        {/* 教學理念 */}
        <div className="relative">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
            {isChineseVersion ? '教學理念' : 'Teaching Philosophy'}
          </h4>
          <div 
            className="border-l-4 pl-4 py-2"
            style={{ borderColor: avatarColor }}
          >
            <p className="text-gray-200 text-sm italic leading-relaxed">
              {displayPhilosophy}
            </p>
          </div>
        </div>

        {/* AI 轉型影響力 */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            {isChineseVersion ? 'AI 轉型影響力' : 'AI Transformation Impact'}
          </h4>
          <ul className="space-y-2">
            {displayImpactPoints.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-sm text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: avatarColor }}
                />
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard; 