import axios from "axios";
import { setAuthToken, setAuthErrors } from "store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { removeAuthToken, clearAuthData } from "store/authSlice";
import { FaCommentsDollar } from "react-icons/fa";
import { baseApiUrl, baseKeyCloakUrl } from "./urlConfig";
const selectClaimedBusinessData = (state) => state.claimedBusinessData;

const keycloakUrl = baseKeyCloakUrl + "/realms/speedyslotz-dev";

const clientId = "speedyslotsweb";
const scope = "openid email profile address";
const grantType = "password";
const loginApiUrl = baseApiUrl + "/api/v1/users/login";
const adminApiUrl = baseApiUrl + "/api/v1/registeredBusiness";

export const validateAuthToken = async (token) => {
  try {
    const response = await axios.post(
      `${baseApiUrl}/api/v1/auth/validateToken`,
      { token }
    );
    if (response.data.valid) {
      "response.data.valid", response.data.valid;
      return true;
    } else {
      "response.data.valid", response.data.valid;
      return false;
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    // Redirect to the login page if token validation fails
    return false;
  }
};

export const loginUser = async (externalDispatch, username, password) => {
  try {
    const data = {
      client_id: clientId,
      grant_type: grantType,
      scope: scope,
      username: username,
      password: password,
    };

    const tokenResponse = await axios.post(
      `${keycloakUrl}/protocol/openid-connect/token`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (tokenResponse.data && tokenResponse.data.access_token) {
      // Use the setAuthToken action to store the token in Redux
      externalDispatch(setAuthToken(tokenResponse.data.access_token));

      const apiResponse = await axios.post(
        loginApiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
          params: {
            username,
            password,
          },
        }
      );

      return apiResponse;
    }
    return tokenResponse.data;
  } catch (error) {
    externalDispatch(setAuthErrors(error.message)); // Use the setAuthErrors action to set the error in Redux
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const loginAdmin = async (externalDispatch, username, password) => {
  try {
    const data = {
      client_id: clientId,
      grant_type: grantType,
      scope: scope,
      username: username,
      password: password,
    };

    const tokenResponse = await axios.post(
      `${keycloakUrl}/protocol/openid-connect/token`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (tokenResponse.data && tokenResponse.data.access_token) {
      // Use the setAuthToken action to store the token in Redux
      externalDispatch(setAuthToken(tokenResponse.data.access_token));

      const apiResponse = await axios.post(
        adminApiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        }
      );
      apiResponse;
      return apiResponse;
    }
    return tokenResponse.data;
  } catch (error) {
    externalDispatch(setAuthErrors(error.message)); // Use the setAuthErrors action to set the error in Redux
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

// Signup User API call
export const registerUser = async (userData) => {
  const signUpApiUrl = baseApiUrl + "/api/v1/users/signup";
  try {
    const response = await axios.post(signUpApiUrl, userData);

    if (response.data && response.headers["access_token"]) {
      const accessToken = response.headers["access_token"];
      localStorage.setItem("userToken", accessToken); // Using browser's local storage
    }
    return response;
  } catch (error) {
    throw new Error("Signup failed. Please check your data and try again.");
  }
};

export const saveBusiness = async (businessData, token) => {
  businessData;
  token;
  const registerBusinessUrl = baseApiUrl + "/api/v1/registerBusiness";

  const apiResponse = await axios.post(
    registerBusinessUrl,
    JSON.stringify(businessData),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return apiResponse.data;
};

export const updateBusiness = async (businessData, token) => {
  const registerBusinessUrl = baseApiUrl + "/api/v1/updateBusiness";

  try {
    const apiResponse = await axios.post(registerBusinessUrl, businessData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return apiResponse.data.payload;
  } catch (error) {
    throw error;
  }
};

export const getBusinessById = async (providerId, token) => {
  const getBusinessByIdUrl = baseApiUrl + "/api/v1/getBusinessById";
  const apiResponse = await axios.post(
    getBusinessByIdUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        providerId,
      },
    }
  );
  "Inside getBusinessById:", apiResponse;
  return apiResponse;
};

export const getAllRegisteredBusiness = async (token) => {
  const getRegisteredBusinessByIdUrl =
    baseApiUrl + "/api/v1/registeredBusiness";
  const apiResponse = await axios.post(
    getRegisteredBusinessByIdUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  "Inside getAllRegisteredBusiness:", apiResponse;
  return apiResponse;
};
export const getRegisteredBusinessById = async (providerId, token) => {
  const getRegisteredBusinessByIdUrl =
    baseApiUrl + "/api/v1/getRegisteredBusinessById";
  const apiResponse = await axios.post(
    getRegisteredBusinessByIdUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        providerId,
      },
    }
  );
  "Inside getRegisteredBusinessById:", apiResponse;
  return apiResponse;
};

export const getAllRegisteredUsers = async (token) => {
  const url = `${baseApiUrl}/api/v1/users/allUsers`;
  const apiResponse = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Inside getAllRegisteredUsers:", apiResponse);
  return apiResponse;
};

export const getRegisteredUserById = async (userId, token) => {
  const url = `${baseApiUrl}/api/v1/users/${userId}`;
  const apiResponse = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Inside getRegisteredUserById:", apiResponse);
  return apiResponse;
};

export const saveFileToServer = async (formData, token) => {
  const saveFileToServerUrl = baseApiUrl + "/api/v1/uploadDocs";
  const apiResponse = await axios.post(
    saveFileToServerUrl,
    formData, // Use formData here
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Use 'multipart/form-data' for file uploads
      },
    }
  );
  return apiResponse;
};

export const saveImagesToServer = async (formData, token) => {
  const saveImagesToServerUrl = baseApiUrl + "/api/v1/uploadImages";
  const apiResponse = await axios.post(
    saveImagesToServerUrl,
    formData, // Use formData here
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Use 'multipart/form-data' for file uploads
      },
    }
  );

  return apiResponse;
};

export const deleteBusinessImages = async (providerId, fileName, token) => {
  providerId;
  fileName;
  token;
  const response = await fetch(
    `${baseApiUrl}/api/v1/deleteImages?providerId=${providerId}&imageName=${fileName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  // Parse the response as JSON
  return response;
};

export const resendVerifyEmail = async (userData) => {
  const resendEmailUrl = baseApiUrl + "/api/v1/users/resendEmail";
  const response = await axios.post(resendEmailUrl, userData);
  return response;
};

export const forgotPassword = async (email) => {
  const resendEmailUrl = baseApiUrl + "/api/v1/users/forgotPassword";

  const response = await axios.post(
    resendEmailUrl,
    {},
    {
      params: {
        email,
      },
    }
  );

  return response;
};

export const resetPassword = async (userId, newPassword) => {
  const resendEmailUrl = baseApiUrl + "/api/v1/users/resetPassword";

  const response = await axios.post(
    resendEmailUrl,
    {},
    {
      params: {
        userId,
        newPassword,
      },
    }
  );

  return response;
};

export const saveDeal = async (deal, token) => {
  const saveDealUrl = baseApiUrl + "/api/v1/deals/save";
  const apiResponse = await axios.post(saveDealUrl, deal, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse.data;
};

export const fetchDeals = async (business_id, token) => {
  business_id;
  token;
  const response = await fetch(
    `${baseApiUrl}/api/v1/deals/businessDeals/${business_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );

  if (response.ok) {
    const parsedJson = await response.json(); // Parse the JSON from the response
    return parsedJson;
  }

  return response;
};

export const saveSettings = async (settingsData, token) => {
  const saveSettingsUrl = baseApiUrl + "/api/v1/businessSettings/save";
  const apiResponse = await axios.post(saveSettingsUrl, settingsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse;
};

export const deleteDeal = async (dealId, token) => {
  const response = await fetch(
    `${baseApiUrl}/api/v1/deals/deleteDeals/${dealId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );
  // Parse the response as JSON
  return response;
};

export const fetchSettings = async (business_id, token) => {
  const response = await fetch(
    `${baseApiUrl}/api/v1/businessSettings/${business_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );

  if (response.status === 404) {
    // Handle 'Not Found' as a special case, returning an empty array
    return [];
  } else if (!response.ok) {
    // For other non-ok status codes, throw an error
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const parsedJson = await response.json(); // Parse the JSON from the response
  return parsedJson;
};

export const saveCategories = async (categoriesData, token) => {
  const saveCategoriesUrl = baseApiUrl + "/api/v1/businessCategories/save";
  const apiResponse = await axios.post(saveCategoriesUrl, categoriesData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse.data;
};

export const deleteCategory = async (categoryId, token) => {
  const response = await fetch(
    `${baseApiUrl}/api/v1/businessCategories/deleteCategory/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );
  // Parse the response as JSON
  return response;
};

export const fetchCategories = async (business_id, token) => {
  const response = await fetch(
    `${baseApiUrl}/api/v1/businessCategories/categories/${business_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );

  if (response.status === 404) {
    // Handle 'Not Found' as a special case, returning an empty array
    return [];
  } else if (!response.ok) {
    // For other non-ok status codes, throw an error
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const parsedJson = await response.json(); // Parse the JSON from the response
  return parsedJson;
};

export const fetchCategoryByCategoryId = async (categoryId, token) => {
  const response = await fetch(
    `${baseApiUrl}/api/v1/businessCategories/category/${categoryId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Indicate that we're sending JSON
      },
    }
  );

  if (response.status === 404) {
    // Handle 'Not Found' as a special case, returning an empty array
    return [];
  } else if (!response.ok) {
    // For other non-ok status codes, throw an error
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }

  const parsedJson = await response.json(); // Parse the JSON from the response
  return parsedJson;
};

export const saveSlots = async (slotsData, token) => {
  const saveSlotUrl = baseApiUrl + "/api/v1/slots/saveSlot";
  const apiResponse = await axios.post(saveSlotUrl, slotsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse.data;
};

export const confirmSlot = async (slotsData, token) => {
  const confirmSlotUrl = baseApiUrl + "/api/v1/userBookings/confirm";
  const apiResponse = await axios.post(confirmSlotUrl, slotsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse.data;
};

export const rejectSlot = async (slotsData, token) => {
  const rejectSlotUrl = baseApiUrl + "/api/v1/userBookings/reject";
  const apiResponse = await axios.post(rejectSlotUrl, slotsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return apiResponse.data;
};

export const fetchSlots = async (business_id, token) => {
  const slotsData = {
    business_id: business_id,
  };
  const getSlotsUrl = baseApiUrl + "/api/v1/slots/getSlotsByProvider";
  const response = await axios.post(getSlotsUrl, slotsData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchLeads = async (business_id, token) => {
  ("fetchLeads called");
  const slotsData = {
    business_id: business_id,
  };
  const getLeadsUrl = baseApiUrl + "/api/v1/job-assignments/leads";
  const response = await axios.post(getLeadsUrl, slotsData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const deleteSlot = async (slotData, token) => {
  const deleteSlotUrl = baseApiUrl + "/api/v1/slots/deleteSlot";
  const response = await axios.delete(deleteSlotUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: slotData,
  });

  return response;
};

export const logoutUser = async (dispatch, token) => {
  // Call the backend API to logout from Keycloak
  const logoutUrl = baseApiUrl + "/api/v1/users/logout";

  try {
    const apiResponse = await axios.post(
      logoutUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          accessToken: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }

  // Dispatch the action to clear the token from the Redux state
  dispatch(removeAuthToken());
  dispatch(clearAuthData());

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

  // You can also clear any other session-related data if needed
};

export const fetchSupportingDocs = async (providerId, token) => {
  providerId;
  token;
  const fetchSupportingDocsUrl = baseApiUrl + "/api/v1/fetchSupportingDocs";

  try {
    const response = await axios.get(fetchSupportingDocsUrl, {
      params: { providerId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response;
    return response.data;
  } catch (error) {
    throw error; // You can handle the error as needed in the calling component
  }
};

export const fetchUserProfiles = async (userId, token) => {
  userId;
  token;

  try {
    const response = await fetch(
      `${baseApiUrl}/api/user-profile/fetch/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedJson = await response.json(); // Parse the JSON from the response

    return parsedJson;
  } catch (error) {
    throw error; // You can handle the error as needed in the calling component
  }
};

export const approveBusinessById = async (providerId, token) => {
  const approveBusinessByIdUrl = baseApiUrl + "/api/v1/approveBusinessById";

  try {
    const response = await axios.post(approveBusinessByIdUrl, null, {
      // null as the second argument since we are sending params
      params: { providerId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response;
    return response.data; // You may return just the status or the whole response based on your requirement
  } catch (error) {
    throw error; // Handle the error as needed in the calling component
  }
};

export const fetchChatHistory = async (chatInfo, token) => {
  chatInfo;
  token;
  const fetchChatHistoryUrl = baseApiUrl + "/api/v1/chat/history/by-business";

  const response = await axios.post(fetchChatHistoryUrl, chatInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  "Chat:", response;
  return response;
};

export const fetchAllCategories = async (token) => {
  token;
  const fetchCategoriesUrl = baseApiUrl + "/api/v1/categories/getAllCategories";

  try {
    const response = await axios.get(fetchCategoriesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response;
    return response.data;
  } catch (error) {
    throw error; // You can handle the error as needed in the calling component
  }
};

export const fetchSearchDetails = async (providerId, token) => {
  providerId;
  token;
  const fetchSearchDetailsUrl =
    baseApiUrl + "/api/v1/userSearchDetails/zipcode";

  try {
    const response = await axios.get(fetchSearchDetailsUrl, {
      params: { providerId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response;
    return response;
  } catch (error) {
    throw error; // You can handle the error as needed in the calling component
  }
};

export const updateUserProfile = async (profileData, token) => {
  "profileData", profileData;
  const saveProfileInfoUrl = baseApiUrl + "/api/v1/users/update";
  try {
    const response = await axios.post(saveProfileInfoUrl, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response;
    return response;
  } catch (error) {
    throw error; // You can handle the error as needed in the calling component
  }
};

export const createEarlySubscriber = async (subscriberData) => {
  try {
    const response = await axios.post(
      `${baseApiUrl}/api/v1/early-subscribers/create`,
      subscriberData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating early subscriber:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Server error occurred.");
    } else {
      throw new Error(
        "Could not create early subscriber. Please try again later."
      );
    }
  }
};
