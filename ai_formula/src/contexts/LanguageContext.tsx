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
  'nav.blog': 'Blog',
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
  
  // Testimonials
  'testimonials.title': 'What Our Students Say',
  'testimonials.subtitle': 'Real feedback from professionals using our AI training',
  
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
  
  // Contact
  'contact.title': 'Get in Touch',
  'contact.subtitle': 'Ready to transform your business with AI?',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.subject': 'Subject',
  'contact.message': 'Message',
  'contact.send': 'Send Message',
  'contact.phone': 'Phone',
  'contact.address': 'Address',
  'contact.hours': 'Business Hours',
  
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
}

// 中文翻譯
const zhTranslations: Translations = {
  // 導航
  'nav.home': '首頁',
  'nav.about': '關於我們',
  'nav.courses': '課程',
  'nav.blog': '部落格',
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
  
  // Testimonials
  'testimonials.title': '學員怎麼說',
  'testimonials.subtitle': '來自使用我們AI培訓的專業人士的真實反饋',
  
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
  
  // Contact
  'contact.title': '聯絡我們',
  'contact.subtitle': '準備好用AI轉型您的業務嗎？',
  'contact.name': '姓名',
  'contact.email': '電子郵件',
  'contact.subject': '主題',
  'contact.message': '訊息',
  'contact.send': '發送訊息',
  'contact.phone': '電話',
  'contact.address': '地址',
  'contact.hours': '營業時間',
  
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
