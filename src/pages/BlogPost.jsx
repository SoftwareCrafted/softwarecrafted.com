import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { format } from 'date-fns'
import posts from 'virtual:blog-posts'
import CategoryBadge from '../components/CategoryBadge'
import PostCard from '../components/PostCard'
import { HiArrowLeft, HiClock, HiUser } from 'react-icons/hi'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container" style={styles.notFound}>
        <h1>Post Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          The article you're looking for doesn't exist.
        </p>
        <Link to="/blog" style={styles.backLink}>
          <HiArrowLeft /> Back to Blog
        </Link>
      </div>
    )
  }

  const { frontmatter, content } = post
  const htmlContent = marked(content)

  const relatedPosts = posts
    .filter(p => p.slug !== slug && p.frontmatter.category === frontmatter.category)
    .slice(0, 3)

  return (
    <article style={styles.page}>
      <div className="container" style={styles.container}>
        {/* Back link */}
        <Link to="/blog" style={styles.backLink}>
          <HiArrowLeft /> Back to Blog
        </Link>

        {/* Header */}
        <header style={styles.header}>
          <div style={styles.meta}>
            <CategoryBadge category={frontmatter.category} />
            <span style={styles.dot}>·</span>
            <time style={styles.metaText}>
              {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
            </time>
          </div>
          <h1 style={styles.title}>{frontmatter.title}</h1>
          {frontmatter.excerpt && (
            <p style={styles.excerpt}>{frontmatter.excerpt}</p>
          )}
          <div style={styles.authorRow}>
            <div style={styles.authorAvatar}>
              {frontmatter.author?.[0] || 'S'}
            </div>
            <div>
              <div style={styles.authorName}>{frontmatter.author || 'SoftwareCrafted'}</div>
              <div style={styles.metaText}>
                {frontmatter.readTime && (
                  <span style={styles.readInfo}>
                    <HiClock size={14} /> {frontmatter.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Tags */}
        {frontmatter.tags && (
          <div style={styles.tags}>
            {frontmatter.tags.map(tag => (
              <span key={tag} style={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={styles.content}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={styles.related}>
            <h2 style={styles.relatedTitle}>Related Articles</h2>
            <div style={styles.relatedGrid}>
              {relatedPosts.map(rp => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

const styles = {
  page: {
    padding: '2rem 0 4rem',
  },
  container: {
    maxWidth: '780px',
  },
  notFound: {
    padding: '6rem 0',
    textAlign: 'center',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '2rem',
    textDecoration: 'none',
    transition: 'color 150ms ease',
  },
  header: {
    marginBottom: '2rem',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  dot: {
    color: 'var(--text-muted)',
    fontSize: '0.75rem',
  },
  metaText: {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
    marginBottom: '1rem',
  },
  excerpt: {
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  authorAvatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#fff',
  },
  authorName: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  readInfo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  tags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  tag: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontWeight: 500,
  },
  content: {
    paddingBottom: '3rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  related: {
    marginTop: '3rem',
  },
  relatedTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.25rem',
  },
}
