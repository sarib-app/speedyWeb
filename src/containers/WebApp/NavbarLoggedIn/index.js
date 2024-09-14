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
import { MENU_ITEMS, MENU_ITEMS_EMPTY } from "common/data/WebApp";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useRouter } from "next/router";

const NavbarLoggedIn = ({
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
    alert("Inside Login");
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

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        <Box {...row}>
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
          <Box {...menuWrapper} className="mainMenuWrapper">
            <Link href="#" onClick={navigateToLogin} className="navbar_button">
              <Button {...button} title="Logout" />
            </Link>

            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#ff5f6d" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <Link
                href="#"
                onClick={navigateToLogin}
                className="navbar_button"
              >
                <Button {...button} title="Logout" />
              </Link>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

NavbarLoggedIn.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

NavbarLoggedIn.defaultProps = {
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
    // colors: "primaryWithBg",
    minHeight: "auto",
    // height: `${1}`,
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default NavbarLoggedIn;
