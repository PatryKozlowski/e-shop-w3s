import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'

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
      <Layout>
        <div>
          <p>Jeans</p>
        </div>
      </Layout>
    </>
  )
}

export default Jeans
