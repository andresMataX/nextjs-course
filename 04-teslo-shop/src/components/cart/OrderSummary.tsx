'use client'

import { useCartStore } from '@/stores'
import { currencyFormat } from '@/utils'
import { FC, useEffect, useState } from 'react'

interface Props {}

export const OrderSummary: FC<Props> = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  )

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading...</p>

  return (
    <div>
      <div className='shadow-xl p-7'>
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
      </div>
    </div>
  )
}
