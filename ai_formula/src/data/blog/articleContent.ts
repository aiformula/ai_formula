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
        content: '為什麼選擇AI Formula？',
        contentEn: 'Why Choose AI Formula?'
      },
      {
        type: 'paragraph',
        content: '在數位化轉型的浪潮中，香港中小企業面臨著前所未有的挑戰和機遇。AI Formula專注於為香港中小企業提供量身定制的AI自動化解決方案，幫助企業提升效率、降低成本，並在激烈的市場競爭中保持優勢。',
        contentEn: 'In the wave of digital transformation, Hong Kong SMEs face unprecedented challenges and opportunities. AI Formula focuses on providing customized AI automation solutions for Hong Kong SMEs, helping businesses improve efficiency, reduce costs, and maintain competitive advantages in fierce market competition.'
      },
      {
        type: 'card',
        content: '我們的核心服務',
        contentEn: 'Our Core Services',
        items: [
          '🔍 諮詢服務：深入了解您的業務需求，制定個性化的自動化策略',
          '⚙️ 系統整合：seamless整合現有系統，確保平穩過渡',
          '🚀 實施部署：專業團隊負責完整的部署和上線流程',
          '📊 持續優化：定期監控和優化，確保系統持續高效運行'
        ],
        itemsEn: [
          '🔍 Consultation Services: Deep understanding of your business needs, develop personalized automation strategies',
          '⚙️ System Integration: Seamless integration with existing systems, ensuring smooth transition',
          '🚀 Implementation: Professional team responsible for complete deployment and launch process',
          '📊 Continuous Optimization: Regular monitoring and optimization to ensure continuous efficient operation'
        ]
      },
      {
        type: 'highlight',
        content: '成功案例分享',
        contentEn: 'Success Stories',
        items: [
          '某零售企業通過我們的自動化解決方案，將客服回應時間縮短了70%，客戶滿意度提升了45%。',
          '一家製造業公司實施我們的系統後，生產效率提升了60%，人力成本降低了35%。'
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
          '初步諮詢 - 了解您的業務需求和目標',
          '需求分析 - 深入分析現有流程和痛點',
          '方案設計 - 制定個性化的自動化解決方案',
          '系統開發 - 按照方案進行系統開發和測試',
          '部署實施 - 專業團隊負責系統部署和上線',
          '培訓支持 - 提供完整的用戶培訓和技術支持'
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
        content: '攜手共創未來',
        contentEn: 'Creating the Future Together',
        items: [
          'AI Formula致力於成為香港中小企業最值得信賴的AI自動化夥伴。我們相信，通過先進的技術和專業的服務，能夠幫助每一家企業在數位化轉型中取得成功。',
          '讓我們一起擁抱AI時代，共同創造更美好的未來！'
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
        content: '在眾多AI自動化服務提供商中，AI Formula憑藉其獨特的優勢和專業能力，成為香港企業的首選夥伴。以下是選擇我們的五大理由：',
        contentEn: 'Among numerous AI automation service providers, AI Formula has become the preferred partner for Hong Kong businesses with its unique advantages and professional capabilities. Here are five reasons to choose us:'
      },
      {
        type: 'card',
        content: '我們的競爭優勢',
        contentEn: 'Our Competitive Advantages',
        items: [
          '🏆 本地化服務：深度了解香港市場和商業環境',
          '👥 專業團隊：經驗豐富的AI和自動化專家',
          '✅ 成功案例：超過100家企業的成功實施經驗',
          '🔧 持續支援：24/7技術支持和定期系統優化',
          '💰 合理價格：性價比最高的自動化解決方案'
        ],
        itemsEn: [
          '🏆 Localized Service: Deep understanding of Hong Kong market and business environment',
          '👥 Professional Team: Experienced AI and automation experts',
          '✅ Success Stories: Over 100 successful implementation experiences',
          '🔧 Ongoing Support: 24/7 technical support and regular system optimization',
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
          '項目成功率：100%'
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
          '量身定制的解決方案，完全符合您的業務需求',
          '無縫整合現有系統，最小化業務中斷',
          '全面的培訓和技術支持，確保團隊順利過渡',
          '靈活的付款方式和合理的價格策略',
          '持續的系統優化和功能升級'
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
        content: '選擇AI Formula的理由',
        contentEn: 'Reasons to Choose AI Formula',
        items: [
          '我們不僅是技術提供者，更是您業務成功的夥伴。選擇AI Formula，您將獲得最專業的服務、最先進的技術，以及最可靠的支持。',
          '讓我們一起開啟您的AI自動化之旅，共同實現業務的突破性成長！'
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
        content: '什麼是Make.com？',
        contentEn: 'What is Make.com?'
      },
      {
        type: 'paragraph',
        content: 'Make.com（前身為Integromat）是一個強大的視覺化自動化平台，讓企業能夠輕鬆連接各種應用程序和服務，創建複雜的自動化工作流程。無論您是想要自動化客服、數據處理還是營銷活動，Make.com都能提供直觀且強大的解決方案。',
        contentEn: 'Make.com (formerly Integromat) is a powerful visual automation platform that enables businesses to easily connect various applications and services to create complex automated workflows. Whether you want to automate customer service, data processing, or marketing campaigns, Make.com provides intuitive and powerful solutions.'
      },
      {
        type: 'card',
        content: 'Make.com的核心功能',
        contentEn: 'Core Features of Make.com',
        items: [
          '🔗 應用整合：連接1000+種應用程序和服務',
          '🎨 視覺化設計：拖拉式界面，無需編程知識',
          '⚡ 即時執行：實時觸發和處理工作流程',
          '📊 數據轉換：強大的數據處理和格式轉換功能'
        ],
        itemsEn: [
          '🔗 App Integration: Connect 1000+ applications and services',
          '🎨 Visual Design: Drag-and-drop interface, no programming knowledge required',
          '⚡ Real-time Execution: Real-time triggering and workflow processing',
          '📊 Data Transformation: Powerful data processing and format conversion capabilities'
        ]
      },
      {
        type: 'steps',
        content: 'Make.com使用指南',
        contentEn: 'Make.com Usage Guide',
        items: [
          '註冊賬戶並選擇合適的訂閱計劃',
          '選擇觸發器應用程序（如Gmail、Slack等）',
          '設置觸發條件和參數',
          '添加動作模塊並配置相應的操作',
          '測試工作流程確保正常運行',
          '啟動自動化並監控執行狀態'
        ],
        itemsEn: [
          'Register an account and choose an appropriate subscription plan',
          'Select trigger applications (such as Gmail, Slack, etc.)',
          'Set trigger conditions and parameters',
          'Add action modules and configure corresponding operations',
          'Test the workflow to ensure it runs properly',
          'Activate automation and monitor execution status'
        ]
      },
      {
        type: 'highlight',
        content: '香港企業應用案例',
        contentEn: 'Hong Kong Business Use Cases',
        items: [
          '電商自動化：自動處理訂單、庫存管理、客戶通知',
          '財務管理：自動化發票生成、費用追蹤、報告生成',
          '客戶服務：自動回復查詢、工單分配、滿意度調查',
          '營銷活動：自動化郵件營銷、社交媒體發布、潛在客戶培育'
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
        content: '開始使用Make.com',
        contentEn: 'Getting Started with Make.com',
        items: [
          'Make.com為香港企業提供了一個強大而靈活的自動化平台。無論您是小型創業公司還是大型企業，都可以通過Make.com實現工作流程的自動化，提升效率並降低成本。',
          '開始您的自動化之旅，讓技術為您的業務創造更多價值！'
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
        content: '探索n8n：開源自動化的力量',
        contentEn: 'Exploring n8n: The Power of Open Source Automation'
      },
      {
        type: 'paragraph',
        content: 'n8n是一個強大的開源自動化平台，為企業提供了完全的控制權和自定義能力。與傳統的雲端自動化服務不同，n8n可以自主託管，讓您完全掌控數據安全和隱私保護。',
        contentEn: 'n8n is a powerful open-source automation platform that provides businesses with complete control and customization capabilities. Unlike traditional cloud automation services, n8n can be self-hosted, giving you full control over data security and privacy protection.'
      },
      {
        type: 'card',
        content: 'n8n的獨特優勢',
        contentEn: 'Unique Advantages of n8n',
        items: [
          '🔓 開源免費：完全開源，無需支付昂貴的授權費用',
          '🏠 自主託管：完全控制數據和基礎設施',
          '🔧 高度自定義：可以根據需要修改和擴展功能',
          '🌐 豐富整合：支援200+種應用程序和服務連接'
        ],
        itemsEn: [
          '🔓 Open Source & Free: Completely open source, no expensive licensing fees',
          '🏠 Self-hosted: Complete control over data and infrastructure',
          '🔧 Highly Customizable: Can modify and extend functionality as needed',
          '🌐 Rich Integration: Supports 200+ application and service connections'
        ]
      },
      {
        type: 'steps',
        content: 'n8n部署指南',
        contentEn: 'n8n Deployment Guide',
        items: [
          '選擇合適的託管環境（本地服務器或雲端）',
          '安裝Docker或直接安裝n8n',
          '配置數據庫和環境變數',
          '設置SSL證書和域名',
          '創建用戶賬戶和權限管理',
          '開始創建您的第一個工作流程'
        ],
        itemsEn: [
          'Choose appropriate hosting environment (local server or cloud)',
          'Install Docker or install n8n directly',
          'Configure database and environment variables',
          'Set up SSL certificates and domain names',
          'Create user accounts and permission management',
          'Start creating your first workflow'
        ]
      },
      {
        type: 'highlight',
        content: '企業級應用場景',
        contentEn: 'Enterprise Application Scenarios',
        items: [
          '數據同步：在不同系統間自動同步數據',
          '監控警報：系統狀態監控和自動警報通知',
          '批量處理：大量數據的自動化處理和分析',
          'API整合：將不同API服務串聯成完整的業務流程'
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
        content: 'n8n vs 其他自動化工具',
        contentEn: 'n8n vs Other Automation Tools',
        items: [
          '成本效益：開源免費，長期使用成本低',
          '數據安全：自主託管，完全掌控數據安全',
          '靈活性：可自定義節點和功能擴展',
          '社區支持：活躍的開源社區和豐富的資源',
          '無vendor lock-in：不依賴特定供應商'
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
        content: '選擇n8n的理由',
        contentEn: 'Reasons to Choose n8n',
        items: [
          'n8n為追求數據安全和成本控制的企業提供了完美的解決方案。如果您的企業需要高度自定義的自動化解決方案，並且希望完全掌控數據和基礎設施，n8n是理想的選擇。',
          'embracing開源自動化的力量，讓n8n成為您數位轉型的得力助手！'
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
        content: '自動化的基本概念',
        contentEn: 'Basic Concepts of Automation'
      },
      {
        type: 'paragraph',
        content: '自動化是指使用技術來執行原本需要人工完成的任務，從而提高效率、減少錯誤並釋放人力資源去處理更有價值的工作。在現代商業環境中，自動化已經成為企業保持競爭力的關鍵因素。',
        contentEn: 'Automation refers to using technology to perform tasks that would normally require human intervention, thereby improving efficiency, reducing errors, and freeing up human resources to handle more valuable work. In the modern business environment, automation has become a key factor for businesses to maintain competitiveness.'
      },
      {
        type: 'card',
        content: '自動化的核心價值',
        contentEn: 'Core Values of Automation',
        items: [
          '⚡ 效率提升：24/7不間斷運行，大幅提高工作效率',
          '✅ 減少錯誤：消除人為錯誤，確保工作質量',
          '💰 成本節約：降低人力成本，提高投資回報率',
          '📈 業務擴展：支持業務快速擴展和成長'
        ],
        itemsEn: [
          '⚡ Efficiency Improvement: 24/7 non-stop operation, significantly improving work efficiency',
          '✅ Error Reduction: Eliminate human errors, ensure work quality',
          '💰 Cost Savings: Reduce labor costs, improve return on investment',
          '📈 Business Expansion: Support rapid business expansion and growth'
        ]
      },
      {
        type: 'steps',
        content: '自動化實施步驟',
        contentEn: 'Automation Implementation Steps',
        items: [
          '識別自動化機會：分析重複性和耗時的任務',
          '評估可行性：考慮技術難度和成本效益',
          '選擇合適工具：根據需求選擇自動化平台',
          '設計工作流程：規劃詳細的自動化流程',
          '測試和優化：確保系統穩定可靠',
          '部署和監控：正式上線並持續監控效果'
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
        content: '自動化的應用領域',
        contentEn: 'Application Areas of Automation',
        items: [
          '客戶服務：聊天機器人、自動回復、工單管理',
          '銷售流程：潛在客戶培育、報價生成、訂單處理',
          '人力資源：招聘流程、員工入職、績效管理',
          '財務管理：發票處理、費用審批、報表生成'
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
          '競爭優勢：在激烈的市場競爭中保持領先地位',
          '資源優化：將人力資源分配到更有價值的工作',
          '服務質量：提供更一致、更可靠的服務',
          '數據洞察：自動收集和分析數據，獲得商業洞察',
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
        content: '擁抱自動化的未來',
        contentEn: 'Embracing the Future of Automation',
        items: [
          '自動化不是為了取代人類，而是為了讓人類能夠專注於更具創造性和戰略性的工作。在數位化時代，企業必須擁抱自動化技術，才能在競爭中立於不敗之地。',
          '現在就開始您的自動化之旅，讓技術成為您業務成功的催化劑！'
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
        content: 'Elon Musk的Neuralink公司正在revolutionizing腦機介面技術，通過植入式晶片實現人腦與電腦的直接連接。這項技術不僅能幫助殘疾人士重新獲得控制能力，更預示著人類與AI融合的未來。',
        contentEn: 'Elon Musk\'s Neuralink is revolutionizing brain-computer interface technology by achieving direct connection between the human brain and computers through implantable chips. This technology not only helps disabled individuals regain control but also foreshadows a future of human-AI integration.'
      },
      {
        type: 'card',
        content: '當前技術突破',
        contentEn: 'Current Technology Breakthroughs',
        items: [
          '🧠 神經元讀取：實時監測和解讀大腦神經信號',
          '🎮 意念控制：用思維控制電腦和遊戲',
          '💻 高速傳輸：1024個電極實現高頻數據傳輸',
          '🔬 微創手術：全自動機器人手術系統'
        ],
        itemsEn: [
          '🧠 Neuron Reading: Real-time monitoring and interpretation of brain neural signals',
          '🎮 Mind Control: Control computers and games with thoughts',
          '💻 High-speed Transmission: 1024 electrodes for high-frequency data transmission',
          '🔬 Minimally Invasive Surgery: Fully automated robotic surgical system'
        ]
      },
      {
        type: 'highlight',
        content: '七名志願者的成功案例',
        contentEn: 'Success Stories of Seven Volunteers',
        items: [
          '第一位志願者Noland Arbaugh成功用意念控制滑鼠和鍵盤',
          '第二位志願者Alex能夠同時進行多任務操作',
          '其他五名志願者展現了不同程度的腦機介面控制能力',
          '平均成功率達到95%以上，遠超預期目標'
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
        content: '2028年的宏大願景',
        contentEn: '2028 Grand Vision',
        items: [
          '實現人腦與AI的高速資訊交換',
          '開發虛擬現實和擴增現實的直接接口',
          '治療帕金森症、阿茲海默症等神經疾病',
          '提升人類認知能力和記憶力',
          '實現真正的人機融合體驗',
          '開啟人類進化的新篇章'
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
        content: '倫理和安全考量',
        contentEn: 'Ethical and Safety Considerations',
        items: [
          '數據隱私：如何保護最私密的思想和記憶',
          '社會公平：技術是否會加劇社會不平等',
          '人類認同：當人機界限模糊時，何謂人類？',
          '監管框架：需要建立完善的法律和監管體系'
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
          '醫療革命：revolutionize神經疾病的治療方法',
          '教育變革：直接下載知識和技能',
          '工作模式：人機協作達到新的高度',
          '娛樂體驗：沉浸式虛擬現實體驗',
          '社會結構：重新定義人類社會的組織形式'
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
        content: '迎接人機融合的時代',
        contentEn: 'Welcoming the Era of Human-Machine Integration',
        items: [
          'Neuralink代表著人類技術發展的新里程碑。儘管面臨著諸多挑戰和倫理問題，但這項技術的潛力是無限的。我們正站在人類歷史的轉折點上，準備迎接一個人機融合的全新時代。',
          '科技的進步永不停歇，讓我們一起探索這個充滿無限可能的未來！'
        ],
        itemsEn: [
          'Neuralink represents a new milestone in human technological development. Despite facing numerous challenges and ethical issues, the potential of this technology is limitless. We are standing at a turning point in human history, ready to welcome a new era of human-machine integration.',
          'The progress of technology never stops, let us explore this future full of infinite possibilities together!'
        ]
      }
    ]
  }
];

// Export function to get article content by ID
export const getArticleContent = (id: number): ArticleContent | null => {
  return articleContents.find(article => article.id === id) || null;
};

// Export function to get all article contents
export const getAllArticleContents = (): ArticleContent[] => {
  return articleContents;
}; 