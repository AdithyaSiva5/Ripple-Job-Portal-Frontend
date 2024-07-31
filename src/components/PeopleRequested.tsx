import PeopleCard from "./PeopleCard"
import { useSelector } from "react-redux";
import "../pages/user/userHome/userHome.css"
import { useEffect, useState } from "react";
import { getUserConnection, } from "../services/api/user/apiMethods";



function PeopleRequested() {

    const selectUser = (state: any) => state.auth.user;

    const userData = useSelector(selectUser);
        
    const userId = userData._id;
    const [requested, setRequested] = useState<any>(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        try {
          setLoading(true);
    
            getUserConnection({ userId })
          .then((response: any) => {
            const connectionData = response.data.connection;
            setRequested(connectionData.requestSent);
       
            setLoading(false)
            
          })
          
          .catch((error) => {
            setLoading(false)
            console.log(error.message);
          });
        } catch (error) {
          setLoading(false)
          console.log(error);
        }
      }, []);
    

  
      if (loading) {
        return (
          <div className="">
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 dark:text-white">
              Loading ...
    
            </div>
    
          </div>
        )
      }
    
    return (
    
      <div>

      {!requested || requested.length === 0 ? (
       <div className="">
       <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 mt-10 text-red-600">
            No Requested Found

          </div>
         
       </div>
     ) : (
       <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
         {requested?.map((user: any) => (
        
           <PeopleCard user={user} updateRequested={setRequested}  />
          
         
        
         ))}
       </div>
     )}
     </div>
      
       )
}

export default PeopleRequested