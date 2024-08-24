import { authOptions } from '@/auth/authOptions'
import { WidgetItem } from '@/components'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem title='Usuario conectado S-Side'>
        {JSON.stringify(session.user)}
        <br />
        {JSON.stringify(session)}
      </WidgetItem>
    </div>
  )
}

export default DashboardPage
