import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
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

  const footerLinks = {
    'zh-HK': {
      services: {
        title: '企業服務',
        links: [
          { name: '顧問服務', href: '/about' }
        ]
      },
      about: {
        title: '關於我們',
        links: [
          { name: '公司介紹', href: '/about' },
          { name: '團隊成員', href: '/about' },
          { name: '聯絡我們', href: '/about' },
          { name: '部落格', href: '/blog' }
        ]
      }
    },
    'en': {
      services: {
        title: 'Business Services',
        links: [
          { name: 'Consulting Services', href: '/about' }
        ]
      },
      about: {
        title: 'About Us',
        links: [
          { name: 'Company Introduction', href: '/about' },
          { name: 'Team Members', href: '/about' },
          { name: 'Contact Us', href: '/about' },
          { name: 'Blog', href: '/blog' }
        ]
      }
    }
  };

  const currentLinks = footerLinks[language as keyof typeof footerLinks];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI FORMULA
            </h3>
            <p className="text-gray-300 text-sm">
              {isZhHK 
                ? '專為香港專業人士設計的實用AI培訓，學習能立即幫助您節省時間和提高效率的AI技能'
                : 'Practical AI training designed for Hong Kong professionals. Learn AI skills that immediately help you save time and boost efficiency'
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentLinks.services.title}
            </h4>
            <ul className="space-y-2">
              {currentLinks.services.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {currentLinks.about.title}
            </h4>
            <ul className="space-y-2">
              {currentLinks.about.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400">
              {isZhHK ? '訂閱電子報' : 'Newsletter'}
            </h4>
            <p className="text-gray-300 text-sm">
              {isZhHK 
                ? '獲取最新的AI更新和課程公告'
                : 'Get the latest AI updates and course announcements'
              }
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isZhHK ? '輸入您的電子郵件' : 'Enter your email'}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (isZhHK ? '提交中...' : 'Submitting...')
                  : (isZhHK ? '訂閱' : 'Subscribe')
                }
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="text-yellow-400" size={20} />
              <div>
                <p className="text-gray-300 text-sm">
                  {isZhHK ? '電子郵件' : 'Email'}
                </p>
                <p className="text-white font-medium">info@aiformula.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-yellow-400" size={20} />
              <div>
                <p className="text-gray-300 text-sm">
                  {isZhHK ? '電話' : 'Phone'}
                </p>
                <p className="text-white font-medium">+852 9123 4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-yellow-400" size={20} />
              <div>
                <p className="text-gray-300 text-sm">
                  {isZhHK ? '地址' : 'Address'}
                </p>
                <p className="text-white font-medium">
                  {isZhHK ? '香港' : 'Hong Kong'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AI Formula. {isZhHK ? '版權所有' : 'All rights reserved'}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
