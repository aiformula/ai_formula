import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Panel, 
  PanelGroup, 
  PanelResizeHandle 
} from 'react-resizable-panels';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  PictureInPicture,
  Download,
  MessageSquare,
  Copy,
  ExternalLink,
  Brain,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  Bot,
  Zap,
  BookOpen,
  Users,
  FileText,
  Code,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Trophy,
  Lightbulb,
  RotateCcw,
  Send,
  Maximize2,
  Minimize2,
  Video
} from 'lucide-react';

// Â≠êÁ?‰ª∂Â???
import AIPlayground from './AIPlayground';
import QuizModal from './QuizModal';
import AITutorChat from './AITutorChat';
import SmartNotes from './SmartNotes';
import CommunityQA from './CommunityQA';
import ResourceDownloads from './ResourceDownloads';
import InteractiveArticle from './InteractiveArticle';
import { promptEngineeringCourseData, CourseLesson } from '@/data/courseData/promptEngineeringComplete';

// È°ûÂ?ÂÆöÁæ©
interface CourseModule {
  id: string;
  title: string;
  titleZh: string;
  duration: string;
  videoUrl: string;
  transcript: string;
  completed: boolean;
  playgroundType: 'prompt-engineering' | 'image-generation' | 'code-editor';
  expectedOutput: string;
  notes: Note[];
  resources: Resource[];
}

interface Note {
  id: string;
  timestamp: string;
  content: string;
  codeSnippet?: string;
  type: 'concept' | 'example' | 'tip' | 'warning';
}

interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'dataset' | 'template';
  url: string;
  size: string;
}

interface LearningProgress {
  currentModule: string;
  completedModules: string[];
  totalProgress: number;
  timeSpent: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

interface AILearningOSPageProps {
  courseId: string;
  modules: CourseModule[];
  initialProgress?: LearningProgress;
}

export const AILearningOSPage: React.FC<AILearningOSPageProps> = ({
  courseId,
  modules,
  initialProgress
}) => {
  // ?Ä?ãÁÆ°??
  const [currentModule, setCurrentModule] = useState<CourseModule>(modules[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  
  // ‰∫íÂ??Ä?üÁ???
  const [isBottomPanelExpanded, setIsBottomPanelExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  
  // Â≠∏Á??≤Â∫¶?Ä??
  const [progress, setProgress] = useState<LearningProgress>(
    initialProgress || {
      currentModule: modules[0].id,
      completedModules: [],
      totalProgress: 0,
      timeSpent: 0,
      achievements: []
    }
  );

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ÂΩ±Á??ßÂà∂?ΩÊï∏
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const togglePictureInPicture = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
          setIsPictureInPicture(false);
        } else {
          await videoRef.current.requestPictureInPicture();
          setIsPictureInPicture(true);
        }
      } catch (error) {
        console.error('Picture-in-picture error:', error);
      }
    }
  };

  // Â≠∏Á??≤Â∫¶?¥Êñ∞
  const updateProgress = (moduleId: string, completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      completedModules: completed 
        ? [...prev.completedModules, moduleId]
        : prev.completedModules.filter(id => id !== moduleId),
      totalProgress: Math.round((prev.completedModules.length / modules.length) * 100)
    }));
  };

  // Ê™¢Êü•?ØÂê¶?Ø‰ª•?ãÂ?Ê∏¨È?
  const canStartQuiz = () => {
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);
    const currentChapterModules = modules.slice(0, currentIndex + 1);
    return currentChapterModules.every(module => 
      progress.completedModules.includes(module.id)
    );
  };

  // ?µÁõ§Âø´Êç∑??
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'f':
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
        case 'p':
          e.preventDefault();
          togglePictureInPicture();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration, isFullscreen, isPlaying]);

  // ?ÇÈ??ºÂ???
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="h-screen bg-slate-900 text-slate-50 overflow-hidden">
      {/* ?ÇÈÉ®Â∞éËà™Ê¨?*/}
      <div className="h-16 bg-slate-800 border-b border-slate-600 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-slate-50">AI Learning OS</span>
          </div>
          <Badge variant="outline" className="text-blue-300 border-blue-300 bg-blue-900/20">
            {currentModule.title}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-slate-200">?≤Â∫¶: {progress.totalProgress}%</span>
          </div>
          <Progress value={progress.totalProgress} className="w-32" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQuizModal(true)}
            disabled={!canStartQuiz()}
            className="text-green-300 hover:text-green-200 hover:bg-green-900/20"
          >
            <Target className="w-4 h-4 mr-2" />
            ?ãÂ?Ê∏¨È?
          </Button>
        </div>
      </div>

      {/* ‰∏ªË??ßÂÆπ?Ä??*/}
      <div className="h-[calc(100vh-4rem)]">
        <PanelGroup direction="horizontal" className="h-full">
          {/* A?ÄÔºöÂΩ±?áÊí≠?æÂô® (Â∑?‰∏? */}
          <Panel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col">
              {/* ÂΩ±Á??≠Êîæ??*/}
              <div className="flex-1 relative bg-black">
                <video
                  ref={videoRef}
                  src={currentModule.videoUrl}
                  className="w-full h-full object-contain"
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                  onEnded={() => {
                    setIsPlaying(false);
                    updateProgress(currentModule.id, true);
                  }}
                />
                
                {/* ÂΩ±Á??ßÂà∂Ë¶ÜË?Â±?*/}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:text-gray-300"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => handleSeek(Number(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <span className="text-sm text-gray-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-16 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <select
                      value={playbackRate}
                      onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                      className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="0.75">0.75x</option>
                      <option value="1">1x</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePictureInPicture}
                      className="text-white hover:text-gray-300"
                    >
                      <PictureInPicture className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-white hover:text-gray-300"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
                         </div>
           </Panel>

           <PanelResizeHandle />

           {/* B?ÄÔºöAI Playground (?? */}
           <Panel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  AI Playground
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  ?®ÈÄôË£°ÂØ¶Ë??®Â≠∏?∞Á?Ê¶ÇÂøµ
                </p>
              </div>
              
              <div className="flex-1">
                <AIPlayground
                  type={currentModule.playgroundType}
                  expectedOutput={currentModule.expectedOutput}
                  onOutputGenerated={(output) => {
                    // ?ïÁ??üÊ??ÑËº∏??
                    console.log('Generated output:', output);
                  }}
                />
              </div>
                         </div>
           </Panel>
         </PanelGroup>
      </div>

      {/* C?ÄÔºöÂ??ÉË?‰∫íÂ??Ä (‰∏??ØÊî∂?? */}
      <AnimatePresence>
        {isBottomPanelExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '40%' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 border-t border-gray-700 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">?ÉËÄÉË?‰∫íÂ?</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBottomPanelExpanded(false)}
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="notes" className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      ?∫ËÉΩÁ≠ÜË?
                    </TabsTrigger>
                    <TabsTrigger value="reference" className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      ?ÉËÄÉËº∏??
                    </TabsTrigger>
                    <TabsTrigger value="community" className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Á§æÁæ§?èÁ?
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Ë≥áÊ?‰∏ãË?
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notes" className="h-full mt-0">
                    <SmartNotes
                      notes={currentModule.notes}
                      onTimestampClick={handleSeek}
                    />
                  </TabsContent>
                  
                  <TabsContent value="reference" className="h-full mt-0">
                    <div className="p-4 h-full overflow-auto">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                          Â∞éÂ∏´?ÉËÄÉËº∏??
                        </h4>
                        <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                          <pre className="whitespace-pre-wrap">{currentModule.expectedOutput}</pre>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => navigator.clipboard.writeText(currentModule.expectedOutput)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Ë§áË£Ω
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="community" className="h-full mt-0">
                    <CommunityQA courseId={courseId} moduleId={currentModule.id} />
                  </TabsContent>
                  
                  <TabsContent value="resources" className="h-full mt-0">
                    <ResourceDownloads resources={currentModule.resources} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ?∂Â??¢Êùø?âÈ? */}
      {!isBottomPanelExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <Button
            onClick={() => setIsBottomPanelExpanded(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg"
          >
            <ChevronUp className="w-4 h-4 mr-2" />
            È°ØÁ§∫?ÉËÄÉË???
          </Button>
        </motion.div>
      )}

      {/* AI ?©Ê??∏ÊµÆ?âÈ? */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setShowAITutor(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* ?∫ËÉΩÊ∏¨È?Ê®°Ê?Ê°?*/}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        moduleId={currentModule.id}
        courseId={courseId}
        onComplete={(score) => {
          console.log('Quiz completed with score:', score);
          setShowQuizModal(false);
        }}
      />

      {/* AI ?©Ê??äÂ§© */}
      <AITutorChat
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        courseId={courseId}
        moduleId={currentModule.id}
        currentTimestamp={formatTime(currentTime)}
      />
    </div>
  );
};

export default AILearningOSPage; 
