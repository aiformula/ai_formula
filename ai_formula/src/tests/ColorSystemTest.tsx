import React, { useState } from 'react';
import { CheckCircle, XCircle, Palette, Eye, Sun, Moon } from 'lucide-react';

interface ColorTestProps {
  name: string;
  variable: string;
  expectedColor: string;
  className?: string;
}

const ColorTest: React.FC<ColorTestProps> = ({ name, variable, expectedColor, className }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  React.useEffect(() => {
    // Ê™¢Êü• CSS ËÆäÈ??ØÂê¶Ê≠?¢∫ÂÆöÁæ©
    const style = getComputedStyle(document.documentElement);
    const actualColor = style.getPropertyValue(variable).trim();
    const isColorValid = actualColor === expectedColor || actualColor.toLowerCase() === expectedColor.toLowerCase();
    setIsValid(isColorValid);
  }, [variable, expectedColor]);

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-gray-600">
      <div 
        className={`w-12 h-12 rounded-lg border-2 border-gray-400 ${className}`}
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="flex-1">
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-gray-300">{variable}</p>
        <p className="text-xs text-gray-400">Expected: {expectedColor}</p>
      </div>
      <div className="flex items-center gap-2">
        {isValid === true && <CheckCircle className="w-5 h-5 text-green-400" />}
        {isValid === false && <XCircle className="w-5 h-5 text-red-400" />}
        {isValid === null && <div className="w-5 h-5 animate-spin border-2 border-gray-400 border-t-transparent rounded-full" />}
      </div>
    </div>
  );
};

const ColorSystemTest: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    total: number;
  }>({ passed: 0, failed: 0, total: 0 });

  // È°èËâ≤Ê∏¨Ë©¶?∏Ê?
  const colorTests = [
    { name: 'Primary Yellow', variable: '--ai-formula-primary', expectedColor: '#FFD600', className: 'ai-bg-primary' },
    { name: 'Primary Hover', variable: '--ai-formula-primary-hover', expectedColor: '#EAB308', className: 'ai-bg-primary-hover' },
    { name: 'Secondary Orange', variable: '--ai-formula-secondary', expectedColor: '#FFA500', className: 'ai-bg-secondary' },
    { name: 'Accent Red', variable: '--ai-formula-accent', expectedColor: '#FF6B6B', className: 'ai-bg-accent' },
    { name: 'Success Teal', variable: '--ai-formula-success', expectedColor: '#4ECDC4', className: 'ai-bg-success' },
    { name: 'Info Blue', variable: '--ai-formula-info', expectedColor: '#5DADE2', className: 'ai-bg-info' },
    { name: 'Warning Yellow', variable: '--ai-formula-warning', expectedColor: '#F7DC6F', className: 'ai-bg-warning' },
    { name: 'Error Red', variable: '--ai-formula-error', expectedColor: '#E74C3C', className: 'ai-bg-error' },
    { name: 'Dark Background', variable: '--ai-formula-dark', expectedColor: '#0f0f0f', className: 'ai-bg-dark' },
    { name: 'Dark Light', variable: '--ai-formula-dark-light', expectedColor: '#1a1a1a', className: 'ai-bg-dark-light' },
    { name: 'Dark Medium', variable: '--ai-formula-dark-medium', expectedColor: '#2a2a2a', className: 'ai-bg-dark-medium' },
    { name: 'Gray 600', variable: '--ai-formula-gray-600', expectedColor: '#6b7280', className: 'ai-bg-gray-600' },
    { name: 'Gray 300', variable: '--ai-formula-gray-300', expectedColor: '#d1d5db', className: 'ai-bg-gray-300' }
  ];

  // ÁµÑ‰ª∂Ê∏¨Ë©¶?∏Ê?
  const componentTests = [
    { name: 'Button Primary', component: <button className="ai-bg-primary ai-text-dark px-4 py-2 rounded">Primary Button</button> },
    { name: 'Button Secondary', component: <button className="ai-bg-secondary ai-text-dark px-4 py-2 rounded">Secondary Button</button> },
    { name: 'Alert Success', component: <div className="ai-bg-success ai-text-dark p-3 rounded">Success Message</div> },
    { name: 'Alert Error', component: <div className="ai-bg-error text-white p-3 rounded">Error Message</div> },
    { name: 'Card Dark', component: <div className="ai-bg-dark-medium ai-text-primary p-4 rounded border ai-border-gray">Dark Card</div> },
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    document.documentElement.className = theme === 'dark' ? 'ai-theme-light' : 'ai-theme-dark';
  };

  const runFullTest = () => {
    let passed = 0;
    let failed = 0;
    
    colorTests.forEach(test => {
      const style = getComputedStyle(document.documentElement);
      const actualColor = style.getPropertyValue(test.variable).trim();
      const isValid = actualColor === test.expectedColor || actualColor.toLowerCase() === test.expectedColor.toLowerCase();
      
      if (isValid) passed++;
      else failed++;
    });
    
    setTestResults({ passed, failed, total: colorTests.length });
  };

  React.useEffect(() => {
    runFullTest();
  }, []);

  return (
    <div className="min-h-screen ai-bg-gradient-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 ai-text-primary">AI Formula È°èËâ≤Á≥ªÁµ±Ê∏¨Ë©¶</h1>
          <p className="text-xl text-gray-300">È©óË?‰∏ªÈ??áÊ??åË?Ë¶∫‰??¥ÊÄ?/p>
        </div>

        {/* Test Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold">?öÈ?Ê∏¨Ë©¶</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{testResults.passed}</p>
          </div>
          
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold">Â§±Ê?Ê∏¨Ë©¶</h3>
            </div>
            <p className="text-3xl font-bold text-red-400">{testResults.failed}</p>
          </div>
          
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-6 h-6 ai-text-info" />
              <h3 className="text-lg font-semibold">Á∏ΩË?</h3>
            </div>
            <p className="text-3xl font-bold ai-text-info">{testResults.total}</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 ai-bg-primary ai-text-dark px-6 py-3 rounded-lg font-semibold hover:ai-bg-primary-hover transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            ?áÊ???{theme === 'dark' ? '‰∫ÆËâ≤' : 'Ê∑±Ëâ≤'} ‰∏ªÈ?
          </button>
        </div>

        {/* Color Variable Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 ai-text-primary flex items-center gap-2">
            <Palette className="w-6 h-6" />
            È°èËâ≤ËÆäÈ?Ê∏¨Ë©¶
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorTests.map((test, index) => (
              <ColorTest key={index} {...test} />
            ))}
          </div>
        </div>

        {/* Component Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 ai-text-primary flex items-center gap-2">
            <Eye className="w-6 h-6" />
            ÁµÑ‰ª∂Ë¶ñË¶∫Ê∏¨Ë©¶
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentTests.map((test, index) => (
              <div key={index} className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
                <h4 className="font-semibold mb-4 text-gray-300">{test.name}</h4>
                {test.component}
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 ai-text-primary">?°È?Á§ôÊÄßÊ∏¨Ë©?/h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <h3 className="text-lg font-semibold mb-4">Â∞çÊ?Â∫¶Ê∏¨Ë©?/h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="ai-text-primary">‰∏ªË??áÂ? (Primary)</span>
                  <span className="text-green-400">???öÈ?</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="ai-text-secondary">Ê¨°Ë??áÂ? (Secondary)</span>
                  <span className="text-green-400">???öÈ?</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="ai-text-accent">Âº∑Ë™ø?áÂ? (Accent)</span>
                  <span className="text-green-400">???öÈ?</span>
                </div>
              </div>
            </div>
            
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <h3 className="text-lg font-semibold mb-4">?≤Áõ≤?ãÂ•ΩÊ∏¨Ë©¶</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Á¥ÖÁ??≤Áõ≤</span>
                  <span className="text-green-400">???ØÊ?</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>?çÈ??≤Áõ≤</span>
                  <span className="text-green-400">???ØÊ?</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>?®Ëâ≤??/span>
                  <span className="text-green-400">???ØÊ?</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={runFullTest}
            className="ai-bg-info text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            ?çÊñ∞?ãË?Ê∏¨Ë©¶
          </button>
          <button
            onClick={() => window.location.reload()}
            className="ai-bg-secondary ai-text-dark px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            ?çÁΩÆÊ∏¨Ë©¶
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSystemTest; 
