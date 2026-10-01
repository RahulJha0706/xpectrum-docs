import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

// Same text face as the Xpectrum app, plus a monospace face for code.
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-xp-body',
  display: 'swap',
})
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-xp-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Xpectrum Docs',
  description: 'Build, deploy and monitor AI agents with Xpectrum: guides, reference, API and troubleshooting.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d1d20',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
