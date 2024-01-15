import axios from "axios";
import api from "./config.json";
import { toast } from "react-toastify";
import store from "store";
import { setAuthentication } from "routes/Auth/Module";

const myApi = axios.create({
  baseURL: api.api,
  withCredentials: false,
});

myApi.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthToken = (token) => {
  if (token) {
    myApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
  }
};
myApi.interceptors.response.use(null, (error) => {
  // const expectedErrors =
  //   error.response &&
  //   error.response.status >= 400 &&
  //   error.response.status < 500;
  // if (!expectedErrors) {
  //   toast.error("مشکلی از سمت سرور رخ داده است.", {
  //     position: "top-right",
  //   });
  // }
  if (error.response.status === 401) {
    localStorage.removeItem("tickmentAd_AccessToken");
    localStorage.removeItem("tickmentAd_RefreshToken");
    store.dispatch(setAuthentication(false));
  }

  return Promise.reject(error);
});

export default myApi;
