import { adminUrl } from "../endPoints"
import adminApiCalls from "./apiCalls"





//@dec      Admin login
//@method   POST
export const adminPostLogin = (adminData:any) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.login, adminData).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};



//@dec      All Users List
//@method   Get
export const adminUserList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrl.userList, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

//@dec      All Users List
//@method   Get
export const adminUserBlock = (userId:{userId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.userBlock, userId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};


//@dec      All Post List
//@method   Get
export const adminPostList = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrl.postList, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

//@dec      Block post
//@method   Get
export const adminPostBlock = (postId:{postId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.postBlock, postId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};
//@dec      All report list
//@method   Get
export const adminReportList = (page:number) => {
    return new Promise((resolve, reject) => {
        try {
            const queryParams = `?page=${page}`
            adminApiCalls("get", adminUrl.reportList+queryParams, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};


//@dec      Job Category
//@method   Get
export const addJobCategory = (jobCategory:{jobCategory:string}) => {

    console.log(jobCategory);
    
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.addJobCategory, jobCategory).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};


//@dec      Job Category
//method    get

export const    getJobCategory= () => {
    return new Promise((resolve, reject) => {
      try {
        adminApiCalls("get", adminUrl.jobCategoryList, null)
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
  
  
  //@dec     Block Job Category
//@method   Post
export const blockJobCategory = (jobCategoryId:{jobCategoryId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.blockJobCategory,jobCategoryId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

//@dec      Block post
//@method   Get
export const adminJobBlock = (jobId:{jobId:string}) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.jobBlock, jobId).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

//@dec      All Job list
//@method   Get
export const adminJobList = (page:number) => {
    return new Promise((resolve, reject) => {
        try {
            const queryParams = `?page=${page}`
            adminApiCalls("get", adminUrl.jobList+queryParams, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};


//@dec      All transactions List
//@method   Get
export const adminTransactions= (page:number) => {
    return new Promise((resolve, reject) => {
        try {
            const queryParams = `?page=${page}`
            adminApiCalls("get", adminUrl.transactionsList+queryParams, null).then((response) => {
                resolve(response);
              }
            ).catch((err) => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};