'use client'

import { logout } from '@/actions'
import { useUiStore } from '@/stores'
import clsx from 'clsx'
import { Session } from 'next-auth'
import Link from 'next/link'
import { FC } from 'react'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5'

interface Props {
  session: Session | null
}

export const Sidebar: FC<Props> = ({ session }) => {
  const isOpen = useUiStore((state) => state.isOpen)
  const close = useUiStore((state) => state.close)

  const isAuthenticated = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  return (
    <div>
      {isOpen && (
        <div className='bg-black fixed top-0 left-0 w-screen h-svh z-10 opacity-30' />
      )}

      {isOpen && (
        <div className='fade-in fixed top-0 left-0 w-screen h-svh backdrop-filter backdrop-blur-sm' />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-svh bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={() => close()}
        />

        <div className='relative mt-14 items-center'>
          <IoSearchOutline size={20} className='absolute top-2 left-2' />

          <input
            type='text'
            placeholder='Search...'
            className='w-full h-10 pl-10 pr-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
          />
        </div>

        {isAuthenticated && (
          <>
            <Link
              href='/profile'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
              onClick={() => close()}
            >
              <IoPersonOutline size={25} />
              <span className='ml-3 text-xl'>Perfil</span>
            </Link>

            <Link
              href='/orders/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={25} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={() => logout()}
          >
            <IoLogOutOutline size={25} />
            <span className='ml-3 text-xl'>Cerrar sesión</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href='/auth/login/'
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            onClick={() => logout()}
          >
            <IoLogInOutline size={25} />
            <span className='ml-3 text-xl'>Ingresar</span>
          </Link>
        )}

        <div className='w-full h-px bg-gray-200 my-10' />

        {isAdmin && (
          <>
            <Link
              href='/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoShirtOutline size={25} />
              <span className='ml-3 text-xl'>Productos</span>
            </Link>

            <Link
              href='/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoTicketOutline size={25} />
              <span className='ml-3 text-xl'>Ordenes</span>
            </Link>

            <Link
              href='/'
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoPeopleOutline size={25} />
              <span className='ml-3 text-xl'>Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}
