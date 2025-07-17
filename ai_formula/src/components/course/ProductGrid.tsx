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

        {/* Course Cards Grid - matching image design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleCourseClick(product)}
            >
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="pb-4">
                  {/* Course Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-green-600 text-white font-medium">
                      {isZhTW ? '免費' : 'Free'}
                    </Badge>
                    <div className="text-2xl">{product.image}</div>
                  </div>
                  
                  {/* Course Title */}
                  <CardTitle className="text-white text-xl font-bold line-clamp-2 mb-2">
                    {isZhTW ? product.titleCht : product.title}
                  </CardTitle>
                  
                  {/* Course Description */}
                  <CardDescription className="text-slate-300 line-clamp-3">
                    {isZhTW ? product.descriptionCht : product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{isZhTW ? product.durationCht : product.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{product.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="mb-6 flex-1">
                    <p className="text-slate-300 text-sm font-medium mb-3">
                      {isZhTW ? '包含內容：' : 'Includes:'}
                    </p>
                    <ul className="space-y-2">
                      {(isZhTW ? product.includesCht : product.includes).slice(0, 4).map((item, idx) => (
                        <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">
                        {product.price === "免費" ? (isZhTW ? "免費" : "Free") : product.price}
                      </span>
                      {product.originalPrice && product.originalPrice !== product.price && product.originalPrice !== "" && (
                        <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 group-hover:bg-blue-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(product);
                      }}
                    >
                      <span className="mr-2">{isZhTW ? '課程大綱' : 'Course Outline'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
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
