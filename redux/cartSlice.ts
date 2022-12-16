import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialProps {
  productsInCart: FormData[]
  totalPrice: number
  isCartOpen: boolean
}

const initialState: InitialProps = {
  productsInCart: [],
  totalPrice: 0,
  isCartOpen: false
}

interface FormData {
  id: string
  name: string
  description: string
  image: string
  price: number
  createdAt: Date
  updatedAt: Date
  size: string
  quantity: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload
    },

    addItemToCart: (state, action: PayloadAction<FormData>) => {
      const productInCart = state.productsInCart.find((product) => product.id === action.payload.id)
      const productInCartIndex = state.productsInCart.findIndex((product) => product.id === action.payload.id && product.size === action.payload.size)

      if (!productInCart) {
        state.productsInCart.push({ ...action.payload, quantity: 1 })
        state.totalPrice = state.productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
      }

      if (productInCartIndex > -1) {
        if (productInCart !== undefined) {
          state.productsInCart[productInCartIndex].quantity = state.productsInCart[productInCartIndex].quantity + 1
          state.totalPrice = state.productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
        }
      } else {
        if (productInCart !== undefined) {
          state.productsInCart.push({ ...action.payload, quantity: 1 })
          state.totalPrice = state.productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
        }
      }
    },
    deleteItemFromCard: (state, action) => {
      const productInCartIndex = state.productsInCart.findIndex((product) => product.id === action.payload.id && product.size === action.payload.size)

      if (state.productsInCart[productInCartIndex].quantity === 1) {
        state.productsInCart.splice(productInCartIndex, 1)
        state.totalPrice = state.productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
      } else {
        state.productsInCart[productInCartIndex].quantity = state.productsInCart[productInCartIndex].quantity - 1
        state.totalPrice = state.productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
      }
    }
  }
})

export const { openCart, addItemToCart, deleteItemFromCard } = cartSlice.actions
export const cartReducer = cartSlice.reducer
