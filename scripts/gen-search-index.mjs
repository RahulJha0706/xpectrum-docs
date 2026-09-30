// Builds src/docs/search-index.json: every docs page's ## / ### headings,
// with the same ids rehype-slug gives them, for the Ctrl/⌘K search.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import GithubSlugger from 'github-slugger'

const ROOT = 'src/app/docs'
const pages = []

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory())
      walk(p)
    else if (name === 'page.mdx')
      pages.push(p)
  }
}
walk(ROOT)

const index = pages.map((file) => {
  const rel = relative(ROOT, file).split(sep).slice(0, -1).join('/')
  const href = rel ? `/docs/${rel}` : '/docs'
  const slugger = new GithubSlugger()
  let inCode = false
  const headings = []
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (line.trim().startsWith('```'))
      inCode = !inCode
    if (inCode)
      continue
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/)
    if (m) {
      const text = m[2].replace(/`/g, '').replace(/\[(.+?)\]\(.+?\)/g, '$1')
      headings.push({ text, id: slugger.slug(text) })
    }
  }
  return { href, headings }
}).sort((a, b) => a.href.localeCompare(b.href))

writeFileSync('src/docs/search-index.json', `${JSON.stringify(index, null, 2)}\n`)
console.log(`search index: ${index.length} pages`)
