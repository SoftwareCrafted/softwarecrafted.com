import { Link } from 'react-router-dom'
import { HiChevronRight } from 'react-icons/hi'

export default function BreadcrumbNav({ items }) {
  return (
    <nav aria-label="Breadcrumb" style={styles.nav}>
      {items.map((item, i) => (
        <span key={i} style={styles.item}>
          {i > 0 && <HiChevronRight size={12} style={styles.sep} />}
          {item.url ? (
            <Link to={item.url} style={styles.link}>{item.name}</Link>
          ) : (
            <span style={styles.current}>{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--sp-5)' },
  item: { display: 'flex', alignItems: 'center' },
  sep: { color: 'var(--text-muted)', margin: '0 var(--sp-2)' },
  link: { color: 'var(--text-muted)', fontSize: 'var(--text-xs)', textDecoration: 'none', fontWeight: 500 },
  current: { color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 },
}
