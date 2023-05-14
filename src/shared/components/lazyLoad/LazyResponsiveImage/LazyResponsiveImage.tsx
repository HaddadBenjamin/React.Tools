import React, { FC } from 'react';
import LazyImage from '../LazyImage/LazyImage';
import useResponsiveImage from '../../../hooks/utilities/useResponsiveImage';

export interface ResponsiveImageData {
  src: string;
  width: number;
}

interface Props {
  images: ResponsiveImageData[];
  alt: string;
  width: number; // Image width on large resolution
  height: number; // Image height on on large resolution
  className?: string;
  condition?: boolean;
}

const LazyResponsiveImage: FC<Props> = ({
  images,
  alt,
  width,
  height,
  className,
  condition = true,
}) => {
  const { sizes, srcSet, src } = useResponsiveImage(images);

  return (
    <LazyImage
      sizes={sizes}
      srcSet={srcSet}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      condition={condition}
    />
  );
};

export default LazyResponsiveImage;
