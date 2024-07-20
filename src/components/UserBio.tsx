import { useSelector } from "react-redux";
import "../pages/user/userHome/userHome.css"
import { LocateIcon, Mail, Phone } from "lucide-react";


function UserBio() {



  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  console.log(user)


  return (


    <div >
      <div >

        <div className="background w-full h-36 bg-gray-300 mt-7 rounded-t-md dark:bg-fill" ></div>
        <div className="bio bg-secondary w-full h-96 rounded-b-md pt-16 px-10">
          <div className="flex justify-between mb-4">

            <div className="flex space-x-2">
              {user.isPremium && (
                <p className="text-xs bg-red-600 text-black py-1 mt-1 w-32 rounded-full text-center dark:text-white">
                  Premium
                </p>
              )}

              {!user.isHiring ? (
                <p className="text-xs bg-green-600 text-white py-1 mt-1 w-32 rounded-full text-center dark:text-white">Available for work</p>

              ) : (<p className="text-xs bg-green-600 text-white py-1 mt-1 w-32 rounded-full text-center dark:text-white">Recruiting </p>)}
              {user.userType === 'individual' ? (
                <p className="text-xs bg-amber-500 text-black  py-1 mt-1 w-32 rounded-full text-center dark:text-white">Individual</p>

              ) : (<p className="text-xs bg-red-500 text-black  py-1 mt-1 w-32 rounded-full text-center dark:text-white">Company </p>)}
            </div>


          </div>

          <div className="flex gap-10">
            <p className="text-sm font-bold flex items-center gap-1 dark:text-white">{user.profile?.fullname || user.companyProfile?.companyName} </p>
            <p className="text-xs dark:text-white">{user.username}</p>

          </div>
          <div>


            <p className="text-xs  mb-5 dark:text-white">{user.profile?.designation || user.companyProfile?.companyType}</p>
            <p className="text-sm font-bold dark:text-white">About </p>
            <p className="text-xs w-1/2 dark:text-white">{user.profile?.about || user.companyProfile?.aboutCompany}</p>
          </div>
          <div>

            <p className="text-sm font-bold text-green-600 my-5" > 3 Connections </p>
          </div>
          <div className="flex gap-4">


          </div>

        </div>
        <div className="profile-image w-32 h-32 absolute rounded-lg border-4 border-white top-60 left-56">
          <img className="rounded-md w-full h-full" src={user.profileImageUrl} alt="" />
        </div>
        <div className="contact w-full h-40 rounded-md mt-7 bg-secondary flex flex-col px-10 pt-10 gap-2">
          <p className="text-sm font-bold dark:text-white">Contact Information</p>
          <div className="flex w-full gap-32">
            <div>
              <p className="text-xs font-semibold flex items-center gap-1 dark:text-white"><Mail size={15} /> Email</p>
              <p className="text-xs text-gray-500 mt-2 dark:text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold flex items-center gap-1 dark:text-white"><Phone size={15} /> Phone</p>
              <p className="text-xs text-gray-500 mt-2 dark:text-white">{user.phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold flex items-center gap-1 dark:text-white"><LocateIcon size={15} /> Location</p>
              <p className="text-xs text-gray-500 mt-2 dark:text-white">{user.profile?.location || user.companyProfile?.companyLocation}</p>
            </div>
          </div>

        </div>
      </div>

      {user.userType === 'individual' && (
        <div>


        </div>


      )}






    </div>




  );
}

export default UserBio;
