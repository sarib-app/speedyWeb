import axios from "axios";
import store from "store";
import { removeAuthToken, clearAuthData } from "store/authSlice";
import Router from "next/router";
import { baseApiUrl } from "common/api/urlConfig";

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: baseApiUrl, // Use environment variable for base API URL
});

// Function to handle 401 errors and redirect
const handle401Error = () => {
  console.log("Handling 401 Unauthorized error."); // Log the error handling

  // Clear any auth-related state
  store.dispatch(removeAuthToken());
  store.dispatch(clearAuthData());

  // Clear the token from localStorage
  localStorage.removeItem("userToken");
  localStorage.clear();

  // Clear session storage
  sessionStorage.clear();

  // Clear cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Redirect to the login page with a message
  Router.push("/Login?sessionExpired=true")
    .then(() => {
      console.log("Redirected to login page from interceptor."); // Log successful redirection
    })
    .catch((err) => {
      console.error("Error redirecting to login from interceptor:", err); // Log redirection errors
    });
};

// Set up an interceptor
axiosInstance.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => {
    console.error(
      "Checking response status:",
      error.response ? error.response.status : "No response"
    ); // Log the status
    if (error.response && error.response.status === 401) {
      handle401Error();
    } else {
      console.error("Non-401 error:", error); // Log non-401 errors
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
