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
          {/* Static clock face */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="var(--ai-formula-primary)" strokeWidth="2" fill="none" />
            <circle cx="12" cy="7" r="1.5" fill="var(--ai-formula-primary)" />
            <rect x="11.25" y="6" width="1.5" height="7" rx="0.75" fill="var(--ai-formula-primary)" />
          </svg>
          {/* Rotating clock hand */}
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
      title: "?��?寶貴?��?",
      description: "?�別?��??��?工�?，�?精�??�喺?��??�造�??�地?��?
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
      title: "?��?工�??��?",
      description: "學�?使用?�?��?AI工具，�?如大?��?言模�??�N8N?��??��?程�?令�??�工作�?程更上�?層�???
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "增�?競爭?��?",
      description: "?��?你是?�人?�是?�司，�??�AI就�??��??�未來�??�場?��?
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <motion.div 
        className="max-w-6xl mx-auto pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ?�於?��?
          </motion.h1>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="text-xl mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              歡�??�到 AI Formula - 你�?屬�?香港AI?��??��?室�?官方專家�?
            </motion.p>
            <motion.p 
              className="text-gray-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ?�這個�??�?�新?�異?��?�??人工?�能 (AI) 已�?不�??��?不可?��?概念，而是?��?工�??��??��?活質素�?實用工具??
              AI Formula ?��??��?源於一?�簡?��?信念：�??�想將強大�?AI?��?，�?得簡?��??��?帶給香港每�??�想?�步?��??��??��?業�?
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
            >
              <div className="text-yellow-400 mb-4 relative flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Who We Are Section */}
        <motion.div 
          className="bg-gray-900 rounded-xl p-8 mb-16 shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Users2 className="w-8 h-8 text-yellow-400 mr-4" />
            </motion.div>
            <h2 className="text-2xl font-bold">?�們是誰�?</h2>
          </motion.div>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            ?�們是一?�熱?�AI?��?注於?��??��?術�?專家?��??��??�止?��?你�?論�??��?要�??��?享實?��?驗�?
            ?��??�方位�??�用?�略，確保�?學到?�知識都?�以?��??�用??
          </motion.p>
        </motion.div>

        {/* AI Tools Section */}
        <motion.div 
          className="bg-gray-900 rounded-xl p-8 mb-16 shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-yellow-400 mr-4" />
            </div>
            <h2 className="text-2xl font-bold">?�們怎樣?�AI工具�?/h2>
          </motion.div>
          <motion.p 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            市面上�?AI工具五花?��?，由大�?語�?模�? (ChatGPT, Gemini)，繪?�工??(Midjourney)�?
            ?�自?��?流�? (N8N, Zapier) ?��??��??��??�深信�?沒�?絕�??��?好」�??�「�?壞」�?工具�?
            ?��??��??��??��??��??�要�?工具??
          </motion.p>
          <motion.ul 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "深入?��?：�??�止話�??��??��?仲�??��??��?每個工?��??��??�能?�優點�??��??��?缺�???,
              "專注實用：�??��??�中?�享?��??�正�?��香港人工作�?點�?工具??,
              "?�享?�實資�?：�??��?將第一?��?測試結�??�實?��?得�??�白?��?享俾你�?
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5 text-yellow-400 mr-2 mt-1" />
                </motion.div>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            ?�們�?供�?麼�?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "AI線�?課�?",
                description: "?�淺?�深，涵?��?種實?�AI工具?��?念�?
              },
              {
                title: "企業?��??�方�?,
                description: "?��??�公?�度身�??�自?��??��???
              },
              {
                title: "一對�?諮詢",
                description: "�??你喺?�用AI?��??��??�種?�難?��???
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
              >
                <motion.h3 
                  className="text-xl font-bold mb-4 text-yellow-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutCht; 
