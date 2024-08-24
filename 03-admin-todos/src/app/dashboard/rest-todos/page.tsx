export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from '@/lib/prisma'
import { NewTodo, TodosGrid } from '@/todos/components'

export const metadata = {
  title: 'Listado de tareas',
  description: 'Listado de tareas de la aplicación',
}

const RestTodosPage = async () => {
  const todos = await prisma.todo.findMany({
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

export default RestTodosPage
