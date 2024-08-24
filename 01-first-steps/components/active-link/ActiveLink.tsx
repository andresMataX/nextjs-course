'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import style from './ActiveLink.module.css'

interface Props {
  path: string
  text: string
}

export const ActiveLink: FC<Props> = ({ path, text }) => {
  const pathName = usePathname()

  return (
    <Link
      href={path}
      className={`${style.link} ${pathName === path && style['active-link']}`}
    >
      {text}
    </Link>
  )
}
