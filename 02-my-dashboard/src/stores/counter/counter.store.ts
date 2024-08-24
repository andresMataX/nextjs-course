import { StateCreator, create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface CounterState extends CounterActions {
  count: number
  isReady: boolean
}

interface CounterActions {
  addOne: () => void
  substractOne: () => void
  resetCount: (value: number) => void
  init: (value: number) => void
}

const storeApi: StateCreator<CounterState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  count: 5,
  isReady: false,

  init: (value) => {
    if (get().isReady) return

    set((state) => {
      state.count = value
      state.isReady = true
    })
  },

  addOne: () => {
    set((state) => {
      state.count += 1
    })
  },

  substractOne: () => {
    if (get().count === 0) return

    set((state) => {
      state.count -= 1
    })
  },

  resetCount: (value) => {
    if (value < 0) set({ count: 0 })

    set({ count: value })
  },
})

export const useCounterStore = create<CounterState>()(immer(storeApi))
