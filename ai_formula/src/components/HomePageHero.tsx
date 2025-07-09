import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Instagram, Facebook, MessageCircle, LogOut, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import React from "react";

const HomePageHero = () => {
  const { t } = useLanguage();
  const { user, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.courses'), path: '/course' },
    { label: t('nav.blog'), path: '/blog' }
  ];
  
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
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate('/')}
        >
          AI FORMULA.
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={item.path}
                className={`text-gray-300 hover:text-white transition-colors ${
                  location.pathname === item.path ? 'text-yellow-500 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center space-x-4"
        >
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="border-white bg-white text-black hover:bg-yellow-500 hover:text-black hover:border-yellow-500 rounded-full px-6 font-medium transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button 
                onClick={signOut}
                variant="outline"
                className="border-white bg-white text-black hover:bg-yellow-500 hover:text-black hover:border-yellow-500 rounded-full px-6 font-medium transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline"
                className="border-white bg-white text-black hover:bg-yellow-500 hover:text-black hover:border-yellow-500 rounded-full px-6 font-medium transition-all duration-300"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-white text-black hover:bg-yellow-500 hover:text-black rounded-full px-6 font-medium transition-all duration-300"
              >
                {t('nav.signup')}
              </Button>
            </div>
          )}
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
              className="w-80 h-48 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-2xl flex items-center justify-center"
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
                <div className="text-yellow-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>


    </section>
  );
};

export default React.memo(HomePageHero);
