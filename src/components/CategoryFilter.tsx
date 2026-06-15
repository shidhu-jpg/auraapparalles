'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  categories: string[]
}

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const active = params.get('category') ?? 'All'

  function go(cat: string) {
    router.push(cat === 'All' ? '/' : `/?category=${encodeURIComponent(cat)}`)
  }

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => go(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                active === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
