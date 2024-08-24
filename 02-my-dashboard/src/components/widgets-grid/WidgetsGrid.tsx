'use client'

import { useCounterStore } from '@/stores'
import { FC } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { SimpleWidget } from '../simple-widget'

interface Props {}

export const WidgetsGrid: FC<Props> = () => {
  const isCount = useCounterStore((state) => state.count)

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <SimpleWidget
        title={`${isCount}`}
        subTitle={'Productos en carrito'}
        label={'Carrito'}
        icon={<IoCartOutline size={50} />}
        href={'/dashboard/counter'}
      />
    </div>
  )
}
