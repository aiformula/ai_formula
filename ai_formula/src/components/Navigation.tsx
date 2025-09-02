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
  
  // Define navigation items inside component to ensure re-evaluation on language change
  const navigationItems = [
    { id: 'home', label: t('nav.home'), path: '/' },
    { id: 'about', label: t('nav.about'), path: language === 'zh-HK' ? '/about-cht' : '/about' },
    { id: 'courses', label: t('nav.courses'), path: '/courses' },
    { id: 'tools', label: t('nav.tools'), path: '/tools' },
    { id: 'prompt-hub', label: t('nav.promptHub'), path: '/prompt-hub' },
    { id: 'blog', label: t('nav.blog'), path: '/blog' },
    { id: 'enterprise', label: language === 'zh-HK' ? '企業服務' : 'Enterprise', path: '/enterprise' }
  ];
  
  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-6 min-h-[80px] gap-4 lg:gap-6">
        {/* Logo - Enhanced with Professional Typography */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex-shrink-0"
          onClick={() => navigate('/')}
        >
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent whitespace-nowrap">
            AI FORMULA.
          </span>
        </motion.div>
        
        {/* Desktop Navigation - Enhanced Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
          className="hidden md:flex items-center space-x-3 lg:space-x-5 xl:space-x-7 flex-nowrap flex-1 justify-center"
        >
          {navigationItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${language}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={item.path}
                className={`text-xs md:text-sm lg:text-base font-medium hover:text-white transition-colors duration-300 whitespace-nowrap ${
                  (location.pathname === item.path || 
                   (location.pathname === '/about' && item.path === '/about-cht') ||
                   (location.pathname === '/about-cht' && item.path === '/about')) 
                  ? 'text-yellow-400 font-bold' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Desktop Auth Buttons - Enhanced Typography */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:flex items-center space-x-3 lg:space-x-4 flex-nowrap flex-shrink-0"
        >
          <LanguageSwitcher />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold text-base">
                    {getUserInitials(user?.email)}
                  </div>
                  <span className="text-white text-sm lg:text-base hidden lg:block whitespace-nowrap">
                    {getUserDisplayName(user?.email)}
                  </span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-gray-700">
                <DropdownMenuLabel className="text-base text-gray-300">
                  {t('userMenu.greeting')}, {getUserDisplayName(user?.email)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={() => navigate('/dashboard')}
                  className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer text-base"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('userMenu.dashboard')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate('/settings')}
                  className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer text-base"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('userMenu.settings')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="hover:bg-red-900/50 focus:bg-red-900/50 cursor-pointer text-red-300 text-base"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('userMenu.signOut')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-full px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap"
              >
                {t('nav.signin')}
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-white text-black hover:bg-yellow-500 hover:text-black rounded-full px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap"
              >
                {t('nav.signup')}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Mobile Elements - Enhanced Typography */}
        <div className="md:hidden flex items-center space-x-3 flex-nowrap">
          <LanguageSwitcher />
          {user && (
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-body">
              {getUserInitials(user?.email)}
            </div>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Enhanced Typography */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-sm z-40 md:hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {/* Mobile Navigation Links - Enhanced Typography */}
            {navigationItems.map((item) => (
              <Link
                key={`mobile-${item.id}-${language}`}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg font-medium py-4 px-4 rounded-lg transition-colors duration-300 ${
                  (location.pathname === item.path || 
                   (location.pathname === '/about' && item.path === '/about-cht') ||
                   (location.pathname === '/about-cht' && item.path === '/about')) 
                  ? 'text-yellow-400 font-bold bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons - Enhanced Typography */}
            <div className="pt-4 space-y-4">
              {user ? (
                <>
                  {/* 用戶問候 - Enhanced Typography */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {getUserInitials(user?.email)}
                    </div>
                    <div>
                      <p className="text-white text-base font-medium">{t('userMenu.greeting')}</p>
                      <p className="text-gray-400 text-sm">{getUserDisplayName(user?.email)}</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white text-black hover:bg-yellow-500 rounded-lg py-4 text-base"
                  >
                    <User className="w-5 h-5 mr-2" />
                    {t('userMenu.dashboard')}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      navigate('/settings');
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-yellow-500 hover:text-black rounded-lg py-4 text-base"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    {t('userMenu.settings')}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-red-400 text-red-400 hover:bg-red-500 hover:text-white rounded-lg py-4 text-base"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
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
                    className="w-full border-white text-white hover:bg-yellow-500 hover:text-black rounded-lg py-4 text-base"
                  >
                    {t('nav.signin')}
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-white text-black hover:bg-yellow-500 rounded-lg py-4 text-base"
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
