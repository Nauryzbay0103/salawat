import ShoppingCartOutlined from '@/assets/icons/basket-outlined-icon.svg?react'
import { useCartStore } from '@/stores/useCartStore'
import { ProductCardData } from '@/types/productCard'
import styles from './ProductCard.module.scss'

const ProductCard = (props: ProductCardData) => {
    const { id, name, imageUrl, sizes } = props
    const price = sizes?.[0]?.price ?? 0

    const { items, updateQuantity } = useCartStore()

    const item = items.find((i) => i.product.id === id)
    const quantity = item?.quantity ?? 0

    const handleIncrement = () => {
        updateQuantity(id, quantity + 1, props)
    }

    const handleDecrement = () => {
        updateQuantity(id, Math.max(0, quantity - 1))
    }

    const canBeAdded = true

    return (
        <div className={styles.productCard}>
            <div className='relative bg-[#F8F8F8] rounded-[0.43rem] overflow-hidden'>
                <img src={imageUrl} alt={name} className='w-full h-auto rounded-xl' />
            </div>

            <div>
                <div className='flex items-center gap-2 mt-[0.8125rem] leading-[1.1]'>
                    <span className='font-semibold'>{price} ₸</span>
                </div>
                <div className='text-[0.75rem] text-gray-700'>{name}</div>
            </div>

            {canBeAdded ? (
                quantity > 0 ? (
                    <div className='flex items-center h-[2.5rem] justify-between mt-[0.8125rem] bg-[#EB5024] text-white rounded-lg w-[8.1875rem]'>
                        <button onClick={handleDecrement} className='px-3 text-xl'>
                            -
                        </button>
                        <span className='text-base font-medium'>{quantity}</span>
                        <button onClick={handleIncrement} className='px-3 text-xl'>
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleIncrement}
                        className='mt-[0.8125rem] h-[2.5rem] bg-gray-100 py-1.5 rounded-lg text-center text-black font-medium flex items-center justify-center gap-2 w-[8.1875rem]'
                    >
                        <ShoppingCartOutlined style={{ width: '1rem', height: '1rem' }} />
                        {price} ₸
                    </button>
                )
            ) : null}
        </div>
    )
}

export default ProductCard
