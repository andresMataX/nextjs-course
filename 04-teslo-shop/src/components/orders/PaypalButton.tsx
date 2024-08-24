'use client'

import { paypalCheckPayment, setTransactionId } from '@/actions'
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { FC } from 'react'

interface Props {
  orderId: string
  amount: number
}

export const PaypalButton: FC<Props> = ({ amount, orderId }) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = Math.round(amount * 100) / 100

  if (isPending) {
    return (
      <div className='space-y-5'>
        <div className='animate-pulse h-14 bg-gray-300 rounded' />
        <div className='animate-pulse h-14 bg-gray-300 rounded' />
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${roundedAmount}`,
            currency_code: 'USD',
          },
        },
      ],
      intent: 'CAPTURE',
    })

    const { transaction_id } = await setTransactionId(orderId, transactionId)

    if (!transaction_id) {
      throw new Error('No se pudo actualizar la orden')
    }

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()

    if (!details?.id) return

    await paypalCheckPayment(details.id)
  }

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
}
