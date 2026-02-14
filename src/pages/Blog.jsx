import { useState, useMemo } from 'react'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import Newsletter from '../components/Newsletter'

const allCategories = [
  { slug: 'all', label: 'All Posts' },
  { slug: 'software-development', label: 'Development' },
  { slug: 'software-testing', label: 'Testing' },
  { slug: 'cybersecurity', label: 'Security' },
  { slug: 'artificial-intelligence', label: 'AI' },
  { slug: 'tech-news', label: 'News' },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let result = posts
    if (activeCategory !== 'all') {
      result = result.filter(p => p.frontmatter.category === activeCategory)
    }
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
    <div style={styles.page}>
      <div className="container">
        {/* Page Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Blog</h1>
          <p style={styles.subtitle}>
            Explore our latest articles on software development, testing, cybersecurity, AI, and more.
          </p>
        </div>

        {/* Search & Filter */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.search}
          />
          <div style={styles.filters}>
            {allCategories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  ...styles.filterBtn,
                  ...(activeCategory === cat.slug ? styles.filterBtnActive : {}),
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  )
}

const styles = {
  page: {
    padding: '3rem 0',
  },
  header: {
    marginBottom: '2.5rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
  },
  controls: {
    marginBottom: '2.5rem',
  },
  search: {
    width: '100%',
    padding: '0.8rem 1.25rem',
    borderRadius: '10px',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    marginBottom: '1.25rem',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.45rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    fontFamily: 'inherit',
  },
  filterBtnActive: {
    background: 'rgba(99, 102, 241, 0.15)',
    borderColor: 'rgba(99, 102, 241, 0.3)',
    color: '#818cf8',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 0',
  },
  emptyText: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
}
