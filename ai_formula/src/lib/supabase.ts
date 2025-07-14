import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Environment check:', {
  url: supabaseUrl,
  key: supabaseAnonKey ? 'Present' : 'Missing',
  nodeEnv: import.meta.env.MODE
})

// Fallback values for development
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

const finalUrl = supabaseUrl || fallbackUrl
const finalKey = supabaseAnonKey || fallbackKey

export const supabase = createClient(finalUrl, finalKey)

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your-supabase-project-url' && 
  supabaseAnonKey !== 'your-supabase-anon-key') 
