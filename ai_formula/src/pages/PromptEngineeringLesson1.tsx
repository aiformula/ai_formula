import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import LessonSidebar from '@/components/course/LessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/LessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';

// Quiz 問題定義

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
    q: '1. 提示工程的主要目的是什麼？',
    options: [
      '設計和優化輸入指令，引導AI模型生成準確且相關的輸出',
      '為AI模型編寫代碼',
      '創建機器學習數據集',
      '僅測試AI模型性能',
    ],
    answer: 0,
  },
  {
    q: '2. 以下哪個組件通常不是結構良好的提示的一部分？',
    options: [
      '清晰的指令',
      '上下文信息',
      '隨機無關的文本',
      '期望的輸出格式',
    ],
    answer: 2,
  },
  {
    q: '3. 什麼讓提示更有效？',
    options: [
      '盡可能模糊',
      '提供具體、清晰的指令和充分的上下文',
      '只使用簡單的詞語',
      '讓它極其冗長',
    ],
    answer: 1,
  },
  {
    q: '4. 為什麼上下文在提示中很重要？',
    options: [
      '它讓提示更長',
      '它提供背景信息，幫助AI更好地理解情況',
      '它會讓AI模型困惑',
      '它一點也不重要',
    ],
    answer: 1,
  },
  {
    q: '5. 當提示沒有給出期望結果時，最佳方法是什麼？',
    options: [
      '放棄並嘗試不同的AI模型',
      '縮短提示',
      '根據輸出迭代地改進提示',
      '添加更多隨機詞語',
    ],
    answer: 2,
  },
];

const lesson1Sections: { en: LessonSection[], 'zh-TW': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 1: Foundations of Prompt Engineering',
      groupIcon: '🚀',
      items: [
        {
          key: 'what-is-prompt-engineering',
          title: 'What is Prompt Engineering?',
          icon: '🎯',
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
          icon: '⚡',
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
                    <p className="text-red-400 text-sm">❌ Bad: "Write something about dogs"</p>
                    <p className="text-green-400 text-sm">✅ Good: "Write a 200-word informative article about the benefits of daily exercise for senior dogs"</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">2. Provide Context</h4>
                  <p className="text-gray-300 mb-2">Context helps the AI understand the situation and respond appropriately.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">❌ Bad: "Explain this concept"</p>
                    <p className="text-green-400 text-sm">✅ Good: "Explain machine learning to a high school student who has basic understanding of mathematics"</p>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">3. Define Output Format</h4>
                  <p className="text-gray-300 mb-2">Specify how you want the response formatted - length, style, structure, etc.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">❌ Bad: "List some benefits"</p>
                    <p className="text-green-400 text-sm">✅ Good: "List 5 benefits in bullet points, each with a brief explanation"</p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-2">4. Use Examples</h4>
                  <p className="text-gray-300 mb-2">Examples help the AI understand the style and format you're looking for.</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-green-400 text-sm">✅ Good: "Write a product description like this example: [sample description]"</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'types-of-prompts',
          title: 'Types of Prompts',
          icon: '🎨',
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
          icon: '🏆',
          duration: '5 min',
          description: 'Proven strategies for crafting effective prompts.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Best Practices for Prompt Engineering</h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">✅ Do's</h4>
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
                  <h4 className="font-semibold text-red-400 mb-2">❌ Don'ts</h4>
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
                  <h4 className="font-semibold text-blue-400 mb-2">💡 Pro Tips</h4>
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
          icon: '⚠️',
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
                  <h4 className="font-semibold text-yellow-400 mb-2">💡 Remember</h4>
                  <p className="text-gray-300">Prompt engineering is iterative. Don't expect perfect results immediately. Refine your prompts based on the AI's responses to get better results.</p>
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
      group: '第一課：提示工程基礎',
      groupIcon: '🚀',
      items: [
        {
          key: 'what-is-prompt-engineering',
          title: '什麼是提示工程？',
          icon: '🎯',
          duration: '4 分鐘',
          description: '提示工程概念及重要性介紹。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">什麼是提示工程？</h3>
              <p className="mb-4">提示工程是設計和優化輸入指令（提示）的藝術和科學，目的是引導AI模型生成準確、相關且有用的輸出。它是關於如何與AI系統有效溝通以獲得最佳結果。</p>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-4">
                <h4 className="font-semibold text-blue-400 mb-2">關鍵定義：</h4>
                <p className="text-gray-300">提示是您提供給AI模型的文本輸入，用於引導其回應。可以把它想像成給出清晰、具體的指令來獲得您想要的輸出。</p>
              </div>

              <p className="mb-4">就像您會給同事一個任務的明確指令一樣，提示工程涉及制作AI模型能夠理解並有效執行的指令。</p>

              <h4 className="font-semibold text-white mb-2">為什麼重要？</h4>
              <ul className="list-disc ml-6 space-y-2 text-gray-300">
                <li><strong>精確性：</strong>精心製作的提示能產生更準確和相關的回應</li>
                <li><strong>效率：</strong>減少獲得理想結果所需的多次嘗試</li>
                <li><strong>一致性：</strong>有助於維持AI輸出的一致質量</li>
                <li><strong>控制：</strong>讓您更好地控制AI的行為和輸出風格</li>
              </ul>
            </div>
          )
        },
        {
          key: 'core-principles',
          title: '核心原則',
          icon: '⚡',
          duration: '5 分鐘',
          description: '讓提示有效的基本原則。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">有效提示的核心原則</h3>
              
              <div className="space-y-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">1. 清晰和具體</h4>
                  <p className="text-gray-300 mb-2">明確說明您希望AI做什麼。模糊的提示導致模糊的結果。</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">❌ 不好：「寫一些關於狗的東西」</p>
                    <p className="text-green-400 text-sm">✅ 好：「寫一篇200字的資訊文章，介紹老年犬每日運動的好處」</p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">2. 提供背景</h4>
                  <p className="text-gray-300 mb-2">背景有助於AI理解情況並適當回應。</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">❌ 不好：「解釋這個概念」</p>
                    <p className="text-green-400 text-sm">✅ 好：「向有基礎數學理解的高中生解釋機器學習」</p>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">3. 定義輸出格式</h4>
                  <p className="text-gray-300 mb-2">指定您希望回應的格式 - 長度、風格、結構等。</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">❌ 不好：「列出一些好處」</p>
                    <p className="text-green-400 text-sm">✅ 好：「用項目符號列出5個好處，每個都有簡短解釋」</p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-2">4. 使用範例</h4>
                  <p className="text-gray-300 mb-2">範例幫助AI理解您要找的風格和格式。</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-green-400 text-sm">✅ 好：「寫一個像這個範例的產品描述：[樣本描述]」</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'types-of-prompts',
          title: '提示類型',
          icon: '🎨',
          duration: '4 分鐘',
          description: '不同類別的提示及其應用。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">提示類型</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">1. 指令式提示</h4>
                  <p className="text-gray-300 mb-2">直接命令告訴AI要做什麼。</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">「將這篇文章總結成3個要點」</p>
                    <p className="text-gray-300">「將這段文字翻譯成西班牙語」</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">2. 角色扮演提示</h4>
                  <p className="text-gray-300 mb-2">要求AI採用特定角色或人格。</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">「作為專業市場顧問，並且...」</p>
                    <p className="text-gray-300">「你是一位樂於助人的老師，正在解釋...」</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">3. 問題式提示</h4>
                  <p className="text-gray-300 mb-2">提出特定問題以獲得針對性資訊。</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">「再生能源的主要優點是什麼？」</p>
                    <p className="text-gray-300">「我如何提高寫作技巧？」</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. 創意提示</h4>
                  <p className="text-gray-300 mb-2">鼓勵創意或想像性回應。</p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">「寫一個關於發現情感的機器人的短故事」</p>
                    <p className="text-gray-300">「為減少塑膠廢物腦力激盪10個創新解決方案」</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'best-practices',
          title: '最佳實踐',
          icon: '🏆',
          duration: '5 分鐘',
          description: '制作有效提示的經驗證策略。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">提示工程的最佳實踐</h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">✅ 該做的</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>從清晰、具體的指令開始</li>
                    <li>提供相關背景和上下文</li>
                    <li>指定所需的輸出格式</li>
                    <li>盡可能使用範例</li>
                    <li>測試和迭代您的提示</li>
                    <li>保持語言的一致性</li>
                    <li>將複雜任務分解成較小的步驟</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">❌ 不該做的</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>不要模糊或含糊不清</li>
                    <li>不要假設AI知道未說明的背景</li>
                    <li>不要不必要地使用過於複雜的語言</li>
                    <li>不要忽視格式的重要性</li>
                    <li>不要期望第一次就有完美結果</li>
                    <li>不要讓提示不必要地冗長</li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">💡 專業技巧</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li><strong>迭代：</strong>根據AI的回應改進您的提示</li>
                    <li><strong>測試變化：</strong>嘗試不同的措辭，看看什麼最有效</li>
                    <li><strong>使用約束：</strong>設定界限（字數、語調、風格）</li>
                    <li><strong>鏈接提示：</strong>將複雜任務分解成一系列簡單提示</li>
                    <li><strong>保存好提示：</strong>保留有效提示的集合以便重複使用</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'common-mistakes',
          title: '常見錯誤',
          icon: '⚠️',
          duration: '3 分鐘',
          description: '提示工程中的典型陷阱及如何避免。',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">需要避免的常見錯誤</h3>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">1. 太過模糊</h4>
                  <p className="text-gray-300 mb-2">問題：「寫一些有趣的東西」</p>
                  <p className="text-green-400 text-sm">解決方案：「寫一篇150字的文章，介紹AI對醫療保健的影響，重點關注診斷改進」</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">2. 過度複雜化提示</h4>
                  <p className="text-gray-300 mb-2">問題：在一個提示中添加太多條件和約束</p>
                  <p className="text-green-400 text-sm">解決方案：將複雜請求分解成多個簡單的提示</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">3. 不提供背景</h4>
                  <p className="text-gray-300 mb-2">問題：「解釋這個概念」（不說明是什麼概念）</p>
                  <p className="text-green-400 text-sm">解決方案：「向沒有技術背景的初學者解釋機器學習」</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">4. 忽視輸出格式</h4>
                  <p className="text-gray-300 mb-2">問題：不指定您希望回應的結構</p>
                  <p className="text-green-400 text-sm">解決方案：「用項目符號提供您的答案，並附上簡短解釋」</p>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">💡 記住</h4>
                  <p className="text-gray-300">提示工程是迭代的。不要期望立即獲得完美結果。根據AI的回應改進您的提示以獲得更好的結果。</p>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ]
};

// 測驗部分
const Quiz = memo(() => {
  const { language } = useLanguage();
  const questions = language === 'zh-TW' ? zhQuizQuestions : enQuizQuestions;
  const isZhTW = language === 'zh-TW';
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isZhTW ? '第一課測驗' : 'Lesson 1 Quiz'}
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
  
  const isZhTW = language === 'zh-TW';
  
  // 處理測驗切換
  const handleQuizToggle = useCallback(() => {
    setShowQuiz(!showQuiz);
    if (!showQuiz) {
      setCurrentSection('quiz');
    }
  }, [showQuiz]);
  
  // 處理項目選擇
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* 側邊欄 */}
          <div className="w-80 flex-shrink-0">
            <LessonSidebar
              sections={sections}
              selectedKey={currentSection}
              onSelectItem={handleItemSelect}
              isZhTW={isZhTW}
              isCompleted={isCompleted}
            />
          </div>
          
          {/* 主要內容 */}
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