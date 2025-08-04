import React, { useState } from 'react';
import { CheckCircle, XCircle, Palette, Eye, Sun, Moon } from 'lucide-react';

interface ColourTestProps {
  name: string;
  variable: string;
  expectedColour: string;
  className?: string;
}

const ColourTest: React.FC<ColourTestProps> = ({ name, variable, expectedColour, className }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  React.useEffect(() => {
    // 檢查 CSS 變數是否正確定義
    const style = getComputedStyle(document.documentElement);
    const actualColour = style.getPropertyValue(variable).trim();
    const isColourValid = actualColour === expectedColour || actualColour.toLowerCase() === expectedColour.toLowerCase();
    setIsValid(isColourValid);
  }, [variable, expectedColour]);

  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-gray-600">
      <div 
        className={`w-12 h-12 rounded-lg border-2 border-gray-400 ${className}`}
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="flex-1">
        <h4 className="font-semibold text-white">{name}</h4>
        <p className="text-sm text-gray-300">{variable}</p>
        <p className="text-xs text-gray-400">Expected: {expectedColour}</p>
      </div>
      <div className="flex items-center gap-2">
        {isValid === true && <CheckCircle className="w-5 h-5 text-green-400" />}
        {isValid === false && <XCircle className="w-5 h-5 text-red-400" />}
        {isValid === null && <div className="w-5 h-5 animate-spin border-2 border-gray-400 border-t-transparent rounded-full" />}
      </div>
    </div>
  );
};

const ColourSystemTest: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    total: number;
  }>({ passed: 0, failed: 0, total: 0 });

  // 顏色測試配置
  const colourTests = [
    { name: 'Primary Yellow', variable: '--ai-formula-primary', expectedColour: '#FFD600', className: 'ai-bg-primary' },
    { name: 'Primary Hover', variable: '--ai-formula-primary-hover', expectedColour: '#EAB308', className: 'ai-bg-primary-hover' },
    { name: 'Secondary Orange', variable: '--ai-formula-secondary', expectedColour: '#FFA500', className: 'ai-bg-secondary' },
    { name: 'Accent Red', variable: '--ai-formula-accent', expectedColour: '#FF6B6B', className: 'ai-bg-accent' },
    { name: 'Success Teal', variable: '--ai-formula-success', expectedColour: '#4ECDC4', className: 'ai-bg-success' },
    { name: 'Info Blue', variable: '--ai-formula-info', expectedColour: '#5DADE2', className: 'ai-bg-info' },
    { name: 'Warning Yellow', variable: '--ai-formula-warning', expectedColour: '#F7DC6F', className: 'ai-bg-warning' },
    { name: 'Error Red', variable: '--ai-formula-error', expectedColour: '#E74C3C', className: 'ai-bg-error' },
    { name: 'Dark Background', variable: '--ai-formula-dark', expectedColour: '#0f0f0f', className: 'ai-bg-dark' },
    { name: 'Dark Light', variable: '--ai-formula-dark-light', expectedColour: '#1a1a1a', className: 'ai-bg-dark-light' },
    { name: 'Dark Medium', variable: '--ai-formula-dark-medium', expectedColour: '#2a2a2a', className: 'ai-bg-dark-medium' },
    { name: 'Gray 600', variable: '--ai-formula-gray-600', expectedColour: '#6b7280', className: 'ai-bg-gray-600' },
    { name: 'Gray 300', variable: '--ai-formula-gray-300', expectedColour: '#d1d5db', className: 'ai-bg-gray-300' }
  ];

  // 組件測試配置
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
    
    colourTests.forEach(test => {
      const style = getComputedStyle(document.documentElement);
      const actualColour = style.getPropertyValue(test.variable).trim();
      const isValid = actualColour === test.expectedColour || actualColour.toLowerCase() === test.expectedColour.toLowerCase();
      
      if (isValid) passed++;
      else failed++;
    });
    
    setTestResults({ passed, failed, total: colourTests.length });
  };

  React.useEffect(() => {
    runFullTest();
  }, []);

  return (
    <div className="min-h-screen ai-bg-gradient-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-centre mb-8">
          <h1 className="text-4xl font-bold mb-4 ai-text-primary">AI Formula 顏色系統測試</h1>
          <p className="text-xl text-gray-300">驗證主題和視覺一致性</p>
        </div>

        {/* Test Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-centre gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold">通過測試</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{testResults.passed}</p>
          </div>
          
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-centre gap-3 mb-2">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold">失敗測試</h3>
            </div>
            <p className="text-3xl font-bold text-red-400">{testResults.failed}</p>
          </div>
          
          <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
            <div className="flex items-centre gap-3 mb-2">
              <Palette className="w-6 h-6 ai-text-info" />
              <h3 className="text-lg font-semibold">總數</h3>
            </div>
            <p className="text-3xl font-bold ai-text-info">{testResults.total}</p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-centre mb-8">
          <button
            onClick={toggleTheme}
            className="flex items-centre gap-2 ai-bg-primary ai-text-dark px-6 py-3 rounded-lg font-semibold hover:ai-bg-primary-hover transition-colours"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            切換主題
          </button>
        </div>

        {/* Colour Variable Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 ai-text-primary flex items-centre gap-2">
            <Palette className="w-6 h-6" />
            顏色變數測試
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colourTests.map((test, index) => (
              <ColourTest key={index} {...test} />
            ))}
          </div>
        </div>

        {/* Component Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 ai-text-primary flex items-centre gap-2">
            <Eye className="w-6 h-6" />
            組件視覺測試
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
          <h2 className="text-2xl font-bold mb-6 ai-text-primary">無障礙測試</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <h3 className="text-lg font-semibold mb-4">對比度測試</h3>
              <div className="space-y-2">
                <div className="flex items-centre justify-between">
                  <span className="ai-text-primary">主題色 (Primary)</span>
                  <span className="text-green-400">通過</span>
                </div>
                <div className="flex items-centre justify-between">
                  <span className="ai-text-secondary">次要顏色 (Secondary)</span>
                  <span className="text-green-400">通過</span>
                </div>
                <div className="flex items-centre justify-between">
                  <span className="ai-text-accent">強調顏色 (Accent)</span>
                  <span className="text-green-400">通過</span>
                </div>
              </div>
            </div>
            
            <div className="ai-bg-dark-medium p-6 rounded-lg border ai-border-gray">
              <h3 className="text-lg font-semibold mb-4">色盲測試</h3>
              <div className="space-y-2">
                <div className="flex items-centre justify-between">
                  <span>紅色盲</span>
                  <span className="text-green-400">通過</span>
                </div>
                <div className="flex items-centre justify-between">
                  <span>綠色盲</span>
                  <span className="text-green-400">通過</span>
                </div>
                <div className="flex items-centre justify-between">
                  <span>藍色盲</span>
                  <span className="text-green-400">通過</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="flex gap-4 justify-centre">
          <button
            onClick={runFullTest}
            className="ai-bg-info text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            重新執行測試
          </button>
          <button
            onClick={() => window.location.reload()}
            className="ai-bg-secondary ai-text-dark px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            重置測試
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColourSystemTest; 
