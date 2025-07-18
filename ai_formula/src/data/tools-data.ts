/**
 * AI工具數據定義檔案
 * 包含所有AI工具的標準化數據結構和內容
 */

// Tool interface 定義 - 與現有 ToolCard 組件相容，新增用戶群體標籤
export interface Tool {
  id: string;
  title: string;
  description: string;
  tag: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  targetAudience: string[];
  userGroups?: string[]; // 新增：用戶群體標籤
}

// 新增工具數據
export const allTools: Tool[] = [
  {
    id: 'lovart-ai',
    title: 'Lovart AI - AI 藝術創作工具',
    description: '一個專注於人工智能藝術創作的工具，可以根據用戶提供的提示快速生成圖像、音樂等各種類型的藝術作品，提供創意靈感和高效的創作方式。',
    tag: 'AI 繪圖',
    url: 'https://www.lovart.ai/home',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Lovart AI Logo',
    category: 'design',
    targetAudience: [
      '設計師',
      '藝術家', 
      '內容創作者',
      '插畫家'
    ],
    userGroups: ['content-creator', 'designer', 'artist']
  },
  {
    id: 'lupa-upscaler',
    title: 'Lupa Upscaler - AI 圖像增強工具', 
    description: '一個專業級嘅 AI 圖像與影片增強工具。可以將低解析度嘅圖片或影片升級為高清，並修復舊有或損壞嘅影像細節。',
    tag: '圖像增強',
    url: 'https://app.lupaupscaler.com/',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Lupa Upscaler Logo',
    category: 'design',
    targetAudience: [
      '攝影師',
      '影片製作人',
      '設計師',
      '內容創作者'
    ],
    userGroups: ['designer', 'content-creator']
  },
  {
    id: 'hedra',
    title: 'Hedra - AI 角色創作平台',
    description: '一個強大嘅 AI 角色創作平台，可以將靜態嘅人像圖片，根據你提供嘅聲音，生成口形同步、表情生動嘅動畫影片。',
    tag: '影片生成',
    url: 'https://www.hedra.com/',
    imageUrl: '/placeholder.svg', // 請替換為實際的 Logo URL
    imageAlt: 'Hedra Logo',
    category: 'video',
    targetAudience: [
      '影片創作者',
      '數字行銷人員',
      '設計師',
      '藝術家'
    ],
    userGroups: ['content-creator', 'marketer']
  },
  // === 新增工具批次 2024 ===
  {
    id: 'hailuo-ai-video',
    title: 'Hailuo AI Video (海螺AI) - AI 影片創作平台',
    description: '一個專注於 AI 影片創作和編輯的平台，可以根據文本或圖片，快速生成高質量的短片、廣告或社交媒體影片，並提供自動剪輯、轉場等功能。',
    tag: '影片生成',
    url: 'https://hailuoai.video/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Hailuo AI Video Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '市場營銷人員',
      '視頻製作人'
    ]
  },
  {
    id: 'eleven-labs',
    title: 'Eleven Labs - AI 語音生成平台',
    description: '一個世界頂級嘅 AI 語音生成平台，提供高質素嘅文字轉語音、語音風格定制，以及聲音複製功能，聲音效果非常自然流暢。',
    tag: '語音合成',
    url: 'https://elevenlabs.io/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Eleven Labs Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '播客',
      '影片製作人',
      '教育機構'
    ]
  },
  {
    id: 'heygen',
    title: 'Heygen - AI 虛擬人影片平台',
    description: '一個專業嘅 AI 影片生成平台，專注於創造虛擬人 (Avatar) 影片。你可以輸入文本，選擇一個 AI 虛擬人，佢就會幫你聲情並茂咁讀出嚟。',
    tag: 'AI 虛擬人',
    url: 'https://www.heygen.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Heygen Logo',
    category: 'video',
    targetAudience: [
      '企業培訓',
      '市場營銷人員',
      '內容創作者'
    ]
  },
  {
    id: 'chat4data-new',
    title: 'Chat4Data - AI 數據分析平台',
    description: '一個利用 AI 技術簡化數據查詢、分析和報告生成的工具平台，可以透過聊天界面，用自然語言進行數據分析。',
    tag: '數據分析',
    url: 'https://chat4data.ai/',
    imageUrl: '/aitools/chat4data.png',
    imageAlt: 'Chat4Data Logo',
    category: 'data',
    targetAudience: [
      '數據分析師',
      '業務決策者',
      '市場營銷人員'
    ]
  },
  {
    id: 'skyreels-ai',
    title: 'SkyReels AI - 自動化影片編輯工具',
    description: '一個自動化嘅 AI 影片生成同編輯工具，專為需要快速創作內容嘅營銷人員或品牌而設，可以自動添加特效、過渡和背景音樂。',
    tag: '影片生成',
    url: 'https://www.skyreels.ai/home',
    imageUrl: '/placeholder.svg',
    imageAlt: 'SkyReels AI Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '營銷人員',
      '品牌主'
    ]
  },
  {
    id: 'openai-cookbook',
    title: 'OpenAI Cookbook - Prompt 工程指南',
    description: '由 OpenAI 提供嘅官方指南，專門教用戶如何設計和編寫高效嘅提示語 (Prompt)，從而提升 GPT 模型嘅回答質量。',
    tag: 'Prompt Engineering',
    url: 'https://cookbook.openai.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'OpenAI Cookbook Logo',
    category: 'data',
    targetAudience: [
      'AI 開發者',
      '內容創作者',
      '學術研究者'
    ]
  },
  {
    id: 'seaweed-apt2-new',
    title: 'Seaweed APT2 - 網絡安全博客平台',
    description: '一個專為網絡安全專業人士而設的博客平台，專注於分享關於高級持續性威脅 (APT) 的分析與研究。',
    tag: '網絡安全',
    url: 'https://seaweed-apt.com/2',
    imageUrl: '/aitools/seaweed.png',
    imageAlt: 'Seaweed APT2 Logo',
    category: 'data',
    targetAudience: [
      '網絡安全研究員',
      'IT 專業人士'
    ]
  },
  {
    id: 'higgsfield-ai-new',
    title: 'Higgsfield AI - 圖片轉影片平台',
    description: '一個專注於將靜態圖像轉換為動態視頻嘅 AI 平台。可以為靜態內容增添動感效果，特別適合需要大量視頻創作嘅場合。',
    tag: '圖片轉影片',
    url: 'https://higgsfield.ai/',
    imageUrl: '/aitools/Higgsfield.png',
    imageAlt: 'Higgsfield AI Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '營銷人員',
      '設計師'
    ]
  },
  {
    id: 'unstable-ml-new',
    title: 'Unstable ML - AI 視覺工具平台',
    description: '一個多功能 AI 視覺工具，提供生成虛擬人物影片、背景移除、4K 高清升級、圖像重構同去除瑕疵等功能。',
    tag: 'AI 虛擬人',
    url: 'https://www.unstableml.com/',
    imageUrl: '/aitools/UnstableML.png',
    imageAlt: 'Unstable ML Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '營銷人員',
      '設計師'
    ]
  },
  {
    id: 'midjourney',
    title: 'Midjourney - AI 圖像生成平台',
    description: '一個頂級嘅 AI 圖像生成平台，只需輸入文字描述，即可生成極具藝術感同高質量嘅圖片，支援多種風格化創作。',
    tag: 'AI 繪圖',
    url: 'https://www.midjourney.com/home',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Midjourney Logo',
    category: 'design',
    targetAudience: [
      '藝術家',
      '設計師',
      '營銷人員',
      '遊戲開發者'
    ]
  },
  {
    id: 'stitch-with-google',
    title: 'Stitch with Google - AI UI 設計工具',
    description: 'Google 推出嘅一個 AI 設計工具，可以將文字描述或手繪草圖，快速轉換成網頁或 App 嘅 UI 設計，並導出成 Figma 或 HTML/CSS 檔案。',
    tag: 'UI 設計',
    url: 'https://stitch.withgoogle.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Stitch with Google Logo',
    category: 'design',
    targetAudience: [
      '設計師',
      '開發人員',
      '產品經理',
      '創業者'
    ]
  },
  {
    id: 'dream-machine-luma',
    title: 'Dream Machine (Luma Labs) - AI 影片生成',
    description: '一個效果驚人嘅 AI 影片生成工具，可以將文字或圖片轉換成具有流暢運鏡同高真實度嘅 5 秒影片，支援風格參考同影片修改。',
    tag: 'Text-to-Video',
    url: 'https://dream-machine.lumalabs.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Dream Machine Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '市場營銷人員',
      '設計師',
      '藝術家'
    ]
  },
  {
    id: 'mirage-ai-video',
    title: 'Mirage AI Video Generator - 移動端影片生成',
    description: '一個專注於移動端嘅 AI 影片生成 App，提供文字轉影片、圖片轉影片、動態鏡頭控制等功能，方便用戶隨時隨地創作。',
    tag: '影片生成',
    url: 'https://ai-mirage.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Mirage AI Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '市場營銷人員',
      '個人用戶'
    ]
  },
  {
    id: 'clipdrop-relight',
    title: 'Clipdrop Relight - AI 圖片重光工具',
    description: '一個先進嘅 AI 圖片重光工具，可以喺圖片拍攝之後，為其添加專業級嘅光源效果，自由調整顏色、位置、強度，提升圖片質感。',
    tag: '圖像編輯',
    url: 'https://clipdrop.co/relight',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Clipdrop Relight Logo',
    category: 'design',
    targetAudience: [
      '攝影師',
      '插畫師',
      '設計師',
      '內容創作者'
    ]
  },
  {
    id: 'databutton',
    title: 'Databutton - No-Code AI 開發平台',
    description: '一個無代碼 (No-Code) AI 應用程式開發平台，讓無技術背景嘅用戶可以透過自然語言，快速創建功能齊全嘅網絡應用程式。',
    tag: 'No-Code',
    url: 'https://databutton.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Databutton Logo',
    category: 'data',
    targetAudience: [
      '創業者',
      '業務人員',
      '團隊協作'
    ]
  },
  {
    id: 'd-id',
    title: 'D-ID - AI 虛擬人影片平台',
    description: '一個專業嘅 AI 虛擬人 (AI Avatar) 影片生成平台，可以將任何一張相片，結合文字或錄音，變成一個識得講嘢、有表情嘅虛擬人影片。',
    tag: 'AI 虛擬人',
    url: 'https://www.d-id.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'D-ID Logo',
    category: 'video',
    targetAudience: [
      '市場推廣團隊',
      '企業培訓',
      '內容創作者'
    ]
  },
  {
    id: 'anam-ai',
    title: 'Anam AI - 實時對話虛擬人',
    description: '一個專門創造超逼真、可以即時對話嘅 AI 虛擬人 (Digital Human) 嘅平台，強調情感表達同低延遲互動。',
    tag: '實時互動',
    url: 'https://lab.anam.ai/register',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Anam AI Logo',
    category: 'video',
    targetAudience: [
      '企業客服',
      '教育培訓',
      '醫療服務',
      '開發者'
    ]
  },
  // === 新增工具批次 2024-12 ===
  // 設計類工具
  {
    id: 'dreamina-capcut',
    title: 'Dreamina (Capcut) - AI 創意工具',
    description: 'CapCut (剪映) 旗下嘅 AI 創意工具，提供 AI 圖像生成、影片生成、一鍵修圖、移除物件等多種功能，對新手非常友好。',
    tag: 'AI 繪圖',
    url: 'https://dreamina.capcut.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Dreamina Logo',
    category: 'design',
    targetAudience: [
      '社交媒體創作者',
      '市場推廣人員',
      '設計師'
    ]
  },
  {
    id: 'leonardo-ai',
    title: 'Leonardo.ai - AI 創作平台',
    description: '一個功能強大嘅 AI 創作平台，提供自家研發嘅 AI 模型，專注於生成高質量、風格一致嘅遊戲資源、藝術作品同設計圖像。',
    tag: 'AI 繪圖',
    url: 'https://leonardo.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Leonardo.ai Logo',
    category: 'design',
    targetAudience: [
      '藝術家',
      '設計師',
      '遊戲開發者'
    ]
  },
  {
    id: 'app-alchemy',
    title: 'App Alchemy - App 設計工具',
    description: '一個專門用嚟快速生成應用程式 (App) 設計圖 (mockups) 嘅 AI 工具。可以透過聊天方式，即時將 App 嘅諗法變成專業級數嘅設計圖。',
    tag: 'UI 設計',
    url: 'https://appalchemy.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'App Alchemy Logo',
    category: 'design',
    targetAudience: [
      '創業者',
      '產品經理',
      '無設計背景人士'
    ]
  },
  {
    id: 'polotno-studio',
    title: 'Polotno Studio - 免費設計工具',
    description: '一個好似 Canva 嘅免費網上圖像設計工具。提供拖放式編輯、豐富素材庫，可以整社交媒體帖文、簡報、海報等，無需註冊，冇廣告。',
    tag: '平面設計',
    url: 'https://studio.polotno.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Polotno Studio Logo',
    category: 'design',
    targetAudience: [
      '學生',
      '老師',
      '內容創作者',
      '小企業主'
    ]
  },
  {
    id: 'anieraser',
    title: 'AniEraser (Media.io) - AI 萬能擦膠',
    description: '一個「AI 萬能擦膠」，專門用嚟移除相片同影片入面任何唔想要嘅嘢，例如路人、雜物、水印等，並用 AI 自然咁填補背景。',
    tag: '圖像編輯',
    url: 'https://anieraser.media.io/app/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'AniEraser Logo',
    category: 'design',
    targetAudience: [
      '普通用戶',
      '內容創作者',
      '攝影愛好者'
    ]
  },
  {
    id: 'clipdrop-stability',
    title: 'ClipDrop (by Stability AI) - AI 圖像工具箱',
    description: '一個「AI 圖像工具箱」，整合咗多種 AI 圖像處理功能，包括物件移除、一鍵去背、圖像生成、重新打光、圖片放大、延伸圖片等。',
    tag: 'AI 繪圖',
    url: 'https://clipdrop.co/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'ClipDrop Logo',
    category: 'design',
    targetAudience: [
      '設計師',
      '攝影師',
      '電商賣家',
      '開發者'
    ]
  },
  {
    id: 'krea-ai',
    title: 'Krea.ai - AI 創意遊樂場',
    description: '一個「AI 創意遊樂場」，最大特色係「即時 AI 繪圖」，可以即時將你畫嘅草圖根據文字指令變成高質素圖片，互動性極高。',
    tag: 'AI 繪圖',
    url: 'https://www.krea.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Krea.ai Logo',
    category: 'design',
    targetAudience: [
      '設計師',
      '藝術家',
      '內容創作者'
    ]
  },
  {
    id: 'hautech-ai',
    title: 'Hautech.ai (Haute AI) - 時裝 AI 平台',
    description: '一個專為時裝界而設嘅 AI 平台，可以將一件衫嘅平鋪圖，自動生成一個虛擬模特兒著住件衫嘅逼真相片，大幅降低攝影成本。',
    tag: 'AI 模特兒',
    url: 'https://www.hautech.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Hautech.ai Logo',
    category: 'design',
    targetAudience: [
      '時裝品牌',
      '電商賣家',
      '市場推廣人員'
    ]
  },
  {
    id: 'dzine-ai',
    title: 'Dzine.ai - 精準控制 AI 畫圖',
    description: '一個俾你更多精準控制權嘅 AI 畫圖工具。引入好似 Photoshop 嘅圖層概念，可以精準定位、用草圖生成，並修正 AI 圖片嘅常見問題。',
    tag: 'AI 繪圖',
    url: 'https://www.dzine.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Dzine.ai Logo',
    category: 'design',
    targetAudience: [
      '專業設計師',
      '藝術家',
      '漫畫創作者'
    ]
  },
  {
    id: 'insmind',
    title: 'insMind.com - 產品攝影 AI 修圖',
    description: '一個專為「產品相」而設嘅免費 AI 修圖神器，提供 AI 背景移除/生成、物件移除、畫質提升、AI 時裝模特兒等功能。',
    tag: 'AI 修圖',
    url: 'https://www.insmind.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'insMind Logo',
    category: 'design',
    targetAudience: [
      '電商賣家',
      '市場推廣人員',
      '設計新手'
    ]
  },
  // 影片類工具
  {
    id: 'wan-video',
    title: 'Wan.video (通義萬相) - 阿里 AI 影片',
    description: '由阿里巴巴雲開發嘅頂尖 AI 影片生成模型，可以根據文字或圖片，一鍵生成長達 16 秒嘅 1080p 電影級高清影片。',
    tag: '影片生成',
    url: 'https://wan.video/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Wan.video Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '設計師',
      '廣告行業'
    ]
  },
  {
    id: 'hunyuan3d-2',
    title: 'Hunyuan3D-2 (混元3D-2) - 騰訊 3D 生成',
    description: '由騰訊開發嘅先進 AI 3D 模型生成器，可以將文字或 2D 圖片，直接生成一個包含高解像度紋理、非常逼真嘅 3D 模型。',
    tag: '3D生成',
    url: 'https://hunyuan-3d.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Hunyuan3D-2 Logo',
    category: 'video',
    targetAudience: [
      '遊戲開發者',
      '動畫師',
      '產品設計師'
    ]
  },
  {
    id: 'kling-ai',
    title: 'Kling AI (可靈) - 快手 AI 影片',
    description: '由快手科技開發嘅頂尖 AI 影片生成平台，能夠生成長達 2 分鐘嘅 1080p 高清影片，並能模擬複雜動作，效果媲美 OpenAI Sora。',
    tag: '影片生成',
    url: 'https://www.klingai.com/global/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Kling AI Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '廣告人員',
      '電影製作人'
    ]
  },
  {
    id: 'minimax-audio',
    title: 'Minimax Audio - 零樣本聲音複製',
    description: '一個非常先進嘅文字轉語音 (TTS) 工具，核心技術係「零樣本聲音複製 (Zero-Shot Voice Cloning)」，只需一小段錄音即可完美模仿該聲音。',
    tag: '語音合成',
    url: 'https://www.minimax.io/audio/text-to-speech',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Minimax Audio Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '有聲書製作者',
      '開發者'
    ]
  },
  {
    id: 'veo-google',
    title: 'Veo (Google DeepMind) - Google AI 影片',
    description: 'Google DeepMind 開發嘅頂尖 AI 影片生成模型，能夠根據文字指令創造出高質素、高像真度、甚至包含原生音效嘅 4K 影片。',
    tag: '影片生成',
    url: 'https://deepmind.google/models/veo/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Veo Logo',
    category: 'video',
    targetAudience: [
      '電影製作人',
      '廣告人員',
      '獨立創作者'
    ]
  },
  {
    id: 'topview-ai',
    title: 'TopView.ai - 市場推廣 AI 影片',
    description: '一個專為市場推廣而設嘅 AI 影片製作平台，提供 AI 虛擬人、AI 劇本、AI 配音同自動剪輯功能，可以 100% 用 AI 創造出完整嘅宣傳影片。',
    tag: '影片生成',
    url: 'https://www.topview.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'TopView.ai Logo',
    category: 'video',
    targetAudience: [
      '電商品牌',
      '廣告人員',
      'App 開發者'
    ]
  },
  {
    id: 'pika-art',
    title: 'Pika.art - AI 影片創作平台',
    description: '一個集強大功能同趣味性於一身嘅 AI 影片創作平台，提供文字/圖片轉影片、影片特效 (Pikaffects)、物件替換 (Pikaswaps) 等多種創意功能。',
    tag: '影片生成',
    url: 'https://pika.art/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Pika.art Logo',
    category: 'video',
    targetAudience: [
      '社交媒體創作者',
      '市場推廣人員',
      '藝術家'
    ]
  },
  {
    id: 'vidu-com',
    title: 'Vidu.com (生數科技) - 中國版 Sora',
    description: '由中國生數科技同清華大學聯合發布嘅頂尖 AI 影片生成模型，被視為中國版 Sora，能夠一鍵生成長達 16 秒嘅 1080p 高清影片。',
    tag: '影片生成',
    url: 'https://www.vidu.com/zh',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Vidu Logo',
    category: 'video',
    targetAudience: [
      '電影行業',
      '廣告人員',
      '內容創作者'
    ]
  },
  // 數據/開發類工具
  {
    id: 'suna-so',
    title: 'Suna.so - 全能 AI 代理',
    description: '一個「全能 AI 代理 (Generalist AI Agent)」，可以理解複雜指令，自主上網搵資料、處理文件，並完成報告，好似一個識做研究嘅虛擬員工。',
    tag: 'AI 代理',
    url: 'https://www.suna.so/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Suna.so Logo',
    category: 'data',
    targetAudience: [
      '市場分析師',
      '商業人士',
      '開發者'
    ]
  },
  {
    id: 'macaly',
    title: 'Macaly - No-Code AI 開發',
    description: '一個 AI 應用程式同網站製作平台，用戶可以透過自然語言（講嘢嘅方式）描述想法，AI 就會即時生成對應嘅應用，無需編程。',
    tag: 'No-Code',
    url: 'https://www.macaly.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Macaly Logo',
    category: 'data',
    targetAudience: [
      '創業者',
      '市場推廣人員',
      '無編程背景人士'
    ]
  },
  {
    id: 'deepsite',
    title: 'DeepSite - AI 網站開發工具',
    description: '一個寄存喺 Hugging Face 上嘅 AI 網站開發工具，基於 DeepSeek 模型，可以透過自然語言對話，即時生成同修改網站前端程式碼。',
    tag: 'AI 開發',
    url: 'https://huggingface.co/spaces/enzostvs/deepsite',
    imageUrl: '/placeholder.svg',
    imageAlt: 'DeepSite Logo',
    category: 'data',
    targetAudience: [
      '創業者',
      '無編程經驗人士',
      '開發者'
    ]
  },
  {
    id: 'prompt-cowboy',
    title: 'Prompt Cowboy - AI 指令優化',
    description: '一個 AI 指令 (Prompt) 優化工具。佢可以幫你將一個模糊嘅諗法，轉化成一個結構完整、具體清晰嘅專業 AI 指令，從而提升 AI 回應質素。',
    tag: 'Prompt Engineering',
    url: 'https://www.promptcowboy.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Prompt Cowboy Logo',
    category: 'data',
    targetAudience: [
      '內容創作者',
      '開發者',
      '學生',
      'AI 用戶'
    ]
  },
  {
    id: 'xynth-finance',
    title: 'Xynth Finance - AI 投資顧問',
    description: '一個「個人 AI 投資顧問」，利用 AI 模型結合實時市場數據、財報、社交媒體情緒等，進行深度投資分析，並生成簡潔報告。',
    tag: '金融科技',
    url: 'https://www.xynth.finance/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Xynth Finance Logo',
    category: 'data',
    targetAudience: [
      '投資新手',
      '資深投資者',
      '市場分析師'
    ]
  },
  {
    id: 'listenlabs-ai',
    title: 'ListenLabs.ai - AI 市場研究',
    description: '一個 AI 市場研究平台，利用 AI 訪問員同大量客戶進行一對一深度訪談，並快速生成分析報告，取代傳統又慢又貴嘅市調方法。',
    tag: '市場研究',
    url: 'https://listenlabs.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'ListenLabs.ai Logo',
    category: 'data',
    targetAudience: [
      '市場研究團隊',
      '產品經理',
      '品牌團隊'
    ]
  },
  {
    id: 'sudowrite-muse',
    title: 'Sudowrite Muse - AI 小說寫作',
    description: '一個專為寫小說而設計嘅 AI 寫作模型，擅長生成獨特文筆、創造精彩開頭、描寫細節，並能維持故事設定嘅一致性。',
    tag: 'AI 寫作',
    url: 'https://sudowrite.com/muse',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Sudowrite Muse Logo',
    category: 'data',
    targetAudience: [
      '小說作者',
      '故事創作者'
    ]
  },
  {
    id: 'firebase-studio',
    title: 'Firebase Studio - Google AI 開發工作空間',
    description: '一個由 Google 提供、AI 驅動嘅一站式開發工作空間，整合咗 Gemini 模型，可以透過自然語言輔助開發者完成前後端、手機 App 嘅編程工作。',
    tag: 'AI 開發',
    url: 'https://firebase.studio/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Firebase Studio Logo',
    category: 'data',
    targetAudience: [
      '開發者',
      '技術團隊'
    ]
  },
  {
    id: 'notebooklm-google',
    title: 'NotebookLM (Google) - AI 筆記助手',
    description: '一個專為你個人資料而設嘅 AI 筆記同研究助手。佢嘅知識來源只限於你上傳嘅文件，可以幫你快速總結、分析、搵出關聯，並且會引用來源。',
    tag: 'AI 筆記',
    url: 'https://notebooklm.google/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'NotebookLM Logo',
    category: 'data',
    targetAudience: [
      '學生',
      '研究人員',
      '作家',
      '專業人士'
    ]
  },
  {
    id: 'feedough-prompt',
    title: 'Feedough AI Prompt Generator - 免費指令產生器',
    description: '一個免費嘅 AI 指令產生器，可以幫你將一個簡單、模糊嘅諗法，轉化成一個結構完整、細節豐富嘅專業 AI 指令，提升 AI 回應質素。',
    tag: 'Prompt Engineering',
    url: 'https://www.feedough.com/ai-prompt-generator/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Feedough Logo',
    category: 'data',
    targetAudience: [
      'AI 新手',
      '學生',
      '內容創作者',
      '營銷人員'
    ]
  },
  {
    id: 'rosebud-ai',
    title: 'Rosebud AI - 多功能 AI 平台',
    description: '一個多功能 AI 平台，核心產品係一個可以用自然語言「講嘢」嚟整 3D 遊戲嘅工具，另外亦都有一個 AI 心理健康日記 App。',
    tag: '遊戲開發',
    url: 'https://rosebud.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Rosebud AI Logo',
    category: 'data',
    targetAudience: [
      '獨立遊戲開發者',
      '無編程經驗人士',
      '想提升心理健康嘅人'
    ]
  },
  {
    id: 'google-ai-studio',
    title: 'Google AI Studio - Gemini 實驗平台',
    description: 'Google 提供嘅官方 AI 模型實驗平台，可以俾開發者同愛好者直接試用最新、最強大嘅 Gemini 系列模型，並快速產生 API 程式碼。',
    tag: 'AI 模型',
    url: 'https://aistudio.google.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Google AI Studio Logo',
    category: 'data',
    targetAudience: [
      '開發者',
      'AI 愛好者',
      '研究人員',
      '學生'
    ]
  },
  {
    id: 'co-dev',
    title: 'co.dev (Codev) - AI 全端開發',
    description: '一個可以用自然語言「講嘢」嚟整全套 App 嘅 AI 開發平台，AI 會自動幫你寫好晒基於 Next.js 同 Supabase 嘅前後端程式碼。',
    tag: 'AI 開發',
    url: 'https://www.co.dev/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'co.dev Logo',
    category: 'data',
    targetAudience: [
      '非開發者',
      '開發者',
      '創業者'
    ]
  },
  // === 新增工具批次 2024-12-2 ===
  {
    id: 'speechma',
    title: 'Speechma.com - 免費文字轉語音',
    description: '一個完全免費、可以無限使用嘅文字轉語音 (TTS) 平台，提供超過 400 種高品質、自然嘅 AI 聲音，並支援商業用途。',
    tag: '語音合成',
    url: 'https://www.speechma.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Speechma Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '學生',
      '老師'
    ],
    userGroups: ['content-creator', 'student', 'teacher']
  },
  {
    id: 'backflip-ai',
    title: 'Backflip.ai - 3D 模型製作平台',
    description: '一個專為 3D 模型製作提供解決方案嘅 AI 平台，主要功能包括將 3D 掃描數據自動轉換成工程用嘅 CAD 模型，以及將概念草圖直接變成 3D 模型。',
    tag: '3D生成',
    url: 'https://www.backflip.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Backflip.ai Logo',
    category: 'video',
    targetAudience: [
      '工程師',
      '產品設計師',
      '3D 藝術家'
    ],
    userGroups: ['developer', 'designer']
  },
  {
    id: 'tripo3d-ai',
    title: 'Tripo3D.ai - AI 3D 生成平台',
    description: '一個基礎 AI 模型平台，專門用嚟生成 3D 模型，支援文字轉 3D、圖片轉 3D、甚至塗鴉轉 3D，目標係成為 3D 內容創作嘅基礎設施。',
    tag: '3D生成',
    url: 'https://www.tripo3d.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Tripo3D.ai Logo',
    category: 'video',
    targetAudience: [
      '遊戲開發者',
      '元宇宙創作者',
      '產品設計師'
    ],
    userGroups: ['developer', 'designer']
  },
  {
    id: 'prompt-llama',
    title: 'Prompt-llama.com - AI 圖片指令資料庫',
    description: '一個「AI 圖片指令 (Prompt) 資料庫」，專門收集同展示由 Midjourney, DALL·E 3 等唔同 AI 繪圖模型所生成嘅圖片指令，方便用戶搵靈感同比較模型效果。',
    tag: 'Prompt',
    url: 'https://prompt-llama.com/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Prompt-llama Logo',
    category: 'data',
    targetAudience: [
      'AI 繪圖愛好者',
      '藝術家',
      '研究人員'
    ],
    userGroups: ['artist', 'designer', 'student']
  },
  {
    id: 'infography-in',
    title: 'Infography.in - 資訊圖表製作工具',
    description: '一個專門將文字內容（例如長篇文章）快速轉化成精美資訊圖表 (Infographic) 嘅 AI 工具，令沉悶文字變得生動有趣。',
    tag: '資訊圖表',
    url: 'https://www.infography.in/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Infography.in Logo',
    category: 'design',
    targetAudience: [
      '內容創作者',
      'Blogger',
      '市場推廣人員',
      '老師'
    ],
    userGroups: ['content-creator', 'marketer', 'teacher']
  },
  {
    id: 'synthid-google',
    title: 'SynthID (Google DeepMind) - 數碼水印技術',
    description: '一個由 Google DeepMind 開發嘅「數碼水印」技術，專門將肉眼睇唔到嘅水印嵌入到 AI 生成嘅圖片、音訊、影片內容入面，用嚟分辨真假資訊。',
    tag: '數碼水印',
    url: 'https://deepmind.google/science/synthid/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'SynthID Logo',
    category: 'data',
    targetAudience: [
      'AI 平台',
      '開發者',
      '互聯網用戶'
    ],
    userGroups: ['developer', 'business']
  },
  {
    id: 'copycopter-ai',
    title: 'CopyCopter.ai - 一站式 AI 影片生成器',
    description: '一個「一站式」嘅 AI 影片生成器，可以幫你由零開始，將一個簡單嘅諗法，透過 AI 劇本、AI 配音、AI 圖像生成同自動素材匹配，變成一條完整影片。',
    tag: '影片生成',
    url: 'https://copycopter.ai/',
    imageUrl: '/placeholder.svg',
    imageAlt: 'CopyCopter.ai Logo',
    category: 'video',
    targetAudience: [
      'Faceless YouTube Channel 創作者',
      '市場推廣人員'
    ],
    userGroups: ['content-creator', 'marketer']
  },
  {
    id: 'genmo-ai',
    title: 'Genmo.ai - AI 影片動畫魔法師',
    description: '一個「AI 影片同動畫魔法師」，基於自主研發嘅開源模型 Mochi 1，可以將文字/圖片轉化成影片、進行風格轉換，並提供精準嘅動作同運鏡控制。',
    tag: '影片生成',
    url: 'https://www.genmo.ai/play',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Genmo.ai Logo',
    category: 'video',
    targetAudience: [
      '內容創作者',
      '電影製作人',
      '動畫師'
    ],
    userGroups: ['content-creator', 'artist']
  },
  {
    id: 'kaiber-superstudio',
    title: 'Kaiber.ai Superstudio - 多模態 AI 工作室',
    description: '一個「無限想像力嘅畫布」，將多種頂級嘅 AI 模型（影片、圖像、聲音）整合到一個統一、簡單易用嘅「超級工作室」介面。',
    tag: '多模態 AI',
    url: 'https://www.kaiber.ai/superstudio',
    imageUrl: '/placeholder.svg',
    imageAlt: 'Kaiber.ai Superstudio Logo',
    category: 'video',
    targetAudience: [
      '藝術家',
      '設計師',
      '音樂人',
      '影片創作者'
    ],
    userGroups: ['artist', 'designer', 'content-creator']
  }
];

// 導出工具類別定義 - 功能分類
export const toolCategories = [
  { id: 'all', label: '全部工具', labelEn: 'All Tools' },
  { id: 'design', label: '設計工具', labelEn: 'Design Tools' },
  { id: 'data', label: '數據工具', labelEn: 'Data Tools' },
  { id: 'video', label: 'AI影片工具', labelEn: 'AI Video Tools' },
  { id: 'marketing', label: 'AI行銷工具', labelEn: 'AI Marketing Tools' }
];

// 新增：用戶群體標籤分類
export const userGroupCategories = [
  { id: 'all-users', label: '全部用戶', labelEn: 'All Users', icon: '👥' },
  { id: 'content-creator', label: 'KOL/創作者', labelEn: 'Content Creators', icon: '🎬' },
  { id: 'student', label: '學生', labelEn: 'Students', icon: '🎓' },
  { id: 'marketer', label: '營銷人員', labelEn: 'Marketers', icon: '📈' },
  { id: 'designer', label: '設計師', labelEn: 'Designers', icon: '🎨' },
  { id: 'developer', label: '開發者', labelEn: 'Developers', icon: '💻' },
  { id: 'teacher', label: '老師', labelEn: 'Teachers', icon: '👨‍🏫' },
  { id: 'business', label: '商業人士', labelEn: 'Business Professionals', icon: '💼' },
  { id: 'artist', label: '藝術家', labelEn: 'Artists', icon: '🎭' },
  { id: 'entrepreneur', label: '創業者', labelEn: 'Entrepreneurs', icon: '🚀' }
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