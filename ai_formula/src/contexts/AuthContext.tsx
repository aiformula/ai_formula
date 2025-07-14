import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not properly configured. Authentication will not work.')
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch((error) => {
      console.error('Error getting session:', error)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error }
    } catch (error) {
      return { error: { message: 'Authentication service unavailable' } }
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      return { error }
    } catch (error) {
      return { error: { message: 'Authentication service unavailable' } }
    }
  }

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      return { error }
    } catch (error) {
      console.error('Google OAuth error:', error)
      return { error: { message: 'Google authentication failed. Please check your OAuth configuration.' } }
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      return { error: null }
    }
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: { message: 'Sign out failed' } }
    }
  }

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { error: { message: 'Supabase is not configured. Please check your environment variables.' } }
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      return { error }
    } catch (error) {
      return { error: { message: 'Password reset service unavailable' } }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 
