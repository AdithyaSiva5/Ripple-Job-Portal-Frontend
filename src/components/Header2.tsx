
import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { click, darkMode } from '../utils/context/reducers/darkmodeSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Header2() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: any) => location.pathname === path;
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";

  const dark = useSelector(darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);

  return (
    <div>
      <nav className=" z-10 bg-primary border dark:border-none px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <a onClick={() => navigate('/')} className="flex items-center">
            <img

              src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center lg:order-2 ms-10">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2 mr-3 text-xs font-medium text-center border rounded-lg text-green-600 border-gray-600 hover:bg-gray-100 "
            >

              {!user ? <a href="/login">Log in</a> : <a href="/login">{user.username}</a>}

            </a>
            <div
              className="p-[5px] rounded-full border-black dark:border-white border-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white transition-all ease-in-out duration-300"
              onClick={() => {
                dispatch(click());

                if (dark) {
                  localStorage.setItem("theme", "dark");
                } else {
                  localStorage.setItem("theme", "light");
                }
              }}
            >
              {dark ? (
                <BsSun className="text-sm dark:text-white dark:hover:text-black" />
              ) : (
                <BsFillMoonStarsFill className="text-sm " />
              )}
            </div>
          </div>

          <div
            className="hidden justify-between  items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <button
                  onClick={() => navigate('/about-us')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${isActive('/about-us')
                    ? 'text-green-500'
                    : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                    }`}
                >
                  About
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/features')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${isActive('/features')
                    ? 'text-green-500'
                    : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                    }`}
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate('/contact-us')}
                  className={`text-xs block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700 ${isActive('/contact-us')
                    ? 'text-green-500'
                    : 'text-gray-700 dark:text-gray-400 lg:hover:text-green-700 lg:dark:hover:text-green-600'
                    }`}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header2;
