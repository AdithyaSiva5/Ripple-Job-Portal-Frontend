import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import '../user/profilePage/Profile';

function ViewerProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />
      <div className="profile-wrapper px-48 mt-10" style={{ backgroundColor: "rgb(234, 233, 233)" }}>
        <div className="border profile-nav flex items-center justify-center gap-32 bg-white rounded-md">
          <button
            onClick={() => { navigate(`/visit-profile/bio/${userId}`) }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === `/visit-profile/bio/${userId}` ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            Profile
          </button>
          <button
            onClick={() => { navigate(`/visit-profile/posts/${userId}`) }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === `/visit-profile/posts/${userId}` ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            User Activity
          </button>
          <button
            onClick={() => { navigate(`/visit-profile/connections/${userId}`) }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === `/visit-profile/connections/${userId}` ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            User Connections
          </button>
          <button
            onClick={() => { navigate(`/visit-profile/jobs/${userId}`) }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === `/visit-profile/jobs/${userId}` ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            User Jobs
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ViewerProfile;
