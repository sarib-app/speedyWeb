import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Container from "common/components/UI/Container";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { updateCategory } from "common/api/api";
import { setCurrentEditCategory } from "store/registeredBusinessUserSlice";
import BannerArea from "./herocontenteditcategory.style";

const HeroContentEditCategory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentEditCategory } = useSelector(
    (state) => state.registeredBusinessUser
  );
  const token = useSelector((state) => state.auth.authToken);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentEditCategory) {
      setFormData(currentEditCategory);
    } else {
      router.push("/AdminDashboard");
    }
  }, [currentEditCategory, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCategory(formData, token);
      if (response.data) {
        dispatch(setCurrentEditCategory(response.data));
        router.push("/AdminDashboard");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <BannerArea id="edit_category_section">
      <Container className="tab-Container">
        <Box>
          <Heading as="h2" className="tabh2" content="Edit Category" />
          <form onSubmit={handleSubmit}>
            <div className="fields-container">
              <div className="field-item">
                <label className="labelStyle">Category Name</label>
                <Input
                  name="categoryName"
                  value={formData.categoryName || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Category Name"
                  icon={<i className="fas fa-tags formIconStyle"></i>}
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Subcategory Name</label>
                <Input
                  name="subcategoryName"
                  value={formData.subcategoryName || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Subcategory Name"
                  icon={<i className="fas fa-list formIconStyle"></i>}
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Service Type Name</label>
                <Input
                  name="serviceTypeName"
                  value={formData.serviceTypeName || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Service Type Name"
                  icon={<i className="fas fa-concierge-bell formIconStyle"></i>}
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Category Name (Spanish)</label>
                <Input
                  name="categoryNameEs"
                  value={formData.categoryNameEs || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Category Name (Spanish)"
                  icon={<i className="fas fa-language formIconStyle"></i>}
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">Subcategory Name (Spanish)</label>
                <Input
                  name="subcategoryNameEs"
                  value={formData.subcategoryNameEs || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Subcategory Name (Spanish)"
                  icon={<i className="fas fa-language formIconStyle"></i>}
                />
              </div>
              <div className="field-item">
                <label className="labelStyle">
                  Service Type Name (Spanish)
                </label>
                <Input
                  name="serviceTypeNameEs"
                  value={formData.serviceTypeNameEs || ""}
                  onChange={handleInputChange}
                  className="custom-input"
                  placeholder="Service Type Name (Spanish)"
                  icon={<i className="fas fa-language formIconStyle"></i>}
                />
              </div>
            </div>
            <div className="ButtonWrap">
              <Button
                type="submit"
                title="Update Category"
                className="Button"
              />
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

export default HeroContentEditCategory;
