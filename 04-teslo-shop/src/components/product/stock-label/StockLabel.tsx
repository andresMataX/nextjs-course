'use client'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'
import { FC, useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel: FC<Props> = ({ slug }) => {
  const [stock, setstock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStock = async () => {
    const stock = await getStockBySlug(slug)
    setstock(stock)
    setIsLoading(false)
  }

  useEffect(() => {
    getStock()
  }, [getStock])

  return (
    <>
      {isLoading ? (
        <h2
          className={`${titleFont.className} antialiased font-bold text-md mt-2 animate-pulse bg-gray-200`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2
          className={`${titleFont.className} antialiased font-bold text-md mt-2`}
        >
          Stock: {stock}
        </h2>
      )}
    </>
  )
}
