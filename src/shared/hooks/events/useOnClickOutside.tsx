import React, { useEffect } from 'react';

interface IUseOnClickOutsideParameters<THtmlElement> {
  ref: React.MutableRefObject<THtmlElement>,
  onClickOutside: () => void
}
const useOnClickOutside = <THtmlElement extends HTMLElement>(
  {
    ref,
    onClickOutside,
  } : IUseOnClickOutsideParameters<THtmlElement>) : void => {
  useEffect(() => {
    const onMouseDown = (event: MouseEvent): void => {
      if (!ref.current || ref.current.contains(event.target as THtmlElement)) return;

      onClickOutside();
    };

    document.addEventListener('mousedown', onMouseDown);

    return () => document.removeEventListener('mousedown', onMouseDown);
  },
  [ref, onClickOutside]);
};

export default useOnClickOutside;
