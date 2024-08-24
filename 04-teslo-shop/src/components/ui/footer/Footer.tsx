import Link from 'next/link'
import { FC } from 'react'

interface Props {}

export const Footer: FC<Props> = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
      <Link href='/'>Teslo | Shop</Link>
      <span>
        {' '}
        &copy; {new Date().getFullYear()} | Todos los derechos reservados
      </span>
    </div>
  )
}
