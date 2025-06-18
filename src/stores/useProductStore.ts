import { ProductService } from '@/services/products'
import { ProductCardData } from '@/types/productCard'
import { create } from 'zustand'

type ProductStore = {
    products: ProductCardData[]
    isLoading: boolean
    fetchProductsByCategoryId: (uuid: string) => Promise<void>
    clearProducts: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    isLoading: false,

    fetchProductsByCategoryId: async (uuid) => {
        const service = new ProductService()
        set({ isLoading: true })
        const data = await service.getProductsByCategoryId(uuid)
        set({ products: data, isLoading: false })
    },

    clearProducts: () => set({ products: [] }),
}))
