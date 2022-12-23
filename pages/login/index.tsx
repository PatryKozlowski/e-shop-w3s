import { NextPage } from 'next'
import Head from 'next/head'
import AuthComponent from '../../components/AuthComponent'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Clothes shop - Login</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <AuthComponent />
    </>
  )
}

export default Login
