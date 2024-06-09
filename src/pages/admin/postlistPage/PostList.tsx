import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {ShieldAlert,ShieldCheck} from 'lucide-react'
import { adminPostBlock, adminPostList } from '../../../services/api/admin/apiMethods';

const PostList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);  
  useEffect(()=>{
    try{
      adminPostList()
      .then((response:any) => {
        const postsData = response.data;
        setPosts(postsData.posts); 
    
        console.log(postsData.posts);
        
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
  },[setPosts])

  const handlePostBlock = (postId: string,status:string) => {
    try {
      const requestData = { postId };
      adminPostBlock(requestData)
        .then((response: any) => {
          const data = response.data;
          if(status=="block"){
            toast.error(data.message);
          }else{
            toast.info(data.message);

          }
            setPosts(prevposts =>
            prevposts.map(post => {
              if (post._id === postId) {
                return { ...post, isBlocked: !post.isBlocked };
              }
              return post;
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
            <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Post</th>
            <th scope="col" className=" text-xs px-6 py-4 font-medium text-gray-900">Posted By</th>
            <th scope="col" className=" text-xs px-6 py-4 font-medium text-gray-900">Posted on</th>
            <th scope="col" className="text-xs px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" className="text-xs px-6 py-4 font-medium flex justify-center text-gray-900">Action</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {posts.length>0 && posts.map((post: any) => (
      
          <tr key={post._id} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={post.imageUrl}
                  alt=""
                />
              </div>
              <div className="text-xs">
                <div className="font-medium text-gray-700">{post.postname}</div>
                <div className="text-gray-400">{post.email}</div>
              </div>
            </th>
            <td className=" px-6 py-4">
            <div className="text-xs">
                <div className="font-medium text-gray-700">{post.userId.username}</div>
                <div className="text-gray-400">{post.userId.email}</div>
              </div>
            </td>
            <td className="text-xs px-6 py-4">
            {post.updatedAt}
              

            </td>
        

            <td className=" text-xs px-6 py-4">{post.isBlocked?(<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            Blocked
                </span>):(<span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            UnBlocked
                </span>)}</td>

           
            <td className=" text-xs px-6 py-4">
              <div className="flex justify-end gap-4">
              {post.isBlocked?(<button type="button"  style={{width:'110px'}}     onClick={() => handlePostBlock(post._id,"unblock")}
 className="text-xs  bg-white text-green-600 hover:bg-gray-100 border border-gray-200  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                <ShieldCheck size={18} />UnBlock
</button>):(<button style={{width:'110px'}} type="button" onClick={() => handlePostBlock(post._id,"block")} className="text-xs bg-white text-red-600 hover:bg-gray-100 border border-gray-200  focus:outline-none  font-medium rounded-lg  ps-7 py-2.5 text-center inline-flex items-center  me-2 mb-2">
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

export default PostList;