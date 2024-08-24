'use server'

import prisma from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  await prisma.userAddress.delete({ where: { userId } })
}
