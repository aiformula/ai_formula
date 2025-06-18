
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your <span className="text-green-500">Automation Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 4-step process ensures successful automation implementation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-500/20 transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-10 h-10 text-green-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationJourney;
