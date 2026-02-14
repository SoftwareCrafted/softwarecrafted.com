import { Link } from 'react-router-dom'

const categoryColors = {
  'software-development': { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' },
  'software-testing': { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
  'cybersecurity': { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185' },
  'artificial-intelligence': { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' },
  'tech-news': { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' },
}

const categoryLabels = {
  'software-development': 'Software Dev',
  'software-testing': 'Testing',
  'cybersecurity': 'Cybersecurity',
  'artificial-intelligence': 'AI',
  'tech-news': 'Tech News',
}

export default function CategoryBadge({ category }) {
  const colors = categoryColors[category] || { bg: 'rgba(148, 163, 184, 0.15)', text: '#94a3b8' }
  const label = categoryLabels[category] || category

  return (
    <Link
      to={`/category/${category}`}
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.7rem',
        borderRadius: '6px',
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        background: colors.bg,
        color: colors.text,
        textDecoration: 'none',
        transition: 'opacity 150ms ease',
      }}
    >
      {label}
    </Link>
  )
}
