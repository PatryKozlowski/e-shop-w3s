import React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { openCart } from '../redux/cartSlice'

const ShopingCart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpenCart = useAppSelector((state) => state.cart.isCartOpen)
  const itemInCart = useAppSelector((state) => state.cart.productsInCart)

  const handleOpenCart = React.useCallback(() => {
    dispatch(openCart(!isOpenCart))
  }, [dispatch, isOpenCart])

  return (
    <div
      className={'hover:scale-110 transition-all ease-in-out duration-200 cursor-pointer relative'}
      onClick={handleOpenCart}
    >
      {
            itemInCart ?
              <span className={'absolute bottom-6 left-3 text-lg'}>
                {
                itemInCart.length === 0 ?
                  null
                  :
                  itemInCart.length
                }
              </span>
              :
              null
        }
      <MdShoppingCart size={30} />
    </div>
  )
}

export default ShopingCart
