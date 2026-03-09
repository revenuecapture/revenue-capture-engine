import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "midnight-green": "var(--midnight-green)",
        "dutch-white": "var(--dutch-white)",
        wine: "var(--wine)",
        "federal-blue": "var(--federal-blue)",
        "bg-dark": "var(--bg-dark)",
        "bg-light": "var(--bg-light)",
        "text-primary-dark": "var(--text-primary-dark)",
        "text-muted-dark": "var(--text-muted-dark)",
        "text-primary-light": "var(--text-primary-light)",
        "text-muted-light": "var(--text-muted-light)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "footer-bg": "var(--footer-bg)",
      },
      fontFamily: {
        heading: ["'League Spartan'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      fontSize: {
        "hero": "clamp(72px, 10vw, 130px)",
        "section-h2": "clamp(40px, 5vw, 72px)",
        "subheading": "clamp(24px, 3vw, 40px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
