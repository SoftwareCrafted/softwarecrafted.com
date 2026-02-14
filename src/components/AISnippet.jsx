export default function AISnippet({ leadAnswer, tldr }) {
  const text = leadAnswer || tldr
  if (!text) return null

  return (
    <div id="ai-summary" style={styles.wrap} role="complementary" aria-label="Quick summary">
      <div style={styles.header}>
        <span style={styles.icon}>TL;DR</span>
      </div>
      <p style={styles.text}>{text}</p>
    </div>
  )
}

const styles = {
  wrap: {
    background: 'var(--accent-subtle)',
    border: '1px solid var(--accent-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--sp-5) var(--sp-6)',
    marginBottom: 'var(--sp-8)',
  },
  header: { marginBottom: 'var(--sp-2)' },
  icon: {
    fontSize: 'var(--text-xs)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--accent-cta)',
    background: 'var(--accent-border)',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
  },
  text: {
    fontSize: 'var(--text-base)',
    color: 'var(--text-primary)',
    lineHeight: 1.6,
    fontWeight: 500,
  },
}
