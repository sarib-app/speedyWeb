import ResetCSS from "common/assets/css/style";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webApp";
import Banner from "containers/WebApp/Banner";
import Footer from "containers/WebApp/Footer";
import Navbar from "containers/WebApp/Navbar";
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from "containers/WebApp/webApp.style";
import Head from "next/head";
import React from "react";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import HeroContentAchievement from "../HeroContentAchievement";

const HeroContentLogin = dynamic(() => import("../HeroContentLogin"), {
  loading: () => <p style={{ color: "#000" }}>Loading...</p>,
});
const HeroContentAdminLogin = dynamic(
  () => import("../HeroContentAdminLogin"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);

const HeroContentEditBusiness = dynamic(
  () => import("../HeroContentEditBusiness"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);

const HeroContentRegister = dynamic(() => import("../HeroContentRegister"), {
  loading: () => <p style={{ color: "#000" }}>Loading...</p>,
});
const NavbarLoginSignup = dynamic(() => import("../NavbarLoginSignup"));
const NavbarLoggedIn = dynamic(() => import("../NavbarLoggedIn"));
const NavbarRegisteredProvider = dynamic(() =>
  import("../NavbarRegisteredProvider")
);

const HeroContentDashboard = dynamic(() => import("../HeroContentDashboard"), {
  loading: () => <p style={{ color: "#000" }}>Loading...</p>,
});
const HeroContentAdminDashboard = dynamic(
  () => import("../HeroContentAdminDashboard"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);

const HeroContentEditBusinesss = dynamic(
  () => import("../HeroContentEditBusiness"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);

const HeroContentEditUser = dynamic(() => import("../HeroContentEditUser"), {
  loading: () => <p style={{ color: "#000" }}>Loading...</p>,
});

const HeroContentEditCategory = dynamic(
  () => import("../HeroContentEditCategory"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);

const HeroContentEmailVerify = dynamic(
  () => import("../HeroContentEmailVerify"),
  {
    loading: () => <p style={{ color: "#000" }}>Loading...</p>,
  }
);
const HeroContentForgotPassword = dynamic(() =>
  import("../HeroContentForgotPasword")
);

const HeroContentResetPassword = dynamic(() =>
  import("../HeroContentResetPassword")
);
const HeroContentProfile = dynamic(() => import("../HeroContentProfile"));
const HeroContentJobs = dynamic(() => import("../HeroContentJobs"));
const HeroContentTerms = dynamic(() => import("../HeroContentTerms"));
const NavbarStaticPages = dynamic(() => import("../NavbarLoginSignup"));
const HeroContentAboutUs = dynamic(() => import("../HeroContentAboutUs"));
const HeroContentContact = dynamic(() => import("../HeroContentContact"));
const HeroContentPrivacy = dynamic(() => import("../HeroContentPrivacy"));
const HeroContentSupport = dynamic(() => import("../HeroContentSupport"));
const HeroContentAccountDetails = dynamic(() =>
  import("../HeroContentAccountDetails")
);
const Layout = () => {
  const router = useRouter();
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  // ('router', router.pathname);
  let heroContent;

  let navBar;
  if (userData && authToken && userData.user_id !== undefined) {
    if (userData.admin_status === 0) {
      navBar = <NavbarRegisteredProvider />;
    } else {
      navBar = <NavbarRegisteredProvider />;
      // navBar = <NavbarLoggedIn />;
    }
  } else {
    navBar = <NavbarLoginSignup />;
  }

  switch (router.pathname) {
    case "/Login":
      heroContent = <HeroContentLogin />;
      navBar = <NavbarLoginSignup />;
      break;
    case "/AdminLogin":
      heroContent = <HeroContentAdminLogin />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/Register":
      heroContent = <HeroContentRegister />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/EditBusiness":
      heroContent = <HeroContentEditBusinesss />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/EditUser":
      heroContent = <HeroContentEditUser />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/EditCategory":
      heroContent = <HeroContentEditCategory />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/Dashboard":
      heroContent = <HeroContentDashboard />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/AccountDetails":
      heroContent = <HeroContentAccountDetails />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/AdminDashboard":
      heroContent = <HeroContentAdminDashboard />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/Achievement":
      heroContent = <HeroContentAchievement />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/Profile":
      heroContent = <HeroContentProfile />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/Jobs":
      heroContent = <HeroContentJobs />;
      // navBar = <NavbarRegisteredProvider />;
      break;
    case "/VerifyEmail":
      heroContent = <HeroContentEmailVerify />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/ForgotPassword":
      heroContent = <HeroContentForgotPassword />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/ResetPassword":
      heroContent = <HeroContentResetPassword />;
      // navBar = <NavbarLoginSignup />;
      break;
    case "/Support":
      heroContent = <HeroContentSupport />;
      break;
    case "/Terms":
      heroContent = <HeroContentTerms />;
      // navBar = <NavbarStaticPages />;
      break;
    case "/AboutUs":
      heroContent = <HeroContentAboutUs />;
      // navBar = <NavbarStaticPages />;
      break;
    case "/Privacy":
      heroContent = <HeroContentPrivacy />;
      // navBar = <NavbarStaticPages />;
      break;
    case "/Contact":
      heroContent = <HeroContentContact />;
      // navBar = <NavbarStaticPages />;
      break;
    // ... more cases as needed
    default:
      heroContent = <div>Default content</div>;
      navBar = <div>Content for Page 1</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <title>SpeedySlotz| Every Day’s Open, Starting with Today</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#2563FF" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            rel="stylesheet"
          />
          <meta
            name="keywords"
            content="React, React js, Next, Next js, Super fast next js landing, Modren landing, Next js landing"
          />
        </Head>
        {/* end of head */}

        <ResetCSS />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js" />
        <GlobalStyle />
        {/* end of global and reset style */}

        {/* start app classic landing */}
        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>{navBar}</DrawerProvider>
          </Sticky>
          <ContentWrapper>
            {heroContent}
            <Footer />
          </ContentWrapper>
        </AppWrapper>
      </>
    </ThemeProvider>
  );
};

export default Layout;
