import { createClient } from '@supabase/supabase-js'

// 安全地獲取環境變量
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 開發環境檢測
const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV

// 允許的主機列表（用於開發環境）
const allowedHosts = [
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '.supabase.co',
  '.supabase.net'
];

// 驗證 Supabase URL 格式
const isValidSupabaseUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    
    // 檢查協議
    if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
      return false;
    }
    
    // 在開發環境允許 http://localhost
    if (isDevelopment && urlObj.protocol === 'http:') {
      return allowedHosts.some(host => 
        urlObj.hostname === host || 
        urlObj.hostname.includes(host)
      );
    }
    
    // 生產環境只允許 https 和特定主機
    return urlObj.protocol === 'https:' && 
           allowedHosts.some(host => 
             urlObj.hostname.includes(host) || 
             urlObj.hostname === host
           );
  } catch (error) {
    console.error('URL validation error:', error);
    return false;
  }
};

// 驗證 Supabase Key 格式 (更嚴格的檢查)
const isValidSupabaseKey = (key: string): boolean => {
  if (!key || typeof key !== 'string') return false;
  
  // 基本長度檢查
  if (key.length < 20) return false;
  
  // 檢查是否為有效的 JWT 格式（anon key 通常是 JWT）
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  return jwtPattern.test(key) || key.startsWith('sb-') || isDevelopment;
};

console.log('Supabase Environment check:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Missing',
  urlValid: supabaseUrl ? isValidSupabaseUrl(supabaseUrl) : false,
  key: supabaseAnonKey ? 'Present' : 'Missing',
  keyValid: supabaseAnonKey ? isValidSupabaseKey(supabaseAnonKey) : false,
  nodeEnv: import.meta.env.MODE,
  isDevelopment
});

// 安全的 fallback 配置
const fallbackUrl = isDevelopment ? 'http://localhost:54321' : 'https://placeholder.supabase.co'
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDI3NzQwMDAsImV4cCI6MTk1ODM1MDAwMH0.placeholder-development-key'

// 決定最終使用的配置
const finalUrl = (supabaseUrl && isValidSupabaseUrl(supabaseUrl)) ? supabaseUrl : fallbackUrl;
const finalKey = (supabaseAnonKey && isValidSupabaseKey(supabaseAnonKey)) ? supabaseAnonKey : fallbackKey;

// 創建客戶端，添加錯誤處理
let supabase;
try {
  supabase = createClient(finalUrl, finalKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'X-Client-Info': 'ai-formula-web'
      }
    }
  });
  
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
  
  // 創建一個 mock 客戶端作為 fallback
  supabase = {
    auth: {
      signInWithPassword: () => Promise.resolve({ 
        data: { user: null, session: null }, 
        error: new Error('Supabase not configured') 
      }),
      signUp: () => Promise.resolve({ 
        data: { user: null, session: null }, 
        error: new Error('Supabase not configured') 
      }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ 
        data: { session: null }, 
        error: null 
      }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            unsubscribe: () => console.log('Mock auth state change unsubscribed') 
          } 
        } 
      })
    },
    from: (table: string) => ({
      select: () => Promise.resolve({ 
        data: null, 
        error: new Error('Supabase not configured') 
      }),
      insert: () => Promise.resolve({ 
        data: null, 
        error: new Error('Supabase not configured') 
      }),
      update: () => Promise.resolve({ 
        data: null, 
        error: new Error('Supabase not configured') 
      }),
      delete: () => Promise.resolve({ 
        data: null, 
        error: new Error('Supabase not configured') 
      })
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
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseUrl !== 'https://placeholder.supabase.co'
);

// 導出配置狀態供調試使用
export const supabaseConfig = {
  url: finalUrl,
  configured: isSupabaseConfigured,
  usingFallback: finalUrl === fallbackUrl,
  development: isDevelopment,
  validUrl: supabaseUrl ? isValidSupabaseUrl(supabaseUrl) : false,
  validKey: supabaseAnonKey ? isValidSupabaseKey(supabaseAnonKey) : false
}; 
