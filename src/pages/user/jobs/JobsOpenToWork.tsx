
import { useEffect } from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";


function JobsOpenToWork() {
  const selectUser = (state:any)=>state.auth.user;
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  useEffect(() => {
    if (user.isHiring===true) {
      navigate("/jobs/hiring/job-list");
    }
  },[user,  navigate]);
  return (


    <div>

               
      <div className="home-section-2">
      <div className="border  profile-nav flex items-center justify-center gap-20  bg-white rounded-md mt-5 mx-5" >
      <button onClick={()=>{navigate('/jobs/open-to-work/job-list')}} className="text-xs font-medium  text-gray-400 hover:text-white  focus:bg-black  focus:text-white px-7 py-2  rounded-md hover:bg-gray-800  transition-colors duration-300">Job Openings</button>
      <button onClick={()=>{navigate('/jobs/open-to-work/applications')}} className="text-xs font-medium  text-gray-400 hover:text-white  focus:bg-black  focus:text-white px-7 py-2  rounded-md hover:bg-gray-800  transition-colors duration-300">Applications</button>
      <button onClick={()=>{navigate('/jobs/open-to-work/interviews')}} className="text-xs font-medium  text-gray-400 hover:text-white  focus:bg-black  focus:text-white px-7 py-2  rounded-md hover:bg-gray-800  transition-colors duration-300">Interviews</button>

    </div>
        
        <div  className="home-scroll">
          <div className="home-scrollbox">
 
  <Outlet/>


          </div>
        </div>
    
      </div>

      <div className="hidden lg:block home-section-3" id="mobile-menu-2">
      <div className="border  profile-nav flex items-center justify-center gap-20  bg-white rounded-md mt-5 ms-4" >
      
    </div>
    
        <div className="home-people-scroll">
          <div className="home-scrollbox">
          </div>
        </div>
      </div>

    </div>
  )
}

export default JobsOpenToWork