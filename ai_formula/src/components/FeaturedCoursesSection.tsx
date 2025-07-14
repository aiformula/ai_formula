import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock, ArrowRight, TrendingUp, Award } from 'lucide-react';
import { getFeaturedCourses } from '@/data/courses/courses';

const FeaturedCoursesSection = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  const featuredCourses = getFeaturedCourses().slice(0, 3); // Show top 3 featured courses

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full mb-6"
          >
            <TrendingUp className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">
              {isZhTW ? '?±È??®Ëñ¶' : 'Featured'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              {isZhTW ? 'Á≤æÈÅ∏Ë™≤Á??êË¶Ω' : 'Featured Course Preview'}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZhTW 
              ? '?ºÊ??ëÂÄëÊ??óÊ≠°ËøéÁ?AIË™≤Á?ÔºåÂ??∫Á??∞ÈÄ≤È?ÔºåÂπ´?©‰??®AI?òÂ?Âª∫Á?Á¥ÆÂØ¶?ÑÊ??ΩÂü∫Á§é„Ä? 
              : 'Discover our most popular AI courses, from basics to advanced, helping you build solid skills in the AI field.'
            }
          </p>
        </motion.div>

        {/* Featured Courses Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <Card className="bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm relative">
                {/* Card Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 rounded-lg blur-xl"></div>
                </div>

                <CardHeader className="relative z-10">
                  {/* Course Icon & Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30"
                    >
                      {course.image}
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      {course.bestseller && (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                          <Award className="w-3 h-3 mr-1" />
                          {isZhTW ? '?¢Èä∑' : 'Bestseller'}
                        </Badge>
                      )}
                      {course.featured && (
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                          {isZhTW ? 'Á≤æÈÅ∏' : 'Featured'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Course Title */}
                  <CardTitle className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    {isZhTW ? course.titleCht : course.title}
                  </CardTitle>

                  {/* Course Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {isZhTW ? course.descriptionCht : course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400">{course.rating}</span>
                      <span>({course.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{isZhTW ? course.durationCht : course.duration}</span>
                    </div>
                  </div>

                  {/* Course Level */}
                  <div className="mb-4">
                    <Badge className={`
                      ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/50' : 
                        course.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 
                        'bg-red-500/20 text-red-300 border-red-500/50'}
                    `}>
                      {isZhTW ? course.levelCht : course.level}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-white">
                      HK${course.price.toLocaleString()}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        HK${course.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      {isZhTW ? 'Á´ãÂç≥?±Â?' : 'Enroll Now'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400 transition-all duration-300 px-8 py-3"
          >
            {isZhTW ? '?•Á??Ä?âË™≤Á®? : 'View All Courses'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection; 
