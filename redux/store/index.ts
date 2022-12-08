import { configureStore } from '@reduxjs/toolkit'
import { mobileNavMenuReducer } from '../mobileNavMenuSlice'

export const store = configureStore({
  reducer: {
    mobileNav: mobileNavMenuReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
