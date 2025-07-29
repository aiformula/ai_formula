import { createClient } from '@supabase/supabase-js'

// 安全地獲取環境變量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 驗證 Supabase URL 格式
const isValidSupabaseUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && 
           (urlObj.hostname.includes('supabase.co') || 
            urlObj.hostname.includes('localhost') ||
            urlObj.hostname.includes('127.0.0.1'));
  } catch {
    return false;
  }
};

// 驗證 Supabase Key 格式 (基本檢查)
const isValidSupabaseKey = (key: string): boolean => {
  return typeof key === 'string' && key.length > 20;
};

console.log('Environment check:', {
  url: supabaseUrl,
  urlValid: supabaseUrl ? isValidSupabaseUrl(supabaseUrl) : false,
  key: supabaseAnonKey ? 'Present' : 'Missing',
  keyValid: supabaseAnonKey ? isValidSupabaseKey(supabaseAnonKey) : false,
  nodeEnv: import.meta.env.MODE
});

// 安全的 fallback 配置
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder-key-for-development'

// 決定最終使用的配置
const finalUrl = (supabaseUrl && isValidSupabaseUrl(supabaseUrl)) ? supabaseUrl : fallbackUrl;
const finalKey = (supabaseAnonKey && isValidSupabaseKey(supabaseAnonKey)) ? supabaseAnonKey : fallbackKey;

// 創建客戶端，添加錯誤處理
let supabase;
try {
  supabase = createClient(finalUrl, finalKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
} catch (error) {
  console.error('Failed to create Supabase client:', error);
  // 創建一個 mock 客戶端作為 fallback
  supabase = {
    auth: {
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.reject(new Error('Supabase not configured')),
      insert: () => Promise.reject(new Error('Supabase not configured')),
      update: () => Promise.reject(new Error('Supabase not configured')),
      delete: () => Promise.reject(new Error('Supabase not configured'))
    })
  };
}

export { supabase };

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  isValidSupabaseUrl(supabaseUrl) &&
  isValidSupabaseKey(supabaseAnonKey) &&
  supabaseUrl !== 'your-supabase-project-url' && 
  supabaseAnonKey !== 'your-supabase-anon-key'
);

// 導出配置狀態供調試使用
export const supabaseConfig = {
  url: finalUrl,
  configured: isSupabaseConfigured,
  usingFallback: finalUrl === fallbackUrl
}; 
