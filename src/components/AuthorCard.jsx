import authors from '../data/authors'

export default function AuthorCard({ authorName, compact = false }) {
  const data = authors[authorName] || authors['SoftwareCrafted']
  const initials = data.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <div style={styles.avatarSm}>{initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{data.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{data.expertise}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{initials}</div>
      <div style={styles.info}>
        <h4 style={styles.name}>{data.name}</h4>
        <p style={styles.role}>{data.role}</p>
        <p style={styles.bio}>{data.bio}</p>
        <p style={styles.expertise}>
          <span style={{ color: 'var(--accent-cta)', fontWeight: 600 }}>Expertise:</span> {data.expertise}
        </p>
      </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex', gap: 'var(--sp-5)', padding: 'var(--sp-6)',
    background: 'var(--surface)', border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)',
  },
  avatar: {
    width: 56, height: 56, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, var(--accent), var(--accent-cyan))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.1rem', fontWeight: 700, color: '#fff',
  },
  avatarSm: {
    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
    background: 'linear-gradient(135deg, var(--accent), var(--accent-cyan))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.75rem', fontWeight: 700, color: '#fff',
  },
  info: { flex: 1 },
  name: { fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 2 },
  role: { fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-2)' },
  bio: { fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--sp-2)' },
  expertise: { fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' },
}
