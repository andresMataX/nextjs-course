import { SimplePokemon } from '@/pokemons'
import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface PokemonState extends PokemonActions {
  pokemons: Record<string, SimplePokemon>
}

interface PokemonActions {
  toggleFavorite: (pokemon: SimplePokemon) => void
  setFavorites: (pokemon: Record<string, SimplePokemon>) => void
}

// const getInitialState = (): Record<string, SimplePokemon> => {
//   if (typeof localStorage === 'undefined') return {}

// const pokemons = JSON.parse(localStorage.getItem('pokemon-storage') || '{}')

//   return pokemons
// }

const storeApi: StateCreator<PokemonState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  pokemons: {},

  setFavorites: (pokemons) => {
    set({ pokemons })
  },

  toggleFavorite: (pokemon) => {
    const { id } = pokemon

    if (get().pokemons[id]) {
      set((state) => {
        delete state.pokemons[id]
      })

      return
    }

    set((state) => {
      state.pokemons[id] = pokemon
    })
  },
})

export const usePokemonStore = create<PokemonState>()(
  persist(immer(storeApi), {
    name: 'pokemon-storage',
  })
)
