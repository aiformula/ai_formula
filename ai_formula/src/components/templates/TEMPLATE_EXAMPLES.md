# ?? 模板實�?使用範�? (Template Implementation Examples)

## ?? 概述

?�個�?件�??��?實�??�代碼�?例�?展示如�??�您??AI Formula ?�目中�??��?使用 `CourseTemplate` ??`BlogTemplate`??

---

## ?? 課�?模板?��?範�?

### ?�� 範�? 1：�??��?課�??��??��?

**?�件**: `pages/courses/PromptEngineeringWithTemplate.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

// 使用?��??�課程數??
import { promptEngineeringCourse } from '@/data/courses/promptEngineering';

const PromptEngineeringWithTemplate: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';
  
  // ?�?�管??
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // 轉�??��??��??��??�模?�格�?
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
      isLocked: !isEnrolled && index > 0, // ?�費?�戶?�能?�第一?�模�?
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

  // ?��?註�?
  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(5); // ?��??�給�?5% ?�度
    console.log('User enrolled in Prompt Engineering course');
    
    // ?�裡?�以添�?實�??�註?��?�?
    // 例�?：API 調用?�用?�追蹤�?
  };

  // ?��?模�?點�?
  const handleModuleClick = (moduleId: string) => {
    if (isEnrolled) {
      navigate(`/prompt-engineering/module/${moduleId}`);
    } else {
      // ?�示?�戶?�要註??
      alert(isZhTW ? '請�?註�?課�?' : 'Please enroll first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="pt-16"> {/* ?��??��??�空??*/}
        <CourseTemplate
          title="Advanced Prompt Engineering"
          titleZh="?��??�示工�?"
          description="Master the art of AI prompt engineering with practical techniques and real-world applications"
          descriptionZh="?��?實用?�巧�??�實?�用案�??�握 AI ?�示工�??��?�?
          level="intermediate"
          duration="12 hours"
          durationZh="12 小�?"
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

### ?�� 範�? 2：�??��?載課程數??

**?�件**: `pages/courses/DynamicCourseTemplate.tsx`

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

  // 模擬 API 調用
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // 模擬 API 延遲
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // ?�裡?�該?�實?��? API 調用
        const response = await fetch(`/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourseData(data);
        
        // 檢查?�戶註�??�??
        const enrollmentResponse = await fetch(`/api/courses/${courseId}/enrollment`);
        if (enrollmentResponse.ok) {
          const enrollment = await enrollmentResponse.json();
          setUserEnrollment(enrollment);
        }
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError(isZhTW ? '載入課�??��?失�?' : 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, isZhTW]);

  // ?��?註�?
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
        alert(isZhTW ? '註�??��?�? : 'Enrollment successful!');
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert(isZhTW ? '註�?失�?，�??�試' : 'Enrollment failed, please try again');
    }
  };

  // Loading ?�??
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <LoadingSpinner message={isZhTW ? '載入課�?�?..' : 'Loading course...'} />
      </div>
    );
  }

  // Error ?�??
  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {isZhTW ? '載入?�誤' : 'Loading Error'}
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

## ?�� ?�客模板?��?範�?

### ?�� 範�? 1：�??��??�客?��??��?

**?�件**: `pages/blog/BlogPostWithTemplate.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import ArticleContentRenderer from '@/components/ArticleContentRenderer';

// 使用?��??��?客數??
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
    // ?�找?��?
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      
      // 載入?��??�容
      const content = getArticleContent(id || '');
      setArticleContent(content);
      
      // 模擬載入統�??��?
      setViewCount(Math.floor(Math.random() * 5000) + 100);
      setLikeCount(Math.floor(Math.random() * 200) + 10);
      
      // 檢查?�戶互�??�??
      checkUserInteractions(id);
    }
  }, [id]);

  const checkUserInteractions = async (postId: string | undefined) => {
    if (!postId) return;
    
    try {
      // ?�裡?�該?�實?��? API 調用
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

  // ?��?返�?
  const handleBack = () => {
    navigate('/blog');
  };

  // ?��??�享
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
      // Fallback: 複製?�剪貼板
      navigator.clipboard.writeText(window.location.href);
      alert(isZhTW ? '?�接已�?製到?�貼?? : 'Link copied to clipboard');
    }
  };

  // ?��??��?
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
          ? (isZhTW ? '已�?消收?? : 'Removed from bookmarks')
          : (isZhTW ? '已添?�到?��?' : 'Added to bookmarks');
        alert(message);
      }
    } catch (error) {
      console.error('Bookmark failed:', error);
    }
  };

  // ?��?點�?
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
            {isZhTW ? '?��??�找?? : 'Article Not Found'}
          </h2>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-400 hover:text-blue-300"
          >
            {isZhTW ? '返�??�客' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  // 渲�??��??�容
  const renderContent = () => {
    if (articleContent) {
      return <ArticleContentRenderer sections={articleContent.sections} />;
    }
    
    // 如�?沒�?詳細?�容，使?�基?�內�?
    return (
      <div className="prose prose-lg prose-invert max-w-none">
        <p>{isZhTW ? post.excerptZh || post.excerpt : post.excerpt}</p>
        {/* ?�裡?�以添�??��??�容 */}
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
        authorZh="AI Formula ?��?"
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

### ?�� 範�? 2：創建新?��??�面

**?�件**: `pages/blog/CreateBlogPost.tsx`

```tsx
import React, { useState } from 'react';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

const CreateBlogPost: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  
  // ?��??�容?�??
  const [articleData, setArticleData] = useState({
    title: '',
    titleZh: '',
    excerpt: '',
    excerptZh: '',
    category: 'AI Technology',
    categoryZh: 'AI?��?,
    tags: ['AI', 'Technology'],
    tagsZh: ['AI', '科�?'],
  });

  // 示�??��??�容
  const demoContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isZhTW ? '什麼是 AI Formula�? : 'What is AI Formula?'}
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          {isZhTW 
            ? 'AI Formula ?��??��??�?�學習者設計�?人工?�慧?�育平台?��??��?供�??��??�進�??��??�課程�?系�?幫助?��???AI ?�術�??��?概念?�實?��??��?
            : 'AI Formula is an artificial intelligence education platform specifically designed for learners. We provide a comprehensive course system from basic to advanced levels, helping you master core AI concepts and practical applications.'
          }
        </p>
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
          <p className="text-blue-300 text-sm">
            {isZhTW 
              ? '?�� ?�示：這是一?�使??BlogTemplate ?�建?�示範�?章�?
              : '?�� Tip: This is a demo article created using BlogTemplate.'
            }
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? '?��??�色' : 'Core Features'}
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>{isZhTW ? '結�??��?學�?路�?' : 'Structured learning paths'}</li>
          <li>{isZhTW ? '實�??�目案�?' : 'Real-world project cases'}</li>
          <li>{isZhTW ? '互�?式學習�?�? : 'Interactive learning experience'}</li>
          <li>{isZhTW ? '多�?言?�援' : 'Multi-language support'}</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? '課�??��?' : 'Course Categories'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">
              {isZhTW ? '?��?課�?' : 'Fundamental Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? 'AI ?��?概念?��??�學習入?�' : 'AI basics, machine learning introduction'}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">
              {isZhTW ? '?��?課�?' : 'Advanced Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? '深度學�??�自?��?言?��?' : 'Deep learning, natural language processing'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            {isZhTW ? '?��??��? AI 學�?之�?' : 'Start Your AI Learning Journey'}
          </h3>
          <p className="text-gray-300 mb-4">
            {isZhTW 
              ? '立即註�?，探索人工智?��??��??�能?��??�基礎到專業?�用，�??��??�伴?��?一步�?
              : 'Register now and explore the infinite possibilities of artificial intelligence. From zero basics to professional applications, we will accompany you every step of the way.'
            }
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            {isZhTW ? '立即?��?' : 'Get Started'}
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
        titleZh="介紹 AI Formula：您?�人工智?�學習�???
        excerpt="Discover how AI Formula revolutionizes AI education with structured courses, hands-on projects, and comprehensive learning resources."
        excerptZh="?�索 AI Formula 如�??��?結�??�課程、實踐�??��??�面?�學習�?源�??�新 AI ?�育??
        content={demoContent}
        author="AI Formula Team"
        authorZh="AI Formula ?��?"
        publishDate="December 7, 2024"
        publishDateZh="2024�?2????
        readTime="6 min read"
        readTimeZh="6 ?��??��?"
        category="Company Introduction"
        categoryZh="?�司介紹"
        tags={["AI Education", "Learning Platform", "Technology"]}
        tagsZh={["AI ?�育", "學�?平台", "科�?"]}
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
              title: isZhTW ? "AI Formula 介紹" : "Introducing AI Formula",
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert(isZhTW ? '?�接已�?�? : 'Link copied');
          }
        }}
        onBookmark={() => {
          alert(isZhTW ? '?��?已收?? : 'Article bookmarked');
        }}
        onLike={() => {
          alert(isZhTW ? '?��??��?點�?�? : 'Thanks for the like!');
        }}
      />
    </div>
  );
};

export default CreateBlogPost;
```

---

## ?�� ?�路?�中使用模板

### ?�新 App.tsx 路由?�置

```tsx
// ??App.tsx 中添?�新?�路??
const PromptEngineeringWithTemplate = React.lazy(() => import('./pages/courses/PromptEngineeringWithTemplate'));
const BlogPostWithTemplate = React.lazy(() => import('./pages/blog/BlogPostWithTemplate'));
const CreateBlogPost = React.lazy(() => import('./pages/blog/CreateBlogPost'));

// ??Routes 中添??
<Route path="/courses/prompt-engineering/template" element={<PromptEngineeringWithTemplate />} />
<Route path="/blog/:id/template" element={<BlogPostWithTemplate />} />
<Route path="/blog/demo" element={<CreateBlogPost />} />
```

---

## ?? ?�能?��?範�?

### 使用 React.memo ?��?模板?�能

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
  // 使用 useMemo ?��??��??��?
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

## ?�� ?��?建議

1. **?�步?�移**: 從�??��??��?始使?�模?��??��??�步?�移?��??�面
2. **?��??��?**: ?�建?��??�函?��?轉�??��??��??��?
3. **?�戶體�?**: 保�??�現?�設計�?一?��?
4. **?�能??��**: 使用 React DevTools ??��模板?�能
5. **測試**: ?��??�模?�用法創建測試�?�?

---

**?? ?��?範�?展示了�?何在實�??�目中�??�地使用模板，�??�能夠快?�建立�?業�?一?��??�戶?�面�?* 
