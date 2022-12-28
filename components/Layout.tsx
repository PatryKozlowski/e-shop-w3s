import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import AccountMenu from './AccountMenu'
import Banner from './Banner'
import Cart from './Cart'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'
import Logo from './Logo'
import MobileNav from './MobileNav'
import Nav from './Nav'
import Subscribe from './Subscribe'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  const { route } = useRouter()

  return (
    <div className={'w-full lg:max-w-container lg:mx-auto flex flex-col'}>
      {/* <div> */}
      {
        route === '/user/forgot-password/[id]/[token]' ?
          null
          :
          <>
            <MobileNav />
            <Nav>
              <Logo />
            </Nav>
            <Header />

            {/* Account menu */}

            <AccountMenu />

            {/* Cart  */}

            <div className={'h-full'}>
              <Cart />
            </div>
          </>
      }
      <main className={'lg:w-[950px] lg:ml-[250px] lg:px-4 mt-28 lg:mt-0'}>
        {/* <main> */}
        { route === '/login' || route === '/register' || route === '/profile' || route === '/user/forgot-password' || route === '/user/forgot-password/[id]/[token]' ?
          <>
            {children}
          </>
          :
          <>
            <Banner />
            {children}

            <Subscribe />

            <Contact />
          </>
      }
      </main>
      { route === '/login' || route === '/register' || route === '/profile' || route === '/user/forgot-password' || route === '/user/forgot-password/[id]/[token]' ? null : <Footer />}
    </div>
  )
}

export default Layout
