import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { TESTIMONIALS_DATA } from 'common/data/WebApp';
import Image from 'next/image';
import React, {useState} from 'react';
import Carousel from './carousel';
import ImageLoader from 'common/components/Loader/imageLoader';
import TestimonialsArea from './testimonials.style';
const Testimonials = () => {
  const { blockImage, title, posts } = TESTIMONIALS_DATA;
  const [imageBool, setImageBool] = useState(true);

  return (
    <TestimonialsArea>
      <Container>
        <Box className="blockTitle">
          <Image src={blockImage} 
            // placeholder='blur' 
            onLoad={() => setImageBool(true)}
            onLoadingComplete={() => setImageBool(false)}
            onError={(e) => {
              e.target.src="/assets/images/imageplace.svg";
              e.target.style.width = '100%'
              }
            }
            // blurDataURL="/assets/images/imageplace.svg"
          alt="shape image" />
          {imageBool && <ImageLoader contentBool={imageBool} />}
          <Heading as="h2" content={title} />
        </Box>
        <Carousel data={posts} />
      </Container>
    </TestimonialsArea>
  );
};

export default Testimonials;
