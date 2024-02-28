import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUser } = userSlice.actions

export default userSlice.reducer