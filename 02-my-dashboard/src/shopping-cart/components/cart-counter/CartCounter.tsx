'use client'

import { useCounterStore } from '@/stores'
import { FC, useEffect } from 'react'

interface Props {
  value?: number
}

interface CounterResp {
  count: number
}

const getApiCounter = async () => {
  const data: CounterResp = await fetch('/api/counter').then((res) =>
    res.json()
  )

  return data
}

export const CartCounter: FC<Props> = ({ value = 10 }) => {
  // const [count, setCount] = useState(value)

  const count = useCounterStore((state) => state.count)
  const increase = useCounterStore((state) => state.addOne)
  const decrease = useCounterStore((state) => state.substractOne)
  const initCount = useCounterStore((state) => state.init)

  // useEffect(() => {
  //   initCount(value)
  // }, [initCount, value])

  useEffect(() => {
    getApiCounter().then(({ count }) => {
      initCount(count)
    })
  }, [initCount])

  return (
    <>
      <span className='text-9xl'>{count}</span>

      <div className='flex'>
        <button
          className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2'
          onClick={increase}
        >
          +1
        </button>

        <button
          className='flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2'
          onClick={decrease}
        >
          -1
        </button>
      </div>
    </>
  )
}
