import React, { useState, useMemo, memo } from 'react';
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
    q: '1. Which of the following is the best practice for writing an effective prompt?',
    options: [
      'Ensure the prompt is clear and specific, and includes background information',
      'Make the prompt as vague as possible to let the AI generate freely',
      'Repeat the same word multiple times to emphasise importance',
      'Avoid setting any format restrictions',
    ],
    answer: 0,
  },
  {
    q: '2. What is the primary purpose of role-play prompts in generative AI?',
    options: [
      "To guide the AI to assume a specific role, helping it generate content that is more aligned with the user's needs",
      'To let the AI automatically choose the most suitable response style',
      'To reduce the amount of input data required by the AI',
      'To test the AI\'s creativity and logical reasoning abilities',
    ],
    answer: 0,
  },
  {
    q: '3. Which element is most important to improve the effectiveness of a prompt in generative AI?',
    options: [
      'Provide sufficient context and data to ensure the prompt is well-grounded',
      'Input multiple vague instructions to stimulate the AI\'s creativity',
      'Provide the simplest instructions, avoiding excessive detail',
      "Emphasise the use of highly technical terms to challenge the model's understanding",
    ],
    answer: 0,
  },
  {
    q: '4. How should "output indicators" be set when crafting a prompt to guide the AI in generating appropriate responses?',
    options: [
      'Define the tone, style, length, and format of the output',
      'Only ask the AI to provide a brief response without specifying the format',
      'Provide a large amount of data without setting specific requirements',
      'Only ask for a random response',
    ],
    answer: 0,
  },
  {
    q: '5. Which feature of prompt engineering tools helps users improve the effectiveness of their prompts?',
    options: [
      'Provide instant feedback, allowing users to refine their prompts for better results',
      'Help users generate datasets to support the generated content',
      'Automatically rewrite prompts into code',
      'Restrict prompts to a pre-defined input format',
    ],
    answer: 0,
  },
];

// Define Cantonese quiz questions
const zhQuizQuestions: QuizQuestion[] = [
  {
    q: '1. ä»¥ä??ªä??…æ˜¯å¯«å¥½?ç¤º?„æ?ä½³å?æ³•ï?',
    options: [
      'ç¢ºä??ç¤º?§å®¹?·é?æ¸…æ™°ï¼Œä¸¦?…å«?Œæ™¯è³‡æ?',
      '?¡é?æ¨¡ç??ç¤ºï¼Œè?AI?ªç”±?¼æ®',
      '?è??¸å??„è?èªä?å¼·èª¿?è???,
      '?¿å?è¨­ç½®ä»»ä??¼å??åˆ¶',
    ],
    answer: 0,
  },
  {
    q: '2. ?¨ç??å?AIä¸­ï?è§’è‰²?®æ?ï¼ˆRole-playï¼‰æ?ç¤ºç?ä¸»è??®ç??¯ï?',
    options: [
      'å¼•å?AI?®æ??¹å?è§’è‰²ï¼Œå¹«?©ç??æ›´è²¼è??€æ±‚ç??§å®¹',
      'è®“AI?½è‡ª?•é¸?‡æ??©å??„å?ç­”é¢¨??,
      'æ¸›å?AI?€?€?„è¼¸?¥æ•¸?šé?',
      'æ¸¬è©¦AI?„å‰µ? æ€§å??è¼¯?½å?',
    ],
    answer: 0,
  },
  {
    q: '3. è¦æ?é«˜ç??å?AI?„æ?ç¤ºæ??œï?ä»¥ä??ªå€‹å?ç´ æ??ºé?è¦ï?',
    options: [
      '?ä??…å??„ä?ä¸‹æ??Œæ•¸?šï?ç¢ºä??ç¤º?‰æ ¹?‰æ?',
      'è¼¸å…¥å¤šå€‹æ¨¡ç³Šä?æ¸…ç??‡ä»¤ï¼Œæ??¼AI?µé€ æ€?,
      '?ªæ?ä¾›æ?ç°¡å–®?„æ?ä»¤ï??¿å??å?è©³ç´°è¦æ?',
      'å¼·èª¿ä½¿ç”¨é«˜æ·±?„å?æ¥­è?èªï??‘æˆ°æ¨¡å??„ç?è§?ƒ½??,
    ],
    answer: 0,
  },
  {
    q: '4. ?¨ç·¨å¯«æ?ç¤ºæ?ï¼Œå?ä½•è¨­ç½?è¼¸å‡º?‡æ?"ï¼ˆOutput Indicatorï¼‰æ??©æ–¼?‡å?AI?Ÿæ??ˆé©?„å??‰ï?',
    options: [
      'å®šç¾©è¼¸å‡º?„è?æ°?€é¢¨?¼ã€é•·åº¦ã€æ ¼å¼ç?è¦æ?',
      '?ªè?æ±‚AI?ä?ç°¡çŸ­?„å??‰ï?ä¸è¨­?¼å?è¦æ?',
      '?ä?å¤§é??¸æ?ä½†æ??‰è¨­ç½®å…·é«”è?æ±?,
      '?ªè?æ±‚ç??ä??‹éš¨æ©Ÿç??ç?',
    ],
    answer: 0,
  },
  {
    q: '5. ?¨æ?ç¤ºå·¥ç¨‹å·¥?·ä¸­ï¼Œå“ª?‹å??½å¹«?©ä½¿?¨è€…æ”¹?²æ?ç¤ºç??ˆæ?ï¼?,
    options: [
      '?ä??³æ??é?ï¼Œè?ä½¿ç”¨?…èª¿?´æ?ç¤ºä»¥?”åˆ°?€ä½³æ???,
      'å¹«åŠ©ä½¿ç”¨?…ç??æ•¸?šé?ä»¥æ”¯?ç??å…§å®?,
      '?ªå?å°‡æ?ç¤ºé?å¯«æ?ç¨‹å?ç¢?,
      '?åˆ¶?ç¤º?ªèƒ½?‰ç…§?ä??ºå??¼å?è¼¸å…¥',
    ],
    answer: 0,
  },
];




const lesson2Sections: { en: LessonSection[], 'zh-HK': LessonSection[] } = {
  en: [
    {
      group: 'Lesson 2: Prompt Structure',
      groupIcon: '?§©',
      items: [
        {
          key: 'instruction',
          title: 'Instruction',
          icon: '??',
          duration: '3 min',
          description: 'Tell the AI what to do, clearly define action requirements and goals.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Instruction</h3>
              <p>This part tells the model what to do and is the most fundamental component. Instructions ensure the model understands your requirements and generates content in the correct direction.</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship."</blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Action Requirement:</b> Specifies the role (Career Advisor) and tells the AI to write a persuasive LinkedIn Summary.</li>
                <li><b>Goal:</b> The purpose is to help a student (majoring in data science) seek a remote internship, providing a clear action framework.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'context',
          title: 'Context',
          icon: '??',
          duration: '2 min',
          description: 'Provide background information to help the AI understand the situation.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Context</h3>
              <p>Context provides important situational information that helps the AI understand requirements and scenarios, making the generated content more relevant and in-depth. Without context, the generated content may lose focus.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">Example:<br/>"The student has experience in Python and machine learning, and wants to work in a startup."</blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Background Information:</b> Provides the AI with information about the student's Python and machine learning experience, and indicates they want to work in a startup.</li>
                <li><b>Purpose:</b> Offers the student's skills and career goals background, helping the AI generate a LinkedIn Summary suitable for startups and related fields.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'input-data',
          title: 'Input Data',
          icon: '??',
          duration: '2 min',
          description: 'Provide specific information or data to help the AI generate more precise content.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Input Data</h3>
              <p>This part refers to the specific information or data you provide to the AI, which can be a dataset, a piece of text, or other supplementary materials that help the model generate more specific and precise content.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Professional Example:</strong><br/>
                "You have access to a comprehensive dataset containing Pacific Ocean temperature records from 2010-2023 and corresponding sea level measurements. The student's portfolio includes three machine learning projects: a predictive model for stock prices (Python/TensorFlow), a recommendation system for e-commerce (Python/Scikit-learn), and a sentiment analysis tool for social media (Python/NLTK). Additionally, they have completed internships at two tech startups and contributed to open-source projects on GitHub."
              </blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Comprehensive Data:</b> Provides specific datasets with timeframes and multiple data types, giving the AI rich context to work with.</li>
                <li><b>Detailed Portfolio:</b> Includes specific projects with technologies used, demonstrating depth of experience.</li>
                <li><b>Contextual Relevance:</b> All data points are relevant to the career guidance scenario, helping the AI generate more targeted recommendations.</li>
                <li><b>Professional Depth:</b> The expanded information allows the AI to create more nuanced and professional responses.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'output-indicator',
          title: 'Output Indicator',
          icon: '??',
          duration: '2 min',
          description: 'Define the format, tone, length, and other requirements for the answer.',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Output Indicator</h3>
              <p>Output indicators specify the format, style, length, or other requirements for the generated content, allowing the AI to know what kind of content it should generate.</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Comprehensive Example:</strong><br/>
                "Structure your response as a professional LinkedIn summary with the following specifications: Use a confident yet approachable tone, keep it between 150-200 words, include at least two specific case studies with quantifiable results, highlight technical skills prominently, incorporate industry-relevant keywords for remote work and startups, format with short paragraphs for readability, and conclude with a clear call-to-action for potential employers."
              </blockquote>
              <p className="mt-2 font-semibold">Analysis:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Format Specification:</b> Clearly defines the document type (LinkedIn summary) and structural requirements.</li>
                <li><b>Tone Requirements:</b> Specifies both confident and approachable characteristics, providing clear emotional direction.</li>
                <li><b>Length Parameters:</b> Gives specific word count (150-200 words) for precise output control.</li>
                <li><b>Content Requirements:</b> Demands two case studies with quantifiable results, ensuring substance and credibility.</li>
                <li><b>SEO Optimization:</b> Includes keyword strategy for remote work and startup industries.</li>
                <li><b>Readability Focus:</b> Specifies formatting for better user experience.</li>
                <li><b>Action-Oriented:</b> Requires a call-to-action to drive engagement.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'full-example',
          title: 'Full Example Prompt (Complete Structure)',
          icon: '??',
          duration: '2 min',
          description: 'Complete structure demonstration',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">Full Example Prompt (Complete Structure)</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship.</li>
                <li><b>Context:</b> The student has experience in Python and machine learning, and wants to work in a startup.</li>
                <li><b>Input Data:</b> N/A (This example doesn't require specific data like temperature records, but could include a list of skills or project experiences if necessary).</li>
                <li><b>Output Indicator:</b> Make sure the response is in a formal tone and includes at least two case studies.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'practice',
          title: 'Practice Exercise',
          icon: '?‘©?ğ??,
          duration: '3 min',
          description: 'Practice breaking down the four elements of a prompt',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?‘©?ğ??Practice Exercise</h3>
              <p>Now, try breaking down the following prompt into the four elements, and think about how you could improve it:</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>Practice Prompt:</strong><br/>
                "You are a customer service representative at a premium e-commerce company. Write a professional response to a customer complaint about a delayed order. The customer has been waiting for 10 days beyond the promised delivery date for their anniversary gift. Apologize sincerely for the delay, explain the reason (shipping partner issues), offer a meaningful solution (expedited delivery + discount), and maintain the company's reputation for excellent customer service."
              </blockquote>
              <p className="mt-2 font-semibold">??Enhanced Analysis Solution</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a customer service representative at a premium e-commerce company. Write a professional response to a customer complaint about a delayed order.</li>
                <li><b>Context:</b> The customer has been waiting for 10 days beyond the promised delivery date for their anniversary gift.</li>
                <li><b>Input Data:</b> Specific delay timeframe (10 days), occasion (anniversary gift), reason (shipping partner issues), and company positioning (premium e-commerce).</li>
                <li><b>Output Indicator:</b> Apologize sincerely, explain the reason, offer a meaningful solution (expedited delivery + discount), and maintain the company's reputation for excellent customer service.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'quiz',
          title: 'Quiz',
          icon: '??',
          duration: '5 min',
          description: 'Complete the following multiple-choice questions to test your understanding of prompt structure.',
          type: 'quiz',
          content: <QuizCard questions={enQuizQuestions} isZhTW={false} />
        },
      ]
    },
  ],
  'zh-HK': [
    {
      group: 'èª²å? 2ï¼šå„ªè³ªæ?ç¤ºç?æ§?,
      groupIcon: '?§©',
      items: [
        {
          key: 'instruction',
          title: '?‡ä»¤',
          icon: '??',
          duration: '3?†é?',
          description: '?Šè¨´AIè¦å?ä»€éº¼ï??ç¢ºè¡Œå?è¦æ??Œç›®æ¨™ã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?‡ä»¤</h3>
              <p>?™ä??¨å??¯å?è¨´æ¨¡?‹è??šä?éº¼ï??¯æ??ºæœ¬?„éƒ¨?†ã€‚æ?ä»¤èƒ½å¤ ç¢ºä¿æ¨¡?‹èƒ½å¤ ç?è§???„é?æ±‚ï?ä¸¦ä??è?æ­?¢º?„æ–¹?‘å»?Ÿæ??§å®¹??/p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>å°ˆæ¥­ç¯„ä?ï¼?/strong><br/>
                "?¨æ˜¯ä¸€ä½è?æ·±ç??·æ¥­é¡§å??ŒLinkedInå°ˆå®¶?‚è??ºä?ä½ä¸»ä¿®æ•¸?šç?å­¸ç?å¤§å­¸?Ÿæ’°å¯«ä?ä»½å…·?‰èªª?å??„LinkedIn?‹äºº?˜è?ï¼Œè©²å­¸ç?æ­?œ¨å°‹æ?ä¸€?‹é?ç¨‹å¯¦ç¿’æ??ƒã€‚è?ç¢ºä??˜è??½å?çªå‡º?¶æ?è¡“èƒ½?›ã€å­¸ç¿’ç†±å¿±å?å°å??µå…¬?¸æ??–ç??©æ??§ã€?
              </blockquote>
              <p className="mt-2 font-semibold">?†æ?ï¼?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>è§’è‰²?ç¢ºï¼?/b>?‡å?äº†ã€Œè?æ·±è·æ¥­é¡§?ã€å??ŒLinkedInå°ˆå®¶?å…©?èº«ä»½ï??ä?å°ˆæ¥­æ¬Šå??Ÿã€?/li>
                <li><b>è¡Œå?è¦æ?ï¼?/b>?ç¢º?‡ç¤ºè¦æ’°å¯«ã€Œå…·?‰èªª?å??„LinkedIn?‹äºº?˜è??ï??®æ?æ¸…æ™°??/li>
                <li><b>?®æ??—çœ¾ï¼?/b>?‡å?äº†ã€Œä¸»ä¿®æ•¸?šç?å­¸ç?å¤§å­¸?Ÿã€ï?å¹«åŠ©AI?†è§£?§å®¹?¹å???/li>
                <li><b>?·é??®æ?ï¼?/b>?Œå?æ±‚é?ç¨‹å¯¦ç¿’æ??ƒã€çµ¦äºˆä??ç¢º?„è·æ¥­ç›®æ¨™æ??¶ã€?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'context',
          title: '?Œæ™¯',
          icon: '??',
          duration: '2?†é?',
          description: 'çµ¦AI?Œæ™¯è³‡æ?ï¼Œè?å®ƒæ??½æ?å¢ƒã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?Œæ™¯</h3>
              <p>?Œæ™¯?ä?äº†é?è¦ç??…å?ï¼Œå¹«?©AI?†è§£?€æ±‚å??…å?ï¼Œä¸¦ä¸”è??Ÿæ??„å…§å®¹æ›´? ç›¸?œå??‰æ·±åº¦ã€‚æ??‰è??¯ç?è©±ï??Ÿæ??„å…§å®¹å¯?½æ?å¤±å»?¦é???/p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>è©³ç´°?Œæ™¯ç¯„ä?ï¼?/strong><br/>
                "è©²å­¸?Ÿåœ¨?å»?©å¹´ä¸­ç´¯ç©ä?è±å??„Python?Œæ??¨å­¸ç¿’ç?é©—ï??…æ‹¬å®Œæ?äº†ä??‹ä¸»è¦é??®å??©æ¬¡å¯¦ç??‚ä??¹åˆ¥å¸Œæ??¨å?æ»¿å‰µ?°ç²¾ç¥ç??å‰µ?¬å¸?°å?ä¸­å·¥ä½œï?æ¸´æ??ƒè??¢å??‹ç™¼?„æ—©?Ÿé?æ®µï?ä¸¦ä?é¡˜æ??¥å?å¿«ç?å¥ç?å·¥ä??‘æˆ°?‚æ­¤å¤–ï?ä»–å?? ç?å·¥ä?æ¨¡å??å¸¸?©æ?ï¼Œå…·?™è‰¯å¥½ç??ªæ?ç®¡ç??Œæ??šèƒ½?›ã€?
              </blockquote>
              <p className="mt-2 font-semibold">?†æ?ï¼?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>?‚é?æ¡†æ¶ï¼?/b>?Œé??»å…©å¹´ã€æ?ä¾›ä?ç¶“é??„æ??“æ·±åº¦ï?å¢å??¯ä¿¡åº¦ã€?/li>
                <li><b>?·é?ç¶“é?ï¼?/b>?Œä??‹ä¸»è¦é??®å??©æ¬¡å¯¦ç??çµ¦äºˆä??å??„æ?å°±è??¯ã€?/li>
                <li><b>å·¥ä??å¥½ï¼?/b>?ç¢ºè¡¨é?å°å??µå…¬?¸ç’°å¢ƒç??å¥½?Œå?? ã€?/li>
                <li><b>?©æ??½å?ï¼?/b>çªå‡ºäº†é?ç¨‹å·¥ä½œå??ªæ?ç®¡ç??„èƒ½?›ï?ç¬¦å??¾ä»£?·å ´?€æ±‚ã€?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'input-data',
          title: 'è¼¸å…¥?¸æ?',
          icon: '??',
          duration: '2?†é?',
          description: '?ä??·é?è³‡æ??–æ•¸?šï?è®“AI?Ÿæ??´ç²¾æº–å…§å®¹ã€?,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">è¼¸å…¥?¸æ?</h3>
              <p>?™éƒ¨?†æ˜¯?‡ä?çµ¦AI?ä??„å…·é«”è??™æ??¸æ?ï¼Œå¯ä»¥æ˜¯ä¸€?‹è??™é??ä?æ®µæ?å­—æ??…å…¶ä»–è??…è??™ï?å¹«åŠ©æ¨¡å??Ÿæ??´å…·é«”å?ç²¾æ??„å…§å®¹ã€?/p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"You have access to a dataset with Pacific Ocean temperature records and sea level measurements."</blockquote>
              <p className="mt-2 font-semibold">?†æ?ï¼?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li>è³‡æ?ï¼šé€™éƒ¨?†æ?ä¾›ä??·é??„æ•¸?šé?ï¼ˆPacific Ocean temperature records ??sea level measurementsï¼‰ã€‚é??¶é€™å€‹ä?å­è??Œæ™¯?Œè·ä½ç„¡?œï?ä½†å¯ä»¥ç?è§?‚ºAI?¨æ’°å¯«å±¥æ­·æ??…æ?ç« æ?ï¼Œå¯?½é?è¦è??¯æ•¸?šä??¯æ?å®ƒç??†æ??–å»ºè­°ã€?/li>
                <li>ä½œç”¨ï¼šæ•¸?šç”¨ä¾†æ”¯?è?é»ã€ä?å­æ??·é??†æ?ï¼Œæ?ä¾›ç²¾æº–ç??ƒè€ƒã€?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'output-indicator',
          title: 'è¼¸å‡º?‡æ?',
          icon: '??',
          duration: '2?†é?',
          description: 'å®šç¾©ç­”æ??¼å??è?æ°?€é•·åº¦ç???,
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">è¼¸å‡º?‡æ?</h3>
              <p>è¼¸å‡º?‡æ??‡å?äº†ç??å…§å®¹ç??¼å??é¢¨?¼ã€é•·åº¦æ??…å…¶ä»–è?æ±‚ï?å¾è€Œè?AI?¥é??‰è©²?Ÿæ??æ¨£?„å…§å®¹ã€?/p>
              <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-200">Example:<br/>"Make sure the response is in a formal tone and includes at least two case studies."</blockquote>
              <p className="mt-2 font-semibold">?†æ?ï¼?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li>é¢¨æ ¼è¦æ?ï¼šå¼·èª¿ç??ç??§å®¹è¦æ??Œæ­£å¼è?æ°?€ï??™å€‹èƒ½å¤ å¹«?©AIç¢ºä??¢ç??„å…§å®¹é©?ˆå?æ¥­ç”¨?”ï?ä¾‹å?å±¥æ­·?–è€…å·¥ä½œç”³è«‹ã€?/li>
                <li>?·é?è¦æ?ï¼šå??¬è‡³å°‘å…©?‹å…·é«”ç??Œæ?ä¾‹ç?ç©¶ã€ï??™å€‹è?AI?ç¢º?¥é?è¦æ?å¯¦é?ç¯„ä?ï¼Œå?? èªª?å???/li>
              </ul>
            </div>
          )
        },
        {
          key: 'full-examples',
          title: 'ç¶œå?ç¯„ä? Promptï¼ˆå??´ç?æ§‹ï?',
          icon: '??',
          duration: '2?†é?',
          description: 'å®Œæ•´çµæ?ç¤ºç?',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2"> ç¶œå?ç¯„ä? Promptï¼ˆå??´ç?æ§‹ï?</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>Instruction:</b> You are a career advisor. Write a persuasive LinkedIn summary for a student majoring in data science who is seeking a remote internship.</li>
                <li><b>Context:</b> The student has experience in Python and machine learning, and wants to work in a startup.</li>
                <li><b>Input Data:</b> N/A (This example doesn't require specific data like temperature records, but could include a list of skills or project experiences if necessary).</li>
                <li><b>Output Indicator:</b> Make sure the response is in a formal tone and includes at least two case studies.</li>
              </ul>
            </div>
          )
        },
        {
          key: 'practice',
          title: 'ç·´ç?ï¼šæ?è§???†è§£',
          icon: '?‘©?ğ??,
          duration: '3?†é?',
          description: 'ç·´ç??†è§£Prompt?›å¤§?ƒç?',
          type: 'reading',
          content: (
            <div>
              <h3 className="text-xl font-bold mb-2">?‘©?ğ??ç·´ç?ï¼šæ?è§???†è§£</h3>
              <p>?¾åœ¨ï¼Œä??¯ä»¥ç·´ç?å°‡ä??¢ç? Prompt ?†è§£?å??‹å?ç´ ï?ä¸¦æ€è€ƒå?ä½•å„ª?–ï?</p>
              <blockquote className="border-l-4 border-green-400 pl-4 my-2 text-green-100">
                <strong>?²é?ç·´ç?é¡Œï?</strong><br/>
                ?Œä??¯ä?ä½é?ç´šé›»?†å®¢?¶æ??™ä»£è¡¨ã€‚è?å°ˆæ¥­?æ?ä¸€ä½å®¢?¶å??¼è??æ‰¿è«¾äº¤ä»˜æ—¥??0å¤©ç?è¨‚å–®å»¶é²?•è¨´?‚å®¢?¶æ­£?¨ç?å¾…é?è¦ç??±å¹´ç´€å¿µç¦®?©ã€‚è??Ÿè??°ç‚ºå»¶é²?“æ?ï¼Œè§£?‹å?? ï??©æ??ˆä?å¤¥ä¼´?é?ï¼‰ï??ä??‰æ?ç¾©ç?è§?±º?¹æ?ï¼ˆå??¥é????˜æ‰£è£œå?ï¼‰ï?ä¸¦ç¶­è­·å…¬?¸åœ¨?ªè³ªå®¢æˆ¶?å??¹é¢?„è²è­½ã€‚ã€?
              </blockquote>
              <p className="mt-2 font-semibold">??å¢å¼·?ˆç?æ¡ˆæ?è§??ä¾?/p>
              <ul className="list-disc ml-6 space-y-1">
                <li><b>?‡ä»¤ï¼?/b>ä½ æ˜¯ä¸€ä½é?ç´šé›»?†å®¢?¶æ??™ä»£è¡¨ã€‚è?å°ˆæ¥­?æ?ä¸€ä½å®¢?¶å??¼è??®å»¶?²ç??•è¨´??/li>
                <li><b>?Œæ™¯ï¼?/b>å®¢æˆ¶ç­‰å?è¶…é??¿è«¾äº¤ä??¥æ?10å¤©ç??è??±å¹´ç´€å¿µç¦®?©ã€?/li>
                <li><b>è¼¸å…¥?¸æ?ï¼?/b>?·é?å»¶é²?‚é?æ¡†æ¶ï¼?0å¤©ï??å ´?ˆï??±å¹´ç´€å¿µç¦®?©ï??å?? ï??©æ??ˆä?å¤¥ä¼´?é?ï¼‰ã€å…¬?¸å?ä½ï?é«˜ç??»å?ï¼‰ã€?/li>
                <li><b>è¼¸å‡º?‡æ?ï¼?/b>?Ÿè??“æ?ï¼Œè§£?‹å?? ï??ä??‰æ?ç¾©ç?è§?±º?¹æ?ï¼ˆå??¥é????˜æ‰£è£œå?ï¼‰ï?ä¸¦ç¶­è­·å…¬?¸å„ªè³ªå®¢?¶æ??™è²è­½ã€?/li>
              </ul>
            </div>
          )
        },
        {
          key: 'quiz',
          title: 'å°æ¸¬é©?,
          icon: '??',
          duration: '5?†é?',
          description: 'å®Œæ?ä»¥ä??¸æ?é¡Œï?æ¸¬è©¦ä½ å??ªè³ª?ç¤ºçµæ??„ç?è§?€?,
          type: 'quiz',
          content: <QuizCard questions={zhQuizQuestions} isZhTW={true} />
        },
      ]
    }
  ]
};



const PromptEngineeringLesson2: React.FC = memo(() => {
  const { language } = useLanguage();
  const isZhTW = language === 'zh-HK';
  const [selectedKey, setSelectedKey] = useState(() => {
    const sections = isZhTW ? lesson2Sections['zh-HK'] : lesson2Sections.en;
    return sections[0]?.items?.[0]?.key || '';
  });
  
  // è¨˜æ†¶??sections ?¿å?ä¸å?è¦é??°è?ç®?
  const sections = useMemo(() => 
    isZhTW ? lesson2Sections['zh-HK'] : lesson2Sections.en, 
    [isZhTW]
  );

  // ä½¿ç”¨ä¾†è‡ª LessonContent ??hooks
  const { isCompleted } = useLessonCompletion();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="flex pt-20">
        <LessonSidebar
          sections={sections}
          selectedKey={selectedKey}
          onSelectItem={setSelectedKey}
          isZhTW={isZhTW}
          isCompleted={isCompleted}
        />
        <LessonContent
          sections={sections}
          selectedKey={selectedKey}
          onSelectItem={setSelectedKey}
          isZhTW={isZhTW}
        />
      </div>
    </div>
  );
});

PromptEngineeringLesson2.displayName = 'PromptEngineeringLesson2';

export default PromptEngineeringLesson2; 
