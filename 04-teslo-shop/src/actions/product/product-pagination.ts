'use server'

import { Gender } from '@prisma/client'
import prisma from '../../lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * 12,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender,
      },
    })

    const totalCount = await prisma.product.count({
      where: {
        gender,
      },
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (error) {
    throw new Error('Error en productos')
  }
}
