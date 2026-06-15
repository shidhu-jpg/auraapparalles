import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/components/admin/ProductForm'

export const runtime = 'edge'

export default async function NewProductPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Dashboard
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-sm font-semibold text-gray-800">Add New Product</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductForm />
      </div>
    </div>
  )
}
