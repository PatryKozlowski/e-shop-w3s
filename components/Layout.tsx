import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Banner from './Banner'
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
    <div className={'mx-w-full lg:max-w-container lg:mx-auto flex flex-col'}>
      <MobileNav />
      <Nav>
        <Logo />
      </Nav>
      <Header />
      <main className={'lg:w-[950px] lg:ml-[250px] lg:px-4 mt-24 lg:mt-0'}>

        { route === '/login' || route === '/register'
          ?
            <>
              { children }
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
      { route === '/login' || route === '/register' ? null : <Footer />}
    </div>
  )
}

export default Layout
