'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Product, ProductImage } from '@/lib/supabase/types'
import { useCart } from '@/context/CartContext'

function formatPrice(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addItem } = useCart()

  const [product, setProduct] = useState<(Product & { product_images: ProductImage[] }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (!data) { router.replace('/'); return }

      const sorted = { ...data, product_images: [...(data.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order) }
      setProduct(sorted)
      setLoading(false)
    }
    load()
  }, [id, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) return null

  const images = product.product_images
  const primaryImg = images.find(i => i.is_primary) ?? images[0]
  const currentImg = images[selectedImage] ?? primaryImg
  const displayPrice = product.offer_price ?? product.price

  function handleAddToCart() {
    if (product!.sizes.length > 0 && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem({
      product_id: product!.id,
      name: product!.name,
      price: displayPrice,
      size: selectedSize || 'One Size',
      quantity: qty,
      image_url: currentImg?.image_url ?? '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link href={`/?category=${product.category}`} className="hover:text-brand-600">{product.category}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gray-100">
            {currentImg ? (
              <Image
                src={currentImg.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {product.offer_percentage && product.offer_percentage > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {product.offer_percentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-brand-500' : 'border-gray-200'
                  }`}
                >
                  <Image src={img.image_url} alt="" width={64} height={64} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-5">
          {product.category && (
            <Link href={`/?category=${product.category}`} className="text-xs font-semibold text-brand-600 uppercase tracking-wider hover:underline">
              {product.category}
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">{product.name}</h1>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-gray-900">{formatPrice(displayPrice)}</span>
            {product.offer_price && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Save {formatPrice(product.price - product.offer_price)}
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div>
            {product.stock === 0 ? (
              <span className="inline-flex items-center gap-1.5 text-red-600 text-sm font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> Out of Stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="inline-flex items-center gap-1.5 text-orange-600 text-sm font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full" /> Only {product.stock} left!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full" /> In Stock
              </span>
            )}
          </div>

          {/* Size selector */}
          {product.sizes.length > 0 && (
            <div>
              <p className={`text-sm font-semibold mb-2 ${sizeError ? 'text-red-500' : 'text-gray-700'}`}>
                Select Size {sizeError && '— please pick a size'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`min-w-[48px] px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : sizeError
                        ? 'border-red-300 text-gray-600 hover:border-gray-400'
                        : 'border-gray-300 text-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 text-lg font-medium"
                >−</button>
                <span className="px-4 py-2.5 text-sm font-semibold min-w-[40px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product!.stock, q + 1))}
                  className="px-3 py-2.5 text-gray-600 hover:bg-gray-50 text-lg font-medium"
                >+</button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white active:scale-95'
                }`}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Details */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
            {product.category && <p><span className="font-medium text-gray-800">Category:</span> {product.category}</p>}
            {product.sizes.length > 0 && <p><span className="font-medium text-gray-800">Available Sizes:</span> {product.sizes.join(', ')}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
