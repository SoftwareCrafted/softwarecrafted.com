import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import { format } from 'date-fns'
import posts from 'virtual:blog-posts'
import CategoryBadge from '../components/CategoryBadge'
import PostCard from '../components/PostCard'
import AuthorCard from '../components/AuthorCard'
import AISnippet from '../components/AISnippet'
import FAQBlock from '../components/FAQBlock'
import BreadcrumbNav from '../components/BreadcrumbNav'
import RelatedTopics from '../components/RelatedTopics'
import SchemaMarkup from '../components/SchemaMarkup'
import { articleSchema, qaSchema, faqSchema, breadcrumbSchema } from '../utils/schema'
import { getCategoryMeta } from '../data/categories'
import { HiArrowLeft, HiClock, HiShare } from 'react-icons/hi'
import { trackEvent } from '../utils/analytics'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0' }}>The article you're looking for doesn't exist.</p>
        <Link to="/blog" style={s.backLink}><HiArrowLeft /> Back to Blog</Link>
      </div>
    )
  }

  const { frontmatter, content } = post
  const htmlContent = marked(content)
  const catMeta = getCategoryMeta(frontmatter.category)
  const relatedPosts = posts.filter(p => p.slug !== slug && p.frontmatter.category === frontmatter.category).slice(0, 3)

  const crumbs = [
    { name: 'Home', url: '/' },
    { name: catMeta.fullLabel, url: `/category/${frontmatter.category}` },
    { name: frontmatter.title },
  ]

  const schemas = [
    articleSchema(post),
    breadcrumbSchema(crumbs),
    frontmatter.format === 'qa' ? qaSchema(post) : null,
    frontmatter.faqs ? faqSchema(frontmatter.faqs) : null,
  ].filter(Boolean)

  function handleShare() {
    const url = window.location.href
    if (navigator.share) { navigator.share({ title: frontmatter.title, url }) }
    else { navigator.clipboard.writeText(url) }
    trackEvent('share_click', { slug, method: navigator.share ? 'native' : 'clipboard' })
  }

  return (
    <article style={s.page}>
      {schemas.map((schema, i) => <SchemaMarkup key={i} schema={schema} />)}

      <div className="container" style={s.container}>
        <BreadcrumbNav items={crumbs} />

        {/* Article Header */}
        <header style={s.header}>
          <div style={s.metaRow}>
            <CategoryBadge category={frontmatter.category} size="lg" />
            {frontmatter.format && (
              <span style={s.formatBadge}>{frontmatter.format.toUpperCase()}</span>
            )}
            <time style={s.date}>{format(new Date(frontmatter.date), 'MMMM d, yyyy')}</time>
          </div>

          <h1 style={s.title}>{frontmatter.title}</h1>

          {frontmatter.excerpt && <p style={s.excerpt}>{frontmatter.excerpt}</p>}

          <div style={s.authorBar}>
            <AuthorCard authorName={frontmatter.author} compact />
            <div style={s.authorBarRight}>
              {frontmatter.readTime && (
                <span style={s.readTime}><HiClock size={14} /> {frontmatter.readTime}</span>
              )}
              <button onClick={handleShare} style={s.shareBtn} aria-label="Share article">
                <HiShare size={16} /> Share
              </button>
            </div>
          </div>
        </header>

        {/* AI-friendly TL;DR */}
        <AISnippet leadAnswer={frontmatter.lead_answer} tldr={frontmatter.tldr} />

        {/* Article Content */}
        <div className="post-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* FAQ Block (if present) */}
        {frontmatter.faqs && <FAQBlock faqs={frontmatter.faqs} />}

        {/* Related Topics */}
        <RelatedTopics tags={frontmatter.tags} />

        {/* Author Card (full) */}
        <div style={s.authorSection}>
          <h3 style={s.authorSectionTitle}>About the Author</h3>
          <AuthorCard authorName={frontmatter.author} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section style={s.related}>
            <h2 style={s.relatedTitle}>Related Articles</h2>
            <div style={s.relatedGrid}>
              {relatedPosts.map((rp, i) => <PostCard key={rp.slug} post={rp} position={i} />)}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

const s = {
  page: { padding: 'var(--sp-4) 0 var(--sp-16)' },
  container: { maxWidth: 'var(--container-article)' },
  backLink: { display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 'var(--text-sm)', textDecoration: 'none' },
  header: { marginBottom: 'var(--sp-8)' },
  metaRow: { display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' },
  formatBadge: {
    fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em',
    color: 'var(--accent-cta)', background: 'var(--accent-subtle)',
    border: '1px solid var(--accent-border)', padding: '1px 6px', borderRadius: 'var(--radius-sm)',
  },
  date: { color: 'var(--text-muted)', fontSize: 'var(--text-sm)' },
  title: { fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: 'var(--sp-4)' },
  excerpt: { fontSize: 'var(--text-xl)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--sp-6)' },
  authorBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: 'var(--sp-4) 0', borderTop: '1px solid var(--border-subtle)',
    borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: 'var(--sp-3)',
  },
  authorBarRight: { display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' },
  readTime: { display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' },
  shareBtn: {
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '6px 12px', borderRadius: 'var(--radius-md)',
    background: 'var(--surface)', border: '1px solid var(--border-default)',
    color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 500,
  },
  authorSection: { marginTop: 'var(--sp-10)' },
  authorSectionTitle: { fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--sp-4)', color: 'var(--text-muted)' },
  related: { marginTop: 'var(--sp-12)' },
  relatedTitle: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--sp-5)' },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-4)' },
}
