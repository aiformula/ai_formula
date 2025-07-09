
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cog, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100
      } 
    }
  };

  const services = [
    {
      id: 'training',
      icon: Brain,
      title: t('services.training.title'),
      description: t('services.training.description'),
      benefits: [t('services.training.benefit1'), t('services.training.benefit2'), t('services.training.benefit3')],
      buttonText: t('services.training.button')
    },
    {
      id: 'automation',
      icon: Cog,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      benefits: [t('services.automation.benefit1'), t('services.automation.benefit2'), t('services.automation.benefit3')],
      buttonText: t('services.automation.button')
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#0f0f0f]">
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
            {t('services.title').includes(' ') 
              ? <>
                  {t('services.title').split(' ').slice(0, 1).join(' ')} <span className="text-yellow-500">{t('services.title').split(' ').slice(1).join(' ')}</span>
                </>
              : <>
                  {t('services.title').slice(0, 3)} <span className="text-yellow-500">{t('services.title').slice(3)}</span>
                </>
            }
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-[#1a1a1a] border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 h-full">
                <CardHeader className="text-center pb-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4, type: "spring" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                                          className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                                          <service.icon className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {service.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={`${service.id}-benefit-${benefitIndex}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.2 + 0.8 + benefitIndex * 0.1 
                        }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-300">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 font-semibold transition-all duration-300">
                      {service.buttonText}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ServicesSection);
