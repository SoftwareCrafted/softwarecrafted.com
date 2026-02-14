import { Link } from 'react-router-dom'
import { getCategoryMeta } from '../data/categories'

export default function CategoryBadge({ category, size = 'sm' }) {
  const meta = getCategoryMeta(category)
  const isLg = size === 'lg'
  return (
    <Link
      to={`/category/${category}`}
      style={{
        display: 'inline-block',
        padding: isLg ? '4px 10px' : '2px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: isLg ? 'var(--text-sm)' : 'var(--text-xs)',
        fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase',
        background: meta.bgColor, color: meta.color,
        textDecoration: 'none', transition: 'opacity var(--duration-fast) ease', lineHeight: 1.4,
      }}
    >
      {meta.label}
    </Link>
  )
}
