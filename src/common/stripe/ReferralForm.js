import React, { useState } from "react";
import styled from "styled-components";
import ReferImage from "common/assets/image/webApp/refer.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGift } from "@fortawesome/free-solid-svg-icons";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f9ab55; // Bright background color
  padding: 20px;
`;

const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  padding: 11px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #004494;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ImageContainer = styled.div`
  margin-left: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #084887;
`;

const Text = styled.div`
  color: #084887;
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const ShareButton = styled.button`
  padding: 8px 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 8px;
`;

const IconContainer = styled.div`
  font-size: 48px; // Large icon
  color: #f9ab55 // Green icon color
  margin: 20px 0;
`;

const ReferralForm = () => {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(8); // For demonstration
  const referralCode = "SPEEDYSHARE";
  const promoMessage = `Join me on SpeedySlotz and use the code ${referralCode} to get a free month of subscription! Discover and offer local services. Check it out!`;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  const shareLink = (channel) => {
    let appUrl;
    const url = "https://speedyslotz.com";
    const shareMessage = encodeURIComponent(
      `Join me on SpeedySlotz and use the code ${referralCode} to get a free month of subscription! Discover and offer local services. Check it out at ${url}`
    );

    switch (channel) {
      case "facebook":
        appUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareMessage}`;
        break;
      case "whatsapp":
        appUrl = `https://api.whatsapp.com/send?text=${shareMessage}`;
        break;
      case "email":
        appUrl = `mailto:?subject=Refer a Friend&body=${shareMessage}`;
        break;
      default:
        console.error("Unsupported platform.");
        return;
    }

    window.open(appUrl, "_blank");
  };

  return (
    <Layout>
      <Section>
        <TextContainer>
          <Title>Refer a friend!</Title>

          <IconContainer>
            <FontAwesomeIcon icon={faGift} size="2x" color="#084887" />
          </IconContainer>
        </TextContainer>

        <Text>
          Refer your friends and family to SpeedySlotz. Once your friend joins,{" "}
          <strong>they will receive a free month of subscription</strong>.
          Invite more friends and enhance their experience at SpeedySlotz!
        </Text>
        <InputContainer>
          <Input type="text" value={referralCode} readOnly />
          <Button onClick={handleCopyClick}>
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </InputContainer>
        {copied && (
          <p style={{ color: "#28a745" }}>Link copied to clipboard.</p>
        )}
        <ShareContainer>
          <ShareButton onClick={() => shareLink("facebook")}>
            <FontAwesomeIcon icon={faFacebook} size="4x" color="#084887" />
          </ShareButton>
          <ShareButton onClick={() => shareLink("whatsapp")}>
            <FontAwesomeIcon icon={faWhatsapp} size="4x" color="#084887" />
          </ShareButton>
          <ShareButton onClick={() => shareLink("email")}>
            <FontAwesomeIcon icon={faEnvelope} size="4x" color="#084887" />
          </ShareButton>
        </ShareContainer>
      </Section>
      <ImageContainer>
        <Image
          src={ReferImage}
          alt="Refer & Earn"
          className="discount-badge"
          width={540}
          height={540}
        />
      </ImageContainer>
    </Layout>
  );
};

export default ReferralForm;
