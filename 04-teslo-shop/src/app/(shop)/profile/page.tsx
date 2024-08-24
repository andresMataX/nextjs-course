import { auth } from '@/auth.config'
import { Title } from '@/components'
import { redirect } from 'next/navigation'

const ProfilePage = async () => {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title={'Perfil'} />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className='text-3xl mb-10 mt-2'>{session.user.role}</h3>
    </>
  )
}

export default ProfilePage
