import { OrderSummary, ProductsInCart, Title } from '@/components'
import Link from 'next/link'

const CartPage = () => {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar más items</span>

            <Link href='/' className='underline mb-5'>
              Continúa comprando
            </Link>
          </div>
        </div>

        <ProductsInCart />

        <OrderSummary />

        <div className='my-5'>
          <Link
            href='/checkout/address'
            className='flex btn-primary justify-center'
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage
