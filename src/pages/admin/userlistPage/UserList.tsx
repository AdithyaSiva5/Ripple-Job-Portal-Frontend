import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {ShieldAlert,ShieldCheck} from 'lucide-react'
import { adminUserBlock, adminUserList } from '../../../services/api/admin/apiMethods';

const UserList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);  
  useEffect(()=>{
    try{
      adminUserList()
      .then((response:any) => {
        const usersData = response.data;
        setUsers(usersData.users); 
    
        console.log(usersData.users);
        
      })
      .catch((error) => {
      console.log(error);
      
      })
      .finally(() => {
        setLoading(false);
      });
    }catch(error:any){
      toast.error(error.message)
    }
  },[setUsers])

  const handleUserBlock = (userId: string,status:string) => {
    try {
      const requestData = { userId };
      adminUserBlock(requestData)
        .then((response: any) => {
          const data = response.data;
          if(status=="block"){
            toast.error(data.message);
          }else{
            toast.info(data.message);

          }
            setUsers(prevUsers =>
            prevUsers.map(user => {
              if (user._id === userId) {
                return { ...user, isBlocked: !user.isBlocked };
              }
              return user;
            })
          );
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (err:any) {
      toast.error(err.message);
    }
  }
  
  
  return (
   

    <div className="w-full overflow-hidden rounded-lg    m-5">
      <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Name</th>
            <th scope="col" className=" text-xs px-6 py-4 font-medium text-gray-900">State</th>
            <th scope="col" className=" text-xs px-6 py-4 font-medium text-gray-900">Google</th>
            <th scope="col" className=" text-xs px-6 py-4 font-medium text-gray-900">Facebook</th>
            <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900">Action</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {users.length>0 && users.map((user: any) => (
      
          <tr key={user._id} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={user.profileImageUrl}
                  alt=""
                />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
              </div>
              <div className="text-xs">
                <div className="font-medium text-gray-700">{user.username}</div>
                <div className="text-gray-400">{user.email}</div>
              </div>
            </th>
            <td className=" px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-green-600">
                <span className=" h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Active
              </span>
            </td>
            <td className="text-xs px-6 py-4">{user.isGoogle?(<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Yes
                </span>):'No'}</td>
            <td className=" text-xs px-6 py-4">{user.isFacebook?(<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Yes
                </span>):'No'}</td>

            <td className=" text-xs px-6 py-4">{user.isBlocked?(<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            Blocked
                </span>):(<span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            UnBlocked
                </span>)}</td>

           
            <td className=" text-xs px-6 py-4">
              <div className="flex justify-end gap-4">
              {user.isBlocked?(<button type="button"  style={{width:'110px'}}     onClick={() => handleUserBlock(user._id,"unblock")}
 className="text-xs  bg-white text-green-600 hover:bg-gray-100 border border-gray-200  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                <ShieldCheck size={18} />UnBlock
</button>):(<button style={{width:'110px'}} type="button" onClick={() => handleUserBlock(user._id,"block")} className="text-xs bg-white text-red-600 hover:bg-gray-100 border border-gray-200  focus:outline-none  font-medium rounded-lg  ps-7 py-2.5 text-center inline-flex items-center  me-2 mb-2">
<ShieldAlert size={18} />  Block
</button>)}

                
      
              </div>
            </td>
          </tr>
      ))}
      
        </tbody>
      </table>
    </div>
  );
};

export default UserList;