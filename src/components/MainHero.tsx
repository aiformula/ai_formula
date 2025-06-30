import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HomePageContent = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between px-8 max-w-7xl mx-auto w-full pt-20">
        <div className="flex-1 max-w-4xl">
          {/* AI Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2 mb-8"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-yellow-500 rounded-full"
            />
            <span className="text-gray-300 text-sm">{t('hero.badge')}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex items-center space-x-4 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3">
                  {t('hero.chooseProgram')}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600 rounded-full w-12 h-12"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex items-center space-x-6"
            >
              {[
                { name: 'INSTAGRAM', icon: Instagram, color: 'hover:text-pink-500' },
                { name: 'WHATSAPP', icon: MessageCircle, color: 'hover:text-yellow-500' },
                { name: 'FACEBOOK', icon: Facebook, color: 'hover:text-blue-500' }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`flex items-center space-x-2 text-gray-400 ${social.color} transition-all duration-300 cursor-pointer group`}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="transition-transform duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all duration-300">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - AI Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden lg:flex flex-1 justify-center items-center"
        >
          <div className="relative w-96 h-96">
            {/* Central AI Brain */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                scale: { duration: 3, repeat: Infinity },
                rotate: { duration: 4, repeat: Infinity }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🧠</span>
              </div>
            </motion.div>

            {/* Orbiting Elements */}
            {[
              { icon: "🤖", delay: 0, size: "w-16 h-16" },
              { icon: "⚡", delay: 0.5, size: "w-12 h-12" },
              { icon: "📊", delay: 1, size: "w-14 h-14" },
              { icon: "🔗", delay: 1.5, size: "w-10 h-10" }
            ].map((element, index) => (
              <motion.div
                key={index}
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear", delay: element.delay },
                  scale: { duration: 2, repeat: Infinity, delay: element.delay }
                }}
                className={`absolute ${element.size} bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-600`}
                style={{
                  top: `${50 + 35 * Math.cos(index * Math.PI / 2)}%`,
                  left: `${50 + 35 * Math.sin(index * Math.PI / 2)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="text-2xl">{element.icon}</span>
              </motion.div>
            ))}

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              <motion.circle
                cx="50%"
                cy="50%"
                r="140"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                animate={{ strokeDashoffset: [0, 20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePageContent; 