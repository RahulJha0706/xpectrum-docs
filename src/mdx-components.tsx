import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { Callout, Card, Cards, Endpoint, Kbd, Param, Params, Pre, Step, Steps, Tab, Tabs, Tag } from '@/docs/components/mdx'

// Headings get a hover "#" link, like the Next.js docs.
const heading = (Tag: 'h2' | 'h3' | 'h4') => {
  const H = ({ id, children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Tag id={id} {...rest}>
      {id && <a href={`#${id}`} className='xd-anchor' aria-hidden>#</a>}
      {children}
    </Tag>
  )
  H.displayName = Tag
  return H
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    pre: Pre,
    a: ({ href = '', ...rest }) => (href.startsWith('/') || href.startsWith('#')
      ? <Link href={href} {...rest} />
      : <a href={href} target='_blank' rel='noopener noreferrer' {...rest} />),
    Callout,
    Steps,
    Step,
    Cards,
    Card,
    Tabs,
    Tab,
    Endpoint,
    Params,
    Param,
    Tag,
    Kbd,
    ...components,
  }
}
