import React, { createContext, useContext, useState, ReactNode } from 'react';

// 支援語言類型
export type Language = 'en' | 'zh-HK'

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

// 英文翻譯
const enTranslations: Translations = {
  // 導航
  'nav.home': 'Home',
  'nav.about': 'About Us',
  'nav.courses': 'Courses',
  'nav.tools': 'Tools',
  'nav.blog': 'Blog',
  'nav.signin': 'Sign In',
  'nav.signup': 'Sign Up',
  
  // Hero Section
  'hero.badge': 'AI in Business',
  'hero.title': 'AI: The Future of',
  'hero.title1': 'AI: The Future of',
  'hero.titleHighlight': 'Learning',
  'hero.subtitle': 'Practical AI training designed for Hong Kong professionals',
  'hero.description': 'Learn AI skills that immediately help you save time and boost efficiency',
  'hero.cta1': 'Start Free Trial',
  'hero.cta2': 'View Courses',
  'hero.chooseProgram': 'Choose Your Program',
  
  // Technology Showcase
  'tech.title': 'Powered by Leading Technologies',
  'tech.subtitle': 'We master the tools that drive modern business automation',
  'tech.n8n': 'Workflow Automation',
  'tech.make': 'Integration Platform',
  'tech.zapier': 'App Connections',
  'tech.python': 'Data Processing',
  'tech.javascript': 'Web Development',
  'tech.openai': 'AI Integration',
  
  // Testimonials
  'testimonials.title': 'What Our Clients Say',
  'testimonials.subtitle': 'Real feedback from businesses using our AI automation solutions',
  'testimonials.testimonial1.quote': 'AI Formula helped us build a custom WhatsApp automation system that handles customer inquiries 24/7. No more missed messages and our response time improved dramatically.',
  'testimonials.testimonial1.author': 'Wong Ka Ming',
  'testimonials.testimonial1.service': 'Custom Automation Solution',
  'testimonials.testimonial1.company': 'Local Trading Company',
  'testimonials.testimonial2.quote': 'Their team built us a custom business automation system that connects our inventory, orders, and accounting. Everything runs smoothly now.',
  'testimonials.testimonial2.author': 'Chan Siu Fung',
  'testimonials.testimonial2.service': 'Business Automation',
  'testimonials.testimonial2.company': 'Small Manufacturing Business',
  'testimonials.testimonial3.quote': 'The custom AI chatbot they created for our restaurant handles reservations and orders perfectly. It understands Cantonese and English!',
  'testimonials.testimonial3.author': 'Lam Mei Ling',
  'testimonials.testimonial3.service': 'Custom AI Chatbot',
  'testimonials.testimonial3.company': 'Family Restaurant',
  
  // Automation Journey
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
  
  // Instructors
  'instructors.title': 'Meet Our',
  'instructors.titleHighlight': 'Expert Instructors',
  'instructors.subtitle': 'Learn from industry leaders who combine deep technical expertise with real-world business experience in AI and automation.',
  'instructors.experience': 'Experience',
  'instructors.professionalJourney': 'Professional Journey',
  'instructors.teachingPhilosophy': 'Teaching Philosophy',
  'instructors.keyQualifications': 'Key Qualifications',
  'instructors.viewProfile': 'View Full Profile',
  
  // Kenneth - First Instructor
  'instructors.sarah.name': 'Kenneth',
  'instructors.sarah.title': 'AI Marketing Developer & Automation Specialist',
  'instructors.sarah.specialty': 'AI Tools & Marketing Automation',
  'instructors.sarah.experience': '4+ years',
  'instructors.sarah.biography': 'Kenneth is a pioneering AI marketing developer who specializes in cutting-edge AI tools, automation systems, and strategic implementation. Over 4 years of intensive AI learning, he has mastered the art of transforming traditional marketing approaches through artificial intelligence and automation technologies.',
  'instructors.sarah.philosophy': 'AI is fundamentally transforming how we live and work. The future belongs to those who embrace AI today. I help individuals and businesses get ahead of the curve by mastering AI tools and automation before the masses catch up.',
  'instructors.sarah.qual1': 'AI Marketing Automation Expert',
  'instructors.sarah.qual2': 'Advanced AI Tools Implementation',
  'instructors.sarah.qual3': 'Strategic AI Business Integration',
  'instructors.sarah.qual4': 'Future-Ready Marketing Systems',
  
  // David - Second Instructor
  'instructors.david.name': 'David',
  'instructors.david.title': 'Business Automation & AI Integration Specialist',
  'instructors.david.specialty': 'Automation & AI Solutions',
  'instructors.david.experience': '7+ years',
  'instructors.david.biography': 'David is a business automation expert who has spent 7+ years helping companies eliminate overwork and streamline operations. He specializes in creating powerful automation workflows using Make.com, n8n, and AI tools.',
  'instructors.david.philosophy': 'Automation should solve real business problems and reduce overwork. I help businesses implement all-in-one AI solutions that transform operations.',
  'instructors.david.qual1': 'Make.com & n8n Automation Expert',
  'instructors.david.qual2': 'Business Process Optimization',
  'instructors.david.qual3': 'AI-Powered Content Management',
  'instructors.david.qual4': 'All-in-One Business Solutions',
  
  // Ken - Third Instructor
  'instructors.emily.name': 'Ken',
  'instructors.emily.title': 'Custom Business Developer & AI Automation Specialist',
  'instructors.emily.specialty': 'Custom Coding & AI Automation',
  'instructors.emily.experience': '5+ years',
  'instructors.emily.biography': 'Ken is a skilled custom business developer with 5+ years of coding experience, specializing in creating tailored business solutions and AI automation systems that help businesses work faster and run more efficiently.',
  'instructors.emily.philosophy': 'Code should make work faster and businesses run smoother. I create custom solutions that integrate AI automation to eliminate bottlenecks and accelerate business processes.',
  'instructors.emily.qual1': 'Custom Business Application Development',
  'instructors.emily.qual2': 'AI Automation Integration Expert',
  'instructors.emily.qual3': 'Performance Optimization Specialist',
  'instructors.emily.qual4': 'Rapid Development Solutions',
  
  // Jason - Fourth Instructor
  'instructors.michael.name': 'Jason',
  'instructors.michael.title': 'Professional Developer & Custom Automation Specialist',
  'instructors.michael.specialty': 'Coding & Custom Automation',
  'instructors.michael.experience': '8+ years',
  'instructors.michael.biography': 'Jason is a professional developer with 8+ years of coding experience, specializing in LLM chatbox development, MCP integration, and web applications. He has been intensively learning AI to uplevel coding skills.',
  'instructors.michael.philosophy': 'No AI, no life! AI can change more than you think. Every developer needs to embrace AI to stay relevant and create extraordinary solutions.',
  'instructors.michael.qual1': 'LLM Chatbox Development Expert',
  'instructors.michael.qual2': 'MCP Integration Specialist',
  'instructors.michael.qual3': 'Full-Stack Web Development',
  'instructors.michael.qual4': 'AI-Enhanced Coding Solutions',
  
  // Contact
  'contact.title': 'Get In Touch',
  'contact.subtitle': 'Ready to transform your business with AI?',
  'contact.form.title': 'Send Us a Message',
  'contact.form.description': 'Fill out the form below and we\'ll get back to you within 24 hours',
  'contact.form.name': 'Full Name',
  'contact.form.email': 'Email Address',
  'contact.form.message': 'How can we help you?',
  'contact.form.send': 'Send Message',
  'contact.info.emailUs': 'Email Us',
  'contact.info.emailDescription': 'Get quick responses to your questions',
  'contact.info.callUs': 'Call Us',
  'contact.info.phoneDescription': 'Mon-Fri 9AM-6PM HKT',
  'contact.info.visitUs': 'Visit Us',
  'contact.info.visitDescription': 'Schedule an appointment',
  
  // Toast Messages
  'toast.messageSent': 'Message Sent!',
  'toast.messageDescription': 'Thank you for your interest. We\'ll get back to you within 24 hours.',
  
  // Features
  'features.title': 'Why Choose AI Formula?',
  'features.subtitle': 'Professional AI training designed for Hong Kong market',
  'features.practical.title': 'Practical Applications',
  'features.practical.desc': 'Real business scenarios and hands-on projects',
  'features.expert.title': 'Expert Instructors',
  'features.expert.desc': 'Industry professionals with proven track records',
  'features.support.title': 'Ongoing Support',
  'features.support.desc': 'Continuous learning support and community',
  'features.local.title': 'Local Focus',
  'features.local.desc': 'Designed specifically for Hong Kong business environment',
  
  // Courses
  'courses.title': 'Featured Courses',
  'courses.subtitle': 'Comprehensive AI training programs',
  'courses.beginner': 'Beginner',
  'courses.intermediate': 'Intermediate',
  'courses.advanced': 'Advanced',
  'courses.hours': 'hours',
  'courses.students': 'students',
  'courses.rating': 'rating',
  'courses.enroll': 'Enroll Now',
  'courses.learnMore': 'Learn More',
  
  // Footer
  'footer.company': 'AI Formula',
  'footer.description': 'Professional AI training for Hong Kong businesses',
  'footer.links': 'Quick Links',
  'footer.courses': 'Courses',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.support': 'Support',
  'footer.legal': 'Legal',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.newsletter': 'Newsletter',
  'footer.newsletter.desc': 'Get the latest AI updates and course announcements',
  'footer.newsletter.placeholder': 'Enter your email',
  'footer.newsletter.button': 'Subscribe',
  'footer.social': 'Follow Us',
  'footer.rights': 'All rights reserved',
  
  // Course Details
  'course.duration': 'Duration',
  'course.level': 'Level',
  'course.language': 'Language',
  'course.certificate': 'Certificate',
  'course.overview': 'Course Overview',
  'course.curriculum': 'Curriculum',
  'course.instructor': 'Instructor',
  'course.reviews': 'Reviews',
  'course.whatYouLearn': 'What You\'ll Learn',
  'course.requirements': 'Requirements',
  'course.includes': 'This course includes',
  'course.enroll': 'Enroll Course',
  'course.preview': 'Preview Course',
  
  // Learning
  'learning.progress': 'Progress',
  'learning.completed': 'Completed',
  'learning.continue': 'Continue Learning',
  'learning.start': 'Start Learning',
  'learning.next': 'Next Lesson',
  'learning.previous': 'Previous Lesson',
  'learning.notes': 'Notes',
  'learning.resources': 'Resources',
  'learning.quiz': 'Quiz',
  'learning.exercise': 'Exercise',
  'learning.download': 'Download',
  
  // Blog
  'blog.title': 'Latest Insights',
  'blog.subtitle': 'AI Formula Expert Insights',
  'blog.readMore': 'Read More',
  'blog.category': 'Category',
  'blog.tags': 'Tags',
  'blog.author': 'Author',
  'blog.date': 'Date',
  'blog.readTime': 'read time',
  'blog.share': 'Share',
  'blog.like': 'Like',
  'blog.comment': 'Comment',
  
  // Auth
  'auth.login': 'Login',
  'auth.signup': 'Sign Up',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.confirmPassword': 'Confirm Password',
  'auth.forgotPassword': 'Forgot Password?',
  'auth.rememberMe': 'Remember Me',
  'auth.loginButton': 'Login',
  'auth.signupButton': 'Sign Up',
  'auth.or': 'Or',
  'auth.googleLogin': 'Continue with Google',
  'auth.facebookLogin': 'Continue with Facebook',
  'auth.hasAccount': 'Already have an account?',
  'auth.noAccount': 'Don\'t have an account?',
  'auth.loginDescription': 'Enter your email and password to sign in to your account',
  'auth.signupDescription': 'Create your account to start learning with AI Formula',
  'auth.emailPlaceholder': 'Please enter your email address',
  'auth.passwordPlaceholder': 'Please enter your password',
  'auth.confirmPasswordPlaceholder': 'Please re-enter your password',
  
  // Dashboard
  'dashboard.welcome': 'Welcome back',
  'dashboard.overview': 'Overview',
  'dashboard.myCourses': 'My Courses',
  'dashboard.progress': 'Progress',
  'dashboard.achievements': 'Achievements',
  'dashboard.settings': 'Settings',
  'dashboard.profile': 'Profile',
  'dashboard.notifications': 'Notifications',
  'dashboard.billing': 'Billing',
  'dashboard.support': 'Support',
  
  // User Avatar Dropdown
  'userMenu.dashboard': 'Dashboard',
  'userMenu.settings': 'Settings',
  'userMenu.profile': 'Profile',
  'userMenu.signOut': 'Sign Out',
  'userMenu.greeting': 'Hello',
  
  // Common
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.success': 'Success',
  'common.warning': 'Warning',
  'common.info': 'Info',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.view': 'View',
  'common.download': 'Download',
  'common.upload': 'Upload',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',
  'common.reset': 'Reset',
  'common.apply': 'Apply',
  'common.close': 'Close',
  'common.open': 'Open',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.ok': 'OK',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.submit': 'Submit',
  'common.confirm': 'Confirm',
  'common.more': 'More',
  'common.less': 'Less',
  'common.show': 'Show',
  'common.hide': 'Hide',
  'common.expand': 'Expand',
  'common.collapse': 'Collapse',
  
  // Tools Page
  'tools.title': 'Useful Tools',
  'tools.subtitle': 'Discover powerful tools to enhance your productivity and creativity',
  'tools.categories.aiVideo': 'AI Video Tools',
  'tools.categories.dataTools': 'Data Tools',
  'tools.categories.designTools': 'Design Tools', 
  'tools.categories.marketingTools': 'AI Marketing Tools',
  
  // Design Tools
  'tools.freepik.title': 'Freepik - Free Design Resources',
  'tools.freepik.description': 'Access millions of free vectors, photos, and graphics for your projects. Create stunning visuals without breaking the budget.',
  'tools.freepik.tag': 'Free Design',
  'tools.freepik.visitSite': 'Visit Freepik',
  
  // Data Tools
  'tools.mem0.title': 'Mem0 - OpenMemory MCP',
  'tools.mem0.description': 'Advanced memory management and conversation persistence for AI applications. Build smarter AI systems with contextual memory.',
  'tools.mem0.tag': 'AI Memory',
  'tools.mem0.visitSite': 'Visit Mem0',
  
  'tools.chat4data.title': 'Chat4Data - AI Web Data Extraction',
  'tools.chat4data.description': 'Extract structured data from any website through natural conversation. No coding required - AI automatically detects and extracts valuable data.',
  'tools.chat4data.tag': 'Data Extraction',
  'tools.chat4data.visitSite': 'Visit Chat4Data',
  
  // AI Video Tools
  'tools.hailuo.title': 'Hailuo AI - Top AI Video Generation',
  'tools.hailuo.description': 'Try Hailuo 02 by Minimax for free, a top-performing AI video tool that transforms images into stunning HD videos in minutes.',
  'tools.hailuo.tag': 'AI Video',
  'tools.hailuo.visitSite': 'Visit Hailuo AI',
  
  'tools.higgsfield.title': 'Higgsfield AI - Visual Effects',
  'tools.higgsfield.description': 'AI-powered camera controls and visual effects tools. From explosions to surreal transformations, create cinematic visual effects.',
  'tools.higgsfield.tag': 'Visual Effects',
  'tools.higgsfield.visitSite': 'Visit Higgsfield',
  
  'tools.unstableml.title': 'UnstableML - AI Avatars',
  'tools.unstableml.description': 'Personalized AI avatars for product demos, tutorials, and UGC content creation. Clone your face and voice for authentic content.',
  'tools.unstableml.tag': 'AI Avatars',
  'tools.unstableml.visitSite': 'Visit UnstableML',
  
  'tools.4dv.title': '4DV.AI - AI Video Platform',
  'tools.4dv.description': 'Advanced AI video generation and editing platform with professional-grade video creation tools and effects.',
  'tools.4dv.tag': 'AI Video',
  'tools.4dv.visitSite': 'Visit 4DV.AI',
  
  'tools.seaweedapt.title': 'Seaweed APT2 - Real-Time Video',
  'tools.seaweedapt.description': 'Autoregressive adversarial post-training for real-time interactive video generation. Stream high-quality videos at 24fps with minimal latency.',
  'tools.seaweedapt.tag': 'Real-Time Video',
  'tools.seaweedapt.visitSite': 'Visit Seaweed APT',
  
  // Marketing Tools  
  'tools.headai.title': 'Head AI - World\'s First AI Marketer',
  'tools.headai.description': 'Professional AI taking over your influencer & affiliate marketing. Not a tool, but a complete AI marketing team that handles campaigns end-to-end.',
  'tools.headai.tag': 'AI Marketing',
  'tools.headai.visitSite': 'Visit Head AI',
  
  // 404 Page
  'notFound.title': 'Oops! Page Not Found',
  'notFound.subtitle': 'The page you\'re looking for doesn\'t exist',
  'notFound.description': 'Don\'t worry, it happens to the best of us. The page might have been moved, deleted, or you might have mistyped the URL.',
  'notFound.error404': '404',
  'notFound.pageNotFound': 'Page Not Found',
  'notFound.quickLinks': 'Quick Links',
  'notFound.backToHome': 'Back to Home',
  'notFound.contactSupport': 'Contact Support',
  'notFound.reportProblem': 'Report Problem',
  'notFound.currentPath': 'Looking for',
  'notFound.timestamp': 'Time',
  'notFound.needHelp': 'Need Help?',
}

// 中文翻譯
const zhTranslations: Translations = {
  // 導航
  'nav.home': '首頁',
  'nav.about': '關於我們',
  'nav.courses': '課程',
  'nav.tools': '推薦 AI 工具',
  'nav.blog': '部落格',
  'nav.signin': '登入',
  'nav.signup': '註冊',
  
  // Hero Section
  'hero.badge': '商業AI',
  'hero.title': 'AI：未來的學習',
  'hero.title1': 'AI：未來的',
  'hero.titleHighlight': '學習',
  'hero.subtitle': '專為香港專業人士設計的實用AI培訓',
  'hero.description': '學習能立即幫助您節省時間和提高效率的AI技能',
  'hero.cta1': '開始免費試用',
  'hero.cta2': '查看課程',
  'hero.chooseProgram': '選擇您的課程',
  
  // Technology Showcase
  'tech.title': '採用領先技術',
  'tech.subtitle': '我們精通驅動現代商業自動化的工具',
  'tech.n8n': '工作流程自動化',
  'tech.make': '整合平台',
  'tech.zapier': '應用程式連接',
  'tech.python': '數據處理',
  'tech.javascript': '網頁開發',
  'tech.openai': 'AI 整合',
  
  // Testimonials
  'testimonials.title': '客戶怎麼說',
  'testimonials.subtitle': '來自使用我們AI自動化解決方案的企業真實反饋',
  'testimonials.testimonial1.quote': 'AI Formula 幫助我們建立了一個自定義 WhatsApp 自動化系統，可以24/7處理客戶查詢。再也不會錯過訊息，我們的回應時間顯著改善。',
  'testimonials.testimonial1.author': '黃家明',
  'testimonials.testimonial1.service': '自定義自動化解決方案',
  'testimonials.testimonial1.company': '本地貿易公司',
  'testimonials.testimonial2.quote': '他們的團隊為我們建立了一個自定義商業自動化系統，連接我們的庫存、訂單和會計。現在一切運行順暢。',
  'testimonials.testimonial2.author': '陳小鳳',
  'testimonials.testimonial2.service': '商業自動化',
  'testimonials.testimonial2.company': '小型製造企業',
  'testimonials.testimonial3.quote': '他們為我們餐廳創建的自定義AI聊天機器人完美處理預訂和訂單。它懂廣東話和英語！',
  'testimonials.testimonial3.author': '林美玲',
  'testimonials.testimonial3.service': '自定義AI聊天機器人',
  'testimonials.testimonial3.company': '家庭餐廳',
  
  // Automation Journey
  'journey.title': '您的自動化之旅',
  'journey.subtitle': '我們經過驗證的4步流程確保成功實施自動化',
  'journey.step1.title': '發現諮詢',
  'journey.step1.description': '了解您的需求並識別自動化機會',
  'journey.step2.title': '策略設計',
  'journey.step2.description': '創建針對您業務流程的詳細藍圖',
  'journey.step3.title': '建構整合',
  'journey.step3.description': '開發並無縫整合您的自定義自動化解決方案',
  'journey.step4.title': '上線支援',
  'journey.step4.description': '部署您的解決方案並提供持續支援和優化',
  
  // Instructors
  'instructors.title': '認識我們的',
  'instructors.titleHighlight': '專家講師',
  'instructors.subtitle': '向結合深厚技術專長與真實商業經驗的行業領導者學習AI和自動化。',
  'instructors.experience': '經驗',
  'instructors.professionalJourney': '專業經歷',
  'instructors.teachingPhilosophy': '教學理念',
  'instructors.keyQualifications': '主要資格',
  'instructors.viewProfile': '查看完整檔案',
  
  // Kenneth - 第一位講師
  'instructors.sarah.name': 'Kenneth',
  'instructors.sarah.title': 'AI 行銷開發者與自動化專家',
  'instructors.sarah.specialty': 'AI 工具與行銷自動化',
  'instructors.sarah.experience': '4+ 年',
  'instructors.sarah.biography': 'Kenneth 是一位先驅性的AI行銷開發者，專精於尖端AI工具、自動化系統和策略實施。經過4年深入的AI學習，他已經掌握了通過人工智能和自動化技術轉變傳統行銷方法的藝術。',
  'instructors.sarah.philosophy': 'AI正在根本性地改變我們的生活和工作方式。未來屬於今天就擁抱AI的人。我幫助個人和企業在大眾跟上之前，通過掌握AI工具和自動化來搶得先機。',
  'instructors.sarah.qual1': 'AI 行銷自動化專家',
  'instructors.sarah.qual2': '高級AI工具實施',
  'instructors.sarah.qual3': '策略性AI業務整合',
  'instructors.sarah.qual4': '面向未來的行銷系統',
  
  // David - 第二位講師
  'instructors.david.name': 'David',
  'instructors.david.title': '商業自動化與AI整合專家',
  'instructors.david.specialty': '自動化與AI解決方案',
  'instructors.david.experience': '7+ 年',
  'instructors.david.biography': 'David是一位商業自動化專家，花了7年以上時間幫助公司消除過度工作並簡化營運。他專精於使用Make.com、n8n和AI工具創建強大的自動化工作流程。',
  'instructors.david.philosophy': '自動化應該解決真正的商業問題並減少過度工作。我幫助企業實施一體化AI解決方案來轉變營運。',
  'instructors.david.qual1': 'Make.com 與 n8n 自動化專家',
  'instructors.david.qual2': '業務流程優化',
  'instructors.david.qual3': 'AI驅動的內容管理',
  'instructors.david.qual4': '一體化業務解決方案',
  
  // Ken - 第三位講師
  'instructors.emily.name': 'Ken',
  'instructors.emily.title': '自定義業務開發者與AI自動化專家',
  'instructors.emily.specialty': '自定義編程與AI自動化',
  'instructors.emily.experience': '5+ 年',
  'instructors.emily.biography': 'Ken是一位熟練的自定義業務開發者，擁有5年以上的編程經驗，專精於創建量身定制的業務解決方案和AI自動化系統，幫助企業更快工作、更高效運行。',
  'instructors.emily.philosophy': '程式碼應該讓工作更快，讓企業運行更順暢。我創建整合AI自動化的自定義解決方案，消除瓶頸並加速業務流程。',
  'instructors.emily.qual1': '自定義業務應用程式開發',
  'instructors.emily.qual2': 'AI自動化整合專家',
  'instructors.emily.qual3': '性能優化專家',
  'instructors.emily.qual4': '快速開發解決方案',
  
  // Jason - 第四位講師
  'instructors.michael.name': 'Jason',
  'instructors.michael.title': '專業開發者與自定義自動化專家',
  'instructors.michael.specialty': '編程與自定義自動化',
  'instructors.michael.experience': '8+ 年',
  'instructors.michael.biography': 'Jason是一位專業開發者，擁有8年以上的編程經驗，專精於LLM聊天機器人開發、MCP整合和網頁應用程式。他一直在深入學習AI來提升編程技能。',
  'instructors.michael.philosophy': '沒有AI，就沒有生活！AI能改變的比你想像的更多。每個開發者都需要擁抱AI來保持相關性並創建非凡的解決方案。',
  'instructors.michael.qual1': 'LLM 聊天機器人開發專家',
  'instructors.michael.qual2': 'MCP 整合專家',
  'instructors.michael.qual3': '全端網頁開發',
  'instructors.michael.qual4': 'AI增強編程解決方案',
  
  // Contact
  'contact.title': '聯絡我們',
  'contact.subtitle': '準備好用AI轉型您的業務嗎？',
  'contact.form.title': '發送訊息給我們',
  'contact.form.description': '填寫下面的表格，我們將在24小時內回覆您',
  'contact.form.name': '全名',
  'contact.form.email': '電子郵件地址',
  'contact.form.message': '我們如何幫助您？',
  'contact.form.send': '發送訊息',
  'contact.info.emailUs': '電郵我們',
  'contact.info.emailDescription': '快速獲得問題回覆',
  'contact.info.callUs': '致電我們',
  'contact.info.phoneDescription': '星期一至五 上午9時至下午6時 香港時間',
  'contact.info.visitUs': '造訪我們',
  'contact.info.visitDescription': '預約會面',
  
  // Toast Messages
  'toast.messageSent': '訊息已發送！',
  'toast.messageDescription': '感謝您的關注。我們將在24小時內回覆您。',
  
  // Features
  'features.title': '為什麼選擇AI Formula？',
  'features.subtitle': '專為香港市場設計的專業AI培訓',
  'features.practical.title': '實用應用',
  'features.practical.desc': '真實商業場景和實踐項目',
  'features.expert.title': '專業講師',
  'features.expert.desc': '具有豐富經驗的行業專業人士',
  'features.support.title': '持續支持',
  'features.support.desc': '持續學習支持和社群',
  'features.local.title': '本地專注',
  'features.local.desc': '專為香港商業環境設計',
  
  // Courses
  'courses.title': '精選課程',
  'courses.subtitle': '全面的AI培訓課程',
  'courses.beginner': '初級',
  'courses.intermediate': '中級',
  'courses.advanced': '進階',
  'courses.hours': '小時',
  'courses.students': '學生',
  'courses.rating': '評分',
  'courses.enroll': '立即註冊',
  'courses.learnMore': '了解更多',
  
  // Footer
  'footer.company': 'AI Formula',
  'footer.description': '香港企業的專業AI培訓',
  'footer.links': '快速連結',
  'footer.courses': '課程',
  'footer.about': '關於',
  'footer.contact': '聯絡',
  'footer.support': '支援',
  'footer.legal': '法律',
  'footer.privacy': '隱私政策',
  'footer.terms': '服務條款',
  'footer.newsletter': '電子報',
  'footer.newsletter.desc': '獲取最新的AI更新和課程公告',
  'footer.newsletter.placeholder': '輸入您的電子郵件',
  'footer.newsletter.button': '訂閱',
  'footer.social': '關注我們',
  'footer.rights': '版權所有',
  
  // Course Details
  'course.duration': '課程時長',
  'course.level': '難度等級',
  'course.language': '語言',
  'course.certificate': '證書',
  'course.overview': '課程概述',
  'course.curriculum': '課程大綱',
  'course.instructor': '講師',
  'course.reviews': '評價',
  'course.whatYouLearn': '你將學到',
  'course.requirements': '要求',
  'course.includes': '本課程包含',
  'course.enroll': '註冊課程',
  'course.preview': '預覽課程',
  
  // Learning
  'learning.progress': '進度',
  'learning.completed': '已完成',
  'learning.continue': '繼續學習',
  'learning.start': '開始學習',
  'learning.next': '下一課',
  'learning.previous': '上一課',
  'learning.notes': '筆記',
  'learning.resources': '資源',
  'learning.quiz': '測驗',
  'learning.exercise': '練習',
  'learning.download': '下載',
  
  // Blog
  'blog.title': '最新見解',
  'blog.subtitle': 'AI Formula 專家見解',
  'blog.readMore': '閱讀更多',
  'blog.category': '類別',
  'blog.tags': '標籤',
  'blog.author': '作者',
  'blog.date': '日期',
  'blog.readTime': '閱讀時間',
  'blog.share': '分享',
  'blog.like': '喜歡',
  'blog.comment': '評論',
  
  // Auth
  'auth.login': '登入',
  'auth.signup': '註冊',
  'auth.email': '電子郵件',
  'auth.password': '密碼',
  'auth.confirmPassword': '確認密碼',
  'auth.forgotPassword': '忘記密碼？',
  'auth.rememberMe': '記住我',
  'auth.loginButton': '登入',
  'auth.signupButton': '註冊',
  'auth.or': '或',
  'auth.googleLogin': '使用Google繼續',
  'auth.facebookLogin': '使用Facebook繼續',
  'auth.hasAccount': '已有帳戶？',
  'auth.noAccount': '沒有帳戶？',
  'auth.loginDescription': '輸入您的電子郵件和密碼登入您的帳戶',
  'auth.signupDescription': '創建您的帳戶，開始與AI Formula一起學習',
  'auth.emailPlaceholder': '請輸入您的電子郵件地址',
  'auth.passwordPlaceholder': '請輸入您的密碼',
  'auth.confirmPasswordPlaceholder': '請再次輸入密碼',
  
  // Dashboard
  'dashboard.welcome': '歡迎回來',
  'dashboard.overview': '概述',
  'dashboard.myCourses': '我的課程',
  'dashboard.progress': '進度',
  'dashboard.achievements': '成就',
  'dashboard.settings': '設定',
  'dashboard.profile': '個人資料',
  'dashboard.notifications': '通知',
  'dashboard.billing': '帳單',
  'dashboard.support': '支援',
  
  // User Avatar Dropdown
  'userMenu.dashboard': '儀表板',
  'userMenu.settings': '設定',
  'userMenu.profile': '個人資料',
  'userMenu.signOut': '登出',
  'userMenu.greeting': '你好',
  
  // Common
  'common.loading': '載入中...',
  'common.error': '錯誤',
  'common.success': '成功',
  'common.warning': '警告',
  'common.info': '資訊',
  'common.save': '儲存',
  'common.cancel': '取消',
  'common.delete': '刪除',
  'common.edit': '編輯',
  'common.view': '查看',
  'common.download': '下載',
  'common.upload': '上傳',
  'common.search': '搜尋',
  'common.filter': '篩選',
  'common.sort': '排序',
  'common.reset': '重置',
  'common.apply': '套用',
  'common.close': '關閉',
  'common.open': '開啟',
  'common.yes': '是',
  'common.no': '否',
  'common.ok': '確定',
  'common.back': '返回',
  'common.next': '下一步',
  'common.previous': '上一步',
  'common.submit': '提交',
  'common.confirm': '確認',
  'common.more': '更多',
  'common.less': '更少',
  'common.show': '顯示',
  'common.hide': '隱藏',
  'common.expand': '展開',
  'common.collapse': '收合',
  
  // 工具頁面
  'tools.title': '推薦AI 工具',
  'tools.subtitle': '發現強大工具，提升您的生產力和創造力',
  'tools.categories.aiVideo': 'AI 影片工具',
  'tools.categories.dataTools': '數據工具', 
  'tools.categories.designTools': '設計工具',
  'tools.categories.marketingTools': 'AI 行銷工具',
  
  // Design Tools
  'tools.freepik.title': 'Freepik - 免費設計資源',
  'tools.freepik.description': '獲取數百萬免費向量圖、照片和圖形素材。不花大錢也能創造驚人視覺效果。',
  'tools.freepik.tag': '免費設計',
  'tools.freepik.visitSite': '訪問 Freepik',
  
  // Data Tools
  'tools.mem0.title': 'Mem0 - OpenMemory MCP',
  'tools.mem0.description': 'AI應用的高級記憶管理和對話持久化。構建具有上下文記憶的智能AI系統。',
  'tools.mem0.tag': 'AI記憶',
  'tools.mem0.visitSite': '訪問 Mem0',
  
  'tools.chat4data.title': 'Chat4Data - AI 網頁數據提取',
  'tools.chat4data.description': '通過聊天方式從任何網站提取結構化數據。無需編程，AI自動檢測並提取最有價值的數據。',
  'tools.chat4data.tag': '數據提取',
  'tools.chat4data.visitSite': '訪問 Chat4Data',
  
  // AI Video Tools
  'tools.hailuo.title': 'Hailuo AI - 頂級AI影片生成',
  'tools.hailuo.description': '免費使用Minimax的Hailuo 02，頂級AI影片工具，幾分鐘內將圖片轉換為驚艷HD影片。',
  'tools.hailuo.tag': 'AI影片',
  'tools.hailuo.visitSite': '訪問 Hailuo AI',
  
  'tools.higgsfield.title': 'Higgsfield AI - 視覺特效',
  'tools.higgsfield.description': 'AI驅動的攝影機控制和視覺特效工具。從爆炸到超現實轉換，創造電影級視覺效果。',
  'tools.higgsfield.tag': '視覺特效',
  'tools.higgsfield.visitSite': '訪問 Higgsfield',
  
  'tools.unstableml.title': 'UnstableML - AI 虛擬人',
  'tools.unstableml.description': '個性化AI虛擬人，用於產品展示、教程和UGC內容創作。克隆您的臉部和聲音。',
  'tools.unstableml.tag': 'AI虛擬人',
  'tools.unstableml.visitSite': '訪問 UnstableML',
  
  'tools.4dv.title': '4DV.AI - AI 影片平台',
  'tools.4dv.description': '先進的AI影片生成和編輯平台，提供專業級影片創作工具和效果。',
  'tools.4dv.tag': 'AI影片',
  'tools.4dv.visitSite': '訪問 4DV.AI',
  
  'tools.seaweedapt.title': 'Seaweed APT2 - 實時影片生成',
  'tools.seaweedapt.description': '自回歸對抗性後訓練，用於實時互動影片生成。以最小延遲串流高質量24fps影片。',
  'tools.seaweedapt.tag': '實時影片',
  'tools.seaweedapt.visitSite': '訪問 Seaweed APT',
  
  // 行銷工具
  'tools.headai.title': 'Head AI - 全球首個AI行銷專家',
  'tools.headai.description': '專業AI全面接管您的網紅和聯盟行銷。不只是工具，而是完整的AI行銷團隊，端到端處理營銷活動。',
  'tools.headai.tag': 'AI行銷',
  'tools.headai.visitSite': '訪問 Head AI',
  
  // 404 Page
  'notFound.title': '糟糕！找不到頁面',
  'notFound.subtitle': '您所尋找的頁面不存在',
  'notFound.description': '很抱歉，這種情況可能發生。頁面可能已移動或刪除，或您可能輸入了錯誤的網址。',
  'notFound.error404': '404',
  'notFound.pageNotFound': '頁面未找到',
  'notFound.quickLinks': '快速連結',
  'notFound.backToHome': '返回首頁',
  'notFound.contactSupport': '聯繫支援',
  'notFound.reportProblem': '報告問題',
  'notFound.currentPath': '尋找路於',
  'notFound.timestamp': '時間',
  'notFound.needHelp': '需要幫助？',
}

// 創建語言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 語言提供者組件
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh-HK');

  const getTranslations = (lang: Language): Translations => {
    return lang === 'zh-HK' ? zhTranslations : enTranslations;
  };

  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: getTranslations(language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自訂鉤子
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
