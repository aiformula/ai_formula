// 完整??Prompt Engineering 課�??��?結�?
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

// 完整?�課程數??
export const promptEngineeringCourseData: PromptEngineeringCourse = {
  id: 'prompt-engineering-mastery',
  title: 'AI Magic Language: Prompt Engineering Course',
  titleZh: 'AI ?��?法�?言：Prompt Engineering 課�?',
  description: 'Learn the magic language of AI through fun and practical prompt engineering',
  descriptionZh: '?��?�?��且實?��??�示工�?，學�?AI ?��?法�?言',
  instructor: 'AI Formula Team',
  instructorZh: 'AI Formula ?��?',
  duration: '4.5 hours',
  durationZh: '4.5小�?',
  level: 'Beginner to Advanced',
  levelZh: '?��??��?�?,
  language: 'English/Chinese',
  languageZh: '?��?/中�?',
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
      titleZh: 'AI ?��??�話 - ?�探 AI ?��?法�?言',
      description: 'This section introduces you to what "prompts" are and why learning to chat with AI is so important!',
      descriptionZh: '?�個部?��?帶�?認�?什麼是?��?示�?Prompt）」�?以�??��?麼學?��? AI ?�天?�麼?��?�?,
      estimatedTime: '50 minutes',
      estimatedTimeZh: '50?��?',
      difficulty: 'beginner',
      prerequisites: [],
      learningOutcomes: [
        'Understand what AI prompts are',
        'Learn why effective prompting is crucial',
        'Recognize different AI personalities and characteristics'
      ],
      learningOutcomesZh: [
        '?�解什麼是 AI ?�示',
        '學�??��?麼�??��?示至?��?�?,
        '認�?不�? AI ?�個性�??��?'
      ],
      lessons: [
        {
          id: 'l1-1',
          title: 'Hello, AI! What is a "Prompt"?',
          titleZh: '你好，AI！�?麼是?��?�?(Prompt)?��?',
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15?��?',
          completed: false,
          contentUrl: '/content/lesson1-1.md',
          description: 'Think of AI as a super-smart all-purpose robot. What you say to it is a "prompt". It\'s as simple as pressing a remote control button (prompt) to make the TV change channels (AI\'s response)!',
          descriptionZh: '??AI ?��??��??��?級聰?��??�能機器人。�?跟�?說�?話�?就是?��?示」。就?��??��??�控?��??��??�示）�??��?就�?轉台（AI ?��??��?一�?��?��?',
          learningObjectives: [
            'Define what a prompt is in simple terms',
            'Understand the relationship between prompts and AI responses',
            'Learn basic prompt-response examples'
          ],
          learningObjectivesZh: [
            '?�簡?��?語�?定義什麼是?�示',
            '?�解?�示??AI ?��?之�??��?�?,
            '學�??�本?��?�??��?範�?'
          ],
          tags: ['introduction', 'basics', 'prompt-definition'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Clear understanding of what prompts are and how they work',
          expectedOutputZh: '清�??�解什麼是?�示以�?它們�?何工�?,
          resources: [
            {
              id: 'res-1-1-1',
              name: 'Prompt Basics Guide',
              nameZh: '?�示?��??��?',
              type: 'pdf',
              url: '/resources/prompt-basics.pdf',
              size: '800KB',
              description: 'A beginner-friendly guide to understanding prompts',
              descriptionZh: '?�學?��?好�??�示?�解?��?',
              downloadCount: 234,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-1-1',
              timestamp: '00:05:30',
              content: 'A prompt is like a conversation starter with AI',
              contentZh: '?�示就�??��? AI ?��?話�??�白',
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
          titleZh: '?��?麼�?學好?�示？�??�聽得�??�到?��??��???,
          lessonType: 'interactive-text',
          duration: '20 minutes',
          durationZh: '20?��?',
          completed: false,
          contentUrl: '/content/lesson1-2.md',
          description: 'Good prompts are like giving clear instructions to a super-smart assistant. The clearer your instructions, the better the results!',
          descriptionZh: '好�??�示就�??�給超�??��??�助?��?楚�??�令?��??��?令�?清�?，�??�就越好�?,
          learningObjectives: [
            'Understand the importance of clear communication with AI',
            'Learn how prompt quality affects AI responses',
            'Recognize the difference between good and bad prompts'
          ],
          learningObjectivesZh: [
            '?�解??AI 清�?溝通�??��???,
            '學�??�示?�質如�?影響 AI ?��?',
            '認�?好�?示�?壞�?示�??�??
          ],
          tags: ['importance', 'communication', 'quality'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Understanding of why prompt quality matters',
          expectedOutputZh: '?�解?��?麼�?示�?質�??��?',
          resources: [
            {
              id: 'res-1-2-1',
              name: 'Good vs Bad Prompts Examples',
              nameZh: '好�?示vs壞�?示�?�?,
              type: 'pdf',
              url: '/resources/prompt-examples.pdf',
              size: '1.2MB',
              description: 'Collection of prompt examples showing what works and what doesn\'t',
              descriptionZh: '?�示範�??��?，�?示�?麼�??��?什麼無??,
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-2-1',
              timestamp: '00:10:15',
              content: 'Clear prompts = Clear results',
              contentZh: '清晰?��?�?= 清晰?��???,
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
          titleZh: '認�?你�? AI 小夥伴�?不�? AI ?��??��?,
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15?��?',
          completed: false,
          contentUrl: '/content/lesson1-3.md',
          description: 'Simple introduction to different common AIs, like ChatGPT for chatting and Midjourney for drawing. Learn that talking to different AIs might require slightly different approaches!',
          descriptionZh: '簡單介紹幾種常�???AI，�??��??�天??ChatGPT?��??��???Midjourney?��?你知?��?跟�???AI 說話，方式可?��?稍微不�?�??�?,
          learningObjectives: [
            'Identify different types of AI tools',
            'Understand that different AIs have different strengths',
            'Learn basic characteristics of popular AI platforms'
          ],
          learningObjectivesZh: [
            '識別不�?類�???AI 工具',
            '?�解不�???AI ?��??��??�勢',
            '學�?流�? AI 平台?�基?�特�?
          ],
          tags: ['ai-types', 'chatgpt', 'midjourney', 'platforms'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Familiarity with different AI platforms and their uses',
          expectedOutputZh: '?��?不�? AI 平台?�其?��?,
          resources: [
            {
              id: 'res-1-3-1',
              name: 'AI Platforms Comparison',
              nameZh: 'AI 平台比�?',
              type: 'pdf',
              url: '/resources/ai-platforms.pdf',
              size: '1.5MB',
              description: 'Overview of popular AI platforms and their specialties',
              descriptionZh: '流�? AI 平台?�其專長概述',
              downloadCount: 567,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-3-1',
              timestamp: '00:08:00',
              content: 'Each AI has its own personality and strengths',
              contentZh: '每�?AI ?��??�己?�個性�??�勢',
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
              questionZh: '你�? AI 說�?話�?被稱?��?麼�?',
              options: ['Spell', 'Prompt', 'Secret Code'],
              optionsZh: ['?��?', '?�示 (Prompt)', '?��?'],
              correctAnswer: 'Prompt',
              explanation: 'The words we use to communicate with AI are called "prompts".',
              explanationZh: '?�們用來�? AI 溝通�?話�?稱為?��?示」�?,
              difficulty: 'easy',
              points: 10,
              aiGeneratedFeedback: 'Correct! Prompts are the foundation of AI communication.',
              videoTimestamp: '00:12:30'
            },
            {
              id: 'q1-quiz-2',
              type: 'multiple-choice',
              question: 'Why is learning good prompts important?',
              questionZh: '?��?麼學好�?示�??��?�?,
              options: ['So AI will like me', 'To make AI do what I want more accurately', 'It looks cool'],
              optionsZh: ['?�樣 AI ?��??�歡??, '?��?�?AI ?��?確地完�??�想?��?�?, '?�樣?�起來�???],
              correctAnswer: 'To make AI do what I want more accurately',
              explanation: 'Good prompts help AI understand exactly what you want, leading to better results.',
              explanationZh: '好�??�示幫助 AI 準確?�解你想要�?麼�?從而產?�更好�?結�???,
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
      titleZh: '?�話說�?楚�?魔�? - ?��??�示?��?,
      description: 'Here you\'ll learn the most basic and important "talking" skills to transform AI from "understands" to "totally gets you".',
      descriptionZh: '?�裡?��?你幾?��??�本?��??�?��??�「說話」�?巧�?�?AI 從「聽得�??��??�「�??��??��?,
      estimatedTime: '80 minutes',
      estimatedTimeZh: '80?��?',
      difficulty: 'beginner',
      prerequisites: ['module-1'],
      learningOutcomes: [
        'Master the technique of being specific and clear',
        'Learn to provide context and background information',
        'Understand how to teach AI through examples'
      ],
      learningOutcomesZh: [
        '?�握?��??�確?��?�?,
        '學�??��??�景?��?下�?資�?',
        '?�解如�??��?範�??��? AI'
      ],
      lessons: [
        {
          id: 'l2-1',
          title: 'Technique 1: Be Specific - Don\'t Say "Whatever", Tell It What You Want!',
          titleZh: '?�巧�??��?確具體】�??�說?�隨便」�??�訴它�?要�?麼�?',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?��?',
          completed: false,
          contentUrl: '/content/lesson2-1.md',
          description: '??Bad example: "Draw me a dog." -> AI doesn\'t know what kind of dog. ??Good example: "Draw me a golden retriever with a red collar chasing a ball."',
          descriptionZh: '??壞�?子�??�幫?�畫一?��??��?-> AI 不知?��??��?麼�??��? 好�?子�??�幫?�畫一?�戴?��??��??��??�正?�追?��??��??�獵?�。�?,
          learningObjectives: [
            'Understand the importance of specificity in prompts',
            'Learn to replace vague terms with concrete descriptions',
            'Practice creating detailed, specific prompts'
          ],
          learningObjectivesZh: [
            '?�解?�示中具體性�??��???,
            '學�??�具體�?述替?�模糊�?�?,
            '練�??�建詳細?�具體�??�示'
          ],
          tags: ['specificity', 'clarity', 'examples'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to write specific and detailed prompts',
          expectedOutputZh: '?��?寫出?��?詳細?��?�?,
          resources: [
            {
              id: 'res-2-1-1',
              name: 'Specificity Checklist',
              nameZh: '?��??�檢?��???,
              type: 'pdf',
              url: '/resources/specificity-checklist.pdf',
              size: '600KB',
              description: 'A handy checklist to make your prompts more specific',
              descriptionZh: '讓�??��?示更?��??�實?�檢?��???,
              downloadCount: 378,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-1-1',
              timestamp: '00:12:00',
              content: 'Specific prompts lead to specific results',
              contentZh: '?��??��?示產?�具體�?結�?',
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
          titleZh: '?�巧�??��?供�??�】�??�訴 AI ?��??��??��???,
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30?��?',
          completed: false,
          contentUrl: '/content/lesson2-2.md',
          description: 'If you want AI to help you write a letter, first tell it: "This letter is for my teacher, the purpose is to ask for leave because I have a cold." The more information you give, the better AI writes.',
          descriptionZh: '如�?你�?�?AI 幫�?寫信，�??��?訴�?：「這�?信是要寫給老師?��??��??��?請�?，�??��??��?了。」給?��?訊�?多�?AI 寫�?越好??,
          learningObjectives: [
            'Learn the importance of context in prompt design',
            'Understand how background information improves AI responses',
            'Practice providing comprehensive context in prompts'
          ],
          learningObjectivesZh: [
            '學�?上�??�在?�示設�?中�??��???,
            '?�解?�景資�?如�??��? AI ?��?',
            '練�??��?示中?��??�面?��?下�?'
          ],
          tags: ['context', 'background', 'information'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to provide rich context in prompts',
          expectedOutputZh: '?��??��?示中?��?豐�??��??��?�?,
          resources: [
            {
              id: 'res-2-2-1',
              name: 'Context Template Examples',
              nameZh: '?�景模板範�?',
              type: 'template',
              url: '/resources/context-templates.txt',
              size: '900KB',
              description: 'Ready-to-use templates for providing context',
              descriptionZh: '?��??�景資�??�現?�模??,
              downloadCount: 523,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-2-1',
              timestamp: '00:15:30',
              content: 'Context is like giving AI the full picture',
              contentZh: '?�景就�?�?AI 展示完整?��???,
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
          titleZh: '?�巧�??�給?��?例】�???AI ?��??�師',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?��?',
          completed: false,
          contentUrl: '/content/lesson2-3.md',
          description: 'You can demonstrate to AI first. For example: "Please help me make sentences more lively. Example: \'The weather is nice today\' -> \'Wow! The sun is shining so brightly today!\' Now please help me rewrite: \'This book is interesting\'"',
          descriptionZh: '你可以�?示�?一次給 AI ?�。�?如�??��?幫�??�句子�?活�??��?例�??��?天天�??好�?>?��?！�?天太?�公?��?得好?��?！』。現?��?幫�??�寫：『這本?��??�趣?��?,
          learningObjectives: [
            'Learn to use examples to guide AI behavior',
            'Understand the power of demonstration in prompts',
            'Practice creating effective example-based prompts'
          ],
          learningObjectivesZh: [
            '學�?使用範�?來�?�?AI 行為',
            '?�解示�??��?示中?��???,
            '練�??�建?��??�基?��?例�??�示'
          ],
          tags: ['examples', 'demonstration', 'teaching'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to use examples effectively in prompts',
          expectedOutputZh: '?��??��?示中?��?使用範�?',
          resources: [
            {
              id: 'res-2-3-1',
              name: 'Example-Based Prompt Library',
              nameZh: '?�於範�??��?示庫',
              type: 'code',
              url: '/resources/example-prompts.txt',
              size: '1.1MB',
              description: 'Collection of prompts that use examples effectively',
              descriptionZh: '?��?使用範�??��?示�???,
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-3-1',
              timestamp: '00:18:45',
              content: 'Examples are like showing, not just telling',
              contentZh: '範�?就�?展示，而�??��??��?�?,
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
              questionZh: '下面?�個�?示寫得�?好�?',
              options: ['Write a poem', 'Write a five-line short poem about summer, ocean, and ice cream', 'Write something random'],
              optionsZh: ['寫�?首詩', '寫�?首�??��?天、海洋�??��?淋�?五�??�詩', '?�便寫�??�西'],
              correctAnswer: 'Write a five-line short poem about summer, ocean, and ice cream',
              explanation: 'This prompt is specific, provides clear requirements, and gives a focused topic.',
              explanationZh: '?�個�?示�??��?，�?供�??�確?��?求�?並給?��??�中?�主題�?,
              difficulty: 'easy',
              points: 15,
              aiGeneratedFeedback: 'Excellent! You recognize the value of specificity.',
              videoTimestamp: '00:20:00'
            },
            {
              id: 'q2-quiz-2',
              type: 'multiple-choice',
              question: 'When you want AI to imitate a certain style, what\'s the best technique?',
              questionZh: '?��?希�? AI 模仿?�種風格?��??�好用?��?巧是�?,
              options: ['Scold it', 'Give it an example', 'Turn it off and on again'],
              optionsZh: ['罵�?', '給�?一?��?�?, '?��??��?'],
              correctAnswer: 'Give it an example',
              explanation: 'Examples are the most effective way to show AI the style or format you want.',
              explanationZh: '範�??��? AI 展示你想要�?風格?�格式�??�?��??��???,
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
      titleZh: '?�放 AI ?�全?��???- ?��??�示?��?,
      description: 'Learn more advanced techniques to become an AI command master. You can make AI play specific roles and complete complex tasks step by step like peeling an onion.',
      descriptionZh: '學�??�厲害�??�巧�?你可以�? AI ?��??��?角色，�??��??��??��?�??一步�?步�??��??��?任�???,
      estimatedTime: '90 minutes',
      estimatedTimeZh: '90?��?',
      difficulty: 'intermediate',
      prerequisites: ['module-1', 'module-2'],
      learningOutcomes: [
        'Master role-playing techniques with AI',
        'Learn chain-of-thought prompting for complex problems',
        'Understand iterative improvement of AI responses'
      ],
      learningOutcomesZh: [
        '?�握??AI ?��??�扮演�?�?,
        '學�?複�??��??�思維?��?�?,
        '?�解 AI ?��??�迭�?��??
      ],
      lessons: [
        {
          id: 'l3-1',
          title: 'Technique 4: Role-Playing - Ask AI to Transform!',
          titleZh: '?�巧�??��??�扮演】�?�?AI 變身�?,
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30?��?',
          completed: false,
          contentUrl: '/content/lesson3-1.md',
          description: 'Make AI pretend to be a specific character. For example: "You are now an experienced astronaut, please describe from your perspective how it feels to see Earth for the first time."',
          descriptionZh: '�?AI ?��??��??��??�。�?如�??��??�在?��?位�?驗�?富�?太空人�?請用你�?角度，�?述第一次�??�地?��??�覺?��?,
          learningObjectives: [
            'Learn to assign roles and personas to AI',
            'Understand how role-playing improves response quality',
            'Practice creating effective role-based prompts'
          ],
          learningObjectivesZh: [
            '學�???AI ?��?角色?�人??,
            '?�解角色?��?如�??��??��?質�?',
            '練�??�建?��??�基?��??��??�示'
          ],
          tags: ['role-playing', 'personas', 'characters'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to create compelling role-based prompts',
          expectedOutputZh: '?��??�建引人注目?�基?��??��??�示',
          resources: [
            {
              id: 'res-3-1-1',
              name: 'Role-Playing Prompt Templates',
              nameZh: '角色?��??�示模板',
              type: 'template',
              url: '/resources/role-playing-templates.txt',
              size: '1.3MB',
              description: 'Ready-to-use templates for different role-playing scenarios',
              descriptionZh: '不�?角色?��??�景?�現?�模??,
              downloadCount: 612,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-1-1',
              timestamp: '00:14:30',
              content: 'Roles give AI a specific perspective and expertise',
              contentZh: '角色�?AI ?��??��?角�?專業?��?',
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
          titleZh: '?�巧�??�思維??(Chain of Thought)?��?�?AI 一步�?步想',
          lessonType: 'interactive-text',
          duration: '35 minutes',
          durationZh: '35?��?',
          completed: false,
          contentUrl: '/content/lesson3-2.md',
          description: 'When problems are complex, you can ask AI to "think first, then answer". For example: "Please calculate step by step: there are 5 apples in a basket, I put in 3 more, then ate 2, how many are left?"',
          descriptionZh: '?��?題�?複�??��??�以�?AI?��??�考�??��?答」。�?如�??��?一步�?步�?算�?一?��?子裡??5 顆�??��??��??��?3 顆�?後�??��? 2 顆�??�後剩下幾顆�???,
          learningObjectives: [
            'Understand the chain-of-thought methodology',
            'Learn to break complex problems into steps',
            'Practice creating step-by-step reasoning prompts'
          ],
          learningObjectivesZh: [
            '?�解?�維?�方法�?',
            '學�?將�??��?題�?�?��步�?',
            '練�??�建?�步?��??�示'
          ],
          tags: ['chain-of-thought', 'reasoning', 'step-by-step'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to guide AI through logical reasoning processes',
          expectedOutputZh: '?��?引�? AI ?��??�輯?��??��?',
          resources: [
            {
              id: 'res-3-2-1',
              name: 'Chain of Thought Examples',
              nameZh: '?�維?��?�?,
              type: 'code',
              url: '/resources/chain-of-thought-examples.txt',
              size: '1.8MB',
              description: 'Examples of effective chain-of-thought prompts',
              descriptionZh: '?��??�維?��?示�?範�?',
              downloadCount: 789,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-2-1',
              timestamp: '00:20:00',
              content: 'Breaking down complex problems leads to better accuracy',
              contentZh: '?�解複�??��??�帶來更好�?準確??,
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
          titleZh: '?�巧六?��??�修�?���?第�?次�?好�?沒�?係�??��?一次�?',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?��?',
          completed: false,
          contentUrl: '/content/lesson3-3.md',
          description: 'Not satisfied with AI\'s answer? Don\'t give up! You can give new instructions based on its response to modify it. For example: "I think the story you just wrote is too sad, can you help me rewrite it with a happy ending?"',
          descriptionZh: 'AI ?��?答�?滿�?？別?��?！可以�?對�??��?答�?下新?��?令�?修改?��?如�??��?覺�??��??��?事太?�傷了�??�以幫�??�寫?��??�快樂�?結�??��???,
          learningObjectives: [
            'Learn iterative improvement techniques',
            'Understand how to refine AI responses',
            'Practice giving feedback and correction prompts'
          ],
          learningObjectivesZh: [
            '學�?迭代?�進�?�?,
            '?�解如�?完�? AI ?��?',
            '練�?給出?��??�修�??�?
          ],
          tags: ['refinement', 'iteration', 'feedback'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to iteratively improve AI responses',
          expectedOutputZh: '?��?迭代?��?AI ?��?',
          resources: [
            {
              id: 'res-3-3-1',
              name: 'Refinement Strategies Guide',
              nameZh: '修正策略?��?',
              type: 'pdf',
              url: '/resources/refinement-strategies.pdf',
              size: '1.0MB',
              description: 'Strategies for improving AI responses through iteration',
              descriptionZh: '?��?迭代?��?AI ?��??��???,
              downloadCount: 456,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-3-1',
              timestamp: '00:16:30',
              content: 'Iteration is key to getting exactly what you want',
              contentZh: '迭代?�獲得�??��??�確?��??��??�鍵',
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
              questionZh: '?��??�在?��?位�?食�?論家，�?幫�?評�??�家餐廳?�」這個�?示用了�?麼�?巧�?',
              options: ['Role-playing', 'Give an example', 'Be specific'],
              optionsZh: ['角色?��?', '給個�?�?, '?�確?��?'],
              correctAnswer: 'Role-playing',
              explanation: 'This prompt assigns a specific role (food critic) to the AI, which is role-playing.',
              explanationZh: '?�個�?示為 AI ?��?了特定�??��?美�?評�?家�?，這是角色?��???,
              difficulty: 'medium',
              points: 20,
              aiGeneratedFeedback: 'Correct! Role-playing helps AI adopt specific expertise.',
              videoTimestamp: '00:25:00'
            },
            {
              id: 'q3-quiz-2',
              type: 'multiple-choice',
              question: 'If AI gives an answer that\'s not good enough, what should you do?',
              questionZh: '如�? AI 給�?答�?不�?好�?你該?�麼辦�?',
              options: ['Get angry and shut down the computer', 'Believe this is the best answer', 'Give new instructions to ask it to modify the bad parts'],
              optionsZh: ['?�氣?��??�電??, '?�信?�就?��?好�?答�?�?, '?��?不好?�地?��?下新?��?令�?它修??],
              correctAnswer: 'Give new instructions to ask it to modify the bad parts',
              explanation: 'Iterative refinement is a key skill in prompt engineering - you can always improve the response.',
              explanationZh: '迭代?�進是?�示工�??��??��???- 你總?�可以改?��??��?,
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

// ?�戶?�度追蹤?��?
export interface UserProgress {
  studentName: string;
  completedLessons: string[];
  lastViewedLesson?: string;
  totalTimeSpent: number; // ?��?
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
  studentName: 'AI學�???,
  completedLessons: ['l1-1'], // ?��??�第一�?
  lastViewedLesson: 'l1-2', // ?�在?��?第�?�?
  totalTimeSpent: 45, // 45?��?
  skillCompetency: [
    {
      skill: 'Prompt Design',
      skillZh: '?�示設�?',
      level: 25, // ?��??�?��?�?
      category: 'core'
    },
    {
      skill: 'Creative Writing',
      skillZh: '?��?寫�?',
      level: 35,
      category: 'application'
    },
    {
      skill: 'Problem Solving',
      skillZh: '?��?�?��',
      level: 20,
      category: 'thinking'
    },
    {
      skill: 'Code Generation',
      skillZh: '�?��?��?',
      level: 25,
      category: 'technical'
    },
    {
      skill: 'Few-shot Learning',
      skillZh: '少樣?�學�?,
      level: 52,
      category: 'advanced'
    },
    {
      skill: 'Role-playing',
      skillZh: '角色?��?',
      level: 68,
      category: 'advanced'
    }
  ],
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      titleZh: '第�?�?,
      description: 'Completed your first lesson',
      descriptionZh: '完�?了第一�?,
      icon: '?��',
      unlockedAt: new Date('2024-01-18'),
      type: 'progress',
      rarity: 'common'
    },
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      titleZh: '快速學習�?,
      description: 'Completed 3 lessons in one day',
      descriptionZh: '一天內完�?�?3 �?,
      icon: '??,
      unlockedAt: new Date('2024-01-19'),
      type: 'streak',
      rarity: 'rare'
    },
    {
      id: 'creative-prompts',
      title: 'Creative Genius',
      titleZh: '?��?天�?',
      description: 'Created 10 creative prompts',
      descriptionZh: '?�建�?10 ?�創?��?�?,
      icon: '?��',
      unlockedAt: new Date('2024-01-20'),
      type: 'skill',
      rarity: 'epic'
    }
  ],
  dailyStreak: 7,
  lastLoginDate: new Date('2024-01-20')
};

// 社群?��?
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
      titleZh: '?��?寫�??�佳�?�?,
      replies: 23,
      category: 'creative',
      trending: true
    },
    {
      id: 'topic-2', 
      title: 'How to debug failed prompts?',
      titleZh: '如�?調試失�??��?示�?',
      replies: 18,
      category: 'troubleshooting',
      trending: true
    },
    {
      id: 'topic-3',
      title: 'Role-playing prompts that work',
      titleZh: '?��??��??�扮演�?�?,
      replies: 15,
      category: 'advanced',
      trending: false
    }
  ],
  popularWorks: [
    {
      id: 'work-1',
      title: 'AI-Generated Poetry Collection',
      titleZh: 'AI ?��?詩�???,
      author: 'CreativeStudent',
      likes: 45,
      category: 'creative'
    },
    {
      id: 'work-2',
      title: 'Prompt Engineering Cheat Sheet',
      titleZh: '?�示工�??��???,
      author: 'TechLearner',
      likes: 67,
      category: 'educational'
    },
    {
      id: 'work-3',
      title: 'Chain-of-Thought Examples',
      titleZh: '?�維?��?例�?',
      author: 'LogicMaster',
      likes: 52,
      category: 'advanced'
    }
  ],
  onlineUsers: 124
};

export default promptEngineeringCourseData; 