import { Link } from 'react-router-dom'
import { HiCode, HiShieldCheck, HiChip, HiBeaker, HiNewspaper, HiMail } from 'react-icons/hi'

const topics = [
  { icon: HiCode, label: 'Software Development', color: '#818cf8' },
  { icon: HiBeaker, label: 'Software Testing', color: '#34d399' },
  { icon: HiShieldCheck, label: 'Cybersecurity', color: '#fb7185' },
  { icon: HiChip, label: 'Artificial Intelligence', color: '#c084fc' },
  { icon: HiNewspaper, label: 'Tech News', color: '#fbbf24' },
]

export default function About() {
  return (
    <div style={styles.page}>
      <div className="container" style={styles.container}>
        <h1 style={styles.title}>
          About <span className="gradient-text">SoftwareCrafted</span>
        </h1>

        <div style={styles.content}>
          <p style={styles.lead}>
            SoftwareCrafted is a technology blog dedicated to empowering developers,
            testers, security professionals, and tech enthusiasts with actionable
            insights and in-depth knowledge.
          </p>

          <h2 style={styles.h2}>Our Mission</h2>
          <p style={styles.text}>
            We believe that great software is crafted, not just coded. Our mission is
            to bridge the gap between theory and practice by publishing clear, well-researched
            articles that help professionals at every level build better software,
            strengthen security, and stay ahead of technology trends.
          </p>

          <h2 style={styles.h2}>What We Cover</h2>
          <div style={styles.topicGrid}>
            {topics.map(t => (
              <div key={t.label} style={styles.topicCard}>
                <t.icon size={24} style={{ color: t.color }} />
                <span style={styles.topicLabel}>{t.label}</span>
              </div>
            ))}
          </div>

          <h2 style={styles.h2}>Our Values</h2>
          <ul style={styles.list}>
            <li><strong>Accuracy First</strong> — Every article is thoroughly researched and technically verified.</li>
            <li><strong>Practical Focus</strong> — We prioritize actionable takeaways over abstract theory.</li>
            <li><strong>Community Driven</strong> — We write for the community and welcome feedback.</li>
            <li><strong>Continuous Learning</strong> — Technology evolves fast, and so do we.</li>
          </ul>

          <div style={styles.cta}>
            <h2 style={styles.h2}>Get in Touch</h2>
            <p style={styles.text}>
              Have a suggestion, want to contribute, or just want to say hello? We'd love to hear from you.
            </p>
            <a
              href="https://github.com/SoftwareCrafted"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaBtn}
            >
              Visit us on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { padding: '3rem 0 5rem' },
  container: { maxWidth: '780px' },
  title: {
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    marginBottom: '2.5rem',
  },
  content: {},
  lead: {
    fontSize: '1.2rem',
    lineHeight: 1.7,
    color: 'var(--text-secondary)',
    marginBottom: '2.5rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid var(--border-subtle)',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    marginTop: '2.5rem',
  },
  text: {
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    marginBottom: '1rem',
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  topicCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
    background: 'var(--bg-card)',
    borderRadius: '10px',
    border: '1px solid var(--border-subtle)',
  },
  topicLabel: {
    fontWeight: 600,
    fontSize: '0.95rem',
  },
  list: {
    paddingLeft: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
    lineHeight: 1.6,
  },
  cta: {
    marginTop: '3rem',
    padding: '2rem',
    background: 'var(--bg-card)',
    borderRadius: '16px',
    border: '1px solid var(--border-subtle)',
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.7rem 1.5rem',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    marginTop: '0.5rem',
  },
}
