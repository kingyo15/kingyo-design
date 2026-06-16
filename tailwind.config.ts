import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0a0a0a",
        "ink-2": "#121212",
        muted: "#4d4d4d",
        "muted-2": "#757575",
        "soft-gray": "#ebebeb",
        "border-gray": "#ccc",
      },
      maxWidth: {
        container: "1520px",
        wide: "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
