/**
 * Analytics event map:
 * hero_impression, card_click, search_query, newsletter_submit,
 * faq_expand, category_click, share_click, read_progress, cta_click
 */
export function trackEvent(name, props = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, props)
  }
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${name}`, props)
  }
}
