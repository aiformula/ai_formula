
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh-HK';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.blog': 'Blog',
    'nav.signup': 'Sign up',
    
    // Hero Section
    'hero.badge': 'AI in Business',
    'hero.title': 'AI: The Future of Learning',
    'hero.subtitle': 'How artificial intelligence is personalizing and transforming business automation.',
    'hero.chooseProgram': 'Choose program',
    'hero.partners': 'Partners',
    'hero.students': 'Students',
    'hero.instructors': 'Instructors',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Choose your path to AI mastery and business automation excellence',
    'services.training.title': 'Expert-Led AI Training',
    'services.training.description': 'Comprehensive learning materials designed by industry experts',
    'services.training.benefit1': 'Actionable Courses',
    'services.training.benefit2': 'Practical Frameworks',
    'services.training.benefit3': 'Team Upskilling',
    'services.training.button': 'View Courses',
    'services.automation.title': 'Bespoke Automation Solutions',
    'services.automation.description': 'Custom-built automation systems tailored to your business needs',
    'services.automation.benefit1': 'Increase Efficiency',
    'services.automation.benefit2': 'Reduce Errors',
    'services.automation.benefit3': 'Scale Operations',
    'services.automation.button': 'Get Free Consultation',
    
    // Technology Section
    'tech.title': 'Powered by Leading Technologies',
    'tech.subtitle': 'We master the tools that drive modern business automation',
    'tech.n8n': 'Workflow Automation',
    'tech.make': 'Integration Platform',
    'tech.zapier': 'App Connections',
    'tech.python': 'Data Processing',
    'tech.javascript': 'Web Development',
    'tech.openai': 'AI Integration',
    
    // Journey Section
    'journey.title': 'Your Automation Journey',
    'journey.subtitle': 'Our proven 4-step process ensures successful automation implementation',
    'journey.step1.title': 'Discovery Call',
    'journey.step1.description': 'We understand your needs and identify automation opportunities',
    'journey.step2.title': 'Strategy & Design',
    'journey.step2.description': 'Create a detailed blueprint tailored to your business processes',
    'journey.step3.title': 'Build & Integrate',
    'journey.step3.description': 'Develop and seamlessly integrate your custom automation solution',
    'journey.step4.title': 'Launch & Support',
    'journey.step4.description': 'Deploy your solution and provide ongoing support and optimization',
    
    // Learning Materials
    'learning.title': 'Featured Learning Materials',
    'learning.subtitle': 'Expert-crafted courses designed to accelerate your AI and automation journey',
    'learning.startLearning': 'Start Learning',
    'learning.beginner': 'Beginner',
    'learning.intermediate': 'Intermediate',
    'learning.advanced': 'Advanced',
    'learning.marketing': 'Marketing',
    'learning.development': 'Development',
    'learning.ai': 'AI',
    'learning.migration': 'Migration',
    'learning.course1.title': 'Introduction to n8n for Marketers',
    'learning.course1.description': 'Learn how to automate your marketing workflows with n8n\'s powerful visual interface',
    'learning.course2.title': 'Advanced Python Automation',
    'learning.course2.description': 'Master Python scripting for complex business process automation',
    'learning.course3.title': 'AI Integration Masterclass',
    'learning.course3.description': 'Integrate AI capabilities into your existing business workflows',
    'learning.course4.title': 'Zapier to Make Migration',
    'learning.course4.description': 'Seamlessly transition from Zapier to Make for enhanced automation capabilities',
    'learning.duration.hours': 'hours',
    
    // Instructors
    'instructors.title': 'About the',
    'instructors.titleHighlight': 'Instructors',
    'instructors.subtitle': 'Meet our world-class instructors who combine deep technical expertise with real-world business experience. Learn from industry leaders who have built and scaled AI solutions across marketing and development.',
    'instructors.cta': 'Ready to learn from industry experts who\'ve built real AI solutions?',
    'instructors.ctaButton': 'Meet Our Full Teaching Team',
    'instructors.professionalJourney': 'Professional Journey',
    'instructors.teachingPhilosophy': 'Teaching Philosophy',
    'instructors.keyQualifications': 'AI Transformation Impact:',
    'instructors.viewProfile': 'View Full Profile',
    'instructors.experience': 'Experience',
    'instructors.more': 'more...',
    
    // Instructor 1 - Kenneth
    'instructors.sarah.name': 'Kenneth',
    'instructors.sarah.title': 'AI Marketing Developer & Automation Specialist',
    'instructors.sarah.specialty': 'AI Tools & Marketing Automation',
    'instructors.sarah.experience': '4+ years',
    'instructors.sarah.biography': 'Kenneth is a pioneering AI marketing developer who specializes in cutting-edge AI tools, automation systems, and strategic implementation. Over 4 years of intensive AI learning, he has mastered the art of transforming traditional marketing approaches through artificial intelligence and automation technologies.',
    'instructors.sarah.philosophy': 'AI is fundamentally transforming how we live and work. The future belongs to those who embrace AI today. I help individuals and businesses get ahead of the curve by mastering AI tools and automation before the masses catch up. Now is the perfect time to gain that competitive advantage.',
    'instructors.sarah.qual1': 'AI Marketing Automation Expert',
    'instructors.sarah.qual2': 'Advanced AI Tools Implementation',
    'instructors.sarah.qual3': 'Strategic AI Business Integration',
    'instructors.sarah.qual4': 'Future-Ready Marketing Systems',
    
    // Instructor 2 - David
    'instructors.david.name': 'David',
    'instructors.david.title': 'Business Automation & AI Integration Specialist',
    'instructors.david.specialty': 'Automation & AI Solutions',
    'instructors.david.experience': '7+ years',
    'instructors.david.biography': 'David is a business automation expert who has spent 7+ years helping companies eliminate overwork and streamline operations. He specializes in creating powerful automation workflows using Make.com, n8n, and AI tools to handle posts, content management, and complex business processes.',
    'instructors.david.philosophy': 'Automation should solve real business problems and reduce overwork. I help businesses implement all-in-one AI and automation solutions that transform how they operate, allowing teams to focus on what truly matters while technology handles the repetitive tasks.',
    'instructors.david.qual1': 'Make.com & n8n Automation Expert',
    'instructors.david.qual2': 'Business Process Optimization',
    'instructors.david.qual3': 'AI-Powered Content Management',
    'instructors.david.qual4': 'All-in-One Business Solutions',
    
    // Instructor 3 - Ken
    'instructors.emily.name': 'Ken',
    'instructors.emily.title': 'Custom Business Developer & AI Automation Specialist',
    'instructors.emily.specialty': 'Custom Coding & AI Automation',
    'instructors.emily.experience': '5+ years',
    'instructors.emily.biography': 'Ken is a skilled custom business developer with 5+ years of coding experience, specializing in creating tailored business solutions and AI automation systems. He builds custom applications that help businesses work faster and run more efficiently through intelligent automation.',
    'instructors.emily.philosophy': 'Code should make work faster and businesses run smoother. I create custom solutions that integrate AI automation to eliminate bottlenecks and accelerate business processes. Every line of code should serve a purpose: making work faster and more efficient.',
    'instructors.emily.qual1': 'Custom Business Application Development',
    'instructors.emily.qual2': 'AI Automation Integration Expert',
    'instructors.emily.qual3': 'Performance Optimization Specialist',
    'instructors.emily.qual4': 'Rapid Development Solutions',
    
    // Instructor 4 - Jason
    'instructors.michael.name': 'Jason',
    'instructors.michael.title': 'Professional Developer & Custom Automation Specialist',
    'instructors.michael.specialty': 'Coding & Custom Automation',
    'instructors.michael.experience': '8+ years',
    'instructors.michael.biography': 'Jason is a professional developer with 8+ years of coding experience, specializing in LLM chatbox development, MCP integration, and web applications. For the past 2 years, he has been intensively learning AI to uplevel his coding skills and help companies integrate cutting-edge AI solutions.',
    'instructors.michael.philosophy': 'No AI, no life! AI can change more than you think. I believe that integrating AI into development work transforms not just how we code, but what we can achieve. Every developer needs to embrace AI to stay relevant and create extraordinary solutions.',
    'instructors.michael.qual1': 'LLM Chatbox Development Expert',
    'instructors.michael.qual2': 'MCP Integration Specialist',
    'instructors.michael.qual3': 'Full-Stack Web Development',
    'instructors.michael.qual4': 'AI-Enhanced Coding Solutions',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Real feedback from businesses using our custom AI automation solutions',
    'testimonials.testimonial1.quote': 'We got a custom WhatsApp automation system that handles customer inquiries 24/7. No more missed messages and our response time improved dramatically.',
    'testimonials.testimonial1.author': 'Wong Ka Ming',
    'testimonials.testimonial1.service': 'Custom Automation Solution',
    'testimonials.testimonial1.company': 'Local Trading Company',
    'testimonials.testimonial2.quote': 'Their team built us a custom business automation system that connects our inventory, orders, and accounting. Everything runs smoothly now.',
    'testimonials.testimonial2.author': 'Chan Siu Fung',
    'testimonials.testimonial2.service': '商業自動化 (Business Automation)',
    'testimonials.testimonial2.company': 'Small Manufacturing Business',
    'testimonials.testimonial3.quote': 'The custom AI chatbot they created for our restaurant handles reservations and orders perfectly. It understands Cantonese and English!',
    'testimonials.testimonial3.author': 'Lam Mei Ling',
    'testimonials.testimonial3.service': 'Custom AI Chatbot',
    'testimonials.testimonial3.company': 'Family Restaurant',
    
    // Contact Section
    'contact.title': 'Ready to Transform Your Business?',
    'contact.subtitle': "Let's discuss how AI Formula can help you master AI and automate your business processes",
    'contact.form.title': 'Get In Touch',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.message': 'How can we help?',
    'contact.form.messagePlaceholder': 'Tell us about your automation needs or learning goals...',
    'contact.form.send': 'Send Message',
    'contact.brainstorm.title': 'Not sure what you need? Try these ideas:',
    'contact.brainstorm.option1': 'AI Chatbot',
    'contact.brainstorm.option2': 'Automation',
    'contact.brainstorm.option3': 'Business Process',
    'contact.brainstorm.option4': 'Custom Solution',
    'contact.brainstorm.suggestion1': 'I want to create an AI chatbot that can handle customer inquiries and support in multiple languages for my business.',
    'contact.brainstorm.suggestion2': 'I need automation solutions to streamline repetitive tasks like data entry, email responses, and workflow management.',
    'contact.brainstorm.suggestion3': 'I want to optimize my business processes by integrating AI to improve efficiency and reduce manual work.',
    'contact.brainstorm.suggestion4': 'I need a custom AI solution tailored specifically for my industry and business requirements.',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.why.title': 'Why You Need AI Formula',
    'contact.why.benefit1': 'AI is transforming every industry - stay ahead or get left behind',
    'contact.why.benefit2': 'Your competitors are already using AI - don\'t let them gain the advantage',
    'contact.why.benefit3': 'Manual processes are becoming obsolete - automate now or struggle later',
    'contact.why.benefit4': 'The AI revolution is happening now - join it or watch from the sidelines',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.message': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
    
    // Toast Messages
    'toast.messageSent': 'Message Sent!',
    'toast.messageDescription': "Thank you for your interest. We'll get back to you within 24 hours.",
  },
  'zh-HK': {
    // Navigation
    'nav.home': '首頁',
    'nav.about': '關於我們',
    'nav.courses': '課程',
    'nav.blog': '部落格',
    'nav.signup': '註冊',
    
    // Hero Section
    'hero.badge': '商業AI',
    'hero.title': 'AI：未來的學習',
    'hero.subtitle': '人工智慧如何個人化並轉型商業自動化。',
    'hero.chooseProgram': '選擇課程',
    'hero.partners': '合作夥伴',
    'hero.students': '學員',
    'hero.instructors': '講師',
    
    // Services Section
    'services.title': '我們的服務',
    'services.subtitle': '選擇您通往AI精通和商業自動化卓越的道路',
    'services.training.title': '專家主導的AI培訓',
    'services.training.description': '由行業專家設計的全面學習材料',
    'services.training.benefit1': '實用課程',
    'services.training.benefit2': '實務框架',
    'services.training.benefit3': '團隊技能提升',
    'services.training.button': '查看課程',
    'services.automation.title': '客製化自動化解決方案',
    'services.automation.description': '為您的業務需求量身打造的自動化系統',
    'services.automation.benefit1': '提高效率',
    'services.automation.benefit2': '減少錯誤',
    'services.automation.benefit3': '擴大營運',
    'services.automation.button': '獲得免費諮詢',
    
    // Technology Section
    'tech.title': '由領先技術驅動',
    'tech.subtitle': '我們精通推動現代商業自動化的工具',
    'tech.n8n': '工作流程自動化',
    'tech.make': '整合平台',
    'tech.zapier': '應用程式連接',
    'tech.python': '數據處理',
    'tech.javascript': '網頁開發',
    'tech.openai': 'AI整合',
    
    // Journey Section
    'journey.title': '您的自動化之旅',
    'journey.subtitle': '我們經過驗證的4步驟流程確保成功的自動化實施',
    'journey.step1.title': '探索會議',
    'journey.step1.description': '我們了解您的需求並識別自動化機會',
    'journey.step2.title': '策略與設計',
    'journey.step2.description': '創建針對您業務流程的詳細藍圖',
    'journey.step3.title': '建構與整合',
    'journey.step3.description': '開發並無縫整合您的客製自動化解決方案',
    'journey.step4.title': '啟動與支援',
    'journey.step4.description': '部署您的解決方案並提供持續的支援和優化',
    
    // Learning Materials
    'learning.title': '精選學習材料',
    'learning.subtitle': '專家製作的課程，旨在加速您的AI和自動化之旅',
    'learning.startLearning': '開始學習',
    'learning.beginner': '初級',
    'learning.intermediate': '中級',
    'learning.advanced': '高級',
    'learning.marketing': '行銷',
    'learning.development': '開發',
    'learning.ai': 'AI',
    'learning.migration': '遷移',
    'learning.course1.title': '行銷人員的n8n入門',
    'learning.course1.description': '學習如何使用n8n強大的視覺化介面自動化您的行銷工作流程',
    'learning.course2.title': '進階Python自動化',
    'learning.course2.description': '掌握Python腳本以實現複雜的業務流程自動化',
    'learning.course3.title': 'AI整合大師班',
    'learning.course3.description': '將AI功能整合到您現有的業務工作流程中',
    'learning.course4.title': 'Zapier到Make的遷移',
    'learning.course4.description': '從Zapier無縫過渡到Make，獲得增強的自動化能力',
    'learning.duration.hours': '小時',
    
    // Instructors
    'instructors.title': '關於',
    'instructors.titleHighlight': '導師',
    'instructors.subtitle': '認識我們世界級的導師，他們結合深厚的技術專長和實際的商業經驗。從已經在市場營銷和開發領域建立和擴展AI解決方案的行業領袖身上學習。',
    'instructors.cta': '準備好向已經建立真正AI解決方案的行業專家學習嗎？',
    'instructors.ctaButton': '認識我們完整的教學團隊',
    'instructors.professionalJourney': '專業歷程',
    'instructors.teachingPhilosophy': '教學理念',
    'instructors.keyQualifications': 'AI轉型影響：',
    'instructors.viewProfile': '查看完整檔案',
    'instructors.experience': '經驗',
    'instructors.more': '更多...',
    
    // Instructor 1 - Kenneth
    'instructors.sarah.name': 'Kenneth',
    'instructors.sarah.title': 'AI行銷開發者及自動化專家',
    'instructors.sarah.specialty': 'AI工具及行銷自動化',
    'instructors.sarah.experience': '4年+',
    'instructors.sarah.biography': 'Kenneth是一位先鋒AI行銷開發者，專精於前沿AI工具、自動化系統和策略實施。經過4年深度AI學習，他已掌握透過人工智能和自動化技術轉型傳統行銷方法的藝術。',
    'instructors.sarah.philosophy': 'AI正在根本性地改變我們的生活和工作方式。未來屬於今天就擁抱AI的人。我幫助個人和企業在大眾趕上之前，通過掌握AI工具和自動化來領先一步。現在正是獲得競爭優勢的絕佳時機。',
    'instructors.sarah.qual1': 'AI行銷自動化專家',
    'instructors.sarah.qual2': '進階AI工具實施',
    'instructors.sarah.qual3': '策略性AI商業整合',
    'instructors.sarah.qual4': '未來就緒行銷系統',
    
    // Instructor 2 - David
    'instructors.david.name': 'David',
    'instructors.david.title': '商業自動化及AI整合專家',
    'instructors.david.specialty': '自動化及AI解決方案',
    'instructors.david.experience': '7年+',
    'instructors.david.biography': 'David是一位商業自動化專家，擁有7年以上幫助企業消除過勞和簡化營運的經驗。他專精於使用Make.com、n8n和AI工具創建強大的自動化工作流程，處理貼文、內容管理和複雜的商業流程。',
    'instructors.david.philosophy': '自動化應該解決真正的商業問題並減少過勞。我幫助企業實施一體化AI和自動化解決方案，轉型他們的營運方式，讓團隊專注於真正重要的事情，而讓技術處理重複性工作。',
    'instructors.david.qual1': 'Make.com及n8n自動化專家',
    'instructors.david.qual2': '商業流程優化',
    'instructors.david.qual3': 'AI驅動內容管理',
    'instructors.david.qual4': '一體化商業解決方案',
    
    // Instructor 3 - Ken
    'instructors.emily.name': 'Ken',
    'instructors.emily.title': '客製化商業開發者及AI自動化專家',
    'instructors.emily.specialty': '客製化編程及AI自動化',
    'instructors.emily.experience': '5年+',
    'instructors.emily.biography': 'Ken是一位熟練的客製化商業開發者，擁有5年以上的編程經驗，專精於創建客製化商業解決方案和AI自動化系統。他構建客製化應用程式，幫助企業透過智能自動化更快工作和更高效運行。',
    'instructors.emily.philosophy': '程式碼應該讓工作更快速，讓企業運行更順暢。我創建整合AI自動化的客製化解決方案，消除瓶頸並加速商業流程。每一行程式碼都應該有目的：讓工作更快更有效率。',
    'instructors.emily.qual1': '客製化商業應用程式開發',
    'instructors.emily.qual2': 'AI自動化整合專家',
    'instructors.emily.qual3': '性能優化專家',
    'instructors.emily.qual4': '快速開發解決方案',
    
    // Instructor 4 - Jason
    'instructors.michael.name': 'Jason',
    'instructors.michael.title': '專業開發者及客製化自動化專家',
    'instructors.michael.specialty': '編程及客製化自動化',
    'instructors.michael.experience': '8年+',
    'instructors.michael.biography': 'Jason是一位專業開發者，擁有8年以上的編程經驗，專精於LLM聊天機器人開發、MCP整合和網頁應用程式。在過去2年中，他一直在深度學習AI以提升他的編程技能，並幫助公司整合尖端AI解決方案。',
    'instructors.michael.philosophy': '沒有AI，就沒有生活！AI能改變的比你想像的更多。我相信將AI整合到開發工作中，不僅改變我們編程的方式，更改變我們能實現的目標。每個開發者都需要擁抱AI才能保持相關性並創造非凡的解決方案。',
    'instructors.michael.qual1': 'LLM聊天機器人開發專家',
    'instructors.michael.qual2': 'MCP整合專家',
    'instructors.michael.qual3': '全端網頁開發',
    'instructors.michael.qual4': 'AI增強編程解決方案',
    
    // Testimonials
    'testimonials.title': '客戶見證',
    'testimonials.subtitle': '已使用我們客製化AI自動化解決方案的企業真實回饋',
    'testimonials.testimonial1.quote': '我哋做咗個WhatsApp自動化系統，24小時處理客戶查詢。冇再漏咗訊息，回覆速度快咗好多。',
    'testimonials.testimonial1.author': '黃家明',
    'testimonials.testimonial1.service': '客製化自動化解決方案',
    'testimonials.testimonial1.company': '本地貿易公司',
    'testimonials.testimonial2.quote': '佢哋幫我哋整咗個商業自動化系統，將庫存、訂單同會計全部連埋一齊。而家運作好順暢。',
    'testimonials.testimonial2.author': '陳小鳳',
    'testimonials.testimonial2.service': '商業自動化',
    'testimonials.testimonial2.company': '小型製造業',
    'testimonials.testimonial3.quote': '佢哋為我哋餐廳做咗個AI聊天機器人，處理訂座同埋落單都好準確。仲識聽廣東話同英文！',
    'testimonials.testimonial3.author': '林美玲',
    'testimonials.testimonial3.service': '客製化AI聊天機器人',
    'testimonials.testimonial3.company': '家庭式餐廳',
    
    // Contact Section
    'contact.title': '準備好轉型您的業務了嗎？',
    'contact.subtitle': '讓我們討論AI Formula如何幫助您精通AI並自動化您的業務流程',
    'contact.form.title': '聯絡我們',
    'contact.form.name': '姓名',
    'contact.form.email': '電子郵件地址',
    'contact.form.message': '我們如何幫助您？',
    'contact.form.messagePlaceholder': '告訴我們您的自動化需求或學習目標...',
    'contact.form.send': '發送訊息',
    'contact.brainstorm.title': '唔知要咩？試下呢啲想法：',
    'contact.brainstorm.option1': 'AI聊天機器人',
    'contact.brainstorm.option2': '自動化',
    'contact.brainstorm.option3': '商業流程',
    'contact.brainstorm.option4': '客製化方案',
    'contact.brainstorm.suggestion1': '我想整個AI聊天機器人，可以處理客戶查詢同多語言支援。',
    'contact.brainstorm.suggestion2': '我需要自動化方案去簡化重複工作，好似資料輸入、電郵回覆同工作流程管理。',
    'contact.brainstorm.suggestion3': '我想優化商業流程，用AI提升效率同減少人手工作。',
    'contact.brainstorm.suggestion4': '我需要為我行業同業務需求度身訂造嘅AI解決方案。',
    'contact.info.title': '聯絡資訊',
    'contact.info.email': '電子郵件',
    'contact.info.phone': '電話',
    'contact.why.title': '點解你需要AI Formula',
    'contact.why.benefit1': 'AI正在改變每個行業 - 唔跟上就會被淘汰',
    'contact.why.benefit2': '你競爭對手已經用緊AI - 唔好俾佢哋搶先',
    'contact.why.benefit3': '人手流程已經過時 - 而家自動化定係之後辛苦',
    'contact.why.benefit4': 'AI革命而家發生緊 - 加入定係企埋一邊睇',
    
    // 404 Page
    'notFound.title': '404',
    'notFound.message': '糟糕！找不到頁面',
    'notFound.returnHome': '返回首頁',
    
    // Toast Messages
    'toast.messageSent': '訊息已發送！',
    'toast.messageDescription': '感謝您的關注。我們將在24小時內回覆您。',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh-HK');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
