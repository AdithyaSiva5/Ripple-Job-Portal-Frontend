
import { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigate } from 'react-router-dom';


function SearchPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string | null>("");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchParamValue = searchParams.get("search");
        setSearchQuery(searchParamValue)

    }, [location.search]);


    return (


        <div>


            <div className="home-section-2 ms-32 ">
                <div className="border  profile-nav flex items-center justify-around gap-20  bg-white rounded-md mt-5 mx-5" >
                    <button
                        onClick={() => { navigate(`/search/posts?search=${searchQuery}`) }}
                        className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname.startsWith(`/search/posts`) ? 'bg-black text-white' : ''
                            }`}
                    >
                        Posts
                    </button>
                    <button
                        onClick={() => { navigate(`/search/people?search=${searchQuery}`) }}
                        className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname.startsWith(`/search/people`) ? 'bg-black text-white' : ''
                            }`}
                    >
                        People
                    </button>
                    <button
                        onClick={() => { navigate(`/search/jobs?search=${searchQuery}`) }}
                        className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname.startsWith(`/search/jobs`) ? 'bg-black text-white' : ''
                            }`}
                    >
                        Jobs
                    </button>
                </div>

                <div className="saved-post-scroll">
                    <div className="saved-post-scrollbox">
                        <Outlet />



                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchPage;