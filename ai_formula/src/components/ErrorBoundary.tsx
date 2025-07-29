import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FullCenterLayout, CircleIconLayout } from '@/components/ui/layout'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      const error = this.state.error;
      const errorMessage = error?.message || 'Unknown error';
      
      // 檢測不同類型的錯誤
      const isHelmetError = errorMessage.includes('HelmetDispatcher') || errorMessage.includes('react-helmet');
      const isContextError = errorMessage.includes('must be used within') || errorMessage.includes('Provider');
      const isSupabaseError = errorMessage.includes('supabase') || errorMessage.includes('Host is not');
      const isViewCountError = errorMessage.includes('add') && errorMessage.includes('undefined');
      
      // 確定錯誤類型和解決方案
      let errorType = 'Application Error';
      let errorDescription = 'There was an unexpected error.';
      let solutions = ['Reload the page', 'Check your internet connection'];
      
      if (isHelmetError) {
        errorType = 'HelmetProvider Missing';
        errorDescription = 'The react-helmet-async HelmetProvider is not properly configured.';
        solutions = [
          'HelmetProvider should wrap the App component',
          'Check main.tsx for proper setup',
          'Ensure react-helmet-async is installed'
        ];
      } else if (isContextError) {
        errorType = 'Context Provider Missing';
        errorDescription = 'A required React Context Provider is not wrapping this component.';
        solutions = [
          'Check that all Providers are properly set up in App.tsx',
          'Verify component is within the correct Provider tree',
          'Look for missing AuthProvider, LanguageProvider, or ViewCountProvider'
        ];
      } else if (isSupabaseError) {
        errorType = 'Supabase Configuration Error';
        errorDescription = 'There is an issue with the Supabase client configuration.';
        solutions = [
          'Check VITE_SUPABASE_URL environment variable',
          'Verify VITE_SUPABASE_ANON_KEY is correctly set',
          'Ensure Supabase host is valid and supported'
        ];
      } else if (isViewCountError) {
        errorType = 'ViewCount Context Error';
        errorDescription = 'The view counting system encountered an undefined object.';
        solutions = [
          'ViewCountProvider may not be wrapping the component',
          'useSafeViewCount should be used instead of useViewCount',
          'Check for proper context initialization'
        ];
      }

      return (
        <FullCenterLayout className="bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CircleIconLayout size="md" variant="danger" className="mx-auto mb-4 bg-red-100 border-red-200">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </CircleIconLayout>
              <CardTitle className="text-red-900">{errorType}</CardTitle>
              <CardDescription>
                {errorDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 font-medium">Error details:</p>
                  <p className="text-sm text-red-700 mt-1 font-mono break-all">{errorMessage}</p>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-800 font-medium">Possible solutions:</p>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  {solutions.map((solution, index) => (
                    <li key={index}>• {solution}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="w-full"
                >
                  Try Again
                </Button>
              </div>
              
              {(isSupabaseError || isHelmetError) && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    If this persists, check your environment configuration and ensure all required providers are set up correctly.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </FullCenterLayout>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary; 
