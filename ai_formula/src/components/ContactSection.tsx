import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'zh-TW' ? t('toast.messageSent') : 'Message Sent!',
      description: language === 'zh-TW' ? t('toast.messageDescription') : "Thank you for your interest. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'zh-TW' ? t('contact.info.emailUs') : 'Email Us',
      content: 'info@aiformula.com',
      description: language === 'zh-TW' ? t('contact.info.emailDescription') : 'Get quick responses to your questions'
    },
    {
      icon: Phone,
      title: language === 'zh-TW' ? t('contact.info.callUs') : 'Call Us',
      content: '+852 9123 4567',
      description: language === 'zh-TW' ? t('contact.info.phoneDescription') : 'Mon-Fri 9AM-6PM HKT'
    },
    {
      icon: MapPin,
      title: language === 'zh-TW' ? t('contact.info.visitUs') : 'Visit Us',
      content: 'Hong Kong',
      description: language === 'zh-TW' ? t('contact.info.visitDescription') : 'Schedule an appointment'
    }
  ];

  return (
    <section className="py-12 px-6 bg-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            {language === 'zh-TW' ? t('contact.title') : 'Ready to Transform Your Business?'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {language === 'zh-TW' ? t('contact.subtitle') : "Let's discuss how AI Formula can help you master AI and automate your business processes"}
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center"
            >
              <Card className="bg-gray-800 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 p-6">
                <CardContent className="p-0">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-yellow-500 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-400 text-sm">{info.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gray-800 border border-gray-700 hover:border-yellow-500/30 transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'zh-TW' ? t('contact.form.title') : 'Get In Touch'}
                </h3>
                <p className="text-gray-300">
                  {language === 'zh-TW' ? t('contact.form.description') : 'Fill out the form below and we\'ll get back to you within 24 hours'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    {language === 'zh-TW' ? t('contact.form.name') : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    {language === 'zh-TW' ? t('contact.form.email') : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">
                    {language === 'zh-TW' ? t('contact.form.message') : 'How can we help you?'}
                  </Label>
                  
                  {/* 建議按鈕 */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-3">
                      {language === 'zh-TW' ? '快速選擇常見問題：' : 'Quick select common questions:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          label: language === 'zh-TW' ? '我想查詢課程內容' : 'Course Content Inquiry',
                          text: language === 'zh-TW' 
                            ? '你好，我想了解更多關於 [請填寫課程名稱] 嘅內容，例如上堂時間、教學大綱等。'
                            : 'Hello, I would like to know more about [please specify course name] content, such as class schedule, curriculum, etc.'
                        },
                        {
                          label: language === 'zh-TW' ? '我唔知揀邊個課程好' : 'Course Selection Help',
                          text: language === 'zh-TW'
                            ? '你好，我嘅背景係 [請填寫你嘅職業或背景]，學習目標係想做到 [請填寫你嘅目標]，請問有邊個課程比較適合我？'
                            : 'Hello, my background is [please fill in your profession or background], and my learning goal is [please fill in your goal]. Which course would be most suitable for me?'
                        },
                        {
                          label: language === 'zh-TW' ? '我想了解企業培訓方案' : 'Corporate Training',
                          text: language === 'zh-TW'
                            ? '你好，我哋公司有興趣為員工提供AI培訓，想了解一下你哋嘅企業方案同報價。'
                            : 'Hello, our company is interested in providing AI training for employees. We would like to know more about your corporate packages and pricing.'
                        },
                        {
                          label: language === 'zh-TW' ? '我遇到付款/技術問題' : 'Payment/Technical Issues',
                          text: language === 'zh-TW'
                            ? '你好，我喺 [付款/登入/睇片] 時遇到問題，可唔可以幫我睇睇？'
                            : 'Hello, I encountered issues with [payment/login/video viewing]. Could you please help me with this?'
                        },
                        {
                          label: language === 'zh-TW' ? '我想查詢合作機會' : 'Partnership Opportunities',
                          text: language === 'zh-TW'
                            ? '你好，我哋想同你哋傾下合作，請問應該聯絡邊個部門？'
                            : 'Hello, we would like to discuss partnership opportunities. Which department should we contact?'
                        }
                      ].map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({ ...formData, message: suggestion.text })}
                          className="px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg border border-gray-600 hover:border-yellow-500/50 transition-all duration-200"
                        >
                          {suggestion.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 resize-none"
                    placeholder={language === 'zh-TW' 
                      ? '可以詳細話我哋知你嘅背景同學習目標，等我哋幫你揀最啱嘅課程。例如：我係一個平面設計師，想學AI繪圖，應該由邊個課程開始？'
                      : 'Please tell us about your background and learning goals so we can help you choose the most suitable course. For example: I am a graphic designer wanting to learn AI drawing, which course should I start with?'
                    }
                    required
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {language === 'zh-TW' ? t('contact.form.send') : 'Send Message'}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
