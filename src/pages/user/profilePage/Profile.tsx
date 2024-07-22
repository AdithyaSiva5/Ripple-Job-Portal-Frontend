import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="wrapper dark:bg-fill">
      <Header />
      <div className="profile-wrapper px-48 mt-10 dark:bg-fill" >
        <div className="border profile-nav flex items-center justify-center gap-52 bg-white rounded-md">
          <button
            onClick={() => { navigate('/profile/bio') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/profile/bio' ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            Profile
          </button>
          <button
            onClick={() => { navigate('/profile/user-posts') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/profile/user-posts' ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            User Activity
          </button>
          <button
            onClick={() => { navigate('/profile/settings') }}
            className={`text-xs font-medium text-gray-400 hover:text-white focus:bg-black focus:text-white px-7 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 ${
              location.pathname === '/profile/settings' ? 'bg-black text-white' : ''
            }`}
            type="submit"
          >
            Settings
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
