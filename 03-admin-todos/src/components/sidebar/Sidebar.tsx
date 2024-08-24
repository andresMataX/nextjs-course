import { authOptions } from '@/auth/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import {
  IoBaseballOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingSharp,
  IoListOutline,
  IoWalkOutline,
} from 'react-icons/io5'
import { SidebarItem } from '..'
import { LogoutButton } from '../logout-button/LogoutButton'

const menuItems = [
  {
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest TODOs',
    path: '/dashboard/rest-todos',
  },
  {
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
    path: '/dashboard/server-todos',
  },
  {
    icon: <IoCodeWorkingSharp size={30} />,
    title: 'Cookies',
    path: '/dashboard/cookies',
  },
  {
    icon: <IoBaseballOutline size={30} />,
    title: 'Products',
    path: '/dashboard/products',
  },
  {
    icon: <IoWalkOutline size={30} />,
    title: 'Profile',
    path: '/dashboard/profile',
  },
]

interface Props {}

export const Sidebar: FC<Props> = async () => {
  const session = await getServerSession(authOptions)
  const userRoles = session?.user?.roles ?? ['Client']

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/dashboard/' title='home'>
            <Image
              src='https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
              className='w-32'
              alt='tailus logo'
              width={50}
              height={50}
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          <Image
            src={
              session?.user?.image ||
              'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
            }
            alt=''
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
            width={150}
            height={150}
          />

          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {session?.user?.name || 'John Doe'}
          </h5>

          <span className='hidden text-gray-400 lg:block'>
            {userRoles?.join(' ')}
          </span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <LogoutButton />
      </div>
    </aside>
  )
}
