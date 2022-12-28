import React from 'react'
import { useRouter } from 'next/router'
import { MdSearch } from 'react-icons/md'
import { useAppSelector } from '../hooks/useAppSelector'
import ShopingCart from './ShopingCart'
import AccountIcon from './AccountIcon'

const Header = (): JSX.Element => {
  const [isShowSearchInput, setShowSeatchInput] = React.useState<boolean>(false)
  const handleShowSearchInput = React.useCallback(() => { setShowSeatchInput(!isShowSearchInput) }, [isShowSearchInput])
  const { route } = useRouter()
  const isOpenCart = useAppSelector((state) => state.cart.isCartOpen)
  const headerTitleFromRoute = React.useCallback((routeName: string): string => {
    const pageName = routeName.split('/')
    if (pageName.length > 3) {
      return pageName[2]?.charAt(0).toUpperCase() + pageName[2]?.slice(1)
    } else {
      return pageName[1]?.charAt(0).toUpperCase() + pageName[1].slice(1)
    }
  }, [])

  const isOnlyCategoryRoute = headerTitleFromRoute(route) === ''
  || headerTitleFromRoute(route) === 'Login'
  || headerTitleFromRoute(route) === 'Register'
  || headerTitleFromRoute(route) === 'User'

  React.useEffect(() => {
    if (isOpenCart) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpenCart])

  return (
    <header className={'hidden lg:block px-4 lg:px-0 w-full'}>
      <div className={`flex items-center p-2 ${isOnlyCategoryRoute ? 'justify-end' : 'justify-between'} `}>
        {
          !isOnlyCategoryRoute ?
            <p className={'ml-[250px] my-6 text-2xl font-light'}>{headerTitleFromRoute(route)}</p>
            :
            null
        }
        <div className={'flex items-center space-x-4 my-4'}>
          {
            !isOnlyCategoryRoute ?
              <div className={`hidden lg:flex items-center  ${isShowSearchInput ? 'border border-black' : 'border-none'} transition-all ease-in-out duration-700`}>
                <input
                  placeholder={'Search...'}
                  className={`p-2 border-none ${isShowSearchInput ? 'opacity-100 focus:outline-none' : 'opacity-0'} transition-all ease-in-out duration-700`}
                />
                <MdSearch
                  size={30}
                  className={'z-5 hover:scale-110 tranistion ease-in-out duration-300 cursor-pointer'}
                  onClick={handleShowSearchInput}
                />
              </div>
              :
              null
          }
          <AccountIcon />
          <ShopingCart />
        </div>
      </div>
    </header >
  )
}

export default Header
