// 完整的 Prompt Engineering 課程數據結構
export interface CourseLesson {
  id: string;
  title: string;
  titleZh: string;
  lessonType: 'video' | 'interactive-text' | 'quiz';
  duration: string;
  durationZh: string;
  completed: boolean;
  
  // Video lessons
  videoUrl?: string;
  transcript?: string;
  
  // Interactive text lessons
  contentUrl?: string;
  interactiveElements?: InteractiveElement[];
  
  // Common properties
  description: string;
  descriptionZh: string;
  learningObjectives: string[];
  learningObjectivesZh: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Playground settings
  playgroundType: 'prompt-engineering' | 'image-generation' | 'code-editor';
  expectedOutput: string;
  expectedOutputZh: string;
  
  // Resources
  resources: LessonResource[];
  notes: LessonNote[];
  
  // Assessment
  hasQuiz: boolean;
  quizQuestions?: QuizQuestion[];
}

export interface InteractiveElement {
  id: string;
  type: 'try-it-prompt' | 'code-example' | 'concept-check' | 'mini-playground';
  content: string;
  contentZh: string;
  prompt?: string;
  expectedResponse?: string;
  codeExample?: string;
  language?: string;
}

export interface LessonResource {
  id: string;
  name: string;
  nameZh: string;
  type: 'pdf' | 'code' | 'dataset' | 'template' | 'link';
  url: string;
  size: string;
  description: string;
  descriptionZh: string;
  downloadCount: number;
  previewAvailable: boolean;
}

export interface LessonNote {
  id: string;
  timestamp: string;
  content: string;
  contentZh: string;
  codeSnippet?: string;
  type: 'concept' | 'example' | 'tip' | 'warning';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-analysis' | 'prompt-writing' | 'concept-matching';
  question: string;
  questionZh: string;
  options?: string[];
  optionsZh?: string[];
  correctAnswer: string | string[];
  explanation: string;
  explanationZh: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  codeContext?: string;
  promptContext?: string;
  aiGeneratedFeedback?: string;
  videoTimestamp?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  estimatedTime: string;
  estimatedTimeZh: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  learningOutcomesZh: string[];
  lessons: CourseLesson[];
  moduleQuiz?: {
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit: number;
  };
}

export interface PromptEngineeringCourse {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  instructor: string;
  instructorZh: string;
  duration: string;
  durationZh: string;
  level: string;
  levelZh: string;
  language: string;
  languageZh: string;
  rating: number;
  totalStudents: number;
  price: number;
  currency: string;
  modules: CourseModule[];
  
  // Course meta
  createdAt: Date;
  updatedAt: Date;
  version: string;
  
  // Learning progress
  totalLessons: number;
  totalDuration: number; // in minutes
  completionCertificate: boolean;
  
  // Community features
  hasDiscussion: boolean;
  hasLiveSupport: boolean;
  
  // AI Features
  hasAITutor: boolean;
  aiTutorPersonality: string;
  aiTutorKnowledgeBase: string[];
}

// 完整的課程數據
export const promptEngineeringCourseData: PromptEngineeringCourse = {
  id: 'prompt-engineering-mastery',
  title: 'AI Magic Language: Prompt Engineering Course',
  titleZh: 'AI 的魔法語言：Prompt Engineering 課程',
  description: 'Learn the magic language of AI through fun and practical prompt engineering',
  descriptionZh: '通過趣味且實用的提示工程，學習 AI 的魔法語言',
  instructor: 'AI Formula Team',
  instructorZh: 'AI Formula 團隊',
  duration: '4.5 hours',
  durationZh: '4.5小時',
  level: 'Beginner to Advanced',
  levelZh: '初級到高級',
  language: 'English/Chinese',
  languageZh: '英文/中文',
  rating: 4.9,
  totalStudents: 1580,
  price: 299,
  currency: 'HKD',
  
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  version: '2.0',
  
  totalLessons: 9,
  totalDuration: 270,
  completionCertificate: true,
  
  hasDiscussion: true,
  hasLiveSupport: true,
  
  hasAITutor: true,
  aiTutorPersonality: 'friendly, patient, encouraging',
  aiTutorKnowledgeBase: ['prompt-engineering', 'llm-basics', 'ai-tools', 'best-practices'],
  
  modules: [
    {
      id: 'module-1',
      title: 'AI Whispers - Discovering AI\'s Magic Language',
      titleZh: 'AI 的悄悄話 - 初探 AI 的魔法語言',
      description: 'This section introduces you to what "prompts" are and why learning to chat with AI is so important!',
      descriptionZh: '這個部分會帶你認識什麼是「提示（Prompt）」，以及為什麼學會跟 AI 聊天這麼重要！',
      estimatedTime: '50 minutes',
      estimatedTimeZh: '50分鐘',
      difficulty: 'beginner',
      prerequisites: [],
      learningOutcomes: [
        'Understand what AI prompts are',
        'Learn why effective prompting is crucial',
        'Recognize different AI personalities and characteristics'
      ],
      learningOutcomesZh: [
        '理解什麼是 AI 提示',
        '學習為什麼有效提示至關重要',
        '認識不同 AI 的個性和特點'
      ],
      lessons: [
        {
          id: 'l1-1',
          title: 'Hello, AI! What is a "Prompt"?',
          titleZh: '你好，AI！什麼是「提示 (Prompt)」？',
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15分鐘',
          completed: false,
          contentUrl: '/content/lesson1-1.md',
          description: 'Think of AI as a super-smart all-purpose robot. What you say to it is a "prompt". It\'s as simple as pressing a remote control button (prompt) to make the TV change channels (AI\'s response)!',
          descriptionZh: '把 AI 想像成一個超級聰明的萬能機器人。你跟他說的話，就是「提示」。就像你按下遙控器按鈕（提示），電視就會轉台（AI 的回應）一樣簡單！',
          learningObjectives: [
            'Define what a prompt is in simple terms',
            'Understand the relationship between prompts and AI responses',
            'Learn basic prompt-response examples'
          ],
          learningObjectivesZh: [
            '用簡單的語言定義什麼是提示',
            '理解提示和 AI 回應之間的關係',
            '學習基本的提示-回應範例'
          ],
          tags: ['introduction', 'basics', 'prompt-definition'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Clear understanding of what prompts are and how they work',
          expectedOutputZh: '清楚理解什麼是提示以及它們如何工作',
          resources: [
            {
              id: 'res-1-1-1',
              name: 'Prompt Basics Guide',
              nameZh: '提示基礎指南',
              type: 'pdf',
              url: '/resources/prompt-basics.pdf',
              size: '800KB',
              description: 'A beginner-friendly guide to understanding prompts',
              descriptionZh: '初學者友好的提示理解指南',
              downloadCount: 234,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-1-1',
              timestamp: '00:05:30',
              content: 'A prompt is like a conversation starter with AI',
              contentZh: '提示就像是與 AI 的對話開場白',
              type: 'concept',
              tags: ['definition', 'conversation'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l1-2',
          title: 'Why Learn Good Prompts? From "Understanding" to "Totally Gets You"',
          titleZh: '為什麼要學好提示？從「聽得懂」到「超懂你」',
          lessonType: 'interactive-text',
          duration: '20 minutes',
          durationZh: '20分鐘',
          completed: false,
          contentUrl: '/content/lesson1-2.md',
          description: 'Good prompts are like giving clear instructions to a super-smart assistant. The clearer your instructions, the better the results!',
          descriptionZh: '好的提示就像是給超級聰明的助手清楚的指令。你的指令越清楚，結果就越好！',
          learningObjectives: [
            'Understand the importance of clear communication with AI',
            'Learn how prompt quality affects AI responses',
            'Recognize the difference between good and bad prompts'
          ],
          learningObjectivesZh: [
            '理解與 AI 清楚溝通的重要性',
            '學習提示品質如何影響 AI 回應',
            '認識好提示和壞提示的區別'
          ],
          tags: ['importance', 'communication', 'quality'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Understanding of why prompt quality matters',
          expectedOutputZh: '理解為什麼提示品質很重要',
          resources: [
            {
              id: 'res-1-2-1',
              name: 'Good vs Bad Prompts Examples',
              nameZh: '好提示vs壞提示範例',
              type: 'pdf',
              url: '/resources/prompt-examples.pdf',
              size: '1.2MB',
              description: 'Collection of prompt examples showing what works and what doesn\'t',
              descriptionZh: '提示範例集合，展示什麼有效，什麼無效',
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-2-1',
              timestamp: '00:10:15',
              content: 'Clear prompts = Clear results',
              contentZh: '清晰的提示 = 清晰的結果',
              type: 'concept',
              tags: ['clarity', 'results'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l1-3',
          title: 'Meet Your AI Buddies: Different AI Personalities',
          titleZh: '認識你的 AI 小夥伴：不同 AI 的小個性',
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15分鐘',
          completed: false,
          contentUrl: '/content/lesson1-3.md',
          description: 'Simple introduction to different common AIs, like ChatGPT for chatting and Midjourney for drawing. Learn that talking to different AIs might require slightly different approaches!',
          descriptionZh: '簡單介紹幾種常見的 AI，像是會聊天的 ChatGPT、會畫圖的 Midjourney。讓你知道，跟不同 AI 說話，方式可能要稍微不一樣喔！',
          learningObjectives: [
            'Identify different types of AI tools',
            'Understand that different AIs have different strengths',
            'Learn basic characteristics of popular AI platforms'
          ],
          learningObjectivesZh: [
            '識別不同類型的 AI 工具',
            '理解不同的 AI 有不同的優勢',
            '學習流行 AI 平台的基本特徵'
          ],
          tags: ['ai-types', 'chatgpt', 'midjourney', 'platforms'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Familiarity with different AI platforms and their uses',
          expectedOutputZh: '熟悉不同 AI 平台及其用途',
          resources: [
            {
              id: 'res-1-3-1',
              name: 'AI Platforms Comparison',
              nameZh: 'AI 平台比較',
              type: 'pdf',
              url: '/resources/ai-platforms.pdf',
              size: '1.5MB',
              description: 'Overview of popular AI platforms and their specialties',
              descriptionZh: '流行 AI 平台及其專長概述',
              downloadCount: 567,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-3-1',
              timestamp: '00:08:00',
              content: 'Each AI has its own personality and strengths',
              contentZh: '每個 AI 都有自己的個性和優勢',
              type: 'concept',
              tags: ['ai-personalities', 'strengths'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: true,
          quizQuestions: [
            {
              id: 'q1-quiz-1',
              type: 'multiple-choice',
              question: 'What do you call the words you say to AI?',
              questionZh: '你跟 AI 說的話，被稱為什麼？',
              options: ['Spell', 'Prompt', 'Secret Code'],
              optionsZh: ['咒語', '提示 (Prompt)', '暗號'],
              correctAnswer: 'Prompt',
              explanation: 'The words we use to communicate with AI are called "prompts".',
              explanationZh: '我們用來與 AI 溝通的話語稱為「提示」。',
              difficulty: 'easy',
              points: 10,
              aiGeneratedFeedback: 'Correct! Prompts are the foundation of AI communication.',
              videoTimestamp: '00:12:30'
            },
            {
              id: 'q1-quiz-2',
              type: 'multiple-choice',
              question: 'Why is learning good prompts important?',
              questionZh: '為什麼學好提示很重要？',
              options: ['So AI will like me', 'To make AI do what I want more accurately', 'It looks cool'],
              optionsZh: ['這樣 AI 才會喜歡我', '為了讓 AI 更準確地完成我想做的事', '這樣看起來很酷'],
              correctAnswer: 'To make AI do what I want more accurately',
              explanation: 'Good prompts help AI understand exactly what you want, leading to better results.',
              explanationZh: '好的提示幫助 AI 準確理解你想要什麼，從而產生更好的結果。',
              difficulty: 'easy',
              points: 10,
              aiGeneratedFeedback: 'Excellent! You understand the core purpose of prompt engineering.',
              videoTimestamp: '00:15:45'
            }
          ]
        }
      ]
    },
    {
      id: 'module-2',
      title: 'The Magic of Clear Communication',
      titleZh: '把話說清楚的魔法 - 基礎提示技巧',
      description: 'Here you\'ll learn the most basic and important "talking" skills to transform AI from "understands" to "totally gets you".',
      descriptionZh: '這裡會教你幾個最基本、也最重要的「說話」技巧，讓 AI 從「聽得懂」變成「超懂你」。',
      estimatedTime: '80 minutes',
      estimatedTimeZh: '80分鐘',
      difficulty: 'beginner',
      prerequisites: ['module-1'],
      learningOutcomes: [
        'Master the technique of being specific and clear',
        'Learn to provide context and background information',
        'Understand how to teach AI through examples'
      ],
      learningOutcomesZh: [
        '掌握具體明確的技巧',
        '學會提供背景和上下文資訊',
        '理解如何透過範例教導 AI'
      ],
      lessons: [
        {
          id: 'l2-1',
          title: 'Technique 1: Be Specific - Don\'t Say "Whatever", Tell It What You Want!',
          titleZh: '技巧一【明確具體】：別說「隨便」，告訴它你要什麼！',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25分鐘',
          completed: false,
          contentUrl: '/content/lesson2-1.md',
          description: '❌ Bad example: "Draw me a dog." -> AI doesn\'t know what kind of dog. ✅ Good example: "Draw me a golden retriever with a red collar chasing a ball."',
          descriptionZh: '❌ 壞例子：「幫我畫一隻狗。」 -> AI 不知道要畫什麼狗。✅ 好例子：「幫我畫一隻戴著紅色項圈的、正在追皮球的黃金獵犬。」',
          learningObjectives: [
            'Understand the importance of specificity in prompts',
            'Learn to replace vague terms with concrete descriptions',
            'Practice creating detailed, specific prompts'
          ],
          learningObjectivesZh: [
            '理解提示中具體性的重要性',
            '學會用具體描述替換模糊術語',
            '練習創建詳細、具體的提示'
          ],
          tags: ['specificity', 'clarity', 'examples'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to write specific and detailed prompts',
          expectedOutputZh: '能夠寫出具體詳細的提示',
          resources: [
            {
              id: 'res-2-1-1',
              name: 'Specificity Checklist',
              nameZh: '具體性檢查清單',
              type: 'pdf',
              url: '/resources/specificity-checklist.pdf',
              size: '600KB',
              description: 'A handy checklist to make your prompts more specific',
              descriptionZh: '讓你的提示更具體的實用檢查清單',
              downloadCount: 378,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-1-1',
              timestamp: '00:12:00',
              content: 'Specific prompts lead to specific results',
              contentZh: '具體的提示產生具體的結果',
              type: 'concept',
              tags: ['specificity', 'results'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l2-2',
          title: 'Technique 2: Provide Context - Tell AI the Story\'s Background',
          titleZh: '技巧二【提供背景】：告訴 AI 故事的前因後果',
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30分鐘',
          completed: false,
          contentUrl: '/content/lesson2-2.md',
          description: 'If you want AI to help you write a letter, first tell it: "This letter is for my teacher, the purpose is to ask for leave because I have a cold." The more information you give, the better AI writes.',
          descriptionZh: '如果你要請 AI 幫你寫信，要先告訴它：「這封信是要寫給老師的，目的是要請假，因為我感冒了。」給的資訊越多，AI 寫得越好。',
          learningObjectives: [
            'Learn the importance of context in prompt design',
            'Understand how background information improves AI responses',
            'Practice providing comprehensive context in prompts'
          ],
          learningObjectivesZh: [
            '學習上下文在提示設計中的重要性',
            '理解背景資訊如何改善 AI 回應',
            '練習在提示中提供全面的上下文'
          ],
          tags: ['context', 'background', 'information'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to provide rich context in prompts',
          expectedOutputZh: '能夠在提示中提供豐富的背景資訊',
          resources: [
            {
              id: 'res-2-2-1',
              name: 'Context Template Examples',
              nameZh: '背景模板範例',
              type: 'template',
              url: '/resources/context-templates.txt',
              size: '900KB',
              description: 'Ready-to-use templates for providing context',
              descriptionZh: '提供背景資訊的現成模板',
              downloadCount: 523,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-2-1',
              timestamp: '00:15:30',
              content: 'Context is like giving AI the full picture',
              contentZh: '背景就像給 AI 展示完整的圖片',
              type: 'concept',
              tags: ['context', 'full-picture'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l2-3',
          title: 'Technique 3: Give Examples - Be AI\'s Little Teacher',
          titleZh: '技巧三【給個範例】：當 AI 的小老師',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25分鐘',
          completed: false,
          contentUrl: '/content/lesson2-3.md',
          description: 'You can demonstrate to AI first. For example: "Please help me make sentences more lively. Example: \'The weather is nice today\' -> \'Wow! The sun is shining so brightly today!\' Now please help me rewrite: \'This book is interesting\'"',
          descriptionZh: '你可以先示範一次給 AI 看。例如：「請幫我把句子變活潑。範例：『今天天氣很好』->『哇！今天太陽公公笑得好燦爛！』。現在請幫我改寫：『這本書很有趣』」',
          learningObjectives: [
            'Learn to use examples to guide AI behavior',
            'Understand the power of demonstration in prompts',
            'Practice creating effective example-based prompts'
          ],
          learningObjectivesZh: [
            '學會使用範例來引導 AI 行為',
            '理解示範在提示中的力量',
            '練習創建有效的基於範例的提示'
          ],
          tags: ['examples', 'demonstration', 'teaching'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to use examples effectively in prompts',
          expectedOutputZh: '能夠在提示中有效使用範例',
          resources: [
            {
              id: 'res-2-3-1',
              name: 'Example-Based Prompt Library',
              nameZh: '基於範例的提示庫',
              type: 'code',
              url: '/resources/example-prompts.txt',
              size: '1.1MB',
              description: 'Collection of prompts that use examples effectively',
              descriptionZh: '有效使用範例的提示集合',
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-3-1',
              timestamp: '00:18:45',
              content: 'Examples are like showing, not just telling',
              contentZh: '範例就像展示，而不僅僅是告訴',
              type: 'concept',
              tags: ['examples', 'showing'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: true,
          quizQuestions: [
            {
              id: 'q2-quiz-1',
              type: 'multiple-choice',
              question: 'Which prompt is written best?',
              questionZh: '下面哪個提示寫得最好？',
              options: ['Write a poem', 'Write a five-line short poem about summer, ocean, and ice cream', 'Write something random'],
              optionsZh: ['寫一首詩', '寫一首關於夏天、海洋和冰淇淋的五行短詩', '隨便寫點東西'],
              correctAnswer: 'Write a five-line short poem about summer, ocean, and ice cream',
              explanation: 'This prompt is specific, provides clear requirements, and gives a focused topic.',
              explanationZh: '這個提示很具體，提供了明確的要求，並給出了集中的主題。',
              difficulty: 'easy',
              points: 15,
              aiGeneratedFeedback: 'Excellent! You recognize the value of specificity.',
              videoTimestamp: '00:20:00'
            },
            {
              id: 'q2-quiz-2',
              type: 'multiple-choice',
              question: 'When you want AI to imitate a certain style, what\'s the best technique?',
              questionZh: '當你希望 AI 模仿某種風格時，最好用的技巧是？',
              options: ['Scold it', 'Give it an example', 'Turn it off and on again'],
              optionsZh: ['罵它', '給它一個範例', '關掉重開'],
              correctAnswer: 'Give it an example',
              explanation: 'Examples are the most effective way to show AI the style or format you want.',
              explanationZh: '範例是向 AI 展示你想要的風格或格式的最有效方式。',
              difficulty: 'easy',
              points: 15,
              aiGeneratedFeedback: 'Perfect! Examples are powerful teaching tools.',
              videoTimestamp: '00:22:15'
            }
          ]
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Unleashing AI\'s Full Potential',
      titleZh: '釋放 AI 的全部潛力 - 進階提示技巧',
      description: 'Learn more advanced techniques to become an AI command master. You can make AI play specific roles and complete complex tasks step by step like peeling an onion.',
      descriptionZh: '學會更厲害的技巧，你可以讓 AI 扮演特定角色，甚至像剝洋蔥一樣，一步一步完成複雜的任務。',
      estimatedTime: '90 minutes',
      estimatedTimeZh: '90分鐘',
      difficulty: 'intermediate',
      prerequisites: ['module-1', 'module-2'],
      learningOutcomes: [
        'Master role-playing techniques with AI',
        'Learn chain-of-thought prompting for complex problems',
        'Understand iterative improvement of AI responses'
      ],
      learningOutcomesZh: [
        '掌握與 AI 的角色扮演技巧',
        '學習複雜問題的思維鏈提示',
        '理解 AI 回應的迭代改進'
      ],
      lessons: [
        {
          id: 'l3-1',
          title: 'Technique 4: Role-Playing - Ask AI to Transform!',
          titleZh: '技巧四【角色扮演】：請 AI 變身！',
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30分鐘',
          completed: false,
          contentUrl: '/content/lesson3-1.md',
          description: 'Make AI pretend to be a specific character. For example: "You are now an experienced astronaut, please describe from your perspective how it feels to see Earth for the first time."',
          descriptionZh: '讓 AI 假裝成某個角色。例如：「你現在是一位經驗豐富的太空人，請用你的角度，描述第一次看到地球的感覺。」',
          learningObjectives: [
            'Learn to assign roles and personas to AI',
            'Understand how role-playing improves response quality',
            'Practice creating effective role-based prompts'
          ],
          learningObjectivesZh: [
            '學會為 AI 分配角色和人格',
            '理解角色扮演如何提升回應質量',
            '練習創建有效的基於角色的提示'
          ],
          tags: ['role-playing', 'personas', 'characters'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to create compelling role-based prompts',
          expectedOutputZh: '能夠創建引人注目的基於角色的提示',
          resources: [
            {
              id: 'res-3-1-1',
              name: 'Role-Playing Prompt Templates',
              nameZh: '角色扮演提示模板',
              type: 'template',
              url: '/resources/role-playing-templates.txt',
              size: '1.3MB',
              description: 'Ready-to-use templates for different role-playing scenarios',
              descriptionZh: '不同角色扮演場景的現成模板',
              downloadCount: 612,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-1-1',
              timestamp: '00:14:30',
              content: 'Roles give AI a specific perspective and expertise',
              contentZh: '角色給 AI 特定的視角和專業知識',
              type: 'concept',
              tags: ['roles', 'perspective', 'expertise'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l3-2',
          title: 'Technique 5: Chain of Thought - Let AI Think Step by Step',
          titleZh: '技巧五【思維鏈 (Chain of Thought)】：讓 AI 一步一步想',
          lessonType: 'interactive-text',
          duration: '35 minutes',
          durationZh: '35分鐘',
          completed: false,
          contentUrl: '/content/lesson3-2.md',
          description: 'When problems are complex, you can ask AI to "think first, then answer". For example: "Please calculate step by step: there are 5 apples in a basket, I put in 3 more, then ate 2, how many are left?"',
          descriptionZh: '當問題很複雜時，可以請 AI「先思考，再回答」。例如：「請一步一步計算，一個籃子裡有 5 顆蘋果，我又放進 3 顆，後來吃掉 2 顆，最後剩下幾顆？」',
          learningObjectives: [
            'Understand the chain-of-thought methodology',
            'Learn to break complex problems into steps',
            'Practice creating step-by-step reasoning prompts'
          ],
          learningObjectivesZh: [
            '理解思維鏈方法論',
            '學會將複雜問題分解為步驟',
            '練習創建逐步推理提示'
          ],
          tags: ['chain-of-thought', 'reasoning', 'step-by-step'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to guide AI through logical reasoning processes',
          expectedOutputZh: '能夠引導 AI 進行邏輯推理過程',
          resources: [
            {
              id: 'res-3-2-1',
              name: 'Chain of Thought Examples',
              nameZh: '思維鏈範例',
              type: 'code',
              url: '/resources/chain-of-thought-examples.txt',
              size: '1.8MB',
              description: 'Examples of effective chain-of-thought prompts',
              descriptionZh: '有效思維鏈提示的範例',
              downloadCount: 789,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-2-1',
              timestamp: '00:20:00',
              content: 'Breaking down complex problems leads to better accuracy',
              contentZh: '分解複雜問題能帶來更好的準確性',
              type: 'concept',
              tags: ['complexity', 'accuracy', 'breakdown'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: false
        },
        {
          id: 'l3-3',
          title: 'Technique 6: Continuous Refinement - First Try Not Good? No Problem, Try Again!',
          titleZh: '技巧六【不斷修正】：第一次不好？沒關係，再來一次！',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25分鐘',
          completed: false,
          contentUrl: '/content/lesson3-3.md',
          description: 'Not satisfied with AI\'s answer? Don\'t give up! You can give new instructions based on its response to modify it. For example: "I think the story you just wrote is too sad, can you help me rewrite it with a happy ending?"',
          descriptionZh: 'AI 的回答不滿意？別放棄！可以針對它的回答，下新的指令來修改。例如：「我覺得剛剛的故事太悲傷了，可以幫我改寫成一個快樂的結局嗎？」',
          learningObjectives: [
            'Learn iterative improvement techniques',
            'Understand how to refine AI responses',
            'Practice giving feedback and correction prompts'
          ],
          learningObjectivesZh: [
            '學習迭代改進技巧',
            '理解如何完善 AI 回應',
            '練習給出反饋和修正提示'
          ],
          tags: ['refinement', 'iteration', 'feedback'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to iteratively improve AI responses',
          expectedOutputZh: '能夠迭代改進 AI 回應',
          resources: [
            {
              id: 'res-3-3-1',
              name: 'Refinement Strategies Guide',
              nameZh: '修正策略指南',
              type: 'pdf',
              url: '/resources/refinement-strategies.pdf',
              size: '1.0MB',
              description: 'Strategies for improving AI responses through iteration',
              descriptionZh: '通過迭代改進 AI 回應的策略',
              downloadCount: 456,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-3-1',
              timestamp: '00:16:30',
              content: 'Iteration is key to getting exactly what you want',
              contentZh: '迭代是獲得你想要的確切結果的關鍵',
              type: 'concept',
              tags: ['iteration', 'refinement', 'persistence'],
              createdAt: new Date('2024-01-20'),
              updatedAt: new Date('2024-01-20')
            }
          ],
          hasQuiz: true,
          quizQuestions: [
            {
              id: 'q3-quiz-1',
              type: 'multiple-choice',
              question: '"You are now an experienced food critic, please help me review this restaurant." What technique does this prompt use?',
              questionZh: '「你現在是一位美食評論家，請幫我評論這家餐廳。」這個提示用了什麼技巧？',
              options: ['Role-playing', 'Give an example', 'Be specific'],
              optionsZh: ['角色扮演', '給個範例', '明確具體'],
              correctAnswer: 'Role-playing',
              explanation: 'This prompt assigns a specific role (food critic) to the AI, which is role-playing.',
              explanationZh: '這個提示為 AI 分配了特定角色（美食評論家），這是角色扮演。',
              difficulty: 'medium',
              points: 20,
              aiGeneratedFeedback: 'Correct! Role-playing helps AI adopt specific expertise.',
              videoTimestamp: '00:25:00'
            },
            {
              id: 'q3-quiz-2',
              type: 'multiple-choice',
              question: 'If AI gives an answer that\'s not good enough, what should you do?',
              questionZh: '如果 AI 給的答案不夠好，你該怎麼辦？',
              options: ['Get angry and shut down the computer', 'Believe this is the best answer', 'Give new instructions to ask it to modify the bad parts'],
              optionsZh: ['生氣地關掉電腦', '相信這就是最好的答案了', '針對不好的地方，下新的指令請它修改'],
              correctAnswer: 'Give new instructions to ask it to modify the bad parts',
              explanation: 'Iterative refinement is a key skill in prompt engineering - you can always improve the response.',
              explanationZh: '迭代改進是提示工程的關鍵技能 - 你總是可以改善回應。',
              difficulty: 'medium',
              points: 20,
              aiGeneratedFeedback: 'Excellent! Persistence and refinement lead to better results.',
              videoTimestamp: '00:28:45'
            }
          ]
        }
      ]
    }
  ]
};

// 用戶進度追蹤數據
export interface UserProgress {
  studentName: string;
  completedLessons: string[];
  lastViewedLesson?: string;
  totalTimeSpent: number; // 分鐘
  skillCompetency: SkillLevel[];
  achievements: Achievement[];
  dailyStreak: number;
  lastLoginDate: Date;
}

export interface SkillLevel {
  skill: string;
  skillZh: string;
  level: number; // 0-100
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
  unlockedAt: Date;
  type: 'progress' | 'skill' | 'community' | 'streak';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const sampleUserProgress: UserProgress = {
  studentName: 'AI學習者',
  completedLessons: ['l1-1'], // 只完成第一課
  lastViewedLesson: 'l1-2', // 現在在看第二課
  totalTimeSpent: 45, // 45分鐘
  skillCompetency: [
    {
      skill: 'Prompt Design',
      skillZh: '提示設計',
      level: 25, // 降低技能等級
      category: 'core'
    },
    {
      skill: 'Creative Writing',
      skillZh: '創意寫作',
      level: 35,
      category: 'application'
    },
    {
      skill: 'Problem Solving',
      skillZh: '問題解決',
      level: 20,
      category: 'thinking'
    },
    {
      skill: 'Code Generation',
      skillZh: '代碼生成',
      level: 25,
      category: 'technical'
    },
    {
      skill: 'Few-shot Learning',
      skillZh: '少樣本學習',
      level: 52,
      category: 'advanced'
    },
    {
      skill: 'Role-playing',
      skillZh: '角色扮演',
      level: 68,
      category: 'advanced'
    }
  ],
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      titleZh: '第一步',
      description: 'Completed your first lesson',
      descriptionZh: '完成了第一課',
      icon: '🎯',
      unlockedAt: new Date('2024-01-18'),
      type: 'progress',
      rarity: 'common'
    },
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      titleZh: '快速學習者',
      description: 'Completed 3 lessons in one day',
      descriptionZh: '一天內完成了 3 課',
      icon: '⚡',
      unlockedAt: new Date('2024-01-19'),
      type: 'streak',
      rarity: 'rare'
    },
    {
      id: 'creative-prompts',
      title: 'Creative Genius',
      titleZh: '創意天才',
      description: 'Created 10 creative prompts',
      descriptionZh: '創建了 10 個創意提示',
      icon: '🎨',
      unlockedAt: new Date('2024-01-20'),
      type: 'skill',
      rarity: 'epic'
    }
  ],
  dailyStreak: 7,
  lastLoginDate: new Date('2024-01-20')
};

// 社群數據
export interface CommunityData {
  hotTopics: CommunityTopic[];
  popularWorks: StudentWork[];
  onlineUsers: number;
}

export interface CommunityTopic {
  id: string;
  title: string;
  titleZh: string;
  replies: number;
  category: string;
  trending: boolean;
}

export interface StudentWork {
  id: string;
  title: string;
  titleZh: string;
  author: string;
  likes: number;
  category: string;
}

export const sampleCommunityData: CommunityData = {
  hotTopics: [
    {
      id: 'topic-1',
      title: 'Best prompts for creative writing',
      titleZh: '創意寫作最佳提示',
      replies: 23,
      category: 'creative',
      trending: true
    },
    {
      id: 'topic-2', 
      title: 'How to debug failed prompts?',
      titleZh: '如何調試失敗的提示？',
      replies: 18,
      category: 'troubleshooting',
      trending: true
    },
    {
      id: 'topic-3',
      title: 'Role-playing prompts that work',
      titleZh: '有效的角色扮演提示',
      replies: 15,
      category: 'advanced',
      trending: false
    }
  ],
  popularWorks: [
    {
      id: 'work-1',
      title: 'AI-Generated Poetry Collection',
      titleZh: 'AI 生成詩歌集',
      author: 'CreativeStudent',
      likes: 45,
      category: 'creative'
    },
    {
      id: 'work-2',
      title: 'Prompt Engineering Cheat Sheet',
      titleZh: '提示工程備忘單',
      author: 'TechLearner',
      likes: 67,
      category: 'educational'
    },
    {
      id: 'work-3',
      title: 'Chain-of-Thought Examples',
      titleZh: '思維鏈範例集',
      author: 'LogicMaster',
      likes: 52,
      category: 'advanced'
    }
  ],
  onlineUsers: 124
};

export default promptEngineeringCourseData; 