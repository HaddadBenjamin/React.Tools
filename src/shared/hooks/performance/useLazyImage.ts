import { MutableRefObject, useRef, useState } from 'react';
import useOnVisibleChange from '../styles/useOnIsVisibleChange';

interface IUseLazyImageResponse<TRef extends HTMLElement> {
  imgRef: MutableRefObject<TRef>,
  isVisible: boolean,
  imageIsLoaded : boolean
  onImageLoad : () => void
}

const useLazyImage = <TRef extends HTMLElement>(condition?: boolean) : IUseLazyImageResponse<TRef> => {
  const imgRef = useRef() as MutableRefObject<TRef>;
  const isVisible = useOnVisibleChange({ ref: imgRef, stopToObserveWhenElementIsVisible: true });
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const onImageLoad = () : void => setImageIsLoaded(true);

  return {
    imgRef,
    isVisible: isVisible && !!condition,
    imageIsLoaded,
    onImageLoad,
  } as const;
};

export default useLazyImage;
