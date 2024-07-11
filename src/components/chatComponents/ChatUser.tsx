import { PlusCircle, X } from 'lucide-react'
import { Modal} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addConversation, getUserConnection } from '../../services/api/user/apiMethods';
import Friend from './Friend';
import { toast } from 'sonner';
 
  
function ChatUsers({conversations,user,setCurrentChat,  onlineUsers  ,setConversations}:any) {
    const [openModal, setOpenModal] = useState(false);

    
    const selectUser = (state: any) => state.auth.user;

    const userData = useSelector(selectUser);
        
    const userId = userData._id;
    const [userlist, setUserlist] = useState<any>(null);
    const [loading, setLoading] = useState(true);
   
    
const handleAddConversation=(senderId:string,receiverId:string) => {
  addConversation({senderId,receiverId})  .then((response: any) => {
    const conversationData = response.data;

    
    const existChat = conversations.filter((con:any)=>con._id===conversationData._id);
    if(!existChat.length){
        setConversations((prev:any) => [...prev, conversationData]);
    }      
    setCurrentChat(conversationData)
      setOpenModal(false)
       
   
  })
  .catch((error:any) => {
    toast.error(error.message)
    console.log(error.message);
  });
  

}


    useEffect(() => {
        try {
          setLoading(true);
    
            getUserConnection({ userId })
          .then((response: any) => {
            const connectionData = response.data.connection;
            setUserlist(connectionData.connections);
            setLoading(false);
           
          })
          .catch((error) => {
            console.log(error.message);
          });
        } catch (error) {
          console.log(error);
        }
      }, []);

  return (
    <div className="relative flex flex-col  h-full bg-white border-r border-gray-300  md:block transform transition-all duration-500 ease-in-out" style={{ width: '24rem' }}>
    <div className="flex justify-between px-3 pt-1 text-white">
      <div className="flex items-center w-full py-2">
  
        <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
              </svg>
            </button>
          </span>
          <input type="search" name="q"
                 className="w-full py-2 pl-12 text-xs text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
                 placeholder="Search..." autoComplete="off"/>
        </div>
      </div>
    </div>
   
    <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
    <ul className="flex flex-col  w-full h-screen px-2 select-none">
   
    {conversations && conversations?.map((conversation:any)=>(
    <div onClick={()=>setCurrentChat(conversation)}>

      <Friend CurrentUser={user}  onlineUsers={onlineUsers} conversation={conversation}/>
    </div>
   ))}
   


 
  </ul>
    </div>
    <div className="fixed bottom-0 right-0 z-40 mb-6 mr-4">
      <button onClick={() => setOpenModal(true)} className="flex items-center justify-center w-10 h-10 mr-3 text-xl font-semibold text-white bg-green-600 rounded-full focus:outline-none flex-no-shrink">
      
       <PlusCircle size={18}/>
      </button>
    </div>


    <>
      <div className="flex flex-wrap gap-4">
        <div className="w-40">
      
        </div>
     
      </div>
      <Modal  show={openModal} size='md' onClose={() => setOpenModal(false)}>
        
        <Modal.Body>
           
            <div className='flex justify-between items-center'>
           <p className='text-sm font-semibold'>Add User</p>
                <button onClick={() => setOpenModal(false)}>   <X size={18} color='gray'/></button>
         
            </div>
 
        </Modal.Body>
        <Modal.Footer>
            <div className='w-full'>
            <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
              </svg>
            </button>
          </span>
          <input type="search" name="q"
                 className="w-full m-1 py-2 pl-12 text-xs border-none bg-gray-200 items-center h-10  pr-4 rounded-md focus:border-gray-200  focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300" style={{ borderRadius: '25px' }}
                 placeholder="Search..." autoComplete="off"/>
        </div>
        <div className="w-full">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">

        
   

          {loading ? (
      <div className="">
   
        
      </div>
    ) : (
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 ">
        {userlist?.map((user: any) => (
       
       <li className="w-full pb-0 pt-3 sm:pt-4 ">
       <div className="flex items-center space-x-4">
       
         <div className="shrink-0">
          
                       <img className="object-cover w-12 h-12 rounded-full" src={user?.profileImageUrl} alt="" />

         </div>
         <div className="min-w-0 flex-1">
           <p className="truncate text-xs font-medium text-gray-900 dark:text-white">{user?.profile?.fullname||user?.companyProfile?.fullname}</p>
           <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.profile?.designation||user?.companyProfile?.companyType}</p>
         </div>
       
         <button
            onClick={() => handleAddConversation(userId, user._id)}
                className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900  hover:bg-green-600 "
              >
               Message
              </button>

         </div>
         <hr className='m-2' />
       
     </li>

         
        
       
        ))}
      </div>
    )}
 
        </ul>
      </div>
            </div>
 
        </Modal.Footer>
    
      </Modal>
    </>

  </div>
  





  )
}

export default ChatUsers