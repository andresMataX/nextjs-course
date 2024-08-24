'use client'

import { useCartStore } from '@/stores'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { QuantitySelector } from '..'

interface Props {}

export const ProductsInCart: FC<Props> = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  )
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

          <div className=''>
            <Link href={`/product/${product.slug}`}>
              <p className='text-xl hover:underline'>{product.title}</p>
            </Link>

            <p className=''>${product.price}</p>
            <p className=''>Talla: {product.size}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            <button
              className='underline mt-2'
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
