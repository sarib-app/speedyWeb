import React, { useContext } from "react";
import PropTypes from "prop-types";
import Scrollspy from "react-scrollspy";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/router"; // Import useRouter from next/router
import { DrawerContext } from "../../contexts/DrawerContext";
import NextImage from "../NextImage";

const RenderLinkWithIcon = ({ menu }) => {
  return (
    <div className="icon-login">
      {menu.icon ? (
        <NextImage className="icon" src={menu.icon} alt={menu.label} />
      ) : (
        ""
      )}
      <a
        className={menu.icon ? "icon-label" : "no-icon-label"}
        href={menu.path}
      >
        {menu.label}
      </a>
    </div>
  );
};

const ScrollSpyMenu = ({ className, menuItems, drawerClose, ...props }) => {
  const { dispatch } = useContext(DrawerContext);
  const router = useRouter(); // Instantiate the router
  const scrollItems = [];

  menuItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const addAllClasses = ["scrollspy__menu"];
  if (className) {
    addAllClasses.push(className);
  }

  const toggleDrawer = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const handleItemClick = (menu) => {
    if (menu.path.startsWith("#")) {
      // It's an anchor link, handle smooth scroll
      toggleDrawer();
    } else {
      // It's a path link, navigate to a different page
      router.push(menu.path);
    }
  };

  return (
    <Scrollspy
      items={scrollItems}
      className={addAllClasses.join(" ")}
      {...props}
    >
      {menuItems.map((menu, index) => (
        <li key={`menu-item-${index}`} onClick={() => handleItemClick(menu)}>
          {menu.staticLink ? (
            <RenderLinkWithIcon menu={menu} />
          ) : (
            <>
              {menu.path.startsWith("#") ? (
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              ) : (
                <Link href={menu.path}>{menu.label}</Link>
              )}
            </>
          )}
        </li>
      ))}
    </Scrollspy>
  );
};

ScrollSpyMenu.propTypes = {
  className: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  currentClassName: PropTypes.string,
  scrolledPastClassName: PropTypes.string,
  componentTag: PropTypes.string,
  style: PropTypes.object,
  offset: PropTypes.number,
  rootEl: PropTypes.string,
  onUpdate: PropTypes.func,
};

ScrollSpyMenu.defaultProps = {
  componentTag: "ul",
  currentClassName: "is-current",
};

export default ScrollSpyMenu;
