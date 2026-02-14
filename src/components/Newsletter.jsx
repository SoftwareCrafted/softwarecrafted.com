import { useState } from 'react'
import { HiMail } from 'react-icons/hi'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.card}>
          <div style={styles.glow} />
          <div style={styles.content}>
            <HiMail size={40} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={styles.title}>Stay in the Loop</h2>
            <p style={styles.subtitle}>
              Get the latest articles on software development, cybersecurity, AI, and more
              delivered straight to your inbox.
            </p>
            {submitted ? (
              <div style={styles.success}>
                Thanks for subscribing! Stay tuned for great content.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.button}>
                  Subscribe
                </button>
              </form>
            )}
            <p style={styles.privacy}>No spam, ever. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
  },
  card: {
    position: 'relative',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-light)',
    borderRadius: '20px',
    padding: '3.5rem 2rem',
    textAlign: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    maxWidth: '520px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 800,
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    width: '100%',
    marginTop: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
  },
  button: {
    padding: '0.75rem 1.75rem',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'opacity 200ms ease, transform 200ms ease',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  success: {
    padding: '1rem',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#34d399',
    fontWeight: 500,
    width: '100%',
  },
  privacy: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
}
