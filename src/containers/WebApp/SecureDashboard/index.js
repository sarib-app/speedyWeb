import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import { SECURE_DASHBOARD_DATA } from 'common/data/WebApp';
import ImageLoader from 'common/components/Loader/imageLoader';
import Image from 'next/image';
import React, { useState } from 'react';
import SecureDashboardArea, { Col, Row } from './secureDashboard.style';
const SecureDashboard = () => {
  const [tab, setTab] = useState({
    toggle: 'tab-1',
  });
  const [imageBool, setImageBool] = useState(true);
  const [image1Bool, setImage1Bool] = useState(true);
  const [image2Bool, setImage2Bool] = useState(true);
  const { sectionImage, blockTitle, posts } = SECURE_DASHBOARD_DATA;
  const { title, text } = blockTitle;
  const handleClick = (tabName) => {
    setTab({
      ...tab,
      toggle: tabName,
    });
  };
  return (
    <SecureDashboardArea id="dashboard_section">
      <Container>
        <Row>
          <Col className="image">
            {'tab-1' === tab.toggle ? (
              <div>
              <Image src={sectionImage} 
                // placeholder='blur' 
                onLoad={() => setImageBool(true)}
                onLoadingComplete={() => setImageBool(false)}
                onError={(e) => {
                  e.target.src="/assets/images/imageplace.svg";
                  e.target.style.width = '100%'
                  }
                }
                // blurDataURL="/assets/images/imageplace.svg"
                alt="dashboard-banner" className="sectionImage" />
                {imageBool && <ImageLoader contentBool={imageBool} />}
                </div>
            ) : null}
            {'tab-2' === tab.toggle ? (
              <div>
              <Image src={sectionImage} 
                // placeholder='blur' 
                onLoad={() => setImage1Bool(true)}
                onLoadingComplete={() => setImage1Bool(false)}
                onError={(e) => {
                  e.target.src="/assets/images/imageplace.svg";
                  e.target.style.width = '100%'
                  }
                }
                // blurDataURL="/assets/images/imageplace.svg"
                alt="dashboard-banner" className="sectionImage" />
                {image1Bool && <ImageLoader contentBool={image1Bool} />}
              </div>
            ) : null}
          </Col>
          <Col className="content">
            <Box className="blockTitle">
              <Heading as="h2" content={title} />
              <Text as="p" content={text} />
            </Box>
            <Box className="postWrap">
              {posts.map(({ icon, title, text }, index) => (
                <Box
                  className={`post ${
                    tab.toggle === `tab-${index + 1}` ? 'active' : null
                  }`}
                  onClick={() => handleClick(`tab-${index + 1}`)}
                  key={`post-key-${index}`}
                >
                  <Box className="image">
                    <Image src={icon} 
                      // placeholder='blur' 
                      onLoad={() => setImage2Bool(true)}
                      onLoadingComplete={() => setImage2Bool(false)}
                      onError={(e) => {
                        e.target.src="/assets/images/imageplace.svg";
                        e.target.style.width = '100%'
                        }
                      }
                      // blurDataURL="/assets/images/imageplace.svg"
                      alt="post-banner" />
                      {image2Bool && <ImageLoader contentBool={image2Bool} />}
                  </Box>
                  <Box className="postContent">
                    <Heading as="h3" content={title} />
                    <Text as="p" content={text} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Col>
        </Row>
      </Container>
    </SecureDashboardArea>
  );
};

export default SecureDashboard;
