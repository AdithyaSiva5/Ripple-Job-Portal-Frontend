import { toast } from "sonner";
import { api } from "./api";
import { store } from "../../../utils/context/store";
import { logout } from "../../../utils/context/reducers/authSlice";
import { refreshToken } from "./apiMethods";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshTokenValue = localStorage.getItem("refreshToken");

        if (refreshTokenValue) {
          refreshToken(refreshTokenValue)
            .then((response: any) => {
              const { accessToken: newToken } = response.data;
              localStorage.setItem("token", newToken);
              api.defaults.headers.common["Authorization"] =
                "Bearer " + newToken;
              originalRequest.headers["Authorization"] = "Bearer " + newToken;
              processQueue(null, newToken);
              resolve(api(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              store.dispatch(logout());
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        } else {
          store.dispatch(logout());
          processQueue(new Error("No refresh token available"), null);
        }
      });
    }

    return Promise.reject(error);
  }
);

export const apiCall = async (method: string, url: string, data: any) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response: any, error: any;

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
      } else if (method === "put") {
        response = await api.put(url, data).catch((err) => {
          error = err;
        });
      }

      if (response) {
        resolve(response);
      } else if (error) {
        console.log(error);

        reject(error?.response?.data);
        if (error.response.status == 401) {
          toast.error("Not Authorized");
          store.dispatch(logout());
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
