import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docs pages are MDX files under src/app/docs.
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [{ source: '/', destination: '/docs', permanent: false }]
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false, defaultLang: 'plaintext' }],
    ],
  },
})

export default withMDX(nextConfig)
