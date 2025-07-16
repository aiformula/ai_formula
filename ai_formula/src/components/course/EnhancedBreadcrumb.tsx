import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home, BookOpen, FileText, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface EnhancedBreadcrumbProps {
  items: BreadcrumbItem[];
  language: 'zh-HK' | 'en';
  className?: string;
}

const EnhancedBreadcrumb: React.FC<EnhancedBreadcrumbProps> = ({
  items,
  language,
  className = ''
}) => {
  const navigate = useNavigate();
  const isZhHK = language === 'zh-HK';

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.path && !item.isActive) {
      navigate(item.path);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`breadcrumb ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <div className="flex items-center space-x-2 flex-wrap">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Breadcrumb Item */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-2 ${
                item.isActive 
                  ? 'breadcrumb-current' 
                  : item.path 
                    ? 'breadcrumb-item'
                    : 'text-gray-400'
              }`}
              onClick={() => handleItemClick(item)}
            >
              {/* Icon */}
              {item.icon && (
                <span className={`w-4 h-4 ${
                  item.isActive ? 'text-white' : 'text-gray-400'
                }`}>
                  {item.icon}
                </span>
              )}
              
              {/* Label */}
              <span className={`text-sm font-medium transition-colors duration-200 ${
                item.isActive 
                  ? 'text-white' 
                  : item.path 
                    ? 'text-gray-300 hover:text-blue-400 cursor-pointer'
                    : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </motion.div>

            {/* Separator */}
            {index < items.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.05 }}
                className="breadcrumb-separator"
              >
                <ChevronRight className="w-3 h-3" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Additional Context Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 flex items-center space-x-4 text-xs text-gray-500"
      >
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
          <span>{isZhHK ? '你的位置' : 'You are here'}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Home className="w-3 h-3" />
          <span>{isZhHK ? '快速返回首頁' : 'Quick home access'}</span>
        </div>
      </motion.div>
    </motion.nav>
  );
};

// Helper function to create breadcrumb items for course pages
export const createCourseBreadcrumb = (
  themeId?: string,
  unitId?: string,
  language: 'zh-HK' | 'en' = 'zh-HK'
): BreadcrumbItem[] => {
  const isZhHK = language === 'zh-HK';
  
  const items: BreadcrumbItem[] = [
    {
      label: isZhHK ? '課程總覽' : 'Course Overview',
      path: '/courses/ai-business-automation',
      icon: <Home className="w-4 h-4" />
    }
  ];

  if (themeId) {
    items.push({
      label: isZhHK ? `第${themeId}大主題` : `Theme ${themeId}`,
      path: `/courses/ai-business-automation/theme/${themeId}`,
      icon: <BookOpen className="w-4 h-4" />
    });
  }

  if (unitId) {
    items.push({
      label: isZhHK ? `單元 ${unitId}` : `Unit ${unitId}`,
      icon: <FileText className="w-4 h-4" />,
      isActive: true
    });
  } else if (themeId) {
    items[items.length - 1].isActive = true;
  } else {
    items[0].isActive = true;
  }

  return items;
};

// Special breadcrumb for quiz pages
export const createQuizBreadcrumb = (
  themeId: string,
  language: 'zh-HK' | 'en' = 'zh-HK'
): BreadcrumbItem[] => {
  const isZhHK = language === 'zh-HK';
  
  return [
    {
      label: isZhHK ? '課程總覽' : 'Course Overview',
      path: '/courses/ai-business-automation',
      icon: <Home className="w-4 h-4" />
    },
    {
      label: isZhHK ? `第${themeId}大主題` : `Theme ${themeId}`,
      path: `/courses/ai-business-automation/theme/${themeId}`,
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      label: isZhHK ? '主題測驗' : 'Theme Quiz',
      icon: <Award className="w-4 h-4" />,
      isActive: true
    }
  ];
};

export default EnhancedBreadcrumb; 