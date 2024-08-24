'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const tabOptions = [1, 2, 3, 4, 5]

interface Props {
  currentTab?: number
}

export const TabBar = ({ currentTab }: Props) => {
  const [selected, setSelected] = useState(currentTab || 1)

  const router = useRouter()

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
    router.refresh()
  }

  return (
    <div className='grid w-full grid-cols-5 space-x-2 rounded-xl bg-gray-400 p-2'>
      {tabOptions.map((option, index) => (
        <div key={index}>
          <input
            type='radio'
            id={option.toString()}
            className='peer hidden'
            checked={selected === option}
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(option)}
            className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  )
}
