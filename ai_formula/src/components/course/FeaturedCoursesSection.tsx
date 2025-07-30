import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const coursesData = [
  {
    id: 'chatgpt-complete-course',
    title: 'ChatGPT 完整教學實戰',
    titleCht: 'ChatGPT 完整教學實戰',
    description: '掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。',
    descriptionCht: '掌握 ChatGPT 的完整應用，從日常辦公到創意專案，全面提升您的數位能力。',
    image: '💬',
    duration: '4 小時',
    durationCht: '4 小時',
    downloads: 163,
    rating: 4.9,
    level: '適合所有級別',
    newCourse: true,
    bestseller: true,
    featured: true,
    content: [
      '6 個綜合模組',
      '高效 Prompt 實戰手冊',
      'AI 工具整合指南',
      '+4 更多項目',
    ],
    price: '免費',
  },
];

const CourseCard = ({ course, isZhTW = true }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${course.id}/outline`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 1.0, 
        delay: Math.random() * 0.5,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-yellow-500 transition-all duration-500 cursor-pointer relative overflow-hidden" onClick={handleClick}>
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700)',
            backgroundSize: '400% 400%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="text-4xl" 
              role="img" 
              aria-label="Course icon"
              whileHover={{ 
                scale: 1.3, 
                rotate: 15,
                transition: { duration: 0.3 }
              }}
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {course.image}
            </motion.div>
            <div className="flex flex-col gap-2">
              {course.newCourse && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: 5 }}
                >
                  <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                    {isZhTW ? '新品' : 'New'}
                  </Badge>
                </motion.div>
              )}
              {course.bestseller && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: -5 }}
                >
                  <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                    {isZhTW ? '熱銷' : 'Hot'}
                  </Badge>
                </motion.div>
              )}
              {course.featured && (
                <motion.div
                  initial={{ x: 50, opacity: 0, scale: 0 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.7,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ scale: 1.15, x: -8, rotate: 5 }}
                >
                  <Badge variant="outline" className="text-orange-400 border-orange-400 text-xs">
                    {isZhTW ? '精選' : 'Featured'}
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CardTitle className="text-xl mb-2 text-white">
              {isZhTW ? course.titleCht : course.title}
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CardDescription className="text-gray-200">
              {isZhTW ? course.descriptionCht : course.description}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <motion.div 
              className="flex items-center justify-between text-sm text-gray-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                  </motion.div>
                  <span>{isZhTW ? course.durationCht : course.duration}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ x: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    animate={{ y: [0, -2, 0] }}
                  >
                    <Users className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                  </motion.div>
                  <span>163 下載</span>
                </motion.div>
              </div>
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </motion.div>
                <span className="text-white">{course.rating}</span>
              </motion.div>
            </motion.div>

            {/* Level Badge */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                適合所有級別
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h4 className="font-semibold mb-2 text-white">
                包含內容：
              </h4>
              <ul className="text-sm text-gray-200 space-y-1">
                {[
                  '6 個綜合模組',
                  '高效 Prompt 實戰手冊',
                  'AI 工具整合指南',
                  '+1 更多項目'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.4 + i * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div 
                      className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Bottom Split Layout - Green Free + Orange Button */}
            <motion.div 
              className="flex items-center justify-between pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              {/* Left: Green Free Text */}
              <motion.div 
                className="flex flex-col gap-1"
                whileHover={{ scale: 1.1, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-2xl font-bold text-green-400"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(34, 197, 94, 0.8)',
                      '0 0 5px rgba(34, 197, 94, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  免費
                </motion.div>
              </motion.div>
              
              {/* Right: Orange Purchase Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 2.0,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                <Button 
                  className="relative overflow-hidden font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)'
                  }}
                  onClick={handleClick}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(45deg, #f97316, #eab308, #f59e0b, #f97316)',
                      backgroundSize: '400% 400%'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  
                  <div className="relative z-10 flex items-center">
                    <span>立即購買</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturedCoursesSection = () => {
  return (
    <section className="text-white py-16 sm:py-24" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            精選 AI 課程
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            掌握 AI 技術，提升商業競爭力
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {coursesData.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection; 