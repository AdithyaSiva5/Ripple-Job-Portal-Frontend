import { toast } from "sonner";
import { api } from "./api";
import { store } from "../../../utils/context/store";
import { logout } from "../../../utils/context/reducers/authSlice";
// import { refreshToken, userAuth } from "../const/localStorage";
// import axios from "axios";

// import { persistor } from "../utils/store";
// import { BASE_URL } from "../../../constants/baseUrls";




// export const clearUser = () => {
//   localStorage.removeItem(userAuth);
//   localStorage.removeItem(refreshToken);
//   persistor.purge();
//   window.location.reload("/login");
// };



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




// const refreshAccessToken = async (error) => {
//   try {
//     if (error.response?.status === 401) {
//       const tokenRefresh = localStorage.getItem(refreshToken);

//       if (tokenRefresh) {
//         error.config._retry = true;

//         return new Promise(async (resolve, reject) => {
//           try {
//             //refreshing the access token
//             const response = await axios
//               .post(
//                 `${BASE_URL}/api/auth/user/refresh-token`,
//                 null,
//                 {
//                   headers: {
//                     Authorization: tokenRefresh,
//                   },
//                 }
//               )
//               .catch((err) => {
//                 reject(err);
//               });
//             if(response){
//               const newAccessToken = response.data.newToken;
//               localStorage.setItem(userAuth, newAccessToken);

//               //calling the original request
//               error.config.headers["Authorization"] = newAccessToken;


//               axios(error.config)
//                 .then((response) => {
//                   resolve(response);
//                 })
//                 .catch((error) => {
//                   reject(error);
//                 });
//             }
//           } catch (refreshError) {
//             reject(refreshError);
//           }
//         })
//       } else {
//         clearUser();
//       }
//     }
//   } catch (error) {
//     clearUser()
//   }
// }


