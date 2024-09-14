import React from "react";
import PropTypes from "prop-types";
import Text from "common/components/Text";
import Link from "common/components/Link";
import Image from "common/components/Image";

const Logo = ({
  logoWrapperStyle,
  logoStyle,
  titleStyle,
  withAnchor,
  anchorProps,
  logoSrc,
  title,
  ...props
}) => (
  <Link {...props} {...logoWrapperStyle}>
    {withAnchor ? (
      <a {...anchorProps}>
        {logoSrc ? (
          <Image src={logoSrc.src} 
              // placeholder='blur' 
              // onLoad={() => setLoginImage(true)}
              // onLoadingComplete={() => setLoginImage(false)}
              onError={(e) => {
                  e.target.src="/assets/images/imageplace.svg";
                  e.target.style.width = '100%'
                  // setImageBool(false);
                }
              }
              // blurDataURL="/assets/images/imageplace.svg"
            alt={title} {...logoStyle} />
        ) : (
          <Text content={title} {...titleStyle} />
        )}
      </a>
    ) : (
      <>
        {logoSrc ? (
          <Image src={logoSrc.src} 
            // placeholder='blur' 
              // onLoad={() => setLoginImage(true)}
              // onLoadingComplete={() => setLoginImage(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                // setImageBool(false);
              }
            }
          alt={title} {...logoStyle} />
        ) : (
          <Text content={title} {...titleStyle} />
        )}
      </>
    )}
  </Link>
);

Logo.propTypes = {
  logoSrc: PropTypes.object,
  title: PropTypes.string.isRequired,
  logoWrapperStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  withAnchor: PropTypes.bool,
  anchorProps: PropTypes.object,
};

Logo.defaultProps = {
  logoWrapperStyle: {
    display: "inline-flex",
    alignItems: "center",
    mr: "1rem",
    "a:hover,a:focus": {
      textDecoration: "none",
    },
  },
  titleStyle: {
    display: "inline-block",
    fontSize: "2rem",
    lineHeight: "inherit",
    whiteSpace: "nowrap",
  },
  title: "",
};
export default Logo;
