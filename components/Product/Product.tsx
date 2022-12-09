import Image from 'next/image'
import Sale from './Sale'

const Product = (): JSX.Element => {
  return (
    <div className={'flex flex-col'}>
      <div className={'relative'}>
        <Sale />
      </div>
      <Image
        src={'https://www.w3schools.com/w3images/jeans1.jpg'}
        alt={'Product image'}
        width={'0'}
        height={'0'}
        sizes={'100vw'}
        className={'w-full h-auto'}
      />
      <div className={'my-4'}>
        <p>Ripped Skinny Jeans</p>
        <p>$24.99</p>
      </div>
    </div>
  )
}

export default Product
