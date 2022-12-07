import Logo from './Logo'

const MobileHeader = (): JSX.Element => {
  return (
    <header className={'flex lg:hidden px-4 bg-black text-white'}>
      < Logo />
    </header >
  )
}

export default MobileHeader
