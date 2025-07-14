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
      title: "?³è?å¯¶è²´?‚é?",
      description: "?Šåˆ¥?è??§å?å·¥ä?ï¼Œå?ç²¾å??¾å–º?´æ??µé€ å??…åœ°?¹ã€?
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
      title: "?å?å·¥ä??ˆç?",
      description: "å­¸ç?ä½¿ç”¨?€?°å?AIå·¥å…·ï¼Œä?å¦‚å¤§?‹è?è¨€æ¨¡å??ŒN8N?ªå??–æ?ç¨‹ï?ä»¤ä??…å·¥ä½œæ?ç¨‹æ›´ä¸Šä?å±¤æ???
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "å¢å?ç«¶çˆ­?½å?",
      description: "?¡è?ä½ æ˜¯?‹äºº?„æ˜¯?¬å¸ï¼Œæ??¡AIå°±ç??¼æ??¡æœªä¾†ç??¥å ´?¸ã€?
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
            ?œæ–¼?‘å€?
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
              æ­¡è??Ÿåˆ° AI Formula - ä½ å?å±¬å?é¦™æ¸¯AI?ªå??–æ?å®¤å?å®˜æ–¹å°ˆå®¶ï¼?
            </motion.p>
            <motion.p 
              className="text-gray-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              ?¨é€™å€‹ç??€?¥æ–°?ˆç•°?„æ?ä»??äººå·¥?ºèƒ½ (AI) å·²ç?ä¸å??¯é?ä¸å¯?Šç?æ¦‚å¿µï¼Œè€Œæ˜¯?å?å·¥ä??ˆç??Œç?æ´»è³ªç´ ç?å¯¦ç”¨å·¥å…·??
              AI Formula ?„è??Ÿï?æºæ–¼ä¸€?‹ç°¡?®ç?ä¿¡å¿µï¼šæ??‘æƒ³å°‡å¼·å¤§ç?AI?›é?ï¼Œè?å¾—ç°¡?®æ??ï?å¸¶çµ¦é¦™æ¸¯æ¯ä??‹æƒ³?²æ­¥?„ä??Œä??„ä?æ¥­ã€?
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
            <h2 className="text-2xl font-bold">?‘å€‘æ˜¯èª°ï?</h2>
          </motion.div>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            ?‘å€‘æ˜¯ä¸€?­ç†±?›AI?å?æ³¨æ–¼?ªå??–æ?è¡“ç?å°ˆå®¶?‚æ??‘ä??®æ­¢?ƒæ?ä½ ç?è«–ï??´é?è¦ç??¯å?äº«å¯¦?°ç?é©—ï?
            ?ä??¨æ–¹ä½å??‰ç”¨?»ç•¥ï¼Œç¢ºä¿ä?å­¸åˆ°?…çŸ¥è­˜éƒ½?¯ä»¥?³æ??‰ç”¨??
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
            <h2 className="text-2xl font-bold">?‘å€‘æ€æ¨£?‹AIå·¥å…·ï¼?/h2>
          </motion.div>
          <motion.p 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            å¸‚é¢ä¸Šå?AIå·¥å…·äº”èŠ±?«é?ï¼Œç”±å¤§å?èªè?æ¨¡å? (ChatGPT, Gemini)ï¼Œç¹ª?–å·¥??(Midjourney)ï¼?
            ?°è‡ª?•å?æµç? (N8N, Zapier) ?‰æ??¡æ??‚æ??‘æ·±ä¿¡ï?æ²’æ?çµ•å??Œæ?å¥½ã€æ??…ã€Œæ?å£ã€å?å·¥å…·ï¼?
            ?ªæ??Œæ??©å??ä??¶ä??€è¦å?å·¥å…·??
          </motion.p>
          <motion.ul 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "æ·±å…¥?–æ?ï¼šå??®æ­¢è©±ä??¥é??¨ï?ä»²æ??Œä??†æ?æ¯å€‹å·¥?·å??¸å??Ÿèƒ½?å„ªé»å??‹æ??¨å?ç¼ºé???,
              "å°ˆæ³¨å¯¦ç”¨ï¼šæ??‘æ??†ä¸­?†äº«?½å??Ÿæ­£è§?±ºé¦™æ¸¯äººå·¥ä½œç?é»å?å·¥å…·??,
              "?†äº«?Ÿå¯¦è³‡è?ï¼šæ??‘æ?å°‡ç¬¬ä¸€?‹å?æ¸¬è©¦çµæ??Œå¯¦?°å?å¾—ï??¦ç™½?å?äº«ä¿¾ä½ ã€?
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
            ?‘å€‘æ?ä¾›ä?éº¼ï?
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
                title: "AIç·šä?èª²ç?",
                description: "?±æ·º?¥æ·±ï¼Œæ¶µ?‹å?ç¨®å¯¦?¨AIå·¥å…·?Œæ?å¿µã€?
              },
              {
                title: "ä¼æ¥­?ªå??–æ–¹æ¡?,
                description: "?ºä??…å…¬?¸åº¦èº«è?? è‡ª?•å??¹æ???
              },
              {
                title: "ä¸€å°ä?è«®è©¢",
                description: "è§??ä½ å–º?‰ç”¨AI?‚é??°å??„ç¨®?‘é›£?œç???
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
