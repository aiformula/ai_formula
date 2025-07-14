# ?? æ¨¡æ¿å¯¦é?ä½¿ç”¨ç¯„ä? (Template Implementation Examples)

## ?? æ¦‚è¿°

?™å€‹æ?ä»¶å??«ä?å¯¦é??„ä»£ç¢¼ç?ä¾‹ï?å±•ç¤ºå¦‚ä??¨æ‚¨??AI Formula ?…ç›®ä¸­é??å?ä½¿ç”¨ `CourseTemplate` ??`BlogTemplate`??

---

## ?? èª²ç?æ¨¡æ¿?´å?ç¯„ä?

### ?”§ ç¯„ä? 1ï¼šè??¾æ?èª²ç??¸æ??´å?

**?‡ä»¶**: `pages/courses/PromptEngineeringWithTemplate.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

// ä½¿ç”¨?¾æ??„èª²ç¨‹æ•¸??
import { promptEngineeringCourse } from '@/data/courses/promptEngineering';

const PromptEngineeringWithTemplate: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  
  // ?€?‹ç®¡??
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // è½‰æ??¾æ??¸æ??¼å??°æ¨¡?¿æ ¼å¼?
  const convertToTemplateFormat = () => {
    return promptEngineeringCourse.modules.map((module, index) => ({
      id: `module-${index + 1}`,
      title: module.title,
      titleZh: module.titleZh,
      description: module.description,
      descriptionZh: module.descriptionZh,
      duration: module.duration,
      durationZh: module.durationZh,
      isCompleted: completedModules.includes(`module-${index + 1}`),
      isLocked: !isEnrolled && index > 0, // ?è²»?¨æˆ¶?ªèƒ½?‹ç¬¬ä¸€?‹æ¨¡çµ?
      lessons: module.lessons.map((lesson, lessonIndex) => ({
        id: `lesson-${index + 1}-${lessonIndex + 1}`,
        title: lesson.title,
        titleZh: lesson.titleZh,
        duration: lesson.duration,
        durationZh: lesson.durationZh,
        type: lesson.type as 'video' | 'reading' | 'quiz' | 'exercise',
        isCompleted: lesson.isCompleted || false,
        isLocked: !isEnrolled && index > 0,
      }))
    }));
  };

  // ?•ç?è¨»å?
  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(5); // ?‹å??‚çµ¦äº?5% ?²åº¦
    console.log('User enrolled in Prompt Engineering course');
    
    // ?™è£¡?¯ä»¥æ·»å?å¯¦é??„è¨»?Šé?è¼?
    // ä¾‹å?ï¼šAPI èª¿ç”¨?ç”¨?¶è¿½è¹¤ç?
  };

  // ?•ç?æ¨¡ç?é»æ?
  const handleModuleClick = (moduleId: string) => {
    if (isEnrolled) {
      navigate(`/prompt-engineering/module/${moduleId}`);
    } else {
      // ?ç¤º?¨æˆ¶?€è¦è¨»??
      alert(isZhTW ? 'è«‹å?è¨»å?èª²ç?' : 'Please enroll first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="pt-16"> {/* ?ºå??ªç??ºç©º??*/}
        <CourseTemplate
          title="Advanced Prompt Engineering"
          titleZh="?²é??ç¤ºå·¥ç?"
          description="Master the art of AI prompt engineering with practical techniques and real-world applications"
          descriptionZh="?šé?å¯¦ç”¨?€å·§å??Ÿå¯¦?‰ç”¨æ¡ˆä??Œæ¡ AI ?ç¤ºå·¥ç??„è?è¡?
          level="intermediate"
          duration="12 hours"
          durationZh="12 å°æ?"
          rating={4.8}
          studentCount={1543}
          modules={convertToTemplateFormat()}
          isEnrolled={isEnrolled}
          progress={progress}
          showProgress={isEnrolled}
          showRating={true}
          showStudentCount={true}
          onEnroll={handleEnroll}
          onModuleClick={handleModuleClick}
        />
      </div>
    </div>
  );
};

export default PromptEngineeringWithTemplate;
```

### ?”§ ç¯„ä? 2ï¼šå??‹å?è¼‰èª²ç¨‹æ•¸??

**?‡ä»¶**: `pages/courses/DynamicCourseTemplate.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CourseTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface CourseData {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  durationZh: string;
  rating: number;
  studentCount: number;
  modules: any[];
}

const DynamicCourseTemplate: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEnrollment, setUserEnrollment] = useState({
    isEnrolled: false,
    progress: 0
  });

  // æ¨¡æ“¬ API èª¿ç”¨
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // æ¨¡æ“¬ API å»¶é²
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ?™è£¡?‰è©²?¯å¯¦?›ç? API èª¿ç”¨
        const response = await fetch(`/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourseData(data);
        
        // æª¢æŸ¥?¨æˆ¶è¨»å??€??
        const enrollmentResponse = await fetch(`/api/courses/${courseId}/enrollment`);
        if (enrollmentResponse.ok) {
          const enrollment = await enrollmentResponse.json();
          setUserEnrollment(enrollment);
        }
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError(isZhTW ? 'è¼‰å…¥èª²ç??¸æ?å¤±æ?' : 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, isZhTW]);

  // ?•ç?è¨»å?
  const handleEnroll = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'current-user-id' })
      });

      if (response.ok) {
        setUserEnrollment({ isEnrolled: true, progress: 0 });
        alert(isZhTW ? 'è¨»å??å?ï¼? : 'Enrollment successful!');
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert(isZhTW ? 'è¨»å?å¤±æ?ï¼Œè??è©¦' : 'Enrollment failed, please try again');
    }
  };

  // Loading ?€??
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <LoadingSpinner message={isZhTW ? 'è¼‰å…¥èª²ç?ä¸?..' : 'Loading course...'} />
      </div>
    );
  }

  // Error ?€??
  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {isZhTW ? 'è¼‰å…¥?¯èª¤' : 'Loading Error'}
          </h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="pt-16">
        <CourseTemplate
          title={courseData.title}
          titleZh={courseData.titleZh}
          description={courseData.description}
          descriptionZh={courseData.descriptionZh}
          level={courseData.level}
          duration={courseData.duration}
          durationZh={courseData.durationZh}
          rating={courseData.rating}
          studentCount={courseData.studentCount}
          modules={courseData.modules}
          isEnrolled={userEnrollment.isEnrolled}
          progress={userEnrollment.progress}
          onEnroll={handleEnroll}
          onModuleClick={(moduleId) => {
            window.location.href = `/courses/${courseId}/modules/${moduleId}`;
          }}
        />
      </div>
    </div>
  );
};

export default DynamicCourseTemplate;
```

---

## ?“° ?šå®¢æ¨¡æ¿?´å?ç¯„ä?

### ?”§ ç¯„ä? 1ï¼šè??¾æ??šå®¢?¸æ??´å?

**?‡ä»¶**: `pages/blog/BlogPostWithTemplate.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import ArticleContentRenderer from '@/components/ArticleContentRenderer';

// ä½¿ç”¨?¾æ??„å?å®¢æ•¸??
import { blogPosts, type BlogPost } from '@/data/blog/blogPosts';
import { getArticleContent } from '@/data/blog/articleContent';

const BlogPostWithTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [articleContent, setArticleContent] = useState<any>(null);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // ?¥æ‰¾?‡ç?
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      
      // è¼‰å…¥?‡ç??§å®¹
      const content = getArticleContent(id || '');
      setArticleContent(content);
      
      // æ¨¡æ“¬è¼‰å…¥çµ±è??¸æ?
      setViewCount(Math.floor(Math.random() * 5000) + 100);
      setLikeCount(Math.floor(Math.random() * 200) + 10);
      
      // æª¢æŸ¥?¨æˆ¶äº’å??€??
      checkUserInteractions(id);
    }
  }, [id]);

  const checkUserInteractions = async (postId: string | undefined) => {
    if (!postId) return;
    
    try {
      // ?™è£¡?‰è©²?¯å¯¦?›ç? API èª¿ç”¨
      const response = await fetch(`/api/posts/${postId}/user-interactions`);
      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.isLiked);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error('Failed to load user interactions:', error);
    }
  };

  // ?•ç?è¿”å?
  const handleBack = () => {
    navigate('/blog');
  };

  // ?•ç??†äº«
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: isZhTW ? post.titleZh || post.title : post.title,
          text: isZhTW ? post.excerptZh || post.excerpt : post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: è¤‡è£½?°å‰ªè²¼æ¿
      navigator.clipboard.writeText(window.location.href);
      alert(isZhTW ? '?ˆæ¥å·²è?è£½åˆ°?ªè²¼?? : 'Link copied to clipboard');
    }
  };

  // ?•ç??¶è?
  const handleBookmark = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/bookmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBookmarked: !isBookmarked })
      });
      
      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        const message = isBookmarked 
          ? (isZhTW ? 'å·²å?æ¶ˆæ”¶?? : 'Removed from bookmarks')
          : (isZhTW ? 'å·²æ·»? åˆ°?¶è?' : 'Added to bookmarks');
        alert(message);
      }
    } catch (error) {
      console.error('Bookmark failed:', error);
    }
  };

  // ?•ç?é»è?
  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLiked: !isLiked })
      });
      
      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isZhTW ? '?‡ç??ªæ‰¾?? : 'Article Not Found'}
          </h2>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-400 hover:text-blue-300"
          >
            {isZhTW ? 'è¿”å??šå®¢' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  // æ¸²æ??‡ç??§å®¹
  const renderContent = () => {
    if (articleContent) {
      return <ArticleContentRenderer sections={articleContent.sections} />;
    }
    
    // å¦‚æ?æ²’æ?è©³ç´°?§å®¹ï¼Œä½¿?¨åŸº?¬å…§å®?
    return (
      <div className="prose prose-lg prose-invert max-w-none">
        <p>{isZhTW ? post.excerptZh || post.excerpt : post.excerpt}</p>
        {/* ?™è£¡?¯ä»¥æ·»å??´å??§å®¹ */}
      </div>
    );
  };

  return (
    <div>
      <Navigation />
      
      <BlogTemplate
        title={post.title}
        titleZh={post.titleZh}
        excerpt={post.excerpt}
        excerptZh={post.excerptZh}
        content={renderContent()}
        author="AI Formula Team"
        authorZh="AI Formula ?˜é?"
        publishDate={post.date}
        publishDateZh={post.dateZh}
        readTime={post.readTime}
        readTimeZh={post.readTimeZh}
        category={post.category}
        categoryZh={post.categoryZh}
        tags={post.tags || []}
        tagsZh={post.tagsZh || []}
        viewCount={viewCount}
        likeCount={likeCount}
        showStats={true}
        showTags={true}
        showShare={true}
        showBookmark={true}
        showBackButton={true}
        onBack={handleBack}
        onShare={handleShare}
        onBookmark={handleBookmark}
        onLike={handleLike}
      />
    </div>
  );
};

export default BlogPostWithTemplate;
```

### ?”§ ç¯„ä? 2ï¼šå‰µå»ºæ–°?‡ç??é¢

**?‡ä»¶**: `pages/blog/CreateBlogPost.tsx`

```tsx
import React, { useState } from 'react';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

const CreateBlogPost: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  // ?‡ç??§å®¹?€??
  const [articleData, setArticleData] = useState({
    title: '',
    titleZh: '',
    excerpt: '',
    excerptZh: '',
    category: 'AI Technology',
    categoryZh: 'AI?€è¡?,
    tags: ['AI', 'Technology'],
    tagsZh: ['AI', 'ç§‘æ?'],
  });

  // ç¤ºç??‡ç??§å®¹
  const demoContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isZhTW ? 'ä»€éº¼æ˜¯ AI Formulaï¼? : 'What is AI Formula?'}
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          {isZhTW 
            ? 'AI Formula ?¯ä??‹å??€?ºå­¸ç¿’è€…è¨­è¨ˆç?äººå·¥?ºæ…§?™è‚²å¹³å°?‚æ??‘æ?ä¾›å??ºç??°é€²é??„å??´èª²ç¨‹é?ç³»ï?å¹«åŠ©?¨æ???AI ?€è¡“ç??¸å?æ¦‚å¿µ?Œå¯¦?›æ??¨ã€?
            : 'AI Formula is an artificial intelligence education platform specifically designed for learners. We provide a comprehensive course system from basic to advanced levels, helping you master core AI concepts and practical applications.'
          }
        </p>
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
          <p className="text-blue-300 text-sm">
            {isZhTW 
              ? '?’¡ ?ç¤ºï¼šé€™æ˜¯ä¸€?‹ä½¿??BlogTemplate ?µå»º?„ç¤ºç¯„æ?ç« ã€?
              : '?’¡ Tip: This is a demo article created using BlogTemplate.'
            }
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? '?¸å??¹è‰²' : 'Core Features'}
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>{isZhTW ? 'çµæ??–ç?å­¸ç?è·¯å?' : 'Structured learning paths'}</li>
          <li>{isZhTW ? 'å¯¦é??…ç›®æ¡ˆä?' : 'Real-world project cases'}</li>
          <li>{isZhTW ? 'äº’å?å¼å­¸ç¿’é?é©? : 'Interactive learning experience'}</li>
          <li>{isZhTW ? 'å¤šè?è¨€?¯æ´' : 'Multi-language support'}</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? 'èª²ç??†é?' : 'Course Categories'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">
              {isZhTW ? '?ºç?èª²ç?' : 'Fundamental Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? 'AI ?ºç?æ¦‚å¿µ?æ??¨å­¸ç¿’å…¥?€' : 'AI basics, machine learning introduction'}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">
              {isZhTW ? '?²é?èª²ç?' : 'Advanced Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? 'æ·±åº¦å­¸ç??è‡ª?¶è?è¨€?•ç?' : 'Deep learning, natural language processing'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            {isZhTW ? '?‹å??¨ç? AI å­¸ç?ä¹‹æ?' : 'Start Your AI Learning Journey'}
          </h3>
          <p className="text-gray-300 mb-4">
            {isZhTW 
              ? 'ç«‹å³è¨»å?ï¼Œæ¢ç´¢äººå·¥æ™º?§ç??¡é??¯èƒ½?‚å??¶åŸºç¤åˆ°å°ˆæ¥­?‰ç”¨ï¼Œæ??‘å??ªä¼´?¨æ?ä¸€æ­¥ã€?
              : 'Register now and explore the infinite possibilities of artificial intelligence. From zero basics to professional applications, we will accompany you every step of the way.'
            }
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            {isZhTW ? 'ç«‹å³?‹å?' : 'Get Started'}
          </button>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      <Navigation />
      
      <BlogTemplate
        title="Introducing AI Formula: Your Gateway to Artificial Intelligence"
        titleZh="ä»‹ç´¹ AI Formulaï¼šæ‚¨?„äººå·¥æ™º?§å­¸ç¿’é???
        excerpt="Discover how AI Formula revolutionizes AI education with structured courses, hands-on projects, and comprehensive learning resources."
        excerptZh="?¢ç´¢ AI Formula å¦‚ä??šé?çµæ??–èª²ç¨‹ã€å¯¦è¸é??®å??¨é¢?„å­¸ç¿’è?æºä??©æ–° AI ?™è‚²??
        content={demoContent}
        author="AI Formula Team"
        authorZh="AI Formula ?˜é?"
        publishDate="December 7, 2024"
        publishDateZh="2024å¹?2????
        readTime="6 min read"
        readTimeZh="6 ?†é??±è?"
        category="Company Introduction"
        categoryZh="?¬å¸ä»‹ç´¹"
        tags={["AI Education", "Learning Platform", "Technology"]}
        tagsZh={["AI ?™è‚²", "å­¸ç?å¹³å°", "ç§‘æ?"]}
        viewCount={892}
        likeCount={47}
        showStats={true}
        showTags={true}
        showShare={true}
        showBookmark={true}
        showBackButton={true}
        onBack={() => window.history.back()}
        onShare={() => {
          if (navigator.share) {
            navigator.share({
              title: isZhTW ? "AI Formula ä»‹ç´¹" : "Introducing AI Formula",
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert(isZhTW ? '?ˆæ¥å·²è?è£? : 'Link copied');
          }
        }}
        onBookmark={() => {
          alert(isZhTW ? '?‡ç?å·²æ”¶?? : 'Article bookmarked');
        }}
        onLike={() => {
          alert(isZhTW ? '?Ÿè??¨ç?é»è?ï¼? : 'Thanks for the like!');
        }}
      />
    </div>
  );
};

export default CreateBlogPost;
```

---

## ?”§ ?¨è·¯?±ä¸­ä½¿ç”¨æ¨¡æ¿

### ?´æ–° App.tsx è·¯ç”±?ç½®

```tsx
// ??App.tsx ä¸­æ·»? æ–°?„è·¯??
const PromptEngineeringWithTemplate = React.lazy(() => import('./pages/courses/PromptEngineeringWithTemplate'));
const BlogPostWithTemplate = React.lazy(() => import('./pages/blog/BlogPostWithTemplate'));
const CreateBlogPost = React.lazy(() => import('./pages/blog/CreateBlogPost'));

// ??Routes ä¸­æ·»??
<Route path="/courses/prompt-engineering/template" element={<PromptEngineeringWithTemplate />} />
<Route path="/blog/:id/template" element={<BlogPostWithTemplate />} />
<Route path="/blog/demo" element={<CreateBlogPost />} />
```

---

## ?? ?§èƒ½?ªå?ç¯„ä?

### ä½¿ç”¨ React.memo ?ªå?æ¨¡æ¿?§èƒ½

```tsx
// components/templates/OptimizedCourseTemplate.tsx
import React, { memo, useMemo } from 'react';
import { CourseTemplate } from './CourseTemplate';

interface OptimizedCourseTemplateProps {
  courseData: any;
  userState: any;
  onEnroll: () => void;
  onModuleClick: (moduleId: string) => void;
}

const OptimizedCourseTemplate = memo<OptimizedCourseTemplateProps>(({
  courseData,
  userState,
  onEnroll,
  onModuleClick
}) => {
  // ä½¿ç”¨ useMemo ?ªå??¸æ??•ç?
  const processedModules = useMemo(() => {
    return courseData.modules.map((module: any) => ({
      ...module,
      isLocked: !userState.isEnrolled && module.requiresEnrollment,
      isCompleted: userState.completedModules.includes(module.id)
    }));
  }, [courseData.modules, userState.isEnrolled, userState.completedModules]);

  return (
    <CourseTemplate
      title={courseData.title}
      titleZh={courseData.titleZh}
      description={courseData.description}
      descriptionZh={courseData.descriptionZh}
      level={courseData.level}
      duration={courseData.duration}
      durationZh={courseData.durationZh}
      rating={courseData.rating}
      studentCount={courseData.studentCount}
      modules={processedModules}
      isEnrolled={userState.isEnrolled}
      progress={userState.progress}
      onEnroll={onEnroll}
      onModuleClick={onModuleClick}
    />
  );
});

OptimizedCourseTemplate.displayName = 'OptimizedCourseTemplate';

export default OptimizedCourseTemplate;
```

---

## ?¯ ?†æ?å»ºè­°

1. **?æ­¥?·ç§»**: å¾ä??‹é??¢é?å§‹ä½¿?¨æ¨¡?¿ï??¶å??æ­¥?·ç§»?¶ä??é¢
2. **?¸æ??©é?**: ?µå»º?©é??¨å‡½?¸ä?è½‰æ??¾æ??¸æ??¼å?
3. **?¨æˆ¶é«”é?**: ä¿æ??‡ç¾?‰è¨­è¨ˆç?ä¸€?´æ€?
4. **?§èƒ½??§**: ä½¿ç”¨ React DevTools ??§æ¨¡æ¿?§èƒ½
5. **æ¸¬è©¦**: ?ºæ??‹æ¨¡?¿ç”¨æ³•å‰µå»ºæ¸¬è©¦æ?ä¾?

---

**?? ?™ä?ç¯„ä?å±•ç¤ºäº†å?ä½•åœ¨å¯¦é??…ç›®ä¸­æ??ˆåœ°ä½¿ç”¨æ¨¡æ¿ï¼Œè??¨èƒ½å¤ å¿«?Ÿå»ºç«‹å?æ¥­ä?ä¸€?´ç??¨æˆ¶?Œé¢ï¼?* 
