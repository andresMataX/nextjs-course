import type { Size } from '@/interfaces'
import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]
  onSizeChanged: (size: Size) => void
}

export const SizeSelector: FC<Props> = ({
  availableSizes,
  selectedSize,
  onSizeChanged,
}) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold mb-4'>Tallas disponibles</h3>

      <div className='flex'>
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx('mx-2 hover:underline text-lg', {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
