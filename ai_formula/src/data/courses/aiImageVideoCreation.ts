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
      zhHK: 'ä»€éº¼ä?AI?–å??Ÿæ?ï¼?
    },
    duration: {
      en: '15 min',
      zhHK: '15?†é?'
    },
    description: {
      en: 'Understanding the fundamentals of AI image creation',
      zhHK: 'äº†è§£AI?–å??µä??…åŸºç¤çŸ¥è­?
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
      zhHK: `# ä»€éº¼ä?AI?–å??Ÿæ?ï¼?

AI?–å??Ÿæ?ä¿‚ä?ç¨®é©?½æ€§å??€è¡“ï??¨äººå·¥æ™º?½å?ç°¡å–®?…æ?å­—æ?è¿°å‰µ? å‡ºä»¤äººé©šå??…è?è¦ºå…§å®¹ã€‚å‘¢?…æ?è¡“å·²ç¶“å??¨æ”¹è®Šå??µæ?è¡Œæ¥­ï¼Œä»¤å°ˆæ¥­è³ªç??…å??å‰µä½œè?å¾—äººäººéƒ½?šå??°ã€?

## ?è?æ¦‚å¿µï¼?

**1. ?‡å?è½‰å??AI?€è¡?*
- ?ˆé€²å?AIæ¨¡å??¨æ•¸?¾è¬å¼µå??‡å??è¿°?Ÿè?ç·?
- ?†è§£?‡å??Œè?è¦ºå?ç´ ä??“å?è¤‡é??œä?
- ?¹æ?ä½ å??µæ??ç¤º?µé€ å??¨å??µå??–å?
- ?•ç??ªç„¶èªè??Ÿç??è?å¯«å¯¦?–è?è¡“è?è¦ºæ???

**2. ?˜å??…AI?–å?å¹³å°**
- **Midjourney**: ?è??Œå‰µ?å??å?è¡Œæ¥­?˜å???
- **DALL-E 3**: ?…é•·å¯«å¯¦?Œè©³ç´°å??§ç?
- **Stable Diffusion**: ?‹æ??Œé?ç´šè‡ªå®šç¾©?Ÿèƒ½
- **Adobe Firefly**: ?´å??µæ?å¥—ä»¶è§?±º?¹æ?

**3. é­”æ?é»æ¨£?‹ä?**
- å¯«ä??‹æ?è¿°æ€§å??‡å??ç¤ºè¡¨é?ä½ å?é¡˜æ™¯
- AI?¨ç?ç¶“ç¶²çµ¡è??†ä??…æ?ç¤?
- ?Ÿæ?å¤šå€‹è??–ä¿¾ä½ é¸??
- ?¹é€²å?è¿­ä»£?´åˆ°ä½ é??°å?ç¾?

## é©šäºº?…å‰µ?æ??¨ï?

**?¸ç¢¼?è??Œæ???*
- ?µé€ ä»»ä½•ä??³è±¡é¢¨æ ¼?…ç²¾ç¾è?è¡“å?
- ?¢ç´¢ä¸å??…è?è¡“é??•å??€å·?
- ?ºå€‹äºº?…ç›®?Ÿæ?æ¦‚å¿µ?è?

**?å½±?Œè?è¦ºæ?äº?*
- ?Œæ¡æ§‹å??Œç??‰æ?å·?
- å¯¦é?ä¸å??…æ?å½±é¢¨??
- ?µé€ å?äººå…¥?å?è¦–è¦º?…ä?

**è¨­è??Œç?å­?*
- ?šé?å¯¦é??‰ç”¨å­¸ç??²å½©?†è?
- ?†è§£è¦–è¦ºå±¤æ¬¡?Œå¹³è¡?
- ?¢ç´¢?ˆé¢è¨­è??Œæ??ˆå???

**?µæ?å­¸ç?**
- ?šé??ç¾å­¸ç??è???
- ç·´ç?è¦–è¦ºæºé€šæ?å·?
- ?¼å?ä½ ç¨?¹å??è??²éŸ³

## ?‹å?ä½¿ç”¨ä¹‹æ?ï¼?
1. **?¸æ?ä½ å?å¹³å°** - ?±Midjourney?‹å??²å??€ä½³æ???
2. **?Œæ¡?ç¤ºå¯«ä?** - å­¸ç??è¿°?§è?è¨€?…è?è¡?
3. **æ¯æ—¥ç·´ç?** - ?šé?å®šæ??µä?å»ºç?ä½ å??€??
4. **?”ç©¶?å?ä¾‹å?** - å¾ç¤¾ç¾¤å?ç¤ºä¸­å­¸ç?
5. **?¼å?ä½ å?é¢¨æ ¼** - ?¾åˆ°ä½ ç¨?¹å??µæ??²éŸ³

?¢é??€è¡“æ­£?¨ä»¤è¦–è¦º?§å®¹?µä?è®Šå?æ°‘ä¸»?–ï?è³¦ä?ä»»ä?äººè£½ä½œå?æ¥­è³ªç´ å??å??½å?ï¼Œå‘¢?²å??ä»¥?åª?‰ç??å?å¹´è¨­è¨ˆè?ç·´å??‚è²´è»Ÿä»¶?ˆå?å¾—åˆ°?‚`
    }
  }),

  courseManager.createLesson({
    id: 2,
    title: {
      en: 'Setting Up Your Midjourney Account',
      zhHK: 'è¨­ç½®ä½ å?Midjourneyå¸³æˆ¶'
    },
    duration: {
      en: '10 min',
      zhHK: '10?†é?'
    },
    description: {
      en: 'Step-by-step account setup and Discord integration',
      zhHK: '?æ­¥å¸³æˆ¶è¨­ç½®?ŒDiscord?´å?'
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

## ?”§ How to Get Started with Midjourney in 4 Simple Steps

### Step #1: Sign Up Using Google or Discord
You can sign up for Midjourney using your Google or Discord account. Head to the **Midjourney website** to register for an account.

### Step #2: Use Discord or Web Interface
Once Discord is up and running, you can go to the **Midjourney website** and choose "Sign In", or click the **Discord invite link** to go directly.

### Step #3: Choose Your Midjourney Membership Plan
Midjourney has four subscription tiers with different features and capabilities.

### Step #4: Start Generating Images
Use the **Imagine Bar** to enter prompts from anywhere on the web interface, or use Discord commands to start creating.

## ?¨ How to Generate Your First Midjourney Image

To generate your first image, you can use the "Imagine" bar on the web interface or visit one of the newbie channels on Discord.

**Generation Time:** It takes about a minute to generate a response with four different image variations.

## ??Editing and Refining Your Midjourney Images

After generation, you can:
- **Upscale** (U1-U4) - Create larger, more detailed versions
- **Variations** (V1-V4) - Generate similar images with modifications
- **Re-roll** (??) - Generate completely new variations

## ?¯ Essential Parameters for Better Results

- **--ar 16:9** (landscape aspect ratio)
- **--ar 1:1** (square aspect ratio)  
- **--ar 9:16** (vertical aspect ratio)
- **--v 6** (latest Midjourney version)
- **--q 2** (high quality)

Your journey into AI image creation starts here!`,
      zhHK: `# è¨­ç½®ä½ å?Midjourneyå¸³æˆ¶

## ?? é»è§£?¸æ?Midjourneyï¼?

ä½ ä??é?è¦æ??ºæ??è¯?„è?è¡“å®¶?èƒ½?µé€ å‡ºå¼•äºº?¥å??„å??ã€‚åª?€å¹¾å€‹æ?ç¤ºï?å¹¾å??˜å…§å°±èƒ½?µä??ºå?äººå…¥?ç?ä½œå??‚ç?è¨?°±?¨æ–¼Midjourney??

Midjourney?©ç”¨?Ÿæ?å¼äººå·¥æ™º?§ç??µé€ å?ä¾†å??å¤§?¨å?ç¹é??„å·¥ä½œã€‚ä??„å·¥ä½œåª?¯å?å®ƒå‚³?ä?å°æ®µ?‡å?ä¾†æ?è¿°ä??³è??„å??é??‹ï?å®ƒå°±?ƒè‡ª?•ç”¢?Ÿä??³è??„å??ã€?

## ?”§ ?šé?4?‹ç°¡?®æ­¥é©Ÿé?å§‹ä½¿?¨Midjourney

### ç¬?æ­¥ï?ä½¿ç”¨Google?–Discordè¨»å?
ä½ å¯ä»¥ä½¿?¨Google?–Discordå¸³è?è¨»å?Midjourney?‚å?å¾€**Midjourneyç¶²ç?**è¨»å?å¸³æˆ¶??

### ç¬?æ­¥ï?ä½¿ç”¨Discord?–Webä»‹é¢
?Ÿå?Discordå¾Œï?ä½ å¯ä»¥å?å¾€**Midjourneyç¶²ç?**ä¸¦é¸???»å…¥"ï¼Œæ?é»æ?**Discord?€è«‹é€??**?´æ¥?²å…¥??

### ç¬?æ­¥ï??¸æ?ä½ å?Midjourney?ƒå“¡è¨ˆå?
Midjourney?‰å??‹è??±ç?ç´šï??·æ?ä¸å??Ÿèƒ½?Œèƒ½?›ã€?

### ç¬?æ­¥ï??‹å??Ÿæ??–å?
ä½¿ç”¨**Imagine Bar**?¨ç¶²?ä??¢ä»»ä½•åœ°?¹è¼¸?¥æ?ç¤ºï??–ä½¿?¨Discord?½ä»¤?‹å??µä???

## ?¨ å¦‚ä??¢ç?ä½ å?ç¬¬ä?å¼µMidjourneyå½±å?

è¦ç”¢?Ÿä??„ç¬¬ä¸€å¼µå??‡ï?ä½ å¯ä»¥ä½¿?¨ç¶²?ä??¢ä????³å?"æ¬„ï?ä¹Ÿå¯ä»¥é€ è¨ªDiscordä¸Šç??°æ??»é???

**?Ÿæ??‚é?ï¼?* ?¢ç??æ?å¤§ç??€è¦ä??†é?ï¼Œæ??ä??›å€‹ä??Œç??–å?è®Šå???

## ??ç·¨è¼¯ä¸¦å??„ä??…Midjourney?–å?

?Ÿæ?å¾Œï?ä½ å¯ä»¥ï?
- **?¾å¤§** (U1-U4) - ?µå»º?´å¤§?æ›´è©³ç´°?„ç???
- **è®Šå?** (V1-V4) - ?Ÿæ?é¡ä¼¼ä½†æ?ä¿®æ”¹?„å???
- **?æ–°?Ÿæ?** (??) - ?Ÿæ?å®Œå…¨?°ç?è®Šå?

## ?¯ ?²å??´å¥½çµæ??…åŸº?¬å???

- **--ar 16:9** ï¼ˆæ©«?‘å¯¬é«˜æ?ï¼?
- **--ar 1:1** ï¼ˆæ­£?¹å½¢å¯¬é?æ¯”ï?
- **--ar 9:16** ï¼ˆå??´å¯¬é«˜æ?ï¼?
- **--v 6** ï¼ˆæ??°Midjourney?ˆæœ¬ï¼?
- **--q 2** ï¼ˆé?è³ªé?ï¼?

ä½ å?AI?–å??µä?ä¹‹æ?å¾é€™è£¡?‹å?ï¼`
    }
  }),

  courseManager.createLesson({
    id: 3,
    title: {
      en: 'Your First AI Image',
      zhHK: 'ä½ å?ç¬¬ä?å¼µAI?–å?'
    },
    duration: {
      en: '20 min',
      zhHK: '20?†é?'
    },
    description: {
      en: 'Create your first image using simple prompts',
      zhHK: '?¨ç°¡?®æ?ç¤ºå‰µä½œä??…ç¬¬ä¸€å¼µå???
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
      zhHK: `# ä½ å?ç¬¬ä?å¼µAI?–å?

?Œå®¶ä½ å·²ç¶“è¨­ç½®å¥½Midjourneyï¼Œæ??‹å??µä?ä½ å?ç¬¬ä?å¼µä»¤äººé??†å?AI?Ÿæ??–å?ï¼?

## ?†è§£?ç¤ºçµæ?

ä¸€?‹æ??Ÿå?Midjourney?ç¤º?µå¾ª?¢å€‹å¯¦è­‰ç?æ§‹ï?
**ä¸»é? + é¢¨æ ¼ + è¨­ç½® + ç´°ç? = é©šäººçµæ?**

### ä¾‹å??†è§£ï¼?
- **ä¸»é?**: "ä¸€?»å?æ­¦å??…å?"
- **é¢¨æ ¼**: "?¸ç¢¼?è?"
- **è¨­ç½®**: "?¨é?æ´²å¤§?‰å?"
- **ç´°ç?**: "é»ƒé??‚é??‰ç?ï¼Œè?å¯«å¯¦"

**å®Œæ•´?ç¤º**: "ä¸€?»å?æ­¦å??…å?ï¼Œæ•¸ç¢¼è?è¡“ï??¨é?æ´²å¤§?‰å?ï¼Œé??‘æ??“å?ç·šï?è¶…å¯«å¯?

## å®Œç??°æ?ç·´ç??ç¤º

?±å‘¢?²å?æ¥­è£½ä½œå??ç¤º?‹å?ï¼?

1. **"?¥å‡º?‚å¯§?œå?å±±æ?ï¼Œé¢¨?¯æ?å½±ï??§æ?æ¿›æ°£æ°?**
2. **"?’é©?¸å??§éƒ¨ï¼Œæº«?–é??²ç??‰ï?å¾©å¤ç¾å­¸"**
3. **"?ªä??å?å¤©é?ç·šï??“è™¹?ˆï?è³½å??‹å?é¢¨æ ¼ï¼Œå???**
4. **"ç±ƒå?è£¡æ??±å?å¾©å¤?®è?ï¼Œæ°´å½©æ???**
5. **"é­”æ?æ£®æ?ä¸­å?ç¥å?æ¨¹å?ï¼Œå¹»?³è?è¡“é¢¨??**

## ?¿å?å¸¸è??°æ??¯èª¤

**??å¤ªæ¨¡ç³?*: "?šå???
**??å¥½å?å¤?*: "é»ƒé??‚é?å¯§é??…å±±?¯ï?å°ˆæ¥­?å½±"

**???æ–¼è¤‡é?**: "ä¸€æ¢é??Œé?å£«æ??¶å??‚é?ä½ç¨è§’ç¸?¨å¤ªç©ºé›·?´ä¸­"
**??å¥½å?å¤?*: "ä¸­ä?ç´€é¨å£«?¢å?å¨æ­¦?…é?ï¼Œå¹»?³è?è¡“é¢¨??

## ?²å??“è?çµæ??…å?æ¥­è²¼å£?

**?ç¤ºè£½ä?ï¼?*
- **?è¿°?§ä?ç°¡æ?** - ?¨æ?å­—ç•«?ºæ??°å??–å?
- **ä½¿ç”¨?¬è??…è?è¡“è?èª?* - "?æ?å°æ??ˆå?"??ä¸‰å?æ³•å?"
- **?…å«?…æ??Œæ™¯** - "å¯§é?"???²å?????å¥‡å¹»"

?­å?ï¼ä??›å??²å…¥?—AIé©…å??µæ??…ä»¤äººè?å¥®ä??Œã€‚`
    }
  }),

  // Module 2: Basic Prompt Writing
  courseManager.createLesson({
    id: 4,
    title: {
      en: 'Prompt Structure Basics',
      zhHK: '?ç¤ºçµæ??ºç?'
    },
    duration: {
      en: '25 min',
      zhHK: '25?†é?'
    },
    description: {
      en: 'Understanding how to structure effective prompts',
      zhHK: 'äº†è§£é»æ¨£æ§‹é€ æ??ˆå??ç¤º'
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
      zhHK: 'å¸¸è??ç¤º?¯èª¤'
    },
    duration: {
      en: '15 min',
      zhHK: '15?†é?'
    },
    description: {
      en: 'Avoid these common pitfalls when writing prompts',
      zhHK: '?¿å?å¯«æ?ç¤ºæ??…å¸¸è¦‹é™·??
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
      zhHK: 'AI?–å??Ÿæ??¥é?'
    },
    description: {
      en: 'Introduction to AI image generation and basic concepts',
      zhHK: 'AI?–å??Ÿæ?ä»‹ç´¹?ŒåŸº?¬æ?å¿?
    },
    lessons: lessons.slice(0, 3),
    order: 1
  }),

  courseManager.createModule({
    id: 2,
    title: {
      en: 'Basic Prompt Writing',
      zhHK: '?ºç??ç¤ºå¯«ä?'
    },
    description: {
      en: 'Learn the fundamentals of effective prompt creation',
      zhHK: 'å­¸ç??‰æ??ç¤º?µä??…åŸºç¤çŸ¥è­?
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
      zhHK: 'ç§˜å??œéµè©å?å¼·å??ç¤º'
    },
    description: {
      en: 'Unlock hidden Midjourney keywords and master advanced prompt engineering',
      zhHK: 'è§???±è??…Midjourney?œéµè©å??Œæ¡é«˜ç??ç¤ºå·¥ç?'
    },
    lessons: [
      courseManager.createLesson({
        id: 6,
        title: {
          en: 'Secret Photography Keywords',
          zhHK: 'ç§˜å??å½±?œéµè©?
        },
        duration: {
          en: '40 min',
          zhHK: '40?†é?'
        },
        description: {
          en: 'Master professional photography keywords that pros use',
          zhHK: '?Œæ¡å°ˆæ¥­?å½±å¸«ä½¿?¨å??œéµè©?
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
          zhHK: 'Midjourney?Œé¢ç²¾é€?
        },
        duration: {
          en: '35 min',
          zhHK: '35?†é?'
        },
        description: {
          en: 'Master every button, setting, and hidden feature in Midjourney',
          zhHK: 'ç²¾é€šMidjourneyæ¯å€‹æ??•ã€è¨­ç½®å??±è??Ÿèƒ½'
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
      zhHK: 'AI?ç¤ºå·¥ç?ç²¾é€?
    },
    description: {
      en: 'Learn advanced prompt crafting techniques and secret formulas',
      zhHK: 'å­¸ç?é«˜ç??ç¤ºè£½ä??€å·§å?ç§˜å??¬å?'
    },
    lessons: [
      courseManager.createLesson({
        id: 8,
        title: {
          en: 'Midjourney V7 Revolutionary Features',
          zhHK: 'Midjourney V7?©å‘½?§å???
        },
        duration: {
          en: '50 min',
          zhHK: '50?†é?'
        },
        description: {
          en: 'Master V7 Draft Mode, Personalization, and Omni-Reference',
          zhHK: 'ç²¾é€šV7?‰ç¨¿æ¨¡å??å€‹äºº?–å??¨æ–¹ä½å???
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
          zhHK: '?–å??ƒè€ƒå?é«˜ç??ƒæ•¸'
        },
        duration: {
          en: '45 min',
          zhHK: '45?†é?'
        },
        description: {
          en: 'Master image prompts, style references, and professional parameters',
          zhHK: 'ç²¾é€šå??æ?ç¤ºã€é¢¨?¼å??ƒå?å°ˆæ¥­?ƒæ•¸'
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
    zhHK: 'AI?–å?å½±ç??µä?ç²¾é€šèª²ç¨?
  },
  description: {
    en: 'Master the art of AI-powered visual content creation for creative expression. Learn industry-leading tools and artistic techniques.',
    zhHK: 'ç²¾é€šAIé©…å??…è?è¦ºå…§å®¹å‰µä½œï??¨æ–¼?µæ?è¡¨é??‚å­¸ç¿’æ¥­?Œé??ˆå?å·¥å…·?Œè?è¡“æ?å·§ã€?
  },
  category: 'Creative Design',
  difficulty: 'Beginner',
  instructor: {
    en: 'AI Formula Team',
    zhHK: 'AI Formula ?˜é?'
  },
  totalDuration: {
    en: '8+ hours of content',
    zhHK: '8å°æ?ä»¥ä??§å®¹'
  },
  language: ['English', 'Cantonese'],
  requirements: [
    {
      en: 'Basic computer skills',
      zhHK: '?ºæœ¬?»è…¦?€??
    },
    {
      en: 'Internet connection',
      zhHK: 'äº’è¯ç¶²é€?¥'
    },
    {
      en: 'No prior AI experience needed',
      zhHK: '?¡é?AIç¶“é?'
    }
  ],
  learningOutcomes: [
    {
      en: 'Create professional AI-generated images',
      zhHK: '?µä?å°ˆæ¥­AI?Ÿæ??–å?'
    },
    {
      en: 'Master Midjourney prompt engineering',
      zhHK: 'ç²¾é€šMidjourney?ç¤ºå·¥ç?'
    },
    {
      en: 'Understand artistic styles and techniques',
      zhHK: 'äº†è§£?è?é¢¨æ ¼?Œæ?å·?
    },
    {
      en: 'Develop your creative visual skills',
      zhHK: '?¼å?ä½ å??µæ?è¦–è¦º?€??
    }
  ],
  freeModules,
  proModules,
  freeBonuses: [
    {
      en: '50+ Prompt Templates',
      zhHK: '50+?ç¤ºæ¨¡æ¿'
    },
    {
      en: 'Style Reference Library',
      zhHK: 'é¢¨æ ¼?ƒè€ƒåº«'
    },
    {
      en: 'Community Support Forum',
      zhHK: 'ç¤¾ç¾¤?¯æ´è«–å?'
    }
  ],
  proBonuses: [
    {
      en: '200+ Advanced Prompt Templates',
      zhHK: '200+é«˜ç??ç¤ºæ¨¡æ¿'
    },
    {
      en: 'Exclusive Style Guide Library',
      zhHK: '?¨å®¶é¢¨æ ¼?‡å?åº?
    },
    {
      en: 'Creative Inspiration Gallery',
      zhHK: '?µæ??ˆæ??«å?'
    },
    {
      en: 'Art History Reference Guide',
      zhHK: '?è??²å??ƒæ???
    }
  ],
  pricing: {
    free: '?è²»',
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