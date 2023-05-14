import React, { FC } from 'react';
import cn from 'classnames';
import styles from './LazyImage.module.scss';
import { LazyImageData } from '../lazyImage.model';
import useLazyImage from '../hooks/useLazyImage';

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
  } = useLazyImage(condition);

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
