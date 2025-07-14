import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Trophy, Users2, Zap } from "lucide-react";

const AboutCht = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: (
        <span className="relative inline-block w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="var(--ai-formula-primary)" strokeWidth="2" fill="none" />
            <circle cx="12" cy="7" r="1.5" fill="var(--ai-formula-primary)" />
            <rect x="11.25" y="6" width="1.5" height="7" rx="0.75" fill="var(--ai-formula-primary)" />
          </svg>
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            className="absolute top-0 left-0 w-6 h-6"
            style={{ originX: "50%", originY: "50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <rect x="11.25" y="6" width="1.5" height="7" rx="0.75" fill="var(--ai-formula-primary)" />
          </motion.svg>
        </span>
      ),
      title: "節省寶貴時間",
      description: "特別設計的工具，幫助您精準地在任何平台上創造價值"
    },
    {
      icon: (
        <motion.span
          className="inline-block w-6 h-6"
          animate={{ filter: ["brightness(1)", "brightness(2)", "brightness(1)"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-6 h-6" />
        </motion.span>
      ),
      title: "自動化工作流程",
      description: "學習使用各種AI工具，如大型語言模型和N8N自動化流程，令您的工作流程更上一層樓"
    },
    {
      icon: (
        <motion.span
          className="inline-block w-6 h-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-6 h-6" />
        </motion.span>
      ),
      title: "智能學習系統",
      description: "運用先進的人工智能技術，為您提供個性化的學習體驗和智能建議"
    },
    {
      icon: (
        <motion.span
          className="inline-block w-6 h-6"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-6 h-6" />
        </motion.span>
      ),
      title: "成果導向",
      description: "專注於實際應用和成效，確保您學到的知識能夠直接應用到工作中"
    }
  ];

  const teamMembers = [
    {
      name: "李明",
      role: "創辦人兼CEO",
      bio: "擁有豐富的AI和教育科技經驗，致力於為用戶提供最佳的學習體驗"
    },
    {
      name: "王小華",
      role: "技術總監",
      bio: "專精於機器學習和自然語言處理，負責平台的技術架構和創新"
    },
    {
      name: "陳美玲",
      role: "教育總監",
      bio: "教育心理學博士，專注於設計有效的線上學習課程和教學方法"
    }
  ];

  const stats = [
    { number: "10,000+", label: "活躍用戶" },
    { number: "50+", label: "專業課程" },
    { number: "95%", label: "滿意度" },
    { number: "24/7", label: "技術支援" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            關於
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-4">
              AI Formula
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            我們是一個專注於人工智能教育的平台，致力於幫助個人和企業掌握AI技術，
            提升工作效率和創新能力。
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">我們的使命</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              在這個快速發展的數位時代，AI技術正在改變著我們的工作方式和生活方式。
              我們相信每個人都應該有機會學習和使用這些強大的工具。
              因此，我們創建了AI Formula，為您提供最實用、最前沿的AI學習資源。
            </p>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">為什麼選擇我們</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white text-center mb-12">我們的成績</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">我們的團隊</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-8 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">我們的願景</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                我們希望成為全球領先的AI教育平台，讓每個人都能輕鬆學習和應用人工智能技術。
                通過我們的課程和工具，您將能夠：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">掌握最新的AI技術和工具</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">提升工作效率和創新能力</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">建立競爭優勢，迎接未來挑戰</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">成為AI時代的領導者</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white mb-8">聯繫我們</h2>
          <p className="text-lg text-gray-300 mb-8">
            如果您有任何問題或建議，歡迎隨時與我們聯繫。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              發送郵件
            </motion.button>
            <motion.button
              className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              在線客服
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutCht; 
