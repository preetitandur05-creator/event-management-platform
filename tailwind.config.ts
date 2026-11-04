import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #1B5E20)",
          foreground: "var(--color-primary-foreground, #FFFFFF)",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
        },
        secondary: {
          DEFAULT: "var(--color-secondary, #26A69A)",
          foreground: "var(--color-secondary-foreground, #FFFFFF)",
        },
        background: "var(--color-background, #F8F6F1)",
        foreground: "var(--color-foreground, #1A2E1A)",
        muted: {
          DEFAULT: "var(--color-muted, #E8E4D9)",
          foreground: "var(--color-muted-foreground, #5A6B5A)",
        },
        accent: {
          DEFAULT: "var(--color-accent, #81C784)",
          foreground: "var(--color-accent-foreground, #1A2E1A)",
        },
        card: {
          DEFAULT: "var(--color-card, #FFFFFF)",
          foreground: "var(--color-card-foreground, #1A2E1A)",
        },
        border: "var(--color-border, #D4CFC0)",
        ring: "var(--color-ring, #1B5E20)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
