
import { Link } from 'react-router-dom';

import "./registerSuccess.css";
import { useSelector } from 'react-redux';
import { darkMode } from '../../../utils/context/reducers/darkmodeSlice';
import { useEffect } from 'react';

function RegisterSucces() {
  const dark = useSelector(darkMode)

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [dark])
  return (
    <div className="flex h-screen">
      <div id='register' className="hidden login lg:flex items-center justify-center flex-1 bg-white text-black" >
      </div>

      <div className="w-full  lg:w-1/2 flex items-center justify-center">
        <div className='logo'>
          <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" alt="Logo" />
        </div>
        
        <div className="max-w-md w-full p-6">
          <p className="title text-4xl font-black mb-2 text-black dark:text-white">Registration successful.</p>
          <h1 className="text-sm mb-6 text-gray-500">Congratulations! Your registration was successful.</h1>
          
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
          </div>
          
          <div className="mt-4 text-xs text-gray-600 text-center">
          </div>
          
     
          <Link to="/login">     <button className="w-full text-sm bg-green-600 text-white p-3 mt-5 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
           Go back to login
          </button></Link>
          

            <Link to="/">          <button className="w-full text-green-600 text-sm bg-white p-2 mt-5 rounded-md hover:bg-gray-100  transition-colors duration-300 border border-green-600">   Go to Homepage       </button></Link>

    
        </div>
      </div>
    </div>
  );
}

export default RegisterSucces;
