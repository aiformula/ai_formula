import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'zh-HK' ? '多謝你的留言！我們會盡快回覆。' : 'Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'zh-HK' ? t('contact.info.emailUs') : 'Email Us',
      content: 'info@aiformula.com',
      description: language === 'zh-HK' ? t('contact.info.emailDescription') : 'Get quick responses to your questions'
    },
    {
      icon: Phone,
      title: language === 'zh-HK' ? t('contact.info.callUs') : 'Call Us',
      content: '+852 9123 4567',
      description: language === 'zh-HK' ? t('contact.info.phoneDescription') : 'Mon-Fri 9AM-6PM HKT'
    },
    {
      icon: MapPin,
      title: language === 'zh-HK' ? t('contact.info.visitUs') : 'Visit Us',
      content: 'Hong Kong',
      description: language === 'zh-HK' ? t('contact.info.visitDescription') : 'Schedule an appointment'
    }
  ];

  return (
    <section 
      className="relative py-16"
      style={{ 
        backgroundColor: '#121212',
        padding: 'var(--space-16) 0' // 統一區塊間距
      }}
    >
      <div 
        className="max-w-7xl mx-auto px-6"
        style={{ padding: '0 var(--space-6)' }} // 統一容器內邊距
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: 'var(--space-16)' }} // 統一標題下方間距
        >
          <h2 
            className="font-bold text-white"
            style={{
              fontSize: 'var(--text-6xl)', // 使用統一 H2 字體大小
              fontWeight: 'var(--font-bold)',
              lineHeight: 'var(--leading-tight)',
              marginBottom: 'var(--space-4)'
            }}
          >
            {language === 'zh-HK' ? t('contact.title') : 'Get In Touch'}
          </h2>
          <p 
            className="text-gray-300 max-w-2xl mx-auto"
            style={{
              fontSize: 'var(--text-xl)', // 統一副標題字體
              fontWeight: 'var(--font-normal)',
              lineHeight: 'var(--leading-normal)'
            }}
          >
            {language === 'zh-HK' ? t('contact.subtitle') : 'Ready to transform your business with AI?'}
          </p>
        </motion.div>

        {/* 🎯 統一聯繫卡片系統 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
          style={{ 
            gap: 'var(--space-8)', // 統一卡片間距
            marginBottom: 'var(--space-16)' // 統一與表單的間距
          }}
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
              {/* 🎯 統一卡片設計 */}
              <Card 
                className="bg-gray-800 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
                style={{
                  borderRadius: 'var(--radius-lg)', // 統一卡片圓角
                  backgroundColor: 'rgba(31, 41, 55, 1)', // 統一卡片背景
                  border: '1px solid rgba(75, 85, 99, 1)'
                }}
              >
                <CardContent 
                  style={{ 
                    padding: 'var(--card-padding-md)', // 統一卡片內邊距 24px
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-4)' // 統一內部元素間距
                  }}
                >
                  {/* 統一圖標設計 */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center"
                    style={{
                      width: 'var(--space-16)', // 64px 統一圖標容器大小
                      height: 'var(--space-16)',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    <info.icon 
                      className="text-white" 
                      style={{
                        width: 'var(--space-8)', // 32px 統一圖標大小
                        height: 'var(--space-8)'
                      }}
                    />
                  </motion.div>
                  
                  {/* 統一文字層級 */}
                  <h3 
                    className="font-bold text-white"
                    style={{
                      fontSize: 'var(--text-xl)', // 統一標題字體
                      fontWeight: 'var(--font-bold)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {info.title}
                  </h3>
                  
                  <p 
                    className="text-yellow-500 font-medium"
                    style={{
                      fontSize: 'var(--text-base)', // 統一內容字體
                      fontWeight: 'var(--font-medium)',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    {info.content}
                  </p>
                  
                  <p 
                    className="text-gray-400"
                    style={{
                      fontSize: 'var(--text-sm)', // 統一描述字體
                      textAlign: 'center'
                    }}
                  >
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form - 統一表單設計 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card 
            className="bg-gray-800 border border-gray-700 hover:border-yellow-500/30 transition-all duration-300"
            style={{
              borderRadius: 'var(--radius-lg)', // 統一卡片圓角
              backgroundColor: 'rgba(31, 41, 55, 1)' // 統一卡片背景
            }}
          >
            <CardContent 
              style={{ 
                padding: 'var(--card-padding-lg)' // 32px 大卡片內邊距
              }}
            >
              <div 
                className="text-center"
                style={{ marginBottom: 'var(--space-8)' }}
              >
                <h3 
                  className="font-bold text-white"
                  style={{
                    fontSize: 'var(--text-2xl)', // 統一表單標題字體
                    fontWeight: 'var(--font-bold)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {language === 'zh-HK' ? t('contact.form.title') : 'Send Us a Message'}
                </h3>
                <p 
                  className="text-gray-300"
                  style={{
                    fontSize: 'var(--text-base)', // 統一表單描述字體
                    lineHeight: 'var(--leading-normal)'
                  }}
                >
                  {language === 'zh-HK' ? t('contact.form.description') : 'Fill out the form below and we\'ll get back to you within 24 hours'}
                </p>
              </div>

              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                style={{ gap: 'var(--space-6)' }}
              >
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-gray-300 font-medium"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-medium)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {language === 'zh-HK' ? '全名' : 'Full Name'}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500/20"
                    placeholder={language === 'zh-HK' ? '請輸入您的全名' : 'Enter your full name'}
                    style={{
                      height: 'var(--input-height-md)', // 40px 統一輸入框高度
                      padding: '0 var(--space-3)', // 0 12px 統一輸入框內邊距
                      fontSize: 'var(--text-base)', // 統一輸入框字體
                      borderRadius: 'var(--radius-md)' // 8px 統一輸入框圓角
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-gray-300 font-medium"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-medium)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {language === 'zh-HK' ? '電子郵件' : 'Email Address'}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500/20"
                    placeholder={language === 'zh-HK' ? '請輸入您的電子郵件地址' : 'Enter your email address'}
                    style={{
                      height: 'var(--input-height-md)', // 統一輸入框高度
                      padding: '0 var(--space-3)', // 統一輸入框內邊距
                      fontSize: 'var(--text-base)', // 統一輸入框字體
                      borderRadius: 'var(--radius-md)' // 統一輸入框圓角
                    }}
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-gray-300 font-medium"
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-medium)',
                      marginBottom: 'var(--space-2)'
                    }}
                  >
                    {language === 'zh-HK' ? '訊息' : 'Message'}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500/20"
                    placeholder={language === 'zh-HK' ? '請告訴我們您的需求...' : 'Tell us about your needs...'}
                    style={{
                      padding: 'var(--space-3)', // 12px 統一文字區域內邊距
                      fontSize: 'var(--text-base)', // 統一文字區域字體
                      borderRadius: 'var(--radius-md)', // 統一文字區域圓角
                      minHeight: '96px'
                    }}
                  />
                </div>
                
                {/* 🎯 統一按鈕設計 */}
                <Button 
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    height: 'var(--btn-height-lg)', // 48px 大按鈕高度
                    padding: '0 var(--btn-padding-x-lg)', // 0 24px 大按鈕內邊距
                    fontSize: 'var(--text-lg)', // 18px 統一按鈕字體
                    fontWeight: 'var(--font-semibold)', // 600 統一按鈕字重
                    borderRadius: 'var(--radius-md)', // 8px 統一按鈕圓角
                    width: '100%'
                  }}
                >
                  {language === 'zh-HK' ? '發送訊息' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
