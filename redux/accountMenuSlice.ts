import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface initialProps {
  isAccountMenuOpen: boolean
}

const initialState: initialProps = {
  isAccountMenuOpen: false
}

const accountMenuSlice = createSlice({
  name: 'mobileNav',
  initialState,
  reducers: {
    openAccountMenu: (state, action: PayloadAction<boolean>) => {
      state.isAccountMenuOpen = action.payload
    }
  }
})

export const { openAccountMenu } = accountMenuSlice.actions
export const accountMenuReducer = accountMenuSlice.reducer
