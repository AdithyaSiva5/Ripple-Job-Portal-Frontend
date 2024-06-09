
import { toast } from "sonner";
import { adminApi } from "./api";
import { store } from "../../../utils/context/store";
import { AdminLogout } from "../../../utils/context/reducers/adminAuthSlice";


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
        if(error.response.status==401){
          toast.error("Not Authorized")
          store.dispatch(AdminLogout())

        }
 



      }

    } catch (err) {
      reject(err);
    }
  });
};


export default adminApiCalls;