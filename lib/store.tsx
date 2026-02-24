"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import type { CartItem, Order, Review, Product } from "./data"
import { initialReviews, generateOrderId } from "./data"

interface StoreContextType {
  cart: CartItem[]
  orders: Order[]
  reviews: Review[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  placeOrder: (address: { name: string; phone: string; address: string; pincode: string }) => string
  getOrder: (orderId: string) => Order | undefined
  addReview: (review: Omit<Review, "id">) => void
  getProductReviews: (productId: string) => Review[]
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shop-cart")
      const savedOrders = localStorage.getItem("shop-orders")
      const savedReviews = localStorage.getItem("shop-reviews")
      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedOrders) setOrders(JSON.parse(savedOrders))
      if (savedReviews) setReviews(JSON.parse(savedReviews))
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shop-cart", JSON.stringify(cart))
    }
  }, [cart, hydrated])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shop-orders", JSON.stringify(orders))
    }
  }, [orders, hydrated])

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shop-reviews", JSON.stringify(reviews))
    }
  }, [reviews, hydrated])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const placeOrder = useCallback(
    (address: { name: string; phone: string; address: string; pincode: string }) => {
      const orderId = generateOrderId()
      const order: Order = {
        id: orderId,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        address,
        status: "processing",
        date: new Date().toISOString(),
      }
      setOrders((prev) => [...prev, order])
      setCart([])
      return orderId
    },
    [cart]
  )

  const getOrder = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders]
  )

  const addReview = useCallback((review: Omit<Review, "id">) => {
    setReviews((prev) => [...prev, { ...review, id: "r" + Date.now() }])
  }, [])

  const getProductReviews = useCallback(
    (productId: string) => reviews.filter((r) => r.productId === productId),
    [reviews]
  )

  return (
    <StoreContext.Provider
      value={{
        cart,
        orders,
        reviews,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        getOrder,
        addReview,
        getProductReviews,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error("useStore must be used within StoreProvider")
  return context
}
