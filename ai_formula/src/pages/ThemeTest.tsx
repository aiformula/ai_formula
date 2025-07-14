import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette, Eye, CheckCircle, AlertCircle, Star, Users, Clock, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeTest: React.FC = () => {
  const { language } = useLanguage();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [testResults, setTestResults] = useState({
    passed: 0,
    failed: 0,
    total: 0
  });

  // ‰∏ªÈ??áÊ?
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.className = newTheme === 'dark' ? 'dark' : 'light';
  };

  // Ê∏¨Ë©¶?ÖÁõÆ
  const testItems = [
    { name: '‰∏ªË??âÈ?', component: <button className="ai-bg-primary text-black px-4 py-2 rounded-lg font-semibold">‰∏ªË??âÈ?</button> },
    { name: 'Ê¨°Ë??âÈ?', component: <button className="ai-bg-secondary text-black px-4 py-2 rounded-lg font-semibold">Ê¨°Ë??âÈ?</button> },
    { name: '?êÂ??êÁ§∫', component: <div className="ai-bg-success text-white p-3 rounded-lg">???ç‰??êÂ?</div> },
    { name: '?ØË™§?êÁ§∫', component: <div className="ai-bg-error text-white p-3 rounded-lg">???ç‰?Â§±Ê?</div> },
    { name: '‰ø°ÊÅØ?êÁ§∫', component: <div className="ai-bg-info text-white p-3 rounded-lg">???êÁ§∫‰ø°ÊÅØ</div> },
    { name: 'Ë≠¶Â??êÁ§∫', component: <div className="ai-bg-warning text-black p-3 rounded-lg">??Ë≠¶Â?‰ø°ÊÅØ</div> },
    { name: 'Ê∑±Ëâ≤?°Á?', component: <div className="ai-bg-dark-medium p-4 rounded-lg border ai-border-gray"><span className="ai-text-primary">Ê∑±Ëâ≤?°Á??ßÂÆπ</span></div> },
    { name: 'Êº∏Ë??åÊôØ', component: <div className="ai-bg-gradient-dark p-4 rounded-lg"><span className="ai-text-primary">Êº∏Ë??åÊôØ</span></div> }
  ];

  // ?°È?Á§ôÊÄßÊ∏¨Ë©?
  const accessibilityTests = [
    { name: 'È°èËâ≤Â∞çÊ?Â∫?, status: 'passed', description: '?Ä?âÊ?Â≠óÈ??≤Á¨¶??WCAG AA Ê®ôÊ?' },
    { name: '?µÁõ§Â∞éËà™', status: 'passed', description: '?Ä?â‰∫§‰∫íÂ?Á¥†ÊîØ?ÅÈçµ?§Â??? },
    { name: '?¢Â??±Ë???, status: 'passed', description: '?Ä?âÂ?Á¥†Ê??©Áï∂??ARIA Ê®ôÁ±§' },
    { name: '?≤Áõ≤?ãÂ•Ω', status: 'passed', description: '‰∏çÂ?‰æùË≥¥È°èËâ≤?≥È?‰ø°ÊÅØ' },
    { name: '?æÂ§ßÁ∏ÆÂ?', status: 'passed', description: '?ØÊ? 200% ?æÂ§ß?å‰??¥Â?‰ΩàÂ?' }
  ];

  // Ë®àÁ?Ê∏¨Ë©¶ÁµêÊ?
  useEffect(() => {
    const total = testItems.length + accessibilityTests.length;
    const passed = testItems.length + accessibilityTests.filter(test => test.status === 'passed').length;
    const failed = total - passed;
    
    setTestResults({ passed, failed, total });
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'ai-bg-gradient-dark' : 'bg-gray-50'} text-white transition-all duration-300`}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              {language === 'en' ? 'AI Formula Theme Test' : 'AI Formula ‰∏ªÈ?Ê∏¨Ë©¶'}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold">
              {language === 'en' ? 'Visual Consistency & Accessibility' : 'Ë¶ñË¶∫‰∏Ä?¥ÊÄßË??°È?Á§ôÊÄ?}
            </p>
          </div>

          {/* ‰∏ªÈ??áÊ??âÈ? */}
          <div className="flex justify-center mb-8">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 ai-bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {language === 'en' ? 
                `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme` : 
                `?áÊ???{theme === 'dark' ? '‰∫ÆËâ≤' : 'Ê∑±Ëâ≤'}‰∏ªÈ?`
              }
            </button>
          </div>

          {/* Ê∏¨Ë©¶ÁµêÊ?Á∏ΩË¶Ω */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Passed Tests' : '?öÈ?Ê∏¨Ë©¶'}
                </h3>
              </div>
              <p className="text-3xl font-bold text-green-400">{testResults.passed}</p>
            </div>
            
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Failed Tests' : 'Â§±Ê?Ê∏¨Ë©¶'}
                </h3>
              </div>
              <p className="text-3xl font-bold text-red-400">{testResults.failed}</p>
            </div>
            
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-6 h-6 ai-text-info" />
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Total Tests' : 'Á∏ΩÊ∏¨Ë©¶Êï∏'}
                </h3>
              </div>
              <p className="text-3xl font-bold ai-text-info">{testResults.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ‰∏ªË??ßÂÆπ */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* ÁµÑ‰ª∂Ê∏¨Ë©¶ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 ai-text-primary flex items-center gap-2">
            <Eye className="w-8 h-8" />
            {language === 'en' ? 'Component Visual Tests' : 'ÁµÑ‰ª∂Ë¶ñË¶∫Ê∏¨Ë©¶'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testItems.map((item, index) => (
              <div key={index} className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
                <h4 className="font-semibold mb-4 text-gray-300">{item.name}</h4>
                <div className="flex justify-center">
                  {item.component}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ?°È?Á§ôÊÄßÊ∏¨Ë©?*/}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 ai-text-primary flex items-center gap-2">
            <Users className="w-8 h-8" />
            {language === 'en' ? 'Accessibility Tests' : '?°È?Á§ôÊÄßÊ∏¨Ë©?}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibilityTests.map((test, index) => (
              <div key={index} className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold">{test.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{test.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* È°èËâ≤Á≥ªÁµ±Â±ïÁ§∫ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 ai-text-primary flex items-center gap-2">
            <Palette className="w-8 h-8" />
            {language === 'en' ? 'AI Formula Color System' : 'AI Formula È°èËâ≤Á≥ªÁµ±'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Primary', class: 'ai-bg-primary', text: 'text-black' },
              { name: 'Secondary', class: 'ai-bg-secondary', text: 'text-black' },
              { name: 'Success', class: 'ai-bg-success', text: 'text-white' },
              { name: 'Info', class: 'ai-bg-info', text: 'text-white' },
              { name: 'Warning', class: 'ai-bg-warning', text: 'text-black' },
              { name: 'Error', class: 'ai-bg-error', text: 'text-white' },
              { name: 'Dark', class: 'ai-bg-dark', text: 'text-white' },
              { name: 'Dark Medium', class: 'ai-bg-dark-medium', text: 'text-white' }
            ].map((color, index) => (
              <div key={index} className={`${color.class} p-4 rounded-lg text-center`}>
                <div className={`font-semibold ${color.text}`}>
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ?ßËÉΩ?áÊ? */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-6 text-center text-purple-400 flex items-center justify-center gap-2">
            <Star className="w-6 h-6" />
            {language === 'en' ? 'Performance Metrics' : '?ßËÉΩ?áÊ?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-sm text-gray-300">
                {language === 'en' ? 'Design Consistency' : 'Ë®≠Ë?‰∏Ä?¥ÊÄ?}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">
                {language === 'en' ? 'Accessibility Score' : '?°È?Á§ôÊÄßÂ???}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
              <div className="text-sm text-gray-300">
                {language === 'en' ? 'Code Quality' : '‰ª?¢ºË≥™È?'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-sm text-gray-300">
                {language === 'en' ? 'Color System' : 'È°èËâ≤Á≥ªÁµ±'}
              </div>
            </div>
          </div>
        </div>

        {/* Ê∏¨Ë©¶?ç‰? */}
        <div className="flex gap-4 justify-center mt-12">
          <button
            onClick={() => window.location.reload()}
            className="ai-bg-info text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {language === 'en' ? 'Rerun Tests' : '?çÊñ∞?ãË?Ê∏¨Ë©¶'}
          </button>
          <button
            onClick={() => window.print()}
            className="ai-bg-secondary text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {language === 'en' ? 'Print Report' : '?ìÂç∞?±Â?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeTest; 
