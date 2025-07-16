import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen, Star, Users, Clock, CheckCircle, Award, Lightbulb, Target, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navigation from '../components/Navigation';

// Student-friendly simplified course structure
const beginnerCourse = {
  id: 'ai-creation-basics',
  title: 'AI Creation for Complete Beginners',
  titleCht: 'AI創作完全初學者指南',
  subtitle: 'From Zero to Hero in 4 Easy Parts',
  subtitleCht: '4個簡單部分從零到英雄',
  
  // Simple 4-part learning path
  parts: [
    {
      id: 'part1',
      number: 1,
      title: 'Understanding AI (Super Simple!)',
      titleCht: 'AI理解（超簡單！）',
      icon: '🤖',
      color: 'from-green-400 to-blue-500',
      description: 'Learn what AI is and why it\'s amazing',
      descriptionCht: '學習AI係咩同點解佢咁勁',
      duration: '1-2 hours',
      durationCht: '1-2小時',
      topics: [
        { name: 'What is AI Image Creation?', nameCht: 'AI圖像創作係咩？' },
        { name: 'Which Tool Should I Use?', nameCht: '我應該用邊個工具？' },
        { name: 'Setting Up Your First Account', nameCht: '設置你嘅第一個帳戶' }
      ],
      sampleContent: {
        title: 'Sample: Your First AI Image',
        titleCht: '示例：你嘅第一張AI圖像',
        prompt: 'A cute golden retriever puppy sitting in a sunny garden, cartoon style, cheerful and happy',
        promptCht: '一隻可愛嘅金毛尋回犬小狗坐在陽光花園，卡通風格，開朗快樂',
        result: 'Creates an adorable cartoon-style puppy image perfect for beginners',
        resultCht: '創造一張完美適合初學者嘅可愛卡通風格小狗圖像'
      }
    },
    {
      id: 'part2', 
      number: 2,
      title: 'Your First AI Images',
      titleCht: '你嘅第一張AI圖像',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500',
      description: 'Create your first amazing images step by step',
      descriptionCht: '逐步創造你嘅第一張驚人圖像',
      duration: '2-3 hours',
      durationCht: '2-3小時',
      topics: [
        { name: 'Writing Simple Prompts', nameCht: '寫簡單提示' },
        { name: 'Making Beautiful Images', nameCht: '製作美麗圖像' },
        { name: 'Common Mistakes to Avoid', nameCht: '避免常見錯誤' }
      ],
      sampleContent: {
        title: 'Sample: Professional Business Photo',
        titleCht: '示例：專業商業相片',
        prompt: 'Professional business meeting, diverse team discussing ideas in modern office, natural lighting, confident and focused, corporate photography style',
        promptCht: '專業商業會議，多元化團隊在現代辦公室討論想法，自然燈光，自信專注，企業攝影風格',
        result: 'High-quality business image suitable for websites and presentations',
        resultCht: '適合網站同演示嘅高質量商業圖像'
      }
    },
    {
      id: 'part3',
      number: 3,
      title: 'Level Up Your Skills',
      titleCht: '提升你嘅技能',
      icon: '🚀',
      color: 'from-orange-400 to-red-500',
      description: 'Learn professional tricks and techniques',
      descriptionCht: '學習專業技巧同技術',
      duration: '3-4 hours', 
      durationCht: '3-4小時',
      topics: [
        { name: 'Using ChatGPT for Better Prompts', nameCht: '用ChatGPT寫更好提示' },
        { name: 'Professional Styles & Effects', nameCht: '專業風格同效果' },
        { name: 'Creating Video Content', nameCht: '創造影片內容' }
      ],
      sampleContent: {
        title: 'Sample: Advanced Marketing Visual',
        titleCht: '示例：高級營銷視覺',
        prompt: 'Luxury product showcase, premium smartphone on marble surface, dramatic studio lighting, professional product photography, commercial quality, elegant composition --ar 16:9 --v 6',
        promptCht: '奢華產品展示，高級智能手機在大理石表面，戲劇性工作室燈光，專業產品攝影，商業質量，優雅構圖 --ar 16:9 --v 6',
        result: 'Professional-grade marketing image with advanced parameters',
        resultCht: '具有高級參數嘅專業級營銷圖像'
      },
      proTips: {
        title: '10 Professional Midjourney Tips',
        titleCht: '10個專業Midjourney貼士',
        tips: [
          {
            number: 1,
            title: 'Be Concise (40-60 words max)',
            titleCht: '保持簡潔（最多40-60字）',
            description: 'Keep prompts under 40 words for best results. After 60 words, content gets ignored.',
            descriptionCht: '提示保持在40字以下效果最好。超過60字內容會被忽略。',
            example: 'Good: "Professional headshot, confident smile, studio lighting"\nBad: "A very professional business headshot of a confident person with a warm genuine smile in a modern photography studio with professional lighting equipment..."',
            exampleCht: '好：「專業頭像，自信微笑，工作室燈光」\n差：「一個非常專業嘅商業頭像，自信人士帶溫暖真誠微笑在現代攝影工作室配專業燈光設備...」'
          },
          {
            number: 2,
            title: 'Use Descriptive Language',
            titleCht: '使用描述性語言',
            description: 'Add adjectives for color, shape, size, texture, and emotion.',
            descriptionCht: '添加形容詞描述顏色、形狀、大小、質感同情感。',
            example: 'Instead of "cat" → "fluffy orange tabby cat with bright green eyes"',
            exampleCht: '唔好淨係「貓」→「毛茸茸橙色虎斑貓配明亮綠眼」'
          },
          {
            number: 3,
            title: 'Avoid Ambiguity',
            titleCht: '避免模糊',
            description: 'Use clear, direct language. Ambiguous words create unexpected results.',
            descriptionCht: '使用清晰直接語言。模糊詞語會產生意外結果。',
            example: 'Clear: "Modern glass office building"\nAmbiguous: "Nice building"',
            exampleCht: '清晰：「現代玻璃辦公大廈」\n模糊：「靚大廈」'
          },
          {
            number: 4,
            title: 'Experiment with Keywords',
            titleCht: '實驗關鍵詞',
            description: 'Test how small changes affect results. Learn what works best.',
            descriptionCht: '測試小改動點樣影響結果。學習咩最有效。',
            example: 'Try: "portrait" vs "headshot" vs "professional photo"',
            exampleCht: '試：「肖像」vs「頭像」vs「專業相片」'
          },
          {
            number: 5,
            title: 'Use Prompt Generators (Like ChatGPT!)',
            titleCht: '使用提示生成器（如ChatGPT！）',
            description: 'Tools like ChatGPT can help create detailed prompts from your basic ideas.',
            descriptionCht: 'ChatGPT等工具可以幫你從基本想法創建詳細提示。',
            example: 'Ask ChatGPT: "Create a Midjourney prompt for a professional business logo"',
            exampleCht: '問ChatGPT：「為專業商業標誌創建Midjourney提示」'
          },
          {
            number: 6,
            title: 'Use Creative Parameters',
            titleCht: '使用創意參數',
            description: 'Add --creative for unconventional, unique results.',
            descriptionCht: '添加--creative獲得非傳統、獨特結果。',
            example: 'business meeting --creative (creates more artistic interpretations)',
            exampleCht: '商業會議 --creative（創造更藝術化詮釋）'
          },
          {
            number: 7,
            title: 'Add Weights with ::',
            titleCht: '用::添加權重',
            description: 'Use double colons to separate concepts and control importance.',
            descriptionCht: '用雙冒號分離概念同控制重要性。',
            example: 'space ship → space:: ship (ship in space, not spaceship)',
            exampleCht: '太空船 → 太空:: 船（太空中嘅船，唔係太空船）'
          },
          {
            number: 8,
            title: 'Use Negative Prompts',
            titleCht: '使用負面提示',
            description: 'Add --no to exclude unwanted elements.',
            descriptionCht: '添加--no排除唔想要嘅元素。',
            example: 'portrait --no hands, no text, no watermark',
            exampleCht: '肖像 --no 手，no 文字，no 水印'
          },
          {
            number: 9,
            title: 'Consider Private Mode',
            titleCht: '考慮私人模式',
            description: 'Subscribe for private mode to work without distractions.',
            descriptionCht: '訂閱私人模式可以專心工作無干擾。',
            example: 'Upgrade to paid plan for cleaner workspace',
            exampleCht: '升級到付費計劃獲得更乾淨工作空間'
          },
          {
            number: 10,
            title: 'Modify Settings',
            titleCht: '修改設置',
            description: 'Use /settings to save preferences instead of typing them repeatedly.',
            descriptionCht: '使用/settings保存偏好設置而唔需要重複輸入。',
            example: 'Set default aspect ratio, quality, and style preferences',
            exampleCht: '設置默認寬高比、質量同風格偏好'
          }
        ]
      }
    },
    {
      id: 'part4',
      number: 4,
      title: 'Midjourney Secret Keywords & Prompts Master Guide',
      titleCht: 'Midjourney秘密關鍵詞同提示大全',
      icon: '🎨',
      color: 'from-purple-400 to-pink-500',
      description: 'Master secret keywords, prompts, and advanced techniques',
      descriptionCht: '掌握秘密關鍵詞、提示同高級技巧',
      duration: '2-3 hours',
      durationCht: '2-3小時',
      topics: [
        { name: 'Photography Style Keywords', nameCht: '攝影風格關鍵詞' },
        { name: 'Art Style Keywords', nameCht: '藝術風格關鍵詞' },
        { name: 'Color Palette Keywords', nameCht: '顏色調色板關鍵詞' },
        { name: 'Composition & Angle Keywords', nameCht: '構圖同角度關鍵詞' },
        { name: 'Texture & Material Keywords', nameCht: '質感同材質關鍵詞' },
        { name: 'Mood & Atmosphere Keywords', nameCht: '情緒同氛圍關鍵詞' },
        { name: 'Video Prompt Keywords', nameCht: '視頻提示關鍵詞' },
        { name: 'Advanced Prompting Techniques', nameCht: '高級提示技巧' },
        { name: 'Practical Prompt Templates', nameCht: '實用提示模板' },
        { name: 'Secret Keyword Combinations', nameCht: '秘密關鍵詞組合' }
      ],
      sampleContent: {
        title: 'Sample: Client Portfolio Piece',
        titleCht: '示例：客戶作品集作品',
        prompt: 'Social media post design, inspirational quote "Dream Big, Work Hard", modern typography, motivational aesthetic, Instagram-ready format, vibrant colors --ar 1:1',
        promptCht: '社交媒體帖子設計，勵志名言"夢想遠大，努力工作"，現代字體，勵志美學，Instagram準備格式，鮮豔色彩 --ar 1:1',
        result: 'Ready-to-sell social media content that clients love',
        resultCht: '客戶喜愛嘅即用社交媒體內容'
      }
    }
  ],

  // Dynamic content for each part
  getPartContent: (partNumber: number) => {
    console.log('Getting content for part:', partNumber); // Debug log
    const contents = [
      // Part 1 Content
      {
        title: 'What is AI Image Creation? (Explained Like You\'re 5)',
        titleCht: 'AI圖像創作係咩？（像對5歲小朋友解釋）',
        content: `
# 🤖 What is AI Image Creation? (Explained Like You're 5!)

## Imagine This:
You have a magical friend who can draw ANYTHING you describe in words.

👤 **You say:** "Draw me a cute golden retriever puppy playing in a sunny garden"
🤖 **AI draws:** *Creates an amazing image in 30 seconds*

That's exactly what AI image creation is!

## Why Should You Care?

### 💰 **Make Money:**
- Create logos for businesses ($50-500 each)
- Design social media posts ($20-100 each)  
- Sell art prints online ($10-50 each)

### 🎨 **Be Creative:**
- Design anything you can imagine
- No drawing skills needed
- Create professional-quality art

### ⚡ **Save Time:**
- Get images in seconds, not hours
- No need to hire expensive designers
- Create unlimited variations

## Real Success Stories:

**Sarah (Teacher):** Makes $500/month selling AI-created educational posters
**Mike (Small Business):** Saves $2000/month on graphic design costs
**Lisa (Social Media):** Grew her Instagram to 50K followers using AI images

## What You'll Learn in This Course:

### Part 1: The Basics 🤖
- Understanding AI tools (super simple explanation)
- Choosing the right tool for you
- Setting up your account step-by-step

### Part 2: Your First Images 🎨  
- Writing prompts that work
- Creating beautiful images
- Avoiding beginner mistakes

### Part 3: Professional Level 🚀
- Advanced techniques
- Using ChatGPT to help
- Creating videos too!

### Part 4: Making Money 💰
- Selling your creations
- Finding clients
- Building a business

## Don't Worry If You're Not "Tech-Savvy"
This course is designed for complete beginners. We explain everything step-by-step, like you've never used AI before.

**Ready to start? Let's go to your first lesson! 👇**
        `,
        contentCht: `
# 🤖 AI圖像創作係咩？（像對5歲小朋友解釋！）

## 想像一下：
你有個神奇朋友可以畫出你用文字描述嘅任何嘢。

👤 **你講：** "畫隻在陽光花園玩耍嘅可愛金毛尋回犬小狗"
🤖 **AI畫：** *30秒內創造出驚人圖像*

呢個就係AI圖像創作！

## 點解你應該關心？

### 💰 **賺錢：**
- 為企業創造標誌（每個$50-500）
- 設計社交媒體帖子（每個$20-100）
- 在線出售藝術印刷品（每個$10-50）

### 🎨 **發揮創意：**
- 設計任何你想像到嘅嘢
- 唔需要繪畫技巧
- 創造專業質量藝術

### ⚡ **節省時間：**
- 幾秒鐘就有圖像，唔係幾個鐘
- 唔需要請昂貴設計師
- 創造無限變化

## 真實成功故事：

**Sarah（老師）：** 每月賣AI創造嘅教育海報賺$500
**Mike（小企業）：** 每月節省$2000圖形設計成本
**Lisa（社交媒體）：** 用AI圖像將Instagram增長到5萬粉絲

## 你在呢個課程會學到：

### Part 1：基礎 🤖
- 理解AI工具（超簡單解釋）
- 為你選擇合適工具
- 逐步設置你嘅帳戶

### Part 2：你嘅第一張圖像 🎨
- 寫有效嘅提示
- 創造美麗圖像
- 避免初學者錯誤

### Part 3：專業水平 🚀
- 高級技巧
- 用ChatGPT幫助
- 都創造影片！

### Part 4：賺錢 💰
- 出售你嘅創作
- 搵客戶
- 建立生意

## 如果你唔係"技術達人"唔使擔心
呢個課程係為完全初學者設計。我哋逐步解釋所有嘢，就好似你從未用過AI一樣。

**準備開始？我哋去你嘅第一堂課！👇**
        `
      },
      // Part 2 Content
      {
        title: 'Your First AI Images - Step by Step Guide',
        titleCht: '你嘅第一張AI圖像 - 逐步指南',
        content: `
# 🎨 Your First AI Images - Step by Step Guide

## The Magic Formula (Super Simple!)
**Subject + Style + Setting + Mood**

### 🎯 Step 1: Choose Your Subject
What do you want to create?
- A person (businessman, teacher, chef)
- An animal (cute dog, majestic lion)
- An object (modern car, cozy house)
- A scene (office meeting, beach sunset)

### 🎨 Step 2: Pick a Style
How should it look?
- **Photography:** "professional photography", "portrait style"
- **Cartoon:** "cartoon style", "animated style"
- **Artistic:** "digital art", "watercolor painting"
- **Realistic:** "photorealistic", "high quality photo"

### 📍 Step 3: Set the Scene
Where is it happening?
- **Indoor:** "modern office", "cozy living room", "professional studio"
- **Outdoor:** "sunny garden", "city street", "mountain landscape"
- **Background:** "white background", "blurred background", "colorful background"

### 💫 Step 4: Add the Mood
What feeling do you want?
- **Professional:** "confident", "serious", "trustworthy"
- **Happy:** "cheerful", "joyful", "smiling"
- **Calm:** "peaceful", "relaxed", "serene"
- **Exciting:** "dynamic", "energetic", "vibrant"

## Let's Practice Together!

### Example 1: Simple Business Photo
❌ **Bad:** "business person"
✅ **Good:** "Professional businessman in navy suit, confident smile, modern office background, corporate photography style"

### Example 2: Social Media Content
❌ **Bad:** "food"
✅ **Good:** "Delicious chocolate cake on marble table, soft natural lighting, appetizing food photography, Instagram style"

### Example 3: Creative Art
❌ **Bad:** "nice picture"
✅ **Good:** "Cute golden retriever puppy playing in sunny garden, cartoon style, cheerful and happy, bright colors"

## Common Beginner Mistakes (And How to Fix Them!)

### ❌ Mistake 1: Too Vague
**Problem:** "Make a nice image"
**Solution:** Be specific about what you want

### ❌ Mistake 2: Too Complicated
**Problem:** Writing 100+ words with too many details
**Solution:** Keep it simple and focused

### ❌ Mistake 3: Negative Language
**Problem:** "Don't make it blurry"
**Solution:** Say what you WANT: "sharp and clear"

### ❌ Mistake 4: No Style Specified
**Problem:** Just describing the subject
**Solution:** Always add a style (photography, cartoon, etc.)

## Your First Assignment!

Try creating prompts for these scenarios:
1. **Your business headshot** for LinkedIn
2. **A logo** for your favorite hobby
3. **A social media post** about coffee
4. **A product photo** for something you want to sell

Remember: Start simple, then add details!

## Pro Tips for Beginners:
- 🎯 **Start with one main subject**
- 🎨 **Always specify a style**
- 📸 **Think like you're directing a photographer**
- 🔄 **Try small variations to see what works**
- 💡 **Save successful prompts for later use**

**Ready to create your first masterpiece? Let's go! 🚀**
        `,
        contentCht: `
# 🎨 你嘅第一張AI圖像 - 逐步指南

## 神奇公式（超簡單！）
**主題 + 風格 + 設置 + 情調**

### 🎯 第1步：選擇你嘅主題
你想創造咩？
- 一個人（商人、老師、廚師）
- 一隻動物（可愛狗、威嚴獅子）
- 一個物件（現代汽車、舒適房屋）
- 一個場景（辦公會議、海灘日落）

### 🎨 第2步：選擇風格
應該點樣睇？
- **攝影：** "專業攝影", "肖像風格"
- **卡通：** "卡通風格", "動畫風格"
- **藝術：** "數字藝術", "水彩畫"
- **逼真：** "照片般逼真", "高質量相片"

### 📍 第3步：設置場景
喺邊度發生？
- **室內：** "現代辦公室", "舒適客廳", "專業工作室"
- **戶外：** "陽光花園", "城市街道", "山脈風景"
- **背景：** "白色背景", "模糊背景", "彩色背景"

### 💫 第4步：添加情調
你想要咩感覺？
- **專業：** "自信", "嚴肅", "值得信賴"
- **快樂：** "開朗", "歡樂", "微笑"
- **平靜：** "寧靜", "放鬆", "安詳"
- **興奮：** "動態", "精力充沛", "充滿活力"

## 一齊練習！

### 例子1：簡單商業相片
❌ **差：** "商業人士"
✅ **好：** "穿海軍藍西裝嘅專業商人，自信微笑，現代辦公室背景，企業攝影風格"

### 例子2：社交媒體內容
❌ **差：** "食物"
✅ **好：** "大理石桌上美味朱古力蛋糕，柔和自然燈光，誘人食物攝影，Instagram風格"

### 例子3：創意藝術
❌ **差：** "靚圖片"
✅ **好：** "可愛金毛尋回犬小狗在陽光花園玩耍，卡通風格，開朗快樂，明亮色彩"

## 常見初學者錯誤（同點樣改正！）

### ❌ 錯誤1：太模糊
**問題：** "製作靚圖像"
**解決方案：** 具體講明你想要咩

### ❌ 錯誤2：太複雜
**問題：** 寫100+字配太多細節
**解決方案：** 保持簡單專注

### ❌ 錯誤3：負面語言
**問題：** "唔好令佢模糊"
**解決方案：** 講你想要嘅："清晰銳利"

### ❌ 錯誤4：冇指定風格
**問題：** 淨係描述主題
**解決方案：** 總係加風格（攝影、卡通等）

## 你嘅第一個作業！

試下為呢啲情況創建提示：
1. **你嘅商業頭像** 用於LinkedIn
2. **一個標誌** 為你最愛嘅愛好
3. **一個社交媒體帖子** 關於咖啡
4. **一張產品相片** 為你想賣嘅嘢

記住：從簡單開始，然後加細節！

## 初學者專業貼士：
- 🎯 **從一個主要主題開始**
- 🎨 **總係指定風格**
- 📸 **諗到好似你在指導攝影師**
- 🔄 **試小變化睇咩有效**
- 💡 **保存成功提示供日後使用**

**準備創造你嘅第一個傑作？我哋去！🚀**
        `
      },
      // Part 3 Content
      {
        title: 'Level Up Your Skills - Professional Techniques',
        titleCht: '提升你嘅技能 - 專業技巧',
        content: `
# 🚀 Level Up Your Skills - Professional Techniques

## Using ChatGPT as Your Prompt Assistant

### The Game-Changing Method:
Instead of struggling to write prompts yourself, let ChatGPT do the heavy lifting!

### Simple 3-Step Process:

**Step 1: Tell ChatGPT What You Want**
\`\`\`
"I want to create a professional business image for my website. 
Can you write a detailed Midjourney prompt for this?"
\`\`\`

**Step 2: ChatGPT Creates the Prompt**
ChatGPT gives you something like:
\`\`\`
"Professional business consultation scene, confident executive in modern office, 
natural lighting, corporate photography style, high quality --ar 16:9 --v 6"
\`\`\`

**Step 3: Use It in Midjourney**
Copy and paste - that's it!

## Advanced Prompt Techniques

### 1. Adding Technical Parameters
- **Aspect Ratio:** --ar 16:9 (landscape), --ar 1:1 (square), --ar 9:16 (vertical)
- **Quality:** --q 2 (high quality)
- **Version:** --v 6 (latest version)
- **Style:** --style raw (more photographic)

### 2. Using Weights and Emphasis
- **Double colon (::)** separates concepts
- **Numbers** control importance
- Example: "business meeting:: professional:: 2 confident:: 1.5"

### 3. Negative Prompts
Remove unwanted elements:
- **--no hands** (removes hands from image)
- **--no text** (removes any text)
- **--no watermark** (removes watermarks)

### 4. Style References
- **Photography styles:** "shot with Canon 5D", "85mm lens", "shallow depth of field"
- **Lighting:** "golden hour", "studio lighting", "natural light"
- **Mood:** "cinematic", "editorial", "commercial"

## Creating Luxury Product Showcase

### Example: High-End Product Photography
**Sample Prompt:** "Luxury smartphone product showcase, premium materials, sophisticated lighting, marble surface, golden hour ambiance, commercial photography style --ar 16:9 --q 2"

**Expected Result:** Professional product photo that could sell for $200-500

## Industry-Specific Techniques

### For Business/Corporate:
- Use words like: "professional", "corporate", "executive", "modern"
- Lighting: "natural office lighting", "clean studio lighting"
- Colors: "navy blue", "charcoal gray", "white background"

### For Social Media:
- Formats: "--ar 1:1" (Instagram), "--ar 9:16" (Stories/TikTok)
- Style: "Instagram-worthy", "social media ready", "trendy"
- Mood: "vibrant", "engaging", "eye-catching"

### For E-commerce:
- Background: "white background", "product photography"
- Lighting: "even lighting", "no shadows"
- Quality: "--q 2", "commercial quality"

## Advanced ChatGPT Prompting

### Template 1: Style Variations
\`\`\`
"Create 5 different Midjourney prompts for a [SUBJECT], 
each in a different style: photographic, artistic, cartoon, 
minimalist, and luxury."
\`\`\`

### Template 2: Industry-Specific
\`\`\`
"Write a Midjourney prompt for [INDUSTRY] that would appeal 
to [TARGET AUDIENCE] and convey [MESSAGE/FEELING]."
\`\`\`

### Template 3: Problem-Solving
\`\`\`
"I tried this prompt: [YOUR PROMPT] but the result was [ISSUE]. 
How can I modify it to get [DESIRED RESULT]?"
\`\`\`

## Pro Tips for Advanced Users:

### 🎯 Consistency Techniques
- Save successful prompt formulas
- Create style guides for your brand
- Use the same parameters for series

### 🔄 A/B Testing
- Try multiple variations
- Test different styles
- Compare results and iterate

### 💡 Creative Exploration
- Use --creative for unique results
- Experiment with unusual combinations
- Mix different art styles

### 📈 Quality Control
- Always use --q 2 for final images
- Check aspect ratios for your platform
- Review before using commercially

**You're now ready to create professional-quality content that can compete with expensive design agencies! 🎨**
        `,
        contentCht: `
# 🚀 提升你嘅技能 - 專業技巧

## 用ChatGPT做你嘅提示助手

### 改變遊戲嘅方法：
唔好辛苦自己寫提示，讓ChatGPT做重活！

### 簡單3步過程：

**第1步：告訴ChatGPT你想要咩**
\`\`\`
"我想為我嘅網站創建專業商業圖像。
你可以為呢個寫詳細嘅Midjourney提示嗎？"
\`\`\`

**第2步：ChatGPT創建提示**
ChatGPT畀你類似呢樣嘅嘢：
\`\`\`
"專業商業諮詢場景，現代辦公室自信高管，
自然燈光，企業攝影風格，高質量 --ar 16:9 --v 6"
\`\`\`

**第3步：在Midjourney使用**
複製同貼上 - 就係咁！

## 高級提示技巧

### 1. 添加技術參數
- **寬高比：** --ar 16:9（橫向），--ar 1:1（正方形），--ar 9:16（縱向）
- **質量：** --q 2（高質量）
- **版本：** --v 6（最新版本）
- **風格：** --style raw（更攝影化）

### 2. 使用權重同強調
- **雙冒號（::）** 分離概念
- **數字** 控制重要性
- 例子："商業會議:: 專業:: 2 自信:: 1.5"

### 3. 負面提示
移除唔想要嘅元素：
- **--no hands**（從圖像移除手）
- **--no text**（移除任何文字）
- **--no watermark**（移除水印）

### 4. 風格參考
- **攝影風格：** "用Canon 5D拍攝"，"85mm鏡頭"，"淺景深"
- **燈光：** "黃金時段"，"工作室燈光"，"自然光"
- **情調：** "電影化"，"編輯"，"商業"

## 創造奢華產品展示

### 例子：高端產品攝影
**樣本提示：** "奢華智能手機產品展示，優質材料，精緻燈光，大理石表面，黃金時段氛圍，商業攝影風格 --ar 16:9 --q 2"

**期望結果：** 可以賣$200-500嘅專業產品相片

## 行業特定技巧

### 商業/企業：
- 使用詞語如："專業"，"企業"，"高管"，"現代"
- 燈光："自然辦公室燈光"，"乾淨工作室燈光"
- 顏色："海軍藍"，"炭灰色"，"白色背景"

### 社交媒體：
- 格式："--ar 1:1"（Instagram），"--ar 9:16"（Stories/TikTok）
- 風格："Instagram值得"，"社交媒體準備"，"潮流"
- 情調："充滿活力"，"吸引人"，"引人注目"

### 電子商務：
- 背景："白色背景"，"產品攝影"
- 燈光："均勻燈光"，"無陰影"
- 質量："--q 2"，"商業質量"

## 高級ChatGPT提示

### 模板1：風格變化
\`\`\`
"為[主題]創建5個不同嘅Midjourney提示，
每個用不同風格：攝影、藝術、卡通、
簡約同奢華。"
\`\`\`

### 模板2：行業特定
\`\`\`
"為[行業]寫一個Midjourney提示，會吸引
[目標受眾]同傳達[信息/感覺]。"
\`\`\`

### 模板3：解決問題
\`\`\`
"我試咗呢個提示：[你嘅提示] 但結果係[問題]。
我點樣修改佢嚟獲得[期望結果]？"
\`\`\`

## 高級用戶專業貼士：

### 🎯 一致性技巧
- 保存成功提示公式
- 為你嘅品牌創建風格指南
- 為系列使用相同參數

### 🔄 A/B測試
- 試多個變化
- 測試不同風格
- 比較結果同迭代

### 💡 創意探索
- 用--creative獲得獨特結果
- 實驗不尋常組合
- 混合不同藝術風格

### 📈 質量控制
- 最終圖像總係用--q 2
- 檢查你平台嘅寬高比
- 商業使用前審查

**你而家準備創造可以與昂貴設計機構競爭嘅專業質量內容！🎨**
        `
      },
      // Part 4 Content
      {
        title: 'Midjourney Secret Keywords & Prompts Master Guide',
        titleCht: 'Midjourney秘密關鍵詞同提示大全',
        content: `
# 🎨 Midjourney Secret Keywords & Prompts Master Guide

## Photography Style Keywords

### Professional Photography Techniques
- **Portrait Photography:** "professional headshot, studio lighting, 85mm lens, shallow depth of field"
- **Fashion Photography:** "fashion photography, editorial style, dramatic lighting, high contrast"
- **Product Photography:** "product photography, clean background, soft lighting, commercial style"
- **Landscape Photography:** "landscape photography, golden hour, wide angle, dramatic sky"

### Lighting Keywords
- **Natural Light:** "natural lighting, window light, soft shadows"
- **Dramatic Lighting:** "dramatic lighting, chiaroscuro, high contrast"
- **Studio Lighting:** "studio lighting, professional setup, key light, fill light"
- **Ambient Lighting:** "ambient lighting, mood lighting, atmospheric"

## Art Style Keywords

### Classic Art Styles
- **Oil Painting:** "oil painting, thick brushstrokes, classical style, renaissance"
- **Watercolor:** "watercolor painting, soft washes, transparent layers"
- **Sketch:** "pencil sketch, charcoal drawing, crosshatching, detailed linework"
- **Impressionist:** "impressionist style, loose brushwork, light and color"

### Modern Art Styles
- **Abstract:** "abstract art, geometric shapes, bold colors, minimalist"
- **Cubist:** "cubist style, fragmented forms, multiple perspectives"
- **Surrealist:** "surrealist style, dreamlike, impossible scenarios"
- **Pop Art:** "pop art style, bright colors, comic book aesthetic"

## Color Palette Keywords

### Mood Colors
- **Warm Tones:** "warm color palette, golden hour, sunset colors, cozy atmosphere"
- **Cool Tones:** "cool color palette, blue tones, winter colors, calm mood"
- **Monochromatic:** "monochromatic, black and white, sepia tone, grayscale"
- **Neon Colors:** "neon colors, cyberpunk palette, electric blue, hot pink"

### Special Color Effects
- **Gradient:** "gradient colors, color transition, ombre effect"
- **Complementary:** "complementary colors, high contrast, vibrant"
- **Analogous:** "analogous colors, harmonious palette, subtle variation"
- **Primary:** "primary colors, bold and bright, pure hues"

## Composition & Angle Keywords

### Camera Angles
- **Low Angle:** "low angle shot, worm's eye view, dramatic perspective"
- **High Angle:** "high angle shot, bird's eye view, overhead perspective"
- **Side Angle:** "profile view, side angle, silhouette"
- **Front Angle:** "frontal view, direct gaze, symmetrical composition"

### Composition Techniques
- **Rule of Thirds:** "rule of thirds, balanced composition, leading lines"
- **Symmetry:** "symmetrical composition, mirror image, balanced"
- **Framing:** "framed composition, natural frame, window frame"
- **Negative Space:** "negative space, minimalist composition, breathing room"

## Texture & Material Keywords

### Surface Textures
- **Smooth:** "smooth surface, polished, reflective, glossy"
- **Rough:** "rough texture, weathered, distressed, aged"
- **Soft:** "soft texture, fluffy, velvet, silk"
- **Hard:** "hard surface, metallic, stone, concrete"

### Special Materials
- **Metallic:** "metallic finish, chrome, gold, silver, copper"
- **Glass:** "glass texture, transparent, crystal, frosted"
- **Wood:** "wood grain, natural wood, carved, rustic"
- **Fabric:** "fabric texture, woven, knitted, embroidered"

## Mood & Atmosphere Keywords

### Emotional Expression
- **Happy:** "joyful, cheerful, bright, uplifting, positive energy"
- **Melancholic:** "melancholic, moody, dark, introspective, somber"
- **Mysterious:** "mysterious, enigmatic, shadowy, hidden, secretive"
- **Peaceful:** "peaceful, serene, tranquil, calm, meditative"

### Atmosphere Setting
- **Romantic:** "romantic atmosphere, soft lighting, intimate, dreamy"
- **Dramatic:** "dramatic mood, intense, powerful, striking"
- **Nostalgic:** "nostalgic, vintage, retro, old-fashioned, timeless"
- **Futuristic:** "futuristic, sci-fi, high-tech, modern, sleek"

## Video Prompt Keywords

### Motion Description
- **Slow Motion:** "slow motion, graceful movement, flowing"
- **Fast Action:** "fast paced, dynamic, energetic, quick cuts"
- **Smooth Movement:** "smooth camera movement, steady shot, gliding"
- **Impact Effects:** "dramatic zoom, camera shake, impact"

### Transition Effects
- **Fade:** "fade in, fade out, smooth transition"
- **Quick Cut:** "quick cut, rapid transition, montage style"
- **Rotation:** "rotating camera, spinning effect, circular motion"
- **Push/Pull:** "push in, pull out, zoom effect"

## Advanced Prompting Techniques

### Weight Control
- **Emphasize Elements:** "main element::2, secondary element::1, background::0.5"
- **Reduce Elements:** "unwanted element::-1, avoid this::-2"
- **Balance Weights:** "element A::1.5, element B::1.2, element C::0.8"

### Style Blending
- **Multi-style Fusion:** "photography::1.5 + painting::1.2 + sketch::0.8"
- **Era Mixing:** "vintage::1.3 + modern::1.1 + futuristic::0.9"
- **Cultural Fusion:** "eastern art::1.4 + western style::1.2"

### Parameter Optimization
- **Aspect Ratios:** "--ar 16:9 (cinematic), --ar 1:1 (square), --ar 9:16 (vertical)"
- **Quality Control:** "--q 2 (high quality), --q 1 (standard), --q 0.5 (draft)"
- **Stylization:** "--s 1000 (high stylization), --s 500 (medium), --s 100 (low)"
- **Chaos:** "--c 100 (high creativity), --c 50 (balanced), --c 0 (consistent)"

## Practical Prompt Templates

### Portrait Photography Template
\`\`\`
"professional portrait of [subject], studio lighting, 85mm lens, 
shallow depth of field, clean background, soft shadows, 
high resolution, photorealistic --ar 3:4 --q 2"
\`\`\`

### Product Photography Template
\`\`\`
"product photography of [item], clean white background, 
professional lighting, commercial style, high detail, 
sharp focus, no shadows --ar 1:1 --q 2"
\`\`\`

### Artistic Creation Template
\`\`\`
"artistic interpretation of [subject], [art style], 
vibrant colors, creative composition, detailed artwork, 
museum quality --ar 16:9 --s 750"
\`\`\`

### Landscape Photography Template
\`\`\`
"landscape photography of [location], golden hour lighting, 
dramatic sky, wide angle view, natural colors, 
high resolution, professional --ar 21:9 --q 2"
\`\`\`

### 🔥 Video Generation Template 1: Cyberpunk Streets
**Step 1 - Image Prompt:**
\`\`\`
"cyberpunk street scene, neon-lit alleyway, rain-soaked pavement, 
holographic advertisements, futuristic motorcycle, blade runner aesthetic, 
purple and cyan lighting, volumetric fog --ar 16:9 --stylize 750"
\`\`\`
**Step 2 - Video Prompt:**
\`\`\`
"neon lights pulsing rhythmically, hologram glitching effects, 
steam rising from manholes, rain drops creating ripples, 
motorcycle headlight cutting through fog, cyberpunk atmosphere"
\`\`\`

### ⚡ Video Generation Template 2: Magical Forest
**Step 1 - Image Prompt:**
\`\`\`
"enchanted forest, glowing mushrooms, floating magical particles, 
ancient twisted trees, mystical fog, ethereal blue and green lighting, 
fantasy atmosphere, fireflies dancing --ar 16:9 --chaos 30"
\`\`\`
**Step 2 - Video Prompt:**
\`\`\`
"magical particles swirling in spiral patterns, mushrooms pulsing with bioluminescence, 
fireflies creating light trails, mystical fog flowing between trees, 
enchanted atmosphere with sparkles"
\`\`\`

### 🌊 Video Generation Template 3: Underwater Fantasy
**Step 1 - Image Prompt:**
\`\`\`
"underwater coral reef, bioluminescent sea creatures, 
sunlight filtering through water, colorful tropical fish, 
floating jellyfish, aquatic plants swaying --ar 16:9 --stylize 600"
\`\`\`
**Step 2 - Video Prompt:**
\`\`\`
"jellyfish gracefully floating upward, fish swimming in schools, 
coral polyps opening and closing, water currents creating movement, 
sunbeams dancing through water, peaceful underwater ballet"
\`\`\`

### 🚀 Video Generation Template 4: Space Exploration
**Step 1 - Image Prompt:**
\`\`\`
"astronaut floating in deep space, distant galaxies, 
colorful nebula clouds, space station in background, 
cosmic dust particles, epic space adventure --ar 16:9 --q 2"
\`\`\`
**Step 2 - Video Prompt:**
\`\`\`
"astronaut slowly rotating in zero gravity, nebula clouds swirling, 
distant stars twinkling, space station rotating, 
cosmic dust creating particle effects, epic space journey"
\`\`\`

### 🎭 Video Generation Template 5: High Fashion
**Step 1 - Image Prompt:**
\`\`\`
"high fashion model, avant-garde clothing, dramatic studio lighting, 
colorful smoke effects, mirror reflections, editorial photography, 
bold makeup, artistic composition --ar 9:16 --stylize 800"
\`\`\`
**Step 2 - Video Prompt:**
\`\`\`
"model's hair flowing dramatically, smoke swirling around figure, 
fabric moving with wind, lighting creating dynamic shadows, 
mirror reflections shifting, high-fashion editorial movement"
\`\`\`

## 🎯 Professional Video Generation Tips

### 🔥 Advanced Video Prompting Rules:
1. **Create Visual Impact** - Use strong contrast and dynamic effects
2. **Add Special Effects Keywords** - "particle effects", "glow", "flicker", "pulse"
3. **Specify Cool Motions** - "spiral movement", "explosion effects", "morphing", "disintegration"
4. **Use Emotional Adjectives** - "epic", "dreamy", "mysterious", "futuristic"
5. **Mix Style Elements** - Combine different aesthetics for unique effects
6. **Add Musical Rhythm** - "rhythmic pulsing", "music sync", "beat-driven"

### 🌟 Cool Motion Keywords:
- **Light Effects:** "neon pulsing", "holographic flickering", "laser scanning", "beam penetration"
- **Particle Effects:** "magical particles", "stardust scattering", "energy waves", "smoke explosion"
- **Morphing Actions:** "liquid transformation", "geometric conversion", "fragment reconstruction", "ripple expansion"
- **Environmental Effects:** "space-time distortion", "gravity defying", "dimensional rift", "energy field"
- **Cinematic Effects:** "bullet time", "multiple exposure", "color explosion", "visual impact"

### 💫 Style Mixing Techniques:
- **Cyberpunk + Nature:** "bioluminescent plants growing in futuristic city"
- **Magic + Technology:** "holographic spells rotating and glowing in air"
- **Space + Fashion:** "astronaut wearing avant-garde fashion floating in space"
- **Underwater + Electronic:** "neon coral reefs dancing with electronic fish schools"

## Secret Keyword Combinations

### Professional Photography Combos
- "hasselblad camera" + "medium format" + "professional lighting"
- "canon 5d mark iv" + "85mm f/1.4" + "shallow depth of field"
- "leica camera" + "street photography" + "natural lighting"

### Cinematic Style Combos
- "cinematic lighting" + "anamorphic lens" + "film grain"
- "blade runner aesthetic" + "neon lighting" + "cyberpunk"
- "wes anderson style" + "symmetrical composition" + "pastel colors"

### Art Master Style Combos
- "in the style of van gogh" + "impressionist brushstrokes" + "vibrant colors"
- "picasso style" + "cubist composition" + "abstract forms"
- "monet inspired" + "soft brushwork" + "light and shadow"

## Avoiding Common Mistakes

### Prompt Optimization Tips
1. **Be Specific:** Use specific words rather than vague descriptions
2. **Order Matters:** Place important elements first
3. **Avoid Contradictions:** Ensure descriptions are logically consistent
4. **Test Variations:** Try different keyword combinations
5. **Study References:** Analyze successful prompts from others

### Common Problem Solutions
- **Blurry Images:** Add "sharp focus, high detail, 4k resolution"
- **Wrong Colors:** Specify "accurate colors, color grading, professional"
- **Composition Issues:** Use "well composed, rule of thirds, balanced"
- **Inconsistent Style:** Clearly specify "consistent style, unified aesthetic"

**Master these keywords and techniques to create professional-grade AI images and videos! 🎨**
        `,
        contentCht: `
# 🎨 Midjourney秘密關鍵詞同提示大全

## 攝影風格關鍵詞

### 專業攝影技巧
- **肖像攝影：** "professional headshot, studio lighting, 85mm lens, shallow depth of field"
- **時尚攝影：** "fashion photography, editorial style, dramatic lighting, high contrast"
- **產品攝影：** "product photography, clean background, soft lighting, commercial style"
- **風景攝影：** "landscape photography, golden hour, wide angle, dramatic sky"

### 燈光關鍵詞
- **自然光：** "natural lighting, window light, soft shadows"
- **戲劇性燈光：** "dramatic lighting, chiaroscuro, high contrast"
- **工作室燈光：** "studio lighting, professional setup, key light, fill light"
- **環境燈光：** "ambient lighting, mood lighting, atmospheric"

## 藝術風格關鍵詞

### 經典藝術風格
- **油畫：** "oil painting, thick brushstrokes, classical style, renaissance"
- **水彩：** "watercolor painting, soft washes, transparent layers"
- **素描：** "pencil sketch, charcoal drawing, crosshatching, detailed linework"
- **印象派：** "impressionist style, loose brushwork, light and color"

### 現代藝術風格
- **抽象：** "abstract art, geometric shapes, bold colors, minimalist"
- **立體主義：** "cubist style, fragmented forms, multiple perspectives"
- **超現實主義：** "surrealist style, dreamlike, impossible scenarios"
- **波普藝術：** "pop art style, bright colors, comic book aesthetic"

## 顏色調色板關鍵詞

### 情緒色彩
- **溫暖色調：** "warm color palette, golden hour, sunset colors, cozy atmosphere"
- **冷色調：** "cool color palette, blue tones, winter colors, calm mood"
- **單色調：** "monochromatic, black and white, sepia tone, grayscale"
- **霓虹色：** "neon colors, cyberpunk palette, electric blue, hot pink"

### 特殊色彩效果
- **漸變：** "gradient colors, color transition, ombre effect"
- **互補色：** "complementary colors, high contrast, vibrant"
- **類似色：** "analogous colors, harmonious palette, subtle variation"
- **三原色：** "primary colors, bold and bright, pure hues"

## 構圖同角度關鍵詞

### 攝影角度
- **低角度：** "low angle shot, worm's eye view, dramatic perspective"
- **高角度：** "high angle shot, bird's eye view, overhead perspective"
- **側面角度：** "profile view, side angle, silhouette"
- **正面角度：** "frontal view, direct gaze, symmetrical composition"

### 構圖技巧
- **三分法：** "rule of thirds, balanced composition, leading lines"
- **對稱：** "symmetrical composition, mirror image, balanced"
- **框架：** "framed composition, natural frame, window frame"
- **負空間：** "negative space, minimalist composition, breathing room"

## 質感同材質關鍵詞

### 表面質感
- **光滑：** "smooth surface, polished, reflective, glossy"
- **粗糙：** "rough texture, weathered, distressed, aged"
- **柔軟：** "soft texture, fluffy, velvet, silk"
- **堅硬：** "hard surface, metallic, stone, concrete"

### 特殊材質
- **金屬：** "metallic finish, chrome, gold, silver, copper"
- **玻璃：** "glass texture, transparent, crystal, frosted"
- **木材：** "wood grain, natural wood, carved, rustic"
- **織物：** "fabric texture, woven, knitted, embroidered"

## 情緒同氛圍關鍵詞

### 情緒表達
- **快樂：** "joyful, cheerful, bright, uplifting, positive energy"
- **憂鬱：** "melancholic, moody, dark, introspective, somber"
- **神秘：** "mysterious, enigmatic, shadowy, hidden, secretive"
- **平靜：** "peaceful, serene, tranquil, calm, meditative"

### 氛圍設定
- **浪漫：** "romantic atmosphere, soft lighting, intimate, dreamy"
- **戲劇性：** "dramatic mood, intense, powerful, striking"
- **懷舊：** "nostalgic, vintage, retro, old-fashioned, timeless"
- **未來感：** "futuristic, sci-fi, high-tech, modern, sleek"

## 視頻提示關鍵詞

### 動作描述
- **慢動作：** "slow motion, graceful movement, flowing"
- **快速動作：** "fast paced, dynamic, energetic, quick cuts"
- **平滑移動：** "smooth camera movement, steady shot, gliding"
- **震撼效果：** "dramatic zoom, camera shake, impact"

### 轉場效果
- **淡入淡出：** "fade in, fade out, smooth transition"
- **快速切換：** "quick cut, rapid transition, montage style"
- **旋轉：** "rotating camera, spinning effect, circular motion"
- **推拉：** "push in, pull out, zoom effect"

## 高級提示技巧

### 權重控制
- **強調元素：** "主要元素::2, 次要元素::1, 背景::0.5"
- **減少元素：** "unwanted element::-1, avoid this::-2"
- **平衡權重：** "element A::1.5, element B::1.2, element C::0.8"

### 風格混合
- **多風格融合：** "photography::1.5 + painting::1.2 + sketch::0.8"
- **時代混合：** "vintage::1.3 + modern::1.1 + futuristic::0.9"
- **文化融合：** "eastern art::1.4 + western style::1.2"

### 參數優化
- **長寬比：** "--ar 16:9 (電影), --ar 1:1 (方形), --ar 9:16 (直向)"
- **質量控制：** "--q 2 (高質量), --q 1 (標準), --q 0.5 (草稿)"
- **風格化：** "--s 1000 (高風格化), --s 500 (中等), --s 100 (低)"
- **混亂度：** "--c 100 (高創意), --c 50 (平衡), --c 0 (一致)"

## 實用提示模板

### 肖像攝影模板
\`\`\`
"professional portrait of [subject], studio lighting, 85mm lens, 
shallow depth of field, clean background, soft shadows, 
high resolution, photorealistic --ar 3:4 --q 2"
\`\`\`

### 產品攝影模板
\`\`\`
"product photography of [item], clean white background, 
professional lighting, commercial style, high detail, 
sharp focus, no shadows --ar 1:1 --q 2"
\`\`\`

### 藝術創作模板
\`\`\`
"artistic interpretation of [subject], [art style], 
vibrant colors, creative composition, detailed artwork, 
museum quality --ar 16:9 --s 750"
\`\`\`

### 風景攝影模板
\`\`\`
"landscape photography of [location], golden hour lighting, 
dramatic sky, wide angle view, natural colors, 
high resolution, professional --ar 21:9 --q 2"
\`\`\`

### 🔥 視頻生成模板1：賽博朋克街頭
**第1步 - 圖像提示：**
\`\`\`
cyberpunk street scene, neon-lit alleyway, rain-soaked pavement, holographic advertisements, futuristic motorcycle, blade runner aesthetic, purple and cyan lighting, volumetric fog --ar 16:9 --stylize 750
\`\`\`
**第2步 - 視頻提示：**
\`\`\`
neon lights pulsing rhythmically, hologram glitching effects, steam rising from manholes, rain drops creating ripples, motorcycle headlight cutting through fog, cyberpunk atmosphere
\`\`\`

### ⚡ 視頻生成模板2：魔法森林
**第1步 - 圖像提示：**
\`\`\`
"enchanted forest, glowing mushrooms, floating magical particles, 
ancient twisted trees, mystical fog, ethereal blue and green lighting, 
fantasy atmosphere, fireflies dancing --ar 16:9 --chaos 30"
\`\`\`
**第2步 - 視頻提示：**
\`\`\`
"magical particles swirling in spiral patterns, mushrooms pulsing with bioluminescence, 
fireflies creating light trails, mystical fog flowing between trees, 
enchanted atmosphere with sparkles"
\`\`\`

### 🌊 視頻生成模板3：水下奇幻
**第1步 - 圖像提示：**
\`\`\`
"underwater coral reef, bioluminescent sea creatures, 
sunlight filtering through water, colorful tropical fish, 
floating jellyfish, aquatic plants swaying --ar 16:9 --stylize 600"
\`\`\`
**第2步 - 視頻提示：**
\`\`\`
"jellyfish gracefully floating upward, fish swimming in schools, 
coral polyps opening and closing, water currents creating movement, 
sunbeams dancing through water, peaceful underwater ballet"
\`\`\`

### 🚀 視頻生成模板4：太空探索
**第1步 - 圖像提示：**
\`\`\`
"astronaut floating in deep space, distant galaxies, 
colorful nebula clouds, space station in background, 
cosmic dust particles, epic space adventure --ar 16:9 --q 2"
\`\`\`
**第2步 - 視頻提示：**
\`\`\`
"astronaut slowly rotating in zero gravity, nebula clouds swirling, 
distant stars twinkling, space station rotating, 
cosmic dust creating particle effects, epic space journey"
\`\`\`

### 🎭 視頻生成模板5：時尚大片
**第1步 - 圖像提示：**
\`\`\`
"high fashion model, avant-garde clothing, dramatic studio lighting, 
colorful smoke effects, mirror reflections, editorial photography, 
bold makeup, artistic composition --ar 9:16 --stylize 800"
\`\`\`
**第2步 - 視頻提示：**
\`\`\`
"model's hair flowing dramatically, smoke swirling around figure, 
fabric moving with wind, lighting creating dynamic shadows, 
mirror reflections shifting, high-fashion editorial movement"
\`\`\`

## 🎯 視頻生成專業貼士

### 🔥 進階視頻提示規則：
1. **創造視覺衝擊** - 用強烈對比同動態效果
2. **添加特效關鍵詞** - "粒子效果"、"光暈"、"閃爍"、"脈動"
3. **指定酷炫動作** - "螺旋運動"、"爆炸效果"、"變形"、"分解"
4. **用情緒形容詞** - "史詩般"、"夢幻"、"神秘"、"未來感"
5. **混合風格元素** - 結合不同美學風格創造獨特效果
6. **加入音樂節拍感** - "節奏性脈動"、"音樂同步"、"韻律感"

### 🌟 酷炫動作關鍵詞：
- **光效動作：** "霓虹脈動"、"全息閃爍"、"雷射掃射"、"光束穿透"
- **粒子效果：** "魔法粒子"、"星塵飄散"、"能量波動"、"煙霧爆發"
- **變形動作：** "液體變形"、"幾何轉換"、"碎片重組"、"波紋擴散"
- **環境效果：** "時空扭曲"、"重力失效"、"次元裂縫"、"能量場"
- **電影級效果：** "子彈時間"、"多重曝光"、"色彩爆炸"、"視覺衝擊"

### 💫 風格混搭技巧：
- **賽博朋克 + 自然：** "生物發光植物在未來城市中生長"
- **魔法 + 科技：** "全息咒語在空中旋轉發光"
- **太空 + 時尚：** "宇航員穿著前衛時裝在太空中飄浮"
- **水下 + 電子：** "海底霓虹珊瑚同電子魚群共舞"

## 秘密關鍵詞組合

### 專業攝影組合
- "hasselblad camera" + "medium format" + "professional lighting"
- "canon 5d mark iv" + "85mm f/1.4" + "shallow depth of field"
- "leica camera" + "street photography" + "natural lighting"

### 電影風格組合
- "cinematic lighting" + "anamorphic lens" + "film grain"
- "blade runner aesthetic" + "neon lighting" + "cyberpunk"
- "wes anderson style" + "symmetrical composition" + "pastel colors"

### 藝術大師風格組合
- "in the style of van gogh" + "impressionist brushstrokes" + "vibrant colors"
- "picasso style" + "cubist composition" + "abstract forms"
- "monet inspired" + "soft brushwork" + "light and shadow"

## 避免常見錯誤

### 提示優化技巧
1. **具體描述：** 用具體詞語而非籠統描述
2. **順序重要：** 重要元素放在前面
3. **避免矛盾：** 確保描述邏輯一致
4. **測試變化：** 嘗試不同關鍵詞組合
5. **參考學習：** 研究成功作品的提示

### 常見問題解決
- **圖像模糊：** 添加 "sharp focus, high detail, 4k resolution"
- **顏色不準：** 指定 "accurate colors, color grading, professional"
- **構圖問題：** 使用 "well composed, rule of thirds, balanced"
- **風格不一致：** 明確指定 "consistent style, unified aesthetic"

**掌握呢啲關鍵詞同技巧，你就可以創造出專業級嘅AI圖像同視頻！🎨**
        `
      }
    ];
    
    // Return the content for the requested part
    const selectedContent = contents[partNumber - 1];
    console.log('Returning content for part:', partNumber, selectedContent ? 'Found' : 'Not found');
    return selectedContent || contents[0];
  }
};

const ProPlanLearning: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentPart, setCurrentPart] = useState(0);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  const markPartComplete = (partNumber: number) => {
    if (!completedParts.includes(partNumber)) {
      setCompletedParts([...completedParts, partNumber]);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={() => navigate('/course')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'Back to Courses' : '返回課程'}
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {language === 'en' ? beginnerCourse.title : beginnerCourse.titleCht}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold">
              {language === 'en' ? beginnerCourse.subtitle : beginnerCourse.subtitleCht}
            </p>
          </div>

                      <div className="bg-blue-600/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-300">{language === 'en' ? 'Beginner Friendly' : '初學者友好'}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">{language === 'en' ? '4 Parts Total' : '總共4部分'}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300">{language === 'en' ? 'Step by Step' : '逐步指導'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Part Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 sticky top-24">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                <Target className="w-6 h-6" />
                {language === 'en' ? 'Learning Path' : '學習路徑'}
              </h3>
              
              {beginnerCourse.parts.map((part, index) => (
                <div key={part.id} className="mb-4">
                  <button
                    onClick={() => setCurrentPart(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                      currentPart === index
                        ? `bg-gradient-to-r ${part.color} text-white shadow-2xl scale-105`
                        : 'bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">{part.icon}</div>
                      <div>
                        <div className="font-bold text-lg">
                          {language === 'en' ? `Part ${part.number}` : `Part ${part.number}`}
                        </div>
                        <div className="text-sm opacity-90">
                          {language === 'en' ? part.title : part.titleCht}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm opacity-80 mb-3">
                      {language === 'en' ? part.description : part.descriptionCht}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{language === 'en' ? part.duration : part.durationCht}</span>
                      </div>
                      
                      {completedParts.includes(part.number) && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </button>
                  
                  {/* Topics Preview */}
                  {currentPart === index && (
                    <div className="mt-3 ml-4 space-y-2">
                      {part.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2 text-sm text-gray-400 bg-gray-800/30 p-2 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span>{language === 'en' ? topic.name : topic.nameCht}</span>
                        </div>
                      ))}
                      
                      {/* Sample Content Preview */}
                      <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-500/30 mt-3">
                        <div className="text-sm font-semibold text-blue-400 mb-2">
                          {language === 'en' ? part.sampleContent.title : part.sampleContent.titleCht}
                        </div>
                        <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded font-mono">
                          {language === 'en' ? part.sampleContent.prompt : part.sampleContent.promptCht}
                        </div>
                        <div className="text-xs text-green-400 mt-1">
                          → {language === 'en' ? part.sampleContent.result : part.sampleContent.resultCht}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden">
              
              {/* Lesson Header */}
              <div className={`bg-gradient-to-r ${beginnerCourse.parts[currentPart].color} p-8`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-2xl text-3xl">
                    {beginnerCourse.parts[currentPart].icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {language === 'en' ? 
                        `Part ${beginnerCourse.parts[currentPart].number}: ${beginnerCourse.parts[currentPart].title}` :
                        `Part ${beginnerCourse.parts[currentPart].number}: ${beginnerCourse.parts[currentPart].titleCht}`
                      }
                    </h2>
                    <p className="text-white/90 text-lg">
                      {language === 'en' ? beginnerCourse.parts[currentPart].description : beginnerCourse.parts[currentPart].descriptionCht}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="p-8">
                {/* Only show enhanced formatting for Part 4, regular content for other parts */}
                {currentPart !== 3 && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed text-gray-200">
                      {language === 'en' ? beginnerCourse.getPartContent(currentPart + 1).content : beginnerCourse.getPartContent(currentPart + 1).contentCht}
                    </div>
                  </div>
                )}

                {/* Enhanced formatting for Part 4 - Midjourney Keywords */}
                {currentPart === 3 && (
                  <div className="mt-4">
                    <div className="midjourney-enhanced-content max-w-full overflow-hidden">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .midjourney-enhanced-content h1 {
                            font-size: 2.5rem !important;
                            color: var(--ai-formula-primary) !important;
                            margin-top: 2rem !important;
                            margin-bottom: 1.5rem !important;
                            border-bottom: 3px solid var(--ai-formula-primary) !important;
                            padding-bottom: 0.75rem !important;
                            text-align: center !important;
                          }
                          .midjourney-enhanced-content h2 {
                            font-size: 2.25rem !important;
                            color: var(--ai-formula-primary) !important;
                            margin-top: 2.5rem !important;
                            margin-bottom: 1.25rem !important;
                            border-bottom: 2px solid var(--ai-formula-primary) !important;
                            padding-bottom: 0.5rem !important;
                          }
                          .midjourney-enhanced-content h3 {
                            font-size: 1.75rem !important;
                            color: var(--ai-formula-info) !important;
                            margin-top: 2rem !important;
                            margin-bottom: 1rem !important;
                            font-weight: 700 !important;
                          }
                          .midjourney-enhanced-content h4 {
                            font-size: 1.35rem !important;
                            color: var(--ai-formula-success) !important;
                            margin-top: 1.5rem !important;
                            margin-bottom: 0.75rem !important;
                            font-weight: 600 !important;
                          }
                          .midjourney-enhanced-content li {
                            margin-bottom: 0.75rem !important;
                            line-height: 1.7 !important;
                            font-size: 1.05rem !important;
                          }
                          .midjourney-enhanced-content strong {
                            color: var(--ai-formula-accent) !important;
                            font-weight: 700 !important;
                            font-size: 1.1rem !important;
                          }
                          .midjourney-enhanced-content code {
                            background-color: var(--ai-formula-dark-medium) !important;
                            padding: 0.4rem 0.7rem !important;
                            border-radius: 0.5rem !important;
                            color: var(--ai-formula-primary) !important;
                            font-size: 0.95rem !important;
                            border: 1px solid var(--ai-formula-gray-600) !important;
                          }
                          .midjourney-enhanced-content pre {
                            background-color: var(--ai-formula-dark) !important;
                            border: 2px solid var(--ai-formula-gray-600) !important;
                            border-radius: 0.75rem !important;
                            padding: 1.5rem !important;
                            margin: 1.5rem 0 !important;
                            overflow-x: auto !important;
                            white-space: pre-wrap !important;
                            word-wrap: break-word !important;
                            max-width: 100% !important;
                          }
                          .midjourney-enhanced-content pre code {
                            background-color: transparent !important;
                            padding: 0 !important;
                            color: var(--ai-formula-success) !important;
                            border: none !important;
                            white-space: pre-wrap !important;
                            word-wrap: break-word !important;
                            font-size: 0.9rem !important;
                            line-height: 1.5 !important;
                          }
                          .midjourney-enhanced-content p {
                            font-size: 1.05rem !important;
                            line-height: 1.6 !important;
                            margin-bottom: 1rem !important;
                          }
                          .midjourney-enhanced-content {
                            max-width: 100% !important;
                            overflow-wrap: break-word !important;
                            word-break: break-word !important;
                          }
                          @media (max-width: 768px) {
                            .midjourney-enhanced-content pre {
                              padding: 1rem !important;
                              font-size: 0.85rem !important;
                            }
                            .midjourney-enhanced-content pre code {
                              font-size: 0.8rem !important;
                            }
                          }
                        `
                      }} />
                      
                      {/* Render content with custom handling for portrait template */}
                      <div className="overflow-hidden max-w-full">
                        {(() => {
                          const content = language === 'en' ? beginnerCourse.getPartContent(4).content : beginnerCourse.getPartContent(4).contentCht;
                          
                          // Handle both English and Chinese versions
                          const portraitSectionName = language === 'en' ? '### Portrait Photography Template' : '### 肖像攝影模板';
                          const productSectionName = language === 'en' ? '### Product Photography Template' : '### 產品攝影模板';
                          const artSectionName = language === 'en' ? '### Artistic Creation Template' : '### 藝術創作模板';
                          const videoSectionName = language === 'en' ? '### 🔥 Video Generation Template 1: Cyberpunk Streets' : '### 🔥 視頻生成模板1：賽博朋克街頭';
                          const magicForestSectionName = language === 'en' ? '### ⚡ Video Generation Template 2: Magical Forest' : '### ⚡ 視頻生成模板2：魔法森林';
                          const underwaterSectionName = language === 'en' ? '### 🌊 Video Generation Template 3: Underwater Fantasy' : '### 🌊 視頻生成模板3：水下奇幻';
                          const spaceSectionName = language === 'en' ? '### 🚀 Video Generation Template 4: Space Exploration' : '### 🚀 視頻生成模板4：太空探索';
                          const fashionSectionName = language === 'en' ? '### 🎭 Video Generation Template 5: High Fashion' : '### 🎭 視頻生成模板5：時尚大片';
                          
                          const sections = content.split(portraitSectionName);
                          
                          if (sections.length > 1) {
                            // Split content before and after portrait template
                            const beforePortrait = sections[0];
                            const afterPortraitSplit = sections[1].split(productSectionName);
                            const portraitSection = afterPortraitSplit[0];
                            
                            if (afterPortraitSplit.length > 1) {
                              // Further split for product photography template
                              const productSplit = afterPortraitSplit[1].split(artSectionName);
                              const productSection = productSplit[0];
                              
                              // Handle artistic creation template and landscape template
                              let artSection = '';
                              let landscapeSection = '';
                              let afterLandscape = '';
                              
                              if (productSplit.length > 1) {
                                const artContent = productSplit[1];
                                const landscapeSectionName = language === 'en' ? '### Landscape Photography Template' : '### 風景攝影模板';
                                
                                // Split artistic creation from landscape template
                                const artLandscapeSplit = artContent.split(landscapeSectionName);
                                artSection = artLandscapeSplit[0];
                                
                                if (artLandscapeSplit.length > 1) {
                                  // Further split landscape template from video template
                                  const landscapeContent = artLandscapeSplit[1];
                                  const videoSplit = landscapeContent.split(videoSectionName);
                                  landscapeSection = videoSplit[0];
                                  
                                  if (videoSplit.length > 1) {
                                    // Handle video template section
                                    const videoContent = videoSplit[1];
                                    // Look for the next major section after video
                                    const nextSectionMatch = videoContent.match(/\n### (?!🔥 視頻生成模板|🔥 Video Generation Template)/);
                                    if (nextSectionMatch) {
                                      const splitIndex = videoContent.indexOf(nextSectionMatch[0]);
                                      afterLandscape = videoSectionName + videoContent.substring(splitIndex);
                                    } else {
                                      afterLandscape = videoSectionName + videoContent;
                                    }
                                  } else {
                                    afterLandscape = '';
                                  }
                                }
                              }
                              
                              return (
                                <>
                                  {/* Content before portrait template */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: beforePortrait
                                      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
                                      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Portrait template section with images */}
                                  <h3 style={{fontSize: '1.75rem', color: 'var(--ai-formula-info)', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700'}}>
                                    肖像攝影模板
                                  </h3>
                                  
                                  {/* Example Images for Portrait - BEFORE the code template */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-3xl">
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/856765d0-10a3-4bba-a823-67c2412a0c65/0_0.png" 
                                        alt="Portrait Example 1"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Portrait Example 1</p>
                                    </div>
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/f2beab12-a2ea-4d6e-9d91-fc5924a81d64/0_0.png" 
                                        alt="Portrait Example 2"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Portrait Example 2</p>
                                    </div>
                                  </div>
                                  
                                  {/* Portrait template code - AFTER the images */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: portraitSection
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Product template section with images */}
                                  <h3 style={{fontSize: '1.75rem', color: 'var(--ai-formula-info)', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700'}}>
                                    {language === 'en' ? 'Product Photography Template' : '產品攝影模板'}
                                  </h3>
                                  
                                  {/* Example Images for Product - BEFORE the code template */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-3xl">
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/f7a6bb2d-a33e-49fc-becb-43b80276c9c8/0_2.png" 
                                        alt="Product Example 1"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Product Example 1</p>
                                    </div>
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/c362a708-8e78-465c-b1cd-4ed89778554b/0_1.png" 
                                        alt="Product Example 2"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Product Example 2</p>
                                    </div>
                                  </div>
                                  
                                  {/* Product template code - AFTER the images */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: productSection
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Artistic Creation template section with image */}
                                  <h3 style={{fontSize: '1.75rem', color: 'var(--ai-formula-info)', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700'}}>
                                    {language === 'en' ? 'Artistic Creation Template' : '藝術創作模板'}
                                  </h3>
                                  
                                  {/* Example Image for Artistic Creation - BEFORE the code template */}
                                  <div className="flex justify-center my-6 max-w-3xl">
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/81e5ec51-141e-4eb7-80db-01267da045dd/0_3.png" 
                                        alt="Artistic Creation Example"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">
                                        {language === 'en' ? 'Artistic Creation Example' : '藝術創作範例'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Artistic Creation template code - AFTER the image */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: artSection
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Landscape Photography template section with image */}
                                  <h3 style={{fontSize: '1.75rem', color: 'var(--ai-formula-info)', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700'}}>
                                    {language === 'en' ? 'Landscape Photography Template' : '風景攝影模板'}
                                  </h3>
                                  
                                  {/* Example Image for Landscape Photography - BEFORE the code template */}
                                  <div className="flex justify-center my-6 max-w-3xl">
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/c90fd7fe-9245-468a-a624-20023c0fcbf1/0_1.png" 
                                        alt="Landscape Photography Example"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">
                                        {language === 'en' ? 'Landscape Photography Example' : '風景攝影範例'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Landscape Photography template code - AFTER the image */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: landscapeSection
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  

                                  
                                  {/* Video Templates Section with Images and Videos */}
                                  {afterLandscape && (() => {




                                    // Define video template data with proper structure
                                    const videoTemplateData = [
                                      {
                                        id: 'cyberpunk',
                                        sectionName: '### 🔥 視頻生成模板1：賽博朋克街頭',
                                        title: language === 'en' ? '🔥 Video Generation Template 1: Cyberpunk Streets' : '🔥 視頻生成模板1：賽博朋克街頭',
                                        imageUrl: 'https://cdn.midjourney.com/8aca4b16-1777-4cfa-bf0b-2e580dfc0a19/0_0.png',
                                        videoUrl: 'https://cdn.midjourney.com/video/edb4f881-28bc-43c2-94f1-de33c099966a/3.mp4',
                                        imageAlt: language === 'en' ? 'Cyberpunk Streets Example' : '賽博朋克街頭範例',
                                        videoAlt: language === 'en' ? 'Cyberpunk Streets Video Example' : '賽博朋克街頭視頻範例'
                                      },
                                      {
                                        id: 'magical',
                                        sectionName: '### ⚡ 視頻生成模板2：魔法森林',
                                        title: language === 'en' ? '⚡ Video Generation Template 2: Magical Forest' : '⚡ 視頻生成模板2：魔法森林',
                                        imageUrl: 'https://cdn.midjourney.com/1096de2a-d098-48d0-9d67-dc6eb34fa506/0_1.png',
                                        videoUrl: 'https://cdn.midjourney.com/video/525dfefd-45be-4c83-96e9-aaf2c992cee4/1.mp4',
                                        imageAlt: language === 'en' ? 'Magical Forest Example' : '魔法森林範例',
                                        videoAlt: language === 'en' ? 'Magical Forest Video Example' : '魔法森林視頻範例'
                                      },
                                      {
                                        id: 'underwater',
                                        sectionName: '### 🌊 視頻生成模板3：水下奇幻',
                                        title: language === 'en' ? '🌊 Video Generation Template 3: Underwater Fantasy' : '🌊 視頻生成模板3：水下奇幻',
                                        imageUrl: 'https://cdn.midjourney.com/e6dbb98b-6e05-40e7-8df8-fe10d8c5f9fa/0_1.png',
                                        videoUrl: 'https://cdn.midjourney.com/video/878b9a50-1af9-4231-ba5c-85b2b60a33ef/3.mp4',
                                        imageAlt: language === 'en' ? 'Underwater Fantasy Example' : '水下奇幻範例',
                                        videoAlt: language === 'en' ? 'Underwater Fantasy Video Example' : '水下奇幻視頻範例'
                                      },
                                      {
                                        id: 'space',
                                        sectionName: '### 🚀 視頻生成模板4：太空探索',
                                        title: language === 'en' ? '🚀 Video Generation Template 4: Space Exploration' : '🚀 視頻生成模板4：太空探索',
                                        imageUrl: 'https://cdn.midjourney.com/1e964ccd-561d-4184-9989-01e7e00b5ea9/0_0.png',
                                        videoUrl: 'https://cdn.midjourney.com/video/ca6eccee-3e34-4491-ab46-19c980c724bc/0.mp4',
                                        imageAlt: language === 'en' ? 'Space Exploration Example' : '太空探索範例',
                                        videoAlt: language === 'en' ? 'Space Exploration Video Example' : '太空探索視頻範例'
                                      },
                                      {
                                        id: 'fashion',
                                        sectionName: '### 🎭 視頻生成模板5：時尚大片',
                                        title: language === 'en' ? '🎭 Video Generation Template 5: High Fashion' : '🎭 視頻生成模板5：時尚大片',
                                        imageUrl: 'https://cdn.midjourney.com/507f8008-822f-4da3-8194-6965964e0bd4/0_0.png',
                                        videoUrl: 'https://cdn.midjourney.com/video/a1f878a0-52b0-4be4-83d5-227f3bf378f3/2.mp4',
                                        imageAlt: language === 'en' ? 'High Fashion Example' : '時尚大片範例',
                                        videoAlt: language === 'en' ? 'High Fashion Video Example' : '時尚大片視頻範例'
                                      }
                                    ];

                                    // Check if content has video templates - look for the actual template titles
                                    const hasVideoTemplates = afterLandscape.includes('視頻生成模板1') || afterLandscape.includes('Video Generation Template');
                                    
                                    if (hasVideoTemplates) {
                                      // Find where video templates begin and end
                                      const firstVideoTemplateStart = afterLandscape.indexOf('### 🔥 視頻生成模板1');
                                      const beforeVideoSection = firstVideoTemplateStart > 0 ? afterLandscape.substring(0, firstVideoTemplateStart) : '';
                                      
                                      // Find the end of video templates (look for next major section)
                                      const afterFirstTemplate = afterLandscape.substring(firstVideoTemplateStart);
                                      const nextMajorSectionMatch = afterFirstTemplate.match(/\n## (?![🔥⚡🌊🚀🎭])/);
                                      const videoSectionEnd = nextMajorSectionMatch ? firstVideoTemplateStart + nextMajorSectionMatch.index : afterLandscape.length;
                                      const videoContent = afterLandscape.substring(firstVideoTemplateStart, videoSectionEnd);
                                      const afterVideoSection = videoSectionEnd < afterLandscape.length ? afterLandscape.substring(videoSectionEnd) : '';
                                      
                                      const renderedElements = [];
                                      
                                      // Add content before video section
                                      if (beforeVideoSection.trim()) {
                                        renderedElements.push(
                                          <div key="before-video" dangerouslySetInnerHTML={{
                                            __html: beforeVideoSection
                                              .replace(/^#### (.+)$/gm, '<h4 style="color: #34d399; font-size: 1.35rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">$1</h4>')
                                              .replace(/^### (.+)$/gm, '<h3 style="color: #60a5fa; font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">$1</h3>')
                                              .replace(/^## (.+)$/gm, '<h2 style="color: #fbbf24; font-size: 2.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem;">$1</h2>')
                                              .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #f472b6;">$1</strong>')
                                              .replace(/```([\s\S]*?)```/g, '<pre style="background-color: #1f2937; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-size: 0.9rem; margin: 1rem 0;"><code style="color: #10b981;">$1</code></pre>')
                                              .replace(/\n/g, '<br>')
                                          }} />
                                        );
                                      }
                                      
                                      // Add video section header
                                      renderedElements.push(
                                        <h2 key="video-header" style={{color: '#fbbf24', fontSize: '2.25rem', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1.25rem'}}>
                                          🎬 Midjourney視頻生成模板
                                        </h2>
                                      );
                                      
                                      // Process each video template with direct content extraction
                                      videoTemplateData.forEach((templateData, index) => {
                                        // Define the prompts directly since we know the content structure
                                        const videoPrompts = [
                                          {
                                            // Cyberpunk
                                            imagePrompt: "cyberpunk street scene, neon-lit alleyway, rain-soaked pavement, holographic advertisements, futuristic motorcycle, blade runner aesthetic, purple and cyan lighting, volumetric fog --ar 16:9 --stylize 750",
                                            videoPrompt: "neon lights pulsing rhythmically, hologram glitching effects, steam rising from manholes, rain drops creating ripples, motorcycle headlight cutting through fog, cyberpunk atmosphere"
                                          },
                                          {
                                            // Magical Forest
                                            imagePrompt: "enchanted forest, glowing mushrooms, floating magical particles, ancient twisted trees, mystical fog, ethereal blue and green lighting, fantasy atmosphere, fireflies dancing --ar 16:9 --chaos 30",
                                            videoPrompt: "magical particles swirling in spiral patterns, mushrooms pulsing with bioluminescence, fireflies creating light trails, mystical fog flowing between trees, enchanted atmosphere with sparkles"
                                          },
                                          {
                                            // Underwater Fantasy
                                            imagePrompt: "underwater coral reef, bioluminescent sea creatures, sunlight filtering through water, colorful tropical fish, floating jellyfish, aquatic plants swaying --ar 16:9 --stylize 600",
                                            videoPrompt: "jellyfish gracefully floating upward, fish swimming in schools, coral polyps opening and closing, water currents creating movement, sunbeams dancing through water, peaceful underwater ballet"
                                          },
                                          {
                                            // Space Exploration
                                            imagePrompt: "astronaut floating in deep space, distant galaxies, colorful nebula clouds, space station in background, cosmic dust particles, epic space adventure --ar 16:9 --q 2",
                                            videoPrompt: "astronaut slowly rotating in zero gravity, nebula clouds swirling, distant stars twinkling, space station rotating, cosmic dust creating particle effects, epic space journey"
                                          },
                                          {
                                            // High Fashion
                                            imagePrompt: "high fashion model, avant-garde clothing, dramatic studio lighting, colorful smoke effects, mirror reflections, editorial photography, bold makeup, artistic composition --ar 9:16 --stylize 800",
                                            videoPrompt: "model's hair flowing dramatically, smoke swirling around figure, fabric moving with wind, lighting creating dynamic shadows, mirror reflections shifting, high-fashion editorial movement"
                                          }
                                        ];
                                        
                                        const currentPrompts = videoPrompts[index] || videoPrompts[0];
                                        
                                        // Render complete template with predefined prompts
                                        renderedElements.push(
                                          <div key={templateData.id} style={{marginBottom: '4rem', borderBottom: '1px solid #374151', paddingBottom: '2rem'}}>
                                            {/* Title */}
                                            <h3 style={{fontSize: '1.75rem', color: '#60a5fa', marginTop: '2rem', marginBottom: '1.5rem', fontWeight: '700'}}>
                                              {templateData.title}
                                            </h3>
                                            
                                            {/* Image */}
                                            <div className="flex justify-center my-6">
                                              <div className="text-center">
                                                <img 
                                                  src={templateData.imageUrl}
                                                  alt={templateData.imageAlt}
                                                  className="w-full max-w-md mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                                  loading="lazy"
                                                  onError={(e) => {
                                                    console.log('Image failed to load:', templateData.imageUrl);
                                                    e.currentTarget.style.display = 'none';
                                                  }}
                                                />
                                                <p className="text-blue-400 text-sm mt-2 font-medium">{templateData.imageAlt}</p>
                                              </div>
                                            </div>
                                            
                                            {/* Image Prompt */}
                                            <div style={{marginBottom: '2rem'}}>
                                              <h4 style={{color: '#f472b6', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>
                                                第1步 - 圖像提示：
                                              </h4>
                                              <pre style={{
                                                backgroundColor: '#1f2937', 
                                                padding: '1rem', 
                                                borderRadius: '0.5rem', 
                                                overflowX: 'auto', 
                                                whiteSpace: 'pre-wrap', 
                                                wordWrap: 'break-word', 
                                                fontSize: '0.9rem', 
                                                margin: '1rem 0',
                                                color: '#10b981',
                                                border: '1px solid #374151'
                                              }}>
                                                {currentPrompts.imagePrompt}
                                              </pre>
                                            </div>
                                            
                                            {/* Video */}
                                            <div className="flex justify-center my-6">
                                              <div className="text-center">
                                                <video 
                                                  width="100%" 
                                                  controls 
                                                  className="w-full max-w-md mx-auto rounded-lg border-2 border-gray-600 shadow-lg"
                                                  style={{maxWidth: '500px'}}
                                                  onError={(e) => {
                                                    console.log('Video failed to load:', templateData.videoUrl);
                                                  }}
                                                >
                                                  <source src={templateData.videoUrl} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                                </video>
                                                <p className="text-blue-400 text-sm mt-2 font-medium">{templateData.videoAlt}</p>
                                              </div>
                                            </div>
                                            
                                            {/* Video Prompt */}
                                            <div>
                                              <h4 style={{color: '#f472b6', fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem'}}>
                                                第2步 - 視頻提示：
                                              </h4>
                                              <pre style={{
                                                backgroundColor: '#1f2937', 
                                                padding: '1rem', 
                                                borderRadius: '0.5rem', 
                                                overflowX: 'auto', 
                                                whiteSpace: 'pre-wrap', 
                                                wordWrap: 'break-word', 
                                                fontSize: '0.9rem', 
                                                margin: '1rem 0',
                                                color: '#10b981',
                                                border: '1px solid #374151'
                                              }}>
                                                {currentPrompts.videoPrompt}
                                              </pre>
                                            </div>
                                          </div>
                                        );
                                      });
                                      
                                      // Add content after video section
                                      if (afterVideoSection.trim()) {
                                        renderedElements.push(
                                          <div key="after-video" dangerouslySetInnerHTML={{
                                            __html: afterVideoSection
                                              .replace(/^#### (.+)$/gm, '<h4 style="color: #34d399; font-size: 1.35rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">$1</h4>')
                                              .replace(/^### (.+)$/gm, '<h3 style="color: #60a5fa; font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">$1</h3>')
                                              .replace(/^## (.+)$/gm, '<h2 style="color: #fbbf24; font-size: 2.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem;">$1</h2>')
                                              .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #f472b6;">$1</strong>')
                                              .replace(/```([\s\S]*?)```/g, '<pre style="background-color: #1f2937; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-size: 0.9rem; margin: 1rem 0;"><code style="color: #10b981;">$1</code></pre>')
                                              .replace(/\n/g, '<br>')
                                          }} />
                                        );
                                      }
                                      
                                      return <>{renderedElements}</>;
                                    } else {
                                      // No video templates, render normally
                                      return (
                                        <div dangerouslySetInnerHTML={{
                                          __html: afterLandscape
                                            .replace(/^#### (.+)$/gm, '<h4 style="color: #34d399; font-size: 1.35rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">$1</h4>')
                                            .replace(/^### (.+)$/gm, '<h3 style="color: #60a5fa; font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">$1</h3>')
                                            .replace(/^## (.+)$/gm, '<h2 style="color: #fbbf24; font-size: 2.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem;">$1</h2>')
                                            .replace(/^# (.+)$/gm, '<h1 style="color: #fbbf24; font-size: 2.5rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">$1</h1>')
                                            .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #f472b6;">$1</strong>')
                                            .replace(/```([\s\S]*?)```/g, '<pre style="background-color: #1f2937; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; font-size: 0.9rem; margin: 1rem 0;"><code style="color: #10b981;">$1</code></pre>')
                                            .replace(/`([^`]+)`/g, '<code style="background-color: #374151; color: #10b981; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">$1</code>')
                                            .replace(/\n/g, '<br>')
                                        }} />
                                      );
                                    }
                                  })()}
                                </>
                              );
                            } else {
                              const afterPortrait = afterPortraitSplit.length > 1 ? productSectionName + afterPortraitSplit[1] : '';
                              
                              return (
                                <>
                                  {/* Content before portrait template */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: beforePortrait
                                      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
                                      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Portrait template section with images */}
                                  <h3 style={{fontSize: '1.75rem', color: 'var(--ai-formula-info)', marginTop: '2rem', marginBottom: '1rem', fontWeight: '700'}}>
                                    肖像攝影模板
                                  </h3>
                                  
                                  {/* Example Images for Portrait - BEFORE the code template */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 max-w-3xl">
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/856765d0-10a3-4bba-a823-67c2412a0c65/0_0.png" 
                                        alt="Portrait Example 1"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Portrait Example 1</p>
                                    </div>
                                    <div className="text-center">
                                      <img 
                                        src="https://cdn.midjourney.com/f2beab12-a2ea-4d6e-9d91-fc5924a81d64/0_0.png" 
                                        alt="Portrait Example 2"
                                        className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-600 shadow-lg hover:scale-105 hover:border-blue-400 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                          console.log('Image failed to load:', e.currentTarget.src);
                                        }}
                                      />
                                      <p className="text-blue-400 text-sm mt-2 font-medium">Portrait Example 2</p>
                                    </div>
                                  </div>
                                  
                                  {/* Portrait template code - AFTER the images */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: portraitSection
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                  
                                  {/* Content after portrait template */}
                                  <div dangerouslySetInnerHTML={{
                                    __html: afterPortrait
                                      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
                                      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                                      .replace(/\n/g, '<br>')
                                  }} />
                                </>
                              );
                            }
                          } else {
                            // Fallback: render normally if portrait template not found
                            return (
                              <div dangerouslySetInnerHTML={{
                                __html: content
                                  .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
                                  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                                  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                                  .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                                  .replace(/\n/g, '<br>')
                              }} />
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                  {/* Professional Tips Section for Part 3 */}
                  {currentPart === 2 && beginnerCourse.parts[2].proTips && (
                    <div className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-500/30">
                      <h3 className="text-3xl font-bold mb-8 text-center text-orange-400 flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8" />
                        {language === 'en' ? beginnerCourse.parts[2].proTips.title : beginnerCourse.parts[2].proTips.titleCht}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {beginnerCourse.parts[2].proTips.tips.map((tip) => (
                          <div key={tip.number} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/30 hover:border-orange-500/50 transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                {tip.number}
                              </div>
                              <h4 className="text-lg font-semibold text-orange-400">
                                {language === 'en' ? tip.title : tip.titleCht}
                              </h4>
                            </div>
                            
                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {language === 'en' ? tip.description : tip.descriptionCht}
                            </p>
                            
                            <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                              <div className="text-sm text-green-400 font-semibold mb-2">Example:</div>
                              <div className="text-xs text-gray-300 font-mono whitespace-pre-line">
                                {language === 'en' ? tip.example : tip.exampleCht}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 text-center">
                        <div className="bg-yellow-500/20 rounded-2xl p-6 border border-yellow-500/30">
                          <h4 className="text-xl font-bold text-yellow-400 mb-3">
                            {language === 'en' ? '💡 Pro Tip: Practice These Daily!' : '💡 專業貼士：每日練習呢啲！'}
                          </h4>
                          <p className="text-gray-300">
                            {language === 'en' ? 
                              'Master these 10 tips and you\'ll create professional-quality images that can sell for $50-500 each!' :
                              '掌握呢10個貼士，你就可以創造每張可以賣$50-500嘅專業質量圖像！'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-700">
                  <button
                    onClick={() => markPartComplete(beginnerCourse.parts[currentPart].number)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      completedParts.includes(beginnerCourse.parts[currentPart].number)
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:scale-105'
                    }`}
                  >
                    <Star className="w-5 h-5" />
                    {completedParts.includes(beginnerCourse.parts[currentPart].number)
                      ? (language === 'en' ? 'Completed!' : '已完成！')
                      : (language === 'en' ? 'Mark Complete' : '標記完成')
                    }
                  </button>
                  
                  <button
                    onClick={() => setCurrentPart((prev) => Math.min(prev + 1, beginnerCourse.parts.length - 1))}
                    disabled={currentPart === beginnerCourse.parts.length - 1}
                    className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {language === 'en' ? 'Next Part' : '下一部分'}
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6" />
            {language === 'en' ? 'Quick Success Tips' : '快速成功貼士'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold mb-2 text-green-400">
                {language === 'en' ? 'Start Simple' : '從簡單開始'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Don\'t try to create complex images on day 1. Master the basics first!' :
                  '唔好第一日就試創造複雜圖像。先掌握基礎！'
                }
              </p>
            </div>
            
            <div className="bg-blue-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="text-lg font-semibold mb-2 text-blue-400">
                {language === 'en' ? 'Practice Daily' : '每日練習'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Spend 15-30 minutes daily. Consistency beats intensity!' :
                  '每日花15-30分鐘。持續勝過強度！'
                }
              </p>
            </div>
            
            <div className="bg-yellow-500/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                {language === 'en' ? 'Have Fun!' : '享受樂趣！'}
              </h4>
              <p className="text-gray-300 text-sm">
                {language === 'en' ? 
                  'Experiment, make mistakes, and enjoy the creative process!' :
                  '實驗、犯錯誤同享受創作過程！'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlanLearning; 