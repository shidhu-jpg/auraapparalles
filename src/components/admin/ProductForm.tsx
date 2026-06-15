'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Product, ProductImage } from '@/lib/supabase/types'
import ImageUpload, { ImageSlot } from './ImageUpload'

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size']
const CATEGORIES = ['Women', 'Men', 'Kids', 'Accessories', 'Ethnic', 'Western', 'Sportswear']

interface Props {
  product?: Product & { product_images: ProductImage[] }
}

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [name, setName]             = useState(product?.name ?? '')
  const [description, setDesc]      = useState(product?.description ?? '')
  const [price, setPrice]           = useState(product?.price?.toString() ?? '')
  const [offerPrice, setOfferPrice] = useState(product?.offer_price?.toString() ?? '')
  const [stock, setStock]           = useState(product?.stock?.toString() ?? '0')
  const [category, setCategory]     = useState(product?.category ?? '')
  const [sizes, setSizes]           = useState<string[]>(product?.sizes ?? [])
  const [images, setImages]         = useState<ImageSlot[]>(
    (product?.product_images ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(img => ({
        id: img.id,
        url: img.image_url,
        preview: img.image_url,
        isPrimary: img.is_primary,
        sortOrder: img.sort_order,
      }))
  )
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')

  function toggleSize(size: string) {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  async function uploadImage(slot: ImageSlot, productId: string): Promise<string> {
    if (slot.url) return slot.url // already uploaded
    if (!slot.file) throw new Error('No file to upload')

    const supabase = createClient()
    const ext = slot.file.name.split('.').pop()
    const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('productimages')
      .upload(path, slot.file, { cacheControl: '3600', upsert: false })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('productimages').getPublicUrl(path)
    return data.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('Product name is required.')
    if (!price || isNaN(parseFloat(price))) return setError('Valid price is required.')
    if (images.length === 0) return setError('Add at least one product image.')

    setSaving(true)
    const supabase = createClient()

    try {
      const priceNum  = parseFloat(price)
      const offerNum  = offerPrice ? parseFloat(offerPrice) : null
      const offerPct  = offerNum ? Math.round(((priceNum - offerNum) / priceNum) * 100) : null

      let productId = product?.id

      if (isEdit && productId) {
        const { error: updateErr } = await supabase
          .from('products')
          .update({ name, description, price: priceNum, offer_price: offerNum, offer_percentage: offerPct, stock: parseInt(stock), category, sizes })
          .eq('id', productId)
        if (updateErr) throw updateErr
      } else {
        const { data: newProduct, error: insertErr } = await supabase
          .from('products')
          .insert({ name, description, price: priceNum, offer_price: offerNum, offer_percentage: offerPct, stock: parseInt(stock), category, sizes })
          .select('id')
          .single()
        if (insertErr) throw insertErr
        productId = newProduct.id
      }

      // For edit: delete removed images
      const keptIds = images.filter(s => s.id).map(s => s.id!)
      if (isEdit && product?.product_images) {
        const removedIds = product.product_images
          .map(i => i.id)
          .filter(id => !keptIds.includes(id))

        for (const id of removedIds) {
          await supabase.from('product_images').delete().eq('id', id)
        }
      }

      // Upload new images and update existing ones
      for (let i = 0; i < images.length; i++) {
        const slot = images[i]
        if (slot.id && slot.url) {
          // Existing — update primary and sort order
          await supabase
            .from('product_images')
            .update({ is_primary: slot.isPrimary, sort_order: i })
            .eq('id', slot.id)
        } else {
          // New — upload then insert
          const url = await uploadImage(slot, productId!)
          await supabase.from('product_images').insert({
            product_id: productId,
            image_url: url,
            is_primary: slot.isPrimary,
            sort_order: i,
          })
        }
      }

      router.push('/admin')
      router.refresh()
    } catch (err: unknown) {
      setError((err as Error).message ?? 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const offerPct = price && offerPrice
    ? Math.round(((parseFloat(price) - parseFloat(offerPrice)) / parseFloat(price)) * 100)
    : null

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Product Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Floral Summer Dress"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDesc(e.target.value)}
            rows={4}
            placeholder="Describe the product, fabric, fit, etc."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">— Select category —</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Pricing & Stock</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MRP / Original Price (₹) *</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min="0"
              step="0.01"
              placeholder="999"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offer / Sale Price (₹)
              {offerPct !== null && offerPct > 0 && (
                <span className="ml-2 text-green-600 font-semibold">{offerPct}% off</span>
              )}
            </label>
            <input
              type="number"
              value={offerPrice}
              onChange={e => setOfferPrice(e.target.value)}
              min="0"
              step="0.01"
              placeholder="Leave blank for no discount"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="max-w-[160px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            required
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Available Sizes</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors ${
                sizes.includes(s)
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-brand-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {sizes.length === 0 && (
          <p className="text-xs text-gray-400">Select at least one size (or leave blank for non-sized items).</p>
        )}
      </section>

      {/* Images */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Product Images</h2>
        <ImageUpload value={images} onChange={setImages} />
      </section>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Publish Product'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
