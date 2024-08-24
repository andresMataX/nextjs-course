import { WidgetItem } from '@/components'
import { ItemCard } from '@/components/item-card/ItemCard'
import { Product, products } from '@/data/products'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Carrito de compras',
  description: 'Carrito de compras',
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: Record<string, number>) => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find((p) => p.id === id)

    if (product) {
      productsInCart.push({
        product,
        quantity: cart[id],
      })
    }
  }

  return productsInCart
}

const CartPage = () => {
  const cookieStore = cookies()
  const cart: Record<string, number> = JSON.parse(
    cookieStore.get('cart')?.value ?? '{}'
  )
  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  )

  return (
    <div>
      <h1 className='text-5xl font-black'>Productos en el carrito</h1>
      <hr className='mb-2' />

      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>

        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='Total a pagar'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-black text-gray-800'>
                ${(totalToPay * 1.15).toFixed(2)}
              </h3>
            </div>

            <span className='font-bold text-center text-gray-500'>
              Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  )
}

export default CartPage
