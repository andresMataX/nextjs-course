import { ProductCard } from '@/components/product-card/ProductCard'
import { products } from '@/data/products'

const ProductsPage = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductsPage
