'use client'

import { usePokemonStore } from '@/stores'
import { FC } from 'react'
import { IoHeartOutline } from 'react-icons/io5'
import { PokemonGrid } from '../pokemon-grid'

interface Props {}

// const pokemons = JSON.parse(localStorage.getItem('pokemon-storage') || '{}')

export const PokemonFavorites: FC<Props> = () => {
  const favoritePokemons = usePokemonStore((state) =>
    Object.values(state.pokemons)
  )

  return (
    <>
      {favoritePokemons.length > 0 ? (
        <PokemonGrid pokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </>
  )
}

const NoFavorites = () => {
  return (
    <div className='flex flex-col h-[50vh] items-center justify-center'>
      <IoHeartOutline size={100} className='text-red-500' />
      <span>No hay favoritos</span>
    </div>
  )
}
