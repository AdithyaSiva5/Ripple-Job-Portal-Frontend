import { toast } from "sonner";
import { api } from "./api";
import { store } from "../../../utils/context/store";
import { logout } from "../../../utils/context/reducers/authSlice";

export const apiCall = async (method:string, url:string, data:any) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response:any, error:any;

      if (method === "post") {
        response = await api.post(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await api.get(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await api.patch(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await api.delete(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "put"){
        response = await api.put(url, data).catch((err) => {
          error = err;
        })
      }
      
      if(response){
        resolve(response);
    
        
      } else if (error) {
       console.log(error);
 
        reject(error?.response?.data);
        if(error.response.status==401){
          toast.error("Not Authorized")
          store.dispatch(logout())

        }

      }
    } catch (err) {
        reject(err);
    }
  });
};

