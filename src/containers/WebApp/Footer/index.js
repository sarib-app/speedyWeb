import Box from "common/components/Box";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { FOOTER_DATA } from "common/data/WebApp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FooterArea from "./footer.style";

const Footer = () => {
  const { logo, menu, social, device } = FOOTER_DATA;
  return (
    <FooterArea>
      <Container>
        <Box className="menu">
          {menu.map(({ link, label }, index) => (
            <Link href={link} key={`footer-menu-link-${index}`} className="menuLink">
              {label}
            </Link>
          ))}
        </Box>
        <div className="socialContainer">
        <Box className="social">
          <Text as="span" content="Download:" />
            {
              device.map(({icon, link}, index) =>(
                (<Link href={link} key={`footer-device-link-${index}`} className="socialLink">
                  <Image src={icon} width={40} height="auto" 
                  alt="device icon" />
                </Link>)
              ))
            }
        </Box>
        <Box className="social">
          <Text as="span" content="Social:" />
          {social.map(({ icon, link }, index) => (
            (<Link href={link} key={`footer-social-link-${index}`} className="socialLink">
              <Image src={icon} alt="social icon" />
            </Link>)
          ))}
        </Box>
        </div>
        <Box className="logoBox">
          <Text as="p" content={`Copyright © ${new Date().getFullYear()}`} />
          <Link href="/" className="footerLink">
            SnapTech LLC.
          </Link>
        </Box>
      </Container>
      {/* <Container style={{paddingTop:5, paddingBottom:5, justifyContent:'flex-end'}}>
        <Box className="logoBox">
          <Text as="p" content={`Copyright © ${new Date().getFullYear()}`} />
          <Link href="/" className="footerLink">
            SnapTech LLC.
          </Link>
        </Box>
      </Container> */}
    </FooterArea>
  );
};

export default Footer;
