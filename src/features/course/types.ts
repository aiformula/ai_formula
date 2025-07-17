// Course Topic Interface
export interface CourseTopic {
  name: string;
  nameCht: string;
}

// Sample Content Interface
export interface SampleContent {
  title: string;
  titleCht: string;
  prompt: string;
  promptCht: string;
  result: string;
  resultCht: string;
}

// Professional Tip Interface
export interface ProTip {
  number: number;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  example: string;
  exampleCht: string;
}

// Pro Tips Container Interface
export interface ProTips {
  title: string;
  titleCht: string;
  tips: ProTip[];
}

// Course Part Content Interface
export interface PartContent {
  content: string;
  contentCht: string;
}

// Video Template Interface
export interface VideoTemplate {
  id: string;
  sectionName: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  imageAlt: string;
  videoAlt: string;
}

// Course Part Interface
export interface CoursePart {
  id: string;
  number: number;
  title: string;
  titleCht: string;
  icon: string;
  color: string;
  description: string;
  descriptionCht: string;
  duration: string;
  durationCht: string;
  topics: CourseTopic[];
  sampleContent: SampleContent;
  proTips?: ProTips;
}

// Pro Learning Course Interface
export interface ProLearningCourse {
  id: string;
  title: string;
  titleCht: string;
  subtitle: string;
  subtitleCht: string;
  parts: CoursePart[];
  getPartContent: (partNumber: number) => PartContent;
}

// Quick Tip Interface
export interface QuickTip {
  icon: string;
  title: string;
  titleCht: string;
  description: string;
  descriptionCht: string;
  color: string;
}

// Pro Learning Props Interface
export interface ProLearningProps {
  course: ProLearningCourse;
  quickTips?: QuickTip[];
  videoTemplates?: VideoTemplate[];
  onBackClick?: () => void;
  onPartComplete?: (partNumber: number) => void;
  onNavigate?: (action: 'back' | 'next', currentPart: number) => void;
}

// Pro Learning Component State Interface
export interface ProLearningState {
  currentPart: number;
  completedParts: number[];
}

// Pro Learning Navigation Props
export interface ProLearningNavigationProps {
  parts: CoursePart[];
  currentPart: number;
  completedParts: number[];
  language: string;
  onPartSelect: (partIndex: number) => void;
}

// Pro Learning Content Props
export interface ProLearningContentProps {
  part: CoursePart;
  partContent: PartContent;
  isEnhanced?: boolean;
  language: string;
  videoTemplates?: VideoTemplate[];
}

// Pro Learning Actions Props
export interface ProLearningActionsProps {
  currentPart: number;
  totalParts: number;
  isCompleted: boolean;
  language: string;
  onMarkComplete: () => void;
  onNextPart: () => void;
} 