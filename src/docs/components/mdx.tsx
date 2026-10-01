'use client'
import { Children, isValidElement, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import Link from 'next/link'
import {
  RiAlertLine,
  RiArrowRightUpLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiInformationLine,
  RiLightbulbLine,
} from '@remixicon/react'
import cn from '@/lib/classnames'

/* Components available in every docs MDX page without an import (see
   src/mdx-components.tsx). Styling lives in src/styles/docs.css. */

/* ── Code block copy button ─────────────────────────────────────────── */

export const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  return (
    <div className='group relative'>
      <pre ref={ref} {...props} />
      <button
        type='button'
        aria-label='Copy code'
        onClick={() => {
          navigator.clipboard?.writeText(ref.current?.innerText ?? '')
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        className='absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-md border border-[var(--xd-border)] bg-[var(--xd-surface)] text-[var(--xd-txt3)] opacity-0 transition-opacity hover:text-white focus:opacity-100 group-hover:opacity-100'
      >
        {copied ? <RiCheckLine className='h-3.5 w-3.5 text-[#4ade80]' /> : <RiFileCopyLine className='h-3.5 w-3.5' />}
      </button>
    </div>
  )
}

/* ── Callout ("Good to know") ───────────────────────────────────────── */

const CALLOUT = {
  note: { icon: RiInformationLine, color: '#5a99eb', label: 'Good to know' },
  tip: { icon: RiLightbulbLine, color: '#4ade80', label: 'Tip' },
  warning: { icon: RiAlertLine, color: '#fbbf24', label: 'Warning' },
  danger: { icon: RiErrorWarningLine, color: '#f87171', label: 'Important' },
}

export const Callout = ({ type = 'note', title, children }: { type?: keyof typeof CALLOUT; title?: string; children: ReactNode }) => {
  const c = CALLOUT[type]
  return (
    <div className={`xd-callout xd-callout-${type}`}>
      <c.icon className='mt-[3px] h-[18px] w-[18px] shrink-0' style={{ color: c.color }} />
      <div className='min-w-0'>
        <strong style={{ color: c.color }}>{title ?? c.label}</strong>
        {': '}
        {children}
      </div>
    </div>
  )
}

/* ── Steps ──────────────────────────────────────────────────────────── */

export const Steps = ({ children }: { children: ReactNode }) => <div className='xd-steps'>{children}</div>
export const Step = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className='xd-step'>
    <h3 id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>{title}</h3>
    {children}
  </div>
)

/* ── Cards ("Next steps") ───────────────────────────────────────────── */

export const Cards = ({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) => (
  <div className={cn('grid gap-3', cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>{children}</div>
)
export const Card = ({ title, href, children }: { title: string; href: string; children?: ReactNode }) => (
  <Link href={href} className='xd-card group block rounded-xl border border-[var(--xd-border)] bg-[var(--xd-surface)] p-4 no-underline transition-colors hover:border-[var(--xd-sky)]'>
    <div className='flex items-center justify-between gap-2 font-semibold text-white group-hover:text-[var(--xd-sky)]'>
      {title}
      <RiArrowRightUpLine className='h-4 w-4 shrink-0 text-[var(--xd-txt4)] group-hover:text-[var(--xd-sky)]' />
    </div>
    {children && <div className='mt-1 text-[14px] leading-relaxed text-[var(--xd-txt3)]'>{children}</div>}
  </Link>
)

/* ── Tabs ───────────────────────────────────────────────────────────── */

export const Tab = ({ children }: { title: string; children: ReactNode }) => <>{children}</>
export const Tabs = ({ children }: { children: ReactNode }) => {
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<{ title: string; children: ReactNode }>[]
  const [i, setI] = useState(0)
  return (
    <div className='overflow-hidden rounded-xl border border-[var(--xd-border)]'>
      <div className='flex gap-1 overflow-x-auto border-b border-[var(--xd-border)] bg-[var(--xd-surface)] px-2' role='tablist'>
        {tabs.map((t, k) => (
          <button
            key={t.props.title}
            type='button'
            role='tab'
            aria-selected={i === k}
            onClick={() => setI(k)}
            className={cn('-mb-px border-b-2 px-3 py-2.5 text-[13.5px] font-medium', i === k ? 'border-[var(--xd-sky)] text-white' : 'border-transparent text-[var(--xd-txt4)] hover:text-white')}
          >
            {t.props.title}
          </button>
        ))}
      </div>
      <div className='[&_figure]:m-0 [&_figure]:rounded-none [&_figure]:border-0 [&>:not(figure)]:px-4 [&>:not(figure)]:py-3'>{tabs[i]}</div>
    </div>
  )
}

/* ── API reference building blocks ──────────────────────────────────── */

/** Method badge + path, shown under an endpoint's heading. */
export const Endpoint = ({ method, path }: { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string }) => (
  <div className='flex flex-wrap items-center gap-2.5 rounded-lg border border-[var(--xd-border)] bg-[var(--xd-code-bg)] px-3 py-2.5'>
    <span className={`xd-method xd-method-${method}`}>{method}</span>
    <code className='min-w-0 !border-0 !bg-transparent !p-0 font-mono text-[13.5px] !text-white [overflow-wrap:anywhere]'>{path}</code>
  </div>
)

/** A list of request/response fields. */
export const Params = ({ title, children }: { title?: string; children: ReactNode }) => (
  <div>
    {title && <div className='mb-2 text-[12px] font-semibold uppercase tracking-wide text-[var(--xd-txt4)]'>{title}</div>}
    <div className='divide-y divide-[var(--xd-border)] border-y border-[var(--xd-border)]'>{children}</div>
  </div>
)

export const Param = ({ name, type, required, def, children }: { name: string; type: string; required?: boolean; def?: string; children?: ReactNode }) => (
  <div className='py-3.5'>
    <div className='flex flex-wrap items-baseline gap-x-2.5 gap-y-1'>
      <code className='!text-[13.5px] font-semibold'>{name}</code>
      <span className='font-mono text-[12.5px] text-[var(--xd-txt4)]'>{type}</span>
      {required && <span className='text-[11.5px] font-semibold text-[#f87171]'>required</span>}
      {def !== undefined && (
        <span className='text-[12px] text-[var(--xd-txt4)]'>
          default:
          {' '}
          <code className='!text-[12px]'>{def}</code>
        </span>
      )}
    </div>
    {children && <div className='mt-1.5 text-[14.5px] leading-relaxed text-[var(--xd-txt3)] [&>*+*]:mt-2'>{children}</div>}
  </div>
)

/** Small inline label (e.g. app types an endpoint applies to). */
export const Tag = ({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'green' | 'violet' | 'amber' }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-md px-1.5 py-px text-[12px] font-medium',
      tone === 'green' && 'bg-[#28ac6a26] text-[#4ade80]',
      tone === 'violet' && 'bg-[var(--xd-brand-dim)] text-[var(--xd-sky)]',
      tone === 'amber' && 'bg-[#f0a91926] text-[#fbbf24]',
      tone === 'default' && 'bg-white/[0.07] text-[var(--xd-txt2)]',
    )}
  >
    {children}
  </span>
)

/** Keyboard key. */
export const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className='rounded border border-[var(--xd-border-strong)] bg-[var(--xd-surface)] px-1.5 py-px font-mono text-[12px] text-white'>{children}</kbd>
)
