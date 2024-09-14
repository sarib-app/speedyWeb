import { useState } from 'react';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import {FEATURE_DATA } from 'common/data/WebApp';
import Image from 'next/image';
import React from 'react';
import FeatureArea, { Col, Row } from './features.style';
import ImageLoader from 'common/components/Loader/imageLoader';
import { fontSize } from 'styled-system';

const Features = () => {
  const { blockTitle } = FEATURE_DATA;
  const { title, text } = blockTitle;
  const [imageBool, setImageBool] = useState(true);
  const [image1Bool, setImage1Bool] = useState(true);

  return (
    <FeatureArea id="feature_section">
      <Container>
        <Box className="blockTitle">
          <Heading as="h2" content={title} />
          <Text as="p" content={text} />
        </Box>
        <Row className='featureContainer'>
          <Col className="detailsCol">
            <Heading as="h2" content="App-tastic Features" style={{ textAlign: 'center', color: '#f9ab55', marginBottom: '0px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', fontSize:40}} />
            <Text as="p" content="Empower Your Booking Experience" style={{ textAlign: 'center', color: '#f9ab55', marginTop: '0px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' ,fontSize:20 }}/>
              {FEATURE_DATA.USER?.map(({ icon, title, text }, index) => (
                <Box className="featurePost" key={`user-feature-post-key-${index}`}>
                  <div className='feature-icon' style={{"--width": `${icon?.width}px`}}>
                    <Image src={icon} 
                      // placeholder='blur' 
                      onLoad={() => setImageBool(true)}
                      onLoadingComplete={() => setImageBool(false)}
                      onError={(e) => {
                        e.target.src="/assets/images/imageplace.svg";
                        e.target.style.width = '100%'
                        }
                      }
                      // blurDataURL="/assets/images/imageplace.svg"
                      alt="feature-icon" />
                      {imageBool && <ImageLoader contentBool={imageBool} />}
                  </div>
                  <Box className="content">
                    <Heading as="h4" content={title} />
                    <Text as="p" content={text} />
                  </Box>
                </Box>
              ))}
          </Col>

          <Col className="detailsCol">
          <Heading as="h2" content="Service Superiorities" style={{ textAlign: 'center', color: '#f9ab55', marginBottom: '0px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', fontSize:40}} />
        <Text as="p" content="Elevate Your Business Operations" style={{ textAlign: 'center', color: '#f9ab55', marginTop: '0px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)' , fontSize:20}}/>
            {FEATURE_DATA.PROVIDER?.map(({ icon, title, text }, index) => (
              <Box className="featurePost" key={`provider-feature-post-key-${index}`}>
                <div className='feature-icon' style={{"--width": `${icon?.width}px`}}>
                  <Image src={icon} 
                    // placeholder='blur' 
                    onLoad={() => setImage1Bool(true)}
                    onLoadingComplete={() => setImage1Bool(false)}
                    onError={(e) => {
                      e.target.src="/assets/images/imageplace.svg";
                      e.target.style.width = '100%'
                      }
                    }
                    // blurDataURL="/assets/images/imageplace.svg"
                    alt="feature-icon" />
                    {image1Bool && <ImageLoader contentBool={image1Bool} />}
                </div>
                <Box className="content">
                  <Heading as="h4" content={title} />
                  <Text as="p" content={text} />
                </Box>
              </Box>
            ))}
          </Col>
        </Row>

       
      
      </Container>
    </FeatureArea>
  );
};

export default Features;

