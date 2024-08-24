'use server'

import { auth } from '@/auth.config'
import { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    throw new Error('No hay sesión de usuario')
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  })

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((p) => p.id === item.productId)

      if (!product) throw new Error(`${item.productId} no existe`)

      const subTotal = product.price * productQuantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 0.15
      totals.total += subTotal * 1.15

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Actualizar stock
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((total, item) => item.quantity + total, 0)

        if (productQuantity === 0) {
          throw new Error('Error en la cantidad definida')
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`)
        }
      })

      // Crear orden y detalle
      const order = await tx.order.create({
        data: {
          created_by: userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
                product_id: p.productId,
              })),
            },
          },
        },
      })

      // Crear la dirección de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          address: address.address,
          city: address.city,
          firstName: address.firstName,
          lastName: address.lastName,
          phone: address.phone,
          postalCode: address.postalCode,
          address2: address.address2,
          country_id: address.country,
          order_id: order.id,
        },
      })

      return { order, orderAddress, updatedProducts }
    })

    return { order: prismaTx.order, prismaTx }
  } catch (error: any) {
    return { message: error?.message }
  }
}
