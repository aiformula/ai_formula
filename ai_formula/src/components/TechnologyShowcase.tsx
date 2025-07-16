
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const TechnologyShowcase = () => {
  const { language, t } = useLanguage();
  
  const technologies = [
    { name: "n8n", description: language === 'zh-HK' ? t('tech.n8n') : "Workflow Automation" },
    { name: "Make", description: language === 'zh-HK' ? t('tech.make') : "Integration Platform" },
    { name: "Zapier", description: language === 'zh-HK' ? t('tech.zapier') : "App Connections" },
    { name: "Python", description: language === 'zh-HK' ? t('tech.python') : "Data Processing" },
    { name: "JavaScript", description: language === 'zh-HK' ? t('tech.javascript') : "Web Development" },
    { name: "OpenAI", description: language === 'zh-HK' ? t('tech.openai') : "AI Integration" }
  ];

  return (
    <section className="py-12 px-6" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'zh-HK' ? (
              <>
                {t('tech.title').split(' ')[0]}{' '}
                <span className="text-[#FFC700]">{t('tech.title').split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              <>
                Powered by <span className="text-[#FFC700]">Leading Technologies</span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'zh-HK' ? t('tech.subtitle') : 'We master the tools that drive modern business automation'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className="w-20 h-20 bg-[#1a1a1a] border border-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:border-[#FFC700]/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#FFC700]/20">
                <span className="text-2xl font-bold text-[#FFC700] group-hover:scale-110 transition-transform duration-300">
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-[#FFC700] transition-colors duration-300">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-400">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
