import { useEffect, useState } from "react";
import PostDetails from "./PostDetails"
import { getUserPost } from "../services/api/user/apiMethods";
import PostDetailsUi from "./skeletonUI/PostDetailsUi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";



function ViewerPosts() {




  

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

 
  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getUserPost({userId:userId})
          .then((response: any) => {
            const postsData = response.data;
         
           setPosts(response.data)
            
            console.log(postsData);
            
          })
          .catch((error) => {
            toast.error(error.message)
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (

    <>

    {loading&&(
      <PostDetailsUi/>
  
    )
      

    }
     
          {posts.length >0 && !loading&&(
          <div className="posts">
            {posts.map((post: any) => (

              <PostDetails  key={post._id} post={post} likesValue={false} commentsValue={false} />
            ))}
          </div>
        )}
      
    </>


  )
}

export default ViewerPosts
