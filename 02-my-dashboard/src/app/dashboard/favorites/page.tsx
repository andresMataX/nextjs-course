import { PokemonFavorites } from '@/pokemons/components/pokemon-favorites'

export const metadata = {
  title: 'Favoritos',
  description: 'Página de favoritos',
}

const PokemonsPage = () => {
  return (
    <div className='flex flex-col'>
      <span className='my-2 text-5xl'>Pokemons favoritos</span>

      <PokemonFavorites />
    </div>
  )
}

export default PokemonsPage
