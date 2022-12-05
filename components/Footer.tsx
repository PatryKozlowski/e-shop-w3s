import Link from 'next/link'

const Footer = (): JSX.Element => {
  return (
    <footer className={'flex items-center justify-center flex-col bg-black  text-white py-2 space-x-1'}>
      <Link
        className={'my-2'}
        href={'https://www.w3schools.com/w3css/default.asp'}
        target={'_blank'}
      >
        Powered by w3.css
      </Link>
      <Link
        className={'text-xs hover:underline'}
        href={'https://github.com/PatryKozlowski/e-shop-w3s'}
        target={'_blank'}
      >
        Refactoring Patryk Kozłowski
      </Link>
    </footer >
  )
}

export default Footer
