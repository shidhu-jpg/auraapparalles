import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/ProductForm'


interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: product } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('id', id)
    .single()

  if (!product) notFound()

  const sorted = {
    ...product,
    product_images: [...(product.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-sm font-semibold text-gray-800">Edit Product</h1>
          <span className="text-gray-400 text-sm truncate max-w-[300px]">— {product.name}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductForm product={sorted} />
      </div>
    </div>
  )
}
