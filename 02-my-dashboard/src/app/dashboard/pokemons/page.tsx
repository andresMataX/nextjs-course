import { PokemonsResponse, SimplePokemon } from '@/pokemons'
import { PokemonGrid } from '@/pokemons/components/pokemon-grid'

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json())

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }))

  // throw new Error('Error al obtener los pokemons')

  return pokemons
}

const PokemonsPage = async () => {
  const pokemons = await getPokemons(151)

  return (
    <div className='flex flex-col'>
      <span className='my-2 text-5xl'>
        Listado de Pokemons <small>estático</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  )
}

export default PokemonsPage
