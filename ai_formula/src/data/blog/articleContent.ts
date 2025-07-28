import { motion } from "framer-motion";

// TypeScript interfaces for article content
export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'card' | 'highlight' | 'steps' | 'list' | 'conclusion';
  content: string;
  contentEn?: string;
  items?: string[];
  itemsEn?: string[];
  level?: number; // for headings
}

export interface ArticleContent {
  id: number;
  sections: ArticleSection[];
}

// Article content data
const articleContents: ArticleContent[] = [
  {
    id: 1,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: '為什麼選擇 AI Formula？',
        contentEn: 'Why Choose AI Formula?'
      },
      {
        type: 'paragraph',
        content: '在數位轉型浪潮中，香港中小企業面臨前所未有的挑戰與機遇。AI Formula 專注為香港中小企量身定制 AI 自動化解決方案，幫助企業提升效率、降低成本，並在激烈市場競爭中保持優勢。',
        contentEn: 'In the wave of digital transformation, Hong Kong SMEs face unprecedented challenges and opportunities. AI Formula focuses on providing customized AI automation solutions for Hong Kong SMEs, helping businesses improve efficiency, reduce costs, and maintain competitive advantages in fierce market competition.'
      },
      {
        type: 'card',
        content: '我們的核心服務',
        contentEn: 'Our Core Services',
        items: [
          '🔍 諮詢服務：深入了解您的業務需求，制定個人化自動化策略',
          '🔗 系統整合：無縫銜接現有系統，確保平穩過渡',
          '🚀 實施部署：專業團隊負責完整部署與上線流程',
          '♻️ 持續優化：定期監控與優化，確保系統持續高效運作'
        ],
        itemsEn: [
          '🔍 Consultation Services: Deep understanding of your business needs, develop personalized automation strategies',
          '🔗 System Integration: Seamless integration with existing systems, ensuring smooth transition',
          '🚀 Implementation: Professional team responsible for complete deployment and launch process',
          '♻️ Continuous Optimization: Regular monitoring and optimization to ensure continuous efficient operation'
        ]
      },
      {
        type: 'highlight',
        content: '成功案例分享',
        contentEn: 'Success Stories',
        items: [
          '零售業客戶透過我們的解決方案，將客服回應時間縮短 70%，客戶滿意度提升 45%',
          '一家製造業公司實施我們系統後，生產效率提升 60%，人力成本降低 35%'
        ],
        itemsEn: [
          'A retail company reduced customer service response time by 70% and increased customer satisfaction by 45% through our automation solutions.',
          'A manufacturing company improved production efficiency by 60% and reduced labor costs by 35% after implementing our system.'
        ]
      },
      {
        type: 'steps',
        content: '我們的服務流程',
        contentEn: 'Our Service Process',
        items: [
          '初步諮詢 - 了解業務需求與目標',
          '需求分析 - 深入分析現有流程與痛點',
          '方案設計 - 制定個人化自動化解決方案',
          '系統開發 - 按照方案進行系統開發與測試',
          '部署實施 - 專業團隊負責系統部署與上線',
          '培訓支援 - 提供完整用戶培訓與技術支援'
        ],
        itemsEn: [
          'Initial Consultation - Understanding your business needs and goals',
          'Requirements Analysis - In-depth analysis of existing processes and pain points',
          'Solution Design - Develop personalized automation solutions',
          'System Development - Develop and test systems according to the solution',
          'Deployment - Professional team responsible for system deployment and launch',
          'Training Support - Provide complete user training and technical support'
        ]
      },
      {
        type: 'conclusion',
        content: '攜手創造未來',
        contentEn: 'Creating the Future Together',
        items: [
          'AI Formula 致力成為香港中小企最值得信賴的 AI 自動化夥伴。我們相信，透過先進技術與專業服務，能幫助每一家企業在數位轉型中取得成功。',
          '讓我們一起擁抱 AI 時代，共創更美好的未來！'
        ],
        itemsEn: [
          'AI Formula is committed to becoming the most trusted AI automation partner for Hong Kong SMEs. We believe that through advanced technology and professional services, we can help every business succeed in digital transformation.',
          'Let us embrace the AI era together and create a better future!'
        ]
      }
    ]
  },
  {
    id: 2,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: '五大核心優勢',
        contentEn: 'Five Core Advantages'
      },
      {
        type: 'paragraph',
        content: '眾多 AI 自動化服務供應商中，AI Formula 已成為香港企業最青睞的合作夥伴。以下是我們的五大優勢：',
        contentEn: 'Among numerous AI automation service providers, AI Formula has become the preferred partner for Hong Kong businesses with its unique advantages and professional capabilities. Here are five reasons to choose us:'
      },
      {
        type: 'card',
        content: '我們的競爭優勢',
        contentEn: 'Our Competitive Advantages',
        items: [
          '🇭🇰 本地化服務：深入了解香港市場與商業環境',
          '👥 專業團隊：豐富的 AI 與自動化專家經驗',
          '📊 成功案例：超過 100 家企業的成功實施經驗',
          '🔄 持續支援：24/7 技術支援與定期系統優化',
          '💰 合理價格：最具成本效益的自動化解決方案'
        ],
        itemsEn: [
          '🇭🇰 Localized Service: Deep understanding of Hong Kong market and business environment',
          '👥 Professional Team: Experienced AI and automation experts',
          '📊 Success Stories: Over 100 successful implementation experiences',
          '🔄 Ongoing Support: 24/7 technical support and regular system optimization',
          '💰 Reasonable Pricing: Most cost-effective automation solutions'
        ]
      },
      {
        type: 'highlight',
        content: '客戶成功指標',
        contentEn: 'Customer Success Metrics',
        items: [
          '平均效率提升：65%',
          '平均成本節省：40%',
          '客戶滿意度：98%',
          '專案成功率：100%'
        ],
        itemsEn: [
          'Average Efficiency Improvement: 65%',
          'Average Cost Savings: 40%',
          'Customer Satisfaction: 98%',
          'Project Success Rate: 100%'
        ]
      },
      {
        type: 'list',
        content: '我們的服務特色',
        contentEn: 'Our Service Features',
        items: [
          '🔧 量身定制解決方案：完全符合您的業務需求',
          '🔗 無縫整合現有系統，最小化業務中斷',
          '👥 完整培訓與技術支援，確保團隊順利過渡',
          '💰 靈活支付方案與合理定價策略',
          '🔄 持續系統優化與功能升級'
        ],
        itemsEn: [
          'Customized solutions that perfectly match your business needs',
          'Seamless integration with existing systems, minimizing business disruption',
          'Comprehensive training and technical support for smooth team transition',
          'Flexible payment options and reasonable pricing strategies',
          'Continuous system optimization and feature upgrades'
        ]
      },
      {
        type: 'conclusion',
        content: '選擇 AI Formula 的理由',
        contentEn: 'Reasons to Choose AI Formula',
        items: [
          '我們不僅是技術供應商，更是您事業成功的夥伴。選擇 AI Formula，您將獲得最專業的服務、最先進的技術，以及最可靠的支援。',
          '讓我們一起開始您的 AI 自動化旅程，實現突破性的業務成長！'
        ],
        itemsEn: [
          'We are not just technology providers, but partners in your business success. Choose AI Formula, and you will receive the most professional service, the most advanced technology, and the most reliable support.',
          'Let us start your AI automation journey together and achieve breakthrough business growth!'
        ]
      }
    ]
  },
  {
    id: 3,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: '什麼是 Make.com？',
        contentEn: 'What is Make.com?'
      },
      {
        type: 'paragraph',
        content: 'Make.com（原為 Integromat）是一個強大的視覺化自動化平台，讓企業能輕鬆連接各種應用程式與服務，創建複雜的自動化工作流程。無論您想要自動化客服、資料處理或行銷活動，Make.com 提供直覺且強大的解決方案。',
        contentEn: 'Make.com (formerly Integromat) is a powerful visual automation platform that enables businesses to easily connect various applications and services to create complex automated workflows. Whether you want to automate customer service, data processing, or marketing campaigns, Make.com provides intuitive and powerful solutions.'
      },
      {
        type: 'card',
        content: 'Make.com 核心功能',
        contentEn: 'Core Features of Make.com',
        items: [
          '🔌 應用程式整合：連接 1000+ 應用程式與服務',
          '�� 視覺化設計：拖放介面，無需程式設計知識',
          '🔄 即時執行：即時觸發與工作流程處理',
          '🔄 資料轉換：強大的資料處理與格式轉換能力'
        ],
        itemsEn: [
          '🔌 App Integration: Connect 1000+ applications and services',
          '🎨 Visual Design: Drag-and-drop interface, no programming knowledge required',
          '🔄 Real-time Execution: Real-time triggering and workflow processing',
          '🔄 Data Transformation: Powerful data processing and format conversion capabilities'
        ]
      },
      {
        type: 'steps',
        content: 'Make.com 使用指南',
        contentEn: 'Make.com Usage Guide',
        items: [
          '👤 註冊帳戶並選擇適當的訂閱方案',
          '🔔 選擇觸發應用程式（如 Gmail、Slack 等）',
          '⚙️ 設置觸發條件與參數',
          '➕ 新增動作模組並配置對應操作',
          '🧪 測試工作流程，確保正常運作',
          '🚀 啟用自動化並監控執行狀態'
        ],
        itemsEn: [
          '👤 Register an account and choose an appropriate subscription plan',
          '🔔 Select trigger applications (such as Gmail, Slack, etc.)',
          '⚙️ Set trigger conditions and parameters',
          '➕ Add action modules and configure corresponding operations',
          '🧪 Test the workflow to ensure it runs properly',
          '🚀 Activate automation and monitor execution status'
        ]
      },
      {
        type: 'highlight',
        content: '香港企業應用案例',
        contentEn: 'Hong Kong Business Use Cases',
        items: [
          '📦 電商自動化：自動化訂單處理、庫存管理、客戶通知',
          '💰 財務管理：自動化發票生成、費用追蹤、報表產生',
          '👥 客戶服務：自動化查詢回覆、工單指派、滿意度調查',
          '📈 行銷活動：自動化電子郵件行銷、社群媒體發布、潛在客戶培育'
        ],
        itemsEn: [
          'E-commerce Automation: Automatic order processing, inventory management, customer notifications',
          'Financial Management: Automated invoice generation, expense tracking, report generation',
          'Customer Service: Automatic query replies, ticket assignment, satisfaction surveys',
          'Marketing Campaigns: Automated email marketing, social media posting, lead nurturing'
        ]
      },
      {
        type: 'conclusion',
        content: '開始使用 Make.com',
        contentEn: 'Getting Started with Make.com',
        items: [
          'Make.com 為香港企業提供一個強大且靈活的自動化平台。無論您是小型創業公司或大型企業，您都可以透過 Make.com 實現工作流程自動化，提升效率並降低成本。',
          '開始您的自動化旅程，讓技術為您的業務創造更多價值！'
        ],
        itemsEn: [
          'Make.com provides a powerful and flexible automation platform for Hong Kong businesses. Whether you are a small startup or a large enterprise, you can achieve workflow automation through Make.com, improve efficiency and reduce costs.',
          'Start your automation journey and let technology create more value for your business!'
        ]
      }
    ]
  },
  {
    id: 4,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: '探索 n8n：開源自動化力量',
        contentEn: 'Exploring n8n: The Power of Open Source Automation'
      },
      {
        type: 'paragraph',
        content: 'n8n 是一個強大的開源自動化平台，為企業提供完整的控制與自訂能力。與傳統雲端自動化服務不同，n8n 可以自行託管，讓您完全掌握資料安全與隱私保護。',
        contentEn: 'n8n is a powerful open-source automation platform that provides businesses with complete control and customization capabilities. Unlike traditional cloud automation services, n8n can be self-hosted, giving you full control over data security and privacy protection.'
      },
      {
        type: 'card',
        content: 'n8n 獨特優勢',
        contentEn: 'Unique Advantages of n8n',
        items: [
          '💰 開源免費：完全開源，無需昂貴的授權費用',
          '🏠 自行託管：完全掌握資料與基礎設施',
          '🔧 高度可自訂：可依需求修改與擴充功能',
          '🔄 豐富整合：支援 200+ 應用程式與服務連接'
        ],
        itemsEn: [
          '💰 Open Source & Free: Completely open source, no expensive licensing fees',
          '🏠 Self-hosted: Complete control over data and infrastructure',
          '🔧 Highly Customizable: Can modify and extend functionality as needed',
          '🔄 Rich Integration: Supports 200+ application and service connections'
        ]
      },
      {
        type: 'steps',
        content: 'n8n 部署指南',
        contentEn: 'n8n Deployment Guide',
        items: [
          '🔍 選擇適當的主機環境（本地伺服器或雲端）',
          '�� 安裝 Docker 或直接安裝 n8n',
          '🔧 設定資料庫與環境變數',
          '🔐 設置 SSL 憑證與網域名稱',
          '👤 建立用戶帳號與權限管理',
          '🚀 開始建立您的第一個工作流程'
        ],
        itemsEn: [
          '🔍 Choose appropriate hosting environment (local server or cloud)',
          '💻 Install Docker or install n8n directly',
          '🔧 Configure database and environment variables',
          '🔐 Set up SSL certificates and domain names',
          '👤 Create user accounts and permission management',
          '🚀 Start creating your first workflow'
        ]
      },
      {
        type: 'highlight',
        content: '企業級應用場景',
        contentEn: 'Enterprise Application Scenarios',
        items: [
          '🔄 同步資料：自動同步不同系統間的資料',
          '👁️ 監控警報：系統狀態監控與自動警報通知',
          '🔄 批次處理：自動化處理與分析大量資料',
          '🔗 API 整合：將不同 API 服務串聯成完整商業流程'
        ],
        itemsEn: [
          'Data Synchronization: Automatically sync data between different systems',
          'Monitoring Alerts: System status monitoring and automatic alert notifications',
          'Batch Processing: Automated processing and analysis of large amounts of data',
          'API Integration: Connect different API services into complete business processes'
        ]
      },
      {
        type: 'list',
        content: 'n8n 與其他自動化工具比較',
        contentEn: 'n8n vs Other Automation Tools',
        items: [
          '💰 成本效益：開源免費，長期使用成本低',
          '🔐 資料安全：自主管理，完全掌握資料安全',
          '🔧 靈活性：可自訂節點與功能擴充',
          '👥 社群支援：活躍的開源社群與豐富資源',
          '🔗 無供應商鎖定：不依賴特定供應商'
        ],
        itemsEn: [
          'Cost-effectiveness: Open source and free, low long-term usage costs',
          'Data Security: Self-hosted, complete control over data security',
          'Flexibility: Customizable nodes and feature extensions',
          'Community Support: Active open source community and rich resources',
          'No vendor lock-in: Not dependent on specific vendors'
        ]
      },
      {
        type: 'conclusion',
        content: '選擇 n8n 的理由',
        contentEn: 'Reasons to Choose n8n',
        items: [
          'n8n 追求數據安全與成本控制，提供完整的解決方案。如果您的事業需要高度自訂化的自動化解決方案，並且希望完全掌握資料與基礎設施，n8n 是您的理想選擇。',
          '擁抱開源自動化，讓 n8n 成為您的數位轉型助手！'
        ],
        itemsEn: [
          'n8n provides the perfect solution for businesses seeking data security and cost control. If your business needs highly customized automation solutions and wants complete control over data and infrastructure, n8n is the ideal choice.',
          'Embrace the power of open source automation and let n8n become your digital transformation assistant!'
        ]
      }
    ]
  },
  {
    id: 5,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: '自動化基本概念',
        contentEn: 'Basic Concepts of Automation'
      },
      {
        type: 'paragraph',
        content: '自動化是指使用技術來執行原本需要人工介入的任務，從而提升效率、減少錯誤，並釋放人力資源以處理更有價值的工作。在現代商業環境中，自動化已成為企業維持競爭力的關鍵因素。',
        contentEn: 'Automation refers to using technology to perform tasks that would normally require human intervention, thereby improving efficiency, reducing errors, and freeing up human resources to handle more valuable work. In the modern business environment, automation has become a key factor for businesses to maintain competitiveness.'
      },
      {
        type: 'card',
        content: '自動化核心價值',
        contentEn: 'Core Values of Automation',
        items: [
          '🔄 效率提升：24/7 不間斷運作，顯著提升工作效率',
          '🔧 減少錯誤：消除人為錯誤，確保工作品質',
          '💰 成本節約：降低人力成本，提升投資報酬率',
          '🔄 業務擴展：支持快速業務擴展與成長'
        ],
        itemsEn: [
          '🔄 Efficiency Improvement: 24/7 non-stop operation, significantly improving work efficiency',
          '🔧 Error Reduction: Eliminate human errors, ensure work quality',
          '💰 Cost Savings: Reduce labor costs, improve return on investment',
          '🔄 Business Expansion: Support rapid business expansion and growth'
        ]
      },
      {
        type: 'steps',
        content: '自動化實施步驟',
        contentEn: 'Automation Implementation Steps',
        items: [
          '識別自動化機會：分析重複且耗時的任務',
          '評估可行性：考慮技術難度與成本效益',
          '選擇適當工具：根據需求選擇自動化平台',
          '設計工作流程：規劃詳細的自動化流程',
          '測試與優化：確保系統穩定與可靠性',
          '部署與監控：上線並持續監控成效'
        ],
        itemsEn: [
          'Identify Automation Opportunities: Analyze repetitive and time-consuming tasks',
          'Assess Feasibility: Consider technical difficulty and cost-effectiveness',
          'Choose Appropriate Tools: Select automation platforms based on needs',
          'Design Workflows: Plan detailed automation processes',
          'Test and Optimize: Ensure system stability and reliability',
          'Deploy and Monitor: Go live and continuously monitor effectiveness'
        ]
      },
      {
        type: 'highlight',
        content: '自動化應用領域',
        contentEn: 'Application Areas of Automation',
        items: [
          '👥 客戶服務：自動化客服、自動回覆、工單管理',
          '🛍️ 銷售流程：潛在客戶培育、報價產生、訂單處理',
          '👥 人力資源：招募流程、員工入職、績效管理',
          '💰 財務管理：發票處理、費用核准、報表產生'
        ],
        itemsEn: [
          'Customer Service: Chatbots, auto-responses, ticket management',
          'Sales Process: Lead nurturing, quote generation, order processing',
          'Human Resources: Recruitment process, employee onboarding, performance management',
          'Financial Management: Invoice processing, expense approval, report generation'
        ]
      },
      {
        type: 'list',
        content: '為什麼企業需要自動化？',
        contentEn: 'Why Do Businesses Need Automation?',
        items: [
          '競爭優勢：在激烈市場競爭中保持領先地位',
          '資源優化：將人力資源分配至更有價值的工作',
          '服務品質：提供更一致且可靠的服務',
          '數據洞察：自動收集與分析資料，獲得業務洞見',
          '合規性：確保業務流程符合法規要求'
        ],
        itemsEn: [
          'Competitive Advantage: Stay ahead in fierce market competition',
          'Resource Optimization: Allocate human resources to more valuable work',
          'Service Quality: Provide more consistent and reliable services',
          'Data Insights: Automatically collect and analyze data for business insights',
          'Compliance: Ensure business processes meet regulatory requirements'
        ]
      },
      {
        type: 'conclusion',
        content: '擁抱自動化未來',
        contentEn: 'Embracing the Future of Automation',
        items: [
          '自動化不是為了取代人類，而是為了讓人類能夠專注於更具創造性的工作。在數位時代，企業必須擁抱自動化技術，以保持競爭力。',
          '現在就開始您的自動化旅程，讓技術成為您業務成功的催化劑！'
        ],
        itemsEn: [
          'Automation is not meant to replace humans, but to enable humans to focus on more creative and strategic work. In the digital age, businesses must embrace automation technology to remain competitive.',
          'Start your automation journey now and let technology become the catalyst for your business success!'
        ]
      }
    ]
  },
  {
    id: 6,
    sections: [
      {
        type: 'heading',
        level: 2,
        content: 'Neuralink：重新定義人機互動',
        contentEn: 'Neuralink: Redefining Human-Machine Interaction'
      },
      {
        type: 'paragraph',
        content: 'Elon Musk 的 Neuralink 正在革新腦機介面技術，透過植入式晶片實現人腦與電腦之間的直接連接。這項技術不僅能幫助殘疾人士恢復控制，也預示著人類與 AI 整合的未來。',
        contentEn: 'Elon Musk\'s Neuralink is revolutionizing brain-computer interface technology by achieving direct connection between the human brain and computers through implantable chips. This technology not only helps disabled individuals regain control but also foreshadows a future of human-AI integration.'
      },
      {
        type: 'card',
        content: '當前技術突破',
        contentEn: 'Current Technology Breakthroughs',
        items: [
          '🧠 神經元讀取：即時監控與解讀大腦神經信號',
          '🧠 腦控：用腦波控制電腦與遊戲',
          '🔄 高速傳輸：1024 電極進行高頻率資料傳輸',
          '🔬 微創手術：全自動化機器人手術系統'
        ],
        itemsEn: [
          '🧠 Neuron Reading: Real-time monitoring and interpretation of brain neural signals',
          '🧠 Mind Control: Control computers and games with thoughts',
          '🔄 High-speed Transmission: 1024 electrodes for high-frequency data transmission',
          '🔬 Minimally Invasive Surgery: Fully automated robotic surgical system'
        ]
      },
      {
        type: 'highlight',
        content: '七位誌願者成功案例',
        contentEn: 'Success Stories of Seven Volunteers',
        items: [
          '第一位誌願者 Noland Arbaugh 成功用意念控制滑鼠與鍵盤',
          '第二位誌願者 Alex 能同時執行多工操作',
          '五位其他誌願者展示不同程度的腦機介面控制能力',
          '平均成功率超過 95%，遠超預期目標'
        ],
        itemsEn: [
          'First volunteer Noland Arbaugh successfully controlled mouse and keyboard with thoughts',
          'Second volunteer Alex can perform multitasking operations simultaneously',
          'Five other volunteers demonstrated varying degrees of brain-computer interface control',
          'Average success rate exceeds 95%, far exceeding expected targets'
        ]
      },
      {
        type: 'steps',
        content: '2028 年宏大願景',
        contentEn: '2028 Grand Vision',
        items: [
          '實現人腦與 AI 高速資訊交換',
          '發展直接介面於虛擬與擴增實境',
          '治療帕金森氏症、阿茲海默症等神經退化性疾病',
          '增強人類認知能力與記憶',
          '實現真正的人機融合體驗',
          '開啟人類進化新篇章'
        ],
        itemsEn: [
          'Achieve high-speed information exchange between human brain and AI',
          'Develop direct interfaces for virtual and augmented reality',
          'Treat neurological diseases like Parkinson\'s and Alzheimer\'s',
          'Enhance human cognitive abilities and memory',
          'Achieve true human-machine fusion experience',
          'Open a new chapter in human evolution'
        ]
      },
      {
        type: 'highlight',
        content: '倫理與安全考量',
        contentEn: 'Ethical and Safety Considerations',
        items: [
          '🔐 隱私：如何保護最私密的思維與記憶',
          '👥 社會平等：科技會否加劇社會不平等',
          '🧠 身份認知：當人機界限模糊，何謂人性',
          '🔧 監管框架：需要建立全面且完善的法律與監管系統'
        ],
        itemsEn: [
          'Data Privacy: How to protect the most private thoughts and memories',
          'Social Equity: Will technology exacerbate social inequality?',
          'Human Identity: When human-machine boundaries blur, what defines humanity?',
          'Regulatory Framework: Need to establish comprehensive legal and regulatory systems'
        ]
      },
      {
        type: 'list',
        content: '對未來的影響',
        contentEn: 'Impact on the Future',
        items: [
          '👥 醫療革命：革新神經疾病治療方法',
          '👥 教育變革：直接下載知識與技能',
          '🔄 工作模式：人機協作達到新高度',
          '🎮 娛樂體驗：沉浸式虛擬實境體驗',
          '👥 社會結構：重新定義人類社會組織形式'
        ],
        itemsEn: [
          'Medical Revolution: Revolutionize treatment methods for neurological diseases',
          'Educational Transformation: Direct download of knowledge and skills',
          'Work Patterns: Human-machine collaboration reaches new heights',
          'Entertainment Experience: Immersive virtual reality experiences',
          'Social Structure: Redefine the organizational forms of human society'
        ]
      },
      {
        type: 'conclusion',
        content: '迎接人機整合時代',
        contentEn: 'Welcoming the Era of Human-Machine Integration',
        items: [
          'Neuralink 代表人類技術發展的新里程碑。儘管面臨諸多挑戰與倫理問題，此技術的潛力無限。我們正站在人類歷史的轉折點上，準備迎接一個新的人機整合時代。',
          '科技進步永不停歇，讓我們一起探索這個充滿無限可能的未來！'
        ],
        itemsEn: [
          'Neuralink represents a new milestone in human technological development. Despite facing numerous challenges and ethical issues, the potential of this technology is limitless. We are standing at a turning point in human history, ready to welcome a new era of human-machine integration.',
          'The progress of technology never stops, let us explore this future full of infinite possibilities together!'
        ]
      }
    ]
  }
];

export { articleContents };

// Export function to get article content by ID
export const getArticleContent = (id: number): ArticleContent | null => {
  return articleContents.find(article => article.id === id) || null;
};

// Export function to get all article contents
export const getAllArticleContents = (): ArticleContent[] => {
  return articleContents;
}; 
