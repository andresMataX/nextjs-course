'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    throw new Error('No hay usuario')
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      OrderItem: {
        include: {
          product: {
            include: {
              ProductImage: {
                take: 1,
              },
            },
          },
        },
      },
      OrderAddress: true,
    },
  })

  if (session.user.role === 'user') {
    if (session.user.id !== order?.created_by) {
      throw `${order?.id} no corresponde con el usuario`
    }
  }

  return order
}
