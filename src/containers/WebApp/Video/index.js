import { Modal } from '@nextui-org/react';
import videoBtn from 'common/assets/image/webApp/video-btn.svg';
import videoShape1 from 'common/assets/image/webApp/video-dot-1.svg';
import videoShape2 from 'common/assets/image/webApp/video-shape-1.svg';
import videoShape3 from 'common/assets/image/webApp/video-wave-1.svg';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import { VIDEO_DATA } from 'common/data/WebApp';
import Image from 'next/image';
import React, { useState } from 'react';
import ImageLoader from 'common/components/Loader/imageLoader';
import VideoArea, { VideoWrapper } from './video.style';


const Video = () => {
  const [openModal, setModal] = useState(false);
  const [imageBool, setImageBool] = useState(true);
  const [image1Bool, setImage1Bool] = useState(true);
  const [image2Bool, setImage2Bool] = useState(true);

  return (
    <VideoArea>
      <Container>
        <Heading as="h2" content={VIDEO_DATA?.title} />
        <Box className="videoBox">
          <div className='videoShape-1 videoShape'>
            <Image src={videoShape1}
              // placeholder='blur' 
              onLoad={() => setImageBool(true)}
              onLoadingComplete={() => setImageBool(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                }
              }
              // blurDataURL="/assets/images/imageplace.svg" 
              alt="video shape" />
              {imageBool && <ImageLoader contentBool={imageBool} />}
          </div>
          <div className='videoShape-2 videoShape'>
            <Image src={videoShape2} 
              // placeholder='blur' 
              onLoad={() => setImage1Bool(true)}
              onLoadingComplete={() => setImage1Bool(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                }
              }
              // blurDataURL="/assets/images/imageplace.svg"
              alt="video shape" />
            {image1Bool && <ImageLoader contentBool={image1Bool} />}
          </div>
          <div className='videoShape-3 videoShape'>
            <Image src={videoShape3} 
              // placeholder='blur' 
              onLoad={() => setImage2Bool(true)}
              onLoadingComplete={() => setImage2Bool(false)}
              onError={(e) => {
                e.target.src="/assets/images/imageplace.svg";
                e.target.style.width = '100%'
                }
              }
              // blurDataURL="/assets/images/imageplace.svg"
              alt="video shape" />
            {image2Bool && <ImageLoader contentBool={image2Bool} />}
          </div>
          <div className='video-play-button-wrapper'>
            <Button
              className="videoBtn"
              onClick={() => setModal(true)}
              icon={<Image src={videoBtn} alt="video" />}
              iconPosition="left"
              title=""
            />
          </div>
        </Box>
      </Container>
      <Modal
        blur
        width='850px'
        aria-labelledby="Search Panel"
        open={openModal}
        onClose={() => setModal(false)}
        justify="center"
        css={{
          background: 'transparent !important',
          borderRadius: '0px !important',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <iframe width="850" height="505" src="https://www.youtube.com/embed/hW98BFnVCm8" title="Cartsy - Super Fast WooCommerce Theme" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </Modal>
    </VideoArea>
  );
};

export default Video;
