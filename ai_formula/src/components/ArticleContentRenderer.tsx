import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { type ArticleSection } from "@/data/blog/articleContent";
import React from "react";

interface ArticleContentRendererProps {
  sections: ArticleSection[];
  isZhTW: boolean;
}

interface SectionRendererProps {
  section: ArticleSection;
  isZhTW: boolean;
  index: number;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ section, isZhTW, index }) => {
  const getContent = (section: ArticleSection): string | string[] => {
    return isZhTW ? section.content : (section.contentEn || section.content);
  };

  const getItems = (section: ArticleSection): string[] => {
    return isZhTW ? (section.items || []) : (section.itemsEn || section.items || []);
  };

  const baseDelay = 0.6 + index * 0.1;

  switch (section.type) {
    case 'heading':
      const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        2: 'text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent',
        3: 'text-2xl font-bold text-white mb-4 mt-8',
        4: 'text-xl font-bold text-white mb-3 mt-6'
      };
      
      return (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
        >
          <HeadingTag className={headingClasses[section.level as keyof typeof headingClasses] || headingClasses[3]}>
            {getContent(section) as string}
          </HeadingTag>
        </motion.div>
      );

    case 'paragraph':
      return (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="text-lg mb-6 text-gray-200 leading-relaxed"
        >
          {getContent(section) as string}
        </motion.p>
      );

    case 'card':
      const items = getItems(section);
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {items.map((item, idx) => {
            const [title, ...description] = item.split('ï¼?);
            const desc = description.join('ï¼?);
            const iconMatch = title.match(/^(\S+)\s+(.+)/);
            const icon = iconMatch ? iconMatch[1] : '';
            const cleanTitle = iconMatch ? iconMatch[2] : title;
            
            const colors = [
              'text-blue-400',
              'text-green-400', 
              'text-purple-400',
              'text-orange-400',
              'text-pink-400',
              'text-cyan-400'
            ];
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: baseDelay + idx * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
              >
                <h4 className={`text-xl font-bold ${colors[idx % colors.length]} mb-3`}>
                  {icon && <span className="mr-2">{icon}</span>}
                  {cleanTitle}
                </h4>
                {desc && (
                  <p className="text-gray-300">
                    {desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      );

    case 'highlight':
      const highlightItems = getItems(section);
      const bgColors = [
        'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20',
        'bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20',
        'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20',
        'bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20'
      ];
      
      const textColors = [
        'text-blue-300',
        'text-green-300',
        'text-purple-300',
        'text-orange-300'
      ];

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className={`${bgColors[index % bgColors.length]} p-6 rounded-lg border mb-6`}
        >
          <h4 className={`text-xl font-bold ${textColors[index % textColors.length]} mb-3`}>
            {getContent(section) as string}
          </h4>
          {highlightItems.map((item, idx) => (
            <p key={idx} className={`text-gray-300 ${idx === 0 ? 'mb-3' : ''}`}>
              {item}
            </p>
          ))}
        </motion.div>
      );

    case 'steps':
      const stepItems = getItems(section);
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="space-y-4 mb-8"
        >
          {stepItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: baseDelay + idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div>
                <p className="text-gray-300">{item}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      );

    case 'list':
      const listItems = getItems(section);
      return (
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="space-y-3 mb-6"
        >
          {listItems.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: baseDelay + idx * 0.05 }}
              className="flex items-start gap-2 text-gray-300"
            >
              <span className="text-blue-400 mt-1">??/span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      );

    case 'conclusion':
      const conclusionItems = getItems(section);
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: baseDelay }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {getContent(section) as string}
          </h2>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-lg p-8">
            {conclusionItems.map((item, idx) => (
              <p key={idx} className="text-lg leading-relaxed mb-6 text-gray-200">
                {item}
              </p>
            ))}
            
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-600">
              <span className="text-2xl">??</span>
              <span className="text-lg font-semibold text-white">
                {isZhTW ? 'ç§‘æ??¹è??ªä?ï¼Œæ??‘æ??™å¥½äº†å?ï¼? : 'Technology is changing the future, are we ready?'}
              </span>
              <span className="text-2xl">??</span>
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
};

const ArticleContentRenderer: React.FC<ArticleContentRendererProps> = ({ sections, isZhTW }) => {
  return (
    <div className="text-gray-200 leading-relaxed space-y-8">
      {sections.map((section, index) => (
        <SectionRenderer
          key={index}
          section={section}
          isZhTW={isZhTW}
          index={index}
        />
      ))}
      
      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="text-center mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg"
      >
        <p className="text-gray-300">
          {isZhTW ? 
            <>?³ä?è§?›´å¤šé??¼AI?Œç??€?¼å??„æ??°è?è¨Šï??œæ³¨?‘å€‘ç? Instagram <strong className="text-blue-300">@ai_formula_</strong> ?²å??´å?æ·±åº¦?†æ??Œè?è§?€?/> :
            <>Want to learn more about the latest information on AI and technology development? Follow our Instagram <strong className="text-blue-300">@ai_formula_</strong> for more in-depth analysis and insights.</>
          }
        </p>
      </motion.div>
    </div>
  );
};

export default React.memo(ArticleContentRenderer); 