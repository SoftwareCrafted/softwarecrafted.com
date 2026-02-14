const PUBLISHER = {
  '@type': 'Organization',
  name: 'SoftwareCrafted',
  url: 'https://softwarecrafted.com',
  logo: { '@type': 'ImageObject', url: 'https://softwarecrafted.com/favicon.svg', width: 64, height: 64 },
}

export function articleSchema(post) {
  const { frontmatter, slug } = post
  const type = frontmatter.format === 'news' ? 'NewsArticle' : 'BlogPosting'
  return {
    '@context': 'https://schema.org', '@type': type,
    headline: frontmatter.title,
    description: frontmatter.excerpt || frontmatter.lead_answer || '',
    image: frontmatter.image || 'https://softwarecrafted.com/favicon.svg',
    author: { '@type': 'Person', name: frontmatter.author || 'SoftwareCrafted' },
    publisher: PUBLISHER,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated || frontmatter.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://softwarecrafted.com/#/blog/${slug}` },
    articleSection: frontmatter.category,
  }
}

export function howToSchema(post) {
  const { frontmatter } = post
  if (frontmatter.format !== 'how-to' || !frontmatter.steps) return null
  return {
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: frontmatter.title, description: frontmatter.excerpt,
    totalTime: frontmatter.estimatedTime || frontmatter.readTime,
    step: frontmatter.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.description || s.title })),
  }
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }
}

export function qaSchema(post) {
  const { frontmatter } = post
  if (frontmatter.format !== 'qa') return null
  return {
    '@context': 'https://schema.org', '@type': 'QAPage',
    mainEntity: { '@type': 'Question', name: frontmatter.question || frontmatter.title, answerCount: 1,
      acceptedAnswer: { '@type': 'Answer', text: frontmatter.lead_answer || frontmatter.excerpt, author: { '@type': 'Person', name: frontmatter.author || 'SoftwareCrafted' } } },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url ? `https://softwarecrafted.com${item.url}` : undefined })),
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'SoftwareCrafted', url: 'https://softwarecrafted.com',
    description: 'Expert insights on software development, testing, cybersecurity, AI, and tech news.',
    publisher: PUBLISHER,
  }
}
