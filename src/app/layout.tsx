import './globals.css'
import type { Metadata } from 'next'
import AppProviders from '@/components/AppProviders'

export const metadata: Metadata = {
  title: 'Portafolio',
  description: 'Mi portafolio con Next.js y Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AppProviders>
          <div className="min-h-screen theme-page transition-colors duration-300">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  )
}

