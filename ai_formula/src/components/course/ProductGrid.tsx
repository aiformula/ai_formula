import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProductGridProps, DigitalProduct, categoryFilters } from '@/data/courses/courseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Users, Mail, Clock, Download, ArrowRight, CheckCircle, Award } from 'lucide-react';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isZhTW,
  selectedCategory,
  onCategoryChange,
  onProductClick
}) => {
  const [leadForm, setLeadForm] = useState({ email: '', interest: '' });
  const navigate = useNavigate();

  // Listen for filter change events from AudiencePathwaysSection
  useEffect(() => {
    const handleFilterChangeEvent = (event: CustomEvent) => {
      const { category } = event.detail;
      if (category && onCategoryChange) {
        onCategoryChange(category);
      }
    };

    window.addEventListener('filterChange', handleFilterChangeEvent as EventListener);
    
    return () => {
      window.removeEventListener('filterChange', handleFilterChangeEvent as EventListener);
    };
  }, [onCategoryChange]);

  const handleFilterClick = (category: string) => {
    onCategoryChange(category);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead collected:', leadForm);
    alert(isZhTW ? '多謝你的興趣！我們會盡快聯絡你。' : 'Thanks for your interest! We\'ll contact you soon.');
    setLeadForm({ email: '', interest: '' });
  };

  const handleCourseClick = (product: DigitalProduct) => {
    if (onProductClick) {
      onProductClick(product);
    }
    
    // Navigate to the appropriate course outline page using React Router
    if (product.category === 'chatgpt-complete-course') {
      navigate('/courses/chatgpt-complete-course/outline');
    } else if (product.category === 'perplexity-complete-course') {
      navigate('/courses/perplexity-complete-course/outline');
    } else if (product.category === 'prompt-engineering-expert-course') {
      navigate('/courses/prompt-engineering-expert-course/outline');
    } else if (product.category === 'prompt-engineering-course') {
      navigate('/courses/prompt-engineering-course/outline');
    } else {
      // Default behavior for other courses
      navigate(`/courses/${product.category}`);
    }
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#121212' }}>
      <div className="container mx-auto px-6">
        {/* Section Header - matching image design */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            {isZhTW ? '精選免費課程' : 'Featured Free Courses'}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {isZhTW 
              ? '精心製作數位課程，幫助你快速提升技能並實現商業目標'
              : 'Carefully crafted digital courses to help you quickly improve skills and achieve business goals'
            }
          </p>
          
          {/* Filter Buttons - matching image design */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
                className={`${
                  selectedCategory === filter.key
                    ? 'bg-white text-slate-900 hover:bg-gray-100'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                } px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm`}
              >
                <span className="mr-2">{filter.emoji}</span>
                {isZhTW ? filter.labelCht : filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid - with mouse-following gradient effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group h-full cursor-pointer"
              onClick={() => handleCourseClick(product)}
            >
              <Card 
                className="relative h-full bg-black border-gray-800 hover:border-yellow-500 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-yellow-500/20"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  
                  e.currentTarget.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
                  e.currentTarget.style.setProperty('--rotate-x', `${rotateX}deg`);
                  e.currentTarget.style.setProperty('--rotate-y', `${rotateY}deg`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('--mouse-x', '50%');
                  e.currentTarget.style.setProperty('--mouse-y', '50%');
                  e.currentTarget.style.setProperty('--rotate-x', '0deg');
                  e.currentTarget.style.setProperty('--rotate-y', '0deg');
                }}
                style={{
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                  '--rotate-x': '0deg',
                  '--rotate-y': '0deg',
                  transform: 'perspective(1500px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))',
                } as React.CSSProperties}
              >
                {/* Mouse tracking light effect - 中間層 z-5 */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-25 transition-opacity duration-500 z-5"
                  style={{
                    transform: `translate(calc((var(--mouse-x) - 50%) * 0.05), calc((var(--mouse-y) - 50%) * 0.05))`,
                  }}
                >
                  {/* 垂直網格線 */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(90deg,
                          transparent 0px,
                          transparent 39px,
                          rgba(255, 215, 0, 0.1) 40px,
                          rgba(255, 215, 0, 0.1) 41px,
                          transparent 42px,
                          transparent 79px,
                          rgba(255, 191, 0, 0.08) 80px,
                          rgba(255, 191, 0, 0.08) 81px
                        )
                      `,
                    }}
                  />
                  
                  {/* 水平網格線 */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg,
                          transparent 0px,
                          transparent 39px,
                          rgba(255, 215, 0, 0.1) 40px,
                          rgba(255, 215, 0, 0.1) 41px,
                          transparent 42px,
                          transparent 79px,
                          rgba(255, 191, 0, 0.08) 80px,
                          rgba(255, 191, 0, 0.08) 81px
                        )
                      `,
                    }}
                  />
                  
                  {/* 滑鼠附近的亮光網格 */}
                  <div 
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: `
                        radial-gradient(200px at var(--mouse-x) var(--mouse-y), 
                          rgba(255, 215, 0, 0.4) 0%, 
                          rgba(255, 215, 0, 0.2) 50%, 
                          transparent 100%)
                      `,
                      backgroundImage: `
                        repeating-linear-gradient(90deg,
                          transparent 0px,
                          transparent 39px,
                          rgba(255, 215, 0, 0.6) 40px,
                          rgba(255, 215, 0, 0.6) 41px,
                          transparent 42px
                        ),
                        repeating-linear-gradient(0deg,
                          transparent 0px,
                          transparent 39px,
                          rgba(255, 215, 0, 0.6) 40px,
                          rgba(255, 215, 0, 0.6) 41px,
                          transparent 42px
                        )
                      `,
                      maskImage: `radial-gradient(200px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
                      WebkitMaskImage: `radial-gradient(200px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
                      animationDuration: '2s',
                    }}
                  />
                  
                  {/* 交叉點高亮 */}
                  <div 
                    className="absolute inset-0 animate-pulse"
                    style={{
                      backgroundImage: `
                        radial-gradient(3px at 40px 40px, #FFD700 0%, transparent 50%),
                        radial-gradient(3px at 80px 80px, #FFBF00 0%, transparent 50%),
                        radial-gradient(2px at 120px 40px, #FFD700 0%, transparent 50%),
                        radial-gradient(2px at 40px 120px, #FFBF00 0%, transparent 50%)
                      `,
                      backgroundSize: '80px 80px',
                      maskImage: `radial-gradient(250px at var(--mouse-x) var(--mouse-y), black 0%, transparent 70%)`,
                      WebkitMaskImage: `radial-gradient(250px at var(--mouse-x) var(--mouse-y), black 0%, transparent 70%)`,
                      filter: 'blur(0.5px)',
                      animationDuration: '2s',
                      animationDelay: '0.5s',
                    }}
                  />
                </div>
                
                {/* 邊角光線效果 - 保持但減弱 */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-700 z-5"
                  style={{
                    background: `
                      conic-gradient(from 315deg at 0% 0%, 
                        rgba(255, 215, 0, 0.05) 0deg,
                        transparent 20deg),
                      conic-gradient(from 225deg at 100% 0%, 
                        rgba(255, 191, 0, 0.04) 0deg,
                        transparent 20deg),
                      conic-gradient(from 135deg at 100% 100%, 
                        rgba(255, 215, 0, 0.05) 0deg,
                        transparent 20deg),
                      conic-gradient(from 45deg at 0% 100%, 
                        rgba(255, 191, 0, 0.04) 0deg,
                        transparent 20deg)
                    `,
                    filter: 'blur(2px)',
                  }}
                />

                {/* Card Content - 最上層 z-20 確保文字唔受影響 */}
                <div className="relative z-20">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110" role="img" aria-label={`${product.type} icon`}>
                        {product.image}
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* 難度標籤 */}
                        <Badge 
                          className={`text-xs backdrop-blur-sm ${
                            product.difficulty.toLowerCase() === 'advanced' ? 'bg-red-600/90 text-white' :
                            product.difficulty.toLowerCase() === 'intermediate' ? 'bg-orange-600/90 text-white' :
                            'bg-green-600/90 text-white'
                          }`}
                        >
                          {isZhTW ? product.difficultyCht : product.difficulty}
                        </Badge>
                        {product.newProduct && (
                          <Badge className="bg-blue-600/90 text-white text-xs backdrop-blur-sm">
                            {isZhTW ? '新品' : 'New'}
                          </Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="bg-purple-600/90 text-white text-xs backdrop-blur-sm">
                            {isZhTW ? '熱銷' : 'Hot'}
                          </Badge>
                        )}
                        {product.hotSelling && (
                          <Badge className="bg-yellow-600/90 text-white text-xs backdrop-blur-sm">
                            {isZhTW ? '精選' : 'Featured'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 text-white drop-shadow-sm">
                      {isZhTW ? product.titleCht : product.title}
                    </CardTitle>
                    <CardDescription className="text-gray-200 mb-4 drop-shadow-sm">
                      {isZhTW ? product.descriptionCht : product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats Row */}
                      <div className="flex items-center justify-between text-sm text-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-300" />
                            <span>{isZhTW ? product.durationCht : product.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-300" />
                            <span className="text-gray-300">
                              {product.downloads.toLocaleString()} {isZhTW ? '下載' : 'downloads'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{product.rating}</span>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-400/50 text-xs backdrop-blur-sm">
                          {isZhTW ? product.levelCht : product.level}
                        </Badge>
                      </div>

                      {/* Included Features */}
                      <div>
                        <h4 className="font-semibold mb-2 text-white drop-shadow-sm">
                          {isZhTW ? '包含內容：' : 'What\'s Included:'}
                        </h4>
                        <ul className="text-sm text-gray-200 space-y-1">
                          {(isZhTW ? product.includesCht : product.includes).slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-blue-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing and CTA */}
                      <div className="flex items-end justify-between pt-6">
                        <div className="flex flex-col gap-1">
                          {product.isFree ? (
                            <div className="text-3xl font-bold text-green-400 drop-shadow-sm">
                              {isZhTW ? "免費" : "Free"}
                            </div>
                          ) : (
                            <div className="text-3xl font-bold text-yellow-300 drop-shadow-sm">
                              {product.price}
                            </div>
                          )}
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-8 py-3 text-base font-semibold rounded-xl backdrop-blur-sm shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-yellow-400/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(product);
                          }}
                        >
                          {isZhTW ? '立即購買' : 'Buy Now'}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Course Request Card - Always show below products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Main Card */}
            <Card className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95 border-gray-700/50 backdrop-blur-xl overflow-hidden">
              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-16 right-12 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce"></div>
              <div className="absolute bottom-12 left-16 w-4 h-4 bg-orange-400 rounded-full opacity-50" style={{ animationDelay: '1s' }}></div>
              
              <CardHeader className="text-center relative z-10 py-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Icon with modern styling */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-40 scale-110"></div>
                      <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-2xl shadow-2xl">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <CardTitle className="text-3xl md:text-4xl font-bold">
                      <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
                        {isZhTW ? '想要新課程？' : 'Want New Courses?'}
                      </span>
                    </CardTitle>
                    
                    <CardDescription className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                      {isZhTW 
                        ? '分享你的學習目標，我們的AI專家會為你打造專屬的學習體驗'
                        : 'Share your learning goals, and our AI experts will create a personalized learning experience for you'
                      }
                    </CardDescription>
                  </div>
                </motion.div>
              </CardHeader>
              
              <CardContent className="relative z-10 px-8 pb-10">
                <motion.form 
                  onSubmit={handleLeadSubmit} 
                  className="max-w-xl mx-auto space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Email Input */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      {isZhTW ? '📧 聯絡電郵' : '📧 Contact Email'}
                    </label>
                    <div className="relative group">
                      <Input
                        type="email"
                        placeholder={isZhTW ? '輸入你的電郵地址' : 'Enter your email address'}
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        required
                        className="bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 focus:border-yellow-500/50 text-white placeholder-gray-400 h-12 rounded-xl px-4 text-lg transition-all duration-300 focus:bg-white/10"
                      />
                    </div>
                  </div>

                  {/* Course Request */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-200 uppercase tracking-wider">
                      {isZhTW ? '💡 課程構想' : '💡 Course Ideas'}
                    </label>
                    <div className="relative group">
                      <Textarea
                        placeholder={isZhTW ? '告訴我們你的學習目標和興趣領域...\n\n例如：\n• 想學習ChatGPT商業應用\n• 對AI繪圖工具感興趣\n• 希望了解自動化工作流程\n• 需要數據分析技能提升' : 'Tell us about your learning goals and areas of interest...\n\nFor example:\n• Want to learn ChatGPT business applications\n• Interested in AI drawing tools\n• Hope to understand automation workflows\n• Need data analysis skills improvement'}
                        value={leadForm.interest}
                        onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value })}
                        className="bg-white/5 backdrop-blur-sm border-2 border-gray-600/50 focus:border-yellow-500/50 text-white placeholder-gray-400 rounded-xl p-4 min-h-[140px] resize-none text-lg transition-all duration-300 focus:bg-white/10 scrollbar-none"
                        style={{
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none'
                        }}
                        rows={5}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full relative group bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 text-lg rounded-xl transition-all duration-500 shadow-lg hover:shadow-yellow-500/25 border-0"
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        <span className="text-xl">🚀</span>
                        {isZhTW ? '提交課程要求' : 'Submit Course Request'}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.form>

                {/* Features */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:bg-white/10 transition-all duration-300 group">
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white">{isZhTW ? '快速回覆' : 'Quick Response'}</h4>
                      <p className="text-gray-400 text-sm">{isZhTW ? '24小時內專業回覆' : 'Professional reply within 24 hours'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:bg-white/10 transition-all duration-300 group">
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white">{isZhTW ? '專家團隊' : 'Expert Team'}</h4>
                      <p className="text-gray-400 text-sm">{isZhTW ? 'AI領域資深導師' : 'Senior AI field mentors'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:bg-white/10 transition-all duration-300 group">
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white">{isZhTW ? '量身定制' : 'Customized'}</h4>
                      <p className="text-gray-400 text-sm">{isZhTW ? '專屬學習路徑設計' : 'Personalized learning path design'}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom note */}
                <motion.div 
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-gray-700/50">
                    <span className="text-lg animate-pulse">⚡</span>
                    <span className="text-gray-300 text-sm font-medium">
                      {isZhTW ? '我們會在24小時內與你聯絡' : 'We will contact you within 24 hours'}
                    </span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* No Products Message - Only show when no products */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Card className="bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-800/30 border-gray-600/30 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-300">
                  {isZhTW ? '未找到符合條件的課程' : 'No courses found matching your criteria'}
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg leading-relaxed">
                  {isZhTW 
                    ? '請嘗試其他篩選條件，或填寫上方表單告訴我們你的需求！'
                    : 'Try different filter criteria, or fill out the form above to tell us your needs!'
                  }
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductGrid); 
