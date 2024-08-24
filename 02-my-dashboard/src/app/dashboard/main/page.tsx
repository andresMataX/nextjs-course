import { WidgetsGrid } from '@/components/widgets-grid'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin',
}

const MainPage = () => {
  return (
    <div>
      <h1 className='mt-2 text-3xl'>Dashboard</h1>

      <WidgetsGrid />
    </div>
  )
}

export default MainPage
