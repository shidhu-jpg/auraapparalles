'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogOut } from '@/components/icons'

interface Props {
  action: 'logout' | 'delete' | 'toggle'
  productId?: string
  isActive?: boolean
}

export default function AdminActions({ action, productId, isActive }: Props) {
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function deleteProduct() {
    if (!productId) return
    if (!confirm('Delete this product permanently? This cannot be undone.')) return

    const supabase = createClient()
    await supabase.from('products').delete().eq('id', productId)
    router.refresh()
  }

  async function toggleActive() {
    if (!productId) return
    const supabase = createClient()
    await supabase.from('products').update({ is_active: !isActive }).eq('id', productId)
    router.refresh()
  }

  if (action === 'logout') {
    return (
      <button
        onClick={logout}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
      >
        <LogOut className="w-4 h-4" /> Logout
      </button>
    )
  }

  if (action === 'toggle') {
    return (
      <button
        onClick={toggleActive}
        className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${
          isActive
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`}
      >
        {isActive ? 'Active' : 'Hidden'}
      </button>
    )
  }

  if (action === 'delete') {
    return (
      <button
        onClick={deleteProduct}
        className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        Delete
      </button>
    )
  }

  return null
}
