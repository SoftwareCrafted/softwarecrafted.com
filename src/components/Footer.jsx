import { Link } from 'react-router-dom'
import categories from '../data/categories'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="sc-footer">
      <div className="container">
        <div className="sc-footer__grid">
          <div className="sc-footer__brand">
            <div className="sc-footer__logo-row">
              <span className="sc-footer__logo-icon">SC</span>
              <span className="sc-footer__logo-text">Software<span className="gradient-text">Crafted</span></span>
            </div>
            <p className="sc-footer__tagline">Expert insights on software development, testing, cybersecurity, AI, and the latest in tech.</p>
            <div className="sc-footer__socials">
              <a href="https://github.com/SoftwareCrafted" className="sc-footer__social" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github fa-icon" /></a>
              <a href="#" className="sc-footer__social" aria-label="Twitter"><i className="fa-brands fa-x-twitter fa-icon" /></a>
              <a href="#" className="sc-footer__social" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in fa-icon" /></a>
              <a href="#" className="sc-footer__social" aria-label="RSS"><i className="fa-solid fa-rss fa-icon" /></a>
            </div>
          </div>
          <div>
            <h4 className="sc-footer__heading">Categories</h4>
            <ul className="sc-footer__list">
              {categories.map(cat => (
                <li key={cat.slug}><Link to={`/category/${cat.slug}`} className="sc-footer__link">{cat.fullLabel}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="sc-footer__heading">Company</h4>
            <ul className="sc-footer__list">
              <li><Link to="/" className="sc-footer__link">Home</Link></li>
              <li><Link to="/blog" className="sc-footer__link">All Articles</Link></li>
              <li><Link to="/about" className="sc-footer__link">About / Newsroom</Link></li>
            </ul>
          </div>
        </div>
        <div className="sc-footer__bottom">
          <p className="sc-footer__copyright">&copy; {new Date().getFullYear()} SoftwareCrafted. All rights reserved.</p>
          <p className="sc-footer__editorial">Editorially independent. Sponsored content is always labeled.</p>
        </div>
      </div>
    </footer>
  )
}
