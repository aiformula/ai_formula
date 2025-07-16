import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Trophy, Users2, Zap } from "lucide-react";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: (
        <span className="relative inline-block w-6 h-6">
          {/* Static clock face */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute top-0 left-0 w-6 h-6">
            <circle cx="12" cy="12" r="9" stroke="#FACC15" strokeWidth="2" fill="none" />
          </svg>
          {/* Rotating clock hand */}
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            className="absolute top-0 left-0 w-6 h-6"
            style={{ originX: "50%", originY: "50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <rect x="11.25" y="6" width="1.5" height="7" rx="0.75" fill="#FACC15" />
          </motion.svg>
        </span>
      ),
      title: "Save Valuable Time",
      description: "Say goodbye to repetitive tasks and focus your energy on more creative work."
    },
    {
      icon: (
        <motion.span
          className="inline-block w-6 h-6"
          animate={{ filter: ["brightness(1)", "brightness(2)", "brightness(1)"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-6 h-6" />
        </motion.span>
      ),
      title: "Boost Work Efficiency",
      description: "Learn to use the latest AI tools, such as Large Language Models and N8N automation workflows."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Increase Competitiveness",
      description: "Whether you are an individual or a company, mastering AI is your ticket to the future."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
      <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#121212' }}>
    <Navigation />
      
      {/* Hero Section */}
      <motion.div 
        className="max-w-6xl mx-auto pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Us
          </motion.h1>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="text-xl mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Welcome to AI Formula – your dedicated Hong Kong AI automation classroom and official experts!
            </motion.p>
            <motion.p 
              className="text-gray-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              In this era of rapid technological advancement, Artificial Intelligence (AI) is no longer a distant concept, 
              but a practical tool to enhance work efficiency and quality of life. AI Formula was born from a simple belief: 
              we want to make the power of AI easy to understand and accessible to every individual and business in Hong Kong 
              who wants to progress.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
            >
              <div className="text-yellow-400 mb-4 relative flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Who We Are Section */}
        <motion.div 
          className="bg-gray-900 rounded-xl p-8 mb-16 shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Users2 className="w-8 h-8 text-yellow-400 mr-4" />
            </motion.div>
            <h2 className="text-2xl font-bold">Who We Are?</h2>
          </motion.div>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            We are a team of AI enthusiasts and automation technology experts. We don't just teach theory – 
            we share real-world experience and provide comprehensive application strategies to ensure you can 
            immediately apply what you learn.
          </motion.p>
        </motion.div>

        {/* AI Tools Section */}
        <motion.div 
          className="bg-gray-900 rounded-xl p-8 mb-16 shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-yellow-400 mr-4" />
      </div>
            <h2 className="text-2xl font-bold">How Do We View AI Tools?</h2>
          </motion.div>
          <motion.p 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            The market is full of AI tools, from Large Language Models (ChatGPT, Gemini), image generation tools (Midjourney), 
            to automation workflows (N8N, Zapier). We believe there is no absolute "best" or "worst" tool – only the tool 
            that best fits your current needs.
          </motion.p>
          <motion.ul 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "In-depth analysis: We analyze core features, advantages, and potential limitations of each tool.",
              "Practical focus: We share tools that truly solve Hong Kong professionals' pain points.",
              "Honest insights: We provide first-hand test results and real-world experience."
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5 text-yellow-400 mr-2 mt-1" />
                </motion.div>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Services Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            What Do We Offer?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "AI Online Courses",
                description: "From beginner to advanced, covering practical AI tools and concepts."
              },
              {
                title: "Enterprise Solutions",
                description: "Custom automation solutions for your company."
              },
              {
                title: "One-on-One Consultation",
                description: "Answers to all your AI application questions."
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer shadow-[0_0_24px_2px_rgba(250,204,21,0.35)]"
              >
                <motion.h3 
                  className="text-xl font-bold mb-4 text-yellow-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
  </div>
);
};

export default About; 