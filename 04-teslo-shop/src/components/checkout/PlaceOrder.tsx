'use client'

import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/stores'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

interface Props {}

export const PlaceOrder: FC<Props> = () => {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  )
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clear)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map(({ id, quantity, size }) => ({
      productId: id,
      quantity,
      size,
    }))

    const resp = await placeOrder(productsToOrder, address)

    if (resp.message) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message)
      return
    }

    clearCart()
    router.replace(`/orders/${resp.order!.id}`)
    setIsPlacingOrder(false)
  }

  if (!loaded) {
    return <p>Cargando...</p>
  }

  return (
    <div>
      <div className='shadow-xl p-7'>
        <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
        <div className='mb-10'>
          <p>
            Nombre: {address.firstName} {address.lastName}
          </p>
          <p>Dirección: {address.address}</p>
          <p>Ciudad: {address.city}</p>
          <p>País: {address.country}</p>
          <p>Código postal: {address.postalCode}</p>
        </div>

        <div className='w-full h-0.5 bg-gray-200 my-5 rounded-lg' />

        <h2 className='text-2xl mb-2'>Resumen de orden</h2>

        <div className='grid grid-cols-2'>
          <span>No. productos</span>
          <span className='text-right'>{itemsInCart}</span>

          <span>Subtotal</span>
          <span className='text-right'>{currencyFormat(subTotal)}</span>

          <span>Impuestos</span>
          <span className='text-right'>{currencyFormat(tax)}</span>

          <span className='mt-5 text-2xl font-bold'>Total</span>
          <span className='mt-5 text-right'>{currencyFormat(total)}</span>
        </div>

        <div className='my-5'>
          <p className='mb-5'>
            <span className='text-xs'>
              Al hacer clic en el botón de abajo, aceptas nuestros{' '}
              <a href='#'>términos y condiciones</a> y nuestra{' '}
              <a href='#'>política de privacidad</a>
            </span>
          </p>

          <p className='text-red-500 font-bold'>{errorMessage}</p>

          <button
            className={clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder,
            })}
            onClick={onPlaceOrder}
            disabled={isPlacingOrder}
          >
            Colocar orden
          </button>
        </div>
      </div>
    </div>
  )
}
