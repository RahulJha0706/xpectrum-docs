'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiCornerDownLeftLine,
  RiFileTextLine,
  RiHashtag,
  RiMenuLine,
  RiSearchLine,
  RiThumbDownLine,
  RiThumbUpLine,
} from '@remixicon/react'
import cn from '@/lib/classnames'
import { DOCS_NAV, FLAT_NAV, findNav } from '../nav'
import SEARCH_INDEX from '../search-index.json'

/* ── Header ───────────────────────────────────────────────────────────── */

export const DocsHeader = ({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) => (
  <header className='sticky top-0 z-40 border-b border-[var(--xd-border)] bg-[rgba(29,29,32,0.92)] backdrop-blur'>
    <div className='mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6'>
      <button type='button' onClick={onMenu} className='-ml-1 rounded-md p-1.5 text-[var(--xd-txt3)] hover:text-white lg:hidden' aria-label='Open navigation'>
        <RiMenuLine className='h-5 w-5' />
      </button>
      <Link href='/' className='flex shrink-0 items-center gap-2.5'>
        <img src='/logo/logo-site-dark.png' alt='Xpectrum AI' className='h-[22px] w-auto brightness-[1.75] saturate-[1.15]' />
        <span className='hidden h-5 w-px bg-[var(--xd-border-strong)] sm:block' />
        <span className='hidden text-[15px] font-semibold text-white sm:block'>Docs</span>
      </Link>

      <button
        type='button'
        onClick={onSearch}
        className='ml-2 flex h-9 w-full max-w-[320px] items-center gap-2 rounded-lg border border-[var(--xd-border)] bg-[var(--xd-surface)] px-3 text-left text-[13.5px] text-[var(--xd-txt4)] transition-colors hover:border-[var(--xd-border-strong)] sm:ml-6'
      >
        <RiSearchLine className='h-4 w-4 shrink-0' />
        <span className='flex-1 truncate'>Search documentation…</span>
        <kbd className='hidden rounded border border-[var(--xd-border)] px-1.5 font-sans text-[11px] sm:block'>Ctrl K</kbd>
      </button>

      <nav className='ml-auto hidden items-center gap-1 text-[14px] md:flex'>
        {[
          ['Guides', '/docs/getting-started/quickstart'],
          ['API Reference', '/docs/api'],
          ['Troubleshooting', '/docs/troubleshooting'],
        ].map(([t, h]) => (
          <Link key={h} href={h} className='rounded-md px-3 py-1.5 text-[var(--xd-txt3)] transition-colors hover:text-white'>{t}</Link>
        ))}
        <a href='https://cloud.xpectrum.dev/agents' className='ml-2 rounded-lg bg-[var(--xd-brand)] px-3.5 py-1.5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors hover:bg-[#296dff]'>Dashboard</a>
      </nav>
    </div>
  </header>
)

/* ── Sidebar ──────────────────────────────────────────────────────────── */

const Badge = ({ b }: { b: string }) => (
  <span className={cn('ml-auto rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide', b === 'New' ? 'bg-[#28ac6a26] text-[#4ade80]' : b === 'Beta' ? 'bg-[#155aef24] text-[#84abff]' : 'bg-white/10 text-[var(--xd-txt4)]')}>{b}</span>
)

export const DocsSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname()
  const active = pathname.replace(/\/$/, '') || '/docs'
  // Like the Next.js docs: only the group you are in starts open.
  const [open, setOpen] = useState<Record<string, boolean>>({})
  return (
    <nav className='xd-scroll space-y-6 pb-10 text-[14px]'>
      {DOCS_NAV.map((g) => {
        const here = g.items.some(i => i.href === active)
        const isClosed = !(open[g.title] ?? here)
        return (
          <div key={g.title}>
            <button
              type='button'
              onClick={() => setOpen(o => ({ ...o, [g.title]: isClosed }))}
              className='flex w-full items-center justify-between py-1 text-left text-[13px] font-semibold text-white'
            >
              {g.title}
              <RiArrowDownSLine className={cn('h-4 w-4 text-[var(--xd-txt4)] transition-transform', isClosed && '-rotate-90')} />
            </button>
            {!isClosed && (
              <ul className='mt-1.5 space-y-px border-l border-[var(--xd-border)]'>
                {g.items.map((i) => {
                  const on = i.href === active
                  return (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        onClick={onNavigate}
                        className={cn(
                          '-ml-px flex items-center gap-2 border-l py-1.5 pl-3.5 pr-2 transition-colors',
                          on ? 'border-[var(--xd-sky)] font-medium text-[var(--xd-sky)]' : 'border-transparent text-[var(--xd-txt3)] hover:border-[var(--xd-txt4)] hover:text-white',
                        )}
                      >
                        {i.title}
                        {i.badge && <Badge b={i.badge} />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

/* ── On this page ─────────────────────────────────────────────────────── */

type Heading = { id: string; text: string; level: number }

export const DocsToc = () => {
  const pathname = usePathname()
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('article.xd-prose h2[id], article.xd-prose h3[id]')]
    setHeadings(els.map(e => ({ id: e.id, text: e.textContent?.replace(/^#/, '').trim() ?? '', level: e.tagName === 'H2' ? 2 : 3 })))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0])
          setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [pathname])

  if (!headings.length)
    return null
  return (
    <div className='text-[13px]'>
      <div className='mb-3 font-semibold text-white'>On this page</div>
      <ul className='space-y-1.5'>
        {headings.map(h => (
          <li key={h.id} className={cn(h.level === 3 && 'pl-3.5')}>
            <a href={`#${h.id}`} className={cn('block leading-snug transition-colors', active === h.id ? 'text-[var(--xd-sky)]' : 'text-[var(--xd-txt4)] hover:text-white')}>{h.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Breadcrumbs, previous/next, feedback ─────────────────────────────── */

export const DocsBreadcrumbs = () => {
  const { item } = findNav(usePathname())
  if (!item)
    return null
  return (
    <div className='mb-4 flex items-center gap-1.5 text-[13px] text-[var(--xd-txt4)]'>
      <span>{item.group}</span>
      <RiArrowRightSLine className='h-3.5 w-3.5' />
      <span className='text-[var(--xd-txt3)]'>{item.title}</span>
    </div>
  )
}

export const DocsFooter = () => {
  const pathname = usePathname()
  const { prev, next } = findNav(pathname)
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  useEffect(() => setVote(null), [pathname])
  return (
    <div className='mt-16 border-t border-[var(--xd-border)] pt-8'>
      <div className='grid gap-3 sm:grid-cols-2'>
        {prev
          ? (
            <Link href={prev.href} className='group rounded-xl border border-[var(--xd-border)] p-4 transition-colors hover:border-[var(--xd-sky)]'>
              <div className='flex items-center gap-1 text-[12.5px] text-[var(--xd-txt4)]'>
                <RiArrowLeftSLine className='h-4 w-4' />
                Previous
              </div>
              <div className='mt-1 font-semibold text-white group-hover:text-[var(--xd-sky)]'>{prev.title}</div>
            </Link>
          )
          : <span />}
        {next && (
          <Link href={next.href} className='group rounded-xl border border-[var(--xd-border)] p-4 text-right transition-colors hover:border-[var(--xd-sky)]'>
            <div className='flex items-center justify-end gap-1 text-[12.5px] text-[var(--xd-txt4)]'>
              Next
              <RiArrowRightSLine className='h-4 w-4' />
            </div>
            <div className='mt-1 font-semibold text-white group-hover:text-[var(--xd-sky)]'>{next.title}</div>
          </Link>
        )}
      </div>
      <div className='mt-8 flex flex-wrap items-center gap-3 text-[13.5px] text-[var(--xd-txt3)]'>
        {vote
          ? <span>Thanks for the feedback.</span>
          : (
            <>
              <span>Was this page helpful?</span>
              <button type='button' onClick={() => setVote('up')} className='flex items-center gap-1 rounded-md border border-[var(--xd-border)] px-2.5 py-1 hover:border-[var(--xd-border-strong)] hover:text-white'>
                <RiThumbUpLine className='h-3.5 w-3.5' />
                Yes
              </button>
              <button type='button' onClick={() => setVote('down')} className='flex items-center gap-1 rounded-md border border-[var(--xd-border)] px-2.5 py-1 hover:border-[var(--xd-border-strong)] hover:text-white'>
                <RiThumbDownLine className='h-3.5 w-3.5' />
                No
              </button>
            </>
          )}
      </div>
    </div>
  )
}

/* ── Search (Ctrl/⌘ K) ────────────────────────────────────────────────── */

type Entry = { title: string; href: string; group: string; heading?: string }

const buildEntries = (): Entry[] => {
  const byHref = new Map((SEARCH_INDEX as { href: string; headings: { text: string; id: string }[] }[]).map(p => [p.href, p.headings]))
  return FLAT_NAV.flatMap((n) => {
    const heads = byHref.get(n.href) ?? []
    return [
      { title: n.title, href: n.href, group: n.group },
      ...heads.map(h => ({ title: n.title, href: `${n.href}#${h.id}`, group: n.group, heading: h.text })),
    ]
  })
}

export const DocsSearch = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const entries = useMemo(buildEntries, [])

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t)
      return entries.filter(e => !e.heading).slice(0, 12)
    const words = t.split(/\s+/)
    return entries
      .map((e) => {
        const hay = `${e.heading ?? ''} ${e.title} ${e.group}`.toLowerCase()
        if (!words.every(w => hay.includes(w)))
          return null
        const score = (e.heading?.toLowerCase().startsWith(t) ? 3 : 0) + (e.title.toLowerCase().startsWith(t) ? 4 : 0) + (e.heading ? 0 : 1)
        return { e, score }
      })
      .filter((x): x is { e: Entry; score: number } => !!x)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(x => x.e)
  }, [q, entries])

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])
  useEffect(() => setSel(0), [q])

  if (!open)
    return null
  const go = (e: Entry) => {
    onClose()
    router.push(e.href)
  }
  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center bg-[rgba(24,24,27,0.8)] px-4 pt-[12vh]' onClick={onClose}>
      <div className='w-full max-w-[600px] overflow-hidden rounded-2xl border border-[var(--xd-border-strong)] bg-[#1d1d20] shadow-2xl' onClick={e => e.stopPropagation()}>
        <div className='flex items-center gap-3 border-b border-[var(--xd-border)] px-4'>
          <RiSearchLine className='h-5 w-5 text-[var(--xd-txt4)]' />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSel(s => Math.min(s + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSel(s => Math.max(s - 1, 0))
              }
              if (e.key === 'Enter' && results[sel])
                go(results[sel])
              if (e.key === 'Escape')
                onClose()
            }}
            placeholder='Search documentation…'
            className='h-14 flex-1 bg-transparent text-[15px] text-white placeholder:text-[var(--xd-txt4)] focus:outline-none'
          />
          <button type='button' onClick={onClose} aria-label='Close search' className='text-[var(--xd-txt4)] hover:text-white'>
            <RiCloseLine className='h-5 w-5' />
          </button>
        </div>
        <ul className='xd-scroll max-h-[55vh] overflow-y-auto p-2'>
          {results.length === 0 && <li className='px-3 py-8 text-center text-[14px] text-[var(--xd-txt4)]'>{`No results for “${q}”`}</li>}
          {results.map((r, i) => (
            <li key={r.href}>
              <button
                type='button'
                onMouseEnter={() => setSel(i)}
                onClick={() => go(r)}
                className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left', i === sel ? 'bg-[var(--xd-surface2)]' : '')}
              >
                {r.heading ? <RiHashtag className='h-4 w-4 shrink-0 text-[var(--xd-txt4)]' /> : <RiFileTextLine className='h-4 w-4 shrink-0 text-[var(--xd-sky)]' />}
                <span className='min-w-0 flex-1'>
                  <span className='block truncate text-[14px] text-white'>{r.heading ?? r.title}</span>
                  <span className='block truncate text-[12px] text-[var(--xd-txt4)]'>{r.heading ? `${r.group} › ${r.title}` : r.group}</span>
                </span>
                {i === sel && <RiCornerDownLeftLine className='h-4 w-4 shrink-0 text-[var(--xd-txt4)]' />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── The whole frame ──────────────────────────────────────────────────── */

export const DocsFrame = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch(s => !s)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => setMenu(false), [pathname])

  return (
    <div className='xd'>
      <DocsHeader onMenu={() => setMenu(true)} onSearch={() => setSearch(true)} />
      <div className='mx-auto flex max-w-[1440px] px-4 sm:px-6'>
        {/* Left sidebar */}
        <aside className='xd-scroll sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 overflow-y-auto border-r border-[var(--xd-border)] py-8 pr-6 lg:block'>
          <DocsSidebar />
        </aside>

        {/* Article */}
        <main className='min-w-0 flex-1 py-10 lg:px-12'>
          <div className='mx-auto max-w-[760px]'>
            <DocsBreadcrumbs />
            <article className='xd-prose'>{children}</article>
            <DocsFooter />
          </div>
        </main>

        {/* On this page */}
        <aside className='xd-scroll sticky top-16 hidden h-[calc(100vh-4rem)] w-[220px] shrink-0 overflow-y-auto py-10 xl:block'>
          <DocsToc />
        </aside>
      </div>

      {/* Mobile navigation drawer */}
      {menu && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div className='absolute inset-0 bg-black/60' onClick={() => setMenu(false)} />
          <div className='xd-scroll absolute inset-y-0 left-0 w-[290px] overflow-y-auto border-r border-[var(--xd-border)] bg-[var(--xd-bg)] px-5 py-5'>
            <div className='mb-6 flex items-center justify-between'>
              <span className='text-[15px] font-semibold text-white'>Documentation</span>
              <button type='button' onClick={() => setMenu(false)} aria-label='Close navigation' className='text-[var(--xd-txt4)] hover:text-white'>
                <RiCloseLine className='h-5 w-5' />
              </button>
            </div>
            <DocsSidebar onNavigate={() => setMenu(false)} />
          </div>
        </div>
      )}
      <DocsSearch open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
