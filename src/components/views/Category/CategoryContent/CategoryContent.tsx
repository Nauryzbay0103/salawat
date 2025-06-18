import CartStickyButton from '@/components/shared/CartStickyButton/CartStickyButton'
import CategoriesNavigation from '@/components/shared/CategoriesNavigation/CategoriesNavigation'
import ProductCardsWrapper from '@/components/shared/ProductCardWrapper/ProductCardWrapper'
import { useCartStore } from '@/stores/useCartStore'
import { useProductStore } from '@/stores/useProductStore'
import { useNavigate } from 'react-router'

const CategoryContent = () => {
    const navigate = useNavigate()
    const { products } = useProductStore()
    const { totalPrice } = useCartStore()

    return (
        <div className='bg-[#FFFFFF] rounded-t-[1.25rem]  mt-[-1.3125rem] relative pb-[5rem]'>
            <CategoriesNavigation />
            <ProductCardsWrapper cards={products} />
            <CartStickyButton total={totalPrice} onClick={() => navigate('/basket')} />
        </div>
    )
}

export default CategoryContent
