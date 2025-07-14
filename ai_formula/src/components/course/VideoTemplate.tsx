import React, { useState, useCallback } from 'react';
import { VideoTemplateData } from '../../types/courseTypes';

interface VideoTemplateProps {
  templates?: VideoTemplateData[];
  language: 'en' | 'zh-HK';
  onImageError?: (url: string) => void;
  onVideoError?: (url: string) => void;
}

// Video template data for different types
const videoTemplateData: VideoTemplateData[] = [
  {
    id: 'cyberpunk',
    title: '?î• Video Generation Template 1: Cyberpunk Streets',
    imageUrl: 'https://cdn.midjourney.com/8aca4b16-1777-4cfa-bf0b-2e580dfc0a19/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/edb4f881-28bc-43c2-94f1-de33c099966a/3.mp4',
    imageAlt: 'Cyberpunk Streets Example',
    videoAlt: 'Cyberpunk Streets Video Example',
    imagePrompt: 'cyberpunk street scene, neon-lit alleyway, rain-soaked pavement, holographic advertisements, futuristic motorcycle, blade runner aesthetic, purple and cyan lighting, volumetric fog --ar 16:9 --stylize 750',
    videoPrompt: 'neon lights pulsing rhythmically, hologram glitching effects, steam rising from manholes, rain drops creating ripples, motorcycle headlight cutting through fog, cyberpunk atmosphere'
  },
  {
    id: 'magical',
    title: '??Video Generation Template 2: Magical Forest',
    imageUrl: 'https://cdn.midjourney.com/1096de2a-d098-48d0-9d67-dc6eb34fa506/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/525dfefd-45be-4c83-96e9-aaf2c992cee4/1.mp4',
    imageAlt: 'Magical Forest Example',
    videoAlt: 'Magical Forest Video Example',
    imagePrompt: 'enchanted forest, glowing mushrooms, floating magical particles, ancient twisted trees, mystical fog, ethereal blue and green lighting, fantasy atmosphere, fireflies dancing --ar 16:9 --chaos 30',
    videoPrompt: 'magical particles swirling in spiral patterns, mushrooms pulsing with bioluminescence, fireflies creating light trails, mystical fog flowing between trees, enchanted atmosphere with sparkles'
  },
  {
    id: 'underwater',
    title: '?? Video Generation Template 3: Underwater Fantasy',
    imageUrl: 'https://cdn.midjourney.com/e6dbb98b-6e05-40e7-8df8-fe10d8c5f9fa/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/878b9a50-1af9-4231-ba5c-85b2b60a33ef/3.mp4',
    imageAlt: 'Underwater Fantasy Example',
    videoAlt: 'Underwater Fantasy Video Example',
    imagePrompt: 'underwater coral reef, bioluminescent sea creatures, sunlight filtering through water, colorful tropical fish, floating jellyfish, aquatic plants swaying --ar 16:9 --stylize 600',
    videoPrompt: 'jellyfish gracefully floating upward, fish swimming in schools, coral polyps opening and closing, water currents creating movement, sunbeams dancing through water, peaceful underwater ballet'
  },
  {
    id: 'space',
    title: '?? Video Generation Template 4: Space Exploration',
    imageUrl: 'https://cdn.midjourney.com/1e964ccd-561d-4184-9989-01e7e00b5ea9/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/ca6eccee-3e34-4491-ab46-19c980c724bc/0.mp4',
    imageAlt: 'Space Exploration Example',
    videoAlt: 'Space Exploration Video Example',
    imagePrompt: 'astronaut floating in deep space, distant galaxies, colorful nebula clouds, space station in background, cosmic dust particles, epic space adventure --ar 16:9 --q 2',
    videoPrompt: 'astronaut slowly rotating in zero gravity, nebula clouds swirling, distant stars twinkling, space station rotating, cosmic dust creating particle effects, epic space journey'
  },
  {
    id: 'fashion',
    title: '?é≠ Video Generation Template 5: High Fashion',
    imageUrl: 'https://cdn.midjourney.com/507f8008-822f-4da3-8194-6965964e0bd4/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/a1f878a0-52b0-4be4-83d5-227f3bf378f3/2.mp4',
    imageAlt: 'High Fashion Example',
    videoAlt: 'High Fashion Video Example',
    imagePrompt: 'high fashion model, avant-garde clothing, dramatic studio lighting, colorful smoke effects, mirror reflections, editorial photography, bold makeup, artistic composition --ar 9:16 --stylize 800',
    videoPrompt: "model's hair flowing dramatically, smoke swirling around figure, fabric moving with wind, lighting creating dynamic shadows, mirror reflections shifting, high-fashion editorial movement"
  }
];

const VideoTemplate: React.FC<VideoTemplateProps> = ({ 
  templates = videoTemplateData, 
  language, 
  onImageError, 
  onVideoError 
}) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [failedVideos, setFailedVideos] = useState<Set<string>>(new Set());

  const handleImageError = useCallback((url: string) => {
    setFailedImages(prev => new Set(prev).add(url));
    onImageError?.(url);
  }, [onImageError]);

  const handleVideoError = useCallback((url: string) => {
    setFailedVideos(prev => new Set(prev).add(url));
    onVideoError?.(url);
  }, [onVideoError]);

  const getLocalizedTitle = (template: VideoTemplateData): string => {
    if (language === 'zh-HK') {
      return template.title.replace('Video Generation Template 1: Cyberpunk Streets', 'Ë¶ñÈ†ª?üÊ?Ê®°Êùø1ÔºöË≥Ω?öÊ??ãË???)
        .replace('Video Generation Template 2: Magical Forest', 'Ë¶ñÈ†ª?üÊ?Ê®°Êùø2ÔºöÈ?Ê≥ïÊ£Æ??)
        .replace('Video Generation Template 3: Underwater Fantasy', 'Ë¶ñÈ†ª?üÊ?Ê®°Êùø3ÔºöÊ∞¥‰∏ãÂ?Âπ?)
        .replace('Video Generation Template 4: Space Exploration', 'Ë¶ñÈ†ª?üÊ?Ê®°Êùø4ÔºöÂ§™Á©∫Êé¢Á¥?)
        .replace('Video Generation Template 5: High Fashion', 'Ë¶ñÈ†ª?üÊ?Ê®°Êùø5ÔºöÊ?Â∞öÂ§ß??);
    }
    return template.title;
  };

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center">
        {language === 'en' ? '?é¨ Midjourney Video Generation Templates' : '?é¨ MidjourneyË¶ñÈ†ª?üÊ?Ê®°Êùø'}
      </h2>

      {templates.map((template) => (
        <div key={template.id} className="border-b border-gray-600 pb-8 last:border-b-0">
          {/* Template Title */}
          <h3 className="text-xl font-bold text-blue-400 mb-6">
            {getLocalizedTitle(template)}
          </h3>

          {/* Image Display */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              {!failedImages.has(template.imageUrl) ? (
                <img
                  src={template.imageUrl}
                  alt={template.imageAlt}
                  className="w-full max-w-md mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                  loading="lazy"
                  onError={() => handleImageError(template.imageUrl)}
                />
              ) : (
                <div className="w-full max-w-md mx-auto bg-gray-800 border-2 border-gray-600 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-2">?ñºÔ∏?/div>
                  <p className="text-gray-400 text-sm">
                    {language === 'en' ? 'Image failed to load' : '?ñÂ??†Ë?Â§±Ê?'}
                  </p>
                </div>
              )}
              <p className="text-blue-400 text-sm mt-2 font-medium">
                {language === 'en' ? template.imageAlt : 
                  template.imageAlt.replace('Example', 'ÁØÑ‰?').replace('Cyberpunk Streets', 'Ë≥ΩÂ??ãÂ?Ë°óÈ†≠')
                    .replace('Magical Forest', 'È≠îÊ?Ê£ÆÊ?').replace('Underwater Fantasy', 'Ê∞¥‰?Â•áÂπª')
                    .replace('Space Exploration', 'Â§™Á©∫?¢Á¥¢').replace('High Fashion', '?ÇÂ?Â§ßÁ?')
                }
              </p>
            </div>
          </div>

          {/* Image Prompt */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-pink-400 mb-3">
              {language === 'en' ? 'Step 1 - Image Prompt:' : 'Á¨?Ê≠?- ?ñÂ??êÁ§∫Ôº?}
            </h4>
            <pre className="bg-gray-900 border border-gray-600 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-green-400 whitespace-pre-wrap">
                {template.imagePrompt}
              </code>
            </pre>
          </div>

          {/* Video Display */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              {!failedVideos.has(template.videoUrl) ? (
                <video
                  width="100%"
                  controls
                  className="w-full max-w-md mx-auto rounded-lg border-2 border-gray-600 shadow-lg"
                  onError={() => handleVideoError(template.videoUrl)}
                >
                  <source src={template.videoUrl} type="video/mp4" />
                  {language === 'en' ? 'Your browser does not support the video tag.' : '?®Á??èË¶Ω?®‰??ØÊ?Ë¶ñÈ†ªÊ®ôÁ±§??}
                </video>
              ) : (
                <div className="w-full max-w-md mx-auto bg-gray-800 border-2 border-gray-600 rounded-lg p-8 text-center">
                  <div className="text-gray-400 mb-2">?é•</div>
                  <p className="text-gray-400 text-sm">
                    {language === 'en' ? 'Video failed to load' : 'Ë¶ñÈ†ª?†Ë?Â§±Ê?'}
                  </p>
                </div>
              )}
              <p className="text-blue-400 text-sm mt-2 font-medium">
                {language === 'en' ? template.videoAlt : 
                  template.videoAlt.replace('Video Example', 'Ë¶ñÈ†ªÁØÑ‰?').replace('Cyberpunk Streets', 'Ë≥ΩÂ??ãÂ?Ë°óÈ†≠')
                    .replace('Magical Forest', 'È≠îÊ?Ê£ÆÊ?').replace('Underwater Fantasy', 'Ê∞¥‰?Â•áÂπª')
                    .replace('Space Exploration', 'Â§™Á©∫?¢Á¥¢').replace('High Fashion', '?ÇÂ?Â§ßÁ?')
                }
              </p>
            </div>
          </div>

          {/* Video Prompt */}
          <div>
            <h4 className="text-lg font-semibold text-pink-400 mb-3">
              {language === 'en' ? 'Step 2 - Video Prompt:' : 'Á¨?Ê≠?- Ë¶ñÈ†ª?êÁ§∫Ôº?}
            </h4>
            <pre className="bg-gray-900 border border-gray-600 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-green-400 whitespace-pre-wrap">
                {template.videoPrompt}
              </code>
            </pre>
          </div>
        </div>
      ))}

      {/* Pro Tips Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30 mt-8">
        <h4 className="text-lg font-bold text-purple-400 mb-4">
          {language === 'en' ? '?í° Pro Video Tips:' : '?í° Ë¶ñÈ†ªÂ∞àÊ•≠Ë≤ºÂ£´Ôº?}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="text-gray-300">
            <strong className="text-blue-400">
              {language === 'en' ? 'Create Visual Impact:' : '?µÈÄ†Ë?Ë¶∫Ë??äÔ?'}
            </strong>
            <br />
            {language === 'en' ? 'Use strong contrast and dynamic effects' : '‰ΩøÁî®Âº∑Á?Â∞çÊ??åÂ??ãÊ???}
          </div>
          <div className="text-gray-300">
            <strong className="text-blue-400">
              {language === 'en' ? 'Add Motion Keywords:' : 'Ê∑ªÂ??ï‰??úÈçµË©ûÔ?'}
            </strong>
            <br />
            {language === 'en' ? '"spiral movement", "explosion effects", "morphing"' : '"?∫Ê??ãÂ?"Ôº??ÜÁÇ∏?àÊ?"Ôº?ËÆäÂΩ¢"'}
          </div>
          <div className="text-gray-300">
            <strong className="text-blue-400">
              {language === 'en' ? 'Mix Style Elements:' : 'Ê∑∑Â?È¢®Ê†º?ÉÁ?Ôº?}
            </strong>
            <br />
            {language === 'en' ? 'Combine different aesthetics for unique effects' : 'ÁµêÂ?‰∏çÂ?ÁæéÂ≠∏?µÈÄ†Áç®?πÊ???}
          </div>
          <div className="text-gray-300">
            <strong className="text-blue-400">
              {language === 'en' ? 'Add Rhythm:' : 'Ê∑ªÂ??ªÂ??üÔ?'}
            </strong>
            <br />
            {language === 'en' ? '"rhythmic pulsing", "music sync", "beat-driven"' : '"ÁØÄÂ•èÊÄßË???Ôº??≥Ê??åÊ≠•"Ôº??ªÂ???'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoTemplate); 