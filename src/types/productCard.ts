export type ProductCardData = {
    id: number
    name: string
    imageUrl: string
    description?: string
    sku?: string
    unit?: string
    isStop?: boolean
    sizes: {
        id: number
        price: number
        positionGrams?: number
        unit?: string
        modifiers?: unknown[]
    }[]
    category: {
        id: number
        name: string
        uuid: string
    }
}
