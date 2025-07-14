import React, { createContext, useContext, useState, useEffect } from 'react'

// 語�?類�?定義
export type Language = 'en' | 'zh-HK'

// 翻譯?�口
interface Translations {
  [key: string]: string
}

// 語言上下文接口
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

// ?��?翻譯
const enTranslations: Translations = {
  // 導航
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.courses': 'Courses',
  'nav.blog': 'Blog',
  'nav.signup': 'Sign up',
  
  // Hero Section
  'hero.badge': 'AI in Business',
  'hero.title': 'AI: The Future of Learning',
  'hero.title1': 'AI: The Future of',
  'hero.titleHighlight': 'Learning',
  'hero.title2': 'Business Automation',
  'hero.subtitle': 'How artificial intelligence is personalizing and transforming business automation.',
  'hero.cta1': 'Start Learning',
  'hero.cta2': 'Learn More',
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
  'learning.program.title': 'Complete AI Mastery Program',
  'learning.program.description': 'Master all aspects of AI and automation with our comprehensive program designed for professionals',
  'learning.program.hours': '50+ Hours',
  'learning.program.access': 'Lifetime Access',
  'learning.program.button': 'Explore Full Program',
  
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
  'testimonials.testimonial2.service': '?�業?��???(Business Automation)',
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
  'contact.form.description': 'Fill out the form below and we\'ll get back to you within 24 hours',
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
  'contact.info.emailUs': 'Email Us',
  'contact.info.callUs': 'Call Us',
  'contact.info.visitUs': 'Visit Us',
  'contact.info.emailDescription': 'Get quick responses to your questions',
  'contact.info.phoneDescription': 'Mon-Fri 9AM-6PM HKT',
  'contact.info.visitDescription': 'Schedule an appointment',
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
}

// 中�?翻譯
const zhTranslations: Translations = {
  // 導航
  'nav.home': '首�?',
  'nav.about': '?�於?��?,
  'nav.courses': '課�?',
  'nav.blog': '?�落??,
  'nav.signup': '註�?',
  
  // Hero Section
  'hero.badge': '?�業AI',
  'hero.title': 'AI：未來�?學�?',
  'hero.title1': 'AI：未來�?',
  'hero.titleHighlight': '學�?',
  'hero.title2': '?�業?��???,
  'hero.subtitle': '人工?�慧如�??�人?�並轉�??�業?��??��?,
  'hero.cta1': '?��?學�?',
  'hero.cta2': '了解?��?',
  'hero.chooseProgram': '?��?課�?',
  'hero.partners': '?��?夥伴',
  'hero.students': '學員',
  'hero.instructors': '講師',
  
  // Services Section
  'services.title': '?�們�??��?',
  'services.subtitle': '?��??�通�?AI精通�??�業?��??��?越�??�路',
  'services.training.title': '專家主�??�AI?��?',
  'services.training.description': '?��?業�?家設計�??�面學�??��?',
  'services.training.benefit1': '實用課�?',
  'services.training.benefit2': '實�?框架',
  'services.training.benefit3': '?��??�?��???,
  'services.training.button': '?��?課�?',
  'services.automation.title': '客製?�自?��?�?��?��?',
  'services.automation.description': '?�您?�業?��?求�?身�??��??��??�系�?,
  'services.automation.benefit1': '?��??��?',
  'services.automation.benefit2': '減�??�誤',
  'services.automation.benefit3': '?�大?��?',
  'services.automation.button': '?��??�費諮詢',
  
  // Technology Section
  'tech.title': '?��??��?術�???,
  'tech.subtitle': '?�們精?�推?�現�??業自?��??�工??,
  'tech.n8n': '工�?流�??��???,
  'tech.make': '?��?平台',
  'tech.zapier': '?�用程�???��',
  'tech.python': '?��??��?',
  'tech.javascript': '網�??�發',
  'tech.openai': 'AI?��?',
  
  // Journey Section
  'journey.title': '?��??��??��???,
  'journey.subtitle': '?�們�??��?證�?4步�?流�?確�??��??�自?��?實施',
  'journey.step1.title': '?�索?�議',
  'journey.step1.description': '?�們�?�?��?��?求並識別?��??��???,
  'journey.step2.title': '策略?�設�?,
  'journey.step2.description': '?�建?��??�業?��?程�?詳細?��?',
  'journey.step3.title': '建�??�整??,
  'journey.step3.description': '?�發並無縫整?�您?�客製自?��?�?��?��?',
  'journey.step4.title': '?��??�支??,
  'journey.step4.description': '?�署?��?�?��?��?並�?供�?續�??�援?�優??,
  
  // Learning Materials
  'learning.title': '精選學�??��?',
  'learning.subtitle': '專家製�??�課程�??�在?�速您?�AI?�自?��?之�?',
  'learning.startLearning': '?��?學�?',
  'learning.beginner': '?��?',
  'learning.intermediate': '中�?',
  'learning.advanced': '高�?',
  'learning.marketing': '行銷',
  'learning.development': '?�發',
  'learning.ai': 'AI',
  'learning.migration': '?�移',
  'learning.course1.title': '行銷人員?�n8n?��?',
  'learning.course1.description': '學�?如�?使用n8n強大?��?覺�?介面?��??�您?��??�工作�?�?,
  'learning.course2.title': '?��?Python?��???,
  'learning.course2.description': '?�握Python?�本以實?��??��?業�?流�??��???,
  'learning.course3.title': 'AI?��?大師??,
  'learning.course3.description': '將AI?�能?��??�您?��??�業?�工作�?程中',
  'learning.course4.title': 'Zapier?�Make?�遷�?,
  'learning.course4.description': '從Zapier?�縫?�渡?�Make，獲得�?強�??��??�能??,
  'learning.duration.hours': '小�?',
  'learning.program.title': '完整AI精通課�?,
  'learning.program.description': '?��??�們為專業人士設�??��??�課程�??�握AI?�自?��??��??�方??,
  'learning.program.hours': '50+ 小�?',
  'learning.program.access': '終身使用',
  'learning.program.button': '?�索完整課�?',
  
  // Instructors
  'instructors.title': '?�於',
  'instructors.titleHighlight': '導師',
  'instructors.subtitle': '認�??�們�??��??��?師�?他們�??�深?��??�術�??��?實�??��?業�?驗。�?已�??��??��??��??�發?��?建�??�擴展AI�?��?��??��?業�?袖身上學習�?,
  'instructors.cta': '準�?好�?已�?建�??�正AI�?��?��??��?業�?家學習�?�?,
  'instructors.ctaButton': '認�??�們�??��??�學?��?',
  'instructors.professionalJourney': '專業歷�?',
  'instructors.teachingPhilosophy': '?�學?�念',
  'instructors.keyQualifications': 'AI轉�?影響�?,
  'instructors.viewProfile': '?��?完整檔�?',
  'instructors.experience': '經�?',
  'instructors.more': '?��?...',
  
  // Instructor 1 - Kenneth
  'instructors.sarah.name': 'Kenneth',
  'instructors.sarah.title': 'AI行銷?�發?��??��??��?�?,
  'instructors.sarah.specialty': 'AI工具?��??�自?��?',
  'instructors.sarah.experience': '4�?',
  'instructors.sarah.biography': 'Kenneth?��?位�??�AI行銷?�發?��?專精?��?沿AI工具?�自?��?系統?��??�實?�。�???年深度AI學�?，�?已�??�透�?人工?�能?�自?��??�術�??�傳統�??�方法�??��???,
  'instructors.sarah.philosophy': 'AI�?��?�本?�地?��??�們�??�活?�工作方式。未來屬?��?天就?�抱AI?�人?��?幫助?�人?��?業在大眾趕�?之�?，通�??�握AI工具?�自?��?來�??��?步。現?�正?�獲得競?�優?��?絕佳?��???,
  'instructors.sarah.qual1': 'AI行銷?��??��?�?,
  'instructors.sarah.qual2': '?��?AI工具實施',
  'instructors.sarah.qual3': '策略?�AI?�業?��?',
  'instructors.sarah.qual4': '?��?就�?行銷系統',
  
  // Instructor 2 - David
  'instructors.david.name': 'David',
  'instructors.david.title': '?�業?��??��?AI?��?專家',
  'instructors.david.specialty': '?��??��?AI�?��?��?',
  'instructors.david.experience': '7�?',
  'instructors.david.biography': 'David?��?位�?業自?��?專家，�???年以上幫?��?業�??��??��?簡�??��??��?驗。�?專精?�使?�Make.com?�n8n?�AI工具?�建強大?�自?��?工�?流�?，�??�貼?�、內容管?��?複�??��?業�?程�?,
  'instructors.david.philosophy': '?��??��?該解決�?�???�業?��?並�?少�??�。�?幫助企業實施一體�?AI?�自?��?�?��?��?，�??��??��??��??��?，�??��?專注?��?�??要�?事�?，而�??�術�??��?複性工作�?,
  'instructors.david.qual1': 'Make.com?�n8n?��??��?�?,
  'instructors.david.qual2': '?�業流�??��?',
  'instructors.david.qual3': 'AI驅�??�容管�?',
  'instructors.david.qual4': '一體�??�業�?��?��?',
  
  // Instructor 3 - Ken
  'instructors.emily.name': 'Ken',
  'instructors.emily.title': '客製?��?業�??�者�?AI?��??��?�?,
  'instructors.emily.specialty': '客製?�編程�?AI?��???,
  'instructors.emily.experience': '5�?',
  'instructors.emily.biography': 'Ken?��?位�?練�?客製?��?業�??�者�??��?5年以上�?編�?經�?，�?精於?�建客製?��?業解決方案�?AI?��??�系統。�?構建客製?��??��?式�?幫助企業?��??�能?��??�更快工作�??��??��?行�?,
  'instructors.emily.philosophy': '程�?碼�?該�?工�??�快?��?讓�?業�?行更?�暢?��??�建?��?AI?��??��?客製?�解決方案�?消除?�頸並�??��?業�?程。�?一行�?式碼?��?該�??��?：�?工�??�快?��??��???,
  'instructors.emily.qual1': '客製?��?業�??��?式�???,
  'instructors.emily.qual2': 'AI?��??�整?��?�?,
  'instructors.emily.qual3': '?�能?��?專家',
  'instructors.emily.qual4': '快速�??�解決方�?,
  
  // Instructor 4 - Jason
  'instructors.michael.name': 'Jason',
  'instructors.michael.title': '專業?�發?��?客製?�自?��?專家',
  'instructors.michael.specialty': '編�??�客製�??��???,
  'instructors.michael.experience': '8�?',
  'instructors.michael.biography': 'Jason?��?位�?業�??�者�??��?8年以上�?編�?經�?，�?精於LLM?�天機器人�??�、MCP?��??�網?��??��?式。在?�去2年中，�?一?�在深度學�?AI以�??��??�編程�??��?並幫?�公?�整?��?端AI�?��?��???,
  'instructors.michael.philosophy': '沒�?AI，就沒�??�活！AI?�改變�?比�??��??�更多。�??�信將AI?��??��??�工作中，�??�改變�??�編程�??��?，更?��??�們能實現?�目標。�??��??�者都?�要�??�AI?�能保�??��??�並?�造�??��?�?��?��???,
  'instructors.michael.qual1': 'LLM?�天機器人�??��?�?,
  'instructors.michael.qual2': 'MCP?��?專家',
  'instructors.michael.qual3': '?�端網�??�發',
  'instructors.michael.qual4': 'AI增強編�?�?��?��?',
  
  // Testimonials - ?�改人�??�英?��?�?  'testimonials.title': '客戶見�?',
  'testimonials.subtitle': '已使?��??�客製�?AI?��??�解決方案�?企業?�實?��?',
  'testimonials.testimonial1.quote': '?�們�?了個WhatsApp?��??�系統�?24小�??��?客戶?�詢?��??��?漏�?訊息，�?覆速度快�?很�???,
  'testimonials.testimonial1.author': 'Louis Liu',
  'testimonials.testimonial1.service': '客製?�自?��?�?��?��?',
  'testimonials.testimonial1.company': '?�地貿�??�司',
  'testimonials.testimonial2.quote': '他們幫?�們整了個�?業自?��?系統，�?庫�??��??��??��??�部??��一起。現?��?作�??�暢??,
  'testimonials.testimonial2.author': 'Sarah Chen',
  'testimonials.testimonial2.service': '?�業?��???,
  'testimonials.testimonial2.company': '小�?製造業',
  'testimonials.testimonial3.quote': '他們為?�們�?廳�?了個AI?�天機器人�??��?訂座?�落?�都很�?確。�?識聽�?��話�??��?�?,
  'testimonials.testimonial3.author': 'Mike Wong',
  'testimonials.testimonial3.service': '客製?�AI?�天機器�?,
  'testimonials.testimonial3.company': '家庭式�?�?,
  
  // Contact Section
  'contact.title': '準�?好�??�您?�業?��??��?',
  'contact.subtitle': '讓�??��?論AI Formula如�?幫助?�精?�AI並自?��??��?業�?流�?',
  'contact.form.title': '?�絡?��?,
  'contact.form.name': '姓�?',
  'contact.form.email': '?��??�件?��?',
  'contact.form.message': '?�們�?何幫?�您�?,
  'contact.form.messagePlaceholder': '?�訴?�們您?�自?��??�求�?學�??��?...',
  'contact.form.send': '?�送�???,
  'contact.form.description': '填寫下方表格，�??��???4小�??��?覆您',
  'contact.brainstorm.title': '?�知要咩？試下呢?�想法�?',
  'contact.brainstorm.option1': 'AI?�天機器�?,
  'contact.brainstorm.option2': '?��???,
  'contact.brainstorm.option3': '?�業流�?',
  'contact.brainstorm.option4': '客製?�方�?,
  'contact.brainstorm.suggestion1': '?�想?�個AI?�天機器人�??�以?��?客戶?�詢?��?語�??�援??,
  'contact.brainstorm.suggestion2': '?��?要自?��??��??�簡?��?複工作�?好似資�?輸入?�電?��?覆�?工�?流�?管�???,
  'contact.brainstorm.suggestion3': '?�想?��??�業流�?，用AI?��??��??��?少人?�工作�?,
  'contact.brainstorm.suggestion4': '?��?要為?��?業�?業�??�求度身�??��?AI�?��?��???,
  'contact.info.title': '?�絡資�?',
  'contact.info.email': '?��??�件',
  'contact.info.phone': '?�話',
  'contact.info.emailUs': '?�郵?��?,
  'contact.info.callUs': '?�電?��?,
  'contact.info.visitUs': '?�訪?��?,
  'contact.info.emailDescription': '快速�??�您?��?�?,
  'contact.info.phoneDescription': '?��??�週�? 9AM-6PM HKT',
  'contact.info.visitDescription': '?��??�面',
  'contact.why.title': '點解你�?要AI Formula',
  'contact.why.benefit1': 'AI�?��?��?每個�?�?- ?��?上就?�被淘汰',
  'contact.why.benefit2': '你競?��??�已經用緊AI - ?�好俾佢?�搶??,
  'contact.why.benefit3': '人�?流�?已�??��? - ?�在?��??��??��?後�???,
  'contact.why.benefit4': 'AI?�命?�在?��?�?- ?�入?�是站在一?��?',
  
  // 404 Page
  'notFound.title': '404',
  'notFound.message': '糟�?！找不到?�面',
  'notFound.returnHome': '返�?首�?',
  
  // Toast Messages
  'toast.messageSent': '訊息已發?��?',
  'toast.messageDescription': '?��??��??�注?��??��???4小�??��?覆您??,
}

// ?�建語�?上�???const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 語�??��??��?�?export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // �?localStorage 讀?��?言設�?，�?設為中�?
    const savedLanguage = localStorage.getItem('language')
    return (savedLanguage as Language) || 'zh-HK'
  })

  // 保�?語�?設�???localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // ?��?翻譯?�本
  const getTranslations = (lang: Language): Translations => {
    return lang === 'zh-HK' ? zhTranslations : enTranslations
  }

  // 翻譯?�數
  const t = (key: string): string => {
    const translations = getTranslations(language)
    return translations[key] || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: getTranslations(language)
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// 使用語�?上�??��? Hook
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
