import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import { FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { fetcher } from '../lib/fetcher'
import { PASSWORD_ERROR_VALIDATION, PASSWORD_REQUIRED_VALIDATION, REPEAT_PASSWORD_ERROR_VALIDATION } from '../lib/formValidation'
import type { ResponseProps } from '../types/index'

interface ChangePasswordProps {
  password: string
  newPassword: string
  confirmePassword: string
}

const PasswordChange = (): JSX.Element => {
  const methods = useForm<ChangePasswordProps>()
  const { register, handleSubmit, reset, watch, formState: { errors } } = methods

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
  const newPasswordInput = register('newPassword', {
    required: {
      value: true,
      message: PASSWORD_REQUIRED_VALIDATION
    },
    minLength: {
      value: 8,
      message: PASSWORD_ERROR_VALIDATION
    }
  })
  const confirmePasswordInput = register('confirmePassword', {
    required: {
      value: true,
      message: PASSWORD_REQUIRED_VALIDATION
    },
    minLength: {
      value: 8,
      message: PASSWORD_ERROR_VALIDATION
    },
    validate: (match) => {
      const password = watch('newPassword')
      return match === password || REPEAT_PASSWORD_ERROR_VALIDATION
    }
  })

  const handleSubmitChangePassword: SubmitHandler<ChangePasswordProps> = React.useCallback(async (data) => {
    try {
      const response: ResponseProps = await fetcher('/api/user/updatepassword', {
        method: 'PATCH',
        body: data
      })
      if (response.status === 200) {
        toast.success(response.message, {
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

  const [isShowPassword, setShowPassword] = React.useState({
    passwordInput: false,
    newPasswordInput: false,
    confirmePasswordInput: false
  })

  const handleShowPassword = React.useCallback(() => {
    setShowPassword({
      ...isShowPassword,
      passwordInput: !isShowPassword.passwordInput
    })
  },
  [isShowPassword])

  const handleShowMewPassword = React.useCallback(() => {
    setShowPassword({
      ...isShowPassword,
      newPasswordInput: !isShowPassword.newPasswordInput
    })
  },
  [isShowPassword])

  const handleShowConfirmePassword = React.useCallback(() => {
    setShowPassword({
      ...isShowPassword,
      confirmePasswordInput: !isShowPassword.confirmePasswordInput
    })
  },
  [isShowPassword])

  return (
    <form
      onSubmit={handleSubmit(handleSubmitChangePassword)}
      className={'flex flex-col items-center lg:items-start space-y-4'}
    >
      <h2 className={'text-2xl border-b-2 w-full text-center lg:text-left'}>Password change</h2>
      <div className={'lg:w-1/2 w-72 flex items-center'}>
        <p className={'mt-4 text-sm'}>Your password</p>
      </div>
      <div className={`flex items-center lg:w-1/2 w-72 p-2 border-2 ${errors.password ? 'border-red-500 outline-red-500' : ''}`}>
        <input
          className={'border-none outline-none w-full'}
          placeholder={'Password'}
          type={isShowPassword.passwordInput ? 'text' : 'password'}
          {...passwordInput}
        />

        {
                isShowPassword.passwordInput ?
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
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={'mt-4 text-sm'}>Your new password</p>
      </div>
      <div className={`flex items-center lg:w-1/2 w-72 p-2 border-2 ${errors.newPassword ? 'border-red-500 outline-red-500' : ''}`}>
        <input
          className={'border-none outline-none w-full'}
          placeholder={'New password'}
          type={isShowPassword.newPasswordInput ? 'text' : 'password'}
          {...newPasswordInput}
        />

        {
                isShowPassword.newPasswordInput ?
                  <BiHide
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowMewPassword}
                  />
                  :
                  <BiShow
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowMewPassword}
                  />

              }
      </div>
      {
            errors.newPassword?.message ?
              <p className={'p-2 text-red-500'}>{errors.newPassword?.message}</p>
              :
              null
      }
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={'mt-4 text-sm'}>Confirme your new password</p>
      </div>
      <div className={`flex items-center lg:w-1/2 w-72 p-2 border-2 ${errors.confirmePassword ? 'border-red-500 outline-red-500' : ''}`}>
        <input
          className={'border-none outline-none w-full'}
          placeholder={'Confirme new password'}
          type={isShowPassword.confirmePasswordInput ? 'text' : 'password'}
          {...confirmePasswordInput}
        />

        {
                isShowPassword.confirmePasswordInput ?
                  <BiHide
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowConfirmePassword}
                  />
                  :
                  <BiShow
                    size={30}
                    className={'mr-2 cursor-pointer hover:scale-105 transition ease-in-out duration-300'}
                    onClick={handleShowConfirmePassword}
                  />

              }
      </div>
      {
            errors.confirmePassword?.message ?
              <p className={'p-2 text-red-500'}>{errors.confirmePassword?.message}</p>
              :
              null
      }
      <div className={'border-t-2 lg:w-1/2 w-72'}>
        <button className={'flex items-cente justify-center my-4 p-2 lg:w-full w-72 border-2 hover:shadow transition ease-in-out duration-300'}>
          Change password
          <FaCheck
            size={26}
            className={'ml-4'}
          />
        </button>
      </div>
    </form>
  )
}

export default PasswordChange
