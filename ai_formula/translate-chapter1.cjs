const fs = require('fs');
const path = require('path');

// 讀取原始檔案
const filePath = path.join(__dirname, 'src/data/midjourney-course-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 第一章翻譯對照表
const translations = {
  // 章節基本資訊
  '第一章：Midjourney 基礎概念與準備': 'Chapter 1: Midjourney Basic Concepts and Preparation',
  '建立對 Midjourney 的全面認識。我們將會探討 AI 藝術生成的核心概念，了解 Midjourney 的工作原理，並完成所有必要的帳戶設定和初始配置。': 'Establish comprehensive understanding of Midjourney. We shall explore core concepts of AI art generation, understand how Midjourney works, and complete all necessary account setup and initial configuration.',
  '75 分鐘': '75 minutes',

  // 課程 1.1
  '1.1 什麼是 Midjourney：解構 AI 藝術生成的魔法': '1.1 What is Midjourney: Deconstructing the Magic of AI Art Generation',
  '15 分鐘': '15 minutes',
  '深入理解 Midjourney 的本質、工作原理和在 AI 藝術領域的地位': 'Deeply understand Midjourney\'s essence, working principles, and position in the AI art field',
  'Midjourney 概念介紹': 'Midjourney concept introduction',
  
  // 課程 1.2  
  '1.2 雙平台操作：Discord vs. Midjourney 網站': '1.2 Dual Platform Operations: Discord vs. Midjourney Website',
  '12 分鐘': '12 minutes',
  '比較兩個主要操作平台的特點、優勢與使用場景': 'Compare the characteristics, advantages, and usage scenarios of the two main operating platforms',
  '平台比較分析': 'Platform comparison analysis',

  // 課程 1.3
  '1.3 註冊與登入：開啟你的 AI 藝術之旅': '1.3 Registration and Login: Begin Your AI Art Journey',
  '10 分鐘': '10 minutes',
  '完成 Midjourney 帳戶註冊和基本設定': 'Complete Midjourney account registration and basic setup',
  '帳戶註冊流程': 'Account registration process',

  // 課程 1.4
  '1.4 Discord 整合：連接創意社群的神經網絡': '1.4 Discord Integration: Connecting the Neural Network of the Creative Community',
  '18 分鐘': '18 minutes',
  '學習 Discord 基本操作和與 Midjourney 的整合使用': 'Learn Discord basic operations and integrated usage with Midjourney',
  'Discord 設定指南': 'Discord setup guide',

  // 課程 1.5
  '1.5 私人伺服器設定：創造你的專屬創作空間': '1.5 Private Server Setup: Create Your Exclusive Creative Space',
  '20 分鐘': '20 minutes',
  '建立個人 Discord 伺服器，優化創作環境和學習體驗': 'Establish personal Discord server, optimise creative environment and learning experience',
  '私人伺服器建立': 'Private server creation',

  // KeyPoints 翻譯
  'Midjourney 是領先的「文本到圖像」AI 生成器': 'Midjourney is a leading text-to-image AI generator',
  '使用者透過「提示詞」與 AI 進行創作協作': 'Users collaborate with AI through prompts',
  '重新定義了傳統的「繪畫」概念': 'Redefines the traditional concept of drawing',
  '具備強大的風格多樣性和細節表現力': 'Possesses powerful stylistic diversity and detailed expressiveness',

  'Discord 是歷史悠久的操作平台': 'Discord is the time-honoured operating platform',
  'Midjourney 網站提供更直觀的體驗': 'Midjourney website provides a more intuitive experience',
  '兩個平台各有其獨特優勢': 'Each platform has its unique advantages',
  '根據需求選擇合適的平台': 'Choose the appropriate platform according to needs',

  '支援 Discord 和 Google 帳戶註冊': 'Supports Discord and Google account registration',
  '註冊過程簡單快速': 'Registration process is simple and quick',
  '需要完成基本的帳戶設定': 'Requires completion of basic account setup',
  '為後續使用做好準備': 'Prepares for subsequent usage',

  'Discord 是 Midjourney 的核心平台': 'Discord is Midjourney\'s core platform',
  '學習基本的 Discord 操作': 'Learn basic Discord operations',
  '理解與 Midjourney Bot 的互動方式': 'Understand interaction methods with Midjourney Bot',
  '掌握社群參與的基本禮儀': 'Master basic etiquette for community participation',

  '私人伺服器提供專注的創作環境': 'Private servers provide focused creative environments',
  '避免公共頻道的混亂和干擾': 'Avoid chaos and interference from public channels',
  '能夠更好地追蹤和整理作品': 'Better able to track and organise works',
  '顯著提升學習效率和體驗': 'Significantly improve learning efficiency and experience',

  // 測驗相關
  '第一章測驗：Midjourney 基礎概念與準備': 'Chapter 1 Quiz: Midjourney Basic Concepts and Preparation',
  '測試您對 Midjourney 基礎概念和準備工作的理解': 'Test your understanding of Midjourney basic concepts and preparation',

  // 測驗問題翻譯
  'Midjourney 的主要目的是什麼？': 'What is the main purpose of Midjourney?',
  '創建文本到圖像的人工智能生成器': 'Create text-to-image artificial intelligence generator',
  '生成文本描述': 'Generate text descriptions',
  '創建動畫視頻': 'Create animated videos',
  '開發自駕技術': 'Develop autonomous driving technology',

  '在 Midjourney 中，AI 和使用者之間的關係最類似於哪種模式？': 'In Midjourney, which model does the relationship between AI and users most resemble?',
  'AI 作為協作夥伴，根據使用者的語言指導進行創作': 'AI as collaborative partner, creating based on user\'s linguistic guidance',
  'AI 完全獨立創作，不需要使用者輸入': 'AI creates completely independently without user input',
  '使用者完全控制每個細節，AI 僅作為工具': 'Users completely control every detail, AI serves merely as a tool',
  'AI 和使用者競爭創作主導權': 'AI and users compete for creative control',

  'Midjourney 主要通過哪個平台進行操作？': 'Which platform does Midjourney primarily operate through?',
  'Discord': 'Discord',
  'Facebook': 'Facebook',
  'Instagram': 'Instagram',
  'Twitter': 'Twitter',

  '有效的提示詞結構通常包括哪些核心元素？': 'What core elements does an effective prompt structure typically include?',
  '主體、媒介、光線、環境和風格': 'Subject, medium, lighting, environment and style',
  '僅需要簡單的關鍵詞': 'Only requires simple keywords',
  '必須使用技術術語': 'Must use technical terminology',
  '需要詳細的程式碼': 'Requires detailed code',

  '為什麼建議使用私人 Discord 伺服器？': 'Why is using a private Discord server recommended?',
  '提供安靜、專注的創作環境，避免公共頻道的混亂': 'Provides quiet, focused creative environment, avoiding chaos of public channels',
  '免費獲得更多功能': 'Get more features for free',
  '可以邀請更多朋友': 'Can invite more friends',
  '獲得優先技術支援': 'Receive priority technical support',

  'Midjourney 目前是否提供免費試用？': 'Does Midjourney currently offer free trials?',
  '不，除了極少數推廣活動期間': 'No, except during very few promotional periods',
  '是，所有新用戶都有免費試用': 'Yes, all new users have free trials',
  '只對學生提供免費試用': 'Only offers free trials to students',
  '僅在特定地區提供免費試用': 'Only offers free trials in specific regions',

  'Midjourney 網站相比 Discord 的主要優勢是什麼？': 'What is the main advantage of the Midjourney website compared to Discord?',
  '提供更直觀和用戶友好的體驗，整合參數設定和作品整理工具': 'Provides more intuitive and user-friendly experience, integrating parameter settings and artwork organisation tools',
  '完全免費使用': 'Completely free to use',
  '生成速度更快': 'Faster generation speed',
  '圖像質量更高': 'Higher image quality'
};

// 解釋翻譯
const explanationTranslations = {
  'Midjourney 是一個頂尖的「文本到圖像」（text-to-image）人工智能生成器，專門將文字描述轉化為高質素的圖像。': 'Midjourney is a leading \'text-to-image\' artificial intelligence generator that specialises in transforming text descriptions into high-quality images.',
  'AI 主要根據用戶提供的文字提示詞（Prompt）來生成圖像，扮演協作夥伴的角色。': 'AI primarily generates images based on text prompts provided by users, playing the role of a collaborative partner.',
  'Discord 是 Midjourney 最初和最重要的操作平台，雖然現在也有官方網站，但 Discord 仍是核心平台。': 'Discord is Midjourney\'s original and most important operating platform. Whilst an official website now exists, Discord remains the core platform.',
  '有效的提示詞結構包括主體（Subject）、媒介（Medium）、光線（Lighting）、環境（Environment）和風格（Style）等核心元素。': 'Effective prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style.',
  '私人 Discord 伺服器提供安靜、專注的創作環境，避免公共頻道的混亂和干擾，能顯著改善學習體驗。': 'Private Discord servers provide quiet, focused creative environments, avoiding chaos and interference from public channels, significantly improving the learning experience.',
  'Midjourney 目前已經不再提供常規的免費試用，除了在極少數的推廣活動期間。': 'Midjourney no longer provides regular free trials, except during very few promotional periods.',
  'Midjourney 網站提供了比 Discord 更加直觀和用戶友好的體驗，整合了各種參數設定和作品整理工具。': 'The Midjourney website provides a more intuitive and user-friendly experience than Discord, integrating various parameter settings and artwork organisation tools.'
};

// 長文本 transcript 翻譯
const transcriptTranslations = {
  'Midjourney 是一個獨立研究實驗室，致力於探索新的思維媒介，並擴展人類物種的想像力。簡單來說，它是一個頂尖的「文本到圖像」（text-to-image）人工智能生成器。使用者透過輸入自然語言描述，即所謂的「提示詞」（Prompt），AI 就會將這些文字概念轉化為獨一無二、高質素的圖像。\n\n這個過程不再是傳統意義上的「繪畫」，而是一種全新的創作方式，使用者扮演的角色更像一位導演或概念藝術家，用語言指導一位才華橫溢但沒有實體的 AI 畫家。這種人機協作的模式，正在重新定義我們對創意同藝術表達的理解。\n\nMidjourney 的核心優勢在於其強大的風格多樣性和細節表現力。它能夠模擬各種藝術風格，從古典油畫到現代數位藝術，從攝影寫實到抽象表現主義。更重要的是，它理解創意語言，能夠將模糊的創意想法轉化為具體的視覺呈現。': 
  'Midjourney is an independent research laboratory dedicated to exploring new mediums of thought and expanding the imaginative powers of the human species. Put simply, it is a leading \'text-to-image\' artificial intelligence generator. Users input natural language descriptions—so-called \'prompts\'—and the AI transforms these textual concepts into unique, high-quality images.\n\nThis process is no longer \'drawing\' in the traditional sense, but rather a completely new method of creation. The user\'s role is more akin to that of a director or concept artist, using language to guide a talented yet incorporeal AI painter. This model of human-machine collaboration is redefining our understanding of creativity and artistic expression.\n\nMidjourney\'s core strength lies in its powerful diversity of styles and detailed expressiveness. It can simulate various artistic styles, from classical oil paintings to modern digital art, and from photographic realism to abstract expressionism. More importantly, it understands creative language, enabling it to transform vague creative ideas into concrete visual presentations.',

  'Midjourney 的操作主要通過兩個平台進行：歷史悠久的 Discord 伺服器和越來越強大的官方網站。了解兩者的差別和優勢，是根據不同需求選擇最佳工具的關鍵。\n\n最初，Midjourney 幾乎完全依賴於 Discord 這個社群聊天應用程式運作。然而，為了走向主流，降低使用門檻，Midjourney 開發了一個功能齊全的網站介面。這個網站提供了一個更為直觀和用戶友好的體驗。在網站的 Create 頁面，使用者可以在輸入框直接輸入提示詞，並實時觀看圖像生成的過程，介面亦整合了各種參數設定和作品整理工具。\n\n與此同時，Discord 依然是 Midjourney 生態系統中不可或缺的一部分。它是一個龐大的創意社群所在地，用戶可以在這裡參與每日主題創作、觀摩他人作品、尋求幫助，並使用一些 Discord 獨有的指令，例如 /blend。':
  'Midjourney operates primarily through two platforms: the time-honoured Discord server and the increasingly powerful official website. Understanding the differences and advantages of both is crucial to selecting the optimal tool for varying needs.\n\nInitially, Midjourney relied almost entirely on Discord, a community chat application. However, to move into the mainstream and lower barriers to entry, Midjourney developed a fully-featured website interface. This website provides a more intuitive and user-friendly experience. On the website\'s Create page, users can input prompts directly in the input box and watch the image generation process in real-time. The interface also integrates various parameter settings and artwork organisation tools.\n\nAt the same time, Discord remains an indispensable part of the Midjourney ecosystem. It is home to a vast creative community where users can participate in daily themed creations, observe others\' work, seek help, and use some Discord-exclusive commands such as /blend.',

  '要開始使用 Midjourney，首先需要註冊一個帳戶。用戶可以選擇使用現有的 Discord 帳戶或 Google 帳戶進行註冊，過程非常簡單。\n\n註冊流程：\n1. 訪問 midjourney.com\n2. 點擊「Sign In」或「Get Started」\n3. 選擇使用 Discord 或 Google 帳戶登入\n4. 完成授權和基本設定\n\n註冊完成後，你就可以開始探索 Midjourney 的功能。如果你選擇使用 Discord 帳戶註冊，系統會自動將你的 Midjourney 帳戶與 Discord 帳戶連結，這樣你就可以在兩個平台之間無縫切換。':
  'To begin using Midjourney, you first need to register an account. Users can choose to register using an existing Discord account or Google account, and the process is very straightforward.\n\nRegistration process:\n1. Visit midjourney.com\n2. Click "Sign In" or "Get Started"\n3. Choose to log in using Discord or Google account\n4. Complete authorisation and basic setup\n\nOnce registration is complete, you can begin exploring Midjourney\'s features. If you choose to register using a Discord account, the system will automatically link your Midjourney account with your Discord account, allowing you to switch seamlessly between the two platforms.',

  '雖然 Midjourney 網站功能強大，但 Discord 依然是核心。本課將指導你完成必要的 Discord 設定。\n\n首先，如果你還沒有 Discord 帳戶，需要到 discord.com 註冊一個。Discord 是一個免費的聊天應用程式，專為遊戲玩家和社群而設計，但現在已經成為各種創意社群的熱門選擇。\n\n基本 Discord 操作：\n1. 下載並安裝 Discord 應用程式（電腦版或手機版）\n2. 加入 Midjourney 官方伺服器\n3. 熟悉頻道結構和基本指令\n4. 學習與 Midjourney Bot 的互動方式\n\n重要提醒：在 Midjourney 官方伺服器中，請遵守社群規則，保持禮貌和尊重。':
  'Although the Midjourney website is powerful, Discord remains at the core. This lesson will guide you through the necessary Discord setup.\n\nFirst, if you don\'t yet have a Discord account, you need to register one at discord.com. Discord is a free chat application designed for gamers and communities, but has now become a popular choice for various creative communities.\n\nBasic Discord operations:\n1. Download and install the Discord application (desktop or mobile version)\n2. Join the official Midjourney server\n3. Familiarise yourself with channel structure and basic commands\n4. Learn interaction methods with Midjourney Bot\n\nImportant reminder: In the official Midjourney server, please observe community rules and maintain politeness and respect.',

  'Midjourney 官方伺服器內的「新手村」（Newbies Channel）頻道人流極多，你的作品和訊息很快就會被其他人的內容「洗版」，導致難以追蹤和學習。因此，建立一個屬於自己的私人伺服器，並不是一個進階技巧，而是一個能從根本上提升學習效率的基礎步驟。在私人伺服器，只有你和 Midjourney Bot，你可以安靜、專注地進行創作和實驗。\n\n建立私人伺服器步驟：\n1. 在 Discord 左側，點擊「+」號建立伺服器\n2. 選擇「為我和我的朋友創建」\n3. 設定伺服器名稱和圖示\n4. 邀請 Midjourney Bot 加入你的伺服器\n\n設定完成後，你就有了一個專屬的創作空間，可以更好地追蹤你的作品進度，並有更多時間思考和學習。':
  'The "Newbies Channel" in the official Midjourney server has extremely high traffic, and your works and messages will quickly be "washed away" by other people\'s content, making it difficult to track and learn. Therefore, establishing your own private server is not an advanced technique, but rather a fundamental step that can dramatically improve learning efficiency. In a private server, it\'s just you and Midjourney Bot, allowing you to create and experiment quietly and with focus.\n\nSteps to create a private server:\n1. On the left side of Discord, click the "+" to create a server\n2. Select "Create My Own"\n3. Set server name and icon\n4. Invite Midjourney Bot to join your server\n\nOnce setup is complete, you\'ll have an exclusive creative space where you can better track your work progress and have more time to think and learn.'
};

// 應用所有翻譯
console.log('開始翻譯第一章內容...');

// 應用基本翻譯
Object.entries(translations).forEach(([chinese, english]) => {
  // 使用更精確的正則表達式來匹配完整的字串
  const regex = new RegExp(`(['"\`])${chinese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
  content = content.replace(regex, `$1${english}$1`);
  
  // 也處理沒有引號的情況
  const regexNoQuotes = new RegExp(`(?<=[:\s])${chinese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[,\s\n])`, 'g');
  content = content.replace(regexNoQuotes, english);
});

// 應用解釋翻譯
Object.entries(explanationTranslations).forEach(([chinese, english]) => {
  const regex = new RegExp(`(['"\`])${chinese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
  content = content.replace(regex, `$1${english}$1`);
});

// 應用長文本翻譯
Object.entries(transcriptTranslations).forEach(([chinese, english]) => {
  const regex = new RegExp(`(['"\`])${chinese.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
  content = content.replace(regex, `$1${english}$1`);
});

// 寫入更新後的檔案
fs.writeFileSync(filePath, content, 'utf8');
console.log('第一章翻譯完成！'); 