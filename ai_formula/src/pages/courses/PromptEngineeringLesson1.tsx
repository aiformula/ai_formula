import React, { useState, useMemo, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import QuizCard from '@/components/course/QuizCard';
import LessonSidebar from '@/components/course/LessonSidebar';
import LessonContent, { useLessonCompletion } from '@/components/course/LessonContent';
import type { LessonItem, LessonSection } from '@/components/course/LessonSidebar';
import type { QuizQuestion } from '@/components/course/QuizCard';

// Quiz ?é?å®šç¾©

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
    q: '1. ?ç¤ºå·¥ç??„ä¸»è¦ç›®?„æ˜¯ä»€éº¼ï?',
    options: [
      'è¨­è??Œå„ª?–è¼¸?¥æ?ä»¤ï?å¼•å?AIæ¨¡å??Ÿæ?æº–ç¢ºä¸”ç›¸?œç?è¼¸å‡º',
      '?ºAIæ¨¡å?ç·¨å¯«ä»?¢¼',
      '?µå»ºæ©Ÿå™¨å­¸ç??¸æ???,
      '?…æ¸¬è©¦AIæ¨¡å??§èƒ½',
    ],
    answer: 0,
  },
  {
    q: '2. ä»¥ä??ªå€‹ç?ä»¶é€šå¸¸ä¸æ˜¯çµæ??¯å¥½?„æ?ç¤ºç?ä¸€?¨å?ï¼?,
    options: [
      'æ¸…æ™°?„æ?ä»?,
      'ä¸Šä??‡ä¿¡??,
      '?¨æ??¡é??„æ???,
      '?Ÿæ??„è¼¸?ºæ ¼å¼?,
    ],
    answer: 2,
  },
  {
    q: '3. ä»€éº¼è??ç¤º?´æ??ˆï?',
    options: [
      '?¡å¯?½æ¨¡ç³?,
      '?ä??·é??æ??°ç??‡ä»¤?Œå??†ç?ä¸Šä???,
      '?ªä½¿?¨ç°¡?®ç?è©è?',
      'è®“å?æ¥µå…¶?—é•·',
    ],
    answer: 1,
  },
  {
    q: '4. ?ºä?éº¼ä?ä¸‹æ??¨æ?ç¤ºä¸­å¾ˆé?è¦ï?',
    options: [
      'å®ƒè??ç¤º?´é•·',
      'å®ƒæ?ä¾›è??¯ä¿¡?¯ï?å¹«åŠ©AI?´å¥½?°ç?è§??æ³?,
      'å®ƒæ?è®“AIæ¨¡å??°æ?',
      'å®ƒä?é»ä?ä¸é?è¦?,
    ],
    answer: 1,
  },
  {
    q: '5. ?¶æ?ç¤ºæ??‰çµ¦?ºæ??›ç??œæ?ï¼Œæ?ä½³æ–¹æ³•æ˜¯ä»€éº¼ï?',
    options: [
      '?¾æ?ä¸¦å?è©¦ä??Œç?AIæ¨¡å?',
      'ç¸®çŸ­?ç¤º',
      '?¹æ?è¼¸å‡ºè¿­ä»£?°æ”¹?²æ?ç¤?,
      'æ·»å??´å??¨æ?è©è?',
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
          icon: '?¯',
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
          icon: '?¨',
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
                  <h4 className="font-semibold text-blue-400 mb-2">?’¡ Pro Tips</h4>
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
          icon: '? ï?',
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
                  <h4 className="font-semibold text-yellow-400 mb-2">?’¡ Remember</h4>
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
      group: 'ç¬¬ä?èª²ï??ç¤ºå·¥ç??ºç?',
      groupIcon: '??',
      items: [
        {
          key: 'what-is-prompt-engineering',
          title: 'ä»€éº¼æ˜¯?ç¤ºå·¥ç?ï¼?,
          icon: '?¯',
          duration: '4 ?†é?',
          description: '?ç¤ºå·¥ç?æ¦‚å¿µ?Šé?è¦æ€§ä?ç´¹ã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">ä»€éº¼æ˜¯?ç¤ºå·¥ç?ï¼?/h3>
              <p className="mb-4">?ç¤ºå·¥ç??¯è¨­è¨ˆå??ªå?è¼¸å…¥?‡ä»¤ï¼ˆæ?ç¤ºï??„è?è¡“å?ç§‘å­¸ï¼Œç›®?„æ˜¯å¼•å?AIæ¨¡å??Ÿæ?æº–ç¢º?ç›¸?œä??‰ç”¨?„è¼¸?ºã€‚å??¯é??¼å?ä½•è?AIç³»çµ±?‰æ?æºé€šä»¥?²å??€ä½³ç??œã€?/p>
              
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 mb-4">
                <h4 className="font-semibold text-blue-400 mb-2">?œéµå®šç¾©ï¼?/h4>
                <p className="text-gray-300">?ç¤º?¯æ‚¨?ä?çµ¦AIæ¨¡å??„æ??¬è¼¸?¥ï??¨æ–¼å¼•å??¶å??‰ã€‚å¯ä»¥æ?å®ƒæƒ³?æ?çµ¦å‡ºæ¸…æ™°?å…·é«”ç??‡ä»¤ä¾†ç²å¾—æ‚¨?³è??„è¼¸?ºã€?/p>
              </div>

              <p className="mb-4">å°±å??¨æ?çµ¦å?äº‹ä??‹ä»»?™ç??ç¢º?‡ä»¤ä¸€æ¨???ç¤ºå·¥ç?æ¶‰å??¶ä?AIæ¨¡å??½å??†è§£ä¸¦æ??ˆåŸ·è¡Œç??‡ä»¤??/p>

              <h4 className="font-semibold text-white mb-2">?ºä?éº¼é?è¦ï?</h4>
              <ul className="list-disc ml-6 space-y-2 text-gray-300">
                <li><strong>ç²¾ç¢º?§ï?</strong>ç²¾å?è£½ä??„æ?ç¤ºèƒ½?¢ç??´æ?ç¢ºå??¸é??„å???/li>
                <li><strong>?ˆç?ï¼?/strong>æ¸›å??²å??†æƒ³çµæ??€?€?„å?æ¬¡å?è©?/li>
                <li><strong>ä¸€?´æ€§ï?</strong>?‰åŠ©?¼ç¶­?AIè¼¸å‡º?„ä??´è³ª??/li>
                <li><strong>?§åˆ¶ï¼?/strong>è®“æ‚¨?´å¥½?°æ§?¶AI?„è??ºå?è¼¸å‡ºé¢¨æ ¼</li>
              </ul>
            </div>
          )
        },
        {
          key: 'core-principles',
          title: '?¸å??Ÿå?',
          icon: '??,
          duration: '5 ?†é?',
          description: 'è®“æ?ç¤ºæ??ˆç??ºæœ¬?Ÿå???,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?‰æ??ç¤º?„æ ¸å¿ƒå???/h3>
              
              <div className="space-y-6">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">1. æ¸…æ™°?Œå…·é«?/h4>
                  <p className="text-gray-300 mb-2">?ç¢ºèªªæ??¨å??›AI?šä?éº¼ã€‚æ¨¡ç³Šç??ç¤ºå°è‡´æ¨¡ç??„ç??œã€?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??ä¸å¥½ï¼šã€Œå¯«ä¸€äº›é??¼ç??„æ±è¥¿ã€?/p>
                    <p className="text-green-400 text-sm">??å¥½ï??Œå¯«ä¸€ç¯?00å­—ç?è³‡è??‡ç?ï¼Œä?ç´¹è€å¹´?¬æ??¥é??•ç?å¥½è???/p>
                  </div>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">2. ?ä??Œæ™¯</h4>
                  <p className="text-gray-300 mb-2">?Œæ™¯?‰åŠ©?¼AI?†è§£?…æ?ä¸¦é©?¶å??‰ã€?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??ä¸å¥½ï¼šã€Œè§£?‹é€™å€‹æ?å¿µã€?/p>
                    <p className="text-green-400 text-sm">??å¥½ï??Œå??‰åŸºç¤æ•¸å­¸ç?è§??é«˜ä¸­?Ÿè§£?‹æ??¨å­¸ç¿’ã€?/p>
                  </div>
                </div>

                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">3. å®šç¾©è¼¸å‡º?¼å?</h4>
                  <p className="text-gray-300 mb-2">?‡å??¨å??›å??‰ç??¼å? - ?·åº¦?é¢¨?¼ã€ç?æ§‹ç???/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-red-400 text-sm">??ä¸å¥½ï¼šã€Œå??ºä?äº›å¥½?•ã€?/p>
                    <p className="text-green-400 text-sm">??å¥½ï??Œç”¨?…ç›®ç¬¦è??—å‡º5?‹å¥½?•ï?æ¯å€‹éƒ½?‰ç°¡?­è§£?‹ã€?/p>
                  </div>
                </div>

                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-400 mb-2">4. ä½¿ç”¨ç¯„ä?</h4>
                  <p className="text-gray-300 mb-2">ç¯„ä?å¹«åŠ©AI?†è§£?¨è??¾ç?é¢¨æ ¼?Œæ ¼å¼ã€?/p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-green-400 text-sm">??å¥½ï??Œå¯«ä¸€?‹å??™å€‹ç?ä¾‹ç??¢å??è¿°ï¼š[æ¨?œ¬?è¿°]??/p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'types-of-prompts',
          title: '?ç¤ºé¡å?',
          icon: '?¨',
          duration: '4 ?†é?',
          description: 'ä¸å?é¡åˆ¥?„æ?ç¤ºå??¶æ??¨ã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?ç¤ºé¡å?</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">1. ?‡ä»¤å¼æ?ç¤?/h4>
                  <p className="text-gray-300 mb-2">?´æ¥?½ä»¤?Šè¨´AIè¦å?ä»€éº¼ã€?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?Œå??™ç??‡ç?ç¸½ç????‹è?é»ã€?/p>
                    <p className="text-gray-300">?Œå??™æ®µ?‡å?ç¿»è­¯?è¥¿?­ç?èªã€?/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">2. è§’è‰²?®æ??ç¤º</h4>
                  <p className="text-gray-300 mb-2">è¦æ?AI?¡ç”¨?¹å?è§’è‰²?–äºº?¼ã€?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?Œä??ºå?æ¥­å??´é¡§?ï?ä¸¦ä?...??/p>
                    <p className="text-gray-300">?Œä??¯ä?ä½æ??¼åŠ©äººç??å¸«ï¼Œæ­£?¨è§£??..??/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">3. ?é?å¼æ?ç¤?/h4>
                  <p className="text-gray-300 mb-2">?å‡º?¹å??é?ä»¥ç²å¾—é?å°æ€§è?è¨Šã€?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?Œå??Ÿèƒ½æºç?ä¸»è??ªé??¯ä?éº¼ï???/p>
                    <p className="text-gray-300">?Œæ?å¦‚ä??é?å¯«ä??€å·§ï???/p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-yellow-400 mb-2">4. ?µæ??ç¤º</h4>
                  <p className="text-gray-300 mb-2">é¼“å‹µ?µæ??–æƒ³?æ€§å??‰ã€?/p>
                  <div className="bg-gray-700/50 p-3 rounded text-sm">
                    <p className="text-gray-300">?Œå¯«ä¸€?‹é??¼ç™¼?¾æ??Ÿç?æ©Ÿå™¨äººç??­æ?äº‹ã€?/p>
                    <p className="text-gray-300">?Œç‚ºæ¸›å?å¡‘è?å»¢ç‰©?¦å?æ¿€??0?‹å‰µ?°è§£æ±ºæ–¹æ¡ˆã€?/p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'best-practices',
          title: '?€ä½³å¯¦è¸?,
          icon: '??',
          duration: '5 ?†é?',
          description: '?¶ä??‰æ??ç¤º?„ç?é©—è?ç­–ç•¥??,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?ç¤ºå·¥ç??„æ?ä½³å¯¦è¸?/h3>
              
              <div className="space-y-4">
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">??è©²å???/h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>å¾æ??°ã€å…·é«”ç??‡ä»¤?‹å?</li>
                    <li>?ä??¸é??Œæ™¯?Œä?ä¸‹æ?</li>
                    <li>?‡å??€?€?„è¼¸?ºæ ¼å¼?/li>
                    <li>?¡å¯?½ä½¿?¨ç?ä¾?/li>
                    <li>æ¸¬è©¦?Œè¿­ä»?‚¨?„æ?ç¤?/li>
                    <li>ä¿æ?èªè??„ä??´æ€?/li>
                    <li>å°‡è??œä»»?™å?è§??è¼ƒå??„æ­¥é©?/li>
                  </ul>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">??ä¸è©²?šç?</h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li>ä¸è?æ¨¡ç??–å«ç³Šä?æ¸?/li>
                    <li>ä¸è??‡è¨­AI?¥é??ªèªª?ç??Œæ™¯</li>
                    <li>ä¸è?ä¸å?è¦åœ°ä½¿ç”¨?æ–¼è¤‡é??„è?è¨€</li>
                    <li>ä¸è?å¿½è??¼å??„é?è¦æ€?/li>
                    <li>ä¸è??Ÿæ?ç¬¬ä?æ¬¡å°±?‰å?ç¾ç???/li>
                    <li>ä¸è?è®“æ?ç¤ºä?å¿…è??°å???/li>
                  </ul>
                </div>

                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">?’¡ å°ˆæ¥­?€å·?/h4>
                  <ul className="list-disc ml-6 space-y-1 text-gray-300">
                    <li><strong>è¿­ä»£ï¼?/strong>?¹æ?AI?„å??‰æ”¹?²æ‚¨?„æ?ç¤?/li>
                    <li><strong>æ¸¬è©¦è®Šå?ï¼?/strong>?—è©¦ä¸å??„æªè¾­ï??‹ç?ä»€éº¼æ??‰æ?</li>
                    <li><strong>ä½¿ç”¨ç´„æ?ï¼?/strong>è¨­å??Œé?ï¼ˆå??¸ã€è?èª¿ã€é¢¨?¼ï?</li>
                    <li><strong>?ˆæ¥?ç¤ºï¼?/strong>å°‡è??œä»»?™å?è§??ä¸€ç³»å?ç°¡å–®?ç¤º</li>
                    <li><strong>ä¿å?å¥½æ?ç¤ºï?</strong>ä¿ç??‰æ??ç¤º?„é??ˆä»¥ä¾¿é?è¤‡ä½¿??/li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          key: 'common-mistakes',
          title: 'å¸¸è??¯èª¤',
          icon: '? ï?',
          duration: '3 ?†é?',
          description: '?ç¤ºå·¥ç?ä¸­ç??¸å??·é˜±?Šå?ä½•é¿?ã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?€è¦é¿?ç?å¸¸è??¯èª¤</h3>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">1. å¤ªé?æ¨¡ç?</h4>
                  <p className="text-gray-300 mb-2">?é?ï¼šã€Œå¯«ä¸€äº›æ?è¶???±è¥¿??/p>
                  <p className="text-green-400 text-sm">è§?±º?¹æ?ï¼šã€Œå¯«ä¸€ç¯?50å­—ç??‡ç?ï¼Œä?ç´¹AIå°é†«?‚ä??¥ç?å½±éŸ¿ï¼Œé?é»é?æ³¨è¨º?·æ”¹?²ã€?/p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">2. ?åº¦è¤‡é??–æ?ç¤?/h4>
                  <p className="text-gray-300 mb-2">?é?ï¼šåœ¨ä¸€?‹æ?ç¤ºä¸­æ·»å?å¤ªå?æ¢ä»¶?Œç???/p>
                  <p className="text-green-400 text-sm">è§?±º?¹æ?ï¼šå?è¤‡é?è«‹æ??†è§£?å??‹ç°¡?®ç??ç¤º</p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">3. ä¸æ?ä¾›è???/h4>
                  <p className="text-gray-300 mb-2">?é?ï¼šã€Œè§£?‹é€™å€‹æ?å¿µã€ï?ä¸èªª?æ˜¯ä»€éº¼æ?å¿µï?</p>
                  <p className="text-green-400 text-sm">è§?±º?¹æ?ï¼šã€Œå?æ²’æ??€è¡“è??¯ç??å­¸?…è§£?‹æ??¨å­¸ç¿’ã€?/p>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">4. å¿½è?è¼¸å‡º?¼å?</h4>
                  <p className="text-gray-300 mb-2">?é?ï¼šä??‡å??¨å??›å??‰ç?çµæ?</p>
                  <p className="text-green-400 text-sm">è§?±º?¹æ?ï¼šã€Œç”¨?…ç›®ç¬¦è??ä??¨ç?ç­”æ?ï¼Œä¸¦?„ä?ç°¡çŸ­è§????/p>
                </div>

                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400 mb-2">?’¡ è¨˜ä?</h4>
                  <p className="text-gray-300">?ç¤ºå·¥ç??¯è¿­ä»???‚ä?è¦æ??›ç??³ç²å¾—å?ç¾ç??œã€‚æ ¹?šAI?„å??‰æ”¹?²æ‚¨?„æ?ç¤ºä»¥?²å??´å¥½?„ç??œã€?/p>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ]
};

// æ¸¬é??¨å?
const Quiz = memo(() => {
  const { language } = useLanguage();
  const questions = language === 'zh-HK' ? zhQuizQuestions : enQuizQuestions;
  const isZhTW = language === 'zh-HK';
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isZhTW ? 'ç¬¬ä?èª²æ¸¬é©? : 'Lesson 1 Quiz'}
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
  
  // ?•ç?æ¸¬é??‡æ?
  const handleQuizToggle = useCallback(() => {
    setShowQuiz(!showQuiz);
    if (!showQuiz) {
      setCurrentSection('quiz');
    }
  }, [showQuiz]);
  
  // ?•ç??…ç›®?¸æ?
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
          {/* ?´é?æ¬?*/}
          <div className="w-80 flex-shrink-0">
            <LessonSidebar
              sections={sections}
              selectedKey={currentSection}
              onSelectItem={handleItemSelect}
              isZhTW={isZhTW}
              isCompleted={isCompleted}
            />
          </div>
          
          {/* ä¸»è??§å®¹ */}
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
