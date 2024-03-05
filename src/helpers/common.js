import { useSelector, useDispatch } from "react-redux";
import { setTheme } from '../slice/mainSlice'
const theme = useSelector((state) => state.main.theme)
const dispatch = useDispatch()

export const switchTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
    if (theme === 'light') {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }