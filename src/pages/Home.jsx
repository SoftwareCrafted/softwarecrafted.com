import { Link } from 'react-router-dom'
import posts from 'virtual:blog-posts'
import PostCard from '../components/PostCard'
import Newsletter from '../components/Newsletter'
import SchemaMarkup from '../components/SchemaMarkup'
import { webSiteSchema } from '../utils/schema'
import { trackEvent } from '../utils/analytics'
import categories from '../data/categories'
import { HiArrowRight } from 'react-icons/hi'
import './Home.css'

export default function Home() {
  const heroLead = posts[0]
  const heroSide = posts.slice(1, 4)
  const latest = posts.slice(4)
  const trending = [...posts].sort(() => 0.5 - Math.random()).slice(0, 5) // simulated trending

  return (
    <>
      <SchemaMarkup schema={webSiteSchema()} />

      {/* ── Hero Cluster ── */}
      <section className="sc-hero" aria-label="Featured articles">
        <div className="container sc-hero__grid">
          {heroLead && (
            <div className="sc-hero__lead">
              <PostCard post={heroLead} variant="hero-lead" position={0} />
            </div>
          )}
          <div className="sc-hero__sidebar">
            <div className="sc-hero__sidebar-header">
              <span className="sc-hero__sidebar-label">Top Stories</span>
            </div>
            {heroSide.map((post, i) => (
              <PostCard key={post.slug} post={post} variant="hero-side" position={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content: Latest + Trending Rail ── */}
      <section className="sc-main-content">
        <div className="container sc-main-content__grid">

          {/* Latest articles */}
          <div className="sc-latest">
            <div className="sc-section-header">
              <h2 className="sc-section-title">Latest</h2>
              <Link to="/blog" className="sc-section-link" onClick={() => trackEvent('cta_click', { label: 'View all', location: 'latest' })}>
                View all <HiArrowRight size={14} />
              </Link>
            </div>
            <div className="sc-latest__grid">
              {latest.map((post, i) => (
                <PostCard key={post.slug} post={post} variant="default" position={i + 4} />
              ))}
            </div>
          </div>

          {/* Trending Rail */}
          <aside className="sc-trending" aria-label="Trending articles">
            <div className="sc-section-header">
              <h2 className="sc-section-title sc-section-title--sm">Trending</h2>
            </div>
            <div className="sc-trending__list">
              {trending.map((post, i) => (
                <PostCard key={post.slug} post={post} variant="compact" position={i} />
              ))}
            </div>

            {/* Inline newsletter */}
            <div className="sc-trending__newsletter">
              <p className="sc-trending__nl-title">Newsletter</p>
              <p className="sc-trending__nl-desc">Weekly engineering insights. Free.</p>
              <Newsletter variant="inline" />
            </div>
          </aside>
        </div>
      </section>

      {/* ── Category Hubs ── */}
      <section className="sc-category-hubs">
        <div className="container">
          {categories.slice(0, 3).map(cat => {
            const catPosts = posts.filter(p => p.frontmatter.category === cat.slug)
            if (catPosts.length === 0) return null
            return (
              <div key={cat.slug} className="sc-category-hub">
                <div className="sc-section-header">
                  <h2 className="sc-section-title">
                    <span style={{ color: cat.color }}>{cat.fullLabel}</span>
                  </h2>
                  <Link to={`/category/${cat.slug}`} className="sc-section-link">
                    More <HiArrowRight size={14} />
                  </Link>
                </div>
                <div className="sc-category-hub__grid">
                  {catPosts.slice(0, 3).map((post, i) => (
                    <PostCard key={post.slug} post={post} variant="default" position={i} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <Newsletter />
    </>
  )
}
