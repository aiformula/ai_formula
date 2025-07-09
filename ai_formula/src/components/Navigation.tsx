import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import React from "react";

const Navigation = () => {
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: language === 'zh-TW' ? '/about-cht' : '/about' },
    { label: t('nav.courses'), path: '/course' },
    { label: t('nav.blog'), path: '/blog' }
  ];
  
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-between px-8 py-6 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
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
                (location.pathname === item.path || 
                 (location.pathname === '/about' && item.path === '/about-cht') ||
                 (location.pathname === '/about-cht' && item.path === '/about')) 
                ? 'text-yellow-500 font-semibold' : ''
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
  );
};

export default React.memo(Navigation); 