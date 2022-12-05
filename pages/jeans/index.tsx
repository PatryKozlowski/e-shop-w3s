import { NextPage } from 'next'
import Head from 'next/head'

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
      <div>
        <p>Jeans</p>
      </div>
    </>
  )
}

export default Jeans
