
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation


const  PageNotFound = () => {
  return (
    <div>
    <nav  className=  " z-10 bg-white border px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="" className="flex items-center">
                <img src="https://i.postimg.cc/wvvhmZhZ/ripple-logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
               
            </a>
            <div className="flex items-center lg:order-2 ms-10">
                <a href="/signup"  className="inline-flex items-center justify-center px-5 py-2 mr-3 text-xs font-medium text-center border rounded-lg text-green-600 hover:bg-gray-100 ">Sign Up</a>
        
            </div>
            <div  className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                  
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-600 lg:dark:hover:bg-transparent dark:border-gray-700">About</a>
                    </li>
         
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                
                    <li>
                        <a href="#" className="text-xs block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-green-600  dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

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
