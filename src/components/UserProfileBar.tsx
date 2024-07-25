import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import '../pages/user/premiumPage/Premium.css'
function UserProfileBar() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const navigate = useNavigate()

  

  return (
    <>
      <div className="home-profile-card border border-green bg-secondary flex flex-col justify-around items-center  pt-6 px-6 ">
        <img className=" w-16 h-16 rounded-full border border-green" src={user.profileImageUrl} alt="" />
        <div className="flex flex-col items-center" >
          <p className="text-sm font-bold flex gap-1 items-center dark:text-white">{user.profile?.fullname || user.companyProfile?.companyName} </p>
          <p className="text-xs text-gray-400">{user.profile?.designation || user.companyProfile?.companyType}</p>
        </div>

        <button onClick={() => { navigate('/profile/bio') }} type="submit" className="w-full text-xs font-bold bg-gray-200 text-black p-3 rounded-md hover:bg-green-600 hover:text-white dark:bg-black dark:text-white dark:hover:bg-green-600  transition-colors duration-300">View Profile</button>


      </div>
      <div className=" home-info-card border border-green bg-secondary flex flex-col justify-around px-6">
        <div className="">
          <p className="text-sm font-bold dark:text-white">Availabilty</p>
          {user.isPremium && (
            <p className="premium-badge text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-1 px-3 mt-1 rounded-full text-center dark:text-white font-mono transition-all duration-300 ease-in-out hover:shadow-glow hover:scale-105">
              Premium User
            </p>
          )}
          <div className="flex space-x-2">


            {!user.isHiring ? (
              <p className="text-xs bg-green-600 text-white py-1 mt-1 w-32 rounded-full text-center">Available for work</p>

            ) : (<p className="text-xs bg-[#65a30d] text-white py-1 mt-1 w-32 rounded-full text-center">Recruiting </p>)}
            {user.userType === 'individual' ? (
              <p className="text-xs bg-purple-700 text-white  py-1 mt-1 w-32 rounded-full text-center">Individual</p>

            ) : (<p className="text-xs bg-red-500 text-black  py-1 mt-1 w-32 rounded-full text-center">Company </p>)}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-bold dark:text-white">Skills</p>
          {user.profile?.skills && user.profile.skills.length > 0 ? (
            <div className="mt-1 flex flex-wrap">
              {user.profile.skills.map((skill, index) => (
                <p key={index} className="text-xs bg-gray-200 dark:bg-gray-700 dark:text-white p-2 m-0.5 rounded-sm">
                  {skill}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              No skills added yet. Add skills to showcase your expertise!
            </p>
          )}
        </div>

        <button type="submit" onClick={()=>{navigate("/profile/settings")}} className=" mt-4 w-full text-xs font-bold bg-black text-white p-3 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 dark:hover:bg-green-600">Edit Profile</button>

      </div>
    </>
  )
}

export default UserProfileBar