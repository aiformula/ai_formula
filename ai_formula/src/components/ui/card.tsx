import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border bg-card text-card-foreground shadow-sm",
      className
    )}
    style={{
      borderRadius: 'var(--radius-lg)', // 統一卡片圓角 12px
      ...props.style
    }}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    style={{
      gap: 'var(--space-3)', // 6px 標題間距，替換 space-y-1.5
      padding: 'var(--card-padding-md)', // 24px 統一卡片內邊距
      ...props.style
    }}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      className
    )}
    style={{
      fontSize: 'var(--text-2xl)', // 24px H6 標題大小
      fontWeight: 'var(--font-semibold)', // 600 半粗體
      lineHeight: 'var(--leading-tight)', // 1.25 緊密行高
      ...props.style
    }}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground", className)}
    style={{
      fontSize: 'var(--text-sm)', // 14px 小文字
      fontWeight: 'var(--font-normal)', // 400 正常字重
      lineHeight: 'var(--leading-normal)', // 1.5 標準行高
      ...props.style
    }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("", className)} 
    style={{
      padding: 'var(--card-padding-md)', // 24px 統一卡片內邊距
      paddingTop: '0', // 保持原有的 pt-0 邏輯
      ...props.style
    }}
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    style={{
      padding: 'var(--card-padding-md)', // 24px 統一卡片內邊距
      paddingTop: '0', // 保持原有的 pt-0 邏輯
      ...props.style
    }}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
