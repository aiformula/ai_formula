import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Zap, Trophy, Users2, Target } from "lucide-react";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Valuable Time",
      description: "Specialized tools to help you focus and concentrate on any platform."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automate Work Processes", 
      description: "Learn to use various AI tools like Large Language Models and N8N automation workflows to streamline your work."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Intelligent Learning System",
      description: "Using the most advanced AI technology to provide you with personalized learning experiences and intelligent guidance."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Results-Oriented",
      description: "Focus on practical applications and effectiveness, ensuring the knowledge you learn can be directly applied to work."
    }
  ];

  const teamMembers = [
    {
      name: "Alex Lee",
      role: "Founder & CEO",
      bio: "Rich experience in AI and educational technology, committed to providing users with the best learning experience"
    },
    {
      name: "Sarah Wong",
      role: "Technical Director", 
      bio: "Expert in machine learning and natural language processing, responsible for platform technical architecture and innovation"
    },
    {
      name: "Michael Chen",
      role: "Education Director",
      bio: "PhD in Educational Psychology, focused on designing effective online learning courses and teaching methods"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50+", label: "Professional Courses" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Technical Support" }
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20 pt-32"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            About AI Formula
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl mb-4">
              Welcome to AI Formula – your dedicated Hong Kong AI automation classroom and official experts!
            </p>
            <p className="text-gray-400">
              In this era of rapid technological advancement, Artificial Intelligence (AI) is no longer a distant concept, 
              but a practical tool to enhance work efficiency and quality of life. AI Formula was born from a simple belief: 
              we want to make the power of AI easy to understand and accessible to every individual and business in Hong Kong 
              who wants to progress.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              In this fast-paced digital era, AI technology is changing our work and lifestyle. 
              We believe everyone should have the opportunity to learn and use these powerful tools. 
              Therefore, we created AI Formula to provide you with the most practical and cutting-edge AI learning resources.
            </p>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-yellow-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-yellow-400 mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          className="mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-lg p-8 border border-yellow-500/20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Vision</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                We aspire to become the world's leading AI education platform, enabling everyone to easily learn and apply 
                artificial intelligence technology. Through our courses and tools, you will be able to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Master the latest AI technologies and tools</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Enhance work efficiency and innovation capabilities</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Build competitive advantages and meet future challenges</p>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Become a leader in the AI era</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-8">
            If you have any questions or suggestions, feel free to contact us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Email
            </motion.button>
            <motion.button
              className="border border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Chat
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About; 
