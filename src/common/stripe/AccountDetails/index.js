import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "react-icons-kit";
import Input from "common/components/Input";
import {
  ic_person,
  ic_mail,
  ic_lock,
  ic_cake,
  ic_phone,
  ic_admin_panel_settings,
} from "react-icons-kit/md";

import {
  Section,
  FormField,
  Button,
  ProfileImage,
  ProfileImageWrapper,
  InitialsAvatar,
  Message,
} from "./accountdetails.style";
import { setUserData } from "store/userSlice";
import { updateUserProfile } from "common/api/api";
import Layout from "containers/WebApp/Layout";

const AccountDetails = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profileFile, setProfileFile] = useState(null);
  const authToken = useSelector((state) => state.auth.authToken);
  const [formValues, setFormValues] = useState(userData);
  const [profileImage, setProfileImage] = useState(
    userData.profile_picture_url
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (formValues.profile_picture_url) {
      setProfileImage(formValues.profile_picture_url);
    }
  }, [formValues.profile_picture_url]);

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return (firstInitial + lastInitial).toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userDataJson = JSON.stringify(formValues);
    let formData = new FormData();
    formData.append("user", userDataJson);

    if (profileFile) {
      formData.append("file", profileFile);
    }

    try {
      const result = await updateUserProfile(formData, authToken);
      if (result.status === 200 && result.data.success) {
        dispatch(setUserData(result.data.payload));
        setMessage("Update successful!");
        setMessageType("success");
      } else {
        setMessage("Update failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setProfileFile(file);
    }
  };

  return (
    <Section>
      {message && (
        <Message className={messageType === "success" ? "success" : "error"}>
          {message}
        </Message>
      )}
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <h3 className="account-h3">Account Details</h3>
        <ProfileImageWrapper>
          {profileImage ? (
            <ProfileImage src={profileImage} alt="Profile" />
          ) : (
            <InitialsAvatar>
              {getInitials(userData.first_name, userData.last_name)}
            </InitialsAvatar>
          )}
          <button
            onClick={() => document.getElementById("fileInput").click()}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
        </ProfileImageWrapper>
      </div>
      <FormField>
        <Input
          name="username"
          placeholder="Username"
          type="text"
          value={formValues.username}
          onChange={(e) => handleChange("username", e)}
          readOnly={true}
          icon={<Icon icon={ic_person} size={26} style={{ marginTop: 7 }} />}
          required={true}
          aria-label="Username input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="firstName"
          placeholder="First Name"
          type="text"
          value={formValues.first_name}
          onChange={(e) => handleChange("first_name", e)}
          icon={<Icon icon={ic_person} size={26} style={{ marginTop: 7 }} />}
          required={true}
          aria-label="First name input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={formValues.last_name}
          onChange={(e) => handleChange("last_name", e)}
          icon={<Icon icon={ic_person} size={26} style={{ marginTop: 7 }} />}
          required={true}
          aria-label="Last name input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange("email", e)}
          icon={<Icon icon={ic_mail} size={26} style={{ marginTop: 7 }} />}
          required={true}
          aria-label="Email input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="password"
          placeholder="Password"
          inputType="password"
          value={formValues.password}
          onChange={(e) => handleChange("password", e)}
          icon={<Icon icon={ic_lock} size={26} style={{ marginTop: 7 }} />}
          required={true}
          aria-label="Password input"
          className="input"
          passwordShowHide={true}
        />
      </FormField>
      <FormField>
        <Input
          name="dateOfBirth"
          placeholder="Date Of Birth yyyy-mm-dd"
          type="date"
          value={formValues.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e)}
          icon={<Icon icon={ic_cake} size={26} style={{ marginTop: 7 }} />}
          aria-label="Date of birth input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="phoneNumber"
          placeholder="Phone"
          value={formValues.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e)}
          icon={<Icon icon={ic_phone} size={26} style={{ marginTop: 7 }} />}
          aria-label="Phone input"
          className="input"
        />
      </FormField>
      <FormField>
        <Input
          name="gender"
          placeholder="Gender"
          value={formValues.gender || ""}
          onChange={(e) => handleChange("gender", e)}
          icon={
            <Icon
              icon={ic_admin_panel_settings}
              size={26}
              style={{ marginTop: 7 }}
            />
          }
          aria-label="Gender input"
          className="input"
        />
      </FormField>
      <Button onClick={handleSubmit}>Update</Button>
    </Section>
  );
};

export default AccountDetails;
