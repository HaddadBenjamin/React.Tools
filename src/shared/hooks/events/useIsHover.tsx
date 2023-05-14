import {
  useRef, useState, RefObject, MutableRefObject,
} from 'react';
import useEventListener from './useEventListener';

interface IUseHoverResponse<T extends HTMLElement> {
  hoveredReference : RefObject<T>,
  isHover : boolean
}

const useHover = <T extends HTMLElement, >() : IUseHoverResponse<T> => {
  const [isHover, setIsHover] = useState(false);
  const hoveredReference = useRef<T>(null) as MutableRefObject<T>;

  useEventListener('mouseover', () => setIsHover(true), hoveredReference);
  useEventListener('mouseout', () => setIsHover(false), hoveredReference);

  return { hoveredReference, isHover };
};

export default useHover;
