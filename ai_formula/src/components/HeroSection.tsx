
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        padding: '0 var(--space-6)' // 24px 左右間距替換 px-6
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#111111] animate-pulse" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="font-bold leading-tight"
            style={{
              fontSize: 'clamp(var(--text-5xl), 8vw, var(--text-7xl))', // 響應式大標題：48px-72px
              fontWeight: 'var(--font-bold)', // 700 粗體
              lineHeight: 'var(--leading-tight)', // 1.25 緊密行高
              marginBottom: 'var(--space-6)' // 24px 下方間距
            }}
          >
            Master AI. <span className="text-[#FFC700]">Automate</span> Your Business.
          </h1>
          
          <p 
            className="text-gray-300 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(var(--text-xl), 3vw, var(--text-2xl))', // 響應式副標題：20px-24px
              fontWeight: 'var(--font-normal)',
              lineHeight: 'var(--leading-relaxed)', // 1.625 寬鬆行高
              marginBottom: 'var(--space-12)' // 48px 下方間距
            }}
          >
            AI Formula provides expert-led learning materials and builds bespoke automation solutions to drive growth and efficiency.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row justify-center items-center"
            style={{ gap: 'var(--space-6)' }} // 24px 按鈕間距
          >
            <Button 
              size="lg" 
              className="bg-[#FFC700] text-black hover:bg-[#FFD700] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FFC700]/20"
              style={{
                fontSize: 'var(--text-lg)', // 18px 大按鈕文字
                fontWeight: 'var(--font-semibold)' // 600 半粗體
              }}
            >
              Explore Learning Paths
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#FFC700] text-[#FFC700] hover:bg-[#FFC700] hover:text-black font-semibold transition-all duration-300 hover:scale-105"
              style={{
                fontSize: 'var(--text-lg)', // 18px 大按鈕文字
                fontWeight: 'var(--font-semibold)' // 600 半粗體
              }}
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
