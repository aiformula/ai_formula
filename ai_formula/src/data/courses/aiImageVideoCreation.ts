/**
 * AI Image & Video Creation Course Data
 * @fileoverview Course data for AI Image & Video Creation Mastery
 * @author AI Formula Team
 * @version 2.0.0
 */

import { CourseDetail, CourseModule, CourseLesson } from '../../types/courseTypes';
import { courseManager } from './courseManager';

/**
 * Course lessons data
 */
const lessons: CourseLesson[] = [
  // Module 1: Getting Started with AI Image Generation
  courseManager.createLesson({
    id: 1,
    title: {
      en: 'What is AI Image Generation?',
      zhHK: '什麼係AI圖像生成？'
    },
    duration: {
      en: '15 min',
      zhHK: '15分鐘'
    },
    description: {
      en: 'Understanding the fundamentals of AI image creation',
      zhHK: '了解AI圖像創作嘅基礎知識'
    },
    videoUrl: '/videos/ai-intro.mp4',
    isLocked: false,
    estimatedMinutes: 15,
    tags: ['introduction', 'fundamentals', 'ai-basics'],
    textContent: {
      en: `# What is AI Image Generation?

AI image generation is a revolutionary technology that uses artificial intelligence to create stunning visual content from simple text descriptions. This technology has completely transformed the creative industry, making professional-quality image creation accessible to everyone.

## Key Concepts:

**1. Text-to-Image AI Technology**
- Advanced AI models trained on millions of images and descriptions
- Understands complex relationships between words and visual elements
- Creates entirely original images based on your creative prompts
- Processes natural language to generate photorealistic or artistic visuals

**2. Leading AI Image Platforms**
- **Midjourney**: Industry leader for artistic and creative imagery
- **DALL-E 3**: Excellent for realistic and detailed photographs
- **Stable Diffusion**: Open-source with advanced customization
- **Adobe Firefly**: Integrated creative suite solutions

**3. How the Magic Works**
- Write a descriptive text prompt of your vision
- AI processes your prompt using neural networks
- Generate multiple variations to choose from
- Refine and iterate until you achieve perfection

## Amazing Creative Applications:

**Digital Art & Illustration**
- Create stunning artwork in any style you imagine
- Explore different artistic movements and techniques  
- Generate concept art for personal projects

**Photography & Visual Storytelling**
- Master composition and lighting techniques
- Experiment with different photography styles
- Create compelling visual narratives

**Design & Aesthetics**
- Learn color theory through practical application
- Understand visual hierarchy and balance
- Explore typography and layout principles

**Creative Learning**
- Study art history through recreation
- Practice visual communication skills
- Develop your unique artistic voice

## Getting Started Journey:
1. **Choose Your Platform** - Start with Midjourney for best results
2. **Master Prompt Writing** - Learn the art of descriptive language
3. **Practice Daily** - Build your skills with regular creation
4. **Study Successful Examples** - Learn from community showcases
5. **Develop Your Style** - Find your unique creative voice

This technology is democratizing visual content creation, empowering anyone to produce professional-quality images that were once only possible with years of design training and expensive software.`,
      zhHK: `# 什麼係AI圖像生成？

AI圖像生成係一種革命性嘅技術，用人工智能從簡單嘅文字描述創造出令人驚嘆嘅視覺內容。呢項技術已經完全改變咗創意行業，令專業質素嘅圖像創作變得人人都做得到。

## 重要概念：

**1. 文字轉圖像AI技術**
- 先進嘅AI模型用數百萬張圖片同描述嚟訓練
- 理解文字同視覺元素之間嘅複雜關係
- 根據你嘅創意提示創造完全原創嘅圖像
- 處理自然語言嚟生成超寫實或藝術視覺效果

**2. 領先嘅AI圖像平台**
- **Midjourney**: 藝術同創意圖像嘅行業領導者
- **DALL-E 3**: 擅長寫實同詳細嘅照片
- **Stable Diffusion**: 開源同高級自定義功能
- **Adobe Firefly**: 整合創意套件解決方案

**3. 魔法點樣運作**
- 寫一個描述性嘅文字提示表達你嘅願景
- AI用神經網絡處理你嘅提示
- 生成多個變化俾你選擇
- 改進同迭代直到你達到完美

## 驚人嘅創意應用：

**數碼藝術同插畫**
- 創造任何你想象風格嘅精美藝術品
- 探索不同嘅藝術運動同技巧
- 為個人項目生成概念藝術

**攝影同視覺敘事**
- 掌握構圖同燈光技巧
- 實驗不同嘅攝影風格
- 創造引人入勝嘅視覺故事

**設計同美學**
- 通過實際應用學習色彩理論
- 理解視覺層次同平衡
- 探索版面設計同排版原則

**創意學習**
- 通過重現學習藝術史
- 練習視覺溝通技巧
- 發展你獨特嘅藝術聲音

## 開始使用之旅：
1. **選擇你嘅平台** - 由Midjourney開始獲得最佳效果
2. **掌握提示寫作** - 學習描述性語言嘅藝術
3. **每日練習** - 通過定期創作建立你嘅技能
4. **研究成功例子** - 從社群展示中學習
5. **發展你嘅風格** - 找到你獨特嘅創意聲音

呢項技術正在令視覺內容創作變得民主化，賦予任何人製作專業質素圖像嘅能力，呢啲圖像以前只有經過多年設計訓練同昂貴軟件先做得到。`
    }
  }),

  courseManager.createLesson({
    id: 2,
    title: {
      en: 'Setting Up Your Midjourney Account',
      zhHK: '設置你嘅Midjourney帳戶'
    },
    duration: {
      en: '10 min',
      zhHK: '10分鐘'
    },
    description: {
      en: 'Step-by-step account setup and Discord integration',
      zhHK: '逐步帳戶設置同Discord整合'
    },
    videoUrl: '/videos/midjourney-setup.mp4',
    isLocked: false,
    estimatedMinutes: 10,
    tags: ['setup', 'midjourney', 'discord'],
    textContent: {
      en: `# Setting Up Your Midjourney Account

## 🚀 Why Midjourney?

You no longer need to be a talented artist to create engaging images. With just a few prompts, you can create compelling works in minutes. The secret lies in Midjourney.

Midjourney harnesses the creativity of generative AI to do most of the heavy lifting. Your job is simply to pass it a small piece of text describing the type of image you want, and it automatically generates the image you want.

## 🔧 How to Get Started with Midjourney in 4 Simple Steps

### Step #1: Sign Up Using Google or Discord
You can sign up for Midjourney using your Google or Discord account. Head to the **Midjourney website** to register for an account.

### Step #2: Use Discord or Web Interface
Once Discord is up and running, you can go to the **Midjourney website** and choose "Sign In", or click the **Discord invite link** to go directly.

### Step #3: Choose Your Midjourney Membership Plan
Midjourney has four subscription tiers with different features and capabilities.

### Step #4: Start Generating Images
Use the **Imagine Bar** to enter prompts from anywhere on the web interface, or use Discord commands to start creating.

## 🎨 How to Generate Your First Midjourney Image

To generate your first image, you can use the "Imagine" bar on the web interface or visit one of the newbie channels on Discord.

**Generation Time:** It takes about a minute to generate a response with four different image variations.

## ✨ Editing and Refining Your Midjourney Images

After generation, you can:
- **Upscale** (U1-U4) - Create larger, more detailed versions
- **Variations** (V1-V4) - Generate similar images with modifications
- **Re-roll** (🔄) - Generate completely new variations

## 🎯 Essential Parameters for Better Results

- **--ar 16:9** (landscape aspect ratio)
- **--ar 1:1** (square aspect ratio)  
- **--ar 9:16** (vertical aspect ratio)
- **--v 6** (latest Midjourney version)
- **--q 2** (high quality)

Your journey into AI image creation starts here!`,
      zhHK: `# 設置你嘅Midjourney帳戶

## 🚀 點解選擇Midjourney？

你不再需要成為有才華的藝術家才能創造出引人入勝的圖像。只需幾個提示，幾分鐘內就能創作出引人入勝的作品。秘訣就在於Midjourney。

Midjourney利用生成式人工智慧的創造力來完成大部分繁重的工作。你的工作只是向它傳遞一小段文字來描述你想要的圖像類型，它就會自動產生你想要的圖像。

## 🔧 通過4個簡單步驟開始使用Midjourney

### 第1步：使用Google或Discord註冊
你可以使用Google或Discord帳號註冊Midjourney。前往**Midjourney網站**註冊帳戶。

### 第2步：使用Discord或Web介面
啟動Discord後，你可以前往**Midjourney網站**並選擇"登入"，或點擊**Discord邀請連結**直接進入。

### 第3步：選擇你嘅Midjourney會員計劃
Midjourney有四個訂閱等級，具有不同功能和能力。

### 第4步：開始生成圖像
使用**Imagine Bar**在網頁介面任何地方輸入提示，或使用Discord命令開始創作。

## 🎨 如何產生你嘅第一張Midjourney影像

要產生你的第一張圖片，你可以使用網頁介面上的"想像"欄，也可以造訪Discord上的新手頻道。

**生成時間：** 產生回應大約需要一分鐘，會提供四個不同的圖像變化。

## ✨ 編輯並完善你嘅Midjourney圖像

生成後，你可以：
- **放大** (U1-U4) - 創建更大、更詳細的版本
- **變化** (V1-V4) - 生成類似但有修改的圖像
- **重新生成** (🔄) - 生成完全新的變化

## 🎯 獲得更好結果嘅基本參數

- **--ar 16:9** （橫向寬高比）
- **--ar 1:1** （正方形寬高比）
- **--ar 9:16** （垂直寬高比）
- **--v 6** （最新Midjourney版本）
- **--q 2** （高質量）

你嘅AI圖像創作之旅從這裡開始！`
    }
  }),

  courseManager.createLesson({
    id: 3,
    title: {
      en: 'Your First AI Image',
      zhHK: '你嘅第一張AI圖像'
    },
    duration: {
      en: '20 min',
      zhHK: '20分鐘'
    },
    description: {
      en: 'Create your first image using simple prompts',
      zhHK: '用簡單提示創作你嘅第一張圖像'
    },
    videoUrl: '/videos/first-image.mp4',
    isLocked: false,
    estimatedMinutes: 20,
    tags: ['first-image', 'practice', 'beginner'],
    textContent: {
      en: `# Your First AI Image

Now that you have your Midjourney account set up, let's create your first stunning AI-generated image!

## Understanding Prompt Structure

A successful Midjourney prompt follows this proven structure:
**Subject + Style + Setting + Details = Amazing Results**

### Example Breakdown:
- **Subject**: "a majestic lion"
- **Style**: "digital art"
- **Setting**: "in an African savanna"
- **Details**: "golden hour lighting, photorealistic"

**Complete Prompt**: "a majestic lion, digital art, in an African savanna, golden hour lighting, photorealistic"

## Perfect Beginner Practice Prompts

Start with these professionally crafted prompts:

1. **"a peaceful mountain lake at sunrise, landscape photography, misty atmosphere"**
2. **"a cozy bookstore interior, warm golden lighting, vintage aesthetic"**
3. **"a futuristic city skyline, neon lights, cyberpunk style, night scene"**
4. **"a vintage bicycle with flowers in the basket, watercolor illustration"**
5. **"a magical treehouse in an enchanted forest, fantasy art style"**

## Avoiding Common Beginner Mistakes

**❌ Too Vague**: "nice picture" 
**✅ Much Better**: "a serene mountain landscape at golden hour, professional photography"

**❌ Overly Complex**: "a dragon fighting a knight while riding a unicorn in space during a thunderstorm"
**✅ Much Better**: "a medieval knight confronting a majestic dragon, fantasy art style"

## Professional Tips for Exceptional Results

**Prompt Crafting:**
- **Be descriptive yet concise** - Paint a clear picture with words
- **Use recognized art terms** - "chiaroscuro lighting", "rule of thirds"
- **Include emotional context** - "serene", "dramatic", "whimsical"

Congratulations! You've just entered the exciting world of AI-powered creativity.`,
      zhHK: `# 你嘅第一張AI圖像

而家你已經設置好Midjourney，我哋嚟創作你嘅第一張令人驚嘆嘅AI生成圖像！

## 理解提示結構

一個成功嘅Midjourney提示遵循呢個實證結構：
**主題 + 風格 + 設置 + 細節 = 驚人結果**

### 例子分解：
- **主題**: "一隻威武嘅獅子"
- **風格**: "數碼藝術"
- **設置**: "在非洲大草原"
- **細節**: "黃金時間光線，超寫實"

**完整提示**: "一隻威武嘅獅子，數碼藝術，在非洲大草原，黃金時間光線，超寫實"

## 完美新手練習提示

由呢啲專業製作嘅提示開始：

1. **"日出時寧靜嘅山湖，風景攝影，霧濛濛氣氛"**
2. **"舒適書店內部，溫暖金色燈光，復古美學"**
3. **"未來城市天際線，霓虹燈，賽博朋克風格，夜景"**
4. **"籃子裡有花嘅復古單車，水彩插畫"**
5. **"魔法森林中嘅神奇樹屋，幻想藝術風格"**

## 避免常見新手錯誤

**❌ 太模糊**: "靚圖片"
**✅ 好得多**: "黃金時間寧靜嘅山景，專業攝影"

**❌ 過於複雜**: "一條龍同騎士打架同時騎住獨角獸在太空雷暴中"
**✅ 好得多**: "中世紀騎士面對威武嘅龍，幻想藝術風格"

## 獲得卓越結果嘅專業貼士

**提示製作：**
- **描述性但簡潔** - 用文字畫出清晰嘅圖像
- **使用公認嘅藝術術語** - "明暗對比燈光"、"三分法則"
- **包含情感背景** - "寧靜"、"戲劇性"、"奇幻"

恭喜！你剛剛進入咗AI驅動創意嘅令人興奮世界。`
    }
  }),

  // Module 2: Basic Prompt Writing
  courseManager.createLesson({
    id: 4,
    title: {
      en: 'Prompt Structure Basics',
      zhHK: '提示結構基礎'
    },
    duration: {
      en: '25 min',
      zhHK: '25分鐘'
    },
    description: {
      en: 'Understanding how to structure effective prompts',
      zhHK: '了解點樣構造有效嘅提示'
    },
    videoUrl: '/videos/prompt-basics.mp4',
    isLocked: false,
    estimatedMinutes: 25,
    tags: ['prompt-structure', 'basics', 'technique']
  }),

  courseManager.createLesson({
    id: 5,
    title: {
      en: 'Common Prompt Mistakes',
      zhHK: '常見提示錯誤'
    },
    duration: {
      en: '15 min',
      zhHK: '15分鐘'
    },
    description: {
      en: 'Avoid these common pitfalls when writing prompts',
      zhHK: '避免寫提示時嘅常見陷阱'
    },
    videoUrl: '/videos/prompt-mistakes.mp4',
    isLocked: false,
    estimatedMinutes: 15,
    tags: ['mistakes', 'pitfalls', 'improvement']
  })
];

/**
 * Course modules
 */
const freeModules: CourseModule[] = [
  courseManager.createModule({
    id: 1,
    title: {
      en: 'Getting Started with AI Image Generation',
      zhHK: 'AI圖像生成入門'
    },
    description: {
      en: 'Introduction to AI image generation and basic concepts',
      zhHK: 'AI圖像生成介紹同基本概念'
    },
    lessons: lessons.slice(0, 3),
    order: 1
  }),

  courseManager.createModule({
    id: 2,
    title: {
      en: 'Basic Prompt Writing',
      zhHK: '基礎提示寫作'
    },
    description: {
      en: 'Learn the fundamentals of effective prompt creation',
      zhHK: '學習有效提示創作嘅基礎知識'
    },
    lessons: lessons.slice(3, 5),
    order: 2
  })
];

const proModules: CourseModule[] = [
  courseManager.createModule({
    id: 3,
    title: {
      en: 'Secret Keywords & Power Prompts',
      zhHK: '秘密關鍵詞同強力提示'
    },
    description: {
      en: 'Unlock hidden Midjourney keywords and master advanced prompt engineering',
      zhHK: '解鎖隱藏嘅Midjourney關鍵詞同掌握高級提示工程'
    },
    lessons: [
      courseManager.createLesson({
        id: 6,
        title: {
          en: 'Secret Photography Keywords',
          zhHK: '秘密攝影關鍵詞'
        },
        duration: {
          en: '40 min',
          zhHK: '40分鐘'
        },
        description: {
          en: 'Master professional photography keywords that pros use',
          zhHK: '掌握專業攝影師使用嘅關鍵詞'
        },
        videoUrl: '/videos/secret-keywords.mp4',
        isLocked: true,
        estimatedMinutes: 40,
        tags: ['secret-keywords', 'photography', 'professional']
      }),
      courseManager.createLesson({
        id: 7,
        title: {
          en: 'Midjourney Interface Mastery',
          zhHK: 'Midjourney界面精通'
        },
        duration: {
          en: '35 min',
          zhHK: '35分鐘'
        },
        description: {
          en: 'Master every button, setting, and hidden feature in Midjourney',
          zhHK: '精通Midjourney每個按鈕、設置同隱藏功能'
        },
        videoUrl: '/videos/interface-mastery.mp4',
        isLocked: true,
        estimatedMinutes: 35,
        tags: ['interface', 'mastery', 'advanced']
      })
    ],
    order: 3
  }),

  courseManager.createModule({
    id: 4,
    title: {
      en: 'AI Prompt Engineering Mastery',
      zhHK: 'AI提示工程精通'
    },
    description: {
      en: 'Learn advanced prompt crafting techniques and secret formulas',
      zhHK: '學習高級提示製作技巧同秘密公式'
    },
    lessons: [
      courseManager.createLesson({
        id: 8,
        title: {
          en: 'Midjourney V7 Revolutionary Features',
          zhHK: 'Midjourney V7革命性功能'
        },
        duration: {
          en: '50 min',
          zhHK: '50分鐘'
        },
        description: {
          en: 'Master V7 Draft Mode, Personalization, and Omni-Reference',
          zhHK: '精通V7草稿模式、個人化同全方位參考'
        },
        videoUrl: '/videos/v7-features.mp4',
        isLocked: true,
        estimatedMinutes: 50,
        tags: ['v7', 'features', 'advanced']
      }),
      courseManager.createLesson({
        id: 9,
        title: {
          en: 'Image References & Advanced Parameters',
          zhHK: '圖像參考同高級參數'
        },
        duration: {
          en: '45 min',
          zhHK: '45分鐘'
        },
        description: {
          en: 'Master image prompts, style references, and professional parameters',
          zhHK: '精通圖像提示、風格參考同專業參數'
        },
        videoUrl: '/videos/image-references.mp4',
        isLocked: true,
        estimatedMinutes: 45,
        tags: ['image-references', 'parameters', 'advanced']
      })
    ],
    order: 4
  })
];

/**
 * Main course data
 */
export const aiImageVideoCreationCourse: CourseDetail = courseManager.createCourse({
  id: 'ai-image-video-creation',
  title: {
    en: 'AI Image & Video Creation Mastery',
    zhHK: 'AI圖像影片創作精通課程'
  },
  description: {
    en: 'Master the art of AI-powered visual content creation for creative expression. Learn industry-leading tools and artistic techniques.',
    zhHK: '精通AI驅動嘅視覺內容創作，用於創意表達。學習業界領先嘅工具同藝術技巧。'
  },
  category: 'Creative Design',
  difficulty: 'Beginner',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula 團隊'
  },
  totalDuration: {
    en: '8+ hours of content',
    zhHK: '8小時以上內容'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '基本電腦技能'
    },
    {
      en: 'Internet connection',
      zhHK: '互聯網連接'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '無需AI經驗'
    }
  ],
  learningOutcomes: [
    {
      en: 'Create professional AI-generated images',
      zhHK: '創作專業AI生成圖像'
    },
    {
      en: 'Master Midjourney prompt engineering',
      zhHK: '精通Midjourney提示工程'
    },
    {
      en: 'Understand artistic styles and techniques',
      zhHK: '了解藝術風格同技巧'
    },
    {
      en: 'Develop your creative visual skills',
      zhHK: '發展你嘅創意視覺技能'
    }
  ],
  freeModules,
  proModules,
  freeBonuses: [
    {
      en: '50+ Prompt Templates',
      zhHK: '50+提示模板'
    },
    {
      en: 'Style Reference Library',
      zhHK: '風格參考庫'
    },
    {
      en: 'Community Support Forum',
      zhHK: '社群支援論壇'
    }
  ],
  proBonuses: [
    {
      en: '200+ Advanced Prompt Templates',
      zhHK: '200+高級提示模板'
    },
    {
      en: 'Exclusive Style Guide Library',
      zhHK: '獨家風格指南庫'
    },
    {
      en: 'Creative Inspiration Gallery',
      zhHK: '創意靈感畫廊'
    },
    {
      en: 'Art History Reference Guide',
      zhHK: '藝術史參考指南'
    }
  ],
  pricing: {
    free: '免費',
    pro: 'HK$699',
    original: 'HK$1,299',
    savings: '46%'
  },
  stats: {
    enrollmentCount: 1847,
    rating: 4.6,
    reviews: 234
  },
  metadata: {
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-20'),
    version: '2.0.0',
    author: 'AI Formula Team'
  }
});

/**
 * Export course data with error handling
 */
export const getCourseData = async (): Promise<CourseDetail> => {
  try {
    // Validate course data
    const validationErrors = courseManager.validateCourse(aiImageVideoCreationCourse);
    if (validationErrors.some(error => error.severity === 'error')) {
      throw new Error(`Course validation failed: ${validationErrors.map(e => e.message).join(', ')}`);
    }

    return aiImageVideoCreationCourse;
  } catch (error) {
    console.error('Error loading AI Image & Video Creation course:', error);
    throw error;
  }
};

/**
 * Export course statistics
 */
export const getCourseStats = () => courseManager.calculateCourseStats(aiImageVideoCreationCourse);

/**
 * Export course summary
 */
export const getCourseSummary = () => courseManager.getCourseSummary(aiImageVideoCreationCourse); 