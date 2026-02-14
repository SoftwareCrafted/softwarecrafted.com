import { useParams, Link } from 'react-router-dom'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import BreadcrumbNav from '../components/BreadcrumbNav'
import Newsletter from '../components/Newsletter'
import { getCategoryMeta } from '../data/categories'
import SchemaMarkup from '../components/SchemaMarkup'
import { breadcrumbSchema } from '../utils/schema'

export default function Category() {
  const { category } = useParams()
  const meta = getCategoryMeta(category)
  const filtered = posts.filter(p => p.frontmatter.category === category)
  const featured = filtered[0]
  const rest = filtered.slice(1)
  const crumbs = [{ name: 'Home', url: '/' }, { name: meta.fullLabel }]

  return (
    <div style={s.page}>
      <SchemaMarkup schema={breadcrumbSchema(crumbs)} />
      <div className="container">
        <BreadcrumbNav items={crumbs} />

        <div style={s.header}>
          <h1 style={s.title}>{meta.fullLabel}</h1>
          <p style={s.desc}>{meta.description}</p>
          <span style={s.count}>{filtered.length} article{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {featured && (
          <div style={{ marginBottom: 'var(--sp-8)' }}>
            <PostCard post={featured} variant="hero-lead" position={0} />
          </div>
        )}

        {rest.length > 0 && (
          <div style={s.grid}>
            {rest.map((post, i) => <PostCard key={post.slug} post={post} position={i + 1} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={s.empty}><p>No articles in this category yet. Check back soon!</p></div>
        )}
      </div>
      <Newsletter />
    </div>
  )
}

const s = {
  page: { padding: 'var(--sp-6) 0' },
  header: { marginBottom: 'var(--sp-8)' },
  title: { fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--sp-2)' },
  desc: { color: 'var(--text-secondary)', fontSize: 'var(--text-base)', marginBottom: 'var(--sp-2)' },
  count: { color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 500 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--sp-5)' },
  empty: { textAlign: 'center', padding: 'var(--sp-16) 0', color: 'var(--text-muted)' },
}
