'use client'

import { QuantitySelector, SizeSelector, StockLabel } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/stores'
import { FC, useState } from 'react'

interface Props {
  product: Product
}

export const AddToCart: FC<Props> = ({ product }) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)

  const [size, setSize] = useState<Size>()
  const [quantity, setQuantity] = useState(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)

    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      slug: product.slug,
      title: product.title,
      quantity,
      size,
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {posted && !size && (
        <span className='text-red-600 mt-2'>Debe de seleccionar una talla</span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <StockLabel slug={product.slug} />

      <button className='btn-primary my-5' onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}
