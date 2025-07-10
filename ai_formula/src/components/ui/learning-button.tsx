import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const learningButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      intent: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
        secondary: "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800 focus-visible:ring-gray-500 shadow-md hover:shadow-lg",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 focus-visible:ring-blue-500 bg-transparent",
        accent: "bg-[#FFC700] text-black hover:bg-[#FFD700] active:bg-[#E6B800] focus-visible:ring-[#FFC700] shadow-lg hover:shadow-xl hover:shadow-[#FFC700]/25",
        success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500 shadow-lg hover:shadow-xl hover:shadow-green-500/25",
        ghost: "text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-900 focus-visible:ring-gray-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-lg hover:shadow-xl hover:shadow-red-500/25"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg"
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto"
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      fullWidth: false
    }
  }
)

export interface LearningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof learningButtonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const LearningButton = React.forwardRef<HTMLButtonElement, LearningButtonProps>(
  ({ className, intent, size, fullWidth, asChild = false, loading = false, loadingText = "Loading...", children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(learningButtonVariants({ intent, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {loadingText}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
LearningButton.displayName = "LearningButton"

export { LearningButton, learningButtonVariants } 