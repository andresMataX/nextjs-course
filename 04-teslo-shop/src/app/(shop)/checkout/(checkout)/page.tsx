import { PlaceOrder, ProductsInCartCheckout, Title } from '@/components'
import { initialData } from '@/seed'
import Link from 'next/link'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

const CheckoutPage = () => {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar artículos</span>

            <Link href='/' className='underline mb-5'>
              Editar carrito
            </Link>
          </div>
        </div>

        <ProductsInCartCheckout />

        <PlaceOrder />
      </div>
    </div>
  )
}

export default CheckoutPage
