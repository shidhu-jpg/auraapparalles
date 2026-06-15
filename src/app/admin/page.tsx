import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import AdminActions from './AdminActions'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .order('created_at', { ascending: false })

  const all     = products ?? []
  const active  = all.filter(p => p.is_active)
  const lowStock = all.filter(p => p.stock > 0 && p.stock <= 5)
  const outOfStock = all.filter(p => p.stock === 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-black tracking-widest text-gray-900 uppercase text-sm">Aura</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-semibold text-gray-600">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-brand-600 transition-colors">
              View Store ↗
            </a>
            <AdminActions action="logout" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: all.length, color: 'text-gray-800' },
            { label: 'Active Listings', value: active.length, color: 'text-green-600' },
            { label: 'Low Stock (≤5)', value: lowStock.length, color: 'text-orange-500' },
            { label: 'Out of Stock', value: outOfStock.length, color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <Link
            href="/admin/products/new"
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Add Product
          </Link>
        </div>

        {/* Product table */}
        {all.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400 mb-4">No products yet.</p>
            <Link href="/admin/products/new" className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Product</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Category</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Stock</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {all.map(product => {
                    const primaryImg = (product.product_images as { image_url: string; is_primary: boolean }[])?.find(i => i.is_primary)
                      ?? (product.product_images as { image_url: string }[])?.[0]
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                              {primaryImg ? (
                                <Image src={primaryImg.image_url} alt={product.name} fill className="object-cover" sizes="40px" />
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 max-w-[200px] truncate">{product.name}</p>
                              <p className="text-xs text-gray-400">{(product.sizes as string[])?.join(', ') || '—'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{product.category || '—'}</td>
                        <td className="px-4 py-3">
                          <div>
                            {product.offer_price ? (
                              <>
                                <p className="font-semibold text-gray-900">₹{Number(product.offer_price).toLocaleString('en-IN')}</p>
                                <p className="text-xs text-gray-400 line-through">₹{Number(product.price).toLocaleString('en-IN')}</p>
                              </>
                            ) : (
                              <p className="font-semibold text-gray-900">₹{Number(product.price).toLocaleString('en-IN')}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-orange-500' : 'text-gray-700'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <AdminActions action="toggle" productId={product.id} isActive={product.is_active} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                              Edit
                            </Link>
                            <AdminActions action="delete" productId={product.id} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
