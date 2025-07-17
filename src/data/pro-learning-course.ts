import { ProLearningCourse, QuickTip, VideoTemplate } from '../features/course/types';

// AI Creation Beginner Course Data
export const aiCreationBeginnerCourse: ProLearningCourse = {
  id: 'ai-creation-basics',
  title: 'AI Creation for Complete Beginners',
  titleCht: 'AI創作完全初學者指南',
  subtitle: 'From Zero to Hero in 4 Easy Parts',
  subtitleCht: '4個簡單部分從零到英雄',
  
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

  getPartContent: (partNumber: number) => {
    const contents = [
      // Part 1 Content
      {
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

### ❌ 錯誤4：無指定風格
**問題：** 淨係描述主題
**解決方案：** 永遠添加風格（攝影、卡通等）

## 你嘅第一個作業！

試為呢啲情景創建提示：
1. 你嘅LinkedIn**商業頭像**
2. 你最鍾意嗜好嘅**標誌**
3. 關於咖啡嘅**社交媒體帖子**
4. 你想賣嘅嘢嘅**產品相片**

記住：從簡單開始，然後添加細節！

## 初學者專業貼士：
- 🎯 **從一個主要主題開始**
- 🎨 **永遠指定風格**
- 📸 **想像你在指導攝影師**
- 🔄 **試小變化睇咩有效**
- 💡 **保存成功提示供日後使用**

**準備創造你嘅第一個傑作？我哋去！🚀**
        `
      },
      // Part 3 Content - Simplified for space
      {
        content: `
# 🚀 Level Up Your Skills - Professional Techniques

## 🎯 Using ChatGPT as Your AI Prompt Assistant

### The Game-Changer Strategy:
Instead of struggling to write prompts yourself, let ChatGPT help you!

### How to Use ChatGPT for Better Prompts:

#### 📝 Simple Template:
"Create a detailed Midjourney prompt for [what you want]. Include style, mood, lighting, and technical details."

#### 🌟 Examples:

**You:** "Create a detailed Midjourney prompt for a professional business headshot"

**ChatGPT Response:**
"Professional corporate headshot, confident business executive in navy blue suit, warm genuine smile, modern office background with soft bokeh, natural lighting from large window, shot with 85mm lens, shallow depth of field, corporate photography style, clean and polished look --ar 2:3 --v 6"

**You:** "Create a Midjourney prompt for a cozy coffee shop social media post"

**ChatGPT Response:**
"Cozy coffee shop interior, steaming latte with beautiful latte art, rustic wooden table, warm ambient lighting, Instagram-worthy food photography, hygge aesthetic, soft natural light, overhead shot, coffee lifestyle, inviting atmosphere --ar 1:1 --v 6"

## 🎨 Advanced Style Techniques

### Photography Styles:
- **Portrait Photography:** "professional portrait, studio lighting, 85mm lens"
- **Street Photography:** "candid street photography, natural lighting, documentary style"
- **Product Photography:** "clean product shot, white background, professional lighting"
- **Landscape Photography:** "landscape photography, golden hour, wide angle"

### Artistic Styles:
- **Digital Art:** "digital art, concept art style, detailed illustration"
- **Watercolor:** "watercolor painting, soft brush strokes, artistic style"
- **Oil Painting:** "oil painting, classical art style, rich textures"
- **Minimalist:** "minimalist design, clean lines, simple composition"

## 📱 Creating Video Content (Yes, AI Can Do This Too!)

### Video Prompt Structure:
**Subject + Action + Style + Technical Parameters**

### Video Examples:

#### Business Video:
"Professional businessman walking confidently through modern office, slow motion, cinematic lighting, corporate video style, professional setting --video"

#### Product Demo:
"Smartphone rotating on marble surface, studio lighting, product showcase, clean background, commercial video style --video"

#### Creative Content:
"Abstract geometric shapes morphing and transforming, vibrant colors, motion graphics style, modern aesthetic --video"

## 💡 Pro Tips for Advanced Results:

### 1. Layer Your Descriptions:
Instead of: "beautiful woman"
Use: "elegant woman, natural beauty, soft features, warm smile, golden hour lighting, portrait photography style"

### 2. Control Your Composition:
- **Close-up:** "close-up shot, detailed view"
- **Wide shot:** "wide angle, environmental shot"
- **Medium shot:** "medium shot, balanced composition"

### 3. Master Technical Parameters:
- **--ar 16:9** (landscape)
- **--ar 9:16** (portrait/phone)
- **--ar 1:1** (square/Instagram)
- **--v 6** (latest version)
- **--quality 2** (higher quality)

### 4. Use Professional Keywords:
- **For Business:** "corporate, professional, clean, modern, trustworthy"
- **For Creative:** "artistic, expressive, vibrant, unique, innovative"
- **For Social Media:** "engaging, shareable, trendy, lifestyle, authentic"

## 🎬 Video Creation Workflow:

1. **Plan Your Concept:** What story do you want to tell?
2. **Write Your Prompt:** Use the structure above
3. **Add Technical Details:** Specify aspect ratio and quality
4. **Review and Refine:** Make small adjustments for better results
5. **Export and Use:** Perfect for social media, presentations, marketing

## Your Advanced Assignment:

Try creating these advanced prompts:
1. **A promotional video** for your business
2. **An artistic portrait** in a specific painting style
3. **A product showcase** for e-commerce
4. **A social media story** template

**Ready to become a Pro? Let's master the secret keywords next! 🎨**
        `,
        contentCht: `
# 🚀 提升你嘅技能 - 專業技巧

## 🎯 用ChatGPT做你嘅AI提示助手

### 改變遊戲規則嘅策略：
唔好自己辛苦寫提示，等ChatGPT幫你！

### 點樣用ChatGPT寫更好提示：

#### 📝 簡單模板：
"為[你想要嘅嘢]創建詳細Midjourney提示。包括風格、情調、燈光同技術細節。"

#### 🌟 例子：

**你：** "為專業商業頭像創建詳細Midjourney提示"

**ChatGPT回應：**
"專業企業頭像，穿海軍藍西裝嘅自信商業行政人員，溫暖真誠微笑，現代辦公室背景配柔和散景，來自大窗戶嘅自然燈光，用85mm鏡頭拍攝，淺景深，企業攝影風格，乾淨優雅外觀 --ar 2:3 --v 6"

**你：** "為舒適咖啡店社交媒體帖子創建Midjourney提示"

**ChatGPT回應：**
"舒適咖啡店室內，有美麗拉花藝術嘅熱騰騰拿鐵，質樸木桌，溫暖環境燈光，Instagram值得嘅食物攝影，hygge美學，柔和自然光，俯視角度，咖啡生活方式，吸引人氛圍 --ar 1:1 --v 6"

## 🎨 高級風格技巧

### 攝影風格：
- **肖像攝影：** "專業肖像，工作室燈光，85mm鏡頭"
- **街頭攝影：** "真實街頭攝影，自然燈光，紀錄片風格"
- **產品攝影：** "乾淨產品拍攝，白色背景，專業燈光"
- **風景攝影：** "風景攝影，黃金時間，廣角"

### 藝術風格：
- **數字藝術：** "數字藝術，概念藝術風格，詳細插圖"
- **水彩：** "水彩畫，柔軟筆觸，藝術風格"
- **油畫：** "油畫，古典藝術風格，豐富質感"
- **極簡：** "極簡設計，乾淨線條，簡單構圖"

## 📱 創造影片內容（係，AI都做得到！）

### 影片提示結構：
**主題 + 動作 + 風格 + 技術參數**

### 影片例子：

#### 商業影片：
"專業商人自信咁行過現代辦公室，慢鏡頭，電影燈光，企業影片風格，專業環境 --video"

#### 產品演示：
"智能手機在大理石表面旋轉，工作室燈光，產品展示，乾淨背景，商業影片風格 --video"

#### 創意內容：
"抽象幾何形狀變形同變換，鮮豔色彩，動態圖形風格，現代美學 --video"

## 💡 高級結果專業貼士：

### 1. 分層描述：
唔好用："靚女"
用："優雅女性，自然美，柔和特徵，溫暖微笑，黃金時間燈光，肖像攝影風格"

### 2. 控制你嘅構圖：
- **特寫：** "特寫鏡頭，詳細視圖"
- **廣角鏡頭：** "廣角，環境鏡頭"
- **中景：** "中景，平衡構圖"

### 3. 掌握技術參數：
- **--ar 16:9** （橫向）
- **--ar 9:16** （直向/手機）
- **--ar 1:1** （正方形/Instagram）
- **--v 6** （最新版本）
- **--quality 2** （更高質量）

### 4. 使用專業關鍵詞：
- **商業用：** "企業，專業，乾淨，現代，值得信賴"
- **創意用：** "藝術，表達，充滿活力，獨特，創新"
- **社交媒體用：** "吸引，可分享，潮流，生活方式，真實"

## 🎬 影片創作工作流程：

1. **計劃你嘅概念：** 你想講咩故事？
2. **寫你嘅提示：** 用上面嘅結構
3. **添加技術細節：** 指定寬高比同質量
4. **檢查同改進：** 為更好結果做小調整
5. **導出同使用：** 完美適合社交媒體、演示、營銷

## 你嘅高級作業：

試創建呢啲高級提示：
1. 你生意嘅**宣傳影片**
2. 特定繪畫風格嘅**藝術肖像**
3. 電商嘅**產品展示**
4. **社交媒體故事**模板

**準備成為專業人士？我哋下一步掌握秘密關鍵詞！🎨**
        `
      },
      // Part 4 Content - Very simplified due to length
      {
        content: `
# 🎨 Midjourney Secret Keywords & Prompts Master Guide

## 📸 Photography Style Keywords

### Portrait Photography:
- **Professional:** "corporate headshot, LinkedIn profile, business portrait"
- **Creative:** "artistic portrait, dramatic lighting, fashion photography"
- **Lifestyle:** "candid portrait, natural lighting, lifestyle photography"

### Technical Photography Terms:
- **Camera Settings:** "shot with 85mm lens, shallow depth of field, bokeh"
- **Lighting:** "studio lighting, natural light, golden hour, soft lighting"
- **Quality:** "high resolution, sharp focus, professional quality"

## 🎨 Art Style Keywords

### Traditional Art:
- **Oil Painting:** "oil painting, classical art, Renaissance style"
- **Watercolor:** "watercolor, soft brush strokes, artistic"
- **Sketch:** "pencil sketch, hand-drawn, artistic drawing"

### Digital Art:
- **Concept Art:** "concept art, digital painting, game art"
- **3D Rendering:** "3D render, CGI, digital art"
- **Vector:** "vector art, flat design, geometric"

## 🌈 Color Palette Keywords

### Professional Colors:
- **Corporate:** "navy blue, charcoal gray, professional colors"
- **Tech:** "blue and white, modern palette, clean colors"
- **Creative:** "vibrant colors, rainbow palette, colorful"

### Mood Colors:
- **Warm:** "warm tones, golden palette, sunset colors"
- **Cool:** "cool tones, blue palette, winter colors"
- **Monochrome:** "black and white, grayscale, minimal colors"

## 📐 Composition & Angle Keywords

### Camera Angles:
- **Close-up:** "close-up shot, macro, detailed view"
- **Wide:** "wide shot, full body, environmental"
- **Bird's Eye:** "overhead view, top-down, aerial view"

### Composition Rules:
- **Rule of Thirds:** "rule of thirds, balanced composition"
- **Symmetry:** "symmetrical, centered, balanced"
- **Leading Lines:** "leading lines, perspective, depth"

## 🎭 Mood & Atmosphere Keywords

### Professional Moods:
- **Confident:** "confident, professional, trustworthy"
- **Approachable:** "friendly, welcoming, warm"
- **Innovative:** "cutting-edge, modern, forward-thinking"

### Creative Moods:
- **Mysterious:** "mysterious, dark, atmospheric"
- **Joyful:** "happy, cheerful, uplifting"
- **Dramatic:** "dramatic, intense, powerful"

## 🎬 Video Prompt Keywords

### Movement Types:
- **Smooth:** "smooth movement, flowing, graceful"
- **Dynamic:** "dynamic movement, energetic, action"
- **Slow Motion:** "slow motion, cinematic, dramatic"

### Video Styles:
- **Corporate:** "corporate video, professional, clean"
- **Lifestyle:** "lifestyle video, casual, authentic"
- **Artistic:** "artistic video, creative, expressive"

## 🔮 Advanced Prompting Techniques

### Negative Prompting:
Use `--no` to exclude unwanted elements:
- "--no text, no watermark, no logos"
- "--no blurry, no low quality"
- "--no hands, no feet" (if they're problematic)

### Weight Control:
Use `::` to emphasize importance:
- "professional businessman::2 modern office::1"
- "vibrant colors::3 minimal background::1"

### Style Mixing:
Combine different styles:
- "photography + digital art style"
- "realistic + cartoon elements"
- "modern + vintage aesthetic"

## 📚 Practical Prompt Templates

### Business Template:
"[Subject] professional [occupation], [clothing], [expression], [setting], [lighting style], corporate photography, [technical specs] --ar 2:3 --v 6"

### Social Media Template:
"[Subject] [action/pose], [style aesthetic], [lighting], Instagram-worthy, [mood], lifestyle photography --ar 1:1 --v 6"

### Product Template:
"[Product] on [surface], [lighting setup], product photography, commercial quality, [background], clean composition --ar 16:9 --v 6"

### Creative Template:
"[Subject] in [artistic style], [color palette], [mood/atmosphere], [artistic technique], creative composition --ar [ratio] --v 6"

## 🎯 Secret Keyword Combinations

### For Maximum Impact:
1. **Subject + Style + Mood + Technical**
2. **Always include lighting type**
3. **Specify aspect ratio for intended use**
4. **Add version parameter (--v 6)**
5. **Use negative prompts to avoid issues**

### Pro Formula:
"[Main Subject], [Style/Genre], [Mood/Emotion], [Lighting], [Technical Quality], [Composition] --ar [ratio] --v 6 --no [unwanted elements]"

## 🚀 Your Mastery Challenge:

Create professional prompts for:
1. **Business headshot** using portrait keywords
2. **Product showcase** using commercial keywords  
3. **Social media content** using lifestyle keywords
4. **Creative artwork** using artistic keywords
5. **Video content** using motion keywords

**Congratulations! You're now a Midjourney keyword master! 🎉**

Remember: Practice makes perfect. Experiment with these keywords and find your unique style!
        `,
        contentCht: `
# 🎨 Midjourney秘密關鍵詞同提示大全

## 📸 攝影風格關鍵詞

### 肖像攝影：
- **專業：** "企業頭像，LinkedIn檔案，商業肖像"
- **創意：** "藝術肖像，戲劇燈光，時尚攝影"
- **生活方式：** "真實肖像，自然燈光，生活方式攝影"

### 技術攝影術語：
- **相機設置：** "用85mm鏡頭拍攝，淺景深，散景"
- **燈光：** "工作室燈光，自然光，黃金時間，柔和燈光"
- **質量：** "高分辨率，銳利焦點，專業質量"

## 🎨 藝術風格關鍵詞

### 傳統藝術：
- **油畫：** "油畫，古典藝術，文藝復興風格"
- **水彩：** "水彩，柔軟筆觸，藝術"
- **素描：** "鉛筆素描，手繪，藝術繪畫"

### 數字藝術：
- **概念藝術：** "概念藝術，數字繪畫，遊戲藝術"
- **3D渲染：** "3D渲染，CGI，數字藝術"
- **向量：** "向量藝術，平面設計，幾何"

## 🌈 顏色調色板關鍵詞

### 專業顏色：
- **企業：** "海軍藍，炭灰色，專業顏色"
- **科技：** "藍色同白色，現代調色板，乾淨顏色"
- **創意：** "鮮豔顏色，彩虹調色板，豐富多彩"

### 情調顏色：
- **暖色：** "暖色調，金色調色板，日落顏色"
- **冷色：** "冷色調，藍色調色板，冬天顏色"
- **單色：** "黑白，灰度，最少顏色"

## 📐 構圖同角度關鍵詞

### 相機角度：
- **特寫：** "特寫鏡頭，微距，詳細視圖"
- **廣角：** "廣角鏡頭，全身，環境"
- **鳥瞰：** "俯視角度，俯視，航拍視圖"

### 構圖規則：
- **三分法：** "三分法，平衡構圖"
- **對稱：** "對稱，居中，平衡"
- **引導線：** "引導線，透視，深度"

## 🎭 情緒同氛圍關鍵詞

### 專業情緒：
- **自信：** "自信，專業，值得信賴"
- **平易近人：** "友善，歡迎，溫暖"
- **創新：** "尖端，現代，前瞻性"

### 創意情緒：
- **神秘：** "神秘，黑暗，大氣"
- **歡樂：** "快樂，開朗，振奮"
- **戲劇性：** "戲劇性，強烈，強大"

## 🎬 視頻提示關鍵詞

### 動作類型：
- **流暢：** "流暢動作，流動，優雅"
- **動態：** "動態動作，精力充沛，行動"
- **慢鏡頭：** "慢鏡頭，電影，戲劇性"

### 視頻風格：
- **企業：** "企業視頻，專業，乾淨"
- **生活方式：** "生活方式視頻，休閒，真實"
- **藝術：** "藝術視頻，創意，表達"

## 🔮 高級提示技巧

### 負面提示：
用`--no`排除唔想要嘅元素：
- "--no 文字，no 水印，no 標誌"
- "--no 模糊，no 低質量"
- "--no 手，no 腳"（如果佢哋有問題）

### 權重控制：
用`::`強調重要性：
- "專業商人::2 現代辦公室::1"
- "鮮豔顏色::3 極簡背景::1"

### 風格混合：
結合不同風格：
- "攝影 + 數字藝術風格"
- "逼真 + 卡通元素"
- "現代 + 復古美學"

## 📚 實用提示模板

### 商業模板：
"[主題] 專業 [職業]，[服裝]，[表情]，[設置]，[燈光風格]，企業攝影，[技術規格] --ar 2:3 --v 6"

### 社交媒體模板：
"[主題] [動作/姿勢]，[風格美學]，[燈光]，Instagram值得，[情調]，生活方式攝影 --ar 1:1 --v 6"

### 產品模板：
"[產品] 在 [表面]，[燈光設置]，產品攝影，商業質量，[背景]，乾淨構圖 --ar 16:9 --v 6"

### 創意模板：
"[主題] 在 [藝術風格]，[顏色調色板]，[情調/氛圍]，[藝術技巧]，創意構圖 --ar [比例] --v 6"

## 🎯 秘密關鍵詞組合

### 為最大影響：
1. **主題 + 風格 + 情調 + 技術**
2. **永遠包括燈光類型**
3. **為預期用途指定寬高比**
4. **添加版本參數（--v 6）**
5. **用負面提示避免問題**

### 專業公式：
"[主要主題]，[風格/類型]，[情調/情感]，[燈光]，[技術質量]，[構圖] --ar [比例] --v 6 --no [唔想要嘅元素]"

## 🚀 你嘅掌握挑戰：

為以下創建專業提示：
1. 用肖像關鍵詞嘅**商業頭像**
2. 用商業關鍵詞嘅**產品展示**
3. 用生活方式關鍵詞嘅**社交媒體內容**
4. 用藝術關鍵詞嘅**創意藝術品**
5. 用動作關鍵詞嘅**視頻內容**

**恭喜！你而家係Midjourney關鍵詞大師！🎉**

記住：熟能生巧。用呢啲關鍵詞實驗同搵到你獨特風格！
        `
      }
    ];
    
    return contents[partNumber - 1] || contents[0];
  }
};

// Quick Tips Data
export const quickTips: QuickTip[] = [
  {
    icon: '🎯',
    title: 'Start Simple',
    titleCht: '從簡單開始',
    description: 'Don\'t try to create complex images on day 1. Master the basics first!',
    descriptionCht: '唔好第一日就試創造複雜圖像。先掌握基礎！',
    color: 'bg-green-500/20 border-green-500/30 text-green-400'
  },
  {
    icon: '💡',
    title: 'Practice Daily',
    titleCht: '每日練習',
    description: 'Spend 15-30 minutes daily. Consistency beats intensity!',
    descriptionCht: '每日花15-30分鐘。持續勝過強度！',
    color: 'bg-blue-500/20 border-blue-500/30 text-blue-400'
  },
  {
    icon: '🚀',
    title: 'Have Fun!',
    titleCht: '享受樂趣！',
    description: 'Experiment, make mistakes, and enjoy the creative process!',
    descriptionCht: '實驗、犯錯誤同享受創作過程！',
    color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
  }
];

// Video Templates Data (simplified sample)
export const videoTemplates: VideoTemplate[] = [
  {
    id: 'cyberpunk',
    sectionName: '### 🔥 視頻生成模板1：賽博朋克街頭',
    title: '🔥 Video Generation Template 1: Cyberpunk Streets',
    imageUrl: 'https://cdn.midjourney.com/8aca4b16-1777-4cfa-bf0b-2e580dfc0a19/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/edb4f881-28bc-43c2-94f1-de33c099966a/3.mp4',
    imageAlt: 'Cyberpunk Streets Example',
    videoAlt: 'Cyberpunk Streets Video Example'
  },
  {
    id: 'magical',
    sectionName: '### ⚡ 視頻生成模板2：魔法森林',
    title: '⚡ Video Generation Template 2: Magical Forest',
    imageUrl: 'https://cdn.midjourney.com/1096de2a-d098-48d0-9d67-dc6eb34fa506/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/525dfefd-45be-4c83-96e9-aaf2c992cee4/1.mp4',
    imageAlt: 'Magical Forest Example',
    videoAlt: 'Magical Forest Video Example'
  },
  {
    id: 'underwater',
    sectionName: '### 🌊 視頻生成模板3：水下奇幻',
    title: '🌊 Video Generation Template 3: Underwater Fantasy',
    imageUrl: 'https://cdn.midjourney.com/e6dbb98b-6e05-40e7-8df8-fe10d8c5f9fa/0_1.png',
    videoUrl: 'https://cdn.midjourney.com/video/878b9a50-1af9-4231-ba5c-85b2b60a33ef/3.mp4',
    imageAlt: 'Underwater Fantasy Example',
    videoAlt: 'Underwater Fantasy Video Example'
  },
  {
    id: 'space',
    sectionName: '### 🚀 視頻生成模板4：太空探索',
    title: '🚀 Video Generation Template 4: Space Exploration',
    imageUrl: 'https://cdn.midjourney.com/1e964ccd-561d-4184-9989-01e7e00b5ea9/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/ca6eccee-3e34-4491-ab46-19c980c724bc/0.mp4',
    imageAlt: 'Space Exploration Example',
    videoAlt: 'Space Exploration Video Example'
  },
  {
    id: 'fashion',
    sectionName: '### 🎭 視頻生成模板5：時尚大片',
    title: '🎭 Video Generation Template 5: High Fashion',
    imageUrl: 'https://cdn.midjourney.com/507f8008-822f-4da3-8194-6965964e0bd4/0_0.png',
    videoUrl: 'https://cdn.midjourney.com/video/a1f878a0-52b0-4be4-83d5-227f3bf378f3/2.mp4',
    imageAlt: 'High Fashion Example',
    videoAlt: 'High Fashion Video Example'
  }
]; 