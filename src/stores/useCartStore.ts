import { ProductCardData } from '@/types/productCard'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
    product: ProductCardData
    quantity: number
}

type CartStore = {
    items: CartItem[]
    totalPrice: number
    oldTotalPrice?: number
    addProduct: (product: ProductCardData) => void
    removeProduct: (productId: number) => void
    updateQuantity: (productId: number, quantity: number, forceProduct?: ProductCardData) => void
    recalculateTotals: () => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            totalPrice: 0,
            oldTotalPrice: undefined,

            addProduct: (product) => {
                const existing = get().items.find((item) => item.product.id === product.id)
                const quantity = existing ? existing.quantity + 1 : 1
                get().updateQuantity(product.id, quantity, product)
            },

            removeProduct: (productId) => {
                const filtered = get().items.filter((item) => item.product.id !== productId)
                set({ items: filtered })
                get().recalculateTotals()
            },

            updateQuantity: (productId, quantity, forceProduct?) => {
                if (quantity === 0) {
                    get().removeProduct(productId)
                    return
                }

                let newItems: CartItem[] = []
                const existing = get().items.find((item) => item.product.id === productId)

                if (existing) {
                    newItems = get().items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
                } else if (forceProduct) {
                    newItems = [...get().items, { product: forceProduct, quantity }]
                } else {
                    return
                }

                set({ items: newItems })
                get().recalculateTotals()
            },

            recalculateTotals: () => {
                const { items } = get()
                const total = items.reduce(
                    (sum, item) => sum + (item.product.sizes?.[0]?.price ?? 0) * item.quantity,
                    0
                )
                set({ totalPrice: total })
            },

            clearCart: () => {
                set({ items: [], totalPrice: 0 })
            },
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                items: state.items,
                totalPrice: state.totalPrice,
            }),
        }
    )
)
