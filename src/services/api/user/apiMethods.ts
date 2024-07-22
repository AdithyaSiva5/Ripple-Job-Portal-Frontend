import {
  userUrls,
  postUrls,
  jobUrls,
  connectionUrls,
  chatUrl,
} from "../endPoints";
import { apiCall } from "./apiCalls";
import { FormValues } from "../../../utils/validation/signupValidation";

//@dec      user Registration
//method    POST

export const postRegister = (userData: FormValues) => {
  return new Promise((resolve) => {
    try {
      apiCall("post", userUrls.register, userData).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Verify  Otp
//method    POST

export const postOTP = (otp: { otp: string }) => {
  return new Promise((resolve) => {
    try {
      apiCall("post", userUrls.registerOtp, otp).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Resend Otp
//method    POST

export const postResendOTP = (email: { email: string }) => {
  return new Promise((resolve) => {
    try {
      console.log(email);
      apiCall("post", userUrls.resendOtp, email).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Login user
//method    POST

export const postLogin = (userData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Google signup  user
//method    POST

export const googleAuthenticate = (userData: {
  username: string;
  email: string;
  imageUrl: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.googleAuth, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password
//method    POST

export const forgotPassword = (email: { email: string }) => {
  return new Promise((resolve) => {
    try {
      console.log(email);
      apiCall("post", userUrls.forgotPassword, email).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password OTP sent
//method    POST

export const forgotOTP = (otp: { otp: string }) => {
  return new Promise((resolve) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.forgotOtp, otp).then((response) => {
        resolve(response);
        console.log("apiMethods" + response);
      });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Renew Password
//method    POST

export const renewPassword = (userData: {
  password: string;
  confirmPassword: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.resetPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add Post
//method    POST

export const addPost = (postData: {
  userId: any;
  imageUrl: string;
  title: string;
  description: string;
  hideLikes: boolean;
  hideComment: boolean;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get all post
//method    Get

export const getAllPosts = (page: number) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", `${postUrls.getAllPosts}?page=${page}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Post
//method    POST

export const getUserPost = (userId: { userId: any }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getUserPosts, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Edit User post
//method    POST

export const editPost = (postData: {
  userId: any;
  postId: any;
  title: any;
  description: string;
  hideLikes: boolean;
  hideComment: boolean;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.editPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Delete a post
//method    POST

export const deletePost = (postData: { postId: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.deletePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Like a post
//method    POST

export const likePost = (postData: { postId: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.likePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get all comment
//method    POST

export const getPostComments = (postId: { postId: any }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getAllPostComments, postId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add a comment
//method    POST

export const addComment = (commentData: {
  postId: any;
  userId: any;
  comment: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addComment, commentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Edit a comment
//method    POST

export const editComment = (
  commentId: string,
  comment: string
) => {
  return new Promise((resolve, reject) => {
    try {
      const commentData = {
        comment: comment
      };
      
      apiCall("put", `${postUrls.editComment}/${commentId}`, commentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          console.error('Error in editComment:', err);
          reject(err);
        });
    } catch (error) {
      console.error('Unexpected error in editComment:', error);
      reject({ status: 500, message: "Something's wrong." });
    }
  });
};

//@dec      Add a reply comment
//method    POST

export const replyComment = (commentData: {
  commentId: string;
  userId: any;
  replyComment: any;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.replyComment, commentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Delete a comment
//method    post
export const deleteComment = (commentId: { commentId: any }) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.deleteComment}?commentId=${commentId}`;
      apiCall("get", url, commentId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const setPreferences = (userData: {
  userId: string;
  userType: any;
  isHiring: any;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.setPreferences, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      set Preferences
//method    POST
export const setBasicInformation = (userData: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.setBasicInformation, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
export const addJob = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.addJob, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//edit job

export const editJob = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.editJob, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const viewJob = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.viewJob, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//list job

export const listJob = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.listJob, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//list User Jobs
export const listUserJob = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.listUserJob, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//apply-job
export const applyJob = ({ formData }: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.addJobApplication, formData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//Update  applicationStatus
export const updateApplicationStatus = (applcationData: {
  applicationId: string;
  status: string;
  userId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.updateApplicationStatus, applcationData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get all applications of a user
export const getemployeeApplications = (applicantId: {
  applicantId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.employeeApplications, applicantId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get all applications of a user
export const getemployerApplications = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.employerApplications, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get all applications of a user
export const getAllJobDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getAllJobDetails, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get all applications of a user
export const cancelApplication = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.cancelApplication, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      Add New Message
//method    post
export const getAllTransactions = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.allTransactions, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const getJobDetails = (jobId: { jobId: string | undefined }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getJobDetails, jobId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const reportPost = (reportData: {
  userId: string;
  postId: string;
  cause: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.reportPost, reportData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong" });
    }
  });
};
//@dec      followUser
//method    POST

export const followUser = (data: {
  userId: string | undefined;
  followingUser: string | undefined;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.follow, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

export const UnFollowUser = (data: {
  userId: string;
  unfollowingUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.unFollow, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get all follow requested Users
//method    POST
export const getRequestedUsers = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(userId);

      apiCall("post", connectionUrls.requestedUsers, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      accept follow Request
//method    POST

export const acceptFollowRequest = (data: {
  userId: string;
  requestedUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.acceptRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      reject follow Request
//method    POST

export const rejectFollowRequest = (data: {
  userId: string;
  requestedUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.rejectRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get connections of a user
//method    POST

export const getUserConnection = (userId: { userId: string | undefined }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.getConnection, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      cancel follow Request
//method    POST

export const cancelFollowRequest = (data: {
  userId: string | undefined;
  cancelingUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.cancelRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      Add New Conversation
//method    post
export const addConversation = (conversationData: {
  senderId: string;
  receiverId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addConversation, conversationData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Conversations
//method    get
export const getUserConversations = (userId: string) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getUserConversation}/${userId}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get Conversation Between two users
//method    get
export const findConversation = (conversationData: {
  firstUser: string;
  secondUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.findConversation}/${conversationData.firstUser}/${conversationData.secondUser}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add New Message
//method    post
export const addMessage = (messageData: {
  conversationId: string;
  sender: string;
  text: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addMessage, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//get all applications of a user
export const getFormSelectFormData = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", jobUrls.getFormSelectData, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Conversations
//method    get
export const getUserMessages = (conversationId: string) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getMessages}/${conversationId}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get connections of a user
//method    POST

export const getUserSuggestions = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.userSuggestions, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      Get User Details
//method    POST

export const getUserDetails = (userId: string | undefined) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getUserDetails + `/${userId}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      Get Unread Messages
//method    Get

export const getUnreadMessages = (messageData: {
  conversationId: string;
  userId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.getUnreadMessages, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      Block job
//@method   Get
export const userJobBlock = (jobId: { jobId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.blockJob, jobId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//@dec      Set Messages Read
//method    Patch

export const setMessageRead = (messageData: {
  conversationId: string;
  userId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.setMessageRead, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//cancel  application
export const cancelJobApplication = (applcationId: {
  applicationId: string;
  applicantId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.cancelApplication, applcationId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      add-interview
//method    POST

export const addInterview = (interviewData: {
  applicationId: string;
  jury: any[];
  interviewDate: string;
  interviewTime: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.addInterview, interviewData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Login user
//method    POST

export const setInterviewStatus = (interviewData: {
  interviewId: string;
  status: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.setInterviewStatus, interviewData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get interviewe interview
export const getIntervieweeInterviews = (intervieweeId: {
  intervieweeId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getIntervieweeInterviews, intervieweeId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get interviewer interview
export const getInterviewerInterviews = (interviewerId: {
  interviewerId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getInterviewerInterviews, interviewerId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//get job interview
export const getJobInterviews = (jobId: { jobId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getJobInterviews, jobId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
//@dec      get notifications
//method    POST

export const getNotifications = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.getNotifications, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      initiate checkout
//method    get
export const initiateCheckout = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.checkout, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      validate payment
//method    post
export const validatePayment = (paymentData: {
  userId: string;
  sessionId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.validate, paymentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get Saved Post
//method    POST

export const getSavedPost = (userId: string | undefined) => {
  return new Promise((resolve, reject) => {
    try {
      const url: string = `${postUrls.getSavedPosts}/${userId}`;
      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Like a post
//method    POST

export const savePost = (postData: {
  postId: string | null;
  jobId: string | null;
  userId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.savePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


//@dec      Search 
//method    GET

export const search = (searchQuery: string) => {
  return new Promise((resolve, reject) => {
    try {
        
      const url:string = `${userUrls.search}?searchQuery=${searchQuery}`
      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      set UserType
//method    POST
export const setUserRole = (userData: {userId:string,isHiring:boolean}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("put", userUrls.setUserRole,userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    } 
  });
};

// Get user settings
export const getSettings = (userId: string) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.getSettings, { userId })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something's wrong." });
    }
  });
};

// Update user settings
export const updateSettings = (userData: { userId: string, [key: string]: any }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.updateSettings, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something's wrong." });
    }
  });
};