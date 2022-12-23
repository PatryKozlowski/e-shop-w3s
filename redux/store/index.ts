import { configureStore } from '@reduxjs/toolkit'
import { accountMenuReducer } from '../accountMenuSlice'
import { cartReducer } from '../cartSlice'
import { mobileNavMenuReducer } from '../mobileNavMenuSlice'

export const store = configureStore({
  reducer: {
    mobileNav: mobileNavMenuReducer,
    accountMenu: accountMenuReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
