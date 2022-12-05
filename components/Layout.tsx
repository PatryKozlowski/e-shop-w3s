import { ReactNode } from 'react'
import Banner from './Banner'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'
import Logo from './Logo'
import Nav from './Nav'
import Subscribe from './Subscribe'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className={'max-w-container mx-auto'}>
      <Nav>
        <Logo />
      </Nav>
      <main className={'w-[950px] ml-[250px] px-4'}>
        <Header />

        <Banner />

        {children}

        <Subscribe />

        <Contact />

        <Footer />
      </main>
    </div>
  )
}

export default Layout
