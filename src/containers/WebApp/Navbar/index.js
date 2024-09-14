import LogoImageStick from "common/assets/image/webApp/logo_transparent-2.png";
import LogoImage from "common/assets/image/webApp/logo_transparent-1.png";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Drawer from "common/components/Drawer";
import HamburgMenu from "common/components/HamburgMenu";
import NavbarWrapper from "common/components/Navbar";
import ScrollSpyMenu from "common/components/ScrollSpyMenu";
import Container from "common/components/UI/Container";
import Logo from "common/components/UIElements/Logo";
import { DrawerContext } from "common/contexts/DrawerContext";
import { MENU_ITEMS } from "common/data/WebApp";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import LoginOverlay from "../LoginOverlay/index";
import RegisterOverlay from "../RegisterOverlay/index";

const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter(); // instantiate the router
  const [showLoginModal, setLoginShowModal] = useState(false);
  const [showRegisterModal, setRegisterShowModal] = useState(false);

  const handleLoginClick = () => {
    setLoginShowModal(true);
  };
  const handleRegisterClick = () => {
    setRegisterShowModal(true);
  };

  const closeLoginModal = () => {
    setLoginShowModal(false);
  };

  const closeRegisterModal = () => {
    setRegisterShowModal(false);
  };

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        <Box {...row}>
          <Logo
            href="#"
            onClick={() => {
              router.push("../");
            }}
            logoSrc={LogoImage}
            title="Agency"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Logo
            href="#"
            onClick={() => {
              router.push("../");
            }}
            logoSrc={LogoImageStick}
            title="Agency"
            logoStyle={logoStyle}
            className="sticky-logo"
          />
          <Box {...menuWrapper} className="mainMenuWrapper">
            <ScrollSpyMenu
              className="main_menu"
              menuItems={MENU_ITEMS}
              offset={-70}
            />
            <Link href="#" onClick={handleLoginClick} className="navbar_button">
              <Button {...button} title="Login Now" />
            </Link>
            <Link
              href="#"
              onClick={handleRegisterClick}
              className="navbar_button_two"
            >
              <Button {...button} title="Join Free" />
            </Link>
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#ff5f6d" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={MENU_ITEMS}
                drawerClose={true}
                offset={-100}
              />
              <Link
                href="#"
                onClick={handleLoginClick}
                className="navbar_button"
                style={{ marginBottom: 10 }}
              >
                <Button {...button} title="Login Now" />
              </Link>
              <Link
                href="#"
                onClick={handleRegisterClick}
                className="navbar_button_two"
              >
                <Button {...button} title="Join Free" />
              </Link>
            </Drawer>
          </Box>
        </Box>
      </Container>
      <LoginOverlay show={showLoginModal} onClose={closeLoginModal} />
      <RegisterOverlay show={showRegisterModal} onClose={closeRegisterModal} />
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    className: "sassminimal_navbar",
    minHeight: "70px",
    display: "block",
  },
  row: {
    flexBox: true,
    alignItems: "center",
    width: "100%",
  },
  logoStyle: {
    maxWidth: ["180px", "180px", "150px", , "120px"],
  },
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--whiteColor)",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    // colors: "primaryWithBg",
    minHeight: "auto",
    // height: `${1}`,
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default Navbar;
