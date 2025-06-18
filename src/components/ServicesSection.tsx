
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cog, CheckCircle } from "lucide-react";

const ServicesSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
            Our <span className="text-green-500">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your path to AI mastery and business automation excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 h-full">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                  Expert-Led AI Training
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Comprehensive learning materials designed by industry experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {["Actionable Courses", "Practical Frameworks", "Team Upskilling"].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600 font-semibold transition-all duration-300">
                  View Courses
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-[#1a1a1a] border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 h-full">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cog className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                  Bespoke Automation Solutions
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Custom-built automation systems tailored to your business needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {["Increase Efficiency", "Reduce Errors", "Scale Operations"].map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-green-500 text-white hover:bg-green-600 font-semibold transition-all duration-300">
                  Get Free Consultation
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
