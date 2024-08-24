import { CartCounter } from '@/shopping-cart/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping cart',
  description: 'Counter page description',
}

const CounterPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <span>Productos en el carrito</span>

      <CartCounter value={20} />
    </div>
  )
}

export default CounterPage
