import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Star, Users, CheckCircle, Lock } from 'lucide-react';

interface CourseTemplateProps {
  // Course basic information
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  
  // Course metadata
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  durationZh?: string;
  rating?: number;
  studentCount?: number;
  
  // Course content
  modules: CourseModule[];
  
  // Course status
  isEnrolled?: boolean;
  progress?: number;
  
  // Display options
  showProgress?: boolean;
  showRating?: boolean;
  showStudentCount?: boolean;
  
  // Callbacks
  onEnroll?: () => void;
  onModuleClick?: (moduleId: string) => void;
}

interface CourseModule {
  id: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  duration: string;
  durationZh?: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  lessons: CourseLesson[];
}

interface CourseLesson {
  id: string;
  title: string;
  titleZh?: string;
  duration: string;
  durationZh?: string;
  type: 'video' | 'reading' | 'quiz' | 'exercise';
  isCompleted?: boolean;
  isLocked?: boolean;
}

const CourseTemplate: React.FC<CourseTemplateProps> = ({
  title,
  titleZh,
  description,
  descriptionZh,
  level,
  duration,
  durationZh,
  rating,
  studentCount,
  modules,
  isEnrolled = false,
  progress = 0,
  showProgress = true,
  showRating = true,
  showStudentCount = true,
  onEnroll,
  onModuleClick,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getLevelText = (level: string, isZh: boolean) => {
    const levelMap = {
      beginner: isZh ? '?ùÂ≠∏?? : 'Beginner',
      intermediate: isZh ? '‰∏≠Á?' : 'Intermediate',
      advanced: isZh ? 'È´òÁ?' : 'Advanced',
    };
    return levelMap[level as keyof typeof levelMap];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getLevelColor(level)}>
                    {getLevelText(level, !!titleZh)}
                  </Badge>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{titleZh ? durationZh : duration}</span>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-3">
                  {titleZh || title}
                </CardTitle>
                <p className="text-gray-300 text-lg">
                  {descriptionZh || description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {showRating && rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{rating}</span>
                  </div>
                )}
                {showStudentCount && studentCount && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{studentCount}+ students</span>
                  </div>
                )}
                {!isEnrolled && (
                  <Button
                    onClick={onEnroll}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {titleZh ? '?ãÂ?Â≠∏Á?' : 'Start Learning'}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          {showProgress && isEnrolled && (
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <Progress value={progress} className="flex-1" />
                <span className="text-gray-300 text-sm">{progress}%</span>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Course Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card 
              className={`bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer ${
                module.isLocked ? 'opacity-60' : ''
              }`}
              onClick={() => !module.isLocked && onModuleClick?.(module.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    {module.titleZh || module.title}
                  </CardTitle>
                  {module.isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : module.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  {module.descriptionZh || module.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.durationZh || module.duration}</span>
                  </div>
                  <span>{module.lessons.length} lessons</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseTemplate; 
