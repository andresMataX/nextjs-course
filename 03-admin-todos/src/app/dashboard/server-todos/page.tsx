export const dynamic = 'force-dynamic'
export const revalidate = 0

import { authOptions } from '@/auth/authOptions'
import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos/components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Listado de tareas | Server Actions',
  description: 'Listado de tareas de la aplicación',
}

const ServerTodosPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { description: 'asc' },
  })

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/todos')
  //     .then((resp) => resp.json())
  //     .then((data) => console.log(data))
  // }, [])

  return (
    <>
      <div className='w-full mx-5 px-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  )
}

export default ServerTodosPage
