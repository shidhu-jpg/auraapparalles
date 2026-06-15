import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Aura Apparels — Fresh Fashion, Fair Swaps',
  description: 'Shop the latest fashion at Aura Apparels. Quality clothing at unbeatable prices.',
  openGraph: {
    title: 'Aura Apparels',
    description: 'Fresh Fashion, Fair Swaps',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col font-[var(--font-geist),system-ui,sans-serif]">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
