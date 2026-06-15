import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/supabase/types'

function formatPrice(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  const primary = product.product_images?.find(i => i.is_primary) ?? product.product_images?.[0]
  const secondary = product.product_images?.find(i => !i.is_primary)
  const isOutOfStock = product.stock === 0
  const displayPrice = product.offer_price ?? product.price
  const delay = `${(index % 8) * 80}ms`

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {/* Primary image */}
          {primary ? (
            <Image
              src={primary.image_url}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 ${secondary ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Secondary image (hover swap) */}
          {secondary && (
            <Image
              src={secondary.image_url}
              alt={product.name}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Offer badge */}
          {product.offer_percentage && product.offer_percentage > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                {product.offer_percentage}% OFF
              </span>
            </div>
          )}

          {/* NEW badge for items with stock > 10 (proxy for new) */}
          {!product.offer_percentage && product.stock >= 15 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-brand-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                NEW
              </span>
            </div>
          )}

          {/* Quick view — slides up on hover */}
          {!isOutOfStock && (
            <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <div className="bg-gray-900/95 backdrop-blur-sm text-white text-[11px] font-bold text-center py-3 tracking-[0.15em] uppercase">
                Quick View
              </div>
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-1.5 flex-1">
          {product.category && (
            <span className="text-[10px] font-semibold text-brand-600 uppercase tracking-[0.2em]">
              {product.category}
            </span>
          )}

          <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
            {product.name}
          </p>

          {/* Price row */}
          <div className="mt-auto pt-2 flex items-baseline gap-2">
            <span className="text-base font-black text-gray-900">{formatPrice(displayPrice)}</span>
            {product.offer_price && (
              <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          {/* Size chips */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-1 flex-wrap mt-1">
              {product.sizes.slice(0, 5).map(size => (
                <span key={size} className="text-[9px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded group-hover:border-brand-300 group-hover:text-brand-600 transition-colors duration-200">
                  {size}
                </span>
              ))}
              {product.sizes.length > 5 && (
                <span className="text-[9px] text-gray-400">+{product.sizes.length - 5}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
