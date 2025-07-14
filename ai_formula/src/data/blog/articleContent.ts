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
        content: '?��?麼選?�AI Formula�?,
        contentEn: 'Why Choose AI Formula?'
      },
      {
        type: 'paragraph',
        content: '?�數位�?轉�??�浪潮中，�?港中小�?業面?��??��??��??��??��?機�??�AI Formula專注?�為香港中�?企業?��??�身定制?�AI?��??�解決方案�?幫助企業?��??��??��?低�??��?並在激?��?市場競爭中�??�優?��?,
        contentEn: 'In the wave of digital transformation, Hong Kong SMEs face unprecedented challenges and opportunities. AI Formula focuses on providing customized AI automation solutions for Hong Kong SMEs, helping businesses improve efficiency, reduce costs, and maintain competitive advantages in fierce market competition.'
      },
      {
        type: 'card',
        content: '?�們�??��??��?',
        contentEn: 'Our Core Services',
        items: [
          '?? 諮詢?��?：深?��?�?��?�業?��?求�??��??�性�??�自?��?策略',
          '?��? 系統?��?：seamless?��??��?系統，確保平穩�?�?,
          '?? 實施?�署：�?業�??��?責�??��??�署?��?線�?�?,
          '?? ?��??��?：�??�監?��??��?，確保系統�?續�??��?�?
        ],
        itemsEn: [
          '?? Consultation Services: Deep understanding of your business needs, develop personalized automation strategies',
          '?��? System Integration: Seamless integration with existing systems, ensuring smooth transition',
          '?? Implementation: Professional team responsible for complete deployment and launch process',
          '?? Continuous Optimization: Regular monitoring and optimization to ensure continuous efficient operation'
        ]
      },
      {
        type: 'highlight',
        content: '?��?案�??�享',
        contentEn: 'Success Stories',
        items: [
          '?�零?��?業通�??�們�??��??�解決方案�?將客?��??��??�縮?��?70%，客?�滿?�度?��?�?5%??,
          '一家製?�業?�司實施?�們�?系統後�??�產?��??��?�?0%，人?��??��?低�?35%??
        ],
        itemsEn: [
          'A retail company reduced customer service response time by 70% and increased customer satisfaction by 45% through our automation solutions.',
          'A manufacturing company improved production efficiency by 60% and reduced labor costs by 35% after implementing our system.'
        ]
      },
      {
        type: 'steps',
        content: '?�們�??��?流�?',
        contentEn: 'Our Service Process',
        items: [
          '?�步諮詢 - 了解?��?業�??�求�??��?',
          '?�求�???- 深入?��??��?流�??��?�?,
          '?��?設�? - ?��??�性�??�自?��?�?��?��?',
          '系統?�發 - ?�照?��??��?系統?�發?�測�?,
          '?�署實施 - 專業?��?負責系統?�署?��?�?,
          '?��??��? - ?��?完整?�用?�培訓�??�術支??
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
        content: '?��??�創?��?',
        contentEn: 'Creating the Future Together',
        items: [
          'AI Formula?��??��??��?港中小�?業�??��?信賴?�AI?��??�夥伴。�??�相信�??��??�進�??�術�?專業?��??��??��?幫助每�?家�?業在?��??��??�中?��??��???,
          '讓�??��?起�??�AI?�代，共?�創?�更美好?�未來�?'
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
        content: '五大?��??�勢',
        contentEn: 'Five Core Advantages'
      },
      {
        type: 'paragraph',
        content: '?�眾多AI?��??��??��?供�?中�?AI Formula?��??�獨?��??�勢?��?業能?��??�為香港企業?��??�夥伴。以下是?��??�們�?五大?�由�?,
        contentEn: 'Among numerous AI automation service providers, AI Formula has become the preferred partner for Hong Kong businesses with its unique advantages and professional capabilities. Here are five reasons to choose us:'
      },
      {
        type: 'card',
        content: '?�們�?競爭?�勢',
        contentEn: 'Our Competitive Advantages',
        items: [
          '?? ?�地?��??��?深度了解香港市場?��?業環�?,
          '?�� 專業?��?：�?驗�?富�?AI?�自?��?專家',
          '???��?案�?：�???00家�?業�??��?實施經�?',
          '?�� ?��??�援�?4/7?�術支?��?定�?系統?��?',
          '?�� ?��??�格：性價比�?高�??��??�解決方�?
        ],
        itemsEn: [
          '?? Localized Service: Deep understanding of Hong Kong market and business environment',
          '?�� Professional Team: Experienced AI and automation experts',
          '??Success Stories: Over 100 successful implementation experiences',
          '?�� Ongoing Support: 24/7 technical support and regular system optimization',
          '?�� Reasonable Pricing: Most cost-effective automation solutions'
        ]
      },
      {
        type: 'highlight',
        content: '客戶?��??��?',
        contentEn: 'Customer Success Metrics',
        items: [
          '平�??��??��?�?5%',
          '平�??�本節?��?40%',
          '客戶滿�?度�?98%',
          '?�目?��??��?100%'
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
        content: '?�們�??��??�色',
        contentEn: 'Our Service Features',
        items: [
          '?�身定制?�解決方案�?完全符�??��?業�??��?,
          '?�縫?��??��?系統，�?小�?業�?中斷',
          '?�面?�培訓�??�術支?��?確�??��??�利?�渡',
          '?�活?��?款方式�??��??�價?��???,
          '?��??�系統優?��??�能?��?'
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
        content: '?��?AI Formula?��???,
        contentEn: 'Reasons to Choose AI Formula',
        items: [
          '?�們�??�是?�術�?供者�??�是?�業?��??��?夥伴?�選?�AI Formula，您將獲得�?專業?��??�、�??�進�??�術�?以�??�?��??�支?��?,
          '讓�??��?起�??�您?�AI?��??��??��??��?實現業�??��??�性�??��?'
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
        content: '什麼是Make.com�?,
        contentEn: 'What is Make.com?'
      },
      {
        type: 'paragraph',
        content: 'Make.com（�?身為Integromat）是一?�強大�?視覺?�自?��?平台，�?企業?��?輕�???��?�種?�用程�??��??��??�建複�??�自?��?工�?流�??�無論您?�想要自?��?客�??�數?��??��??��??�活?��?Make.com?�能?��??��?且強大�?�?��?��???,
        contentEn: 'Make.com (formerly Integromat) is a powerful visual automation platform that enables businesses to easily connect various applications and services to create complex automated workflows. Whether you want to automate customer service, data processing, or marketing campaigns, Make.com provides intuitive and powerful solutions.'
      },
      {
        type: 'card',
        content: 'Make.com?�核心�???,
        contentEn: 'Core Features of Make.com',
        items: [
          '?? ?�用?��?：�?��1000+種�??��?序�??��?',
          '?�� 視覺?�設計�??��?式�??��??��?編�??��?',
          '???��??��?：實?�觸?��??��?工�?流�?',
          '?? ?��?轉�?：強大�??��??��??�格式�??��???
        ],
        itemsEn: [
          '?? App Integration: Connect 1000+ applications and services',
          '?�� Visual Design: Drag-and-drop interface, no programming knowledge required',
          '??Real-time Execution: Real-time triggering and workflow processing',
          '?? Data Transformation: Powerful data processing and format conversion capabilities'
        ]
      },
      {
        type: 'steps',
        content: 'Make.com使用?��?',
        contentEn: 'Make.com Usage Guide',
        items: [
          '註�?賬戶並選?��??��?訂閱計�?',
          '?��?觸發?��??��?序�?如Gmail?�Slack等�?',
          '設置觸發條件?��???,
          '添�??��?模�?並�?置相?��??��?',
          '測試工�?流�?確�?�?��?��?',
          '?��??��??�並??��?��??�??
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
        content: '香港企業?�用案�?',
        contentEn: 'Hong Kong Business Use Cases',
        items: [
          '?��??��??��??��??��?訂單?�庫存管?�、客?�通知',
          '財�?管�?：自?��??�票?��??�費?�追蹤、報?��???,
          '客戶?��?：自?��?復查詢、工?��??�、滿?�度調查',
          '?�銷活�?：自?��??�件?�銷?�社交�?體發布、�??�客?�培??
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
        content: '?��?使用Make.com',
        contentEn: 'Getting Started with Make.com',
        items: [
          'Make.com?��?港�?業�?供�?一?�強大而�?活�??��??�平?�。無論您?��??�創業公?��??�大?��?業�??�可以通�?Make.com實現工�?流�??�自?��?，�??��??�並?��??�本??,
          '?��??��??��??��??��?讓�?術為?��?業�??�造更多價?��?'
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
        content: '?�索n8n：�?源自?��??��???,
        contentEn: 'Exploring n8n: The Power of Open Source Automation'
      },
      {
        type: 'paragraph',
        content: 'n8n?��??�強大�??��??��??�平?��??��?業�?供�?完全?�控?��??�自定義?��??��??�統?�雲端自?��??��?不�?，n8n?�以?�主託管，�??��??��??�數?��??��??��?保護??,
        contentEn: 'n8n is a powerful open-source automation platform that provides businesses with complete control and customization capabilities. Unlike traditional cloud automation services, n8n can be self-hosted, giving you full control over data security and privacy protection.'
      },
      {
        type: 'card',
        content: 'n8n?�獨?�優??,
        contentEn: 'Unique Advantages of n8n',
        items: [
          '?? ?��??�費：�??��?源�??��??��??�貴?��?權費??,
          '?? ?�主託管：�??�控?�數?��??��?設施',
          '?�� 高度?��?義�??�以?��??�要修?��??��??�能',
          '?? 豐�??��?：支??00+種�??��?序�??��???��'
        ],
        itemsEn: [
          '?? Open Source & Free: Completely open source, no expensive licensing fees',
          '?? Self-hosted: Complete control over data and infrastructure',
          '?�� Highly Customizable: Can modify and extend functionality as needed',
          '?? Rich Integration: Supports 200+ application and service connections'
        ]
      },
      {
        type: 'steps',
        content: 'n8n?�署?��?',
        contentEn: 'n8n Deployment Guide',
        items: [
          '?��??�適?��?管環境�??�地?��??��??�端�?,
          '安�?Docker?�直?��?裝n8n',
          '?�置?��?庫�??��?變數',
          '設置SSL證書?��???,
          '?�建?�戶賬戶?��??�管??,
          '?��??�建?��?第�??�工作�?�?
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
        content: '企業級�??�場??,
        contentEn: 'Enterprise Application Scenarios',
        items: [
          '?��??�步：在不�?系統?�自?��?步數??,
          '??��警報：系統�??�監?��??��?警報?�知',
          '?��??��?：大?�數?��??��??��??��??��?',
          'API?��?：�?不�?API?��?串聯?��??��?業�?流�?'
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
        content: 'n8n vs ?��??��??�工??,
        contentEn: 'n8n vs Other Automation Tools',
        items: [
          '?�本?��?：�?源�?費�??��?使用?�本�?,
          '?��?安全：自主�?管�?完全?�控?��?安全',
          '?�活?��??�自定義節點�??�能?��?',
          '社�??��?：活躍�??��?社�??��?富�?資�?',
          '?�vendor lock-in：�?依賴?��?供�???
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
        content: '?��?n8n?��???,
        contentEn: 'Reasons to Choose n8n',
        items: [
          'n8n?�追求數?��??��??�本?�制?��?業�?供�?完�??�解決方案。�??�您?��?業�?要�?度自定義?�自?��?�?��?��?，並且�??��??��??�數?��??��?設施，n8n?��??��??��???,
          'embracing?��??��??��??��?，�?n8n?�為?�數位�??��?得�??��?�?
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
        content: '?��??��??�本概念',
        contentEn: 'Basic Concepts of Automation'
      },
      {
        type: 'paragraph',
        content: '?��??�是?�使?��?術�??��??�本?�要人工�??��?任�?，�??��?高�??�、�?少錯誤並?�放人�?資�??��??�更?�價?��?工�??�在?�代?�業?��?中�??��??�已經�??��?業�??�競?��??��??��?素�?,
        contentEn: 'Automation refers to using technology to perform tasks that would normally require human intervention, thereby improving efficiency, reducing errors, and freeing up human resources to handle more valuable work. In the modern business environment, automation has become a key factor for businesses to maintain competitiveness.'
      },
      {
        type: 'card',
        content: '?��??��??��??��?,
        contentEn: 'Core Values of Automation',
        items: [
          '???��??��?�?4/7不�??��?行�?大�??��?工�??��?',
          '??減�??�誤：�??�人?�錯誤�?確�?工�?質�?',
          '?�� ?�本節約�??��?人�??�本，�?高�?資�??��?',
          '?? 業�??��?：支?�業?�快?�擴展�??�長'
        ],
        itemsEn: [
          '??Efficiency Improvement: 24/7 non-stop operation, significantly improving work efficiency',
          '??Error Reduction: Eliminate human errors, ensure work quality',
          '?�� Cost Savings: Reduce labor costs, improve return on investment',
          '?? Business Expansion: Support rapid business expansion and growth'
        ]
      },
      {
        type: 'steps',
        content: '?��??�實?�步�?,
        contentEn: 'Automation Implementation Steps',
        items: [
          '識別?��??��??��??��??��??��??��??�任??,
          '評估?��??��??�慮?�術難度�??�本?��?',
          '?��??�適工具：根?��?求選?�自?��?平台',
          '設�?工�?流�?：�??�詳細�??��??��?�?,
          '測試?�優?��?確�?系統穩�??��?',
          '?�署?�監?��?�??上�?並�?續監?��???
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
        content: '?��??��??�用?��?',
        contentEn: 'Application Areas of Automation',
        items: [
          '客戶?��?：�?天�??�人?�自?��?復、工?�管??,
          '?�售流�?：�??�客?�培?�、報?��??�、�??��???,
          '人�?資�?：�??��?程、員工入?�、績?�管??,
          '財�?管�?：發票�??�、費?�審?�、報表�???
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
        content: '?��?麼�?業�?要自?��?�?,
        contentEn: 'Why Do Businesses Need Automation?',
        items: [
          '競爭?�勢：在激?��?市場競爭中�??��??�地�?,
          '資�??��?：�?人�?資�??��??�更?�價?��?工�?',
          '?��?質�?：�?供更一?�、更?��??��???,
          '?��?洞�?：自?�收?��??��??��?，獲得�?業�?�?,
          '?��??��?確�?業�?流�?符�?法�?要�?'
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
        content: '?�抱?��??��??��?',
        contentEn: 'Embracing the Future of Automation',
        items: [
          '?��??��??�為了�?�?��類�??�是?��?讓人類能夠�?注於?�具?�造性�??�略?��?工�??�在?��??��?�??企業必�??�抱?��??��?術�??�能?�競?�中立於不�?之地??,
          '?�在就�?始您?�自?��?之�?，�??�術�??�您業�??��??�催?��?�?
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
        content: 'Neuralink：�??��?義人機�???,
        contentEn: 'Neuralink: Redefining Human-Machine Interaction'
      },
      {
        type: 'paragraph',
        content: 'Elon Musk?�Neuralink?�司�?��revolutionizing?��?介面?�術�??��?植入式晶?�實?�人?��??�腦?�直?��?��?�這�??�術�??�能幫助殘疾人士?�新?��??�制?��?，更?�示?�人類�?AI?��??�未來�?,
        contentEn: 'Elon Musk\'s Neuralink is revolutionizing brain-computer interface technology by achieving direct connection between the human brain and computers through implantable chips. This technology not only helps disabled individuals regain control but also foreshadows a future of human-AI integration.'
      },
      {
        type: 'card',
        content: '?��??�術�???,
        contentEn: 'Current Technology Breakthroughs',
        items: [
          '?? 神�??��??��?實�???��?�解讀大腦神�?信�?',
          '?�� ?�念?�制：用?�維?�制?�腦?��???,
          '?�� 高速傳輸�?1024?�電極實?��??�數?�傳�?,
          '?�� 微創?��?：全?��?機器人�?術系�?
        ],
        itemsEn: [
          '?? Neuron Reading: Real-time monitoring and interpretation of brain neural signals',
          '?�� Mind Control: Control computers and games with thoughts',
          '?�� High-speed Transmission: 1024 electrodes for high-frequency data transmission',
          '?�� Minimally Invasive Surgery: Fully automated robotic surgical system'
        ]
      },
      {
        type: 'highlight',
        content: '七�?志�??��??��?案�?',
        contentEn: 'Success Stories of Seven Volunteers',
        items: [
          '第�?位�?願者Noland Arbaugh?��??��?念控?��?鼠�??�盤',
          '第�?位�?願者Alex?��??��??��?多任?��?�?,
          '?��?五�?志�??��??��?不�?程度?�腦機�??�控?�能??,
          '平�??��??��???5%以�?，�?超�??�目�?
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
        content: '2028年�?宏大願景',
        contentEn: '2028 Grand Vision',
        items: [
          '實現人腦?�AI?��??��?訊交??,
          '?�發?�擬?�實?�擴增現實�??�接?�口',
          '治�?帕�?森�??�阿?�海默�?等�?經疾??,
          '?��?人�?認知?��??��??��?',
          '實現?�正?�人機�??��?�?,
          '?��?人�??��??�新篇�?'
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
        content: '?��??��??�考�?',
        contentEn: 'Ethical and Safety Considerations',
        items: [
          '?��??��?：�?何�?護�?私�??�思想?��???,
          '社�??�平：�?術是?��??��?社�?不平�?,
          '人�?認�?：當人�??��?模�??��?何�?人�?�?,
          '??��框架：�?要建立�??��?法�??�監管�?�?
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
        content: '對未來�?影響',
        contentEn: 'Impact on the Future',
        items: [
          '?��??�命：revolutionize神�??��??�治?�方�?,
          '?�育變革：直?��?載知識�??�??,
          '工�?模�?：人機�?作�??�新?��?�?,
          '娛�?體�?：�?浸�??�擬?�實體�?',
          '社�?結�?：�??��?義人類社?��?組�?形�?'
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
        content: '迎接人�??��??��?�?,
        contentEn: 'Welcoming the Era of Human-Machine Integration',
        items: [
          'Neuralink�?��?�人類�?術發展�??��?程�??��?管面?��?諸�??�戰?�倫�??��?，�??��??�術�?潛�??�無?��??��??�正站在人�?歷史?��??��?上�?準�?迎接一?�人機�??��??�新?�代??,
          '科�??�進步永�??��?，�??�們�?起探索這個�?滿無?�可?��??��?�?
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