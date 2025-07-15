import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, CheckCircle, Clock, BookOpen, ArrowRight,
  MessageSquare, Bookmark, ThumbsUp, Share2, FileText, Video
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const AIBusinessAutomationUnit: React.FC = () => {
  const { themeId, unitId } = useParams<{ themeId: string; unitId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isZhHK = language === 'zh-HK';
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState('');

  // 模擬單元數據
  const units = {
    '1': {
      id: 1,
      themeId: 1,
      title: isZhHK ? '單元 1：什麼是「AI 商業自動化」？不只是取代人力，更是升級戰力！' : 'Unit 1: What is "AI Business Automation"? Not just replacing manpower, but upgrading capabilities!',
      duration: '20分鐘',
      type: 'video',
      description: isZhHK ? '介紹傳統自動化 (如設定郵件排程) 與 AI 自動化的區別。AI 自動化能「理解、判斷、創造」，處理更複雜的任務，例如自動回覆客戶的複雜問題。' : 'Introduction to the differences between traditional automation and AI automation.',
      content: {
        video: '/videos/unit-1-ai-automation-basics.mp4',
        transcript: isZhHK ? `
## 什麼是「AI 商業自動化」？

歡迎來到我們的 AI 商業自動化課程！在這個單元，我們將深入了解什麼是 AI 商業自動化，以及它與傳統自動化的區別。

### 傳統自動化 vs AI 自動化

**傳統自動化：**
- 設定郵件排程
- 資料備份
- 簡單的條件觸發
- 固定的規則執行

**AI 自動化：**
- 理解：能夠理解複雜的自然語言
- 判斷：基於情境做出智慧決策
- 創造：生成個人化的內容和回應
- 學習：從過往經驗中不斷改進

### 實際應用案例

讓我們看看一個實際的例子：

**傳統客服自動化：**
客戶：「我想退貨」
系統：自動回覆固定模板

**AI 客服自動化：**
客戶：「我上週買的咖啡機有點問題，沖出來的咖啡味道很淡」
AI 系統：
1. 理解問題：咖啡機功能異常
2. 判斷情境：可能是操作問題或產品瑕疵
3. 提供個人化解決方案：提供操作指南或安排退換貨
4. 學習改進：記錄常見問題模式

### 為什麼現在是最佳時機？

- **技術成熟度**：AI 技術已達到實用階段
- **成本效益**：投資回報率越來越高
- **競爭優勢**：早期採用者獲得先機
- **用戶期待**：客戶期望更好的服務體驗

### 小結

AI 商業自動化不是要取代人力，而是要升級我們的工作能力。它讓我們能夠：
- 處理更複雜的任務
- 提供更個人化的服務
- 釋放時間專注於創意和策略工作
- 提升整體業務效率

在下一個單元，我們將學習為什麼現在必須導入 AI 自動化，以及它的三大核心優勢。
        ` : `
## What is "AI Business Automation"?

Welcome to our AI Business Automation course! In this unit, we'll dive deep into understanding what AI business automation is and how it differs from traditional automation.

### Traditional Automation vs AI Automation

**Traditional Automation:**
- Email scheduling
- Data backup
- Simple conditional triggers
- Fixed rule execution

**AI Automation:**
- Understand: Can comprehend complex natural language
- Judge: Make intelligent decisions based on context
- Create: Generate personalized content and responses
- Learn: Continuously improve from past experiences

### Real-world Application Examples

Let's look at a practical example:

**Traditional Customer Service Automation:**
Customer: "I want to return this"
System: Sends fixed template response

**AI Customer Service Automation:**
Customer: "The coffee machine I bought last week has some issues, the coffee comes out very weak"
AI System:
1. Understands the problem: Coffee machine malfunction
2. Judges the context: Could be operational issue or product defect
3. Provides personalized solution: Offers operation guide or arranges return/exchange
4. Learns and improves: Records common problem patterns

### Why Now is the Perfect Time?

- **Technology Maturity**: AI technology has reached practical stage
- **Cost Effectiveness**: ROI is getting higher
- **Competitive Advantage**: Early adopters gain first-mover advantage
- **User Expectations**: Customers expect better service experiences

### Summary

AI business automation isn't about replacing human workers, but about upgrading our work capabilities. It allows us to:
- Handle more complex tasks
- Provide more personalized services
- Free up time to focus on creative and strategic work
- Improve overall business efficiency

In the next unit, we'll learn why we must implement AI automation now and its three core advantages.
        `,
        keyPoints: isZhHK ? [
          'AI 自動化能「理解、判斷、創造」',
          '與傳統自動化的根本區別',
          '實際應用案例分析',
          '現在是導入的最佳時機'
        ] : [
          'AI automation can "understand, judge, create"',
          'Fundamental differences from traditional automation',
          'Real-world application case studies',
          'Now is the perfect time for implementation'
        ]
      },
      nextUnit: 2,
      completed: true
    },
    '2': {
      id: 2,
      themeId: 1,
      title: isZhHK ? '單元 2：為什麼現在必須導入？三大核心優勢：省時、省錢、防錯' : 'Unit 2: Why must we implement now? Three core advantages: Save time, save money, prevent errors',
      duration: '25分鐘',
      type: 'video',
      description: isZhHK ? '分析導入 AI 自動化的投資回報。透過實際案例，說明如何將員工從重複性高的庶務中解放，專注於更有價值的策略性工作。' : 'Analyzing the ROI of implementing AI automation.',
      content: {
        video: '/videos/unit-2-core-advantages.mp4',
        transcript: isZhHK ? `
## 為什麼現在必須導入？三大核心優勢

在上一個單元，我們了解了什麼是 AI 商業自動化。現在讓我們深入分析為什麼現在是導入的最佳時機，以及它的三大核心優勢。

### 核心優勢一：省時

**傳統工作模式的時間浪費：**
- 手動處理重複性任務
- 在不同系統間複製貼上資料
- 等待審核和批准流程
- 搜尋和整理資訊

**AI 自動化如何省時：**
- 自動處理 80% 的常規任務
- 即時資料同步和更新
- 智能工作流程管理
- 快速資訊檢索和分析

**實際案例：**
某電商公司導入 AI 自動化後：
- 訂單處理時間從 30 分鐘縮短到 3 分鐘
- 客服回應時間從 24 小時縮短到即時
- 報表生成時間從 2 天縮短到 10 分鐘

### 核心優勢二：省錢

**成本節省來源：**
- 減少人力成本
- 降低錯誤成本
- 提升營運效率
- 減少系統維護成本

**ROI 計算示例：**
以一家 50 人的公司為例：
- 每人每天節省 2 小時 = 100 小時/天
- 以平均時薪 $200 計算 = $20,000/天節省
- 年節省成本：$20,000 × 250 工作天 = $5,000,000
- AI 系統投資：$500,000
- ROI：1000%

### 核心優勢三：防錯

**人為錯誤的常見類型：**
- 資料輸入錯誤
- 流程遺漏
- 溝通誤解
- 決策偏見

**AI 如何防錯：**
- 標準化流程執行
- 智能資料驗證
- 一致性檢查
- 預測性風險管理

**案例分析：**
某會計事務所導入 AI 後：
- 資料錯誤率從 5% 降至 0.1%
- 合規性檢查準確率達 99.9%
- 客戶滿意度提升 40%

### 為什麼現在是最佳時機？

**技術因素：**
- AI 技術已經成熟
- 雲端運算成本降低
- 整合工具越來越多
- 學習資源豐富

**市場因素：**
- 競爭對手開始採用
- 客戶期望提高
- 法規要求數位化
- 疫情推動遠程工作

**經濟因素：**
- 人力成本持續上升
- AI 技術成本下降
- 投資回報期縮短
- 政府政策支持

### 實施策略建議

**階段性導入：**
1. 第一階段：自動化重複性任務
2. 第二階段：智能資料分析
3. 第三階段：預測性決策支援
4. 第四階段：全面智能化營運

**風險管控：**
- 小規模試點
- 逐步擴展
- 持續監控
- 定期評估

### 下一步行動

在下一個單元，我們將學習具體的自動化工具，包括 Zapier、Make 和 API 基礎知識，讓你能夠立即開始實施 AI 自動化。
        ` : `
## Why Must We Implement Now? Three Core Advantages

In the previous unit, we learned what AI business automation is. Now let's dive deep into why now is the perfect time for implementation and its three core advantages.

### Core Advantage 1: Save Time

**Time Waste in Traditional Work:**
- Manual handling of repetitive tasks
- Copy-pasting data between systems
- Waiting for review and approval processes
- Searching and organizing information

**How AI Automation Saves Time:**
- Automatically handles 80% of routine tasks
- Real-time data synchronization and updates
- Intelligent workflow management
- Fast information retrieval and analysis

**Real Case Study:**
An e-commerce company after implementing AI automation:
- Order processing time reduced from 30 minutes to 3 minutes
- Customer service response time from 24 hours to instant
- Report generation time from 2 days to 10 minutes

### Core Advantage 2: Save Money

**Cost Saving Sources:**
- Reduced labor costs
- Lower error costs
- Improved operational efficiency
- Reduced system maintenance costs

**ROI Calculation Example:**
For a 50-person company:
- Each person saves 2 hours daily = 100 hours/day
- At average hourly rate of $200 = $20,000/day saved
- Annual savings: $20,000 × 250 working days = $5,000,000
- AI system investment: $500,000
- ROI: 1000%

### Core Advantage 3: Prevent Errors

**Common Types of Human Errors:**
- Data entry mistakes
- Process omissions
- Communication misunderstandings
- Decision biases

**How AI Prevents Errors:**
- Standardized process execution
- Intelligent data validation
- Consistency checks
- Predictive risk management

**Case Analysis:**
An accounting firm after AI implementation:
- Data error rate reduced from 5% to 0.1%
- Compliance check accuracy reached 99.9%
- Customer satisfaction improved by 40%

### Why Now is the Perfect Time?

**Technical Factors:**
- AI technology has matured
- Cloud computing costs reduced
- More integration tools available
- Abundant learning resources

**Market Factors:**
- Competitors starting to adopt
- Rising customer expectations
- Regulatory requirements for digitization
- Pandemic driving remote work

**Economic Factors:**
- Labor costs continuously rising
- AI technology costs decreasing
- ROI payback period shortening
- Government policy support

### Implementation Strategy Recommendations

**Phased Implementation:**
1. Phase 1: Automate repetitive tasks
2. Phase 2: Intelligent data analysis
3. Phase 3: Predictive decision support
4. Phase 4: Comprehensive intelligent operations

**Risk Management:**
- Small-scale pilot
- Gradual expansion
- Continuous monitoring
- Regular evaluation

### Next Steps

In the next unit, we'll learn about specific automation tools, including Zapier, Make, and API basics, so you can immediately start implementing AI automation.
        `,
        keyPoints: isZhHK ? [
          '省時：自動處理 80% 常規任務',
          '省錢：ROI 可達 1000%',
          '防錯：準確率達 99.9%',
          '現在是導入的最佳時機'
        ] : [
          'Save Time: Automatically handle 80% of routine tasks',
          'Save Money: ROI can reach 1000%',
          'Prevent Errors: Accuracy rate up to 99.9%',
          'Now is the perfect time for implementation'
        ]
      },
      nextUnit: 3,
      completed: true
    },
    '3': {
      id: 3,
      themeId: 1,
      title: isZhHK ? '單元 3：認識你的自動化工具箱：Zapier, Make 與 API 基礎' : 'Unit 3: Know your automation toolbox: Zapier, Make and API basics',
      duration: '45分鐘',
      type: 'interactive',
      description: isZhHK ? '實用工具入門介紹。了解如何透過 Zapier 或 Make 等平台，像玩樂高一樣，將不同的軟體 (如 Gmail, Google Sheets, LINE) 與 AI 串接起來，無需寫程式。' : 'Practical tool introduction. Learn how to connect different software with AI.',
      content: {
        video: '/videos/unit-3-automation-tools.mp4',
        transcript: isZhHK ? `
## 認識你的自動化工具箱

現在我們已經了解了 AI 自動化的重要性，接下來讓我們學習具體的工具，讓你能夠立即開始實施自動化。

### Zapier：自動化新手的最佳朋友

**什麼是 Zapier？**
Zapier 是一個自動化平台，讓你可以連接超過 5000 個不同的應用程式，無需寫程式就能創建自動化工作流程。

**核心概念：**
- **Trigger（觸發器）**：啟動自動化的事件
- **Action（動作）**：觸發後執行的任務
- **Zap**：一個完整的自動化流程

**實際範例：**
當 Gmail 收到新郵件 → 自動儲存附件到 Google Drive → 發送通知到 Slack

**優點：**
- 介面簡單易用
- 支援應用程式最多
- 有免費方案
- 豐富的模板庫

**缺點：**
- 複雜邏輯處理有限
- 高級功能需付費
- 執行速度較慢

### Make（前身為 Integromat）：進階自動化的首選

**什麼是 Make？**
Make 是一個更強大的自動化平台，提供視覺化的工作流程設計器，支援複雜的邏輯處理。

**核心特色：**
- **視覺化編輯器**：像流程圖一樣設計自動化
- **條件邏輯**：if-then-else 邏輯處理
- **資料轉換**：強大的資料處理能力
- **錯誤處理**：完善的錯誤處理機制

**實際範例：**
客戶填寫表單 → 檢查資料完整性 → 若完整則創建 CRM 記錄 → 發送歡迎郵件 → 若不完整則發送補充資料請求

**優點：**
- 功能更強大
- 視覺化設計
- 更好的錯誤處理
- 性價比高

**缺點：**
- 學習曲線較陡
- 介面較複雜
- 支援應用程式較少

### API 基礎：解鎖無限可能

**什麼是 API？**
API（Application Programming Interface）是應用程式之間溝通的橋樑，讓不同軟體可以互相交換資料和功能。

**基本概念：**
- **端點（Endpoint）**：API 的訪問地址
- **請求方法**：GET（獲取）、POST（創建）、PUT（更新）、DELETE（刪除）
- **認證**：API Key、OAuth 等身份驗證方式
- **資料格式**：通常使用 JSON 格式

**實用工具：**
- **Postman**：API 測試工具
- **Webhook.site**：接收 Webhook 的測試工具
- **JSONPath**：解析 JSON 資料
- **Zapier Code**：在 Zapier 中使用程式碼

**簡單範例：**
```javascript
// 發送 POST 請求到 API
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
```

### 選擇工具的決策框架

**考慮因素：**
1. **複雜度需求**：簡單任務用 Zapier，複雜邏輯用 Make
2. **預算考量**：Zapier 較貴，Make 性價比較高
3. **技術能力**：新手選 Zapier，有經驗選 Make
4. **應用程式支援**：確認所需應用是否支援
5. **擴展性需求**：長期發展考慮

**建議學習路徑：**
1. 先從 Zapier 開始，熟悉自動化概念
2. 逐漸嘗試 Make 的進階功能
3. 學習基本的 API 知識
4. 根據需求選擇最適合的工具

### 實戰練習建議

**初學者練習：**
1. 設定 Gmail 新郵件通知到 Slack
2. 自動儲存 Instagram 照片到 Google Photos
3. 將 Google Forms 回應儲存到 Google Sheets

**進階練習：**
1. 建立客戶服務工作流程
2. 設定銷售線索管理系統
3. 創建內容發布自動化

**專家級練習：**
1. 整合多個 CRM 系統
2. 建立 AI 驅動的客戶分析
3. 設計複雜的業務流程自動化

### 下一步學習

在接下來的課程中，我們將實際動手建立幾個自動化流程，讓你體驗這些工具的強大功能。記住，最好的學習方式就是實際操作！
        ` : `
## Know Your Automation Toolbox

Now that we understand the importance of AI automation, let's learn about specific tools that will allow you to start implementing automation immediately.

### Zapier: The Best Friend for Automation Beginners

**What is Zapier?**
Zapier is an automation platform that lets you connect over 5000 different applications and create automated workflows without coding.

**Core Concepts:**
- **Trigger**: The event that starts the automation
- **Action**: The task performed after triggering
- **Zap**: A complete automation workflow

**Practical Example:**
New email in Gmail → Automatically save attachment to Google Drive → Send notification to Slack

**Advantages:**
- Simple and user-friendly interface
- Supports the most applications
- Has free plan
- Rich template library

**Disadvantages:**
- Limited complex logic handling
- Advanced features require payment
- Slower execution speed

### Make (formerly Integromat): The Choice for Advanced Automation

**What is Make?**
Make is a more powerful automation platform that provides a visual workflow designer supporting complex logic processing.

**Core Features:**
- **Visual Editor**: Design automation like flowcharts
- **Conditional Logic**: if-then-else logic processing
- **Data Transformation**: Powerful data processing capabilities
- **Error Handling**: Comprehensive error handling mechanisms

**Practical Example:**
Customer fills form → Check data completeness → If complete, create CRM record → Send welcome email → If incomplete, send data supplement request

**Advantages:**
- More powerful functionality
- Visual design
- Better error handling
- Good value for money

**Disadvantages:**
- Steeper learning curve
- More complex interface
- Supports fewer applications

### API Basics: Unlocking Unlimited Possibilities

**What is API?**
API (Application Programming Interface) is a bridge for communication between applications, allowing different software to exchange data and functionality.

**Basic Concepts:**
- **Endpoint**: API access address
- **Request Methods**: GET (retrieve), POST (create), PUT (update), DELETE (delete)
- **Authentication**: API Key, OAuth, and other authentication methods
- **Data Format**: Usually uses JSON format

**Useful Tools:**
- **Postman**: API testing tool
- **Webhook.site**: Tool for receiving Webhook tests
- **JSONPath**: Parse JSON data
- **Zapier Code**: Use code within Zapier

**Simple Example:**
```javascript
// Send POST request to API
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
```

### Decision Framework for Tool Selection

**Consideration Factors:**
1. **Complexity Requirements**: Simple tasks use Zapier, complex logic use Make
2. **Budget Considerations**: Zapier is more expensive, Make offers better value
3. **Technical Ability**: Beginners choose Zapier, experienced users choose Make
4. **Application Support**: Confirm if needed applications are supported
5. **Scalability Needs**: Long-term development considerations

**Recommended Learning Path:**
1. Start with Zapier to familiarize with automation concepts
2. Gradually try Make's advanced features
3. Learn basic API knowledge
4. Choose the most suitable tool based on needs

### Practical Exercise Recommendations

**Beginner Exercises:**
1. Set up Gmail new email notifications to Slack
2. Automatically save Instagram photos to Google Photos
3. Save Google Forms responses to Google Sheets

**Advanced Exercises:**
1. Build customer service workflow
2. Set up sales lead management system
3. Create content publishing automation

**Expert-level Exercises:**
1. Integrate multiple CRM systems
2. Build AI-driven customer analysis
3. Design complex business process automation

### Next Steps

In the upcoming courses, we'll actually build several automation workflows hands-on, letting you experience the powerful capabilities of these tools. Remember, the best way to learn is through actual practice!
        `,
        keyPoints: isZhHK ? [
          'Zapier：新手友好，支援最多應用',
          'Make：功能強大，視覺化設計',
          'API：解鎖無限可能',
          '根據需求選擇最適合的工具'
        ] : [
          'Zapier: Beginner-friendly, supports most applications',
          'Make: Powerful functionality, visual design',
          'API: Unlocks unlimited possibilities',
          'Choose the most suitable tool based on needs'
        ]
      },
      nextUnit: null,
      nextTheme: 2,
      completed: false
    }
  };

  const currentUnit = units[unitId as keyof typeof units];

  if (!currentUnit) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isZhHK ? '單元未找到' : 'Unit Not Found'}</h1>
          <Button onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}`)}>
            {isZhHK ? '返回主題頁面' : 'Back to Theme Page'}
          </Button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    setIsCompleted(true);
    // 這裡可以加入將完成狀態儲存到後端的邏輯
  };

  const handleNext = () => {
    if (currentUnit.nextUnit) {
      navigate(`/courses/ai-business-automation/theme/${themeId}/unit/${currentUnit.nextUnit}`);
    } else if (currentUnit.nextTheme) {
      navigate(`/courses/ai-business-automation/theme/${currentUnit.nextTheme}`);
    } else {
      navigate('/courses/ai-business-automation');
    }
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
              onClick={() => navigate(`/courses/ai-business-automation/theme/${themeId}`)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isZhHK ? '返回主題頁面' : 'Back to Theme Page'}
            </Button>
          </motion.div>

          {/* Unit Header */}
          <motion.div {...fadeIn} className="mb-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  {currentUnit.type === 'video' ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <FileText className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentUnit.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {currentUnit.duration}
                    </span>
                    <Badge className={`${currentUnit.completed ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                      {currentUnit.completed ? (isZhHK ? '已完成' : 'Completed') : (isZhHK ? '進行中' : 'In Progress')}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{currentUnit.description}</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Video/Content Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-0">
                    {currentUnit.type === 'video' ? (
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                          <p className="text-gray-400">{isZhHK ? '點擊播放課程影片' : 'Click to play course video'}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">{isZhHK ? '互動式學習內容' : 'Interactive Learning Content'}</h3>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="text-gray-300">{isZhHK ? '這裡將顯示互動式學習內容' : 'Interactive learning content will be displayed here'}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Transcript/Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <FileText className="w-5 h-5 text-blue-400" />
                      {isZhHK ? '課程內容' : 'Course Content'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                        {currentUnit.content.transcript}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4"
              >
                {!isCompleted && !currentUnit.completed && (
                  <Button 
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isZhHK ? '標記為完成' : 'Mark as Complete'}
                  </Button>
                )}
                
                <Button 
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentUnit.nextUnit ? (
                    <>
                      {isZhHK ? '下一個單元' : 'Next Unit'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : currentUnit.nextTheme ? (
                    <>
                      {isZhHK ? '下一個主題' : 'Next Theme'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      {isZhHK ? '回到課程' : 'Back to Course'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Key Points */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-yellow-900/20 border-yellow-700/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <BookOpen className="w-5 h-5" />
                      {isZhHK ? '重點摘要' : 'Key Points'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentUnit.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-purple-900/20 border-purple-700/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <MessageSquare className="w-5 h-5" />
                      {isZhHK ? '我的筆記' : 'My Notes'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isZhHK ? '在此記錄你的學習筆記...' : 'Record your learning notes here...'}
                      className="w-full h-32 bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/20">
                        <Bookmark className="w-4 h-4 mr-1" />
                        {isZhHK ? '儲存' : 'Save'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/20">
                        <Share2 className="w-4 h-4 mr-1" />
                        {isZhHK ? '分享' : 'Share'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Engagement */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">{isZhHK ? '課程互動' : 'Course Interaction'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {isZhHK ? '有用' : 'Helpful'}
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {isZhHK ? '討論' : 'Discuss'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBusinessAutomationUnit; 