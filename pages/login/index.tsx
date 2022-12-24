import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import AuthComponent from '../../components/AuthComponent'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const session = useSession()
  const router = useRouter()
  React.useEffect(() => {
    if (session.status === 'authenticated') {
      void router.push('/')
    }
  }, [router, session.status])

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
