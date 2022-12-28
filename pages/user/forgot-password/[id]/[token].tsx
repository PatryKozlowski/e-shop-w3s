import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { MdSupervisorAccount } from 'react-icons/md'
import { PASSWORD_ERROR_VALIDATION, PASSWORD_REQUIRED_VALIDATION, REPEAT_PASSWORD_ERROR_VALIDATION } from '../../../../lib/formValidation'
import { BiHide, BiShow } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import type { ResponseProps } from '../../../../types/index'
import { fetcher } from '../../../../lib/fetcher'
import { toast } from 'react-toastify'
import { BsCheckLg } from 'react-icons/bs'

interface ResetPasswordFormProps {
  password: string
  repeatPassword: string
}

const ResetPassword: NextPage = () => {
  const [isSuccessMessage, setSuccessMessage] = React.useState<string>('')
  const methods = useForm<ResetPasswordFormProps>()
  const { register, handleSubmit, reset, watch, formState: { errors } } = methods
  const router = useRouter()
  const { query } = router
  const id = query.id as string
  const token = query.token as string

  const [isShowPassword, setShowPassword] = React.useState({
    password: false,
    repeatPassword: false
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

  const handleShowPassword = React.useCallback(() => {
    setShowPassword({
      ...isShowPassword,
      password: !isShowPassword.password
    })
  }, [isShowPassword])

  const handleShowRepeatPassword = React.useCallback(() => {
    setShowPassword({
      ...isShowPassword,
      repeatPassword: !isShowPassword.repeatPassword
    })
  }, [isShowPassword])

  const handleSubmitResetPassword: SubmitHandler<ResetPasswordFormProps> = React.useCallback(async (data) => {
    try {
      const response: ResponseProps = await fetcher(`/api/user/resetpassword/${id}/${token}`, {
        method: 'PATCH',
        body: data
      })
      if (response.status === 200) {
        setSuccessMessage(response.message)
        setTimeout(async () => {
          await router.push('/login')
        }, 2000)
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
  }, [id, reset, router, token])
  return (
    <div className={'flex flex-col items-center my-4 w-full'}>
      <form
        onSubmit={handleSubmit(handleSubmitResetPassword)}
        className={'flex flex-col items-center justify-center w-full space-y-4'}
      >
        <div className={'flex items-center justify-center flex-col lg:flex-row mb-4 lg:space-x-2 text-center'}>
          <MdSupervisorAccount size={50}/>
          <p className={'text-3xl'}>Recovery user password - new password</p>
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
              null
        }
        {
            isSuccessMessage ?
              null
              :
              <div className={`flex items-center border-2 lg:w-1/2 w-72 ${errors.password ? 'border-red-500 outline-red-500' : ''}`}>
                <input
                  className={'p-4 border-none outline-none w-full'}
                  placeholder={'Password'}
                  type={isShowPassword.password ? 'text' : 'password'}
                  {...passwordInput}
                />

                {
                isShowPassword.password ?
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
            }
        {
            errors.password?.message && !isSuccessMessage ?
              <p className={'text-red-500'}>{errors.password?.message }</p>
              :
              null
            }
        {
            isSuccessMessage ?
              null
              :

              <div className={`flex items-center lg:w-1/2 w-72 border-2 ${errors.repeatPassword ? 'border-red-500 outline-red-500' : ''}`}>
                <input
                  className={'p-4 border-none outline-none w-full'}
                  placeholder={'Repeat password'}
                  type={isShowPassword.repeatPassword ? 'text' : 'password'}
                  {...repeatPasswordInput}
                />

                {
         isShowPassword.repeatPassword ?
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
        }
        {
            errors.repeatPassword?.message && !isShowPassword ?
              <p className={' text-red-500'}>{errors.repeatPassword?.message }</p>
              :
              null
        }
        {
            isSuccessMessage ?
              null :

              <div className={'border-t-2 lg:w-1/2 w-72'}>
                <button className={'flex items-center justify-center my-4 p-2 lg:w-full w-72 border-2 hover:shadow transition ease-in-out duration-300'}>
                  Reset Password
                  <GrPowerReset
                    size={30}
                    className={'ml-2'}
                  />
                </button>
              </div>
        }
      </form>
    </div>
  )
}

export default ResetPassword
