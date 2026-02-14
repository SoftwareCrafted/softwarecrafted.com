import { Link } from 'react-router-dom'

export default function RelatedTopics({ tags }) {
  if (!tags?.length) return null
  return (
    <div style={s.wrap}>
      <span style={s.label}>Related Topics</span>
      <div style={s.tags}>
        {tags.map(tag => (
          <Link key={tag} to={`/blog?q=${encodeURIComponent(tag)}`} style={s.tag}>#{tag}</Link>
        ))}
      </div>
    </div>
  )
}

const s = {
  wrap: { marginTop: 'var(--sp-8)', paddingTop: 'var(--sp-6)', borderTop: '1px solid var(--border-subtle)' },
  label: { fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--sp-3)' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' },
  tag: { padding: '4px 10px', borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500, textDecoration: 'none', transition: 'border-color var(--duration-fast) ease, color var(--duration-fast) ease' },
}
