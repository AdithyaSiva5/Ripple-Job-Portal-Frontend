import { userUrls ,postUrls ,jobUrls} from "../endPoints";
import { apiCall } from "./apiCalls";
import { FormValues } from "../../../utils/validation/signupValidation";

//@dec      user Registration
//method    POST

export const postRegister = (userData:FormValues) => {
    return new Promise((resolve) => {
        try {
            apiCall("post", userUrls.register, userData).then((response)=>{
                resolve(response);
                console.log("apiMethods"+response);
                
            })
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
        }
    })
}


//@dec      Verify  Otp
//method    POST

export const postOTP = (otp:{ otp: string })=>{
return new Promise((resolve)=>{
    try {
        apiCall("post", userUrls.registerOtp, otp).then((response)=>{
            resolve(response);
            console.log("apiMethods"+response);
            
        })
        
    } catch (error) {
        resolve({status:500, message: "Somethings wrong."})
        
    }
})
}


//@dec      Resend Otp
//method    POST

export const postResendOTP = (email:{email:string})=>{
    return new Promise((resolve)=>{
        try {
            console.log(email)
            apiCall("post", userUrls.resendOtp, email).then((response)=>{
                
                resolve(response);
                console.log("apiMethods"+response);
            })
            
        } catch (error) {
            resolve({status:500, message: "Somethings wrong."})
            
        }
    })
    }




    
//@dec      Login user
//method    POST

export const postLogin = (userData:{email:string,password:string}) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall('post', userUrls.login, userData).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({ status: 500, message:"Somethings wrong." });
        }
    })

}



//@dec      Google signup  user
//method    POST

export const  googleAuthenticate = (userData:{username:string,email:string,imageUrl:string}) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall('post', userUrls.googleAuth, userData).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({ status: 500, message:"Somethings wrong." });
        }
    })

}


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

  export const renewPassword = (userData: { password: string; confirmPassword: string }) => {
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

export const addPost = (postData: {userId:any, imageUrl: string; title: string; description:string,hideLikes:boolean,hideComment:boolean }) => {
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
//method    POST

export const    getAllPosts = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", postUrls.getAllPosts, null)
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

export const    getUserPost = (userId:{userId:any}) => {
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

export const editPost = (postData: {userId:any,postId:any,  title:any; description:string,hideLikes:boolean,hideComment:boolean }) => {
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

export const    deletePost = (postData:{postId:string,userId:string}) => {
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

export const    likePost = (postData:{postId:string,userId:string}) => {
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

export const    getPostComments = (postId:{postId:any}) => {
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

export const addComment = (commentData: {postId:any,userId:any,comment:string }) => {
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

//@dec      Add a reply comment
//method    POST

export const replyComment = (commentData: {commentId:string,userId:any,replyComment:any }) => {
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
export const deleteComment = ( commentId:{commentId:any}) => {

  return new Promise((resolve, reject) => {
   
    
    try {
      const url = `${postUrls.deleteComment}?commentId=${commentId}`;
      apiCall("get", url,commentId)
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


export const setPreferences = (userData: {userId:string,userType:any,isHiring:any }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.setPreferences,userData)
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
      apiCall("post", userUrls.setBasicInformation,userData)
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
export const addJob= (data:any) => {
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

export const editJob= (data:any) => {
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


//list job

export const listJob= (data:any) => {
  
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
export const listUserJob= (userId:{userId:string}) => {
  
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
export const applyJob= ({formData}:any) => {
  
  return new Promise((resolve, reject) => {

    
    try {
      apiCall("post", jobUrls.addJobApplication,formData)
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
export const updateApplicationStatus= (applcationData:{applicationId:string,status:string,userId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.updateApplicationStatus,applcationData)
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
export const getemployeeApplications= (applicantId:{applicantId:string}) => {
  
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
export const getemployerApplications= (userId:{userId:string}) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.employerApplications,userId)
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
export const getAllJobDetails= (data:any) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getAllJobDetails,data)
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
export const cancelApplication= (data:any) => {
  
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.cancelApplication,data)
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

export const getJobDetails = ( jobId:{jobId: string|undefined}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", jobUrls.getJobDetails,jobId)
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

export const reportPost = (reportData: {userId: string,postId: string,cause : string}) => {
  return new Promise((resolve,reject)=>{
    try{
      apiCall("post",postUrls.reportPost , reportData)
       .then((response)=>{
        resolve(response)
       })
       .catch((err)=>{
        reject(err)
       })
    }catch(error){
      resolve({status : 500, message: "Somethings wrong"})
    }
  })
}