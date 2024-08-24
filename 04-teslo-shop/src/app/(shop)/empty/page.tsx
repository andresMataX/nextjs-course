import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

const EmptyPage = () => {
  return (
    <div className='flex justify-center items-center h-[800px]'>
      <IoCartOutline size={150} />

      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-black'>Tu carrito está vacío</h1>

        <Link href='/' className='underline mt-5'>
          Continúa comprando
        </Link>
      </div>
    </div>
  )
}

export default EmptyPage