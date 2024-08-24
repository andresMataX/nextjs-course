'use server'

import { authOptions } from '@/auth/authOptions'
import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  })

  if (!todo) {
    throw new Error('Todo not found')
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}

export const addTodo = async (description: string, userId: string) => {
  const session = await getServerSession(authOptions)

  const todo = await prisma.todo.create({
    data: { description, userId: session!.user!.id },
  })

  revalidatePath('/dashboard/server-todos')

  return todo
}

export const deleteCompleted = async () => {
  await prisma.todo.deleteMany({ where: { complete: true } })

  revalidatePath('/dashboard/server-todos')
}
