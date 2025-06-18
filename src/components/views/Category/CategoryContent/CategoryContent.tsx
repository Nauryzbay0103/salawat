import CartStickyButton from '@/components/shared/CartStickyButton/CartStickyButton'
import CategoriesNavigation from '@/components/shared/CategoriesNavigation/CategoriesNavigation'
import ProductCardsWrapper from '@/components/shared/ProductCardWrapper/ProductCardWrapper'
import { useCartStore } from '@/stores/useCartStore'
import { useProductStore } from '@/stores/useProductStore'

const CategoryContent = () => {
    const { products } = useProductStore()
    const { totalPrice } = useCartStore()

    return (
        <div className='bg-[#FFFFFF] rounded-t-[1.25rem]  mt-[-1.3125rem] relative pb-[4rem]'>
            <CategoriesNavigation />
            <ProductCardsWrapper cards={products} />
            <CartStickyButton total={totalPrice} onClick={() => console.log('Proceed to checkout')} />
        </div>
    )
}

export default CategoryContent
