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
      zhHK: '什麼�?AI?��??��?�?
    },
    duration: {
      en: '15 min',
      zhHK: '15?��?'
    },
    description: {
      en: 'Understanding the fundamentals of AI image creation',
      zhHK: '了解AI?��??��??�基礎知�?
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
      zhHK: `# 什麼�?AI?��??��?�?

AI?��??��?係�?種革?�性�??�術�??�人工智?��?簡單?��?字�?述創?�出令人驚�??��?覺內容。呢?��?術已經�??�改變�??��?行業，令專業質�??��??�創作�?得人人都?��??��?

## ?��?概念�?

**1. ?��?轉�??�AI?��?*
- ?�進�?AI模�??�數?�萬張�??��??�述?��?�?
- ?�解?��??��?覺�?素�??��?複�??��?
- ?��?你�??��??�示?�造�??��??��??��?
- ?��??�然語�??��??��?寫實?��?術�?覺�???

**2. ?��??�AI?��?平台**
- **Midjourney**: ?��??�創?��??��?行業?��???
- **DALL-E 3**: ?�長寫實?�詳細�??��?
- **Stable Diffusion**: ?��??��?級自定義?�能
- **Adobe Firefly**: ?��??��?套件�?��?��?

**3. 魔�?點樣?��?**
- 寫�??��?述性�??��??�示表�?你�?願景
- AI?��?經網絡�??��??��?�?
- ?��?多個�??�俾你選??
- ?�進�?迭代?�到你�??��?�?

## 驚人?�創?��??��?

**?�碼?��??��???*
- ?�造任何�??�象風格?�精美�?術�?
- ?�索不�??��?術�??��??��?
- ?�個人?�目?��?概念?��?

**?�影?��?覺�?�?*
- ?�握構�??��??��?�?
- 實�?不�??��?影風??
- ?�造�?人入?��?視覺?��?

**設�??��?�?*
- ?��?實�??�用學�??�彩?��?
- ?�解視覺層次?�平�?
- ?�索?�面設�??��??��???

**?��?學�?**
- ?��??�現學�??��???
- 練�?視覺溝通�?�?
- ?��?你獨?��??��??�音

## ?��?使用之�?�?
1. **?��?你�?平台** - ?�Midjourney?��??��??�佳�???
2. **?�握?�示寫�?** - 學�??�述?��?言?��?�?
3. **每日練�?** - ?��?定�??��?建�?你�??�??
4. **?�究?��?例�?** - 從社群�?示中學�?
5. **?��?你�?風格** - ?�到你獨?��??��??�音

?��??�術正?�令視覺?�容?��?變�?民主?��?賦�?任�?人製作�?業質素�??��??��?，呢?��??�以?�只?��??��?年設計�?練�??�貴軟件?��?得到?�`
    }
  }),

  courseManager.createLesson({
    id: 2,
    title: {
      en: 'Setting Up Your Midjourney Account',
      zhHK: '設置你�?Midjourney帳戶'
    },
    duration: {
      en: '10 min',
      zhHK: '10?��?'
    },
    description: {
      en: 'Step-by-step account setup and Discord integration',
      zhHK: '?�步帳戶設置?�Discord?��?'
    },
    videoUrl: '/videos/midjourney-setup.mp4',
    isLocked: false,
    estimatedMinutes: 10,
    tags: ['setup', 'midjourney', 'discord'],
    textContent: {
      en: `# Setting Up Your Midjourney Account

## ?? Why Midjourney?

You no longer need to be a talented artist to create engaging images. With just a few prompts, you can create compelling works in minutes. The secret lies in Midjourney.

Midjourney harnesses the creativity of generative AI to do most of the heavy lifting. Your job is simply to pass it a small piece of text describing the type of image you want, and it automatically generates the image you want.

## ?�� How to Get Started with Midjourney in 4 Simple Steps

### Step #1: Sign Up Using Google or Discord
You can sign up for Midjourney using your Google or Discord account. Head to the **Midjourney website** to register for an account.

### Step #2: Use Discord or Web Interface
Once Discord is up and running, you can go to the **Midjourney website** and choose "Sign In", or click the **Discord invite link** to go directly.

### Step #3: Choose Your Midjourney Membership Plan
Midjourney has four subscription tiers with different features and capabilities.

### Step #4: Start Generating Images
Use the **Imagine Bar** to enter prompts from anywhere on the web interface, or use Discord commands to start creating.

## ?�� How to Generate Your First Midjourney Image

To generate your first image, you can use the "Imagine" bar on the web interface or visit one of the newbie channels on Discord.

**Generation Time:** It takes about a minute to generate a response with four different image variations.

## ??Editing and Refining Your Midjourney Images

After generation, you can:
- **Upscale** (U1-U4) - Create larger, more detailed versions
- **Variations** (V1-V4) - Generate similar images with modifications
- **Re-roll** (??) - Generate completely new variations

## ?�� Essential Parameters for Better Results

- **--ar 16:9** (landscape aspect ratio)
- **--ar 1:1** (square aspect ratio)  
- **--ar 9:16** (vertical aspect ratio)
- **--v 6** (latest Midjourney version)
- **--q 2** (high quality)

Your journey into AI image creation starts here!`,
      zhHK: `# 設置你�?Midjourney帳戶

## ?? 點解?��?Midjourney�?

你�??��?要�??��??�華?��?術家?�能?�造出引人?��??��??�。只?�幾個�?示�?幾�??�內就能?��??��?人入?��?作�??��?�?��?�於Midjourney??

Midjourney?�用?��?式人工智?��??�造�?來�??�大?��?繁�??�工作。�??�工作只?��?它傳?��?小段?��?來�?述�??��??��??��??��?它就?�自?�產?��??��??��??��?

## ?�� ?��?4?�簡?�步驟�?始使?�Midjourney

### �?步�?使用Google?�Discord註�?
你可以使?�Google?�Discord帳�?註�?Midjourney?��?往**Midjourney網�?**註�?帳戶??

### �?步�?使用Discord?�Web介面
?��?Discord後�?你可以�?往**Midjourney網�?**並選???�入"，�?點�?**Discord?�請�??**?�接?�入??

### �?步�??��?你�?Midjourney?�員計�?
Midjourney?��??��??��?級�??��?不�??�能?�能?��?

### �?步�??��??��??��?
使用**Imagine Bar**?�網?��??�任何地?�輸?��?示�??�使?�Discord?�令?��??��???

## ?�� 如�??��?你�?第�?張Midjourney影�?

要產?��??�第一張�??��?你可以使?�網?��??��????��?"欄�?也可以造訪Discord上�??��??��???

**?��??��?�?* ?��??��?大�??�要�??��?，�??��??�個�??��??��?變�???

## ??編輯並�??��??�Midjourney?��?

?��?後�?你可以�?
- **?�大** (U1-U4) - ?�建?�大?�更詳細?��???
- **變�?** (V1-V4) - ?��?類似但�?修改?��???
- **?�新?��?** (??) - ?��?完全?��?變�?

## ?�� ?��??�好結�??�基?��???

- **--ar 16:9** （橫?�寬高�?�?
- **--ar 1:1** （正?�形寬�?比�?
- **--ar 9:16** （�??�寬高�?�?
- **--v 6** （�??�Midjourney?�本�?
- **--q 2** （�?質�?�?

你�?AI?��??��?之�?從這裡?��?！`
    }
  }),

  courseManager.createLesson({
    id: 3,
    title: {
      en: 'Your First AI Image',
      zhHK: '你�?第�?張AI?��?'
    },
    duration: {
      en: '20 min',
      zhHK: '20?��?'
    },
    description: {
      en: 'Create your first image using simple prompts',
      zhHK: '?�簡?��?示創作�??�第一張�???
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

**??Too Vague**: "nice picture" 
**??Much Better**: "a serene mountain landscape at golden hour, professional photography"

**??Overly Complex**: "a dragon fighting a knight while riding a unicorn in space during a thunderstorm"
**??Much Better**: "a medieval knight confronting a majestic dragon, fantasy art style"

## Professional Tips for Exceptional Results

**Prompt Crafting:**
- **Be descriptive yet concise** - Paint a clear picture with words
- **Use recognized art terms** - "chiaroscuro lighting", "rule of thirds"
- **Include emotional context** - "serene", "dramatic", "whimsical"

Congratulations! You've just entered the exciting world of AI-powered creativity.`,
      zhHK: `# 你�?第�?張AI?��?

?�家你已經設置好Midjourney，�??��??��?你�?第�?張令人�??��?AI?��??��?�?

## ?�解?�示結�?

一?��??��?Midjourney?�示?�循?�個實證�?構�?
**主�? + 風格 + 設置 + 細�? = 驚人結�?**

### 例�??�解�?
- **主�?**: "一?��?武�??��?"
- **風格**: "?�碼?��?"
- **設置**: "?��?洲大?��?"
- **細�?**: "黃�??��??��?，�?寫實"

**完整?�示**: "一?��?武�??��?，數碼�?術�??��?洲大?��?，�??��??��?線�?超寫�?

## 完�??��?練�??�示

?�呢?��?業製作�??�示?��?�?

1. **"?�出?�寧?��?山�?，風?��?影�??��?濛氣�?**
2. **"?�適?��??�部，溫?��??��??��?復古美學"**
3. **"?��??��?天�?線�??�虹?��?賽�??��?風格，�???**
4. **"籃�?裡�??��?復古?��?，水彩�???**
5. **"魔�?森�?中�?神�?樹�?，幻?��?術風??**

## ?��?常�??��??�誤

**??太模�?*: "?��???
**??好�?�?*: "黃�??��?寧�??�山?��?專業?�影"

**???�於複�?**: "一條�??��?士�??��??��?住獨角獸?�太空雷?�中"
**??好�?�?*: "中�?紀騎士?��?威武?��?，幻?��?術風??

## ?��??��?結�??��?業貼�?

**?�示製�?�?*
- **?�述?��?簡�?** - ?��?字畫?��??��??��?
- **使用?��??��?術�?�?* - "?��?對�??��?"??三�?法�?"
- **?�含?��??�景** - "寧�?"???��?????奇幻"

?��?！�??��??�入?�AI驅�??��??�令人�?奮�??�。`
    }
  }),

  // Module 2: Basic Prompt Writing
  courseManager.createLesson({
    id: 4,
    title: {
      en: 'Prompt Structure Basics',
      zhHK: '?�示結�??��?'
    },
    duration: {
      en: '25 min',
      zhHK: '25?��?'
    },
    description: {
      en: 'Understanding how to structure effective prompts',
      zhHK: '了解點樣構造�??��??�示'
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
      zhHK: '常�??�示?�誤'
    },
    duration: {
      en: '15 min',
      zhHK: '15?��?'
    },
    description: {
      en: 'Avoid these common pitfalls when writing prompts',
      zhHK: '?��?寫�?示�??�常見陷??
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
      zhHK: 'AI?��??��??��?'
    },
    description: {
      en: 'Introduction to AI image generation and basic concepts',
      zhHK: 'AI?��??��?介紹?�基?��?�?
    },
    lessons: lessons.slice(0, 3),
    order: 1
  }),

  courseManager.createModule({
    id: 2,
    title: {
      en: 'Basic Prompt Writing',
      zhHK: '?��??�示寫�?'
    },
    description: {
      en: 'Learn the fundamentals of effective prompt creation',
      zhHK: '學�??��??�示?��??�基礎知�?
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
      zhHK: '秘�??�鍵詞�?強�??�示'
    },
    description: {
      en: 'Unlock hidden Midjourney keywords and master advanced prompt engineering',
      zhHK: '�???��??�Midjourney?�鍵詞�??�握高�??�示工�?'
    },
    lessons: [
      courseManager.createLesson({
        id: 6,
        title: {
          en: 'Secret Photography Keywords',
          zhHK: '秘�??�影?�鍵�?
        },
        duration: {
          en: '40 min',
          zhHK: '40?��?'
        },
        description: {
          en: 'Master professional photography keywords that pros use',
          zhHK: '?�握專業?�影師使?��??�鍵�?
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
          zhHK: 'Midjourney?�面精�?
        },
        duration: {
          en: '35 min',
          zhHK: '35?��?'
        },
        description: {
          en: 'Master every button, setting, and hidden feature in Midjourney',
          zhHK: '精通Midjourney每個�??�、設置�??��??�能'
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
      zhHK: 'AI?�示工�?精�?
    },
    description: {
      en: 'Learn advanced prompt crafting techniques and secret formulas',
      zhHK: '學�?高�??�示製�??�巧�?秘�??��?'
    },
    lessons: [
      courseManager.createLesson({
        id: 8,
        title: {
          en: 'Midjourney V7 Revolutionary Features',
          zhHK: 'Midjourney V7?�命?��???
        },
        duration: {
          en: '50 min',
          zhHK: '50?��?'
        },
        description: {
          en: 'Master V7 Draft Mode, Personalization, and Omni-Reference',
          zhHK: '精通V7?�稿模�??�個人?��??�方位�???
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
          zhHK: '?��??�考�?高�??�數'
        },
        duration: {
          en: '45 min',
          zhHK: '45?��?'
        },
        description: {
          en: 'Master image prompts, style references, and professional parameters',
          zhHK: '精通�??��?示、風?��??��?專業?�數'
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
    zhHK: 'AI?��?影�??��?精通課�?
  },
  description: {
    en: 'Master the art of AI-powered visual content creation for creative expression. Learn industry-leading tools and artistic techniques.',
    zhHK: '精通AI驅�??��?覺內容創作�??�於?��?表�??�學習業?��??��?工具?��?術�?巧�?
  },
  category: 'Creative Design',
  difficulty: 'Beginner',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula ?��?'
  },
  totalDuration: {
    en: '8+ hours of content',
    zhHK: '8小�?以�??�容'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '?�本?�腦?�??
    },
    {
      en: 'Internet connection',
      zhHK: '互聯網�?��'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '?��?AI經�?'
    }
  ],
  learningOutcomes: [
    {
      en: 'Create professional AI-generated images',
      zhHK: '?��?專業AI?��??��?'
    },
    {
      en: 'Master Midjourney prompt engineering',
      zhHK: '精通Midjourney?�示工�?'
    },
    {
      en: 'Understand artistic styles and techniques',
      zhHK: '了解?��?風格?��?�?
    },
    {
      en: 'Develop your creative visual skills',
      zhHK: '?��?你�??��?視覺?�??
    }
  ],
  freeModules,
  proModules,
  freeBonuses: [
    {
      en: '50+ Prompt Templates',
      zhHK: '50+?�示模板'
    },
    {
      en: 'Style Reference Library',
      zhHK: '風格?�考庫'
    },
    {
      en: 'Community Support Forum',
      zhHK: '社群?�援論�?'
    }
  ],
  proBonuses: [
    {
      en: '200+ Advanced Prompt Templates',
      zhHK: '200+高�??�示模板'
    },
    {
      en: 'Exclusive Style Guide Library',
      zhHK: '?�家風格?��?�?
    },
    {
      en: 'Creative Inspiration Gallery',
      zhHK: '?��??��??��?'
    },
    {
      en: 'Art History Reference Guide',
      zhHK: '?��??��??��???
    }
  ],
  pricing: {
    free: '?�費',
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