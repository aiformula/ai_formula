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
      return (
        <FullCenterLayout className="bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CircleIconLayout size="md" variant="danger" className="mx-auto mb-4 bg-red-100 border-red-200">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </CircleIconLayout>
              <CardTitle className="text-red-900">Something went wrong</CardTitle>
              <CardDescription>
                There was an error loading the application. This might be due to configuration issues.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800 font-medium">Error details:</p>
                  <p className="text-sm text-red-700 mt-1">{this.state.error.message}</p>
                </div>
              )}
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
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  If this persists, check your environment variables and Supabase configuration.
                </p>
              </div>
            </CardContent>
          </Card>
        </FullCenterLayout>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary; 
