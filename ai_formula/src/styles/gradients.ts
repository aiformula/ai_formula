/**
 * Gradient styles configuration
 * @fileoverview Centralized gradient styles to reduce duplication across components
 * @author AI Formula Team
 * @version 1.0.0
 */

// Primary gradient combinations
export const gradients = {
  // Primary brand gradients
  primary: "bg-gradient-to-r from-blue-500 to-purple-600",
  primaryHover: "hover:from-blue-600 hover:to-purple-700",
  
  // Secondary gradients
  secondary: "bg-gradient-to-r from-yellow-400 to-orange-500",
  secondaryHover: "hover:from-yellow-500 hover:to-orange-600",
  
  // Accent gradients
  accent: "bg-gradient-to-r from-purple-500 to-pink-500",
  accentHover: "hover:from-purple-600 hover:to-pink-600",
  
  // Success gradients
  success: "bg-gradient-to-r from-green-500 to-emerald-600",
  successHover: "hover:from-green-600 hover:to-emerald-700",
  
  // Warning gradients
  warning: "bg-gradient-to-r from-yellow-500 to-amber-500",
  warningHover: "hover:from-yellow-600 hover:to-amber-600",
  
  // Error gradients
  error: "bg-gradient-to-r from-red-400 to-pink-400",
  errorHover: "hover:from-red-500 hover:to-pink-500",
  
  // Background gradients
  backgroundMain: "bg-gradient-to-br from-gray-900 via-black to-gray-900",
  backgroundSection: "bg-gradient-to-r from-blue-900/20 to-purple-900/20",
  backgroundCard: "bg-gradient-to-br from-amber-50 to-yellow-100",
  
  // Subtle overlay gradients
  overlayPrimary: "bg-gradient-to-r from-purple-600/20 to-blue-600/20",
  overlaySecondary: "bg-gradient-to-r from-yellow-900/30 to-orange-900/30",
  overlayAccent: "bg-gradient-to-r from-blue-500/10 to-purple-500/10",
  overlaySuccess: "bg-gradient-to-r from-green-400 to-blue-500",
  overlayWarning: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
  
  // Text gradients (use with bg-clip-text text-transparent)
  textPrimary: "bg-gradient-to-r from-blue-400 to-purple-600",
  textSecondary: "bg-gradient-to-r from-yellow-400 to-orange-500",
  textAccent: "bg-gradient-to-r from-purple-400 to-pink-400",
  textHero: "bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400",
  textSuccess: "bg-gradient-to-r from-green-400 to-blue-400",
  
  // Special effect gradients
  heroText: "bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400",
  cardHover: "bg-gradient-to-br from-blue-500 to-purple-600",
  buttonPrimary: "bg-gradient-to-r from-blue-500 to-purple-600",
  buttonSecondary: "bg-gradient-to-r from-yellow-400 to-orange-500",
  
  // Animated gradients
  animatedPrimary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
  animatedSecondary: "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
  
  // Specific component gradients
  lessonNavProgress: "bg-gradient-to-r from-green-400 to-blue-500",
  videoTemplate: "bg-gradient-to-r from-purple-600/20 to-blue-600/20",
  tipCard: "bg-gradient-to-r from-purple-600/20 to-blue-600/20",
  
  // Border gradients
  borderPrimary: "border-blue-500/30",
  borderSecondary: "border-yellow-500/50",
  borderAccent: "border-purple-500/30",
  borderSuccess: "border-green-500/30",
} as const;

// Utility function to get gradient with hover effect
export const getGradientWithHover = (baseGradient: keyof typeof gradients, hoverGradient: keyof typeof gradients) => {
  return `${gradients[baseGradient]} ${gradients[hoverGradient]}`;
};

// Utility function to get text gradient classes
export const getTextGradient = (gradient: keyof typeof gradients) => {
  return `${gradients[gradient]} bg-clip-text text-transparent`;
};

// Utility function to get button gradient classes
export const getButtonGradient = (variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error') => {
  const baseGradient = gradients[variant];
  const hoverGradient = gradients[`${variant}Hover` as keyof typeof gradients];
  return `${baseGradient} ${hoverGradient}`;
};

// Export gradient types
export type GradientKey = keyof typeof gradients;
export type GradientVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

// Common gradient combinations
export const commonGradients = {
  heroBackground: `${gradients.backgroundMain} text-white`,
  cardBackground: `${gradients.overlayPrimary} ${gradients.borderPrimary}`,
  buttonPrimary: `${gradients.buttonPrimary} ${gradients.primaryHover}`,
  buttonSecondary: `${gradients.buttonSecondary} ${gradients.secondaryHover}`,
  textHero: getTextGradient('heroText'),
  textPrimary: getTextGradient('textPrimary'),
  textSecondary: getTextGradient('textSecondary'),
} as const;

export default gradients; 
