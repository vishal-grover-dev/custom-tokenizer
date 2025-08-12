import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Orange color palette extensions with improved contrast
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316", // Primary orange - better contrast
          600: "#EA580C", // Dark orange for shadows
          700: "#C2410C", // Darker for better contrast
          800: "#9A3412",
          900: "#7C2D12",
        },
        // Neumorphic color system
        neumorphic: {
          light: "#ffffff",
          background: "#F3F4F6", // Warm gray background
          shadow: "#d1d5db", // Light gray for shadows
          highlight: "#ffffff",
          accent: "#1E3A8A", // Deep blue accent
        },
      },
      boxShadow: {
        // Standard neumorphic effects
        neomorphic: "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
        "neomorphic-inset": "inset 8px 8px 16px #d1d5db, inset -8px -8px 16px #ffffff",
        "neomorphic-hover": "6px 6px 12px #d1d5db, -6px -6px 12px #ffffff",
        "neomorphic-pressed": "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff",
        // Token card specific shadows
        "neomorphic-token": "4px 4px 8px #d1d5db, -4px -4px 8px #ffffff",
        "neomorphic-token-hover": "6px 6px 12px #d1d5db, -6px -6px 12px #ffffff",
        // Input field shadows
        "neomorphic-input": "inset 8px 8px 16px #d1d5db, inset -8px -8px 16px #ffffff",
        "neomorphic-input-focus":
          "inset 8px 8px 16px #d1d5db, inset -8px -8px 16px #ffffff, 0 0 0 3px rgba(255, 107, 53, 0.3)",
        // Button shadows
        "neomorphic-button": "8px 8px 16px #d1d5db, -8px -8px 16px #ffffff",
        "neomorphic-button-hover": "4px 4px 8px #d1d5db, -4px -4px 8px #ffffff",
        "neomorphic-button-active": "inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff",
      },
      borderRadius: {
        neumorphic: "20px",
        "neumorphic-sm": "12px",
        "neumorphic-lg": "24px",
      },
      // Responsive breakpoints (using Tailwind defaults but explicitly defined)
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
