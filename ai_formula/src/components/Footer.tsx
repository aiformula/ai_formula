import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isZhHK = language === 'zh-HK';

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: isZhHK ? '訂閱成功!' : 'Subscription Successful!',
      description: isZhHK ? '感謝您的訂閱，我們會定期發送最新的AI資訊給您！' : 'Thank you for subscribing! We will send you the latest AI updates regularly.',
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  const footerSections = {
    'zh-HK': {
      quickLinks: {
        title: '快速連結',
        links: [
          { name: '首頁', href: '/' },
          { name: '關於我們', href: '/about' },
          { name: '課程', href: '/courses' },
          { name: '部落格', href: '/blog' },
          { name: 'AI工具', href: '/tools' }
        ]
      },
      services: {
        title: '服務項目',
        links: [
          { name: '企業顧問服務', href: '/enterprise' },
          { name: '工作坊培訓', href: '/about#workshops' }
        ]
      },
      learning: {
        title: '學習資源',
        links: [
          { name: '免費教學', href: '/blog?category=tutorial' },
          { name: 'AI工具評測', href: '/tools' },
          { name: '常見問題', href: '/support/faq' }
        ]
      },
      support: {
        title: '客戶支援',
        links: [
          { name: '聯絡我們', href: '/contact' },
          { name: '技術支援', href: '/support' },
          { name: '建議反饋', href: '/feedback' }
        ]
      }
    },
    'en-GB': {
      quickLinks: {
        title: 'Quick Links',
        links: [
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: 'Courses', href: '/courses' },
          { name: 'Blog', href: '/blog' },
          { name: 'AI Tools', href: '/tools' }
        ]
      },
      services: {
        title: 'Our Services',
        links: [
          { name: 'Enterprise Consulting', href: '/enterprise' },
          { name: 'Workshop Training', href: '/about#workshops' }
        ]
      },
      learning: {
        title: 'Learning Resources',
        links: [
          { name: 'Free Tutorials', href: '/blog?category=tutorial' },
          { name: 'AI Tool Reviews', href: '/tools' },
          { name: 'FAQ', href: '/support/faq' }
        ]
      },
      support: {
        title: 'Customer Support',
        links: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Technical Support', href: '/support' },
          { name: 'Feedback', href: '/feedback' }
        ]
      }
    }
  };

  const currentSections = footerSections[language as keyof typeof footerSections];

  return (
    <footer className="text-white" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Newsletter Section - MOVED TO TOP */}
      <div className="bg-black/30 border-b border-gray-700">
        <div className="ai-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-h2 text-yellow-400 mb-3">
                {isZhHK ? '訂閱 AI Formula 電子報' : 'Subscribe to AI Formula Newsletter'}
              </h4>
              <p className="text-body mb-4">
                {isZhHK 
                  ? '獲取最新的AI趨勢分析、實用教學、課程優惠和香港商業案例。每週僅一封，絕不騷擾。'
                  : 'Get the latest AI trend analysis, practical tutorials, course offers and Hong Kong business cases. Only one email per week, no spam.'
                }
              </p>
              <div className="text-caption">
                <span>{isZhHK ? '我們保護您的隱私，隨時可取消訂閱' : 'We protect your privacy, unsubscribe anytime'}</span>
              </div>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isZhHK ? '輸入您的電子郵件地址' : 'Enter your email address'}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isSubmitting 
                    ? (isZhHK ? '提交中...' : 'Submitting...')
                    : (isZhHK ? '免費訂閱' : 'Subscribe Free')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content - REORGANIZED LAYOUT */}
      <div className="ai-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info - Takes 1 column, MOVED TO FIRST POSITION */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-h2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI FORMULA
            </h3>
            <p className="text-body leading-relaxed">
              {isZhHK 
                ? '專為香港專業人士設計的實用AI培訓平台。我們致力於提供最新、最實用的AI知識和技能，幫助您在數碼轉型時代中保持競爭優勢。'
                : 'Practical AI training platform designed for Hong Kong professionals. We are committed to providing the latest and most practical AI knowledge and skills to help you stay competitive in the digital transformation era.'
              }
            </p>
          </div>

          {/* REARRANGED SECTIONS - Swapped positions */}
          {/* Quick Links - Second position */}
          <div className="space-y-4">
            <h4 className="text-h3 text-yellow-400">
              {currentSections.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-body hover:text-yellow-400 transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Third position */}
          <div className="space-y-4">
            <h4 className="text-h3 text-yellow-400">
              {currentSections.services.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-body hover:text-yellow-400 transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Resources - Fourth position */}
          <div className="space-y-4">
            <h4 className="text-h3 text-yellow-400">
              {currentSections.learning.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.learning.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-body hover:text-yellow-400 transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support - Fifth position */}
          <div className="space-y-4">
            <h4 className="text-h3 text-yellow-400">
              {currentSections.support.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.support.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-body hover:text-yellow-400 transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links Section - Enhanced */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-4 text-caption">
              <Link to="/legal/privacy-policy" className="hover:text-yellow-400 transition-colors hover:underline">
                {isZhHK ? '隱私政策' : 'Privacy Policy'}
              </Link>
              <Link to="/legal/terms-of-service" className="hover:text-yellow-400 transition-colors hover:underline">
                {isZhHK ? '服務條款' : 'Terms of Service'}
              </Link>
              <Link to="/legal/refund-policy" className="hover:text-yellow-400 transition-colors hover:underline">
                {isZhHK ? '退款政策' : 'Refund Policy'}
              </Link>
              <Link to="/legal/disclaimer" className="hover:text-yellow-400 transition-colors hover:underline">
                {isZhHK ? '免責聲明' : 'Disclaimer'}
              </Link>
              <Link to="/sitemap" className="hover:text-yellow-400 transition-colors hover:underline">
                {isZhHK ? '網站地圖' : 'Sitemap'}
              </Link>
            </div>
            <div className="text-caption">
              <span>
                {isZhHK ? '依據香港法律營運' : 'Operating under Hong Kong Law'}
              </span>
            </div>
          </div>
        </div>

        {/* Copyright - Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-caption">
            © 2025 AI Formula. {isZhHK ? '版權所有' : 'All rights reserved'}.
            <span className="mx-2">|</span>
            {isZhHK ? '用心設計，專業製作' : 'Designed with care, built with expertise'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
