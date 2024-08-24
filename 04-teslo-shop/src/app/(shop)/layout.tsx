import { auth } from '@/auth.config'
import { Footer, Sidebar, TopMenu } from '@/components'

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <main className='min-h-svh flex flex-col'>
      <div>
        <TopMenu />
        <Sidebar session={session} />
      </div>

      <div className='px-0 sm:px-10 flex-1'>{children}</div>

      <Footer />
    </main>
  )
}
