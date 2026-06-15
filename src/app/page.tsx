import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import HeroBanner from '@/components/HeroBanner'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data: products, error } = await query

  const { data: catRows } = await supabase
    .from('products')
    .select('category')
    .eq('is_active', true)
    .not('category', 'is', null)

  const categories = ['All', ...Array.from(
    new Set(catRows?.map(r => r.category).filter(Boolean) as string[])
  )]

  if (error) {
    return (
      <main className="container mx-auto px-4 py-20 text-center text-red-500">
        Failed to load products. Please try again later.
      </main>
    )
  }

  const saleProducts = products?.filter(p => p.offer_price) ?? []
  const regularProducts = products?.filter(p => !p.offer_price) ?? []

  return (
    <main>
      {/* Hero */}
      {!category && <HeroBanner />}

      {/* Category filter */}
      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>

      <div id="products" className="container mx-auto px-4 py-10">
        {!products || products.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="text-6xl mb-4">👗</div>
            <p className="text-gray-500 text-lg">
              {category ? `No products in "${category}" yet.` : 'No products available yet.'}
            </p>
            <a href="/" className="mt-4 inline-block text-brand-600 hover:underline text-sm">
              View all products →
            </a>
          </div>
        ) : (
          <>
            {/* Sale section */}
            {!category && saleProducts.length > 0 && (
              <section className="mb-14">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">🔥 On Sale</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent" />
                  <a href="/?category=All" className="text-xs font-semibold text-brand-600 hover:underline whitespace-nowrap">
                    View All →
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {saleProducts.slice(0, 4).map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* All / filtered products */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {category ? category : '✨ All Products'}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                <span className="text-xs text-gray-400 font-medium">{products.length} items</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {(category ? products : regularProducts).map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </section>

            {/* Mid-page sale banner */}
            {!category && (
              <div className="my-16 rounded-3xl overflow-hidden bg-gray-950 relative animate-fade-in-up">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
                </div>
                <div className="relative text-center py-14 px-6">
                  <p className="text-brand-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
                    Limited Time
                  </p>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Up to <span className="gradient-text">50% Off</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                    On selected women&apos;s and men&apos;s styles. While stocks last.
                  </p>
                  <a
                    href="/?category=Women"
                    className="inline-block bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-full text-sm tracking-wider transition-all hover:shadow-lg hover:shadow-brand-500/30"
                  >
                    Shop the Sale
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
