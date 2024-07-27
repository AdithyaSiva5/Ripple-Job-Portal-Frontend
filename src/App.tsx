import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeDarkMode, setDarkMode } from "./utils/context/reducers/darkmodeSlice";
import Header from "./components/Header";
import UserProfileBar from "./components/UserProfileBar";
import FilterProvider from "./utils/context/jobfilterData/FilterProvider";


function App() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);



  useEffect(() => {
    const userTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      dispatch(removeDarkMode());
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark');
      dispatch(setDarkMode());
    }
  }, [])



  return (
    <>

      <FilterProvider>
        <div >

          <Header />

          <div className="home-main ">
            <div className="hidden lg:block home-section-1" id="mobile-menu-2">
              <UserProfileBar />
            </div>

            <Outlet />
          </div>
        </div>
      </FilterProvider>
    </>
  )
}

export default App
