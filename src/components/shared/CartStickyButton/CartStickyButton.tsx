import ShoppingCartOutlined from '@/assets/icons/basket-filled-icon.svg?react'
import clsx from 'clsx'

type CartStickyButtonProps = {
    total: number
    oldTotal?: number
    onClick?: () => void
    isVisible?: boolean
}

const CartStickyButton = ({ total, oldTotal, onClick, isVisible = true }: CartStickyButtonProps) => {
    const hasDiscount = oldTotal && oldTotal > total

    return (
        <div
            className={clsx(
                'fixed bottom-4 left-4 right-4 z-50 transition-opacity',
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
        >
            <button
                onClick={onClick}
                className='w-full h-[3rem] bg-[#EB5024] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-md'
            >
                <ShoppingCartOutlined style={{ width: '1rem', height: '1rem' }} />В корзину – {total.toLocaleString()} ₸{' '}
                {hasDiscount && <span className='line-through text-white/60 ml-1'>{oldTotal?.toLocaleString()} ₸</span>}
            </button>
        </div>
    )
}

export default CartStickyButton
