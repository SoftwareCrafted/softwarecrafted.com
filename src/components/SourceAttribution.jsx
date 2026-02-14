export default function SourceAttribution({ sourceTitle, sourceUrl, sourceLicense }) {
  if (!sourceTitle || !sourceUrl || !sourceLicense) return null

  return (
    <aside style={styles.wrap} aria-label="Creative Commons source attribution">
      <p style={styles.label}><i className="fa-regular fa-copyright fa-icon" /> Source Attribution (Creative Commons)</p>
      <p style={styles.body}>
        This article is adapted from <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{sourceTitle}</a> and shared under {sourceLicense}.
      </p>
    </aside>
  )
}

const styles = {
  wrap: {
    margin: 'var(--sp-8) 0 var(--sp-4)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-subtle)',
    background: 'var(--bg-secondary)',
    padding: 'var(--sp-4)',
  },
  label: { fontSize: 'var(--text-sm)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'var(--sp-2)' },
  body: { color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' },
}
