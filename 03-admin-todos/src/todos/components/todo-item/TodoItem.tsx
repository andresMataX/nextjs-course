'use client'

import { Todo } from '@prisma/client'
import { FC, startTransition, useOptimistic } from 'react'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import styles from './TodoItem.module.css'

interface Props {
  todo: Todo
  toggleTodo: (id: string, complete: boolean) => void
}

export const TodoItem: FC<Props> = ({ todo, toggleTodo }) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  )
  const onToggleTodo = async () => {
    try {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete)
        toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
      })
    } catch (error) {
      startTransition(() => {
        toggleTodoOptimistic(!todoOptimistic.complete)
      })
    }
  }

  return (
    <div
      className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          onClick={onToggleTodo}
          className={`flex p-2 cursor-pointer rounded-md hover:bg-opacity-60  ${
            todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}
