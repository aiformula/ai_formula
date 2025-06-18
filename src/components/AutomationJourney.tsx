
import { motion } from "framer-motion";
import { Calendar, Code, Cog, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AutomationJourney = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Calendar,
      title: t('journey.step1.title'),
      description: t('journey.step1.description')
    },
    {
      icon: Code,
      title: t('journey.step2.title'),
      description: t('journey.step2.description')
    },
    {
      icon: Cog,
      title: t('journey.step3.title'),
      description: t('journey.step3.description')
    },
    {
      icon: Rocket,
      title: t('journey.step4.title'),
      description: t('journey.step4.description')
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
            {t('journey.title').split(' ').slice(0, 1).join(' ')} <span className="text-yellow-500">{t('journey.title').split(' ').slice(1).join(' ')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('journey.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.2 + 0.3, 
                    duration: 0.8,
                    type: "spring"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 5,
                    backgroundColor: "rgba(234, 179, 8, 0.3)"
                  }}
                  className="w-20 h-20 bg-yellow-500/10 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -5 }}
                  >
                    <step.icon className="w-10 h-10 text-yellow-500" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    delay: index * 0.2 + 0.5, 
                    duration: 0.6,
                    type: "spring"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#EAB308"
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300"
                >
                  {index + 1}
                </motion.div>
              </div>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ color: "#EAB308" }}
                className="text-xl font-bold text-white mb-4 transition-colors duration-300"
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-300 leading-relaxed"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationJourney;
