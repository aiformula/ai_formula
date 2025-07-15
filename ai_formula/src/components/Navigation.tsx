import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import React, { useState } from "react";

const Navigation = () => {
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: language === 'zh-HK' ? '/about-cht' : '/about' },
    { label: t('nav.courses'), path: '/courses' },
    { label: t('nav.tools'), path: '/tools' },
    { label: t('nav.blog'), path: '/blog' }
  ];
  
  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white font-bold text-lg md:text-xl cursor-pointer"
          onClick={() => navigate('/')}
        >
          AI FORMULA.
        </motion.div>
        
        {/* Desktop Navigation */}
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
                className={`text-gray-300 hover:text-white transition-colors text-base ${
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
        
        {/* Desktop Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:flex items-center space-x-4"
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

        {/* Mobile Elements */}
        <div className="md:hidden flex items-center space-x-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-sm z-40 md:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg py-3 px-4 rounded-lg transition-colors ${
                  (location.pathname === item.path || 
                   (location.pathname === '/about' && item.path === '/about-cht') ||
                   (location.pathname === '/about-cht' && item.path === '/about')) 
                  ? 'text-yellow-500 font-semibold bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3">
              {user ? (
                <>
                  <Button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white text-black hover:bg-yellow-500 rounded-lg py-3 text-base"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-yellow-500 hover:text-black rounded-lg py-3 text-base"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-yellow-500 hover:text-black rounded-lg py-3 text-base"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white text-black hover:bg-yellow-500 rounded-lg py-3 text-base"
                  >
                    {t('nav.signup')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default React.memo(Navigation); 
