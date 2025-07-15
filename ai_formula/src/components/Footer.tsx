import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
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
          { name: 'AI 商業自動化', href: '/courses/ai-business-automation' },
          { name: '企業顧問服務', href: '/about#consulting' },
          { name: '一對一指導', href: '/about#mentoring' },
          { name: '工作坊培訓', href: '/about#workshops' }
        ]
      },
      learning: {
        title: '學習資源',
        links: [
          { name: '免費教學', href: '/blog?category=tutorial' },
          { name: 'AI工具評測', href: '/blog?category=tools' },
          { name: '案例研究', href: '/blog?category=case-study' },
          { name: '常見問題', href: '/support/faq' },
          { name: '學習指南', href: '/blog?category=guide' }
        ]
      },
      legal: {
        title: '法律資訊',
        links: [
          { name: '隱私政策', href: '/legal/privacy-policy' },
          { name: '服務條款', href: '/legal/terms-of-service' },
          { name: '退款政策', href: '/legal/refund-policy' },
          { name: '免責聲明', href: '/legal/disclaimer' },
          { name: '網站地圖', href: '/sitemap' }
        ]
      },
      support: {
        title: '客戶支援',
        links: [
          { name: '聯絡我們', href: '/contact' },
          { name: '技術支援', href: '/support' },
          { name: '課程支援', href: '/support/courses' },
          { name: '帳戶幫助', href: '/support/account' },
          { name: '建議反饋', href: '/feedback' }
        ]
      }
    },
    'en': {
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
          { name: 'AI Business Automation', href: '/courses/ai-business-automation' },
          { name: 'Enterprise Consulting', href: '/about#consulting' },
          { name: 'One-on-One Mentoring', href: '/about#mentoring' },
          { name: 'Workshop Training', href: '/about#workshops' }
        ]
      },
      learning: {
        title: 'Learning Resources',
        links: [
          { name: 'Free Tutorials', href: '/blog?category=tutorial' },
          { name: 'AI Tool Reviews', href: '/blog?category=tools' },
          { name: 'Case Studies', href: '/blog?category=case-study' },
          { name: 'FAQ', href: '/support/faq' },
          { name: 'Learning Guides', href: '/blog?category=guide' }
        ]
      },
      legal: {
        title: 'Legal Information',
        links: [
          { name: 'Privacy Policy', href: '/legal/privacy-policy' },
          { name: 'Terms of Service', href: '/legal/terms-of-service' },
          { name: 'Refund Policy', href: '/legal/refund-policy' },
          { name: 'Disclaimer', href: '/legal/disclaimer' },
          { name: 'Sitemap', href: '/sitemap' }
        ]
      },
      support: {
        title: 'Customer Support',
        links: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Technical Support', href: '/support' },
          { name: 'Course Support', href: '/support/courses' },
          { name: 'Account Help', href: '/support/account' },
          { name: 'Feedback', href: '/feedback' }
        ]
      }
    }
  };

  const currentSections = footerSections[language as keyof typeof footerSections];

  return (
    <footer className="bg-gray-900 text-white">

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI FORMULA
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isZhHK 
                ? '專為香港專業人士設計的實用AI培訓平台。我們致力於提供最新、最實用的AI知識和技能，幫助您在數碼轉型時代中保持競爭優勢。'
                : 'Practical AI training platform designed for Hong Kong professionals. We are committed to providing the latest and most practical AI knowledge and skills to help you stay competitive in the digital transformation era.'
              }
            </p>
            
            {/* Social Media Links with better engagement */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide">
                {isZhHK ? '關注我們' : 'Follow Us'}
              </h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/aiformula_hk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/aiformula.hk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/aiformula_hk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com/company/aiformula" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                  <Linkedin size={20} />
                </a>
                <a href="https://youtube.com/@aiformula_hk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Sections - Each takes 1 column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentSections.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentSections.services.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentSections.learning.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.learning.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentSections.support.title}
            </h4>
            <ul className="space-y-2">
              {currentSections.support.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section - Enhanced */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-yellow-400 mb-3">
                {isZhHK ? '訂閱 AI Formula 電子報' : 'Subscribe to AI Formula Newsletter'}
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                {isZhHK 
                  ? '獲取最新的AI趨勢分析、實用教學、課程優惠和香港商業案例。每週僅一封，絕不騷擾。'
                  : 'Get the latest AI trend analysis, practical tutorials, course offers and Hong Kong business cases. Only one email per week, no spam.'
                }
              </p>
              <div className="text-xs text-gray-400">
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
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
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



        {/* Legal Links Section - Enhanced for Trust */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {currentSections.legal.links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="hover:text-yellow-400 transition-colors hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
                         <div className="text-sm text-gray-400">
               <span>
                 {isZhHK ? '依據香港法律營運' : 'Operating under Hong Kong Law'}
               </span>
             </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
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
