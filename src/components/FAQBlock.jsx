import { useState } from 'react'
import { trackEvent } from '../utils/analytics'
import { HiChevronDown } from 'react-icons/hi'

export default function FAQBlock({ faqs }) {
  if (!faqs?.length) return null

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Frequently Asked Questions</h2>
      {faqs.map((faq, i) => (
        <FAQItem key={i} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ ...styles.item, borderColor: open ? 'var(--accent-border)' : 'var(--border-default)' }}>
      <button
        style={styles.trigger}
        onClick={() => { setOpen(!open); if (!open) trackEvent('faq_expand', { question }) }}
        aria-expanded={open}
      >
        <span style={styles.question}>{question}</span>
        <HiChevronDown size={18} style={{ ...styles.chevron, transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && <div style={styles.answer}>{answer}</div>}
    </div>
  )
}

const styles = {
  section: { margin: 'var(--sp-10) 0' },
  heading: { fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-5)' },
  item: {
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--sp-3)',
    overflow: 'hidden',
    transition: 'border-color var(--duration-base) ease',
  },
  trigger: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: 'var(--sp-4) var(--sp-5)',
    background: 'none', border: 'none', color: 'var(--text-primary)',
    textAlign: 'left', cursor: 'pointer',
  },
  question: { fontSize: 'var(--text-base)', fontWeight: 600 },
  chevron: { color: 'var(--text-muted)', transition: 'transform var(--duration-base) ease', flexShrink: 0 },
  answer: {
    padding: '0 var(--sp-5) var(--sp-5)',
    fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6,
  },
}
