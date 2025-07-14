// å®Œæ•´??Prompt Engineering èª²ç??¸æ?çµæ?
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

// å®Œæ•´?„èª²ç¨‹æ•¸??
export const promptEngineeringCourseData: PromptEngineeringCourse = {
  id: 'prompt-engineering-mastery',
  title: 'AI Magic Language: Prompt Engineering Course',
  titleZh: 'AI ?„é?æ³•è?è¨€ï¼šPrompt Engineering èª²ç?',
  description: 'Learn the magic language of AI through fun and practical prompt engineering',
  descriptionZh: '?šé?è¶?‘³ä¸”å¯¦?¨ç??ç¤ºå·¥ç?ï¼Œå­¸ç¿?AI ?„é?æ³•è?è¨€',
  instructor: 'AI Formula Team',
  instructorZh: 'AI Formula ?˜é?',
  duration: '4.5 hours',
  durationZh: '4.5å°æ?',
  level: 'Beginner to Advanced',
  levelZh: '?ç??°é?ç´?,
  language: 'English/Chinese',
  languageZh: '?±æ?/ä¸­æ?',
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
      titleZh: 'AI ?„æ??„è©± - ?æ¢ AI ?„é?æ³•è?è¨€',
      description: 'This section introduces you to what "prompts" are and why learning to chat with AI is so important!',
      descriptionZh: '?™å€‹éƒ¨?†æ?å¸¶ä?èªè?ä»€éº¼æ˜¯?Œæ?ç¤ºï?Promptï¼‰ã€ï?ä»¥å??ºä?éº¼å­¸?ƒè? AI ?Šå¤©?™éº¼?è?ï¼?,
      estimatedTime: '50 minutes',
      estimatedTimeZh: '50?†é?',
      difficulty: 'beginner',
      prerequisites: [],
      learningOutcomes: [
        'Understand what AI prompts are',
        'Learn why effective prompting is crucial',
        'Recognize different AI personalities and characteristics'
      ],
      learningOutcomesZh: [
        '?†è§£ä»€éº¼æ˜¯ AI ?ç¤º',
        'å­¸ç??ºä?éº¼æ??ˆæ?ç¤ºè‡³?œé?è¦?,
        'èªè?ä¸å? AI ?„å€‹æ€§å??¹é?'
      ],
      lessons: [
        {
          id: 'l1-1',
          title: 'Hello, AI! What is a "Prompt"?',
          titleZh: 'ä½ å¥½ï¼ŒAIï¼ä?éº¼æ˜¯?Œæ?ç¤?(Prompt)?ï?',
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15?†é?',
          completed: false,
          contentUrl: '/content/lesson1-1.md',
          description: 'Think of AI as a super-smart all-purpose robot. What you say to it is a "prompt". It\'s as simple as pressing a remote control button (prompt) to make the TV change channels (AI\'s response)!',
          descriptionZh: '??AI ?³å??ä??‹è?ç´šè°?ç??¬èƒ½æ©Ÿå™¨äººã€‚ä?è·Ÿä?èªªç?è©±ï?å°±æ˜¯?Œæ?ç¤ºã€ã€‚å°±?ä??‰ä??™æ§?¨æ??•ï??ç¤ºï¼‰ï??»è?å°±æ?è½‰å°ï¼ˆAI ?„å??‰ï?ä¸€æ¨?°¡?®ï?',
          learningObjectives: [
            'Define what a prompt is in simple terms',
            'Understand the relationship between prompts and AI responses',
            'Learn basic prompt-response examples'
          ],
          learningObjectivesZh: [
            '?¨ç°¡?®ç?èªè?å®šç¾©ä»€éº¼æ˜¯?ç¤º',
            '?†è§£?ç¤º??AI ?æ?ä¹‹é??„é?ä¿?,
            'å­¸ç??ºæœ¬?„æ?ç¤??æ?ç¯„ä?'
          ],
          tags: ['introduction', 'basics', 'prompt-definition'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Clear understanding of what prompts are and how they work',
          expectedOutputZh: 'æ¸…æ??†è§£ä»€éº¼æ˜¯?ç¤ºä»¥å?å®ƒå€‘å?ä½•å·¥ä½?,
          resources: [
            {
              id: 'res-1-1-1',
              name: 'Prompt Basics Guide',
              nameZh: '?ç¤º?ºç??‡å?',
              type: 'pdf',
              url: '/resources/prompt-basics.pdf',
              size: '800KB',
              description: 'A beginner-friendly guide to understanding prompts',
              descriptionZh: '?å­¸?…å?å¥½ç??ç¤º?†è§£?‡å?',
              downloadCount: 234,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-1-1',
              timestamp: '00:05:30',
              content: 'A prompt is like a conversation starter with AI',
              contentZh: '?ç¤ºå°±å??¯è? AI ?„å?è©±é??´ç™½',
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
          titleZh: '?ºä?éº¼è?å­¸å¥½?ç¤ºï¼Ÿå??Œè½å¾—æ??åˆ°?Œè??‚ä???,
          lessonType: 'interactive-text',
          duration: '20 minutes',
          durationZh: '20?†é?',
          completed: false,
          contentUrl: '/content/lesson1-2.md',
          description: 'Good prompts are like giving clear instructions to a super-smart assistant. The clearer your instructions, the better the results!',
          descriptionZh: 'å¥½ç??ç¤ºå°±å??¯çµ¦è¶…ç??°æ??„åŠ©?‹æ?æ¥šç??‡ä»¤?‚ä??„æ?ä»¤è?æ¸…æ?ï¼Œç??œå°±è¶Šå¥½ï¼?,
          learningObjectives: [
            'Understand the importance of clear communication with AI',
            'Learn how prompt quality affects AI responses',
            'Recognize the difference between good and bad prompts'
          ],
          learningObjectivesZh: [
            '?†è§£??AI æ¸…æ?æºé€šç??è???,
            'å­¸ç??ç¤º?è³ªå¦‚ä?å½±éŸ¿ AI ?æ?',
            'èªè?å¥½æ?ç¤ºå?å£æ?ç¤ºç??€??
          ],
          tags: ['importance', 'communication', 'quality'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Understanding of why prompt quality matters',
          expectedOutputZh: '?†è§£?ºä?éº¼æ?ç¤ºå?è³ªå??è?',
          resources: [
            {
              id: 'res-1-2-1',
              name: 'Good vs Bad Prompts Examples',
              nameZh: 'å¥½æ?ç¤ºvså£æ?ç¤ºç?ä¾?,
              type: 'pdf',
              url: '/resources/prompt-examples.pdf',
              size: '1.2MB',
              description: 'Collection of prompt examples showing what works and what doesn\'t',
              descriptionZh: '?ç¤ºç¯„ä??†å?ï¼Œå?ç¤ºä?éº¼æ??ˆï?ä»€éº¼ç„¡??,
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-2-1',
              timestamp: '00:10:15',
              content: 'Clear prompts = Clear results',
              contentZh: 'æ¸…æ™°?„æ?ç¤?= æ¸…æ™°?„ç???,
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
          titleZh: 'èªè?ä½ ç? AI å°å¤¥ä¼´ï?ä¸å? AI ?„å??‹æ€?,
          lessonType: 'interactive-text',
          duration: '15 minutes',
          durationZh: '15?†é?',
          completed: false,
          contentUrl: '/content/lesson1-3.md',
          description: 'Simple introduction to different common AIs, like ChatGPT for chatting and Midjourney for drawing. Learn that talking to different AIs might require slightly different approaches!',
          descriptionZh: 'ç°¡å–®ä»‹ç´¹å¹¾ç¨®å¸¸è???AIï¼Œå??¯æ??Šå¤©??ChatGPT?æ??«å???Midjourney?‚è?ä½ çŸ¥?“ï?è·Ÿä???AI èªªè©±ï¼Œæ–¹å¼å¯?½è?ç¨å¾®ä¸ä?æ¨??ï¼?,
          learningObjectives: [
            'Identify different types of AI tools',
            'Understand that different AIs have different strengths',
            'Learn basic characteristics of popular AI platforms'
          ],
          learningObjectivesZh: [
            'è­˜åˆ¥ä¸å?é¡å???AI å·¥å…·',
            '?†è§£ä¸å???AI ?‰ä??Œç??ªå‹¢',
            'å­¸ç?æµè? AI å¹³å°?„åŸº?¬ç‰¹å¾?
          ],
          tags: ['ai-types', 'chatgpt', 'midjourney', 'platforms'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Familiarity with different AI platforms and their uses',
          expectedOutputZh: '?Ÿæ?ä¸å? AI å¹³å°?Šå…¶?¨é€?,
          resources: [
            {
              id: 'res-1-3-1',
              name: 'AI Platforms Comparison',
              nameZh: 'AI å¹³å°æ¯”è?',
              type: 'pdf',
              url: '/resources/ai-platforms.pdf',
              size: '1.5MB',
              description: 'Overview of popular AI platforms and their specialties',
              descriptionZh: 'æµè? AI å¹³å°?Šå…¶å°ˆé•·æ¦‚è¿°',
              downloadCount: 567,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-1-3-1',
              timestamp: '00:08:00',
              content: 'Each AI has its own personality and strengths',
              contentZh: 'æ¯å€?AI ?½æ??ªå·±?„å€‹æ€§å??ªå‹¢',
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
              questionZh: 'ä½ è? AI èªªç?è©±ï?è¢«ç¨±?ºä?éº¼ï?',
              options: ['Spell', 'Prompt', 'Secret Code'],
              optionsZh: ['?’è?', '?ç¤º (Prompt)', '?—è?'],
              correctAnswer: 'Prompt',
              explanation: 'The words we use to communicate with AI are called "prompts".',
              explanationZh: '?‘å€‘ç”¨ä¾†è? AI æºé€šç?è©±è?ç¨±ç‚º?Œæ?ç¤ºã€ã€?,
              difficulty: 'easy',
              points: 10,
              aiGeneratedFeedback: 'Correct! Prompts are the foundation of AI communication.',
              videoTimestamp: '00:12:30'
            },
            {
              id: 'q1-quiz-2',
              type: 'multiple-choice',
              question: 'Why is learning good prompts important?',
              questionZh: '?ºä?éº¼å­¸å¥½æ?ç¤ºå??è?ï¼?,
              options: ['So AI will like me', 'To make AI do what I want more accurately', 'It looks cool'],
              optionsZh: ['?™æ¨£ AI ?æ??œæ­¡??, '?ºä?è®?AI ?´æ?ç¢ºåœ°å®Œæ??‘æƒ³?šç?äº?, '?™æ¨£?‹èµ·ä¾†å???],
              correctAnswer: 'To make AI do what I want more accurately',
              explanation: 'Good prompts help AI understand exactly what you want, leading to better results.',
              explanationZh: 'å¥½ç??ç¤ºå¹«åŠ© AI æº–ç¢º?†è§£ä½ æƒ³è¦ä?éº¼ï?å¾è€Œç”¢?Ÿæ›´å¥½ç?çµæ???,
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
      titleZh: '?Šè©±èªªæ?æ¥šç?é­”æ? - ?ºç??ç¤º?€å·?,
      description: 'Here you\'ll learn the most basic and important "talking" skills to transform AI from "understands" to "totally gets you".',
      descriptionZh: '?™è£¡?ƒæ?ä½ å¹¾?‹æ??ºæœ¬?ä??€?è??„ã€Œèªªè©±ã€æ?å·§ï?è®?AI å¾ã€Œè½å¾—æ??è??ã€Œè??‚ä??ã€?,
      estimatedTime: '80 minutes',
      estimatedTimeZh: '80?†é?',
      difficulty: 'beginner',
      prerequisites: ['module-1'],
      learningOutcomes: [
        'Master the technique of being specific and clear',
        'Learn to provide context and background information',
        'Understand how to teach AI through examples'
      ],
      learningOutcomesZh: [
        '?Œæ¡?·é??ç¢º?„æ?å·?,
        'å­¸æ??ä??Œæ™¯?Œä?ä¸‹æ?è³‡è?',
        '?†è§£å¦‚ä??é?ç¯„ä??™å? AI'
      ],
      lessons: [
        {
          id: 'l2-1',
          title: 'Technique 1: Be Specific - Don\'t Say "Whatever", Tell It What You Want!',
          titleZh: '?€å·§ä??æ?ç¢ºå…·é«”ã€‘ï??¥èªª?Œéš¨ä¾¿ã€ï??Šè¨´å®ƒä?è¦ä?éº¼ï?',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?†é?',
          completed: false,
          contentUrl: '/content/lesson2-1.md',
          description: '??Bad example: "Draw me a dog." -> AI doesn\'t know what kind of dog. ??Good example: "Draw me a golden retriever with a red collar chasing a ball."',
          descriptionZh: '??å£ä?å­ï??Œå¹«?‘ç•«ä¸€?»ç??‚ã€?-> AI ä¸çŸ¥?“è??«ä?éº¼ç??‚â? å¥½ä?å­ï??Œå¹«?‘ç•«ä¸€?»æˆ´?—ç??²é??ˆç??æ­£?¨è¿½?®ç??„é??‘çµ?¬ã€‚ã€?,
          learningObjectives: [
            'Understand the importance of specificity in prompts',
            'Learn to replace vague terms with concrete descriptions',
            'Practice creating detailed, specific prompts'
          ],
          learningObjectivesZh: [
            '?†è§£?ç¤ºä¸­å…·é«”æ€§ç??è???,
            'å­¸æ??¨å…·é«”æ?è¿°æ›¿?›æ¨¡ç³Šè?èª?,
            'ç·´ç??µå»ºè©³ç´°?å…·é«”ç??ç¤º'
          ],
          tags: ['specificity', 'clarity', 'examples'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to write specific and detailed prompts',
          expectedOutputZh: '?½å?å¯«å‡º?·é?è©³ç´°?„æ?ç¤?,
          resources: [
            {
              id: 'res-2-1-1',
              name: 'Specificity Checklist',
              nameZh: '?·é??§æª¢?¥æ???,
              type: 'pdf',
              url: '/resources/specificity-checklist.pdf',
              size: '600KB',
              description: 'A handy checklist to make your prompts more specific',
              descriptionZh: 'è®“ä??„æ?ç¤ºæ›´?·é??„å¯¦?¨æª¢?¥æ???,
              downloadCount: 378,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-1-1',
              timestamp: '00:12:00',
              content: 'Specific prompts lead to specific results',
              contentZh: '?·é??„æ?ç¤ºç”¢?Ÿå…·é«”ç?çµæ?',
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
          titleZh: '?€å·§ä??æ?ä¾›è??¯ã€‘ï??Šè¨´ AI ?…ä??„å?? å???,
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30?†é?',
          completed: false,
          contentUrl: '/content/lesson2-2.md',
          description: 'If you want AI to help you write a letter, first tell it: "This letter is for my teacher, the purpose is to ask for leave because I have a cold." The more information you give, the better AI writes.',
          descriptionZh: 'å¦‚æ?ä½ è?è«?AI å¹«ä?å¯«ä¿¡ï¼Œè??ˆå?è¨´å?ï¼šã€Œé€™å?ä¿¡æ˜¯è¦å¯«çµ¦è€å¸«?„ï??®ç??¯è?è«‹å?ï¼Œå??ºæ??Ÿå?äº†ã€‚ã€çµ¦?„è?è¨Šè?å¤šï?AI å¯«å?è¶Šå¥½??,
          learningObjectives: [
            'Learn the importance of context in prompt design',
            'Understand how background information improves AI responses',
            'Practice providing comprehensive context in prompts'
          ],
          learningObjectivesZh: [
            'å­¸ç?ä¸Šä??‡åœ¨?ç¤ºè¨­è?ä¸­ç??è???,
            '?†è§£?Œæ™¯è³‡è?å¦‚ä??¹å? AI ?æ?',
            'ç·´ç??¨æ?ç¤ºä¸­?ä??¨é¢?„ä?ä¸‹æ?'
          ],
          tags: ['context', 'background', 'information'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to provide rich context in prompts',
          expectedOutputZh: '?½å??¨æ?ç¤ºä¸­?ä?è±å??„è??¯è?è¨?,
          resources: [
            {
              id: 'res-2-2-1',
              name: 'Context Template Examples',
              nameZh: '?Œæ™¯æ¨¡æ¿ç¯„ä?',
              type: 'template',
              url: '/resources/context-templates.txt',
              size: '900KB',
              description: 'Ready-to-use templates for providing context',
              descriptionZh: '?ä??Œæ™¯è³‡è??„ç¾?æ¨¡??,
              downloadCount: 523,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-2-1',
              timestamp: '00:15:30',
              content: 'Context is like giving AI the full picture',
              contentZh: '?Œæ™¯å°±å?çµ?AI å±•ç¤ºå®Œæ•´?„å???,
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
          titleZh: '?€å·§ä??çµ¦?‹ç?ä¾‹ã€‘ï???AI ?„å??å¸«',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?†é?',
          completed: false,
          contentUrl: '/content/lesson2-3.md',
          description: 'You can demonstrate to AI first. For example: "Please help me make sentences more lively. Example: \'The weather is nice today\' -> \'Wow! The sun is shining so brightly today!\' Now please help me rewrite: \'This book is interesting\'"',
          descriptionZh: 'ä½ å¯ä»¥å?ç¤ºç?ä¸€æ¬¡çµ¦ AI ?‹ã€‚ä?å¦‚ï??Œè?å¹«æ??Šå¥å­è?æ´»æ??‚ç?ä¾‹ï??ä?å¤©å¤©æ°??å¥½ã€?>?å?ï¼ä?å¤©å¤ª?½å…¬?¬ç?å¾—å¥½?¦ç?ï¼ã€ã€‚ç¾?¨è?å¹«æ??¹å¯«ï¼šã€é€™æœ¬?¸å??‰è¶£?ã€?,
          learningObjectives: [
            'Learn to use examples to guide AI behavior',
            'Understand the power of demonstration in prompts',
            'Practice creating effective example-based prompts'
          ],
          learningObjectivesZh: [
            'å­¸æ?ä½¿ç”¨ç¯„ä?ä¾†å?å°?AI è¡Œç‚º',
            '?†è§£ç¤ºç??¨æ?ç¤ºä¸­?„å???,
            'ç·´ç??µå»º?‰æ??„åŸº?¼ç?ä¾‹ç??ç¤º'
          ],
          tags: ['examples', 'demonstration', 'teaching'],
          difficulty: 'beginner',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to use examples effectively in prompts',
          expectedOutputZh: '?½å??¨æ?ç¤ºä¸­?‰æ?ä½¿ç”¨ç¯„ä?',
          resources: [
            {
              id: 'res-2-3-1',
              name: 'Example-Based Prompt Library',
              nameZh: '?ºæ–¼ç¯„ä??„æ?ç¤ºåº«',
              type: 'code',
              url: '/resources/example-prompts.txt',
              size: '1.1MB',
              description: 'Collection of prompts that use examples effectively',
              descriptionZh: '?‰æ?ä½¿ç”¨ç¯„ä??„æ?ç¤ºé???,
              downloadCount: 445,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-2-3-1',
              timestamp: '00:18:45',
              content: 'Examples are like showing, not just telling',
              contentZh: 'ç¯„ä?å°±å?å±•ç¤ºï¼Œè€Œä??…å??¯å?è¨?,
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
              questionZh: 'ä¸‹é¢?ªå€‹æ?ç¤ºå¯«å¾—æ?å¥½ï?',
              options: ['Write a poem', 'Write a five-line short poem about summer, ocean, and ice cream', 'Write something random'],
              optionsZh: ['å¯«ä?é¦–è©©', 'å¯«ä?é¦–é??¼å?å¤©ã€æµ·æ´‹å??°æ?æ·‹ç?äº”è??­è©©', '?¨ä¾¿å¯«é??±è¥¿'],
              correctAnswer: 'Write a five-line short poem about summer, ocean, and ice cream',
              explanation: 'This prompt is specific, provides clear requirements, and gives a focused topic.',
              explanationZh: '?™å€‹æ?ç¤ºå??·é?ï¼Œæ?ä¾›ä??ç¢º?„è?æ±‚ï?ä¸¦çµ¦?ºä??†ä¸­?„ä¸»é¡Œã€?,
              difficulty: 'easy',
              points: 15,
              aiGeneratedFeedback: 'Excellent! You recognize the value of specificity.',
              videoTimestamp: '00:20:00'
            },
            {
              id: 'q2-quiz-2',
              type: 'multiple-choice',
              question: 'When you want AI to imitate a certain style, what\'s the best technique?',
              questionZh: '?¶ä?å¸Œæ? AI æ¨¡ä»¿?ç¨®é¢¨æ ¼?‚ï??€å¥½ç”¨?„æ?å·§æ˜¯ï¼?,
              options: ['Scold it', 'Give it an example', 'Turn it off and on again'],
              optionsZh: ['ç½µå?', 'çµ¦å?ä¸€?‹ç?ä¾?, '?œæ??é?'],
              correctAnswer: 'Give it an example',
              explanation: 'Examples are the most effective way to show AI the style or format you want.',
              explanationZh: 'ç¯„ä??¯å? AI å±•ç¤ºä½ æƒ³è¦ç?é¢¨æ ¼?–æ ¼å¼ç??€?‰æ??¹å???,
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
      titleZh: '?‹æ”¾ AI ?„å…¨?¨æ???- ?²é??ç¤º?€å·?,
      description: 'Learn more advanced techniques to become an AI command master. You can make AI play specific roles and complete complex tasks step by step like peeling an onion.',
      descriptionZh: 'å­¸æ??´å²å®³ç??€å·§ï?ä½ å¯ä»¥è? AI ?®æ??¹å?è§’è‰²ï¼Œç??³å??æ??¥ä?æ¨??ä¸€æ­¥ä?æ­¥å??è??œç?ä»»å???,
      estimatedTime: '90 minutes',
      estimatedTimeZh: '90?†é?',
      difficulty: 'intermediate',
      prerequisites: ['module-1', 'module-2'],
      learningOutcomes: [
        'Master role-playing techniques with AI',
        'Learn chain-of-thought prompting for complex problems',
        'Understand iterative improvement of AI responses'
      ],
      learningOutcomesZh: [
        '?Œæ¡??AI ?„è??²æ‰®æ¼”æ?å·?,
        'å­¸ç?è¤‡é??é??„æ€ç¶­?ˆæ?ç¤?,
        '?†è§£ AI ?æ??„è¿­ä»?”¹??
      ],
      lessons: [
        {
          id: 'l3-1',
          title: 'Technique 4: Role-Playing - Ask AI to Transform!',
          titleZh: '?€å·§å??è??²æ‰®æ¼”ã€‘ï?è«?AI è®Šèº«ï¼?,
          lessonType: 'interactive-text',
          duration: '30 minutes',
          durationZh: '30?†é?',
          completed: false,
          contentUrl: '/content/lesson3-1.md',
          description: 'Make AI pretend to be a specific character. For example: "You are now an experienced astronaut, please describe from your perspective how it feels to see Earth for the first time."',
          descriptionZh: 'è®?AI ?‡è??æ??‹è??²ã€‚ä?å¦‚ï??Œä??¾åœ¨?¯ä?ä½ç?é©—è?å¯Œç?å¤ªç©ºäººï?è«‹ç”¨ä½ ç?è§’åº¦ï¼Œæ?è¿°ç¬¬ä¸€æ¬¡ç??°åœ°?ƒç??Ÿè¦º?‚ã€?,
          learningObjectives: [
            'Learn to assign roles and personas to AI',
            'Understand how role-playing improves response quality',
            'Practice creating effective role-based prompts'
          ],
          learningObjectivesZh: [
            'å­¸æ???AI ?†é?è§’è‰²?Œäºº??,
            '?†è§£è§’è‰²?®æ?å¦‚ä??å??æ?è³ªé?',
            'ç·´ç??µå»º?‰æ??„åŸº?¼è??²ç??ç¤º'
          ],
          tags: ['role-playing', 'personas', 'characters'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to create compelling role-based prompts',
          expectedOutputZh: '?½å??µå»ºå¼•äººæ³¨ç›®?„åŸº?¼è??²ç??ç¤º',
          resources: [
            {
              id: 'res-3-1-1',
              name: 'Role-Playing Prompt Templates',
              nameZh: 'è§’è‰²?®æ??ç¤ºæ¨¡æ¿',
              type: 'template',
              url: '/resources/role-playing-templates.txt',
              size: '1.3MB',
              description: 'Ready-to-use templates for different role-playing scenarios',
              descriptionZh: 'ä¸å?è§’è‰²?®æ??´æ™¯?„ç¾?æ¨¡??,
              downloadCount: 612,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-1-1',
              timestamp: '00:14:30',
              content: 'Roles give AI a specific perspective and expertise',
              contentZh: 'è§’è‰²çµ?AI ?¹å??„è?è§’å?å°ˆæ¥­?¥è?',
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
          titleZh: '?€å·§ä??æ€ç¶­??(Chain of Thought)?‘ï?è®?AI ä¸€æ­¥ä?æ­¥æƒ³',
          lessonType: 'interactive-text',
          duration: '35 minutes',
          durationZh: '35?†é?',
          completed: false,
          contentUrl: '/content/lesson3-2.md',
          description: 'When problems are complex, you can ask AI to "think first, then answer". For example: "Please calculate step by step: there are 5 apples in a basket, I put in 3 more, then ate 2, how many are left?"',
          descriptionZh: '?¶å?é¡Œå?è¤‡é??‚ï??¯ä»¥è«?AI?Œå??è€ƒï??å?ç­”ã€ã€‚ä?å¦‚ï??Œè?ä¸€æ­¥ä?æ­¥è?ç®—ï?ä¸€?‹ç?å­è£¡??5 é¡†è??œï??‘å??¾é€?3 é¡†ï?å¾Œä??ƒæ? 2 é¡†ï??€å¾Œå‰©ä¸‹å¹¾é¡†ï???,
          learningObjectives: [
            'Understand the chain-of-thought methodology',
            'Learn to break complex problems into steps',
            'Practice creating step-by-step reasoning prompts'
          ],
          learningObjectivesZh: [
            '?†è§£?ç¶­?ˆæ–¹æ³•è?',
            'å­¸æ?å°‡è??œå?é¡Œå?è§?‚ºæ­¥é?',
            'ç·´ç??µå»º?æ­¥?¨ç??ç¤º'
          ],
          tags: ['chain-of-thought', 'reasoning', 'step-by-step'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to guide AI through logical reasoning processes',
          expectedOutputZh: '?½å?å¼•å? AI ?²è??è¼¯?¨ç??ç?',
          resources: [
            {
              id: 'res-3-2-1',
              name: 'Chain of Thought Examples',
              nameZh: '?ç¶­?ˆç?ä¾?,
              type: 'code',
              url: '/resources/chain-of-thought-examples.txt',
              size: '1.8MB',
              description: 'Examples of effective chain-of-thought prompts',
              descriptionZh: '?‰æ??ç¶­?ˆæ?ç¤ºç?ç¯„ä?',
              downloadCount: 789,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-2-1',
              timestamp: '00:20:00',
              content: 'Breaking down complex problems leads to better accuracy',
              contentZh: '?†è§£è¤‡é??é??½å¸¶ä¾†æ›´å¥½ç?æº–ç¢º??,
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
          titleZh: '?€å·§å…­?ä??·ä¿®æ­?€‘ï?ç¬¬ä?æ¬¡ä?å¥½ï?æ²’é?ä¿‚ï??ä?ä¸€æ¬¡ï?',
          lessonType: 'interactive-text',
          duration: '25 minutes',
          durationZh: '25?†é?',
          completed: false,
          contentUrl: '/content/lesson3-3.md',
          description: 'Not satisfied with AI\'s answer? Don\'t give up! You can give new instructions based on its response to modify it. For example: "I think the story you just wrote is too sad, can you help me rewrite it with a happy ending?"',
          descriptionZh: 'AI ?„å?ç­”ä?æ»¿æ?ï¼Ÿåˆ¥?¾æ?ï¼å¯ä»¥é?å°å??„å?ç­”ï?ä¸‹æ–°?„æ?ä»¤ä?ä¿®æ”¹?‚ä?å¦‚ï??Œæ?è¦ºå??›å??„æ?äº‹å¤ª?²å‚·äº†ï??¯ä»¥å¹«æ??¹å¯«?ä??‹å¿«æ¨‚ç?çµå??ï???,
          learningObjectives: [
            'Learn iterative improvement techniques',
            'Understand how to refine AI responses',
            'Practice giving feedback and correction prompts'
          ],
          learningObjectivesZh: [
            'å­¸ç?è¿­ä»£?¹é€²æ?å·?,
            '?†è§£å¦‚ä?å®Œå? AI ?æ?',
            'ç·´ç?çµ¦å‡º?é??Œä¿®æ­??ç¤?
          ],
          tags: ['refinement', 'iteration', 'feedback'],
          difficulty: 'intermediate',
          playgroundType: 'prompt-engineering',
          expectedOutput: 'Ability to iteratively improve AI responses',
          expectedOutputZh: '?½å?è¿­ä»£?¹é€?AI ?æ?',
          resources: [
            {
              id: 'res-3-3-1',
              name: 'Refinement Strategies Guide',
              nameZh: 'ä¿®æ­£ç­–ç•¥?‡å?',
              type: 'pdf',
              url: '/resources/refinement-strategies.pdf',
              size: '1.0MB',
              description: 'Strategies for improving AI responses through iteration',
              descriptionZh: '?šé?è¿­ä»£?¹é€?AI ?æ??„ç???,
              downloadCount: 456,
              previewAvailable: true
            }
          ],
          notes: [
            {
              id: 'note-3-3-1',
              timestamp: '00:16:30',
              content: 'Iteration is key to getting exactly what you want',
              contentZh: 'è¿­ä»£?¯ç²å¾—ä??³è??„ç¢º?‡ç??œç??œéµ',
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
              questionZh: '?Œä??¾åœ¨?¯ä?ä½ç?é£Ÿè?è«–å®¶ï¼Œè?å¹«æ?è©•è??™å®¶é¤å»³?‚ã€é€™å€‹æ?ç¤ºç”¨äº†ä?éº¼æ?å·§ï?',
              options: ['Role-playing', 'Give an example', 'Be specific'],
              optionsZh: ['è§’è‰²?®æ?', 'çµ¦å€‹ç?ä¾?, '?ç¢º?·é?'],
              correctAnswer: 'Role-playing',
              explanation: 'This prompt assigns a specific role (food critic) to the AI, which is role-playing.',
              explanationZh: '?™å€‹æ?ç¤ºç‚º AI ?†é?äº†ç‰¹å®šè??²ï?ç¾é?è©•è?å®¶ï?ï¼Œé€™æ˜¯è§’è‰²?®æ???,
              difficulty: 'medium',
              points: 20,
              aiGeneratedFeedback: 'Correct! Role-playing helps AI adopt specific expertise.',
              videoTimestamp: '00:25:00'
            },
            {
              id: 'q3-quiz-2',
              type: 'multiple-choice',
              question: 'If AI gives an answer that\'s not good enough, what should you do?',
              questionZh: 'å¦‚æ? AI çµ¦ç?ç­”æ?ä¸å?å¥½ï?ä½ è©²?éº¼è¾¦ï?',
              options: ['Get angry and shut down the computer', 'Believe this is the best answer', 'Give new instructions to ask it to modify the bad parts'],
              optionsZh: ['?Ÿæ°£?°é??‰é›»??, '?¸ä¿¡?™å°±?¯æ?å¥½ç?ç­”æ?äº?, '?å?ä¸å¥½?„åœ°?¹ï?ä¸‹æ–°?„æ?ä»¤è?å®ƒä¿®??],
              correctAnswer: 'Give new instructions to ask it to modify the bad parts',
              explanation: 'Iterative refinement is a key skill in prompt engineering - you can always improve the response.',
              explanationZh: 'è¿­ä»£?¹é€²æ˜¯?ç¤ºå·¥ç??„é??µæ???- ä½ ç¸½?¯å¯ä»¥æ”¹?„å??‰ã€?,
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

// ?¨æˆ¶?²åº¦è¿½è¹¤?¸æ?
export interface UserProgress {
  studentName: string;
  completedLessons: string[];
  lastViewedLesson?: string;
  totalTimeSpent: number; // ?†é?
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
  studentName: 'AIå­¸ç???,
  completedLessons: ['l1-1'], // ?ªå??ç¬¬ä¸€èª?
  lastViewedLesson: 'l1-2', // ?¾åœ¨?¨ç?ç¬¬ä?èª?
  totalTimeSpent: 45, // 45?†é?
  skillCompetency: [
    {
      skill: 'Prompt Design',
      skillZh: '?ç¤ºè¨­è?',
      level: 25, // ?ä??€?½ç?ç´?
      category: 'core'
    },
    {
      skill: 'Creative Writing',
      skillZh: '?µæ?å¯«ä?',
      level: 35,
      category: 'application'
    },
    {
      skill: 'Problem Solving',
      skillZh: '?é?è§?±º',
      level: 20,
      category: 'thinking'
    },
    {
      skill: 'Code Generation',
      skillZh: 'ä»?¢¼?Ÿæ?',
      level: 25,
      category: 'technical'
    },
    {
      skill: 'Few-shot Learning',
      skillZh: 'å°‘æ¨£?¬å­¸ç¿?,
      level: 52,
      category: 'advanced'
    },
    {
      skill: 'Role-playing',
      skillZh: 'è§’è‰²?®æ?',
      level: 68,
      category: 'advanced'
    }
  ],
  achievements: [
    {
      id: 'first-lesson',
      title: 'First Steps',
      titleZh: 'ç¬¬ä?æ­?,
      description: 'Completed your first lesson',
      descriptionZh: 'å®Œæ?äº†ç¬¬ä¸€èª?,
      icon: '?¯',
      unlockedAt: new Date('2024-01-18'),
      type: 'progress',
      rarity: 'common'
    },
    {
      id: 'quick-learner',
      title: 'Quick Learner',
      titleZh: 'å¿«é€Ÿå­¸ç¿’è€?,
      description: 'Completed 3 lessons in one day',
      descriptionZh: 'ä¸€å¤©å…§å®Œæ?äº?3 èª?,
      icon: '??,
      unlockedAt: new Date('2024-01-19'),
      type: 'streak',
      rarity: 'rare'
    },
    {
      id: 'creative-prompts',
      title: 'Creative Genius',
      titleZh: '?µæ?å¤©æ?',
      description: 'Created 10 creative prompts',
      descriptionZh: '?µå»ºäº?10 ?‹å‰µ?æ?ç¤?,
      icon: '?¨',
      unlockedAt: new Date('2024-01-20'),
      type: 'skill',
      rarity: 'epic'
    }
  ],
  dailyStreak: 7,
  lastLoginDate: new Date('2024-01-20')
};

// ç¤¾ç¾¤?¸æ?
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
      titleZh: '?µæ?å¯«ä??€ä½³æ?ç¤?,
      replies: 23,
      category: 'creative',
      trending: true
    },
    {
      id: 'topic-2', 
      title: 'How to debug failed prompts?',
      titleZh: 'å¦‚ä?èª¿è©¦å¤±æ??„æ?ç¤ºï?',
      replies: 18,
      category: 'troubleshooting',
      trending: true
    },
    {
      id: 'topic-3',
      title: 'Role-playing prompts that work',
      titleZh: '?‰æ??„è??²æ‰®æ¼”æ?ç¤?,
      replies: 15,
      category: 'advanced',
      trending: false
    }
  ],
  popularWorks: [
    {
      id: 'work-1',
      title: 'AI-Generated Poetry Collection',
      titleZh: 'AI ?Ÿæ?è©©æ???,
      author: 'CreativeStudent',
      likes: 45,
      category: 'creative'
    },
    {
      id: 'work-2',
      title: 'Prompt Engineering Cheat Sheet',
      titleZh: '?ç¤ºå·¥ç??™å???,
      author: 'TechLearner',
      likes: 67,
      category: 'educational'
    },
    {
      id: 'work-3',
      title: 'Chain-of-Thought Examples',
      titleZh: '?ç¶­?ˆç?ä¾‹é?',
      author: 'LogicMaster',
      likes: 52,
      category: 'advanced'
    }
  ],
  onlineUsers: 124
};

export default promptEngineeringCourseData; 