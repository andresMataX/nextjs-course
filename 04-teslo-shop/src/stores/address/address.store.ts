import { Address } from '@/interfaces'
import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  address: Address
}

interface Actions {
  setAddress: (address: State['address']) => void
}

type AddressStore = State & Actions

const storeApi: StateCreator<AddressStore> = (set, get) => ({
  address: {
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
  },

  setAddress: (address) => {
    set({ address })
  },
})

export const useAddressStore = create<AddressStore>()(
  persist(storeApi, { name: 'address-store' })
)
