import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// import LogoImageStick from "common/assets/image/webApp/logo_transparent-2.png";
// import Logo from "common/components/UIElements/Logo";
import ErrorSec from 'containers/Error';
import { ERROR_DATA } from "common/data/WebApp";
import ResetCSS from 'common/assets/css/style';
import GlobalStyle, {
} from "containers/WebApp/webApp.style";

import Box from "common/components/Box";
import ImageLoader from 'common/components/Loader/imageLoader';
export default function Error({ statusCode }) {
  const { image } = ERROR_DATA;
  const [imageBool, setImageBool] = useState(true);
  
  return (
    <Fragment>
      <Head>
        <title>404: Not found</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700|Poppins:400,500,600,700|Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ResetCSS />
      <GlobalStyle />
      <div>
        {statusCode ? (
        <Box className="errorContainer">
          
          {image.map(({src})=> (
            <div key="error_1">
            <Image src={src} width={350} height={'auto'} 
              // placeholder='blur' 
              onLoad={() => setImageBool(true)}
              onLoadingComplete={() => setImageBool(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                }
              }
              // blurDataURL="/assets/images/imageplace.svg"
              alt='error-image' />
            {imageBool && <ImageLoader contentBool={imageBool} />}
            </div>
          ))}
          <h4>{statusCode} ERROR</h4>
          <p>Opps, an error occurred on server </p>
        </Box>
        ) : (
          <ErrorSec />
        )}
      </div>
    </Fragment>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
