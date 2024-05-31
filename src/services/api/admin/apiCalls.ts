
import { adminApi } from "./api";


const adminApiCalls = async (method:string, url:string, data:any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response:any, error:any;

      if (method === "post") {
        response = await adminApi.post(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await adminApi.get(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await adminApi.patch(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await adminApi.delete(url, data).catch((err) => {
          error = err;
        });
      }


      
      if (response) {
        resolve(response);
       
        
      } else if (error) {

        console.log(error);
 
        reject(error?.response?.data);
        // if (error.response?.status === 401) {
        //   refreshAccessToken(error)
        //     .then((response) => {
        //       resolve(response.data);
        //     })
        //     .catch((error) => {
        //       if(error?.response?.status === 401){
        //         clearAdmin()
        //       } else {
        //         reject(error);
        //       }
        //     });
        // } else {
        //   reject(error?.response?.data);
        // }





      }

    } catch (err) {
      reject(err);
    }
  });
};


export default adminApiCalls;