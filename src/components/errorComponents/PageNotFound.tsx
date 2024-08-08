
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { click, darkMode } from '../../utils/context/reducers/darkmodeSlice';
import { BsFillMoonStarsFill, BsSun } from 'react-icons/bs';
import Header2 from '../Header2';


const PageNotFound = () => {
  const dark = useSelector(darkMode)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [dark])
  return (
    <div className="dark:bg-fill min-h-screen " id="home">
      <Header2 />

      <div className="flex items-center justify-center min-h-full bg-white py-48">
        <div className="flex flex-col">


          <div className="flex flex-col items-center">
            <div className="text-green-600 font-bold text-5xl tracking-tight">404</div>

            <div className="font-bold  mt-5 text-3xl tracking-tight ">
              This page does not exist
            </div>

            <div className="text-gray-400 text-xs mt-8">
              The page you are looking for could not be found.
            </div>


            <Link to="/login" className="text-green-600 mt-4 text-xs hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
