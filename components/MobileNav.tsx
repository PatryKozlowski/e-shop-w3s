import React from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { openMobileNav } from '../redux/mobileNavMenuSlice'
import HamburegerButton from './HamburegerButton'
import Logo from './Logo'

const MobileNav = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpenNavMenu = useAppSelector((state) => state.mobileNav.isMobileNavOpen)
  const handleOenMenu = React.useCallback(() => {
    dispatch(openMobileNav(!isOpenNavMenu))
  }, [dispatch, isOpenNavMenu])

  return (
    <nav className={'flex lg:hidden bg-black text-white fixed top-0 left-0 w-full z-50 mb-8'}>
      <div className={'flex items-center justify-between w-full'}>
        < Logo />
        <div className={'px-4 py-4 mr-2'}>
          <HamburegerButton
            isOpen={isOpenNavMenu}
            onClick={(handleOenMenu)}
            className={'cursor-pointer hover:scale-110 transition ease-in-out duration-300'}
          />
        </div>
      </div>
    </nav >
  )
}

export default MobileNav