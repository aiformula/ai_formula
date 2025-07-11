import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductGridProps } from '@/data/courseData';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Users, Mail } from 'lucide-react';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isZhTW,
  selectedCategory,
  onCategoryChange,
  onProductClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [leadForm, setLeadForm] = useState({ email: '', interest: '' });

  // Popular courses for cross-promotion - only real available courses
  const popularCourses = [
    {
      id: 'coding-basics',
      title: 'Coding Basics Class',
      titleCht: '編程基礎班',
      description: '4 Hours Learn Truly Practical Programming from Zero!',
      descriptionCht: '4小時 零基礎學會『真正實用』的程式設計！',
      price: 'HK$3,800',
      originalPrice: 'HK$4,800',
      rating: 5.0,
      students: 234,
      icon: '💻',
      category: 'programming'
    },
    {
      id: 'perplexity-tools',
      title: 'Perplexity Tools Class',
      titleCht: 'Perplexity 工具班', 
      description: '3 Hours Become AI Search Research Super Expert!',
      descriptionCht: '3小時 成為AI搜尋研究『超級專家』！',
      price: 'HK$1,980',
      originalPrice: 'HK$2,800',
      rating: 5.0,
      students: 156,
      icon: '🔍',
      category: 'ai'
    }
  ];

  // Combined filter tags - categories and industries in one unified system
  const allFilterTags = [
    // Category filters
    { key: 'all', label: 'All', labelCht: '全部', emoji: '📋', type: 'category' },
    { key: 'design', label: 'Creative Design', labelCht: '創意設計', emoji: '🎨', type: 'category' },
    { key: 'ai', label: 'AI Applications', labelCht: 'AI應用', emoji: '🤖', type: 'category' },
    { key: 'automation', label: 'Automation', labelCht: '自動化', emoji: '⚡', type: 'category' },
    { key: 'analytics', label: 'Data Analytics', labelCht: '數據分析', emoji: '📊', type: 'category' },
    { key: 'prompt-engineering', label: 'Prompt Engineering', labelCht: '提示工程', emoji: '💬', type: 'category' },
    { key: 'programming', label: 'Programming', labelCht: '程式設計', emoji: '💻', type: 'category' },
    // Industry filters
    { key: 'daily-life', label: 'Daily Life', labelCht: '日常生活', emoji: '🏠', type: 'industry' },
    { key: 'insurance', label: 'Insurance', labelCht: '保險業', emoji: '🛡️', type: 'industry' },
    { key: 'retail', label: 'Retail', labelCht: '零售業', emoji: '🛍️', type: 'industry' },
    { key: 'finance', label: 'Finance', labelCht: '金融業', emoji: '💰', type: 'industry' },
    { key: 'education', label: 'Education', labelCht: '教育業', emoji: '🎓', type: 'industry' },
    { key: 'healthcare', label: 'Healthcare', labelCht: '醫療業', emoji: '🏥', type: 'industry' }
  ];

  // Get button color based on unified selection
  const getButtonColor = (tag: any) => {
    const isSelected = selectedFilter === tag.key;
    
    if (isSelected) {
      return tag.type === 'category' 
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-emerald-500 hover:bg-emerald-600 text-white';
    }
    return 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white';
  };

  const handleFilterClick = (tag: any) => {
    setSelectedFilter(tag.key);
    
    // Update the category for compatibility with existing system
    if (tag.type === 'category') {
      onCategoryChange(tag.key);
    } else {
      // For industry filters, set category to 'all' to show all categories for that industry
      onCategoryChange('all');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the lead data to your backend
    console.log('Lead collected:', leadForm);
    alert(isZhTW ? '多謝你嘅興趣！我哋會盡快聯絡你。' : 'Thanks for your interest! We\'ll contact you soon.');
    setLeadForm({ email: '', interest: '' });
  };

  // Filter products based on unified selection
  const filteredProducts = products.filter(product => {
    const currentTag = allFilterTags.find(tag => tag.key === selectedFilter);
    
    if (!currentTag) return false;
    
    if (currentTag.type === 'category') {
      // Category filter logic
      return selectedFilter === 'all' || product.category === selectedFilter;
    } else {
      // Industry filter logic - only 'daily-life' has products
      return selectedFilter === 'daily-life';
    }
  });

  // Get current selected tag info
  const getCurrentTag = () => {
    return allFilterTags.find(tag => tag.key === selectedFilter);
  };

  // Determine lead collection message based on selected filter
  const getLeadCollectionContent = () => {
    const currentTag = getCurrentTag();
    
    // Get the category name for the title
    const getCategoryName = (key: string) => {
      const tagInfo = allFilterTags.find(tag => tag.key === key);
      return isZhTW ? tagInfo?.labelCht : tagInfo?.label;
    };
    
    // Handle special case for 'all' category
    if (currentTag?.key === 'all') {
      return {
        title: isZhTW ? '搵唔到想要嘅課程？' : 'Can\'t find what you\'re looking for?',
        description: isZhTW 
          ? '話俾我哋知你想學咩，我哋會為你度身訂造課程！'
          : 'Tell us what you want to learn, and we\'ll create a course just for you!',
        emailPlaceholder: isZhTW ? '你嘅電郵地址' : 'Your email address',
        textareaPlaceholder: isZhTW ? '你想學咩課程？例如：Excel進階技巧、Python數據分析、數位營銷策略等...' : 'What course would you like? e.g., Advanced Excel, Python Data Analysis, Digital Marketing...',
        buttonText: isZhTW ? '提交課程需求' : 'Submit Course Request',
        footerText: isZhTW ? '我哋會在24小時內回覆你嘅需求' : 'We\'ll respond to your request within 24 hours'
      };
    }
    
    // For all other categories, show the specific "coming soon" message
    const categoryName = getCategoryName(currentTag?.key || '');
    
    return {
      title: isZhTW ? `「${categoryName}」嘅課程我哋準備緊喇！` : `"${categoryName}" course is coming soon!`,
      description: isZhTW 
        ? '內容好快就到。想成為第一批學員？留低你嘅電郵，新課程一上架即刻通知你！'
        : 'Content coming soon. Want to be in the first batch? Leave your email and we\'ll notify you when the new course launches!',
      emailPlaceholder: isZhTW ? '你嘅電郵地址' : 'Your email address',
      textareaPlaceholder: isZhTW ? `你對${categoryName}有咩特別想學嘅？（選填）` : `What specifically do you want to learn about ${categoryName}? (Optional)`,
      buttonText: isZhTW ? '通知我新課程上架' : 'Notify me when available',
      footerText: isZhTW ? '新課程一上架即刻通知你' : 'We\'ll notify you as soon as the course is available'
    };
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {isZhTW ? '精選數位產品類別' : 'Featured Digital Product Categories'}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isZhTW 
              ? '高質素筆記同影片教學，即刻下載就用得。'
              : 'High-quality notes and video tutorials, instant download and access.'
            }
          </p>
          
          {/* Unified Filter Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              {allFilterTags.map((tag) => (
                <Button
                  key={tag.key}
                  onClick={() => handleFilterClick(tag)}
                  className={`${getButtonColor(tag)} transition-all duration-200 text-sm px-3 py-2 h-auto min-h-0`}
                  aria-label={`${isZhTW ? tag.labelCht : tag.label}`}
                >
                  <span className="text-base mr-1">{tag.emoji}</span>
                  <span className="text-sm">{isZhTW ? tag.labelCht : tag.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              isZhTW={isZhTW}
              onProductClick={onProductClick}
              index={index}
            />
          ))}
        </div>

        {/* Cross-promotion Section when no products */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            {/* Lead Collection Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg blur-xl animate-pulse" />
                  
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-amber-500/50 rounded-lg p-[2px]">
                    <div className="h-full w-full rounded-lg bg-gradient-to-br from-yellow-900/80 via-orange-900/60 to-amber-900/40" />
                  </div>
                  
                  <Card className="relative bg-gradient-to-br from-yellow-900/80 via-orange-900/60 to-amber-900/40 border-0 shadow-2xl backdrop-blur-sm">
                    <CardHeader className="text-center relative">
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                      <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-[2000ms]" />
                      <div className="absolute top-8 left-8 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-[3000ms]" />
                      <div className="absolute top-8 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-[4000ms]" />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <CardTitle className="text-white text-2xl md:text-3xl flex items-center justify-center gap-3 mb-4">
                                                 <motion.div
                           animate={{ 
                             rotate: [0, 10, -10, 0],
                             scale: [1, 1.1, 1]
                           }}
                           transition={{ 
                             duration: 2, 
                             repeat: Infinity, 
                             repeatType: "reverse",
                             ease: "easeInOut"
                           }}
                         >
                           <Mail className="w-7 h-7 text-yellow-400" />
                         </motion.div>
                         <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                          {getLeadCollectionContent().title}
                        </span>
                      </CardTitle>
                      <CardDescription className="text-gray-200 text-lg leading-relaxed">
                        {getLeadCollectionContent().description}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="relative">
                    <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                      >
                                                 <Input
                           type="email"
                           placeholder={getLeadCollectionContent().emailPlaceholder}
                           value={leadForm.email}
                           onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                           required
                           className="bg-gray-800/70 border-2 border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-white placeholder-gray-300 h-12 text-lg transition-all duration-300 hover:bg-gray-700/70 backdrop-blur-sm"
                         />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                      >
                                                 <Textarea
                           placeholder={getLeadCollectionContent().textareaPlaceholder}
                           value={leadForm.interest}
                           onChange={(e) => setLeadForm({...leadForm, interest: e.target.value})}
                           required={selectedFilter === 'all'}
                           rows={4}
                           className="bg-gray-800/70 border-2 border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 text-white placeholder-gray-300 text-lg transition-all duration-300 hover:bg-gray-700/70 backdrop-blur-sm resize-none"
                         />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                                                 <Button 
                           type="submit" 
                           className="w-full bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600 hover:from-yellow-700 hover:via-orange-700 hover:to-amber-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                         >
                          {/* Button shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10">{getLeadCollectionContent().buttonText}</span>
                        </Button>
                      </motion.div>
                    </form>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      className="text-center text-gray-300 text-sm mt-6 bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm"
                    >
                      {getLeadCollectionContent().footerText}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Popular Courses Section */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <TrendingUp className="w-6 h-6 text-yellow-400" />
                  {isZhTW ? '熱門推薦課程' : 'Popular Recommended Courses'}
                </h3>
                <p className="text-gray-300">
                  {isZhTW ? '發掘其他學員都喜愛嘅課程' : 'Discover courses loved by other students'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto">
                {popularCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl">{course.icon}</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            {isZhTW ? '熱門' : 'Popular'}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-lg">
                          {isZhTW ? course.titleCht : course.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {isZhTW ? course.descriptionCht : course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students} {isZhTW ? '學生' : 'students'}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-xl font-bold text-white">{course.price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            // Navigate to course or handle course selection
                            if (course.category === 'programming') {
                              setSelectedFilter('programming');
                              onCategoryChange('programming');
                            } else if (course.category === 'ai') {
                              setSelectedFilter('ai');
                              onCategoryChange('ai');
                            } else {
                              setSelectedFilter('design');
                              onCategoryChange('design');
                            }
                          }}
                        >
                          {isZhTW ? '查看課程' : 'View Course'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProductGrid); 