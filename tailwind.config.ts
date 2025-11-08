import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],  // importante para next-themes
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      // Ejemplo: tipografías si usas next/font con variables
      fontFamily: {
        sans: ['var(--font-sans)']
      }
    }
  },
  plugins: []
} satisfies Config;
