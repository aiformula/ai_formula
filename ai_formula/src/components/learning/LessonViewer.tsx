import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Clock, 
  Target,
  Video,
  MessageCircle,
  Award,
  Download,
  ExternalLink,
  Lightbulb,
  Users,
  Brain,
  Loader2,
  Send,
  Bot,
  Plus
} from 'lucide-react';

// Â∞éÂÖ•Ë™≤Á??∏Ê?
import { 
  promptEngineeringCourseData, 
  sampleUserProgress, 
  CourseLesson, 
  CourseModule 
} from '@/data/courseData/promptEngineeringComplete';

interface LessonViewerProps {
  lessonId?: string;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lessonId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  // Á¢∫‰?‰∏≠Ê?È°ØÁ§∫
  const isZhTW = language === 'zh-HK';
  
  // Debug: Ëº∏Âá∫?∂Â?Ë™ûË?
  console.log('LessonViewer - Current language:', language, 'isZhTW:', isZhTW);
  
  // Âæ?state ?≤Â?Ë™≤Á? IDÔºåÂ??úÊ??âÂ?‰ΩøÁî®ÈªòË???
  const passedLessonId = location.state?.lessonId || lessonId;
  
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [nextLesson, setNextLesson] = useState<CourseLesson | null>(null);
  
  // ?æÂà∞?∂Â?Ë™≤Á??å‰?‰∏ÄË™≤Á?
  useEffect(() => {
    if (!passedLessonId) return;
    
    let foundLesson: CourseLesson | null = null;
    let foundModule: CourseModule | null = null;
    let foundNextLesson: CourseLesson | null = null;
    
    // Âª∫Á??Ä?âË™≤Á®ãÁ?Âπ≥Èù¢?óË°®
    const allLessons: CourseLesson[] = [];
    promptEngineeringCourseData.modules.forEach(module => {
      allLessons.push(...module.lessons);
    });
    
    // ?æÂà∞?∂Â?Ë™≤Á?
    for (const module of promptEngineeringCourseData.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === passedLessonId) {
          foundLesson = lesson;
          foundModule = module;
          break;
        }
      }
      if (foundLesson) break;
    }
    
    // ?æÂà∞‰∏ã‰?Ë™≤Á?
    if (foundLesson) {
      const currentIndex = allLessons.findIndex(lesson => lesson.id === passedLessonId);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        foundNextLesson = allLessons[currentIndex + 1];
      }
    }
    
    setCurrentLesson(foundLesson);
    setCurrentModule(foundModule);
    setNextLesson(foundNextLesson);
    setIsCompleted(sampleUserProgress.completedLessons.includes(passedLessonId));
  }, [passedLessonId]);
  
  // Ê∏≤Ê?‰∏çÂ?È°ûÂ??ÑË™≤Á®ãÂÖßÂÆ?
  const renderLessonContent = () => {
    if (!currentLesson) return null;
    
    switch (currentLesson.lessonType) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* ÂΩ±Á??≠Êîæ?Ä??*/}
              <div className="text-center">
                <Video className="w-16 h-16 text-[#3EFFDC] mx-auto mb-4" />
                <p className="text-[#E0E0E0] mb-4">
                  {isZhTW ? 'ÂΩ±Á??ßÂÆπ' : 'Video Content'}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {currentLesson.videoUrl || '/api/placeholder/video/lesson.mp4'}
                </p>
                <Button className="bg-[#8A3FFC] hover:bg-[#7A35EC] text-white">
                  <Play className="w-4 h-4 mr-2" />
                  {isZhTW ? '?≠ÊîæÂΩ±Á?' : 'Play Video'}
                </Button>
              </div>
              
              {/* ÂΩ±Á??ßÂà∂Ë¶ÜË?Â±?*/}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-3">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>00:00 / {isZhTW ? currentLesson.durationZh : currentLesson.duration}</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      {isZhTW ? 'Â≠óÂ?' : 'Subtitle'}
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      {isZhTW ? 'Á≠ÜË?' : 'Notes'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* ÂΩ±Á??èËø∞ */}
            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">
                  {isZhTW ? 'Ë™≤Á??èËø∞' : 'Lesson Description'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E0E0E0] mb-4">
                  {isZhTW ? currentLesson.descriptionZh : currentLesson.description}
                </p>
                
                {/* ÂΩ±Á??çÈ??ÇÈ?Ëª?*/}
                <div className="mt-4">
                  <h4 className="text-white font-semibold mb-3">
                    {isZhTW ? '?çÈ??ÇÈ?Ëª? : 'Key Timestamps'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-gray-800/50 rounded hover:bg-gray-800/70 cursor-pointer">
                      <Clock className="w-4 h-4 text-[#3EFFDC] mr-2" />
                      <span className="text-[#3EFFDC] font-mono text-sm mr-3">00:30</span>
                      <span className="text-[#E0E0E0] text-sm">
                        {isZhTW ? 'Ë™≤Á?‰ªãÁ¥π' : 'Course Introduction'}
                      </span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-800/50 rounded hover:bg-gray-800/70 cursor-pointer">
                      <Clock className="w-4 h-4 text-[#3EFFDC] mr-2" />
                      <span className="text-[#3EFFDC] font-mono text-sm mr-3">02:15</span>
                      <span className="text-[#E0E0E0] text-sm">
                        {isZhTW ? '?∏Â?Ê¶ÇÂøµ' : 'Core Concepts'}
                      </span>
                    </div>
                    <div className="flex items-center p-2 bg-gray-800/50 rounded hover:bg-gray-800/70 cursor-pointer">
                      <Clock className="w-4 h-4 text-[#3EFFDC] mr-2" />
                      <span className="text-[#3EFFDC] font-mono text-sm mr-3">05:40</span>
                      <span className="text-[#E0E0E0] text-sm">
                        {isZhTW ? 'ÂØ¶È??âÁî®' : 'Practical Applications'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'interactive-text':
        return (
          <div className="space-y-6">
            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[#3EFFDC]" />
                  {isZhTW ? '‰∫íÂ??áÊú¨?ßÂÆπ' : 'Interactive Text Content'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E0E0E0] mb-4">
                  {isZhTW ? currentLesson.descriptionZh : currentLesson.description}
                </p>
                
                {/* Â≠∏Á??ÆÊ? */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">
                    {isZhTW ? 'Â≠∏Á??ÆÊ?' : 'Learning Objectives'}
                  </h3>
                  <ul className="space-y-2">
                    {(isZhTW ? currentLesson.learningObjectivesZh : currentLesson.learningObjectives).map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <Target className="w-4 h-4 text-[#3EFFDC] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-[#E0E0E0]">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* ‰∫íÂ??ÉÁ? */}
                {currentLesson.interactiveElements && currentLesson.interactiveElements.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      {isZhTW ? '‰∫íÂ?Á∑¥Á?' : 'Interactive Exercises'}
                    </h3>
                    {currentLesson.interactiveElements.map((element, index) => (
                      <div key={element.id} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Lightbulb className="w-4 h-4 text-[#3EFFDC] mr-2" />
                          <span className="text-white font-medium">
                            {isZhTW ? 'Á∑¥Á?' : 'Exercise'} {index + 1}
                          </span>
                        </div>
                        <p className="text-[#E0E0E0]">
                          {isZhTW ? element.contentZh : element.content}
                        </p>
                        {element.prompt && (
                          <div className="mt-3 p-3 bg-gray-700 rounded">
                            <p className="text-sm text-gray-300 mb-1">
                              {isZhTW ? '?êÁ§∫ÁØÑ‰?Ôº? : 'Sample Prompt:'}
                            </p>
                            <code className="text-[#3EFFDC]">{element.prompt}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
        
      case 'quiz':
        return (
          <div className="space-y-6">
            <Card className="bg-white/5 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-[#3EFFDC]" />
                  {isZhTW ? 'Ê∏¨È??ßÂÆπ' : 'Quiz Content'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#E0E0E0] mb-4">
                  {isZhTW ? currentLesson.descriptionZh : currentLesson.description}
                </p>
                
                {/* Ê∏¨È??èÈ? */}
                {currentLesson.quizQuestions && currentLesson.quizQuestions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">
                      {isZhTW ? 'Ê∏¨È??èÈ?' : 'Quiz Questions'}
                    </h3>
                    {currentLesson.quizQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="bg-[#3EFFDC] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </span>
                          <span className="text-white font-medium">
                            {question.difficulty === 'easy' ? 'Á∞°ÂñÆ' : question.difficulty === 'medium' ? '‰∏≠Á?' : '?∞Èõ£'}
                          </span>
                          <Badge className="ml-2 text-xs">
                            {question.points} {isZhTW ? '?? : 'pts'}
                          </Badge>
                        </div>
                        <p className="text-[#E0E0E0] mb-3">
                          {isZhTW ? question.questionZh : question.question}
                        </p>
                        {question.options && (
                          <div className="space-y-2">
                            {(isZhTW ? question.optionsZh : question.options)?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center">
                                <input 
                                  type="radio" 
                                  name={`question-${question.id}`} 
                                  className="mr-2 accent-[#3EFFDC]"
                                />
                                <label className="text-[#E0E0E0]">{option}</label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Button className="bg-[#8A3FFC] hover:bg-[#7A35EC] text-white">
                      <Award className="w-4 h-4 mr-2" />
                      {isZhTW ? '?ê‰∫§Á≠îÊ?' : 'Submit Answers'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-[#3EFFDC] mx-auto mb-4" />
            <p className="text-[#E0E0E0]">
              {isZhTW ? 'Ë™≤Á??ßÂÆπÊ≠?ú®?†Ë?‰∏?..' : 'Lesson content is loading...'}
            </p>
          </div>
        );
    }
  };
  
  // ‰∫íÂ?Â≠∏Á??åÈù¢ÁµÑ‰ª∂
  const InteractiveLearningInterface = () => {
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState<string[]>([]);
    const [newNote, setNewNote] = useState('');
    const [activeTab, setActiveTab] = useState<'playground' | 'notes' | 'exercises'>('playground');
    
    const handleAISubmit = async () => {
      if (!aiPrompt.trim()) return;
      
      setIsLoading(true);
      // Ê®°Êì¨ AI ?ûÊ?
      setTimeout(() => {
        setAiResponse(`AI ?ûÊ?Ôº?{aiPrompt}\n\n?ôÊòØ‰∏Ä?ãÁ§∫‰æãÂ??â„ÄÇÂØ¶?õÊ??®‰∏≠?ÉÈÄ?é•?∞Á?Ê≠?? AI ?çÂ??Ç`);
        setIsLoading(false);
      }, 1500);
    };
    
    const addNote = () => {
      if (newNote.trim()) {
        setNotes([...notes, newNote]);
        setNewNote('');
      }
    };
    
    return (
      <Card className="bg-white/5 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center">
            <Brain className="w-6 h-6 mr-3 text-[#3EFFDC]" />
            {isZhTW ? '‰∫íÂ?Â≠∏Á??åÈù¢' : 'Interactive Learning Interface'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-6">
              <TabsTrigger value="playground" className="text-sm data-[state=active]:bg-[#3EFFDC] data-[state=active]:text-black">
                {isZhTW ? 'AI Á∑¥Á?' : 'AI Playground'}
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-sm data-[state=active]:bg-[#3EFFDC] data-[state=active]:text-black">
                {isZhTW ? 'Á≠ÜË?' : 'Notes'}
              </TabsTrigger>
              <TabsTrigger value="exercises" className="text-sm data-[state=active]:bg-[#3EFFDC] data-[state=active]:text-black">
                {isZhTW ? 'Á∑¥Á?' : 'Exercises'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="playground" className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#E0E0E0]">
                  {isZhTW ? 'Ëº∏ÂÖ•‰Ω†Á??êÁ§∫Ôº? : 'Enter your prompt:'}
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={isZhTW ? 'Ë©¶Ë©¶??AI ‰∏Ä‰∫õÂ?È°?..' : 'Try asking AI something...'}
                  className="w-full h-32 p-4 text-sm bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-[#3EFFDC] focus:border-transparent"
                />
              </div>
              
              <Button 
                onClick={handleAISubmit}
                disabled={isLoading || !aiPrompt.trim()}
                className="w-full bg-[#8A3FFC] hover:bg-[#7A35EC] text-white py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isZhTW ? '?ïÁ?‰∏?..' : 'Processing...'}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {isZhTW ? '?ºÈÄ? : 'Send'}
                  </>
                )}
              </Button>
              
              {aiResponse && (
                <div className="mt-4 p-4 bg-gray-800/70 rounded-lg text-sm text-[#E0E0E0] max-h-48 overflow-y-auto">
                  <div className="flex items-center mb-3">
                    <Bot className="w-4 h-4 mr-2 text-[#3EFFDC]" />
                    <span className="text-[#3EFFDC] font-semibold">AI ?ûÊ?:</span>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#E0E0E0]">
                  {isZhTW ? 'Ê∑ªÂ?Á≠ÜË?Ôº? : 'Add note:'}
                </label>
                <div className="flex space-x-3">
                  <input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={isZhTW ? 'Ë®òÈ??çË??ßÂÆπ...' : 'Record important content...'}
                    className="flex-1 p-3 text-sm bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#3EFFDC] focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addNote()}
                  />
                  <Button 
                    onClick={addNote}
                    className="bg-[#3EFFDC] hover:bg-[#2EEFCC] text-black px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {notes.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">
                      {isZhTW ? 'Â∞öÁÑ°Á≠ÜË?' : 'No notes yet'}
                    </p>
                  ) : (
                    notes.map((note, index) => (
                      <div key={index} className="p-3 bg-gray-800/50 rounded-lg text-sm text-[#E0E0E0]">
                        <div className="flex items-center mb-2">
                          <FileText className="w-4 h-4 mr-2 text-[#3EFFDC]" />
                          <span className="text-[#3EFFDC] font-semibold">
                            {isZhTW ? 'Á≠ÜË?' : 'Note'} #{index + 1}
                          </span>
                        </div>
                        <p className="leading-relaxed">{note}</p>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="w-5 h-5 mr-3 text-[#3EFFDC]" />
                  <h4 className="text-lg font-semibold text-white">
                    {isZhTW ? '‰∫íÂ?Á∑¥Á?' : 'Interactive Exercises'}
                  </h4>
                </div>
                
                {/* Á∑¥Á?Âª∫Ë≠∞ */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="w-4 h-4 mr-2 text-[#3EFFDC]" />
                      <span className="text-sm font-semibold text-[#3EFFDC]">
                        {isZhTW ? 'Á∑¥Á?Âª∫Ë≠∞' : 'Exercise Suggestion'}
                      </span>
                    </div>
                    <p className="text-sm text-[#E0E0E0] leading-relaxed">
                      {isZhTW 
                        ? 'Ë©¶Ë??πÊ?Ë™≤Á??ßÂÆπÂØ´‰??ãÊ?Á§∫Ô??∂Â?‰ΩøÁî®‰∏äÈù¢??AI Á∑¥Á??üËÉΩÊ∏¨Ë©¶?àÊ???
                        : 'Try writing a prompt based on the lesson content, then test it using the AI playground above.'}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Users className="w-4 h-4 mr-2 text-[#8A3FFC]" />
                      <span className="text-sm font-semibold text-[#8A3FFC]">
                        {isZhTW ? 'Â∞èÁ?Ë®éË?' : 'Group Discussion'}
                      </span>
                    </div>
                    <p className="text-sm text-[#E0E0E0] leading-relaxed">
                      {isZhTW 
                        ? '?áÂÖ∂‰ªñÂ≠∏ÁøíËÄÖÂ?‰∫´‰??ÑÊÉ≥Ê≥ïÂ?Á∂ìÈ???
                        : 'Share your thoughts and experiences with other learners.'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };
  
  if (!currentLesson || !currentModule) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] text-[#E0E0E0]">
        <Navigation />
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">
              <p className="text-[#E0E0E0]">
                {isZhTW ? 'Ë™≤Á??™Êâæ?? : 'Lesson not found'}
              </p>
              <Button 
                onClick={() => navigate('/courses/dashboard')}
                className="mt-4 bg-[#8A3FFC] hover:bg-[#7A35EC] text-white"
              >
                {isZhTW ? 'ËøîÂ?Ë™≤Á?' : 'Back to Course'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0D0D1A] text-[#E0E0E0]">
      <Navigation />
      
      {/* Ë™≤Á?Ê®ôÈ??Ä??*/}
      <div className="pt-20 pb-8 bg-gradient-to-r from-[#0D0D1A] to-[#1A1A2E] border-b border-[#3EFFDC]/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/courses/dashboard')}
                variant="outline"
                className="border-[#3EFFDC]/30 text-[#3EFFDC] hover:bg-[#3EFFDC]/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isZhTW ? 'ËøîÂ?Ë™≤Á?' : 'Back to Course'}
              </Button>
              
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="bg-[#3EFFDC]/20 text-[#3EFFDC]">
                    {isZhTW ? currentModule.titleZh : currentModule.title}
                  </Badge>
                  <Badge variant="outline" className="border-[#8A3FFC]/30 text-[#8A3FFC]">
                    {currentLesson.lessonType}
                  </Badge>
                </div>
                
                <h1 className="text-2xl font-bold text-white">
                  {isZhTW ? currentLesson.titleZh : currentLesson.title}
                </h1>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-[#E0E0E0]">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {isZhTW ? currentLesson.durationZh : currentLesson.duration}
                  </div>
                  {isCompleted && (
                    <div className="flex items-center text-[#3EFFDC]">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {isZhTW ? 'Â∑≤Â??? : 'Completed'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* ‰∏ªË??ßÂÆπ?Ä??*/}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Â∑¶ÂÅ¥?ßÂÆπ */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {renderLessonContent()}
              
              {/* Ë™≤Á?Ë≥áÊ? - ÁßªÂà∞Ë™≤Á??ßÂÆπ‰∏ãÊñπ */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <Card className="bg-white/5 border-gray-600 mt-6">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {isZhTW ? 'Ë™≤Á?Ë≥áÊ?' : 'Course Resources'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentLesson.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Download className="w-4 h-4 text-[#3EFFDC]" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {isZhTW ? resource.nameZh : resource.name}
                              </p>
                              <p className="text-xs text-gray-400">{resource.size}</p>
                              <p className="text-xs text-[#E0E0E0] mt-1">
                                {isZhTW ? resource.descriptionZh : resource.description}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="bg-[#3EFFDC]/10 border-[#3EFFDC]/30 text-[#3EFFDC] hover:bg-[#3EFFDC]/20">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Â≠∏Á??≤Â∫¶ - ÁßªÂà∞Â∑¶ÂÅ¥Â∫ïÈÉ® */}
              <Card className="bg-white/5 border-gray-600 mt-6">
                <CardHeader>
                  <CardTitle className="text-white text-sm">
                    {isZhTW ? 'Â≠∏Á??≤Â∫¶' : 'Learning Progress'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#E0E0E0]">
                        {isZhTW ? 'ÂÆåÊ??Ä?? : 'Completion Status'}
                      </span>
                      <span className={`text-sm ${isCompleted ? 'text-[#3EFFDC]' : 'text-gray-400'}`}>
                        {isCompleted ? (isZhTW ? 'Â∑≤Â??? : 'Completed') : (isZhTW ? '?≤Ë?‰∏? : 'In Progress')}
                      </span>
                    </div>
                    
                    <Button 
                      className={`w-full ${isCompleted ? 'bg-[#3EFFDC] text-black' : 'bg-[#8A3FFC] hover:bg-[#7A35EC] text-white'}`}
                      onClick={() => {
                        // ?ôË£°?Ø‰ª•?†ÂÖ•Ê®ôË?ÂÆåÊ??ÑÈ?Ëº?
                        setIsCompleted(!isCompleted);
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {isZhTW ? 'Â∑≤Â??? : 'Completed'}
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4 mr-2" />
                          {isZhTW ? 'Ê®ôË?ÂÆåÊ?' : 'Mark as Complete'}
                        </>
                      )}
                    </Button>
                    
                    {/* ‰∏ã‰?Ë™≤Ê???- ?™Ê??®Â??êÂ?‰∏îÊ?‰∏ã‰?Ë™≤Ê?È°ØÁ§∫ */}
                    {isCompleted && nextLesson && (
                      <Button
                        className="w-full mt-2 bg-[#3EFFDC] hover:bg-[#2FEFCC] text-[#0D0D1A] font-semibold"
                        onClick={() => {
                          navigate('/courses/dashboard', {
                            state: { lessonId: nextLesson.id }
                          });
                        }}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
                        {isZhTW ? `‰∏ã‰?Ë™≤Ô?${nextLesson.titleZh}` : `Next: ${nextLesson.title}`}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* ?≥ÂÅ¥Â§ßÂ?‰∫íÂ?Â≠∏Á??åÈù¢ */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <InteractiveLearningInterface />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LessonViewer; 
