import { useState } from "react";
import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { BANNER_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import BannerArea, { Col } from "./banner.style";
import ImageLoader from "common/components/Loader/imageLoader";
import { useRouter } from "next/router";

const Banner = () => {
  const { title, text, button, image, tagline } = BANNER_DATA;
  const [imageBool, setImageBool] = useState(true);
  const router = useRouter();

  const navigateToRegister = (e) => {
    ("Register Clicked:");
    // Prevent the default link behavior which would cause a page refresh.
    e.preventDefault();
    router.push("../Register");
  };

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Col>
          <Heading as="h2" content={title} />
          <Text as="p" content={text} />
          <Box className="ButtonWrap">
            <Link href="#" onClick={navigateToRegister} className="Button">
              {button.label}
              <Icon size={18} icon={androidArrowForward} />
            </Link>
            <Text as="span" content={tagline} />
          </Box>
        </Col>
      </Container>
      <Box className="bannerImage">
        {image.map(({ src }, index) => (
          <div key={`banner-div-key-${index}`}>
            <Image
              src={src}
              // placeholder='blur'
              onLoad={() => setImageBool(true)}
              onLoadingComplete={() => setImageBool(false)}
              onError={(e) => {
                e.target.src = "/assets/images/imageplace.svg";
                e.target.style.width = "100%";
              }}
              // blurDataURL="/assets/images/imageplace.svg"
              alt="banner-image"
              key={`banner-image-key-${index}`}
            />
            {imageBool && <ImageLoader contentBool={imageBool} />}
          </div>
        ))}
      </Box>
    </BannerArea>
  );
};

export default Banner;
