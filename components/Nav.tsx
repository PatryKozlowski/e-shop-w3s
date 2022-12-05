import Link from 'next/link'
import React, { ReactNode } from 'react'
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'

interface Props {
  children?: ReactNode
}

const Nav = ({ children }: Props): JSX.Element => {
  const [isShowSubNav, setShowSubNav] = React.useState<boolean>(false)
  const handleSubMenu = React.useCallback(() => { setShowSubNav(!isShowSubNav) }, [isShowSubNav])

  return (
    <nav className={'max-h-full w-[250px] fixed top-0 overflow-auto'}>
      {children}
      <ul className={'py-16 font-roboto text-[18px] flex flex-col cursor-pointer text-gray-600'}>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Shirts
        </Link>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Dresses
        </Link>
        <li
          className={`flex items-center navLink hoverNav ${isShowSubNav ? 'text-black font-semibold' : ''}`}
          onClick={handleSubMenu}
        >
          Jeans
          <MdArrowDropDown size={30} />
        </li>
        <div className={`${isShowSubNav ? 'flex flex-col ' : 'hidden'} py-2 px-4 text-[15px] transition-all duration-300 ease-in-out`}>
          <Link
            className={'navLink hoverNav flex items-center'}
            href={'/'}
          >
            <MdArrowRight size={26} />
            Skinny
          </Link>
          <Link
            className={'navLink hoverNav flex items-center'}
            href={'/'}
          >
            <MdArrowRight size={26} />
            Relaxed
          </Link>
          <Link
            className={'navLink hoverNav flex items-center'}
            href={'/'}
          >
            <MdArrowRight size={26} />
            Bootcut
          </Link>
          <Link
            className={'navLink hoverNav flex items-center'}
            href={'/'}
          >
            <MdArrowRight size={26} />
            Straight
          </Link>
        </div>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Jackets
        </Link>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Gymwear
        </Link>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Blazers
        </Link>
        <Link
          className={'navLink hoverNav'}
          href={'/'}
        >Shoes
        </Link>
      </ul>
      <ul className={'font-roboto text-[15px]'}>
        <li className={'py-2 px-4 hoverNav'}>Contact</li>
        <li className={'py-2 px-4 hoverNav'}>Newsletter</li>
        <li className={'py-2 px-4 hoverNav'}>Subscribe</li>
      </ul>
    </nav>
  )
}

export default Nav
