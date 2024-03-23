import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
    currentTab: 0,
    currentLanguage: 'xx'
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
    },
    setCurrentLanguage: (state, actions) => {
        state.currentLanguage = actions.payload
    }
  }  
})

export const { setTheme, setCurrentTab, setCurrentLanguage } = mainSlice.actions
export default mainSlice.reducer