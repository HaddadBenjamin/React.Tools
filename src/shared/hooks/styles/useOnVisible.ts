import { MutableRefObject, useEffect } from 'react';
import useOnIsVisibleChange from './useOnIsVisibleChange';

interface IUseOnVisibleParameters<THtmlElement extends HTMLElement> {
  ref: MutableRefObject<THtmlElement>,
  offset?: number,
  onVisible?: () => void
}

// Se déclenche à chaque fois qu'un élément est visible
const useOnVisible = <THtmlElement extends HTMLElement>(
  {
    ref,
    onVisible,
    offset,
  }: IUseOnVisibleParameters<THtmlElement>) : boolean => {
  const isVisible = useOnIsVisibleChange({ ref, stopToObserveWhenElementIsVisible: false, offset });

  useEffect(() => {
    if (isVisible) onVisible?.();
  }, [isVisible]);

  return isVisible;
};

export default useOnVisible;
