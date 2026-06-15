import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductDetail from './ProductDetail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const sorted = {
    ...product,
    product_images: [...(product.product_images ?? [])].sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    ),
  }

  return <ProductDetail product={sorted} />
}
