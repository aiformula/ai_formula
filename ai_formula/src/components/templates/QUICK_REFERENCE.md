# ?? 模板快速�???(Template Quick Reference)

## ?? 快速�?�?

### ?? 課�?模板 (CourseTemplate)

```tsx
import { CourseTemplate } from '@/components/templates';

<CourseTemplate
  title="Course Title"              // ??必�?
  description="Course description"  // ??必�?  
  level="beginner"                 // ??必�? (beginner|intermediate|advanced)
  duration="8 hours"               // ??必�?
  modules={modules}                // ??必�? (CourseModule[])
  onEnroll={() => {}}              // 註�??�調
  onModuleClick={(id) => {}}       // 模�?點�??�調
/>
```

### ?�� ?�客模板 (BlogTemplate)

```tsx
import { BlogTemplate } from '@/components/templates';

<BlogTemplate
  title="Article Title"            // ??必�?
  excerpt="Article excerpt"        // ??必�?
  content={<div>Content</div>}     // ??必�? (React.ReactNode)
  author="Author Name"             // ??必�?
  publishDate="Dec 7, 2024"       // ??必�?
  readTime="5 min read"           // ??必�?
  category="Technology"           // ??必�?
  tags={["AI", "Tech"]}           // ??必�? (string[])
  onBack={() => {}}               // 返�??�調
  onShare={() => {}}              // ?�享?�調
/>
```

---

## ?? ?��?結�?模板

### CourseModule 結�?

```tsx
const moduleExample = {
  id: "module-1",                    // string (必�?)
  title: "Module Title",             // string (必�?)
  titleZh: "模�?標�?",               // string (?�選)
  description: "Module description", // string (必�?)
  descriptionZh: "模�??�述",         // string (?�選)
  duration: "2 hours",              // string (必�?)
  durationZh: "2 小�?",             // string (?�選)
  isCompleted: false,               // boolean (?�選)
  isLocked: false,                  // boolean (?�選)
  lessons: [                        // CourseLesson[] (必�?)
    {
      id: "lesson-1",
      title: "Lesson Title",
      titleZh: "課�?標�?",
      duration: "30 min",
      durationZh: "30 ?��?",
      type: "video",                // "video"|"reading"|"quiz"|"exercise"
      isCompleted: false,
      isLocked: false
    }
  ]
};
```

---

## ?�� 常用?�置

### 課�?模板?�置

| ?�景 | ?�置 |
|------|------|
| **?�費課�?** | `showRating={false}`, `isEnrolled={false}` |
| **付費課�?** | `rating={4.8}`, `studentCount={1200}` |
| **學�?�?* | `isEnrolled={true}`, `progress={75}` |
| **完�?課�?** | `progress={100}`, `showProgress={true}` |

### ?�客模板?�置

| ?�景 | ?�置 |
|------|------|
| **?�術�?�?* | `showStats={true}`, `showTags={true}` |
| **?�司?��?** | `showBookmark={false}` |
| **簡單?��?** | `showStats={false}`, `showBackButton={false}` |

---

## ?�� 常用�?��?�段

### 1. ?��??��?轉�?

```tsx
// 轉�??��??��??�模?�格�?
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

### 2. 多�?言?��?

```tsx
const { language } = useLanguage();
const isZhTW = language === 'zh-HK';

// ?�模?�中使用
<CourseTemplate
  title={isZhTW ? course.titleZh : course.title}
  description={isZhTW ? course.descriptionZh : course.description}
  // ...
/>
```

### 3. ?�?�管??

```tsx
const [isEnrolled, setIsEnrolled] = useState(false);
const [progress, setProgress] = useState(0);
const [completedModules, setCompletedModules] = useState<string[]>([]);

const handleEnroll = () => {
  setIsEnrolled(true);
  setProgress(5); // ?��??�度
};

const handleModuleComplete = (moduleId: string) => {
  setCompletedModules(prev => [...prev, moduleId]);
  // ?�新?�度
  const newProgress = ((completedModules.length + 1) / totalModules) * 100;
  setProgress(newProgress);
};
```

### 4. ?�享?�能

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
    alert('?�接已�?製到?�貼??);
  }
};
```

### 5. ?�誤?��?

```tsx
// Loading ?�??
if (loading) {
  return <LoadingSpinner message="載入�?.." />;
}

// Error ?�??
if (error) {
  return (
    <div className="text-center text-white">
      <h2>載入?�誤</h2>
      <p>{error}</p>
      <button onClick={retry}>?�試</button>
    </div>
  );
}

// 空數?��???
if (!data) {
  return (
    <div className="text-center text-white">
      <h2>?�容?�找??/h2>
      <button onClick={() => navigate('/courses')}>
        返�?課�??�表
      </button>
    </div>
  );
}
```

---

## ?�� ?�佳實踐檢?��???

### ???�發?�檢??

- [ ] 確�?使用�?��?�模?��?課�? vs ?�客�?
- [ ] 準�?好�??��??�?�數??
- [ ] 設�?好用?��??��?�?
- [ ] ?�慮多�?言?�援?��?

### ??實現?��?檢查

- [ ] �?��?��? loading ?�??
- [ ] 實現?�當?�錯誤�???
- [ ] 添�??�戶?��?（�???失�?消息�?
- [ ] 測試?�?��??��???

### ??完�?後檢??

- [ ] 測試?��?式設�?
- [ ] 驗�?多�?言?��?
- [ ] 檢查?�能（大?�數?��?�?
- [ ] 確�??�訪?�性�??�盤導航?�螢幕閱讀?��?

---

## ?�� 常�??�誤

### ??不�??�樣??

```tsx
// ?�誤：�?記�??�空?��?
<CourseTemplate modules={undefined} />

// ?�誤：混?�使?��??�模??
<BlogTemplate title="Course Title" modules={[]} />

// ?�誤：�?記�?調函??
<CourseTemplate onEnroll={undefined} /> // ?��??��?
```

### ??�?��?��?

```tsx
// �?��：檢?�數?��??��?
{modules && modules.length > 0 && (
  <CourseTemplate modules={modules} />
)}

// �?��：使?�正確�?模板
<CourseTemplate title="Course Title" modules={modules} />

// �?��：�?供�?調函??
<CourseTemplate onEnroll={handleEnroll} />
```

---

## ?�� ?��?式設計�?�?

```css
/* 模板已�??�響?��?設�?，�??�可以自定義 */
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

## ?? 調試?��?

### 檢查模板屬�?

```tsx
// ?��??�環境中添�?調試信息
{process.env.NODE_ENV === 'development' && (
  <div className="debug-info">
    <p>Modules: {modules?.length || 0}</p>
    <p>Enrolled: {isEnrolled ? 'Yes' : 'No'}</p>
    <p>Progress: {progress}%</p>
  </div>
)}
```

### React DevTools

- 使用 React DevTools 檢查組件�?
- ??�� props 變�?
- ?��?渲�??�能

---

**?�� 記�?：模?�是?��??��??�發?��??��??��??�性。根?�具體�?求�?活使?�這�??�置�?* 
