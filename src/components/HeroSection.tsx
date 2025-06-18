
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="text-white font-bold text-xl">
          AI FORMULA.
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Courses</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
        </div>
        
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6">
          Sign up
        </Button>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-between px-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 max-w-4xl">
          {/* AI Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">AI in Business</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              AI: The <span className="text-green-500">Future</span> of <br />
              Learning
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              How artificial intelligence is personalizing and transforming business automation.
            </p>
            
            <div className="flex items-center space-x-4">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3">
                Choose program
              </Button>
              <Button 
                size="icon"
                className="bg-green-500 hover:bg-green-600 rounded-full w-12 h-12"
              >
                <Play className="w-5 h-5" fill="currentColor" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Video Preview */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="w-80 h-48 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Button 
                size="icon"
                className="bg-white/20 hover:bg-white/30 rounded-full w-16 h-16 backdrop-blur-sm"
              >
                <Play className="w-8 h-8 text-white" fill="currentColor" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-green-500 text-sm">Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100k+</div>
              <div className="text-green-500 text-sm">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">258+</div>
              <div className="text-green-500 text-sm">Instructors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Side text */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90 hidden xl:block">
        <div className="flex items-center space-x-8 text-sm text-gray-500">
          <span>INSTAGRAM</span>
          <span>WHATSAPP</span>
          <span>FACEBOOK</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
