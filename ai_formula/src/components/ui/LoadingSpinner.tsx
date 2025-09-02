import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white' | 'gray';
  /** Whether to show the spinner inline or as a centered block */
  inline?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show background overlay */
  overlay?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const variantClasses = {
  primary: 'text-blue-500',
  secondary: 'text-purple-500',
  white: 'text-white',
  gray: 'text-gray-500',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
  variant = 'primary',
  inline = false,
  className,
  overlay = false,
}) => {
  const spinnerComponent = (
    <div className={cn(
      'flex items-center gap-2',
      inline ? 'inline-flex' : 'flex-col justify-center min-h-[200px]',
      className
    )}>
      <Loader2 className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant]
      )} />
      {message && (
        <span className={cn(
          'text-sm',
          inline ? 'ml-2' : 'mt-2 text-center',
          variantClasses[variant]
        )}>
          {message}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 shadow-xl">
          {spinnerComponent}
        </div>
      </div>
    );
  }

  return spinnerComponent;
};

// Specific loading variants for common use cases
export const PageLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Loading page...' 
}) => (
  <LoadingSpinner 
    message={message} 
    size="lg" 
    variant="primary" 
    className="min-h-screen"
  />
);

export const ButtonLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => (
  <LoadingSpinner 
    message={message} 
    size="sm" 
    variant="white" 
    inline={true}
  />
);

export const CardLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => (
  <LoadingSpinner 
    message={message} 
    size="md" 
    variant="gray" 
    className="py-8"
  />
);

export const OverlayLoadingSpinner: React.FC<{ message?: string }> = ({ 
  message = 'Processing...' 
}) => (
  <LoadingSpinner 
    message={message} 
    size="lg" 
    variant="primary" 
    overlay={true}
  />
);

export default LoadingSpinner; 
