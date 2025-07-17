import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // 🎯 使用統一間距系統替換固定值
        default: "",  // 將在style中設置
        sm: "",       // 將在style中設置
        lg: "",       // 將在style中設置
        icon: "",     // 將在style中設置
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // 🎯 統一按鈕尺寸系統 - 使用CSS變數
    const getSizeStyles = (size: string | null) => {
      switch (size) {
        case "sm":
          return {
            height: 'var(--btn-height-sm)',      // 32px
            padding: '0 var(--btn-padding-x-sm)', // 0 12px
            fontSize: 'var(--text-sm)',          // 14px
            borderRadius: 'var(--radius-md)',    // 8px
            gap: 'var(--space-1)'                // 4px icon間距
          }
        case "lg":
          return {
            height: 'var(--btn-height-lg)',      // 48px
            padding: '0 var(--btn-padding-x-lg)', // 0 24px
            fontSize: 'var(--text-lg)',          // 18px
            borderRadius: 'var(--radius-md)',    // 8px
            gap: 'var(--space-2)'                // 8px icon間距
          }
        case "icon":
          return {
            width: 'var(--btn-height-md)',       // 40px 正方形
            height: 'var(--btn-height-md)',      // 40px
            padding: '0',
            borderRadius: 'var(--radius-md)',    // 8px
            gap: '0'
          }
        default: // "default"
          return {
            height: 'var(--btn-height-md)',      // 40px 標準高度
            padding: '0 var(--btn-padding-x-md)', // 0 16px 標準內邊距
            fontSize: 'var(--text-base)',        // 16px 標準字體
            borderRadius: 'var(--radius-md)',    // 8px 統一圓角
            gap: 'var(--space-2)'                // 8px icon間距
          }
      }
    }

    const sizeStyles = getSizeStyles(size)

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{
          ...sizeStyles,
          ...props.style // 允許外部覆蓋樣式
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
