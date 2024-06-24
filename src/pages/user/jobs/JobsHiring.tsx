import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function JobsHiring() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user.isHiring === false) {
      navigate("jobs/open-to-work/job-list");
    }
  }, [user, navigate]);

  return (
    <div className='tho'>
      <div className="home-section-2">
        <div className='flex w-full'>
          <div className="border profile-nav flex items-center justify-center gap-20 bg-white rounded-md mx-5" >
            <button
              onClick={() => { navigate('/jobs/hiring/job-list') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/job-list' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Job Postings
            </button>
            <button
              onClick={() => { navigate('/jobs/hiring/applicants') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/applicants' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Applicants
            </button>
            <button
              onClick={() => { navigate('/jobs/hiring/interviews') }}
              className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
                location.pathname === '/jobs/hiring/interviews' ? 'bg-black text-white' : ''
              }`}
              type="submit"
            >
              Interviews
            </button>
          </div>
          <button
      onClick={() => navigate('/jobs/hiring/add-job')}
      className={`text-xs w-28 font-medium text-green-600 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
        location.pathname === '/jobs/hiring/add-job' ? 'bg-black text-white' : ' bg-white'
      }`}
      type="submit"
    >
      Add Job
    </button>
          <div className="border w-1/3 profile-nav flex items-center justify-center gap-20 bg-white rounded-md ms-4"></div>
        </div>
        <div className="home-scroll">
          <div className="home-scrollbox">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsHiring;
