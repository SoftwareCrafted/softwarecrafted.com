import { useState } from 'react'
import { trackEvent } from '../utils/analytics'

export default function Newsletter({ variant = 'block' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) { trackEvent('newsletter_submit', { email_domain: email.split('@')[1] }); setSubmitted(true); setEmail('') }
  }

  if (variant === 'inline') {
    return (
      <div style={s.inline}>
        {submitted ? <p style={s.inlineSuccess}>You're in! Check your inbox.</p> : (
          <form onSubmit={handleSubmit} style={s.inlineForm}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={s.inlineInput} required />
            <button type="submit" style={s.inlineBtn}>Subscribe</button>
          </form>
        )}
      </div>
    )
  }

  return (
    <section id="newsletter" style={s.section}>
      <div className="container">
        <div style={s.card}>
          <div style={s.glow} />
          <div style={s.content}>
            <i className="fa-solid fa-envelope-circle-check fa-icon" style={{ color: 'var(--accent-cta)', fontSize: 36 }} />
            <h2 style={s.title}>Get smarter about software</h2>
            <p style={s.subtitle}>Join developers, testers, and security pros getting weekly insights on software engineering, AI, and cybersecurity.</p>
            {submitted ? (
              <div style={s.success}>Welcome aboard! Look for our next issue in your inbox.</div>
            ) : (
              <form onSubmit={handleSubmit} style={s.form}>
                <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} style={s.input} required />
                <button type="submit" style={s.button}>Subscribe — it's free</button>
              </form>
            )}
            <p style={s.privacy}>No spam. Unsubscribe anytime. We respect your inbox.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const s = {
  section: { padding: 'var(--sp-12) 0' },
  card: { position: 'relative', background: 'var(--surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', padding: '48px 24px', textAlign: 'center', overflow: 'hidden' },
  glow: { position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', pointerEvents: 'none' },
  content: { position: 'relative', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-3)' },
  title: { fontSize: 'var(--text-2xl)', fontWeight: 800 },
  subtitle: { color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.5 },
  form: { display: 'flex', gap: 'var(--sp-3)', width: '100%', marginTop: 'var(--sp-2)' },
  input: { flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontFamily: 'inherit', outline: 'none' },
  button: { padding: '10px 20px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', whiteSpace: 'nowrap', fontFamily: 'inherit' },
  success: { padding: 'var(--sp-4)', borderRadius: 'var(--radius-md)', background: 'rgba(52,211,153,0.1)', color: '#34d399', fontWeight: 500, width: '100%' },
  privacy: { color: 'var(--text-muted)', fontSize: 'var(--text-xs)' },
  inline: { padding: 'var(--sp-4) 0' },
  inlineForm: { display: 'flex', gap: 'var(--sp-2)' },
  inlineInput: { flex: 1, padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', fontFamily: 'inherit', outline: 'none' },
  inlineBtn: { padding: '8px 14px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: 'var(--text-sm)', fontFamily: 'inherit' },
  inlineSuccess: { color: '#34d399', fontSize: 'var(--text-sm)', fontWeight: 500 },
}
