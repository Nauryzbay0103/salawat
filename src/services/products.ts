import { ProductCardData } from '@/types/productCard'
import { Service } from './service'

export class ProductService extends Service {
    constructor() {
        super()
    }

    async getProductsByCategoryId(uuid: string): Promise<ProductCardData[]> {
        return await this.get<ProductCardData[]>(`/product/category/${uuid}`, [])
    }
}
