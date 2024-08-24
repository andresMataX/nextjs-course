'use client'

import { useCartStore } from '@/stores'
import { currencyFormat } from '@/utils'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

interface Props {}

export const ProductsInCartCheckout: FC<Props> = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading</p>
  }

  return (
    <>
      {productsInCart.map((product, index) => (
        <div key={index} className='flex mb-5'>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className='mr-5 rounded'
          />

          <div>
            <p className='text-xl'>{product.title}</p>

            <p className='font-black'>
              {currencyFormat(product.price * product.quantity)}
            </p>
            <p>Talla: {product.size}</p>
            <p>Cantidad: {product.quantity}</p>
          </div>
        </div>
      ))}
    </>
  )
}
