import Product from './Product/Product'
import type Prisma from '@prisma/client'

interface Props {
  products: Prisma.Jeans[]
}
const Products = ({ products }: Props): JSX.Element => {
  const numberOfProducts = products?.length
  return (
    <section className={'flex flex-col px-4 lg:px-0'}>
      <p className={'my-4'}>{numberOfProducts} items</p>
      <div className={'grid lg:grid-cols-4 grid-cols-2 gap-x-9'}>
        {
          products?.map((product) => (
            <Product
              key={product.id}
              {...product}
            />
          ))
        }
      </div>
    </section >
  )
}

export default Products
