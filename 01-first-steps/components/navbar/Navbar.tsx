import Link from 'next/link'
import { FC } from 'react'
import { ActiveLink } from '..'

interface Props {}

export const Navbar: FC<Props> = () => {
  return (
    <nav className='flex bg-blue-900 bg-opacity-30 p-2 m-2 rounded'>
      <Link href='/'>Home</Link>

      <div className='flex-1' />

      <ActiveLink path='/about' text='About' />

      <ActiveLink path='/pricing' text='Pricing' />

      <ActiveLink path='/contact' text='Contact' />
    </nav>
  )
}
