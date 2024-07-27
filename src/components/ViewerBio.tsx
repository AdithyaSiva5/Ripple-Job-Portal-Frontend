import { useSelector } from "react-redux";
import "../pages/user/userHome/userHome.css"
import { Award, Briefcase, CircleArrowDownIcon, CircleArrowUp, GraduationCap, LocateIcon, Mail, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { UnFollowUser, cancelFollowRequest, followUser, getUserConnection, getUserDetails, getUserPost } from "../services/api/user/apiMethods";
import "../pages/user/landingPage/landing.css"



function ViewerBio() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const loggedUserId = userData._id;
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [connections, setConnections] = useState<any>({ connections: [] });
  const [loggedUserConnections, setLoggedUserConnections] = useState<any>(null);
  const [requested, setRequested] = useState<any>(null);
  const [Post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    getUserDetails(userId)
      .then((response: any) => {
        setUser(response.data.user);
        setConnections(response.data.connections || { connections: [] });
        const followers = response.data.connections?.connections || [];
        setIsConnected(followers.includes(loggedUserId));
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
    getUserPost({ userId: userId })
      .then((response: any) => {
        const postsData = response.data;
        setPost(postsData);
        console.log(postsData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      getUserConnection({ userId: loggedUserId })
        .then((response: any) => {
          const connectionData = response.data.connection;
          setLoggedUserConnections(connectionData.connections);
          setRequested(connectionData.requestSent);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUnFollowFromViewProfile = (user: any) => {
    UnFollowUser({ userId: loggedUserId, unfollowingUser: user?._id })
      .then((response: any) => {
        toast.error(`Unfollowed User`);
        setLoggedUserConnections(response.data.connection.connections);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFollowFromViewProfile = (followeduserId: string | undefined, followedUserName: string) => {
    followUser({ userId: loggedUserId, followingUser: followeduserId })
      .then((response: any) => {
        const connectionData = response.data.connection;
        setRequested(connectionData.requestSent);
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  const handleCancel = (user: any) => {
    cancelFollowRequest({ userId, cancelingUser: user?._id }).then((response: any) => {
      toast.error("Request Cancelled");
      setRequested(response.data.connection.requestSent);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className='bg-black'>
      <div>
        <div className="background w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 mt-7  relative ">
          <div className="profile-image w-40 h-40 absolute rounded-full border-4 border-white bottom-0 left-10 transform translate-y-1/2 overflow-hidden shadow-lg">
            <img className="w-full h-full object-cover" src={user.profileImageUrl} alt="Profile" />
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
                    user.profile.experience.map((exp: any, index: number) => (
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
                    user.profile.qualification.map((qual: any, index: number) => (
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
            <div className="flex gap-4">
              {location.pathname.startsWith('/visit-profile/bio/') && (
                <div>
                  {requested?.some((request: any) => request._id === userId) ? (
                    <button onClick={() => handleCancel(user)} className="text-xs flex gap-1 text-gray-600 font-semibold border px-2 py-1 rounded-md border-gray-600" >
                      Requested <CircleArrowDownIcon size={15} />
                    </button>
                  ) : loggedUserConnections?.some((connection: any) => connection._id === userId) ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleUnFollowFromViewProfile(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md ">
                        Turn down <CircleArrowDownIcon size={15} />
                      </button>
                      <Link to={`/chat?userId=${user._id}`} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md broder" >
                        Message <MessageCircle size={15} />
                      </Link>
                    </div>
                  ) : (
                    <button onClick={() => handleFollowFromViewProfile(userId, user.username)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">
                      Connect <CircleArrowUp size={15} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="contact w-full rounded-md mt-7  flex flex-col px-10 py-6 gap-4">
          <h3 className="text-lg font-bold dark:text-white text-white">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-semibold flex items-center gap-2 dark:text-white text-white">
                <Mail size={16} /> Email
              </p>
              <p className="text-sm text-white mt-1 dark:text-gray-300">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold flex items-center gap-2 dark:text-white text-white">
                <Phone size={16} /> Phone
              </p>
              <p className="text-sm text-white mt-1 dark:text-gray-300 ">{user.phone || "Not added"}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white flex items-center gap-2 dark:text-white">
                <LocateIcon size={16} /> Location
              </p>
              <p className="text-sm text-black mt-1 dark:text-gray-300 text-white">
                {user.profile?.location || user.companyProfile?.companyLocation || "Not added"}
              </p>
            </div>
          </div>
        </div>
        
      </div>
      <div className=" w-full bg-primary  mt-1 flex flex-col px-10 py-6">

        </div>
    </div>
  );
}

export default ViewerBio;