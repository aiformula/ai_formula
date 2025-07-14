# 🚀 模板實際使用範例 (Template Implementation Examples)

## 📋 概述

這個文件包含了實際的代碼範例，展示如何在您的 AI Formula 項目中集成和使用 `CourseTemplate` 和 `BlogTemplate`。

---

## 📚 課程模板整合範例

### 🔧 範例 1：與現有課程數據整合

**文件**: `pages/courses/PromptEngineeringWithTemplate.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

// 使用現有的課程數據
import { promptEngineeringCourse } from '@/data/courses/promptEngineering';

const PromptEngineeringWithTemplate: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-TW';
  
  // 狀態管理
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  // 轉換現有數據格式到模板格式
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
      isLocked: !isEnrolled && index > 0, // 免費用戶只能看第一個模組
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

  // 處理註冊
  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(5); // 開始時給予 5% 進度
    console.log('User enrolled in Prompt Engineering course');
    
    // 這裡可以添加實際的註冊邏輯
    // 例如：API 調用、用戶追蹤等
  };

  // 處理模組點擊
  const handleModuleClick = (moduleId: string) => {
    if (isEnrolled) {
      navigate(`/prompt-engineering/module/${moduleId}`);
    } else {
      // 提示用戶需要註冊
      alert(isZhTW ? '請先註冊課程' : 'Please enroll first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="pt-16"> {/* 為導航留出空間 */}
        <CourseTemplate
          title="Advanced Prompt Engineering"
          titleZh="進階提示工程"
          description="Master the art of AI prompt engineering with practical techniques and real-world applications"
          descriptionZh="通過實用技巧和真實應用案例掌握 AI 提示工程的藝術"
          level="intermediate"
          duration="12 hours"
          durationZh="12 小時"
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

### 🔧 範例 2：動態加載課程數據

**文件**: `pages/courses/DynamicCourseTemplate.tsx`

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
  const isZhTW = language === 'zh-TW';
  
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
        
        // 這裡應該是實際的 API 調用
        const response = await fetch(`/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        setCourseData(data);
        
        // 檢查用戶註冊狀態
        const enrollmentResponse = await fetch(`/api/courses/${courseId}/enrollment`);
        if (enrollmentResponse.ok) {
          const enrollment = await enrollmentResponse.json();
          setUserEnrollment(enrollment);
        }
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError(isZhTW ? '載入課程數據失敗' : 'Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, isZhTW]);

  // 處理註冊
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
        alert(isZhTW ? '註冊成功！' : 'Enrollment successful!');
      }
    } catch (error) {
      console.error('Enrollment failed:', error);
      alert(isZhTW ? '註冊失敗，請重試' : 'Enrollment failed, please try again');
    }
  };

  // Loading 狀態
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <LoadingSpinner message={isZhTW ? '載入課程中...' : 'Loading course...'} />
      </div>
    );
  }

  // Error 狀態
  if (error || !courseData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {isZhTW ? '載入錯誤' : 'Loading Error'}
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

## 📰 博客模板整合範例

### 🔧 範例 1：與現有博客數據整合

**文件**: `pages/blog/BlogPostWithTemplate.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import ArticleContentRenderer from '@/components/ArticleContentRenderer';

// 使用現有的博客數據
import { blogPosts, type BlogPost } from '@/data/blog/blogPosts';
import { getArticleContent } from '@/data/blog/articleContent';

const BlogPostWithTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [articleContent, setArticleContent] = useState<any>(null);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // 查找文章
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      
      // 載入文章內容
      const content = getArticleContent(id || '');
      setArticleContent(content);
      
      // 模擬載入統計數據
      setViewCount(Math.floor(Math.random() * 5000) + 100);
      setLikeCount(Math.floor(Math.random() * 200) + 10);
      
      // 檢查用戶互動狀態
      checkUserInteractions(id);
    }
  }, [id]);

  const checkUserInteractions = async (postId: string | undefined) => {
    if (!postId) return;
    
    try {
      // 這裡應該是實際的 API 調用
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

  // 處理返回
  const handleBack = () => {
    navigate('/blog');
  };

  // 處理分享
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
      // Fallback: 複製到剪貼板
      navigator.clipboard.writeText(window.location.href);
      alert(isZhTW ? '鏈接已複製到剪貼板' : 'Link copied to clipboard');
    }
  };

  // 處理收藏
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
          ? (isZhTW ? '已取消收藏' : 'Removed from bookmarks')
          : (isZhTW ? '已添加到收藏' : 'Added to bookmarks');
        alert(message);
      }
    } catch (error) {
      console.error('Bookmark failed:', error);
    }
  };

  // 處理點讚
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
            {isZhTW ? '文章未找到' : 'Article Not Found'}
          </h2>
          <button 
            onClick={() => navigate('/blog')}
            className="text-blue-400 hover:text-blue-300"
          >
            {isZhTW ? '返回博客' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  // 渲染文章內容
  const renderContent = () => {
    if (articleContent) {
      return <ArticleContentRenderer sections={articleContent.sections} />;
    }
    
    // 如果沒有詳細內容，使用基本內容
    return (
      <div className="prose prose-lg prose-invert max-w-none">
        <p>{isZhTW ? post.excerptZh || post.excerpt : post.excerpt}</p>
        {/* 這裡可以添加更多內容 */}
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
        authorZh="AI Formula 團隊"
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

### 🔧 範例 2：創建新文章頁面

**文件**: `pages/blog/CreateBlogPost.tsx`

```tsx
import React, { useState } from 'react';
import { BlogTemplate } from '@/components/templates';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

const CreateBlogPost: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';
  
  // 文章內容狀態
  const [articleData, setArticleData] = useState({
    title: '',
    titleZh: '',
    excerpt: '',
    excerptZh: '',
    category: 'AI Technology',
    categoryZh: 'AI技術',
    tags: ['AI', 'Technology'],
    tagsZh: ['AI', '科技'],
  });

  // 示範文章內容
  const demoContent = (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          {isZhTW ? '什麼是 AI Formula？' : 'What is AI Formula?'}
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          {isZhTW 
            ? 'AI Formula 是一個專門為學習者設計的人工智慧教育平台。我們提供從基礎到進階的完整課程體系，幫助您掌握 AI 技術的核心概念和實際應用。'
            : 'AI Formula is an artificial intelligence education platform specifically designed for learners. We provide a comprehensive course system from basic to advanced levels, helping you master core AI concepts and practical applications.'
          }
        </p>
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
          <p className="text-blue-300 text-sm">
            {isZhTW 
              ? '💡 提示：這是一個使用 BlogTemplate 創建的示範文章。'
              : '💡 Tip: This is a demo article created using BlogTemplate.'
            }
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? '核心特色' : 'Core Features'}
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>{isZhTW ? '結構化的學習路徑' : 'Structured learning paths'}</li>
          <li>{isZhTW ? '實際項目案例' : 'Real-world project cases'}</li>
          <li>{isZhTW ? '互動式學習體驗' : 'Interactive learning experience'}</li>
          <li>{isZhTW ? '多語言支援' : 'Multi-language support'}</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-3">
          {isZhTW ? '課程分類' : 'Course Categories'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">
              {isZhTW ? '基礎課程' : 'Fundamental Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? 'AI 基礎概念、機器學習入門' : 'AI basics, machine learning introduction'}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">
              {isZhTW ? '進階課程' : 'Advanced Courses'}
            </h4>
            <p className="text-sm text-gray-300">
              {isZhTW ? '深度學習、自然語言處理' : 'Deep learning, natural language processing'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-3">
            {isZhTW ? '開始您的 AI 學習之旅' : 'Start Your AI Learning Journey'}
          </h3>
          <p className="text-gray-300 mb-4">
            {isZhTW 
              ? '立即註冊，探索人工智慧的無限可能。從零基礎到專業應用，我們將陪伴您每一步。'
              : 'Register now and explore the infinite possibilities of artificial intelligence. From zero basics to professional applications, we will accompany you every step of the way.'
            }
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            {isZhTW ? '立即開始' : 'Get Started'}
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
        titleZh="介紹 AI Formula：您的人工智慧學習門戶"
        excerpt="Discover how AI Formula revolutionizes AI education with structured courses, hands-on projects, and comprehensive learning resources."
        excerptZh="探索 AI Formula 如何通過結構化課程、實踐項目和全面的學習資源來革新 AI 教育。"
        content={demoContent}
        author="AI Formula Team"
        authorZh="AI Formula 團隊"
        publishDate="December 7, 2024"
        publishDateZh="2024年12月7日"
        readTime="6 min read"
        readTimeZh="6 分鐘閱讀"
        category="Company Introduction"
        categoryZh="公司介紹"
        tags={["AI Education", "Learning Platform", "Technology"]}
        tagsZh={["AI 教育", "學習平台", "科技"]}
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
            alert(isZhTW ? '鏈接已複製' : 'Link copied');
          }
        }}
        onBookmark={() => {
          alert(isZhTW ? '文章已收藏' : 'Article bookmarked');
        }}
        onLike={() => {
          alert(isZhTW ? '感謝您的點讚！' : 'Thanks for the like!');
        }}
      />
    </div>
  );
};

export default CreateBlogPost;
```

---

## 🔧 在路由中使用模板

### 更新 App.tsx 路由配置

```tsx
// 在 App.tsx 中添加新的路由
const PromptEngineeringWithTemplate = React.lazy(() => import('./pages/courses/PromptEngineeringWithTemplate'));
const BlogPostWithTemplate = React.lazy(() => import('./pages/blog/BlogPostWithTemplate'));
const CreateBlogPost = React.lazy(() => import('./pages/blog/CreateBlogPost'));

// 在 Routes 中添加
<Route path="/courses/prompt-engineering/template" element={<PromptEngineeringWithTemplate />} />
<Route path="/blog/:id/template" element={<BlogPostWithTemplate />} />
<Route path="/blog/demo" element={<CreateBlogPost />} />
```

---

## 📊 性能優化範例

### 使用 React.memo 優化模板性能

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
  // 使用 useMemo 優化數據處理
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

## 🎯 集成建議

1. **逐步遷移**: 從一個頁面開始使用模板，然後逐步遷移其他頁面
2. **數據適配**: 創建適配器函數來轉換現有數據格式
3. **用戶體驗**: 保持與現有設計的一致性
4. **性能監控**: 使用 React DevTools 監控模板性能
5. **測試**: 為每個模板用法創建測試案例

---

**🚀 這些範例展示了如何在實際項目中有效地使用模板，讓您能夠快速建立專業且一致的用戶界面！** 