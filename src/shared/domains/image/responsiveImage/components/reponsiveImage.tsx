import React, { FC } from 'react';
import { ResponsiveImageData } from '../responsiveImage.models';
import useResponsiveImage from '../hooks/useResponsiveImage';

interface Props {
  images: ResponsiveImageData[];
  alt: string;
  className?: string;
}

const ResponsiveImage: FC<Props> = ({ images, alt, className }) => {
  const { sizes, srcSet, src } = useResponsiveImage(images);

  return (
    <img
      sizes={sizes}
      srcSet={srcSet}
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default ResponsiveImage;
