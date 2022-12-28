import React from 'react'
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import type { InputDisabledProps, ProfileFormProps, ResponseProps, UserAddressProps } from '../types/index'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { fetcher } from '../lib/fetcher'
import { FaCheck, FaEdit, FaUserEdit } from 'react-icons/fa'

const UserAddress = ({ userInfo }: UserAddressProps): JSX.Element => {
  const { data: session } = useSession()
  const methods = useForm<ProfileFormProps>()
  const { register, handleSubmit, control, setValue, formState: { errors } } = methods

  const nameInput = register('name', { required: true })
  const streetInput = register('street', { required: true })
  const cityInput = register('city', { required: true })
  const sexInput = register('sex', { required: true })
  const emailInput = register('email')

  const [isInputDisabled, setInputDisabled] = React.useState<InputDisabledProps>({
    nameInput: true,
    streetInput: true,
    cityInput: true,
    phoneInput: true,
    emailInput: true
  })

  const handleNameInputDisabled = React.useCallback(() => {
    setInputDisabled({
      ...isInputDisabled,
      nameInput: !isInputDisabled.nameInput
    })
  }, [isInputDisabled])

  const handleStreetInputDisabled = React.useCallback(() => {
    setInputDisabled({
      ...isInputDisabled,
      streetInput: !isInputDisabled.streetInput
    })
  }, [isInputDisabled])

  const handleCityInputDisabled = React.useCallback(() => {
    setInputDisabled({
      ...isInputDisabled,
      cityInput: !isInputDisabled.cityInput
    })
  }, [isInputDisabled])

  const handlePhoneInputDisabled = React.useCallback(() => {
    setInputDisabled({
      ...isInputDisabled,
      phoneInput: !isInputDisabled.phoneInput
    })
  }, [isInputDisabled])

  const handleSubmitForm: SubmitHandler<ProfileFormProps> = React.useCallback(async (data) => {
    if (!isInputDisabled.nameInput || !isInputDisabled.cityInput || !isInputDisabled.phoneInput || !isInputDisabled.streetInput) {
      toast.info('Disable editing', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light'
      })
      return
    }

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
  }, [isInputDisabled.cityInput, isInputDisabled.nameInput, isInputDisabled.phoneInput, isInputDisabled.streetInput])

  React.useEffect(() => {
    setValue('name', userInfo?.name)
    setValue('street', userInfo?.street)
    setValue('city', userInfo?.city)
    setValue('sex', userInfo?.sex)
    setValue('phoneNumber', userInfo?.phoneNumber)
    setValue('email', session?.user?.email as string)
  }, [session?.user?.email, setValue, userInfo?.city, userInfo?.name, userInfo?.phoneNumber, userInfo?.sex, userInfo?.street])

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={'flex flex-col items-center justify-center w-full lg:items-start space-y-4'}
    >
      <h2 className={'text-2xl mb-4 border-b-2 w-full text-center lg:text-left'}>User Address</h2>
      <div className={'flex items-center  justify-center  lg:justify-start space-x-3 w-full'}>
        <input
          type={'radio'}
          value={'Ms'}
          id={'sexFemale'}
          {...sexInput}
        />
        <label
          htmlFor={'sexFemale'}
        >
          Mrs
        </label>
        <input
          type={'radio'}
          value={'Mr'}
          id={'sexMale'}
          {...sexInput}
        />
        <label
          htmlFor={'sexMale'}
        >
          Mr
        </label>
      </div>
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={`mt-4 text-sm ${isInputDisabled.nameInput ? 'font-normal' : 'font-semibold'}`}>First name and las name</p>
      </div>
      <div className={'flex justify-between p-2 border-2 lg:w-1/2 w-72'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isInputDisabled.nameInput}
          placeholder={'Name'}
          {...nameInput}
        />
        {
            isInputDisabled.nameInput ?
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
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={`mt-4 text-sm ${isInputDisabled.streetInput ? 'font-normal' : 'font-semibold'}`}>Street</p>
      </div>
      <div className={'flex justify-between p-2 border-2 lg:w-1/2 w-72'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isInputDisabled.streetInput}
          placeholder={'Street'}
          {...streetInput}
        />
        {
            isInputDisabled.streetInput ?
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
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={`mt-4 text-sm ${isInputDisabled.cityInput ? 'font-normal' : 'font-semibold'}`}>City</p>
      </div>
      <div className={'flex justify-between p-2 border-2 lg:w-1/2 w-72'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          disabled={isInputDisabled.cityInput}
          placeholder={'City'}
          {...cityInput}
        />
        {
            isInputDisabled.cityInput ?
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
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={'mt-4 text-sm'}>Email</p>
      </div>
      <div className={'flex justify-between p-2 border-2 lg:w-1/2 w-72'}>
        <input
          className={'border-none outline-none w-full disabled:text-gray-400'}
          placeholder={'Email'}
          type={'text'}
          disabled
          {...emailInput}
        />
      </div>
      <div className={'border-t-2 lg:w-1/2 w-72 flex items-center'}>
        <p className={`mt-4 text-sm ${isInputDisabled.phoneInput ? 'font-normal' : 'font-semibold'}`}>Phone number</p>
      </div>
      <div className={'flex justify-between p-2 border-2 lg:w-1/2 w-72'}>
        <PhoneInputWithCountry
          className={'!border-none !outline-none focus:!border-none focus:!outline-none w-full disabled:!text-gray-400'}
          defaultCountry={'PL'}
          disabled={isInputDisabled.phoneInput}
          name={'phoneNumber'}
          control={control}
          rules={{
            validate: (value: string): boolean => isValidPhoneNumber(value)
          }}
        />
        {
              isInputDisabled.phoneInput ?
                <FaEdit
                  size={26}
                  className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                  onClick={handlePhoneInputDisabled}
                />
                :
                <FaCheck
                  size={26}
                  className={'ml-2 hover:scale-105 transition ease-in-out duration-300 cursor-pointer'}
                  onClick={handlePhoneInputDisabled}
                />
              }
      </div>
      {
            errors.phoneNumber ?
              <p className={'p-2 text-red-500'}>Invalid phone number</p>
              :
              null
        }
      <div className={'border-t-2 lg:w-1/2 w-72'}>
        <button className={'flex items-cente justify-center mt-4 p-2 lg:w-full w-72 border-2 hover:shadow transition ease-in-out duration-300'}>
          Save
          <FaUserEdit
            size={26}
            className={'ml-4'}
          />
        </button>
      </div>
    </form>
  )
}

export default UserAddress
