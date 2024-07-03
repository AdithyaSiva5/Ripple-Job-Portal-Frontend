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
            console.log(error.message);
          });
        } catch (error) {
          console.log(error);
        }
      }, []);
    

  
     
    
    return (
    
      <div>

      {loading ? (
       <div className="">
       <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
   
      
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