import React from 'react';

// 圖片展示組件
interface CourseImageProps {
  src: string;
  alt: string;
  caption: string;
}

export const CourseImage: React.FC<CourseImageProps> = ({ src, alt, caption }) => (
  <div className="course-image-container">
    <div className="text-center">
      <img 
        src={src}
        alt={alt}
        className="course-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          console.log('Image failed to load:', src);
        }}
      />
      <p className="course-image-caption">{caption}</p>
    </div>
  </div>
);

// 視頻展示組件
interface CourseVideoProps {
  src: string;
  alt: string;
  caption: string;
}

export const CourseVideo: React.FC<CourseVideoProps> = ({ src, alt, caption }) => (
  <div className="course-video-container">
    <div className="text-center">
      <video 
        width="100%" 
        controls 
        className="course-video"
        onError={(e) => {
          console.log('Video failed to load:', src);
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="course-image-caption">{caption}</p>
    </div>
  </div>
);

// 代碼塊組件
interface CourseCodeBlockProps {
  code: string;
  title: string;
}

export const CourseCodeBlock: React.FC<CourseCodeBlockProps> = ({ code, title }) => (
  <div style={{marginBottom: '2rem'}}>
    <h4 className="course-subsection-title">
      {title}
    </h4>
    <pre className="course-code-block">
      {code}
    </pre>
  </div>
);

// 模板區段組件
interface TemplateSectionProps {
  title: string;
  images?: CourseImageProps[];
  videos?: CourseVideoProps[];
  codeBlocks?: CourseCodeBlockProps[];
  content?: string;
}

export const TemplateSection: React.FC<TemplateSectionProps> = ({ 
  title, 
  images = [], 
  videos = [], 
  codeBlocks = [], 
  content 
}) => (
  <div style={{marginBottom: '4rem', borderBottom: '1px solid var(--ai-formula-gray-600)', paddingBottom: '2rem'}}>
    <h3 className="course-section-title">
      {title}
    </h3>
    
    {/* 渲染圖片 */}
    {images.length > 0 && (
      <div className={images.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-3xl" : ""}>
        {images.map((image, index) => (
          <CourseImage key={index} {...image} />
        ))}
      </div>
    )}
    
    {/* 渲染代碼塊 */}
    {codeBlocks.map((codeBlock, index) => (
      <CourseCodeBlock key={index} {...codeBlock} />
    ))}
    
    {/* 渲染視頻 */}
    {videos.map((video, index) => (
      <CourseVideo key={index} {...video} />
    ))}
    
    {/* 渲染其他內容 */}
    {content && (
      <div dangerouslySetInnerHTML={{
        __html: content
          .replace(/```([\s\S]*?)```/g, '<pre class="course-code-block"><code>$1</code></pre>')
          .replace(/`([^`]+)`/g, '<code style="background-color: var(--ai-formula-gray-600); color: var(--ai-formula-success); padding: 0.25rem 0.5rem; border-radius: 0.25rem;">$1</code>')
          .replace(/\n/g, '<br>')
      }} />
    )}
  </div>
);

// 視頻模板組件
interface VideoTemplateProps {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  imageAlt: string;
  videoAlt: string;
  imagePrompt: string;
  videoPrompt: string;
}

export const VideoTemplate: React.FC<VideoTemplateProps> = ({
  title,
  imageUrl,
  videoUrl,
  imageAlt,
  videoAlt,
  imagePrompt,
  videoPrompt
}) => (
  <div style={{marginBottom: '4rem', borderBottom: '1px solid var(--ai-formula-gray-600)', paddingBottom: '2rem'}}>
    <h3 className="course-section-title">
      {title}
    </h3>
    
    {/* 圖片 */}
    <CourseImage src={imageUrl} alt={imageAlt} caption={imageAlt} />
    
    {/* 圖像提示 */}
    <CourseCodeBlock code={imagePrompt} title="第1步 - 圖像提示：" />
    
    {/* 視頻 */}
    <CourseVideo src={videoUrl} alt={videoAlt} caption={videoAlt} />
    
    {/* 視頻提示 */}
    <CourseCodeBlock code={videoPrompt} title="第2步 - 視頻提示：" />
  </div>
);

export default TemplateSection; 