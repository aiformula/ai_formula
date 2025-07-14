import React from 'react';
import { cn } from '@/lib/utils';

// ?ºç?å¸ƒå?çµ„ä»¶?¥å£
interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// å±…ä¸­å¸ƒå?çµ„ä»¶ - ?¿ä»£?è???"flex items-center justify-center"
export const CenterLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn('flex items-center justify-center', className)}>
    {children}
  </div>
);

// ?‚ç›´å±…ä¸­å¸ƒå?çµ„ä»¶ - ?¨æ–¼?¨å?å±…ä¸­
export const FullCenterLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn('min-h-screen flex items-center justify-center', className)}>
    {children}
  </div>
);

// ?—å?å±€å±…ä¸­çµ„ä»¶ - ?¨æ–¼?‚ç›´?’å?ä¸”å?ä¸­ç??§å®¹
export const ColumnCenterLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn('flex flex-col items-center justify-center', className)}>
    {children}
  </div>
);

// ?¡ç?å±…ä¸­å¸ƒå? - å¸¶å…§?Šè??„å?ä¸­å?å±€
export const CardCenterLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn('flex items-center justify-center py-8', className)}>
    {children}
  </div>
);

// ?“å½¢?–æ?å®¹å™¨ - å¸¸ç”¨?¼å?æ¨™è???
interface CircleIconProps extends BaseLayoutProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

const variantClasses = {
  primary: 'bg-blue-500/10 border border-blue-500',
  secondary: 'bg-gray-500/10 border border-gray-500',
  success: 'bg-green-500/10 border border-green-500',
  warning: 'bg-yellow-500/10 border border-yellow-500',
  danger: 'bg-red-500/10 border border-red-500'
};

export const CircleIconLayout: React.FC<CircleIconProps> = ({ 
  children, 
  className,
  size = 'md',
  variant = 'primary'
}) => (
  <div className={cn(
    'rounded-full flex items-center justify-center',
    sizeClasses[size],
    variantClasses[variant],
    className
  )}>
    {children}
  </div>
);

// å¸¶é?è·ç?å®¹å™¨å¸ƒå?
interface SpacedLayoutProps extends BaseLayoutProps {
  spacing?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'col';
}

const spacingClasses = {
  sm: 'gap-2',
  md: 'gap-4', 
  lg: 'gap-8'
};

export const SpacedLayout: React.FC<SpacedLayoutProps> = ({ 
  children, 
  className,
  spacing = 'md',
  direction = 'row'
}) => (
  <div className={cn(
    'flex items-center justify-center',
    direction === 'col' ? 'flex-col' : 'flex-row',
    spacingClasses[spacing],
    className
  )}>
    {children}
  </div>
);

// ?¿æ?å¼å®¹?¨å?å±€
export const ResponsiveLayout: React.FC<BaseLayoutProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn('flex items-center justify-center p-4', className)}>
    {children}
  </div>
);

export default {
  CenterLayout,
  FullCenterLayout,
  ColumnCenterLayout,
  CardCenterLayout,
  CircleIconLayout,
  SpacedLayout,
  ResponsiveLayout
}; 