import React from 'react';
import responsiveImageDatasMock from './responsiveImage.mock';
import ResponsiveImage from '../../domains/image/responsiveImage/components/reponsiveImage';

const ResponsiveImageSample = () => (
  <div>
    <h2>Responsive Image</h2>
    <div>
      To test : F12 / Network / Img / resize the window or reload to load a new
      image that depend of your resolution
    </div>

    <ResponsiveImage
      images={responsiveImageDatasMock}
      alt='diablo background'
    />
  </div>
);

export default ResponsiveImageSample;
