export interface CourseLesson {
  id: number;
  title: string;
  titleCht: string;
  duration: string;
  durationCht: string;
  description: string;
  descriptionCht: string;
  videoUrl?: string;
  downloadUrl?: string;
  isLocked: boolean;
  textContent?: string;
  textContentCht?: string;
}

export interface CourseModule {
  id: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  lessons: CourseLesson[];
}

export interface CourseDetail {
  id: string;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  difficultyCht: string;
  instructor: string;
  instructorCht: string;
  totalDuration: string;
  totalDurationCht: string;
  language: string[];
  languageCht: string[];
  requirements: string[];
  requirementsCht: string[];
  learningOutcomes: string[];
  learningOutcomesCht: string[];
  freeModules: CourseModule[];
  proModules: CourseModule[];
  freeBonuses: string[];
  freeBonusesCht: string[];
  proBonuses: string[];
  proBonusesCht: string[];
  freePrice: string;
  proPrice: string;
  originalPrice: string;
  savings: string;
  enrollmentCount: number;
  rating: number;
  reviews: number;
}

// AI Image & Video Creation Course Details
export const aiImageVideoCreationCourse: CourseDetail = {
  id: 'ai-image-video-creation',
  title: 'AI Image & Video Creation Mastery',
  titleCht: 'AI圖像影片創作精通課程',
  description: 'Master the art of AI-powered visual content creation for creative expression. Learn industry-leading tools and artistic techniques.',
  descriptionCht: '精通AI驅動嘅視覺內容創作，用於創意表達。學習業界領先嘅工具同藝術技巧。',
  category: 'Creative Design',
  difficulty: 'Beginner',
  difficultyCht: '新手級',
  instructor: 'AI Formula Team',
  instructorCht: 'AI Formula 團隊',
  totalDuration: '8+ hours of content',
  totalDurationCht: '8小時以上內容',
  language: ['English', 'Cantonese'],
  languageCht: ['英文', '廣東話'],
  requirements: [
    'Basic computer skills',
    'Internet connection',
    'No prior AI experience needed'
  ],
  requirementsCht: [
    '基本電腦技能',
    '互聯網連接',
    '無需AI經驗'
  ],
  learningOutcomes: [
    'Create professional AI-generated images',
    'Master Midjourney prompt engineering',
    'Understand artistic styles and techniques',
    'Develop your creative visual skills'
  ],
  learningOutcomesCht: [
    '創作專業AI生成圖像',
    '精通Midjourney提示工程',
    '了解藝術風格同技巧',
    '發展你嘅創意視覺技能'
  ],
  freeModules: [
    {
      id: 1,
      title: 'Getting Started with AI Image Generation',
      titleCht: 'AI圖像生成入門',
      description: 'Introduction to AI image generation and basic concepts',
      descriptionCht: 'AI圖像生成介紹同基本概念',
      lessons: [
        {
          id: 1,
          title: 'What is AI Image Generation?',
          titleCht: '什麼係AI圖像生成？',
          duration: '15 min',
          durationCht: '15分鐘',
          description: 'Understanding the fundamentals of AI image creation',
          descriptionCht: '了解AI圖像創作嘅基礎知識',
          videoUrl: '/videos/ai-intro.mp4',
          isLocked: false,
          textContent: `# What is AI Image Generation?

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
          textContentCht: `# 什麼係AI圖像生成？

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
        },
        {
          id: 2,
          title: 'Setting Up Your Midjourney Account',
          titleCht: '設置你嘅Midjourney帳戶',
          duration: '10 min',
          durationCht: '10分鐘',
          description: 'Step-by-step account setup and Discord integration',
          descriptionCht: '逐步帳戶設置同Discord整合',
          videoUrl: '/videos/midjourney-setup.mp4',
          isLocked: false,
          textContent: `# Setting Up Your Midjourney Account

## 🚀 Why Midjourney?

You no longer need to be a talented artist to create engaging images. With just a few prompts, you can create compelling works in minutes. The secret lies in Midjourney.

Midjourney harnesses the creativity of generative AI to do most of the heavy lifting. Your job is simply to pass it a small piece of text describing the type of image you want, and it automatically generates the image you want.

Although Midjourney was a late developer, it has taken the generative AI field by storm. It has joined the ranks of some of the top AI systems like DALL-E and Stable Diffusion.

## 🔧 How to Get Started with Midjourney in 4 Simple Steps

### Step #1: Sign Up Using Google or Discord
You can sign up for Midjourney using your Google or Discord account. Whichever you choose, head to the **Midjourney website** to register for an account.

If you want to use your Discord account (or sign up to create a free account), you can access the Midjourney Bot from anywhere you can use Discord (e.g., web, mobile, desktop app).

### Step #2: Use Discord or Web Interface
Once Discord is up and running, you can go to the **Midjourney website** and choose "Sign In", or click the **Discord invite link** to go directly. The next page will invite you to join the Midjourney Discord channel. After accepting the invitation, you'll get access to the Midjourney server. You may need to verify your account before you can start using Midjourney.

### Step #3: Choose Your Midjourney Membership Plan
If you want to use the tool through the **Midjourney website**, make sure you're signed in with your new account. Then, go to the account page in the bottom left corner and select "Subscribe".

**Midjourney has four subscription tiers. Each tier allows you to:**
- Access the Midjourney member gallery
- Official Discord server access
- View general commercial terms of use
- And more features depending on your plan

See the **Midjourney documentation** for a complete list of pricing plans.

To subscribe to a plan, you can also use the **/subscribe** command in one of the Discord newbie rooms (like #newbies-29) to generate a personal link to the subscription page.

### Step #4: Start Generating Images

**On the web interface:**
- Use the **Imagine Bar** to enter prompts from anywhere
- Once they start creating, you can see them on the "Create" tab
- You can also add variants to images after they finish creating

**On Discord:**
- Go to one of the "newbie" bot channels
- Type **/imagine** followed by whatever you want to create
- Paid users can send messages containing prompts directly to the Midjourney Discord bot

**Note:** These prompts may still be publicly displayed in the member gallery. If you want to generate private images (stealth image generation), you must subscribe to a Pro or Mega plan.

**Important:** Due to multiple requests being posted simultaneously, newbie channels can quickly become overwhelming.

## 🎨 How to Generate Your First Midjourney Image

To generate your first image, you can use the "Imagine" bar on the Discord web interface, or visit one of the newbie channels on the Midjourney Discord server. These channels usually start with "#newbies-" followed by a number. Don't worry about which channel to choose - there's really no difference between them.

**Two Ways to Generate:**

**Method 1: Web Interface (Recommended)**
1. Simply enter what you want to appear in the "Imagine" bar
2. Midjourney will start generating your work in the "Create" tab

**Method 2: Discord Commands**
1. Type "/" then "imagine"
2. Enter the prompt you want Midjourney to create
3. Press Enter to submit

**Generation Time:** It takes about a minute to generate a response, but once generated, the Midjourney bot will present four different images based on your prompt by default.

**Note:** Except for some brief promotional activities, Midjourney no longer offers free usage. If you want to send prompts, you must subscribe to a paid plan.

## ✨ Editing and Refining Your Midjourney Images

After Midjourney generates images, the bot returns some prompts for you to edit and optimize your images:

### Change Settings
The menu buttons on the image row can be used to set various parameters for browser prompts. You can adjust various fields such as style, diversity, and generation speed.

### Use Images
If you're using the browser version, you can use existing images in prompts. Essentially, these images become style references for the prompt.

### U Buttons (Upscale)
On Discord, these range from U1 to U4. We use U buttons to upscale images, generating larger versions of selected images with more detail.

### V Buttons (Variations)
These also range from V1 to V4. You can use V buttons to make subtle modifications to selected grid images. New image grids created as modifications will be based on the overall appearance and composition of the selected image.

### 🔄 (Re-roll)
You can also re-run the job, which will re-run the original prompt and generate a new image grid.

## 🎯 How to Improve Your Midjourney Prompts

When using Discord, parameter options added to prompts change how images are generated. Parameters can change the aspect ratio of images, Midjourney model versions, upscalers used, and many other parameters.

**Parameters are always added to the end of the prompt.** You can add multiple parameters to each prompt.

### Essential Parameters:
- **--ar 16:9** (landscape aspect ratio)
- **--ar 1:1** (square aspect ratio)  
- **--ar 9:16** (vertical aspect ratio)
- **--v 6** (latest Midjourney version)
- **--q 2** (high quality)

### Pro Tips for Better Results:
1. **Be Specific** - Detailed descriptions work better
2. **Use Style Keywords** - "photorealistic", "digital art", "watercolor"
3. **Add Mood Words** - "dramatic", "peaceful", "vibrant"
4. **Include Technical Terms** - "shot with Canon 5D", "85mm lens"
5. **Experiment** - Try different combinations and learn what works

**Perfect First Prompt Example:**
"A serene mountain lake at sunrise, landscape photography style, golden hour lighting, misty atmosphere, high quality --ar 16:9 --v 6"

Your journey into AI image creation starts here! Remember, practice makes perfect, so don't be afraid to experiment and try new ideas.`,
          textContentCht: `# 設置你嘅Midjourney帳戶

## 🚀 點解選擇Midjourney？

你不再需要成為有才華的藝術家才能創造出引人入勝的圖像。只需幾個提示，幾分鐘內就能創作出引人入勝的作品。秘訣就在於Midjourney。

Midjourney利用生成式人工智慧的創造力來完成大部分繁重的工作。你的工作只是向它傳遞一小段文字來描述你想要的圖像類型，它就會自動產生你想要的圖像。

儘管Midjourney的發展較晚，但它已席捲了生成式人工智慧領域。它已躋身於DALL-E和Stable Diffusion等一些頂尖人工智慧系統之列。

## 🔧 通過4個簡單步驟開始使用Midjourney

### 第1步：使用Google或Discord註冊
你可以使用Google或Discord帳號註冊Midjourney。無論你選擇哪種方式，都可以前往**Midjourney網站**註冊帳戶。

如果你想使用你的Discord帳戶（或註冊建立免費帳戶），你可以從任何可以使用Discord的地方（例如，網路、行動裝置、桌面應用程式）存取Midjourney Bot。

### 第2步：使用Discord或Web介面
啟動並執行Discord後，你可以前往**Midjourney網站**並選擇"登入"，或點擊**Discord邀請連結**直接進入。下一頁將邀請你加入Midjourney Discord頻道。接受邀請後，你將獲得Midjourney伺服器的存取權限。在開始使用Midjourney之前，你可能需要驗證你的帳戶。

### 第3步：選擇你嘅Midjourney會員計劃
如果你想透過**Midjourney網站**使用該工具，請確保你已使用新帳戶登入。然後，前往左下角的帳戶頁面，選擇「訂閱」。

**Midjourney有四個訂閱等級。每個等級都允許你：**
- 存取Midjourney會員圖庫
- 官方Discord伺服器存取權
- 查看一般商業使用條款
- 根據你的計劃提供更多功能

請參閱**Midjourney文檔**，以了解完整的價格計劃清單。

要訂閱某個計劃，你還可以使用**/subscribe** Discord新人房間之一（例如#newbies-29）中的命令來產生指向訂閱頁面的個人連結。

### 第4步：開始生成圖像

**在網頁介面上：**
- 你可以使用**Imagine Bar**從任何地方輸入提示
- 一旦他們開始創作，你就可以在"創建"選項卡上看到它們
- 你還可以在圖像創作完成後為其添加變體

**在Discord上：**
- 你可以前往其中一個「新手」機器人頻道
- 輸入**/imagine**然後輸入你想要創建的任何內容
- 付費用戶可以將包含提示的訊息直接傳送給Midjourney Discord機器人

**注意：** 這些提示可能仍會公開顯示在會員圖庫中。如果你想產生私密圖片（即隱身圖片生成），則必須訂閱Pro或Mega套餐。

**重要：** 由於新手頻道同時發布多個請求，因此新手頻道很快就會變得難以承受。

## 🎨 如何產生你嘅第一張Midjourney影像

要產生你的第一張圖片，你可以使用Discord網頁介面上的「想像」欄，也可以造訪Midjourney Discord伺服器中的某個新人頻道。這些頻道通常以「#newbies-」開頭，後面跟著一個數字。不用糾結要選哪個頻道──它們之間其實沒什麼兩樣。

**兩種生成方式：**

**方法1：網頁介面（推薦）**
1. 只需在「想像」欄中輸入想要顯示的內容
2. Midjourney就會在「建立」標籤中開始產生你的作品

**方法2：Discord指令**
1. 輸入"/"，然後輸入"imagine"
2. 輸入你希望Midjourney建立的提示
3. 按Enter提交

**生成時間：** 產生回應大約需要一分鐘，但產生回應後，Midjourney機器人將預設根據你的提示呈現四張不同的影像。

**注意：** 除一些短暫的促銷活動外，Midjourney不再提供免費使用。如果你想發送提示，則必須訂閱付費方案。

## ✨ 編輯並完善你嘅Midjourney圖像

Midjourney生成完圖片後，機器人會回傳一些提示，供你編輯和優化圖片：

### 更改設定
圖片列上的選單按鈕可用於設定瀏覽器提示的各種參數。你可以調整各種字段，例如樣式、多樣性和生成速度。

### 使用影像
如果你使用的是瀏覽器版本，則可以在提示中使用現有圖片。本質上，這些圖片將成為提示的樣式參考。

### U型按鈕（放大）
在Discord上，這些等級從U1到U4。我們使用U按鈕來放大影像，從而產生所選影像的更大版本並包含更多細節。

### V鈕（變化）
這些等級也從V1到V4。你可以使用V按鈕對所選網格影像進行細微的修改。作為修改而創建的新圖片網格將以所選圖像的整體外觀和構圖為藍本。

### 🔄（重擲）
你也可以重新執行該作業，它將重新執行原始提示並產生新的影像網格。

## 🎯 如何改進你嘅Midjourney提示

使用Discord時，新增至提示中的參數選項會改變影像的產生方式。參數可以改變影像的寬高比、Midjourney模型版本、所使用的升頻器以及許多其他參數。

**參數始終添加到提示的末尾。** 你可以為每個提示新增多個參數。

### 基本參數：
- **--ar 16:9** （橫向寬高比）
- **--ar 1:1** （正方形寬高比）
- **--ar 9:16** （垂直寬高比）
- **--v 6** （最新Midjourney版本）
- **--q 2** （高質量）

### 獲得更好結果嘅專業貼士：
1. **具體描述** - 詳細描述效果更好
2. **使用風格關鍵詞** - "照片寫實"、"數字藝術"、"水彩"
3. **添加情調詞語** - "戲劇性"、"寧靜"、"充滿活力"
4. **包含技術術語** - "用Canon 5D拍攝"、"85mm鏡頭"
5. **實驗** - 嘗試不同組合，學習有效方法

**完美第一個提示例子：**
"日出時寧靜嘅山湖，風景攝影風格，黃金時段燈光，霧濛濛氣氛，高質量 --ar 16:9 --v 6"

你嘅AI圖像創作之旅從這裡開始！記住，熟能生巧，所以不要害怕實驗和嘗試新想法。`
        },
        {
          id: 3,
          title: 'Your First AI Image',
          titleCht: '你嘅第一張AI圖像',
          duration: '20 min',
          durationCht: '20分鐘',
          description: 'Create your first image using simple prompts',
          descriptionCht: '用簡單提示創作你嘅第一張圖像',
          videoUrl: '/videos/first-image.mp4',
          isLocked: false,
          textContent: `# Your First AI Image

Now that you have your Midjourney account set up, let's create your first stunning AI-generated image! This lesson will guide you through the entire process step by step using the modern web interface.

## Understanding Prompt Structure

A successful Midjourney prompt follows this proven structure:
**Subject + Style + Setting + Details = Amazing Results**

### Example Breakdown:
- **Subject**: "a majestic lion"
- **Style**: "digital art"
- **Setting**: "in an African savanna"
- **Details**: "golden hour lighting, photorealistic"

**Complete Prompt**: "a majestic lion, digital art, in an African savanna, golden hour lighting, photorealistic"

## Step-by-Step Creation Tutorial

### Step 1: Access Your Creation Workspace  
1. Log into your Midjourney account at **midjourney.com**
2. Click on the **"Create"** tab in your dashboard
3. You'll see a clean, intuitive prompt input interface
4. The workspace is designed for seamless creativity

### Step 2: Enter Your First Prompt
1. In the prompt input box, start typing your description
2. The interface provides helpful suggestions as you type
3. No need for special commands - just natural language

### Step 3: Craft Your First Prompt
Let's start with something simple and beautiful:
"a cute cat sitting on a windowsill, watercolor painting style, soft natural lighting"

### Step 4: Configure Your Settings
Before generating, you can adjust:
- **Speed Mode**: Choose Fast or Relax
- **Quality**: Standard or High (based on your plan)
- **Aspect Ratio**: Square, Portrait, or Landscape
- **Style Intensity**: How artistic vs realistic

### Step 5: Generate Your Image
1. Click the **"Generate"** button
2. Midjourney will show a progress indicator
3. Fast mode takes ~60 seconds, Relax mode takes 5-10 minutes
4. You'll get 4 stunning variations to choose from

### Step 6: Explore Your Results
After generation, you'll have multiple options:
- **Upscale** - Enhance resolution for any of the 4 images
- **Variations** - Create similar images based on your favorites
- **Download** - Save in various resolutions
- **Share** - Get direct links to showcase your art

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

**❌ Overly Complex**: "a dragon fighting a knight while riding a unicorn in space during a thunderstorm with rainbow colors"
**✅ Much Better**: "a medieval knight confronting a majestic dragon, fantasy art style"

**❌ Missing Style**: "a house"
**✅ Much Better**: "a modern house, architectural photography, clean lines, minimalist design"

## Understanding Your Results

**Quality Factors:**
- **Uniqueness** - Every generation is completely original
- **Resolution** - Depends on your subscription tier
- **Commercial Rights** - Full usage rights with paid plans
- **Consistency** - Results improve with practice and refined prompts

**Technical Aspects:**
- **Default Format** - Square (1:1) aspect ratio
- **File Formats** - High-quality PNG downloads
- **Storage** - All images saved in your personal gallery
- **Sharing** - Easy social media integration

## Expanding Your Creative Skills

**Subject Mastery:**
1. **Portraits** - People, characters, expressions
2. **Landscapes** - Nature, cityscapes, environments  
3. **Objects** - Products, still life, concepts
4. **Abstract** - Emotions, ideas, artistic expressions

**Style Exploration:**
1. **Photography** - Portrait, landscape, macro, street
2. **Traditional Art** - Oil painting, watercolor, pencil sketch
3. **Digital Art** - 3D render, vector art, pixel art
4. **Mixed Media** - Collage, mixed techniques

**Advanced Techniques:**
- **Aspect Ratios** - Add "--ar 16:9" for cinematic widescreen
- **Style Weight** - Control artistic interpretation intensity
- **Negative Prompts** - Specify what you don't want
- **Reference Images** - Upload inspiration photos

## Professional Tips for Exceptional Results

**Prompt Crafting:**
- **Be descriptive yet concise** - Paint a clear picture with words
- **Use recognized art terms** - "chiaroscuro lighting", "rule of thirds"
- **Include emotional context** - "serene", "dramatic", "whimsical"
- **Reference famous styles** - "in the style of Ansel Adams photography"

**Workflow Optimization:**
- **Start broad, then refine** - Begin with basic concepts, add details
- **Save successful prompts** - Build your personal prompt library
- **Study community creations** - Learn from featured artworks
- **Experiment daily** - Consistent practice accelerates improvement

**Business Applications:**
- **Marketing Materials** - Social media posts, advertisements
- **Content Creation** - Blog headers, presentations, websites
- **Product Development** - Concept art, packaging design
- **Brand Identity** - Visual themes, mood boards

Congratulations! You've just entered the exciting world of AI-powered creativity. With Midjourney's intuitive web platform, you now have the tools to bring any vision to life. The more you explore and experiment, the more masterful you'll become at translating your imagination into stunning visual reality.`,
          textContentCht: `# 你嘅第一張AI圖像

而家你已經設置好Midjourney，我哋嚟創作你嘅第一張AI生成圖像！呢堂課會逐步指導你完成整個過程。

## 基本提示結構

一個好嘅Midjourney提示遵循呢個結構：
**主題 + 風格 + 設置 + 細節**

### 例子分解：
- **主題**: "一隻威武嘅獅子"
- **風格**: "數碼藝術"
- **設置**: "在非洲大草原"
- **細節**: "黃金時間光線，超寫實"

**完整提示**: "一隻威武嘅獅子，數碼藝術，在非洲大草原，黃金時間光線，超寫實"

## 逐步教學

### 第1步：選擇你嘅頻道
1. 去任何 **#newbies-** 頻道在Midjourney Discord
2. 呢啲頻道最適合新手練習
3. 唔使擔心"搞亂" - 大家都在學習！

### 第2步：開始你嘅第一個提示
1. 輸入：\`/imagine\`
2. 指令會自動完成
3. 點擊佢或按Tab

### 第3步：寫你嘅提示
我哋由簡單嘅開始：
\`/imagine a cute cat sitting on a windowsill, watercolor painting style\`

### 第4步：提交同等待
1. 按Enter提交
2. Midjourney會顯示"等待開始..."
3. 然後佢會生成4個唔同嘅變化
4. 呢個通常需要30-60秒

### 第5步：選擇你鍾意嘅
生成後，你會在圖像下面睇到按鈕：
- **U1, U2, U3, U4**: 放大版本1-4
- **V1, V2, V3, V4**: 創建版本1-4嘅變化
- **🔄**: 重新生成（生成4張全新圖像）

## 新手練習提示

試試呢啲簡單提示嚟熟悉：

1. \`a peaceful forest lake, morning mist, photography style\`
2. \`a cozy coffee shop interior, warm lighting, illustration\`
3. \`a futuristic city skyline, neon lights, cyberpunk style\`
4. \`a vintage bicycle in a flower garden, soft colors\`
5. \`a magical castle on a floating island, fantasy art\`

## 常見新手錯誤

**太模糊**: "靚圖片" → **更好**: "日落時寧靜嘅山景"

**太複雜**: "一條龍同騎士打架同時騎住獨角獸在太空雷暴中" → **更好**: "中世紀騎士面對一條龍"

**忘記風格**: "一間屋" → **更好**: "一間屋，建築攝影風格"

## 理解結果

- **每次生成都係獨特嘅** - 你永遠唔會得到完全相同嘅圖像
- **長寬比** 默認係正方形(1:1)
- **質量** 取決於你嘅訂閱計劃
- **商業使用** 權利取決於你嘅計劃

## 下一步

1. **練習唔同主題**: 人物、動物、物件、風景
2. **試驗唔同風格**: 攝影、繪畫、插圖、3D渲染
3. **嘗試唔同設置**: 室內、戶外、幻想、現實
4. **學習長寬比**: 添加 \`--ar 16:9\` 做寬屏

## 獲得更好結果嘅專業貼士

- **具體但唔好太複雜**
- **使用你認識嘅藝術風格**: "梵高風格"
- **添加光線描述**: "柔和晨光"、"戲劇性陰影"
- **包含情緒詞**: "平靜"、"充滿活力"、"神秘"
- **參考攝影術語**: "特寫"、"廣角"、"微距"

恭喜！你剛剛創作咗你嘅第一張AI圖像。練習得越多，你就越能夠製作出完全符合你想像嘅提示。`
        }
      ]
    },
    {
      id: 2,
      title: 'Basic Prompt Writing',
      titleCht: '基礎提示寫作',
      description: 'Learn the fundamentals of effective prompt creation',
      descriptionCht: '學習有效提示創作嘅基礎知識',
      lessons: [
        {
          id: 4,
          title: 'Prompt Structure Basics',
          titleCht: '提示結構基礎',
          duration: '25 min',
          durationCht: '25分鐘',
          description: 'Understanding how to structure effective prompts',
          descriptionCht: '了解點樣構造有效嘅提示',
          videoUrl: '/videos/prompt-basics.mp4',
          isLocked: false,
          textContent: `# Prompt Structure Basics

Mastering prompt structure is the key to getting consistent, high-quality results from Midjourney. This lesson will teach you the fundamental building blocks of effective prompts.

## The 4-Part Prompt Formula

**Subject + Style + Setting + Details = Perfect Prompt**

### 1. Subject (What)
The main focus of your image:
- **People**: "a young woman", "an elderly man", "a child"
- **Animals**: "a majestic eagle", "a playful kitten", "a wild horse"
- **Objects**: "a vintage car", "a modern building", "a magical sword"
- **Concepts**: "love", "freedom", "chaos"

### 2. Style (How)
The artistic approach:
- **Art Styles**: "oil painting", "watercolor", "digital art", "pencil sketch"
- **Photography**: "portrait photography", "landscape photography", "macro photography"
- **Artistic Movements**: "impressionist", "surrealist", "art deco", "minimalist"
- **Artists**: "in the style of Van Gogh", "Picasso style", "Studio Ghibli style"

### 3. Setting (Where)
The environment or background:
- **Locations**: "in a forest", "on a mountain top", "in a busy city"
- **Time**: "at sunset", "during a storm", "in winter"
- **Atmosphere**: "foggy morning", "golden hour", "dramatic lighting"

### 4. Details (Specifics)
Fine-tuning elements:
- **Colors**: "vibrant colors", "muted tones", "black and white"
- **Composition**: "close-up", "wide shot", "bird's eye view"
- **Quality**: "highly detailed", "photorealistic", "8K resolution"
- **Mood**: "peaceful", "energetic", "mysterious"

## Step-by-Step Prompt Building

### Exercise 1: Simple Portrait
**Step 1**: Choose subject → "a woman"
**Step 2**: Add style → "a woman, portrait photography"
**Step 3**: Add setting → "a woman, portrait photography, in a garden"
**Step 4**: Add details → "a woman, portrait photography, in a garden, soft natural lighting, warm colors"

**Final Prompt**: "a woman, portrait photography, in a garden, soft natural lighting, warm colors"

### Exercise 2: Fantasy Scene
**Step 1**: Choose subject → "a dragon"
**Step 2**: Add style → "a dragon, fantasy art"
**Step 3**: Add setting → "a dragon, fantasy art, flying over mountains"
**Step 4**: Add details → "a dragon, fantasy art, flying over mountains, epic scale, dramatic clouds, golden hour"

**Final Prompt**: "a dragon, fantasy art, flying over mountains, epic scale, dramatic clouds, golden hour"

## Common Prompt Patterns

### Pattern 1: Realistic Photography
"[subject], [type] photography, [setting], [lighting], [mood]"
**Example**: "a cat, portrait photography, in a window, soft morning light, peaceful"

### Pattern 2: Artistic Style
"[subject], [art style], [setting], [color palette], [details]"
**Example**: "a city skyline, watercolor painting, at sunset, warm colors, loose brushstrokes"

### Pattern 3: Fantasy/Concept
"[magical subject], [fantasy style], [mystical setting], [atmosphere], [epic details]"
**Example**: "a wizard, digital fantasy art, in an ancient library, mysterious atmosphere, glowing magical effects"

## Prompt Weight and Order

**Most Important → Least Important**
1. **Subject** (what you want) - appears first
2. **Style** (how it looks) - second priority  
3. **Setting** (where it is) - third priority
4. **Details** (refinements) - last priority

## Do's and Don'ts

### ✅ DO:
- Be specific but concise
- Use comma separation
- Start with the most important element
- Use recognized art terms
- Include lighting descriptions

### ❌ DON'T:
- Write full sentences
- Use too many adjectives
- Contradict yourself
- Make prompts too long (over 60 words)
- Use vague terms like "nice" or "good"

## Practice Exercises

Try building prompts for these subjects:

1. **A coffee shop**
   - Style: cozy interior photography
   - Setting: morning time
   - Details: warm lighting, vintage furniture

2. **A superhero**
   - Style: comic book art
   - Setting: city rooftop
   - Details: dynamic pose, dramatic cape

3. **A flower**
   - Style: macro photography
   - Setting: garden setting
   - Details: water droplets, shallow depth of field

## Advanced Tips

- **Use parentheses** for emphasis: "(highly detailed face)"
- **Add negative prompts** with --no: "--no blur, distortion"
- **Control aspect ratio**: "--ar 16:9" for widescreen
- **Adjust stylization**: "--s 250" for more artistic interpretation

Master these basics, and you'll be creating stunning images consistently!`,
          textContentCht: `# 提示結構基礎

掌握提示結構係從Midjourney獲得一致、高質量結果嘅關鍵。呢堂課會教你有效提示嘅基本構建塊。

## 四部分提示公式

**主題 + 風格 + 設置 + 細節 = 完美提示**

### 1. 主題（什麼）
圖像嘅主要焦點：
- **人物**: "一個年輕女人", "一個老人", "一個小孩"
- **動物**: "一隻威武嘅老鷹", "一隻頑皮嘅小貓", "一匹野馬"
- **物件**: "一輛復古汽車", "一座現代建築", "一把魔法劍"
- **概念**: "愛情", "自由", "混沌"

### 2. 風格（點樣）
藝術手法：
- **藝術風格**: "油畫", "水彩畫", "數碼藝術", "鉛筆素描"
- **攝影**: "人像攝影", "風景攝影", "微距攝影"
- **藝術運動**: "印象派", "超現實主義", "裝飾藝術", "極簡主義"
- **藝術家**: "梵高風格", "畢加索風格", "宮崎駿風格"

### 3. 設置（邊度）
環境或背景：
- **地點**: "在森林中", "在山頂上", "在繁忙嘅城市"
- **時間**: "日落時", "暴風雨中", "冬天"
- **氣氛**: "霧濛濛嘅早晨", "黃金時間", "戲劇性光線"

### 4. 細節（具體）
微調元素：
- **顏色**: "鮮豔顏色", "柔和色調", "黑白"
- **構圖**: "特寫", "廣角", "鳥瞰圖"
- **質量**: "高度詳細", "超寫實", "8K分辨率"
- **情緒**: "平靜", "充滿活力", "神秘"

## 逐步提示構建

### 練習1: 簡單人像
**第1步**: 選擇主題 → "一個女人"
**第2步**: 添加風格 → "一個女人，人像攝影"
**第3步**: 添加設置 → "一個女人，人像攝影，在花園中"
**第4步**: 添加細節 → "一個女人，人像攝影，在花園中，柔和自然光線，溫暖顏色"

**最終提示**: "一個女人，人像攝影，在花園中，柔和自然光線，溫暖顏色"

### 練習2: 幻想場景
**第1步**: 選擇主題 → "一條龍"
**第2步**: 添加風格 → "一條龍，幻想藝術"
**第3步**: 添加設置 → "一條龍，幻想藝術，飛越山脈"
**第4步**: 添加細節 → "一條龍，幻想藝術，飛越山脈，史詩規模，戲劇性雲朵，黃金時間"

**最終提示**: "一條龍，幻想藝術，飛越山脈，史詩規模，戲劇性雲朵，黃金時間"

## 常見提示模式

### 模式1: 寫實攝影
"[主題], [類型] 攝影, [設置], [光線], [情緒]"
**例子**: "一隻貓，人像攝影，在窗戶邊，柔和晨光，平靜"

### 模式2: 藝術風格
"[主題], [藝術風格], [設置], [色彩搭配], [細節]"
**例子**: "城市天際線，水彩畫，日落時，溫暖顏色，鬆散筆觸"

### 模式3: 幻想/概念
"[魔法主題], [幻想風格], [神秘設置], [氣氛], [史詩細節]"
**例子**: "一個巫師，數碼幻想藝術，在古老圖書館，神秘氣氛，發光魔法效果"

## 提示權重同順序

**最重要 → 最不重要**
1. **主題**（你想要嘅）- 出現在最前面
2. **風格**（點樣睇）- 第二優先級
3. **設置**（喺邊度）- 第三優先級
4. **細節**（改進）- 最後優先級

## 該做同唔該做

### ✅ 該做:
- 具體但簡潔
- 用逗號分隔
- 由最重要嘅元素開始
- 使用公認嘅藝術術語
- 包含光線描述

### ❌ 唔該做:
- 寫完整句子
- 用太多形容詞
- 自相矛盾
- 提示太長（超過60個詞）
- 使用模糊術語如"靚"或"好"

## 練習練習

試為呢啲主題構建提示：

1. **一間咖啡店**
   - 風格: 舒適室內攝影
   - 設置: 早晨時間
   - 細節: 溫暖光線，復古傢俱

2. **一個超級英雄**
   - 風格: 漫畫藝術
   - 設置: 城市天台
   - 細節: 動態姿勢，戲劇性斗篷

3. **一朵花**
   - 風格: 微距攝影
   - 設置: 花園環境
   - 細節: 水珠，淺景深

## 高級貼士

- **使用括號**強調: "(高度詳細嘅面部)"
- **添加負面提示**用--no: "--no 模糊, 扭曲"
- **控制長寬比**: "--ar 16:9" 做寬屏
- **調整風格化**: "--s 250" 做更藝術化詮釋

掌握呢啲基礎，你就能夠一直創作出令人驚嘆嘅圖像！`
        },
        {
          id: 5,
          title: 'Common Prompt Mistakes',
          titleCht: '常見提示錯誤',
          duration: '15 min',
          durationCht: '15分鐘',
          description: 'Avoid these common pitfalls when writing prompts',
          descriptionCht: '避免寫提示時嘅常見陷阱',
          videoUrl: '/videos/prompt-mistakes.mp4',
          isLocked: false,
          textContent: `# Common Prompt Mistakes

Learning from mistakes is the fastest way to improve your Midjourney skills. This lesson covers the most common errors beginners make and how to fix them.

## Mistake #1: Being Too Vague

### ❌ Wrong:
"nice picture", "something cool", "beautiful scene"

### ✅ Correct:
"a serene mountain lake at sunrise, landscape photography, misty atmosphere, golden hour lighting"

**Why it matters**: Midjourney needs specific guidance to create what you envision. Vague terms lead to unpredictable results.

## Mistake #2: Information Overload

### ❌ Wrong:
"a beautiful young woman with long flowing blonde hair wearing a red dress standing in a magical forest with glowing mushrooms and fairy lights while holding a crystal sword during a thunderstorm at sunset with rainbow colors and butterflies flying around her face looking mysterious and powerful"

### ✅ Correct:
"a woman with blonde hair, fantasy portrait, in a magical forest, mysterious atmosphere, glowing elements"

**Why it matters**: Too much information confuses the AI. Keep it focused on 3-4 main elements.

## Mistake #3: Contradictory Instructions

### ❌ Wrong:
"realistic cartoon", "bright dark colors", "ancient modern building"

### ✅ Correct:
"realistic portrait" OR "cartoon illustration"
"bright vibrant colors" OR "dark moody tones"
"ancient castle" OR "modern building"

**Why it matters**: Contradictions create confused, blended results that satisfy neither instruction.

## Mistake #4: Ignoring Style Specification

### ❌ Wrong:
"a cat sitting"

### ✅ Correct:
"a cat sitting, oil painting style" OR "a cat sitting, photography" OR "a cat sitting, digital art"

**Why it matters**: Without style guidance, results are inconsistent and may not match your vision.

## Mistake #5: Poor Punctuation and Structure

### ❌ Wrong:
"dragon flying over mountains with fire breathing and wings spread wide epic fantasy"

### ✅ Correct:
"a dragon flying over mountains, fantasy art, fire breathing, wings spread wide, epic scale"

**Why it matters**: Proper comma separation helps Midjourney understand distinct elements.

## Mistake #6: Using Copyrighted Characters

### ❌ Wrong:
"Mickey Mouse", "Batman", "Harry Potter"

### ✅ Correct:
"a cartoon mouse character", "a dark superhero", "a young wizard"

**Why it matters**: Copyrighted content may be blocked or create legal issues.

## Mistake #7: Neglecting Negative Prompts

### ❌ Missing:
Not specifying what you DON'T want

### ✅ Correct:
Add "--no blur, distortion, extra limbs, bad anatomy" when needed

**Why it matters**: Negative prompts help avoid common AI generation issues.

## Mistake #8: Wrong Aspect Ratios

### ❌ Wrong:
Using default square format for portraits or landscapes

### ✅ Correct:
"--ar 2:3" for portraits
"--ar 16:9" for landscapes
"--ar 1:1" for social media squares

**Why it matters**: Proper ratios enhance composition and prevent awkward cropping.

## Mistake #9: Ignoring Lighting

### ❌ Wrong:
"a person in a room"

### ✅ Correct:
"a person in a room, soft window lighting" OR "a person in a room, dramatic shadows"

**Why it matters**: Lighting dramatically affects mood and quality.

## Mistake #10: Not Iterating

### ❌ Wrong:
Accepting first result or giving up quickly

### ✅ Correct:
- Try variations (V1, V2, V3, V4)
- Adjust prompts based on results
- Use successful elements in new prompts

**Why it matters**: Great results often come from refinement and iteration.

## Quick Fix Checklist

Before submitting your prompt, check:

✅ **Specific subject** - not vague
✅ **Clear style** - photography, painting, etc.
✅ **Proper commas** - separating elements
✅ **Reasonable length** - under 60 words
✅ **No contradictions** - consistent instructions
✅ **Aspect ratio** - if needed
✅ **Lighting mentioned** - for better results

## Practice: Fix These Prompts

### Exercise 1:
**Bad**: "nice dog picture"
**Your fix**: _______________

### Exercise 2:
**Bad**: "realistic cartoon superhero flying in space with magic powers and cape flowing in underwater scene"
**Your fix**: _______________

### Exercise 3:
**Bad**: "dark bright mysterious obvious secret hidden visible"
**Your fix**: _______________

## Suggested Fixes:

1. "a golden retriever, portrait photography, in a park, natural lighting"
2. "a superhero flying through space, comic book art, cape flowing, cosmic background"
3. "a mysterious figure, dark atmospheric lighting, hidden in shadows"

## Pro Tips for Avoiding Mistakes

1. **Start simple** - build complexity gradually
2. **Study successful prompts** - learn from community examples
3. **Keep a prompt journal** - track what works
4. **Use reference images** - when available
5. **Test systematically** - change one element at a time

Remember: Every mistake is a learning opportunity. The Midjourney community is very helpful - don't hesitate to ask for advice!`,
          textContentCht: `# 常見提示錯誤

從錯誤中學習係提高你Midjourney技能嘅最快方法。呢堂課涵蓋新手最常犯嘅錯誤同點樣修正佢哋。

## 錯誤#1: 太模糊

### ❌ 錯誤:
"靚圖片", "酷嘅嘢", "美麗場景"

### ✅ 正確:
"日出時寧靜嘅山湖，風景攝影，霧濛濛氣氛，黃金時間光線"

**點解重要**: Midjourney需要具體指導嚟創造你想像嘅嘢。模糊術語會導致不可預測嘅結果。

## 錯誤#2: 資訊過載

### ❌ 錯誤:
"一個美麗嘅年輕女人有長長飄逸嘅金髮穿住紅色裙子站在神奇森林中有發光蘑菇同仙女燈光同時拿住水晶劍在雷暴中日落時有彩虹顏色同蝴蝶飛在佢面部周圍睇起嚟神秘同強大"

### ✅ 正確:
"一個金髮女人，幻想人像，在神奇森林中，神秘氣氛，發光元素"

**點解重要**: 太多資訊會令AI混亂。保持專注於3-4個主要元素。

## 錯誤#3: 矛盾指令

### ❌ 錯誤:
"寫實卡通", "明亮黑暗顏色", "古老現代建築"

### ✅ 正確:
"寫實人像" 或者 "卡通插圖"
"明亮鮮豔顏色" 或者 "黑暗情緒色調"
"古老城堡" 或者 "現代建築"

**點解重要**: 矛盾會創造混亂、混合嘅結果，兩個指令都唔滿意。

## 錯誤#4: 忽略風格規範

### ❌ 錯誤:
"一隻貓坐住"

### ✅ 正確:
"一隻貓坐住，油畫風格" 或者 "一隻貓坐住，攝影" 或者 "一隻貓坐住，數碼藝術"

**點解重要**: 冇風格指導，結果會不一致，可能唔符合你嘅願景。

## 錯誤#5: 標點符號同結構差

### ❌ 錯誤:
"龍飛越山脈噴火同翼展開史詩幻想"

### ✅ 正確:
"一條龍飛越山脈，幻想藝術，噴火，翼展開，史詩規模"

**點解重要**: 適當嘅逗號分隔幫助Midjourney理解不同元素。

## 錯誤#6: 使用版權角色

### ❌ 錯誤:
"米老鼠", "蝙蝠俠", "哈利波特"

### ✅ 正確:
"一個卡通老鼠角色", "一個黑暗超級英雄", "一個年輕巫師"

**點解重要**: 版權內容可能被阻止或創造法律問題。

## 錯誤#7: 忽略負面提示

### ❌ 缺少:
冇指定你唔想要嘅嘢

### ✅ 正確:
需要時添加 "--no 模糊, 扭曲, 多餘肢體, 壞解剖學"

**點解重要**: 負面提示幫助避免常見AI生成問題。

## 錯誤#8: 錯誤長寬比

### ❌ 錯誤:
用默認正方形格式做人像或風景

### ✅ 正確:
"--ar 2:3" 做人像
"--ar 16:9" 做風景
"--ar 1:1" 做社交媒體正方形

**點解重要**: 適當比例增強構圖同防止尷尬裁剪。

## 錯誤#9: 忽略光線

### ❌ 錯誤:
"一個人在房間中"

### ✅ 正確:
"一個人在房間中，柔和窗戶光線" 或者 "一個人在房間中，戲劇性陰影"

**點解重要**: 光線戲劇性地影響情緒同質量。

## 錯誤#10: 唔迭代

### ❌ 錯誤:
接受第一個結果或快速放棄

### ✅ 正確:
- 嘗試變化(V1, V2, V3, V4)
- 根據結果調整提示
- 在新提示中使用成功元素

**點解重要**: 偉大嘅結果通常嚟自改進同迭代。

## 快速修復檢查清單

提交提示前，檢查：

✅ **具體主題** - 唔模糊
✅ **清晰風格** - 攝影、繪畫等
✅ **適當逗號** - 分隔元素
✅ **合理長度** - 60個詞以下
✅ **冇矛盾** - 一致指令
✅ **長寬比** - 如果需要
✅ **提及光線** - 獲得更好結果

## 練習: 修正呢啲提示

### 練習1:
**差**: "靚狗圖片"
**你嘅修正**: _______________

### 練習2:
**差**: "寫實卡通超級英雄在太空飛行有魔法力量同斗篷在水下場景飄動"
**你嘅修正**: _______________

### 練習3:
**差**: "黑暗明亮神秘明顯秘密隱藏可見"
**你嘅修正**: _______________

## 建議修正:

1. "一隻金毛獵犬，人像攝影，在公園中，自然光線"
2. "一個超級英雄在太空飛行，漫畫藝術，斗篷飄動，宇宙背景"
3. "一個神秘人物，黑暗大氣光線，隱藏在陰影中"

## 避免錯誤嘅專業貼士

1. **從簡單開始** - 逐漸建立複雜性
2. **研究成功提示** - 從社群例子學習
3. **保持提示日記** - 追蹤有效嘅嘢
4. **使用參考圖像** - 當可用時
5. **系統測試** - 一次改變一個元素

記住：每個錯誤都係學習機會。Midjourney社群非常有幫助 - 唔好猶豫尋求建議！`
        }
      ]
    }
  ],
  proModules: [
    {
      id: 1,
      title: 'Secret Keywords & Power Prompts',
      titleCht: '秘密關鍵詞同強力提示',
      description: 'Unlock hidden Midjourney keywords and master advanced prompt engineering',
      descriptionCht: '解鎖隱藏嘅Midjourney關鍵詞同掌握高級提示工程',
      lessons: [
        {
          id: 1,
          title: 'Secret Photography Keywords',
          titleCht: '秘密攝影關鍵詞',
          duration: '40 min',
          durationCht: '40分鐘',
          description: 'Master professional photography keywords that pros use',
          descriptionCht: '掌握專業攝影師使用嘅關鍵詞',
          videoUrl: '/videos/secret-keywords.mp4',
          isLocked: true,
          textContent: `# Secret Photography Keywords That Transform Your Images

## 🔥 Professional Camera & Lens Keywords

### Ultra-Professional Camera Terms:
- **"shot on RED Dragon 6K"** - Cinema-quality results
- **"Hasselblad H6D-400c"** - Medium format luxury
- **"Leica M11 Monochrom"** - Premium black & white
- **"Phase One XF IQ4"** - Ultimate studio quality
- **"Fujifilm GFX100S"** - Modern medium format
- **"Canon R5 with RF 85mm f/1.2"** - Portrait perfection

### Secret Lens Specifications:
- **"85mm f/1.2 bokeh"** - Creamy background blur
- **"24-70mm f/2.8 versatility"** - Professional zoom
- **"50mm f/1.4 natural perspective"** - Human eye view
- **"135mm f/2 compression"** - Flattering portraits
- **"14mm f/2.8 ultra-wide drama"** - Dramatic landscapes

## 📸 Lighting Secrets Pros Don't Share

### Studio Lighting Keywords:
- **"Profoto B1X strobe lighting"** - Professional studio setup
- **"octabox softbox diffusion"** - Soft, even lighting
- **"beauty dish with grid"** - Glamour portrait lighting
- **"ring light catchlight"** - Perfect eye highlights
- **"strip light rim lighting"** - Edge definition
- **"butterfly lighting pattern"** - Classic portrait setup

### Natural Light Magic Words:
- **"golden hour backlighting"** - Warm rim light
- **"overcast diffused lighting"** - Soft, even illumination
- **"window light portrait"** - Natural studio effect
- **"blue hour atmosphere"** - Moody twilight
- **"harsh noon shadows"** - Dramatic contrast
- **"reflected fill light"** - Balanced exposure

## 🎨 Advanced Style & Mood Keywords

### Film Emulation Secrets:
- **"Kodak Portra 400 grain"** - Warm, natural skin tones
- **"Fuji Pro 400H aesthetic"** - Pastel, dreamy look
- **"Ilford HP5 Plus contrast"** - Classic black & white
- **"Cinestill 800T tungsten"** - Neon night photography
- **"Polaroid SX-70 vintage"** - Instant film nostalgia

### Color Grading Keywords:
- **"teal and orange color grade"** - Hollywood blockbuster
- **"desaturated muted tones"** - Modern indie film
- **"high contrast black shadows"** - Dramatic mood
- **"lifted shadows film look"** - Soft, dreamy aesthetic
- **"crushed blacks cinematic"** - Professional video look

## 🏆 Secret Composition Keywords

### Professional Framing:
- **"rule of thirds composition"** - Balanced placement
- **"leading lines perspective"** - Eye-guiding elements
- **"negative space minimalism"** - Clean, modern look
- **"symmetrical reflection"** - Perfect balance
- **"dutch angle dynamics"** - Dynamic tension
- **"frame within frame"** - Layered composition

### Advanced Techniques:
- **"shallow depth of field isolation"** - Subject separation
- **"hyperfocal distance landscape"** - Everything in focus
- **"bokeh orbs background"** - Dreamy light circles
- **"motion blur panning"** - Speed and movement
- **"freeze frame action"** - Crisp motion capture

## 💎 Ultra-Specific Quality Keywords

### Image Quality Enhancers:
- **"8K ultra-high resolution"** - Maximum detail
- **"pixel-perfect sharpness"** - Crisp definition
- **"HDR tone mapping"** - Extended dynamic range
- **"focus stacking macro"** - Ultimate close-up detail
- **"panoramic stitching"** - Wide-angle perfection

### Professional Processing:
- **"Lightroom processed"** - Professional editing
- **"Capture One color science"** - Premium color accuracy
- **"Phase One processing"** - High-end workflow
- **"DxO lens corrections"** - Optical perfection
- **"Nik Collection effects"** - Professional filters

## 🎯 Secret Prompt Formulas

### The Ultimate Portrait Formula:
\`\`\`
[Subject] portrait, shot on [Camera] with [Lens], [Lighting Setup], [Film Stock/Color Grade], [Composition Rule], professional photography, ultra-sharp focus, [Mood Keywords]
\`\`\`

### Example:
\`\`\`
Beautiful woman portrait, shot on Hasselblad H6D with 85mm f/1.2, octabox softbox lighting, Kodak Portra 400 aesthetic, rule of thirds composition, professional photography, ultra-sharp focus, serene and confident
\`\`\`

### The Landscape Mastery Formula:
\`\`\`
[Location] landscape, [Time of Day] lighting, shot on [Camera], [Weather Conditions], [Composition Technique], [Color Treatment], professional nature photography, ultra-high resolution
\`\`\`

### Example:
\`\`\`
Mountain lake landscape, golden hour backlighting, shot on Phase One XF, misty morning atmosphere, leading lines perspective, teal and orange color grade, professional nature photography, ultra-high resolution
\`\`\`

## 🔍 Insider Tips for Maximum Impact

### Keyword Stacking Strategy:
1. **Start with Subject**: Clear main focus
2. **Add Technical Specs**: Camera/lens credibility  
3. **Define Lighting**: Mood and quality
4. **Specify Style**: Aesthetic direction
5. **Include Composition**: Professional framing
6. **End with Quality**: Technical excellence

### Power Combinations:
- **"shot on" + "with" + "lighting"** = Technical authority
- **"aesthetic" + "color grade" + "mood"** = Style consistency
- **"composition" + "perspective" + "framing"** = Visual impact
- **"professional" + "ultra" + "high-resolution"** = Quality assurance

These secret keywords are used by professional photographers and AI artists who create stunning, gallery-worthy images. Master these combinations and watch your Midjourney results transform from amateur to professional quality instantly!

## 🎬 Midjourney Video Generation Templates

### Video Sample 1: Nature Landscape
**Step 1 - Create Base Image:**
\`\`\`
"serene mountain lake at sunrise, mist rising from water, golden hour lighting, 
peaceful atmosphere, shot on Canon R5, 24-70mm f/2.8, natural colors, 
professional landscape photography --ar 16:9 --q 2"
\`\`\`

**Step 2 - Generate Video:**
\`\`\`
"gentle mist flowing across the lake surface, subtle water ripples, 
soft morning breeze moving through trees, calm and meditative movement, 
slow motion effect, cinematic quality, peaceful atmosphere"
\`\`\`

### Video Sample 2: Urban Night Scene
**Step 1 - Create Base Image:**
\`\`\`
"modern city skyline at night, neon lights reflecting on wet streets, 
busy traffic, urban atmosphere, shot on Sony A7R V, 35mm f/1.4, 
cinematic lighting, high contrast, professional street photography --ar 16:9 --q 2"
\`\`\`

**Step 2 - Generate Video:**
\`\`\`
"flowing traffic lights creating light trails, gentle camera pan across skyline, 
neon signs flickering, urban energy, time-lapse effect, 
dynamic city movement, professional cinematography"
\`\`\`

### Video Sample 3: Portrait with Movement
**Step 1 - Create Base Image:**
\`\`\`
"professional portrait of confident businesswoman, studio lighting, 
clean background, shot on Hasselblad H6D, 85mm f/1.2, 
modern style, sharp focus, commercial photography --ar 9:16 --q 2"
\`\`\`

**Step 2 - Generate Video:**
\`\`\`
"subtle hair movement from gentle breeze, confident eye contact, 
slight smile emerging, professional demeanor, soft lighting changes, 
elegant and sophisticated movement, high-end commercial style"
\`\`\`

## 🎯 Video Generation Pro Tips

### Essential Video Prompting Rules:
1. **Start with Perfect Image** - Create high-quality base image first
2. **Describe Subtle Movements** - Avoid overly dramatic actions
3. **Specify Motion Type** - slow motion, time-lapse, smooth movement
4. **Control Motion Intensity** - use adjectives like "subtle", "gentle", "dramatic"
5. **Maintain Style Consistency** - image and video styles must match
6. **Add Cinematic Keywords** - "professional cinematography", "smooth camera movement"

### Motion Description Keywords:
- **Subtle Movement:** "gentle", "soft", "subtle", "delicate"
- **Dynamic Action:** "flowing", "dramatic", "energetic", "dynamic"
- **Camera Movement:** "pan", "zoom", "tracking shot", "dolly movement"
- **Natural Effects:** "wind", "water flow", "light changes", "atmospheric"
- **Professional Quality:** "cinematic", "commercial grade", "high-end production"`,
          textContentCht: `# 令你圖像脫胎換骨嘅秘密攝影關鍵詞

## 🔥 專業相機同鏡頭關鍵詞

### 超專業相機術語：
- **"shot on RED Dragon 6K"** - 電影級質素效果
- **"Hasselblad H6D-400c"** - 中畫幅奢華
- **"Leica M11 Monochrom"** - 頂級黑白
- **"Phase One XF IQ4"** - 終極工作室質素
- **"Fujifilm GFX100S"** - 現代中畫幅
- **"Canon R5 with RF 85mm f/1.2"** - 人像完美

### 秘密鏡頭規格：
- **"85mm f/1.2 bokeh"** - 奶油般背景虛化
- **"24-70mm f/2.8 versatility"** - 專業變焦
- **"50mm f/1.4 natural perspective"** - 人眼視角
- **"135mm f/2 compression"** - 討好嘅人像
- **"14mm f/2.8 ultra-wide drama"** - 戲劇性風景

## 📸 專業人士唔會分享嘅燈光秘密

### 工作室燈光關鍵詞：
- **"Profoto B1X strobe lighting"** - 專業工作室設置
- **"octabox softbox diffusion"** - 柔和均勻燈光
- **"beauty dish with grid"** - 魅力人像燈光
- **"ring light catchlight"** - 完美眼部高光
- **"strip light rim lighting"** - 邊緣定義
- **"butterfly lighting pattern"** - 經典人像設置

### 自然光魔法詞語：
- **"golden hour backlighting"** - 溫暖邊緣光
- **"overcast diffused lighting"** - 柔和均勻照明
- **"window light portrait"** - 自然工作室效果
- **"blue hour atmosphere"** - 情緒黃昏
- **"harsh noon shadows"** - 戲劇性對比
- **"reflected fill light"** - 平衡曝光

## 🎨 高級風格同情緒關鍵詞

### 膠片模擬秘密：
- **"Kodak Portra 400 grain"** - 溫暖自然膚色
- **"Fuji Pro 400H aesthetic"** - 粉彩夢幻外觀
- **"Ilford HP5 Plus contrast"** - 經典黑白
- **"Cinestill 800T tungsten"** - 霓虹夜攝
- **"Polaroid SX-70 vintage"** - 即影即有懷舊

### 調色關鍵詞：
- **"teal and orange color grade"** - 荷里活大片
- **"desaturated muted tones"** - 現代獨立電影
- **"high contrast black shadows"** - 戲劇性情緒
- **"lifted shadows film look"** - 柔和夢幻美學
- **"crushed blacks cinematic"** - 專業視頻外觀

## 🏆 秘密構圖關鍵詞

### 專業取景：
- **"rule of thirds composition"** - 平衡放置
- **"leading lines perspective"** - 引導視線元素
- **"negative space minimalism"** - 乾淨現代外觀
- **"symmetrical reflection"** - 完美平衡
- **"dutch angle dynamics"** - 動態張力
- **"frame within frame"** - 分層構圖

### 高級技巧：
- **"shallow depth of field isolation"** - 主體分離
- **"hyperfocal distance landscape"** - 全部對焦
- **"bokeh orbs background"** - 夢幻光圈
- **"motion blur panning"** - 速度同運動
- **"freeze frame action"** - 清晰動作捕捉

## 💎 超具體質素關鍵詞

### 圖像質素增強器：
- **"8K ultra-high resolution"** - 最大細節
- **"pixel-perfect sharpness"** - 清晰定義
- **"HDR tone mapping"** - 擴展動態範圍
- **"focus stacking macro"** - 終極近攝細節
- **"panoramic stitching"** - 廣角完美

### 專業處理：
- **"Lightroom processed"** - 專業編輯
- **"Capture One color science"** - 頂級色彩準確性
- **"Phase One processing"** - 高端工作流程
- **"DxO lens corrections"** - 光學完美
- **"Nik Collection effects"** - 專業濾鏡

## 🎯 秘密提示公式

### 終極人像公式：
\`\`\`
[主體] 人像, shot on [相機] with [鏡頭], [燈光設置], [膠片風格/調色], [構圖規則], 專業攝影, 超銳利對焦, [情緒關鍵詞]
\`\`\`

### 例子：
\`\`\`
美麗女人人像, shot on Hasselblad H6D with 85mm f/1.2, octabox softbox lighting, Kodak Portra 400 aesthetic, rule of thirds composition, 專業攝影, ultra-sharp focus, 寧靜自信
\`\`\`

### 風景掌握公式：
\`\`\`
[地點] 風景, [時間] 燈光, shot on [相機], [天氣條件], [構圖技巧], [色彩處理], 專業自然攝影, 超高解析度
\`\`\`

### 例子：
\`\`\`
山湖風景, golden hour backlighting, shot on Phase One XF, 晨霧氛圍, leading lines perspective, teal and orange color grade, 專業自然攝影, ultra-high resolution
\`\`\`

## 🔍 最大影響力嘅內部貼士

### 關鍵詞堆疊策略：
1. **由主體開始**：清晰主要焦點
2. **加技術規格**：相機/鏡頭可信度
3. **定義燈光**：情緒同質素
4. **指定風格**：美學方向
5. **包含構圖**：專業取景
6. **以質素結尾**：技術卓越

### 強力組合：
- **"shot on" + "with" + "lighting"** = 技術權威
- **"aesthetic" + "color grade" + "mood"** = 風格一致性
- **"composition" + "perspective" + "framing"** = 視覺衝擊
- **"professional" + "ultra" + "high-resolution"** = 質素保證

呢啲秘密關鍵詞係專業攝影師同AI藝術家用嚟創造令人驚嘆、畫廊級作品嘅。掌握呢啲組合，睇住你嘅Midjourney結果即刻從業餘變成專業質素！

## 🎬 Midjourney視頻生成模板

### 🔥 視頻生成模板1：賽博朋克街頭
**第1步 - 創建基礎圖像：**
\`\`\`
cyberpunk street scene, neon-lit alleyway, rain-soaked pavement, 
holographic advertisements, futuristic motorcycle, blade runner aesthetic, 
purple and cyan lighting, volumetric fog --ar 16:9 --q 2
\`\`\`

**第2步 - 視頻提示：**
\`\`\`
neon lights pulsing rhythmically, hologram glitching effects, 
steam rising from manholes, rain drops creating ripples, 
motorcycle headlight cutting through fog, cyberpunk atmosphere
\`\`\`

### ⚡ 視頻生成模板2：魔法森林
**第1步 - 創建基礎圖像：**
\`\`\`
"神秘魔法森林，發光蘑菇散發藍光，
螢火蟲飛舞，古老樹木參天，
魔法粒子在空中飄浮，夢幻氣氛 --ar 16:9 --q 2"
\`\`\`

**第2步 - 視頻提示：**
\`\`\`
"魔法粒子緩慢飄動，螢火蟲優雅飛舞，
蘑菇光芒輕柔脈動，樹葉輕微搖擺，
神秘魔法能量流動，夢幻森林氣氛"
\`\`\`

### 🌊 視頻生成模板3：水下奇幻
**第1步 - 創建基礎圖像：**
\`\`\`
"水下奇幻世界，發光珊瑚礁，
熱帶魚群游泳，陽光從水面穿透，
生物發光效果，深海神秘感 --ar 16:9 --q 2"
\`\`\`

**第2步 - 視頻提示：**
\`\`\`
"魚群優雅游動，陽光束在水中搖擺，
珊瑚輕柔搖動，氣泡緩慢上升，
生物發光脈動，水下平靜動作"
\`\`\`

### 🚀 視頻生成模板4：太空探索
**第1步 - 創建基礎圖像：**
\`\`\`
"太空人在星雲中漂浮，遠處星球發光，
宇宙塵埃閃爍，深空背景，
科幻電影質感，壯觀宇宙景象 --ar 16:9 --q 2"
\`\`\`

**第2步 - 視頻提示：**
\`\`\`
"太空人緩慢旋轉漂浮，星雲雲層流動，
星塵粒子飄散，行星緩慢自轉，
宇宙深度感，零重力優雅動作"
\`\`\`

### 🎭 視頻生成模板5：時尚大片
**第1步 - 創建基礎圖像：**
\`\`\`
"高級時尚模特，前衛服裝設計，
戲劇性燈光，煙霧效果背景，
專業時尚攝影，現代藝術風格 --ar 9:16 --q 2"
\`\`\`

**第2步 - 視頻提示：**
\`\`\`
"服裝優雅飄動，頭髮輕柔搖擺，
煙霧戲劇性流動，燈光變化效果，
時尚動態姿態，高端製作質感"
\`\`\`

## 🎯 視頻生成專業貼士

### 基本視頻提示規則：
1. **從完美圖像開始** - 首先創建高質素基礎圖像
2. **描述視覺衝擊** - 用震撼、驚艷嘅視覺效果
3. **指定酷炫動作** - 爆炸效果、變形、粒子特效
4. **控制視覺強度** - 用形容詞如"戲劇性"、"史詩級"、"震撼"
5. **混合風格元素** - 賽博朋克+自然、魔法+科技
6. **添加特效關鍵詞** - "粒子效果"、"發光"、"閃爍"、"變形"

### 酷炫動作描述關鍵詞：
- **特效動作：** "粒子爆發"、"能量波動"、"光線爆炸"、"變形效果"
- **動態效果：** "螺旋運動"、"爆炸效果"、"漩渦流動"、"閃電效果"
- **視覺衝擊：** "震撼場面"、"史詩級"、"超現實"、"夢幻變化"
- **炫酷移動：** "360度旋轉"、"縮放爆炸"、"時空扭曲"、"瞬移效果"
- **專業質素：** "電影級特效"、"好萊塢製作"、"視覺大片"`
        },
        {
          id: 2,
          title: 'Midjourney Interface Mastery',
          titleCht: 'Midjourney界面精通',
          duration: '35 min',
          durationCht: '35分鐘',
          description: 'Master every button, setting, and hidden feature in Midjourney',
          descriptionCht: '精通Midjourney每個按鈕、設置同隱藏功能',
          videoUrl: '/videos/interface-mastery.mp4',
          isLocked: true,
          textContent: `# Complete Midjourney Interface Mastery Guide

## 🖥️ Web Interface Deep Dive

### The Imagine Bar - Your Creative Command Center
- **Location**: Top of every page when logged in
- **Function**: Primary prompt input for all image generation
- **Pro Tip**: Use Ctrl+Enter (Windows) or Cmd+Enter (Mac) for quick submission
- **Hidden Feature**: Drag and drop images directly into the bar for image prompts

### Create Tab - Your Generation Hub
- **Active Jobs**: See real-time generation progress
- **Queue Position**: Know exactly when your image will start
- **Batch Management**: Generate multiple prompts simultaneously
- **Filter Options**: Sort by date, status, or prompt type

### Explore Tab - Inspiration Goldmine
- **Community Feed**: See trending community creations
- **Search Function**: Find specific styles or subjects
- **Like System**: Save favorites for reference
- **Prompt Viewing**: Click any image to see the exact prompt used

## 🎛️ Generation Control Panel Mastery

### Image Grid Controls (After Generation)
When your 4-image grid appears, master these controls:

#### U Buttons (Upscale) - U1, U2, U3, U4
- **Function**: Creates larger, more detailed version of selected image
- **Best Practice**: Always upscale your favorite before variations
- **Pro Tip**: Upscaled images have better detail for further editing
- **Output**: 1024x1024 to 2048x2048 depending on settings

#### V Buttons (Variations) - V1, V2, V3, V4  
- **Function**: Creates 4 new variations based on selected image
- **Strategy**: Use for exploring different interpretations
- **Tip**: Variations maintain composition but change details
- **Best For**: Finding the perfect version of your concept

#### 🔄 Re-roll Button
- **Function**: Completely regenerates 4 new images from original prompt
- **When to Use**: If none of the 4 images match your vision
- **Cost**: Uses same generation credits as original
- **Strategy**: Try 2-3 re-rolls before modifying prompt

### Advanced Generation Options

#### ⚙️ Settings Menu
Access through the gear icon on any image:

- **Aspect Ratio**: Change without re-prompting
- **Model Version**: Switch between V6, V7, etc.
- **Quality Settings**: Adjust detail level
- **Style Settings**: Modify artistic interpretation

#### 📊 Remix Mode
- **Activation**: Use /prefer remix command
- **Function**: Modify prompts during variations/upscales
- **Power Feature**: Change subjects while keeping composition
- **Example**: Turn "cat" into "dog" while keeping same pose/lighting

## 🔧 Discord Interface Pro Features

### Slash Commands Mastery

#### /imagine - The Foundation
- **Basic**: /imagine [your prompt]
- **With Parameters**: /imagine beautiful sunset --ar 16:9 --v 7
- **Image Prompts**: /imagine [image URL] [text prompt]
- **Multiple Images**: /imagine [URL1] [URL2] [text prompt]

#### /blend - Quick Image Mixing
- **Function**: Combines 2-5 images without text prompts
- **Perfect For**: Style transfers and concept mixing
- **Mobile Friendly**: Easy image upload interface
- **Speed**: Faster than traditional image prompting

#### /describe - Reverse Engineering
- **Function**: Analyzes uploaded image and suggests prompts
- **Learning Tool**: Understand how to describe complex images
- **Strategy**: Use on professional photos to learn techniques
- **Output**: 4 different prompt interpretations

#### /settings - Your Control Panel
Opens interactive menu with:
- **Model Versions**: V6, V7, Niji, etc.
- **Quality Settings**: Base, High quality
- **Speed Modes**: Fast, Relax (for subscribers)
- **Stylization**: Low, Medium, High, Very High

### Advanced Discord Features

#### Direct Messaging the Bot
- **Privacy**: Generate images privately
- **Pro/Mega Only**: Stealth mode for private generations
- **Convenience**: No channel clutter
- **Organization**: Easier to track your specific work

#### Custom Preferences
- **/prefer option**: Set default parameters
- **/prefer suffix**: Add automatic endings to prompts
- **/prefer remix**: Enable remix mode by default
- **Examples**: 
  - \`/prefer option set mine --ar 16:9 --v 7\`
  - \`/prefer suffix --stylize 750 --chaos 10\`

## 🎨 Hidden Features & Pro Tips

### The Seed System
- **What it is**: Unique identifier for each generation
- **Finding Seeds**: React with ✉️ emoji to any image
- **Using Seeds**: Add --seed [number] to recreate similar results
- **Pro Strategy**: Save seeds of successful images for consistency

### Chaos Parameter (--chaos)
- **Range**: 0-100
- **Low Chaos (0-25)**: Consistent, predictable results
- **Medium Chaos (25-75)**: Balanced variation
- **High Chaos (75-100)**: Wild, unpredictable creativity
- **Best Practice**: Start low, increase if results too similar

### Stop Parameter (--stop)
- **Function**: Stops generation at specific percentage
- **Range**: 10-100
- **Creative Use**: --stop 80 for sketchy, unfinished look
- **Speed Hack**: --stop 50 for quick concept testing

### No Parameter (--no)
- **Function**: Tells Midjourney what NOT to include
- **Examples**: --no hands, --no text, --no people
- **Strategy**: Use when unwanted elements keep appearing
- **Powerful**: More effective than describing what you want

## 📱 Mobile Optimization Tips

### Mobile Web Interface
- **Touch Gestures**: Pinch to zoom on generated images
- **Swipe Navigation**: Quick switching between tabs
- **Voice Input**: Use device voice-to-text for prompts
- **Offline Viewing**: Downloaded images work offline

### Discord Mobile App
- **Push Notifications**: Get alerts when generations complete
- **Camera Integration**: Quick photo uploads for image prompts
- **Voice Messages**: Record prompts instead of typing
- **Background Generation**: Jobs continue when app is closed

## 🏆 Power User Workflows

### The Professional Workflow
1. **Concept**: Start with /describe on reference images
2. **Rough Draft**: Use --draft for quick iterations
3. **Refinement**: Apply learned prompts with full quality
4. **Variations**: Explore V buttons on best results
5. **Upscale**: Final high-resolution output
6. **Archive**: Save prompts and seeds for future use

### The Batch Generation Strategy
1. **Queue Multiple**: Submit 3-5 prompts simultaneously
2. **Vary Parameters**: Test different aspect ratios/styles
3. **Monitor Progress**: Use Create tab to track all jobs
4. **Quick Review**: Assess all results before detailed work
5. **Selective Processing**: Only upscale/vary the best results

### The Learning Approach
1. **Daily Practice**: Generate at least 5 images daily
2. **Prompt Library**: Save successful prompts in notes app
3. **Style Study**: Recreate famous artworks/photos
4. **Community Learning**: Study trending images in Explore tab
5. **Parameter Testing**: Systematically test each parameter

Master these interface elements and you'll operate Midjourney like a true professional, maximizing both speed and quality in your creative workflow!`,
          textContentCht: `# Midjourney界面完全精通指南

## 🖥️ 網頁界面深度探索

### Imagine Bar - 你嘅創意指揮中心
- **位置**：登錄後每頁頂部
- **功能**：所有圖像生成嘅主要提示輸入
- **專業貼士**：用Ctrl+Enter (Windows) 或 Cmd+Enter (Mac) 快速提交
- **隱藏功能**：直接拖放圖像到欄位進行圖像提示

### Create標籤 - 你嘅生成中心
- **活躍任務**：實時睇生成進度
- **隊列位置**：準確知道你嘅圖像幾時開始
- **批量管理**：同時生成多個提示
- **篩選選項**：按日期、狀態或提示類型排序

### Explore標籤 - 靈感金礦
- **社群動態**：睇熱門社群創作
- **搜索功能**：搵特定風格或主題
- **點讚系統**：保存最愛作參考
- **提示查看**：點擊任何圖像睇確切使用嘅提示

## 🎛️ 生成控制面板精通

### 圖像網格控制（生成後）
當你嘅4圖網格出現時，掌握呢啲控制：

#### U按鈕（放大）- U1, U2, U3, U4
- **功能**：創建所選圖像嘅更大、更詳細版本
- **最佳實踐**：變化前總係先放大你最鍾意嘅
- **專業貼士**：放大圖像有更好細節供進一步編輯
- **輸出**：1024x1024到2048x2048，視設置而定

#### V按鈕（變化）- V1, V2, V3, V4
- **功能**：基於所選圖像創建4個新變化
- **策略**：用嚟探索不同詮釋
- **貼士**：變化保持構圖但改變細節
- **最適合**：搵你概念嘅完美版本

#### 🔄 重新生成按鈕
- **功能**：從原始提示完全重新生成4張新圖像
- **幾時用**：如果4張圖像都唔符合你嘅願景
- **成本**：使用同原始生成相同嘅積分
- **策略**：修改提示前試2-3次重新生成

### 高級生成選項

#### ⚙️ 設置選單
通過任何圖像上嘅齒輪圖標訪問：

- **長寬比**：無需重新提示就改變
- **模型版本**：在V6、V7等之間切換
- **質素設置**：調整細節級別
- **風格設置**：修改藝術詮釋

#### 📊 混音模式
- **激活**：使用 /prefer remix 指令
- **功能**：在變化/放大期間修改提示
- **強大功能**：保持構圖同時改變主體
- **例子**：保持相同姿勢/燈光同時將"貓"變成"狗"

## 🔧 Discord界面專業功能

### 斜杠指令精通

#### /imagine - 基礎
- **基本**：/imagine [你嘅提示]
- **帶參數**：/imagine beautiful sunset --ar 16:9 --v 7
- **圖像提示**：/imagine [圖像URL] [文字提示]
- **多圖像**：/imagine [URL1] [URL2] [文字提示]

#### /blend - 快速圖像混合
- **功能**：結合2-5張圖像，無需文字提示
- **完美用於**：風格轉換同概念混合
- **手機友好**：簡單圖像上傳界面
- **速度**：比傳統圖像提示更快

#### /describe - 逆向工程
- **功能**：分析上傳圖像並建議提示
- **學習工具**：理解點樣描述複雜圖像
- **策略**：用在專業照片上學習技巧
- **輸出**：4種不同提示詮釋

#### /settings - 你嘅控制面板
打開交互式選單，包含：
- **模型版本**：V6、V7、Niji等
- **質素設置**：基本、高質素
- **速度模式**：快速、放鬆（訂閱者）
- **風格化**：低、中、高、非常高

### Discord高級功能

#### 直接私信機器人
- **私隱**：私下生成圖像
- **僅Pro/Mega**：私人生成嘅隱身模式
- **便利**：無頻道雜亂
- **組織**：更容易追蹤你嘅特定工作

#### 自定義偏好
- **/prefer option**：設置默認參數
- **/prefer suffix**：為提示添加自動結尾
- **/prefer remix**：默認啟用混音模式
- **例子**：
  - \`/prefer option set mine --ar 16:9 --v 7\`
  - \`/prefer suffix --stylize 750 --chaos 10\`

## 🎨 隱藏功能同專業貼士

### 種子系統
- **係咩**：每次生成嘅唯一標識符
- **搵種子**：用✉️表情符號回應任何圖像
- **使用種子**：添加 --seed [數字] 重現相似結果
- **專業策略**：保存成功圖像嘅種子以保持一致性

### 混亂參數 (--chaos)
- **範圍**：0-100
- **低混亂 (0-25)**：一致、可預測結果
- **中等混亂 (25-75)**：平衡變化
- **高混亂 (75-100)**：狂野、不可預測創意
- **最佳實踐**：從低開始，如果結果太相似就增加

### 停止參數 (--stop)
- **功能**：在特定百分比停止生成
- **範圍**：10-100
- **創意用途**：--stop 80 獲得素描、未完成外觀
- **速度技巧**：--stop 50 快速概念測試

### 否定參數 (--no)
- **功能**：告訴Midjourney唔要包含咩
- **例子**：--no hands, --no text, --no people
- **策略**：當不需要嘅元素不斷出現時使用
- **強大**：比描述你想要嘅更有效

## 📱 手機優化貼士

### 手機網頁界面
- **觸摸手勢**：捏合縮放生成圖像
- **滑動導航**：標籤間快速切換
- **語音輸入**：用設備語音轉文字輸入提示
- **離線查看**：下載嘅圖像離線工作

### Discord手機應用
- **推送通知**：生成完成時獲得提醒
- **相機整合**：圖像提示快速上傳照片
- **語音消息**：錄音提示而非打字
- **後台生成**：應用關閉時任務繼續

## 🏆 高級用戶工作流程

### 專業工作流程
1. **概念**：用 /describe 在參考圖像上開始
2. **粗稿**：用 --draft 快速迭代
3. **精煉**：用學到嘅提示應用完整質素
4. **變化**：在最佳結果上探索V按鈕
5. **放大**：最終高解析度輸出
6. **存檔**：保存提示同種子供將來使用

### 批量生成策略
1. **隊列多個**：同時提交3-5個提示
2. **變化參數**：測試不同長寬比/風格
3. **監控進度**：用Create標籤追蹤所有任務
4. **快速審查**：詳細工作前評估所有結果
5. **選擇性處理**：只放大/變化最佳結果

### 學習方法
1. **每日練習**：每日至少生成5張圖像
2. **提示庫**：在筆記應用中保存成功提示
3. **風格研究**：重現著名藝術品/照片
4. **社群學習**：研究Explore標籤中嘅熱門圖像
5. **參數測試**：系統性測試每個參數

掌握呢啲界面元素，你就能像真正專業人士咁操作Midjourney，在創意工作流程中最大化速度同質素！`,
        }
      ]
    },
    {
      id: 2,
      title: 'AI Prompt Engineering Mastery',
      titleCht: 'AI提示工程精通',
      description: 'Learn advanced prompt crafting techniques and secret formulas',
      descriptionCht: '學習高級提示製作技巧同秘密公式',
      lessons: [
        {
          id: 6,
          title: 'Midjourney V7 Revolutionary Features',
          titleCht: 'Midjourney V7革命性功能',
          duration: '50 min',
          durationCht: '50分鐘',
          description: 'Master V7 Draft Mode, Personalization, and Omni-Reference',
          descriptionCht: '精通V7草稿模式、個人化同全方位參考',
          videoUrl: '/videos/v7-features.mp4',
          isLocked: true,
          textContent: `# Midjourney V7 Revolutionary Features

## 🚀 What's New in V7 vs V6.1

V7 represents a massive leap forward in AI image generation:

### Core Improvements
- **Smarter Model**: Enhanced intelligence with superior image quality
- **Better Prompt Understanding**: More accurate interpretation of complex prompts  
- **Improved Image Coherence**: Better consistency across generated variations
- **85% User Preference**: Overwhelming user preference over previous versions

## 🏃‍♂️ Draft Mode (--draft) - 10x Faster Generation

**Revolutionary Speed**: Generate images 10 times faster at 50% lower cost

### When to Use Draft Mode:
- **Quick Composition Testing**: Rapidly test different layouts
- **Brainstorming Sessions**: Generate multiple concepts quickly
- **Client Presentations**: Create rough concepts for approval
- **Creative Exploration**: Experiment with ideas without commitment

### Usage Example:
\`\`\`
/imagine a modern office building --draft
/imagine luxury car interior design --draft --ar 16:9
\`\`\`

### Pro Tips for Draft Mode:
- Perfect for initial concept validation
- Use for rapid iteration cycles
- Ideal for testing prompt variations
- Great for client mood boards

## 🎨 Personalization - AI Learns Your Style

**Game-Changing Feature**: V7 learns your aesthetic preferences automatically

### How Personalization Works:
1. **Rate 200 Images**: Visit the Personalization page on midjourney.com
2. **AI Analysis**: Midjourney analyzes your preferences
3. **Automatic Adjustment**: Future generations match your taste
4. **Continuous Learning**: Gets better with more ratings

### Setting Up Personalization:
1. Log into midjourney.com web interface
2. Navigate to "Personalization" section
3. Start rating images (like/dislike)
4. Watch your results improve automatically

### Learning Benefits:
- **Artistic Growth**: Develop your personal creative style
- **Skill Development**: Master advanced AI art techniques
- **Creative Efficiency**: Learn faster ways to achieve your vision
- **Quality Results**: Create more refined, professional artwork

## 🎯 Omni-Reference (--oref) - Ultimate Control

**Precision Tool**: Reference specific images for composition, style, and color

### Key Parameters:
- **--oref**: Specify reference image URL
- **--ow**: Control reference influence (0-1000)
- **Perfect Integration**: Combine with text prompts seamlessly

### Advanced Usage Examples:
\`\`\`
/imagine a bird flying --oref bird-reference.png --ow 400
/imagine modern kitchen --oref kitchen-style.jpg --ow 600 --ar 16:9
/imagine portrait photography --oref lighting-ref.png --ow 300 --v 7
\`\`\`

### Reference Weight Guidelines:
- **--ow 100-300**: Subtle influence, maintains creativity
- **--ow 400-600**: Balanced reference, good for style matching
- **--ow 700-1000**: Strong influence, close style replication

### Creative Applications:
- **Style Consistency**: Develop your signature artistic style
- **Mood Exploration**: Master different lighting and atmosphere techniques
- **Character Development**: Learn to maintain consistency in creative projects
- **Artistic Growth**: Build a cohesive portfolio of work`,
          textContentCht: `# Midjourney V7革命性功能

## 🚀 V7相比V6.1嘅新功能

V7代表AI圖像生成嘅巨大飛躍：

### 核心改進
- **更聰明嘅模型**：智能增強，圖像品質更高
- **更好嘅提示理解**：更準確理解複雜提示
- **改進嘅圖像連貫性**：生成變化更一致
- **85%用戶偏好**：用戶壓倒性偏好新版本

## 🏃‍♂️ 草稿模式 (--draft) - 10倍速度生成

**革命性速度**：以50%更低成本生成圖像，速度快10倍

### 幾時用草稿模式：
- **快速構圖測試**：快速測試不同佈局
- **腦力激盪會議**：快速生成多個概念
- **客戶演示**：為批准創建粗略概念
- **創意探索**：無需承諾就實驗想法

### 使用例子：
\`\`\`
/imagine 現代辦公大樓 --draft
/imagine 豪華汽車室內設計 --draft --ar 16:9
\`\`\`

### 草稿模式專業貼士：
- 非常適合初始概念驗證
- 用於快速迭代循環
- 測試提示變化嘅理想選擇
- 客戶情緒板嘅好選擇

## 🎨 個人化 - AI學習你嘅風格

**改變遊戲規則嘅功能**：V7自動學習你嘅美學偏好

### 個人化點樣運作：
1. **評分200張圖像**：訪問midjourney.com個人化頁面
2. **AI分析**：Midjourney分析你嘅偏好
3. **自動調整**：未來生成匹配你嘅品味
4. **持續學習**：評分越多效果越好

### 設置個人化：
1. 登錄midjourney.com網頁界面
2. 導航到"個人化"部分
3. 開始評分圖像（喜歡/不喜歡）
4. 觀察你嘅結果自動改進

### 學習好處：
- **藝術成長**：發展你嘅個人創意風格
- **技能發展**：精通高級AI藝術技巧
- **創意效率**：學習更快實現你願景嘅方法
- **優質結果**：創造更精緻、專業嘅藝術品

## 🎯 全方位參考 (--oref) - 終極控制

**精確工具**：參考特定圖像嘅構圖、風格同顏色

### 關鍵參數：
- **--oref**：指定參考圖像URL
- **--ow**：控制參考影響力（0-1000）
- **完美整合**：與文字提示無縫結合

### 高級使用例子：
\`\`\`
/imagine 飛鳥 --oref bird-reference.png --ow 400
/imagine 現代廚房 --oref kitchen-style.jpg --ow 600 --ar 16:9
/imagine 人像攝影 --oref lighting-ref.png --ow 300 --v 7
\`\`\`

### 參考權重指南：
- **--ow 100-300**：微妙影響，保持創造力
- **--ow 400-600**：平衡參考，適合風格匹配
- **--ow 700-1000**：強烈影響，接近風格複製

### 創意應用：
- **風格一致性**：發展你嘅標誌性藝術風格
- **情緒探索**：掌握不同燈光同氛圍技巧
- **角色發展**：學習在創意項目中保持一致性
- **藝術成長**：建立一個有凝聚力嘅作品集`
        },
        {
          id: 7,
          title: 'Image References & Advanced Parameters',
          titleCht: '圖像參考同高級參數',
          duration: '45 min',
          durationCht: '45分鐘',
          description: 'Master image prompts, style references, and professional parameters',
          descriptionCht: '精通圖像提示、風格參考同專業參數',
          videoUrl: '/videos/image-references.mp4',
          isLocked: true,
          textContent: `# Image References & Advanced Parameters

## 🖼️ Using Image References in Midjourney

Image prompts can completely transform your creative workflow by providing visual context alongside text descriptions.

### Image Reference Rules:
1. **Start with Image URL**: Image prompts must begin with the image URL
2. **Two Sources Minimum**: Need either two images OR one image + text
3. **Direct Links Required**: URLs must link directly to online images
4. **Supported Formats**: .png, .gif, .webp, .jpg, .jpeg extensions
5. **Right-Click Method**: Right-click image → "Copy Image Address"

### Professional Image Upload Workflow:
1. **Upload to Discord**: Send image to Midjourney bot first
2. **Get Direct Link**: Bot generates a direct URL
3. **Use in Prompts**: Copy URL for future prompts

### Advanced Image Reference Examples:
\`\`\`
/imagine https://example.com/architecture.jpg modern building design --ar 16:9
/imagine https://example.com/portrait.jpg https://example.com/lighting.jpg professional headshot
/imagine https://example.com/style.jpg luxury product photography --stylize 750
\`\`\`

## 🎨 Style References (--sref) - Precision Style Control

**New Algorithm**: V7's sref is more precise than V6 for defining mood and style

### Style Reference Applications:
- **Brand Consistency**: Maintain visual brand identity
- **Mood Boards**: Create cohesive visual themes
- **Client Matching**: Match existing design aesthetics
- **Series Creation**: Consistent style across multiple images

### Style Reference Examples:
\`\`\`
/imagine portrait photography --sref https://style-ref.jpg --sw 500
/imagine product design --sref https://brand-style.jpg --sw 300 --ar 1:1
/imagine architectural visualization --sref https://mood.jpg --sw 700
\`\`\`

## ⚡ Essential Advanced Parameters

### --stylize (--s) - Creative Freedom Control
- **Range**: 0 to 60,000
- **Low Values (0-100)**: Literal interpretation
- **Medium Values (100-400)**: Balanced creativity
- **High Values (500-1000)**: Artistic interpretation
- **Ultra High (1000+)**: Abstract, highly stylized

### --creative - Unique Output Enhancement
- **Purpose**: Encourages more unique or unusual images
- **Results**: Brighter color schemes, abstract designs
- **Best For**: Artistic projects, creative exploration
- **Usage**: Add --creative to any prompt

### --ar (Aspect Ratio) - Professional Compositions
- **--ar 1:1**: Square (Instagram posts)
- **--ar 16:9**: Widescreen (YouTube thumbnails)
- **--ar 9:16**: Vertical (TikTok, Instagram Stories)
- **--ar 3:2**: Photography standard
- **--ar 4:5**: Instagram portrait posts

## 📱 Mobile-Optimized /blend Command

**Simplified Image Prompting**: Perfect for mobile users

### /blend Advantages:
- **Easy Upload**: Direct upload from phone/computer
- **No URL Required**: Skip the URL copying step
- **Quick Blending**: Combine 2-5 images instantly
- **Mobile Friendly**: Optimized for phone workflows

### /blend Workflow:
1. Type \`/blend\` in Discord
2. Upload images directly (2-5 images)
3. Add optional text prompt
4. Generate blended result

## 🎬 Video Creation with Midjourney V1

**Revolutionary Feature**: Generate short videos up to 21 seconds

### Video Parameters:
- **--motion high**: High movement intensity
- **--motion low**: Subtle movement
- **Duration**: Up to 21 seconds maximum
- **Applications**: Dynamic covers, promotional clips

### Video Creation Examples:
\`\`\`
/imagine ocean waves at sunset --motion high --ar 16:9
/imagine city traffic time-lapse --motion low --ar 9:16
/imagine floating particles abstract --motion high
\`\`\`

## 💡 Instagram-Optimized Creation Tips

### Key Prompt Strategies:
1. **Specific Descriptions**: Avoid vague language, use concrete adjectives
2. **Concise Prompts**: Keep under 60 words for best results
3. **Positive Language**: Use --no parameter instead of negative words
4. **Style References**: Include art styles or photography styles

### Lighting & Mood Techniques:
- **cinematic lighting**: Hollywood-style dramatic lighting
- **studio lighting**: Professional, even illumination
- **golden hour**: Warm, natural sunset/sunrise light
- **soft natural lighting**: Gentle, flattering illumination

### Art Style Applications:
- **digital painting**: Modern digital art aesthetic
- **watercolor**: Soft, flowing artistic style
- **photorealistic**: Camera-like realistic results
- **minimalist**: Clean, simple compositions

### Emotional Atmosphere:
- **serene**: Peaceful, calm feeling
- **dramatic**: High contrast, intense mood
- **nostalgic**: Vintage, memory-like quality
- **vibrant**: Energetic, colorful appearance

## 🏢 Commercial Applications

### Subscription Tiers for Business:
- **Basic ($10/month)**: 3.3 hours fast GPU time
- **Standard ($30/month)**: 15 hours fast + unlimited relax
- **Pro ($60/month)**: 30 hours fast + unlimited relax + stealth mode
- **Mega ($120/month)**: 60 hours fast + unlimited relax + stealth mode

### Additional GPU Hours:
- **Cost**: $4 per hour
- **No Expiration**: Purchased hours never expire
- **Active Subscription Required**: Must maintain valid subscription

### Commercial Rights:
- **Paid Plans**: Full commercial usage rights
- **Portfolio Building**: Create professional portfolios
- **Client Work**: Use for client projects
- **Licensing**: Understand terms for commercial use`,
          textContentCht: `# 圖像參考同高級參數

## 🖼️ 在Midjourney中使用圖像參考

圖像提示可以通過在文字描述旁邊提供視覺上下文，完全改變你嘅創意工作流程。

### 圖像參考規則：
1. **以圖像URL開始**：圖像提示必須以圖像URL開始
2. **最少兩個來源**：需要兩張圖像或一張圖像+文字
3. **需要直接連結**：URL必須直接連結到網上圖像
4. **支援格式**：.png, .gif, .webp, .jpg, .jpeg擴展名
5. **右鍵方法**：右鍵圖像→"複製圖像地址"

### 專業圖像上傳工作流程：
1. **上傳到Discord**：首先將圖像發送給Midjourney機器人
2. **獲取直接連結**：機器人生成直接URL
3. **在提示中使用**：複製URL用於未來提示

### 高級圖像參考例子：
\`\`\`
/imagine https://example.com/architecture.jpg 現代建築設計 --ar 16:9
/imagine https://example.com/portrait.jpg https://example.com/lighting.jpg 專業頭像
/imagine https://example.com/style.jpg 奢華產品攝影 --stylize 750
\`\`\`

## 🎨 風格參考 (--sref) - 精確風格控制

**新算法**：V7嘅sref比V6更精確地定義情緒同風格

### 風格參考應用：
- **品牌一致性**：保持視覺品牌身份
- **情緒板**：創建連貫嘅視覺主題
- **客戶匹配**：匹配現有設計美學
- **系列創作**：多張圖像間一致風格

### 風格參考例子：
\`\`\`
/imagine 人像攝影 --sref https://style-ref.jpg --sw 500
/imagine 產品設計 --sref https://brand-style.jpg --sw 300 --ar 1:1
/imagine 建築可視化 --sref https://mood.jpg --sw 700
\`\`\`

## ⚡ 重要高級參數

### --stylize (--s) - 創意自由控制
- **範圍**：0到60,000
- **低值 (0-100)**：字面解釋
- **中值 (100-400)**：平衡創造力
- **高值 (500-1000)**：藝術解釋
- **超高值 (1000+)**：抽象，高度風格化

### --creative - 獨特輸出增強
- **目的**：鼓勵更獨特或不尋常嘅圖像
- **結果**：更鮮豔嘅配色方案，抽象設計
- **最適合**：藝術項目，創意探索
- **使用**：在任何提示中添加--creative

### --ar (長寬比) - 專業構圖
- **--ar 1:1**：正方形（Instagram帖子）
- **--ar 16:9**：寬屏（YouTube縮略圖）
- **--ar 9:16**：垂直（TikTok，Instagram故事）
- **--ar 3:2**：攝影標準
- **--ar 4:5**：Instagram人像帖子

## 📱 移動優化 /blend 命令

**簡化圖像提示**：非常適合移動用戶

### /blend 優勢：
- **輕鬆上傳**：直接從手機/電腦上傳
- **無需URL**：跳過URL複製步驟
- **快速混合**：即時結合2-5張圖像
- **移動友好**：為手機工作流程優化

### /blend 工作流程：
1. 在Discord中輸入\`/blend\`
2. 直接上傳圖像（2-5張圖像）
3. 添加可選文字提示
4. 生成混合結果

## 🎬 使用Midjourney V1創建影片

**革命性功能**：生成最長21秒嘅短片

### 影片參數：
- **--motion high**：高運動強度
- **--motion low**：微妙運動
- **持續時間**：最長21秒
- **應用**：動態封面，宣傳片段

### 影片創建例子：
\`\`\`
/imagine 日落時嘅海浪 --motion high --ar 16:9
/imagine 城市交通延時攝影 --motion low --ar 9:16
/imagine 漂浮粒子抽象 --motion high
\`\`\`

## 💡 Instagram優化創作貼士

### 關鍵提示策略：
1. **具體描述**：避免模糊語言，使用具體形容詞
2. **簡潔提示**：保持在60字以下效果最好
3. **正面語言**：使用--no參數而不是否定詞
4. **風格參考**：包含藝術風格或攝影風格

### 燈光同情緒技巧：
- **cinematic lighting**：好萊塢風格戲劇性燈光
- **studio lighting**：專業，均勻照明
- **golden hour**：溫暖，自然日落/日出光線
- **soft natural lighting**：溫和，討喜照明

### 藝術風格應用：
- **digital painting**：現代數字藝術美學
- **watercolor**：柔軟，流動藝術風格
- **photorealistic**：相機般逼真結果
- **minimalist**：乾淨，簡單構圖

### 情感氛圍：
- **serene**：平靜，安寧感覺
- **dramatic**：高對比，強烈情緒
- **nostalgic**：復古，記憶般品質
- **vibrant**：充滿活力，豐富多彩外觀

## 🏢 商業應用

### 商業訂閱層級：
- **基礎版 ($10/月)**：3.3小時快速GPU時間
- **標準版 ($30/月)**：15小時快速+無限放鬆
- **專業版 ($60/月)**：30小時快速+無限放鬆+隱身模式
- **超級版 ($120/月)**：60小時快速+無限放鬆+隱身模式

### 額外GPU小時：
- **成本**：每小時$4
- **無過期**：購買嘅小時永不過期
- **需要活躍訂閱**：必須維持有效訂閱

### 商業權利：
- **付費計劃**：完全商業使用權
- **作品集建立**：創建專業作品集
- **客戶工作**：用於客戶項目
- **授權**：了解商業使用條款`
        },
        {
          id: 8,
          title: 'Secret Midjourney Keywords & Tips',
          titleCht: '專業提示工程',
          duration: '40 min',
          durationCht: '40分鐘',
          description: 'Advanced prompt structures and optimization techniques',
          descriptionCht: '高級提示結構同優化技巧',
          videoUrl: '/videos/prompt-engineering.mp4',
          isLocked: true,
          textContent: `# Professional Prompt Engineering

## 🎯 Understanding Midjourney Prompts

A prompt is a short text phrase that the Midjourney Bot interprets to produce an image. The bot breaks down words and phrases into smaller parts called tokens, which are compared against training data to generate images.

### Three Types of Prompts:
1. **Text Prompts**: Written descriptions of desired images
2. **Image Prompts**: Upload images as visual input
3. **Multi-Prompts**: Combine text and image prompts

## 📝 Writing Effective Prompts

### The Golden Rules:
1. **Be Specific and Concise**: Clear, descriptive language works best
2. **Use Descriptive Language**: Rich adjectives and specific nouns
3. **Avoid Ambiguity**: Clear, unambiguous descriptions
4. **Experiment with Keywords**: Test different descriptive terms
5. **Use Prompt Generators**: Leverage tools like ChatGPT for ideas

### Professional Prompt Structure:
**[Subject] + [Style] + [Setting] + [Composition] + [Lighting] + [Parameters]**

### Examples:
\`\`\`
Basic: "a cat"
Professional: "a majestic Maine Coon cat, professional pet photography, studio lighting, shallow depth of field --ar 4:5 --v 7"

Basic: "a house"
Professional: "modern minimalist house, architectural photography, golden hour lighting, clean lines, glass facades --ar 16:9 --stylize 300"
\`\`\`

## 🔧 Advanced Parameter Mastery

### Creative Parameters:
- **--creative**: Encourages unique, unusual outputs
- **--stylize 0-60000**: Controls artistic interpretation
- **--chaos 0-100**: Adds unpredictability to results

### Technical Parameters:
- **--ar**: Aspect ratio control
- **--v**: Version selection (use --v 7 for latest)
- **--q**: Quality settings (0.25, 0.5, 1, 2)
- **--no**: Negative prompts (exclude elements)

### Weight System (::):
Control emphasis of different prompt elements:
\`\`\`
portrait photography::2 dramatic lighting::1 studio setup::0.5
\`\`\`

## 💡 Professional Prompt Templates

### Portrait Photography:
\`\`\`
[Person description], professional portrait photography, [lighting type], [camera specs], [mood/emotion], shot with Canon 5D Mark IV, 85mm lens --ar 4:5 --v 7
\`\`\`

### Product Photography:
\`\`\`
[Product], luxury product photography, studio lighting, white background, high-end commercial style, shot with Phase One camera --ar 1:1 --stylize 200
\`\`\`

### Architectural Visualization:
\`\`\`
[Building type], architectural photography, [time of day], [weather], professional real estate photography, ultra-wide angle lens --ar 16:9 --v 7
\`\`\`

### Digital Art:
\`\`\`
[Subject], digital art, [art style], [color palette], [mood], trending on ArtStation, highly detailed --ar 16:9 --stylize 500
\`\`\`

## 🎨 Style Reference Mastery

### Using Style References:
- **Consistency**: Maintain visual brand across projects
- **Client Matching**: Match existing brand aesthetics
- **Mood Control**: Set specific emotional tones
- **Quality Assurance**: Ensure professional standards

### Style Reference Examples:
\`\`\`
corporate headshot --sref https://brand-style.jpg --sw 400
product design --sref https://luxury-style.jpg --sw 600 --ar 1:1
\`\`\`

## 🚫 Using Negative Prompts Effectively

### Common Negative Prompts:
- **--no blur**: Remove blurriness
- **--no text**: Remove unwanted text
- **--no watermark**: Remove watermarks
- **--no distortion**: Fix distorted features
- **--no low quality**: Ensure high quality

### Professional Negative Prompt Examples:
\`\`\`
portrait photography --no blur, distortion, low quality, amateur
product shot --no shadow, reflection, text, watermark
architectural photography --no people, cars, clutter, overexposure
\`\`\`

## 📊 Prompt Optimization Strategies

### A/B Testing Prompts:
1. **Create Variations**: Test different descriptive words
2. **Parameter Testing**: Try different stylize values
3. **Style Comparison**: Test various art styles
4. **Composition Testing**: Experiment with aspect ratios

### Iterative Improvement:
1. **Start Simple**: Begin with basic prompts
2. **Add Details**: Gradually increase specificity
3. **Refine Parameters**: Adjust technical settings
4. **Document Success**: Keep a library of effective prompts

## 🎯 Industry-Specific Prompt Strategies

### Fashion Photography:
\`\`\`
fashion model, high-end fashion photography, [designer/brand], studio lighting, editorial style, shot for Vogue magazine --ar 4:5 --stylize 300
\`\`\`

### Food Photography:
\`\`\`
[dish name], professional food photography, natural lighting, rustic wooden table, garnish details, shot for cookbook --ar 4:5 --v 7
\`\`\`

### Real Estate:
\`\`\`
luxury [room type], interior design photography, natural lighting, modern furniture, architectural digest style --ar 16:9 --stylize 200
\`\`\`

### Marketing Materials:
\`\`\`
[product/service], marketing photography, lifestyle setting, happy customers, brand colors, commercial advertising style --ar 16:9 --v 7
\`\`\`

## 🔍 Quality Assurance Checklist

### Before Generating:
- [ ] Clear subject definition
- [ ] Appropriate style specified
- [ ] Lighting conditions described
- [ ] Technical parameters set
- [ ] Negative prompts included
- [ ] Aspect ratio optimized

### After Generation:
- [ ] Image quality meets standards
- [ ] Composition is balanced
- [ ] Colors are appropriate
- [ ] Details are sharp and clear
- [ ] Brand guidelines followed
- [ ] Client requirements met

## 💼 Commercial Prompt Applications

### Client Work Best Practices:
1. **Understand Brief**: Clarify client requirements
2. **Brand Consistency**: Use client's visual guidelines
3. **Multiple Options**: Generate several variations
4. **Quality Control**: Ensure professional standards
5. **Usage Rights**: Confirm commercial licensing

### Pricing Considerations:
- **Complexity**: More detailed prompts = higher value
- **Revisions**: Factor in iteration costs
- **Usage Rights**: Commercial vs. personal use
- **Timeline**: Rush jobs command premium pricing

This comprehensive prompt engineering system will transform your Midjourney results from amateur to professional-grade outputs that command premium prices in the marketplace.`,
          textContentCht: `# 專業提示工程

## 🎯 理解Midjourney提示

提示係Midjourney機器人解釋以產生圖像嘅短文字短語。機器人將單詞同短語分解為稱為標記嘅較小部分，與訓練數據進行比較以生成圖像。

### 三種類型嘅提示：
1. **文字提示**：所需圖像嘅書面描述
2. **圖像提示**：上傳圖像作為視覺輸入
3. **多提示**：結合文字同圖像提示

## 📝 撰寫有效提示

### 黃金規則：
1. **具體簡潔**：清晰、描述性語言效果最好
2. **使用描述性語言**：豐富嘅形容詞同具體名詞
3. **避免歧義**：清晰、明確嘅描述
4. **實驗關鍵詞**：測試不同嘅描述術語
5. **使用提示生成器**：利用ChatGPT等工具獲取靈感

### 專業提示結構：
**[主題] + [風格] + [設置] + [構圖] + [燈光] + [參數]**

### 例子：
\`\`\`
基礎："一隻貓"
專業："一隻威嚴嘅緬因貓，專業寵物攝影，工作室燈光，淺景深 --ar 4:5 --v 7"

基礎："一間屋"
專業："現代簡約屋，建築攝影，黃金時段燈光，簡潔線條，玻璃立面 --ar 16:9 --stylize 300"
\`\`\`

## 🔧 高級參數掌握

### 創意參數：
- **--creative**：鼓勵獨特、不尋常嘅輸出
- **--stylize 0-60000**：控制藝術解釋
- **--chaos 0-100**：為結果增加不可預測性

### 技術參數：
- **--ar**：長寬比控制
- **--v**：版本選擇（使用--v 7獲取最新版本）
- **--q**：品質設置（0.25, 0.5, 1, 2）
- **--no**：負面提示（排除元素）

### 權重系統 (::)：
控制不同提示元素嘅重點：
\`\`\`
人像攝影::2 戲劇性燈光::1 工作室設置::0.5
\`\`\`

## 💡 專業提示模板

### 人像攝影：
\`\`\`
[人物描述]，專業人像攝影，[燈光類型]，[相機規格]，[情緒/情感]，用Canon 5D Mark IV拍攝，85mm鏡頭 --ar 4:5 --v 7
\`\`\`

### 產品攝影：
\`\`\`
[產品]，奢華產品攝影，工作室燈光，白色背景，高端商業風格，用Phase One相機拍攝 --ar 1:1 --stylize 200
\`\`\`

### 建築可視化：
\`\`\`
[建築類型]，建築攝影，[時間]，[天氣]，專業房地產攝影，超廣角鏡頭 --ar 16:9 --v 7
\`\`\`

### 數字藝術：
\`\`\`
[主題]，數字藝術，[藝術風格]，[調色板]，[情緒]，在ArtStation上流行，高度詳細 --ar 16:9 --stylize 500
\`\`\`

## 🎨 風格參考掌握

### 使用風格參考：
- **一致性**：在項目中保持視覺品牌
- **客戶匹配**：匹配現有品牌美學
- **情緒控制**：設定特定情感基調
- **品質保證**：確保專業標準

### 風格參考例子：
\`\`\`
企業頭像 --sref https://brand-style.jpg --sw 400
產品設計 --sref https://luxury-style.jpg --sw 600 --ar 1:1
\`\`\`

## 🚫 有效使用負面提示

### 常見負面提示：
- **--no blur**：移除模糊
- **--no text**：移除不需要嘅文字
- **--no watermark**：移除水印
- **--no distortion**：修復扭曲特徵
- **--no low quality**：確保高品質

### 專業負面提示例子：
\`\`\`
人像攝影 --no blur, distortion, low quality, amateur
產品拍攝 --no shadow, reflection, text, watermark
建築攝影 --no people, cars, clutter, overexposure
\`\`\`

## 📊 提示優化策略

### A/B測試提示：
1. **創建變化**：測試不同嘅描述詞
2. **參數測試**：嘗試不同嘅風格化值
3. **風格比較**：測試各種藝術風格
4. **構圖測試**：實驗不同嘅長寬比

### 迭代改進：
1. **從簡單開始**：從基本提示開始
2. **添加細節**：逐漸增加具體性
3. **優化參數**：調整技術設置
4. **記錄成功**：保留有效提示庫

## 🎯 行業特定提示策略

### 時尚攝影：
\`\`\`
時尚模特，高端時尚攝影，[設計師/品牌]，工作室燈光，編輯風格，為Vogue雜誌拍攝 --ar 4:5 --stylize 300
\`\`\`

### 食物攝影：
\`\`\`
[菜名]，專業食物攝影，自然光，質樸木桌，裝飾細節，為食譜書拍攝 --ar 4:5 --v 7
\`\`\`

### 房地產：
\`\`\`
豪華[房間類型]，室內設計攝影，自然光，現代家具，建築文摘風格 --ar 16:9 --stylize 200
\`\`\`

### 營銷材料：
\`\`\`
[產品/服務]，營銷攝影，生活方式設置，快樂客戶，品牌顏色，商業廣告風格 --ar 16:9 --v 7
\`\`\`

## 🔍 品質保證清單

### 生成前：
- [ ] 清晰嘅主題定義
- [ ] 指定適當風格
- [ ] 描述燈光條件
- [ ] 設置技術參數
- [ ] 包含負面提示
- [ ] 優化長寬比

### 生成後：
- [ ] 圖像品質符合標準
- [ ] 構圖平衡
- [ ] 顏色適當
- [ ] 細節清晰銳利
- [ ] 遵循品牌指引
- [ ] 滿足客戶要求

## 🎨 創意提示應用

### 藝術創作最佳實踐：
1. **主題探索**：深入研究你想表達嘅概念
2. **風格一致性**：在系列作品中保持視覺連貫
3. **多重變化**：生成多個版本探索可能性
4. **品質追求**：不斷優化直到滿意
5. **創意記錄**：保存成功嘅提示同設定

### 創意技巧：
- **實驗精神**：嘗試不同組合發現新可能
- **靈感收集**：建立個人創意資料庫
- **風格探索**：研究不同藝術流派同技法
- **持續學習**：跟上AI技術最新發展

呢個全面嘅提示工程系統將幫助你掌握Midjourney嘅創意潛能，創作出令人驚嘆嘅藝術作品。`
        }
      ]
    },
    {
      id: 4,
      title: 'Runway ML Video Creation',
      titleCht: 'Runway ML影片創作',
      description: 'Transform images into dynamic video content',
      descriptionCht: '將圖像轉換為動態影片內容',
      lessons: [
        {
          id: 9,
          title: 'Introduction to Runway ML',
          titleCht: 'Runway ML介紹',
          duration: '30 min',
          durationCht: '30分鐘',
          description: 'Getting started with AI video generation',
          descriptionCht: 'AI影片生成入門',
          videoUrl: '/videos/runway-intro.mp4',
          isLocked: true
        },
        {
          id: 10,
          title: 'Image-to-Video Workflows',
          titleCht: '圖像轉影片工作流程',
          duration: '50 min',
          durationCht: '50分鐘',
          description: 'Converting static images to dynamic videos',
          descriptionCht: '將靜態圖像轉換為動態影片',
          videoUrl: '/videos/image-to-video.mp4',
          isLocked: true
        },
        {
          id: 11,
          title: 'Video Enhancement Techniques',
          titleCht: '影片增強技巧',
          duration: '35 min',
          durationCht: '35分鐘',
          description: 'Professional video editing and enhancement',
          descriptionCht: '專業影片編輯同增強',
          videoUrl: '/videos/video-enhancement.mp4',
          isLocked: true
        }
      ]
    },
    {
      id: 5,
      title: 'Stable Diffusion Workflows',
      titleCht: 'Stable Diffusion工作流程',
      description: 'Advanced control and customization techniques',
      descriptionCht: '高級控制同自定義技巧',
      lessons: [
        {
          id: 12,
          title: 'Local Installation and Setup',
          titleCht: '本地安裝同設置',
          duration: '40 min',
          durationCht: '40分鐘',
          description: 'Setting up Stable Diffusion locally',
          descriptionCht: '本地設置Stable Diffusion',
          videoUrl: '/videos/sd-setup.mp4',
          isLocked: true
        },
        {
          id: 13,
          title: 'ControlNet and Advanced Features',
          titleCht: 'ControlNet同高級功能',
          duration: '55 min',
          durationCht: '55分鐘',
          description: 'Precise control over image generation',
          descriptionCht: '精確控制圖像生成',
          videoUrl: '/videos/controlnet.mp4',
          isLocked: true
        }
      ]
    },
    {
      id: 6,
      title: 'Creative Applications & Art History',
      titleCht: '創意應用同藝術史',
      description: 'Exploring artistic styles and creative applications',
      descriptionCht: '探索藝術風格同創意應用',
      lessons: [
        {
          id: 14,
          title: 'Art History & Style References',
          titleCht: '藝術史同風格參考',
          duration: '25 min',
          durationCht: '25分鐘',
          description: 'Understanding different art movements and styles',
          descriptionCht: '了解不同藝術運動同風格',
          videoUrl: '/videos/art-history.mp4',
          isLocked: true
        },
        {
          id: 15,
          title: 'Building Your Creative Portfolio',
          titleCht: '建立你嘅創意作品集',
          duration: '30 min',
          durationCht: '30分鐘',
          description: 'Organizing and showcasing your AI artwork',
          descriptionCht: '整理同展示你嘅AI藝術作品',
          videoUrl: '/videos/creative-portfolio.mp4',
          isLocked: true
        },
        {
          id: 16,
          title: 'Advanced Creative Techniques',
          titleCht: '高級創意技巧',
          duration: '35 min',
          durationCht: '35分鐘',
          description: 'Mastering advanced artistic techniques and concepts',
          descriptionCht: '掌握高級藝術技巧同概念',
          videoUrl: '/videos/advanced-creativity.mp4',
          isLocked: true
        }
      ]
    }
  ],
  freeBonuses: [
    '50+ Prompt Templates',
    'Style Reference Library',
    'Community Support Forum'
  ],
  freeBonusesCht: [
    '50+提示模板',
    '風格參考庫',
    '社群支援論壇'
  ],
  proBonuses: [
    '200+ Advanced Prompt Templates',
    'Exclusive Style Guide Library',
    'Creative Inspiration Gallery',
    'Art History Reference Guide'
  ],
  proBonusesCht: [
    '200+高級提示模板',
    '獨家風格指南庫',
    '創意靈感畫廊',
    '藝術史參考指南'
  ],
  freePrice: '免費',
  proPrice: 'HK$699',
  originalPrice: 'HK$1,299',
  savings: '46%',
  enrollmentCount: 1847,
  rating: 4.6,
  reviews: 234
};

export const courseDetails = {
  'ai-image-video-creation': aiImageVideoCreationCourse
}; 