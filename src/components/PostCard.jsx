import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import CategoryBadge from './CategoryBadge'
import { trackEvent } from '../utils/analytics'
import './PostCard.css'

const FORMAT_LABELS = {
  'qa': 'Q&A', 'how-to': 'How-To', 'interview': 'Interview',
  'news': 'News', 'listicle': 'List', 'longform': 'Feature',
}

export default function PostCard({ post, variant = 'default', position = 0 }) {
  const { slug, frontmatter } = post
  const { title, excerpt, lead_answer, date, category, author, readTime, format: fmt } = frontmatter
  const formatLabel = FORMAT_LABELS[fmt]
  const onClick = () => trackEvent('card_click', { slug, position, variant })

  if (variant === 'hero-lead') {
    return (
      <article className="sc-card sc-card--hero-lead">
        <div className="sc-card__image-wrap sc-card__image-wrap--hero">
          <div className="sc-card__image-placeholder"><span className="sc-card__placeholder-code">{'</>'}</span></div>
        </div>
        <div className="sc-card__body sc-card__body--hero">
          <div className="sc-card__meta">
            <CategoryBadge category={category} size="lg" />
            {formatLabel && <span className="sc-card__format-badge">{formatLabel}</span>}
          </div>
          <Link to={`/blog/${slug}`} className="sc-card__title-link" onClick={onClick}>
            <h2 className="sc-card__title sc-card__title--hero">{title}</h2>
          </Link>
          {(lead_answer || excerpt) && <p className="sc-card__excerpt">{lead_answer || excerpt}</p>}
          <div className="sc-card__bottom">
            <div className="sc-card__author-row">
              <div className="sc-card__avatar">{author?.[0] || 'S'}</div>
              <span className="sc-card__author-name">{author || 'SoftwareCrafted'}</span>
            </div>
            <div className="sc-card__meta-right">
              <time className="sc-card__date">{format(new Date(date), 'MMM d, yyyy')}</time>
              {readTime && <><span className="sc-card__dot">·</span><span className="sc-card__read-time">{readTime}</span></>}
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'hero-side') {
    return (
      <article className="sc-card sc-card--hero-side">
        <Link to={`/blog/${slug}`} className="sc-card__title-link" onClick={onClick}>
          <div className="sc-card__meta"><CategoryBadge category={category} />
            {formatLabel && <span className="sc-card__format-badge">{formatLabel}</span>}
          </div>
          <h3 className="sc-card__title sc-card__title--side">{title}</h3>
          <div className="sc-card__meta-row">
            <time className="sc-card__date">{format(new Date(date), 'MMM d')}</time>
            {readTime && <><span className="sc-card__dot">·</span><span className="sc-card__read-time">{readTime}</span></>}
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="sc-card sc-card--compact">
        <Link to={`/blog/${slug}`} className="sc-card__title-link sc-card--compact-inner" onClick={onClick}>
          <span className="sc-card__compact-rank">{String(position + 1).padStart(2, '0')}</span>
          <div>
            <h4 className="sc-card__title sc-card__title--compact">{title}</h4>
            <div className="sc-card__meta-row">
              <CategoryBadge category={category} />
              <span className="sc-card__dot">·</span>
              <time className="sc-card__date">{format(new Date(date), 'MMM d')}</time>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="sc-card sc-card--default">
      <div className="sc-card__image-wrap">
        <div className="sc-card__image-placeholder"><span className="sc-card__placeholder-code">{'</>'}</span></div>
      </div>
      <div className="sc-card__body">
        <div className="sc-card__meta">
          <CategoryBadge category={category} />
          {formatLabel && <span className="sc-card__format-badge">{formatLabel}</span>}
        </div>
        <Link to={`/blog/${slug}`} className="sc-card__title-link" onClick={onClick}>
          <h3 className="sc-card__title">{title}</h3>
        </Link>
        {(lead_answer || excerpt) && <p className="sc-card__excerpt sc-card__excerpt--sm">{lead_answer || excerpt}</p>}
        <div className="sc-card__bottom">
          <span className="sc-card__author-name">{author || 'SoftwareCrafted'}</span>
          <div className="sc-card__meta-right">
            <time className="sc-card__date">{format(new Date(date), 'MMM d')}</time>
            {readTime && <><span className="sc-card__dot">·</span><span className="sc-card__read-time">{readTime}</span></>}
          </div>
        </div>
      </div>
    </article>
  )
}
