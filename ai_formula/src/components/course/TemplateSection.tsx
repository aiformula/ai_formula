import React from 'react';

// ?ñÁ?Â±ïÁ§∫ÁµÑ‰ª∂
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

// Ë¶ñÈ†ªÂ±ïÁ§∫ÁµÑ‰ª∂
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

// ‰ª?¢ºÂ°äÁ?‰ª?
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

// Ê®°Êùø?ÄÊÆµÁ?‰ª?
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
    
    {/* Ê∏≤Ê??ñÁ? */}
    {images.length > 0 && (
      <div className={images.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-3xl" : ""}>
        {images.map((image, index) => (
          <CourseImage key={index} {...image} />
        ))}
      </div>
    )}
    
    {/* Ê∏≤Ê?‰ª?¢ºÂ°?*/}
    {codeBlocks.map((codeBlock, index) => (
      <CourseCodeBlock key={index} {...codeBlock} />
    ))}
    
    {/* Ê∏≤Ê?Ë¶ñÈ†ª */}
    {videos.map((video, index) => (
      <CourseVideo key={index} {...video} />
    ))}
    
    {/* Ê∏≤Ê??∂‰??ßÂÆπ */}
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

// Ë¶ñÈ†ªÊ®°ÊùøÁµÑ‰ª∂
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
    
    {/* ?ñÁ? */}
    <CourseImage src={imageUrl} alt={imageAlt} caption={imageAlt} />
    
    {/* ?ñÂ??êÁ§∫ */}
    <CourseCodeBlock code={imagePrompt} title="Á¨?Ê≠?- ?ñÂ??êÁ§∫Ôº? />
    
    {/* Ë¶ñÈ†ª */}
    <CourseVideo src={videoUrl} alt={videoAlt} caption={videoAlt} />
    
    {/* Ë¶ñÈ†ª?êÁ§∫ */}
    <CourseCodeBlock code={videoPrompt} title="Á¨?Ê≠?- Ë¶ñÈ†ª?êÁ§∫Ôº? />
  </div>
);

export default TemplateSection; 
