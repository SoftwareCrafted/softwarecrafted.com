import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import Newsletter from '../components/Newsletter'
import BreadcrumbNav from '../components/BreadcrumbNav'
import categories from '../data/categories'

const allFilters = [{ slug: 'all', label: 'All' }, ...categories]

export default function Blog() {
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState(initialQ)

  const filtered = useMemo(() => {
    let result = posts
    if (activeCategory !== 'all') result = result.filter(p => p.frontmatter.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.frontmatter.title.toLowerCase().includes(q) ||
        p.frontmatter.excerpt?.toLowerCase().includes(q) ||
        p.frontmatter.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [activeCategory, searchQuery])

  return (
    <div style={s.page}>
      <div className="container">
        <BreadcrumbNav items={[{ name: 'Home', url: '/' }, { name: 'Blog' }]} />

        <div style={s.header}>
          <h1 style={s.title}>All Articles</h1>
          <p style={s.subtitle}>{posts.length} articles across {categories.length} topics</p>
        </div>

        <div style={s.controls}>
          <input type="text" placeholder="Search articles..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} style={s.search} />
          <div style={s.filters}>
            {allFilters.map(cat => (
              <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
                style={{ ...s.filterBtn, ...(activeCategory === cat.slug ? s.filterActive : {}) }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={s.grid}>
            {filtered.map((post, i) => <PostCard key={post.slug} post={post} position={i} />)}
          </div>
        ) : (
          <div style={s.empty}><p>No articles found matching your criteria.</p></div>
        )}
      </div>
      <Newsletter />
    </div>
  )
}

const s = {
  page: { padding: 'var(--sp-6) 0' },
  header: { marginBottom: 'var(--sp-6)' },
  title: { fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--sp-1)' },
  subtitle: { color: 'var(--text-secondary)', fontSize: 'var(--text-base)' },
  controls: { marginBottom: 'var(--sp-8)' },
  search: {
    width: '100%', padding: '10px 16px', borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-default)', background: 'var(--surface)',
    color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontFamily: 'inherit',
    outline: 'none', marginBottom: 'var(--sp-4)',
  },
  filters: { display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' },
  filterBtn: {
    padding: '6px 14px', borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-default)', background: 'transparent',
    color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all var(--duration-fast) ease',
  },
  filterActive: { background: 'var(--accent-subtle)', borderColor: 'var(--accent-border)', color: 'var(--accent-cta)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--sp-5)' },
  empty: { textAlign: 'center', padding: 'var(--sp-16) 0', color: 'var(--text-muted)' },
}
