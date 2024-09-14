// components/Modal.js
import React from "react";
import {
  ModalBackdrop,
  ModalContent,
  ModalOptions,
} from "./registeroverlay.style";
import { FOOTER_DATA } from "common/data/WebApp";
import Link from "next/link";
import Image from "next/image";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import { useRouter } from "next/router";
const RegisterOverlay = ({ show, onClose }) => {
  if (!show) return null;
  const { device } = FOOTER_DATA;
  const router = useRouter(); // instantiate the router
  const navigateToLogin = (e) => {
    ("Login Clicked:");
    // Prevent the default link behavior which would cause a page refresh.
    router.push("../Login");
  };

  const navigateToRegister = (e) => {
    ("Register Clicked:");
    // Prevent the default link behavior which would cause a page refresh.
    e.preventDefault();
    router.push("../Register");
  };
  // Add a click event listener to the backdrop to close the modal
  const handleBackdropClick = (e) => {
    // if (e.target === e.currentTarget) {
    onClose();
    // }
  };

  return (
    <ModalBackdrop show={show} onClick={handleBackdropClick}>
      <ModalContent>
        <Button
          style={{
            background: "unset",
            position: "absolute",
            right: 0,
            top: -10,
            fontSize: "2em",
          }}
          onClick={handleBackdropClick}
          title={"X"}
        ></Button>
        <Heading as="h2" content="Register" />
        {/* <p>
          Begin your journey with us by selecting the appropriate registration
          type:
        </p> */}

        <ModalOptions>
          <div className="option">
            <span
              style={{ fontWeight: 700, fontSize: "1.2em", color: "#084887" }}
            >
              As a User
            </span>
            {/* <Text as="span" style={{color:'#084887'}} content="Get started:" />
            <p>Download our mobile app to access our services on the go.</p> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                columnGap: 10,
              }}
            >
              {device.map(({ icon, link }, index) => (
                <Link
                  href={link}
                  key={`footer-device-link-${index}`}
                  className="socialLink"
                >
                  <Image
                    src={icon}
                    width={80}
                    height="auto"
                    alt="device icon"
                  />
                </Link>
              ))}
            </div>
            <strong
              style={{ color: "#084887", fontSize: "1.3em", marginTop: "1em" }}
            >
              As an User
            </strong>
          </div>
          <div className="option" onClick={navigateToRegister}>
            <div className="socialLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-user formIconStyle"
                style={{ marginBottom: "1em" }}
              >
                <path
                  fill="#084887"
                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                />
              </svg>
            </div>
            <strong style={{ color: "#084887", fontSize: "1.3em" }}>
              As a Service Professional
            </strong>
          </div>
        </ModalOptions>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default RegisterOverlay;
