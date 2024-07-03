import { Bookmark, Heart, MessageCircle,X } from "lucide-react";
import { likePost } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setUsePosts } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import PostDetails from "./PostDetails";
import ReportModal from "./ReportModal";
import { darkMode } from "../utils/context/reducers/darkmodeSlice";

interface PostProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      username: string;
      profileImageUrl: string;
    };
    title: string;
    imageUrl: string;
    description: string;
    likes: any[];
    isHidden: boolean;
    isBlocked: boolean;
    hideComment: boolean;
    hideLikes: boolean;
    date: string;
  };
}


const Post: React.FC<PostProps> = ({ post }) => {
  const dark = useSelector(darkMode)
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const[value1,setValue1]=useState(false)
  const[value2,setValue2]=useState(false)
  const [reportModel,setReportModel] = useState(false)
  const[isCommentSection,SetIsCommentSection]=useState(false)
  const handleHideCommentToggle = () => {
    SetIsCommentSection(!isCommentSection);
    setValue1(true)
    setValue2(false)
  };
  const handleLikedPeople=()=>{
    SetIsCommentSection(!isCommentSection);
    setValue1(false)
    setValue2(true)
  }
  const handleClosePostDetails = () => {
    SetIsCommentSection(false); 
  };
  const [isLikedByUser, setIsLikedByUser] = useState(
    post.likes.some((like) => like._id === userId)
  );
  const[likeCount,setLikeCount]=useState(post.likes.length)

  const openReportModel = () =>{
    setReportModel(true)
  }
  const closeReportModel = () =>{
    setReportModel(false)
  }

  const handleLike = (postId: string, userId: string) => {
    try {
      likePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          dispatch(setUsePosts({ userPost: postData.posts }));
          setIsLikedByUser(!isLikedByUser);
          if (isLikedByUser) {
         
            setLikeCount((prev) => prev - 1);
            post.likes.pop();
          } else {
           
            setLikeCount((prev) => prev + 1);
            post.likes.push({ _id: userId, username: user.name, profileImageUrl: user.profileImg })
          }

        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <div className=" home-post-section bg-secondary border border-green">
      <div className="flex items-center px-4 py-3">
        <img
          className="h-8 w-8 rounded-full"
          src={post.userId.profileImageUrl}
          alt="Profile"
        />
        <div className="ml-3 ">
          <span className="text-sm font-semibold antialiased block leading-tight dark:text-white ">
            {post.userId.username}
          </span>
          <span className="text-gray-600 dark:text-white text-xs block">
            Ernakulam , Kerala
          </span>
        </div>
        
        {user._id !== post.userId._id && (
          <button className="ml-auto inline-flex justify-end items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white"
          onClick={() => openReportModel()}
          >
                Report
              </button>
        )}
      </div>
      <img style={{ width: "600px" }} src={post.imageUrl} alt="Post" />

      <p className=" dark:text-white text-gray-700  ms-4 mt-2 text-xs font-semibold">
        {post.title}
      </p>

      <p className="dark:text-white ms-5 text-xs text-gray-700 ">{post.description}</p>

      <div className="flex items-center justify-between mx-4  mt-2">
        <div className="flex gap-5">
          <button
            onClick={() => handleLike(post._id, user._id)}
            type="button"
          >
            {isLikedByUser ? (
              <Heart color="green" fill="green" strokeWidth={1.5} size={22} />
            ) : (
              <Heart color={dark ? "white" : "gray"} strokeWidth={1.5} size={22} />
            )}
          </button>
          {post.hideComment==false&&(
              <button type="button" onClick={handleHideCommentToggle}>
              <MessageCircle color={dark ? "white" : "gray"} strokeWidth={1.5} size={22} /> 
            </button>


          )}
          <button type="button">
            <Bookmark color={dark ? "white" : "gray"} strokeWidth={1.5} size={22} />
          </button>
        </div>
      </div>
 {post.hideLikes==false&&(
            <button onClick={handleLikedPeople}>
            <div className="font-semibold text-sm pb-4 mx-4 dark:text-white">
              <p>{likeCount} likes</p>
            </div>
      
            </button>
      


    )}

{isCommentSection && (
            <div className="addpost-popup">
              <div className="addpost-popup">
              <button className="close-button mt-16 me-5" onClick={handleClosePostDetails} ><X size={18}  color="white"/></button>
                <PostDetails  key={post._id} post={post} likesValue={value2} commentsValue={value1} />
        
              </div>
            </div>
          )}
          {reportModel && (
  <ReportModal
    userId={userId}
    postId={post._id}
    openReportModal={openReportModel}
    closeReportModal={closeReportModel}
  />
)}
    </div>
         


                    
  )
      }

export default Post;
