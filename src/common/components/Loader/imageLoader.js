import React from 'react';

const ImageLoader = (props) =>{
    const { contentBool } = props;
    return (
        <p id="loginp" style={{fontWeight:500, color:'var(--textColor)',fontSize:'1.2em', textAlign:'center', marginTop:0}}>
            {contentBool ? 'Image loading.....': 'Image not found!'}
        </p>
    )
}

export default ImageLoader;