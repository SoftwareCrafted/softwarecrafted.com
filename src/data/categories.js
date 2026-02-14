const categories = [
  { slug: 'software-development', label: 'Development', fullLabel: 'Software Development', description: 'Architecture patterns, frameworks, best practices, and modern development workflows.', color: 'var(--cat-dev)', bgColor: 'var(--cat-dev-bg)' },
  { slug: 'software-testing', label: 'QA & Testing', fullLabel: 'Software Testing', description: 'QA strategies, test automation, tools, and testing methodologies.', color: 'var(--cat-testing)', bgColor: 'var(--cat-testing-bg)' },
  { slug: 'cybersecurity', label: 'Cybersecurity', fullLabel: 'Cybersecurity', description: 'Security threats, defense strategies, ethical hacking, and privacy.', color: 'var(--cat-security)', bgColor: 'var(--cat-security-bg)' },
  { slug: 'artificial-intelligence', label: 'AI', fullLabel: 'Artificial Intelligence', description: 'Machine learning, deep learning, LLMs, and AI-powered applications.', color: 'var(--cat-ai)', bgColor: 'var(--cat-ai-bg)' },
  { slug: 'tech-news', label: 'Tech News', fullLabel: 'Tech News & Updates', description: 'Breaking news and analysis from the technology industry.', color: 'var(--cat-news)', bgColor: 'var(--cat-news-bg)' },
]

export function getCategoryMeta(slug) {
  return categories.find(c => c.slug === slug) || { slug, label: slug, fullLabel: slug, description: '', color: 'var(--text-muted)', bgColor: 'rgba(148,163,184,0.12)' }
}

export default categories
