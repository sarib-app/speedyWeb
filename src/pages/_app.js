// App.js
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import GoogleAnalytics from "common/GoogleAnalytics/GoogleAnalytics";
import { Provider } from "react-redux";
import { WebSocketProvider } from "common/contexts/WebSocketContext";
import Router from "next/router";
import store from "store";
import axiosInstance from "../common/interceptor/axiosInterceptor";
import CountdownScreen from "common/components/CountDownScreen";

import "common/assets/css/flaticon.css";
import "common/assets/css/icon-example-page.css";
import "swiper/css/bundle";
import "common/assets/css/style.css";
import "common/assets/css/react-slick.css";
import "common/assets/css/rc-collapse.css";
import "rc-collapse/assets/index.css";
import "common/assets/css/rc-drawer.css";

export default function CustomApp({ Component, pageProps }) {
  const [isLaunchComplete, setIsLaunchComplete] = useState(false);

  useEffect(() => {

    axiosInstance.interceptors.response.use(
      (response) => {
   
        return response;
      },
      (error) => {
        console.error("Interceptor caught an error:", error);

        if (error.response && error.response.status === 401) {
          console.warn("Session expired. Redirecting to login.");
          handleSessionExpiration();
        }
        return Promise.reject(error);
      }
    );

    // Check if the query parameter is set to show the regular application
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const launchCompleteParam = urlParams.get("isLaunchComplete");

      if (launchCompleteParam === "true") {
        setIsLaunchComplete(true);
      }
    }
  }, []);

  const handleSessionExpiration = () => {


    store.dispatch(removeAuthToken());
    store.dispatch(clearAuthData());

    localStorage.removeItem("userToken");
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    Router.push("/Login?sessionExpired=true")
      .then(() => {
       
      })
      .catch((err) => {
        console.error("Error redirecting to login:", err);
      });
  };

  const handleCountdownComplete = () => {
    setIsLaunchComplete(true);
  };

  return (
    <NextUIProvider>
      <GoogleAnalytics />
      <Provider store={store}>
        <WebSocketProvider>
          {!isLaunchComplete ? (
            <CountdownScreen
              launchDate="2024-10-16T00:00:00"
              onCountdownComplete={handleCountdownComplete}
            />
          ) : (
            <Component {...pageProps} axios={axiosInstance} />
          )}
        </WebSocketProvider>
      </Provider>
    </NextUIProvider>
  );
}
