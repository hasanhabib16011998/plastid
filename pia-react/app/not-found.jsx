'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center bg-alabaster pt-32 pb-24 text-center">
        <div className="container-pia max-w-xl">
          <h1 className="font-serif text-7xl sm:text-8xl font-bold text-brass mb-4 leading-none">
            404
          </h1>
          <h2 className="font-serif text-3xl font-semibold text-obsidian mb-4">
            Page Not Found
          </h2>
          <p className="text-ink text-base mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn-one">
            Back to Home <ChevronRight size={14} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
