import React from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { openAccountMenu } from '../redux/accountMenuSlice'
import { openMobileNav } from '../redux/mobileNavMenuSlice'
import AccountIcon from './AccountIcon'
import HamburegerButton from './HamburegerButton'
import Logo from './Logo'
import ShopingCart from './ShopingCart'

const MobileNav = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpenNavMenu = useAppSelector((state) => state.mobileNav.isMobileNavOpen)
  const isOpenAccountMenu = useAppSelector((state) => state.accountMenu.isAccountMenuOpen)

  const handleOenMenu = React.useCallback(() => {
    if (isOpenAccountMenu) {
      dispatch(openAccountMenu(!isOpenAccountMenu))
    }

    dispatch(openMobileNav(!isOpenNavMenu))
  }, [dispatch, isOpenNavMenu, isOpenAccountMenu])

  return (
    <nav className={'flex lg:hidden bg-black text-white fixed top-0 left-0 w-full z-50 mb-8'}>
      <div className={'flex items-center justify-between w-full'}>
        < Logo />
        <div className={'flex items-center justify-center'}>
          <AccountIcon />
          <ShopingCart />
          <div className={'px-4 py-4 mr-2'}>
            <HamburegerButton
              isOpen={isOpenNavMenu}
              onClick={(handleOenMenu)}
              className={'cursor-pointer hover:scale-110 transition ease-in-out duration-300'}
            />
          </div>
        </div>
      </div>
    </nav >
  )
}

export default MobileNav
