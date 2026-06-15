'use client'

import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { CartItem } from '@/lib/supabase/types'

type Action =
  | { type: 'LOAD';   payload: CartItem[] }
  | { type: 'ADD';    payload: CartItem }
  | { type: 'REMOVE'; payload: { product_id: string; size: string } }
  | { type: 'UPDATE'; payload: { product_id: string; size: string; quantity: number } }
  | { type: 'CLEAR' }

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'LOAD':
      return action.payload
    case 'ADD': {
      const idx = state.findIndex(
        i => i.product_id === action.payload.product_id && i.size === action.payload.size
      )
      if (idx >= 0) {
        return state.map((i, n) =>
          n === idx ? { ...i, quantity: i.quantity + action.payload.quantity } : i
        )
      }
      return [...state, action.payload]
    }
    case 'REMOVE':
      return state.filter(
        i => !(i.product_id === action.payload.product_id && i.size === action.payload.size)
      )
    case 'UPDATE':
      return state.map(i =>
        i.product_id === action.payload.product_id && i.size === action.payload.size
          ? { ...i, quantity: action.payload.quantity }
          : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (product_id: string, size: string) => void
  updateQuantity: (product_id: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_cart')
      if (stored) dispatch({ type: 'LOAD', payload: JSON.parse(stored) })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(items))
  }, [items])

  const addItem    = (item: CartItem) => dispatch({ type: 'ADD', payload: item })
  const removeItem = (product_id: string, size: string) =>
    dispatch({ type: 'REMOVE', payload: { product_id, size } })
  const updateQuantity = (product_id: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE', payload: { product_id, size, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const total     = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
