import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			centre: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colours: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'brand-yellow': '#FFD600',
				// AI Formula 顏色系統
				'ai-primary': 'var(--ai-formula-primary)',
				'ai-primary-hover': 'var(--ai-formula-primary-hover)',
				'ai-dark': 'var(--ai-formula-dark)',
				'ai-dark-light': 'var(--ai-formula-dark-light)',
				'ai-dark-medium': 'var(--ai-formula-dark-medium)',
				'ai-dark-card': 'var(--ai-formula-dark-card)',
				// 🎨 學習狀態色彩系統
				learning: {
					50: 'rgba(59, 130, 246, 0.1)',   // 學習狀態背景
					100: 'rgba(59, 130, 246, 0.2)',
					200: 'rgba(59, 130, 246, 0.3)',
					300: 'rgba(59, 130, 246, 0.4)',
					400: 'rgba(59, 130, 246, 0.6)',
					500: '#3b82f6',                   // 主要學習色
					600: '#2563eb',
				},
				completed: {
					50: 'rgba(34, 197, 94, 0.1)',    // 完成狀態背景
					100: 'rgba(34, 197, 94, 0.2)',
					200: 'rgba(34, 197, 94, 0.3)',
					300: 'rgba(34, 197, 94, 0.4)',
					400: 'rgba(34, 197, 94, 0.6)',
					500: '#22c55e',                   // 主要完成色
					600: '#16a34a',
				},
				important: {
					50: 'rgba(249, 115, 22, 0.1)',   // 重要提醒背景
					100: 'rgba(249, 115, 22, 0.2)',
					200: 'rgba(249, 115, 22, 0.3)',
					300: 'rgba(249, 115, 22, 0.4)',
					400: 'rgba(249, 115, 22, 0.6)',
					500: '#f97316',                   // 主要警示色
					600: '#ea580c',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// 🎨 統一圓角系統
				'ai-sm': '8px',   // 小元素 (按鈕、標籤)
				'ai-md': '12px',  // 卡片、輸入框
				'ai-lg': '16px',  // 大區塊
				'ai-xl': '20px',  // 最大容器
			},
			// 🎨 統一間距系統 - 8px Grid System
			spacing: {
				'ai-xs': '0.25rem',    // 4px
				'ai-sm': '0.5rem',     // 8px
				'ai-md': '1rem',       // 16px
				'ai-lg': '1.5rem',     // 24px
				'ai-xl': '2rem',       // 32px
				'ai-2xl': '3rem',      // 48px
				'ai-3xl': '4rem',      // 64px
				'ai-4xl': '6rem',      // 96px
				// 8px Grid System - 更精確的間距控制
				'1': '8px',      // 基礎單位
				'2': '16px',     // 組件內間距
				'3': '24px',     // 組件間間距  
				'4': '32px',     // 區塊間距
				'5': '40px',     // 大區塊間距
				'6': '48px',     // 版面邊距
				'8': '64px',     // 章節間距
				'12': '96px',    // 頁面級間距
				'16': '128px',   // 超大間距
			},
			// 統???體大小系�?
			fontSize: {
				'ai-xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
				'ai-sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
				'ai-base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
				'ai-lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
				'ai-xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
				'ai-2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
				'ai-3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
				'ai-4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
				'ai-5xl': ['3rem', { lineHeight: '1' }],           // 48px
				'ai-6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
				'ai-hero': ['4.5rem', { lineHeight: '1' }],        // 72px
			},
			// 統�??�陰影系�?
			boxShadow: {
				'ai-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'ai-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'ai-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'ai-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'ai-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'ai-primary': '0 0 24px 2px var(--ai-formula-primary-strong)',
				'ai-primary-hover': '0 20px 25px -5px var(--ai-formula-primary-medium), 0 10px 10px -5px var(--ai-formula-primary-light)',
			},
			// 🎨 過渡時間系統
			transitionDuration: {
				'fast': '150ms',
				'normal': '200ms', 
				'slow': '300ms',
				'slower': '500ms',
			},
			transitionTimingFunction: {
				'ai-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'ai-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
				'ai-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
				'ai-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				// 🎨 學習平台專用動畫
				'learning-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'scale(1.02)'
					}
				},
				'completion-bounce': {
					'0%': {
						transform: 'scale(0) rotate(-180deg)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.1) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(1) rotate(0deg)',
						opacity: '1'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'progress-fill': {
					'0%': {
						width: '0%'
					},
					'100%': {
						width: 'var(--progress-width)'
					}
				},
				// 🎨 進度條Shimmer效果
				'progress-shimmer': {
					'0%': {
						transform: 'translateX(-100%) skewX(-12deg)'
					},
					'100%': {
						transform: 'translateX(200%) skewX(-12deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				// 🎨 學習平台動畫
				'learning-pulse': 'learning-pulse 2s ease-in-out infinite',
				'completion-bounce': 'completion-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'progress-fill': 'progress-fill 1s ease-out',
				'progress-shimmer': 'progress-shimmer 1.5s ease-in-out infinite',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
