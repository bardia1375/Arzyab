import axios from "axios";
import { toast } from "react-toastify";
import api from "./config.json";

const publicApi = axios.create({
  baseURL: api.api,
});
export const loginApi = axios.create({
  baseURL: api.authapi,
});
publicApi.defaults.headers.post["Content-Type"] = "application/json";
loginApi.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthToken = (token) => {
  if (token) {
    publicApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
  }
};
publicApi.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
    });
  }

  return Promise.reject(error);
});
loginApi.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    toast.error("مشکلی از سمت سرور رخ داده است.", {
      position: "top-right",
    });
  }

  return Promise.reject(error);
});
export default publicApi;
