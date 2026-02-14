import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter, FaLinkedin, FaRss } from 'react-icons/fa'

const categories = [
  { label: 'Software Development', slug: 'software-development' },
  { label: 'Software Testing', slug: 'software-testing' },
  { label: 'Cybersecurity', slug: 'cybersecurity' },
  { label: 'Artificial Intelligence', slug: 'artificial-intelligence' },
  { label: 'Tech News', slug: 'tech-news' },
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          <div style={styles.brand}>
            <div style={styles.logoRow}>
              <span style={styles.logoIcon}>SC</span>
              <span style={styles.logoText}>
                Software<span className="gradient-text">Crafted</span>
              </span>
            </div>
            <p style={styles.tagline}>
              Where Code Meets Craft. Expert insights on software development,
              testing, cybersecurity, AI, and the latest in tech.
            </p>
            <div style={styles.socials}>
              <a href="https://github.com/SoftwareCrafted" style={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} />
              </a>
              <a href="#" style={styles.socialLink} aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" style={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" style={styles.socialLink} aria-label="RSS">
                <FaRss size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={styles.heading}>Categories</h4>
            <ul style={styles.list}>
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} style={styles.link}>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={styles.heading}>Quick Links</h4>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/blog" style={styles.link}>All Posts</Link></li>
              <li><Link to="/about" style={styles.link}>About</Link></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            &copy; {new Date().getFullYear()} SoftwareCrafted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-subtle)',
    padding: '4rem 0 2rem',
    marginTop: '5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '3rem',
  },
  brand: {
    maxWidth: '360px',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    fontSize: '0.8rem',
    color: '#fff',
  },
  logoText: {
    fontSize: '1.15rem',
    fontWeight: 700,
  },
  tagline: {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    transition: 'all 250ms ease',
    textDecoration: 'none',
  },
  heading: {
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.65rem',
  },
  link: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'color 150ms ease',
  },
  bottom: {
    marginTop: '3rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border-subtle)',
    textAlign: 'center',
  },
  copyright: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
}

// Responsive footer
const footerResponsive = document.createElement('style')
footerResponsive.textContent = `
  @media (max-width: 768px) {
    footer > div > div:first-child {
      grid-template-columns: 1fr !important;
    }
  }
`
document.head.appendChild(footerResponsive)
