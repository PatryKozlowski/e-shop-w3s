import Product from './Product/Product'

const Products = (): JSX.Element => {
  return (
    <div className={'flex flex-col px-4 lg:px-0'}>
      <p className={'my-4'}>8 items</p>
      <div className={'grid lg:grid-cols-4 grid-cols-2 gap-x-9'}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div >
  )
}

export default Products
