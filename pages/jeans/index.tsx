import Head from 'next/head'
import Products from '../../components/Products'
import type { GetStaticProps } from 'next'
import type { ProductsProps } from '../../types'
import prisma from '../../lib/prisma'

const Jeans = ({ products }: ProductsProps): React.ReactElement => {
  return (
    <>
      <Head>
        <title>Clothes shop - Jeans</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <Products products={products}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await prisma.jeans.findMany()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Jeans
