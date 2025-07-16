import React, { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignUpForm } from '@/components/auth/SignUpForm'
import Navigation from '@/components/Navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { language } = useLanguage()

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  // 根據語言顯示不同的水印文字
  const watermarkWords = language === 'en' 
    ? ['KNOWLEDGE', 'SKILL', 'VISION']
    : ['知識', '技能', '視野']

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* Binary background pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='12'%3E1%3C/text%3E%3Ctext x='30' y='40' font-family='monospace' font-size='12'%3E0%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Auth Content */}
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5"></div>
        
        {/* Background Watermark - Large Brand Text */}
        <motion.div 
          className="background-watermark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {watermarkWords.map((word, index) => (
            <motion.h1
              key={word}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8 + index * 0.3,
                ease: "easeOut"
              }}
            >
              {word}
            </motion.h1>
          ))}
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignUpForm onToggleMode={toggleMode} />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Auth; 
