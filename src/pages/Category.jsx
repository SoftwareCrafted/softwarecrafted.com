import { useParams, Link } from 'react-router-dom'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import { HiArrowLeft } from 'react-icons/hi'

const categoryMeta = {
  'software-development': { title: 'Software Development', desc: 'Architecture patterns, frameworks, best practices, and modern development workflows.' },
  'software-testing': { title: 'Software Testing', desc: 'QA strategies, test automation, tools, and testing methodologies.' },
  'cybersecurity': { title: 'Cybersecurity', desc: 'Security threats, defense strategies, ethical hacking, and privacy.' },
  'artificial-intelligence': { title: 'Artificial Intelligence', desc: 'Machine learning, deep learning, LLMs, and AI-powered applications.' },
  'tech-news': { title: 'Tech News & Updates', desc: 'Breaking news and analysis from the technology industry.' },
}

export default function Category() {
  const { category } = useParams()
  const meta = categoryMeta[category] || { title: category, desc: '' }
  const filtered = posts.filter(p => p.frontmatter.category === category)

  return (
    <div style={styles.page}>
      <div className="container">
        <Link to="/blog" style={styles.backLink}>
          <HiArrowLeft /> All Posts
        </Link>

        <div style={styles.header}>
          <h1 style={styles.title}>{meta.title}</h1>
          <p style={styles.desc}>{meta.desc}</p>
          <span style={styles.count}>{filtered.length} article{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div style={styles.empty}>
            <p>No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '3rem 0' },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '1.5rem',
    textDecoration: 'none',
  },
  header: { marginBottom: '2.5rem' },
  title: {
    fontSize: '2.25rem',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '0.5rem',
  },
  desc: {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    marginBottom: '0.75rem',
  },
  count: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '1.5rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 0',
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
}
