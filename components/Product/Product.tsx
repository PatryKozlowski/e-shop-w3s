import Image from 'next/image'
import Link from 'next/link'
import Sale from './Sale'
import New from './New'
import type Prisma from '@prisma/client'

interface Props {
  id: string
  name: string
  image: string
  price: number
  info: Prisma.JeansInfo
}

const Product = ({ id, name, image, price, info }: Props): JSX.Element => {
  return (
    <div className={'flex flex-col hover:scale-105 transition ease-in-out duration-300'}>
      {
        info !== 'none' ?
          <div className={'relative'}>
            {
              info === 'sale' ?
                <Sale />
                :
                info === 'new' ?
                  <New />
                  :
                  null
            }
          </div>
          :
          null
      }
      <Link href={`jeans/${id}`}>
        <Image
          src={image}
          alt={'Product image'}
          width={'0'}
          height={'0'}
          sizes={'100vw'}
          className={'w-full h-auto'}
        />
      </Link>
      <div className={'my-4'}>
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </div>
  )
}

export default Product
