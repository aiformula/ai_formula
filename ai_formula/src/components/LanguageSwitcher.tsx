import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLanguageChange = (newLang: 'en' | 'zh-HK') => {
    setLanguage(newLang);
    
    // Handle About page redirection
    if (location.pathname === '/about' && newLang === 'zh-HK') {
      navigate('/about-cht');
    } else if (location.pathname === '/about-cht' && newLang === 'en') {
      navigate('/about');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2"
    >
      <Globe className="w-4 h-4 text-gray-300" />
      <div className="flex rounded-full bg-gray-800/50 p-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
            language === 'en' 
              ? 'bg-yellow-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          EN
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLanguageChange('zh-HK')}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
            language === 'zh-HK' 
              ? 'bg-yellow-500 text-white' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          ф╕нц?
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(LanguageSwitcher);
