import { Routes, Route, BrowserRouter as Router, useNavigate } from "react-router-dom";
import AdminRouter from './routes/AdminRouter';
import UserRouter from './routes/UserRouter';
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { darkMode, removeDarkMode, setDarkMode } from "./utils/context/reducers/darkmodeSlice";

function App() {

  const dark = useSelector(darkMode)
  const dispatch = useDispatch()

  useEffect(()=>{
    const userTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      dispatch(removeDarkMode());
      document.documentElement.classList.remove('dark')
    } else {
      dispatch(setDarkMode());
      document.documentElement.classList.add('dark');
    }
  }, [])

  return (
    <>
       
    <Router>
    <Toaster
  toastOptions={{
    unstyled: true,
    classNames: {
      error: 'text-red-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
      success: 'text-green-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
      warning: 'text-gray-300 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md', 
      info: 'text-black text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
    },
  }}
/>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </Router>
  </>
  )
}

export default App
