import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import EnhancedLessonSidebar from '@/components/course/EnhancedLessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/EnhancedLessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Code, Play, CheckCircle, Users, MessageSquare, FileText, Download, ExternalLink } from 'lucide-react';

// Quiz 問題定義
const enQuizQuestions: QuizQuestion[] = [
  {
    q: '1. What is a variable in programming?',
    options: [
      'A container that stores data values',
      'A type of programming language',
      'A computer hardware component',
      'A debugging tool',
    ],
    answer: 0,
  },
  {
    q: '2. Which of these is NOT a basic data type?',
    options: [
      'String',
      'Number',
      'Boolean',
      'Database',
    ],
    answer: 3,
  },
  {
    q: '3. What does "HTML" stand for?',
    options: [
      'Hyperlink and Text Markup Language',
      'HyperText Markup Language',
      'Home Tool Markup Language',
      'Hyperlink Text Management Language',
    ],
    answer: 1,
  },
  {
    q: '4. Which symbol is used to assign a value to a variable in most programming languages?',
    options: [
      '==',
      '=',
      '===',
      '!=',
    ],
    answer: 1,
  },
  {
    q: '5. What is the primary purpose of functions in programming?',
    options: [
      'To make code longer',
      'To create reusable blocks of code',
      'To slow down the program',
      'To make programming harder',
    ],
    answer: 1,
  },
];

const zhQuizQuestions: QuizQuestion[] = [
  {
    q: '1. 編程中的變量是什麼？',
    options: [
      '存儲數據值的容器',
      '一種編程語言',
      '電腦硬件組件',
      '調試工具',
    ],
    answer: 0,
  },
  {
    q: '2. 以下哪個不是基本數據類型？',
    options: [
      '字符串',
      '數字',
      '布爾值',
      '數據庫',
    ],
    answer: 3,
  },
  {
    q: '3. "HTML"代表什麼？',
    options: [
      '超連結和文本標記語言',
      '超文本標記語言',
      '家庭工具標記語言',
      '超連結文本管理語言',
    ],
    answer: 1,
  },
  {
    q: '4. 在大多數編程語言中，哪個符號用於為變量賦值？',
    options: [
      '==',
      '=',
      '===',
      '!=',
    ],
    answer: 1,
  },
  {
    q: '5. 函數在編程中的主要目的是什麼？',
    options: [
      '讓代碼更長',
      '創建可重用的代碼塊',
      '減慢程序運行',
      '讓編程變得更困難',
    ],
    answer: 1,
  },
];

const lesson1Sections: { en: LessonSection[], 'zh-TW': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 1: Introduction to Programming',
      groupIcon: '💻',
      items: [
        {
          key: 'what-is-programming',
          title: 'What is Programming?',
          icon: '🎯',
          duration: '5 min',
          description: 'Learn the fundamentals of programming and why it matters.',
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-500/30 mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">What is Programming?</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Programming is the process of creating instructions for computers to follow. 
                  It's like writing a recipe that tells the computer exactly what to do, step by step.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    What Programmers Do
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Write code to solve problems</li>
                    <li>• Create websites and mobile apps</li>
                    <li>• Automate repetitive tasks</li>
                    <li>• Build games and software</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Why Learn Programming?
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• High demand career field</li>
                    <li>• Develop logical thinking</li>
                    <li>• Create your own projects</li>
                    <li>• Work from anywhere</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                <h4 className="font-semibold text-yellow-400 mb-3">💡 Key Concept</h4>
                <p className="text-gray-300">
                  Think of programming like learning a new language - but instead of communicating with people, 
                  you're communicating with computers. Just like any language, it has grammar rules (syntax) 
                  and vocabulary (keywords and functions).
                </p>
              </div>
            </div>
          )
        },
        {
          key: 'programming-languages',
          title: 'Popular Programming Languages',
          icon: '🌐',
          duration: '6 min',
          description: 'Overview of different programming languages and their uses.',
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-white">Popular Programming Languages</h3>
              
              <div className="grid gap-6">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30">
                  <h4 className="font-bold text-yellow-400 mb-3 text-xl">JavaScript</h4>
                  <p className="text-gray-300 mb-3">The language of the web. Used for websites, web apps, and even mobile apps.</p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-green-400">
                      console.log("Hello, World!");
                    </code>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-bold text-blue-400 mb-3 text-xl">Python</h4>
                  <p className="text-gray-300 mb-3">Easy to learn and versatile. Great for beginners, data science, and AI.</p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-green-400">
                      print("Hello, World!")
                    </code>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 p-6 rounded-xl border border-red-500/30">
                  <h4 className="font-bold text-red-400 mb-3 text-xl">HTML & CSS</h4>
                  <p className="text-gray-300 mb-3">The building blocks of websites. HTML for structure, CSS for styling.</p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-green-400">
                      &lt;h1&gt;Hello, World!&lt;/h1&gt;
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30 mt-6">
                <h4 className="font-semibold text-purple-400 mb-3">🚀 Getting Started Tip</h4>
                <p className="text-gray-300">
                  Don't worry about choosing the "perfect" language. Start with one that interests you, 
                  and you can always learn others later. The fundamental concepts transfer between languages!
                </p>
              </div>
            </div>
          )
        },
        {
          key: 'basic-concepts',
          title: 'Basic Programming Concepts',
          icon: '🔧',
          duration: '8 min',
          description: 'Variables, data types, and basic operations.',
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-white">Basic Programming Concepts</h3>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="font-bold text-green-400 mb-4 text-xl flex items-center gap-2">
                    <Code className="w-6 h-6" />
                    Variables
                  </h4>
                  <p className="text-gray-300 mb-4">
                    Variables are containers that store data. Think of them like labeled boxes where you can put different things.
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                    <pre className="text-green-400">
{`// JavaScript examples
let name = "Alice";
let age = 25;
let isStudent = true;`}
                    </pre>
                  </div>
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-blue-400 font-semibold mb-1">💡 Real-world analogy:</p>
                    <p className="text-gray-300 text-sm">
                      Variables are like nametags on storage containers. The nametag (variable name) tells you what's inside the container (the data).
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-bold text-blue-400 mb-4 text-xl">Data Types</h4>
                  <p className="text-gray-300 mb-4">Different types of data that variables can store:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h5 className="text-yellow-400 font-semibold mb-2">String (Text)</h5>
                      <code className="text-green-400">"Hello World"</code>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h5 className="text-yellow-400 font-semibold mb-2">Number</h5>
                      <code className="text-green-400">42, 3.14</code>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h5 className="text-yellow-400 font-semibold mb-2">Boolean</h5>
                      <code className="text-green-400">true, false</code>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h5 className="text-yellow-400 font-semibold mb-2">Array (List)</h5>
                      <code className="text-green-400">[1, 2, 3, 4]</code>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-4 text-xl">Functions</h4>
                  <p className="text-gray-300 mb-4">
                    Functions are reusable blocks of code that perform specific tasks. Like recipes that you can use over and over.
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <pre className="text-green-400">
{`// JavaScript function example
function greetUser(name) {
  return "Hello, " + name + "!";
}

// Using the function
let message = greetUser("Alice");
console.log(message); // Output: Hello, Alice!`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'first-code',
          title: 'Your First Code',
          icon: '🎉',
          duration: '7 min',
          description: 'Write and understand your first piece of code.',
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-white">Your First Code</h3>
              
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl border border-green-500/30 mb-8">
                <h4 className="font-bold text-green-400 mb-4 text-xl">Let's Create a Simple Calculator</h4>
                <p className="text-gray-300 mb-4">
                  We'll build a basic calculator that can add two numbers together. This will teach you about variables, functions, and user input.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-3">Step 1: Create Variables</h5>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <pre className="text-green-400">
{`// Store two numbers
let firstNumber = 10;
let secondNumber = 5;`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-3">Step 2: Perform the Calculation</h5>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <pre className="text-green-400">
{`// Add the numbers together
let result = firstNumber + secondNumber;`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-3">Step 3: Display the Result</h5>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <pre className="text-green-400">
{`// Show the result
console.log("The answer is: " + result);
// Output: The answer is: 15`}
                    </pre>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                  <h5 className="text-blue-400 font-semibold mb-3">Complete Code:</h5>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <pre className="text-green-400">
{`// My First Calculator
let firstNumber = 10;
let secondNumber = 5;
let result = firstNumber + secondNumber;
console.log("The answer is: " + result);

// Try changing the numbers and see what happens!`}
                    </pre>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-500/30">
                  <h5 className="text-purple-400 font-semibold mb-3">🎯 Challenge</h5>
                  <p className="text-gray-300 mb-3">Try these modifications:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Change the numbers to different values</li>
                    <li>• Try subtraction (-), multiplication (*), or division (/)</li>
                    <li>• Add a third number to the calculation</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ],
  'zh-TW': [
    {
      group: '第一課：編程入門',
      groupIcon: '💻',
      items: [
        {
          key: 'what-is-programming',
          title: '什麼是編程？',
          icon: '🎯',
          duration: '5 分鐘',
          description: '學習編程的基本概念和重要性。',
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-500/30 mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">什麼是編程？</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  編程是為電腦創建指令的過程。
                  就像寫食譜一樣，告訴電腦要做什麼，一步一步地執行。
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    程序員做什麼
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 寫代碼解決問題</li>
                    <li>• 創建網站和手機應用</li>
                    <li>• 自動化重複性任務</li>
                    <li>• 開發遊戲和軟件</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    為什麼要學編程？
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 高需求的職業領域</li>
                    <li>• 培養邏輯思維</li>
                    <li>• 創建自己的項目</li>
                    <li>• 可以遠程工作</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                <h4 className="font-semibold text-yellow-400 mb-3">💡 重要概念</h4>
                <p className="text-gray-300">
                  把編程想象成學習一門新語言 - 但不是與人交流，
                  而是與電腦交流。就像任何語言一樣，它有語法規則（語法）
                  和詞彙（關鍵字和函數）。
                </p>
              </div>
            </div>
          )
        },
        // 其他課程內容...
      ]
    }
  ]
};

// 自定義 Hook：管理資源面板
const useResourcePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  
  const togglePanel = useCallback(() => setIsOpen(prev => !prev), []);
  const closePanel = useCallback(() => setIsOpen(false), []);
  
  return {
    isOpen,
    activeTab,
    setActiveTab,
    togglePanel,
    closePanel
  };
};

// 資源面板組件
const ResourcePanel: React.FC<{
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
  language: 'en' | 'zh-TW';
}> = ({ isOpen, activeTab, setActiveTab, onClose, language }) => {
  const tabs = [
    { id: 'notes', label: language === 'en' ? 'Notes' : '筆記', icon: FileText },
    { id: 'resources', label: language === 'en' ? 'Resources' : '資源', icon: Download },
    { id: 'links', label: language === 'en' ? 'Links' : '連結', icon: ExternalLink }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 rounded-2xl border border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-bold text-white">
            {language === 'en' ? 'Course Resources' : '課程資源'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-gray-700/50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-400 mb-2">
                  {language === 'en' ? 'Key Points' : '重點筆記'}
                </h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Variables store data values</li>
                  <li>• Functions are reusable code blocks</li>
                  <li>• Console.log() displays output</li>
                </ul>
              </div>
              <textarea
                className="w-full h-32 bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
                placeholder={language === 'en' ? 'Add your personal notes here...' : '在此添加您的個人筆記...'}
              />
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-4">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-3">
                  {language === 'en' ? 'Downloadable Files' : '可下載檔案'}
                </h4>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    lesson-1-code-examples.zip
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    programming-basics-cheatsheet.pdf
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-3">
                  {language === 'en' ? 'Useful Links' : '有用連結'}
                </h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    MDN Web Docs - JavaScript
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    W3Schools - Programming Tutorial
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 討論區組件
const DiscussionPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh-TW';
}> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          {language === 'en' ? 'Discussion' : '討論區'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-gray-300 font-medium">Alice</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>
          <p className="text-gray-300">
            {language === 'en' 
              ? "Great lesson! The calculator example really helped me understand variables."
              : "很棒的課程！計算器例子真的幫助我理解了變量。"
            }
          </p>
        </div>

        <div className="bg-gray-700/30 p-3 rounded-lg">
          <textarea
            className="w-full bg-transparent border border-gray-600/30 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
            rows={3}
            placeholder={language === 'en' ? 'Join the discussion...' : '加入討論...'}
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              {language === 'en' ? 'Post' : '發佈'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 主要課程組件
const CodingBasicsLesson: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-TW';

  const sections = lesson1Sections[language];
  const [selectedKey, setSelectedKey] = useState(sections[0]?.items[0]?.key || '');
  const [showQuiz, setShowQuiz] = useState(false);

  const { completed, markAsCompleted, isCompleted, progress } = useLessonCompletion('coding-basics-lesson1', sections as any);
  const resourcePanel = useResourcePanel();
  const [showDiscussion, setShowDiscussion] = useState(false);

  const quizQuestions = isZhTW ? zhQuizQuestions : enQuizQuestions;

  const currentItem = useMemo(() => {
    for (const section of sections) {
      const item = section.items.find(item => item.key === selectedKey);
      if (item) return item;
    }
    return null;
  }, [sections, selectedKey]);

  const allItems = useMemo(() => {
    return sections.flatMap(section => section.items);
  }, [sections]);

  const currentIndex = useMemo(() => {
    return allItems.findIndex(item => item.key === selectedKey);
  }, [allItems, selectedKey]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedKey(allItems[currentIndex - 1].key);
    }
  }, [currentIndex, allItems]);

  const goToNext = useCallback(() => {
    if (currentIndex < allItems.length - 1) {
      setSelectedKey(allItems[currentIndex + 1].key);
    }
  }, [currentIndex, allItems]);

  const handleComplete = useCallback(() => {
    if (currentItem) {
      markAsCompleted(currentItem.key);
    }
  }, [currentItem, markAsCompleted]);

  const handleQuizComplete = useCallback(() => {
    setShowQuiz(false);
    // 可以在這裡添加課程完成邏輯
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex gap-8">
          {/* 左側：課程大綱 */}
          <div className="w-80 flex-shrink-0">
            <EnhancedLessonSidebar
              sections={sections}
              selectedKey={selectedKey}
              onSelectItem={setSelectedKey}
              completed={completed}
              progress={progress}
              isZhTW={isZhTW}
            />
          </div>

          {/* 主要內容區域 */}
          <div className="flex-1 max-w-4xl">
            {/* 課程頭部 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-white">
                  {isZhTW ? '基礎編程入門' : 'Introduction to Programming'}
                </h1>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resourcePanel.togglePanel}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isZhTW ? '資源' : 'Resources'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDiscussion(!showDiscussion)}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {isZhTW ? '討論' : 'Discussion'}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                  {isZhTW ? '進度' : 'Progress'}: {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)
                </span>
                <span>•</span>
                <span>
                  {isZhTW ? '第' : 'Part'} {currentIndex + 1} {isZhTW ? '部分' : 'of'} {allItems.length}
                </span>
              </div>
            </div>

            {/* 課程內容 */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 mb-8">
              <div className="p-8">
                {showQuiz ? (
                  <QuizCard
                    questions={quizQuestions}
                    isZhTW={isZhTW}
                  />
                ) : (
                  <div>
                    {currentItem && (
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">{currentItem.icon}</span>
                          <h2 className="text-2xl font-bold text-white">{currentItem.title}</h2>
                          <span className="text-sm text-gray-400">• {currentItem.duration}</span>
                        </div>
                        <p className="text-gray-300 mb-6">{currentItem.description}</p>
                        <div className="prose prose-invert max-w-none">
                          {currentItem.content}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 課程導航 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {isZhTW ? '上一個' : 'Previous'}
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleComplete}
                    disabled={currentItem ? isCompleted(currentItem.key) : false}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {currentItem && isCompleted(currentItem.key)
                      ? (isZhTW ? '已完成' : 'Completed')
                      : (isZhTW ? '標記完成' : 'Mark Complete')
                    }
                  </Button>

                  {currentIndex === allItems.length - 1 && (
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {isZhTW ? '開始測驗' : 'Start Quiz'}
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={goToNext}
                  disabled={currentIndex === allItems.length - 1}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  {isZhTW ? '下一個' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* 討論區 */}
            <DiscussionPanel
              isOpen={showDiscussion}
              onClose={() => setShowDiscussion(false)}
              language={language}
            />
          </div>
        </div>
      </div>

      {/* 資源面板 */}
      <ResourcePanel
        isOpen={resourcePanel.isOpen}
        activeTab={resourcePanel.activeTab}
        setActiveTab={resourcePanel.setActiveTab}
        onClose={resourcePanel.closePanel}
        language={language}
      />
    </div>
  );
};

export default memo(CodingBasicsLesson); 