import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { deleteItemFromCard } from '../redux/cartSlice'

interface Props {
  product: {
    id: string
    name: string
    size: string
    price: number
    image: string
    quantity: number
  }
}

const CartItem = ({ product }: Props): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleDeleteItem = React.useCallback(() => { dispatch(deleteItemFromCard(product)) }, [dispatch, product])
  return (
    <Link
      href={`/${product?.id}`}
    >
      <div className={'relative p-5 mb-2 flex border cursor-pointer hover:scale-95 transition ease-in-out duration-300'}>

        <Image
          src={product?.image}
          alt={'Product image'}
          width={'100'}
          height={'100'}
        />
        <div className={'ml-4 flex flex-col'}>
          <p>Name: {product?.name}</p>
          <p>Size: {product?.size}</p>
          <p>Quantity: {product?.quantity}</p>
          <p>Price: ${product?.price}</p>
          {
          product.quantity > 1 ?
            <p className={'font-semibold'}>Total: ${product?.price * product?.quantity}</p>
            :
            null
        }
        </div>
        <button
          className={'absolute top-5 right-5 w-10 h-10 border flex justify-center items-center rounded-full hover:scale-110 transition ease-in-out duration-300'}
          onClick={handleDeleteItem}
        >
          <MdDelete size={30}/>
        </button>
      </div>
    </Link>

  )
}

export default CartItem
