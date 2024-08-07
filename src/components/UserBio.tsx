import { useSelector } from "react-redux";
import "../pages/user/userHome/userHome.css";
import { Briefcase, Calendar, GraduationCap, LocateIcon, Mail, Phone } from "lucide-react";
import "../pages/user/landingPage/landing.css"

function UserBio() {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  return (
    <div className={`user-bio ${user.isPremium ? 'premium-user' : ''}`}>
      <div>
        <div className="background w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 mt-7 rounded-t-md relative">
          <div className="profile-image w-40 h-40 absolute rounded-full border-4 border-white bottom-0 left-10 transform translate-y-1/2 overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={user.profileImageUrl}
              alt="Profile"
            />
          </div>
        </div>
        <div className="bio bg-secondary w-full rounded-b-md pt-24 px-10 pb-10">
          <div className="flex justify-end mb-4">
            <div className="flex space-x-2">
              {user.isPremium && (
                <p className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-1 px-4 mt-1 rounded-full text-center font-bold shadow-md">
                  Premium Member
                </p>
              )}
              {!user.isHiring ? (
                <p className="text-xs bg-green-600 text-white py-1 px-4 mt-1 rounded-full text-center">
                  Available for work
                </p>
              ) : (
                <p className="text-xs bg-[#65a30d] text-white py-1 px-4 mt-1 rounded-full text-center">
                  Recruiting
                </p>
              )}
              <p className={`text-xs py-1 px-4 mt-1 rounded-full text-center ${user.userType === "individual" ? "bg-violet-500 text-black" : "bg-red-500 text-white"}`}>
                {user.userType === "individual" ? "Individual" : "Company"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">
                {user.profile?.fullname || user.companyProfile?.companyName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">@{user.username}</p>
            </div>
            <p className="text-md font-semibold dark:text-white">
              {user.profile?.designation || user.companyProfile?.companyType}
            </p>
            <div>
              <h3 className="text-lg font-bold dark:text-white mb-2">About</h3>
              <p className="text-sm dark:text-gray-300 mb-4">
                {user.profile?.about || user.companyProfile?.aboutCompany || "Not added"}
              </p>
            </div>
            {user.userType === "individual" && (
              <>
                <div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">Experience</h3>
                  {user.profile?.experience && user.profile.experience.length > 0 ? (
                    user.profile.experience.map((exp, index) => (
                      <div key={exp._id} className="mb-2">
                        <p className="text-sm font-semibold dark:text-white flex items-center">
                          <Briefcase size={16} className="mr-2" />
                          {exp.jobPosition} at {exp.companyName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Since {exp.yearOfJoining}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Not added</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">Education</h3>
                  {user.profile?.qualification && user.profile.qualification.length > 0 ? (
                    user.profile.qualification.map((qual, index) => (
                      <div key={qual._id} className="mb-2">
                        <p className="text-sm font-semibold dark:text-white flex items-center">
                          <GraduationCap size={16} className="mr-2" />
                          {qual.course} - {qual.institution}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Completed in {qual.yearOfCompletion}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Not added</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">Skills</h3>
                  {user.profile?.skills && user.profile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.profile.skills.map((skill, index) => (
                        <span key={index} className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Not added</p>
                  )}
                </div>
              </>
            )}
            <div>

            </div>
          </div>
        </div>
        <div className="contact w-full rounded-md mt-7 bg-secondary flex flex-col px-10 py-6 gap-4">
          <h3 className="text-lg font-bold dark:text-white">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-semibold flex items-center gap-2 dark:text-white">
                <Mail size={16} /> Email
              </p>
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold flex items-center gap-2 dark:text-white">
                <Phone size={16} /> Phone
              </p>
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold flex items-center gap-2 dark:text-white">
                <LocateIcon size={16} /> Location
              </p>
              <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                {user.profile?.location || user.companyProfile?.companyLocation || "Not added"}
              </p>
            </div>
            {user.userType === "individual" && (
              <>
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2 dark:text-white">
                    <Calendar size={16} /> Date of Birth
                  </p>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
                    {user.profile?.dateOfBirth ? formatDate(user.profile.dateOfBirth) : "Not added"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2 dark:text-white">
                    Gender
                  </p>
                  <p className="text-sm text-gray-600 mt-1 dark:text-gray-300 capitalize">
                    {user.profile?.gender || "Not added"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className=" w-full  mt-1 flex flex-col px-10 py-6">
        </div>
      </div>
    </div>
  );
}

export default UserBio;