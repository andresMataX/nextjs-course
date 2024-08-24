import { getOrderById } from '@/actions'
import { PaypalButton, Title } from '@/components'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { IoCartOutline } from 'react-icons/io5'

interface Props {
  params: { id: string }
}

const OrderPage = async ({ params }: Props) => {
  const { id } = params

  const order = await getOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div
          className={clsx(
            'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
            {
              'bg-red-500': !order.isPaid,
              'bg-green-500': order.isPaid,
            }
          )}
        >
          <IoCartOutline size={30} className='mr-2' />

          {order.isPaid ? <span>Pagada</span> : <span>Pendiente de pago</span>}
        </div>

        {order.OrderItem.map((order, index) => (
          <div key={index} className='flex mb-5'>
            <Image
              src={`/products/${order.product.ProductImage[0].url}`}
              alt={order.product.title}
              width={100}
              height={100}
              className='mr-5 rounded'
            />

            <div className=''>
              <span className='text-xl mr-5'>{order.product.title}</span>
              <span className='text-gray-500'>
                {order.price} x {order.quantity}
              </span>
              <p>Subtotal: ${order.product.price * order.quantity}</p>
            </div>
          </div>
        ))}

        <div>
          <div className='shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
              <p>
                Nombre: {order.OrderAddress!.firstName}{' '}
                {order.OrderAddress!.lastName}
              </p>
              <p>Dirección: {order.OrderAddress!.address}</p>
              <p>Ciudad: {order.OrderAddress!.city}</p>
              <p>País: {order.OrderAddress!.country_id}</p>
              <p>Código postal: {order.OrderAddress!.postalCode}</p>
            </div>

            <div className='w-full h-0.5 bg-gray-200 my-5 rounded-lg' />

            <h2 className='text-2xl mb-2'>Resumen de orden</h2>

            <div className='grid grid-cols-2'>
              <span>No. productos</span>
              <span className='text-right'>
                {order.OrderItem.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>

              <span>Subtotal</span>
              <span className='text-right'>
                {currencyFormat(order.subTotal)}
              </span>

              <span>Impuestos</span>
              <span className='text-right'>{currencyFormat(order.tax)}</span>

              <span className='mt-5 text-2xl font-bold'>Total</span>
              <span className='mt-5 text-right'>
                {currencyFormat(order.total)}
              </span>
            </div>

            <div className='my-5'>
              <PaypalButton orderId={order.id} amount={order.total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
