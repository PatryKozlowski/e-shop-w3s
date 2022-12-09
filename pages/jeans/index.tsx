import { NextPage } from 'next'
import Head from 'next/head'
import Products from '../../components/Products'

const Jeans: NextPage = () => {
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
      <Products />
    </>
  )
}

export default Jeans
