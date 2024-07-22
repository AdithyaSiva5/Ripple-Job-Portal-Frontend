export const userUrls ={
    register:'/register',
    registerOtp:'/register-otp',
    resendOtp:'/resend-otp',
    googleAuth:'/google-auth',
    login:'/login',
    forgotPassword:'/forgot-password',
    forgotOtp:'/forgot-otp',  
    resetPassword:'/reset-password',
    setPreferences: '/set-preferences',
    setBasicInformation:'/set-basic-information',
    userSuggestions:'/user-suggestions',
    getUserDetails:'/user-details',
    checkout:'/checkout-user',
    validate:'/validate-payment',
    allTransactions:'/get-transactions',
    getNotifications:'/get-notifications',
    search:'/search'
}

export const authUrl = {
    authUser: "/auth/user",
    authAdmin: "/auth/admin"
};

export const postUrls = {
    addPost:'/post/add-post',
    getAllPosts:'/post/get-post',
    getUserPosts:'/post/get-user-post',
    editPost:'/post/edit-post',
    deletePost:'/post/delete-post',
    likePost:'/post/like-post',
    getAllPostComments:'/post/get-post-comments',
    addComment:'/post/add-comment',
    editComment: '/post/edit-comment',
    replyComment:'/post/reply-comment', 
    deleteComment:'/post/delete-post-comment',
    reportPost: '/post/report-post',
    savePost: "post/save-post",
    getSavedPosts: "post/user-saved-post",
}


export const adminUrl = {
    login: "/admin/login",
    userList:'/admin/get-users',
    userBlock:'/admin/user-block',
    postList:'/admin/get-posts',
    postBlock:'/admin/post-block',
    jobCategoryList:'/admin/job-category',
    addJobCategory:'/admin/add-job-category',
    blockJobCategory:'/admin/block-job-category',
    jobBlock:'/admin/job-block',
    jobList:'/admin/get-jobs',
    reportList:'/admin/get-reports',
    transactionsList:'/admin/get-transactions',
    dashboardStats:'/admin/dashboard-stats',
    chartData:'/admin/chart-data',
}


export const jobUrls = {
    addJob:'/job/add-job',
    listJob:'/job/list-all-job',
    listUserJob:'/job/list-user-job',
    getJobDetails:'/job/job-details',
    editJob:'/job/edit-job',
    viewJob:'/job/view-job',
    addJobApplication:'job/apply-job',
    updateApplicationStatus:'job/update-application-status',
    employeeApplications:'job/get-applications-employee',
    employerApplications:'job/get-applications-empolyer',
    getAllJobDetails:'job/get-all-job-details',
    cancelApplication:'job/cancel-job-application',
    addInterview:'/job/add-interview',
    editInterview:'/job/edit-interview',
    setInterviewStatus:'/job/set-interview-status', 
    getIntervieweeInterviews:'/job/get-interviewee-interviews',   
    getInterviewerInterviews:'/job/get-interviewer-interviews',
    getJobInterviews:'/job/get-job-interviews',
    getFormSelectData:'/job/form-select-data',
    blockJob:'/job/block-job'
  }

  export const connectionUrls = {
    follow:'/connection/follow',
    unFollow:'/connection/unFollow',
    acceptRequest:'/connection/accept-request',
    rejectRequest:'/connection/reject-request',
    requestedUsers:'/connection//get-requested-users',
    getConnection:'/connection/get-connection',
    cancelRequest:'/connection/cancel-request' 
  }

  export const chatUrl = {
    addConversation: "/chat/add-conversation",
    getUserConversation: "/chat/get-conversations",
    findConversation: "/chat/find-conversation",
    addMessage: "/chat/add-message",
    getMessages: "/chat/get-messages",
    setMessageRead: "/chat/set-message-read",
    getUnreadMessages:'/chat/get-unread-messages'
  };   