import React, { type MutableRefObject, type RefObject } from 'react';
import useEventListener from './useEventListener';

type UseOnClickOutsideParameters = {
  onClickOutside: (event: Event) => void;
  getInsideElements: () => Array<
    Element | null | MutableRefObject<HTMLElement> | RefObject<HTMLElement>
  >;
};

const useOnClickOutside = ({
  onClickOutside,
  getInsideElements,
}: UseOnClickOutsideParameters): void => {
  const onMouseDown = React.useCallback(
    (event: Event): void => {
      const target = event.target as Node;
      const isInsideElements = getInsideElements().some((excludeElement) => (excludeElement instanceof Element
        ? excludeElement.contains(target)
        : excludeElement?.current?.contains(target)),
      );

      if (!isInsideElements) onClickOutside(event);
    },
    [onClickOutside, getInsideElements],
  );

  useEventListener('mousedown', onMouseDown, document);
};

export default useOnClickOutside;
