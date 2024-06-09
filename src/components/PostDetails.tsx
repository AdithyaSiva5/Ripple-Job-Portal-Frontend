import { useEffect, useState } from "react";
import { EllipsisVertical, Edit, Delete } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { editPost } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUsePosts } from "../utils/context/reducers/authSlice";

interface PostProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      username: string;
      profileImg: string;
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




const PostDetails: React.FC<PostProps> = ({ post }) => {

  const dispatch = useDispatch();
  const [hideLikes, setHideLikes] = useState(post.hideLikes);
  const [hideComment, setHideComment] = useState(post.hideComment);

  const handleHideLikesToggle = () => {
    setHideLikes(!hideLikes);
  };

  const handleHideCommentToggle = () => {
    setHideComment(!hideComment);
  };

  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";

  const formik = useFormik({
    initialValues: {
      title: post.title,
      description: post.description,
      
    },
    validationSchema: Yup.object({
      title: Yup.string()
      .trim() 
      .required('Title is required')
     ,
    description: Yup.string()
      .trim() 
      .required('Description is required')
,
    }),
    onSubmit: async (values) => {
        const postId = post._id;
      const { title, description } = values;
      try {
        await editPost({
          userId,
          postId,
          title,
          description,
          hideComment,
          hideLikes

        })
          .then((response: any) => {
          const postsData = response.data;
          dispatch(setUsePosts({ userPost: response.data }));
         
          toast.success("Post updated successfully");
         
          console.log(postsData);
          handleCancelClick()
          
          
          
        })
        .catch((error) => {
          console.log(error);
        })
        
     
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error("Failed to update post");
      }
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isComment, setisComment] = useState(false);

  const [isEdit, setisEdit] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsOpen(false);
    setisEdit(true);
  };

  const handleDelete = () => {
    setIsOpen(!isOpen);
  };
  const handleCancelClick = () => {
    setisEdit(false);
   
  };
  
  return (
    <div className=" bg-white overflow-hidden shadow-none mt-7 rounded-md">
      <div className="grid grid-cols-3 min-w-full">
        <div className="col-span-2 w-full">
          <img
            className="w-full max-w-full min-w-full"
            src={post.imageUrl}
            alt="Description"
          />
        </div>

        <div className="col-span-1 relative pl-4 ">
          <header className="border-b border-grey-400 flex justify-between">
            <div>
              <a
                href="#"
                className="block cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <img
                  src={post.imageUrl}
                  className="h-9 w-9 rounded-full object-cover"
                  alt="user"
                />
                <p className="block ml-2 font-bold"> {post.userId.username}</p>
              </a>
            </div>

            <button onClick={toggleDropdown} className="me-2">
              <EllipsisVertical size={18} />
            </button>
          </header>
          {isOpen && (
            <div className="absolute right-7 top-5 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
              <ul className="py-2">
                <li>
                  <a
                    onClick={handleEdit}
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex gap-1">
                      {" "}
                      Edit <Edit size={15} />
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleDelete}
                    className="block px-4 py-2 font-semibold text-xs text-red-500 hover:bg-gray-100"
                  >
                    <div className="flex gap-1">
                      {" "}
                      Delete <Delete size={15} />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {!isEdit && (
            <div>
              <p className="  text-gray-700  ms-2 text-xs font-semibold">
              {post.title}
              </p>

              <p className="ms-3 text-xs text-gray-700 pb-5">
              {post.description}
              </p>
            </div>
          )}

          {isEdit && (
            <div>
              <form  onSubmit={formik.handleSubmit}>
                <div className="user-post-inputs">
                  <input
                    type="text"
                    placeholder="Title"
                    className="rounded-lg border mt-3 border-gray-300 p-2  outline-none text-xs font-normal"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.title}
                    </p>
                  )}
                  <textarea
                    className=" rounded-lg description sec p-3 mt-4 h-40 border border-gray-300 outline-none text-xs font-normal"
                    spellCheck="false"
                    placeholder="Describe everything about this post here"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                  ></textarea>
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-red-600 text-xs">
                      {formik.errors.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-between gap-10 p-3">
                  <div>
                    <p className="text-xs font-semibold text-grey-600">
                      Hide Likes
                    </p>
                    <p className=" hide  text-xs">
                      Enabling hide likes will hide the likes count from others
                    </p>
                  </div>

                  <label className="inline-flex items-center   cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={hideLikes}
                      onChange={handleHideLikesToggle}
                    />
                    <div className="relative w-9 h-5 bg-gray-200  rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex gap-10 p-3 justify-between ">
                  <div>
                    <p className="text-xs font-semibold text-grey-600">
                      Hide Comments
                    </p>
                    <p className="hide text-xs">
                      Enabling hide comments will remove the commenting option
                      from the post
                    </p>
                  </div>

                  <label className="inline-flex items-center  cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={hideComment}
                      onChange={handleHideCommentToggle}
                    />
                    <div className="relative w-9 h-5 bg-gray-200  rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="buttons flex me-4 mt-3">
                  <div
                    onClick={handleCancelClick}
                
                    className="text-xs rounded btn border border-gray-300 px-4 py-2  cursor-pointer text-gray-500 ml-auto  hover:bg-red-600  hover:text-white "
                  >
                    Cancel
                  </div>
                  <button
                    type="submit"
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900  hover:bg-green-600 "
                  >
                    Edit Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* <div >
                        <div className="pt-1">
                            <div className="text-sm mb-2 flex flex-start items-center">
                                <div>
                                    <a href="#" className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                        <img className="h-8 w-8 rounded-full object-cover"
                                            src="https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                            alt="user" />
                                    </a>
                                </div>
                                <p className="font-bold ml-2">
                                    <a className="cursor-pointer">Joshua:</a>
                                    <span className="text-gray-700 font-medium ml-1">
                                        Good post
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="text-sm mb-2 flex flex-start items-center">
                            <div>
                                <a href="#" className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                    <img className="h-8 w-8 rounded-full object-cover"
                                        src="https://images.pexels.com/photos/3861456/pexels-photo-3861456.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                        alt="user" />
                                </a>
                            </div>
                            <p className="font-bold ml-2">
                                <a className="cursor-pointer">Kesha:</a>
                                <span className="text-gray-700 font-medium ml-1">
                                    This is amazing
                                </span>
                            </p>
                        </div>
                    </div> */}
          {!isEdit && (
            <div className="absolute bottom-0 left-0 right-0 pl-4 mb-4">
              <div className="pt-4">
                <div className="mb-2">
                  <div className="flex items-center">
                    <span className="mr-3 inline-flex items-center cursor-pointer">
                      <svg
                        className="fill-heart text-gray-700 inline-block h-7 w-7 heart"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </span>
                    <span className="mr-3 inline-flex items-center cursor-pointer">
                      <svg
                        className="text-gray-700 inline-block h-7 w-7 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </span>
                  </div>
                  <span className="text-gray-600 text-sm font-bold">
                    2344 Likes
                  </span>
                </div>
                <span className="block ml-2 text-xs text-gray-600">
                  5 minutes
                </span>
              </div>

              {/* <div className="pt-4 pb-1 pr-3">
                            <div className="flex items-start">
                                <textarea className="w-full resize-none outline-none appearance-none" aria-label="Agrega un comentario..." placeholder="Agrega un comentario..."  autoComplete="off" autoCorrect="off" style={{ height: '36px' }}></textarea>
                                <button className="mb-2 focus:outline-none border-none bg-transparent text-blue-600">Publicar</button>
                            </div>
                        </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
