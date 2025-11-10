import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Portafolio',
  description: 'Mi portafolio con Next.js y Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen theme-page transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

