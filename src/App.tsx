import { useNavigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { darkMode, removeDarkMode, setDarkMode } from "./utils/context/reducers/darkmodeSlice";
import Header from "./components/Header";
import UserProfileBar from "./components/UserProfileBar";

function App() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  const dark = useSelector(darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
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


      <div>

        <Header />

        <div className="home-main">
          <div className="hidden lg:block home-section-1" id="mobile-menu-2">
            <UserProfileBar />
          </div>

          <Outlet />
        </div>
      </div>

    </>
  )
}

export default App
