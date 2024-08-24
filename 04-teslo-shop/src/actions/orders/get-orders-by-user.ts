'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrdersByUser = async () => {
  const session = await auth()

  if (!session?.user) {
    throw `User not autheticated`
  }

  const orders = await prisma.order.findMany({
    where: { created_by: session.user.id },
    include: {
      OrderAddress: {
        select: { firstName: true, lastName: true },
      },
    },
  })

  return orders
}
