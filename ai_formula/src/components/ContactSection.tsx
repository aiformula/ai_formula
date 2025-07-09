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
    <section className="py-24 px-6 bg-gray-900 relative overflow-hidden">
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
                    {language === 'zh-TW' ? t('contact.form.message') : 'Message'}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 resize-none"
                    placeholder={language === 'zh-TW' ? t('contact.form.messagePlaceholder') : 'Tell us about your project or question...'}
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
