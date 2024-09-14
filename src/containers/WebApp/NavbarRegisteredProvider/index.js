import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
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
import { MENU_ITEMS_REGISTERED } from "common/data/WebApp";
import { logoutUser } from "common/api/api";
import Switch from "common/components/Switch";
import { useWebSocket } from "common/contexts/WebSocketContext";

const NavbarRegisteredProvider = ({
  navbarStyle,
  logoStyle,
  button,
  row,
  menuWrapper,
}) => {
  const { state, dispatch } = useContext(DrawerContext);
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessId = userData.provider_id;
  const userShortName =
    userData.first_name.substring(0, 1) + userData.last_name.substring(0, 1);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [notificationCount, setNotificationCount] = useState(0); // State for notification count

  const { incomingMessage, resetIncomingMessage } = useWebSocket();

  // Increment notification count when a new message is received
  useEffect(() => {
    if (incomingMessage) {
      setNotificationCount((prevCount) => prevCount + 1);
      resetIncomingMessage();
    }
  }, [incomingMessage, resetIncomingMessage]);

  const handleChatOpen = (unreadCount) => {
    setNotificationCount((prevCount) => prevCount - unreadCount);
  };

  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const dummyUserImage = "https://via.placeholder.com/50";

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "English" ? "Spanish" : "English");
  };

  const handleLogout = async (token) => {
    await logoutUser(dispatch, token);
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    handleLogout(authToken);
    router.push("/Login");
  };

  const navigateToAccountDetails = (e) => {
    e.preventDefault();
    router.push("/AccountDetails");
  };

  const navigateToMessages = () => {
    router.push("/Jobs"); // Adjust the path to your actual message screen path
  };

  const handleMenuItemClick = (menu) => {
    if (!menu.path.startsWith("#")) {
      router.push(menu.path);
    }
  };

  const styles = {
    userImage: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #ddd",
    },
    initialsCircle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "16px",
      fontWeight: "bold",
      border: "2px solid #ddd",
    },
    username: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      backgroundColor: "transparent",
      padding: "7px 10px",
      marginRight: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      borderRadius: "50%",
      transition: "background-color 0.3s",
    },
    notificationBadge: {
      position: "absolute",
      top: "6px",
      right: "5px",
      borderRadius: "50%",
      width: "20px", // Increased size for count visibility
      height: "20px",
      backgroundColor: "#080353",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "bold",
    },
    notificationIcon: {
      height: "25px",
      fontSize: "20px",
      marginRight: "10px",
      color: "#ff5f6d",
      animation: "pulse 2s infinite",
    },
    notificationBox: {
      width: 250,
      position: "absolute",
      top: 100,
      padding: "10px",
      animation: "all ease .3s",
      borderRadius: 15,
      right: "140px",
      maxHeight: "200px",
      overflowY: "auto",
      backgroundColor: "#FFF",
      filter: "drop-shadow(2px 8px 4px rgba(0, 0, 0, 0.2))",
    },
    dropdownMenu: {
      position: "absolute",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      top: "95px",
      left: "3000",
      minWidth: "150px",
      zIndex: 1000,
      opacity: 0,
      visibility: "hidden",
      transition:
        "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",
      transform: "translateY(-20px)",
      transitionProperty: "opacity, transform, visibility",
    },
    dropdownMenuActive: {
      opacity: 1,
      visibility: "visible",
      transform: "translateY(0)",
    },
    dropdownItem: {
      display: "block",
      padding: "10px 20px",
      textDecoration: "none",
      color: "#333",
      ":hover": {
        backgroundColor: "#f8f8f8",
      },
    },
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
            <ScrollSpyMenu
              className="main_menu"
              menuItems={MENU_ITEMS_REGISTERED}
              offset={-70}
              handleMenuItemClick={handleMenuItemClick}
            />
            <div style={{ position: "relative" }}>
              <Button
                onClick={navigateToMessages} // Navigate to the messages screen
                style={{
                  background: "unset",
                  padding: 0,
                  margin: "0px 5px 7px",
                  minWidth: 25,
                }}
                icon={
                  <i className="fa fa-bell" style={styles.notificationIcon}></i>
                }
              />
              {notificationCount > 0 && (
                <span style={styles.notificationBadge}>
                  {notificationCount}
                </span>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={navigateToAccountDetails}
                style={styles.username}
                className="profile-button"
              >
                {userData.profile_picture_url ? (
                  <img
                    src={userData.profile_picture_url}
                    alt="User"
                    style={styles.userImage}
                  />
                ) : (
                  <div style={styles.initialsCircle}>{userShortName}</div>
                )}
              </button>
            </div>
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
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={MENU_ITEMS_REGISTERED}
                drawerClose={true}
                offset={-100}
                handleMenuItemClick={handleMenuItemClick}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 5,
                  marginBottom: 7,
                }}
              >
                <span
                  style={{
                    color: "#084887",
                    fontWeight: currentLanguage === "English" ? 600 : 400,
                  }}
                >
                  English
                </span>
                <Switch
                  switchColor="#084887"
                  labelText=""
                  labelPosition="left"
                  switchSize="40px"
                  style={{ marginLeft: 5, marginRight: 5 }}
                  onChange={toggleLanguage}
                />
                <span
                  style={{
                    color: "#084887",
                    fontWeight: currentLanguage === "Spanish" ? 600 : 400,
                  }}
                >
                  Spanish
                </span>
              </div>
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
      {isDropdownOpen && (
        <Box style={styles.notificationBox}>
          <ul style={{ listStyle: "none" }}>
            <li>Mail1</li>
            <li>Mail2</li>
            <li>Mail3</li>
          </ul>
        </Box>
      )}
    </NavbarWrapper>
  );
};

NavbarRegisteredProvider.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

NavbarRegisteredProvider.defaultProps = {
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
    maxWidth: ["120px", "180px", "120px"],
  },
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--whiteColor)",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    minHeight: "auto",
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default NavbarRegisteredProvider;
