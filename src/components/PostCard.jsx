import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import CategoryBadge from './CategoryBadge'

export default function PostCard({ post, featured = false }) {
  const { slug, frontmatter } = post
  const { title, excerpt, date, category, author, readTime, coverImage } = frontmatter

  if (featured) {
    return (
      <article style={styles.featured}>
        <div style={styles.featuredImageWrap}>
          {coverImage ? (
            <img src={coverImage} alt={title} style={styles.featuredImage} />
          ) : (
            <div style={styles.featuredPlaceholder}>
              <span style={styles.placeholderIcon}>{'</>'}</span>
            </div>
          )}
        </div>
        <div style={styles.featuredContent}>
          <div style={styles.meta}>
            <CategoryBadge category={category} />
            <span style={styles.dot}>·</span>
            <time style={styles.date}>{format(new Date(date), 'MMM d, yyyy')}</time>
            {readTime && (
              <>
                <span style={styles.dot}>·</span>
                <span style={styles.readTime}>{readTime}</span>
              </>
            )}
          </div>
          <Link to={`/blog/${slug}`} style={styles.titleLink}>
            <h2 style={styles.featuredTitle}>{title}</h2>
          </Link>
          <p style={styles.excerpt}>{excerpt}</p>
          <div style={styles.authorRow}>
            <div style={styles.authorAvatar}>{author?.[0] || 'S'}</div>
            <span style={styles.authorName}>{author || 'SoftwareCrafted'}</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article style={styles.card}>
      <div style={styles.cardImageWrap}>
        {coverImage ? (
          <img src={coverImage} alt={title} style={styles.cardImage} />
        ) : (
          <div style={styles.cardPlaceholder}>
            <span style={styles.placeholderIconSmall}>{'</>'}</span>
          </div>
        )}
      </div>
      <div style={styles.cardContent}>
        <div style={styles.meta}>
          <CategoryBadge category={category} />
          <span style={styles.dot}>·</span>
          <time style={styles.date}>{format(new Date(date), 'MMM d, yyyy')}</time>
        </div>
        <Link to={`/blog/${slug}`} style={styles.titleLink}>
          <h3 style={styles.cardTitle}>{title}</h3>
        </Link>
        <p style={styles.excerptSmall}>{excerpt}</p>
        <div style={styles.bottomRow}>
          <span style={styles.authorName}>{author || 'SoftwareCrafted'}</span>
          {readTime && <span style={styles.readTime}>{readTime}</span>}
        </div>
      </div>
    </article>
  )
}

const styles = {
  featured: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '2.5rem',
    background: 'var(--bg-card)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid var(--border-subtle)',
    transition: 'border-color 250ms ease, box-shadow 250ms ease',
  },
  featuredImageWrap: {
    position: 'relative',
    minHeight: '320px',
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  featuredPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #1e1b4b, #0c4a6e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: '4rem',
    fontFamily: "'JetBrains Mono', monospace",
    color: 'rgba(99, 102, 241, 0.4)',
    fontWeight: 700,
  },
  featuredContent: {
    padding: '2rem 2rem 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  featuredTitle: {
    fontSize: '1.75rem',
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: '0.75rem',
    color: 'var(--text-primary)',
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid var(--border-subtle)',
    transition: 'transform 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImageWrap: {
    height: '200px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #1e1b4b, #0c4a6e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIconSmall: {
    fontSize: '2.5rem',
    fontFamily: "'JetBrains Mono', monospace",
    color: 'rgba(99, 102, 241, 0.35)',
    fontWeight: 700,
  },
  cardContent: {
    padding: '1.25rem 1.5rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    flexWrap: 'wrap',
  },
  dot: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
  },
  date: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
  readTime: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 1.35,
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
    transition: 'color 150ms ease',
  },
  excerpt: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '1.25rem',
  },
  excerptSmall: {
    color: 'var(--text-secondary)',
    fontSize: '0.925rem',
    lineHeight: 1.55,
    marginBottom: '1rem',
    flexGrow: 1,
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  authorAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#fff',
  },
  authorName: {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
}

// Card hover effects
const cardHoverStyles = document.createElement('style')
cardHoverStyles.textContent = `
  article:hover {
    border-color: rgba(99, 102, 241, 0.3) !important;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.08);
  }
  article:hover h2, article:hover h3 {
    color: #818cf8 !important;
  }
  @media (max-width: 768px) {
    article[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }
    article[style*="grid-template-columns"] > div:last-child {
      padding: 1.5rem !important;
    }
  }
`
document.head.appendChild(cardHoverStyles)
