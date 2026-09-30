import type { Metadata } from 'next'
import { DocsFrame } from '@/docs/components/shell'

export const metadata: Metadata = {
  title: { template: '%s | Xpectrum Docs', default: 'Xpectrum Docs' },
  description: 'Guides and reference for building, deploying and monitoring AI agents on Xpectrum.',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsFrame>{children}</DocsFrame>
}
