// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-figtree)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
