'use client'

import { generatePaginationNumbers } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(+pageString) ? 1 : +pageString

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) return `${pathname}`

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  return (
    <div className='flex text-center justify-center mb-32 mt-10'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={24} />
            </Link>
          </li>

          {allPages?.map((page, i) => (
            <li className='page-item' key={i}>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    'bg-blue-500 text-white hover:bg-blue-300':
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
