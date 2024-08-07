import "../pages/user/userHome/userHome.css";
import { formatDistanceToNow } from "date-fns";

import { Formik, Form, Field } from "formik";

import { useState, useEffect, useRef } from "react";
import {
  EllipsisVertical,
  Edit,
  Delete,
  Heart,
  MessageCircle,
  Undo2,
  Trash2,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  deletePost,
  editPost,
  likePost,
  getPostComments,
  addComment,
  replyComment,
  deleteComment,
  editComment,
} from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUsePosts } from "../utils/context/reducers/authSlice";

("use client");

import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";


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
  commentsValue: boolean;
  likesValue: boolean;
}

const PostDetails: React.FC<PostProps> = ({
  post,
  commentsValue = false,
  likesValue = false,
}) => {
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const dispatch = useDispatch();
  const [hideLikes, setHideLikes] = useState(post.hideLikes);
  const [hideComment, setHideComment] = useState(post.hideComment);
  const [isOpen, setIsOpen] = useState(false);
  const [isComment, setIsComment] = useState(commentsValue);
  const [isLikes, setIsLikes] = useState(likesValue);
  const [isEdit, setIsEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState(false);
  const [parentCommentId, setParentCommentId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const commentBoxRef = useRef(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  const handleEditComment = (commentId: any, currentComment: any) => {
    setEditingCommentId(commentId);
    setEditCommentText(currentComment);
  };

  const submitEditComment = async () => {
    try {
      if (!editingCommentId || !editCommentText) {
        toast.error('Comment ID or text is missing');
        return;
      }
      const response: any = await editComment(editingCommentId, editCommentText);
      console.log('Edit comment response:', response);

      if (response && response.status === 200) {
        setComments(response.data.comments);
        toast.success(response.data.message);
        setEditingCommentId(null);
        setEditCommentText('');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
      toast.error('Failed to edit comment');
    }
  };

  useEffect(() => {
    getPostComments({ postId: post._id })
      .then((response: any) => {
        const commentData = response.data.comments || [];
        setComments(commentData);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  }, [post._id]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsOpen(false);
    setIsEdit(true);
  };
  const handleReplyComments = (commentId: any) => {
    setReplyComments(true);
    setParentCommentId(commentId);
  };

  const handleDeleteComments = (commentId: any) => {
    deleteComment(commentId)
      .then((response: any) => {
        const data = response.data;

        if (response.status === 200) {
          const commentData = data.comments;
          setComments(commentData);
          toast.error(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error?.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleCancelReplyComments = () => {
    setReplyComments(false);
    setParentCommentId("");
  };

  const handleIsComment = () => {
    setIsComment(true);
  };
  const handleIsLikes = () => {
    setIsLikes(true);
  };

  const handleCancelClick = () => {
    setIsEdit(false);
  };

  const handleIsBack = () => {
    setIsComment(false);
    setIsLikes(false);
    setIsEdit(false);
  };

  const handleHideLikesToggle = () => {
    setHideLikes(!hideLikes);
  };

  const handleHideCommentToggle = () => {
    setHideComment(!hideComment);
  };

  const formik = useFormik({
    initialValues: {
      title: post.title,
      description: post.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title is required"),
      description: Yup.string().trim().required("Description is required"),
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
          hideLikes,
        })
          .then((response: any) => {
            const postsData = response.data;
            dispatch(setUsePosts({ userPost: response.data }));

            toast.success("Post updated successfully");

            console.log(postsData);
            handleCancelClick();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error("Failed to update post");
      }
    },
  });

  const commentInitialValues = {
    comment: "",
  };

  const commentValidationSchema = Yup.object({
    comment: Yup.string().required("Comment is required"),
  });

  const commentHandleSubmit = (values: any, { resetForm }: any) => {
    try {
      const commentData = {
        postId: post._id,
        userId: userId,
        comment: values.comment,
      };

      addComment(commentData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            const commentData = data.comments;
            setComments(commentData);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error("An error occurred. Please try again.");
        });

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const ReplyCommentHandleSubmit = (values: any, { resetForm }: any) => {
    try {
      const commentData = {
        commentId: parentCommentId,
        userId: userId,
        replyComment: values.comment,
      };

      replyComment(commentData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            const commentData = data.comments;
            setComments(commentData);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error("An error occurred. Please try again.");
        });
      setReplyComments(false);

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDelete = (postId: string, userId: string) => {
    try {
      deletePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;

          dispatch(setUsePosts({ userPost: postData.posts }));
          toast.info("Post Deleted");
          setIsOpen(!isOpen);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const [isLikedByUser, setIsLikedByUser] = useState(
    post.likes.includes(userId)
  );

  const handleLike = (postId: string, userId: string) => {
    try {
      likePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          console.log(postData.posts);
          dispatch(setUsePosts({ userPost: response.data.posts }));
          setIsLikedByUser(!isLikedByUser);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {

    if (commentBoxRef.current) {
      commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
    }
  }, [comments, replyComments, isComment]);



  return (
    <div
      className=" bg-white overflow-hidden shadow-none mt-7 rounded-md"
      style={{ width: "1136px", height: "476px" }}
    >
      <div className="grid grid-cols-3 min-w-full">
        <div className="col-span-2 w-full">
          <img
            style={{ width: "768px" }}
            className=" w-full max-w-full min-w-full"
            src={post.imageUrl}
            alt="Description"
          />
        </div>

        <div className=" col-span-1 relative pl-4  ">
          <header className="border-b border-grey-400 flex justify-between">
            <div>
              <a
                href="#"
                className="flex cursor-pointer py-4  items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <img
                  src={post.userId.profileImageUrl}
                  className="h-9 w-9 rounded-full object-cover"
                  alt="user"
                />
                <p className="block ml-2 font-bold"> {post.userId.username}</p>
              </a>
            </div>

            {post.userId.username == user.username && (
              <button onClick={toggleDropdown} className="me-2">
                <EllipsisVertical size={18} />
              </button>
            )}
          </header>
          {isOpen && post.userId.username == user.username && (
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
                    onClick={() => handleDelete(post._id, post.userId._id)}
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

          {!isEdit && !isComment && !isLikes && (
            <div>
              <p className="  text-gray-700  ms-2 text-xs font-semibold">
                {post.title}
              </p>

              <p className="ms-3 text-xs text-gray-700 pb-5 me-2">
                {post.description}
              </p>
            </div>
          )}

          {isEdit && (
            <div className="user-form">
              <form onSubmit={formik.handleSubmit}>
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
                  <div style={{ height: "10px" }}>
                    {formik.touched.title && formik.errors.title && (
                      <p className="text-red-600 text-xs">
                        {formik.errors.title}
                      </p>
                    )}
                  </div>

                  <textarea
                    className=" rounded-lg description sec p-3 mt-4 h-20 border border-gray-300 outline-none text-xs font-normal"
                    spellCheck="false"
                    placeholder="Describe everything about this post here"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="description"
                  ></textarea>
                  <div style={{ height: "10px" }}>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-red-600 text-xs">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>
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

          {!isEdit && !isComment && !isLikes && (
            <div className="absolute bottom-0 left-0 right-0 pl-4 mb-4">
              <div className="pt-4">
                <div className="mb-2">
                  <div className="flex items-center">
                    <button
                      className="mr-4"
                      onClick={() => handleLike(post._id, post.userId._id)}
                      type="button"
                    >
                      {isLikedByUser ? (
                        <Heart
                          color="green"
                          fill="green"
                          strokeWidth={1.5}
                          size={22}
                        />
                      ) : (
                        <Heart color="gray" strokeWidth={1.5} size={22} />
                      )}
                    </button>
                    {post.hideComment == false && (
                      <button type="button" onClick={handleIsComment}>
                        <MessageCircle color="gray" strokeWidth={1.5} size={22} />
                      </button>
                    )}
                  </div>
                  {post.hideLikes == false && (
                    <button onClick={handleIsLikes}>
                      <span className="text-gray-600 text-sm font-bold">
                        {post.likes.length} Likes
                      </span>
                    </button>
                  )}
                </div>
                <span className="block ml-2 text-xs text-gray-600">
                  5 minutes
                </span>
              </div>
            </div>
          )}
          {isComment && !isEdit && !isLikes && (
            <>
              <div className="flex justify-end me-3">
                <button
                  onClick={handleIsBack}
                  className="undo  text-xs flex items-center text-green-600 mt-1 "
                >
                  back <Undo2 size={15} />
                </button>
              </div>

              <div className="home-scroll-post">
                <div ref={commentBoxRef} className="home-scrollbox-post">
                  {comments && comments.map((comment: any) => (
                    <div key={comment._id}>
                      {editingCommentId === comment._id ? (
                        <div>
                          <textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="w-full border rounded p-2 text-xs"
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={submitEditComment}
                              className="text-xs text-green-600 mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="text-xs text-red-600"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6">
                          <div className="flex justify-between items-center me-4">
                            <div className="flex items-center ">
                              <img
                                className="h-9 w-9 rounded-full border-2 p-.5 mb-3"
                                src={comment.userId.profileImageUrl}
                                alt="Profile"
                              />
                              <div className="w-full flex me-2">
                                <p className=" text-xs mx-3 font-semibold text-black">
                                  {comment.userId.username}
                                </p>
                                <p
                                  className="text-xs text-gray-400"
                                  style={{ fontSize: "9px" }}
                                >
                                  {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <button
                                onClick={() => handleReplyComments(comment._id)}
                                className="text-xs text-green-600 flex"
                              >
                                Reply
                              </button>
                              {user._id === comment.userId._id && (
                                <>
                                  <button
                                    onClick={() => handleEditComment(comment._id, comment.comment)}

                                    className="text-xs text-blue-600 ml-2"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpenModal(true);
                                      setParentCommentId(comment._id);
                                    }}
                                    className="ms-2"
                                  >
                                    <Trash2 color="gray" size={10} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-800 mx-3">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      )}
                      {comment.replyComments.map((reply: any) => (
                        <div key={reply._id} className="ms-10 reply-commment">
                          <div className="flex justify-between items-center me-4">
                            <div className="flex items-center ">
                              <img
                                className="h-9 w-9 rounded-full border-2 p-.5 mb-3"
                                src={reply.userId.profileImageUrl}
                                alt="Profile"
                              />
                              <div className="w-full flex me-2">
                                <p className=" text-xs mx-3 font-semibold text-black">
                                  {reply.userId.username}
                                </p>
                                <p
                                  className="text-xs text-gray-400"
                                  style={{ fontSize: "9px" }}
                                >
                                  {formatDistanceToNow(
                                    new Date(reply.timestamp),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-800 mx-3">
                              {reply.replyComment}
                            </p>
                          </div>
                        </div>
                      ))}

                    </div>


                  ))}
                </div>


              </div>
              {replyComments && (
                <Formik
                  initialValues={commentInitialValues}
                  validationSchema={commentValidationSchema}
                  onSubmit={ReplyCommentHandleSubmit}
                >
                  <Form>
                    <div className="w-full items-center absolute bottom-0 pe-6 bg-white h-20">
                      <div>
                        <p className="text-xs font-bold mb-1">@{post.userId.username}</p>
                      </div>
                      <div className="flex">
                        <Field
                          className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600   rounded-md text-xs resize-none outline-none appearance-none"
                          aria-label="post your comments..."
                          placeholder="post your comments..."
                          autoComplete="off"
                          autoCorrect="off"
                          style={{ height: "36px" }}
                          name="comment"
                        />
                        <button
                          type="submit"
                          className="mx-4 text-xs  focus:outline-none border-none bg-transparent text-green-600"
                        >
                          Reply
                        </button>
                        <button
                          onClick={handleCancelReplyComments}
                          className="text-xs text-red-700 me-3"
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              )}

              {!replyComments && (
                <Formik
                  initialValues={commentInitialValues}
                  validationSchema={commentValidationSchema}
                  onSubmit={commentHandleSubmit}
                >
                  <Form>
                    <div className="w-full flex items-center absolute bottom-0 pe-6 bg-white h-20">
                      <Field
                        className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600   rounded-md text-xs resize-none outline-none appearance-none"
                        aria-label="post your comments..."
                        placeholder="post your comments..."
                        autoComplete="off"
                        autoCorrect="off"
                        style={{ height: "36px" }}
                        name="comment"
                      />
                      <button
                        type="submit"
                        className="mx-2 text-xs  focus:outline-none border-none bg-transparent text-green-600"
                      >
                        Comment
                      </button>
                    </div>
                  </Form>
                </Formik>
              )}
            </>
          )}

          {!isComment && !isEdit && isLikes && (
            <>
              <div className="flex justify-end me-3">
                <button
                  onClick={handleIsBack}
                  className="undo  text-xs flex items-center text-green-600 mt-1 "
                >
                  back <Undo2 size={15} />
                </button>
              </div>

              <div className="home-scroll-post">
                <div className="home-scrollbox-post">
                  {post.likes && post.likes.map((like) => (
                    <div className="flex items-center me-2 my-2" key={like._id}>
                      <img
                        className="h-7 w-7 rounded-full border-2 p-.5 mb-3"
                        src={like.profileImageUrl}
                        alt="Profile"
                      />
                      <div className="w-full flex justify-between items-center">
                        <p className="text-xs text-black ms-3">
                          {like.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto text-xs  mb-4 h-10 w-10 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-xs font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this this comment?
            </h3>
            <div className="flex justify-center gap-4 ">
              <button
                className="text-xs flex gap-1 text-green-600 font-semibold border px-2 py-1 rounded-md border-green-600"
                onClick={() => {
                  setOpenModal(false);
                  handleDeleteComments(parentCommentId);
                  setParentCommentId("")
                }}
              >
                Yes, I'm sure
              </button>{" "}
              <button
                className="text-xs border px-4 py-1 rounded-md border-gray-600"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostDetails;
