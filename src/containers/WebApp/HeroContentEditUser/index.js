import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Container from "common/components/UI/Container";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { updateUser } from "common/api/api";
import { setCurrentEditUser } from "store/registeredBusinessUserSlice";
import BannerArea from "./herocontentedituser.style";

const HeroContentEditUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentEditUser } = useSelector(
    (state) => state.registeredBusinessUser
  );
  const token = useSelector((state) => state.auth.authToken);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentEditUser) {
      setFormData(currentEditUser);
    } else {
      router.push("/AdminDashboard");
    }
  }, [currentEditUser, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(formData, token);
      if (response.data) {
        dispatch(setCurrentEditUser(response.data));
        router.push("/AdminDashboard");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <BannerArea id="edit_user_section">
      <Container className="tab-Container">
        <Box>
          <Heading as="h2" className="tabh2" content="Edit User" />
          <form onSubmit={handleSubmit}>
            <div className="fields-container">
              <div className="field-item">
                <label className="labelStyle">Username</label>
                <Input
                  name="username"
                  value={formData.username || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Username"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">First Name</label>
                <Input
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="First Name"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Last Name</label>
                <Input
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Last Name"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Email</label>
                <Input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Email"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Phone Number</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Phone Number"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Role</label>
                <Input
                  name="role"
                  value={formData.role || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Role"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Gender</label>
                <Input
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Gender"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Profile Picture URL</label>
                <Input
                  name="profile_picture_url"
                  value={formData.profile_picture_url || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Profile Picture URL"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">About Me</label>
                <Input
                  name="about_me"
                  value={formData.about_me || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="About Me"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Address</label>
                <Input
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Address"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Date of Birth</label>
                <Input
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Date of Birth"
                  type="date"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Admin Status</label>
                <Input
                  name="admin_status"
                  value={formData.admin_status || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Admin Status"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Zip Codes</label>
                <Input
                  name="zipCodes"
                  value={formData.zipCodes || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Zip Codes"
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Settings</label>
                <Input
                  name="settings"
                  value={formData.settings || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Settings"
                />
              </div>
            </div>
            <div className="ButtonWrap">
              <Button type="submit" title="Update User" className="Button" />
              <Button
                type="button"
                title="Back to Admin Dashboard"
                className="Button"
                onClick={() => router.push("/AdminDashboard")}
              />
            </div>
          </form>
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentEditUser;
