import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          blue: "#056FE8",
        },
        // Secondary Colors
        secondary: {
          "sky-blue": "#87CEEB",
          yellow: "#FBBF24",
        },
        // Gray Scale
        gray: {
          light: "#F1F5F9",
          medium: "#94A3B8",
          dark: "#6C757D",
          charcoal: "#1A1A1B",
        },
        // Background Colors
        bg: {
          "pale-blue": "#F8F9FA",
          white: "#FFFFFF",
        },
        // Text Colors
        text: {
          primary: "#1A1A1B",
          secondary: "#6C757D",
        },
        // Accent Colors
        accent: {
          "yellow-light": "#FBBF241A", // 10% opacity
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        // Design Token 기반 크기
        xs: ["13.5px", { lineHeight: "20px", letterSpacing: "0px" }],
        sm: ["14px", { lineHeight: "20px", letterSpacing: "0px" }],
        base: ["16px", { lineHeight: "28px", letterSpacing: "-0.45px" }],
        lg: ["18px", { lineHeight: "29.25px", letterSpacing: "0px" }],
        xl: ["20px", { lineHeight: "28px", letterSpacing: "-0.5px" }],

        // Headings - 모바일 기본 (반응형은 클래스에서 md: 사용)
        "h1-mobile": ["36px", { lineHeight: "1.2", fontWeight: "800" }],
        "h2-mobile": ["30px", { lineHeight: "1.2", fontWeight: "800" }],
        "h3-mobile": ["24px", { lineHeight: "1.2", fontWeight: "800" }],

        // Headings - 데스크톱
        "h1-desktop": ["48px", { lineHeight: "1.2", fontWeight: "800" }],
        "h2-desktop": ["36px", { lineHeight: "1.2", fontWeight: "800" }],
        "h3-desktop": ["30px", { lineHeight: "1.2", fontWeight: "800" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
        extrabold: "800",
      },
      lineHeight: {
        tight: "20px",
        normal: "28px",
        relaxed: "29.25px",
      },
      letterSpacing: {
        tight: "-0.5px",
        tighter: "-0.45px",
        normal: "0px",
      },
      spacing: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        // 푸터 전용
        "footer-horizontal": "104px",
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
      },
      boxShadow: {
        md: "0px 25px 50px -12px #e5e7eb",
      },
      screens: {
        xs: "425px", // min-width 425px
      },
      height: {
    },
  },
  plugins: [],
};
export default config;
