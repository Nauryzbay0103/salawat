'use client'
import CrossIcon from '@/assets/icons/cross-icon.svg?react'
import WalletIcon from '@/assets/icons/wallet-icon.svg?react'

import { useCartStore } from '@/stores/useCartStore'
import { useOrderStore } from '@/stores/useOrderStore'
import { useNavigate } from 'react-router'
import BasketCartItem from '../BasketCartItem/BasketCartItem'

const BasketContent = () => {
    const navigate = useNavigate()
    const { items } = useCartStore()
    const { address, deliveryDate, deliveryTime, comment, setField } = useOrderStore()
    const { totalPrice } = useCartStore()
    const delivery = 0
    const total = totalPrice + delivery

    const handleSubmit = () => {
        const order = {
            address,
            deliveryDate,
            deliveryTime,
            comment,
            products: items.map((item) => ({
                id: item.product.id,
                quantity: item.quantity,
                price: item.product.sizes?.[0]?.price ?? 0,
            })),
            total: totalPrice,
            delivery: delivery,
            totalToPay: total,
        }

        console.log('Отправляем заказ:', order)
    }

    return (
        <div className='pt-[4.4375rem] px-[1.25rem] bg-white min-h-[100vh] pb-[6rem]'>
            <div className='flex justify-between align-center mb-2'>
                <h2 className='text-[1.5rem] font-semibold'>Состав заказа</h2>
                <button className='bg-[#F8F8F8] p-[0.875rem] rounded-[100%]' onClick={() => navigate('/')}>
                    <CrossIcon style={{ width: '1rem', height: '1rem' }} />
                </button>
            </div>

            <div className='flex flex-col'>
                {items.map((item) => (
                    <BasketCartItem key={item.product.id} product={item.product} quantity={item.quantity} />
                ))}
            </div>

            <div className='mt-6 space-y-4 text-sm'>
                <div className='relative'>
                    <label htmlFor='address' className='sr-only'>
                        Адрес доставки
                    </label>
                    <input
                        id='address'
                        name='address'
                        type='text'
                        value={address}
                        onChange={(e) => setField('address', e.target.value)}
                        className='w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-black cursor-pointer'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2  text-lg'>›</span>
                </div>

                <div className='relative'>
                    <label
                        htmlFor='delivery-date'
                        className='block absolute top-[0.375rem] left-[1rem] font-[500] text-xs text-[#0000004D] '
                    >
                        Выберите дату доставки
                    </label>
                    <select
                        id='delivery-date'
                        value={deliveryDate}
                        onChange={(e) => setField('deliveryDate', e.target.value)}
                        className='appearance-none  w-full px-4 pt-[1.25rem] pb-[0.5rem] rounded-xl border border-gray-200 bg-white text-sm font-[600] text-black'
                    >
                        <option value='today'>Сегодня</option>
                        <option value='tomorrow'>Завтра</option>
                    </select>
                </div>

                <div className='relative'>
                    <label
                        htmlFor='delivery-time'
                        className='block absolute top-[0.375rem] left-[1rem] font-[500] text-xs text-[#0000004D]'
                    >
                        Выберите время доставки
                    </label>
                    <select
                        id='delivery-time'
                        value={deliveryTime}
                        onChange={(e) => setField('deliveryTime', e.target.value)}
                        className='appearance-none  w-full px-4 pt-[1.25rem] pb-[0.5rem] rounded-xl border border-gray-200 bg-white text-sm font-[600] text-black'
                    >
                        <option>18:00 - 20:00</option>
                        <option>20:00 - 22:00</option>
                    </select>
                </div>

                <div className='relative'>
                    <label
                        htmlFor='comment'
                        className='block absolute top-[0.375rem] left-[1rem] font-[500] text-xs text-[#0000004D]'
                    >
                        Комментарий к заказу
                    </label>
                    <textarea
                        id='comment'
                        value={comment}
                        onChange={(e) => setField('comment', e.target.value)}
                        rows={2}
                        className='w-full px-4 pt-[1.25rem] pb-[0.5rem] rounded-xl border border-gray-200 bg-white text-sm font-[600] text-black'
                    />
                </div>
            </div>

            <div className='mt-2 space-y-3 text-sm'>
                <div className='flex justify-between'>
                    <span className='text-[1rem]'>Корзина</span>
                    <span className='font-semibold text-[1rem]'>{totalPrice.toLocaleString()} ₸</span>
                </div>
                <div className='flex justify-between border-t pt-3'>
                    <span className='text-[1rem]'>Доставка</span>
                    <span className='font-semibold text-[1rem]'>{delivery.toLocaleString()} ₸</span>
                </div>
                <div className='flex justify-between  text-base border-t pt-3'>
                    <span className='text-[1rem]'>Итого</span>
                    <span className='font-semibold text-[1rem]'>Перейти к оплате {total.toLocaleString()} ₸</span>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className='fixed flex gap-2 h-[3.75rem] items-center justify-center bottom-4 left-4 right-4 h-12 bg-[#EB5024] text-white rounded-xl font-medium text-sm z-50'
            >
                <WalletIcon style={{ width: '1.125rem', height: '1.125rem' }} /> Перейти к оплате{' '}
                {total.toLocaleString()} ₸
            </button>
        </div>
    )
}

export default BasketContent
