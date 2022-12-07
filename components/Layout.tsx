import { ReactNode } from 'react'
import Banner from './Banner'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'
import Logo from './Logo'
import MobileHeader from './MobileHeader'
import Nav from './Nav'
import Subscribe from './Subscribe'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={'lg:max-w-container lg:mx-auto flex flex-col'}>
      <MobileHeader />
      <Nav>
        <Logo />
      </Nav>
      <main className={'lg:w-[950px] lg:ml-[250px] lg:px-4'}>
        <Header />

        <Banner />

        {children}

        <Subscribe />

        <Contact />

      </main>
      <Footer />
    </div>
  )
}

export default Layout
