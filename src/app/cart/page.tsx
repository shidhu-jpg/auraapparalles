'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Trash, Minus, Plus, WhatsApp } from '@/components/icons'

function formatPrice(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()

  function buildWhatsAppMessage() {
    const lines = items.map(
      (item, i) =>
        `${i + 1}. ${item.name} (Size: ${item.size}) × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    )
    const msg = [
      'Hello Aura Apparels! 👋',
      'I would like to place the following order:',
      '',
      ...lines,
      '',
      `*Total: ${formatPrice(total)}*`,
      '',
      'Please confirm availability and share payment details. Thank you!',
    ].join('\n')
    return encodeURIComponent(msg)
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

  if (itemCount === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some items from our collection.</p>
        <Link
          href="/"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
        >
          Shop Now
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({itemCount} item{itemCount !== 1 ? 's' : ''})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-1 space-y-4">
          {items.map(item => (
            <div key={`${item.product_id}-${item.size}`} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              {/* Image */}
              <div className="w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product_id}`} className="font-semibold text-gray-800 text-sm hover:text-brand-600 line-clamp-2">
                  {item.name}
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">Size: {item.size}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>

                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) removeItem(item.product_id, item.size)
                      else updateQuantity(item.product_id, item.size, item.quantity - 1)
                    }}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.size, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Line total + remove */}
              <div className="flex flex-col items-end justify-between">
                <span className="font-bold text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</span>
                <button
                  onClick={() => removeItem(item.product_id, item.size)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500 mt-2 underline transition-colors">
            Clear cart
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4 sticky top-24">
            <h2 className="font-bold text-gray-800 text-lg">Order Summary</h2>

            <div className="space-y-2 text-sm">
              {items.map(item => (
                <div key={`${item.product_id}-${item.size}`} className="flex justify-between text-gray-600">
                  <span className="truncate max-w-[160px]">{item.name} ({item.size}) × {item.quantity}</span>
                  <span className="font-medium ml-2">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span className="text-xl">{formatPrice(total)}</span>
            </div>

            <p className="text-xs text-gray-400">Shipping and delivery charges will be communicated via WhatsApp.</p>

            <a
              href={`https://wa.me/${waNumber}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
            >
              <WhatsApp className="w-5 h-5" />
              Order via WhatsApp
            </a>

            <Link href="/" className="block text-center text-sm text-brand-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
