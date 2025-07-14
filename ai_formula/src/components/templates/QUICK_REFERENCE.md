# 📖 模板快速參考 (Template Quick Reference)

## 🚀 快速開始

### 📚 課程模板 (CourseTemplate)

```tsx
import { CourseTemplate } from '@/components/templates';

<CourseTemplate
  title="Course Title"              // ✅ 必需
  description="Course description"  // ✅ 必需  
  level="beginner"                 // ✅ 必需 (beginner|intermediate|advanced)
  duration="8 hours"               // ✅ 必需
  modules={modules}                // ✅ 必需 (CourseModule[])
  onEnroll={() => {}}              // 註冊回調
  onModuleClick={(id) => {}}       // 模組點擊回調
/>
```

### 📰 博客模板 (BlogTemplate)

```tsx
import { BlogTemplate } from '@/components/templates';

<BlogTemplate
  title="Article Title"            // ✅ 必需
  excerpt="Article excerpt"        // ✅ 必需
  content={<div>Content</div>}     // ✅ 必需 (React.ReactNode)
  author="Author Name"             // ✅ 必需
  publishDate="Dec 7, 2024"       // ✅ 必需
  readTime="5 min read"           // ✅ 必需
  category="Technology"           // ✅ 必需
  tags={["AI", "Tech"]}           // ✅ 必需 (string[])
  onBack={() => {}}               // 返回回調
  onShare={() => {}}              // 分享回調
/>
```

---

## 📋 數據結構模板

### CourseModule 結構

```tsx
const moduleExample = {
  id: "module-1",                    // string (必需)
  title: "Module Title",             // string (必需)
  titleZh: "模組標題",               // string (可選)
  description: "Module description", // string (必需)
  descriptionZh: "模組描述",         // string (可選)
  duration: "2 hours",              // string (必需)
  durationZh: "2 小時",             // string (可選)
  isCompleted: false,               // boolean (可選)
  isLocked: false,                  // boolean (可選)
  lessons: [                        // CourseLesson[] (必需)
    {
      id: "lesson-1",
      title: "Lesson Title",
      titleZh: "課程標題",
      duration: "30 min",
      durationZh: "30 分鐘",
      type: "video",                // "video"|"reading"|"quiz"|"exercise"
      isCompleted: false,
      isLocked: false
    }
  ]
};
```

---

## 🎨 常用配置

### 課程模板配置

| 場景 | 配置 |
|------|------|
| **免費課程** | `showRating={false}`, `isEnrolled={false}` |
| **付費課程** | `rating={4.8}`, `studentCount={1200}` |
| **學習中** | `isEnrolled={true}`, `progress={75}` |
| **完成課程** | `progress={100}`, `showProgress={true}` |

### 博客模板配置

| 場景 | 配置 |
|------|------|
| **技術文章** | `showStats={true}`, `showTags={true}` |
| **公司新聞** | `showBookmark={false}` |
| **簡單文章** | `showStats={false}`, `showBackButton={false}` |

---

## 🔧 常用代碼片段

### 1. 數據格式轉換

```tsx
// 轉換現有數據到模板格式
const convertToTemplateFormat = (courseData) => {
  return courseData.modules.map((module, index) => ({
    id: `module-${index + 1}`,
    title: module.title,
    titleZh: module.titleZh,
    description: module.description,
    descriptionZh: module.descriptionZh,
    duration: module.duration,
    durationZh: module.durationZh,
    isCompleted: completedModules.includes(`module-${index + 1}`),
    isLocked: !isEnrolled && index > 0,
    lessons: module.lessons.map((lesson, lessonIndex) => ({
      id: `lesson-${index + 1}-${lessonIndex + 1}`,
      title: lesson.title,
      titleZh: lesson.titleZh,
      duration: lesson.duration,
      durationZh: lesson.durationZh,
      type: lesson.type,
      isCompleted: lesson.isCompleted || false,
      isLocked: !isEnrolled && index > 0,
    }))
  }));
};
```

### 2. 多語言處理

```tsx
const { language } = useLanguage();
const isZhTW = language === 'zh-TW';

// 在模板中使用
<CourseTemplate
  title={isZhTW ? course.titleZh : course.title}
  description={isZhTW ? course.descriptionZh : course.description}
  // ...
/>
```

### 3. 狀態管理

```tsx
const [isEnrolled, setIsEnrolled] = useState(false);
const [progress, setProgress] = useState(0);
const [completedModules, setCompletedModules] = useState<string[]>([]);

const handleEnroll = () => {
  setIsEnrolled(true);
  setProgress(5); // 開始進度
};

const handleModuleComplete = (moduleId: string) => {
  setCompletedModules(prev => [...prev, moduleId]);
  // 更新進度
  const newProgress = ((completedModules.length + 1) / totalModules) * 100;
  setProgress(newProgress);
};
```

### 4. 分享功能

```tsx
const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: articleTitle,
        text: articleExcerpt,
        url: window.location.href
      });
    } catch (error) {
      console.log('Share failed:', error);
    }
  } else {
    // Fallback
    navigator.clipboard.writeText(window.location.href);
    alert('鏈接已複製到剪貼板');
  }
};
```

### 5. 錯誤處理

```tsx
// Loading 狀態
if (loading) {
  return <LoadingSpinner message="載入中..." />;
}

// Error 狀態
if (error) {
  return (
    <div className="text-center text-white">
      <h2>載入錯誤</h2>
      <p>{error}</p>
      <button onClick={retry}>重試</button>
    </div>
  );
}

// 空數據狀態
if (!data) {
  return (
    <div className="text-center text-white">
      <h2>內容未找到</h2>
      <button onClick={() => navigate('/courses')}>
        返回課程列表
      </button>
    </div>
  );
}
```

---

## 🎯 最佳實踐檢查清單

### ✅ 開發前檢查

- [ ] 確認使用正確的模板（課程 vs 博客）
- [ ] 準備好所有必需的數據
- [ ] 設計好用戶互動流程
- [ ] 考慮多語言支援需求

### ✅ 實現期間檢查

- [ ] 正確處理 loading 狀態
- [ ] 實現適當的錯誤處理
- [ ] 添加用戶回饋（成功/失敗消息）
- [ ] 測試所有互動功能

### ✅ 完成後檢查

- [ ] 測試響應式設計
- [ ] 驗證多語言切換
- [ ] 檢查性能（大量數據時）
- [ ] 確保可訪問性（鍵盤導航、螢幕閱讀器）

---

## 🚨 常見錯誤

### ❌ 不要這樣做

```tsx
// 錯誤：忘記處理空數據
<CourseTemplate modules={undefined} />

// 錯誤：混合使用不同模板
<BlogTemplate title="Course Title" modules={[]} />

// 錯誤：忘記回調函數
<CourseTemplate onEnroll={undefined} /> // 按鈕無效
```

### ✅ 正確做法

```tsx
// 正確：檢查數據有效性
{modules && modules.length > 0 && (
  <CourseTemplate modules={modules} />
)}

// 正確：使用正確的模板
<CourseTemplate title="Course Title" modules={modules} />

// 正確：提供回調函數
<CourseTemplate onEnroll={handleEnroll} />
```

---

## 📱 響應式設計提示

```css
/* 模板已包含響應式設計，但您可以自定義 */
@media (max-width: 768px) {
  .course-template-custom {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .course-template-custom {
    max-width: 1200px;
  }
}
```

---

## 🔍 調試技巧

### 檢查模板屬性

```tsx
// 在開發環境中添加調試信息
{process.env.NODE_ENV === 'development' && (
  <div className="debug-info">
    <p>Modules: {modules?.length || 0}</p>
    <p>Enrolled: {isEnrolled ? 'Yes' : 'No'}</p>
    <p>Progress: {progress}%</p>
  </div>
)}
```

### React DevTools

- 使用 React DevTools 檢查組件樹
- 監控 props 變化
- 查看渲染性能

---

**💡 記住：模板是為了提高開發效率和保持一致性。根據具體需求靈活使用這些配置！** 