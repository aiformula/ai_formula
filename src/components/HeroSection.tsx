
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] animate-pulse" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Master AI. <span className="text-[#FFC700]">Automate</span> Your Business.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI Formula provides expert-led learning materials and builds bespoke automation solutions to drive growth and efficiency.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-[#FFC700] text-black hover:bg-[#FFD700] font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFC700]/20"
            >
              Explore Learning Paths
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              Build My Automation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
