import {
  MutableRefObject, useCallback, useRef, useState,
} from 'react';
import useEventListener from './useEventListener';
import useSharedSessionStorage from '../state/useSharedSessionStorage';

interface IUseDragParameters<T> {
  getDraggedElementProps : () => T,
  onDragStart? : (event?: Event) => void
  onDragging? : (event?: Event) => void
  onDragEnd? : (event?: Event) => void
}

interface IUseDragResponse<T extends HTMLElement> {
  dragReference : MutableRefObject<T>
  isDragging : boolean
}

const useDrag = <T extends HTMLElement, Y>({
  getDraggedElementProps,
  onDragStart,
  onDragging,
  onDragEnd,
} : IUseDragParameters<Y>) : IUseDragResponse<T> => {
  const [, setDraggedElementProps] = useSharedSessionStorage<Y | undefined>('DRAGGED_ELEMENT', undefined);

  const dragReference = useRef() as MutableRefObject<T>;
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback((event: Event) => {
    event.stopPropagation();
    setIsDragging(true);
    onDragStart?.(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dragging = useCallback((event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    onDragging?.(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopDragging = useCallback((event: Event) => {
    event.stopPropagation();
    setIsDragging(false);
    setDraggedElementProps(getDraggedElementProps());
    onDragEnd?.(event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEventListener('dragstart', startDragging, dragReference);
  useEventListener('dragend', stopDragging, dragReference);
  useEventListener('dragover', dragging, dragReference);

  return { dragReference, isDragging };
};

export default useDrag;
