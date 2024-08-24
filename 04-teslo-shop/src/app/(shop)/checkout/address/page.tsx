import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'
import { AddressForm, Title } from '@/components'

const AddressPage = async () => {
  const countries = await getCountries()
  const session = await auth()

  if (!session?.user) {
    return (
      <h3 className='text-red-500 text-5xl'>500 - No hay sessión de usuario</h3>
    )
  }

  const address = (await getUserAddress(session.user.id)) ?? undefined

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm countries={countries} userStoredAddress={address} />
      </div>
    </div>
  )
}

export default AddressPage
