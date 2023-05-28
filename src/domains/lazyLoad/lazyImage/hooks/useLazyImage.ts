import { MutableRefObject, useRef, useState } from 'react';
import useOnVisibleChange from '../../../../shared/hooks/styles/useOnIsVisibleChange';

interface IUseLazyImageResponse {
  imgRef: MutableRefObject<HTMLDivElement>,
  isVisible: boolean,
  imageIsLoaded : boolean
  onImageLoad : () => void
}

const useLazyImage = (condition?: boolean) : IUseLazyImageResponse => {
  const imgRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isVisible = useOnVisibleChange({ ref: imgRef, stopToObserveWhenElementIsVisible: true });
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const onImageLoad = () => setImageIsLoaded(true);

  return {
    imgRef,
    isVisible: isVisible && !!condition,
    imageIsLoaded,
    onImageLoad,
  } as const;
};

export default useLazyImage;
