import React, { useState, useEffect, useRef } from "react";
import { Bell, Bookmark, Mail } from "lucide-react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/context/reducers/authSlice";
import { click, darkMode } from "../utils/context/reducers/darkmodeSlice";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";




interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {

  const dark = useSelector(darkMode)
  const darkDispatch = useDispatch();

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [dark])


  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    navigate("/login");
  };


  return (
    <nav className="border z-10 bg-primary dark:border-none lg:px-6 py-2.5 h-16 sticky top-0" >
      
      
      <div className="flex flex-wrap justify-between">
        <a href="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Ripple logo"
          />
        </a>

        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 gap-5 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                onClick={()=>navigate('/home')}
                className="text-xs font-bold block py-2 pr-4 pl-3 text-accent border-b border-gray-100 hover:bg-green-50 lg:hover:bg-transparent lg:border-0 lg:p-0  lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-600 lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-xs font-bold block py-2 pr-4 pl-3 text-accent border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0  lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                People
              </a>
            </li>
            <li>
              <a
                onClick = {()=>navigate('/jobs/open-to-work/job-list')}
                className="text-xs font-bold block py-2 pr-4 pl-3 text-accent border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0  lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Jobs
              </a>
            </li>
          </ul>

          <form className="relative w-80 ms-52 me-6">
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="search-input text-xs bg-white h-8 px-5 w-full pr-10 rounded-full  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600  border border-gray-300"
                style={{
                  position: "relative",
                }}
              />
              <button
                type="submit"
                className="search-icon text-white rounded-full absolute bg-green-600 font-medium text-sm px-2 py-2"
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "2px",
                }}
              >
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <ul className="flex justify-between items-center gap-6">
            <li>
              <Bell color="gray" strokeWidth={1.5} size={20} />
            </li>
            <li>
              <Bookmark color="gray" strokeWidth={1.5} size={20} />
            </li>
            <li>
              <Mail color="gray" strokeWidth={1.5} size={20} />
            </li>
            <li>

                <div className="flex items-center lg:order-2 ms-1">
                   <div className='p-[5px] rounded-full border-black dark:border-white border-2 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white transition-all ease-in-out duration-300' onClick={() => {
                  darkDispatch(click())
    
                  if (dark) {
                    localStorage.setItem("theme", "dark")
                  } else {
                    localStorage.setItem("theme", 'light')
                  }
                }}>
                  {dark ? <BsSun className='text-sm dark:text-white dark:hover:text-black' /> : <BsFillMoonStarsFill className='text-sm ' />}
                </div>  
                </div>
            </li>
            <li className="relative">
              <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={toggleUserMenu}
              >
                <img
                  className="w-6 h-6 rounded-full border"
                  src={user.profileImageUrl}
                  alt="user photo"
                />
              </button>

              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg ${
                  isUserMenuOpen ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-2">
                  <span className="block text-xs font-semibold text-gray-900">
                   {user.name}
                  </span>
                  <span className="block text-xs text-gray-500 truncate">
                   {user.email}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                       onClick={handleLogout}
                      className="block px-4 py-2 font-semibold text-xs text-red-500 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
