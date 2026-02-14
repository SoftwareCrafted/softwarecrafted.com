import { Link } from 'react-router-dom'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import Newsletter from '../components/Newsletter'
import { HiCode, HiShieldCheck, HiChip, HiBeaker, HiNewspaper, HiArrowRight } from 'react-icons/hi'

const categories = [
  { slug: 'software-development', label: 'Software Development', icon: HiCode, color: '#818cf8', desc: 'Best practices, architecture, and modern frameworks' },
  { slug: 'software-testing', label: 'Software Testing', icon: HiBeaker, color: '#34d399', desc: 'QA strategies, automation, and testing tools' },
  { slug: 'cybersecurity', label: 'Cybersecurity', icon: HiShieldCheck, color: '#fb7185', desc: 'Security insights, threats, and defense strategies' },
  { slug: 'artificial-intelligence', label: 'Artificial Intelligence', icon: HiChip, color: '#c084fc', desc: 'Machine learning, LLMs, and AI applications' },
  { slug: 'tech-news', label: 'Tech News', icon: HiNewspaper, color: '#fbbf24', desc: 'Latest updates from the tech industry' },
]

export default function Home() {
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroGlow2} />
        <div className="container" style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Tech Blog
          </div>
          <h1 style={styles.heroTitle}>
            Where <span className="gradient-text">Code</span> Meets{' '}
            <span className="gradient-text">Craft</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Expert insights on software development, testing, cybersecurity,
            artificial intelligence, and the latest in technology.
          </p>
          <div style={styles.heroCTA}>
            <Link to="/blog" style={styles.primaryBtn}>
              Explore Articles <HiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/about" style={styles.secondaryBtn}>
              About Us
            </Link>
          </div>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{posts.length}+</span>
              <span style={styles.statLabel}>Articles</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>5</span>
              <span style={styles.statLabel}>Categories</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNumber}>Free</span>
              <span style={styles.statLabel}>Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section style={styles.section}>
          <div className="container">
            <h2 style={styles.sectionTitle}>Featured Post</h2>
            <PostCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Categories */}
      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Explore Topics</h2>
          <div style={styles.categoryGrid}>
            {categories.map(cat => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                style={styles.categoryCard}
                className="category-card"
              >
                <cat.icon size={28} style={{ color: cat.color }} />
                <h3 style={styles.categoryName}>{cat.label}</h3>
                <p style={styles.categoryDesc}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section style={styles.section}>
          <div className="container">
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Recent Articles</h2>
              <Link to="/blog" style={styles.viewAll}>
                View all <HiArrowRight />
              </Link>
            </div>
            <div style={styles.postsGrid}>
              {recentPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}

const styles = {
  hero: {
    position: 'relative',
    padding: '6rem 0 4rem',
    overflow: 'hidden',
    textAlign: 'center',
  },
  heroGlow: {
    position: 'absolute',
    top: '-200px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroGlow2: {
    position: 'absolute',
    top: '-100px',
    right: '-200px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 1rem',
    borderRadius: '50px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    color: '#818cf8',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#6366f1',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    marginBottom: '1.25rem',
    maxWidth: '700px',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: 'var(--text-secondary)',
    maxWidth: '560px',
    lineHeight: 1.6,
    marginBottom: '2rem',
  },
  heroCTA: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.8rem 1.75rem',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'opacity 200ms ease, transform 200ms ease',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.8rem 1.75rem',
    borderRadius: '10px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-light)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'border-color 200ms ease',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'var(--border-light)',
  },
  section: {
    padding: '3rem 0',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 800,
    marginBottom: '2rem',
    letterSpacing: '-0.02em',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  viewAll: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--text-accent)',
    fontWeight: 500,
    fontSize: '0.95rem',
    textDecoration: 'none',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.25rem',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1.5rem',
    background: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px solid var(--border-subtle)',
    textDecoration: 'none',
    transition: 'border-color 250ms ease, transform 250ms ease',
  },
  categoryName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  categoryDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
}

// Add hover styles for category cards
const catHover = document.createElement('style')
catHover.textContent = `
  .category-card:hover {
    border-color: rgba(99, 102, 241, 0.3) !important;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    div[style*="repeat(auto-fill, minmax(340px"] {
      grid-template-columns: 1fr !important;
    }
  }
`
document.head.appendChild(catHover)
