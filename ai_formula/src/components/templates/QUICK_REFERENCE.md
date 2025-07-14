# ?? æ¨¡æ¿å¿«é€Ÿå???(Template Quick Reference)

## ?? å¿«é€Ÿé?å§?

### ?? èª²ç?æ¨¡æ¿ (CourseTemplate)

```tsx
import { CourseTemplate } from '@/components/templates';

<CourseTemplate
  title="Course Title"              // ??å¿…é?
  description="Course description"  // ??å¿…é?  
  level="beginner"                 // ??å¿…é? (beginner|intermediate|advanced)
  duration="8 hours"               // ??å¿…é?
  modules={modules}                // ??å¿…é? (CourseModule[])
  onEnroll={() => {}}              // è¨»å??èª¿
  onModuleClick={(id) => {}}       // æ¨¡ç?é»æ??èª¿
/>
```

### ?“° ?šå®¢æ¨¡æ¿ (BlogTemplate)

```tsx
import { BlogTemplate } from '@/components/templates';

<BlogTemplate
  title="Article Title"            // ??å¿…é?
  excerpt="Article excerpt"        // ??å¿…é?
  content={<div>Content</div>}     // ??å¿…é? (React.ReactNode)
  author="Author Name"             // ??å¿…é?
  publishDate="Dec 7, 2024"       // ??å¿…é?
  readTime="5 min read"           // ??å¿…é?
  category="Technology"           // ??å¿…é?
  tags={["AI", "Tech"]}           // ??å¿…é? (string[])
  onBack={() => {}}               // è¿”å??èª¿
  onShare={() => {}}              // ?†äº«?èª¿
/>
```

---

## ?? ?¸æ?çµæ?æ¨¡æ¿

### CourseModule çµæ?

```tsx
const moduleExample = {
  id: "module-1",                    // string (å¿…é?)
  title: "Module Title",             // string (å¿…é?)
  titleZh: "æ¨¡ç?æ¨™é?",               // string (?¯é¸)
  description: "Module description", // string (å¿…é?)
  descriptionZh: "æ¨¡ç??è¿°",         // string (?¯é¸)
  duration: "2 hours",              // string (å¿…é?)
  durationZh: "2 å°æ?",             // string (?¯é¸)
  isCompleted: false,               // boolean (?¯é¸)
  isLocked: false,                  // boolean (?¯é¸)
  lessons: [                        // CourseLesson[] (å¿…é?)
    {
      id: "lesson-1",
      title: "Lesson Title",
      titleZh: "èª²ç?æ¨™é?",
      duration: "30 min",
      durationZh: "30 ?†é?",
      type: "video",                // "video"|"reading"|"quiz"|"exercise"
      isCompleted: false,
      isLocked: false
    }
  ]
};
```

---

## ?¨ å¸¸ç”¨?ç½®

### èª²ç?æ¨¡æ¿?ç½®

| ?´æ™¯ | ?ç½® |
|------|------|
| **?è²»èª²ç?** | `showRating={false}`, `isEnrolled={false}` |
| **ä»˜è²»èª²ç?** | `rating={4.8}`, `studentCount={1200}` |
| **å­¸ç?ä¸?* | `isEnrolled={true}`, `progress={75}` |
| **å®Œæ?èª²ç?** | `progress={100}`, `showProgress={true}` |

### ?šå®¢æ¨¡æ¿?ç½®

| ?´æ™¯ | ?ç½® |
|------|------|
| **?€è¡“æ?ç«?* | `showStats={true}`, `showTags={true}` |
| **?¬å¸?°è?** | `showBookmark={false}` |
| **ç°¡å–®?‡ç?** | `showStats={false}`, `showBackButton={false}` |

---

## ?”§ å¸¸ç”¨ä»?¢¼?‡æ®µ

### 1. ?¸æ??¼å?è½‰æ?

```tsx
// è½‰æ??¾æ??¸æ??°æ¨¡?¿æ ¼å¼?
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

### 2. å¤šè?è¨€?•ç?

```tsx
const { language } = useLanguage();
const isZhTW = language === 'zh-HK';

// ?¨æ¨¡?¿ä¸­ä½¿ç”¨
<CourseTemplate
  title={isZhTW ? course.titleZh : course.title}
  description={isZhTW ? course.descriptionZh : course.description}
  // ...
/>
```

### 3. ?€?‹ç®¡??

```tsx
const [isEnrolled, setIsEnrolled] = useState(false);
const [progress, setProgress] = useState(0);
const [completedModules, setCompletedModules] = useState<string[]>([]);

const handleEnroll = () => {
  setIsEnrolled(true);
  setProgress(5); // ?‹å??²åº¦
};

const handleModuleComplete = (moduleId: string) => {
  setCompletedModules(prev => [...prev, moduleId]);
  // ?´æ–°?²åº¦
  const newProgress = ((completedModules.length + 1) / totalModules) * 100;
  setProgress(newProgress);
};
```

### 4. ?†äº«?Ÿèƒ½

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
    alert('?ˆæ¥å·²è?è£½åˆ°?ªè²¼??);
  }
};
```

### 5. ?¯èª¤?•ç?

```tsx
// Loading ?€??
if (loading) {
  return <LoadingSpinner message="è¼‰å…¥ä¸?.." />;
}

// Error ?€??
if (error) {
  return (
    <div className="text-center text-white">
      <h2>è¼‰å…¥?¯èª¤</h2>
      <p>{error}</p>
      <button onClick={retry}>?è©¦</button>
    </div>
  );
}

// ç©ºæ•¸?šç???
if (!data) {
  return (
    <div className="text-center text-white">
      <h2>?§å®¹?ªæ‰¾??/h2>
      <button onClick={() => navigate('/courses')}>
        è¿”å?èª²ç??—è¡¨
      </button>
    </div>
  );
}
```

---

## ?¯ ?€ä½³å¯¦è¸æª¢?¥æ???

### ???‹ç™¼?æª¢??

- [ ] ç¢ºè?ä½¿ç”¨æ­?¢º?„æ¨¡?¿ï?èª²ç? vs ?šå®¢ï¼?
- [ ] æº–å?å¥½æ??‰å??€?„æ•¸??
- [ ] è¨­è?å¥½ç”¨?¶ä??•æ?ç¨?
- [ ] ?ƒæ…®å¤šè?è¨€?¯æ´?€æ±?

### ??å¯¦ç¾?Ÿé?æª¢æŸ¥

- [ ] æ­?¢º?•ç? loading ?€??
- [ ] å¯¦ç¾?©ç•¶?„éŒ¯èª¤è???
- [ ] æ·»å??¨æˆ¶?é?ï¼ˆæ???å¤±æ?æ¶ˆæ¯ï¼?
- [ ] æ¸¬è©¦?€?‰ä??•å???

### ??å®Œæ?å¾Œæª¢??

- [ ] æ¸¬è©¦?¿æ?å¼è¨­è¨?
- [ ] é©—è?å¤šè?è¨€?‡æ?
- [ ] æª¢æŸ¥?§èƒ½ï¼ˆå¤§?æ•¸?šæ?ï¼?
- [ ] ç¢ºä??¯è¨ª?æ€§ï??µç›¤å°èˆª?è¢å¹•é–±è®€?¨ï?

---

## ?š¨ å¸¸è??¯èª¤

### ??ä¸è??™æ¨£??

```tsx
// ?¯èª¤ï¼šå?è¨˜è??†ç©º?¸æ?
<CourseTemplate modules={undefined} />

// ?¯èª¤ï¼šæ··?ˆä½¿?¨ä??Œæ¨¡??
<BlogTemplate title="Course Title" modules={[]} />

// ?¯èª¤ï¼šå?è¨˜å?èª¿å‡½??
<CourseTemplate onEnroll={undefined} /> // ?‰é??¡æ?
```

### ??æ­?¢º?šæ?

```tsx
// æ­?¢ºï¼šæª¢?¥æ•¸?šæ??ˆæ€?
{modules && modules.length > 0 && (
  <CourseTemplate modules={modules} />
)}

// æ­?¢ºï¼šä½¿?¨æ­£ç¢ºç?æ¨¡æ¿
<CourseTemplate title="Course Title" modules={modules} />

// æ­?¢ºï¼šæ?ä¾›å?èª¿å‡½??
<CourseTemplate onEnroll={handleEnroll} />
```

---

## ?“± ?¿æ?å¼è¨­è¨ˆæ?ç¤?

```css
/* æ¨¡æ¿å·²å??«éŸ¿?‰å?è¨­è?ï¼Œä??¨å¯ä»¥è‡ªå®šç¾© */
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

## ?? èª¿è©¦?€å·?

### æª¢æŸ¥æ¨¡æ¿å±¬æ€?

```tsx
// ?¨é??¼ç’°å¢ƒä¸­æ·»å?èª¿è©¦ä¿¡æ¯
{process.env.NODE_ENV === 'development' && (
  <div className="debug-info">
    <p>Modules: {modules?.length || 0}</p>
    <p>Enrolled: {isEnrolled ? 'Yes' : 'No'}</p>
    <p>Progress: {progress}%</p>
  </div>
)}
```

### React DevTools

- ä½¿ç”¨ React DevTools æª¢æŸ¥çµ„ä»¶æ¨?
- ??§ props è®Šå?
- ?¥ç?æ¸²æ??§èƒ½

---

**?’¡ è¨˜ä?ï¼šæ¨¡?¿æ˜¯?ºä??é??‹ç™¼?ˆç??Œä??ä??´æ€§ã€‚æ ¹?šå…·é«”é?æ±‚é?æ´»ä½¿?¨é€™ä??ç½®ï¼?* 
