function extractInfographicNodes(content) {
  const lines = content.split('\n')
  const sections = []
  let current = null

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (current) sections.push(current)
      current = { title: line.replace('## ', '').trim(), points: [] }
      return
    }

    if (!current) return

    const bullet = line.match(/^[-*]\s+(.+)/)
    if (bullet && current.points.length < 3) {
      current.points.push(bullet[1].replace(/\*\*/g, ''))
    }
  })

  if (current) sections.push(current)
  return sections.slice(0, 4)
}

export default function Infographic({ post }) {
  const nodes = extractInfographicNodes(post.content)
  if (!nodes.length) return null

  return (
    <section style={styles.wrap} aria-label="Article infographic">
      <div style={styles.header}>
        <h3 style={styles.title}><span className="material-symbols-outlined">monitoring</span> Infographic</h3>
        <p style={styles.sub}>Visual breakdown of the full article flow.</p>
      </div>
      <div style={styles.grid}>
        {nodes.map((node, idx) => (
          <article key={node.title} style={styles.card}>
            <p style={styles.step}>Step {idx + 1}</p>
            <h4 style={styles.cardTitle}>{node.title}</h4>
            <ul style={styles.list}>
              {node.points.length ? node.points.map((point) => <li key={point}>{point}</li>) : <li>See the section for detailed guidance.</li>}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

const styles = {
  wrap: {
    margin: 'var(--sp-10) 0',
    padding: 'var(--sp-6)',
    background: 'var(--surface)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-default)',
    boxShadow: 'var(--shadow-card)',
  },
  header: { marginBottom: 'var(--sp-4)' },
  title: { display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)' },
  sub: { color: 'var(--text-muted)', marginTop: 6 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--sp-4)' },
  card: { border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--sp-4)', background: 'var(--bg-primary)' },
  step: { color: 'var(--accent-cta)', fontWeight: 700, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  cardTitle: { margin: '6px 0 8px', fontSize: 'var(--text-lg)' },
  list: { paddingLeft: '1rem', listStyle: 'disc', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' },
}
