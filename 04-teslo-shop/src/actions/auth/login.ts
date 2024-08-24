'use server'

import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })

    return 'Success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Error potríl de credenciales.'
        default:
          return 'Error desconocido.'
      }
    }
    throw error
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })

    return 'Sucess'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Error potríl de credenciales.'
        default:
          return 'Error desconocido.'
      }
    }
    throw error
  }
}
