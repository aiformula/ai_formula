import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, Clock, BookOpen, Target, Lightbulb, 
  CheckCircle, ChevronRight, Award, Users, Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationTheme: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';

  // 模擬主題數據
  const themes = {
    '1': {
      id: 1,
      themeTitle: isZhHK ? 'AI 商業自動化基礎：為你的事業裝上智慧引擎' : 'AI Business Automation Fundamentals: Powering Your Business with Smart Engine',
      themeDescription: isZhHK ? '這個部分將帶您了解什麼是 AI 自動化，以及它如何為您的企業節省時間、降低成本，成為最聰明的競爭優勢。' : 'This section will help you understand what AI automation is and how it can save time, reduce costs, and become the smartest competitive advantage for your business.',
      moduleTitle: isZhHK ? '課程模塊 1：打好地基，看懂趨勢' : 'Course Module 1: Building Foundation, Understanding Trends',
      duration: isZhHK ? '90分鐘 • 3單元' : '90min • 3 units',
      units: [
        {
          id: 1,
          title: isZhHK ? '單元 1：什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'Unit 1: What is "AI Business Automation"? Not just replacing manpower, but upgrading capabilities!',
          duration: '20分鐘',
          description: isZhHK ? '介紹傳統自動化 (如設定郵件排程) 與 AI 自動化的區別。AI 自動化能「理解、判斷、創造」，處理更複雜的任務，例如自動回覆客戶的複雜問題。' : 'Introduction to the differences between traditional automation (like email scheduling) and AI automation. AI automation can "understand, judge, create" and handle more complex tasks.',
          completed: true
        },
        {
          id: 2,
          title: isZhHK ? '單元 2：為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Unit 2: Why must we implement now? Three core advantages: Save time, save money, prevent errors',
          duration: '25分鐘',
          description: isZhHK ? '分析導入 AI 自動化的投資回報。透過實際案例，說明如何將員工從重複性高的庶務中解放，專注於更有價值的策略性工作。' : 'Analyzing the ROI of implementing AI automation. Through real cases, explaining how to free employees from highly repetitive tasks.',
          completed: true
        },
        {
          id: 3,
          title: isZhHK ? '單元 3：認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Unit 3: Know your automation toolbox: Zapier, Make and API basics',
          duration: '45分鐘',
          description: isZhHK ? '實用工具入門介紹。了解如何透過 Zapier 或 Make 等平台，像玩樂高一樣，將不同的軟體 (如 Gmail, Google Sheets, LINE) 與 AI 串接起來，無需寫程式。' : 'Practical tool introduction. Learn how to connect different software with AI through platforms like Zapier or Make.',
          completed: false
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 1' : 'Quiz 1',
        questions: 2,
        timeLimit: isZhHK ? '10分鐘' : '10 minutes'
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '從「最痛」的地方開始：盤點公司裡最耗時、最重複、最無聊的工作，那通常就是 AI 自動化最好的切入點。' : 'Start from the "most painful" areas: Inventory the most time-consuming, repetitive, and boring work in the company.',
          isZhHK ? '目標先行，工具次之：先清楚定義你想解決什麼「問題」，再去尋找適合的 AI 工具，而不是為了用工具而用。' : 'Goals first, tools second: First clearly define what "problem" you want to solve.',
          isZhHK ? '安全第一：在串接任何服務時，都要優先考慮客戶與公司資料的安全性與隱私權。' : 'Safety first: When connecting any services, always prioritize the security and privacy of data.'
        ]
      }
    },
    '2': {
      id: 2,
      themeTitle: isZhHK ? '核心應用實戰：三大部門的 AI 自動化魔法' : 'Core Application Practice: AI Automation Magic for Three Major Departments',
      themeDescription: isZhHK ? '本章節將深入行銷、客服、營運三大核心部門，提供可立即上手的 AI 自動化應用案例與流程。' : 'This chapter will dive deep into the three core departments of marketing, customer service, and operations.',
      moduleTitle: isZhHK ? '課程模塊 2：部門賦能，效率倍增' : 'Course Module 2: Department Empowerment, Efficiency Multiplication',
      duration: isZhHK ? '120分鐘 • 3單元' : '120min • 3 units',
      units: [
        {
          id: 4,
          title: isZhHK ? '單元 1：【行銷自動化】：從文案生成到社群發文，一條龍搞定' : 'Unit 1: [Marketing Automation]: From copywriting to social media posting, one-stop solution',
          duration: '40分鐘',
          description: isZhHK ? '實戰教學：設定一個流程，當你在 Notion 中新增一筆「點子」，AI 會自動生成 FB 貼文草稿、IG 圖說，並排程發布。' : 'Hands-on teaching: Set up a process where when you add an "idea" in Notion, AI will automatically generate FB post drafts.',
          completed: false
        },
        {
          id: 5,
          title: isZhHK ? '單元 2：【客服自動化】：打造 24H 智慧客服，提升客戶滿意度' : 'Unit 2: [Customer Service Automation]: Building 24H smart customer service',
          duration: '45分鐘',
          description: isZhHK ? '實戰教學：將官網的常見問題 (FAQ) 訓練成一個 AI 知識庫，當客戶透過 LINE 或 Messenger 提問時，AI 能即時提供準確回覆。' : 'Hands-on teaching: Train the website\'s FAQ into an AI knowledge base.',
          completed: false
        },
        {
          id: 6,
          title: isZhHK ? '單元 3：【營運自動化】：報表整理與資訊擷取的智慧幫手' : 'Unit 3: [Operations Automation]: Smart assistant for report organization',
          duration: '35分鐘',
          description: isZhHK ? '實戰教學：設定一個流程，每日自動抓取網路上的特定新聞或評論，由 AI 進行摘要與情緒分析，最後彙整成一份報告發送到你的 Email。' : 'Hands-on teaching: Set up a process to automatically fetch specific news or reviews from the internet daily.',
          completed: false
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 2' : 'Quiz 2',
        questions: 2,
        timeLimit: isZhHK ? '10分鐘' : '10 minutes'
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '保留「人性溫度」：尤其在客服環節，自動化是為了處理 80% 的常見問題，但要設計好流程，讓 20% 的複雜問題能順利轉接給真人處理。' : 'Preserve "human warmth": Especially in customer service, automation is for handling 80% of common issues.',
          isZhHK ? '個人化是關鍵：在行銷自動化中，利用 AI 結合客戶數據，創造個人化的內容，效果遠勝於千篇一律的罐頭訊息。' : 'Personalization is key: In marketing automation, using AI combined with customer data.',
          isZhHK ? '驗證再執行：由 AI 生成的內容或數據，在正式發布或使用前，建立一個簡單的人工審核環節，確保品質與準確性。' : 'Verify before execution: For content or data generated by AI, establish a simple human review process.'
        ]
      }
    },
    '3': {
      id: 3,
      themeTitle: isZhHK ? '進階整合與策略：打造全方位的自動化商業體系' : 'Advanced Integration and Strategy: Building a Comprehensive Automated Business System',
      themeDescription: isZhHK ? '學習如何將單點的自動化流程，整合成一個互相連動的生態系，並評估其效益，為企業打造長期的數位競爭力。' : 'Learn how to integrate single-point automation processes into an interconnected ecosystem.',
      moduleTitle: isZhHK ? '課程模塊 3：建構體系，持續優化' : 'Course Module 3: Building Systems, Continuous Optimization',
      duration: isZhHK ? '120分鐘 • 3單元' : '120min • 3 units',
      units: [
        {
          id: 7,
          title: isZhHK ? '單元 1：技巧四【跨系統工作流】：當客戶下單後，會發生什麼事？' : 'Unit 1: Technique 4 [Cross-system Workflow]: What happens after a customer places an order?',
          duration: '45分鐘',
          description: isZhHK ? '設計一個完整的跨系統流程。例如：當 Shopify 商店有新訂單時，自動在會計軟體中建立帳目、更新 Google Sheets 的庫存、並透過 AI 發送一封個人化的感謝信給客戶。' : 'Design a complete cross-system process.',
          completed: false
        },
        {
          id: 8,
          title: isZhHK ? '單元 2：技巧五【打造你的專屬 AI 助理 (Agent)】：訓練它成為專家' : 'Unit 2: Technique 5 [Build Your Personal AI Assistant (Agent)]: Train it to become an expert',
          duration: '45分鐘',
          description: isZhHK ? '介紹如何利用現有工具，為 AI 設定特定角色、知識庫與指令集，打造一個「市場分析助理」或「法務合約初審助理」，執行更專業的任務。' : 'Introduction to how to use existing tools to set specific roles, knowledge bases, and instruction sets for AI.',
          completed: false
        },
        {
          id: 9,
          title: isZhHK ? '單元 3：技巧六【效益評估 (ROI) 與持續優化】：如何證明 AI 的價值？' : 'Unit 3: Technique 6 [ROI Assessment and Continuous Optimization]: How to prove AI\'s value?',
          duration: '30分鐘',
          description: isZhHK ? '學習如何量化 AI 自動化帶來的效益，例如計算節省的工時、提升的訂單轉換率。並根據數據，不斷回頭優化你的自動化流程。' : 'Learn how to quantify the benefits brought by AI automation.',
          completed: false
        }
      ],
      quiz: {
        title: isZhHK ? '小測驗 3' : 'Quiz 3',
        questions: 2,
        timeLimit: isZhHK ? '10分鐘' : '10 minutes'
      },
      tips: {
        title: isZhHK ? '本章小提示 (Note & Tips)' : 'Chapter Tips (Note & Tips)',
        items: [
          isZhHK ? '將流程「圖象化」：在設計複雜流程前，先用紙筆或心智圖畫出流程圖，能幫助你理清邏輯，避免打結。' : 'Visualize processes: Before designing complex processes, first draw flow charts.',
          isZhHK ? '從小處擴展：先成功建立一個穩定運作的小型自動化流程，再逐步複製、擴展到公司的其他部門。' : 'Expand from small beginnings: First successfully establish a stable small-scale automation process.',
          isZhHK ? '擁抱學習：AI 技術日新月異，保持開放心態，持續關注新工具與新方法，你的自動化系統才能不斷進化。' : 'Embrace learning: AI technology is constantly evolving, maintain an open mindset.'
        ]
      }
    }
  };

  const currentTheme = themes[themeId as keyof typeof themes];

  if (!currentTheme) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isZhHK ? '主題未找到' : 'Theme Not Found'}</h1>
          <Button onClick={() => navigate('/courses/ai-business-automation')}>
            {isZhHK ? '返回課程概覽' : 'Back to Course Overview'}
          </Button>
        </div>
      </div>
    );
  }

  const completedUnits = currentTheme.units.filter(unit => unit.completed).length;
  const progressPercentage = (completedUnits / currentTheme.units.length) * 100;

  const handleUnitClick = (unitId: number) => {
    navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${unitId}`);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <motion.div {...fadeIn} className="mb-6">
            <Button
              onClick={() => navigate('/courses/ai-business-automation')}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回課程概覽' : 'Back to Course Overview'}
            </Button>
          </motion.div>

          {/* Theme Header */}
          <motion.div {...fadeIn} className="mb-8">
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-700/30 mb-6">
              <h1 className="text-2xl font-bold text-blue-300 mb-3">
                {isZhHK ? `第${currentTheme.id}大主題` : `Theme ${currentTheme.id}`}：{currentTheme.themeTitle}
              </h1>
              <p className="text-gray-300 leading-relaxed mb-4">{currentTheme.themeDescription}</p>
              
              {/* Progress */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">{isZhHK ? '主題進度' : 'Theme Progress'}</span>
                <span className="text-sm text-yellow-400">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2 bg-slate-800">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: `${progressPercentage}%`}} />
              </Progress>
              <p className="text-xs text-gray-500 mt-2">
                {completedUnits} / {currentTheme.units.length} {isZhHK ? '單元已完成' : 'units completed'}
              </p>
            </div>

            {/* Module Info */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-2">{currentTheme.moduleTitle}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentTheme.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {currentTheme.units.length} {isZhHK ? '單元' : 'units'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Units List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  {isZhHK ? '課程單元' : 'Course Units'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentTheme.units.map((unit, index) => (
                  <div 
                    key={unit.id} 
                    className="bg-slate-700/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/70 transition-colors"
                    onClick={() => handleUnitClick(unit.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{unit.title}</h3>
                          <p className="text-sm text-gray-400">{unit.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {unit.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-400" />
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{unit.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quiz Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-yellow-900/20 border-yellow-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Target className="w-5 h-5" />
                    {currentTheme.quiz.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{isZhHK ? '題目數量' : 'Questions'}</span>
                      <span className="text-yellow-300">{currentTheme.quiz.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{isZhHK ? '建議時間' : 'Time Limit'}</span>
                      <span className="text-yellow-300">{currentTheme.quiz.timeLimit}</span>
                    </div>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                      {isZhHK ? '開始測驗' : 'Start Quiz'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-purple-900/20 border-purple-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <Lightbulb className="w-5 h-5" />
                    {currentTheme.tips.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentTheme.tips.items.map((tip, index) => (
                      <p key={index} className="text-sm text-gray-300 leading-relaxed">
                        • {tip}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIBusinessAutomationTheme; 