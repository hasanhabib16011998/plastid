import Link from 'next/link'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="error-page-area" style={{ padding: '120px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '72px', color: '#C49B5D', fontWeight: 700, marginBottom: '20px' }}>404</h1>
          <h2 style={{ fontSize: '28px', color: '#1F2E23', marginBottom: '16px' }}>Page Not Found</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn-one">
            Back to Home<span className="flaticon-next"></span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
