/**
 * AI工具數據定義檔案
 * 包含所有AI工具的標準化數據結構和內容
 */

// Tool interface 定義 - 擴展多標籤支援
export interface Tool {
  id: string;
  title: string;
  description: string;
  tag: string; // 保留單一主要標籤用於向後兼容
  tags: string[]; // 新增：多標籤支援
  url: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  categories: string[]; // 新增：多分類支援
  targetAudience: string[];
  userGroups?: string[]; // 新增：用戶群體標籤
}

// 新增工具數據
export const allTools: Tool[] = [
  {
    id: 'lovart-ai',
    title: 'Lovart AI - AI 藝術創作工具',
    description: '一個專注於人工智能藝術創作的工具，可以根據用戶提供的提示快速生成圖像、音樂等各種類型的藝術作品，提供創意靈感和高效的創作方式。',
    tag: 'AI 繪圖', // 主要標籤
    tags: ['AI 繪圖', '音樂生成', '創意工具'], // 多標籤
    url: 'https://www.lovart.ai/home',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Lovart AI Logo',
    category: 'image-design', // 主要分類
    categories: ['image-design', 'audio-voice'], // 多分類
    targetAudience: [
      '設計師',
      '藝術家', 
      '內容創作者',
      '插畫家'
    ],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'lupa-upscaler',
    title: 'Lupa Upscaler - AI 圖像增強工具', 
    description: '一個專業級嘅 AI 圖像與影片增強工具。可以將低解析度嘅圖片或影片升級為高清，並修復舊有或損壞嘅影像細節。',
    tag: '圖像增強',
    tags: ['圖像增強', '影片編輯'],
    url: 'https://app.lupaupscaler.com/',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Lupa Upscaler Logo',
    category: 'image-design',
    categories: ['image-design', 'video-creation'],
    targetAudience: [
      '攝影師',
      '影片製作人',
      '設計師',
      '內容創作者'
    ],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'hedra',
    title: 'Hedra - AI 角色創作平台',
    description: '一個強大嘅 AI 角色創作平台，可以將靜態嘅人像圖片，根據你提供嘅聲音，生成口形同步、表情生動嘅動畫影片。',
    tag: '影片生成',
    tags: ['影片生成', 'AI 虛擬人'],
    url: 'https://www.hedra.com/',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Hedra Logo',
    category: 'video-creation',
    categories: ['video-creation', 'image-design'],
    targetAudience: [
      '影片創作者',
      '數字行銷人員',
      '設計師',
      '藝術家'
    ],
    userGroups: ['content-creator', 'business-professional']
  },
  // === 新增工具批次 2024 ===
  {
    id: 'hailuo-ai-video',
    title: 'Hailuo AI Video (海螺AI) - AI 影片創作平台',
    description: '一個專注於 AI 影片創作和編輯的平台，可以根據文本或圖片，快速生成高質量的短片、廣告或社交媒體影片，並提供自動剪輯、轉場等功能。',
    tag: '影片生成',
    tags: ['影片生成', 'AI 影片'],
    url: 'https://hailuoai.video/',
    imageUrl: '/aitools/hailuo.png',
    imageAlt: 'Hailuo AI Video Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '內容創作者',
      '市場營銷人員',
      '視頻製作人'
    ],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'eleven-labs',
    title: 'Eleven Labs - AI 語音克隆平台',
    description: '一個先進嘅 AI 語音克隆同生成平台，可以根據少量嘅語音樣本，產生出高度逼真嘅人聲，支援多種語言同情感表達。',
    tag: '語音生成',
    tags: ['語音生成', 'AI 語音'],
    url: 'https://elevenlabs.io/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Eleven Labs Logo',
    category: 'audio-voice',
    categories: ['audio-voice', 'content-writing'],
    targetAudience: [
      '內容創作者',
      '播客主',
      '影片製作人'
    ],
    userGroups: ['content-creator', 'media-professional']
  },
  {
    id: 'heygen',
    title: 'HeyGen - AI 虛擬人影片平台',
    description: '一個創新嘅 AI 虛擬人影片創作平台，可以快速製作出由逼真虛擬人物主講嘅影片內容，支援多種語言同風格選擇。',
    tag: 'AI 虛擬人',
    tags: ['AI 虛擬人', '影片生成'],
    url: 'https://www.heygen.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'HeyGen Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '企業培訓部門',
      '內容創作者',
      '市場營銷人員'
    ],
    userGroups: ['enterprise-manager', 'content-creator', 'business-professional']
  },
  {
    id: 'chat4data',
    title: 'Chat4Data - 數據分析對話工具',
    description: '一個智能嘅數據分析對話工具，用戶可以用自然語言提問，AI 會自動分析數據並提供洞察，令數據分析變得更加直觀易用。',
    tag: '數據分析',
    tags: ['數據分析', 'AI 數據'],
    url: 'https://chat4data.com/',
    imageUrl: '/aitools/chat4data.png',
    imageAlt: 'Chat4Data Logo',
    category: 'data-analytics',
    categories: ['data-analytics', 'business-marketing'],
    targetAudience: [
      '數據分析師',
      '商業分析師',
      '企業決策者'
    ],
    userGroups: ['data-analyst', 'enterprise-manager']
  },
  {
    id: 'skyreels-ai',
    title: 'SkyReels AI - 短影片自動生成工具',
    description: '一個專為社交媒體短影片而設計嘅 AI 工具，可以根據用戶提供嘅內容主題，自動生成吸引人嘅短影片，包括配樂、字幕同視覺效果。',
    tag: '短影片生成',
    tags: ['短影片生成', '社交媒體'],
    url: 'https://skyreels.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'SkyReels AI Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '社交媒體經理',
      '內容創作者',
      '數字營銷人員'
    ],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'openai-cookbook',
    title: 'OpenAI Cookbook - AI 開發指南',
    description: '一個官方嘅 OpenAI API 使用指南同範例集合，提供咗大量實用嘅程式碼範例同教學，幫助開發者快速上手 AI 應用開發。',
    tag: 'AI 開發',
    tags: ['AI 開發', '開發工具'],
    url: 'https://cookbook.openai.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'OpenAI Cookbook Logo',
    category: 'development-automation',
    categories: ['development-automation', 'data-analytics'],
    targetAudience: [
      'AI 開發者',
      '軟體工程師',
      '數據科學家'
    ],
    userGroups: ['tech-developer', 'data-analyst']
  },
  {
    id: 'seaweed-apt2',
    title: 'Seaweed APT2 - 高級威脅檢測工具',
    description: '一個先進嘅 AI 驅動網絡安全工具，專門用於檢測同分析高級持續威脅 (APT)，為企業提供全面嘅網絡安全防護。',
    tag: '網絡安全',
    tags: ['網絡安全', 'AI 安全'],
    url: 'https://apt2.seaweedfs.com/',
    imageUrl: '/aitools/seaweed.png',
    imageAlt: 'Seaweed APT2 Logo',
    category: 'data-analytics',
    categories: ['data-analytics', 'development-automation'],
    targetAudience: [
      '網絡安全專家',
      'IT 管理員',
      '企業安全團隊'
    ],
    userGroups: ['tech-developer', 'enterprise-manager']
  },
  {
    id: 'higgsfield-ai',
    title: 'Higgsfield AI - 多模態 AI 創作平台',
    description: '一個集合咗影片生成、圖像創作、音頻合成等多種 AI 功能嘅創作平台，為創作者提供一站式嘅 AI 創作解決方案。',
    tag: '多模態 AI',
    tags: ['多模態 AI', 'AI 影片', 'AI 繪圖', 'AI 音頻'],
    url: 'https://higgsfield.ai/',
    imageUrl: '/aitools/Higgsfield.png',
    imageAlt: 'Higgsfield AI Logo',
    category: 'video-creation',
    categories: ['video-creation', 'image-design', 'audio-voice'],
    targetAudience: [
      '內容創作者',
      '數字藝術家',
      '影片製作人'
    ],
    userGroups: ['content-creator', 'creative-professional']
  },
  {
    id: 'unstable-ml',
    title: 'Unstable ML - 機器學習實驗平台',
    description: '一個為機器學習研究者同開發者設計嘅實驗平台，提供最新嘅 ML 模型同工具，支援快速原型開發同實驗。',
    tag: '機器學習',
    tags: ['機器學習', 'AI 開發'],
    url: 'https://unstable.ml/',
    imageUrl: '/aitools/UnstableML.png',
    imageAlt: 'Unstable ML Logo',
    category: 'development-automation',
    categories: ['development-automation', 'data-analytics'],
    targetAudience: [
      'ML 研究者',
      'AI 工程師',
      '數據科學家'
    ],
    userGroups: ['tech-developer', 'data-analyst']
  },
  {
    id: 'midjourney',
    title: 'Midjourney - AI 圖像生成工具',
    description: '一個領先嘅 AI 圖像生成工具，以其卓越嘅藝術質量同創意表達能力而聞名，特別適合創作概念藝術同插畫作品。',
    tag: 'AI 繪圖',
    tags: ['AI 繪圖', '藝術創作'],
    url: 'https://www.midjourney.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Midjourney Logo',
    category: 'image-design',
    categories: ['image-design'],
    targetAudience: [
      '數字藝術家',
      '概念設計師',
      '插畫家',
      '創意總監'
    ],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'stitch-with-google',
    title: 'Stitch with Google - 創意編程平台',
    description: '一個由 Google 推出嘅創意編程平台，結合咗 AI 同傳統編程，讓用戶可以創作出互動藝術作品同創新應用。',
    tag: '創意編程',
    tags: ['創意編程', 'AI 工具'],
    url: 'https://stitch.google.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Stitch with Google Logo',
    category: 'development-automation',
    categories: ['development-automation', 'image-design'],
    targetAudience: [
      '創意技術專家',
      '互動設計師',
      '前端開發者'
    ],
    userGroups: ['tech-developer', 'creative-professional']
  },
  {
    id: 'dream-machine',
    title: 'Dream Machine - AI 影片生成器',
    description: '一個先進嘅 AI 影片生成工具，可以將靜態圖片轉換成動態影片，或者根據文字描述創建全新嘅影片內容。',
    tag: '影片生成',
    tags: ['影片生成', '圖片轉影片'],
    url: 'https://lumalabs.ai/dream-machine',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Dream Machine Logo',
    category: 'video-creation',
    categories: ['video-creation', 'image-design'],
    targetAudience: [
      '影片創作者',
      '動畫師',
      '視覺藝術家'
    ],
    userGroups: ['content-creator', 'creative-professional']
  },
  {
    id: 'lumen5',
    title: 'Lumen5 - 內容轉影片平台',
    description: '一個 AI 影片創作平台，能將博客文章、白皮書等長篇內容快速轉換為引人入勝的短影片，非常適合在社交媒體上進行內容再利用。',
    tag: '內容轉影片',
    tags: ['內容轉影片', 'AI 影片製作', '社交媒體影片'],
    url: 'https://lumen5.com/',
    imageUrl: 'https://lumen5.com/assets/images/logo/l5-logo-white-text.svg',
    imageAlt: 'Lumen5 Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '內容營銷人員',
      '社交媒體經理',
      '博客作者',
      '市場營銷團隊'
    ],
    userGroups: ['marketer', 'content-creator', 'social-media-user']
  },
  {
    id: 'veed-io',
    title: 'Veed.io - 在線影片編輯器',
    description: '一個功能全面的在線影片編輯器，內置多種 AI 工具，如自動添加字幕、背景噪音消除、影片去雜物等，簡化了影片創作流程。',
    tag: '在線影片編輯',
    tags: ['在線影片編輯', 'AI 字幕', '影片工具'],
    url: 'https://www.veed.io/',
    imageUrl: 'https://www.veed.io/images/veed-logo-symbol-black.svg',
    imageAlt: 'Veed.io Logo',
    category: 'video-creation',
    categories: ['video-creation', 'video-edit', 'ai-video'],
    targetAudience: [
      '內容創作者',
      '教育工作者',
      '小型企業',
      '社交媒體經理'
    ],
    userGroups: ['content-creator', 'teacher', 'business', 'social-media-user']
  },
  {
    id: 'wisecut',
    title: 'Wisecut - AI 智能剪輯工具',
    description: '一款專為長影片設計的 AI 智能剪輯工具，能夠自動識別影片中的精華片段、去除長時間的停頓、添加背景音樂和字幕，快速生成吸引人的短片。',
    tag: '智能剪輯',
    tags: ['智能剪輯', 'AI 影片編輯', '長影片轉短片'],
    url: 'https://www.wisecut.ai/',
    imageUrl: 'https://www.wisecut.ai/static/logo-ddb3c675317a3a99268686a9a08159b9.svg',
    imageAlt: 'Wisecut Logo',
    category: 'video-creation',
    categories: ['video-creation', 'video-edit', 'ai-video'],
    targetAudience: [
      'YouTuber',
      '播客主',
      '在線課程製作者',
      '內容創作者'
    ],
    userGroups: ['content-creator', 'video-creator', 'teacher']
  },
  // === 新增工具批次：影片創作工具 ===
  {
    id: 'opus-pro',
    title: 'Opus Pro - AI 影片再利用工具',
    description: '一個強大的 AI 影片再利用工具，能將一個長影片（如 Podcast、教學影片、演講）自動剪輯成多個病毒式傳播的短片，並為其評分、添加字幕，優化社交媒體發布。',
    tag: '影片再利用',
    tags: ['影片再利用', 'AI 剪輯', '社交媒體影片'],
    url: 'https://www.opus.pro/',
    imageUrl: 'https://www.opus.pro/images/logo-dark.svg',
    imageAlt: 'Opus Pro Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '內容創作者',
      '播客主',
      '數碼營銷機構',
      '社交媒體經理'
    ],
    userGroups: ['content-creator', 'business-professional', 'media-professional']
  },
  {
    id: 'descript',
    title: 'Descript - 多功能影音編輯工具',
    description: '一個集影片和音頻編輯於一體的多功能工具，其獨特之處在於用戶可以像編輯 Word 文檔一樣編輯影片和音頻，同時提供屏幕錄製、轉錄和 AI 語音功能。',
    tag: '影片編輯',
    tags: ['影片編輯', '播客製作', 'AI 轉錄'],
    url: 'https://www.descript.com/',
    imageUrl: 'https://www.descript.com/home/logo-wordmark-descript-white.svg',
    imageAlt: 'Descript Logo',
    category: 'video-creation',
    categories: ['video-creation', 'audio-voice'],
    targetAudience: [
      '播客主',
      'YouTuber',
      '記者',
      '內容創作者'
    ],
    userGroups: ['content-creator', 'media-professional']
  },
  {
    id: 'google-veo',
    title: 'Google Veo - 先進影片生成模型',
    description: '由 Google DeepMind 開發的最先進的影片生成模型，能夠根據文本、圖像和影片提示生成超過一分鐘的高質量 1080p 影片，並能很好地理解電影術語。',
    tag: '影片生成',
    tags: ['影片生成', 'AI 模型', 'Google AI'],
    url: 'https://deepmind.google/models/veo/',
    imageUrl: 'https://deepmind.google/assets/images/deepmind-logo-white.svg',
    imageAlt: 'Google Veo Logo',
    category: 'video-creation',
    categories: ['video-creation', 'development-automation'],
    targetAudience: [
      '電影行業',
      '視覺特效藝術家',
      '創意專業人士',
      '影片創作者'
    ],
    userGroups: ['content-creator', 'creative-professional', 'tech-developer']
  },
  {
    id: 'pipio',
    title: 'Pipio - 虛擬化身影片平台',
    description: '一個專注於創建超逼真虛擬化身的 AI 影片平台。用戶可以輸入文本，讓數字人以自然的口型和動作進行播報，適合用於新聞、企業通訊等場景。',
    tag: '虛擬化身',
    tags: ['虛擬化身', '數字人', 'AI 影片'],
    url: 'https://app.pipio.ai/',
    imageUrl: 'https://app.pipio.ai/assets/pipio-99882a87.png',
    imageAlt: 'Pipio Logo',
    category: 'video-creation',
    categories: ['video-creation', 'business-marketing'],
    targetAudience: [
      '企業通訊部門',
      '新聞機構',
      '內容創作者',
      '市場營銷團隊'
    ],
    userGroups: ['enterprise-manager', 'media-professional', 'content-creator', 'business-professional']
  },
  {
    id: 'revid',
    title: 'Revid - AI 影片創作平台',
    description: '一個 AI 影片創作平台，專注於將您的想法、文章或提示轉化為帶有 AI 生成的畫外音和視覺效果的影片。它簡化了從概念到成品的影片製作過程。',
    tag: 'AI 影片創作',
    tags: ['AI 影片創作', '文本轉影片', '自動化內容'],
    url: 'https://www.revid.ai/',
    imageUrl: 'https://www.revid.ai/_next/image?url=%2Flogo_light.png&w=256&q=75',
    imageAlt: 'Revid Logo',
    category: 'video-creation',
    categories: ['video-creation', 'content-writing'],
    targetAudience: [
      '內容營銷人員',
      '社交媒體經理',
      '小型企業主',
      '內容創作者'
    ],
    userGroups: ['business-professional', 'content-creator', 'enterprise-manager']
  },
  // === 新增工具批次：音頻 & 語音工具 ===
  {
    id: 'murf-ai',
    title: 'Murf.ai - AI 文本轉語音生成器',
    description: '一個多功能的 AI 文本轉語音生成器，提供大量聽起來非常自然的人聲選擇，支持多種語言和口音，可用於製作畫外音、播客和電子學習材料。',
    tag: '文本轉語音',
    tags: ['文本轉語音', 'AI 語音', '畫外音'],
    url: 'https://murf.ai/',
    imageUrl: 'https://murf.ai/resources/media/murf_logo_white.svg',
    imageAlt: 'Murf.ai Logo',
    category: 'audio-voice',
    categories: ['audio-voice', 'content-writing'],
    targetAudience: [
      '影片製作者',
      '播客主',
      '產品經理',
      '教育工作者'
    ],
    userGroups: ['content-creator', 'media-professional', 'educator', 'data-analyst']
  },
  {
    id: 'otter-ai',
    title: 'Otter.ai - AI 語音轉文字工具',
    description: '一個利用 AI 技術提供實時語音轉文字服務的工具，能夠準確地轉錄會議、訪談和講座，並能識別不同的發言者，方便整理會議記錄。',
    tag: '語音轉文字',
    tags: ['語音轉文字', '會議記錄', 'AI 轉錄'],
    url: 'https://otter.ai/',
    imageUrl: 'https://otter.ai/images/logomark.svg',
    imageAlt: 'Otter.ai Logo',
    category: 'audio-voice',
    categories: ['audio-voice', 'productivity-tools'],
    targetAudience: [
      '企業團隊',
      '記者',
      '學生',
      '項目經理'
    ],
    userGroups: ['enterprise-manager', 'media-professional', 'educator', 'data-analyst']
  },
  {
    id: 'cleanvoice-ai',
    title: 'Cleanvoice.ai - AI 音頻編輯工具',
    description: '一款專為播客和音頻創作者設計的 AI 工具，能自動編輯音頻，去除填充詞（如 "呃"、"嗯"）、口吃和長時間的靜音，讓音頻聽起來更專業流暢。',
    tag: '音頻編輯',
    tags: ['音頻編輯', '播客工具', '噪音消除'],
    url: 'https://cleanvoice.ai/',
    imageUrl: 'https://cleanvoice.ai/logo.svg',
    imageAlt: 'Cleanvoice.ai Logo',
    category: 'audio-voice',
    categories: ['audio-voice'],
    targetAudience: [
      '播客主',
      '音頻編輯師',
      '內容創作者',
      '記者'
    ],
    userGroups: ['content-creator', 'media-professional']
  },
  {
    id: 'fireflies-ai',
    title: 'Fireflies.ai - AI 會議助手',
    description: '一個 AI 會議助手，能自動加入您的線上會議（如 Zoom, Google Meet），進行錄音、轉錄和總結。它能提取關鍵詞、行動項目和會議重點，大大提高會議效率。',
    tag: '會議助手',
    tags: ['會議助手', 'AI 轉錄', '任務管理'],
    url: 'https://fireflies.ai/',
    imageUrl: 'https://fireflies.ai/images/logo-icon.svg',
    imageAlt: 'Fireflies.ai Logo',
    category: 'productivity-tools',
    categories: ['productivity-tools', 'audio-voice'],
    targetAudience: [
      '項目經理',
      '銷售團隊',
      '任何需要開會的專業人士',
      '企業團隊'
    ],
    userGroups: ['data-analyst', 'business-professional', 'enterprise-manager']
  },
  {
    id: 'riverside',
    title: 'Riverside - 高品質遠程錄製平台',
    description: '一個高品質的遠程錄音和錄影平台，專為播客和訪談設計。它在本地錄製每個參與者的音視頻，確保即使網絡不穩定也能獲得錄音室質量的文件。',
    tag: '遠程錄製',
    tags: ['遠程錄製', '播客製作', '高清錄影'],
    url: 'https://riverside.com/',
    imageUrl: 'https://cdn.prod.website-files.com/6294d5053646d6540c11713d/6294d5053646d66e74117163_logo-2-layers.svg',
    imageAlt: 'Riverside Logo',
    category: 'audio-voice',
    categories: ['audio-voice', 'video-creation'],
    targetAudience: [
      '播客主',
      '媒體公司',
      '企業營銷團隊',
      '內容創作者'
    ],
    userGroups: ['content-creator', 'media-professional', 'business-professional']
  },
  // === 新增工具批次：設計 & 圖像工具 ===
  {
    id: 'canva',
    title: 'Canva - AI 設計平台',
    description: '一個非常受歡迎的在線設計平台，提供海量模板和易於使用的拖放界面。其「Magic Studio」集成了多種 AI 功能，如文本生成圖像、AI 寫作和智能設計建議。',
    tag: '平面設計',
    tags: ['平面設計', '模板', 'AI 設計'],
    url: 'https://www.canva.com/',
    imageUrl: 'https://static.canva.com/static/images/canva_logo_wordmark_white_v2.svg',
    imageAlt: 'Canva Logo',
    category: 'image-design',
    categories: ['image-design', 'productivity-tools'],
    targetAudience: [
      '所有人',
      '市場營銷人員',
      '學生',
      '小型企業'
    ],
    userGroups: ['creative-professional', 'business-professional', 'educator', 'productivity-user']
  },
  {
    id: 'gamma',
    title: 'Gamma - AI 演示文稿生成器',
    description: '一個利用 AI 快速生成演示文稿、文檔和網頁的創新工具。用戶只需提供一個主題，Gamma 就能自動創建出設計精美、內容完整的初稿，極大提升效率。',
    tag: '演示文稿',
    tags: ['演示文稿', 'AI 生成', '文件設計'],
    url: 'https://gamma.app/',
    imageUrl: 'https://gamma.app/gamma-logo.png',
    imageAlt: 'Gamma Logo',
    category: 'productivity-tools',
    categories: ['productivity-tools', 'content-writing'],
    targetAudience: [
      '顧問',
      '創始人',
      '教育工作者',
      '學生'
    ],
    userGroups: ['business-professional', 'enterprise-manager', 'educator']
  },
  {
    id: 'beautiful-ai',
    title: 'Beautiful.ai - 智能簡報製作工具',
    description: '一款專注於自動化設計的演示文稿製作工具。它利用 AI 智能地為用戶佈局幻燈片，確保設計的一致性和美觀性，讓用戶專注於內容而非格式。',
    tag: '演示文稿',
    tags: ['演示文稿', '智能設計', '簡報製作'],
    url: 'https://www.beautiful.ai/',
    imageUrl: 'https://www.beautiful.ai/img/beautiful-ai-logo-2023-white.svg',
    imageAlt: 'Beautiful.ai Logo',
    category: 'productivity-tools',
    categories: ['productivity-tools', 'image-design'],
    targetAudience: [
      '企業顧問',
      '銷售人員',
      '任何需要製作專業簡報的人',
      '市場營銷人員'
    ],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'adcreative-ai',
    title: 'Adcreative.ai - AI 廣告創意平台',
    description: '一個專為廣告商設計的 AI 平台，能夠快速生成大量高轉化率的廣告創意，包括圖片、文案和影片。它能分析品牌數據以提供最有效的設計。',
    tag: '廣告創意',
    tags: ['廣告創意', 'AI 設計', '市場營銷'],
    url: 'https://www.adcreative.ai/',
    imageUrl: 'https://www.adcreative.ai/assets/img/logo-white.svg',
    imageAlt: 'Adcreative.ai Logo',
    category: 'business-marketing',
    categories: ['business-marketing', 'image-design'],
    targetAudience: [
      '廣告人員',
      '電商品牌',
      '數碼營銷機構',
      '市場營銷人員'
    ],
    userGroups: ['business-professional']
  },
  {
    id: 'remove-bg',
    title: 'remove.bg - AI 圖像去背工具',
    description: '一個非常簡單易用的在線工具，使用 AI 技術可以在 5 秒內自動去除任何圖像的背景，效果精準快速。',
    tag: '圖像去背',
    tags: ['圖像去背', 'AI 圖像編輯', '在線工具'],
    url: 'https://www.remove.bg/zh',
    imageUrl: 'https://www.remove.bg/images/logo/remove-bg-logo-white.svg',
    imageAlt: 'remove.bg Logo',
    category: 'image-design',
    categories: ['image-design', 'productivity-tools'],
    targetAudience: [
      '設計師',
      '電商賣家',
      '社交媒體用戶',
      '攝影師'
    ],
    userGroups: ['creative-professional', 'business-professional', 'productivity-user']
  },
  {
    id: 'lummi-ai',
    title: 'Lummi.ai - AI 圖片庫',
    description: '提供大量由 AI 生成的、免版稅的高質量圖片庫。與傳統圖庫不同，這裡的圖片都是獨一無二的，為創作者提供了新的視覺資源選擇。',
    tag: 'AI 圖片',
    tags: ['AI 圖片', '免版稅圖庫', '圖像資源'],
    url: 'https://www.lummi.ai/',
    imageUrl: 'https://www.lummi.ai/images/lummi-logo-header.svg',
    imageAlt: 'Lummi.ai Logo',
    category: 'image-design',
    categories: ['image-design', 'content-writing'],
    targetAudience: [
      '設計師',
      '內容創作者',
      '市場營銷人員',
      '博客作者'
    ],
    userGroups: ['creative-professional', 'content-creator', 'business-professional']
  },
  {
    id: 'lightfield',
    title: 'Lightfield - AI 圖像影片創作平台',
    description: '一個 AI 驅動的圖像和影片創作平台。它提供先進的生成模型，用戶可以通過文本提示創建高質量的視覺內容，專注於生成逼真且富有藝術感的圖像。',
    tag: '圖像生成',
    tags: ['圖像生成', '影片生成', 'AI 藝術'],
    url: 'https://lightfield.app/',
    imageUrl: 'https://lightfield.app/logo.svg',
    imageAlt: 'Lightfield Logo',
    category: 'image-design',
    categories: ['image-design', 'video-creation'],
    targetAudience: [
      '數字藝術家',
      '設計師',
      '廣告創意人員',
      '藝術家'
    ],
    userGroups: ['creative-professional', 'content-creator']
  },
  // === 新增工具批次：社交媒體 & 營銷工具 ===
  {
    id: 'taplio',
    title: 'Taplio - LinkedIn 增長工具',
    description: '一個專為 LinkedIn 內容創作和增長設計的 AI 工具。它可以幫助用戶尋找熱門話題、撰寫帖子、安排發布時間，並分析表現，以建立個人品牌。',
    tag: 'LinkedIn',
    tags: ['LinkedIn', '社交媒體管理', '個人品牌'],
    url: 'https://taplio.com/',
    imageUrl: 'https://taplio.com/logo-light.svg',
    imageAlt: 'Taplio Logo',
    category: 'business-marketing',
    categories: ['business-marketing', 'content-writing'],
    targetAudience: [
      '企業家',
      '顧問',
      '尋求職業發展的專業人士',
      '銷售人員'
    ],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'tweet-hunter',
    title: 'Tweet Hunter - Twitter (X) 增長工具',
    description: '專為 Twitter (X) 設計的增長工具，提供 AI 寫作、帖子排程、自動化互動和靈感庫等功能，旨在幫助用戶快速增長粉絲和影響力。',
    tag: 'Twitter (X)',
    tags: ['Twitter (X)', '社交媒體增長', '內容創作'],
    url: 'https://tweethunter.io/',
    imageUrl: 'https://tweethunter.io/logo-light.svg',
    imageAlt: 'Tweet Hunter Logo',
    category: 'business-marketing',
    categories: ['business-marketing', 'content-writing'],
    targetAudience: [
      'Twitter (X) 創作者',
      '創始人',
      '數碼營銷人員',
      '內容創作者'
    ],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'aicarousels',
    title: 'aicarousels.com - 社交媒體輪播圖生成器',
    description: '一個專門用來快速創建社交媒體輪播圖 (Carousels) 的 AI 工具。用戶只需輸入主題或文本，AI 就能自動生成設計精美的輪播圖，非常適合在 Instagram 和 LinkedIn 上發布。',
    tag: '社交媒體設計',
    tags: ['社交媒體設計', '輪播圖', 'Instagram 營銷'],
    url: 'https://www.aicarousels.com/',
    imageUrl: 'https://www.aicarousels.com/logo_light.svg',
    imageAlt: 'aicarousels.com Logo',
    category: 'image-design',
    categories: ['image-design', 'business-marketing'],
    targetAudience: [
      '社交媒體經理',
      '品牌顧問',
      '內容創作者',
      '市場營銷人員'
    ],
    userGroups: ['business-professional', 'content-creator', 'creative-professional']
  },
  {
    id: 'magnetly',
    title: 'Magnetly - 潛在客戶磁鐵生成器',
    description: '一個 AI 工具，專門幫助教練、顧問和創作者將他們的知識轉化為高價值的潛在客戶磁鐵 (Lead Magnets)，如電子書、指南等，以吸引目標客戶。',
    tag: '潛在客戶開發',
    tags: ['潛在客戶開發', '電子書生成', '市場營銷'],
    url: 'https://www.magnetly.co/',
    imageUrl: 'https://uploads-ssl.webflow.com/65267b2be4f0081d6d56b85e/65267d3b519e48604344a8e8_Logo.svg',
    imageAlt: 'Magnetly Logo',
    category: 'business-marketing',
    categories: ['business-marketing', 'content-writing'],
    targetAudience: [
      '教練',
      '顧問',
      '課程創作者',
      '企業家'
    ],
    userGroups: ['business-professional', 'content-creator', 'enterprise-manager']
  },
  // === 新增工具批次：開發 & 自動化工具 ===
  {
    id: 'cursor',
    title: 'Cursor - AI 代碼編輯器',
    description: '一款專為與 AI 協作而設計的代碼編輯器。它深度集成了 AI 功能，可以幫助開發者更快地編寫、理解和重構代碼，被稱為「AI 優先的 VS Code」。',
    tag: '代碼編輯器',
    tags: ['代碼編輯器', 'AI 編程', '開發工具'],
    url: 'https://cursor.com/cn',
    imageUrl: 'https://cursor.com/brand/logo-white.svg',
    imageAlt: 'Cursor Logo',
    category: 'development-automation',
    categories: ['development-automation'],
    targetAudience: [
      '軟件開發者',
      '程序員',
      'AI 工程師',
      '技術團隊'
    ],
    userGroups: ['tech-developer']
  },
  {
    id: 'bardeen',
    title: 'Bardeen - 瀏覽器自動化工具',
    description: '一款強大的瀏覽器自動化工具，它使用 AI 來幫助你自動化重複性的手動任務。無需編程，即可創建工作流程，例如抓取網站數據、發送自動消息等。',
    tag: '工作流程自動化',
    tags: ['工作流程自動化', '效率工具', '數據抓取'],
    url: 'https://www.bardeen.ai/',
    imageUrl: 'https://www.bardeen.ai/images/logos/bardeen-logo-with-text-white.svg',
    imageAlt: 'Bardeen Logo',
    category: 'development-automation',
    categories: ['development-automation', 'productivity-tools'],
    targetAudience: [
      '創始人',
      '營銷人員',
      '任何希望提高生產力的人',
      '小型企業主'
    ],
    userGroups: ['business-professional', 'productivity-user', 'enterprise-manager']
  },
  {
    id: 'zapier',
    title: 'Zapier - 應用集成自動化平台',
    description: '領先的在線自動化工具，可以連接數千個不同的應用程序（如 Gmail, Slack, HubSpot），讓它們協同工作。用戶可以創建 "Zaps" 來自動化工作流程，無需編寫任何代碼。',
    tag: '自動化',
    tags: ['自動化', '應用集成', '工作流程'],
    url: 'https://zapier.com/',
    imageUrl: 'https://zapier.com/cdn/images/logo-zapier-white-fill.svg',
    imageAlt: 'Zapier Logo',
    category: 'development-automation',
    categories: ['development-automation', 'productivity-tools'],
    targetAudience: [
      '企業',
      '營銷團隊',
      '任何使用多個網絡應用的人',
      '項目經理'
    ],
    userGroups: ['business-professional', 'data-analyst', 'productivity-user', 'enterprise-manager']
  },
  {
    id: 'threejs',
    title: 'three.js - 3D 圖形 JavaScript 庫',
    description: '一個跨瀏覽器的 JavaScript 庫和 API，用於在網頁瀏覽器中創建和顯示動畫 3D 計算機圖形。它極大地簡化了 WebGL 的使用。',
    tag: '3D 圖形',
    tags: ['3D 圖形', 'WebGL', 'JavaScript 庫'],
    url: 'https://threejs.org/',
    imageUrl: 'https://threejs.org/files/logo.svg',
    imageAlt: 'three.js Logo',
    category: 'development-automation',
    categories: ['development-automation', 'image-design'],
    targetAudience: [
      'Web 開發者',
      '創意技術專家',
      '3D 藝術家',
      '遊戲開發者'
    ],
    userGroups: ['tech-developer', 'creative-professional']
  },
  // === 新增工具批次：其他 & 多功能工具 ===
  {
    id: 'durable',
    title: 'Durable - AI 網站建設平台',
    description: '一個 AI 網站建設平台，號稱可以在 30 秒內為任何企業生成一個帶有文案、圖片和聯繫表單的完整網站。它還提供 CRM 和發票等小型企業工具。',
    tag: '網站建設',
    tags: ['網站建設', 'AI 建站', '小型企業'],
    url: 'https://durable.co/',
    imageUrl: 'https://durable.co/assets/logo-light-682ac159.svg',
    imageAlt: 'Durable Logo',
    category: 'development-automation',
    categories: ['development-automation', 'business-marketing'],
    targetAudience: [
      '小型企業主',
      '自由職業者',
      '創業者',
      '任何需要快速建站的人'
    ],
    userGroups: ['enterprise-manager', 'business-professional', 'productivity-user']
  },
  {
    id: 'reccloud',
    title: 'RecCloud - 雲端錄屏編輯平台',
    description: '一個集屏幕錄製、影片編輯和雲端存儲於一體的在線平台。它利用 AI 提供自動字幕、影片摘要和智能編輯等功能，方便用戶快速創建和分享影片內容。',
    tag: '屏幕錄製',
    tags: ['屏幕錄製', '雲端存儲', 'AI 影片編輯'],
    url: 'https://reccloud.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'RecCloud Logo',
    category: 'video-creation',
    categories: ['video-creation', 'productivity-tools'],
    targetAudience: [
      '教師',
      '產品經理',
      '遊戲玩家',
      '任何需要錄屏的人'
    ],
    userGroups: ['educator', 'data-analyst', 'productivity-user', 'content-creator']
  },
  {
    id: 'seobot-ai',
    title: 'SEOBOT.ai - AI SEO 分析工具',
    description: '一個利用 AI 進行網站 SEO（搜索引擎優化）分析的工具。它可以審核網站的技術問題、關鍵詞排名和內容質量，並提供可行的優化建議以提升 Google 排名。',
    tag: 'SEO',
    tags: ['SEO', '網站分析', '搜索引擎優化'],
    url: 'https://seobotai.com/',
    imageUrl: 'https://seobotai.com/wp-content/uploads/2023/12/logo-light-1.svg',
    imageAlt: 'SEOBOT.ai Logo',
    category: 'data-analytics',
    categories: ['data-analytics', 'business-marketing'],
    targetAudience: [
      'SEO 專業人員',
      '網站管理員',
      '數碼營銷人員',
      '企業主'
    ],
    userGroups: ['data-analyst', 'business-professional', 'tech-developer', 'enterprise-manager']
  },
  {
    id: 'chipp-ai',
    title: 'Chipp.ai - 無代碼聊天機器人平台',
    description: '一個讓非開發者也能輕鬆構建和部署自己 GPT 驅動的聊天機械人的平台。它提供了一個無代碼界面，可以將機械人嵌入網站或應用中，並管理其使用情況。',
    tag: '聊天機械人',
    tags: ['聊天機械人', '無代碼', 'GPT'],
    url: 'https://chipp.ai/',
    imageUrl: 'https://uploads-ssl.webflow.com/642f3a6a12b86e06b325251a/642f4007b036f634515152fa_Logo-White.svg',
    imageAlt: 'Chipp.ai Logo',
    category: 'development-automation',
    categories: ['development-automation', 'business-marketing'],
    targetAudience: [
      '創業者',
      '產品經理',
      '希望使用 AI 的小型企業',
      '客服團隊'
    ],
    userGroups: ['enterprise-manager', 'data-analyst', 'business-professional']
  }
];

// 導出工具類別定義 - 優化合併後的功能分類 (8個核心分類)
export const toolCategories = [
  { id: 'all', label: '全部工具', labelEn: 'All Tools' },
  { id: 'video-creation', label: '影片生成 / 編輯', labelEn: 'Video Creation & Editing' },
  { id: 'image-design', label: 'AI 圖像 / 插畫', labelEn: 'AI Image & Design' },
  { id: 'audio-voice', label: '音頻 / 語音', labelEn: 'Audio & Voice' },
  { id: 'content-writing', label: '內容 / 寫作', labelEn: 'Content & Writing' },
  { id: 'business-marketing', label: '商業 / 營銷', labelEn: 'Business & Marketing' },
  { id: 'development-automation', label: '開發 / 自動化', labelEn: 'Development & Automation' },
  { id: 'data-analytics', label: '數據 / 分析', labelEn: 'Data & Analytics' },
  { id: 'productivity-tools', label: '效率 / 多功能', labelEn: 'Productivity & Multi-tools' }
];

// 新增：用戶群體標籤分類 - 優化合併後的用戶角色 (10個核心群體)
export const userGroupCategories = [
  { id: 'all-users', label: '全部用戶', labelEn: 'All Users', icon: '👥' },
  
  // 🎨 創意設計類 (Creative & Design)
  { id: 'creative-professional', label: '創意設計師', labelEn: 'Creative & Design Professionals', icon: '🎨' },
  
  // 🎬 內容創作類 (Content Creation)  
  { id: 'content-creator', label: '內容創作者', labelEn: 'Content Creators', icon: '🎬' },
  
  // 💼 商業營銷類 (Business & Marketing)
  { id: 'business-professional', label: '商業營銷人員', labelEn: 'Business & Marketing Professionals', icon: '💼' },
  
  // 💻 技術開發類 (Tech & Development)
  { id: 'tech-developer', label: '技術開發者', labelEn: 'Tech & Development Professionals', icon: '💻' },
  
  // 📊 數據分析類 (Data & Analytics)
  { id: 'data-analyst', label: '數據分析相關', labelEn: 'Data & Analytics Professionals', icon: '📊' },
  
  // 🎓 教育培訓類 (Education & Training)
  { id: 'educator', label: '教育培訓人員', labelEn: 'Education & Training Professionals', icon: '🎓' },
  
  // 📰 媒體傳播類 (Media & Communication)
  { id: 'media-professional', label: '媒體傳播人員', labelEn: 'Media & Communication Professionals', icon: '📰' },
  
  // 🏢 企業管理類 (Enterprise Management)
  { id: 'enterprise-manager', label: '企業管理者', labelEn: 'Enterprise Managers', icon: '🏢' },
  
  // 🚀 個人效率類 (Personal Productivity)
  { id: 'productivity-user', label: '效率提升用戶', labelEn: 'Productivity Users', icon: '🚀' },
  
  // 保留一些具體角色以保持向後兼容
  { id: 'designer', label: '設計師', labelEn: 'Designers', icon: '🎨' },
  { id: 'marketer', label: '營銷人員', labelEn: 'Marketers', icon: '📈' },
  { id: 'developer', label: '開發者', labelEn: 'Developers', icon: '👨‍💻' },
  { id: 'business', label: '商業人士', labelEn: 'Business Professionals', icon: '💼' }
];

// 工具計數統計
export const getToolsCount = () => ({
  total: allTools.length,
  byCategory: {
    design: allTools.filter(tool => tool.category === 'design').length,
    data: allTools.filter(tool => tool.category === 'data').length,
    video: allTools.filter(tool => tool.category === 'video').length,
    marketing: allTools.filter(tool => tool.category === 'marketing').length,
  }
}); 