import { useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { CALL_TO_ACTION_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "react-icons-kit";
import { androidArrowForward } from "react-icons-kit/ionicons/androidArrowForward";
import CallToActionArea from "./calltoaction.style";
import ImageLoader from "common/components/Loader/imageLoader";

const CallToAction = () => {
  const { title, text, button, bubbleIcon } = CALL_TO_ACTION_DATA;
  const [imageBool, setImageBool] = useState(true);
  return (
    <CallToActionArea>
      {bubbleIcon.map(({ icon }, index) => (
        <div className={`callToAction-bubble-${index + 1}`} key={index}>
          <Image
            // placeholder='blur'
            onLoad={() => setImageBool(true)}
            onLoadingComplete={() => setImageBool(false)}
            onError={(e) => {
              e.target.src = "/assets/images/imageplace.svg";
              e.target.style.width = "100%";
            }}
            // blurDataURL="/assets/images/imageplace.svg"
            alt="bubble-icon"
            key={`bubble-icon-${index}`}
            src={icon}
          />
          {imageBool && <ImageLoader contentBool={imageBool} />}
        </div>
      ))}
      <Container>
        <Heading as="h3" content={title} />
        <Text as="p" content={text} />
        <Link href={button.link} className="button">
          <span>
            {button.label}
            <Icon icon={androidArrowForward} size={16} />
          </span>
        </Link>
      </Container>
    </CallToActionArea>
  );
};

export default CallToAction;
