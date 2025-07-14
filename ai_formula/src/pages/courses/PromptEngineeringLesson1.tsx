import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import LessonSidebar from '@/components/course/LessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/LessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';

// Quiz ?��?定義

// Define English quiz questions
const enQuizQuestions = [
  {
    q: '1. What is the primary purpose of Prompt Engineering?',
    options: [
      'To design and optimize input instructions to guide AI models in generating accurate and relevant outputs',
      'To write code for AI models',
      'To create datasets for machine learning',
      'To test AI model performance only',
    ],
    answer: 0,
  },
  {
    q: '2. Which component is NOT typically part of a well-structured prompt?',
    options: [
      'Clear instructions',
      'Context information',
      'Random irrelevant text',
      'Expected output format',
    ],
    answer: 2,
  },
  {
    q: '3. What makes a prompt more effective?',
    options: [
      'Being as vague as possible',
      'Providing specific, clear instructions with adequate context',
      'Using only simple words',
      'Making it extremely long',
    ],
    answer: 1,
  },
  {
    q: '4. Why is context important in prompts?',
    options: [
      'It makes the prompt longer',
      'It provides background information that helps AI understand the situation better',
      'It confuses the AI model',
      'It is not important at all',
    ],
    answer: 1,
  },
  {
    q: '5. What is the best approach when a prompt doesn\'t give the desired result?',
    options: [
      'Give up and try a different AI model',
      'Make the prompt shorter',
      'Iteratively refine the prompt based on the output',
      'Add more random words',
    ],
    answer: 2,
  },
];

// Define Cantonese quiz questions
const zhQuizQuestions: QuizQuestion[] = [
  {
    q: '1. ?�示工�??�主要目?�是什麼�?',
    options: [
      '設�??�優?�輸?��?令�?引�?AI模�??��?準確且相?��?輸出',
      '?�AI模�?編寫�?��',
      '?�建機器學�??��???,
      '?�測試AI模�??�能',
    ],
    answer: 0,
  },
  {
    q: '2. 以�??�個�?件通常不是結�??�好?��?示�?一?��?�?,
    options: [
      '清晰?��?�?,
      '上�??�信??,
      '?��??��??��???,
      '?��??�輸?�格�?,
    ],
    answer: 2,
  },
  {
    q: '3. 什麼�??�示?��??��?',
    options: [
      '?�可?�模�?,
      '?��??��??��??��??�令?��??��?上�???,
      '?�使?�簡?��?詞�?',
      '讓�?極其?�長',
    ],
    answer: 1,
  },
  {
    q: '4. ?��?麼�?下�??��?示中很�?要�?',
    options: [
      '它�??�示?�長',
      '它�?供�??�信?��?幫助AI?�好?��?�??�?,
      '它�?讓AI模�??��?',
      '它�?點�?不�?�?,
    ],
    answer: 1,
  },
  {
    q: '5. ?��?示�??�給?��??��??��?，�?佳方法是什麼�?',
    options: [
      '?��?並�?試�??��?AI模�?',
      '縮短?�示',
      '?��?輸出迭代?�改?��?�?,
      '添�??��??��?詞�?',
    ],
    answer: 2,
  },
];

const lesson1Sections: { en: LessonSection[], 'zh-HK': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 1: Foundations of Prompt Engineering',
      groupIcon: '??',
      items: [
        {
          key: 'what-is-prompt-engineering',
          title: 'What is Prompt Engineering?',
          icon: '?��',
          duration: '4 min',
          description: 'Introduction to the concept and importance of prompt engineering.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">What is Prompt Engineering?</h3>
              <p className="mb-4">Prompt Engineering is the art and science of designing and optimizing input instructions (prompts) to guide AI models in generating accurate, relevant, and useful outputs. It's about communicating effectively with AI systems to get the best possible results.</p>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-4">
                <h4 className="font-semibold text-blue-400 mb-2">Key Definition:</h4>
                <p className="text-gray-300">A prompt is a text input that you provide to an AI model to guide its response. Think of it as giving clear, specific instructions to get the output you want.</p>
              </div>

              <p className="mb-4">Just as you would give clear instructions to a colleague for a task, prompt engineering involves crafting instructions that AI models can understand and act upon effectively.</p>

              <h4 className="font-semibold text-white mb-2">Why is it Important?</h4>
              <ul className="list-disc ml-6 space-y-2 text-gray-300">
                <li><strong>Precision:</strong> Well-crafted prompts lead to more accurate and relevant responses</li>
                <li><strong>Efficiency:</strong> Reduces the need for multiple attempts to get desired results</li>
                <li><strong>Consistency:</strong> Helps maintain consistent quality in AI outputs</li>
                <li><strong>Control:</strong> Gives you better control over the AI's behavior and output style</li>
              </ul>
            </div>
          )
        },
        {
          key: 'core-principles',
          title: 'Core Principles',
          icon: '??,
          duration: '5 min',
          description: 'Essential principles that make prompts effective.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Core Principles of Effective Prompts</h3>
              
              <div className="space-y-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">1. Clarity and Specificity</h4>
                  <p className="text-gray-300 mb-2">Be clear about what you want the AI to do. Vague prompts lead to vague results.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??Bad: "Write something about dogs"</p>
                    <p className="text-green-400 text-sm">??Good: "Write a 200-word informative article about the benefits of daily exercise for senior dogs"</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">2. Provide Context</h4>
                  <p className="text-gray-300 mb-2">Context helps the AI understand the situation and respond appropriately.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??Bad: "Explain this concept"</p>
                    <p className="text-green-400 text-sm">??Good: "Explain machine learning to a high school student who has basic understanding of mathematics"</p>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">3. Define Output Format</h4>
                  <p className="text-gray-300 mb-2">Specify how you want the response formatted - length, style, structure, etc.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??Bad: "List some benefits"</p>
                    <p className="text-green-400 text-sm">??Good: "List 5 benefits in bullet points, each with a brief explanation"</p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-2">4. Use Examples</h4>
                  <p className="text-gray-300 mb-2">Examples help the AI understand the style and format you're looking for.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-green-400 text-sm">??Good: "Write a product description like this example: [sample description]"</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'types-of-prompts',
          title: 'Types of Prompts',
          icon: '?��',
          duration: '4 min',
          description: 'Different categories of prompts and their applications.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Types of Prompts</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">1. Instructional Prompts</h4>
                  <p className="text-gray-300 mb-2">Direct commands telling the AI what to do.</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">"Summarize this article in 3 key points"</p>
                    <p className="text-gray-300">"Translate this text to Spanish"</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">2. Role-Playing Prompts</h4>
                  <p className="text-gray-300 mb-2">Ask the AI to adopt a specific role or persona.</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">"Act as a professional marketing consultant and..."</p>
                    <p className="text-gray-300">"You are a helpful teacher explaining..."</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">3. Question-Based Prompts</h4>
                  <p className="text-gray-300 mb-2">Ask specific questions to get targeted information.</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">"What are the main advantages of renewable energy?"</p>
                    <p className="text-gray-300">"How can I improve my writing skills?"</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. Creative Prompts</h4>
                  <p className="text-gray-300 mb-2">Encourage creative or imaginative responses.</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">"Write a short story about a robot who discovers emotions"</p>
                    <p className="text-gray-300">"Brainstorm 10 innovative solutions for reducing plastic waste"</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'best-practices',
          title: 'Best Practices',
          icon: '??',
          duration: '5 min',
          description: 'Proven strategies for crafting effective prompts.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Best Practices for Prompt Engineering</h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">??Do's</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>Start with clear, specific instructions</li>
                    <li>Provide relevant context and background</li>
                    <li>Specify the desired output format</li>
                    <li>Use examples when possible</li>
                    <li>Test and iterate your prompts</li>
                    <li>Be consistent with your language</li>
                    <li>Break complex tasks into smaller steps</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">??Don'ts</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>Don't be vague or ambiguous</li>
                    <li>Don't assume the AI knows unstated context</li>
                    <li>Don't use overly complex language unnecessarily</li>
                    <li>Don't ignore the importance of formatting</li>
                    <li>Don't expect perfect results on the first try</li>
                    <li>Don't make prompts unnecessarily long</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">?�� Pro Tips</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li><strong>Iterate:</strong> Refine your prompts based on the AI's responses</li>
                    <li><strong>Test variations:</strong> Try different phrasings to see what works best</li>
                    <li><strong>Use constraints:</strong> Set boundaries (word count, tone, style)</li>
                    <li><strong>Chain prompts:</strong> Break complex tasks into a series of simpler prompts</li>
                    <li><strong>Save good prompts:</strong> Keep a collection of effective prompts for reuse</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'common-mistakes',
          title: 'Common Mistakes',
          icon: '?��?',
          duration: '3 min',
          description: 'Typical pitfalls in prompt engineering and how to avoid them.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Common Mistakes to Avoid</h3>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">1. Being Too Vague</h4>
                  <p className="text-gray-300 mb-2">Problem: "Write something interesting"</p>
                  <p className="text-green-400 text-sm">Solution: "Write a 150-word article about the impact of AI on healthcare, focusing on diagnostic improvements"</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">2. Overcomplicating the Prompt</h4>
                  <p className="text-gray-300 mb-2">Problem: Adding too many conditions and constraints in one prompt</p>
                  <p className="text-green-400 text-sm">Solution: Break complex requests into multiple, simpler prompts</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">3. Not Providing Context</h4>
                  <p className="text-gray-300 mb-2">Problem: "Explain this concept" (without saying what concept)</p>
                  <p className="text-green-400 text-sm">Solution: "Explain machine learning to a beginner with no technical background"</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">4. Ignoring Output Format</h4>
                  <p className="text-gray-300 mb-2">Problem: Not specifying how you want the response structured</p>
                  <p className="text-green-400 text-sm">Solution: "Provide your answer in bullet points with brief explanations"</p>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">?�� Remember</h4>
                  <p className="text-gray-300">Prompt engineering is iterative. Don't expect perfect results immediately. Refine your prompts based on the AI's responses to get better results.</p>
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
      group: '第�?課�??�示工�??��?',
      groupIcon: '??',
      items: [
        {
          key: 'what-is-prompt-engineering',
          title: '什麼是?�示工�?�?,
          icon: '?��',
          duration: '4 ?��?',
          description: '?�示工�?概念?��?要性�?紹�?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">什麼是?�示工�?�?/h3>
              <p className="mb-4">?�示工�??�設計�??��?輸入?�令（�?示�??��?術�?科學，目?�是引�?AI模�??��?準確?�相?��??�用?�輸?�。�??��??��?何�?AI系統?��?溝通以?��??�佳�??��?/p>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-4">
                <h4 className="font-semibold text-blue-400 mb-2">?�鍵定義�?/h4>
                <p className="text-gray-300">?�示?�您?��?給AI模�??��??�輸?��??�於引�??��??�。可以�?它想?��?給出清晰?�具體�??�令來獲得您?��??�輸?��?/p>
              </div>

              <p className="mb-4">就�??��?給�?事�??�任?��??�確?�令一�???�示工�?涉�??��?AI模�??��??�解並�??�執行�??�令??/p>

              <h4 className="font-semibold text-white mb-2">?��?麼�?要�?</h4>
              <ul className="list-disc ml-6 space-y-2 text-gray-300">
                <li><strong>精確?��?</strong>精�?製�??��?示能?��??��?確�??��??��???/li>
                <li><strong>?��?�?/strong>減�??��??�想結�??�?�?��?次�?�?/li>
                <li><strong>一?�性�?</strong>?�助?�維?�AI輸出?��??�質??/li>
                <li><strong>?�制�?/strong>讓您?�好?�控?�AI?��??��?輸出風格</li>
              </ul>
            </div>
          )
        },
        {
          key: 'core-principles',
          title: '?��??��?',
          icon: '??,
          duration: '5 ?��?',
          description: '讓�?示�??��??�本?��???,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?��??�示?�核心�???/h3>
              
              <div className="space-y-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">1. 清晰?�具�?/h4>
                  <p className="text-gray-300 mb-2">?�確說�??��??�AI?��?麼。模糊�??�示導致模�??��??��?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??不好：「寫一些�??��??�東西�?/p>
                    <p className="text-green-400 text-sm">??好�??�寫一�?00字�?資�??��?，�?紹老年?��??��??��?好�???/p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">2. ?��??�景</h4>
                  <p className="text-gray-300 mb-2">?�景?�助?�AI?�解?��?並適?��??��?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??不好：「解?�這個�?念�?/p>
                    <p className="text-green-400 text-sm">??好�??��??�基礎數學�?�??高中?�解?��??�學習�?/p>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">3. 定義輸出?��?</h4>
                  <p className="text-gray-300 mb-2">?��??��??��??��??��? - ?�度?�風?�、�?構�???/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??不好：「�??��?些好?��?/p>
                    <p className="text-green-400 text-sm">??好�??�用?�目符�??�出5?�好?��?每個都?�簡?�解?��?/p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-2">4. 使用範�?</h4>
                  <p className="text-gray-300 mb-2">範�?幫助AI?�解?��??��?風格?�格式�?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-green-400 text-sm">??好�??�寫一?��??�個�?例�??��??�述：[�?��?�述]??/p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'types-of-prompts',
          title: '?�示類�?',
          icon: '?��',
          duration: '4 ?��?',
          description: '不�?類別?��?示�??��??��?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?�示類�?</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">1. ?�令式�?�?/h4>
                  <p className="text-gray-300 mb-2">?�接?�令?�訴AI要�?什麼�?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?��??��??��?總�????��?點�?/p>
                    <p className="text-gray-300">?��??�段?��?翻譯?�西?��?語�?/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">2. 角色?��??�示</h4>
                  <p className="text-gray-300 mb-2">要�?AI?�用?��?角色?�人?��?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?��??��?業�??�顧?��?並�?...??/p>
                    <p className="text-gray-300">?��??��?位�??�助人�??�師，正?�解??..??/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">3. ?��?式�?�?/h4>
                  <p className="text-gray-300 mb-2">?�出?��??��?以獲得�?對性�?訊�?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?��??�能源�?主�??��??��?麼�???/p>
                    <p className="text-gray-300">?��?如�??��?寫�??�巧�???/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. ?��??�示</h4>
                  <p className="text-gray-300 mb-2">鼓勵?��??�想?�性�??��?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?�寫一?��??�發?��??��?機器人�??��?事�?/p>
                    <p className="text-gray-300">?�為減�?塑�?廢物?��?激??0?�創?�解決方案�?/p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'best-practices',
          title: '?�佳實�?,
          icon: '??',
          duration: '5 ?��?',
          description: '?��??��??�示?��?驗�?策略??,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?�示工�??��?佳實�?/h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">??該�???/h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>從�??�、具體�??�令?��?</li>
                    <li>?��??��??�景?��?下�?</li>
                    <li>?��??�?�?�輸?�格�?/li>
                    <li>?�可?�使?��?�?/li>
                    <li>測試?�迭�?��?��?�?/li>
                    <li>保�?語�??��??��?/li>
                    <li>將�??�任?��?�??較�??�步�?/li>
                  </ul>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">??不該?��?</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>不�?模�??�含糊�?�?/li>
                    <li>不�??�設AI?��??�說?��??�景</li>
                    <li>不�?不�?要地使用?�於複�??��?言</li>
                    <li>不�?忽�??��??��?要�?/li>
                    <li>不�??��?第�?次就?��?美�???/li>
                    <li>不�?讓�?示�?必�??��???/li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">?�� 專業?��?/h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li><strong>迭代�?/strong>?��?AI?��??�改?�您?��?�?/li>
                    <li><strong>測試變�?�?/strong>?�試不�??�措辭�??��?什麼�??��?</li>
                    <li><strong>使用約�?�?/strong>設�??��?（�??�、�?調、風?��?</li>
                    <li><strong>?�接?�示�?/strong>將�??�任?��?�??一系�?簡單?�示</li>
                    <li><strong>保�?好�?示�?</strong>保�??��??�示?��??�以便�?複使??/li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'common-mistakes',
          title: '常�??�誤',
          icon: '?��?',
          duration: '3 ?��?',
          description: '?�示工�?中�??��??�阱?��?何避?��?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?�要避?��?常�??�誤</h3>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">1. 太�?模�?</h4>
                  <p className="text-gray-300 mb-2">?��?：「寫一些�?�???�西??/p>
                  <p className="text-green-400 text-sm">�?��?��?：「寫一�?50字�??��?，�?紹AI對醫?��??��?影響，�?點�?注診?�改?��?/p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">2. ?�度複�??��?�?/h4>
                  <p className="text-gray-300 mb-2">?��?：在一?��?示中添�?太�?條件?��???/p>
                  <p className="text-green-400 text-sm">�?��?��?：�?複�?請�??�解?��??�簡?��??�示</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">3. 不�?供�???/h4>
                  <p className="text-gray-300 mb-2">?��?：「解?�這個�?念」�?不說?�是什麼�?念�?</p>
                  <p className="text-green-400 text-sm">�?��?��?：「�?沒�??�術�??��??�學?�解?��??�學習�?/p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">4. 忽�?輸出?��?</h4>
                  <p className="text-gray-300 mb-2">?��?：�??��??��??��??��?結�?</p>
                  <p className="text-green-400 text-sm">�?��?��?：「用?�目符�??��??��?答�?，並?��?簡短�????/p>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">?�� 記�?</h4>
                  <p className="text-gray-300">?�示工�??�迭�???��?要�??��??�獲得�?美�??�。根?�AI?��??�改?�您?��?示以?��??�好?��??��?/p>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ]
};

// 測�??��?
const Quiz = memo(() => {
  const { language } = useLanguage();
  const questions = language === 'zh-HK' ? zhQuizQuestions : enQuizQuestions;
  const isZhTW = language === 'zh-HK';
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isZhTW ? '第�?課測�? : 'Lesson 1 Quiz'}
      </h2>
      <QuizCard
        questions={questions}
        isZhTW={isZhTW}
      />
    </div>
  );
});

const PromptEngineeringLesson1: React.FC = () => {
  const { language } = useLanguage();
  const [currentSection, setCurrentSection] = useState('what-is-prompt-engineering');
  const [showQuiz, setShowQuiz] = useState(false);
  
  const sections = useMemo(() => lesson1Sections[language], [language]);
  const { progress, markAsCompleted, isCompleted } = useLessonCompletion('lesson1', sections);
  
  const currentContent = useMemo(() => {
    if (showQuiz) return null;
    
    for (const section of sections) {
      const item = section.items.find(item => item.key === currentSection);
      if (item) return item.content;
    }
    return null;
  }, [currentSection, sections, showQuiz]);
  
  const isZhTW = language === 'zh-HK';
  
  // ?��?測�??��?
  const handleQuizToggle = useCallback(() => {
    setShowQuiz(!showQuiz);
    if (!showQuiz) {
      setCurrentSection('quiz');
    }
  }, [showQuiz]);
  
  // ?��??�目?��?
  const handleItemSelect = useCallback((key: string) => {
    if (key === 'quiz') {
      setShowQuiz(true);
    } else {
      setShowQuiz(false);
    }
    setCurrentSection(key);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex gap-8">
          {/* ?��?�?*/}
          <div className="w-80 flex-shrink-0">
            <LessonSidebar
              sections={sections}
              selectedKey={currentSection}
              onSelectItem={handleItemSelect}
              isZhTW={isZhTW}
              isCompleted={isCompleted}
            />
          </div>
          
          {/* 主�??�容 */}
          <div className="flex-1">
            <LessonContent
              currentContent={currentContent}
              showQuiz={showQuiz}
              quizComponent={<Quiz />}
              onComplete={() => markAsCompleted(currentSection)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEngineeringLesson1; 
