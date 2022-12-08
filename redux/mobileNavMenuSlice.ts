import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  isMobileNavOpen: false
}

const mobileNavMenuSlice = createSlice({
  name: 'mobileNav',
  initialState,
  reducers: {
    openMobileNav: (state, action: PayloadAction<boolean>) => {
      state.isMobileNavOpen = action.payload
    }
  }
})

export const { openMobileNav } = mobileNavMenuSlice.actions
export const mobileNavMenuReducer = mobileNavMenuSlice.reducer
