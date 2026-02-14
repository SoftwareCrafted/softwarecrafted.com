import { Link } from 'react-router-dom'
import categories from '../data/categories'
import authors from '../data/authors'
import AuthorCard from '../components/AuthorCard'
import BreadcrumbNav from '../components/BreadcrumbNav'

export default function About() {
  const teamMembers = Object.keys(authors)

  return (
    <div style={s.page}>
      <div className="container" style={s.container}>
        <BreadcrumbNav items={[{ name: 'Home', url: '/' }, { name: 'About' }]} />

        <h1 style={s.title}>
          About <span className="gradient-text">SoftwareCrafted</span>
        </h1>

        <p style={s.lead}>
          SoftwareCrafted is a technology publication dedicated to delivering actionable,
          in-depth coverage of software engineering, quality assurance, cybersecurity,
          artificial intelligence, and the evolving tech landscape.
        </p>

        <section style={s.section}>
          <h2 style={s.h2}>Our Editorial Mission</h2>
          <p style={s.text}>
            We exist to bridge the gap between theory and practice. Every article is
            technically reviewed, clearly written, and designed to give readers something
            they can apply immediately — whether that's a new architectural pattern,
            a testing strategy, or an understanding of the latest security threat.
          </p>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>What We Cover</h2>
          <div style={s.topicGrid}>
            {categories.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} style={s.topicCard}>
                <span style={{ ...s.topicDot, background: cat.color }} />
                <div>
                  <div style={s.topicName}>{cat.fullLabel}</div>
                  <div style={s.topicDesc}>{cat.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>Our Standards</h2>
          <div style={s.standardsGrid}>
            {[
              { title: 'Technically Verified', desc: 'Code samples are tested. Claims are sourced. We verify before we publish.' },
              { title: 'Practically Focused', desc: 'Every article includes actionable takeaways — not just theory.' },
              { title: 'Editorially Independent', desc: 'Sponsored content is clearly labeled. Editorial decisions are never influenced by advertisers.' },
              { title: 'Community First', desc: 'We welcome corrections, feedback, and contributions from our readers.' },
            ].map(item => (
              <div key={item.title} style={s.standardCard}>
                <h3 style={s.standardTitle}>{item.title}</h3>
                <p style={s.standardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>The Newsroom</h2>
          <div style={s.teamGrid}>
            {teamMembers.map(name => (
              <AuthorCard key={name} authorName={name} />
            ))}
          </div>
        </section>

        <section style={s.ctaSection}>
          <h2 style={s.h2}>Get in Touch</h2>
          <p style={s.text}>
            Have a story tip, want to contribute, or need to reach our editorial team?
          </p>
          <a href="https://github.com/SoftwareCrafted" target="_blank" rel="noopener noreferrer" style={s.ctaBtn}>
            Visit us on GitHub
          </a>
        </section>
      </div>
    </div>
  )
}

const s = {
  page: { padding: 'var(--sp-6) 0 var(--sp-16)' },
  container: { maxWidth: '800px' },
  title: { fontSize: 'clamp(2rem, 4vw, var(--text-4xl))', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 'var(--sp-8)' },
  lead: { fontSize: 'var(--text-xl)', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 'var(--sp-10)', paddingBottom: 'var(--sp-8)', borderBottom: '1px solid var(--border-subtle)' },
  section: { marginBottom: 'var(--sp-10)' },
  h2: { fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--sp-4)' },
  text: { color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: 'var(--sp-3)' },
  topicGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-3)' },
  topicCard: { display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-3)', padding: 'var(--sp-4)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'inherit', transition: 'border-color var(--duration-fast) ease' },
  topicDot: { width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0 },
  topicName: { fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: 2 },
  topicDesc: { fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.4 },
  standardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' },
  standardCard: { padding: 'var(--sp-5)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' },
  standardTitle: { fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--sp-2)' },
  standardDesc: { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5 },
  teamGrid: { display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' },
  ctaSection: { padding: 'var(--sp-6)', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', padding: '10px 20px', borderRadius: 'var(--radius-md)', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', textDecoration: 'none', marginTop: 'var(--sp-2)' },
}
