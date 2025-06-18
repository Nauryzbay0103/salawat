import { useCartStore } from '@/stores/useCartStore'
import { ProductCardData } from '@/types/productCard'

type Props = {
    product: ProductCardData
    quantity: number
}

const BasketCartItem = ({ product, quantity }: Props) => {
    const price = product.sizes?.[0]?.price ?? 0
    const { updateQuantity } = useCartStore()

    return (
        <div className='flex justify-between items-center py-3 border-b border-gray-200'>
            <div className='flex gap-3 items-center'>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className='w-[2.5rem] h-[2.5rem] object-cover rounded-[0.625rem] bg-[#F4F4F4]'
                />
                <div className='flex flex-col text-sm'>
                    <span>{product.name}</span>
                    <span className='font-[700]'>{price} ₸</span>
                </div>
            </div>
            <div className='flex items-center rounded-[0.375rem] bg-[#F8F8F8]'>
                <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className='w-[2.125rem] h-[2.125rem] text-lg rounded '
                >
                    -
                </button>
                <span className='w-6 text-center'>{quantity}</span>
                <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className='w-[2.125rem] h-[2.125rem] text-lg rounded '
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default BasketCartItem
