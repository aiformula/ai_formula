import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProductGridProps, DigitalProduct } from '@/data/courses/courseData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Users, Mail, Clock, Download, ArrowRight } from 'lucide-react';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isZhTW,
  selectedCategory,
  onCategoryChange,
  onProductClick
}) => {
  const [leadForm, setLeadForm] = useState({ email: '', interest: '' });
  const navigate = useNavigate();

  // Category filters - matching image design
  const categoryFilters = [
    { key: 'all', label: 'All', labelCht: '全部' },
    { key: 'free', label: 'Free', labelCht: '免費' },
  ];

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
    if (product.category === 'business-automation') {
      navigate('/courses/ai-business-automation');
    } else if (product.category === 'chatgpt-complete-course') {
      navigate('/courses/chatgpt-complete-course/outline');
    } else if (product.category === 'prompt-engineering') {
      navigate('/courses/prompt-engineering-outline');
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
          <div className="flex justify-center gap-4 mt-8">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
                className={`${
                  selectedCategory === filter.key
                    ? 'bg-white text-slate-900 hover:bg-gray-100'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                } px-8 py-3 rounded-full font-medium transition-all duration-300`}
              >
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
                        {product.newProduct && (
                          <Badge className="bg-green-600/90 text-white text-xs backdrop-blur-sm">
                            {isZhTW ? '新品' : 'New'}
                          </Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="bg-red-600/90 text-white text-xs backdrop-blur-sm">
                            {isZhTW ? '熱銷' : 'Hot'}
                          </Badge>
                        )}
                        {product.hotSelling && (
                          <Badge className="bg-orange-600/90 text-white text-xs backdrop-blur-sm">
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
                          <div className="text-3xl font-bold text-green-400 drop-shadow-sm">
                            {isZhTW ? "免費" : "Free"}
                          </div>
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

        {/* No Products Message */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-yellow-900/60 via-orange-900/40 to-amber-900/30 border-yellow-500/30 max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-7 h-7 text-yellow-400" />
                  <CardTitle className="text-2xl text-yellow-300">
                    {isZhTW ? '想要新課程？' : 'Want new courses?'}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-200 text-lg leading-relaxed">
                  {isZhTW 
                    ? '話俾我們知你想學咩，我們會為你度身訂造課程！'
                    : 'Tell us what you want to learn, and we\'ll create a course just for you!'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder={isZhTW ? '你的電郵地址' : 'Your email address'}
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    required
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Textarea
                    placeholder={isZhTW ? '你想學咩課程？例如Excel進階技巧、Python數據分析、數位營銷等...' : 'What course would you like? e.g., Advanced Excel, Python Data Analysis, Digital Marketing...'}
                    value={leadForm.interest}
                    onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value })}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    rows={3}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 hover:from-yellow-700 hover:via-orange-700 hover:to-amber-700 text-white font-bold py-4 text-lg"
                  >
                    {isZhTW ? '提交課程要求' : 'Submit Course Request'}
                  </Button>
                </form>
                <p className="text-center text-gray-300 text-sm mt-6">
                  {isZhTW ? '我們會盡快回覆你的要求' : 'We\'ll respond to your request as soon as possible'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductGrid); 
