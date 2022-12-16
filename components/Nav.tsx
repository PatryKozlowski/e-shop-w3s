import React, { ReactNode } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { useAppSelector } from '../hooks/useAppSelector'
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'

interface Props {
  children: ReactNode
}

const Nav = ({ children }: Props): JSX.Element => {
  const isOpenNavMenu = useAppSelector((state) => state.mobileNav.isMobileNavOpen)
  const [isShowSubNav, setShowSubNav] = React.useState<boolean>(false)
  const { width } = useWindowDimensions()
  const SmallScreenCheck = React.useCallback((): boolean | undefined => {
    if (width !== null) {
      return width < 1024
    }
  }, [width])

  const isSmall = SmallScreenCheck()

  React.useEffect(() => {
    if (isSmall && isOpenNavMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpenNavMenu, isSmall])

  const handleSubMenu = React.useCallback(() => {
    if (!isSmall) {
      setShowSubNav(!isShowSubNav)
    }
  }, [isShowSubNav, isSmall])

  const subMenuAnimate = {
    enter: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.1 },
      transitionEnd: {
        display: 'none'
      }
    },
    exit: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.1 },
      transitionEnd: {
        display: 'block'
      }
    }
  }

  return (
    <nav
      className={`w-full h-full lg:w-[250px] bg-white z-30 fixed lg:overflow-auto
      top-0 flex flex-col items-center lg:translate-x-0 ${!isOpenNavMenu ? 'translate-x-full' : 'translate-x-0'}
      transition ease-in-out duration-300
      `}
    >
      <div className={'hidden lg:block'}>
        {children}
      </div>
      <div className={'px-3 py-16 font-roboto text-[18px] flex flex-col w-[150px] cursor-pointer text-gray-600'}>
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
          className={`lg:flex items-center navLink hoverNav ${isShowSubNav ? 'text-black font-semibold' : ''}`}
        >
          <Link href={'/jeans'}>
            Jeans
          </Link>
          <MdArrowDropDown
            size={30}
            className={'hidden lg:block'}
            onClick={handleSubMenu}
          />
        </div>
        <AnimatePresence>
          {
            isShowSubNav && !isSmall ?
              <motion.div
                className={'py-2 px-4 text-[15px] flex flex-col'}
                initial={'enter'}
                animate={isShowSubNav ? 'exit' : 'enter'}
                variants={subMenuAnimate}
                exit={'enter'}
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
              :
              null
          }
        </AnimatePresence>
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
      <div className={'px-3 w-[150px] font-roboto lg:text-[15px] flex flex-col'}>
        <Link
          href={'/'}
          className={'py-2 px-4 hoverNav'}
        >Contact
        </Link>
        <Link
          href={'/'}
          className={'py-2 px-4 hoverNav'}
        >Newsletter
        </Link>
        <Link
          href={'/'}
          className={'py-2 px-4 hoverNav'}
        >Subscribe
        </Link>
      </div>
    </nav >
  )
}

export default Nav
