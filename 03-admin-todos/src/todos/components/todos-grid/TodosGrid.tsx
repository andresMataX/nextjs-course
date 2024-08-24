'use client'

import { toggleTodo } from '@/todos/actions'
import { Todo } from '@prisma/client'
import { FC } from 'react'
import { TodoItem } from '..'

interface Props {
  todos?: Todo[]
}

export const TodosGrid: FC<Props> = ({ todos = [] }) => {
  // const router = useRouter()

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   await todosApi.updateTodo(id, complete)
  //   router.refresh()
  // }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
