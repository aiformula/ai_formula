
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-8 py-6"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white font-bold text-xl"
        >
          AI FORMULA.
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          {[t('nav.home'), t('nav.about'), t('nav.courses'), t('nav.blog')].map((item, index) => (
            <motion.a 
              key={item}
              href="#" 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, color: '#10B981' }}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center space-x-4"
        >
          <LanguageSwitcher />
          <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6">
            {t('nav.signup')}
          </Button>
        </motion.div>
      </motion.nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-between px-8 max-w-7xl mx-auto w-full">
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
              className="w-2 h-2 bg-green-500 rounded-full"
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
              className="flex items-center space-x-4"
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
                  className="bg-green-500 hover:bg-green-600 rounded-full w-12 h-12"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-80 h-48 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 rounded-full w-16 h-16 backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 text-white" fill="currentColor" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Statistics */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="px-8 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4, staggerChildren: 0.2 }}
            className="grid grid-cols-3 gap-12"
          >
            {[
              { number: "20+", label: t('hero.partners') },
              { number: "100k+", label: t('hero.students') },
              { number: "258+", label: t('hero.instructors') }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 2.8 + index * 0.2, type: "spring" }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-green-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Side text */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 hidden xl:block"
      >
        <div className="flex items-center space-x-8 text-sm text-gray-500">
          {['INSTAGRAM', 'WHATSAPP', 'FACEBOOK'].map((social, index) => (
            <motion.span
              key={social}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.2 + index * 0.1 }}
              whileHover={{ color: '#10B981', scale: 1.1 }}
              className="cursor-pointer"
            >
              {social}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
