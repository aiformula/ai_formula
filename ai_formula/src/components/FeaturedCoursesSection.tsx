import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Star, Download } from 'lucide-react';
import Atropos from 'atropos/react';
import { useLanguage } from '@/contexts/LanguageContext';

const coursesData = [
  {
    id: '1',
    image: '🤖',
    title: 'ChatGPT 完整教學實戰',
    titleCht: 'ChatGPT 完整教學實戰',
    description: 'Master ChatGPT with comprehensive hands-on training',
    descriptionCht: '從基礎到進階，全面掌握 ChatGPT 的實戰應用技巧',
    duration: '6 小時',
    durationCht: '6 小時',
    rating: 4.9,
    downloads: 163,
    newProduct: true,
    bestseller: true,
    featured: true,
    includes: [
      '6 個綜合模組',
      '高效 Prompt 實戰手冊',
      'AI 工具整合指南',
      '+1 更多項目'
    ]
  }
];

const FeaturedCoursesSection: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

  // Container animations with doubled effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Card animations with doubled effects
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut",
        type: "spring",
        bounce: 0.3
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Icon animations with doubled effects
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4
      }
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Tag animations with doubled effects
  const tagVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.2,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      x: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  // Text animations with doubled effects
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }
    })
  };

  // Button animations with doubled effects
  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4
      }
    },
    hover: {
      scale: 1.05,
      y: -3,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // Info item animations with doubled effects
  const infoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.8 + i * 0.15,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 5,
      transition: {
        duration: 0.3
      }
    }
  };

  // List item animations with doubled effects
  const listItemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.0 + i * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header with doubled animations */}
          <motion.div 
            className="text-center mb-16"
            variants={textVariants}
            custom={0}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {isZhTW ? '精選課程' : 'Featured Courses'}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {isZhTW ? '開始您的 AI 學習之旅' : 'Start Your AI Learning Journey'}
            </motion.p>
          </motion.div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                whileHover="hover"
                className="w-full h-full"
              >
                <Atropos
                  className="w-full h-full"
                  activeOffset={60}
                  shadowScale={1.2}
                  rotateXMax={20}
                  rotateYMax={20}
                  duration={600}
                >
                  <motion.div 
                    className="bg-black border border-yellow-400 rounded-xl p-6 h-full flex flex-col relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                    }}
                    whileHover={{
                      borderColor: '#FFD700',
                      boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                      transition: { duration: 0.3 }
                    }}
                  >
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

                    {/* Header with Icon and Tags */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <motion.div 
                        className="text-5xl"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        {course.image}
                      </motion.div>
                      
                      <div className="flex flex-col gap-2">
                        <AnimatePresence>
                          {course.newProduct && (
                            <motion.div
                              variants={tagVariants}
                              custom={0}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                            >
                              {isZhTW ? '新品' : 'New'}
                            </motion.div>
                          )}
                          {course.bestseller && (
                            <motion.div
                              variants={tagVariants}
                              custom={1}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                            >
                              {isZhTW ? '熱銷' : 'Hot'}
                            </motion.div>
                          )}
                          {course.featured && (
                            <motion.div
                              variants={tagVariants}
                              custom={2}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                            >
                              {isZhTW ? '精選' : 'Featured'}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      variants={textVariants}
                      custom={0.4}
                    >
                      {isZhTW ? course.titleCht : course.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-sm mb-6 flex-grow"
                      variants={textVariants}
                      custom={0.6}
                    >
                      {isZhTW ? course.descriptionCht : course.description}
                    </motion.p>

                    {/* Course Info */}
                    <motion.div 
                      className="flex items-center justify-between text-sm text-gray-300 mb-4"
                      variants={textVariants}
                      custom={0.8}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="flex items-center gap-1"
                          variants={infoVariants}
                          custom={0}
                          whileHover="hover"
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Clock className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                          </motion.div>
                          <span>{course.duration}</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center gap-1"
                          variants={infoVariants}
                          custom={1}
                          whileHover="hover"
                        >
                          <motion.div
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Download className="h-4 w-4 text-yellow-400" strokeWidth={1} fill="none" />
                          </motion.div>
                          <span>{course.downloads} 下載</span>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="flex items-center gap-1"
                        variants={infoVariants}
                        custom={2}
                        whileHover="hover"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        </motion.div>
                        <span className="text-white font-semibold">{course.rating}</span>
                      </motion.div>
                    </motion.div>

                    {/* Course Content List */}
                    <motion.div 
                      className="mb-6"
                      variants={textVariants}
                      custom={1.0}
                    >
                      <h4 className="font-semibold mb-3 text-white">
                        包含內容：
                      </h4>
                      <ul className="text-sm text-gray-300 space-y-2">
                        {course.includes.map((item, i) => (
                          <motion.li 
                            key={i}
                            className="flex items-center gap-2"
                            variants={listItemVariants}
                            custom={i}
                          >
                            <motion.div 
                              className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                            />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Bottom Section - Split Layout */}
                    <motion.div 
                      className="flex items-center justify-between mt-auto"
                      variants={textVariants}
                      custom={1.2}
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
                          HK$280
                        </motion.div>
                      </motion.div>
                      
                      {/* Right: Orange Purchase Button */}
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="px-6 py-3 rounded-lg font-semibold text-white relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)'
                        }}
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
                        
                        <div className="relative z-10 flex items-center gap-2">
                          <span>立即購買</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </Atropos>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;