'use client'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUiStore } from '@/stores'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

interface Props {}

export const TopMenu: FC<Props> = () => {
  const openSidebar = useUiStore((state) => state.open)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className='hidden sm:block'>
        <Link
          href='/gender/men'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Hombres
        </Link>

        <Link
          href='/gender/women'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Mujeres
        </Link>

        <Link
          href='/gender/kid'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Niños
        </Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link href='/search'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href={totalItems === 0 && loaded ? '/empty/' : '/cart/'}>
          <div className='relative'>
            {loaded && totalItems > 0 && (
              <span className='absolute text-xs rounded-full px-1 font-bold -top-2 text-white bg-blue-700 -right-2'>
                {totalItems}
              </span>
            )}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={() => openSidebar()}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
