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
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
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
				// AI Formula È°èËâ≤Á≥ªÁµ±
				'ai-primary': 'var(--ai-formula-primary)',
				'ai-primary-hover': 'var(--ai-formula-primary-hover)',
				'ai-dark': 'var(--ai-formula-dark)',
				'ai-dark-light': 'var(--ai-formula-dark-light)',
				'ai-dark-medium': 'var(--ai-formula-dark-medium)',
				'ai-dark-card': 'var(--ai-formula-dark-card)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Áµ±‰??ÑÈ?Ë∑ùÁ≥ªÁµ?
			spacing: {
				'ai-xs': '0.25rem',    // 4px
				'ai-sm': '0.5rem',     // 8px
				'ai-md': '1rem',       // 16px
				'ai-lg': '1.5rem',     // 24px
				'ai-xl': '2rem',       // 32px
				'ai-2xl': '3rem',      // 48px
				'ai-3xl': '4rem',      // 64px
				'ai-4xl': '6rem',      // 96px
			},
			// Áµ±‰??ÑÂ?È´îÂ§ßÂ∞èÁ≥ªÁµ?
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
			// Áµ±‰??ÑÈô∞ÂΩ±Á≥ªÁµ?
			boxShadow: {
				'ai-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'ai-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'ai-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'ai-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'ai-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'ai-primary': '0 0 24px 2px var(--ai-formula-primary-strong)',
				'ai-primary-hover': '0 20px 25px -5px var(--ai-formula-primary-medium), 0 10px 10px -5px var(--ai-formula-primary-light)',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
