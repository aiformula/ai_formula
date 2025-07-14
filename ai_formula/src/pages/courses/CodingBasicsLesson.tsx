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

// Quiz ?��?定義
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
    q: '1. 編�?中�?變�??��?麼�?',
    options: [
      '存儲?��??��?容器',
      '一種編程�?言',
      '?�腦硬件組件',
      '調試工具',
    ],
    answer: 0,
  },
  {
    q: '2. 以�??�個�??�基?�數?��??��?',
    options: [
      '字符�?,
      '?��?',
      '布爾??,
      '?��?�?,
    ],
    answer: 3,
  },
  {
    q: '3. "HTML"�?��什麼�?',
    options: [
      '超�???��??��?記�?言',
      '超�??��?記�?言',
      '家庭工具標�?語�?',
      '超�???�本管�?語�?',
    ],
    answer: 1,
  },
  {
    q: '4. ?�大多數編�?語�?中�??�個符?�用?�為變�?賦值�?',
    options: [
      '==',
      '=',
      '===',
      '!=',
    ],
    answer: 1,
  },
  {
    q: '5. ?�數?�編程中?�主要目?�是什麼�?',
    options: [
      '讓代碼更??,
      '?�建?��??��?�?���?,
      '減慢程�??��?',
      '讓編程�?得更?�難',
    ],
    answer: 1,
  },
];

const lesson1Sections: { en: LessonSection[], 'zh-HK': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 1: Introduction to Programming',
      groupIcon: '?��',
      items: [
        {
          key: 'what-is-programming',
          title: 'What is Programming?',
          icon: '?��',
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
                    <li>??Write code to solve problems</li>
                    <li>??Create websites and mobile apps</li>
                    <li>??Automate repetitive tasks</li>
                    <li>??Build games and software</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Why Learn Programming?
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>??High demand career field</li>
                    <li>??Develop logical thinking</li>
                    <li>??Create your own projects</li>
                    <li>??Work from anywhere</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                <h4 className="font-semibold text-yellow-400 mb-3">?�� Key Concept</h4>
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
          icon: '??',
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
                <h4 className="font-semibold text-purple-400 mb-3">?? Getting Started Tip</h4>
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
          icon: '?��',
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
                    <p className="text-blue-400 font-semibold mb-1">?�� Real-world analogy:</p>
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
          icon: '??',
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
                  <h5 className="text-purple-400 font-semibold mb-3">?�� Challenge</h5>
                  <p className="text-gray-300 mb-3">Try these modifications:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>??Change the numbers to different values</li>
                    <li>??Try subtraction (-), multiplication (*), or division (/)</li>
                    <li>??Add a third number to the calculation</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ],
  'zh-HK': [
    {
      group: '第�?課�?編�??��?',
      groupIcon: '?��',
      items: [
        {
          key: 'what-is-programming',
          title: '什麼是編�?�?,
          icon: '?��',
          duration: '5 ?��?',
          description: '學�?編�??�基?��?念�??��??��?,
          type: 'reading',
          content: (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-500/30 mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">什麼是編�?�?/h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  編�??�為?�腦?�建?�令?��?程�?
                  就�?寫�?譜�?�???�訴?�腦要�?什麼�?一步�?步地?��???
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    程�??��?什�?
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>??寫代碼解決�?�?/li>
                    <li>???�建網�??��?機�???/li>
                    <li>???��??��?複性任??/li>
                    <li>???�發?�戲?��?�?/li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    ?��?麼�?學編程�?
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>??高�?求�??�業?��?</li>
                    <li>???��??�輯?�維</li>
                    <li>???�建?�己?��???/li>
                    <li>???�以?��?工�?</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600/30">
                <h4 className="font-semibold text-yellow-400 mb-3">?�� ?��?概念</h4>
                <p className="text-gray-300">
                  ?�編程想象�?學�?一?�?��?言 - 但�??��?人交流�?
                  ?�是?�電?�交流。就?�任何�?言一�??它�?語�?規�?（�?法�?
                  ?��?彙�??�鍵字�??�數）�?
                </p>
              </div>
            </div>
          )
        },
        // ?��?課�??�容...
      ]
    }
  ]
};

// ?��?�?Hook：管?��?源面??
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

// 資�??�板組件
const ResourcePanel: React.FC<{
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
  language: 'en' | 'zh-HK';
}> = ({ isOpen, activeTab, setActiveTab, onClose, language }) => {
  const tabs = [
    { id: 'notes', label: language === 'en' ? 'Notes' : '筆�?', icon: FileText },
    { id: 'resources', label: language === 'en' ? 'Resources' : '資�?', icon: Download },
    { id: 'links', label: language === 'en' ? 'Links' : '???', icon: ExternalLink }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 rounded-2xl border border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h3 className="text-xl font-bold text-white">
            {language === 'en' ? 'Course Resources' : '課�?資�?'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ??
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
                  {language === 'en' ? 'Key Points' : '?��?筆�?'}
                </h4>
                <ul className="space-y-1 text-gray-300">
                  <li>??Variables store data values</li>
                  <li>??Functions are reusable code blocks</li>
                  <li>??Console.log() displays output</li>
                </ul>
              </div>
              <textarea
                className="w-full h-32 bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
                placeholder={language === 'en' ? 'Add your personal notes here...' : '?�此添�??��??�人筆�?...'}
              />
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-4">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-3">
                  {language === 'en' ? 'Downloadable Files' : '?��?載�?�?}
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
                  {language === 'en' ? 'Useful Links' : '?�用???'}
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

// 討�??�組件
const DiscussionPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh-HK';
}> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          {language === 'en' ? 'Discussion' : '討�??�'}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ??
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
              : "很�??�課程�?計�??��?子�??�幫?��??�解了�??��?
            }
          </p>
        </div>

        <div className="bg-gray-700/30 p-3 rounded-lg">
          <textarea
            className="w-full bg-transparent border border-gray-600/30 rounded-lg p-3 text-white placeholder-gray-400 resize-none"
            rows={3}
            placeholder={language === 'en' ? 'Join the discussion...' : '?�入討�?...'}
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              {language === 'en' ? 'Post' : '?��?'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 主�?課�?組件
const CodingBasicsLesson: React.FC = () => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';

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
    // ?�以?�這裡添�?課�?完�??�輯
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex gap-8">
          {/* 左側：課程大�?*/}
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

          {/* 主�??�容?�??*/}
          <div className="flex-1 max-w-4xl">
            {/* 課�??�部 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-white">
                  {isZhTW ? '?��?編�??��?' : 'Introduction to Programming'}
                </h1>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resourcePanel.togglePanel}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {isZhTW ? '資�?' : 'Resources'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDiscussion(!showDiscussion)}
                    className="border-gray-600 hover:bg-gray-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {isZhTW ? '討�?' : 'Discussion'}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                  {isZhTW ? '?�度' : 'Progress'}: {progress.completedCount}/{progress.totalCount} ({progress.percentage}%)
                </span>
                <span>??/span>
                <span>
                  {isZhTW ? '�? : 'Part'} {currentIndex + 1} {isZhTW ? '?��?' : 'of'} {allItems.length}
                </span>
              </div>
            </div>

            {/* 課�??�容 */}
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
                          <span className="text-sm text-gray-400">??{currentItem.duration}</span>
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

            {/* 課�?導航 */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {isZhTW ? '上�??? : 'Previous'}
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleComplete}
                    disabled={currentItem ? isCompleted(currentItem.key) : false}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {currentItem && isCompleted(currentItem.key)
                      ? (isZhTW ? '已�??? : 'Completed')
                      : (isZhTW ? '標�?完�?' : 'Mark Complete')
                    }
                  </Button>

                  {currentIndex === allItems.length - 1 && (
                    <Button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {isZhTW ? '?��?測�?' : 'Start Quiz'}
                    </Button>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={goToNext}
                  disabled={currentIndex === allItems.length - 1}
                  className="border-gray-600 hover:bg-gray-700"
                >
                  {isZhTW ? '下�??? : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* 討�??� */}
            <DiscussionPanel
              isOpen={showDiscussion}
              onClose={() => setShowDiscussion(false)}
              language={language}
            />
          </div>
        </div>
      </div>

      {/* 資�??�板 */}
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