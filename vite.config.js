import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function blogPlugin() {
  const virtualModuleId = 'virtual:blog-posts'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'blog-posts',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const postsDir = path.resolve(__dirname, 'content/posts')
        if (!fs.existsSync(postsDir)) return 'export default []'

        const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
        const posts = files.map(file => {
          const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
          const { data, content } = matter(raw)
          const slug = file.replace('.md', '')
          return { slug, frontmatter: data, content }
        })

        posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
        return `export default ${JSON.stringify(posts)}`
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('content/posts')) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          return [mod]
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), blogPlugin()],
  build: {
    outDir: 'dist',
  },
})
