import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import { SERVICE_DATA } from 'common/data/WebApp';
import Image from 'next/image';
import React, {useState} from 'react';
import ServiceArea from './services.style';
import ImageLoader from 'common/components/Loader/imageLoader';

const Services = () => {
  const { blockTitle, post } = SERVICE_DATA;
  const { title, text } = blockTitle;
  const [imageBool, setImageBool] = useState(true);
  
  return (
    <ServiceArea id="service_section">
      <Container className={'service-container'}>
        <Box className="blockTitle">
          <Heading as="h2" content={title} />
          <Text as="p" content={text} />
        </Box>
        <Box className="postWrap">
          {post?.map(({ icon, text }, index) => (
            <Box className="post" key={`service-post-key-${index}`}>
              <div className='service-image-box'>
                <div className='service-image-box-inner'>
                  <Image src={icon} 
                    // placeholder='blur' 
                    onLoad={() => setImageBool(true)}
                    onLoadingComplete={() => setImageBool(false)}
                    onError={(e) => {
                      e.target.src="/assets/images/imageplace.svg";
                      e.target.style.width = '100%'
                      }
                    }
                    // blurDataURL="/assets/images/imageplace.svg"
                    alt="service-image" />
                  {imageBool && <ImageLoader contentBool={imageBool} />}
                </div>
              </div>
              <Heading as="h3" content={text} />
            </Box>
          ))}
        </Box>
      </Container>
    </ServiceArea>
  );
};

export default Services;

