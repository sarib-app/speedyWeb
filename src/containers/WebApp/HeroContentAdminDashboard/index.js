import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Container from "common/components/UI/Container";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import {
  getRegisteredBusinessById,
  getAllRegisteredBusiness,
  getAllRegisteredUsers,
  getRegisteredUserById,
  fetchAllCategories,
} from "common/api/api";
import {
  setCurrentEditBusiness,
  setRegisteredBusinesses,
  setRegisteredUsers,
  setCurrentEditUser,
  setCategories,
  setCurrentEditCategory,
} from "store/registeredBusinessUserSlice";
import BannerArea, { StyledTabs } from "./herocontentdashboardadmin.style";

const HeroContentAdminDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { registeredBusinesses, registeredUsers, categories } = useSelector(
    (state) => state.registeredBusinessUser
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const token = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessResponse = await getAllRegisteredBusiness(token);
        dispatch(setRegisteredBusinesses(businessResponse.data));

        const userResponse = await getAllRegisteredUsers(token);
        dispatch(setRegisteredUsers(userResponse.data.payload));

        const categoryResponse = await fetchAllCategories(token);
        console.log("categoryResponse", categoryResponse);
        dispatch(setCategories(categoryResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredBusinesses(registeredBusinesses || []);
    setFilteredUsers(registeredUsers || []);
    setFilteredCategories(categories || []);
  }, [registeredBusinesses, registeredUsers, categories]);

  const handleSearch = (value) => {
    const term = value.toLowerCase();
    setSearchTerm(term);

    const filteredBiz = (registeredBusinesses || []).filter(
      (business) =>
        business.name.toLowerCase().includes(term) ||
        business.id.toLowerCase().includes(term)
    );
    setFilteredBusinesses(filteredBiz);

    const filteredUsr = (registeredUsers || []).filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term)
    );
    setFilteredUsers(filteredUsr);

    const filteredCat = (categories || []).filter(
      (category) =>
        category.categoryName.toLowerCase().includes(term) ||
        category.subcategoryName.toLowerCase().includes(term) ||
        category.serviceTypeName.toLowerCase().includes(term)
    );
    setFilteredCategories(filteredCat);
  };

  const handleEdit = async (id, type) => {
    try {
      if (type === "business") {
        const response = await getRegisteredBusinessById(id, token);
        if (
          response.data &&
          response.data.businesses &&
          response.data.businesses[0]
        ) {
          dispatch(setCurrentEditBusiness(response.data.businesses[0]));
          router.push("/EditBusiness");
        }
      } else if (type === "user") {
        const response = await getRegisteredUserById(id, token);
        if (response.data) {
          console.log("User data fetched:", response.data); // Check if correct data is fetched
          dispatch(setCurrentEditUser(response.data.payload));
          router.push("/EditUser");
        }
      } else if (type === "category") {
        const category = categories.find(
          (cat) =>
            cat.key.categoryId === id.categoryId &&
            cat.key.subcategoryId === id.subcategoryId &&
            cat.key.serviceTypeId === id.serviceTypeId
        );
        if (category) {
          dispatch(setCurrentEditCategory(category));
          router.push("/EditCategory");
        }
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const renderBusinessTable = (items = []) => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Website URL</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.websiteUrl}</td>
              <td>{item.displayPhone || item.phone}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  title="Edit"
                  onClick={() => handleEdit(item.id, "business")}
                  className="edit-button"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderUserTable = (items = []) => (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item.user_id}>
              <td>{item.user_id}</td>
              <td>{item.username}</td>
              <td>{`${item.first_name} ${item.last_name}`}</td>
              <td>
                {item.email}
                {item.email_verified && <span title="Verified">✓</span>}
              </td>
              <td>
                {item.phoneNumber}
                {item.phone_verified && <span title="Verified">✓</span>}
              </td>
              <td>{item.role}</td>
              <td>{item.active ? "Active" : "Inactive"}</td>
              <td>{new Date(item.lastLoginAt).toLocaleString()}</td>
              <td>
                <Button
                  title="Edit"
                  onClick={() => handleEdit(item.user_id, "user")}
                  className="edit-button"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderCategoryTable = (items = []) => (
    <table className="data-table">
      <thead>
        <tr>
          <th>Category ID</th>
          <th>Category Name</th>
          <th>Subcategory ID</th>
          <th>Subcategory Name</th>
          <th>Service ID</th>
          <th>Service Name</th>
          <th>Category Name (ES)</th>
          <th>Subcategory Name (ES)</th>
          <th>Service Name (ES)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr
              key={`${item.key.categoryId}-${item.key.subcategoryId}-${item.key.serviceTypeId}`}
            >
              <td>{item.key.categoryId}</td>
              <td>{item.categoryName}</td>
              <td>{item.key.subcategoryId}</td>
              <td>{item.subcategoryName}</td>
              <td>{item.key.serviceTypeId}</td>
              <td>{item.serviceTypeName}</td>
              <td>{item.categoryNameEs}</td>
              <td>{item.subcategoryNameEs}</td>
              <td>{item.serviceTypeNameEs}</td>
              <td>
                <Button
                  title="Edit"
                  onClick={() => handleEdit(item.key, "category")}
                  className="edit-button"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Box>
          <Heading as="h2" content="Admin Dashboard" />
          <div className="page-content">
            <StyledTabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Business</Tab>
                <Tab>User</Tab>
                <Tab>Category</Tab>
              </TabList>

              <TabPanel>
                <div className="search-container">
                  <Input
                    inputType="text"
                    isMaterial={false}
                    placeholder="Search businesses"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search"
                  />
                </div>
                <div className="table-container">
                  {renderBusinessTable(filteredBusinesses)}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="search-container">
                  <Input
                    inputType="text"
                    isMaterial={false}
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search"
                  />
                </div>
                <div className="table-container">
                  {renderUserTable(filteredUsers)}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="search-container">
                  <Input
                    inputType="text"
                    isMaterial={false}
                    placeholder="Search categories"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search"
                  />
                </div>
                <div className="table-container">
                  {renderCategoryTable(filteredCategories)}
                </div>
              </TabPanel>
            </StyledTabs>
          </div>
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentAdminDashboard;
