import ProductCard from '@/components/shared/ProductCard/ProductCard'
import { ProductCardData } from '@/types/productCard'

type ProductCardsWrapperProps = {
    cards: ProductCardData[]
}

const ProductCardsWrapper = ({ cards }: ProductCardsWrapperProps) => {
    return (
        <div className='grid grid-cols-2 gap-x-[0.56rem] gap-y-[1rem] p-[1.25rem]'>
            {!!cards.length && cards.map((card) => <ProductCard {...card} key={card.id} />)}
        </div>
    )
}

export default ProductCardsWrapper
