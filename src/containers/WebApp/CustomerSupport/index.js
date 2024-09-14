import { useState } from "react";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import { CUSTOMER_SUPPORT_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import { androidDone } from "react-icons-kit/ionicons/androidDone";
import CustomerSupportArea, { Row } from "./customerSupport.style";
import ImageLoader from 'common/components/Loader/imageLoader';

const CustomerSupport = () => {
  const { image, shapeImage, title, options, button } = CUSTOMER_SUPPORT_DATA;
  const [imageBool, setImageBool] = useState(true);
  const [image1Bool, setImage1Bool] = useState(true);
  return (
    <CustomerSupportArea>
      <Container>
        <Box className="blockTitle">
          <Heading as="h2" content={title} />
        </Box>
        <Row>
          <Box className="image">
            <div>
            <Image src={image} 
              // placeholder='blur' 
              onLoad={() => setImageBool(true)}
              onLoadingComplete={() => setImageBool(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                }
              }
              // blurDataURL="/assets/images/imageplace.svg"
              alt="customer support image" />
              {imageBool && <ImageLoader contentBool={imageBool} />}
              </div>
            <div className="shapeImage">
              <Image src={shapeImage} 
                // placeholder='blur' 
                onLoad={() => setImage1Bool(true)}
                onLoadingComplete={() => setImage1Bool(false)}
                onError={(e) => {
                  e.target.src="/assets/images/imageplace.svg";
                  e.target.style.width = '100%'
                  }
                }
                // blurDataURL="/assets/images/imageplace.svg"
                alt="customer support" />
                {image1Bool && <ImageLoader contentBool={image1Bool} />}
            </div>
          </Box>
          <Box className="content">
            <Box className="contentInner">
              <ul className="options">
                {options?.map(({ label }, index) => (
                  <li className="optionsItem" key={`option-key-${index}`}>
                    <Icon icon={androidDone} size={24} />
                    {label}
                  </li>
                ))}
              </ul>
              <Link href={button?.link} className="button">

                <span>
                  {button?.label}
                  <Icon icon={androidArrowForward} size={19} />
                </span>

              </Link>
            </Box>
          </Box>
        </Row>
      </Container>
    </CustomerSupportArea>
  );
};

export default CustomerSupport;
