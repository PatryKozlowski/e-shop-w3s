import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import AuthComponent from '../../components/AuthComponent'

const Register: NextPage = () => {
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
        <title>Clothes shop - Create an account</title>
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

export default Register
