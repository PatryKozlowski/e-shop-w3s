import React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { GrPowerReset } from 'react-icons/gr'
import { MdSupervisorAccount } from 'react-icons/md'
import { BsCheckLg } from 'react-icons/bs'
import isEmail from 'validator/lib/isEmail'
import { EMAIL_ERROR_VALIDATION, EMAIL_REQUIRED_VALIDATION } from '../../../lib/formValidation'
import { fetcher } from '../../../lib/fetcher'
import type { ResponseProps } from '../../../types/index'
import { toast } from 'react-toastify'
import Head from 'next/head'
import { NextPage } from 'next'

interface ForgotPasswordFormProps {
  email: string
}

const ForgotPassword: NextPage = () => {
  const [isSuccessMessage, setSuccessMessage] = React.useState<string>('')
  const methods = useForm<ForgotPasswordFormProps>()
  const { register, reset, handleSubmit, formState: { errors } } = methods
  const emailInput = register('email', {
    required: {
      value: true,
      message: EMAIL_REQUIRED_VALIDATION
    },
    validate: (email) => isEmail(email) || EMAIL_ERROR_VALIDATION
  })

  const handleSubmitRecoveryPassword: SubmitHandler<ForgotPasswordFormProps> = React.useCallback(async (data) => {
    try {
      const response: ResponseProps = await fetcher('/api/user/forgotpassword', {
        method: 'POST',
        body: data
      })
      if (response.status === 200) {
        setSuccessMessage(response.message)
      } else {
        toast.error(response.message, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light'
        })
        reset()
      }
    } catch (error) {
    }
  }, [reset])
  return (
    <>
      <Head>
        <title>Clothes shop - Recovery password</title>
        <meta
          name={'description'}
          content={'The best clothes on the world'}
        />
        <link
          rel={'icon'}
          href={'/favicon.ico'}
        />
      </Head>
      <div className={'flex flex-col items-center my-4 w-full'}>
        <form
          onSubmit={handleSubmit(handleSubmitRecoveryPassword)}
          className={'w-full flex flex-col justify-center items-center space-y-4'}
        >
          <div className={'flex items-center justify-center lg:flex-row flex-col mb-4 space-x-2'}>
            <MdSupervisorAccount size={50}/>
            <p className={'text-3xl'}>Recovery user password</p>
          </div>
          {
            isSuccessMessage ?
              <div className={'flex flex-col lg:flex-row items-center justify-center text-center text-green-500'}>
                <BsCheckLg
                  size={30}
                  className={'mr-2'}
                />
                <p className={'font-semibold'}>{isSuccessMessage}</p>
              </div>
              :
              <>
                <div className={'w-10/12 lg:w-1/2 flex flex-col space-y-2'}>
                  <input
                    className={`p-4 border-2 w-full ${errors.email ? 'border-red-500 outline-red-500' : ''}`}
                    placeholder={'E-mail'}
                    {...emailInput}
                  />
                  {
                errors.email?.message ?
                  <p className={'p-2 text-red-500'}>{errors.email?.message }</p>
                  :
                  null
                }
                </div>
                <button className={'flex items-center justify-center w-10/12 lg:w-1/2 border p-2 hover:bg-gray-300 transition-all ease-in-out duration-200'}>
                  Recovery Password
                  <GrPowerReset
                    size={30}
                    className={'ml-2'}
                  />
                </button>
                <div className={'flex items-center flex-col'}>
                  <Link
                    href={'/login'}
                    className={'text-sm underline mt-4'}
                  >
                    I want to log in
                  </Link>
                  <Link
                    href={'/register'}
                    className={'text-sm underline mt-4'}
                  >
                    Do you need an account?
                  </Link>
                </div>
                <button
                  className={'flex items-center justify-center w-full space-x-2 p-2 hover:shadow transition-all ease-in-out duration-200'}
                  onClick={async () => await signIn('google', { callbackUrl: 'http://localhost:3000' })}
                >
                  <FcGoogle size={30}/>
                  Sign in With Google
                </button>
              </>
            }
        </form>
      </div>
    </>
  )
}

export default ForgotPassword
