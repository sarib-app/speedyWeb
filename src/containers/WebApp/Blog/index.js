import { useState } from 'react';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import { BLOG_DATA } from 'common/data/WebApp';
import ImageLoader from 'common/components/Loader/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/ionicons/chevronRight';
import 'swiper/css';
// import Swiper from 'react-id-swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogArea from './blog.style';
const Blog = () => {
  const [imageBool, setImageBool] = useState(true);
  const { blockText, posts } = BLOG_DATA;
  const { title, text } = blockText;
  const params = {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };

  return (
    <BlogArea id="blog_section">
      <Container>
        <Box className="blockTitle">
          <Heading as="h2" content={title} />
          <Text as="p" content={text} />
        </Box>
        <Swiper {...params}>
          {posts.map(({ image, title, link }, index) => (
            <SwiperSlide key={`blog-post-${index}`}>
              <Box as="div">
                <Box className="blogPost">
                  <Box className="blogImage">
                    <Image src={image} 
                      // placeholder='blur' 
                      onLoad={() => setImageBool(true)}
                      onLoadingComplete={() => setImageBool(false)}
                      onError={(e) => {
                        e.target.src="/assets/images/imageplace.svg";
                        e.target.style.width = '100%'
                        }
                      }
                      // blurDataURL="/assets/images/imageplace.svg"
                      alt="blog image" />
                      {imageBool && <ImageLoader contentBool={imageBool} />}
                  </Box>
                  <Box className="blogContent">
                    <Heading as="h3" content={title} />
                    <Link href={link.path} className="blogLink">

                      {link.label}
                      <Icon icon={chevronRight} size={12} />

                    </Link>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </BlogArea>
  );
};

export default Blog;
