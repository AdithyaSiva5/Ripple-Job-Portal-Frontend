import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

function UserProfileBar() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const navigate =useNavigate()
  return (
    <>
            <div className="home-profile-card bg-white flex flex-col justify-around items-center  pt-6 px-6">
          <img className=" w-16 h-16 rounded-full" src={user.profileImageUrl}alt="" />
          <div className="flex flex-col items-center" >
          <p className="text-sm font-bold flex gap-1 items-center">{user.profile?.fullname||user.companyProfile?.companyName} </p>
          <p className="text-xs text-gray-400">Mern Stack Developer</p>
          <p className="text-xs text-gray-400">{user.profile?.designation||user.companyProfile?.companyType}</p>
          </div>
          
          <button onClick={()=>{navigate('/profile/bio')}} type="submit" className="w-full text-xs font-bold bg-gray-200 text-black p-3 rounded-md hover:bg-green-600 hover:text-white   transition-colors duration-300">View Profile</button>


        </div>
    <div className=" home-info-card bg-white flex flex-col justify-around px-6">
      <div className="">
      <p className="text-sm font-bold">Availabilty</p>
      <p className="text-xs bg-green-600 text-white py-1 mt-1 w-32 rounded-full text-center">Available for work</p>
      </div>

      <div className="mt-4" >
      <p className="text-sm font-bold">connect & amount</p>
      <p className="text-xs text-green-600" >18 connections</p>
      <p className="text-xs text-green-600">4 connection request</p>

      </div>
    <div className="mt-4">
    <p className="text-sm font-bold">skills</p>
    <div className="mt-1 flex flex-wrap">
  <p className="text-xs bg-gray-200 p-2 m-0.5 rounded-sm flex-basis-1/2">UI Designer</p>
  <p className="text-xs bg-gray-200 p-2 m-0.5 rounded-sm flex-basis-1/2">Graphics</p>
  <p className="text-xs bg-gray-200 p-2 m-0.5 rounded-sm flex-basis-1/2">VFX</p>
  <p className="text-xs bg-gray-200 p-2 m-0.5 rounded-sm flex-basis-1/2">Front end-development</p>
</div>
    </div>

      <button type="submit" className=" mt-4 w-full text-xs font-bold bg-black text-white p-3 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Edit Profile</button>

    </div>
    </>
  )
}

export default UserProfileBar