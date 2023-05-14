import { MutableRefObject, useEffect } from 'react';
import useOnIsVisibleChange from './useOnIsVisibleChange';

interface IUseOnVisibleOnceParameters<THtmlElement extends HTMLElement> {
  ref: MutableRefObject<THtmlElement>,
  offset?: number,
  onVisibleOnce?: () => void
}

// Se déclenche lorsqu'un élément est visible pour la première fois
const useOnVisibleOnce = <THtmlElement extends HTMLElement>(
  {
    ref,
    offset,
    onVisibleOnce,
  }: IUseOnVisibleOnceParameters<THtmlElement>) : boolean => {
  const isVisible = useOnIsVisibleChange({ ref, stopToObserveWhenElementIsVisible: true, offset });

  useEffect(() => {
    if (isVisible) onVisibleOnce?.();
  }, [isVisible]);

  return isVisible;
};

export default useOnVisibleOnce;
