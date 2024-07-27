
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


function SavedCollections() {
    const selectUser = (state: any) => state.auth.user;
    const user = useSelector(selectUser);
    const location = useLocation();
    const navigate = useNavigate();

    return (


        <div>


            <div className="home-section-2 ms-32 ">
                <div className="border  profile-nav flex items-center justify-around gap-20  bg-white rounded-md mt-5 mx-5" >
                    <button
                        onClick={() => { navigate('/saved/posts') }}
                        className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname === '/saved/posts' ? 'bg-black text-white' : ''
                            }`}
                    >
                        Saved Posts
                    </button>
                    <button
                        onClick={() => { navigate('/saved/jobs') }}
                        className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${location.pathname === '/saved/jobs' ? 'bg-black text-white' : ''
                            }`}
                    >
                        Saved Jobs
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

export default SavedCollections