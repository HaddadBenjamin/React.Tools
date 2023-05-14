import React, { FC } from 'react';
import cn from 'classnames';
import styles from './LazyImage.module.scss';
import useLazyImage from '../../../hooks/performance/useLazyImage';

export interface LazyImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  srcSet?: string;
}

interface Props extends LazyImageData {
  className?: string;
  condition?: boolean;
}

const LazyImage: FC<Props> = ({
  src,
  width,
  height,
  alt,

  className,
  condition = true,

  srcSet,
  sizes,
}) => {
  const {
    imgRef, isVisible, imageIsLoaded, onImageLoad,
  } = useLazyImage<HTMLDivElement>(condition);

  return (
    <div
      className={cn(styles.container, className)}
      ref={imgRef}
      style={{ paddingBottom: `${(height / width) * 100}%`, width: '100%' }}
    >
      {isVisible && (
        <img
          className={cn(styles.image, imageIsLoaded && styles.loadedImage)}
          src={src}
          alt={alt}
          onLoad={onImageLoad}
          sizes={sizes}
          srcSet={srcSet}
        />
      )}
    </div>
  );
};

export default LazyImage;
