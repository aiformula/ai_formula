import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Trophy, Zap, Target } from "lucide-react";
import { TeamMemberCard } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const AboutCht = () => {
  const navigate = useNavigate();
  const lang = 'cht' as const;
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = {
    cht: [
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ y: [0, -8, 0], rotateY: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
          >
            <Clock className="w-6 h-6" />
          </motion.div>
        ),
        title: "節省時間",
        description: "快速掌握最前沿 AI 工具與知識，短時間內學以致用，提升效率"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        ),
        title: "自動化工作流程",
        description: "以 LLM、n8n 等工具實現日常工作自動化，提升精確度與生產力"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ rotateX: [0, 360], filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-6 h-6" />
          </motion.div>
        ),
        title: "專業課程",
        description: "循序漸進的 AI 技術課程，從入門到進階，帶來實質增長"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ scale: [1, 1.2, 1], rotateZ: [0, 10, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy className="w-6 h-6" />
          </motion.div>
        ),
        title: "專業顧問服務",
        description: "量身定制 AI 解決方案，推動企業營運與業務增長"
      }
    ],
    en: [
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ y: [0, -8, 0], rotateY: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
          >
            <Clock className="w-6 h-6" />
          </motion.div>
        ),
        title: "Save Time",
        description: "Master leading AI tools and knowledge quickly to apply them in the shortest time"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
        ),
        title: "Automated Workflows",
        description: "Implement everyday automation with LLMs and n8n to improve accuracy and productivity"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ rotateX: [0, 360], filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-6 h-6" />
          </motion.div>
        ),
        title: "Professional Courses",
        description: "Structured AI learning paths from beginner to advanced for measurable growth"
      },
      {
        icon: (
          <motion.div
            className="inline-block w-6 h-6"
            animate={{ scale: [1, 1.2, 1], rotateZ: [0, 10, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Trophy className="w-6 h-6" />
          </motion.div>
        ),
        title: "Consulting Services",
        description: "Tailored AI solutions to drive operational excellence and growth"
      }
    ]
  } as const;

  const teamMembers = [
    {
      name: "Kenneth",
      avatarColor: "#A020F0",
      title: "AI Marketing Developer & Automation Specialist",
      titleCht: "AI 營銷開發與自動化專家",
      tags: ["AI Tools & Marketing Automation"],
      tagsCht: ["AI 工具與營銷自動化"],
      experience: "4+ years Experience",
      experienceCht: "4+ 年經驗",
      journey: "Kenneth is a pioneering AI marketing developer who specializes in cutting-edge AI tools, automation systems, and strategic implementation. Over 4 years of intensive AI learning, he has mastered the art of transforming traditional marketing approaches through artificial intelligence and automation technologies.",
      journeyCht: "Kenneth 是一位開創性的 AI 營銷開發者，專注於尖端 AI 工具、自動化系統和戰略實施。經過超過4年的深度 AI 學習，他已掌握通過人工智能和自動化技術，徹底改變傳統營銷方法的藝術。",
      philosophy: "\"AI is fundamentally transforming how we live and work. The future belongs to those who embrace AI today. I help individuals and businesses get ahead of the curve by mastering AI tools and automation before the masses catch up. Now is the perfect time to gain that competitive advantage.\"",
      philosophyCht: "「AI 正在從根本上改變我們的生活和工作方式。未來屬於今天就擁抱 AI 的人。我幫助個人和企業在普羅大眾追上來之前，通過掌握 AI 工具和自動化來保持領先。現在正是獲得這種競爭優勢的最佳時機。」",
      impact_points: [
        "AI Marketing Automation Expert",
        "Advanced AI Tools Implementation",
        "Strategic AI Business Integration",
        "Future-Ready Marketing Systems"
      ],
      impact_points_cht: [
        "AI 營銷自動化專家",
        "進階 AI 工具實施",
        "策略性 AI 業務整合",
        "面向未來的營銷系統"
      ]
    },
    {
      name: "David",
      avatarColor: "#32CD32",
      title: "Business Automation & AI Integration Specialist",
      titleCht: "業務自動化與 AI 整合專家",
      tags: ["Automation & AI Solutions"],
      tagsCht: ["自動化與 AI 解決方案"],
      experience: "7+ years Experience",
      experienceCht: "7+ 年經驗",
      journey: "David is a business automation expert who has spent 7+ years helping companies eliminate overwork and streamline operations. He specializes in creating powerful automation workflows using Make.com, n8n, and AI tools.",
      journeyCht: "David 是一位業務自動化專家，擁有超過7年經驗，致力於幫助企業消除過度工作並簡化營運流程。他擅長使用 Make.com、n8n 和 AI 工具創建強大的自動化工作流程。",
      philosophy: "\"Automation should solve real business problems and reduce overwork. I help businesses implement all-in-one AI solutions that transform operations.\"",
      philosophyCht: "「自動化應該解決真實的商業問題並減少過度工作。我幫助企業實施能夠徹底改變營運的一站式 AI 解決方案。」",
      impact_points: [
        "Make.com & n8n Automation Expert",
        "Business Process Optimization",
        "AI-Powered Content Management",
        "All-in-One Business Solutions"
      ],
      impact_points_cht: [
        "Make.com 與 n8n 自動化專家",
        "業務流程優化",
        "AI 驅動的內容管理",
        "一站式商業解決方案"
      ]
    },
    {
      name: "Ken",
      avatarColor: "#FF4500",
      title: "Custom Business Developer & AI Automation Specialist",
      titleCht: "客製化業務開發與 AI 自動化專家",
      tags: ["Custom Coding & AI Automation"],
      tagsCht: ["客製化編程與 AI 自動化"],
      experience: "5+ years Experience",
      experienceCht: "5+ 年經驗",
      journey: "Ken is a skilled custom business developer with 5+ years of coding experience, specializing in creating tailored business solutions and AI automation systems. He builds custom applications that help businesses work faster and run more efficiently through intelligent automation.",
      journeyCht: "Ken 是一位經驗豐富的客製化業務開發者，擁有超過5年的編程經驗，專門創建量身定制的商業解決方案和 AI 自動化系統。他構建的客製化應用程式，通過智能自動化幫助企業更快速、更高效地運作。",
      philosophy: "\"Code should make work faster and businesses run smoother. I create custom solutions that integrate AI automation to eliminate bottlenecks and accelerate business processes. Every line of code should serve a purpose: making work faster and more efficient.\"",
      philosophyCht: "「代碼應該讓工作更快，讓業務更順暢。我創建的客製化解決方案，整合了 AI 自動化，以消除瓶頸並加速業務流程。每一行代碼都應該服務於一個目的：讓工作更快、更高效。」",
      impact_points: [
        "Custom Business Application Development",
        "AI Automation Integration Expert",
        "Performance Optimization Specialist",
        "Rapid Development Solutions"
      ],
      impact_points_cht: [
        "客製化商業應用開發",
        "AI 自動化整合專家",
        "性能優化專家",
        "快速開發解決方案"
      ]
    },
    {
      name: "Jason",
      avatarColor: "#FF1493",
      title: "Professional Developer & Custom Automation Specialist",
      titleCht: "專業開發者與客製化自動化專家",
      tags: ["Coding & Custom Automation"],
      tagsCht: ["編程與客製化自動化"],
      experience: "8+ years Experience",
      experienceCht: "8+ 年經驗",
      journey: "Jason is a professional developer with 8+ years of coding experience, specializing in LLM chatbot development, MCP integration, and web applications. For the past 2 years, he has been intensively learning AI to uplevel his coding skills and help companies integrate cutting-edge AI solutions.",
      journeyCht: "Jason 是一位擁有超過8年編程經驗的專業開發者，專精於 LLM 聊天機器人開發、MCP 整合及網站應用程式。在過去兩年，他一直深度學習 AI，以提升其編程技能，並幫助企業整合尖端的 AI 解決方案。",
      philosophy: "\"No AI, no life! AI can change more than you think. I believe that integrating AI into development work transforms not just how we code, but what we can achieve. Every developer needs to embrace AI to stay relevant and create extraordinary solutions.\"",
      philosophyCht: "「沒有 AI，就沒有生活！AI 的改變超乎你想像。我相信，將 AI 融入開發工作，不僅改變了我們的編碼方式，更改變了我們能達成的成就。每一位開發者都需要擁抱 AI，以保持領先並創造非凡的解決方案。」",
      impact_points: [
        "LLM Chatbot Development Expert",
        "MCP Integration Specialist",
        "Full-Stack Web Development",
        "AI-Enhanced Coding Solutions"
      ],
      impact_points_cht: [
        "LLM 聊天機器人開發專家",
        "MCP 整合專家",
        "全端網站開發",
        "AI 增強編程解決方案"
      ]
    }
  ];

  const stats = {
    cht: [
      { number: "10,000+", label: "活躍用戶" },
      { number: "50+", label: "專業課程" },
      { number: "95%", label: "滿意度" },
      { number: "24/7", label: "技術支援" }
    ],
    en: [
      { number: "10,000+", label: "Active users" },
      { number: "50+", label: "Professional courses" },
      { number: "95%", label: "Satisfaction" },
      { number: "24/7", label: "Technical support" }
    ]
  } as const;

  const text = {
    cht: {
      heroTitle: (
        <>
          關於 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">AI Formula</span>
        </>
      ),
      heroSubtitle:
        "AI Formula 係一個專注於 AI 自動化教育同策略整合嘅專業平台，幫助個人、團隊同企業喺數碼轉型中實現最大化效益。",
      missionTitle: "我們的使命",
      missionBody:
        "幫助學員將 AI 技術應用到現實世界，提升效率、創造競爭優勢並推動業務創新。無論你係提升個人技能、優化工作流程，定係令整個團隊自動化，AI Formula 都會係你可靠嘅合作夥伴。",
      servicesTitle: "我們提供的服務",
      services: [
        {
          title: "AI 趨勢與行業洞察",
          items: [
            "最新技術發展：提供前沿 AI 趨勢分析，幫你掌握行業脈搏",
            "商業應用案例：深入剖析 AI 喺各行各業嘅應用",
            "市場分析報告：按需求提供定制化報告，緊貼行業動態"
          ]
        },
        {
          title: "實用工具教學",
          items: [
            "精選 Midjourney、RunwayML、Google Veo 3、n8n 等工具",
            "從 AI 設計到數據分析、自動化工作流，全面實戰"
          ]
        },
        {
          title: "專業 AI 課程",
          items: [
            "由基礎到進階，系統掌握 AI、機器學習、深度學習",
            "為初學者與進階學員提供循序漸進學習路徑"
          ]
        },
        {
          title: "商業顧問服務",
          items: [
            "AI 系統整合：端到端方案，無縫落地",
            "工作流程自動化：減少手動干預，提升生產力",
            "客製化項目服務：按企業需求打造專屬方案"
          ]
        }
      ],
      achievementsTitle: "我們的成就",
      teamTitle: "我們的專家團隊",
      visionTitle: "我們的願景",
      visionBody:
        "成為全球領先嘅 AI 自動化教育平台，透過創新學習方式打破傳統框架，持續提升學員能力，適應未來職場需求，並引領行業革新。",
      whyTitle: "為什麼選擇我們？",
      ctaTitle: "準備好用 AI 改變你嘅未來了嗎？",
      ctaBody:
        "加入成千上萬已經掌握 AI 工具同自動化嘅學員，喺職涯同業務發展上搶佔先機。",
      ctaBtn: "立即開始學習"
    },
    en: {
      heroTitle: (
        <>
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">AI Formula</span>
        </>
      ),
      heroSubtitle:
        "AI Formula is a specialist platform for AI automation education and strategic integration, helping individuals, teams and businesses maximise outcomes in digital transformation.",
      missionTitle: "Our Mission",
      missionBody:
        "To help learners apply AI in the real world to increase efficiency, create competitive advantage and drive innovation. Whether you are enhancing personal skills, optimising workflows, or automating a whole team, AI Formula is your trusted partner.",
      servicesTitle: "What We Offer",
      services: [
        {
          title: "AI Trends and Industry Insights",
          items: [
            "Latest developments: front-line AI trend analysis",
            "Business use cases: how AI is applied across industries",
            "Market analysis: tailored reports aligned to demand and progress"
          ]
        },
        {
          title: "Practical Tool Training",
          items: [
            "Curated tools: Midjourney, RunwayML, Google Veo 3, n8n and more",
            "From AI-aided design to data analysis and automated workflows"
          ]
        },
        {
          title: "Professional AI Courses",
          items: [
            "From foundations to advanced: AI, machine learning and deep learning",
            "Step-by-step learning paths for beginners and advanced learners"
          ]
        },
        {
          title: "Business Consulting",
          items: [
            "AI system integration: end‑to‑end solutions that land",
            "Workflow automation: reduce manual effort and boost productivity",
            "Custom projects: tailored solutions for data, operations and innovation"
          ]
        }
      ],
      achievementsTitle: "Our Achievements",
      teamTitle: "Our Expert Team",
      visionTitle: "Our Vision",
      visionBody:
        "To become the world’s leading AI automation education platform, breaking traditional learning models, continually elevating capability, and leading industry innovation.",
      whyTitle: "Why Choose Us?",
      ctaTitle: "Ready to transform your future with AI?",
      ctaBody:
        "Join thousands who already master AI tools and automation to accelerate careers and business growth.",
      ctaBtn: "Start learning today"
    }
  } as const;

  return (
    <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#121212' }}>
      <Navigation />
      
      <div className="relative z-10 pt-32 md:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{text[lang].heroTitle}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{text[lang].heroSubtitle}</p>
          </motion.div>

          {/* Mission Section */}
          <motion.section 
            className="mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white text-center mb-6">{text[lang].missionTitle}</h2>
              <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">{text[lang].missionBody}</p>
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section 
            className="mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">{text[lang].servicesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {text[lang].services.map((svc, idx) => (
                <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">{svc.title}</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {svc.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Why Choose Us / Features Section */}
          <motion.section 
            className="mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">{text[lang].whyTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features[lang].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-yellow-400 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section 
            className="mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white text-center mb-12">{text[lang].achievementsTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats[lang].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                    <div className="text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section 
            className="mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">{text[lang].teamTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  {...member}
                  isChineseVersion={lang === 'cht'}
                />
              ))}
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section 
            className="mb-20"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-600/10 backdrop-blur-sm rounded-lg p-8 border border-yellow-400/20">
              <h2 className="text-3xl font-bold text-white text-center mb-6">{text[lang].visionTitle}</h2>
              <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">{text[lang].visionBody}</p>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-white mb-6">{text[lang].ctaTitle}</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{text[lang].ctaBody}</p>
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-orange-600 text-black font-semibold px-8 py-4 rounded-lg text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate('/courses')}
            >
              {text[lang].ctaBtn} <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default AboutCht; 
