import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Instagram, Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isZhTW = language === 'zh-HK';

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: isZhTW ? '訂閱成功！' : 'Subscription Successful!',
      description: isZhTW ? '感謝您的訂閱，我們會定期發送最新的AI資訊給您。' : 'Thank you for subscribing! We will send you the latest AI updates regularly.',
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  const footerLinks = {
    'zh-HK': {
      services: {
        title: '企業培訓',
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
        title: 'Enterprise Training',
        links: [
          { name: 'Consulting Services', href: '/about' }
        ]
      },
      about: {
        title: 'About Us',
        links: [
          { name: 'Company Info', href: '/about' },
          { name: 'Team Members', href: '/about' },
          { name: 'Contact Us', href: '/about' },
          { name: 'Blog', href: '/blog' }
        ]
      }
    }
  };

  const currentLinks = footerLinks[isZhTW ? 'zh-HK' : 'en'];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3EAI%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E✨%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              {isZhTW ? '香港最實用的 AI 課程' : 'Hong Kong\'s Most Practical AI Courses'}
            </h2>
            <p className="text-yellow-100 text-lg mb-8 leading-relaxed">
              {isZhTW 
                ? '我們分享真正的、正確的課程。學了就知道，知道就會用。跟住做，你一定做得到！這就是香港最實用的AI課程。' 
                : 'We share real, right courses. Learn it, know it, use it. Follow along and you can definitely do it! These are Hong Kong\'s most useful AI courses.'
              }
            </p>


          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-yellow-200">
                  {currentLinks.services.title}
                </h3>
                <ul className="space-y-2">
                  {currentLinks.services.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-yellow-200">
                  {currentLinks.about.title}
                </h3>
                <ul className="space-y-2">
                  {currentLinks.about.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-yellow-100 hover:text-yellow-300 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-yellow-600/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-yellow-200 text-sm">
                {isZhTW ? '追蹤我們：' : 'Follow us:'}
              </span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/aiformula.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-700/50 hover:bg-yellow-600/50 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5 text-yellow-200" />
                </a>
                <a
                  href="https://twitter.com/aiformula_hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-700/50 hover:bg-yellow-600/50 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5 text-yellow-200" />
                </a>
                <a
                  href="https://linkedin.com/company/aiformula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-700/50 hover:bg-yellow-600/50 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5 text-yellow-200" />
                </a>
                <a
                  href="https://youtube.com/@aiformula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-700/50 hover:bg-yellow-600/50 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Youtube className="w-5 h-5 text-yellow-200" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-yellow-300 text-sm">
              © AI Formula {new Date().getFullYear()}. {isZhTW ? '版權所有' : 'All Rights Reserved'}.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 