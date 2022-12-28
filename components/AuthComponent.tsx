import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdLogin, MdSupervisorAccount } from 'react-icons/md'
import { BiShow, BiHide } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EMAIL_ERROR_VALIDATION, EMAIL_REQUIRED_VALIDATION, PASSWORD_ERROR_VALIDATION, PASSWORD_REQUIRED_VALIDATION, REPEAT_PASSWORD_ERROR_VALIDATION } from '../lib/formValidation'
import isEmail from 'validator/lib/isEmail'
import { signIn } from 'next-auth/react'
import { fetcher } from '../lib/fetcher'
import { toast } from 'react-toastify'

interface AuthComponentForm {
  email: string
  password: string
  repeatPassword: string
}

interface ResponseProps {
  status: number
  message: string
}

const AuthComponent = (): JSX.Element => {
  const [isShowPassword, setShowPassword] = React.useState<boolean>(false)
  const [isShowRepeatPassword, setShowRepeatPassword] = React.useState<boolean>(false)

  const handleShowPassword = React.useCallback(() => { setShowPassword(!isShowPassword) }, [isShowPassword])
  const handleShowRepeatPassword = React.useCallback(() => { setShowRepeatPassword(!isShowRepeatPassword) }, [isShowRepeatPassword])
  // const session = useSession()

  const router = useRouter()
  const { route } = router
  const methods = useForm<AuthComponentForm>({ shouldUnregister: true })
  const { register, handleSubmit, reset, watch, unregister, formState: { errors } } = methods

  const handleSignIn: SubmitHandler<AuthComponentForm> = React.useCallback(async (data) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/'
      })
      if (response?.error) {
        toast.error(response.error, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light'
        })
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }, [reset])

  const handleSignUp: SubmitHandler<AuthComponentForm> = React.useCallback(async (data) => {
    try {
      const response: ResponseProps = await fetcher('/api/auth/signup', {
        method: 'POST',
        body: data
      })
      if (response.status === 200) {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
          callbackUrl: '/'
        })
        reset()
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
      }
    } catch (error) {
    }
  }, [reset])

  // React.useEffect(() => {
  //   if (session.status === 'authenticated') {
  //     void router.push('/')
  //   }
  // }, [router, session.status])

  const emailInput = register('email', {
    required: {
      value: true,
      message: EMAIL_REQUIRED_VALIDATION
    },
    validate: (email) => isEmail(email) || EMAIL_ERROR_VALIDATION
  })
  const passwordInput = register('password', {
    required: {
      value: true,
      message: PASSWORD_REQUIRED_VALIDATION
    },
    minLength: {
      value: 8,
      message: PASSWORD_ERROR_VALIDATION
    }
  })

  const repeatPasswordInput = register('repeatPassword', {
    required: {
      value: true,
      message: REPEAT_PASSWORD_ERROR_VALIDATION
    },
    minLength: {
      value: 8,
      message: PASSWORD_ERROR_VALIDATION
    },
    validate: (match) => {
      const password = watch('password')
      return match === password || REPEAT_PASSWORD_ERROR_VALIDATION
    }
  })

  React.useEffect(() => {
    if (route === '/login') {
      return () => unregister('repeatPassword')
    }
  }, [route, unregister])

  return (
    <div className={'flex flex-col items-center my-4'}>
      <form
        className={'w-full flex flex-col justify-center items-center mb-4'}
        onSubmit={route === '/login' ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp)}
      >
        <div className={'flex items-center justify-center mb-4 space-x-2'}>
          <MdSupervisorAccount size={50}/>
          <p className={'text-3xl'}>{route === '/login' ? 'Sign in' : 'Create an account'}</p>
        </div>
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
          <div className={`flex items-center border-2 ${errors.repeatPassword ? 'border-red-500 outline-red-500' : ''}`}>
            <input
              className={'p-4 border-none outline-none w-full'}
              placeholder={'Password'}
              type={isShowPassword ? 'text' : 'password'}
              {...passwordInput}
            />

            {
                isShowPassword ?
                  <BiHide
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowPassword}
                  />
                  :
                  <BiShow
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowPassword}
                  />

              }
          </div>
          {
            errors.password?.message ?
              <p className={'p-2 text-red-500'}>{errors.password?.message}</p>
              :
              null
            }
          {
            route === '/register' ?
              <div>
                <div className={`flex items-center border-2 ${errors.repeatPassword ? 'border-red-500 outline-red-500' : ''}`}>
                  <input
                    className={'p-4 border-none outline-none w-full'}
                    placeholder={'Repeat password'}
                    type={isShowRepeatPassword ? 'text' : 'password'}
                    {...repeatPasswordInput}
                  />
                  {
              isShowRepeatPassword ?
                <BiHide
                  size={30}
                  className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                  onClick={handleShowRepeatPassword}
                />
                :
                <BiShow
                  size={30}
                  className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                  onClick={handleShowRepeatPassword}
                />

              }
                </div>
                {
                  errors.repeatPassword?.message ?
                    <p className={'p-2 text-red-500'}>{errors.repeatPassword?.message}</p>
                    :
                    null
                }
              </div>
              :
              null
        }
          <button className={'p-2 bg-slate-400 hover:bg-slate-500 flex items-center justify-center cursor-pointer'}>
            {route === '/login' ? 'Sign in' : 'Create an account'}
            <MdLogin size={26}/>
          </button>
        </div>
        <div className={'flex items-center flex-col'}>
          <Link
            href={'/user/forgot-password'}
            className={'text-sm underline mt-4'}
          >
            Password recovery
          </Link>
          {
          route === '/login' ?
            <>
              <Link
                href={'/register'}
                className={'text-sm underline mt-4'}
              >
                Do you need an account?
              </Link>
            </>
            :
            <Link
              href={'/login'}
              className={'text-sm underline mt-4'}
            >
              I want to log in
            </Link>
        }
        </div>
      </form>
      <button
        className={'flex items-center justify-center w-1/2 space-x-2 p-2 hover:shadow transition-all ease-in-out duration-200'}
        onClick={async () => await signIn('google', { callbackUrl: 'http://localhost:3000' })}
      >
        <FcGoogle size={30}/>
        Sign in With Google
      </button>
    </div>
  )
}

export default AuthComponent
