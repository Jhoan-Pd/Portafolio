// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;
