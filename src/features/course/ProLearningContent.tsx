import React from 'react';
import { ProLearningContentProps } from './types';

export const ProLearningContent: React.FC<ProLearningContentProps> = ({
  part,
  partContent,
  isEnhanced = false,
  language,
  videoTemplates = []
}) => {
  const renderContent = () => {
    const content = language === 'en' ? partContent.content : partContent.contentCht;
    
    if (isEnhanced) {
      // Enhanced formatting for Part 4 - Midjourney Keywords
      return (
        <div className="mt-4">
          <div className="midjourney-enhanced-content max-w-full overflow-hidden">
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="whitespace-pre-wrap leading-relaxed text-gray-200"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/\n/g, '<br>')
                }}
              />
            </div>
            
            {/* Video Templates Section */}
            {videoTemplates.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">
                  {language === 'en' ? 'Video Templates' : '視頻模板'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoTemplates.map((template) => (
                    <div key={template.id} className="bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50">
                      <h4 className="text-lg font-semibold mb-3 text-yellow-400">
                        {template.title}
                      </h4>
                      
                      {/* Image */}
                      <div className="mb-4">
                        <img 
                          src={template.imageUrl}
                          alt={template.imageAlt}
                          className="w-full rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            console.log('Image failed to load:', e.currentTarget.src);
                          }}
                        />
                      </div>
                      
                      {/* Video */}
                      <div className="mb-4">
                        <video 
                          src={template.videoUrl}
                          controls
                          className="w-full rounded-lg border-2 border-gray-600 shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            console.log('Video failed to load:', e.currentTarget.src);
                          }}
                        >
                          {language === 'en' ? 'Your browser does not support the video tag.' : '你的瀏覽器不支持視頻標籤。'}
                        </video>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Regular content formatting for other parts
    return (
      <div className="prose prose-invert prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed text-gray-200">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden">
      
      {/* Lesson Header */}
      <div className={`bg-gradient-to-r ${part.color} p-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-2xl text-3xl">
            {part.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {language === 'en' ? 
                `Part ${part.number}: ${part.title}` :
                `Part ${part.number}: ${part.titleCht}`
              }
            </h2>
            <p className="text-white/90 text-lg">
              {language === 'en' ? part.description : part.descriptionCht}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="p-8">
        {renderContent()}
        
        {/* Pro Tips Section for Part 3 */}
        {part.proTips && (
          <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">
              {language === 'en' ? part.proTips.title : part.proTips.titleCht}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {part.proTips.tips.map((tip) => (
                <div key={tip.number} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {tip.number}
                    </div>
                    <h4 className="font-semibold text-blue-300">
                      {language === 'en' ? tip.title : tip.titleCht}
                    </h4>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    {language === 'en' ? tip.description : tip.descriptionCht}
                  </p>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 whitespace-pre-line">
                      {language === 'en' ? tip.example : tip.exampleCht}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 