'use client'

import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {}

interface FormInputs {
  name: string
  email: string
  password: string
}

export const RegisterForm: FC<Props> = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const router = useRouter()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { email, name, password } = data

    const resp = await registerUser(name, email, password)

    if (!resp.ok) {
      setErrorMessage(resp.message!)
      return
    }

    await login(email, password)
    router.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      {errors.name && (
        <span className='text-red-500'>El nombre es obligatorio</span>
      )}

      <label htmlFor='email'>Nombre nombre</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type='email'
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        {...register('password', { required: true })}
      />

      <span className='text-red-500'>{errorMessage}</span>

      <button className='btn-primary'>Ingresar</button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Ingresar
      </Link>
    </form>
  )
}
