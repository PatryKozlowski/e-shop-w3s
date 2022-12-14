import React from 'react'
import { MdSupervisorAccount } from 'react-icons/md'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { openAccountMenu } from '../redux/accountMenuSlice'
import { openMobileNav } from '../redux/mobileNavMenuSlice'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const AccountIcon = (): JSX.Element => {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isOpenAccountMenu = useAppSelector((state) => state.accountMenu.isAccountMenuOpen)
  const isOpenNavMenu = useAppSelector((state) => state.mobileNav.isMobileNavOpen)

  const handleOpenAccountMenu = React.useCallback(() => {
    if (isOpenNavMenu) {
      dispatch(openMobileNav(!isOpenNavMenu))
    }
    dispatch(openAccountMenu(!isOpenAccountMenu))
  }, [dispatch, isOpenAccountMenu, isOpenNavMenu])

  const goToSignInPage = React.useCallback(async () => { await router.push('/login') }, [router])
  return (
    <MdSupervisorAccount
      size={36}
      className={'mr-2 hover:scale-110 tranistion ease-in-out duration-300 cursor-pointer'}
      onClick={session ? handleOpenAccountMenu : goToSignInPage}
    />
  )
}

export default AccountIcon
