import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '../cartSlice'
import { mobileNavMenuReducer } from '../mobileNavMenuSlice'

export const store = configureStore({
  reducer: {
    mobileNav: mobileNavMenuReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
