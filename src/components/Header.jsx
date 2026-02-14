import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/about', label: 'About' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>SC</span>
          <span style={styles.logoText}>
            Software<span style={styles.logoAccent}>Crafted</span>
          </span>
        </Link>

        <nav style={styles.desktopNav}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === link.path ? styles.navLinkActive : {}),
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          style={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav style={styles.mobileNav}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                ...styles.mobileNavLink,
                ...(location.pathname === link.path ? styles.navLinkActive : {}),
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 14, 26, 0.85)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border-subtle)',
    height: 'var(--header-height)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: 'var(--text-primary)',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700,
    fontSize: '0.875rem',
    color: '#fff',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  logoAccent: {
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  desktopNav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: 'var(--text-secondary)',
    fontWeight: 500,
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'color 150ms ease',
    position: 'relative',
  },
  navLinkActive: {
    color: 'var(--text-primary)',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-subtle)',
    padding: '1rem 1.5rem',
  },
  mobileNavLink: {
    color: 'var(--text-secondary)',
    fontWeight: 500,
    fontSize: '1rem',
    textDecoration: 'none',
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--border-subtle)',
  },
}

// Add responsive styles via CSS
const mobileStyles = document.createElement('style')
mobileStyles.textContent = `
  @media (max-width: 768px) {
    header nav:first-of-type { display: none !important; }
    header button[aria-label="Toggle menu"] { display: block !important; }
  }
  @media (min-width: 769px) {
    header nav:last-of-type { display: none !important; }
  }
`
document.head.appendChild(mobileStyles)
