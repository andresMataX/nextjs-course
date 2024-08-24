import { StateCreator, create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  open: () => void
  close: () => void
}

type UiStore = State & Actions

const storeApi: StateCreator<UiStore> = (set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
})

export const useUiStore = create<UiStore>()(storeApi)
