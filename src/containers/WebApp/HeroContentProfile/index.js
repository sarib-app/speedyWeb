import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BannerArea, { Col } from "./herocontentprofile.style";
import { StyledTabs } from "./herocontentprofile.style";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Select from "react-select";
import Container from "common/components/UI/Container";
import { useSelector, useDispatch } from "react-redux";
import PhotosTab from "../PhotosTab";
import ProfileTab from "../ProfileTab";
import SlotsTab from "../SlotsTab";
import ServiceAreaTab from "../ServiceAreaTab";
import CategoriesTab from "../CategoriesTab";
import DealsTab from "../DealsTab";
import SupportingDocumentsTab from "../SupportingDocumentsTab";
import { setBusinessData } from "store/businessSlice";

const HeroContentJobs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  const businessData = useSelector((state) => state.business.businessData);
  const profileTabData = [
    { value: 0, label: "Business Profile" },
    { value: 1, label: "Service Area" },
    { value: 2, label: "Service Categories" },
    { value: 3, label: "Business Photos" },
    { value: 4, label: "Appointment Manager" },
    { value: 5, label: "Supporting Document" },
    { value: 6, label: "Deals" },
  ];

  const [tabsState, setTabsState] = useState({
    profileTab: true,
    serviceAreaTab: false,
    categoriesTab: false,
    photosTab: false,
    appointmentManagerTab: false,
    supportingDocumentsTab: false,
    dealsTab: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (businessData && businessData.yelpBusiness) {
      const newState = {
        profileTab: true,
        serviceAreaTab: true,
        categoriesTab: true,
        photosTab: true,
        appointmentManagerTab: true,
        supportingDocumentsTab: true,
        dealsTab: true,
      };
      setTabsState(newState);
    } else {
      setTabsState({
        profileTab: true,
        serviceAreaTab: false,
        categoriesTab: false,
        photosTab: false,
        appointmentManagerTab: false,
        supportingDocumentsTab: false,
        dealsTab: false,
      });
    }
  }, [businessData]);

  const handleProfileUpdate = () => {
    setTabsState({
      profileTab: true,
      serviceAreaTab: true,
      categoriesTab: true,
      photosTab: true,
      appointmentManagerTab: true,
      supportingDocumentsTab: true,
      dealsTab: true,
    });
  };

  return (
    <BannerArea id="banner_section">
      <Container className="tab-Container">
        <Box>
          <Heading as="h2" className="tabh2" content="My Business Profile" />
          <div className="page-content">
            <StyledTabs
              selectedIndex={tabIndex}
              onSelect={(index) => {
                const tabsEnabled = [
                  tabsState.profileTab,
                  tabsState.serviceAreaTab,
                  tabsState.categoriesTab,
                  tabsState.photosTab,
                  tabsState.appointmentManagerTab,
                  tabsState.supportingDocumentsTab,
                  tabsState.dealsTab,
                ];
                if (tabsEnabled[index]) {
                  setTabIndex(index);
                }
              }}
            >
              {windowWidth > 767 ? (
                <TabList>
                  <Tab disabled={!tabsState.profileTab}>Business Profile</Tab>
                  <Tab disabled={!tabsState.serviceAreaTab}>Service Area</Tab>
                  <Tab disabled={!tabsState.categoriesTab}>
                    Service Categories
                  </Tab>
                  <Tab disabled={!tabsState.photosTab}>Business Photos</Tab>
                  <Tab disabled={!tabsState.appointmentManagerTab}>
                    Appointment Manager
                  </Tab>
                  <Tab disabled={!tabsState.supportingDocumentsTab}>
                    Supporting Document
                  </Tab>
                  <Tab disabled={!tabsState.dealsTab}>Deals</Tab>
                </TabList>
              ) : (
                <Select
                  options={profileTabData.map((tab, index) => ({
                    ...tab,
                    isDisabled: !tabsState[Object.keys(tabsState)[index]],
                  }))}
                  value={profileTabData[tabIndex]}
                  onChange={(e) => setTabIndex(e.value)}
                  placeholder="Select Profile"
                  className="custom-input custom-select"
                />
              )}
              <TabPanel>
                <ProfileTab onProfileUpdate={handleProfileUpdate} />
              </TabPanel>
              <TabPanel>
                <ServiceAreaTab
                  centerZipcode={businessData?.yelpBusinessLocation?.zipCode}
                />
              </TabPanel>
              <TabPanel>
                <CategoriesTab />
              </TabPanel>
              <TabPanel>
                <PhotosTab />
              </TabPanel>
              <TabPanel>
                <SlotsTab />
              </TabPanel>
              <TabPanel>
                <SupportingDocumentsTab />
              </TabPanel>
              <TabPanel>
                <DealsTab />
              </TabPanel>
            </StyledTabs>
          </div>
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentJobs;
