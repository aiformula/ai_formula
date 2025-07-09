import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';

// AI Formula 卡片組件
interface AICardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'glass' | 'gradient';
  hover?: boolean;
  glow?: boolean;
}

export const AICard: React.FC<AICardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false,
  glow = false,
}) => {
  const baseClasses = 'border transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-ai-dark-card border-gray-800',
    dark: 'bg-ai-dark-medium border-gray-700',
    glass: 'bg-ai-dark-card/50 backdrop-blur-sm border-gray-600',
    gradient: 'bg-gradient-to-br from-ai-dark-card to-ai-dark-medium border-gray-700'
  };

  const hoverClasses = hover ? 'hover:border-ai-primary/50 hover:scale-105' : '';
  const glowClasses = glow ? 'hover:shadow-ai-primary' : 'hover:shadow-ai-lg';

  return (
    <Card className={cn(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      glowClasses,
      className
    )}>
      {children}
    </Card>
  );
};

// AI Formula 按鈕組件
interface AIButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const AIButton: React.FC<AIButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  type = 'button'
}) => {
  const baseClasses = 'font-medium transition-all duration-300 rounded-lg';
  
  const variantClasses = {
    primary: 'bg-ai-primary text-black hover:bg-ai-primary-hover shadow-ai-md hover:shadow-ai-lg',
    secondary: 'bg-ai-dark-medium text-white hover:bg-ai-dark-light border border-gray-700 hover:border-ai-primary/50',
    outline: 'border border-ai-primary text-ai-primary hover:bg-ai-primary hover:text-black',
    ghost: 'text-ai-primary hover:bg-ai-primary/10'
  };

  const sizeClasses = {
    sm: 'px-ai-md py-ai-sm text-ai-sm',
    md: 'px-ai-lg py-ai-md text-ai-base',
    lg: 'px-ai-xl py-ai-lg text-ai-lg',
    xl: 'px-ai-2xl py-ai-xl text-ai-xl'
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Button>
  );
};

// AI Formula 章節容器
interface AISectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'darker' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AISection: React.FC<AISectionProps> = ({
  children,
  className,
  background = 'dark',
  padding = 'lg'
}) => {
  const backgroundClasses = {
    dark: 'bg-ai-dark',
    darker: 'bg-ai-dark-light',
    gradient: 'bg-gradient-to-br from-ai-dark to-ai-dark-light'
  };

  const paddingClasses = {
    sm: 'py-ai-xl px-ai-lg',
    md: 'py-ai-2xl px-ai-xl',
    lg: 'py-ai-3xl px-ai-2xl',
    xl: 'py-ai-4xl px-ai-3xl'
  };

  return (
    <section className={cn(
      backgroundClasses[background],
      paddingClasses[padding],
      className
    )}>
      {children}
    </section>
  );
};

// AI Formula 標題組件
interface AIHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'gradient' | 'accent';
  align?: 'left' | 'center' | 'right';
}

export const AIHeading: React.FC<AIHeadingProps> = ({
  children,
  className,
  level = 1,
  variant = 'default',
  align = 'left'
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizeClasses = {
    1: 'text-ai-hero md:text-ai-6xl',
    2: 'text-ai-5xl md:text-ai-4xl',
    3: 'text-ai-4xl md:text-ai-3xl',
    4: 'text-ai-3xl md:text-ai-2xl',
    5: 'text-ai-2xl md:text-ai-xl',
    6: 'text-ai-xl md:text-ai-lg'
  };

  const variantClasses = {
    default: 'text-white',
    gradient: 'bg-gradient-to-r from-ai-primary to-yellow-400 bg-clip-text text-transparent',
    accent: 'text-ai-primary'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <Tag className={cn(
      'font-bold leading-tight',
      sizeClasses[level],
      variantClasses[variant],
      alignClasses[align],
      className
    )}>
      {children}
    </Tag>
  );
};

// AI Formula 文字組件
interface AITextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
}

export const AIText: React.FC<AITextProps> = ({
  children,
  className,
  variant = 'default',
  size = 'base'
}) => {
  const variantClasses = {
    default: 'text-gray-200',
    muted: 'text-gray-400',
    accent: 'text-ai-primary',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400'
  };

  const sizeClasses = {
    xs: 'text-ai-xs',
    sm: 'text-ai-sm',
    base: 'text-ai-base',
    lg: 'text-ai-lg',
    xl: 'text-ai-xl'
  };

  return (
    <p className={cn(
      'leading-relaxed',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </p>
  );
};

// AI Formula 容器組件
interface AIContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
  padding?: boolean;
}

export const AIContainer: React.FC<AIContainerProps> = ({
  children,
  className,
  maxWidth = 'xl',
  padding = true
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full'
  };

  const paddingClasses = padding ? 'px-ai-lg' : '';

  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthClasses[maxWidth],
      paddingClasses,
      className
    )}>
      {children}
    </div>
  );
}; 