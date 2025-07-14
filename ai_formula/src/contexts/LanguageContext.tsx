import React, { createContext, useContext, useState, useEffect } from 'react'

// èªè?é¡å?å®šç¾©
export type Language = 'en' | 'zh-HK'

// ç¿»è­¯?¥å£
interface Translations {
  [key: string]: string
}

// èªè?ä¸Šä??‡é???interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Translations
}

// ?±æ?ç¿»è­¯
const enTranslations: Translations = {
  // å°èˆª
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
  'testimonials.testimonial2.service': '?†æ¥­?ªå???(Business Automation)',
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

// ä¸­æ?ç¿»è­¯
const zhTranslations: Translations = {
  // å°èˆª
  'nav.home': 'é¦–é?',
  'nav.about': '?œæ–¼?‘å€?,
  'nav.courses': 'èª²ç?',
  'nav.blog': '?¨è½??,
  'nav.signup': 'è¨»å?',
  
  // Hero Section
  'hero.badge': '?†æ¥­AI',
  'hero.title': 'AIï¼šæœªä¾†ç?å­¸ç?',
  'hero.title1': 'AIï¼šæœªä¾†ç?',
  'hero.titleHighlight': 'å­¸ç?',
  'hero.title2': '?†æ¥­?ªå???,
  'hero.subtitle': 'äººå·¥?ºæ…§å¦‚ä??‹äºº?–ä¸¦è½‰å??†æ¥­?ªå??–ã€?,
  'hero.cta1': '?‹å?å­¸ç?',
  'hero.cta2': 'äº†è§£?´å?',
  'hero.chooseProgram': '?¸æ?èª²ç?',
  'hero.partners': '?ˆä?å¤¥ä¼´',
  'hero.students': 'å­¸å“¡',
  'hero.instructors': 'è¬›å¸«',
  
  // Services Section
  'services.title': '?‘å€‘ç??å?',
  'services.subtitle': '?¸æ??¨é€šå?AIç²¾é€šå??†æ¥­?ªå??–å?è¶Šç??“è·¯',
  'services.training.title': 'å°ˆå®¶ä¸»å??„AI?¹è?',
  'services.training.description': '?±è?æ¥­å?å®¶è¨­è¨ˆç??¨é¢å­¸ç??æ?',
  'services.training.benefit1': 'å¯¦ç”¨èª²ç?',
  'services.training.benefit2': 'å¯¦å?æ¡†æ¶',
  'services.training.benefit3': '?˜é??€?½æ???,
  'services.training.button': '?¥ç?èª²ç?',
  'services.automation.title': 'å®¢è£½?–è‡ª?•å?è§?±º?¹æ?',
  'services.automation.description': '?ºæ‚¨?„æ¥­?™é?æ±‚é?èº«æ?? ç??ªå??–ç³»çµ?,
  'services.automation.benefit1': '?é??ˆç?',
  'services.automation.benefit2': 'æ¸›å??¯èª¤',
  'services.automation.benefit3': '?´å¤§?Ÿé?',
  'services.automation.button': '?²å??è²»è«®è©¢',
  
  // Technology Section
  'tech.title': '?±é??ˆæ?è¡“é???,
  'tech.subtitle': '?‘å€‘ç²¾?šæ¨?•ç¾ä»??æ¥­è‡ª?•å??„å·¥??,
  'tech.n8n': 'å·¥ä?æµç??ªå???,
  'tech.make': '?´å?å¹³å°',
  'tech.zapier': '?‰ç”¨ç¨‹å???¥',
  'tech.python': '?¸æ??•ç?',
  'tech.javascript': 'ç¶²é??‹ç™¼',
  'tech.openai': 'AI?´å?',
  
  // Journey Section
  'journey.title': '?¨ç??ªå??–ä???,
  'journey.subtitle': '?‘å€‘ç??é?è­‰ç?4æ­¥é?æµç?ç¢ºä??å??„è‡ª?•å?å¯¦æ–½',
  'journey.step1.title': '?¢ç´¢?ƒè­°',
  'journey.step1.description': '?‘å€‘ä?è§?‚¨?„é?æ±‚ä¸¦è­˜åˆ¥?ªå??–æ???,
  'journey.step2.title': 'ç­–ç•¥?‡è¨­è¨?,
  'journey.step2.description': '?µå»º?å??¨æ¥­?™æ?ç¨‹ç?è©³ç´°?å?',
  'journey.step3.title': 'å»ºæ??‡æ•´??,
  'journey.step3.description': '?‹ç™¼ä¸¦ç„¡ç¸«æ•´?ˆæ‚¨?„å®¢è£½è‡ª?•å?è§?±º?¹æ?',
  'journey.step4.title': '?Ÿå??‡æ”¯??,
  'journey.step4.description': '?¨ç½²?¨ç?è§?±º?¹æ?ä¸¦æ?ä¾›æ?çºŒç??¯æ´?Œå„ª??,
  
  // Learning Materials
  'learning.title': 'ç²¾é¸å­¸ç??æ?',
  'learning.subtitle': 'å°ˆå®¶è£½ä??„èª²ç¨‹ï??¨åœ¨? é€Ÿæ‚¨?„AI?Œè‡ª?•å?ä¹‹æ?',
  'learning.startLearning': '?‹å?å­¸ç?',
  'learning.beginner': '?ç?',
  'learning.intermediate': 'ä¸­ç?',
  'learning.advanced': 'é«˜ç?',
  'learning.marketing': 'è¡ŒéŠ·',
  'learning.development': '?‹ç™¼',
  'learning.ai': 'AI',
  'learning.migration': '?·ç§»',
  'learning.course1.title': 'è¡ŒéŠ·äººå“¡?„n8n?¥é?',
  'learning.course1.description': 'å­¸ç?å¦‚ä?ä½¿ç”¨n8nå¼·å¤§?„è?è¦ºå?ä»‹é¢?ªå??–æ‚¨?„è??·å·¥ä½œæ?ç¨?,
  'learning.course2.title': '?²é?Python?ªå???,
  'learning.course2.description': '?Œæ¡Python?³æœ¬ä»¥å¯¦?¾è??œç?æ¥­å?æµç??ªå???,
  'learning.course3.title': 'AI?´å?å¤§å¸«??,
  'learning.course3.description': 'å°‡AI?Ÿèƒ½?´å??°æ‚¨?¾æ??„æ¥­?™å·¥ä½œæ?ç¨‹ä¸­',
  'learning.course4.title': 'Zapier?°Make?„é·ç§?,
  'learning.course4.description': 'å¾Zapier?¡ç¸«?æ¸¡?°Makeï¼Œç²å¾—å?å¼·ç??ªå??–èƒ½??,
  'learning.duration.hours': 'å°æ?',
  'learning.program.title': 'å®Œæ•´AIç²¾é€šèª²ç¨?,
  'learning.program.description': '?šé??‘å€‘ç‚ºå°ˆæ¥­äººå£«è¨­è??„ç??ˆèª²ç¨‹ï??Œæ¡AI?Œè‡ª?•å??„å??‹æ–¹??,
  'learning.program.hours': '50+ å°æ?',
  'learning.program.access': 'çµ‚èº«ä½¿ç”¨',
  'learning.program.button': '?¢ç´¢å®Œæ•´èª²ç?',
  
  // Instructors
  'instructors.title': '?œæ–¼',
  'instructors.titleHighlight': 'å°å¸«',
  'instructors.subtitle': 'èªè??‘å€‘ä??Œç??„å?å¸«ï?ä»–å€‘ç??ˆæ·±?šç??€è¡“å??·å?å¯¦é??„å?æ¥­ç?é©—ã€‚å?å·²ç??¨å??´ç??·å??‹ç™¼?˜å?å»ºç??Œæ“´å±•AIè§?±º?¹æ??„è?æ¥­é?è¢–èº«ä¸Šå­¸ç¿’ã€?,
  'instructors.cta': 'æº–å?å¥½å?å·²ç?å»ºç??Ÿæ­£AIè§?±º?¹æ??„è?æ¥­å?å®¶å­¸ç¿’å?ï¼?,
  'instructors.ctaButton': 'èªè??‘å€‘å??´ç??™å­¸?˜é?',
  'instructors.professionalJourney': 'å°ˆæ¥­æ­·ç?',
  'instructors.teachingPhilosophy': '?™å­¸?†å¿µ',
  'instructors.keyQualifications': 'AIè½‰å?å½±éŸ¿ï¼?,
  'instructors.viewProfile': '?¥ç?å®Œæ•´æª”æ?',
  'instructors.experience': 'ç¶“é?',
  'instructors.more': '?´å?...',
  
  // Instructor 1 - Kenneth
  'instructors.sarah.name': 'Kenneth',
  'instructors.sarah.title': 'AIè¡ŒéŠ·?‹ç™¼?…å??ªå??–å?å®?,
  'instructors.sarah.specialty': 'AIå·¥å…·?Šè??·è‡ª?•å?',
  'instructors.sarah.experience': '4å¹?',
  'instructors.sarah.biography': 'Kenneth?¯ä?ä½å??’AIè¡ŒéŠ·?‹ç™¼?…ï?å°ˆç²¾?¼å?æ²¿AIå·¥å…·?è‡ª?•å?ç³»çµ±?Œç??¥å¯¦?½ã€‚ç???å¹´æ·±åº¦AIå­¸ç?ï¼Œä?å·²æ??¡é€é?äººå·¥?ºèƒ½?Œè‡ª?•å??€è¡“è??‹å‚³çµ±è??·æ–¹æ³•ç??è???,
  'instructors.sarah.philosophy': 'AIæ­?œ¨?¹æœ¬?§åœ°?¹è??‘å€‘ç??Ÿæ´»?Œå·¥ä½œæ–¹å¼ã€‚æœªä¾†å±¬?¼ä?å¤©å°±?æŠ±AI?„äºº?‚æ?å¹«åŠ©?‹äºº?Œä?æ¥­åœ¨å¤§çœ¾è¶•ä?ä¹‹å?ï¼Œé€šé??Œæ¡AIå·¥å…·?Œè‡ª?•å?ä¾†é??ˆä?æ­¥ã€‚ç¾?¨æ­£?¯ç²å¾—ç«¶?­å„ª?¢ç?çµ•ä½³?‚æ???,
  'instructors.sarah.qual1': 'AIè¡ŒéŠ·?ªå??–å?å®?,
  'instructors.sarah.qual2': '?²é?AIå·¥å…·å¯¦æ–½',
  'instructors.sarah.qual3': 'ç­–ç•¥?§AI?†æ¥­?´å?',
  'instructors.sarah.qual4': '?ªä?å°±ç?è¡ŒéŠ·ç³»çµ±',
  
  // Instructor 2 - David
  'instructors.david.name': 'David',
  'instructors.david.title': '?†æ¥­?ªå??–å?AI?´å?å°ˆå®¶',
  'instructors.david.specialty': '?ªå??–å?AIè§?±º?¹æ?',
  'instructors.david.experience': '7å¹?',
  'instructors.david.biography': 'David?¯ä?ä½å?æ¥­è‡ª?•å?å°ˆå®¶ï¼Œæ???å¹´ä»¥ä¸Šå¹«?©ä?æ¥­æ??¤é??å?ç°¡å??Ÿé??„ç?é©—ã€‚ä?å°ˆç²¾?¼ä½¿?¨Make.com?n8n?ŒAIå·¥å…·?µå»ºå¼·å¤§?„è‡ª?•å?å·¥ä?æµç?ï¼Œè??†è²¼?‡ã€å…§å®¹ç®¡?†å?è¤‡é??„å?æ¥­æ?ç¨‹ã€?,
  'instructors.david.philosophy': '?ªå??–æ?è©²è§£æ±ºç?æ­???†æ¥­?é?ä¸¦æ?å°‘é??ã€‚æ?å¹«åŠ©ä¼æ¥­å¯¦æ–½ä¸€é«”å?AI?Œè‡ª?•å?è§?±º?¹æ?ï¼Œè??‹ä??‘ç??Ÿé??¹å?ï¼Œè??˜é?å°ˆæ³¨?¼ç?æ­??è¦ç?äº‹æ?ï¼Œè€Œè??€è¡“è??†é?è¤‡æ€§å·¥ä½œã€?,
  'instructors.david.qual1': 'Make.com?Šn8n?ªå??–å?å®?,
  'instructors.david.qual2': '?†æ¥­æµç??ªå?',
  'instructors.david.qual3': 'AIé©…å??§å®¹ç®¡ç?',
  'instructors.david.qual4': 'ä¸€é«”å??†æ¥­è§?±º?¹æ?',
  
  // Instructor 3 - Ken
  'instructors.emily.name': 'Ken',
  'instructors.emily.title': 'å®¢è£½?–å?æ¥­é??¼è€…å?AI?ªå??–å?å®?,
  'instructors.emily.specialty': 'å®¢è£½?–ç·¨ç¨‹å?AI?ªå???,
  'instructors.emily.experience': '5å¹?',
  'instructors.emily.biography': 'Ken?¯ä?ä½ç?ç·´ç?å®¢è£½?–å?æ¥­é??¼è€…ï??æ?5å¹´ä»¥ä¸Šç?ç·¨ç?ç¶“é?ï¼Œå?ç²¾æ–¼?µå»ºå®¢è£½?–å?æ¥­è§£æ±ºæ–¹æ¡ˆå?AI?ªå??–ç³»çµ±ã€‚ä?æ§‹å»ºå®¢è£½?–æ??¨ç?å¼ï?å¹«åŠ©ä¼æ¥­?é??ºèƒ½?ªå??–æ›´å¿«å·¥ä½œå??´é??ˆé?è¡Œã€?,
  'instructors.emily.philosophy': 'ç¨‹å?ç¢¼æ?è©²è?å·¥ä??´å¿«?Ÿï?è®“ä?æ¥­é?è¡Œæ›´?†æš¢?‚æ??µå»º?´å?AI?ªå??–ç?å®¢è£½?–è§£æ±ºæ–¹æ¡ˆï?æ¶ˆé™¤?¶é ¸ä¸¦å??Ÿå?æ¥­æ?ç¨‹ã€‚æ?ä¸€è¡Œç?å¼ç¢¼?½æ?è©²æ??®ç?ï¼šè?å·¥ä??´å¿«?´æ??ˆç???,
  'instructors.emily.qual1': 'å®¢è£½?–å?æ¥­æ??¨ç?å¼é???,
  'instructors.emily.qual2': 'AI?ªå??–æ•´?ˆå?å®?,
  'instructors.emily.qual3': '?§èƒ½?ªå?å°ˆå®¶',
  'instructors.emily.qual4': 'å¿«é€Ÿé??¼è§£æ±ºæ–¹æ¡?,
  
  // Instructor 4 - Jason
  'instructors.michael.name': 'Jason',
  'instructors.michael.title': 'å°ˆæ¥­?‹ç™¼?…å?å®¢è£½?–è‡ª?•å?å°ˆå®¶',
  'instructors.michael.specialty': 'ç·¨ç??Šå®¢è£½å??ªå???,
  'instructors.michael.experience': '8å¹?',
  'instructors.michael.biography': 'Jason?¯ä?ä½å?æ¥­é??¼è€…ï??æ?8å¹´ä»¥ä¸Šç?ç·¨ç?ç¶“é?ï¼Œå?ç²¾æ–¼LLM?Šå¤©æ©Ÿå™¨äººé??¼ã€MCP?´å??Œç¶²?æ??¨ç?å¼ã€‚åœ¨?å»2å¹´ä¸­ï¼Œä?ä¸€?´åœ¨æ·±åº¦å­¸ç?AIä»¥æ??‡ä??„ç·¨ç¨‹æ??½ï?ä¸¦å¹«?©å…¬?¸æ•´?ˆå?ç«¯AIè§?±º?¹æ???,
  'instructors.michael.philosophy': 'æ²’æ?AIï¼Œå°±æ²’æ??Ÿæ´»ï¼AI?½æ”¹è®Šç?æ¯”ä??³å??„æ›´å¤šã€‚æ??¸ä¿¡å°‡AI?´å??°é??¼å·¥ä½œä¸­ï¼Œä??…æ”¹è®Šæ??‘ç·¨ç¨‹ç??¹å?ï¼Œæ›´?¹è??‘å€‘èƒ½å¯¦ç¾?„ç›®æ¨™ã€‚æ??‹é??¼è€…éƒ½?€è¦æ??±AI?èƒ½ä¿æ??¸é??§ä¸¦?µé€ é??¡ç?è§?±º?¹æ???,
  'instructors.michael.qual1': 'LLM?Šå¤©æ©Ÿå™¨äººé??¼å?å®?,
  'instructors.michael.qual2': 'MCP?´å?å°ˆå®¶',
  'instructors.michael.qual3': '?¨ç«¯ç¶²é??‹ç™¼',
  'instructors.michael.qual4': 'AIå¢å¼·ç·¨ç?è§?±º?¹æ?',
  
  // Testimonials - ?´æ”¹äººå??ºè‹±?‡å?å­?  'testimonials.title': 'å®¢æˆ¶è¦‹è?',
  'testimonials.subtitle': 'å·²ä½¿?¨æ??‘å®¢è£½å?AI?ªå??–è§£æ±ºæ–¹æ¡ˆç?ä¼æ¥­?Ÿå¯¦?é?',
  'testimonials.testimonial1.quote': '?‘å€‘å?äº†å€‹WhatsApp?ªå??–ç³»çµ±ï?24å°æ??•ç?å®¢æˆ¶?¥è©¢?‚æ??‰å?æ¼ä?è¨Šæ¯ï¼Œå?è¦†é€Ÿåº¦å¿«ä?å¾ˆå???,
  'testimonials.testimonial1.author': 'Louis Liu',
  'testimonials.testimonial1.service': 'å®¢è£½?–è‡ª?•å?è§?±º?¹æ?',
  'testimonials.testimonial1.company': '?¬åœ°è²¿æ??¬å¸',
  'testimonials.testimonial2.quote': 'ä»–å€‘å¹«?‘å€‘æ•´äº†å€‹å?æ¥­è‡ª?•å?ç³»çµ±ï¼Œå?åº«å??è??®å??ƒè??¨éƒ¨??œ¨ä¸€èµ·ã€‚ç¾?¨é?ä½œå??†æš¢??,
  'testimonials.testimonial2.author': 'Sarah Chen',
  'testimonials.testimonial2.service': '?†æ¥­?ªå???,
  'testimonials.testimonial2.company': 'å°å?è£½é€ æ¥­',
  'testimonials.testimonial3.quote': 'ä»–å€‘ç‚º?‘å€‘é?å»³å?äº†å€‹AI?Šå¤©æ©Ÿå™¨äººï??•ç?è¨‚åº§?Œè½?®éƒ½å¾ˆæ?ç¢ºã€‚é?è­˜è½å»?±è©±å??±æ?ï¼?,
  'testimonials.testimonial3.author': 'Mike Wong',
  'testimonials.testimonial3.service': 'å®¢è£½?–AI?Šå¤©æ©Ÿå™¨äº?,
  'testimonials.testimonial3.company': 'å®¶åº­å¼é?å»?,
  
  // Contact Section
  'contact.title': 'æº–å?å¥½è??‹æ‚¨?„æ¥­?™ä??ï?',
  'contact.subtitle': 'è®“æ??‘è?è«–AI Formulaå¦‚ä?å¹«åŠ©?¨ç²¾?šAIä¸¦è‡ª?•å??¨ç?æ¥­å?æµç?',
  'contact.form.title': '?¯çµ¡?‘å€?,
  'contact.form.name': 'å§“å?',
  'contact.form.email': '?»å??µä»¶?°å?',
  'contact.form.message': '?‘å€‘å?ä½•å¹«?©æ‚¨ï¼?,
  'contact.form.messagePlaceholder': '?Šè¨´?‘å€‘æ‚¨?„è‡ª?•å??€æ±‚æ?å­¸ç??®æ?...',
  'contact.form.send': '?¼é€è???,
  'contact.form.description': 'å¡«å¯«ä¸‹æ–¹è¡¨æ ¼ï¼Œæ??‘å???4å°æ??§å?è¦†æ‚¨',
  'contact.brainstorm.title': '?”çŸ¥è¦å’©ï¼Ÿè©¦ä¸‹å‘¢?²æƒ³æ³•ï?',
  'contact.brainstorm.option1': 'AI?Šå¤©æ©Ÿå™¨äº?,
  'contact.brainstorm.option2': '?ªå???,
  'contact.brainstorm.option3': '?†æ¥­æµç?',
  'contact.brainstorm.option4': 'å®¢è£½?–æ–¹æ¡?,
  'contact.brainstorm.suggestion1': '?‘æƒ³?´å€‹AI?Šå¤©æ©Ÿå™¨äººï??¯ä»¥?•ç?å®¢æˆ¶?¥è©¢?Œå?èªè??¯æ´??,
  'contact.brainstorm.suggestion2': '?‘é?è¦è‡ª?•å??¹æ??»ç°¡?–é?è¤‡å·¥ä½œï?å¥½ä¼¼è³‡æ?è¼¸å…¥?é›»?µå?è¦†å?å·¥ä?æµç?ç®¡ç???,
  'contact.brainstorm.suggestion3': '?‘æƒ³?ªå??†æ¥­æµç?ï¼Œç”¨AI?å??ˆç??Œæ?å°‘äºº?‹å·¥ä½œã€?,
  'contact.brainstorm.suggestion4': '?‘é?è¦ç‚º?‘è?æ¥­å?æ¥­å??€æ±‚åº¦èº«è?? å?AIè§?±º?¹æ???,
  'contact.info.title': '?¯çµ¡è³‡è?',
  'contact.info.email': '?»å??µä»¶',
  'contact.info.phone': '?»è©±',
  'contact.info.emailUs': '?»éƒµ?‘å€?,
  'contact.info.callUs': '?´é›»?‘å€?,
  'contact.info.visitUs': '?œè¨ª?‘å€?,
  'contact.info.emailDescription': 'å¿«é€Ÿå??‰æ‚¨?„å?é¡?,
  'contact.info.phoneDescription': '?±ä??³é€±ä? 9AM-6PM HKT',
  'contact.info.visitDescription': '?ç??ƒé¢',
  'contact.why.title': 'é»è§£ä½ é?è¦AI Formula',
  'contact.why.benefit1': 'AIæ­?œ¨?¹è?æ¯å€‹è?æ¥?- ?”è?ä¸Šå°±?ƒè¢«æ·˜æ±°',
  'contact.why.benefit2': 'ä½ ç«¶?­å??‹å·²ç¶“ç”¨ç·ŠAI - ?”å¥½ä¿¾ä½¢?‹æ¶??,
  'contact.why.benefit3': 'äººæ?æµç?å·²ç??æ? - ?¾åœ¨?ªå??–é??¯ä?å¾Œè???,
  'contact.why.benefit4': 'AI?©å‘½?¾åœ¨?¼ç?ä¸?- ? å…¥?„æ˜¯ç«™åœ¨ä¸€?Šç?',
  
  // 404 Page
  'notFound.title': '404',
  'notFound.message': 'ç³Ÿç?ï¼æ‰¾ä¸åˆ°?é¢',
  'notFound.returnHome': 'è¿”å?é¦–é?',
  
  // Toast Messages
  'toast.messageSent': 'è¨Šæ¯å·²ç™¼?ï?',
  'toast.messageDescription': '?Ÿè??¨ç??œæ³¨?‚æ??‘å???4å°æ??§å?è¦†æ‚¨??,
}

// ?µå»ºèªè?ä¸Šä???const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// èªè??ä??…ç?ä»?export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // å¾?localStorage è®€?–è?è¨€è¨­å?ï¼Œé?è¨­ç‚ºä¸­æ?
    const savedLanguage = localStorage.getItem('language')
    return (savedLanguage as Language) || 'zh-HK'
  })

  // ä¿å?èªè?è¨­å???localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // ?²å?ç¿»è­¯?‡æœ¬
  const getTranslations = (lang: Language): Translations => {
    return lang === 'zh-HK' ? zhTranslations : enTranslations
  }

  // ç¿»è­¯?½æ•¸
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

// ä½¿ç”¨èªè?ä¸Šä??‡ç? Hook
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
