import React from 'react'
import { MdClose, MdShoppingBag } from 'react-icons/md'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { openCart } from '../redux/cartSlice'
import CartItem from './CartItem'

const Cart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isOpenCart = useAppSelector((state) => state.cart.isCartOpen)
  const productsInCart = useAppSelector((state) => state.cart.productsInCart)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const handleOpenCart = React.useCallback(() => {
    dispatch(openCart(!isOpenCart))
  }, [dispatch, isOpenCart])
  return (
    <div className={`fixed top-15 bottom-0 right-0 z-50 w-full lg:w-1/2 h-full bg-white ${!isOpenCart ? 'translate-x-full' : 'translate-x-0'}  transition ease-in-out duration-300`}>
      <div className={'flex flex-col h-full'}>
        <div className={'flex items-center justify-center'}>
          <h2 className={'text-4xl font-bold text-center m-7'}>Shop Cart</h2>
          <div
            className={'absolute right-5 cursor-pointer hover:scale-125 transition ease-in-out duration-300'}
            onClick={handleOpenCart}
          >
            <MdClose
              size={30}
            />
          </div>
        </div>
        {
              productsInCart.length === 0 ?
                <div className={'flex justify-center items-center h-full'}>
                  <p className={'text-xl'}>
                    Your shopping cart is empty
                  </p>
                </div>
                :
                <div className={'overflow-auto h-screen'}>
                  {
                  productsInCart.map((product) => (
                    <CartItem
                      key={product.id + product.size}
                      product={product}
                    />
                  ))
                }
                </div>
            }
        {
              productsInCart.length === 0 ?
                null
                :
                <div className={'flex items-end'}>
                  <div className={'w-full flex justify-between items-center border-t-2'}>
                    <h3 className={'text-2xl font-bold mb-5 p-5 '}>Total: ${totalPrice.toFixed(2)}</h3>
                    <button
                      className={'flex items-center justify-center font-semibold w-48 h-15 border-2 border-black p-5 mr-5 hover:bg-gray-200 transition ease-in-out duration-300 cursor-pointer'}
                    >
                      <MdShoppingBag size={30}/> Buy
                    </button>
                  </div>
                </div>
            }
      </div>
    </div>
  )
}

export default Cart
