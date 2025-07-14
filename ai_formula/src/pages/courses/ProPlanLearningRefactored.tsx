import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from '../components/Navigation';
import LessonNavigation from '../components/course/LessonNavigation';
import LessonContentDisplay from '../components/course/LessonContentDisplay';
import { TemplateSection, VideoTemplate, CourseImage } from '../components/course/TemplateSection';
import { beginnerCourse } from '../data/courseData/proPlanCourse';

// 模板數據配置
const TEMPLATE_DATA = {
  portrait: {
    title: '肖像攝影模板',
    images: [
      {
        src: 'https://cdn.midjourney.com/856765d0-10a3-4bba-a823-67c2412a0c65/0_0.png',
        alt: 'Portrait Example 1',
        caption: 'Portrait Example 1'
      },
      {
        src: 'https://cdn.midjourney.com/f2beab12-a2ea-4d6e-9d91-fc5924a81d64/0_0.png',
        alt: 'Portrait Example 2', 
        caption: 'Portrait Example 2'
      }
    ]
  },
  product: {
    title: '產品攝影模板',
    images: [
      {
        src: 'https://cdn.midjourney.com/f7a6bb2d-a33e-49fc-becb-43b80276c9c8/0_2.png',
        alt: 'Product Example 1',
        caption: 'Product Example 1'
      },
      {
        src: 'https://cdn.midjourney.com/c362a708-8e78-465c-b1cd-4ed89778554b/0_1.png',
        alt: 'Product Example 2',
        caption: 'Product Example 2'
      }
    ]
  },
  artistic: {
    title: '藝術創作模板',
    images: [
      {
        src: 'https://cdn.midjourney.com/81e5ec51-141e-4eb7-80db-01267da045dd/0_3.png',
        alt: 'Artistic Creation Example',
        caption: '藝術創作範例'
      }
    ]
  },
  landscape: {
    title: '風景攝影模板',
    images: [
      {
        src: 'https://cdn.midjourney.com/c90fd7fe-9245-468a-a624-20023c0fcbf1/0_1.png',
        alt: 'Landscape Photography Example',
        caption: '風景攝影範例'
      }
    ]
  }
};

const VIDEO_TEMPLATES = [
  {
    id: 'cyberpunk',
    title: '🔥 視頻生成模板1：賽博朋克街頭',
    imageUrl: 'https://cdn.midjourney.com/8aca4b16-1777-4cfa-bf0b-2e580dfc0a19/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/edb4f881-28bc-43c2-94f1-de33c099966a/3.mp4',
    imageAlt: '賽博朋克街頭範例',
    videoAlt: '賽博朋克街頭視頻範例',
    imagePrompt: 'A futuristic cyberpunk street scene at night, neon lights reflecting on wet pavement, holographic advertisements floating in the air, people in futuristic clothing walking through the scene, cinematic lighting, ultra-detailed, 4K resolution --ar 16:9 --style raw',
    videoPrompt: 'Camera slowly pans through the cyberpunk street, following the movement of people and vehicles, neon signs flickering, rain starting to fall, creating dynamic reflections on the ground --motion 3 --fps 24'
  },
  {
    id: 'magical',
    title: '⚡ 視頻生成模板2：魔法森林',
    imageUrl: 'https://cdn.midjourney.com/1096de2a-d098-48d0-9d67-dc6eb34fa506/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/525dfefd-45be-4c83-96e9-aaf2c992cee4/1.mp4',
    imageAlt: '魔法森林範例',
    videoAlt: '魔法森林視頻範例',
    imagePrompt: 'An enchanted magical forest with glowing mushrooms, floating fairy lights, ancient twisted trees with luminous bark, magical creatures in the shadows, ethereal mist flowing between trees, fantasy art style --ar 16:9 --v 6',
    videoPrompt: 'Gentle camera movement through the magical forest, fairy lights dancing in the air, mist swirling around ancient trees, subtle magical sparkles appearing and disappearing --motion 2 --fps 30'
  },
  {
    id: 'underwater',
    title: '🌊 視頻生成模板3：水下奇幻',
    imageUrl: 'https://cdn.midjourney.com/e6dbb98b-6e05-40e7-8df8-fe10d8c5f9fa/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/878b9a50-1af9-4231-ba5c-85b2b60a33ef/3.mp4',
    imageAlt: '水下奇幻範例',
    videoAlt: '水下奇幻視頻範例',
    imagePrompt: 'Underwater fantasy scene with bioluminescent coral reefs, schools of colorful tropical fish, rays of sunlight penetrating the water, ancient underwater ruins in the background, crystal clear water, peaceful and serene atmosphere --ar 16:9 --style cinematic',
    videoPrompt: 'Smooth underwater camera movement, fish swimming gracefully, sunlight rays moving through the water, coral gently swaying with water currents, bubbles rising to the surface --motion 2 --fps 24'
  },
  {
    id: 'space',
    title: '🚀 視頻生成模板4：太空探索',
    imageUrl: 'https://cdn.midjourney.com/1e964ccd-561d-4184-9989-01e7e00b5ea9/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/ca6eccee-3e34-4491-ab46-19c980c724bc/0.mp4',
    imageAlt: '太空探索範例',
    videoAlt: '太空探索視頻範例',
    imagePrompt: 'Deep space exploration scene with a massive spacecraft approaching a distant planet, stars twinkling in the background, nebula clouds with vibrant colors, asteroid fields, realistic space physics, epic sci-fi atmosphere --ar 16:9 --style photorealistic',
    videoPrompt: 'Slow majestic movement of the spacecraft through space, planets rotating in the distance, stars twinkling, nebula clouds slowly shifting, asteroids drifting by --motion 1 --fps 30'
  },
  {
    id: 'fashion',
    title: '🎭 視頻生成模板5：時尚大片',
    imageUrl: 'https://cdn.midjourney.com/ba3cb5c1-2e5f-4c16-8af3-8d2a4e6c7891/0_2.png',
    videoUrl: 'https://cdn.midjourney.com/video/f1d8e5a3-4b2c-4c89-a7d6-1e9c2b8f6543/2.mp4',
    imageAlt: '時尚大片範例',
    videoAlt: '時尚大片視頻範例',
    imagePrompt: 'High fashion photoshoot with a model in avant-garde designer clothing, dramatic studio lighting, minimalist background, professional makeup and styling, artistic poses, luxury fashion photography style --ar 9:16 --style fashion',
    videoPrompt: 'Model poses flowing naturally from one position to another, dramatic lighting creating dynamic shadows, fabric moving elegantly, professional fashion video style --motion 2 --fps 24'
  }
];

const ProPlanLearningRefactored: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentPart, setCurrentPart] = useState(0);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  // Memoized course data
  const courseData = useMemo(() => beginnerCourse, []);
  
  // Memoized current part content
  const currentPartContent = useMemo(() => 
    courseData.getPartContent(currentPart + 1), 
    [courseData, currentPart]
  );

  // Handlers
  const handlePartSelect = useCallback((partIndex: number) => {
    setCurrentPart(partIndex);
  }, []);

  const handleMarkComplete = useCallback((partNumber: number) => {
    if (!completedParts.includes(partNumber)) {
      setCompletedParts(prev => [...prev, partNumber]);
    }
  }, [completedParts]);

  const handleNextPart = useCallback(() => {
    setCurrentPart(prev => Math.min(prev + 1, courseData.parts.length - 1));
  }, [courseData.parts.length]);

  const handlePrevPart = useCallback(() => {
    setCurrentPart(prev => Math.max(prev - 1, 0));
  }, []);

  // 處理第4部分的特殊渲染
  const renderPart4Content = useCallback(() => {
    if (currentPart !== 3) return null; // Part 4 is index 3
    
    return (
      <div className="midjourney-enhanced-content">
        {/* 渲染基本內容 */}
        <div dangerouslySetInnerHTML={{
          __html: currentPartContent.content
            .split('### 肖像攝影模板')[0]
            .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>')
        }} />
        
        {/* 渲染模板區段 */}
        <TemplateSection 
          title={TEMPLATE_DATA.portrait.title}
          images={TEMPLATE_DATA.portrait.images}
        />
        
        <TemplateSection 
          title={TEMPLATE_DATA.product.title}
          images={TEMPLATE_DATA.product.images}
        />
        
        <TemplateSection 
          title={TEMPLATE_DATA.artistic.title}
          images={TEMPLATE_DATA.artistic.images}
        />
        
        <TemplateSection 
          title={TEMPLATE_DATA.landscape.title}
          images={TEMPLATE_DATA.landscape.images}
        />
        
        {/* 渲染視頻模板 */}
        {VIDEO_TEMPLATES.map((template) => (
          <VideoTemplate key={template.id} {...template} />
        ))}
      </div>
    );
  }, [currentPart, currentPartContent]);

  return (
    <div className="min-h-screen ai-bg-gradient-dark text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={() => navigate('/course')}
            className="inline-flex items-center gap-2 text-gray-400 hover:ai-text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'Back to Courses' : '返回課程'}
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {language === 'en' ? courseData.title : courseData.titleCht}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold">
              {language === 'en' ? courseData.subtitle : courseData.subtitleCht}
            </p>
          </div>

          <div className="bg-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300">{language === 'en' ? 'Beginner Friendly' : '初學者友好'}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">{language === 'en' ? '4 Parts Total' : '總共4部分'}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">{language === 'en' ? 'Step by Step' : '逐步指導'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Lesson Navigation */}
          <div className="lg:col-span-1">
            <LessonNavigation
              parts={courseData.parts}
              currentPart={currentPart}
              completedParts={completedParts}
              onPartSelect={handlePartSelect}
              onMarkComplete={handleMarkComplete}
              language={language}
            />
          </div>

          {/* Main Content - Lesson Display */}
          <div className="lg:col-span-2">
            {currentPart === 3 ? (
              // 特殊處理第4部分
              <div className="ai-bg-dark-medium rounded-2xl p-8 border border-gray-800">
                <h2 className="text-3xl font-bold mb-6 ai-text-primary">
                  {courseData.parts[currentPart].title}
                </h2>
                {renderPart4Content()}
              </div>
            ) : (
              // 其他部分使用標準組件
              <LessonContentDisplay
                currentPart={courseData.parts[currentPart]}
                partContent={currentPartContent}
                currentPartIndex={currentPart}
                totalParts={courseData.parts.length}
                onNextPart={handleNextPart}
                onPrevPart={handlePrevPart}
                language={language}
              />
            )}
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {language === 'en' ? 'Quick Success Tips' : '快速成功貼士'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold mb-2 text-green-400">
                {language === 'en' ? 'Start Simple' : '從簡單開始'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Don\'t try to create complex images on day 1. Master the basics first!' :
                  '唔好第一日就試創造複雜圖像。先掌握基礎！'
                }
              </p>
            </div>
            
            <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400">
                {language === 'en' ? 'Practice Daily' : '每日練習'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Spend 15-30 minutes daily. Consistency beats intensity!' :
                  '每日花15-30分鐘。持續勝過強度！'
                }
              </p>
            </div>
            
            <div className="bg-yellow-500/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                {language === 'en' ? 'Have Fun!' : '享受樂趣！'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Experiment, make mistakes, and enjoy the creative process!' :
                  '實驗、犯錯誤同享受創作過程！'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlanLearningRefactored; 