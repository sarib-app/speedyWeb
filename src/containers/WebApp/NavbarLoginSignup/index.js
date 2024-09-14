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
import React, { useContext } from "react";
import { useRouter } from "next/router";
import Text from "common/components/Text";
import { marginBottom, right } from "styled-system";

const NavbarLoginSignup = ({
  navbarStyle,
  logoStyle,
  button,
  row,
  menuWrapper,
}) => {
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter(); // instantiate the router
  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const navigateToLogin = (e) => {
    ("Login Clicked:");
    // Prevent the default link behavior which would cause a page refresh.
    router.push("/Login");
  };

  const navigateToRegister = (e) => {
    ("Register Clicked:");
    // Prevent the default link behavior which would cause a page refresh.
    e.preventDefault();
    router.push("/Register");
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        <Box {...row} display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Logo
              href="#"
              logoSrc={LogoImage}
              onClick={() => {
                router.push("../");
              }}
              title="Agency"
              logoStyle={logoStyle}
              className="main-logo"
            />
            <Logo
              href="#"
              logoSrc={LogoImageStick}
              onClick={() => {
                router.push("../");
              }}
              title="Agency"
              logoStyle={logoStyle}
              className="sticky-logo"
            />
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

NavbarLoginSignup.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

NavbarLoginSignup.defaultProps = {
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
    maxWidth: ["150px", "180px", "150px"],
  },
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--whiteColor)",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    // colors: 'primaryWithBg',
    minHeight: "auto",
    // height: `${1}`,
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
  wrapper: {
    alignItems: right,
  },
};

export default NavbarLoginSignup;
