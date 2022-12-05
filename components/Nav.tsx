import Link from 'next/link'
import React, { ReactNode } from 'react'
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

const Nav = ({ children }: Props): JSX.Element => {
  const [isShowSubNav, setShowSubNav] = React.useState<boolean>(false)
  const handleSubMenu = React.useCallback(() => { setShowSubNav(!isShowSubNav) }, [isShowSubNav])

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5
      },
      display: 'block'
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
        delay: 0.3
      },
      transitionEnd: {
        display: 'none'
      }
    }
  }

  return (
    <nav className={'max-h-full w-[250px] fixed top-0 overflow-auto'}>
      {children}
      <div className={'py-16 font-roboto text-[18px] flex flex-col cursor-pointer text-gray-600'}>
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
        <div
          className={`flex items-center navLink hoverNav ${isShowSubNav ? 'text-black font-semibold' : ''}`}
          onClick={handleSubMenu}
        >
          <Link href={'/jeans'}>
            Jeans
          </Link>
          <MdArrowDropDown size={30} />
        </div>
        <motion.div
          className={'py-2 px-4 text-[15px] flex flex-col'}
          initial={'exit'}
          animate={isShowSubNav ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          <Link
            className={'navLink hoverNav flex items-center'}
            href={'/jeans/skinny'}
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
        </motion.div>
        <div className={'flex flex-col'}>
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
        </div>
      </div>
      <ul className={'font-roboto text-[15px]'}>
        <li className={'py-2 px-4 hoverNav'}>Contact</li>
        <li className={'py-2 px-4 hoverNav'}>Newsletter</li>
        <li className={'py-2 px-4 hoverNav'}>Subscribe</li>
      </ul>
    </nav>
  )
}

export default Nav
