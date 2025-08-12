/**
 * Color palette constants for consistent theming throughout the application
 * Primary color scheme based on orange with complementary accent colors
 */

/**
 * Primary orange color palette
 */
export const COLORS = {
  PRIMARY: {
    ORANGE: "#FF6B35",
    LIGHT_ORANGE: "#FED7AA",
    DARK_ORANGE: "#EA580C",
  },
  ACCENT: {
    DEEP_BLUE: "#1E3A8A",
    WARM_GRAY: "#F3F4F6",
    LIGHT_GRAY: "#E5E7EB",
    DARK_GRAY: "#6B7280",
  },
  NEUTRAL: {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    SHADOW_LIGHT: "#d1d5db",
    SHADOW_DARK: "#9ca3af",
  },
} as const;

/**
 * Neumorphic shadow configurations
 */
export const SHADOWS = {
  NEOMORPHIC: "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
  NEOMORPHIC_INSET: "inset 8px 8px 16px #d1d5db, inset -8px -8px 16px #ffffff",
  NEOMORPHIC_HOVER: "6px 6px 12px #d1d5db, -6px -6px 12px #ffffff",
  NEOMORPHIC_PRESSED: "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff",
  FOCUS_ORANGE: "0 0 0 3px rgba(255, 107, 53, 0.3)",
} as const;

/**
 * Gradient configurations for buttons and interactive elements
 */
export const GRADIENTS = {
  ORANGE_BUTTON: "linear-gradient(135deg, #FF6B35 0%, #EA580C 100%)",
  ORANGE_HOVER: "linear-gradient(135deg, #EA580C 0%, #DC2626 100%)",
} as const;
