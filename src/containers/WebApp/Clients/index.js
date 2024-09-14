import { useState } from "react";
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { COMPANY_DATA } from 'common/data/WebApp';
import Image from 'next/image';
import React from 'react';
import ClientsArea from './clients.style';
import ImageLoader from 'common/components/Loader/imageLoader';

const Clients = () => {
  const { title, images } = COMPANY_DATA;
  const [imageBool, setImageBool] = useState(true);

  return (
    <ClientsArea>
      <Container>
        <Heading as="h4" content={title} />
        <Box className="imageWrap">
          {images?.map(({ src }, index) => (
            <div className='client-image-wrapper' key={`client-image-key-${index}`}>
              <Image src={src} 
                // placeholder='blur' 
                onLoad={() => setImageBool(true)}
                onLoadingComplete={() => setImageBool(false)}
                onError={(e) => {
                  e.target.src="/assets/images/imageplace.svg";
                  e.target.style.width = '100%'
                  }
                }
                // blurDataURL="/assets/images/imageplace.svg"
                alt="client-image" />
              {imageBool && <ImageLoader contentBool={imageBool} />}
            </div>
          ))}
        </Box>
      </Container>
    </ClientsArea>
  );
};

export default Clients;
