import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import BannerArea from "./herocontentjobs.style";
import { StyledTabs } from "./herocontentjobs.style";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";

// Import your separate components for "Jobs," "Messages," and "Leads"
import JobsTab from "../JobsTab/index";
import MessageTab from "../MessageTab/index";
import LeadsTab from "../LeadsTab/index";

const HeroContentJobs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [leadsData, setLeadsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);

  const handleChatClick = (slot) => {
    setSelectedSlot(slot); // Pass the slot data to the MessageTab
    setTabIndex(1); // Switch to MessageTab
  };

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Box>
          <Heading as="h2" content="Jobs" />
          <div className="page-content">
            <StyledTabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Jobs</Tab>
                <Tab>Messages</Tab>
                <Tab>Leads</Tab>
              </TabList>

              <TabPanel>
                <div style={{ display: "flex" }}>
                  <JobsTab 
                    onChatClick={handleChatClick} 
                    setJobsData={setJobsData} 
                    />
                  {/* <div
                    id="jobs-container"
                    className="jobs-container"
                  >
                    {jobsData}
                  </div> */}
                </div>
              </TabPanel>

              <TabPanel>
                  <MessageTab slot={selectedSlot} />
              </TabPanel>
              <TabPanel>
                <div style={{ display: "flex" }}>
                  <LeadsTab setLeadsData={setLeadsData} />
                  {/* <div
                    id="lead-container"
                    className="jobs-container"
                  >
                    {leadsData}
                  </div> */}
                </div>
              </TabPanel>
            </StyledTabs>
          </div>
        </Box>
      </Container>
    </BannerArea>
  );
};

export default HeroContentJobs;
