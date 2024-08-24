import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('test1', 10),
      roles: ['admin', 'client'],
      todo: {
        create: [
          { description: 'Buy eggs', complete: true },
          { description: 'Buy milk' },
          { description: 'Buy bread' },
          { description: 'Make french toast' },
          { description: 'Eat french toast', complete: true },
          { description: 'Do laundry' },
          { description: 'Do dishes' },
        ],
      },
    },
  })

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Buy eggs', complete: true },
  //     { description: 'Buy milk' },
  //     { description: 'Buy bread' },
  //     { description: 'Make french toast' },
  //     { description: 'Eat french toast', complete: true },
  //     { description: 'Do laundry' },
  //     { description: 'Do dishes' },
  //   ],
  // })

  return NextResponse.json({ msg: 'Seed executed' })
}
