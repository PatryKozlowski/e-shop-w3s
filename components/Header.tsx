import { useRouter } from 'next/router'
import React from 'react'
import { MdShoppingCart, MdSearch } from 'react-icons/md'

const Header = (): JSX.Element => {
  const [isShowSearchInput, setShowSeatchInput] = React.useState<boolean>(false)
  const handleShowSearchInput = React.useCallback(() => { setShowSeatchInput(!isShowSearchInput) }, [isShowSearchInput])
  const { route } = useRouter()
  const pageName = route.split('/')[1]
  const headerTitleFromRoute = React.useCallback((routeName: string): string => {
    return routeName.charAt(0).toUpperCase() + routeName.slice(1)
  }, [])
  return (
    <header className={''}>
      <div className={'w-full flex items-center justify-between p-2'}>
        <p className={'my-6 text-2xl font-light'}>{headerTitleFromRoute(pageName)}</p>
        <div className={'flex space-x-3 my-4'}>
          <div className={`flex items-center  ${isShowSearchInput ? 'border border-black' : 'border-none'} transition-all ease-in-out duration-700`}>
            <input
              placeholder={'Search...'}
              className={`p-2 border-none ${isShowSearchInput ? 'opacity-100 focus:outline-none' : 'opacity-0'} transition-all ease-in-out duration-700`}
            />
            <MdSearch
              size={30}
              className={'z-5 cursor-pointer'}
              onClick={handleShowSearchInput}
            />
          </div>
          <div className={'p-2 hover:scale-125 transition-all ease-in-out duration-200 cursor-pointer relative'}>
            <span className={'absolute bottom-7 left-5 text-lg font-semibold'}>0</span>
            <MdShoppingCart size={30} />
          </div>
        </div>
      </div>
    </header >
  )
}

export default Header
