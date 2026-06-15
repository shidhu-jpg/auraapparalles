export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  offer_price: number | null
  offer_percentage: number | null
  stock: number
  sizes: string[]
  category: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  product_images?: ProductImage[]
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface CartItem {
  product_id: string
  name: string
  price: number
  size: string
  quantity: number
  image_url: string
}
