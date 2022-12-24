import React from 'react'
import type { GetServerSideProps } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaEdit, FaUserEdit, FaCheck } from 'react-icons/fa'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'
import { fetcher } from '../../lib/fetcher'
import { toast } from 'react-toastify'

interface ProfileFormProps {
  name: string
  street: string
  city: string
}

interface Props {
  userInfo: {
    name: string
    street: string
    city: string
  }
}

interface ResponseProps {
  status: number
  message: string
}

const Profile = ({ userInfo }: Props): JSX.Element => {
  const methods = useForm<ProfileFormProps>({
    defaultValues: {
      name: userInfo?.name,
      street: userInfo?.street,
      city: userInfo?.city
    }
  })
  const { register, handleSubmit } = methods

  const nameInput = register('name')
  const streetInput = register('street')
  const cityInput = register('city')

  const [isNameInputDisabled, setNameInputDisabled] = React.useState<boolean>(true)
  const [isStreetInputDisabled, setStreetInputDisabled] = React.useState<boolean>(true)
  const [isCityInputDisabled, setCityInputDisabled] = React.useState<boolean>(true)
  const handleNameInputDisabled = React.useCallback(() => { setNameInputDisabled(!isNameInputDisabled) }, [isNameInputDisabled])
  const handleStreetInputDisabled = React.useCallback(() => { setStreetInputDisabled(!isStreetInputDisabled) }, [isStreetInputDisabled])
  const handleCityInputDisabled = React.useCallback(() => { setCityInputDisabled(!isCityInputDisabled) }, [isCityInputDisabled])

  const handleSubmitForm: SubmitHandler<ProfileFormProps> = async (data) => {
    if (!isNameInputDisabled) return

    if (!isStreetInputDisabled) return

    if (!isCityInputDisabled) return

    try {
      const response: ResponseProps = await fetcher('/api/user/updateaddress', {
        method: 'POST',
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
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={'flex flex-col items-center lg:items-start space-y-4'}
    >
      <div className={'flex justify-between p-2 border-2 w-1/2'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isNameInputDisabled}
          placeholder={'Name'}
          {...nameInput}
        />
        {
            isNameInputDisabled ?
              <FaEdit
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleNameInputDisabled}
              />
              :
              <FaCheck
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleNameInputDisabled}
              />
        }
      </div>
      <div className={'flex justify-between p-2 border-2 w-1/2'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isStreetInputDisabled}
          placeholder={'Street'}
          {...streetInput}
        />
        {
            isStreetInputDisabled ?
              <FaEdit
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleStreetInputDisabled}
              />
              :
              <FaCheck
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleStreetInputDisabled}
              />
        }
      </div>
      <div className={'flex justify-between p-2 border-2 w-1/2'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isCityInputDisabled}
          placeholder={'City'}
          {...cityInput}
        />
        {
            isCityInputDisabled ?
              <FaEdit
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleCityInputDisabled}
              />
              :
              <FaCheck
                size={26}
                className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                onClick={handleCityInputDisabled}
              />
        }
      </div>
      <button className={'flex items-cente justify-center p-2 w-1/2 border-2 hover:shadow transition ease-in-out duration-300'}>
        Save
        <FaUserEdit
          size={26}
          className={'ml-4'}
        />
      </button>
    </form>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  const userInfo = await prisma.usersAdress.findUnique({ where: { userId: session?.user?.id } })

  return {
    props: {
      userInfo: JSON.parse(JSON.stringify(userInfo))
    }
  }
}
