import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'default',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setTheme } = themeSlice.actions

export default themeSlice.reducer