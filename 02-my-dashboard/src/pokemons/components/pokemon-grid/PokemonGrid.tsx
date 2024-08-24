import { SimplePokemon } from '@/pokemons'
import { FC } from 'react'
import { PokemonCard } from '../pokemon-card'

interface Props {
  pokemons: SimplePokemon[]
}

export const PokemonGrid: FC<Props> = ({ pokemons }) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-6 gap-5 items-center justify-center'>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
