import { CircleArrowUp,CircleCheck,CircleX,CircleArrowDownIcon,Ban, Target} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UnFollowUser, acceptFollowRequest, cancelFollowRequest, followUser, getUserConnection, rejectFollowRequest } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
function PeopleCard({ user, handleFollow ,updateConnection,updateRequested,updateRequests}: any) {
  
  const selectUser = (state: any) => state.auth.user;
  const currentUser = useSelector(selectUser);
  const userId = currentUser?._id
  const [connections,setConnections] = useState<any>(null);
  const [requested, setRequested] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);

        getUserConnection({ userId })
      .then((response: any) => {
        const connectionData = response.data.connection;
        setConnections(connectionData.connections);
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
  

  
  const location = useLocation();
  const handleAcceptRequest = (user:any)=>{

    acceptFollowRequest({userId,requestedUser:user?._id}).then((response:any)=>{
      updateRequests(response.data.connection.requested)
   
        toast.success("Request Accepted")
    })
}
const handleReject = (user:any)=>{
    rejectFollowRequest({userId,requestedUser:user?._id}).then((response:any)=>{
     
        toast.error("Request Rejected")
        updateRequests(response.data.connection.requested)
    })
}

const handleCancel = (user:any)=>{
  cancelFollowRequest({userId,cancelingUser:user?._id}).then((response:any)=>{
   
      toast.error("Request Cancelled")
    updateRequested(response.data.connection.requestSent)
  })
}

const handleUnFollow = (user:any) => {
  UnFollowUser({ userId, unfollowingUser: user?._id})
    .then((response: any) => {
      toast.error(`Unfollowed User`)
      console.log(response.data.connection);
      updateConnection(response.data.connection.connections)
    })
    .catch((error) => {
      console.log(error.message);
    });
};


const handleUnFollowFromViewProfile = (user:any) => {
  UnFollowUser({ userId, unfollowingUser: user?._id})
    .then((response: any) => {
      toast.error(`Unfollowed User`)
     
      setConnections(response.data.connection.connections)
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const handleFollowFromViewProfile = (foloweduserId:string,followedUserName:string) => {
  followUser({ userId, followingUser: foloweduserId })
    .then((response: any) => {
      const connectionData = response.data.connection;
      setRequested(connectionData.requestSent);
      
    
    })
    .catch((error:any) => {
      console.log(error.message);
    });
};


  const navigate=useNavigate()
  return (
    <>
        <div className=" home-recommed-section bg-secondary border border-green flex justify-between px-4 py-4 items-end" >
          <div>
            <div className="flex items-center">

          <img
        className="h-9 w-9 rounded-full border-2 p-.5 mb-3 border-green-600"
        src={user?.profileImageUrl}
        alt="Profile"
      /><div className="ml-2">{!user.isHiring?(
        <p className="text-xs bg-green-600 text-white py-1 mt-1 w-24 mb-5 rounded-full text-center">OpentoWork</p>

     ):( <p className="text-xs bg-red-600 text-white py-1 mt-1 w-12 mb-5 rounded-full text-center">Hiring </p>)}</div> 
            </div>
          <p className="text-sm font-semibold flex items-center gap-1 text-accent" > {user?.profile?.fullname||user?.companyProfile?.companyName} </p>
          <p className="text-xs text-gray-400">{user?.profile?.designation||user?.companyProfile?.companyType}</p>
          <p className="text-xs text-green-600 font-medium">{user?.profile?.location||user?.companyProfile?.companyLocation}</p>

          </div>   
       
          <div className="flex gap-2 justify-between">
          <button onClick={()=>{navigate(`/visit-profile/bio/${user?._id}`)}} className="text-xs border px-4 py-1 rounded-md border-green-600 text-accent">view</button>
           
          {location.pathname.startsWith('/visit-profile/connections/') && (
  <div>
    {requested?.some((request:any) => request._id === user?._id) ? (
      <button className="text-xs flex gap-1 text-gray-600 font-semibold border px-2 py-1 rounded-md border-gray-600" disabled>
        Requested <CircleArrowDownIcon size={15} />
      </button>
    ) : connections?.some((connection:any) => connection._id === user?._id) ? (
      <button onClick={() =>  handleUnFollowFromViewProfile(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">
        Turn Down <CircleArrowDownIcon size={15} />
      </button>
    ) : (
      <button onClick={() => handleFollowFromViewProfile(user?._id, user.username)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">
        Connect <CircleArrowUp size={15} />
      </button>
    )}
  </div>
)}

          {location.pathname === '/people/discover' && (
          <button  onClick={()=>handleFollow(user?._id,user.username)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">connect <CircleArrowUp size={15}/> </button>

      )}
      {location.pathname === '/people/connections' && (
          <button  onClick={()=>handleUnFollow(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">Turn down <CircleArrowDownIcon size={15}/> </button>

      )}
      {location.pathname === '/people/requests' && (
        <div className="flex gap-2">
                    <button  onClick={()=>handleAcceptRequest(user)} className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600">Accept <CircleCheck size={15}/> </button>
          <button  onClick={()=>handleReject(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">Reject <CircleX size={15}/> </button>

        </div>
      )}
      {location.pathname === '/people/requested' && (
          <button  onClick={()=>handleCancel(user)} className="text-xs flex gap-1 text-red-600 font-semibold border px-2 py-1 rounded-md border-red-600">Cancel  <Ban size={15}/> </button>
          )}
          </div>
        


        </div>
    </>
  )
}

export default PeopleCard


