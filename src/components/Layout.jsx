import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ minHeight: 'calc(100vh - var(--header-height) - 200px)' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
