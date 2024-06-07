import { postUrls, userUrls } from "../endPoints";
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

  //@dec      Renew Password
  //method    POST
  export const addPost = (postData: {userId: any , imageUrl:string; title: string ;description:string,hideLikes:boolean,hideComment:boolean}) =>{
    return new Promise((resolve,reject)=>{
      try{
        apiCall("post",postUrls.addPost,postData)
         .then((response) => {
          resolve(response)
         })
         .catch((err)=>{
          reject(err)
         })
      }catch(error){
        resolve({ status: 500 , message: "Somethings wrong"})
      }
    })
  }