import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiMenuAlt3, HiX, HiSearch } from 'react-icons/hi'
import categories from '../data/categories'
import posts from 'virtual:blog-posts'
import { trackEvent } from '../utils/analytics'
import './Header.css'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => { setMobileOpen(false); setSearchOpen(false) }, [location.pathname])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === '/' && !searchOpen && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return posts.filter(p =>
      p.frontmatter.title.toLowerCase().includes(q) ||
      p.frontmatter.excerpt?.toLowerCase().includes(q)
    ).slice(0, 5)
  }, [searchQuery])

  function handleSuggestionClick(slug) {
    trackEvent('search_result_click', { slug })
    setSearchOpen(false)
    setSearchQuery('')
    navigate(`/blog/${slug}`)
  }

  return (
    <>
      {/* Main Header */}
      <header className="sc-header">
        <div className="container sc-header__inner">
          <Link to="/" className="sc-header__logo">
            <span className="sc-header__logo-icon">SC</span>
            <span className="sc-header__logo-text">
              Software<span className="gradient-text">Crafted</span>
            </span>
          </Link>

          <div className="sc-header__actions">
            <button className="sc-header__search-btn" onClick={() => setSearchOpen(true)} aria-label="Search (press /)">
              <HiSearch size={18} />
              <span className="sc-header__search-hint">/</span>
            </button>
            <Link to="/about" className="sc-header__nav-link">About</Link>
            <Link to="/#newsletter" className="sc-header__cta">Subscribe</Link>
            <button className="sc-header__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Category Bar */}
      <nav className="sc-catbar" aria-label="Categories">
        <div className="container sc-catbar__inner">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`sc-catbar__link ${location.pathname === `/category/${cat.slug}` ? 'sc-catbar__link--active' : ''}`}
              onClick={() => trackEvent('category_click', { category: cat.slug })}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="sc-mobile-nav">
          <div className="container">
            {categories.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="sc-mobile-nav__link" onClick={() => setMobileOpen(false)}>
                {cat.fullLabel}
              </Link>
            ))}
            <div className="sc-mobile-nav__divider" />
            <Link to="/blog" className="sc-mobile-nav__link" onClick={() => setMobileOpen(false)}>All Articles</Link>
            <Link to="/about" className="sc-mobile-nav__link" onClick={() => setMobileOpen(false)}>About / Newsroom</Link>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="sc-search-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setSearchQuery('') } }}>
          <div className="sc-search-modal">
            <div className="sc-search-input-wrap">
              <HiSearch size={20} className="sc-search-icon" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); trackEvent('search_query', { query: e.target.value }) }}
                className="sc-search-input"
              />
              <kbd className="sc-search-esc">ESC</kbd>
            </div>
            {suggestions.length > 0 && (
              <div className="sc-search-results">
                {suggestions.map(post => (
                  <button key={post.slug} className="sc-search-result" onClick={() => handleSuggestionClick(post.slug)}>
                    <span className="sc-search-result__title">{post.frontmatter.title}</span>
                    <span className="sc-search-result__excerpt">{post.frontmatter.excerpt?.slice(0, 80)}...</span>
                  </button>
                ))}
              </div>
            )}
            {searchQuery && suggestions.length === 0 && (
              <div className="sc-search-empty">No articles found for "{searchQuery}"</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
