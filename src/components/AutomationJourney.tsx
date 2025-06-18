
import { motion } from "framer-motion";
import { Calendar, Code, Cog, Rocket } from "lucide-react";

const AutomationJourney = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Discovery Call",
      description: "We understand your needs and identify automation opportunities"
    },
    {
      icon: Code,
      title: "Strategy & Design",
      description: "Create a detailed blueprint tailored to your business processes"
    },
    {
      icon: Cog,
      title: "Build & Integrate",
      description: "Develop and seamlessly integrate your custom automation solution"
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description: "Deploy your solution and provide ongoing support and optimization"
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
            Your <span className="text-green-500">Automation Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Our proven 4-step process ensures successful automation implementation
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
                    backgroundColor: "rgba(16, 185, 129, 0.3)"
                  }}
                  className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -5 }}
                  >
                    <step.icon className="w-10 h-10 text-green-500" />
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
                    backgroundColor: "#10B981"
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300"
                >
                  {index + 1}
                </motion.div>
              </div>
              
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ color: "#10B981" }}
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
