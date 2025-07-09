import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Bot, Zap, Building, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('toast.messageSent'),
      description: t('toast.messageDescription'),
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBrainstormClick = (suggestion: string) => {
    setFormData(prev => ({
      ...prev,
      message: suggestion
    }));
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: "hello@aiformula.com" },
    { icon: Phone, label: t('contact.info.phone'), value: "+1 (555) 123-4567" }
  ];

  const brainstormOptions = [
    { icon: Bot, text: t('contact.brainstorm.option1'), suggestion: t('contact.brainstorm.suggestion1') },
    { icon: Zap, text: t('contact.brainstorm.option2'), suggestion: t('contact.brainstorm.suggestion2') },
    { icon: Building, text: t('contact.brainstorm.option3'), suggestion: t('contact.brainstorm.suggestion3') },
    { icon: MessageSquare, text: t('contact.brainstorm.option4'), suggestion: t('contact.brainstorm.suggestion4') }
  ];

  const benefits = [
    t('contact.why.benefit1'),
    t('contact.why.benefit2'),
    t('contact.why.benefit3'),
    t('contact.why.benefit4')
  ];

  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
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
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t('contact.title').split(' ').slice(0, 2).join(' ')} <span className="text-yellow-500">{t('contact.title').split(' ').slice(2, 3).join(' ')}</span> {t('contact.title').split(' ').slice(3).join(' ')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-yellow-500/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-4">{t('contact.form.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="name" className="text-gray-300">{t('contact.form.name')}</Label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-[#111111] border-gray-700 text-white focus:border-yellow-500 focus:ring-yellow-500/20 mt-2"
                          placeholder={t('contact.form.name')}
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="email" className="text-gray-300">{t('contact.form.email')}</Label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-[#111111] border-gray-700 text-white focus:border-yellow-500 focus:ring-yellow-500/20 mt-2"
                          placeholder={t('contact.form.email')}
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Label htmlFor="message" className="text-gray-300">{t('contact.form.message')}</Label>
                      
                      {/* Brainstorming buttons */}
                      <div className="mt-2 mb-4">
                        <p className="text-sm text-gray-400 mb-3">{t('contact.brainstorm.title')}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {brainstormOptions.map((option, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              onClick={() => handleBrainstormClick(option.suggestion)}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 p-3 bg-[#111111] border border-gray-700 rounded-lg text-gray-300 hover:border-yellow-500/50 hover:text-yellow-400 transition-all duration-300 text-sm"
                            >
                              <option.icon className="w-4 h-4" />
                              {option.text}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                      >
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="bg-[#111111] border-gray-700 text-white focus:border-yellow-500 focus:ring-yellow-500/20 resize-none"
                          placeholder={t('contact.form.messagePlaceholder')}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        type="submit"
                        className="w-full bg-yellow-500 text-white hover:bg-yellow-600 font-semibold py-3 transition-all duration-300"
                      >
                        {t('contact.form.send')}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-6"
              >
                {t('contact.info.title')}
              </motion.h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div 
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "rgba(234, 179, 8, 0.2)",
                        rotate: 5
                      }}
                      className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <info.icon className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                    <div>
                      <div className="text-gray-300 text-sm">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8"
            >
              <motion.h4 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-white mb-4"
              >
                {t('contact.why.title')}
              </motion.h4>
              <ul className="space-y-3 text-gray-300">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-start space-x-3"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.3 
                      }}
                      className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"
                    />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
