import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { useAppSelector } from '../hooks/useAppSelector'

const AccountMenu = (): JSX.Element => {
  const isOpenAccountMenu = useAppSelector((state) => state.accountMenu.isAccountMenuOpen)
  return (
    <div className={`fixed lg:top-20 top-24 right-0 lg:w-1/4 w-1/2 p-2 z-50 bg-black ${!isOpenAccountMenu ? 'translate-x-full' : 'translate-x-0'}  transition ease-in-out duration-300`}>
      <div className={'text-white flex flex-col items-center justify-between text-lg'}>
        <Link
          href={'/profile'}
          className={'p-2 hover:scale-105 transition ease-in-out duration-300'}
        >Profile
        </Link>
        <Link
          href={'/orders'}
          className={'p-2 hover:scale-105 transition ease-in-out duration-300'}
        >Orders
        </Link>
        <button className={'p-2 flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out duration-300'}>
          Log out
          <BiLogOut size={30}/>
        </button>
      </div>
    </div>
  )
}

export default AccountMenu
