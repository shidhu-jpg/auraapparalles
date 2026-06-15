import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-32 text-center">
      <p className="text-6xl font-black text-gray-900 mb-4">404</p>
      <p className="text-xl text-gray-500 mb-8">Page not found.</p>
      <Link href="/" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
        Back to Home
      </Link>
    </main>
  )
}
