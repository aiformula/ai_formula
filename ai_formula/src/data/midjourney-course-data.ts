/**
 * Midjourney 權威指南：從入門到精通的終極課程
 * @description 完整的 Midjourney AI 藝術創作課程資料
 * @author AI Formula Team
 * @version 1.1.0
 */

import { CourseData } from '@/components/course-template/types';

export const midjourneyCourseData: CourseData = {
  courseInfo: {
    title: 'Midjourney 權威指南：從入門到精通的終極課程',
    titleEn: 'Midjourney: The Definitive Guide from Beginner to Expert',
    subtitle: '超越基本操作，從雙平台特性到進階創作技巧，掌握AI藝術創作的強大工具',
    subtitleEn: 'Transcend basic operations: from dual-platform features to advanced creative techniques, master the powerful tools of AI art creation',
    description: '超越基本操作，從雙平台特性到進階創作技巧，掌握AI藝術創作的強大工具',
    descriptionEn: 'Transcend basic operations: from dual-platform features to advanced creative techniques, master the powerful tools of AI art creation',
    duration: '7+ 小時',
    durationEn: '7+ Hours',
    level: 'beginner_to_advanced',
    levelEn: 'Beginner to Advanced',
    totalLessons: 35,
    totalHours: 7.5,
    instructor: 'AI Formula Team',
    instructorEn: 'AI Formula Team',
    instructorTitle: 'AI 藝術創作專家',
    instructorTitleEn: 'AI Art Creation Experts',
    language: 'zh-HK',
    tags: ['Midjourney', 'AI Art', 'Digital Creation', 'Prompt Engineering'],
    tagsEn: ['Midjourney', 'AI Art', 'Digital Creation', 'Prompt Engineering'],
    prerequisites: [
      '基本電腦操作能力',
      'Discord 帳戶（或願意註冊）',
      '對 AI 藝術創作的興趣'
    ],
    prerequisitesEn: [
      'Basic computer literacy',
      'Discord account (or willingness to register)',
      'Interest in AI art creation'
    ],
    learningOutcomes: [
      '熟練掌握 Midjourney 的雙平台操作',
      '精通提示詞工程學和進階語法',
      '掌握角色一致性和風格控制',
      '建立專業級的創作工作流程'
    ],
    learningOutcomesEn: [
      'Master dual-platform operations in Midjourney',
      'Become proficient in prompt engineering and advanced syntax',
      'Master character consistency and style control',
      'Establish professional-level creative workflows'
    ]
  },
  courseStats: {
    totalHours: 7.5,
    totalLessons: 35,
    totalQuizzes: 5,
    completionRate: 95
  },
  targetAudience: [
    '希望學習 AI 藝術創作的初學者',
    '想要提升創作效率的設計師',
    '對 AI 工具感興趣的創意工作者',
    '需要高質量視覺內容的內容創作者'
  ],
  targetAudienceEn: [
    'Beginners who wish to learn AI art creation',
    'Designers seeking to enhance creative efficiency',
    'Creative professionals interested in AI tools',
    'Content creators requiring high-quality visual content'
  ],
  courseModules: [
    {
      id: 1,
      title: '第一章：Midjourney 基礎概念與準備',
      titleEn: 'Chapter 1: Midjourney Fundamental Concepts and Preparation',
      description: '為初學者奠定堅實的基礎，超越基本操作，從一開始就介紹 Midjourney 的雙平台特性（網站與 Discord），並優先建立私人伺服器。這個關鍵步驟能夠顯著改善學習體驗，為學員的創作旅程掃除初期障礙。',
      descriptionEn: 'Establish a solid foundation for beginners, transcending basic operations whilst introducing Midjourney\'s dual-platform features (website and Discord) from the outset. Prioritise establishing a private server—this crucial step significantly enhances the learning experience and removes initial barriers to students\' creative journeys.',
      duration: '90 分鐘',
      durationEn: '90 Minutes',
      lessons: [
        {
          id: 1,
          title: '1.1 Midjourney 是什麼？重新定義「繪畫」',
          titleEn: '1.1 What is Midjourney? Redefining \'Drawing\'',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'interactive' as const,
          description: '深入了解 Midjourney 的核心概念、工作原理和在 AI 藝術領域的獨特定位',
          descriptionEn: 'Acquire a comprehensive understanding of Midjourney\'s core concepts, operational principles, and unique position within the AI art field',
          image: '/images/courses/midjourney-course/unit-images/midjourney-intro.png',
          imageAlt: 'Midjourney AI 藝術創作概念圖',
          imageAltEn: 'Midjourney AI art creation concept diagram',
          transcript: `Midjourney 是一個獨立研究實驗室，致力於探索新的思維媒介，並擴展人類物種的想像力。簡單來說，它是一個頂尖的「文本到圖像」（text-to-image）人工智能生成器。使用者透過輸入自然語言描述，即所謂的「提示詞」（Prompt），AI 就會將這些文字概念轉化為獨一無二、高質素的圖像。

這個過程不再是傳統意義上的「繪畫」，而是一種全新的創作方式，使用者扮演的角色更像一位導演或概念藝術家，用語言指導一位才華橫溢但沒有實體的 AI 畫家。這種人機協作的模式，正在重新定義我們對創意同藝術表達的理解。

Midjourney 的核心優勢在於其強大的風格多樣性和細節表現力。它能夠模擬各種藝術風格，從古典油畫到現代數位藝術，從攝影寫實到抽象表現主義。更重要的是，它理解創意語言，能夠將模糊的創意想法轉化為具體的視覺呈現。`,
          transcriptEn: `Midjourney is an independent research laboratory dedicated to exploring new mediums of thought and expanding the imaginative powers of the human species. Put simply, it is a leading 'text-to-image' artificial intelligence generator. Users input natural language descriptions—so-called 'prompts'—and the AI transforms these textual concepts into unique, high-quality images.

This process is no longer 'drawing' in the traditional sense, but rather a completely new method of creation. The user's role is more akin to that of a director or concept artist, using language to guide a talented yet incorporeal AI painter. This model of human-machine collaboration is redefining our understanding of creativity and artistic expression.

Midjourney's core strength lies in its powerful diversity of styles and detailed expressiveness. It can simulate various artistic styles, from classical oil paintings to modern digital art, and from photographic realism to abstract expressionism. More importantly, it understands creative language, enabling it to transform vague creative ideas into concrete visual presentations.`,
          keyPoints: [
            'Midjourney 是領先的「文本到圖像」AI 生成器',
            '使用者透過「提示詞」與 AI 進行創作協作',
            '重新定義了傳統的「繪畫」概念',
            '具備強大的風格多樣性和細節表現力'
          ],
          keyPointsEn: [
            'Midjourney is a leading \'text-to-image\' AI generator',
            'Users collaborate with AI through \'prompts\'',
            'Redefines the traditional concept of \'drawing\'',
            'Possesses powerful stylistic diversity and detailed expressiveness'
          ],
          completed: false
        },
        {
          id: 2,
          title: '1.2 兩大創作平台：Discord vs Midjourney 網站',
          titleEn: '1.2 Two Major Creative Platforms: Discord vs Midjourney Website',
          duration: '20 分鐘',
          durationEn: '20 Minutes',
          type: 'interactive' as const,
          description: '了解 Discord 和官方網站兩個平台的差別和優勢，根據不同需求選擇最佳工具',
          descriptionEn: 'Understand the differences and advantages between Discord and the official website platforms, selecting the optimal tool according to varying requirements',
          image: '/images/courses/midjourney-course/unit-images/platforms-comparison.png',
          imageAlt: 'Discord 與 Midjourney 網站比較',
          imageAltEn: 'Comparison between Discord and Midjourney website',
          transcript: `Midjourney 的操作主要通過兩個平台進行：歷史悠久的 Discord 伺服器和越來越強大的官方網站。了解兩者的差別和優勢，是根據不同需求選擇最佳工具的關鍵。

最初，Midjourney 幾乎完全依賴於 Discord 這個社群聊天應用程式運作。然而，為了走向主流，降低使用門檻，Midjourney 開發了一個功能齊全的網站介面。這個網站提供了一個更為直觀和用戶友好的體驗。在網站的 Create 頁面，使用者可以在輸入框直接輸入提示詞，並實時觀看圖像生成的過程，介面亦整合了各種參數設定和作品整理工具。

與此同時，Discord 依然是 Midjourney 生態系統中不可或缺的一部分。它是一個龐大的創意社群所在地，用戶可以在這裡參與每日主題創作、觀摩他人作品、尋求幫助，並使用一些 Discord 獨有的指令，例如 /blend。`,
          transcriptEn: `Midjourney operates primarily through two platforms: the time-honoured Discord server and the increasingly powerful official website. Understanding the differences and advantages of both is crucial to selecting the optimal tool for varying needs.

Initially, Midjourney relied almost entirely on Discord, a community chat application. However, to move into the mainstream and lower barriers to entry, Midjourney developed a fully-featured website interface. This website provides a more intuitive and user-friendly experience. On the website's Create page, users can input prompts directly in the input box and watch the image generation process in real-time. The interface also integrates various parameter settings and artwork organisation tools.

At the same time, Discord remains an indispensable part of the Midjourney ecosystem. It is home to a vast creative community where users can participate in daily themed creations, observe others' work, seek help, and use some Discord-exclusive commands such as /blend.`,
          keyPoints: [
            '網站介面更直觀，適合專注創作',
            'Discord 擁有龐大的創意社群',
            '兩個平台各有獨特功能和優勢',
            '選擇平台應根據當下創作目標決定'
          ],
          keyPointsEn: [
            'Website interface is more intuitive, suitable for focused creation',
            'Discord has a vast creative community',
            'Both platforms have unique functions and advantages',
            'Platform choice should be based on current creative goals'
          ],
          completed: false
        },
        {
          id: 3,
          title: '1.3 註冊與訂閱：選擇最適合你的計劃',
          titleEn: '1.3 Registration and Subscription: Choosing the Plan That Suits You Best',
          duration: '25 分鐘',
          durationEn: '25 Minutes',
          type: 'interactive' as const,
          description: '學習如何註冊帳戶並選擇最適合的訂閱計劃，了解不同計劃的功能差異',
          descriptionEn: 'Learn how to register an account and select the most appropriate subscription plan, whilst comprehending the functional differences between various plans',
          image: '/images/courses/midjourney-course/unit-images/subscription-plans.png',
          imageAlt: '訂閱計劃比較',
          imageAltEn: 'Subscription plan comparison',
          transcript: `要開始使用 Midjourney，首先需要註冊一個帳戶。用戶可以選擇使用現有的 Discord 帳戶或 Google 帳戶進行註冊，過程非常簡單。

值得注意的是，Midjourney 目前已經不再提供常規的免費試用。除了在極少數的推廣活動期間，用戶必須訂閱付費計劃才可以生成圖像。訂閱可以透過官方網站的帳戶頁面完成，亦可以在 Discord 內輸入 /subscribe 指令，系統會生成一個個人專屬的訂閱頁面連結。

Midjourney 提供多種不同級別的訂閱計劃，以滿足不同用戶的需求。選擇合適的計劃對於成本效益和創作體驗都非常重要。`,
          transcriptEn: `To begin using Midjourney, you must first register an account. Users can choose to register using an existing Discord account or Google account, and the process is very straightforward.

It is worth noting that Midjourney no longer provides regular free trials. Except during very rare promotional activities, users must subscribe to a paid plan to generate images. Subscriptions can be completed through the account page on the official website, or by entering the /subscribe command in Discord, which will generate a personalised subscription page link.

Midjourney offers various subscription plans to meet the needs of different users. Selecting the appropriate plan is essential for both cost-effectiveness and creative experience.`,
          keyPoints: [
            'Can register using Discord or Google account',
            'No regular free trial currently available',
            'Multiple subscription plans available',
            'Can subscribe via website or Discord'
          ],
          keyPointsEn: [
            'Can register using Discord or Google account',
            'No regular free trial currently available',
            'Multiple subscription plans available',
            'Can subscribe via website or Discord'
          ],
          completed: false
        },
        {
          id: 4,
          title: '1.4 設置你的數位畫室：安裝 Discord 與加入伺服器',
          titleEn: '1.4 Setting Up Your Digital Studio: Installing Discord and Joining Servers',
          duration: '20 分鐘',
          durationEn: '20 Minutes',
          type: 'interactive' as const,
          description: '完成必要的 Discord 設定，學習如何加入 Midjourney 伺服器並接受服務條款',
          descriptionEn: 'Complete the requisite Discord setup, learn how to join Midjourney servers, and accept the terms of service',
          image: '/images/courses/midjourney-course/unit-images/discord-setup.png',
          imageAlt: 'Discord 設置指南',
          imageAltEn: 'Discord setup guide',
          transcript: `雖然 Midjourney 網站功能強大，但 Discord 依然是核心。本課將指導你完成必要的 Discord 設定。

安裝 Discord：首先，前往 Discord 官方網站 (discord.com) 下載並安裝適合你電腦（Windows/macOS）或手機（iOS/Android）的應用程式。你亦可以選擇直接使用網頁版，無需安裝。

加入 Midjourney 伺服器：點擊官方提供的邀請連結（例如 discord.gg/midjourney）。這個連結會在你的 Discord 應用程式或網頁中打開，並提示你加入 Midjourney 伺服器。點擊「接受邀請」即可成功加入。

接受服務條款 (ToS)：在你第一次嘗試生成圖像之前，Midjourney Bot 會彈出一個訊息，要求你接受其服務條款。這個是必須完成的步驟，點擊「Accept ToS」按鈕後，你才可以正式開始創作。`,
          transcriptEn: `Although the Midjourney website is powerful, Discord remains the core. This lesson will guide you through the necessary Discord setup.

Installing Discord: First, go to the official Discord website (discord.com) to download and install the application suitable for your computer (Windows/macOS) or phone (iOS/Android). You can also choose to use the web version directly without installation.

Joining the Midjourney Server: Click on the official invitation link (e.g., discord.gg/midjourney). This link will open in your Discord application or web browser and prompt you to join the Midjourney server. Click 'Accept Invitation' to successfully join.

Accepting Terms of Service (ToS): Before you attempt to generate your first image, Midjourney Bot will display a message asking you to accept its terms of service. This is a required step; only after clicking the 'Accept ToS' button can you officially begin creating.`,
          keyPoints: [
            '可選擇應用程式或網頁版 Discord',
            '使用官方邀請連結加入伺服器',
            '必須接受服務條款才能開始創作',
            'Discord 是 Midjourney 的核心平台'
          ],
          keyPointsEn: [
            'Choose between Discord app or web version',
            'Use official invitation link to join server',
            'Must accept terms of service to start creating',
            'Discord is the core platform for Midjourney'
          ],
          completed: false
        },
        {
          id: 5,
          title: '1.5 告別混亂：建立並設定你的私人 Discord 伺服器',
          titleEn: '1.5 Goodbye Chaos: Creating and Setting Up Your Private Discord Server',
          duration: '30 分鐘',
          durationEn: '30 Minutes',
          type: 'interactive' as const,
          description: '學習建立私人 Discord 伺服器，邀請 Midjourney Bot，創造專屬的創作環境',
          descriptionEn: 'Learn to create a private Discord server, invite the Midjourney Bot, and establish your own dedicated creative environment',
          image: '/images/courses/midjourney-course/unit-images/private-server.png',
          imageAlt: '私人伺服器設定',
          imageAltEn: 'Private server setup',
          transcript: `Midjourney 官方伺服器內的「新手村」（Newbies Channel）頻道人流極多，你的作品和訊息很快就會被其他人的內容「洗版」，導致難以追蹤和學習。因此，建立一個屬於自己的私人伺服器，並不是一個進階技巧，而是一個能從根本上提升學習效率的基礎步驟。在私人伺服器，只有你和 Midjourney Bot，你可以安靜、專注地進行創作和實驗。

以下是建立私人伺服器並邀請 Midjourney Bot 的步驟：

1. 建立新伺服器：在 Discord 介面左側的伺服器列表中，點擊最下方的「+」號按鈕。選擇「親自建立」，然後選擇「僅供我與好友使用」。為你的伺服器命名（例如「我的MJ畫室」），然後點擊「建立」。

2. 邀請 Midjourney Bot：返回 Midjourney 官方伺服器，在任何一個頻道（例如 #general-1）的成員列表中，找到並點擊「Midjourney Bot」。在彈出的視窗中，點擊「新增至伺服器」或「Add App」。在下拉選單中，選擇你剛剛建立的私人伺服器，然後按照指示完成授權。

3. 整理頻道：在你的私人伺服器中，你可以自由建立不同的文字頻道，用來分類你的項目。例如，你可以建立一個叫「#人物練習」的頻道，一個叫「#風景畫」的頻道，讓你的創作更有條理。`,
          transcriptEn: `The 'Newbies Channel' in the official Midjourney server has extremely high traffic, and your works and messages will quickly be 'washed away' by other people's content, making it difficult to track and learn. Therefore, creating your own private server is not an advanced technique, but rather a fundamental step that can significantly improve learning efficiency. In a private server, there's only you and the Midjourney Bot, allowing you to create and experiment quietly and with focus.

Here are the steps to create a private server and invite the Midjourney Bot:

1. Create New Server: In the server list on the left side of the Discord interface, click the '+' button at the bottom. Select 'Create My Own', then choose 'For me and my friends'. Name your server (e.g., 'My MJ Studio'), then click 'Create'.

2. Invite Midjourney Bot: Return to the official Midjourney server, find and click 'Midjourney Bot' in the member list of any channel (e.g., #general-1). In the pop-up window, click 'Add to Server' or 'Add App'. In the dropdown menu, select the private server you just created, then follow the instructions to complete authorisation.

3. Organise Channels: In your private server, you can freely create different text channels to categorise your projects. For example, you can create a channel called '#character-practice' and another called '#landscapes' to make your creations more organised.`,
          keyPoints: [
            '私人伺服器能避免官方伺服器的混亂',
            '提供專注的創作環境',
            '可自由建立分類頻道',
            '是提升學習效率的基礎步驟'
          ],
          keyPointsEn: [
            'Private servers avoid the chaos of official servers',
            'Provide a focused creative environment',
            'Can freely create categorised channels',
            'A fundamental step for improving learning efficiency'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第一章測驗：Midjourney 基礎概念與準備',
        titleEn: 'Chapter 1 Quiz: Midjourney Basic Concepts and Preparation',
        description: '測試您對 Midjourney 基礎概念和準備工作的理解',
        descriptionEn: 'Test your understanding of Midjourney basic concepts and preparation',
        timeLimit: 15,
        passingScore: 80,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: 'Midjourney 的主要目的是什麼？',
            questionEn: 'What is the main purpose of Midjourney?',
            options: [
              '創建文本到圖像的人工智能生成器',
              '生成文本描述',
              '創建動畫視頻',
              '開發自駕技術'
            ],
            optionsEn: [
              'Create text-to-image artificial intelligence generator',
              'Generate text descriptions',
              'Create animated videos',
              'Develop autonomous driving technology'
            ],
            correctAnswer: 0,
            explanation: 'Midjourney 是一個頂尖的「文本到圖像」（text-to-image）人工智能生成器，專門將文字描述轉化為高質素的圖像。',
            explanationEn: 'Midjourney is a leading \'text-to-image\' artificial intelligence generator that specialises in transforming text descriptions into high-quality images.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '使用 Midjourney，AI 主要扮演什麼角色？',
            questionEn: 'When using Midjourney, what role does AI primarily play?',
            options: [
              '完全自主創作',
              '基於用戶指示生成圖像',
              '僅限於改變顏色和光線',
              '幫助創建音樂'
            ],
            optionsEn: [
              'Completely autonomous creation',
              'Generate images based on user instructions',
              'Limited to changing colours and lighting only',
              'Help create music'
            ],
            correctAnswer: 1,
            explanation: 'AI 主要根據用戶提供的文字提示詞（Prompt）來生成圖像，扮演協作夥伴的角色。',
            explanationEn: 'AI primarily generates images based on text prompts provided by users, playing the role of a collaborative partner.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '在使用 Midjourney 創作時，最初需要哪個平台來進行操作？',
            questionEn: 'When creating with Midjourney, which platform is initially needed for operation?',
            options: [
              '官方網站',
              'Discord',
              'Zoom',
              '微信'
            ],
            optionsEn: [
              'Official website',
              'Discord',
              'Zoom',
              'WeChat'
            ],
            correctAnswer: 1,
            explanation: 'Discord 是 Midjourney 最初和最重要的操作平台，雖然現在也有官方網站，但 Discord 仍是核心平台。',
            explanationEn: 'Discord is the original and most important operational platform for Midjourney, and whilst there is now an official website, Discord remains the core platform.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: 'Midjourney 的提示詞結構包括哪些要素？',
            questionEn: 'What elements does Midjourney\'s prompt structure include?',
            options: [
              '主體、媒介、光線、環境和風格',
              '只有圖像大小',
              '顏色和背景',
              '動畫效果'
            ],
            optionsEn: [
              'Subject, medium, lighting, environment and style',
              'Only image size',
              'Colour and background',
              'Animation effects'
            ],
            correctAnswer: 0,
            explanation: '有效的提示詞結構包括主體（Subject）、媒介（Medium）、光線（Lighting）、環境（Environment）和風格（Style）等核心元素。',
            explanationEn: 'Effective prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '在創作過程中，為了達到最佳創作體驗，最理想的是在哪裡進行創作？',
            questionEn: 'For the best creative experience during the creation process, where is it ideal to create?',
            options: [
              '公開社群頻道',
              '私人 Discord 伺服器',
              '輸入框',
              '沒有任何偏好，任何地方都可以'
            ],
            optionsEn: [
              'Public community channels',
              'Private Discord server',
              'Input box',
              'No preference, anywhere is fine'
            ],
            correctAnswer: 1,
            explanation: '私人 Discord 伺服器提供安靜、專注的創作環境，避免公共頻道的混亂和干擾，能顯著改善學習體驗。',
            explanationEn: 'Private Discord servers provide a quiet, focused creative environment, avoiding the chaos and distractions of public channels, which can significantly improve the learning experience.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: 'Midjourney 的免費試用是否仍然提供？',
            questionEn: 'Does Midjourney still offer free trials?',
            options: [
              '提供',
              '不提供'
            ],
            optionsEn: [
              'Yes',
              'No'
            ],
            correctAnswer: 1,
            explanation: 'Midjourney 目前已經不再提供常規的免費試用，除了在極少數的推廣活動期間。',
            explanationEn: 'Midjourney no longer offers regular free trials, except during very rare promotional periods.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: 'Midjourney 的網站界面有什麼顯著特點？',
            questionEn: 'What are the notable features of Midjourney\'s website interface?',
            options: [
              '它完全依賴 Discord',
              '它提供了更加用戶友好和直觀的操作界面',
              '它僅限於用戶查看和下載作品',
              '它只支持基礎功能，不支持參數設置'
            ],
            optionsEn: [
              'It relies completely on Discord',
              'It provides a more user-friendly and intuitive interface',
              'It is limited to viewing and downloading works only',
              'It only supports basic functions, not parameter settings'
            ],
            correctAnswer: 1,
            explanation: 'Midjourney 網站提供了比 Discord 更加直觀和用戶友好的體驗，整合了各種參數設定和作品整理工具。',
            explanationEn: 'The Midjourney website provides a more intuitive and user-friendly experience than Discord, integrating various parameter settings and artwork organisation tools.'
          }
        ]
      }
    },
    {
      id: 2,
      title: '第二章：首次接觸：你的第一張 AI 圖像',
      titleEn: 'Chapter 2: First Contact: Your First AI Image',
      description: '引導你完成第一個完整的圖像生成週期。我們將會專注於建立自信，透過拆解核心指令和介面元素，確保你能成功地創造、選擇並保存你的第一張 AI 作品。',
      descriptionEn: 'Guide you through your first complete image generation cycle. We shall focus on building confidence by breaking down core commands and interface elements to ensure you can successfully create, select, and save your first AI artwork.',
      duration: '90 分鐘',
      durationEn: '90 Minutes',
      lessons: [
        {
          id: 1,
          title: '2.1 指令的核心：召喚 AI 畫家的 /imagine 咒語',
          titleEn: '2.1 The Core of Commands: The /imagine Spell to Summon AI Artists',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'interactive' as const,
          description: '學習最重要的 /imagine 指令，理解如何啟動圖像生成過程',
          descriptionEn: 'Master the most important /imagine command and understand how to initiate the image generation process',
          image: '/images/courses/midjourney-course/unit-images/imagine-command.png',
          imageAlt: '/imagine 指令教學',
          imageAltEn: '/imagine command tutorial',
          transcript: `在 Discord 裡面，我們與 Midjourney Bot 的所有互動都是通過「斜線指令」（Slash Commands）進行。而在所有指令之中，最核心、最重要的一個就是 /imagine。

/imagine 指令的唯一目的，就是啟動圖像生成過程。它好像一句咒語，告訴 AI 畫家：「準備好，我要你畫畫了！」

使用方法非常簡單：
1. 在你私人伺服器的任何一個文字頻道輸入框中，輸入一個斜線 /
2. 一個指令列表會彈出來。繼續輸入 imagine，或者直接在列表中點選 /imagine 指令
3. 點選後，輸入框會出現一個 prompt 欄位。這個就是我們之後要輸入提示詞的地方

記住，/imagine 是你與 AI 畫家溝通的起點，是所有魔法的開端。`,
          transcriptEn: `In Discord, all our interactions with Midjourney Bot are conducted through "Slash Commands". Among all commands, the most core and important one is /imagine.

The sole purpose of the /imagine command is to initiate the image generation process. It's like a spell that tells the AI artist: "Get ready, I want you to draw!"

Using it is very straightforward:
1. In any text channel input box of your private server, type a forward slash /
2. A command list will pop up. Continue typing "imagine", or directly click the /imagine command in the list
3. After clicking, a prompt field will appear in the input box. This is where we will input our prompts later

Remember, /imagine is the starting point of your communication with AI artists, the beginning of all magic.`,
          keyPoints: [
            '/imagine 是最核心的 Midjourney 指令',
            '通過斜線指令與 Bot 互動',
            '啟動圖像生成過程的起點',
            '使用方法簡單直觀'
          ],
          keyPointsEn: [
            '/imagine is the most core Midjourney command',
            'Interact with Bot through slash commands',
            'Starting point for initiating image generation',
            'Simple and intuitive to use'
          ],
          completed: false
        },
        {
          id: 2,
          title: '2.2 由零到一：編寫你的第一個簡單提示詞',
          titleEn: '2.2 From Zero to One: Writing Your First Simple Prompt',
          duration: '20 分鐘',
          durationEn: '20 Minutes',
          type: 'interactive' as const,
          description: '學習如何撰寫基本的提示詞，體驗文字轉圖像的神奇過程',
          descriptionEn: 'Learn how to write basic prompts and experience the magical process of text-to-image',
          image: '/images/courses/midjourney-course/unit-images/first-prompt.png',
          imageAlt: '第一個提示詞',
          imageAltEn: 'First prompt',
          transcript: `「提示詞」（Prompt）就是你對畫作的文字描述。在這個階段，我們不需要追求複雜，目標是感受由文字變成圖像的神奇過程。

建議由最簡單的詞語開始，例如一個單字、一個表情符號 (emoji)，或者一個短句。

實踐步驟：
1. 使用 /imagine 指令
2. 在 prompt 欄位輸入你的第一個提示詞，例如：a cat（一隻貓）
3. 按下 Enter 鍵發送

發送後，你會看到 Midjourney Bot 的狀態訊息，例如「Waiting to start」（等待開始），然後會顯示生成進度的百分比。這個過程通常需要大約一分鐘，AI 會利用強大的圖形處理器 (GPU) 進行運算。請耐心等待，見證魔法的誕生。`,
          transcriptEn: `A "Prompt" is your textual description of the artwork. At this stage, we don't need to pursue complexity; the goal is to experience the magical process of text becoming images.

It's recommended to start with the simplest words, such as a single word, an emoji, or a short phrase.

Practice steps:
1. Use the /imagine command
2. Input your first prompt in the prompt field, for example: a cat
3. Press Enter to send

After sending, you'll see Midjourney Bot's status message, such as "Waiting to start", then it will show the generation progress percentage. This process usually takes about a minute, as the AI utilises powerful Graphics Processing Units (GPUs) for computation. Please be patient and witness the birth of magic.`,
          keyPoints: [
            '提示詞是對畫作的文字描述',
            '建議從簡單詞語開始',
            '生成過程約需一分鐘',
            '體驗文字轉圖像的神奇過程'
          ],
          keyPointsEn: [
            'Prompts are textual descriptions of artwork',
            'Recommended to start with simple words',
            'Generation process takes about a minute',
            'Experience the magical text-to-image process'
          ],
          completed: false
        },
        {
          id: 3,
          title: '2.3 解讀魔法陣：認識 2x2 圖像網格',
          titleEn: '2.3 Deciphering the Magic Circle: Understanding the 2x2 Image Grid',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'interactive' as const,
          description: '理解 Midjourney 的 2x2 圖像網格系統，學習編號方式和選擇邏輯',
          descriptionEn: 'Understand Midjourney\'s 2x2 image grid system, learn numbering methods and selection logic',
          image: '/images/courses/midjourney-course/unit-images/image-grid.png',
          imageAlt: '2x2 圖像網格',
          imageAltEn: '2x2 image grid',
          transcript: `當 Midjourney 完成運算後，它不會只是交一張圖給你，而是會提供一個 2x2 的圖像網格（Image Grid），裡面包含四張風格略有不同的草圖。

這個設計的目的是為了在一次生成中提供多樣性，給你四個不同的創意方向去選擇。你可以將它們視為 AI 根據你的提示詞所提出的四個初步方案。

理解這個網格的編號方式至關重要，因為之後的所有操作都基於這個編號：

[ 1 ][ 2 ]
[ 3 ][ 4 ]

左上角是 1 號，右上角是 2 號，左下角是 3 號，右下角是 4 號。

記住這個順序，因為接下來我們要學習的互動按鈕，就是用這些數字來指定目標圖像。`,
          transcriptEn: `When Midjourney completes its computation, it doesn't just give you one image, but provides a 2x2 image grid containing four sketches with slightly different styles.

The purpose of this design is to provide diversity in a single generation, giving you four different creative directions to choose from. You can think of them as four preliminary proposals that the AI has made based on your prompt.

Understanding this grid's numbering system is crucial, as all subsequent operations are based on this numbering:

[ 1 ][ 2 ]
[ 3 ][ 4 ]

Top-left is number 1, top-right is number 2, bottom-left is number 3, bottom-right is number 4.

Remember this sequence, because the interactive buttons we'll learn next use these numbers to specify target images.`,
          keyPoints: [
            'Midjourney 生成 2x2 的圖像網格',
            '提供四個不同的創意方向',
            '編號方式：左上1、右上2、左下3、右下4',
            '編號系統是後續操作的基礎'
          ],
          keyPointsEn: [
            'Midjourney generates a 2x2 image grid',
            'Provides four different creative directions',
            'Numbering: top-left 1, top-right 2, bottom-left 3, bottom-right 4',
            'Numbering system is the foundation for subsequent operations'
          ],
          completed: false
        },
        {
          id: 4,
          title: '2.4 基本互動：U、V 與 🔄 按鈕的完整指南',
          titleEn: '2.4 Basic Interactions: Complete Guide to U, V and 🔄 Buttons',
          duration: '25 分鐘',
          durationEn: '25 Minutes',
          type: 'interactive' as const,
          description: '掌握 U（放大）、V（變化）和 Reroll（重新生成）按鈕的使用方法',
          descriptionEn: 'Master the usage of U (Upscale), V (Variation) and Reroll buttons',
          image: '/images/courses/midjourney-course/unit-images/buttons-guide.png',
          imageAlt: 'U、V、Reroll 按鈕指南',
          imageAltEn: 'U, V, Reroll buttons guide',
          transcript: `在 2x2 圖像網格下方，你會見到幾排按鈕，其中最基本、最常用的是 U、V 和 🔄 按鈕。它們是你與 AI 進行後續溝通的主要工具。

U 按鈕 (U1, U2, U3, U4) - "This one's good, I want the full image!"
U 代表 Upscale（放大）。在目前的新版本中，圖像生成時已經是 1024x1024 像素的高解像度。所以，U 按鈕的主要作用是獨立選取（isolate）你心儀的圖像。當你按下例如 U1，Midjourney 就會將網格中的 1 號圖單獨分離出來，方便你儲存，並提供更多進階的編輯選項。

V 按鈕 (V1, V2, V3, V4) - "This style is quite good, try a few more!"
V 代表 Variation（創造變化）。如果你覺得某張草圖的風格、構圖或者概念不錯，但又想看看有沒有更好的版本，就可以用 V 按鈕。例如，按下 V2，Midjourney 就會以 2 號圖為基礎，保持它大致的風格和構圖，再重新生成四張全新的、有些微變化的草圖給你選擇。

🔄 (Reroll) 按鈕 - "Don't like any of them, try again!"
這個藍色的重新整理按鈕就好像遊戲中的「重玩」掣。如果你對生成的四張草圖都不滿意，只需按一下這個按鈕。Midjourney 就會用你最初的、完全相同的提示詞，重新生成一組全新的四張草圖。`,
          transcriptEn: `Below the 2x2 image grid, you'll see several rows of buttons, with the most basic and commonly used being the U, V and 🔄 buttons. They are the main tools for your subsequent communication with AI.

U Buttons (U1, U2, U3, U4) - "This one's good, I want the full image!"
U stands for Upscale. In the current new version, images are already generated at high resolution of 1024x1024 pixels. So, the main function of U buttons is to isolate your preferred image. When you press, for example, U1, Midjourney will separate the number 1 image from the grid independently, making it convenient for you to save and providing more advanced editing options.

V Buttons (V1, V2, V3, V4) - "This style is quite good, try a few more!"
V stands for Variation. If you think a certain sketch's style, composition or concept is good, but want to see if there are better versions, you can use the V button. For example, pressing V2, Midjourney will use the number 2 image as a base, maintaining its general style and composition, then regenerate four new sketches with slight variations for you to choose from.

🔄 (Reroll) Button - "Don't like any of them, try again!"
This blue refresh button is like the "replay" button in games. If you're not satisfied with any of the four generated sketches, just press this button once. Midjourney will use your original, identical prompt to regenerate a completely new set of four sketches.`,
          keyPoints: [
            'U 按鈕用於選取和放大特定圖像',
            'V 按鈕基於選定圖像創造變化',
            'Reroll 按鈕重新生成整組圖像',
            '這些是與 AI 互動的基本工具'
          ],
          keyPointsEn: [
            'U buttons for selecting and upscaling specific images',
            'V buttons create variations based on selected images',
            'Reroll button regenerates the entire set of images',
            'These are the basic tools for interacting with AI'
          ],
          completed: false
        },
        {
          id: 5,
          title: '2.5 作品管理：儲存與下載你的心血結晶',
          titleEn: '2.5 Artwork Management: Saving and Downloading Your Creations',
          duration: '15 分鐘',
          durationEn: '15 Minutes',
          type: 'interactive' as const,
          description: '學習如何正確保存和管理你的 AI 藝術作品',
          descriptionEn: 'Learn how to properly save and manage your AI artwork',
          image: '/images/courses/midjourney-course/unit-images/save-download.png',
          imageAlt: '作品保存與下載',
          imageAltEn: 'Artwork saving and downloading',
          transcript: `當你透過 U 按鈕得到一張滿意的獨立圖像後，最後一步就是將它保存下來。

下載圖像的方法：
電腦版 (Desktop)：在 Discord 中，點擊你想儲存的圖像，讓它放大顯示。然後在圖像上按滑鼠右鍵，選擇「儲存圖片...」（Save image...）。

手機版 (Mobile)：在 Discord App 中，點擊圖像讓它全螢幕顯示。然後長按圖像，再點擊出現的下載圖示。

更重要的管理方式：Midjourney 網站圖庫
除了手動下載，你需要知道一個更方便的事實：你在 Midjourney 生成的所有圖像，無論是網格圖還是獨立圖，都會自動儲存到你在 Midjourney 官方網站上的個人圖庫（Gallery）。你可以隨時登入 midjourney.com，在你的個人檔案中找回所有作品，進行瀏覽、整理和下載。這個網站圖庫是你所有創作的中央管理系統。`,
          transcriptEn: `After you get a satisfactory independent image through the U button, the final step is to save it.

Methods for downloading images:
Desktop: In Discord, click on the image you want to save to display it enlarged. Then right-click on the image and select "Save image...".

Mobile: In the Discord App, tap the image to display it full-screen. Then long-press the image and tap the download icon that appears.

More Important Management Method: Midjourney Website Gallery
Besides manual downloading, you need to know a more convenient fact: all images you generate in Midjourney, whether grid images or independent images, are automatically saved to your personal Gallery on the official Midjourney website. You can log into midjourney.com at any time, find all your works in your personal profile, and browse, organise, and download them. This website gallery is the central management system for all your creations.`,
          keyPoints: [
            '電腦版可右鍵保存圖像',
            '手機版可長按下載圖像',
            '所有作品自動保存到網站圖庫',
            '網站圖庫是作品的中央管理系統'
          ],
          keyPointsEn: [
            'Desktop: right-click to save images',
            'Mobile: long-press to download images',
            'All works automatically saved to website gallery',
            'Website gallery is the central management system for works'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第二章測驗：首次接觸：你的第一張 AI 圖像',
        titleEn: 'Chapter 2 Quiz: First Encounter: Your First AI Image',
        description: '測試您對 Midjourney 基本操作流程的掌握',
        descriptionEn: 'Test your mastery of Midjourney\'s basic operational procedures',
        timeLimit: 12,
        passingScore: 80,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '在開始使用 Midjourney 時，使用者的主要操作命令是什麼？',
            questionEn: 'When starting to use Midjourney, what is the user\'s main operating command?',
            options: [
              '/draw',
              '/imagine',
              '/create',
              '/paint'
            ],
            optionsEn: [
              '/draw',
              '/imagine',
              '/create',
              '/paint'
            ],
            correctAnswer: 1,
            explanation: '/imagine 是 Midjourney 的核心指令，用於啟動圖像生成過程。',
            explanationEn: '/imagine is Midjourney\'s core command, used to initiate the image generation process.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '使用 /imagine 指令時，用戶需要提供什麼？',
            questionEn: 'When using the /imagine command, what do users need to provide?',
            options: [
              '圖像樣式',
              '音樂描述',
              '文字提示詞',
              '圖像連結'
            ],
            optionsEn: [
              'Image style',
              'Music description',
              'Text prompts',
              'Image links'
            ],
            correctAnswer: 2,
            explanation: '用戶需要在 /imagine 指令後提供詳細的文字提示詞（Prompt）來描述想要生成的圖像。',
            explanationEn: 'Users need to provide detailed text prompts after the /imagine command to describe the image they want to generate.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '在 Midjourney 中，生成的圖像通常以什麼形式呈現？',
            questionEn: 'In Midjourney, in what form are generated images typically presented?',
            options: [
              '單張圖像',
              '2x2 圖像網格',
              '動畫短片',
              '文字描述'
            ],
            optionsEn: [
              'Single image',
              '2x2 image grid',
              'Animated short films',
              'Text descriptions'
            ],
            correctAnswer: 1,
            explanation: 'Midjourney 會生成一個 2x2 的圖像網格，包含四個不同的變化版本供用戶選擇。',
            explanationEn: 'Midjourney generates a 2x2 image grid containing four different variations for users to choose from.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '使用者在 Midjourney 創作時最關鍵的角色是什麼？',
            questionEn: 'What is the most critical role of users when creating with Midjourney?',
            options: [
              '主導圖像生成的編輯',
              '提供文字描述的導演或概念藝術家',
              '編寫代碼的程式員',
              '圖像後製編輯師'
            ],
            optionsEn: [
              'Editor directing image generation',
              'Director or concept artist providing text descriptions',
              'Programmer writing code',
              'Image post-production editor'
            ],
            correctAnswer: 1,
            explanation: '用戶扮演導演或概念藝術家的角色，用語言指導 AI 畫家創作，這是一種人機協作的創作模式。',
            explanationEn: 'Users play the role of director or concept artist, using language to guide AI painters in creation, which is a human-machine collaborative creative model.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '提供簡單的提示詞，例如 "a cat"，會產生什麼結果？',
            questionEn: 'What results would simple prompts like "a cat" produce?',
            options: [
              '隨機的草圖',
              '精確的圖像',
              '帶有豐富背景的圖像',
              '空白畫布'
            ],
            optionsEn: [
              'Random sketches',
              'Precise images',
              'Images with rich backgrounds',
              'Blank canvas'
            ],
            correctAnswer: 0,
            explanation: '簡單的提示詞會產生較為隨機和基礎的結果，缺乏具體的風格和細節指導。',
            explanationEn: 'Simple prompts produce relatively random and basic results, lacking specific style and detail guidance.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: '在 Midjourney 中，當圖像生成完成後，用戶會看到什麼？',
            questionEn: 'In Midjourney, what do users see when image generation is complete?',
            options: [
              '生成的單張圖像',
              '隨機結果的列表',
              '2x2 圖像網格，顯示四個不同的草圖',
              '文字描述'
            ],
            optionsEn: [
              'A single generated image',
              'A list of random results',
              '2x2 image grid showing four different drafts',
              'Text descriptions'
            ],
            correctAnswer: 2,
            explanation: '生成完成後會顯示包含四個不同變化版本的 2x2 圖像網格，讓用戶選擇喜歡的版本進行進一步處理。',
            explanationEn: 'Upon completion, a 2x2 image grid containing four different variations is displayed, allowing users to select their preferred version for further processing.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: '初學者如何提升他們使用 Midjourney 的創作經驗？',
            questionEn: 'How can beginners improve their Midjourney creative experience?',
            options: [
              '使用預設的參數',
              '深入探索不同的參數和指令',
              '只使用單一的提示詞',
              '盡量避免使用 Discord'
            ],
            optionsEn: [
              'Use default parameters',
              'Explore different parameters and commands in depth',
              'Use only single prompts',
              'Avoid using Discord as much as possible'
            ],
            correctAnswer: 1,
            explanation: '初學者應該積極探索不同的參數和指令，通過實驗和學習來提升創作技巧和效果。',
            explanationEn: 'Beginners should actively explore different parameters and commands, improving their creative skills and effects through experimentation and learning.'
          }
        ]
      }
    },
    {
      id: 3,
      title: '第三章：提示詞工程學：與 AI 溝通嘅藝術',
      titleEn: 'Chapter 3: Prompt Engineering: The Art of AI Communication',
      description: '學習「提示詞工程學」（Prompt Engineering）。呢個唔單止係寫句子，而係學習一種同 AI 溝通嘅獨特語言，有佢自己嘅語法同邏輯。',
      descriptionEn: 'Learn \'Prompt Engineering\'. This isn\'t simply about writing sentences, but rather learning a unique language for communicating with AI, complete with its own syntax and logic.',
      duration: '110 分鐘',
      durationEn: '110 minutes',
      lessons: [
        {
          id: 11,
          title: '3.1 提示詞嘅結構：主體、媒介、環境、光線與風格',
          titleEn: '3.1 Prompt Structure: Subject, Medium, Environment, Lighting and Style',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '學習高質素提示詞的核心元素和結構化組合方法',
          descriptionEn: 'Learn core elements and structured combination methods for high-quality prompts',
          image: '/images/courses/midjourney-course/unit-images/prompt-structure.png',
          imageAlt: '提示詞結構分析圖',
          imageAltEn: 'Prompt structure analysis diagram',
          transcript: `一個高質素嘅提示詞，通常由幾個核心元素構成。學識有意識地組合呢啲元素，係提升作品質素嘅第一步。你可以將提示詞想像成一個清單，包含以下幾個部分：

主體 (Subject)：你畫作嘅主角係乜嘢？例如：一個人、一隻動物、一個物件、一個角色。

媒介 (Medium)：你希望作品以咩形式呈現？例如：相片 (photo)、油畫 (oil painting)、插畫 (illustration)、雕塑 (sculpture)、塗鴉 (doodle)。

環境 (Environment)：主體身處喺邊度？例如：室內 (indoors)、戶外 (outdoors)、月球上 (on the moon)、城市中 (in the city)。

光線 (Lighting)：場景嘅光線係點樣？例如：柔和光 (soft light)、環境光 (ambient light)、霓虹燈 (neon lights)、攝影棚燈光 (studio lights)。

實例演變：
基礎：a dog
加入主體細節：A happy golden retriever
加入環境同光線：A happy golden retriever, in a sunlit park, soft lighting
加入媒介同構圖：Photorealistic portrait of a happy golden retriever, in a sunlit park, soft lighting, vibrant colours, close-up shot

透過逐層疊加呢啲元素，你可以由一個模糊嘅概念，逐步構建出一幅具體而豐富嘅畫面。`,
          transcriptEn: `Midjourney has a set of trained default aesthetic styles that lean towards artistic, vibrant colours, and beautiful compositions. The --stylize parameter, or its abbreviation --s, is used to control the application strength of this "Midjourney style".

Parameter range: 0-1000
- Default value: 100
- Lower values (0-50): More literal interpretation of prompts, less artistic processing
- Higher values (500-1000): More artistic style application, enhanced visual appeal

Usage examples:

Low stylization value (Low Stylize Value): e.g., --s 50
Result: More realistic, closer to literal prompt interpretation, suitable for concept art or technical illustrations requiring accuracy.

High stylization value (High Stylize Value): e.g., --s 750
Result: More artistic processing, enhanced colours and composition, suitable for creative artwork and visual presentation.

Complete example:
/imagine prompt: a cat wearing a hat --s 750

It's recommended to adjust stylization values according to creative goals: use low values for concept art, high values for artistic works.`,
          keyPoints: [
            '提示詞由主體、媒介、環境、光線等元素構成',
            '結構化組合能提升作品質素',
            '逐層疊加元素建構豐富畫面',
            '每個元素都有其特定作用'
          ],
          keyPointsEn: [
            'Prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style',
            'Structured combination enhances artwork quality',
            'Layer upon layer builds a rich visual',
            'Each element has a specific role'
          ],
          completed: false
        },
        {
          id: 12,
          title: '3.2 進階語法：用圖片說故事 (Image Prompts)',
          titleEn: '3.2 Advanced Syntax: Telling Stories with Images (Image Prompts)',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '學習使用圖像作為提示詞，結合視覺參考創作新作品',
          descriptionEn: 'Learn to use images as prompts, combining visual references to create new works',
          image: '/images/courses/midjourney-course/unit-images/image-prompts.png',
          imageAlt: '圖像提示詞使用示例',
          imageAltEn: 'Image prompts usage examples',
          transcript: `除咗文字，你仲可以用圖像嚟引導 Midjourney 嘅創作。呢個功能叫做「圖像提示詞」(Image Prompts)，可以影響最終生成圖像嘅風格、構圖同內容。

使用方法：
1. 獲取圖片連結：首先，你需要一張參考圖片嘅公開網址 (URL)。你可以將自己嘅圖片上傳到 Discord，然後右鍵點擊圖片，選擇「複製連結」。

2. 組合提示詞：喺 /imagine 指令中，將圖片連結放喺提示詞嘅最前面，然後空一格，再輸入你嘅文字描述。

範例：
/imagine prompt: https://example.com/image.jpg a robot in the style of this image

Midjourney 會分析你提供嘅圖片，並嘗試將其視覺元素融入到你嘅文字描述中，創造出結合兩者特色嘅新作品。呢個功能特別適合用嚟學習特定風格或者將現有作品作為創作基礎。`,
          transcriptEn: `Apart from text, you can also use images to guide Midjourney's creation. This function is called "Image Prompts", which can influence the style, composition and content of the final generated image.

Usage method:
1. Obtain image link: First, you need the public URL of a reference image. You can upload your own image to Discord, then right-click on the image and select "Copy Link".

2. Combine prompts: In the /imagine command, place the image link at the very front of the prompt, then leave a space and input your text description.

Example:
/imagine prompt: https://example.com/image.jpg a robot in the style of this image

Midjourney will analyse the image you provide and attempt to integrate its visual elements into your text description, creating new works that combine the characteristics of both. This function is particularly suitable for learning specific styles or using existing works as a creative foundation.`,
          keyPoints: [
            '圖像提示詞能影響風格、構圖和內容',
            '需要獲取圖片的公開網址',
            '圖片連結放在提示詞最前面',
            'AI 會分析並融合圖片的視覺元素'
          ],
          keyPointsEn: [
            'Image prompts can influence style, composition and content',
            'Requires obtaining the public URL of images',
            'Image links are placed at the front of prompts',
            'AI will analyse and integrate visual elements from images'
          ],
          completed: false
        },
        {
          id: 13,
          title: '3.3 混合概念嘅 /blend 指令',
          titleEn: '3.3 Concept Blending with /blend Command',
          duration: '18 分鐘',
          durationEn: '18 minutes',
          type: 'interactive' as const,
          description: '掌握 /blend 指令，學習融合多張圖片創造新概念',
          descriptionEn: 'Master the /blend command to learn how to fuse multiple images to create new concepts',
          image: '/images/courses/midjourney-course/unit-images/blend-command.png',
          imageAlt: '/blend 指令操作示例',
          imageAltEn: '/blend command operation examples',
          transcript: `/blend 係一個專為融合多張圖片而設嘅簡化指令，特別適合喺手機上操作。佢可以將 2 至 5 張圖片嘅概念同美學風格混合，創造出一個全新嘅圖像。

特點與限制：
- 純圖片操作：/blend 指令唔可以同文字提示詞一齊使用。佢只係用嚟混合圖片。
- 數量限制：最多只可以混合 5 張圖片。
- 尺寸選項：你可以喺指令中選擇生成圖像嘅長寬比，選項有直向 (Portrait 2:3)、橫向 (Landscape 3:2) 同正方形 (Square 1:1)。

使用方法：
1. 輸入 /blend 指令
2. Discord 會顯示幾個上傳框（image1, image2 等）
3. 點擊上傳框，從你嘅裝置選擇 2 至 5 張圖片
4. （可選）點擊「dimensions」選項，選擇你想要嘅輸出尺寸
5. 發送指令，等待融合後嘅結果

呢個指令特別適合探索視覺概念嘅結合，創造意想不到嘅藝術效果。`,
          transcriptEn: `/blend is a simplified command specifically designed for fusing multiple images, particularly suitable for mobile operation. It can blend the concepts and aesthetic styles of 2 to 5 images, creating a completely new image.

Features and limitations:
- Pure image operation: The /blend command cannot be used together with text prompts. It is only used for blending images.
- Quantity limitation: A maximum of 5 images can be blended.
- Size options: You can choose the aspect ratio of the generated image in the command, with options including Portrait (2:3), Landscape (3:2) and Square (1:1).

Usage method:
1. Input the /blend command
2. Discord will display several upload boxes (image1, image2, etc.)
3. Click the upload boxes and select 2 to 5 images from your device
4. (Optional) Click the "dimensions" option to select your desired output size
5. Send the command and wait for the blended results

This command is particularly suitable for exploring the combination of visual concepts and creating unexpected artistic effects.`,
          keyPoints: [
            '/blend 專門用於融合多張圖片',
            '不能與文字提示詞結合使用',
            '可混合 2-5 張圖片',
            '適合手機操作和概念探索'
          ],
          keyPointsEn: [
            '/blend is specifically for fusing multiple images',
            'Cannot be combined with text prompts',
            'Can blend 2-5 images',
            'Suitable for mobile operation and concept exploration'
          ],
          completed: false
        },
        {
          id: 14,
          title: '3.4 權重分配：多重提示詞 (::) 的奧秘',
          titleEn: '3.4 Weight Allocation: The Mystery of Multi-Prompts (::)',
          duration: '22 分鐘',
          durationEn: '22 minutes',
          type: 'interactive' as const,
          description: '學習使用雙冒號語法控制提示詞中不同概念的重要性',
          descriptionEn: 'Learn to use double colon syntax to control the importance of different concepts in prompts',
          image: '/images/courses/midjourney-course/unit-images/prompt-weights.png',
          imageAlt: '提示詞權重分配示例',
          imageAltEn: 'Prompt weight allocation examples',
          transcript: `有時，你嘅提示詞包含幾個重要概念，但你希望 Midjourney 對某啲概念更加重視。呢個時候，就需要用到「多重提示詞」（Multi-Prompts）同權重分配語法 ::。

雙冒號 :: 可以將一個提示詞分割成幾個獨立嘅部分，令 AI 分別考慮佢哋。

基本用法：分割概念
- hot dog：AI 會理解為「熱狗」
- hot:: dog：AI 會分別考慮「熱」同「狗」兩個概念，可能會生成一隻好熱嘅狗

進階用法：分配權重
你仲可以喺雙冒號後面加上數字，嚟指定每個部分嘅重要性，數值越高代表越重要。

範例：
/imagine prompt: space ship::2 fire::1

喺呢個例子中，「space ship」嘅權重係 2，「fire」嘅權重係 1。意味住 Midjourney 會將「太空船」作為更主要嘅元素嚟生成圖像，而「火」則作為次要元素。

呢個技巧畀咗你更精細嘅控制權，去平衡提示詞中唔同元素之間嘅關係。權重分配特別適合用於複雜場景或者當你想強調某個特定元素時。`,
          transcriptEn: `Sometimes, your prompt contains several important concepts, but you want Midjourney to pay more attention to certain concepts. At this point, you need to use "Multi-Prompts" and weight allocation syntax ::.

The double colon :: can split a prompt into several independent parts, allowing the AI to consider them separately.

Basic usage: Concept separation
- hot dog: AI will understand this as "hot dog"
- hot:: dog: AI will separately consider "hot" and "dog" as two concepts, possibly generating a very hot dog

Advanced usage: Weight allocation
You can also add numbers after the double colon to specify the importance of each part, with higher values representing greater importance.

Example:
/imagine prompt: space ship::2 fire::1

In this example, "space ship" has a weight of 2, and "fire" has a weight of 1. This means Midjourney will treat "space ship" as the more primary element when generating the image, whilst "fire" serves as a secondary element.

This technique gives you more precise control to balance the relationship between different elements in your prompt. Weight allocation is particularly suitable for complex scenes or when you want to emphasise a specific element.`,
          keyPoints: [
            ':: 語法用於分割和控制概念重要性',
            '可以分別處理不同的概念元素',
            '數字權重控制元素的相對重要性',
            '適合複雜場景和元素強調'
          ],
          keyPointsEn: [
            ':: syntax is used to separate and control concept importance',
            'Can handle different conceptual elements separately',
            'Numerical weights control relative importance of elements',
            'Suitable for complex scenes and element emphasis'
          ],
          completed: false
        },
        {
          id: 15,
          title: '3.5 逆向工程：/describe 指令由圖像變文字',
          titleEn: '3.5 Reverse Engineering: /describe Command from Image to Text',
          duration: '25 分鐘',
          durationEn: '25 minutes',
          type: 'interactive' as const,
          description: '使用 /describe 指令分析圖像，學習更好的提示詞表達方式',
          descriptionEn: 'Use the /describe command to analyse images and learn better prompt expression methods',
          image: '/images/courses/midjourney-course/unit-images/describe-command.png',
          imageAlt: '/describe 指令逆向分析示例',
          imageAltEn: '/describe command reverse analysis examples',
          transcript: `當你喺網上見到一張好靚嘅 AI 圖，想知道佢係點樣生成嘅？或者你想學習 AI 更「聽得明」嘅描述方式？/describe 指令就係你嘅「羅塞塔石碑」。

呢個指令嘅功能同 /imagine 完全相反：你畀佢一張圖，佢會分析完之後，返還四條可能生成呢張圖嘅文字提示詞畀你。

使用方法：
1. 輸入 /describe 指令
2. 上傳一張你想分析嘅圖片
3. Midjourney Bot 會返還四條詳細嘅提示詞建議

呢個功能係一個極其強大嘅學習工具。透過分析成功作品嘅提示詞，你可以快速學習到：
- 新嘅風格詞彙
- 藝術家名稱
- 構圖技巧術語
- 美學描述方法

從而極大地豐富你嘅提示詞詞庫，理解 AI 嘅「視覺語言」。

建議將 /describe 分析出嚟嘅提示詞作為學習參考，並嘗試套用到你自己嘅創作中，呢樣可以快速提升你嘅提示詞技巧。`,
          transcriptEn: `When you see a beautiful AI image online and want to know how it was generated? Or do you want to learn description methods that AI can "understand" better? The /describe command is your "Rosetta Stone".

This command functions completely opposite to /imagine: you give it an image, and after analysis, it returns four possible text prompts that could generate this image.

Usage method:
1. Input the /describe command
2. Upload an image you want to analyse
3. Midjourney Bot will return four detailed prompt suggestions

This function is an extremely powerful learning tool. By analysing the prompts of successful works, you can quickly learn:
- New style vocabulary
- Artist names
- Composition technique terminology
- Aesthetic description methods

Thereby greatly enriching your prompt vocabulary and understanding AI's "visual language".

It's recommended to use the prompts analysed by /describe as learning references and try applying them to your own creations. This can rapidly improve your prompting skills.`,
          keyPoints: [
            '/describe 是圖像到文字的逆向工程',
            '能夠學習成功作品的表達方式',
            '快速擴展提示詞詞彙庫',
            '是理解 AI 視覺語言的重要工具'
          ],
          keyPointsEn: [
            '/describe is reverse engineering from image to text',
            'Can learn expression methods from successful works',
            'Rapidly expands prompt vocabulary',
            'Is an important tool for understanding AI visual language'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第三章測驗：提示詞工程學：與 AI 溝通的藝術',
        titleEn: 'Chapter 3 Quiz: Prompt Engineering: The Art of AI Communication',
        description: '測試您對提示詞構建和進階語法的掌握',
        descriptionEn: 'Test your mastery of prompt construction and advanced syntax techniques',
        timeLimit: 15,
        passingScore: 71,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '在 Midjourney 中，提示詞的結構包括哪些要素？',
            questionEn: 'In Midjourney, what elements does the prompt structure include?',
            options: [
              '顏色和圖像樣式',
              '主體、媒介、光線、環境和風格',
              '提示語和背景',
              '只有物體形狀和顏色'
            ],
            optionsEn: [
              'Colour and image style',
              'Subject, medium, lighting, environment and style',
              'Prompts and background',
              'Only object shapes and colours'
            ],
            correctAnswer: 1,
            explanation: '有效的提示詞結構包括主體（Subject）、媒介（Medium）、光線（Lighting）、環境（Environment）和風格（Style）等核心元素。',
            explanationEn: 'Effective prompt structure includes core elements such as Subject, Medium, Lighting, Environment and Style.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '若想強調某些提示詞的重要性，應使用哪種語法？',
            questionEn: 'To emphasise the importance of certain prompts, which syntax should be used?',
            options: [
              '引號',
              '多重提示詞 (Multi-Prompts) 和權重分配 (::)',
              '圖像連結',
              '圓括號'
            ],
            optionsEn: [
              'Quotation marks',
              'Multi-Prompts and weight allocation (::)',
              'Image links',
              'Parentheses'
            ],
            correctAnswer: 1,
            explanation: '使用多重提示詞語法和權重分配符號（::）可以控制不同元素在生成圖像中的重要程度。',
            explanationEn: 'Using multi-prompt syntax and weight allocation symbols (::) can control the importance of different elements in generated images.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '在撰寫提示詞時，應包括哪些關鍵元素？',
            questionEn: 'When writing prompts, what key elements should be included?',
            options: [
              '圖像的顏色和尺寸',
              '角色、環境、光線及構圖',
              '圖像的風格和音效',
              '描述的情感和背景故事'
            ],
            optionsEn: [
              'Image colour and size',
              'Characters, environment, lighting and composition',
              'Image style and sound effects',
              'Descriptive emotions and background story'
            ],
            correctAnswer: 1,
            explanation: '有效的提示詞應該包括角色（主體）、環境、光線和構圖等關鍵元素，以獲得更精確的生成結果。',
            explanationEn: 'Effective prompts should include key elements such as characters (subjects), environment, lighting and composition to achieve more precise generation results.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '在撰寫 Midjourney 提示詞時，最重要的是什麼？',
            questionEn: 'When writing Midjourney prompts, what is most important?',
            options: [
              '文字簡單明瞭',
              '提供詳細的圖像描述',
              '讓 AI 自由創作',
              '只使用單一形容詞'
            ],
            optionsEn: [
              'Simple and clear text',
              'Provide detailed image descriptions',
              'Let AI create freely',
              'Use only single adjectives'
            ],
            correctAnswer: 1,
            explanation: '提供詳細和具體的圖像描述是獲得高質量生成結果的關鍵，模糊的提示詞會產生隨機的結果。',
            explanationEn: 'Providing detailed and specific image descriptions is key to achieving high-quality generation results, whilst vague prompts will produce random results.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '使用 /blend 指令時，可以混合多少張圖片？',
            questionEn: 'When using the /blend command, how many images can be mixed?',
            options: [
              '1 張',
              '2-5 張',
              '6-10 張',
              '1-3 張'
            ],
            optionsEn: [
              '1 image',
              '2-5 images',
              '6-10 images',
              '1-3 images'
            ],
            correctAnswer: 1,
            explanation: '/blend 指令允許混合 2 到 5 張圖片，創造出融合不同圖像特徵的新作品。',
            explanationEn: 'The /blend command allows mixing 2 to 5 images, creating new works that combine features from different images.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: '在使用提示詞時，如何加入圖片以改變圖像風格？',
            questionEn: 'When using prompts, how can images be added to change image style?',
            options: [
              '在提示詞中加入圖片的 URL',
              '上傳圖片至 Midjourney',
              '使用文字描述來替代圖片',
              '不可以加入圖片'
            ],
            optionsEn: [
              'Add image URLs to prompts',
              'Upload images to Midjourney',
              'Use text descriptions to replace images',
              'Cannot add images'
            ],
            correctAnswer: 0,
            explanation: '可以在提示詞中直接加入圖片的 URL 連結，讓 AI 參考該圖片的風格或元素進行創作。',
            explanationEn: 'You can directly add image URL links to prompts, allowing AI to reference the style or elements of that image for creation.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: '在 /imagine 中使用多重提示詞（Multi-Prompts）時，應用於兩個不同元素的效果是什麼？',
            questionEn: 'When using Multi-Prompts in /imagine applied to two different elements, what is the effect?',
            options: [
              '一個元素會被完全忽略',
              '兩個元素會被平等對待',
              '可以設定每個元素的權重，影響圖像生成',
              '隨機選擇一個元素進行生成'
            ],
            optionsEn: [
              'One element will be completely ignored',
              'Both elements will be treated equally',
              'You can set the weight of each element, affecting image generation',
              'Randomly select one element for generation'
            ],
            correctAnswer: 2,
            explanation: '多重提示詞允許為不同元素設定權重（如 element1::2 element2::1），控制它們在最終圖像中的影響程度。',
            explanationEn: 'Multi-prompts allow setting weights for different elements (e.g., element1::2 element2::1), controlling their influence in the final image.'
          }
        ]
      }
    },
    {
      id: 4,
      title: '第四章：參數嘅力量：精準控制圖像生成',
      titleEn: 'Chapter 4: The Power of Parameters: Precise Image Generation Control',
      description: 'Midjourney 提供咗一系列以 –- 開頭嘅「參數」（Parameters）。呢啲參數就好似相機上嘅各種設定按鈕，可以讓你喺提示詞之外，更精準地控制圖像生成嘅各個方面。',
      descriptionEn: 'Midjourney provides a series of \'Parameters\' commencing with --. These parameters are rather like various setting buttons on a camera, allowing you to control numerous aspects of image generation more precisely beyond prompts.',
      duration: '95 分鐘',
      durationEn: '95 minutes',
      lessons: [
        {
          id: 16,
          title: '4.1 改變畫布：長寬比 (--ar)',
          titleEn: '4.1 Changing Canvas: Aspect Ratio (--ar)',
          duration: '18 分鐘',
          durationEn: '18 minutes',
          type: 'interactive' as const,
          description: '學習使用 --ar 參數控制圖像的長寬比，適應不同用途需求',
          descriptionEn: 'Learn to use the --ar parameter to control image aspect ratios for different usage requirements',
          image: '/images/courses/midjourney-course/unit-images/aspect-ratio.png',
          imageAlt: '長寬比參數使用示例',
          imageAltEn: 'Aspect ratio parameter usage examples',
          transcript: `預設情況下，Midjourney 生成嘅圖像係 1:1 嘅正方形。但係，唔同嘅用途需要唔同嘅畫布尺寸。--aspect 或其簡寫 --ar 參數就係用嚟設定圖像嘅長寬比。

使用方法：
喺提示詞嘅最後面，加上 --ar <寬>:<高>。

常用長寬比範例：
- --ar 1:1：正方形，預設值，適合社交媒體頭像
- --ar 16:9：闊螢幕，標準高清電視同 YouTube 影片比例，適合做封面圖或電腦桌布
- --ar 9:16：直向闊螢幕，適合手機全螢幕內容，例如 Instagram Stories 或手機壁紙
- --ar 3:2：經典相機比例，適合攝影風格作品
- --ar 2:3：常見嘅直向海報或書籍封面比例

完整範例：
/imagine prompt: a beautiful castle on a mountain --ar 16:9

選擇合適嘅長寬比係創作成功嘅重要因素，佢直接影響構圖同視覺效果。例如，風景圖適合用 16:9 或 3:2，而人像作品則適合用 2:3 或 4:5。`,
          transcriptEn: `By default, Midjourney generates images in a 1:1 square format. However, different purposes require different canvas sizes. The --aspect parameter, or its abbreviation --ar, is used to set the aspect ratio of images.

Usage method:
Add --ar <width>:<height> at the end of your prompt.

Common aspect ratio examples:
- --ar 1:1: Square, default value, suitable for social media avatars
- --ar 16:9: Widescreen, standard high-definition television and YouTube video ratio, suitable for cover images or computer wallpapers
- --ar 9:16: Portrait widescreen, suitable for mobile full-screen content, such as Instagram Stories or mobile wallpapers
- --ar 3:2: Classic camera ratio, suitable for photography-style works
- --ar 2:3: Common portrait poster or book cover ratio

Complete example:
/imagine prompt: a beautiful castle on a mountain --ar 16:9

Choosing the appropriate aspect ratio is an important factor for creative success, as it directly affects composition and visual effects. For example, landscape images are suitable for 16:9 or 3:2, whilst portrait works are suitable for 2:3 or 4:5.`,
          keyPoints: [
            '--ar 參數控制圖像的長寬比',
            '不同比例適合不同用途',
            '16:9 適合風景和封面圖',
            '選擇比例會影響構圖效果'
          ],
          keyPointsEn: [
            '--ar parameter controls image aspect ratio',
            'Different ratios suit different purposes',
            '16:9 is suitable for landscapes and cover images',
            'Ratio choice affects compositional effects'
          ],
          completed: false
        },
        {
          id: 17,
          title: '4.2 藝術風格嘅強度：風格化 (--stylize)',
          titleEn: '4.2 Artistic Style Intensity: Stylization (--stylize)',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '掌握 --stylize 參數，控制 Midjourney 風格的應用強度',
          descriptionEn: 'Master the --stylize parameter to control the strength of Midjourney\'s built-in artistic style',
          image: '/images/courses/midjourney-course/unit-images/stylize-parameter.png',
          imageAlt: '風格化參數效果對比',
          imageAltEn: 'Stylization parameter effect examples',
          transcript: `Midjourney 本身有一套經過訓練嘅預設美學風格，偏向於藝術化、色彩豐富、構圖優美。--stylize 或其簡寫 --s 參數就係用嚟控制呢種「Midjourney 風格」嘅應用強度。

呢個參數嘅數值範圍係 0 到 1000，預設值係 100。

低風格化值 (Low Stylize Value)：例如 --s 50
AI 會更嚴格地遵循你嘅提示詞，生成嘅圖像會比較「直白」，藝術性較低，但準確性更高。適合需要精確表達特定概念嘅場合。

高風格化值 (High Stylize Value)：例如 --s 750
AI 會獲得更大嘅創作自由，喺遵循你提示詞嘅基礎上，大量加入自己嘅美學判斷，令圖像更具藝術感、更華麗，但有時可能會偏離你嘅原始意圖。

完整範例：
/imagine prompt: a cat wearing a hat --s 750

建議根據創作目標調整風格化值：概念圖用低值，藝術作品用高值。`,
          transcriptEn: `Midjourney has a set of trained default aesthetic styles that lean towards artistic, vibrant colours, and beautiful compositions. The --stylize parameter, or its abbreviation --s, is used to control the application strength of this "Midjourney style".

Parameter range: 0-1000
- Default value: 100
- Lower values (0-50): More literal interpretation of prompts, less artistic processing
- Higher values (500-1000): More artistic style application, enhanced visual appeal

Usage examples:

Low stylization value (Low Stylize Value): e.g., --s 50
Result: More realistic, closer to literal prompt interpretation, suitable for concept art or technical illustrations requiring accuracy.

High stylization value (High Stylize Value): e.g., --s 750
Result: More artistic processing, enhanced colours and composition, suitable for creative artwork and visual presentation.

Complete example:
/imagine prompt: a cat wearing a hat --s 750

It's recommended to adjust stylization values according to creative goals: use low values for concept art, high values for artistic works.`,
          keyPoints: [
            '--stylize 控制 Midjourney 風格的強度',
            '數值範圍 0-1000，預設值 100',
            '低值更準確，高值更藝術化',
            '應根據創作目標選擇合適數值'
          ],
          keyPointsEn: [
            '--stylize controls Midjourney\'s artistic style strength',
            'Range 0-1000, default 100',
            'Low values for realistic, high values for artistic',
            'Choose based on creative purpose'
          ],
          completed: false
        },
        {
          id: 18,
          title: '4.3 控制混亂與奇異度：--chaos 與 --weird',
          titleEn: '4.3 Controlling Chaos and Weirdness: --chaos and --weird',
          duration: '22 分鐘',
          durationEn: '22 minutes',
          type: 'interactive' as const,
          description: '學習使用 --chaos 和 --weird 參數增加圖像的意外性和創意性',
          descriptionEn: 'Learn to use --chaos and --weird parameters to control image variation and creative unpredictability',
          image: '/images/courses/midjourney-course/unit-images/chaos-weird.png',
          imageAlt: 'Chaos 和 Weird 參數效果示例',
          imageAltEn: 'Chaos and weird parameter effect demonstrations',
          transcript: `呢兩個參數都係用嚟增加圖像嘅「意外性」，但作用方式唔同。

混沌 (--chaos 或 --c)：
呢個參數影響嘅係初始 2x2 網格嘅多樣性。佢嘅數值範圍係 0 到 100。

--c 0 (預設值)：生成嘅四張草圖會比較相似，風格統一
--c 100：生成嘅四張草圖會非常唔同，構圖同主題可能會有巨大差異，適合用嚟探索意想不到嘅創意方向

奇特 (--weird 或 --w)：
呢個係一個實驗性參數，影響嘅係圖像本身嘅超現實同怪誕程度。佢嘅數值範圍係 0 到 3000。

加入 --w 參數會令生成嘅圖像更具超現實感、奇異甚至有點詭異，可以創造出非常獨特嘅視覺效果。

完整範例：
/imagine prompt: mushroom forest --c 80 --w 500

使用建議：
- 探索創意時使用高 chaos 值
- 尋求獨特視覺效果時使用 weird 參數
- 兩者可以結合使用創造極富創意的作品`,
          transcriptEn: `--chaos and --weird parameters are used to add "unexpectedness" and creativity to the generated images.

--chaos (or --c):
This parameter affects the diversity of the initial 2x2 grid. Its range is 0-100.

--c 0 (default): The generated four sketches are similar in style and theme.
--c 100: The generated four sketches are very different in style and theme, suitable for exploring unexpected creative directions.

--weird (or --w):
This is an experimental parameter that affects the surreal and bizarre nature of the image. Its range is 0-3000.

Adding --w parameter will make the generated image more surreal and bizarre, creating a very unique visual effect.

Complete examples:
/imagine prompt: mushroom forest --c 80 --w 500

Usage tips:
- Use high chaos values when exploring creativity.
- Use --weird parameter when seeking unique visual effects.
- Both can be combined to create highly creative works.`,
          keyPoints: [
            '--chaos controls grid diversity, range 0-100',
            '--weird adds surreal and bizarre elements, range 0-3000',
            'High chaos values are great for exploring creativity',
            'Both parameters can be used together for highly creative results'
          ],
          completed: false
        },
        {
          id: 19,
          title: '4.4 排除法：負面提示詞 (--no)',
          titleEn: '4.4 Exclusion Method: Negative Prompts (--no)',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive' as const,
          description: '掌握 --no 參數，學習排除不想要的元素',
          descriptionEn: 'Master the --no parameter to exclude unwanted elements from generated images',
          image: '/images/courses/midjourney-course/unit-images/negative-prompts.png',
          imageAlt: '負面提示詞使用示例',
          imageAltEn: 'Negative prompt parameter usage examples',
          transcript: `有時，你唔係想加入啲咩，而係想排除啲咩。--no 參數就係你嘅排除工具。

使用方法：
喺提示詞嘅最後面，加上 --no，然後空一格，再寫出你唔想見到嘅嘢。如果有多個想排除嘅物件，可以用逗號分隔。

範例：
/imagine prompt: a beautiful landscape --no trees, people

呢個指令會嘗試生成一個冇樹同冇人嘅美麗風景。

重要警告：
Midjourney 嘅內容審核系統會獨立審查 --no 後面嘅每一個詞。例如，如果你輸入 --no clothing（唔要衫），系統可能會將其解讀為「唔要」同「衫」，從而誤觸生成裸露內容嘅警告。

安全使用建議：
為咗避免誤觸內容審核，更安全嘅做法係明確指出你想要嘅嘢（例如 wearing a suit），而唔係排除你唔想要嘅嘢。

適用場合：
- 移除常見的背景元素
- 避免特定的色彩或風格
- 排除干擾構圖的物件`,
          transcriptEn: `--no parameter is used to exclude unwanted elements from the prompt.

Usage method:
Add --no after your prompt and separate multiple unwanted elements with commas.

Example:
/imagine prompt: a beautiful landscape --no trees, people

Important note:
Midjourney's content moderation system may independently review each word after --no. For example, if you include --no clothing (don't want clothes), the system may interpret it as "don't want" and "clothes", triggering warnings for potentially sensitive content.

Safe usage tips:
Instead of using --no, it's safer to explicitly state what you want (e.g., wearing a suit) rather than excluding what you don't want.

Applicable scenarios:
- Remove common background elements
- Avoid specific colours or styles
- Exclude distracting objects from the composition`,
          keyPoints: [
            '--no parameter is used to exclude unwanted elements',
            'Multiple unwanted elements can be separated by commas',
            'Note: Content moderation system may independently review words after --no',
            'It's safer to explicitly state what you want rather than excluding it'
          ],
          completed: false
        },
        {
          id: 20,
          title: '4.5 常用參數速查手冊',
          duration: '20 分鐘',
          type: 'interactive' as const,
          description: '掌握其他重要參數的使用方法，建立完整的參數知識體系',
          image: '/images/courses/midjourney-course/unit-images/parameters-guide.png',
          imageAlt: '常用參數速查手冊',
          transcript: `除咗以上詳細介紹嘅參數，仲有好多其他實用嘅參數。以下係一個快速參考手冊，方便你喺創作時查閱。

--quality (--q)：
控制圖像生成嘅品質同時間。值越高，細節越多，但耗時更長。
數值範圍：0.25, 0.5, 1（預設值）
使用範例：... --q 0.5

--repeat (--r)：
重複執行同一個提示詞多次，快速生成大量圖像。
數值範圍：2-40（視乎計劃）
使用範例：... --r 4

--tile：
生成可以無縫拼接嘅圖案，適合做紋理或背景。
使用範例：... --tile

--video：
喺生成圖像嘅同時，生成一段展示創作過程嘅短片。
使用範例：... --video

參數組合使用：
多個參數可以同時使用，例如：
/imagine prompt: abstract pattern --tile --ar 1:1 --s 200

記住，參數嘅順序唔重要，但建議將佢哋統一放喺提示詞嘅最後面，保持整潔。`,
          transcriptEn: `--quality (--q) and --repeat (--r) parameters control image quality and generation speed.

--quality:
Value range: 0.25, 0.5, 1 (default 1)
Usage examples: ... --q 0.5

--repeat:
Value range: 2-40 (depends on plan)
Usage examples: ... --r 4

--tile:
Generates seamless patterns, suitable for textures or backgrounds.
Usage examples: ... --tile

--video:
Generates a short video showcasing the creation process.
Usage examples: ... --video

Combining parameters:
Multiple parameters can be used together, e.g.:
/imagine prompt: abstract pattern --tile --ar 1:1 --s 200

Remember, the order of parameters doesn't matter, but it's recommended to place them at the end of the prompt for clarity.`,
          keyPoints: [
            '--quality controls image quality and generation speed',
            '--repeat allows generating multiple images from the same prompt',
            '--tile creates seamless patterns',
            'Multiple parameters can be combined'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第四章測驗：參數的力量：精準控制圖像生成',
        titleEn: 'Chapter 4 Quiz: The Power of Parameters: Precision in Image Generation',
        description: '測試您對 Midjourney 各種參數的理解和應用',
        descriptionEn: 'Test your understanding and application of various Midjourney parameters',
        timeLimit: 12,
        passingScore: 71,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '--ar 參數是用來設定什麼？',
            questionEn: 'What is the --ar parameter used to set?',
            options: [
              '圖像的顏色',
              '圖像的大小',
              '圖像的長寬比',
              '圖像的風格'
            ],
            optionsEn: [
              'Image colour',
              'Image size',
              'Image aspect ratio',
              'Image style'
            ],
            correctAnswer: 2,
            explanation: '--ar parameter is used to set the aspect ratio of images, e.g., --ar 16:9 represents widescreen ratio.',
            explanationEn: '--ar parameter is used to set the aspect ratio of images, e.g., --ar 16:9 represents widescreen ratio.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '若希望生成的圖像顯示更大範圍的內容，應使用什麼參數？',
            questionEn: 'To generate images that show a wider range of content, which parameter should be used?',
            options: [
              '--ar 1:1',
              '--ar 16:9',
              '--ar 9:16',
              '--ar 3:2'
            ],
            optionsEn: [
              '--ar 1:1',
              '--ar 16:9',
              '--ar 9:16',
              '--ar 3:2'
            ],
            correctAnswer: 1,
            explanation: '--ar 16:9 is a widescreen ratio that can display a wider horizontal range, suitable for landscapes or wide-angle scenes.',
            explanationEn: '--ar 16:9 is a widescreen ratio that can display a wider horizontal range, suitable for landscapes or wide-angle scenes.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '--stylize 參數用來控制什麼？',
            questionEn: 'What does the --stylize parameter control?',
            options: [
              '圖像的風格強度',
              '圖像的分辨率',
              '圖像的速度',
              '圖像的顏色飽和度'
            ],
            optionsEn: [
              'Image style intensity',
              'Image resolution',
              'Image speed',
              'Image colour saturation'
            ],
            correctAnswer: 0,
            explanation: '--stylize parameter controls the strength of Midjourney\'s built-in artistic style, with values ranging from 0 to 1000.',
            explanationEn: '--stylize parameter controls the strength of Midjourney\'s built-in artistic style, with values ranging from 0 to 1000.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '若希望圖像顯得更具藝術感，應使用何種 --stylize 數值？',
            questionEn: 'To make images appear more artistic, what --stylize value should be used?',
            options: [
              '0-100',
              '100-500',
              '500-1000',
              '1000-2000'
            ],
            optionsEn: [
              '0-100',
              '100-500',
              '500-1000',
              '1000-2000'
            ],
            correctAnswer: 2,
            explanation: '較高的 --stylize 數值（500-1000）會讓圖像更具藝術感和風格化效果。',
            explanationEn: 'Higher --stylize values (500-1000) will make images more artistic and stylised.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '在 --chaos 參數中，數值越高會怎樣影響圖像？',
            questionEn: 'In the --chaos parameter, how do higher values affect images?',
            options: [
              '圖像的構圖更加一致',
              '圖像風格變得更加一致',
              '圖像生成的多樣性增加',
              '圖像生成速度減慢'
            ],
            optionsEn: [
              'Image composition becomes more consistent',
              'Image style becomes more consistent',
              'Image generation diversity increases',
              'Image generation speed slows down'
            ],
            correctAnswer: 2,
            explanation: '--chaos parameter controls the degree of variation in generation results; higher values create greater differences between the four initial images.',
            explanationEn: '--chaos parameter controls the degree of variation in generation results; higher values create greater differences between the four initial images.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: '若想創造一個非常奇異的圖像，應使用什麼參數？',
            questionEn: 'To create a very bizarre image, what parameter should be used?',
            options: [
              '--weird 0',
              '--weird 1000',
              '--weird 500',
              '--weird 200'
            ],
            optionsEn: [
              '--weird 0',
              '--weird 1000',
              '--weird 500',
              '--weird 200'
            ],
            correctAnswer: 1,
            explanation: '--weird parameter produces the most bizarre and unconventional image effects when set to 1000.',
            explanationEn: '--weird parameter produces the most bizarre and unconventional image effects when set to 1000.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: '若不希望圖像包含某些元素，可以使用哪個參數？',
            questionEn: 'To prevent images from containing certain elements, which parameter can be used?',
            options: [
              '--no',
              '--exclude',
              '--avoid',
              '--omit'
            ],
            optionsEn: [
              '--no',
              '--exclude',
              '--avoid',
              '--omit'
            ],
            correctAnswer: 0,
            explanation: '--no parameter is used to exclude specific elements, e.g., --no cats will avoid cats appearing in images.',
            explanationEn: '--no parameter is used to exclude specific elements, e.g., --no cats will avoid cats appearing in images.'
          }
        ]
      }
    },
    {
      id: 5,
      title: '第五章：參考與一致性：創造連續角色與風格',
      titleEn: 'Chapter 5: Reference & Consistency: Creating Continuous Characters & Styles',
      description: '學習使用 --sref 同 --cref 參數解決一致性挑戰。令同一個角色出現喺唔同嘅故事場景，為一系列作品保持統一嘅藝術風格。',
      descriptionEn: 'Learn to use --sref and --cref parameters to address consistency challenges. Enable the same character to appear in different story scenes whilst maintaining unified artistic styles for a series of works.',
      duration: '85 分鐘',
      durationEn: '85 minutes',
      lessons: [
        {
          id: 21,
          title: '5.1 風格參考 (--sref)：複製任何圖像嘅藝術風格',
          titleEn: '5.1 Style Reference (--sref): Copying Artistic Styles from Any Image',
          duration: '20 分鐘',
          durationEn: '20 minutes',
          type: 'interactive' as const,
          description: '掌握 --sref 參數，學習複製和應用任何圖像的藝術風格',
          descriptionEn: 'Master the --sref parameter to learn how to copy and apply artistic styles from any image',
          image: '/images/courses/midjourney-course/unit-images/style-reference.png',
          imageAlt: '風格參考功能示例',
          imageAltEn: 'Style reference feature examples',
          transcript: `--sref (Style Reference) parameter is a powerful tool that allows Midjourney to learn and mimic the artistic style of any reference image, including its aesthetics, tone, lighting, and overall feel.

Usage method:
Add --sref after your prompt and follow it with the URL of the reference image.

Example:
If you have a Van Gogh-style starry night image and want to use this style to draw a cat:
/imagine prompt: a cat --sref https://example.com/vangogh-style.jpg

The result will be a cat drawn in the Van Gogh starry night style, not the starry night itself.

Application scenarios:
1. Establishing a unified style for a series of works
2. Learning the style of a specific artist
3. Applying the aesthetic of existing works to new concepts
4. Creating a consistent visual identity for a brand

This feature is particularly useful for creating a unified and unique visual style for a series of works. You can first create a satisfactory style reference image and then use --sref to apply this style to the entire series.`,
          keyPoints: [
            '--sref copies the artistic style of an image without copying its content',
            'Suitable for establishing a unified style for a series of works',
            'Can learn and apply any artistic style',
            'URL of the reference image must be publicly accessible'
          ],
          completed: false
        },
        {
          id: 22,
          title: '5.2 角色參考 (--cref)：令同一角色出現喺唔同場景',
          titleEn: '5.2 Character Reference (--cref): Making the Same Character Appear in Different Scenes',
          duration: '22 分鐘',
          durationEn: '22 minutes',
          type: 'interactive' as const,
          description: '學習使用 --cref 參數保持角色一致性，創造連續的故事情節',
          descriptionEn: 'Learn to use the --cref parameter to maintain character consistency and create continuous storylines',
          image: '/images/courses/midjourney-course/unit-images/character-reference.png',
          imageAlt: '角色參考功能示例',
          imageAltEn: 'Character reference feature examples',
          transcript: `--cref (Character Reference) parameter is designed to solve consistency issues. It allows you to specify a reference image for a character, and then generate the same character in different scenes or poses in your prompt.

Usage method:
Add --cref after your prompt and follow it with the URL of an image containing a clear character.

Example:
If you've already generated a satisfactory astronaut image and now want to draw them on the moon drinking coffee:
/imagine prompt: drinking coffee on the moon --cref https://example.com/astronaut.jpg

Midjourney will attempt to generate a character that is consistent with the astronaut image, but with a different pose and scene: "drinking coffee on the moon".

Best practices:
1. Use the character effect generated by Midjourney for the best results
2. The character in the reference image should be clearly visible
3. Avoid using real photos
4. You can combine it with other parameters`,
          keyPoints: [
            '--cref maintains character consistency',
            'Suitable for creating a continuous story and character design',
            'Midjourney's character effect is best',
            'Can be used with different scenes'
          ],
          completed: false
        },
        {
          id: 23,
          title: '5.3 參考權重：微調參考嘅影響力 (--sw & --cw)',
          titleEn: '5.3 Reference Weights: Fine-tuning Reference Influence (--sw & --cw)',
          duration: '18 分鐘',
          durationEn: '18 minutes',
          type: 'interactive' as const,
          description: '學習使用權重參數精細調整風格和角色參考的影響程度',
          descriptionEn: 'Learn to use weight parameters to fine-tune the influence of style and character references',
          image: '/images/courses/midjourney-course/unit-images/reference-weights.png',
          imageAlt: '參考權重調整示例',
          imageAltEn: 'Reference weight adjustment examples',
          transcript: `當你使用 --sref 或 --cref 時，有時可能想調整參考圖嘅影響力。--sw (Style Weight) 同 --cw (Character Weight) 就係用嚟做呢件事嘅。

風格權重 (--sw)：
數值範圍係 0 到 1000，預設值係 100。佢控制住風格參考嘅強度。
- --sw 0：完全唔參考風格
- --sw 1000：最大程度地模仿風格

角色權重 (--cw)：
數值範圍係 0 到 100，預設值係 100。佢控制住角色參考嘅準確度。
- --cw 0：只參考面部，適合換衫
- --cw 100：參考面部、髮型同服裝，保真度最高

組合使用範例：
/imagine prompt: a knight in a forest --cref https://example.com/character.jpg --cw 50 --sref https://example.com/style.jpg --sw 800

呢個指令會生成一個森林中嘅騎士：
- 角色相似度中等（可能換咗盔甲）
- 但藝術風格就非常貼近參考風格

實際應用技巧：
1. 低 cw 值適合服裝變化
2. 高 sw 值適合強烈風格化
3. 根據需求靈活調整數值
4. 多次嘗試找到最佳組合`,
          keyPoints: [
            '--sw controls the strength of style reference (0-1000)',
            '--cw controls the accuracy of character reference (0-100)',
            'Lower values reduce influence, higher values enhance effect',
            'Can be adjusted flexibly based on specific needs'
          ],
          completed: false
        },
        {
          id: 24,
          title: '5.4 種子 (--seed)：重現與微調你嘅作品',
          titleEn: '5.4 Seed (--seed): Reproducing and Fine-tuning Your Works',
          duration: '15 分鐘',
          durationEn: '15 minutes',
          type: 'interactive' as const,
          description: '理解種子機制，學習如何重現和微調滿意的作品',
          descriptionEn: 'Understand the seed mechanism and learn how to reproduce and fine-tune satisfactory works',
          image: '/images/courses/midjourney-course/unit-images/seed-parameter.png',
          imageAlt: '種子參數使用示例',
          transcript: `喺 Midjourney 嘅世界，每一張圖像都係由一個初始嘅「種子」（Seed）數值所決定嘅一片隨機噪點圖開始演變而成。預設情況下，每次生成都會用一個新嘅隨機種子。

--seed 參數可以讓你手動指定用邊一個種子數值。佢最大嘅作用係可重複性。

獲取種子數值：
當你生成一張圖後，可以透過對該訊息添加信封 emoji (✉️) 反應，Midjourney Bot 就會將包含種子數值在內嘅詳細資訊私訊畀你。

使用方法：
/imagine prompt: a red car --seed 12345

只要提示詞同種子數值完全一樣，生成出嚟嘅圖像就會非常相似。

實際應用：
1. 重現滿意的結果：當你得到一張好嘅圖，可以用相同種子嘗試不同的微調
2. 可控實驗：固定種子數值，只改變提示詞的某個詞語，觀察細微變化
3. 風格一致：為系列作品使用相同或相近的種子
4. 版本比較：用相同種子測試不同參數的效果

呢個功能對於喺一個滿意嘅結果基礎上進行微調非常有用，實現更可控嘅實驗同創作。`,
          transcriptEn: `--seed parameter allows you to manually specify which seed number to use. Its main purpose is reproducibility.

To get the seed number:
When you generate an image, you can add a custom emoji reaction to the message to get detailed information about the seed number.

Usage method:
/imagine prompt: a red car --seed 12345

The generated image will be very similar if the prompt and seed number are exactly the same.

Practical applications:
1. Reproduce a satisfactory result: If you like a generated image, you can try different variations with the same seed number.
2. Controlled experimentation: Fix the seed number and change only specific words in the prompt to observe subtle changes.
3. Consistent style: Use the same or similar seed for a series of works.
4. Version comparison: Test different parameters with the same seed to see their effects.

This feature is very useful for fine-tuning a satisfactory result while maintaining controllable experimentation and creation.`,
          keyPoints: [
            '--seed controls randomness',
            'Same seed and prompt produce similar results',
            'Obtain seed number through emoji reaction',
            'Suitable for fine-tuning and controlled experimentation'
          ],
          completed: false
        },
        {
          id: 25,
          title: '5.5 綜合實戰：創建一致性角色系列',
          titleEn: '5.5 Comprehensive Practice: Creating Consistent Character Series',
          duration: '10 分鐘',
          durationEn: '10 minutes',
          type: 'interactive' as const,
          description: '綜合運用所學技巧，創建具有一致性的角色和風格系列作品',
          descriptionEn: 'Comprehensively apply learned techniques to create consistent character and style series works',
          image: '/images/courses/midjourney-course/unit-images/consistency-project.png',
          imageAlt: '一致性創作項目示例',
          imageAltEn: 'Consistency creation project examples',
          transcript: `現在我哋將所有學過嘅一致性技巧結合起來，創建一個完整嘅角色系列項目。

項目規劃步驟：

第一步：創建基礎角色
/imagine prompt: a young wizard with round glasses, detailed character design, fantasy art style

第二步：確定風格參考
選擇最滿意嘅結果，用 --sref 建立風格基調

第三步：角色一致性
用 --cref 參考基礎角色，創建不同場景：
- 角色在圖書館學習
- 角色在練習魔法
- 角色與朋友互動

第四步：微調控制
根據需要調整 --cw 和 --sw 值：
- 需要換裝時降低 --cw
- 需要強化風格時提高 --sw

第五步：系列完善
使用相似的種子值保持整體一致性

實際範例：
/imagine prompt: young wizard reading in library --cref [character_url] --sref [style_url] --cw 80 --sw 600

成功要素：
1. 清晰的項目規劃
2. 一致的參數使用
3. 合理的權重調整
4. 耐心的迭代優化`,
          transcriptEn: `We'll combine all the consistency techniques we've learned to create a complete series of character projects.

Project planning steps:

1. Create a basic character
/imagine prompt: a young wizard with round glasses, detailed character design, fantasy art style

2. Establish style reference
Choose the most satisfactory result and use --sref to establish the style tone

3. Character consistency
Use --cref to reference the basic character and create different scenes:
- Character studying in a library
- Character practicing magic
- Character interacting with friends

4. Fine-tuning
Adjust --cw and --sw values as needed:
- Decrease --cw when changing outfits
- Increase --sw when enhancing style

5. Series refinement
Use similar seed values to maintain overall consistency

Example:
/imagine prompt: young wizard reading in library --cref [character_url] --sref [style_url] --cw 80 --sw 600

Key elements:
1. Clear project planning
2. Consistent parameter use
3. Reasonable weight adjustment
4. Patient iterative optimization`,
          keyPoints: [
            'Combining all consistency techniques',
            'First, create a basic character and style reference',
            'Systematically create different scenes',
            'Achieve the best effect through iterative refinement'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第五章測驗：進階編輯與後製：完善你的作品',
        titleEn: 'Chapter 5 Quiz: Advanced Editing and Post-Processing: Refining Your Artwork',
        description: '測試您對進階編輯功能的掌握',
        descriptionEn: 'Test your mastery of advanced editing features',
        timeLimit: 15,
        passingScore: 71,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '在 Midjourney 中，如何進行細微的圖像修改？',
            questionEn: 'In Midjourney, how do you make subtle image modifications?',
            options: [
              '使用 Vary Region 功能',
              '使用 Vary Strong 功能',
              '使用 Reroll 功能',
              '重新生成整個圖像'
            ],
            optionsEn: [
              'Use Vary Region function',
              'Use Vary Strong function',
              'Use Reroll function',
              'Regenerate the entire image'
            ],
            correctAnswer: 0,
            explanation: 'Vary Region 功能允許精確修改圖像的特定區域，而不影響整體構圖。',
            explanationEn: 'The Vary Region function allows precise modification of specific areas of an image without affecting the overall composition.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '若要改變圖像的構圖，應選擇哪個功能？',
            questionEn: 'To change the composition of an image, which function should be chosen?',
            options: [
              'Vary Region',
              'Upscale',
              'Vary Strong',
              'Zoom Out'
            ],
            optionsEn: [
              'Vary Region',
              'Upscale',
              'Vary Strong',
              'Zoom Out'
            ],
            correctAnswer: 2,
            explanation: 'Vary Strong 功能會對圖像進行較大幅度的變更，包括構圖的改變。',
            explanationEn: 'The Vary Strong function makes significant changes to images, including composition alterations.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '當你希望重新生成圖像的某個區域而不改動其他部分時，應使用哪個功能？',
            questionEn: 'When you want to regenerate a specific area of an image without changing other parts, which function should be used?',
            options: [
              'Vary Region',
              'Vary Strong',
              'Reroll',
              'Upscale'
            ],
            optionsEn: [
              'Vary Region',
              'Vary Strong',
              'Reroll',
              'Upscale'
            ],
            correctAnswer: 0,
            explanation: 'Vary Region 是專門用於重新生成圖像特定區域的功能，保持其他部分不變。',
            explanationEn: 'Vary Region is specifically designed to regenerate specific areas of an image whilst keeping other parts unchanged.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '使用 Upscale 功能時，會對圖像做什麼處理？',
            questionEn: 'When using the Upscale function, what processing is done to the image?',
            options: [
              '降低圖像質量',
              '提高圖像的解析度',
              '改變圖像的風格',
              '增加圖像的對比度'
            ],
            optionsEn: [
              'Reduce image quality',
              'Increase image resolution',
              'Change image style',
              'Increase image contrast'
            ],
            correctAnswer: 1,
            explanation: 'Upscale 功能會提高選定圖像的解析度，讓圖像變得更清晰和更大尺寸。',
            explanationEn: 'The Upscale function increases the resolution of selected images, making them clearer and larger in size.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '使用 Pan 和 Zoom Out 功能時，圖像會如何變化？',
            questionEn: 'When using Pan and Zoom Out functions, how do images change?',
            options: [
              '圖像將被縮小',
              '圖像將進行色彩變化',
              '圖像的範圍會增大，顯示更多內容',
              '圖像會完全重置'
            ],
            optionsEn: [
              'Images will be reduced in size',
              'Images will undergo colour changes',
              'Image scope will increase, showing more content',
              'Images will be completely reset'
            ],
            correctAnswer: 2,
            explanation: 'Pan 和 Zoom Out 功能會擴展圖像的視野範圍，在現有圖像周圍生成更多內容。',
            explanationEn: 'Pan and Zoom Out functions expand the field of view of images, generating more content around existing images.'
          }
        ]
      }
    },
    {
      id: 6,
      title: '第六章：進階編輯與後製：完善你的作品',
      titleEn: 'Chapter 6: Advanced Editing and Post-Processing: Refining Your Artwork',
      description: '深入學習 Midjourney 的進階編輯技巧，包括精細調整、區域修改和批量處理等專業技能。',
      descriptionEn: 'Learn advanced editing techniques in Midjourney, including fine adjustments, regional modifications and batch processing professional skills.',
      duration: '120 分鐘',
      durationEn: '120 Minutes',
      lessons: [
        {
          id: 26,
          title: '6.1 Vary Region：精準的區域修改技術',
          titleEn: '6.1 Vary Region: Precision Regional Modification Techniques',
          duration: '25 分鐘',
          durationEn: '25 Minutes',
          type: 'interactive' as const,
          description: '掌握 Vary Region 功能，學會精確修改圖像特定區域',
          descriptionEn: 'Master the Vary Region function and learn to precisely modify specific areas of images',
          image: '/images/courses/midjourney-course/unit-images/vary-region.png',
          imageAlt: 'Vary Region 功能示範',
          imageAltEn: 'Vary Region function demonstration',
          transcript: `Vary Region 是 Midjourney 最強大的編輯工具之一，它允許你精確地修改圖像的特定區域，而不影響其他部分。這個功能特別適合用於：

1. 修改角色的表情或姿勢
2. 改變背景的某個元素
3. 調整物體的顏色或材質
4. 替換圖像中的特定物件

使用方法：
1. 選擇一張已生成的圖像
2. 點擊 "Vary Region" 按鈕
3. 使用畫筆工具選擇要修改的區域
4. 輸入新的提示詞描述想要的改變
5. 等待 AI 重新生成選定區域

注意事項：
- 選擇區域時要精確，避免選擇過大或過小的範圍
- 新的提示詞應該具體描述想要的改變
- 保持與原圖風格的一致性`,
          transcriptEn: `Vary Region is one of Midjourney's most powerful editing tools, allowing you to precisely modify specific areas of an image without affecting other parts. This function is particularly suitable for:

1. Modifying character expressions or poses
2. Changing specific elements in the background
3. Adjusting object colours or materials
4. Replacing specific objects in images

How to use:
1. Select a generated image
2. Click the "Vary Region" button
3. Use the brush tool to select the area to modify
4. Input new prompts describing the desired changes
5. Wait for AI to regenerate the selected area

Important notes:
- Be precise when selecting areas, avoid selecting ranges that are too large or too small
- New prompts should specifically describe the desired changes
- Maintain consistency with the original image style`,
          keyPoints: [
            'Vary Region allows precise regional modification',
            'Suitable for modifying expressions, poses, background elements',
            'Use brush tool to select modification range',
            'New prompts should specifically describe changes'
          ],
          keyPointsEn: [
            'Vary Region allows precise regional modification',
            'Suitable for modifying expressions, poses, background elements',
            'Use brush tool to select modification range',
            'New prompts should specifically describe changes'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第六章測驗：進階編輯與後製：完善你的作品',
        titleEn: 'Chapter 6 Quiz: Advanced Editing and Post-Processing: Refining Your Artwork',
        description: '測試您對進階編輯技巧的深入理解',
        descriptionEn: 'Test your in-depth understanding of advanced editing techniques',
        timeLimit: 15,
        passingScore: 71,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '在 Midjourney 中，如何精細調整圖像的一部分而不改動整體？',
            questionEn: 'In Midjourney, how do you make fine adjustments to part of an image without changing the whole?',
            options: [
              '使用 Vary Region 功能',
              '使用 Vary Strong 功能',
              '使用 Upscale 功能',
              '使用 Reroll 功能'
            ],
            optionsEn: [
              'Use Vary Region function',
              'Use Vary Strong function',
              'Use Upscale function',
              'Use Reroll function'
            ],
            correctAnswer: 0,
            explanation: 'Vary Region 功能是精細調整圖像特定部分的最佳工具，可以選擇性地修改特定區域。',
            explanationEn: 'The Vary Region function is the best tool for fine-tuning specific parts of an image, allowing selective modification of particular areas.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '當你想進行較大範圍的變更，應使用哪個功能？',
            questionEn: 'When you want to make larger-scale changes, which function should be used?',
            options: [
              'Vary Subtle',
              'Vary Strong',
              'Vary Region',
              'Zoom Out'
            ],
            optionsEn: [
              'Vary Subtle',
              'Vary Strong',
              'Vary Region',
              'Zoom Out'
            ],
            correctAnswer: 1,
            explanation: 'Vary Strong 功能會對圖像進行較大幅度的變更，適用於需要顯著改變的情況。',
            explanationEn: 'The Vary Strong function makes significant changes to images, suitable for situations requiring substantial alterations.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: 'Vary Region 主要的優勢是什麼？',
            questionEn: 'What is the main advantage of Vary Region?',
            options: [
              '重新生成整張圖像',
              '精確修改圖像的特定區域',
              '完全改變圖像的風格',
              '降低圖像的解析度'
            ],
            optionsEn: [
              'Regenerate the entire image',
              'Precisely modify specific areas of the image',
              'Completely change the image style',
              'Reduce image resolution'
            ],
            correctAnswer: 1,
            explanation: 'Vary Region 的主要優勢是能夠精確修改圖像的特定區域，同時保持其他部分不變。',
            explanationEn: 'The main advantage of Vary Region is its ability to precisely modify specific areas of an image whilst keeping other parts unchanged.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '若想將圖像的解析度提高，應使用哪個功能？',
            questionEn: 'To increase image resolution, which function should be used?',
            options: [
              'Vary Strong',
              'Upscale',
              'Reroll',
              'Vary Region'
            ],
            optionsEn: [
              'Vary Strong',
              'Upscale',
              'Reroll',
              'Vary Region'
            ],
            correctAnswer: 1,
            explanation: 'Upscale 功能專門用於提高圖像的解析度，讓圖像變得更清晰和更大。',
            explanationEn: 'The Upscale function is specifically designed to increase image resolution, making images clearer and larger.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '在圖像的背景或周圍擴展畫布時，使用哪個功能？',
            questionEn: 'When expanding the canvas around the background or surroundings of an image, which function is used?',
            options: [
              'Zoom In',
              'Zoom Out',
              'Pan',
              'Vary Region'
            ],
            optionsEn: [
              'Zoom In',
              'Zoom Out',
              'Pan',
              'Vary Region'
            ],
            correctAnswer: 2,
            explanation: 'Pan 功能用於在圖像的各個方向擴展畫布，生成周圍的新內容。',
            explanationEn: 'The Pan function is used to expand the canvas in various directions around an image, generating new surrounding content.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: '若希望創建一個較為怪異和奇異的圖像，應使用哪個參數？',
            questionEn: 'To create a rather bizarre and strange image, which parameter should be used?',
            options: [
              '--stylize',
              '--chaos',
              '--weird',
              '--ar'
            ],
            optionsEn: [
              '--stylize',
              '--chaos',
              '--weird',
              '--ar'
            ],
            correctAnswer: 2,
            explanation: '--weird parameter is specifically designed to create bizarre and unconventional image effects, with higher values producing more pronounced results.',
            explanationEn: '--weird parameter is specifically designed to create bizarre and unconventional image effects, with higher values producing more pronounced results.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: '當想讓 Midjourney 在圖像的某一部分進行微調時，應該使用哪個選項？',
            questionEn: 'When wanting Midjourney to make fine adjustments to a specific part of an image, which option should be used?',
            options: [
              'Vary Region',
              'Vary Strong',
              'Vary Subtle',
              'Upscale'
            ],
            optionsEn: [
              'Vary Region',
              'Vary Strong',
              'Vary Subtle',
              'Upscale'
            ],
            correctAnswer: 0,
            explanation: 'Vary Region 是專門用於對圖像特定部分進行微調的功能，提供最精確的區域控制。',
            explanationEn: 'Vary Region is specifically designed for fine-tuning specific parts of images, providing the most precise regional control.'
          }
        ]
      }
    },
    {
      id: 7,
      title: '第七章：工作流程與資源管理',
      titleEn: 'Chapter 7: Workflow and Resource Management',
      description: '學習高效的 Midjourney 工作流程，包括 GPU 時間管理、批量操作和圖庫組織等專業技能。',
      descriptionEn: 'Learn efficient Midjourney workflows, including GPU time management, batch operations, and gallery organisation professional skills.',
      duration: '100 分鐘',
      durationEn: '100 Minutes',
      lessons: [
        {
          id: 31,
          title: '7.1 帳戶管理：/info 指令與 GPU 時間優化',
          titleEn: '7.1 Account Management: /info Command and GPU Time Optimisation',
          duration: '20 分鐘',
          durationEn: '20 Minutes',
          type: 'interactive' as const,
          description: '掌握帳戶狀態查詢和 GPU 資源的有效管理',
          descriptionEn: 'Master account status queries and effective GPU resource management',
          image: '/images/courses/midjourney-course/unit-images/account-management.png',
          imageAlt: '帳戶管理介面',
          imageAltEn: 'Account management interface',
          transcript: `/info 指令是管理 Midjourney 帳戶的核心工具，它提供了詳細的帳戶資訊和使用統計。

主要功能：
1. 查看剩餘的 Fast GPU 時間
2. 檢查 Relax Mode 的可用性
3. 顯示當前的訂閱狀態
4. 查看本月的使用統計
5. 確認最大同時任務數

Fast Mode vs Relax Mode：
- Fast Mode：消耗付費的 GPU 時間，生成速度快
- Relax Mode：不消耗 Fast GPU 時間，但速度較慢，需要排隊

優化策略：
1. 在實驗階段使用 Relax Mode
2. 重要作品使用 Fast Mode
3. 定期檢查 GPU 時間餘額
4. 合理安排創作計劃`,
          transcriptEn: `The /info command is the core tool for managing Midjourney accounts, providing detailed account information and usage statistics.

Main functions:
1. View remaining Fast GPU time
2. Check Relax Mode availability
3. Display current subscription status
4. View monthly usage statistics
5. Confirm maximum concurrent jobs

Fast Mode vs Relax Mode:
- Fast Mode: Consumes paid GPU time, fast generation speed
- Relax Mode: Doesn't consume Fast GPU time, but slower speed, requires queuing

Optimisation strategies:
1. Use Relax Mode during experimental phase
2. Use Fast Mode for important works
3. Regularly check GPU time balance
4. Plan creation schedules reasonably`,
          keyPoints: [
            '/info 指令提供完整帳戶資訊',
            'Fast Mode 速度快但消耗 GPU 時間',
            'Relax Mode 免費但需要排隊',
            '合理規劃 GPU 時間使用'
          ],
          keyPointsEn: [
            '/info command provides complete account information',
            'Fast Mode is fast but consumes GPU time',
            'Relax Mode is free but requires queuing',
            'Plan GPU time usage reasonably'
          ],
          completed: false
        }
      ],
      quiz: {
        title: '第七章測驗：工作流程與資源管理',
        titleEn: 'Chapter 7 Quiz: Workflow and Resource Management',
        description: '測試您對 Midjourney 工作流程和資源管理的掌握',
        descriptionEn: 'Test your mastery of Midjourney workflow and resource management',
        timeLimit: 15,
        passingScore: 71,
        questions: [
          {
            id: 1,
            type: 'single' as const,
            question: '在 Midjourney 中，如何查詢帳戶的 GPU 使用狀況？',
            questionEn: 'In Midjourney, how do you query account GPU usage status?',
            options: [
              '使用 /info 指令',
              '在設置中查看',
              '在 Discord 頻道中查詢',
              '直接向 Midjourney 支持請求'
            ],
            optionsEn: [
              'Use /info command',
              'Check in settings',
              'Query in Discord channels',
              'Request directly from Midjourney support'
            ],
            correctAnswer: 0,
            explanation: '/info 指令是查詢帳戶狀態、GPU 使用情況和訂閱資訊的主要方式。',
            explanationEn: 'The /info command is the primary way to query account status, GPU usage, and subscription information.'
          },
          {
            id: 2,
            type: 'single' as const,
            question: '當使用者在 Fast Mode 和 Relax Mode 之間切換時，兩者的主要區別是什麼？',
            questionEn: 'When users switch between Fast Mode and Relax Mode, what is the main difference?',
            options: [
              'Fast Mode 提供無限制的生成時間',
              'Relax Mode 不消耗 GPU 時間，但速度較慢',
              'Relax Mode 提供更多的生成選項',
              'Fast Mode 只能用於圖像風格設定'
            ],
            optionsEn: [
              'Fast Mode provides unlimited generation time',
              'Relax Mode doesn\'t consume GPU time but is slower',
              'Relax Mode provides more generation options',
              'Fast Mode can only be used for image style settings'
            ],
            correctAnswer: 1,
            explanation: 'Relax Mode 不消耗付費的 Fast GPU 時間，但生成速度較慢，適合非急需的創作。',
            explanationEn: 'Relax Mode doesn\'t consume paid Fast GPU time but has slower generation speeds, suitable for non-urgent creations.'
          },
          {
            id: 3,
            type: 'single' as const,
            question: '要查看剩餘的 GPU 時間和帳戶狀態，應該使用哪個指令？',
            questionEn: 'To view remaining GPU time and account status, which command should be used?',
            options: [
              '/status',
              '/check',
              '/info',
              '/account'
            ],
            optionsEn: [
              '/status',
              '/check',
              '/info',
              '/account'
            ],
            correctAnswer: 2,
            explanation: '/info 指令提供完整的帳戶資訊，包括剩餘 GPU 時間、訂閱狀態和使用統計。',
            explanationEn: 'The /info command provides complete account information, including remaining GPU time, subscription status, and usage statistics.'
          },
          {
            id: 4,
            type: 'single' as const,
            question: '若想快速生成多張圖像，應使用哪個選項來提升效率？',
            questionEn: 'To quickly generate multiple images, which option should be used to improve efficiency?',
            options: [
              'Zoom Out',
              'Batch Actions',
              'Vary Region',
              'Upscale'
            ],
            optionsEn: [
              'Zoom Out',
              'Batch Actions',
              'Vary Region',
              'Upscale'
            ],
            correctAnswer: 1,
            explanation: 'Batch Actions 功能允許對多張圖像同時進行操作，大幅提升工作效率。',
            explanationEn: 'Batch Actions functionality allows simultaneous operations on multiple images, significantly improving work efficiency.'
          },
          {
            id: 5,
            type: 'single' as const,
            question: '在 Midjourney 網站的圖庫中，如何更高效地組織和管理作品？',
            questionEn: 'In Midjourney website\'s gallery, how can artworks be organised and managed more efficiently?',
            options: [
              '使用資料夾功能（Folders）',
              '用顏色標籤來標註圖像',
              '按照生成時間進行排序',
              '直接刪除不需要的圖像'
            ],
            optionsEn: [
              'Use folder functionality (Folders)',
              'Use colour labels to tag images',
              'Sort by generation time',
              'Directly delete unwanted images'
            ],
            correctAnswer: 0,
            explanation: '資料夾功能是組織和管理大量作品的最有效方式，可以按專案或主題分類。',
            explanationEn: 'Folder functionality is the most effective way to organise and manage large amounts of artwork, allowing categorisation by project or theme.'
          },
          {
            id: 6,
            type: 'single' as const,
            question: '若想同時管理大量的圖像並進行批量處理，應該使用哪個功能？',
            questionEn: 'To simultaneously manage large numbers of images and perform batch processing, which function should be used?',
            options: [
              'Reroll',
              'Batch Actions',
              'Upscale',
              'Vary Region'
            ],
            optionsEn: [
              'Reroll',
              'Batch Actions',
              'Upscale',
              'Vary Region'
            ],
            correctAnswer: 1,
            explanation: 'Batch Actions 是專門設計用於大量圖像的批量處理功能，可以同時執行多種操作。',
            explanationEn: 'Batch Actions is specifically designed for batch processing of large numbers of images, allowing multiple operations to be performed simultaneously.'
          },
          {
            id: 7,
            type: 'single' as const,
            question: '若要查看或整理過去的創作，哪個功能會最有幫助？',
            questionEn: 'To view or organise past creations, which function would be most helpful?',
            options: [
              'Search and Filter',
              'Download All',
              'Add to Favourites',
              'Personalised Style'
            ],
            optionsEn: [
              'Search and Filter',
              'Download All',
              'Add to Favourites',
              'Personalised Style'
            ],
            correctAnswer: 0,
            explanation: 'Search and Filter 功能提供強大的搜索和篩選能力，幫助快速找到和整理過去的創作。',
            explanationEn: 'Search and Filter functionality provides powerful search and filtering capabilities, helping to quickly find and organise past creations.'
          }
        ]
      }
    }
  ],
  faqData: [
    {
      question: '這個課程適合完全沒有 AI 藝術創作經驗的新手嗎？',
      questionEn: 'Is this course suitable for complete beginners with no AI art creation experience?',
      answer: '絕對適合。本課程從最基礎的概念開始，逐步深入到高級應用。我們會詳細解釋每個功能，並提供大量實戰案例，確保零基礎學員也能輕鬆跟上。',
      answerEn: 'Absolutely suitable. This course starts from the most basic concepts and gradually progresses to advanced applications. We will explain each feature in detail and provide plenty of practical examples to ensure that even beginners can easily follow along.'
    },
    {
      question: '學習這個課程需要多長時間？',
      questionEn: 'How long does it take to complete this course?',
      answer: '課程包含超過 7 小時的核心內容。由於是線上自學模式，您可以根據自己的進度安排學習。為了達到最佳效果，我們建議每週投入 2-3 小時，在一個月內完成課程。',
      answerEn: 'The course contains over 7 hours of core content. Since it is an online self-study format, you can arrange your learning according to your own pace. For optimal results, we recommend investing 2-3 hours per week to complete the course within one month.'
    },
    {
      question: '我需要付費訂閱 Midjourney 才能學習嗎？',
      questionEn: 'Do I need to pay for Midjourney subscription to learn?',
      answer: '是的，Midjourney 目前需要付費訂閱才能使用。我們會在課程中詳細介紹各種訂閱計劃的差異，幫助您選擇最適合的方案。',
      answerEn: 'Yes, Midjourney currently requires a paid subscription to use. We will explain the differences between various subscription plans in detail in the course to help you choose the most suitable option.'
    }
  ],
  isFree: true
}; 