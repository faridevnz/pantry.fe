import axios from "axios";

// axios instance
export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("[ RESPONSE INTERCEPTOR ]: response", response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("[ RESPONSE INTERCEPTOR ]: error", error);
    return Promise.reject(error);
  }
);
