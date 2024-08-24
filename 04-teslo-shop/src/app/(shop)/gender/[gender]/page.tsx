export const revalidate = 60

import { getPaginatedProductWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@prisma/client'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params

  const labels: Record<string, string> = {
    kid: 'Niños',
    men: 'Hombres',
    women: 'Mujeres',
    unisex: 'Todos',
  }

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductWithImages({
    page,
    gender: gender as Gender,
  })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  return (
    <>
      <Title
        title='Artículos por género'
        subtitle={`Productos de ${labels[gender]}`}
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}

export default CategoryPage
