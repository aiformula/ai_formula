/**
 * AI工具數據定義檔案
 * 包含所有AI工具的標準化數據結構和內容
 * 總計：101個AI工具，統一分類系統
 */

// Tool interface 定義 - 擴展多標籤支援
export interface Tool {
  id: string;
  title: string;
  titleEn?: string; // 新增：英文標題
  description: string;
  descriptionEn?: string; // 新增：英文描述
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

// 優化後的8個工具類型分類系統（合併相似分類）
export const toolCategories = [
  { id: 'all', label: '全部工具', labelEn: 'All Tools' },
  { id: 'ai-drawing', label: 'AI繪圖設計', labelEn: 'AI Drawing & Design' },
  { id: 'video-content', label: '影片相關', labelEn: 'Video Content' }, // 合併：影片生成 + 影片編輯
  { id: 'image-editing', label: '圖片編輯', labelEn: 'Image Editing' },
  { id: 'ai-avatar', label: 'AI虛擬人', labelEn: 'AI Avatar & Character' },
  { id: 'audio-music', label: '音樂音頻', labelEn: 'Audio & Music' }, // 合併：音樂生成 + 音頻處理
  { id: 'text-content', label: '文字內容', labelEn: 'Text & Content' }, // 合併：文案創作 + 簡報圖表
  { id: 'business-tools', label: '商業工具', labelEn: 'Business Tools' }, // 合併：商業分析 + AI助手 + 開發工具
  { id: 'creative-others', label: '創意其他', labelEn: 'Creative & Others' } // 合併：創意工具 + 其他
];

// 優化的用戶群體分類（保持原有10個核心群體）
export const userGroupCategories = [
  { id: 'all-users', label: '全部用戶', labelEn: 'All Users', icon: '👥' },
  { id: 'creative-professional', label: '創意設計師', labelEn: 'Creative & Design Professionals', icon: '🎨' },
  { id: 'content-creator', label: '內容創作者', labelEn: 'Content Creators', icon: '🎬' },
  { id: 'business-professional', label: '商業營銷人員', labelEn: 'Business & Marketing Professionals', icon: '💼' },
  { id: 'tech-developer', label: '技術開發者', labelEn: 'Tech & Development Professionals', icon: '💻' },
  { id: 'data-analyst', label: '數據分析相關', labelEn: 'Data & Analytics Professionals', icon: '📊' },
  { id: 'educator', label: '教育培訓人員', labelEn: 'Education & Training Professionals', icon: '🎓' },
  { id: 'media-professional', label: '媒體傳播人員', labelEn: 'Media & Communication Professionals', icon: '📰' },
  { id: 'enterprise-manager', label: '企業管理者', labelEn: 'Enterprise Managers', icon: '🏢' },
  { id: 'productivity-user', label: '效率提升用戶', labelEn: 'Productivity Users', icon: '🚀' }
];

// 完整的101個AI工具數據庫（合併並重新分類）
const allTools: Tool[] = [
  // === AI繪圖類工具 (12個) ===
  {
    id: 'midjourney',
    title: 'Midjourney - AI 圖像生成工具',
    titleEn: 'Midjourney - AI Image Generation Tool',
    description: '一個領先嘅 AI 圖像生成工具，以其卓越嘅藝術質量同創意表達能力而聞名，特別適合創作概念藝術同插畫作品。',
    descriptionEn: 'A leading AI image generation tool renowned for its exceptional artistic quality and creative expression capabilities, particularly suitable for concept art and illustration creation.',
    tag: 'AI 繪圖',
    tags: ['AI 繪圖', '藝術創作', '概念設計'],
    url: 'https://www.midjourney.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Midjourney Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing'],
    targetAudience: ['數字藝術家', '概念設計師', '插畫家', '創意總監'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'stable-diffusion',
    title: 'Stable Diffusion - 開源圖像AI',
    titleEn: 'Stable Diffusion - Open Source Image AI',
    description: '最受歡迎的開源AI圖像生成模型，完全免費，支援本地運行和雲端使用。',
    descriptionEn: 'The most popular open-source AI image generation model, completely free, supporting both local and cloud deployment.',
    tag: '開源AI',
    tags: ['開源AI', '圖像生成', '免費工具'],
    url: 'https://stability.ai/stable-diffusion',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Stable Diffusion Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'web-development'],
    targetAudience: ['開發者', '研究人員', 'AI愛好者', '數字藝術家'],
    userGroups: ['tech-developer', 'creative-professional']
  },
  {
    id: 'dall-e-3',
    title: 'DALL·E 3 - OpenAI圖像生成',
    titleEn: 'DALL·E 3 - OpenAI Image Generation',
    description: 'OpenAI最新的圖像生成模型，能創造極其精細和準確的AI藝術作品。',
    descriptionEn: 'OpenAI\'s latest image generation model that creates extremely detailed and accurate AI artwork.',
    tag: 'AI藝術',
    tags: ['AI藝術', '圖像生成', 'OpenAI'],
    url: 'https://openai.com/dall-e-3',
    imageUrl: '/placeholder.svg',
    imageAlt: 'DALL·E 3 Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing'],
    targetAudience: ['藝術家', '設計師', '創意工作者'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'adobe-firefly',
    title: 'Adobe Firefly - 商業AI創意',
    titleEn: 'Adobe Firefly - Commercial AI Creative',
    description: 'Adobe推出的商業級AI創意工具，專為專業設計工作流程優化，版權安全。',
    descriptionEn: 'Adobe\'s commercial-grade AI creative tool optimised for professional design workflows with copyright safety.',
    tag: '商業AI',
    tags: ['商業AI', 'Adobe', '專業設計'],
    url: 'https://firefly.adobe.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Adobe Firefly Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'creative-tools'],
    targetAudience: ['專業設計師', '廣告公司', '品牌團隊'],
    userGroups: ['creative-professional', 'business-professional']
  },
  {
    id: 'ideogram-ai',
    title: 'Ideogram - 文字渲染AI',
    titleEn: 'Ideogram - Text Rendering AI',
    description: '擅長在圖像中準確渲染文字的AI工具，是製作海報、標誌和品牌設計的理想選擇。',
    descriptionEn: 'An AI tool that excels at accurately rendering text in images, ideal for creating posters, logos, and brand designs.',
    tag: '文字渲染',
    tags: ['文字渲染', '海報設計', '品牌設計'],
    url: 'https://ideogram.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Ideogram Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'creative-tools'],
    targetAudience: ['平面設計師', '品牌設計師', '營銷人員'],
    userGroups: ['creative-professional', 'business-professional']
  },
  {
    id: 'playground-ai',
    title: 'Playground AI - 創意實驗平台',
    description: '提供多種AI模型的創意實驗平台，支援風格混合和高級編輯功能。',
    tag: '創意實驗',
    tags: ['創意實驗', '多模型', '風格混合'],
    url: 'https://playground.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Playground AI Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'creative-tools'],
    targetAudience: ['數字藝術家', '創意探索者', '設計師'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'artbreeder',
    title: 'Artbreeder - 圖像演化AI',
    description: '通過"繁殖"和混合圖像來創造新的藝術作品，獨特的協作創作平台。',
    tag: '圖像演化',
    tags: ['圖像演化', '協作創作', '藝術探索'],
    url: 'https://www.artbreeder.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Artbreeder Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing'],
    targetAudience: ['藝術家', '創意工作者', '概念設計師'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'lightfield',
    title: 'Lightfield - AI 圖像影片創作平台',
    titleEn: 'Lightfield - AI Image & Video Creation Platform',
    description: '一個 AI 驅動的圖像和影片創作平台。它提供先進的生成模型，用戶可以通過文本提示創建高質量的視覺內容。',
    descriptionEn: 'An AI-powered image and video creation platform that provides advanced generative models for creating high-quality visual content through text prompts.',
    tag: '圖像生成',
    tags: ['圖像生成', '影片生成', 'AI 藝術'],
    url: 'https://lightfield.app/',
    imageUrl: 'https://lightfield.app/logo.svg',
    imageAlt: 'Lightfield Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'video-generation'],
    targetAudience: ['數字藝術家', '設計師', '廣告創意人員', '藝術家'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'lovart-ai',
    title: 'Lovart AI - AI 藝術創作工具',
    description: '一個專注於人工智能藝術創作的工具，可以根據用戶提供的提示快速生成圖像、音樂等各種類型的藝術作品。',
    tag: 'AI 繪圖',
    tags: ['AI 繪圖', '音樂生成', '創意工具'],
    url: 'https://www.lovart.ai/home',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Lovart AI Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'music-generation'],
    targetAudience: ['設計師', '藝術家', '內容創作者', '插畫家'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'higgsfield-ai',
    title: 'Higgsfield AI - 多模態 AI 創作平台',
    titleEn: 'Higgsfield AI - Multimodal AI Creation Platform',
    description: '一個集合咗影片生成、圖像創作、音頻合成等多種 AI 功能嘅創作平台，為創作者提供一站式嘅 AI 創作解決方案。',
    descriptionEn: 'A comprehensive creation platform integrating video generation, image creation, audio synthesis and other AI functions, providing creators with a one-stop AI creation solution.',
    tag: '多模態 AI',
    tags: ['多模態 AI', 'AI 影片', 'AI 繪圖', 'AI 音頻'],
    url: 'https://higgsfield.ai/',
    imageUrl: '/aitools/Higgsfield.png',
    imageAlt: 'Higgsfield AI Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'video-generation', 'music-generation'],
    targetAudience: ['內容創作者', '數字藝術家', '影片製作人'],
    userGroups: ['content-creator', 'creative-professional']
  },
  {
    id: 'freepik',
    title: 'Freepik - AI 設計素材庫',
    titleEn: 'Freepik - AI Design Resource Library',
    description: '提供海量免費和付費的AI生成設計素材，包括圖片、向量圖、PSD文件等，是設計師的創意寶庫。',
    descriptionEn: 'Provides vast free and premium AI-generated design resources, including images, vector graphics, PSD files, and more, serving as a creative treasure trove for designers.',
    tag: '設計素材',
    tags: ['設計素材', 'AI素材', '向量圖'],
    url: 'https://www.freepik.com/',
    imageUrl: '/aitools/freepik.png',
    imageAlt: 'Freepik Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'creative-tools'],
    targetAudience: ['平面設計師', '網頁設計師', 'UI/UX 設計師', '品牌設計師'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'lummi-ai',
    title: 'Lummi.ai - AI 圖片庫',
    description: '提供大量由 AI 生成的、免版稅的高質量圖片庫。與傳統圖庫不同，這裡的圖片都是獨一無二的。',
    tag: 'AI 圖片',
    tags: ['AI 圖片', '免版稅圖庫', '圖像資源'],
    url: 'https://www.lummi.ai/',
    imageUrl: 'https://www.lummi.ai/images/lummi-logo-header.svg',
    imageAlt: 'Lummi.ai Logo',
    category: 'ai-drawing',
    categories: ['ai-drawing', 'creative-tools'],
    targetAudience: ['設計師', '內容創作者', '市場營銷人員', '博客作者'],
    userGroups: ['creative-professional', 'content-creator', 'business-professional']
  },

  // === 影片生成類工具 (15個) ===
  {
    id: 'runway-gen3',
    title: 'Runway Gen-3 Alpha - 頂級AI影片生成',
    titleEn: 'Runway Gen-3 Alpha - Premium AI Video Generation',
    description: '最新的第三代AI影片生成模型，能創造極其逼真的高清影片，是專業創作者的首選工具。',
    descriptionEn: 'The latest third-generation AI video generation model that creates extremely realistic high-definition videos, the preferred tool for professional creators.',
    tag: '影片生成',
    tags: ['影片生成', 'AI影片', '專業工具'],
    url: 'https://runwayml.com/research/gen-3-alpha',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Runway Gen-3 Logo',
    category: 'video-generation',
    categories: ['video-generation'],
    targetAudience: ['影片創作者', '專業導演', '廣告公司', '創意工作室'],
    userGroups: ['content-creator', 'creative-professional']
  },
  {
    id: 'google-veo',
    title: 'Google Veo - 先進影片生成模型',
    titleEn: 'Google Veo - Advanced Video Generation Model',
    description: '由 Google DeepMind 開發的最先進的影片生成模型，能夠根據文本、圖像和影片提示生成超過一分鐘的高質量 1080p 影片。',
    descriptionEn: 'The most advanced video generation model developed by Google DeepMind, capable of generating over one minute of high-quality 1080p videos based on text, image, and video prompts.',
    tag: '影片生成',
    tags: ['影片生成', 'AI 模型', 'Google AI'],
    url: 'https://deepmind.google/models/veo/',
    imageUrl: 'https://deepmind.google/assets/images/deepmind-logo-white.svg',
    imageAlt: 'Google Veo Logo',
    category: 'video-generation',
    categories: ['video-generation', 'web-development'],
    targetAudience: ['電影行業', '視覺特效藝術家', '創意專業人士', '影片創作者'],
    userGroups: ['content-creator', 'creative-professional', 'tech-developer']
  },
  {
    id: 'hailuo-ai-video',
    title: 'Hailuo AI Video (海螺AI) - AI 影片創作平台',
    description: '一個專注於 AI 影片創作和編輯的平台，可以根據文本或圖片，快速生成高質量的短片、廣告或社交媒體影片。',
    tag: '影片生成',
    tags: ['影片生成', 'AI 影片'],
    url: 'https://hailuoai.video/',
    imageUrl: '/aitools/hailuo.png',
    imageAlt: 'Hailuo AI Video Logo',
    category: 'video-generation',
    categories: ['video-generation', 'creative-tools'],
    targetAudience: ['內容創作者', '市場營銷人員', '視頻製作人'],
    userGroups: ['content-creator', 'business-professional']
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
    category: 'video-generation',
    categories: ['video-generation'],
    targetAudience: ['影片創作者', '動畫師', '視覺藝術家'],
    userGroups: ['content-creator', 'creative-professional']
  },
  {
    id: 'stable-video-diffusion',
    title: 'Stable Video Diffusion - 開源影片AI',
    description: 'Stability AI推出的開源影片生成模型，提供高品質的影片創作能力，完全免費使用。',
    tag: '開源影片',
    tags: ['開源工具', '影片生成', 'AI影片'],
    url: 'https://stability.ai/research/stable-video-diffusion-scaling-latent-video-diffusion-models-to-large-datasets',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Stable Video Diffusion Logo',
    category: 'video-generation',
    categories: ['video-generation', 'web-development'],
    targetAudience: ['開發者', '研究人員', '影片創作者'],
    userGroups: ['tech-developer', 'content-creator']
  },
  {
    id: 'synthesia',
    title: 'Synthesia - AI 影片生成平台',
    titleEn: 'Synthesia - AI Video Generation Platform',
    description: '領先的 AI 影片生成平台，可以通過輸入文本快速創建由虛擬 AI 主播講解的影片，支持多種語言。',
    descriptionEn: 'Leading AI video generation platform that quickly creates videos with virtual AI presenters through text input, supporting multiple languages.',
    tag: 'AI 影片生成',
    tags: ['AI 影片生成', '虛擬主播', '文本轉影片'],
    url: 'https://www.synthesia.io/',
    imageUrl: 'https://assets-global.website-files.com/61dc0796f359b6145bc06c88/6335990234293c66a4a7556a_logo-synthesia-dark.svg',
    imageAlt: 'Synthesia Logo',
    category: 'video-generation',
    categories: ['video-generation', 'ai-avatar'],
    targetAudience: ['企業培訓師', '教師', '市場營銷團隊'],
    userGroups: ['enterprise-manager', 'educator', 'business-professional']
  },
  {
    id: 'heygen',
    title: 'HeyGen - AI 虛擬人影片平台',
    titleEn: 'HeyGen - AI Virtual Human Video Platform',
    description: '一個創新嘅 AI 虛擬人影片創作平台，可以快速製作出由逼真虛擬人物主講嘅影片內容，支援多種語言同風格選擇。',
    descriptionEn: 'An innovative AI virtual human video creation platform that can quickly produce video content presented by realistic virtual characters, supporting multiple languages and style choices.',
    tag: 'AI 虛擬人',
    tags: ['AI 虛擬人', '影片生成'],
    url: 'https://www.heygen.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'HeyGen Logo',
    category: 'video-generation',
    categories: ['video-generation', 'ai-avatar'],
    targetAudience: ['企業培訓部門', '內容創作者', '市場營銷人員'],
    userGroups: ['enterprise-manager', 'content-creator', 'business-professional']
  },
  {
    id: 'hedra',
    title: 'Hedra - AI 角色創作平台',
    description: '一個強大嘅 AI 角色創作平台，可以將靜態嘅人像圖片，根據你提供嘅聲音，生成口形同步、表情生動嘅動畫影片。',
    tag: '影片生成',
    tags: ['影片生成', 'AI 虛擬人'],
    url: 'https://www.hedra.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Hedra Logo',
    category: 'video-generation',
    categories: ['video-generation', 'ai-avatar'],
    targetAudience: ['影片創作者', '數字行銷人員', '設計師', '藝術家'],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'fliki-ai',
    title: 'Fliki - AI影片配音工具',
    description: '將文字轉換為帶有AI語音和視覺效果的影片，支援多種語言和逼真的AI頭像。',
    tag: 'AI配音',
    tags: ['AI配音', '影片生成', '多語言'],
    url: 'https://fliki.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Fliki Logo',
    category: 'video-generation',
    categories: ['video-generation', 'music-generation'],
    targetAudience: ['內容創作者', '教育工作者', '市場營銷人員'],
    userGroups: ['content-creator', 'educator', 'business-professional']
  },
  {
    id: 'lumen5',
    title: 'Lumen5 - 內容轉影片平台',
    titleEn: 'Lumen5 - Content to Video Platform',
    description: '一個 AI 影片創作平台，能將博客文章、白皮書等長篇內容快速轉換為引人入勝的短影片。',
    descriptionEn: 'An AI video creation platform that quickly transforms blog articles, white papers, and other long-form content into engaging short videos.',
    tag: '內容轉影片',
    tags: ['內容轉影片', 'AI 影片製作', '社交媒體影片'],
    url: 'https://lumen5.com/',
    imageUrl: 'https://lumen5.com/assets/images/logo/l5-logo-white-text.svg',
    imageAlt: 'Lumen5 Logo',
    category: 'video-generation',
    categories: ['video-generation', 'text-writing'],
    targetAudience: ['內容營銷人員', '社交媒體經理', '博客作者', '市場營銷團隊'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'pictory-ai',
    title: 'Pictory - 長文轉短影片',
    description: '將長篇文章、博客或腳本自動轉換為引人入勝的短影片，適合社交媒體分享。',
    tag: '文轉影片',
    tags: ['文轉影片', '社交媒體', '內容再利用'],
    url: 'https://pictory.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Pictory Logo',
    category: 'video-generation',
    categories: ['video-generation', 'text-writing'],
    targetAudience: ['博客作者', '內容創作者', '數字營銷人員'],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'pipio',
    title: 'Pipio - 虛擬化身影片平台',
    description: '一個專注於創建超逼真虛擬化身的 AI 影片平台。用戶可以輸入文本，讓數字人以自然的口型和動作進行播報。',
    tag: '虛擬化身',
    tags: ['虛擬化身', '數字人', 'AI 影片'],
    url: 'https://app.pipio.ai/',
    imageUrl: 'https://app.pipio.ai/assets/pipio-99882a87.png',
    imageAlt: 'Pipio Logo',
    category: 'video-generation',
    categories: ['video-generation', 'ai-avatar'],
    targetAudience: ['企業通訊部門', '新聞機構', '內容創作者', '市場營銷團隊'],
    userGroups: ['enterprise-manager', 'media-professional', 'content-creator', 'business-professional']
  },
  {
    id: 'revid',
    title: 'Revid - AI 影片創作平台',
    description: '一個 AI 影片創作平台，專注於將您的想法、文章或提示轉化為帶有 AI 生成的畫外音和視覺效果的影片。',
    tag: 'AI 影片創作',
    tags: ['AI 影片創作', '文本轉影片', '自動化內容'],
    url: 'https://www.revid.ai/',
    imageUrl: 'https://www.revid.ai/_next/image?url=%2Flogo_light.png&w=256&q=75',
    imageAlt: 'Revid Logo',
    category: 'video-generation',
    categories: ['video-generation', 'text-writing'],
    targetAudience: ['內容營銷人員', '社交媒體經理', '小型企業主', '內容創作者'],
    userGroups: ['business-professional', 'content-creator', 'enterprise-manager']
  },
  {
    id: 'skyreels-ai',
    title: 'SkyReels AI - 短影片自動生成工具',
    description: '一個專為社交媒體短影片而設計嘅 AI 工具，可以根據用戶提供嘅內容主題，自動生成吸引人嘅短影片。',
    tag: '短影片生成',
    tags: ['短影片生成', '社交媒體'],
    url: 'https://skyreels.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'SkyReels AI Logo',
    category: 'video-generation',
    categories: ['video-generation', 'creative-tools'],
    targetAudience: ['社交媒體經理', '內容創作者', '數字營銷人員'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'invideo-ai',
    title: 'InVideo AI - 智能影片編輯',
    description: '基於AI的影片編輯平台，只需輸入簡單描述就能自動生成專業級影片內容。',
    tag: '智能編輯',
    tags: ['智能編輯', '影片創作', '自動化'],
    url: 'https://invideo.io/ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'InVideo AI Logo',
    category: 'video-generation',
    categories: ['video-generation', 'video-editing'],
    targetAudience: ['社交媒體經理', '小企業主', '內容營銷人員'],
    userGroups: ['business-professional', 'content-creator']
  },

  // === 影片編輯類工具 (10個) ===
  {
    id: 'lupa-upscaler',
    title: 'Lupa Upscaler - AI 圖像增強工具',
    description: '一個專業級嘅 AI 圖像與影片增強工具。可以將低解析度嘅圖片或影片升級為高清，並修復舊有或損壞嘅影像細節。',
    tag: '圖像增強',
    tags: ['圖像增強', '影片編輯'],
    url: 'https://app.lupaupscaler.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Lupa Upscaler Logo',
    category: 'video-editing',
    categories: ['video-editing', 'image-editing'],
    targetAudience: ['攝影師', '影片製作人', '設計師', '內容創作者'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'veed-io',
    title: 'Veed.io - 在線影片編輯器',
    description: '一個功能全面的在線影片編輯器，內置多種 AI 工具，如自動添加字幕、背景噪音消除、影片去雜物等。',
    tag: '在線影片編輯',
    tags: ['在線影片編輯', 'AI 字幕', '影片工具'],
    url: 'https://www.veed.io/',
    imageUrl: 'https://www.veed.io/images/veed-logo-symbol-black.svg',
    imageAlt: 'Veed.io Logo',
    category: 'video-editing',
    categories: ['video-editing'],
    targetAudience: ['內容創作者', '教育工作者', '小型企業', '社交媒體經理'],
    userGroups: ['content-creator', 'educator', 'business-professional']
  },
  {
    id: 'wisecut',
    title: 'Wisecut - AI 智能剪輯工具',
    description: '一款專為長影片設計的 AI 智能剪輯工具，能夠自動識別影片中的精華片段、去除長時間的停頓。',
    tag: '智能剪輯',
    tags: ['智能剪輯', 'AI 影片編輯', '長影片轉短片'],
    url: 'https://www.wisecut.ai/',
    imageUrl: 'https://www.wisecut.ai/static/logo-ddb3c675317a3a99268686a9a08159b9.svg',
    imageAlt: 'Wisecut Logo',
    category: 'video-editing',
    categories: ['video-editing'],
    targetAudience: ['YouTuber', '播客主', '在線課程製作者', '內容創作者'],
    userGroups: ['content-creator', 'educator']
  },
  {
    id: 'opus-pro',
    title: 'Opus Pro - AI 影片再利用工具',
    description: '一個強大的 AI 影片再利用工具，能將一個長影片自動剪輯成多個病毒式傳播的短片，並為其評分、添加字幕。',
    tag: '影片再利用',
    tags: ['影片再利用', 'AI 剪輯', '社交媒體影片'],
    url: 'https://www.opus.pro/',
    imageUrl: 'https://www.opus.pro/images/logo-dark.svg',
    imageAlt: 'Opus Pro Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['內容創作者', '播客主', '數碼營銷機構', '社交媒體經理'],
    userGroups: ['content-creator', 'business-professional', 'media-professional']
  },
  {
    id: 'descript',
    title: 'Descript - 多功能影音編輯工具',
    titleEn: 'Descript - Multifunction Audio-Video Editing Tool',
    description: '一個集影片和音頻編輯於一體的多功能工具，其獨特之處在於用戶可以像編輯 Word 文檔一樣編輯影片和音頻。',
    descriptionEn: 'A multifunctional tool that combines video and audio editing, uniquely allowing users to edit videos and audio as easily as editing a Word document.',
    tag: '影片編輯',
    tags: ['影片編輯', '播客製作', 'AI 轉錄'],
    url: 'https://www.descript.com/',
    imageUrl: 'https://www.descript.com/home/logo-wordmark-descript-white.svg',
    imageAlt: 'Descript Logo',
    category: 'video-editing',
    categories: ['video-editing', 'music-generation'],
    targetAudience: ['播客主', 'YouTuber', '記者', '內容創作者'],
    userGroups: ['content-creator', 'media-professional']
  },
  {
    id: 'animoto',
    title: 'Animoto - 營銷影片AI',
    description: '專為品牌營銷設計的AI影片製作工具，提供豐富的商業模板和自動化編輯功能。',
    tag: '營銷影片',
    tags: ['營銷影片', '品牌宣傳', '商業模板'],
    url: 'https://animoto.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Animoto Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['品牌經理', '營銷團隊', '小企業主'],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'clipchamp',
    title: 'Clipchamp - 微軟AI影片編輯',
    description: 'Microsoft旗下的AI影片編輯工具，集成強大的AI功能，簡化專業影片製作流程。',
    tag: 'AI編輯',
    tags: ['AI編輯', '微軟工具', '專業編輯'],
    url: 'https://clipchamp.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Clipchamp Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['企業用戶', '專業編輯師', '內容團隊'],
    userGroups: ['enterprise-manager', 'content-creator']
  },
  {
    id: 'kapwing-ai',
    title: 'Kapwing AI - 協作影片平台',
    description: '支援團隊協作的AI影片編輯平台，提供智能字幕、背景移除、影片增強等功能。',
    tag: '協作編輯',
    tags: ['協作編輯', '團隊工具', 'AI增強'],
    url: 'https://www.kapwing.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Kapwing Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['設計團隊', '內容團隊', '教育機構'],
    userGroups: ['creative-professional', 'educator']
  },
  {
    id: 'flexclip-ai',
    title: 'FlexClip AI - 快速影片製作',
    description: '簡單易用的AI影片製作工具，提供豐富模板和智能編輯功能，適合快速內容製作。',
    tag: '快速製作',
    tags: ['快速製作', '簡單易用', '豐富模板'],
    url: 'https://www.flexclip.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'FlexClip Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['初學者', '小企業主', '個人創作者'],
    userGroups: ['productivity-user', 'content-creator']
  },
  {
    id: 'reccloud',
    title: 'RecCloud - 雲端錄屏編輯平台',
    description: '一個集屏幕錄製、影片編輯和雲端存儲於一體的在線平台。它利用 AI 提供自動字幕、影片摘要和智能編輯等功能。',
    tag: '屏幕錄製',
    tags: ['屏幕錄製', '雲端存儲', 'AI 影片編輯'],
    url: 'https://reccloud.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'RecCloud Logo',
    category: 'video-editing',
    categories: ['video-editing', 'creative-tools'],
    targetAudience: ['教師', '產品經理', '遊戲玩家', '任何需要錄屏的人'],
    userGroups: ['educator', 'data-analyst', 'productivity-user', 'content-creator']
  },

  // === 圖片編輯類工具 (8個) ===
  {
    id: 'photoshop-ai',
    title: 'Photoshop AI - Adobe創成式填充',
    titleEn: 'Photoshop AI - Adobe Generative Fill',
    description: 'Adobe Photoshop內建的AI功能，包括創成式填充、擴展、物件移除等強大工具。',
    descriptionEn: 'Built-in AI features in Adobe Photoshop, including generative fill, expansion, object removal, and other powerful tools.',
    tag: 'Photoshop AI',
    tags: ['Photoshop AI', '創成式填充', '專業編輯'],
    url: 'https://www.adobe.com/products/photoshop/generative-fill.html',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Photoshop AI Logo',
    category: 'image-editing',
    categories: ['image-editing'],
    targetAudience: ['專業攝影師', '設計師', '修圖師'],
    userGroups: ['creative-professional']
  },
  {
    id: 'remove-bg',
    title: 'remove.bg - AI 圖像去背工具',
    titleEn: 'remove.bg - AI Background Removal Tool',
    description: '一個非常簡單易用的在線工具，使用 AI 技術可以在 5 秒內自動去除任何圖像的背景，效果精準快速。',
    descriptionEn: 'A very simple and easy-to-use online tool that uses AI technology to automatically remove the background from any image in 5 seconds with precise and fast results.',
    tag: '圖像去背',
    tags: ['圖像去背', 'AI 圖像編輯', '在線工具'],
    url: 'https://www.remove.bg/zh',
    imageUrl: 'https://www.remove.bg/images/logo/remove-bg-logo-white.svg',
    imageAlt: 'remove.bg Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['設計師', '電商賣家', '社交媒體用戶', '攝影師'],
    userGroups: ['creative-professional', 'business-professional', 'productivity-user']
  },
  {
    id: 'upscayl',
    title: 'Upscayl - 免費圖像放大',
    description: '完全免費的開源AI圖像放大工具，能將低解析度圖片轉為高清，支援離線使用。',
    tag: '圖像放大',
    tags: ['圖像放大', '免費工具', '開源軟件'],
    url: 'https://github.com/upscayl/upscayl',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Upscayl Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['攝影愛好者', '設計師', '普通用戶'],
    userGroups: ['creative-professional', 'productivity-user']
  },
  {
    id: 'ai-image-enlarger',
    title: 'AI Image Enlarger - 線上圖片放大',
    description: '專業的線上AI圖片放大服務，支援照片、插畫、動漫圖片的無損放大。',
    tag: '線上放大',
    tags: ['線上放大', '無損放大', '多格式支援'],
    url: 'https://imglarger.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'AI Image Enlarger Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['攝影師', '電商賣家', '設計師'],
    userGroups: ['creative-professional', 'business-professional']
  },
  {
    id: 'photopea',
    title: 'Photopea - 免費線上Photoshop',
    description: '功能强大的免費線上圖像編輯器，支援PSD格式，無需安裝即可使用。',
    tag: '線上編輯',
    tags: ['線上編輯', '免費工具', 'PSD支援'],
    url: 'https://www.photopea.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Photopea Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['學生', '設計師', '預算有限用戶'],
    userGroups: ['creative-professional', 'productivity-user', 'educator']
  },
  {
    id: 'facetune',
    title: 'Facetune - AI人像美化',
    description: '專業的AI人像美化工具，提供自然的面部調整和背景編輯功能。',
    tag: '人像美化',
    tags: ['人像美化', 'AI美顏', '照片修圖'],
    url: 'https://www.facetune.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Facetune Logo',
    category: 'image-editing',
    categories: ['image-editing'],
    targetAudience: ['社交媒體用戶', '攝影師', '個人用戶'],
    userGroups: ['content-creator', 'productivity-user']
  },
  {
    id: 'pngmaker',
    title: 'PNG Maker - AI透明背景',
    description: '專門製作透明背景PNG圖片的AI工具，適合製作標誌、貼紙和產品圖片。',
    tag: '透明背景',
    tags: ['透明背景', 'PNG製作', '產品圖片'],
    url: 'https://pngmaker.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'PNG Maker Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['電商賣家', '設計師', '營銷人員'],
    userGroups: ['business-professional', 'creative-professional']
  },
  {
    id: 'canva',
    title: 'Canva - AI 設計平台',
    titleEn: 'Canva - AI Design Platform',
    description: '一個非常受歡迎的在線設計平台，提供海量模板和易於使用的拖放界面。其「Magic Studio」集成了多種 AI 功能。',
    descriptionEn: 'A highly popular online design platform offering vast templates and an easy-to-use drag-and-drop interface. Its "Magic Studio" integrates various AI features.',
    tag: '平面設計',
    tags: ['平面設計', '模板', 'AI 設計'],
    url: 'https://www.canva.com/',
    imageUrl: 'https://static.canva.com/static/images/canva_logo_wordmark_white_v2.svg',
    imageAlt: 'Canva Logo',
    category: 'image-editing',
    categories: ['image-editing', 'creative-tools'],
    targetAudience: ['所有人', '市場營銷人員', '學生', '小型企業'],
    userGroups: ['creative-professional', 'business-professional', 'educator', 'productivity-user']
  },

  // === AI虛擬人/角色類工具 (6個) ===
  {
    id: 'headai',
    title: 'HeadAI - AI 頭像生成器',
    description: '智能頭像和人像生成工具，能夠創建逼真的AI頭像，適用於各種數字化應用場景。',
    tag: 'AI頭像',
    tags: ['AI頭像', '人像生成', '虛擬形象'],
    url: 'https://www.headshotpro.com',
    imageUrl: '/aitools/headai.png',
    imageAlt: 'HeadAI Logo',
    category: 'ai-avatar',
    categories: ['ai-avatar', 'ai-drawing'],
    targetAudience: ['社交媒體用戶', '遊戲開發者', '虛擬主播', '數字藝術家', '品牌營銷人員'],
    userGroups: ['creative-professional', 'content-creator', 'business-professional']
  },
  {
    id: 'character-ai',
    title: 'Character.AI - AI角色對話',
    titleEn: 'Character.AI - AI Character Conversations',
    description: '創建和與AI角色進行對話的平台，適合創意寫作和角色發展。',
    descriptionEn: 'A platform for creating and conversing with AI characters, suitable for creative writing and character development.',
    tag: 'AI角色',
    tags: ['AI角色', '創意對話', '角色發展'],
    url: 'https://character.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Character.AI Logo',
    category: 'ai-avatar',
    categories: ['ai-avatar', 'ai-assistant'],
    targetAudience: ['創意寫作者', '遊戲開發者', '教育工作者'],
    userGroups: ['content-creator', 'creative-professional', 'educator']
  },
  {
    id: 'steve-ai',
    title: 'Steve AI - 企業影片解決方案',
    description: '為企業量身打造的AI影片製作平台，支援動畫、真人影片和培訓內容的自動生成。',
    tag: '企業影片',
    tags: ['企業影片', '動畫製作', '培訓內容'],
    url: 'https://www.steve.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Steve AI Logo',
    category: 'ai-avatar',
    categories: ['ai-avatar', 'video-generation'],
    targetAudience: ['企業培訓師', 'HR團隊', '公司內訓'],
    userGroups: ['enterprise-manager', 'educator']
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
    category: 'ai-avatar',
    categories: ['ai-avatar', 'web-development'],
    targetAudience: ['創意技術專家', '互動設計師', '前端開發者'],
    userGroups: ['tech-developer', 'creative-professional']
  },
  {
    id: 'threejs',
    title: 'three.js - 3D 圖形 JavaScript 庫',
    description: '一個跨瀏覽器的 JavaScript 庫和 API，用於在網頁瀏覽器中創建和顯示動畫 3D 計算機圖形。',
    tag: '3D 圖形',
    tags: ['3D 圖形', 'WebGL', 'JavaScript 庫'],
    url: 'https://threejs.org/',
    imageUrl: 'https://threejs.org/files/logo.svg',
    imageAlt: 'three.js Logo',
    category: 'ai-avatar',
    categories: ['ai-avatar', 'web-development'],
    targetAudience: ['Web 開發者', '創意技術專家', '3D 藝術家', '遊戲開發者'],
    userGroups: ['tech-developer', 'creative-professional']
  },
  {
    id: 'ai-dungeon',
    title: 'AI Dungeon - 互動故事AI',
    description: '創新的AI驅動互動故事平台，讓你體驗無限可能的冒險故事。',
    tag: '互動故事',
    tags: ['互動故事', 'AI遊戲', '創意娛樂'],
    url: 'https://aidungeon.io/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'AI Dungeon Logo',
    category: 'ai-avatar',
    categories: ['ai-avatar', 'text-writing'],
    targetAudience: ['遊戲愛好者', '故事創作者', '創意工作者'],
    userGroups: ['content-creator', 'creative-professional']
  },

  // === 音樂生成類工具 (10個) ===
  {
    id: 'eleven-labs',
    title: 'Eleven Labs - AI 語音克隆平台',
    titleEn: 'Eleven Labs - AI Voice Cloning Platform',
    description: '一個先進嘅 AI 語音克隆同生成平台，可以根據少量嘅語音樣本，產生出高度逼真嘅人聲，支援多種語言同情感表達。',
    descriptionEn: 'An advanced AI voice cloning and generation platform that can produce highly realistic human voices based on small voice samples, supporting multiple languages and emotional expressions.',
    tag: '語音生成',
    tags: ['語音生成', 'AI 語音'],
    url: 'https://elevenlabs.io/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Eleven Labs Logo',
    category: 'music-generation',
    categories: ['music-generation', 'ai-assistant'],
    targetAudience: ['內容創作者', '播客主', '影片製作人'],
    userGroups: ['content-creator', 'media-professional']
  },
  {
    id: 'murf-ai',
    title: 'Murf.ai - AI 文本轉語音生成器',
    description: '一個多功能的 AI 文本轉語音生成器，提供大量聽起來非常自然的人聲選擇，支持多種語言和口音。',
    tag: '文本轉語音',
    tags: ['文本轉語音', 'AI 語音', '畫外音'],
    url: 'https://murf.ai/',
    imageUrl: 'https://murf.ai/resources/media/murf_logo_white.svg',
    imageAlt: 'Murf.ai Logo',
    category: 'music-generation',
    categories: ['music-generation', 'text-writing'],
    targetAudience: ['影片製作者', '播客主', '產品經理', '教育工作者'],
    userGroups: ['content-creator', 'media-professional', 'educator', 'data-analyst']
  },
  {
    id: 'speechify',
    title: 'Speechify - 文字轉語音閱讀',
    description: '強大的文字轉語音工具，支援多種語言和自然語音，提升閱讀效率。',
    tag: '語音閱讀',
    tags: ['語音閱讀', '文字轉語音', '學習工具'],
    url: 'https://speechify.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Speechify Logo',
    category: 'music-generation',
    categories: ['music-generation', 'creative-tools'],
    targetAudience: ['學生', '視障人士', '忙碌專業人士'],
    userGroups: ['educator', 'productivity-user']
  },
  {
    id: 'wellsaid-labs',
    title: 'WellSaid Labs - 企業級AI語音',
    description: '專為企業設計的高品質AI語音合成平台，提供自然流暢的商業級語音。',
    tag: '企業語音',
    tags: ['企業語音', 'AI配音', '商業應用'],
    url: 'https://wellsaidlabs.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'WellSaid Labs Logo',
    category: 'music-generation',
    categories: ['music-generation', 'business-analytics'],
    targetAudience: ['企業培訓', '廣告公司', '內容團隊'],
    userGroups: ['enterprise-manager', 'business-professional']
  },
  {
    id: 'resemble-ai',
    title: 'Resemble AI - 自定義語音克隆',
    description: '先進的語音克隆技術，能夠創建個性化的AI語音模型，保護隱私安全。',
    tag: '語音克隆',
    tags: ['語音克隆', '個性化語音', '隱私保護'],
    url: 'https://www.resemble.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Resemble AI Logo',
    category: 'music-generation',
    categories: ['music-generation', 'web-development'],
    targetAudience: ['開發者', '內容創作者', '企業'],
    userGroups: ['tech-developer', 'content-creator']
  },
  {
    id: 'lalal-ai',
    title: 'LALAL.AI - AI音軌分離',
    description: '專業的AI音軌分離工具，能將音樂中的人聲、樂器等元素精確分離。',
    tag: '音軌分離',
    tags: ['音軌分離', '音頻處理', '音樂製作'],
    url: 'https://www.lalal.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'LALAL.AI Logo',
    category: 'music-generation',
    categories: ['music-generation'],
    targetAudience: ['音樂製作人', '音頻工程師', 'DJ'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'voicemod',
    title: 'Voicemod - 實時變聲器',
    description: '實時語音變聲工具，提供豐富的聲音效果，適合遊戲、直播和內容創作。',
    tag: '變聲器',
    tags: ['變聲器', '實時語音', '遊戲工具'],
    url: 'https://www.voicemod.net/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Voicemod Logo',
    category: 'music-generation',
    categories: ['music-generation', 'creative-tools'],
    targetAudience: ['遊戲玩家', '直播主', '內容創作者'],
    userGroups: ['content-creator', 'productivity-user']
  },
  {
    id: 'riffusion',
    title: 'Riffusion - AI音樂生成',
    description: '創新的AI音樂生成工具，能根據文字描述創作各種風格的音樂作品。',
    tag: 'AI音樂',
    tags: ['AI音樂', '音樂創作', '創意工具'],
    url: 'https://www.riffusion.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Riffusion Logo',
    category: 'music-generation',
    categories: ['music-generation', 'creative-tools'],
    targetAudience: ['音樂創作者', '影片製作人', '遊戲開發者'],
    userGroups: ['creative-professional', 'content-creator']
  },
  {
    id: 'amper-music',
    title: 'Amper Music - AI背景音樂',
    description: '專為內容創作者設計的AI背景音樂生成工具，快速創作免版權音樂。',
    tag: 'AI背景音樂',
    tags: ['AI背景音樂', '免版權音樂', '內容創作'],
    url: 'https://www.ampermusic.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Amper Music Logo',
    category: 'music-generation',
    categories: ['music-generation', 'text-writing'],
    targetAudience: ['YouTuber', '影片製作者', '播客主'],
    userGroups: ['content-creator']
  },
  {
    id: 'cleanvoice-ai',
    title: 'Cleanvoice.ai - AI 音頻編輯工具',
    description: '一款專為播客和音頻創作者設計的 AI 工具，能自動編輯音頻，去除填充詞和口吃，讓音頻聽起來更專業流暢。',
    tag: '音頻編輯',
    tags: ['音頻編輯', '播客工具', '噪音消除'],
    url: 'https://cleanvoice.ai/',
    imageUrl: 'https://cleanvoice.ai/logo.svg',
    imageAlt: 'Cleanvoice.ai Logo',
    category: 'music-generation',
    categories: ['music-generation'],
    targetAudience: ['播客主', '音頻編輯師', '內容創作者', '記者'],
    userGroups: ['content-creator', 'media-professional']
  },

  // === 文字創作/文案類工具 (12個) ===
  {
    id: 'grammarly',
    title: 'Grammarly - AI寫作助手',
    titleEn: 'Grammarly - AI Writing Assistant',
    description: '全球領先的AI寫作助手，提供語法檢查、風格建議和寫作優化功能。',
    descriptionEn: 'World-leading AI writing assistant that provides grammar checking, style suggestions, and writing optimisation features.',
    tag: '寫作助手',
    tags: ['寫作助手', '語法檢查', '寫作優化'],
    url: 'https://www.grammarly.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Grammarly Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['學生', '專業寫作者', '商業人士'],
    userGroups: ['educator', 'content-creator', 'business-professional']
  },
  {
    id: 'claude-anthropic',
    title: 'Claude - Anthropic AI助手',
    titleEn: 'Claude - Anthropic AI Assistant',
    description: 'Anthropic開發的先進AI助手，擅長深度思考、分析和創意寫作。',
    descriptionEn: 'An advanced AI assistant developed by Anthropic, excelling in deep thinking, analysis, and creative writing.',
    tag: 'AI助手',
    tags: ['AI助手', '深度分析', '創意寫作'],
    url: 'https://claude.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Claude Logo',
    category: 'text-writing',
    categories: ['text-writing', 'ai-assistant'],
    targetAudience: ['研究人員', '分析師', '寫作者'],
    userGroups: ['data-analyst', 'content-creator', 'educator']
  },
  {
    id: 'notion-ai',
    title: 'Notion AI - 智能筆記助手',
    titleEn: 'Notion AI - Intelligent Note-Taking Assistant',
    description: 'Notion內建的AI助手，能幫助組織想法、撰寫內容和提升工作效率。',
    descriptionEn: 'Built-in AI assistant in Notion that helps organise ideas, write content, and improve productivity.',
    tag: '智能筆記',
    tags: ['智能筆記', '生產力工具', 'AI助手'],
    url: 'https://www.notion.so/product/ai',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Notion AI Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['知識工作者', '學生', '團隊協作'],
    userGroups: ['productivity-user', 'educator', 'business-professional']
  },
  {
    id: 'rytr',
    title: 'Rytr - 快速AI寫作',
    titleEn: 'Rytr - Fast AI Writing',
    description: '快速AI寫作工具，支援多種內容類型和寫作風格，適合批量內容創作。',
    descriptionEn: 'Fast AI writing tool that supports multiple content types and writing styles, suitable for bulk content creation.',
    tag: '快速寫作',
    tags: ['快速寫作', '批量創作', '多樣風格'],
    url: 'https://rytr.me/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Rytr Logo',
    category: 'text-writing',
    categories: ['text-writing', 'business-analytics'],
    targetAudience: ['內容營銷', '自由撰稿人', '小企業'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'wordtune',
    title: 'Wordtune - 文字重寫AI',
    titleEn: 'Wordtune - Text Rewriting AI',
    description: '專注於文字重寫和改善的AI工具，讓你的文字更清晰、更有說服力。',
    descriptionEn: 'AI tool focused on text rewriting and improvement, making your writing clearer and more persuasive.',
    tag: '文字重寫',
    tags: ['文字重寫', '文字改善', '表達優化'],
    url: 'https://www.wordtune.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Wordtune Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['學術寫作', '商業寫作', '英語學習者'],
    userGroups: ['educator', 'business-professional']
  },
  {
    id: 'quillbot',
    title: 'QuillBot - AI改寫工具',
    titleEn: 'QuillBot - AI Rewriting Tool',
    description: '強大的AI文本改寫和同義詞替換工具，幫助改善文章流暢度和原創性。',
    descriptionEn: 'Powerful AI text rewriting and synonym replacement tool that helps improve article fluency and originality.',
    tag: 'AI改寫',
    tags: ['AI改寫', '同義詞替換', '原創性檢查'],
    url: 'https://quillbot.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'QuillBot Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['學生', '研究人員', '寫作者'],
    userGroups: ['educator', 'content-creator']
  },
  {
    id: 'jasper-ai',
    title: 'Jasper.ai - AI 寫作助手',
    titleEn: 'Jasper.ai - AI Writing Assistant',
    description: '一個強大的人工智能寫作助手，能幫助市場營銷人員、作家和企業家快速生成高質量的文案、博客文章、社交媒體帖子、郵件等多種內容。',
    descriptionEn: 'A powerful AI writing assistant that helps marketers, writers, and entrepreneurs quickly generate high-quality copy, blog posts, social media content, emails, and more.',
    tag: 'AI 寫作',
    tags: ['AI 寫作', '內容生成', '文案工具'],
    url: 'https://www.jasper.ai/',
    imageUrl: 'https://framerusercontent.com/images/150567P1wX5i2GknaD8s5Gj2E.svg',
    imageAlt: 'Jasper.ai Logo',
    category: 'text-writing',
    categories: ['text-writing', 'business-analytics'],
    targetAudience: ['市場營銷人員', '內容創作者', '企業主'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'copy-ai',
    title: 'Copy.ai - AI 文案生成',
    titleEn: 'Copy.ai - AI Copywriting',
    description: '專為市場營銷和銷售團隊設計的 AI 寫作平台，能自動生成有說服力的文案，包括廣告文案、產品描述、電子郵件和社交媒體內容。',
    descriptionEn: 'An AI writing platform designed for marketing and sales teams that automatically generates compelling copy, including ads, product descriptions, emails, and social media content.',
    tag: 'AI 寫作',
    tags: ['AI 寫作', '文案生成', '市場營銷'],
    url: 'https://www.copy.ai/',
    imageUrl: 'https://www.copy.ai/logos/copy-ai-logo-black-512x512.png',
    imageAlt: 'Copy.ai Logo',
    category: 'text-writing',
    categories: ['text-writing', 'business-analytics'],
    targetAudience: ['廣告人員', '電商企業', '社交媒體經理'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'writesonic',
    title: 'Writesonic - AI 內容創作套件',
    titleEn: 'Writesonic - AI Content Creation Suite',
    description: '一款多功能的 AI 內容創作套件，提供從文章和博客寫作、文案改寫、到為 Google 廣告和社交媒體創建文案的各種工具。',
    descriptionEn: 'A versatile AI content creation suite offering various tools from article and blog writing, copywriting, to creating copy for Google ads and social media.',
    tag: '內容創作',
    tags: ['內容創作', 'SEO', 'AI 寫作'],
    url: 'https://writesonic.com/',
    imageUrl: 'https://d1p3ts03vjwfp6.cloudfront.net/images/writesonic-logo-f-s.svg',
    imageAlt: 'Writesonic Logo',
    category: 'text-writing',
    categories: ['text-writing', 'business-analytics'],
    targetAudience: ['博客作者', '自由撰稿人', '數碼營銷機構'],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'otter-ai',
    title: 'Otter.ai - AI 語音轉文字工具',
    titleEn: 'Otter.ai - AI Speech-to-Text Tool',
    description: '一個利用 AI 技術提供實時語音轉文字服務的工具，能夠準確地轉錄會議、訪談和講座，並能識別不同的發言者。',
    descriptionEn: 'A tool that utilises AI technology to provide real-time speech-to-text services, accurately transcribing meetings, interviews, and lectures whilst identifying different speakers.',
    tag: '語音轉文字',
    tags: ['語音轉文字', '會議記錄', 'AI 轉錄'],
    url: 'https://otter.ai/',
    imageUrl: 'https://otter.ai/images/logomark.svg',
    imageAlt: 'Otter.ai Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['企業團隊', '記者', '學生', '項目經理'],
    userGroups: ['enterprise-manager', 'media-professional', 'educator', 'data-analyst']
  },
  {
    id: 'fireflies-ai',
    title: 'Fireflies.ai - AI 會議助手',
    description: '一個 AI 會議助手，能自動加入您的線上會議，進行錄音、轉錄和總結。它能提取關鍵詞、行動項目和會議重點。',
    tag: '會議助手',
    tags: ['會議助手', 'AI 轉錄', '任務管理'],
    url: 'https://fireflies.ai/',
    imageUrl: 'https://fireflies.ai/images/logo-icon.svg',
    imageAlt: 'Fireflies.ai Logo',
    category: 'text-writing',
    categories: ['text-writing', 'creative-tools'],
    targetAudience: ['項目經理', '銷售團隊', '任何需要開會的專業人士', '企業團隊'],
    userGroups: ['data-analyst', 'business-professional', 'enterprise-manager']
  },
  {
    id: 'riverside',
    title: 'Riverside - 高品質遠程錄製平台',
    description: '一個高品質的遠程錄音和錄影平台，專為播客和訪談設計。它在本地錄製每個參與者的音視頻，確保錄音室質量的文件。',
    tag: '遠程錄製',
    tags: ['遠程錄製', '播客製作', '高清錄影'],
    url: 'https://riverside.com/',
    imageUrl: 'https://cdn.prod.website-files.com/6294d5053646d6540c11713d/6294d5053646d66e74117163_logo-2-layers.svg',
    imageAlt: 'Riverside Logo',
    category: 'text-writing',
    categories: ['text-writing', 'music-generation'],
    targetAudience: ['播客主', '媒體公司', '企業營銷團隊', '內容創作者'],
    userGroups: ['content-creator', 'media-professional', 'business-professional']
  },

  // === 簡報/圖表生成類工具 (5個) ===
  {
    id: 'gamma',
    title: 'Gamma - AI 演示文稿生成器',
    titleEn: 'Gamma - AI Presentation Generator',
    description: '一個利用 AI 快速生成演示文稿、文檔和網頁的創新工具。用戶只需提供一個主題，Gamma 就能自動創建出設計精美、內容完整的初稿。',
    descriptionEn: 'An innovative tool that utilises AI to quickly generate presentations, documents, and web pages. Users simply provide a topic, and Gamma automatically creates beautifully designed, comprehensive drafts.',
    tag: '演示文稿',
    tags: ['演示文稿', 'AI 生成', '文件設計'],
    url: 'https://gamma.app/',
    imageUrl: 'https://gamma.app/gamma-logo.png',
    imageAlt: 'Gamma Logo',
    category: 'presentation-charts',
    categories: ['presentation-charts', 'text-writing'],
    targetAudience: ['顧問', '創始人', '教育工作者', '學生'],
    userGroups: ['business-professional', 'enterprise-manager', 'educator']
  },
  {
    id: 'beautiful-ai',
    title: 'Beautiful.ai - 智能簡報製作工具',
    titleEn: 'Beautiful.ai - Intelligent Presentation Creation Tool',
    description: '一款專注於自動化設計的演示文稿製作工具。它利用 AI 智能地為用戶佈局幻燈片，確保設計的一致性和美觀性。',
    descriptionEn: 'A presentation creation tool focused on automated design. It utilises AI to intelligently layout slides for users, ensuring design consistency and aesthetic appeal.',
    tag: '演示文稿',
    tags: ['演示文稿', '智能設計', '簡報製作'],
    url: 'https://www.beautiful.ai/',
    imageUrl: 'https://www.beautiful.ai/img/beautiful-ai-logo-2023-white.svg',
    imageAlt: 'Beautiful.ai Logo',
    category: 'presentation-charts',
    categories: ['presentation-charts', 'ai-drawing'],
    targetAudience: ['企業顧問', '銷售人員', '任何需要製作專業簡報的人', '市場營銷人員'],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'adcreative-ai',
    title: 'Adcreative.ai - AI 廣告創意平台',
    description: '一個專為廣告商設計的 AI 平台，能夠快速生成大量高轉化率的廣告創意，包括圖片、文案和影片。',
    tag: '廣告創意',
    tags: ['廣告創意', 'AI 設計', '市場營銷'],
    url: 'https://www.adcreative.ai/',
    imageUrl: 'https://www.adcreative.ai/assets/img/logo-white.svg',
    imageAlt: 'Adcreative.ai Logo',
    category: 'presentation-charts',
    categories: ['presentation-charts', 'ai-drawing'],
    targetAudience: ['廣告人員', '電商品牌', '數碼營銷機構', '市場營銷人員'],
    userGroups: ['business-professional']
  },
  {
    id: 'aicarousels',
    title: 'aicarousels.com - 社交媒體輪播圖生成器',
    description: '一個專門用來快速創建社交媒體輪播圖 (Carousels) 的 AI 工具。用戶只需輸入主題或文本，AI 就能自動生成設計精美的輪播圖。',
    tag: '社交媒體設計',
    tags: ['社交媒體設計', '輪播圖', 'Instagram 營銷'],
    url: 'https://www.aicarousels.com/',
    imageUrl: 'https://www.aicarousels.com/logo_light.svg',
    imageAlt: 'aicarousels.com Logo',
    category: 'presentation-charts',
    categories: ['presentation-charts', 'ai-drawing'],
    targetAudience: ['社交媒體經理', '品牌顧問', '內容創作者', '市場營銷人員'],
    userGroups: ['business-professional', 'content-creator', 'creative-professional']
  },
  {
    id: 'magnetly',
    title: 'Magnetly - 潛在客戶磁鐵生成器',
    description: '一個 AI 工具，專門幫助教練、顧問和創作者將他們的知識轉化為高價值的潛在客戶磁鐵 (Lead Magnets)，如電子書、指南等。',
    tag: '潛在客戶開發',
    tags: ['潛在客戶開發', '電子書生成', '市場營銷'],
    url: 'https://www.magnetly.co/',
    imageUrl: 'https://uploads-ssl.webflow.com/65267b2be4f0081d6d56b85e/65267d3b519e48604344a8e8_Logo.svg',
    imageAlt: 'Magnetly Logo',
    category: 'presentation-charts',
    categories: ['presentation-charts', 'text-writing'],
    targetAudience: ['教練', '顧問', '課程創作者', '企業家'],
    userGroups: ['business-professional', 'content-creator', 'enterprise-manager']
  },

  // === 商業分析/數據提取類工具 (8個) ===
  {
    id: 'chat4data',
    title: 'Chat4Data - 數據分析對話工具',
    titleEn: 'Chat4Data - Data Analysis Conversation Tool',
    description: '一個智能嘅數據分析對話工具，用戶可以用自然語言提問，AI 會自動分析數據並提供洞察，令數據分析變得更加直觀易用。',
    descriptionEn: 'An intelligent data analysis conversation tool where users can ask questions in natural language, and AI automatically analyses data and provides insights, making data analysis more intuitive and accessible.',
    tag: '數據分析',
    tags: ['數據分析', 'AI 數據'],
    url: 'https://chat4data.com/',
    imageUrl: '/aitools/chat4data.png',
    imageAlt: 'Chat4Data Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'ai-assistant'],
    targetAudience: ['數據分析師', '商業分析師', '企業決策者'],
    userGroups: ['data-analyst', 'enterprise-manager']
  },
  {
    id: 'mem0',
    title: 'Mem0 - AI 記憶系統',
    titleEn: 'Mem0 - AI Memory System',
    description: '個人化AI記憶平台，能夠學習和記住你的偏好，為每次對話提供更智能、更貼心的回應體驗。',
    descriptionEn: 'Personalised AI memory platform that learns and remembers your preferences, providing more intelligent and thoughtful responses for every conversation.',
    tag: 'AI記憶',
    tags: ['AI記憶', '個人化AI', '智能助手'],
    url: 'https://mem0.ai/',
    imageUrl: '/aitools/mem0.jpg',
    imageAlt: 'Mem0 Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'ai-assistant'],
    targetAudience: ['內容創作者', 'Blogger', '市場推廣人員', '老師'],
    userGroups: ['content-creator', 'business-professional', 'educator']
  },
  {
    id: 'tableau-ai',
    title: 'Tableau AI - 數據可視化AI',
    description: 'Tableau的AI功能，自動化數據分析和智能可視化建議。',
    tag: '數據可視化',
    tags: ['數據可視化', '智能分析', 'BI工具'],
    url: 'https://www.tableau.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Tableau Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'creative-tools'],
    targetAudience: ['數據分析師', '商業智能', '決策者'],
    userGroups: ['data-analyst', 'enterprise-manager']
  },
  {
    id: 'power-bi-ai',
    title: 'Power BI AI - 微軟商業智能',
    description: 'Microsoft Power BI的AI功能，提供自動化洞察和預測分析。',
    tag: '商業智能',
    tags: ['商業智能', '預測分析', '自動洞察'],
    url: 'https://powerbi.microsoft.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Power BI Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'creative-tools'],
    targetAudience: ['企業分析師', '財務團隊', '管理層'],
    userGroups: ['data-analyst', 'enterprise-manager']
  },
  {
    id: 'databricks-ai',
    title: 'Databricks AI - 大數據AI平台',
    description: '統一的大數據和機器學習平台，支援企業級AI應用開發。',
    tag: '大數據AI',
    tags: ['大數據', '機器學習', '企業AI'],
    url: 'https://www.databricks.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Databricks Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'web-development'],
    targetAudience: ['數據科學家', 'ML工程師', '企業AI團隊'],
    userGroups: ['data-analyst', 'tech-developer']
  },
  {
    id: 'google-analytics-ai',
    title: 'Google Analytics AI - 網站分析AI',
    titleEn: 'Google Analytics AI - Website Analytics AI',
    description: 'Google Analytics的AI功能，提供智能洞察和預測性分析。',
    descriptionEn: 'AI features in Google Analytics that provide intelligent insights and predictive analytics.',
    tag: '網站分析',
    tags: ['網站分析', '智能洞察', '預測分析'],
    url: 'https://analytics.google.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Google Analytics Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'creative-tools'],
    targetAudience: ['數字營銷', '網站管理', '電商分析'],
    userGroups: ['data-analyst', 'business-professional']
  },
  {
    id: 'seobot-ai',
    title: 'SEOBOT.ai - AI SEO 分析工具',
    description: '一個利用 AI 進行網站 SEO（搜索引擎優化）分析的工具。它可以審核網站的技術問題、關鍵詞排名和內容質量。',
    tag: 'SEO',
    tags: ['SEO', '網站分析', '搜索引擎優化'],
    url: 'https://seobotai.com/',
    imageUrl: 'https://seobotai.com/wp-content/uploads/2023/12/logo-light-1.svg',
    imageAlt: 'SEOBOT.ai Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'web-development'],
    targetAudience: ['SEO 專業人員', '網站管理員', '數碼營銷人員', '企業主'],
    userGroups: ['data-analyst', 'business-professional', 'tech-developer', 'enterprise-manager']
  },
  {
    id: 'hubspot',
    title: 'HubSpot - CRM 系統',
    titleEn: 'HubSpot - CRM System',
    description: '一個全面的客戶關係管理 (CRM) 平台，整合了市場營銷、銷售、客戶服務和內容管理軟件。其 AI 功能（如 ChatSpot）能協助自動化任務和數據分析。',
    descriptionEn: 'A comprehensive Customer Relationship Management (CRM) platform that integrates marketing, sales, customer service, and content management software. Its AI features (like ChatSpot) assist with task automation and data analysis.',
    tag: 'CRM',
    tags: ['CRM', '市場營銷自動化', '銷售工具'],
    url: 'https://www.hubspot.com/',
    imageUrl: 'https://www.hubspot.com/hubfs/UI%20Extensions/hubspot-logo-color.svg',
    imageAlt: 'HubSpot Logo',
    category: 'business-analytics',
    categories: ['business-analytics', 'creative-tools'],
    targetAudience: ['企業', '市場營銷團隊', '銷售人員'],
    userGroups: ['enterprise-manager', 'business-professional']
  },

  // === 創意工具/其他類工具 (15個) ===
  {
    id: 'seaweed-apt2',
    title: 'Seaweed APT2 - 高級威脅檢測工具',
    description: '一個先進嘅 AI 驅動網絡安全工具，專門用於檢測同分析高級持續威脅 (APT)，為企業提供全面嘅網絡安全防護。',
    tag: '網絡安全',
    tags: ['網絡安全', 'AI 安全'],
    url: 'https://apt2.seaweedfs.com/',
    imageUrl: '/aitools/seaweed.png',
    imageAlt: 'Seaweed APT2 Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['網絡安全專家', 'IT 管理員', '企業安全團隊'],
    userGroups: ['tech-developer', 'enterprise-manager']
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
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['ML 研究者', 'AI 工程師', '數據科學家'],
    userGroups: ['tech-developer', 'data-analyst']
  },
  {
    id: 'openai-cookbook',
    title: 'OpenAI Cookbook - AI 開發指南',
    titleEn: 'OpenAI Cookbook - AI Development Guide',
    description: '一個官方嘅 OpenAI API 使用指南同範例集合，提供咗大量實用嘅程式碼範例同教學，幫助開發者快速上手 AI 應用開發。',
    descriptionEn: 'An official OpenAI API usage guide and example collection, providing numerous practical code examples and tutorials to help developers quickly get started with AI application development.',
    tag: 'AI 開發',
    tags: ['AI 開發', '開發工具'],
    url: 'https://cookbook.openai.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'OpenAI Cookbook Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['AI 開發者', '軟體工程師', '數據科學家'],
    userGroups: ['tech-developer', 'data-analyst']
  },
  {
    id: 'krisp',
    title: 'Krisp - AI降噪工具',
    description: '強大的AI背景噪音消除工具，讓線上會議和錄音更加清晰專業。',
    tag: 'AI降噪',
    tags: ['AI降噪', '會議工具', '音頻清理'],
    url: 'https://krisp.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Krisp Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'music-generation'],
    targetAudience: ['遠程工作者', '播客主', '企業用戶'],
    userGroups: ['enterprise-manager', 'productivity-user']
  },
  {
    id: 'bardeen',
    title: 'Bardeen - 瀏覽器自動化工具',
    titleEn: 'Bardeen - Browser Automation Tool',
    description: '一款強大的瀏覽器自動化工具，它使用 AI 來幫助你自動化重複性的手動任務。無需編程，即可創建工作流程。',
    descriptionEn: 'A powerful browser automation tool that uses AI to help you automate repetitive manual tasks. Create workflows without any programming required.',
    tag: '工作流程自動化',
    tags: ['工作流程自動化', '效率工具', '數據抓取'],
    url: 'https://www.bardeen.ai/',
    imageUrl: 'https://www.bardeen.ai/images/logos/bardeen-logo-with-text-white.svg',
    imageAlt: 'Bardeen Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['創始人', '營銷人員', '任何希望提高生產力的人', '小型企業主'],
    userGroups: ['business-professional', 'productivity-user', 'enterprise-manager']
  },
  {
    id: 'zapier',
    title: 'Zapier - 應用集成自動化平台',
    titleEn: 'Zapier - Application Integration Automation Platform',
    description: '領先的在線自動化工具，可以連接數千個不同的應用程序，讓它們協同工作。用戶可以創建 "Zaps" 來自動化工作流程。',
    descriptionEn: 'Leading online automation tool that can connect thousands of different applications to work together. Users can create "Zaps" to automate workflows.',
    tag: '自動化',
    tags: ['自動化', '應用集成', '工作流程'],
    url: 'https://zapier.com/',
    imageUrl: 'https://zapier.com/cdn/images/logo-zapier-white-fill.svg',
    imageAlt: 'Zapier Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['企業', '營銷團隊', '任何使用多個網絡應用的人', '項目經理'],
    userGroups: ['business-professional', 'data-analyst', 'productivity-user', 'enterprise-manager']
  },
  {
    id: 'durable',
    title: 'Durable - AI 網站建設平台',
    titleEn: 'Durable - AI Website Building Platform',
    description: '一個 AI 網站建設平台，號稱可以在 30 秒內為任何企業生成一個帶有文案、圖片和聯繫表單的完整網站。',
    descriptionEn: 'An AI website building platform that claims to generate a complete website with copy, images, and contact forms for any business within 30 seconds.',
    tag: '網站建設',
    tags: ['網站建設', 'AI 建站', '小型企業'],
    url: 'https://durable.co/',
    imageUrl: 'https://durable.co/assets/logo-light-682ac159.svg',
    imageAlt: 'Durable Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'web-development'],
    targetAudience: ['小型企業主', '自由職業者', '創業者', '任何需要快速建站的人'],
    userGroups: ['enterprise-manager', 'business-professional', 'productivity-user']
  },
  {
    id: 'taplio',
    title: 'Taplio - LinkedIn 增長工具',
    titleEn: 'Taplio - LinkedIn Growth Tool',
    description: '一個專為 LinkedIn 內容創作和增長設計的 AI 工具。它可以幫助用戶尋找熱門話題、撰寫帖子、安排發布時間。',
    descriptionEn: 'An AI tool specifically designed for LinkedIn content creation and growth. It helps users find trending topics, write posts, and schedule publication times.',
    tag: 'LinkedIn',
    tags: ['LinkedIn', '社交媒體管理', '個人品牌'],
    url: 'https://taplio.com/',
    imageUrl: 'https://taplio.com/logo-light.svg',
    imageAlt: 'Taplio Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'text-writing'],
    targetAudience: ['企業家', '顧問', '尋求職業發展的專業人士', '銷售人員'],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'tweet-hunter',
    title: 'Tweet Hunter - Twitter (X) 增長工具',
    description: '專為 Twitter (X) 設計的增長工具，提供 AI 寫作、帖子排程、自動化互動和靈感庫等功能。',
    tag: 'Twitter (X)',
    tags: ['Twitter (X)', '社交媒體增長', '內容創作'],
    url: 'https://tweethunter.io/',
    imageUrl: 'https://tweethunter.io/logo-light.svg',
    imageAlt: 'Tweet Hunter Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'text-writing'],
    targetAudience: ['Twitter (X) 創作者', '創始人', '數碼營銷人員', '內容創作者'],
    userGroups: ['content-creator', 'business-professional']
  },
  {
    id: 'monday-ai',
    title: 'Monday.com AI - 工作管理AI',
    description: '集成AI功能的工作管理平台，自動化項目追蹤和團隊協作。',
    tag: '工作管理',
    tags: ['工作管理', '項目追蹤', '團隊協作'],
    url: 'https://monday.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Monday.com Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'business-analytics'],
    targetAudience: ['項目經理', '團隊領導', '企業管理'],
    userGroups: ['enterprise-manager', 'data-analyst']
  },
  {
    id: 'salesforce-einstein',
    title: 'Salesforce Einstein - CRM AI',
    description: 'Salesforce的AI功能，提供智能銷售預測、客戶洞察和自動化營銷。',
    tag: 'CRM AI',
    tags: ['CRM AI', '銷售預測', '客戶洞察'],
    url: 'https://www.salesforce.com/products/einstein/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Salesforce Einstein Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'business-analytics'],
    targetAudience: ['銷售團隊', 'CRM管理員', '營銷人員'],
    userGroups: ['business-professional', 'data-analyst']
  },
  {
    id: 'mailchimp-ai',
    title: 'Mailchimp AI - 郵件營銷AI',
    description: 'Mailchimp的AI功能，優化郵件內容、發送時間和客戶細分。',
    tag: '郵件營銷',
    tags: ['郵件營銷', '客戶細分', '內容優化'],
    url: 'https://mailchimp.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Mailchimp Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'business-analytics'],
    targetAudience: ['數字營銷人員', '小企業主', '電商'],
    userGroups: ['business-professional', 'enterprise-manager']
  },
  {
    id: 'hootsuite-ai',
    title: 'Hootsuite AI - 社交媒體AI',
    description: '集成AI的社交媒體管理平台，優化發布時間和內容策略。',
    tag: '社交媒體',
    tags: ['社交媒體', '內容策略', '發布優化'],
    url: 'https://www.hootsuite.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Hootsuite Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'text-writing'],
    targetAudience: ['社交媒體經理', '品牌營銷', '代理商'],
    userGroups: ['business-professional', 'content-creator']
  },
  {
    id: 'klaviyo-ai',
    title: 'Klaviyo AI - 電商營銷AI',
    description: '專為電商設計的AI營銷平台，提供個性化推薦和客戶行為分析。',
    tag: '電商營銷',
    tags: ['電商營銷', '個性化推薦', '行為分析'],
    url: 'https://www.klaviyo.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Klaviyo Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'business-analytics'],
    targetAudience: ['電商企業', '營銷人員', '數據分析師'],
    userGroups: ['business-professional', 'data-analyst']
  },
  {
    id: 'typeform-ai',
    title: 'Typeform AI - 智能表單',
    description: '集成AI的表單建構平台，提供智能問題推薦和數據洞察。',
    tag: '智能表單',
    tags: ['智能表單', '數據收集', '用戶洞察'],
    url: 'https://www.typeform.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Typeform Logo',
    category: 'creative-tools',
    categories: ['creative-tools', 'business-analytics'],
    targetAudience: ['市場研究', '產品經理', '用戶體驗'],
    userGroups: ['data-analyst', 'business-professional']
  },

  // === AI助手/對話工具類工具 (5個) ===
  {
    id: 'chipp-ai',
    title: 'Chipp.ai - 無代碼聊天機器人平台',
    description: '一個讓非開發者也能輕鬆構建和部署自己 GPT 驅動的聊天機械人的平台。它提供了一個無代碼界面。',
    tag: '聊天機械人',
    tags: ['聊天機械人', '無代碼', 'GPT'],
    url: 'https://chipp.ai/',
    imageUrl: 'https://uploads-ssl.webflow.com/642f3a6a12b86e06b325251a/642f4007b036f634515152fa_Logo-White.svg',
    imageAlt: 'Chipp.ai Logo',
    category: 'ai-assistant',
    categories: ['ai-assistant', 'web-development'],
    targetAudience: ['創業者', '產品經理', '希望使用 AI 的小型企業', '客服團隊'],
    userGroups: ['enterprise-manager', 'data-analyst', 'business-professional']
  },
  {
    id: 'drift-ai',
    title: 'Drift AI - 對話營銷AI',
    description: 'AI驅動的對話營銷平台，自動化客戶互動和潛在客戶開發。',
    tag: '對話營銷',
    tags: ['對話營銷', '客戶互動', '潛客開發'],
    url: 'https://www.drift.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Drift Logo',
    category: 'ai-assistant',
    categories: ['ai-assistant', 'business-analytics'],
    targetAudience: ['銷售團隊', '營銷人員', '客服團隊'],
    userGroups: ['business-professional']
  },
  {
    id: 'intercom-ai',
    title: 'Intercom AI - 客服AI助手',
    description: '智能客服平台，提供AI聊天機器人和自動化客戶支持。',
    tag: '客服AI',
    tags: ['客服AI', '聊天機器人', '客戶支持'],
    url: 'https://www.intercom.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Intercom Logo',
    category: 'ai-assistant',
    categories: ['ai-assistant', 'business-analytics'],
    targetAudience: ['客服團隊', '企業支持', 'SaaS公司'],
    userGroups: ['enterprise-manager', 'business-professional']
  },
  {
    id: 'perplexity-ai',
    title: 'Perplexity AI - AI搜索引擎',
    titleEn: 'Perplexity AI - AI Search Engine',
    description: '新一代AI搜索引擎，提供實時信息搜索和智能問答功能，結合了搜索和對話的能力。',
    descriptionEn: 'Next-generation AI search engine that provides real-time information search and intelligent Q&A functionality, combining search and conversational capabilities.',
    tag: 'AI搜索',
    tags: ['AI搜索', '智能問答', '實時信息'],
    url: 'https://www.perplexity.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Perplexity AI Logo',
    category: 'ai-assistant',
    categories: ['ai-assistant', 'creative-tools'],
    targetAudience: ['研究人員', '學生', '知識工作者', '任何需要快速獲取信息的人'],
    userGroups: ['educator', 'data-analyst', 'productivity-user']
  },
  {
    id: 'phind-ai',
    title: 'Phind - 開發者AI搜索',
    description: '專為開發者設計的AI搜索引擎，能夠理解編程問題並提供準確的代碼解決方案。',
    tag: '開發者搜索',
    tags: ['開發者搜索', 'AI編程', '代碼解決方案'],
    url: 'https://www.phind.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Phind Logo',
    category: 'ai-assistant',
    categories: ['ai-assistant', 'web-development'],
    targetAudience: ['軟件開發者', '程序員', '技術學習者', 'AI工程師'],
    userGroups: ['tech-developer']
  },

  // === 網站/程式開發類工具 (8個) ===
  {
    id: 'cursor',
    title: 'Cursor - AI 代碼編輯器',
    description: '一款專為與 AI 協作而設計的代碼編輯器。它深度集成了 AI 功能，可以幫助開發者更快地編寫、理解和重構代碼。',
    tag: '代碼編輯器',
    tags: ['代碼編輯器', 'AI 編程', '開發工具'],
    url: 'https://cursor.com/cn',
    imageUrl: 'https://cursor.com/brand/logo-white.svg',
    imageAlt: 'Cursor Logo',
    category: 'web-development',
    categories: ['web-development'],
    targetAudience: ['軟件開發者', '程序員', 'AI 工程師', '技術團隊'],
    userGroups: ['tech-developer']
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot - AI程式助手',
    titleEn: 'GitHub Copilot - AI Programming Assistant',
    description: 'GitHub和OpenAI合作的AI程式助手，提供智能代碼完成和建議。',
    descriptionEn: 'AI programming assistant developed through collaboration between GitHub and OpenAI, providing intelligent code completion and suggestions.',
    tag: 'AI編程',
    tags: ['AI編程', '代碼完成', '程式助手'],
    url: 'https://github.com/features/copilot',
    imageUrl: '/placeholder.svg',
    imageAlt: 'GitHub Copilot Logo',
    category: 'web-development',
    categories: ['web-development'],
    targetAudience: ['軟體開發者', '程式設計師', '技術團隊'],
    userGroups: ['tech-developer']
  },
  {
    id: 'tabnine',
    title: 'Tabnine - AI代碼自動完成',
    description: '先進的AI代碼自動完成工具，支援多種程式語言和IDE整合。',
    tag: '代碼完成',
    tags: ['代碼完成', 'IDE整合', '多語言支援'],
    url: 'https://www.tabnine.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Tabnine Logo',
    category: 'web-development',
    categories: ['web-development'],
    targetAudience: ['開發者', '程式設計師', '軟體工程師'],
    userGroups: ['tech-developer']
  },
  {
    id: 'replit-ai',
    title: 'Replit AI - 雲端編程AI',
    description: '整合AI的雲端開發環境，提供智能編程輔助和自動化部署。',
    tag: '雲端編程',
    tags: ['雲端編程', '智能輔助', '自動部署'],
    url: 'https://replit.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Replit Logo',
    category: 'web-development',
    categories: ['web-development'],
    targetAudience: ['學生開發者', '原型設計', '快速開發'],
    userGroups: ['tech-developer', 'educator']
  },
  {
    id: 'postman-ai',
    title: 'Postman AI - API測試AI',
    description: 'Postman的AI功能，自動化API測試和文檔生成。',
    tag: 'API測試',
    tags: ['API測試', '自動化測試', '文檔生成'],
    url: 'https://www.postman.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Postman Logo',
    category: 'web-development',
    categories: ['web-development', 'business-analytics'],
    targetAudience: ['後端開發者', 'API開發', '測試工程師'],
    userGroups: ['tech-developer']
  },
  {
    id: 'linear-ai',
    title: 'Linear AI - 項目管理AI',
    description: '為開發團隊設計的AI項目管理工具，自動化工作流程和問題追蹤。',
    tag: '項目管理',
    tags: ['項目管理', '工作流程', '問題追蹤'],
    url: 'https://linear.app/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Linear Logo',
    category: 'web-development',
    categories: ['web-development', 'creative-tools'],
    targetAudience: ['開發團隊', '產品經理', '技術領導'],
    userGroups: ['tech-developer', 'data-analyst']
  },
  {
    id: 'retool-ai',
    title: 'Retool AI - 低代碼開發AI',
    description: '集成AI的低代碼開發平台，快速構建內部工具和應用程式。',
    tag: '低代碼',
    tags: ['低代碼', '快速開發', '內部工具'],
    url: 'https://retool.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Retool Logo',
    category: 'web-development',
    categories: ['web-development', 'creative-tools'],
    targetAudience: ['企業開發', '內部工具', '快速原型'],
    userGroups: ['tech-developer', 'enterprise-manager']
  },
  {
    id: 'v0-vercel',
    title: 'V0 by Vercel - AI界面生成器',
    description: 'Vercel推出的AI界面生成工具，能根據文字描述快速生成React組件和網頁界面代碼。',
    tag: 'AI界面生成',
    tags: ['AI界面生成', 'React組件', '前端開發'],
    url: 'https://v0.dev/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'V0 by Vercel Logo',
    category: 'web-development',
    categories: ['web-development', 'ai-drawing'],
    targetAudience: ['前端開發者', 'UI開發者', '全棧開發者', '設計師'],
    userGroups: ['tech-developer', 'creative-professional']
  }
];

// 批量更新影片相關工具分類
const videoContentUpdates = allTools.map(tool => {
  if (tool.category === 'video-generation' || tool.category === 'video-editing' || 
      tool.categories.includes('video-generation') || tool.categories.includes('video-editing')) {
    return {
      ...tool,
      category: 'video-content',
      categories: tool.categories.map(cat => 
        cat === 'video-generation' || cat === 'video-editing' ? 'video-content' : cat
      ).filter((cat, index, arr) => arr.indexOf(cat) === index) // 去重
    };
  }
  return tool;
});

// 批量更新音樂音頻工具分類
const audioMusicUpdates = videoContentUpdates.map(tool => {
  if (tool.category === 'music-generation' || 
      tool.categories.includes('music-generation')) {
    return {
      ...tool,
      category: 'audio-music',
      categories: tool.categories.map(cat => 
        cat === 'music-generation' ? 'audio-music' : cat
      ).filter((cat, index, arr) => arr.indexOf(cat) === index)
    };
  }
  return tool;
});

// 批量更新文字內容工具分類
const textContentUpdates = audioMusicUpdates.map(tool => {
  if (tool.category === 'text-writing' || tool.category === 'presentation-charts' ||
      tool.categories.includes('text-writing') || tool.categories.includes('presentation-charts')) {
    return {
      ...tool,
      category: 'text-content',
      categories: tool.categories.map(cat => 
        cat === 'text-writing' || cat === 'presentation-charts' ? 'text-content' : cat
      ).filter((cat, index, arr) => arr.indexOf(cat) === index)
    };
  }
  return tool;
});

// 批量更新商業工具分類
const businessToolsUpdates = textContentUpdates.map(tool => {
  if (tool.category === 'business-analytics' || tool.category === 'ai-assistant' || tool.category === 'web-development' ||
      tool.categories.includes('business-analytics') || tool.categories.includes('ai-assistant') || tool.categories.includes('web-development')) {
    return {
      ...tool,
      category: 'business-tools',
      categories: tool.categories.map(cat => 
        cat === 'business-analytics' || cat === 'ai-assistant' || cat === 'web-development' ? 'business-tools' : cat
      ).filter((cat, index, arr) => arr.indexOf(cat) === index)
    };
  }
  return tool;
});

// 批量更新創意其他工具分類
const creativeOthersUpdates = businessToolsUpdates.map(tool => {
  if (tool.category === 'creative-tools' || 
      tool.categories.includes('creative-tools')) {
    return {
      ...tool,
      category: 'creative-others',
      categories: tool.categories.map(cat => 
        cat === 'creative-tools' ? 'creative-others' : cat
      ).filter((cat, index, arr) => arr.indexOf(cat) === index)
    };
  }
  return tool;
});

// 最終處理後的工具數據 - 重新導出為 allTools
export { creativeOthersUpdates as allTools };

// 工具計數統計
export const getToolsCount = () => ({
  total: creativeOthersUpdates.length,
  byCategory: toolCategories.reduce((acc, category) => {
    if (category.id !== 'all') {
      acc[category.id] = creativeOthersUpdates.filter(tool => 
        tool.category === category.id || tool.categories.includes(category.id)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>)
}); 