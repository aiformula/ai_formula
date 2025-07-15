/**
 * Featured Courses Section Component
 * @fileoverview Clean featured courses section showing only the prompt engineering course by Leung Ming
 * @author AI Formula Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFeaturedProducts } from '@/data/courses/courseData';
import type { DigitalProduct } from '@/data/courses/courseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Download } from 'lucide-react';

/**
 * Featured Courses Section Component
 */
const FeaturedCoursesSection: React.FC = () => {
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  const [featuredCourses, setFeaturedCourses] = useState<DigitalProduct[]>([]);

  useEffect(() => {
    setFeaturedCourses(getFeaturedProducts());
  }, []);

  const sectionTitle = isZhHK ? '精選課程' : 'Featured Courses';
  const sectionSubtitle = isZhHK 
    ? '掌握AI技術，提升商業競爭力' 
    : 'Master AI Technology, Boost Your Business Competitiveness';

  const enrollText = isZhHK ? '立即報名' : 'Enroll Now';
  const studentsText = isZhHK ? '學員' : 'students';
  const downloadsText = isZhHK ? '下載' : 'downloads';

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            {sectionTitle}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{course.image}</div>
                  <div className="flex gap-2">
                    {course.bestseller && (
                      <Badge variant="destructive" className="text-xs">
                        {isZhHK ? '暢銷' : 'Bestseller'}
                      </Badge>
                    )}
                    {course.newProduct && (
                      <Badge variant="secondary" className="text-xs">
                        {isZhHK ? '新品' : 'New'}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                  {isZhHK ? course.titleCht : course.title}
                </CardTitle>
                
                <CardDescription className="text-slate-300 leading-relaxed">
                  {isZhHK ? course.descriptionCht : course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                {/* Course Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isZhHK ? course.durationCht : course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.downloads.toLocaleString()} {studentsText}
                  </div>
                </div>

                {/* Course Level */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {isZhHK ? course.levelCht : course.level}
                  </Badge>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {isZhHK ? course.typeCht : course.type}
                  </Badge>
                </div>

                {/* Course Includes */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">
                    {isZhHK ? '課程包含：' : 'Course Includes:'}
                  </h4>
                  <div className="space-y-1">
                    {(isZhHK ? course.includesCht : course.includes).slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                    {(isZhHK ? course.includesCht : course.includes).length > 3 && (
                      <div className="text-xs text-slate-400">
                        +{(isZhHK ? course.includesCht : course.includes).length - 3} {isZhHK ? '更多項目' : 'more items'}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-slate-700">
                <div className="w-full">
                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{course.price}</span>
                        <span className="text-sm text-slate-400 line-through">{course.originalPrice}</span>
                      </div>
                      <div className="text-xs text-green-400">
                        {isZhHK ? `節省 ${Math.round(((parseInt(course.originalPrice.replace(/[^0-9]/g, '')) - parseInt(course.price.replace(/[^0-9]/g, ''))) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%` 
                                 : `Save ${Math.round(((parseInt(course.originalPrice.replace(/[^0-9]/g, '')) - parseInt(course.price.replace(/[^0-9]/g, ''))) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%`}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
                    onClick={() => {
                      // Handle course enrollment
                      console.log('Enrolling in course:', course.id);
                    }}
                  >
                    {enrollText} →
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-300 mb-6">
            {isZhHK 
              ? '準備好用AI轉型您的業務嗎？' 
              : 'Ready to transform your business with AI?'}
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            {isZhHK ? '瀏覽所有課程' : 'Browse All Courses'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection; 