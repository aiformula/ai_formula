import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X, Settings } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  
  // 獲取用戶姓名首字母的函數
  const getUserInitials = (email: string | undefined) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };
  
  // 獲取用戶顯示名稱
  const getUserDisplayName = (email: string | undefined) => {
    if (!email) return 'User';
    return email.split('@')[0];
  };
  
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials(user?.email)}
                  </div>
                  <span className="text-white font-medium text-sm hidden lg:block">
                    {getUserDisplayName(user?.email)}
                  </span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-gray-900/95 backdrop-blur-sm border-gray-700 text-white"
              >
                <DropdownMenuLabel className="text-gray-300">
                  {t('userMenu.greeting')}, {getUserDisplayName(user?.email)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={() => navigate('/dashboard')}
                  className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('userMenu.dashboard')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/settings')}
                  className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('userMenu.settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={signOut}
                  className="hover:bg-red-900/50 focus:bg-red-900/50 cursor-pointer text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('userMenu.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline"
                className="border-white bg-white text-black hover:bg-yellow-500 hover:text-black hover:border-yellow-500 rounded-full px-6 font-medium transition-all duration-300"
              >
                {t('nav.signin')}
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
          {user && (
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getUserInitials(user?.email)}
            </div>
          )}
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
                  {/* 用戶問候 */}
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getUserInitials(user?.email)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{t('userMenu.greeting')}</p>
                      <p className="text-gray-400 text-sm">{getUserDisplayName(user?.email)}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white text-black hover:bg-yellow-500 rounded-lg py-3 text-base"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('userMenu.dashboard')}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      navigate('/settings');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-yellow-500 hover:text-black rounded-lg py-3 text-base"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t('userMenu.settings')}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-red-400 text-red-400 hover:bg-red-500 hover:text-white rounded-lg py-3 text-base"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('userMenu.signOut')}
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
                    {t('nav.signin')}
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
