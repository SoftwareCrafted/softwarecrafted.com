import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { trackEvent } from '../utils/analytics'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    trackEvent('page_view', { page_path: pathname })
  }, [pathname])

  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - var(--header-height) - var(--category-bar-height) - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
