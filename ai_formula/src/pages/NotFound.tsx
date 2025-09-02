import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ExternalLink, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4" style={{ backgroundColor: '#121212' }}>
      {/* Background decoration */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <motion.div
        {...fadeIn}
        className="max-w-2xl w-full relative z-10 text-center"
      >
        {/* Main error card */}
        <Card className="bg-gray-900/80 border-gray-700 mb-8 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <AlertTriangle className="h-24 w-24 text-red-400" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {t('notFound.error404')}
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-2">
              {t('notFound.title')}
            </CardTitle>
            <CardDescription className="text-xl text-gray-300 mb-4">
              {t('notFound.subtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              {t('notFound.description')}
            </p>
            
            {/* Error details */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-sm border border-gray-700/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">{t('notFound.currentPath')}:</span>
                  <code className="ml-2 text-red-300 bg-gray-700/50 px-2 py-1 rounded text-xs">
                    {location.pathname}
                  </code>
                </div>
                <div>
                  <span className="text-gray-400">{t('notFound.timestamp')}:</span>
                  <span className="ml-2 text-gray-300">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold transition-all duration-300 px-6 py-3"
              >
                <Home className="w-4 h-4 mr-2" />
                {t('notFound.backToHome')}
              </Button>
              
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-4">
                {t('notFound.quickLinks')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors"
                >
                  {t('nav.home')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/courses')}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors"
                >
                  {t('nav.courses')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/tools')}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors"
                >
                  {t('nav.tools')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/blog')}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-colors"
                >
                  {t('nav.blog')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-400 mb-3">
                {t('notFound.needHelp')}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600/50 text-blue-400 hover:bg-blue-900/20 hover:border-blue-500"
                  onClick={() => {
                    // In real application, this would open contact form
                    window.location.href = 'mailto:support@aiformula.com';
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  {t('notFound.contactSupport')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
