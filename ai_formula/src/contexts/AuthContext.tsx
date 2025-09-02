import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signInWithGoogle: () => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  isConfigured: boolean;
}

// 創建帶有默認值的 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 安全的 useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // 提供 fallback 而不是拋出錯誤
    console.warn('useAuth must be used within an AuthProvider. Using fallback values.');
    return {
      user: null,
      session: null,
      loading: false,
      signIn: async () => ({ error: new Error('Auth not configured') }),
      signUp: async () => ({ error: new Error('Auth not configured') }),
      signOut: async () => {},
      isConfigured: false
    };
  }
  
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 只在 Supabase 配置正確時初始化
    if (!isSupabaseConfigured) {
      setLoading(false);
      console.warn('Supabase not configured, skipping auth initialization');
      return;
    }

    // Check if we're being redirected to non-localhost during development
    const currentHost = window.location.hostname;
    const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development';
    
    if (isDev && currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      console.warn('Redirected to non-localhost during development!');
      console.log('Current location:', window.location.href);
      console.log('Attempting to redirect back to localhost...');
      
      // Force redirect back to localhost with current port
      const currentPort = window.location.port || '8081';
      const newUrl = window.location.href.replace(
        `${window.location.protocol}//${currentHost}${window.location.port ? ':' + window.location.port : ''}`,
        `http://localhost:${currentPort}`
      );
      
      console.log('Redirecting to:', newUrl);
      window.location.href = newUrl;
      return;
    }

    let mounted = true;

    // 獲取初始 session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (mounted) {
          if (error) {
            console.error('Error getting session:', error);
          } else {
            setSession(session);
            setUser(session?.user ?? null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to get initial session:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // 監聽認證狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Handle successful login redirect
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('User signed in successfully, handling redirect...');
            
            // Check if we're on the auth page
            if (window.location.pathname === '/auth') {
              // Get the intended destination from sessionStorage or default to home
              const intendedPath = sessionStorage.getItem('intendedPath') || '/';
              sessionStorage.removeItem('intendedPath');
              
              console.log('Redirecting to:', intendedPath);
              
              // Use setTimeout to ensure the auth state is fully updated
              setTimeout(() => {
                window.location.href = intendedPath;
              }, 100);
            }
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Authentication not configured') };
    }

    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Authentication not configured') };
    }

    try {
      const result = await supabase.auth.signUp({ email, password });
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      console.warn('Authentication not configured, cannot sign out');
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Authentication not configured') };
    }

    try {
      // Force localhost for development - be more explicit
      const currentHost = window.location.hostname;
      const currentPort = window.location.port;
      const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development' || currentHost === 'localhost' || currentHost === '127.0.0.1';
      
      let redirectUrl;
      if (isDev && (currentHost === 'localhost' || currentHost === '127.0.0.1')) {
        // Force localhost with current port
        redirectUrl = `http://localhost:${currentPort || '8081'}/auth`;
      } else {
        redirectUrl = `${window.location.origin}/auth`;
      }
      
      console.log('Environment check:', {
        currentHost,
        currentPort,
        isDev,
        redirectUrl,
        origin: window.location.origin
      });
      
      const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      return result;
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    isConfigured: isSupabaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
