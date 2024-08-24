export const revalidate = 604800 // 7 días

import { getProductBySlug } from '@/actions'
import {
  AddToCart,
  ProductMobileSlideshow,
  ProductSlideshow,
} from '@/components'
import { titleFont } from '@/config/fonts'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'No descripción',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'No descripción',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      <div className='col-span-1 md:col-span-2'>
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className='block md:hidden'
        />

        <ProductSlideshow
          images={product.images}
          title={product.title}
          className='hidden md:block'
        />
      </div>

      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className='text-lg mb-5 font-black'>${product.price}</p>

        <AddToCart product={product} />

        <h3 className='font-semibold text-sm'>Descripción</h3>

        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}

export default ProductPage
