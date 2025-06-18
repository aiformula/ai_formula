
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by <span className="text-green-500">Leading Technologies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We master the tools that drive modern business automation
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
              <div className="w-20 h-20 bg-[#1a1a1a] border border-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:border-green-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/20">
                <span className="text-2xl font-bold text-green-500 group-hover:scale-110 transition-transform duration-300">
                  {tech.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-green-500 transition-colors duration-300">
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
