
import { motion } from "framer-motion";

const TechnologyShowcase = () => {
  const technologies = [
    { name: "n8n", description: "Workflow Automation" },
    { name: "Make", description: "Integration Platform" },
    { name: "Zapier", description: "App Connections" },
    { name: "Python", description: "Data Processing" },
    { name: "JavaScript", description: "Web Development" },
    { name: "OpenAI", description: "AI Integration" }
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
            Powered by <span className="text-green-500">Leading Technologies</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We master the tools that drive modern business automation
          </motion.p>
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
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.08, 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div 
                whileHover={{ 
                  borderColor: "rgba(16, 185, 129, 0.5)",
                  boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.2), 0 10px 10px -5px rgba(16, 185, 129, 0.1)"
                }}
                className="w-20 h-20 bg-[#1a1a1a] border border-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300"
              >
                <motion.span 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-green-500"
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </motion.span>
              </motion.div>
              <motion.h3 
                whileHover={{ color: "#10B981" }}
                className="font-semibold text-white mb-1 transition-colors duration-300"
              >
                {tech.name}
              </motion.h3>
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
