import { NextPage } from 'next'
import Head from 'next/head'

const Skinny: NextPage = () => {
  return (
    <>
      <Head>
        <title>Clothes shop - Skinny</title>
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
        <p>Skinny</p>
      </div>
    </>
  )
}

export default Skinny
