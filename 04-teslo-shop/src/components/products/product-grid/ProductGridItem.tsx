'use client'

import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface Props {
  product: Product
}

export const ProductGridItem: FC<Props> = ({ product }) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <article className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className='w-full object-cover'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className='p-4 flex flex-col'>
        <Link href={`/product/${product.slug}`} className='hover:text-blue-700'>
          {product.title}
        </Link>

        <span className='font-bold'>${product.price}</span>
      </div>
    </article>
  )
}
