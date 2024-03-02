import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
    currentTab: 0
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setTheme: (state, actions) => {
        state.theme = actions.payload
    },
    setCurrentTab: (state, actions) => {
        state.currentTab = actions.payload
    }
  }  
})

export const { setTheme, setCurrentTab } = mainSlice.actions
export default mainSlice.reducer