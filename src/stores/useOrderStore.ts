import { ProductCardData } from '@/types/productCard'
import { create } from 'zustand'

type CartItem = {
    product: ProductCardData
    quantity: number
}

type OrderStore = {
    address: string
    deliveryDate: string
    deliveryTime: string
    comment: string
    cart: CartItem[]
    deliveryPrice: number
    totalPrice: number

    setField: <K extends keyof OrderStore>(key: K, value: OrderStore[K]) => void
    setCart: (items: CartItem[]) => void
    updateQuantity: (product: ProductCardData, quantity: number) => void
    resetOrder: () => void
    totalWithDelivery: () => number
}

export const useOrderStore = create<OrderStore>((set, get) => ({
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    comment: '',
    cart: [],
    deliveryPrice: 1100,
    totalPrice: 0,

    setField: (key, value) => set({ [key]: value }),

    setCart: (items) => {
        const total = items.reduce((sum, item) => sum + (item.product.sizes?.[0]?.price ?? 0) * item.quantity, 0)
        set({ cart: items, totalPrice: total })
    },

    updateQuantity: (product, quantity) => {
        let cart = get().cart
        const existing = cart.find((item) => item.product.id === product.id)

        if (quantity <= 0) {
            cart = cart.filter((item) => item.product.id !== product.id)
        } else if (existing) {
            cart = cart.map((item) => (item.product.id === product.id ? { ...item, quantity } : item))
        } else {
            cart = [...cart, { product, quantity }]
        }

        const total = cart.reduce((sum, item) => sum + (item.product.sizes?.[0]?.price ?? 0) * item.quantity, 0)

        set({ cart, totalPrice: total })
    },

    resetOrder: () =>
        set({
            address: '',
            deliveryDate: '',
            deliveryTime: '',
            comment: '',
            cart: [],
            deliveryPrice: 1100,
            totalPrice: 0,
        }),

    totalWithDelivery: () => {
        const { totalPrice, deliveryPrice } = get()
        return totalPrice + deliveryPrice
    },
}))
