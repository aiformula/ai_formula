import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Code2, 
  TrendingUp, 
  Brain, 
  Users, 
  Rocket,
  ArrowRight,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

const AudiencePathwaysSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isZhTW = language === 'zh-HK';

  const pathways = [
    {
      id: 1,
      icon: <BookOpen className="w-8 h-8" />,
      emoji: "🎓",
      title: isZhTW ? "我是AI新手，想打好基礎" : "I'm an AI beginner, want to build foundations",
      description: isZhTW 
        ? "從零開始學習AI，建立紮實的基礎知識，適合完全沒有AI經驗的學習者。"
        : "Start learning AI from scratch, build solid foundational knowledge, perfect for complete beginners.",
      features: isZhTW ? [
        "AI基本概念介紹",
        "實用工具介紹", 
        "真實案例分析",
        "逐步實作指導"
      ] : [
        "AI fundamental concepts",
        "Practical tools introduction",
        "Real case studies", 
        "Step-by-step guidance"
      ],
      level: isZhTW ? "初學者" : "Beginner",
      duration: isZhTW ? "4-6週" : "4-6 weeks",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/50",
      filterKey: "beginner"
    },
    {
      id: 2,
      icon: <Code2 className="w-8 h-8" />,
      emoji: "🔧", 
      title: isZhTW ? "我是開發者，想學習AI整合技巧" : "I'm a developer, want to learn AI integration",
      description: isZhTW 
        ? "深入掌握AI技術整合，學習API使用、自動化工具開發，為你的開發技能加分。"
        : "Master AI technology integration, learn API usage and automation tool development to enhance your skills.",
      features: isZhTW ? [
        "API整合實務",
        "自動化工具開發",
        "進階技術指南",
        "系統整合設計"
      ] : [
        "API integration practice",
        "Automation tool development", 
        "Advanced technical guides",
        "System integration design"
      ],
      level: isZhTW ? "中階" : "Intermediate",
      duration: isZhTW ? "6-12週" : "6-12 weeks",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/50",
      filterKey: "intermediate"
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      emoji: "💼",
      title: isZhTW ? "我是行銷人員，想用AI提升效率" : "I'm a marketer, want to use AI for efficiency",
      description: isZhTW 
        ? "學習如何運用AI工具優化行銷策略，提升內容創作和數據分析的效率。"
        : "Learn how to use AI tools to optimize marketing strategies and improve content creation and data analysis efficiency.",
      features: isZhTW ? [
        "AI內容創作工具",
        "行銷自動化設定",
        "數據分析優化",
        "客戶關係管理"
      ] : [
        "AI content creation tools",
        "Marketing automation setup",
        "Data analysis optimization", 
        "Customer relationship management"
      ],
      level: isZhTW ? "中階" : "Intermediate", 
      duration: isZhTW ? "6-8週" : "6-8 weeks",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/50",
      filterKey: "intermediate"
    }
  ];

  const accessPasses = [
    {
      id: 4,
      icon: <Rocket className="w-8 h-8" />,
      emoji: "🚀",
      title: isZhTW ? "全權限通行證 - 解鎖所有內容" : "All Access Pass - Unlock Everything",
      description: isZhTW 
        ? "獲得平台上所有課程的完整訪問權限，包括低階版、中階版和高階版的全部內容。"
        : "Get complete access to all courses on the platform, including basic, intermediate, and advanced content.",
      features: isZhTW ? [
        "低階版課程完整訪問",
        "中階版課程完整訪問", 
        "高階版課程完整訪問",
        "所有未來新課程"
      ] : [
        "Full access to basic courses",
        "Full access to intermediate courses",
        "Full access to advanced courses", 
        "All future new courses"
      ],
      level: isZhTW ? "全權限" : "All Access",
      duration: isZhTW ? "終身訪問" : "Lifetime Access",
      price: "HK$1980",
      originalPrice: "HK$4158",
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-500/50",
      filterKey: "all-access",
      isPurchasable: true
    },
    {
      id: 5,
      icon: <Zap className="w-8 h-8" />,
      emoji: "⚡",
      title: isZhTW ? "中階權限通行證 - 精選內容" : "Half Access Pass - Selected Content",
      description: isZhTW 
        ? "專注於中階課程內容，適合已有基礎知識，想要深入學習特定領域的學習者。"
        : "Focus on intermediate content, perfect for learners with basic knowledge who want to dive deeper into specific areas.",
      features: isZhTW ? [
        "中階版課程完整訪問",
        "精選實戰案例",
        "進階技術指導",
        "專業技能提升"
      ] : [
        "Full access to intermediate courses",
        "Selected practical case studies",
        "Advanced technical guidance", 
        "Professional skill enhancement"
      ],
      level: isZhTW ? "中階權限" : "Half Access",
      duration: isZhTW ? "中階內容訪問" : "Intermediate Content Access",
      price: "HK$980",
      originalPrice: "HK$2058",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-500/50",
      filterKey: "half-access",
      isPurchasable: true
    }
  ];

  const handlePathwayClick = (filterKey: string) => {
    // Handle special access types with purchase
    if (filterKey === 'all-access') {
      // Navigate to payment page for all-access
      navigate('/payment/all-access');
      return;
    }
    
    if (filterKey === 'half-access') {
      // Navigate to payment page for half-access
      navigate('/payment/half-access');
      return;
    }
    
    // Navigate to courses page and apply the filter for regular pathways
    navigate('/courses');
    
    // Use a small delay to ensure the page loads before applying filter
    setTimeout(() => {
      // Trigger the filter change in the ProductGrid component
      const event = new CustomEvent('filterChange', { 
        detail: { category: filterKey } 
      });
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <Target className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">
              {isZhTW ? '個人化學習路徑' : 'Personalized Learning Path'}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              {isZhTW ? '你是哪一類人？' : 'What Type Are You?'}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {isZhTW 
              ? '不同背景需要不同的學習路徑。選擇你的起點，開始你的AI學習之旅！' 
              : 'Different backgrounds require different learning paths. Choose your starting point and begin your AI learning journey!'
            }
          </p>
        </motion.div>

        {/* Learning Pathway Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-16">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
              onClick={() => handlePathwayClick(pathway.filterKey)}
            >
              <Card className={`bg-gray-800/50 border-2 ${pathway.borderColor} hover:border-opacity-100 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm relative`}>
                {/* Card Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-r ${pathway.bgGradient} rounded-lg blur-xl`}></div>
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon & Emoji */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 bg-gradient-to-br ${pathway.bgGradient} rounded-xl border ${pathway.borderColor}`}
                    >
                      {pathway.icon}
                    </motion.div>
                    <span className="text-4xl">{pathway.emoji}</span>
                  </div>

                  {/* Pathway Info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`bg-gradient-to-r ${pathway.gradient} text-white border-0`}>
                        {pathway.level}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {pathway.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                      {pathway.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {pathway.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      {isZhTW ? '你將學到' : 'You will learn'}
                    </h4>
                    <ul className="space-y-2">
                      {pathway.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-2 h-2 bg-gradient-to-r ${pathway.gradient} rounded-full flex-shrink-0`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => handlePathwayClick(pathway.filterKey)}
                      className={`w-full bg-gradient-to-r ${pathway.gradient} hover:shadow-lg hover:shadow-${pathway.gradient.split('-')[1]}-500/25 text-white font-semibold py-3 transition-all duration-300 group border-0`}
                    >
                      {isZhTW ? '開始學習' : 'Start Learning'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Access Passes Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              {isZhTW ? '全權限通行證' : 'Access Passes'}
            </span>
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {isZhTW 
              ? '一次購買，終身學習！選擇最適合你的權限等級，解鎖更多精彩內容。'
              : 'Buy once, learn forever! Choose the access level that suits you best and unlock amazing content.'
            }
          </p>
        </motion.div>

        {/* Access Pass Cards */}
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-8 max-w-4xl mx-auto mb-16">
          {accessPasses.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <Card className={`relative h-full bg-gradient-to-br from-gray-900 to-black border ${pass.borderColor} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}>
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 bg-gradient-to-br ${pass.bgGradient} rounded-xl border ${pass.borderColor}`}
                    >
                      {pass.icon}
                    </motion.div>
                    <span className="text-4xl">{pass.emoji}</span>
                  </div>

                  {/* Pass Info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`bg-gradient-to-r ${pass.gradient} text-white border-0`}>
                        {pass.level}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {pass.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                      {pass.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {pass.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      {isZhTW ? '包含內容' : 'Includes'}
                    </h4>
                    <ul className="space-y-2">
                      {pass.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className={`w-2 h-2 bg-gradient-to-r ${pass.gradient} rounded-full flex-shrink-0`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Section */}
                  <div className="mb-6 p-4 bg-black/30 rounded-lg border border-gray-700/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className={`text-3xl font-bold bg-gradient-to-r ${pass.gradient} bg-clip-text text-transparent`}>
                          {pass.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {pass.originalPrice}
                        </span>
                      </div>
                      <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold inline-block">
                        限時優惠 52% OFF
                      </div>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => handlePathwayClick(pass.filterKey)}
                      className={`w-full bg-gradient-to-r ${pass.gradient} hover:shadow-lg hover:shadow-${pass.gradient.split('-')[1]}-500/25 text-white font-semibold py-4 text-lg transition-all duration-300 group border-0`}
                    >
                      {isZhTW ? '立即購買' : 'Buy Now'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            {isZhTW ? '仍然不確定哪個課程適合你？' : 'Still not sure which course suits you?'}
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-2 border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400 transition-all duration-300 px-8 py-3"
          >
            {isZhTW ? '聯絡我們獲得建議' : 'Contact Us for Advice'}
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AudiencePathwaysSection; 
