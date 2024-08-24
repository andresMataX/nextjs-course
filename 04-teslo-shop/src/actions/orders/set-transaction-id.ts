'use server'

import prisma from '@/lib/prisma'

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  const orderUpdated = await prisma.order.update({
    where: { id: orderId },
    data: { transaction_id: transactionId },
  })

  return orderUpdated
}
